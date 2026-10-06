// Batch 6 — market repo: sync new brands/models + add Vehicle×Market relations (delta-only)
const fs = require("fs");
const CHECKED = "2026-10-06";

// --- field builders (match lib/template shapes exactly) ---
// summary-style field: drive_side_fit / age_rule_fit / powertrain_fit / model_considerations
function sumField(status, summary, source, source_url, source_type, confidence) {
  return { status, summary, source, source_url, source_type, confidence, checked_date: CHECKED, needs_review: true };
}
// notes-style field: import_eligibility (status + requirements + notes)
function impField(status, requirements, notes, source, source_url, source_type, confidence) {
  return { status, requirements, notes, source, source_url, source_type, confidence, checked_date: CHECKED, needs_review: true };
}
// duty_anchors
function dutyField(standard, ev, vat, relief, notes, source, source_url, source_type, confidence) {
  return { standard_duty_taxrule_id: standard, ev_duty_taxrule_id: ev, vat_taxrule_id: vat, ev_duty_relief: relief, notes, source, source_url, source_type, confidence, checked_date: CHECKED, needs_review: true };
}
// ev_charging_compat
function evField(standard, dest, connector, needs_adapter, notes, source, source_url, source_type, confidence) {
  return { standard, destination_standard: dest, connector, voltage: null, frequency: null, needs_adapter, notes, source, source_url, source_type, confidence, checked_date: CHECKED, needs_review: true };
}
// shipping_route
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
  { brand_id: "aion", name: "Aion", name_zh: "埃安", origin_country: "CN", founded: 2017, powertrains: ["ev"], vehicle_types: ["suv", "sedan"], source: "Official brand history", source_url: "https://www.aion.com.cn/", source_date: CHECKED, confidence: "high" },
  { brand_id: "neta", name: "Neta", name_zh: "哪吒", origin_country: "CN", founded: 2014, powertrains: ["ev", "erev"], vehicle_types: ["suv"], source: "Official brand history", source_url: "https://www.neta.com/", source_date: CHECKED, confidence: "high" },
  { brand_id: "wuling", name: "Wuling", name_zh: "五菱", origin_country: "CN", founded: 1982, powertrains: ["ev"], vehicle_types: ["hatchback"], source: "Official brand history", source_url: "https://www.wuling.com/", source_date: CHECKED, confidence: "high" }
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
  gen("tank-500", "tank", "Tank 500", "坦克500", "suv", [2022, 2025], "3.0T V6 9AT 4WD", "ice", { engine: "3.0T V6", engine_displacement_cc: 2993, transmission: "9-speed automatic", drive_type: "awd", seats: 7 }, "Automotive specifications database", "https://www.auto-data.net/en/tank-500-3.0t-v6-360hp-mild-hybrid-4wd-automatic-55473"),
  gen("haval-h9", "haval", "H9", "哈弗H9", "suv", [2015, 2025], "2.0T 8AT 4WD", "ice", { engine: "2.0T", engine_displacement_cc: 1967, transmission: "8-speed automatic", drive_type: "awd", seats: 7 }, "Automotive specifications database", "https://www.auto-data.net/en/haval-h9-ii-2.0t-218hp-4wd-zf-53782"),
  gen("jetour-dashing", "jetour", "Dashing", "捷途大圣", "suv", [2022, 2025], "1.6T DCT", "ice", { engine: "1.6T", engine_displacement_cc: 1598, transmission: "7-speed DCT", drive_type: "fwd", seats: 5 }, "Automotive specifications database", "https://www.auto-data.net/en/jetour-dashing-1.6-tgdi-197hp-dct-54215"),
  gen("aion-y-plus", "aion", "Aion Y Plus", "埃安Y Plus", "suv", [2022, 2025], "Standard", "ev", { motor_power_kw: 150, battery_capacity_kwh: 68.2, range_km: 610, drive_type: "fwd", seats: 5 }, "Reputable media specifications", "https://en.wikipedia.org/wiki/Aion_Y"),
  gen("neta-x", "neta", "Neta X", "哪吒X", "suv", [2020, 2025], "Standard", "ev", { motor_power_kw: 150, battery_capacity_kwh: 64, range_km: 660, drive_type: "fwd", seats: 5 }, "Reputable media specifications", "https://en.wikipedia.org/wiki/Neta_U"),
  gen("wuling-bingo", "wuling", "Bingo", "五菱缤果", "hatchback", [2023, 2025], "Standard", "ev", { motor_power_kw: 50, battery_capacity_kwh: 37.9, range_km: 410, transmission: "Single-speed automatic", drive_type: "fwd", seats: 4 }, "Reputable media specifications", "https://en.wikipedia.org/wiki/Wuling_Bingo")
];
for (const m of newModels) if (!models.models.some(x => x.model_id === m.model_id)) models.models.push(m);
fs.writeFileSync("shared/data/models.json", JSON.stringify(models, null, 1) + "\n");
console.log("models now", models.models.length);

// ==================== 3. vehicle-market.json ====================
const vm = JSON.parse(fs.readFileSync("shared/data/vehicle-market.json", "utf8"));

const relations = [];

// 1) tank-500 × kenya (ICE RHD needs_conversion)
relations.push(relation("tank-500", "kenya", {
  drive: sumField("needs_conversion",
    "Kenya registers RHD only. GWM builds/sells the Tank 500 in right-hand drive in Thailand (3.0T diesel, launched 2026) and Australia — source a RHD unit rather than converting a China LHD unit.",
    "GWM Tank 500 Thailand/Australia RHD launch coverage (reputable media)", "https://www.drive.com.au/reviews/2026-gwm-tank-500-3-0-litre-diesel-review-australian-first-drive/", "reputable_media", "medium"),
  age: sumField("eligible", "Tank 500 production began 2022; Kenya's 8-year age limit is satisfied by current-generation units.",
    "market sub-site importrules.json (8-year age limit, KEBS/KRA)", null, "regulatory", "medium"),
  pw: sumField("noted", "Combustion (ICE) 3.0T V6 / 3.0T diesel — subject to standard 25% import duty; no EV-specific relief.",
    "Data sub-site models.json (export intelligence)", "https://data.chinausedautohub.com/models/", "database", "medium"),
  imp: impField("conformity_required", ["Pre-Export Verification of Conformity (PVoC)"],
    "PVoC pre-shipment inspection required before export.",
    "market sub-site importrules.json (PVoC, KEBS)", null, "regulatory", "medium"),
  duty: dutyField("ke-duty", null, "ke-vat", false, "ICE: 25% standard + 16% VAT; no EV-specific relief. Referenced from taxrules.json — verify with KRA.",
    "market sub-site taxrules.json (referenced, not copied)", "https://www.kra.go.ke", "government", "low"),
  route: routeField(["cn-tianjin-to-ke-mombasa", "cn-shanghai-to-ke-mombasa"], "Sea freight to Mombasa (RoRo).",
    "market sub-site routes.json (referenced, not copied)", null, "industry", "low"),
  mc: sumField("noted", "GWM Tank 500 is a full-size body-on-frame 7-seat SUV; RHD production in Thailand/Australia makes Kenya sourcing viable.",
    "Data sub-site models.json (export intelligence)", "https://www.drive.com.au/reviews/2026-gwm-tank-500-3-0-litre-diesel-review-australian-first-drive/", "reputable_media", "medium")
}));

// 2) haval-h9 × tanzania (ICE RHD needs_conversion + age borderline)
relations.push(relation("haval-h9", "tanzania", {
  drive: sumField("needs_conversion",
    "Tanzania registers RHD only. GWM sells the Haval H9 in right-hand drive in Australia and New Zealand — source a RHD unit rather than converting a China LHD unit.",
    "Haval H9 Australia/New Zealand RHD market (reputable media)", "https://www.carsales.com.au/cars/haval/h9/", "reputable_media", "medium"),
  age: sumField("borderline",
    "Haval H9 production began 2015; Tanzania's age limit (~8-10 years) means 2015-2017 units are now ~8-11 years old (borderline/over), 2018+ units safer. Verify the exact cut-off with TRA.",
    "market sub-site importrules.json (age limit ~8-10 years, TRA)", null, "regulatory", "medium"),
  pw: sumField("noted", "Combustion (ICE) 2.0T — subject to standard 25% import duty + 18% VAT; no EV-specific relief.",
    "Data sub-site models.json (export intelligence)", "https://data.chinausedautohub.com/models/", "database", "medium"),
  imp: impField("conformity_required", ["Pre-shipment inspection (PVoC)"],
    "PVoC pre-shipment verification through the Tanzania Bureau of Standards required.",
    "market sub-site importrules.json (PVoC, TBS)", null, "regulatory", "medium"),
  duty: dutyField("tz-duty", null, "tz-vat", false, "ICE: 25% standard + 18% VAT; no EV-specific relief. Referenced from taxrules.json — verify with TRA.",
    "market sub-site taxrules.json (referenced, not copied)", "https://www.tra.go.tz", "government", "low"),
  route: routeField(["cn-tianjin-to-tz-dar-es-salaam", "cn-shanghai-to-tz-dar-es-salaam"], "Sea freight to Dar es Salaam (RoRo).",
    "market sub-site routes.json (referenced, not copied)", null, "industry", "low"),
  mc: sumField("noted", "Haval H9 is a full-size body-on-frame 4WD SUV; RHD production in Australia/New Zealand makes Tanzania sourcing viable.",
    "Data sub-site models.json (export intelligence)", "https://www.carsales.com.au/cars/haval/h9/", "reputable_media", "medium")
}));

// 3) jetour-dashing × nigeria (ICE RHD needs_conversion)
relations.push(relation("jetour-dashing", "nigeria", {
  drive: sumField("needs_conversion",
    "Nigeria registers RHD only. Jetour debuted RHD Dashing models in South Africa in September 2024 — source a RHD unit rather than converting a China LHD unit.",
    "Jetour RHD South Africa launch (manufacturer PR / reputable media)", "https://jetour.co.za/dashing/", "manufacturer", "medium"),
  age: sumField("eligible", "Jetour Dashing production began 2022; current-generation units are within Nigeria's age restriction (rules recently changed — confirm with Nigeria Customs).",
    "market sub-site importrules.json (age restriction, Nigeria Customs)", null, "regulatory", "low"),
  pw: sumField("noted", "Combustion (ICE) 1.6T — subject to standard import duty; no EV-specific relief.",
    "Data sub-site models.json (export intelligence)", "https://data.chinausedautohub.com/models/", "database", "medium"),
  imp: impField("conformity_required", ["Pre-shipment inspection (SONCAP / Form M)"],
    "Nigeria import clearance and pre-shipment inspection (SONCAP/Form M) apply.",
    "market sub-site importrules.json (SONCAP / Form M)", null, "regulatory", "low"),
  duty: dutyField("ng-duty", null, "ng-vat", false, "ICE: 20% standard + 7.5% VAT; no EV-specific relief. Referenced from taxrules.json — verify with Nigeria Customs.",
    "market sub-site taxrules.json (referenced, not copied)", "https://customs.gov.ng", "government", "low"),
  route: routeField(["cn-tianjin-to-ng-lagos", "cn-guangzhou-to-ng-tincan"], "Sea freight to Lagos (RoRo).",
    "market sub-site routes.json (referenced, not copied)", null, "industry", "low"),
  mc: sumField("noted", "Jetour Dashing is a compact crossover; RHD debut in South Africa (2024) makes Nigeria sourcing viable.",
    "Data sub-site models.json (export intelligence)", "https://jetour.co.za/dashing/", "manufacturer", "medium")
}));

// EV RHD (aion-y-plus / neta-x / wuling-bingo) × kenya + nigeria
function evPair(model_id, brand, name, country) {
  const isKenya = country === "kenya";
  const cname = isKenya ? "Kenya" : "Nigeria";
  return relation(model_id, country, {
    drive: sumField("needs_conversion",
      `${cname} registers RHD only. ${brand} ${name} is produced in right-hand drive (${isKenya ? "Thailand/Malaysia/Indonesia for Aion; Thailand for Neta; Indonesia/UK/Africa/ASEAN/Caribbean for Wuling" : "Thailand/Malaysia/Indonesia for Aion; Thailand for Neta; Indonesia/UK/Africa/ASEAN/Caribbean for Wuling"}) — source a RHD unit rather than converting a China LHD unit.`,
      brand + " " + name + " RHD production (see model page)", "https://data.chinausedautohub.com/models/" + model_id + "/", "reputable_media", "medium"),
    age: sumField("eligible", `${name} production began within the last ~5 years; the destination age limit is satisfied by current-generation units.`,
      "market sub-site importrules.json (age limit)", null, "regulatory", "low"),
    pw: sumField("noted", isKenya
        ? "Battery-electric (EV) — Kenya applies reduced EV import duty (10% vs 25%) and excise relief under the EAC CET."
        : "Battery-electric (EV) — Nigeria's EV duty policy is developing; no confirmed EV-specific duty rate recorded. RHD availability is the primary increment.",
      "Data sub-site models.json (export intelligence)", "https://data.chinausedautohub.com/models/", "database", "low"),
    ev: evField("GB/T", "CCS2 / CHAdeMO", "GB/T AC / GB/T DC (vehicle inlet)", true,
      `China-market GB/T inlet vs ${cname} CCS2/CHAdeMO network — adapter required; regional RHD units may carry other inlets (confirm the sourced unit).`,
      "Vehicle: GB/T charging standard (Wikipedia); Destination: CCS2/CHAdeMO (Wikipedia)", "https://en.wikipedia.org/wiki/GB/T_charging_standard", "reputable_media", "medium"),
    imp: isKenya
      ? impField("conformity_required", ["Pre-Export Verification of Conformity (PVoC)"],
          "PVoC pre-shipment inspection required; EV duty relief (10% vs 25%) applies under the EAC CET.",
          "market sub-site importrules.json (PVoC, KEBS)", null, "regulatory", "medium")
      : impField("conformity_required", ["Pre-shipment inspection (SONCAP / Form M)"],
          "Nigeria import clearance and pre-shipment inspection (SONCAP/Form M) apply; EV duty policy developing.",
          "market sub-site importrules.json (SONCAP / Form M)", null, "regulatory", "low"),
    duty: isKenya
      ? dutyField("ke-duty", "ke-ev-duty", "ke-vat", true, "EV: 10% (EAC CET reduced) vs 25% standard + 16% VAT. Referenced from taxrules.json — verify with KRA.",
          "market sub-site taxrules.json (referenced, not copied)", "https://www.kra.go.ke", "government", "low")
      : dutyField("ng-duty", null, "ng-vat", false, "EV/ICE: 20% standard + 7.5% VAT; no confirmed EV-specific duty rate. Referenced from taxrules.json — verify with Nigeria Customs.",
          "market sub-site taxrules.json (referenced, not copied)", "https://customs.gov.ng", "government", "low"),
    route: isKenya
      ? routeField(["cn-tianjin-to-ke-mombasa", "cn-shanghai-to-ke-mombasa"], "Sea freight to Mombasa (RoRo).",
          "market sub-site routes.json (referenced, not copied)", null, "industry", "low")
      : routeField(["cn-tianjin-to-ng-lagos", "cn-guangzhou-to-ng-tincan"], "Sea freight to Lagos (RoRo).",
          "market sub-site routes.json (referenced, not copied)", null, "industry", "low"),
    mc: sumField("noted", `${brand} ${name} is a compact EV; RHD production makes ${cname} sourcing viable — confirm whether the sourced unit carries a GB/T or CCS2 inlet.`,
      "Data sub-site models.json (export intelligence)", "https://data.chinausedautohub.com/models/" + model_id + "/", "reputable_media", "medium")
  });
}

relations.push(evPair("aion-y-plus", "Aion", "Y Plus", "kenya"));
relations.push(evPair("aion-y-plus", "Aion", "Y Plus", "nigeria"));
relations.push(evPair("neta-x", "Neta", "X", "kenya"));
relations.push(evPair("neta-x", "Neta", "X", "nigeria"));
relations.push(evPair("wuling-bingo", "Wuling", "Bingo", "kenya"));
relations.push(evPair("wuling-bingo", "Wuling", "Bingo", "nigeria"));

for (const rel of relations) {
  if (!vm.relations.some(x => x.vehicle_id === rel.vehicle_id && x.country_id === rel.country_id)) vm.relations.push(rel);
}

const skips = [
  { vehicle_id: "zeekr-x", country_id: "kenya", reason: "EV × RHD — Zeekr brand RHD already represented by zeekr-001 × kenya/nigeria; mechanical brand cross-product (avoid)." },
  { vehicle_id: "nio-es8", country_id: "uae", reason: "EV × LHD Europe-only (EL8) — no RHD, no GCC entry evidence; charging-only delta already represented; no independent increment (avoid)." },
  { vehicle_id: "chery-arrizo-8", country_id: "saudi-arabia", reason: "ICE × LHD sedan, 2022 start age-eligible (no age conflict), no RHD/EV — pure compatible pair, no independent increment (avoid)." },
  { vehicle_id: "changan-cs55-plus", country_id: "kazakhstan", reason: "PHEV × LHD — EV/PHEV duty classification already represented by byd-song-plus × kazakhstan; mechanical PHEV cross-product (avoid)." },
  { vehicle_id: "changan-uni-k", country_id: "kazakhstan", reason: "PHEV (iDD) × LHD — EV/PHEV duty classification already represented by byd-song-plus × kazakhstan; mechanical PHEV cross-product (avoid)." }
];
for (const s of skips) {
  if (!vm.skipped.some(x => x.vehicle_id === s.vehicle_id && x.country_id === s.country_id)) vm.skipped.push(s);
}

vm.meta.batch = "P3.8 (phase2/49 - Vehicle x Market Intelligence, batch 6 — vehicle-market-b6)";
vm.meta.updated = CHECKED;

fs.writeFileSync("shared/data/vehicle-market.json", JSON.stringify(vm, null, 2) + "\n");
console.log("relations now", vm.relations.length, "| skipped now", vm.skipped.length);
const relSet = new Set(vm.relations.map(x => x.vehicle_id + "×" + x.country_id));
const overlap = vm.skipped.filter(s => relSet.has(s.vehicle_id + "×" + s.country_id));
console.log("skipped∩relations overlap:", overlap.length);
