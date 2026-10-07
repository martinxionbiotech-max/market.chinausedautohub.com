// Batch 10 — market repo: sync Tesla brand/model + add Vehicle×Market relations (delta-only)
const fs = require("fs");
const CHECKED = "2026-10-07";

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
  { brand_id: "tesla", name: "Tesla", name_zh: "特斯拉", origin_country: "US", founded: 2003, powertrains: ["ev"], vehicle_types: ["suv", "sedan"], source: "Official brand history", source_url: "https://www.tesla.cn/", source_date: CHECKED, confidence: "high" }
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
      trims: [{ trim_id: model_id + "-g1-" + powertrain, name: trimName, powertrain, production_years: years, specs, spec_source: specSrc, spec_source_url: specUrl, spec_source_date: "2026-10-06", confidence: "medium" }]
    }],
    source: specSrc, source_url: specUrl, source_date: "2026-10-06", confidence: "medium"
  };
}
const newModels = [
  gen("tesla-model-3", "tesla", "Model 3", "特斯拉Model 3", "sedan", [2017, 2025], "RWD 60 kWh", "ev",
    { motor_power_kw: 208, battery_capacity_kwh: 60, range_km: 438, drive_type: "rwd", seats: 5 },
    "Automotive specifications database",
    "https://www.ultimatespecs.com/car-specs/Tesla/136950/Tesla-Model-3-2023-RWD-60-kWh.html")
];
for (const m of newModels) if (!models.models.some(x => x.model_id === m.model_id)) models.models.push(m);
fs.writeFileSync("shared/data/models.json", JSON.stringify(models, null, 1) + "\n");
console.log("models now", models.models.length);

// ==================== 3. vehicle-market.json ====================
const vm = JSON.parse(fs.readFileSync("shared/data/vehicle-market.json", "utf8"));
const relations = [];

const RHD_SOURCE_URL = "https://www.teslarati.com/tesla-model-3-highland-rhd-export-fleet-shanghai-south-port-video/";

// EV RHD helper (Kenya/Nigeria/Tanzania — Kenya 10% EV relief; Nigeria no relief; Tanzania excise-only)
function evRhdPair(country) {
  const cfg = {
    kenya: {
      cname: "Kenya",
      pw: "Battery-electric (EV) — Kenya applies reduced EV import duty (10% vs 25%) under the EAC CET.",
      imp: impField("conformity_required", ["Pre-Export Verification of Conformity (PVoC)"],
        "PVoC pre-shipment inspection required; EV duty relief (10% vs 25%) applies under the EAC CET.",
        "market sub-site importrules.json (PVoC, KEBS)", null, "regulatory", "medium"),
      duty: dutyField("ke-duty", "ke-ev-duty", "ke-vat", true,
        "EV: 10% (EAC CET reduced) vs 25% standard + 16% VAT. Referenced from taxrules.json — verify with KRA.",
        "market sub-site taxrules.json (referenced, not copied)", "https://www.kra.go.ke", "government", "low"),
      route: routeField(["cn-tianjin-to-ke-mombasa", "cn-shanghai-to-ke-mombasa"], "Sea freight to Mombasa (RoRo).",
        "market sub-site routes.json (referenced, not copied)", null, "industry", "low")
    },
    nigeria: {
      cname: "Nigeria",
      pw: "Battery-electric (EV) — Nigeria's EV duty policy is developing; no confirmed EV-specific duty rate recorded. RHD availability is the primary increment.",
      imp: impField("conformity_required", ["Pre-shipment inspection (SONCAP / Form M)"],
        "Nigeria import clearance and pre-shipment inspection (SONCAP/Form M) apply; EV duty policy developing.",
        "market sub-site importrules.json (SONCAP / Form M)", null, "regulatory", "low"),
      duty: dutyField("ng-duty", null, "ng-vat", false,
        "EV/ICE: 20% standard + 7.5% VAT; no confirmed EV-specific duty rate. Referenced from taxrules.json — verify with Nigeria Customs.",
        "market sub-site taxrules.json (referenced, not copied)", "https://customs.gov.ng", "government", "low"),
      route: routeField(["cn-tianjin-to-ng-lagos", "cn-guangzhou-to-ng-tincan"], "Sea freight to Lagos (RoRo).",
        "market sub-site routes.json (referenced, not copied)", null, "industry", "low")
    },
    tanzania: {
      cname: "Tanzania",
      pw: "Battery-electric (EV) — Tanzania has introduced reduced EV excise but records no EV-specific import-duty rate (25% standard duty + 18% VAT). Confirm current EV policy with TRA.",
      imp: impField("conformity_required", ["Pre-shipment inspection (PVoC)"],
        "Tanzania import clearance and pre-shipment inspection (PVoC) apply; EV excise incentives introduced but no EV-specific duty rate recorded.",
        "market sub-site importrules.json (PVoC, TBS)", null, "regulatory", "low"),
      duty: dutyField("tz-duty", null, "tz-vat", false,
        "EV/ICE: 25% standard + 18% VAT; no EV-specific duty rate recorded. Referenced from taxrules.json — verify with TRA.",
        "market sub-site taxrules.json (referenced, not copied)", "https://www.tra.go.tz", "government", "low"),
      route: routeField(["cn-tianjin-to-tz-dar-es-salaam", "cn-shanghai-to-tz-dar-es-salaam"], "Sea freight to Dar es Salaam (RoRo).",
        "market sub-site routes.json (referenced, not copied)", null, "industry", "low")
    }
  }[country];

  return relation("tesla-model-3", country, {
    drive: sumField("needs_conversion",
      `${cfg.cname} registers RHD only. Tesla Model 3 is produced in right-hand drive at Giga Shanghai for the UK, Australia, New Zealand, Japan and Singapore — source a RHD unit rather than converting a China LHD unit.`,
      "Tesla Model 3 RHD production (see model page)", RHD_SOURCE_URL, "reputable_media", "medium"),
    age: sumField("eligible", "Model 3 production began in 2017; the destination age limit is satisfied by current-generation units.",
      "market sub-site importrules.json (age limit)", null, "regulatory", "low"),
    pw: sumField("noted", cfg.pw, "Data sub-site models.json (export intelligence)", "https://data.chinausedautohub.com/models/", "database", "low"),
    ev: evField("GB/T", "CCS2 / CHAdeMO", "GB/T AC / GB/T DC (vehicle inlet)", true,
      `China-market GB/T inlet vs ${cfg.cname} CCS2/CHAdeMO network — adapter required; RHD export units (UK/AU/NZ) carry CCS2 (confirm the sourced unit).`,
      "Vehicle: GB/T charging standard (Wikipedia); Destination: CCS2/CHAdeMO (Wikipedia)", "https://en.wikipedia.org/wiki/GB/T_charging_standard", "reputable_media", "medium"),
    imp: cfg.imp,
    duty: cfg.duty,
    route: cfg.route,
    mc: sumField("noted", `Tesla Model 3 is an electric vehicle; RHD production makes ${cfg.cname} sourcing viable — confirm whether the sourced unit carries a GB/T or CCS2 inlet.`,
      "Data sub-site models.json (export intelligence)", "https://data.chinausedautohub.com/models/tesla-model-3/", "reputable_media", "medium")
  });
}

relations.push(evRhdPair("kenya"));
relations.push(evRhdPair("nigeria"));
relations.push(evRhdPair("tanzania"));

for (const rel of relations) {
  if (!vm.relations.some(x => x.vehicle_id === rel.vehicle_id && x.country_id === rel.country_id)) vm.relations.push(rel);
}

// ---- vetoes (skips) — no independent increment beyond represented pairs ----
const skips = [
  { vehicle_id: "tesla-model-y", country_id: "kenya", reason: "EV × RHD — Tesla brand RHD already represented by tesla-model-3 × kenya/nigeria/tanzania; mechanical brand cross-product (avoid)." },
  { vehicle_id: "tesla-model-y", country_id: "nigeria", reason: "EV × RHD — Tesla brand RHD already represented by tesla-model-3; mechanical brand cross-product (avoid)." },
  { vehicle_id: "tesla-model-y", country_id: "tanzania", reason: "EV × RHD — Tesla brand RHD already represented by tesla-model-3; mechanical brand cross-product (avoid)." },
  { vehicle_id: "tesla-model-3", country_id: "kazakhstan", reason: "EV × LHD — EV-duty delta already represented by byd-atto-3 × kazakhstan; Tesla's RHD increment is covered by the Kenya/Nigeria/Tanzania pairs (avoid mechanical EV cross-product)." },
  { vehicle_id: "li-auto-l6", country_id: "kazakhstan", reason: "EREV × LHD — EREV classification already represented by li-auto-l7/l9 (Li Auto brand); L6 adds no new increment (avoid)." },
  { vehicle_id: "aito-m7", country_id: "kazakhstan", reason: "EREV × LHD — EREV classification already represented by li-auto-l7 (EREV×LHD exemplar); AITO is LHD-only with no RHD production (avoid)." },
  { vehicle_id: "aito-m9", country_id: "kazakhstan", reason: "EREV × LHD — EREV classification already represented by li-auto-l7 (EREV×LHD exemplar); AITO is LHD-only with no RHD production (avoid)." },
  { vehicle_id: "seres-5", country_id: "uae", reason: "EV/EREV × LHD — no UAE EV duty relief recorded; EREV×LHD already represented; Seres is LHD-only with no RHD production (avoid)." },
  { vehicle_id: "xiaomi-yu7", country_id: "kazakhstan", reason: "EV × LHD-only — no RHD production and overseas export programme only emerging; EV-duty delta already represented by byd-atto-3 × kazakhstan (avoid)." },
  { vehicle_id: "fangchengbao-bao-5", country_id: "kenya", reason: "PHEV × RHD — sold overseas as the Denza B5; Denza brand RHD already represented by denza-d9/n7, and Bao 5 RHD production is unconfirmed (avoid)." }
];
for (const s of skips) {
  if (!vm.skipped.some(x => x.vehicle_id === s.vehicle_id && x.country_id === s.country_id)) vm.skipped.push(s);
}

vm.meta.batch = "P3.8 (phase2/49 - Vehicle x Market Intelligence, batch 10 — vehicle-market-b10)";
vm.meta.updated = CHECKED;

fs.writeFileSync("shared/data/vehicle-market.json", JSON.stringify(vm, null, 2) + "\n");
console.log("relations now", vm.relations.length, "| skipped now", vm.skipped.length);
const relSet = new Set(vm.relations.map(x => x.vehicle_id + "×" + x.country_id));
const overlap = vm.skipped.filter(s => relSet.has(s.vehicle_id + "×" + s.country_id));
console.log("skipped∩relations overlap:", overlap.length);
