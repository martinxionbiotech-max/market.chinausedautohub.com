// Batch 8 — market repo: sync new RHD brands/models + add Vehicle×Market relations (delta-only)
const fs = require("fs");
const CHECKED = "2026-10-06";

// --- field builders (match lib/template shapes exactly) ---
function sumField(status, summary, source, source_url, source_type, confidence) {
  return { status, summary, source, source_url, source_type, confidence, checked_date: CHECKED, needs_review: true };
}
function impField(status, requirements, notes, source, source_url, source_type, confidence) {
  return { status, requirements, notes, source, source_url, source_type, confidence, checked_date: CHECKED, needs_review: true };
}
function dutyField(standard, ev, vat, relief, notes, source, source_url, source_type, confidence) {
  return { standard_duty_taxrule_id: standard, ev_duty_taxrule_id: ev, vat_taxrule_id: vat, ev_duty_relief: relief, notes, source, source_url, source_type, confidence, checked_date: CHECKED, needs_review: true };
}
function evField(standard, dest, connector, needs_adapter, notes, source, source_url, source_type, confidence) {
  return { standard, destination_standard: dest, connector, voltage: null, frequency: null, needs_adapter, notes, source, source_url, source_type, confidence, checked_date: CHECKED, needs_review: true };
}
function routeField(route_ids, notes, source, source_url, source_type, confidence) {
  return { route_ids, notes, source, source_url, source_type, confidence, checked_date: CHECKED, needs_review: true };
}

function relation(vehicle_id, country_id, f) {
  return {
    vehicle_id, country_id,
    drive_side_fit: f.drive ?? null,
    age_rule_fit: f.age ?? null,
    powertrain_fit: f.pw ?? null,
    ev_charging_compat: f.ev ?? null,
    import_eligibility: f.imp ?? null,
    duty_anchors: f.duty ?? null,
    shipping_route: f.route ?? null,
    model_considerations: f.mc ?? null,
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)",
    source_url: "https://data.chinausedautohub.com/models/",
    source_type: "database",
    confidence: "medium",
    checked_date: CHECKED
  };
}

// ==================== 1. brands.json ====================
const brands = JSON.parse(fs.readFileSync("shared/data/brands.json", "utf8"));
const newBrands = [
  { brand_id: "galaxy", name: "Geely Galaxy", name_zh: "吉利银河", origin_country: "CN", founded: 2023, powertrains: ["ev", "phev"], vehicle_types: ["suv"], source: "Official brand history", source_url: "https://www.geely.com/", source_date: CHECKED, confidence: "high" },
  { brand_id: "maxus", name: "Maxus (LDV)", name_zh: "上汽大通", origin_country: "CN", founded: 2011, powertrains: ["ev", "ice"], vehicle_types: ["mpv", "suv", "pickup"], source: "Official brand history", source_url: "https://en.saicmaxus.com/", source_date: CHECKED, confidence: "high" },
  { brand_id: "jac", name: "JAC Motors", name_zh: "江淮汽车", origin_country: "CN", founded: 1964, powertrains: ["ice"], vehicle_types: ["pickup"], source: "Official brand history", source_url: "https://www.jac.com.cn/", source_date: CHECKED, confidence: "high" }
];
for (const b of newBrands) if (!brands.brands.some(x => x.brand_id === b.brand_id)) brands.brands.push(b);
fs.writeFileSync("shared/data/brands.json", JSON.stringify(brands, null, 2) + "\n");
console.log("brands now", brands.brands.length);

// ==================== 2. models.json ====================
const models = JSON.parse(fs.readFileSync("shared/data/models.json", "utf8"));
function gen(model_id, brand_id, name, name_zh, body_type, years, trimName, powertrain, specs, specSrc, specUrl) {
  return {
    model_id, brand_id, name, name_zh, body_type, status: "active",
    generations: [{
      generation_id: model_id + "-g1", name: "First Generation", production_years: years,
      trims: [{ trim_id: model_id + "-g1-" + powertrain, name: trimName, powertrain, production_years: years, specs, spec_source: specSrc, spec_source_url: specUrl, spec_source_date: CHECKED, confidence: "medium" }]
    }],
    source: specSrc, source_url: specUrl, source_date: CHECKED, confidence: "medium"
  };
}
const newModels = [
  gen("galaxy-e5", "galaxy", "Galaxy E5", "银河E5", "suv", [2024, 2025], "68.39 kWh", "ev", { motor_power_kw: 160, battery_capacity_kwh: 68.39, range_km: 610, drive_type: "fwd", seats: 5 }, "Automotive specifications database", "https://www.auto-data.net/en/geely-galaxy-e5-68.39-kwh-218hp-58657"),
  gen("maxus-mifa-9", "maxus", "MIFA 9", "大家9", "mpv", [2021, 2025], "90 kWh BEV", "ev", { motor_power_kw: 180, battery_capacity_kwh: 90, range_km: 435, drive_type: "fwd", seats: 7 }, "Manufacturer specifications (SAIC Maxus)", "https://en.saicmaxus.com/car/mifa9.shtml"),
  gen("maxus-d90", "maxus", "Maxus D90", "上汽大通D90", "suv", [2017, 2025], "2.0T Automatic", "ice", { engine: "2.0T", transmission: "8-speed automatic", drive_type: "rwd", seats: 7 }, "Manufacturer specifications (LDV Australia)", "https://www.ldvautomotive.com.au/vehicles/ldv-my25-d90-suv/"),
  gen("jac-t9", "jac", "T9", "江淮T9", "pickup", [2021, 2025], "2.0CTI Diesel 8AT", "ice", { engine: "2.0CTI Diesel", transmission: "8-speed automatic", drive_type: "awd", seats: 5 }, "Manufacturer specifications (JAC Motors Australia)", "https://jacute.com.au/models/jac-t9/")
];
for (const m of newModels) if (!models.models.some(x => x.model_id === m.model_id)) models.models.push(m);
fs.writeFileSync("shared/data/models.json", JSON.stringify(models, null, 1) + "\n");
console.log("models now", models.models.length);

// ==================== 3. vehicle-market.json ====================
const vm = JSON.parse(fs.readFileSync("shared/data/vehicle-market.json", "utf8"));
const relations = [];

// EV RHD helper (Kenya 10% EV duty relief / Nigeria no confirmed relief / Tanzania reduced excise)
function evRhdPair(model_id, brand, name, country, rbdNote) {
  const cname = { kenya: "Kenya", nigeria: "Nigeria", tanzania: "Tanzania" }[country];
  const isKenya = country === "kenya";
  const isTz = country === "tanzania";
  return relation(model_id, country, {
    drive: sumField("needs_conversion",
      `${cname} registers RHD only. ${brand} ${name} is produced in right-hand drive (${rbdNote}) — source a RHD unit rather than converting a China LHD unit.`,
      brand + " " + name + " RHD production (see model page)", "https://data.chinausedautohub.com/models/" + model_id + "/", "reputable_media", "medium"),
    age: sumField("eligible", `${name} production began within the last ~5 years; the destination age limit is satisfied by current-generation units.`,
      "market sub-site importrules.json (age limit)", null, "regulatory", "low"),
    pw: sumField("noted", isKenya
        ? "Battery-electric (EV) — Kenya applies reduced EV import duty (10% vs 25%) under the EAC CET."
        : isTz
          ? "Battery-electric (EV) — Tanzania has introduced reduced EV excise but records no EV-specific import-duty rate (25% standard duty + 18% VAT). Confirm current EV policy with TRA."
          : "Battery-electric (EV) — Nigeria's EV duty policy is developing; no confirmed EV-specific duty rate recorded. RHD availability is the primary increment.",
      "Data sub-site models.json (export intelligence)", "https://data.chinausedautohub.com/models/", "database", "low"),
    ev: evField("GB/T", "CCS2 / CHAdeMO", "GB/T AC / GB/T DC (vehicle inlet)", true,
      `China-market GB/T inlet vs ${cname} CCS2/CHAdeMO network — adapter required; regional RHD units may carry other inlets (confirm the sourced unit).`,
      "Vehicle: GB/T charging standard (Wikipedia); Destination: CCS2/CHAdeMO (Wikipedia)", "https://en.wikipedia.org/wiki/GB/T_charging_standard", "reputable_media", "medium"),
    imp: isKenya
      ? impField("conformity_required", ["Pre-Export Verification of Conformity (PVoC)"],
          "PVoC pre-shipment inspection required; EV duty relief (10% vs 25%) applies under the EAC CET.",
          "market sub-site importrules.json (PVoC, KEBS)", null, "regulatory", "medium")
      : isTz
        ? impField("conformity_required", ["Pre-shipment inspection (PVoC)"],
            "Tanzania import clearance and pre-shipment inspection (PVoC) apply; EV excise incentives introduced but no EV-specific duty rate recorded.",
            "market sub-site importrules.json (PVoC, TBS)", null, "regulatory", "low")
        : impField("conformity_required", ["Pre-shipment inspection (SONCAP / Form M)"],
            "Nigeria import clearance and pre-shipment inspection (SONCAP/Form M) apply; EV duty policy developing.",
            "market sub-site importrules.json (SONCAP / Form M)", null, "regulatory", "low"),
    duty: isKenya
      ? dutyField("ke-duty", "ke-ev-duty", "ke-vat", true, "EV: 10% (EAC CET reduced) vs 25% standard + 16% VAT. Referenced from taxrules.json — verify with KRA.",
          "market sub-site taxrules.json (referenced, not copied)", "https://www.kra.go.ke", "government", "low")
      : isTz
        ? dutyField("tz-duty", null, "tz-vat", false, "EV/ICE: 25% standard + 18% VAT; no EV-specific duty rate recorded. Referenced from taxrules.json — verify with TRA.",
            "market sub-site taxrules.json (referenced, not copied)", "https://www.tra.go.tz", "government", "low")
        : dutyField("ng-duty", null, "ng-vat", false, "EV/ICE: 20% standard + 7.5% VAT; no confirmed EV-specific duty rate. Referenced from taxrules.json — verify with Nigeria Customs.",
            "market sub-site taxrules.json (referenced, not copied)", "https://customs.gov.ng", "government", "low"),
    route: isKenya
      ? routeField(["cn-tianjin-to-ke-mombasa", "cn-shanghai-to-ke-mombasa"], "Sea freight to Mombasa (RoRo).",
          "market sub-site routes.json (referenced, not copied)", null, "industry", "low")
      : isTz
        ? routeField(["cn-tianjin-to-tz-dar-es-salaam", "cn-shanghai-to-tz-dar-es-salaam"], "Sea freight to Dar es Salaam (RoRo).",
            "market sub-site routes.json (referenced, not copied)", null, "industry", "low")
        : routeField(["cn-tianjin-to-ng-lagos", "cn-guangzhou-to-ng-tincan"], "Sea freight to Lagos (RoRo).",
            "market sub-site routes.json (referenced, not copied)", null, "industry", "low"),
    mc: sumField("noted", `${brand} ${name} is an electric vehicle; RHD production makes ${cname} sourcing viable — confirm whether the sourced unit carries a GB/T or CCS2 inlet.`,
      "Data sub-site models.json (export intelligence)", "https://data.chinausedautohub.com/models/" + model_id + "/", "reputable_media", "medium")
  });
}

// ICE RHD helper (Kenya/Nigeria — no EV relief, RHD source is the increment)
function iceRhdPair(model_id, brand, name, country, rbdNote, bodyNote) {
  const isKenya = country === "kenya";
  const cname = isKenya ? "Kenya" : "Nigeria";
  return relation(model_id, country, {
    drive: sumField("needs_conversion",
      `${cname} registers RHD only. ${brand} ${name} is produced in right-hand drive (${rbdNote}) — source a RHD unit rather than converting a China LHD unit.`,
      brand + " " + name + " RHD production (see model page)", "https://data.chinausedautohub.com/models/" + model_id + "/", "manufacturer", "medium"),
    age: sumField("eligible", `${name} production began within the last ~10 years; current-generation units satisfy the destination age limit.`,
      "market sub-site importrules.json (age limit)", null, "regulatory", "low"),
    pw: sumField("noted", isKenya
        ? "Combustion (ICE) — subject to standard 25% import duty; no EV-specific relief."
        : "Combustion (ICE) — subject to standard 20% import duty; no EV-specific relief.",
      "Data sub-site models.json (export intelligence)", "https://data.chinausedautohub.com/models/", "database", "medium"),
    imp: isKenya
      ? impField("conformity_required", ["Pre-Export Verification of Conformity (PVoC)"],
          "PVoC pre-shipment inspection required before export.",
          "market sub-site importrules.json (PVoC, KEBS)", null, "regulatory", "medium")
      : impField("conformity_required", ["Pre-shipment inspection (SONCAP / Form M)"],
          "Nigeria import clearance and pre-shipment inspection (SONCAP/Form M) apply.",
          "market sub-site importrules.json (SONCAP / Form M)", null, "regulatory", "low"),
    duty: isKenya
      ? dutyField("ke-duty", null, "ke-vat", false, "ICE: 25% standard + 16% VAT; no EV-specific relief. Referenced from taxrules.json — verify with KRA.",
          "market sub-site taxrules.json (referenced, not copied)", "https://www.kra.go.ke", "government", "low")
      : dutyField("ng-duty", null, "ng-vat", false, "ICE: 20% standard + 7.5% VAT; no EV-specific relief. Referenced from taxrules.json — verify with Nigeria Customs.",
          "market sub-site taxrules.json (referenced, not copied)", "https://customs.gov.ng", "government", "low"),
    route: isKenya
      ? routeField(["cn-tianjin-to-ke-mombasa", "cn-shanghai-to-ke-mombasa"], "Sea freight to Mombasa (RoRo).",
          "market sub-site routes.json (referenced, not copied)", null, "industry", "low")
      : routeField(["cn-tianjin-to-ng-lagos", "cn-guangzhou-to-ng-tincan"], "Sea freight to Lagos (RoRo).",
          "market sub-site routes.json (referenced, not copied)", null, "industry", "low"),
    mc: sumField("noted", `${brand} ${name} is a ${bodyNote}; RHD production makes ${cname} sourcing viable.`,
      "Data sub-site models.json (export intelligence)", "https://data.chinausedautohub.com/models/" + model_id + "/", "manufacturer", "medium")
  });
}

// ---- galaxy-e5 (EX5): EV RHD Thailand/Malaysia ----
relations.push(evRhdPair("galaxy-e5", "Geely Galaxy", "E5 (EX5)", "kenya", "Thailand (Thonburi-Geely) and Malaysia (Proton eMas 7)"));
relations.push(evRhdPair("galaxy-e5", "Geely Galaxy", "E5 (EX5)", "nigeria", "Thailand (Thonburi-Geely) and Malaysia (Proton eMas 7)"));
relations.push(evRhdPair("galaxy-e5", "Geely Galaxy", "E5 (EX5)", "tanzania", "Thailand (Thonburi-Geely) and Malaysia (Proton eMas 7)"));

// ---- maxus-mifa-9: EV MPV RHD UK/Australia/NZ/Malaysia/Singapore ----
relations.push(evRhdPair("maxus-mifa-9", "Maxus", "MIFA 9", "kenya", "the UK, Australia, New Zealand, Malaysia and Singapore"));
relations.push(evRhdPair("maxus-mifa-9", "Maxus", "MIFA 9", "nigeria", "the UK, Australia, New Zealand, Malaysia and Singapore"));

// ---- maxus-d90: ICE SUV RHD Australia/NZ ----
relations.push(iceRhdPair("maxus-d90", "Maxus", "D90", "kenya", "Australia and New Zealand (LDV)", "7-seat body-on-frame SUV"));
relations.push(iceRhdPair("maxus-d90", "Maxus", "D90", "nigeria", "Australia and New Zealand (LDV)", "7-seat body-on-frame SUV"));

// ---- jac-t9: ICE pickup RHD Australia ----
relations.push(iceRhdPair("jac-t9", "JAC", "T9", "kenya", "Australia (JAC Motors Australia)", "dual-cab pickup (2.0CTI diesel)"));
relations.push(iceRhdPair("jac-t9", "JAC", "T9", "nigeria", "Australia (JAC Motors Australia)", "dual-cab pickup (2.0CTI diesel)"));

for (const rel of relations) {
  if (!vm.relations.some(x => x.vehicle_id === rel.vehicle_id && x.country_id === rel.country_id)) vm.relations.push(rel);
}

// ---- vetoes (skips) — same-brand RHD already represented ----
const skips = [
  { vehicle_id: "deepal-sl03", country_id: "kenya", reason: "EV × RHD — Deepal brand RHD already represented by deepal-s07 × kenya/nigeria; mechanical brand cross-product (avoid)." },
  { vehicle_id: "avatr-12", country_id: "kenya", reason: "EV × RHD — Avatr brand RHD already represented by avatr-11 × kenya/nigeria; mechanical brand cross-product (avoid)." },
  { vehicle_id: "aion-s", country_id: "kenya", reason: "EV × RHD — Aion brand RHD already represented by aion-y-plus × kenya/nigeria; mechanical brand cross-product (avoid)." },
  { vehicle_id: "neta-l", country_id: "kenya", reason: "EV/EREV × RHD — Neta brand RHD already represented by neta-x × kenya/nigeria; mechanical brand cross-product (avoid)." },
  { vehicle_id: "wuling-hongguang-mini", country_id: "kenya", reason: "EV × RHD — Wuling brand RHD already represented by wuling-bingo × kenya/nigeria; mechanical brand cross-product (avoid)." },
  { vehicle_id: "wey-coffee-01", country_id: "uae", reason: "PHEV × LHD — Europe/Russia/Middle East export is LHD-only; no RHD, no EV-relief or age-rule increment beyond existing PHEV LHD coverage (avoid)." },
  { vehicle_id: "voyah-dreamer", country_id: "kazakhstan", reason: "PHEV MPV × LHD — Europe (Norway) export only, LHD; no RHD or distinct LHD EV/PHEV increment (avoid)." },
  { vehicle_id: "leapmotor-c11", country_id: "kazakhstan", reason: "EV × LHD — Europe (Stellantis) export only, LHD; EV-duty delta already represented by byd-atto-3 × kazakhstan (avoid mechanical EV cross-product)." }
];
for (const s of skips) {
  if (!vm.skipped.some(x => x.vehicle_id === s.vehicle_id && x.country_id === s.country_id)) vm.skipped.push(s);
}

vm.meta.batch = "P3.8 (phase2/49 - Vehicle x Market Intelligence, batch 8 — vehicle-market-b8)";
vm.meta.updated = CHECKED;

fs.writeFileSync("shared/data/vehicle-market.json", JSON.stringify(vm, null, 2) + "\n");
console.log("relations now", vm.relations.length, "| skipped now", vm.skipped.length);
const relSet = new Set(vm.relations.map(x => x.vehicle_id + "×" + x.country_id));
const overlap = vm.skipped.filter(s => relSet.has(s.vehicle_id + "×" + s.country_id));
console.log("skipped∩relations overlap:", overlap.length);
