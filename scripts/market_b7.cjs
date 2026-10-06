// Batch 7 — market repo: sync new brands/models + add Vehicle×Market relations (delta-only)
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
  { brand_id: "hongqi", name: "Hongqi", name_zh: "红旗", origin_country: "CN", founded: 1958, powertrains: ["ev", "ice"], vehicle_types: ["sedan", "suv"], source: "Official brand history", source_url: "https://www.hongqi-auto.com/", source_date: CHECKED, confidence: "high" },
  { brand_id: "avatr", name: "Avatr", name_zh: "阿维塔", origin_country: "CN", founded: 2018, powertrains: ["ev"], vehicle_types: ["suv", "sedan"], source: "Official brand history", source_url: "https://www.avatr.com/", source_date: CHECKED, confidence: "high" },
  { brand_id: "baic", name: "BAIC", name_zh: "北汽", origin_country: "CN", founded: 1958, powertrains: ["ice"], vehicle_types: ["suv"], source: "Official brand history", source_url: "https://www.baicmotor.com/", source_date: CHECKED, confidence: "high" }
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
  gen("denza-n7", "denza", "Denza N7", "腾势N7", "suv", [2023, 2025], "91.3 kWh RWD", "ev", { motor_power_kw: 230, battery_capacity_kwh: 91.3, range_km: 702, drive_type: "rwd", seats: 5 }, "Automotive specifications database", "https://www.auto-data.net/en/denza-n7-91.3-kwh-313hp-electric-52266"),
  gen("hongqi-e-hs9", "hongqi", "Hongqi E-HS9", "红旗E-HS9", "suv", [2020, 2025], "84 kWh AWD 7-Seat", "ev", { motor_power_kw: 320, battery_capacity_kwh: 84, range_km: 396, drive_type: "awd", seats: 7 }, "Automotive specifications database", "https://www.auto-data.net/en/hongqi-e-hs9-84-kwh-435hp-awd-7-seat-45523"),
  gen("avatr-11", "avatr", "Avatr 11", "阿维塔11", "suv", [2022, 2025], "EV RWD", "ev", { motor_power_kw: 230, battery_capacity_kwh: 90.38, range_km: 555, drive_type: "rwd", seats: 5 }, "Reputable media specifications", "https://en.wikipedia.org/wiki/Avatr_11"),
  gen("gac-emkoo", "gac", "GAC Emkoo", "影酷", "suv", [2022, 2025], "1.5T", "ice", { engine: "1.5T", engine_displacement_cc: 1497, transmission: "7-speed DCT", drive_type: "fwd", seats: 5 }, "Reputable media specifications", "https://en.wikipedia.org/wiki/GAC_Emkoo"),
  gen("baic-bj40", "baic", "BAIC BJ40", "北汽BJ40", "suv", [2013, 2025], "2.0T 8AT", "ice", { engine: "2.0T", transmission: "8-speed automatic", drive_type: "awd", seats: 5 }, "Reputable media specifications", "https://en.wikipedia.org/wiki/Beijing_BJ40")
];
for (const m of newModels) if (!models.models.some(x => x.model_id === m.model_id)) models.models.push(m);
fs.writeFileSync("shared/data/models.json", JSON.stringify(models, null, 1) + "\n");
console.log("models now", models.models.length);

// ==================== 3. vehicle-market.json ====================
const vm = JSON.parse(fs.readFileSync("shared/data/vehicle-market.json", "utf8"));
const relations = [];

// EV RHD helpers (Kenya 10% EV duty relief / Nigeria no relief)
function evRhdPair(model_id, brand, name, country, rbdNote) {
  const isKenya = country === "kenya";
  const cname = isKenya ? "Kenya" : "Nigeria";
  return relation(model_id, country, {
    drive: sumField("needs_conversion",
      `${cname} registers RHD only. ${brand} ${name} is produced in right-hand drive (${rbdNote}) — source a RHD unit rather than converting a China LHD unit.`,
      brand + " " + name + " RHD production (see model page)", "https://data.chinausedautohub.com/models/" + model_id + "/", "reputable_media", "medium"),
    age: sumField("eligible", `${name} production began within the last ~5 years; the destination age limit is satisfied by current-generation units.`,
      "market sub-site importrules.json (age limit)", null, "regulatory", "low"),
    pw: sumField("noted", isKenya
        ? "Battery-electric (EV) — Kenya applies reduced EV import duty (10% vs 25%) under the EAC CET."
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
    mc: sumField("noted", `${brand} ${name} is an electric SUV; RHD production makes ${cname} sourcing viable — confirm whether the sourced unit carries a GB/T or CCS2 inlet.`,
      "Data sub-site models.json (export intelligence)", "https://data.chinausedautohub.com/models/" + model_id + "/", "reputable_media", "medium")
  });
}

// 1-2) denza-n7 (EV RHD Thailand/Singapore)
relations.push(evRhdPair("denza-n7", "Denza", "N7", "kenya", "Thailand (via Rêver Automotive) and Singapore"));
relations.push(evRhdPair("denza-n7", "Denza", "N7", "nigeria", "Thailand (via Rêver Automotive) and Singapore"));

// 3-4) hongqi-e-hs9 (EV RHD 2026 Singapore/Thailand/Indonesia/HK)
relations.push(evRhdPair("hongqi-e-hs9", "Hongqi", "E-HS9", "kenya", "a 2026 facelift launched in Singapore, with Thailand, Indonesia and Hong Kong announced"));
relations.push(evRhdPair("hongqi-e-hs9", "Hongqi", "E-HS9", "nigeria", "a 2026 facelift launched in Singapore, with Thailand, Indonesia and Hong Kong announced"));

// 5-6) avatr-11 (EV RHD Thailand)
relations.push(evRhdPair("avatr-11", "Avatr", "11", "kenya", "Thailand (RHD version launched September 2024)"));
relations.push(evRhdPair("avatr-11", "Avatr", "11", "nigeria", "Thailand (RHD version launched September 2024)"));

// 7) gac-emkoo × kenya (ICE RHD South Africa)
relations.push(relation("gac-emkoo", "kenya", {
  drive: sumField("needs_conversion",
    "Kenya registers RHD only. GAC sells the Emkoo in right-hand drive in South Africa and Caribbean RHD markets — source a RHD unit rather than converting a China LHD unit.",
    "GAC Emkoo RHD South Africa/Caribbean (manufacturer)", "https://en.wikipedia.org/wiki/GAC_Emkoo", "reputable_media", "medium"),
  age: sumField("eligible", "Emkoo production began 2022; Kenya's 8-year age limit is satisfied by current-generation units.",
    "market sub-site importrules.json (8-year age limit, KEBS/KRA)", null, "regulatory", "medium"),
  pw: sumField("noted", "Combustion (ICE) 1.5T — subject to standard 25% import duty; no EV-specific relief.",
    "Data sub-site models.json (export intelligence)", "https://data.chinausedautohub.com/models/", "database", "medium"),
  imp: impField("conformity_required", ["Pre-Export Verification of Conformity (PVoC)"],
    "PVoC pre-shipment inspection required before export.",
    "market sub-site importrules.json (PVoC, KEBS)", null, "regulatory", "medium"),
  duty: dutyField("ke-duty", null, "ke-vat", false, "ICE: 25% standard + 16% VAT; no EV-specific relief. Referenced from taxrules.json — verify with KRA.",
    "market sub-site taxrules.json (referenced, not copied)", "https://www.kra.go.ke", "government", "low"),
  route: routeField(["cn-tianjin-to-ke-mombasa", "cn-shanghai-to-ke-mombasa"], "Sea freight to Mombasa (RoRo).",
    "market sub-site routes.json (referenced, not copied)", null, "industry", "low"),
  mc: sumField("noted", "GAC Emkoo is a compact SUV; RHD production in South Africa/Caribbean makes Kenya sourcing viable.",
    "Data sub-site models.json (export intelligence)", "https://en.wikipedia.org/wiki/GAC_Emkoo", "reputable_media", "medium")
}));

// 8) baic-bj40 × nigeria (ICE RHD South Africa)
relations.push(relation("baic-bj40", "nigeria", {
  drive: sumField("needs_conversion",
    "Nigeria registers RHD only. BAIC sells the BJ40 (B40 Plus) in right-hand drive in South Africa — source a RHD unit rather than converting a China LHD unit.",
    "BAIC B40 Plus RHD South Africa (manufacturer)", "https://en.wikipedia.org/wiki/Beijing_BJ40", "reputable_media", "medium"),
  age: sumField("eligible", "BJ40 production began 2013 but current-generation units are within Nigeria's age restriction; confirm the exact cut-off (rules recently changed).",
    "market sub-site importrules.json (age restriction, Nigeria Customs)", null, "regulatory", "low"),
  pw: sumField("noted", "Combustion (ICE) 2.0T — subject to standard 20% import duty; no EV-specific relief.",
    "Data sub-site models.json (export intelligence)", "https://data.chinausedautohub.com/models/", "database", "medium"),
  imp: impField("conformity_required", ["Pre-shipment inspection (SONCAP / Form M)"],
    "Nigeria import clearance and pre-shipment inspection (SONCAP/Form M) apply.",
    "market sub-site importrules.json (SONCAP / Form M)", null, "regulatory", "low"),
  duty: dutyField("ng-duty", null, "ng-vat", false, "ICE: 20% standard + 7.5% VAT; no EV-specific relief. Referenced from taxrules.json — verify with Nigeria Customs.",
    "market sub-site taxrules.json (referenced, not copied)", "https://customs.gov.ng", "government", "low"),
  route: routeField(["cn-tianjin-to-ng-lagos", "cn-guangzhou-to-ng-tincan"], "Sea freight to Lagos (RoRo).",
    "market sub-site routes.json (referenced, not copied)", null, "industry", "low"),
  mc: sumField("noted", "BAIC BJ40 is a body-on-frame off-road SUV; RHD production in South Africa makes Nigeria sourcing viable.",
    "Data sub-site models.json (export intelligence)", "https://en.wikipedia.org/wiki/Beijing_BJ40", "reputable_media", "medium")
}));

for (const rel of relations) {
  if (!vm.relations.some(x => x.vehicle_id === rel.vehicle_id && x.country_id === rel.country_id)) vm.relations.push(rel);
}

const skips = [
  { vehicle_id: "xiaomi-su7", country_id: "kenya", reason: "EV × LHD-only, no RHD production and no official export programme — drive-side mismatch (LHD-only) already represented; no independent increment beyond the model-page note (avoid)." },
  { vehicle_id: "hongqi-h9", country_id: "kenya", reason: "ICE × RHD — Hongqi H9 RHD is 'announced for ASEAN but limited availability', not verified production; RHD claim deferred until confirmed (avoid)." },
  { vehicle_id: "byd-song-pro", country_id: "kenya", reason: "PHEV × RHD — BYD PHEV RHD delta already represented by byd-song-plus × kenya; mechanical BYD PHEV cross-product (avoid)." },
  { vehicle_id: "byd-qin-l", country_id: "kenya", reason: "PHEV × RHD — BYD PHEV RHD delta already represented by byd-song-plus/qin-plus × kenya/nigeria; mechanical BYD PHEV cross-product (avoid)." },
  { vehicle_id: "byd-frigate-07", country_id: "kenya", reason: "PHEV × RHD — BYD PHEV RHD delta already represented by byd-song-plus × kenya; mechanical BYD PHEV cross-product (avoid)." },
  { vehicle_id: "byd-destroyer-05", country_id: "nigeria", reason: "PHEV × RHD — BYD PHEV RHD delta already represented by byd-qin-plus × nigeria; mechanical BYD PHEV cross-product (avoid)." },
  { vehicle_id: "avatr-12", country_id: "kenya", reason: "EV × RHD — Avatr brand RHD already represented by avatr-11 × kenya/nigeria; mechanical brand cross-product (avoid)." },
  { vehicle_id: "gac-gs8", country_id: "saudi-arabia", reason: "ICE × Saudi 5-year-age (ineligible) delta already represented by changan-cs75-plus × saudi-arabia; no RHD/EV increment (avoid)." },
  { vehicle_id: "hongqi-h5", country_id: "kenya", reason: "ICE × RHD — Hongqi H5 is LHD-only (Africa/ME/SEA export); drive-side mismatch already represented by chery-tiggo-8 × kenya (avoid)." },
  { vehicle_id: "lynk-co-01", country_id: "kenya", reason: "ICE × RHD — Lynk & Co 01 is LHD-only (Europe subscription); no RHD production evidence, drive-side mismatch already represented (avoid)." }
];
for (const s of skips) {
  if (!vm.skipped.some(x => x.vehicle_id === s.vehicle_id && x.country_id === s.country_id)) vm.skipped.push(s);
}

vm.meta.batch = "P3.8 (phase2/49 - Vehicle x Market Intelligence, batch 7 — vehicle-market-b7)";
vm.meta.updated = CHECKED;

fs.writeFileSync("shared/data/vehicle-market.json", JSON.stringify(vm, null, 2) + "\n");
console.log("relations now", vm.relations.length, "| skipped now", vm.skipped.length);
const relSet = new Set(vm.relations.map(x => x.vehicle_id + "×" + x.country_id));
const overlap = vm.skipped.filter(s => relSet.has(s.vehicle_id + "×" + s.country_id));
console.log("skipped∩relations overlap:", overlap.length);
