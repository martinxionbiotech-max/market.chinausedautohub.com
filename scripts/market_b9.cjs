// Batch 9 — market repo: sync new RHD/EREV brands/models + add Vehicle×Market relations (delta-only)
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
  { brand_id: "dongfeng", name: "Dongfeng", name_zh: "东风", origin_country: "CN", founded: 1969, powertrains: ["ice"], vehicle_types: ["sedan", "suv"], source: "Official brand history", source_url: "https://www.dongfeng-global.com/", source_date: CHECKED, confidence: "high" },
  { brand_id: "faw", name: "FAW (Bestune)", name_zh: "一汽奔腾", origin_country: "CN", founded: 1953, powertrains: ["ice"], vehicle_types: ["suv"], source: "Official brand history", source_url: "https://www.faw.com.cn/", source_date: CHECKED, confidence: "high" },
  { brand_id: "roewe", name: "Roewe", name_zh: "荣威", origin_country: "CN", founded: 2006, powertrains: ["ice"], vehicle_types: ["suv", "sedan"], source: "Official brand history", source_url: "https://www.roewe.com.cn/", source_date: CHECKED, confidence: "high" },
  { brand_id: "yangwang", name: "Yangwang", name_zh: "仰望", origin_country: "CN", founded: 2023, powertrains: ["erev"], vehicle_types: ["suv"], source: "Official brand history", source_url: "https://www.yangwangauto.com/", source_date: CHECKED, confidence: "high" }
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
  gen("dongfeng-forthing-t5", "dongfeng", "Forthing T5 Evo", "风行T5 EVO", "suv", [2020, 2025], "1.5T DCT", "ice", { engine: "1.5T", engine_displacement_cc: 1481, transmission: "7-speed DCT", drive_type: "fwd", seats: 5 }, "Automotive specifications database", "https://www.auto-data.net/en/forthing-t5-evo-1.5-td-197hp-dct-49898"),
  gen("faw-bestune-t77", "faw", "Bestune T77", "奔腾T77", "suv", [2018, 2025], "1.2T DCT", "ice", { engine: "1.2T", transmission: "7-speed DCT", drive_type: "fwd", seats: 5 }, "Automotive specifications database", "https://www.auto-data.net/en/bestune-t77-1.2-230-tid-143hp-dct-34983"),
  gen("roewe-rx5", "roewe", "Roewe RX5", "荣威RX5", "suv", [2016, 2025], "1.5T DCT", "ice", { engine: "1.5T", engine_displacement_cc: 1490, transmission: "7-speed DCT", drive_type: "fwd", seats: 5 }, "Automotive specifications database", "https://www.auto-data.net/en/roewe-rx5-generation-6336"),
  gen("yangwang-u8", "yangwang", "U8", "仰望U8", "suv", [2023, 2025], "2.0T Extended Range 4WD", "erev", { engine: "2.0T (range extender)", motor_power_kw: 880, battery_capacity_kwh: 49.05, range_km: 180, drive_type: "awd", seats: 5 }, "Automotive specifications database", "https://www.auto-data.net/en/yangwang-u8-2.0t-1197hp-extended-range-pure-electric-4wd-51283")
];
for (const m of newModels) if (!models.models.some(x => x.model_id === m.model_id)) models.models.push(m);
fs.writeFileSync("shared/data/models.json", JSON.stringify(models, null, 1) + "\n");
console.log("models now", models.models.length);

// ==================== 3. vehicle-market.json ====================
const vm = JSON.parse(fs.readFileSync("shared/data/vehicle-market.json", "utf8"));
const relations = [];

// ICE RHD helper (Kenya/Nigeria — no EV relief, RHD source is the increment)
function iceRhdPair(model_id, brand, name, country, rbdNote, bodyNote, rbdSourceUrl) {
  const isKenya = country === "kenya";
  const cname = isKenya ? "Kenya" : "Nigeria";
  return relation(model_id, country, {
    drive: sumField("needs_conversion",
      `${cname} registers RHD only. ${brand} ${name} is produced in right-hand drive (${rbdNote}) — source a RHD unit rather than converting a China LHD unit.`,
      brand + " " + name + " RHD production (see model page)", rbdSourceUrl, "manufacturer", "medium"),
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

// ---- dongfeng-forthing-t5: ICE SUV RHD Malaysia ----
relations.push(iceRhdPair("dongfeng-forthing-t5", "Dongfeng Forthing", "T5 Evo", "kenya", "Malaysia", "compact SUV", "https://www.bitauto.my/en/forthing/t5/"));
relations.push(iceRhdPair("dongfeng-forthing-t5", "Dongfeng Forthing", "T5 Evo", "nigeria", "Malaysia", "compact SUV", "https://www.bitauto.my/en/forthing/t5/"));

// ---- faw-bestune-t77: ICE SUV RHD South Africa ----
relations.push(iceRhdPair("faw-bestune-t77", "FAW Bestune", "T77", "kenya", "South Africa", "compact SUV", "https://www.bitauto.com/za/news/100187933731.html"));
relations.push(iceRhdPair("faw-bestune-t77", "FAW Bestune", "T77", "nigeria", "South Africa", "compact SUV", "https://www.bitauto.com/za/news/100187933731.html"));

// ---- roewe-rx5: ICE SUV RHD Philippines/Myanmar ----
relations.push(iceRhdPair("roewe-rx5", "Roewe", "RX5", "kenya", "the Philippines and Myanmar", "compact SUV", "https://www.chinamobil.ru/eng/roewe/rx5/"));
relations.push(iceRhdPair("roewe-rx5", "Roewe", "RX5", "nigeria", "the Philippines and Myanmar", "compact SUV", "https://www.chinamobil.ru/eng/roewe/rx5/"));

// ---- yangwang-u8: EREV LHD official MEA entry (UAE/Saudi) ----
function erevLhdPair(model_id, brand, name, country, entryNote, sourceUrl) {
  const isUae = country === "uae";
  const cname = isUae ? "UAE" : "Saudi Arabia";
  return relation(model_id, country, {
    drive: sumField("match",
      "China domestic-market production is left-hand drive (LHD); this market registers LHD only — no conversion required.",
      "Data sub-site models.json (export intelligence) + Left- and right-hand traffic (Wikipedia)", "https://en.wikipedia.org/wiki/Left-_and_right-hand_traffic", "database", "high"),
    age: null,
    pw: sumField("noted", isUae
        ? "Extended-range electric (EREV) — a distinct class from BEV and PHEV; the UAE records no EV-specific duty (5% standard + 5% VAT), so the increment is charging compatibility plus official premium-EREV market entry."
        : "Extended-range electric (EREV) — a distinct class from BEV and PHEV; Saudi Arabia records no EV-specific duty (5% standard + 15% VAT), so the increment is charging compatibility plus official premium-EREV market entry.",
      "Data sub-site models.json (export intelligence)", "https://data.chinausedautohub.com/models/", "database", "low"),
    ev: evField("GB/T", "CCS2 / Type 2 (Mennekes)", "GB/T AC / GB/T DC (vehicle inlet)", true,
      `China-market GB/T inlet vs ${cname} CCS2 / Type 2 network — adapter required; regional export units may carry a CCS2 inlet (confirm the sourced unit).`,
      "Vehicle: GB/T charging standard (Wikipedia); Destination: IEC 62196-2 Type 2 connector (Wikipedia)", "https://en.wikipedia.org/wiki/GB/T_charging_standard", "reputable_media", "medium"),
    imp: isUae
      ? impField("conformity_required", ["GCC specification"],
          "UAE requires GCC specification; non-GCC vehicles may need modification before registration. No universal age limit.",
          "market sub-site importrules.json (GCC specification)", null, "regulatory", "medium")
      : impField("conformity_required", ["SASO conformity", "SABER registration"],
          "SASO conformity and SABER registration required before shipment.",
          "market sub-site importrules.json (SABER/SASO)", null, "regulatory", "medium"),
    duty: isUae
      ? dutyField("uae-duty", null, "uae-vat", false, "No EV-specific duty recorded — 5% standard import duty + 5% VAT unless the EREV qualifies for EV treatment (confirm). Referenced from taxrules.json.",
          "market sub-site taxrules.json (referenced, not copied)", "https://www.dubaicustoms.gov.ae", "government", "low")
      : dutyField("sa-duty", null, "sa-vat", false, "No EV-specific duty — 5% standard import duty + 15% VAT; EREV classification to be confirmed. Referenced from taxrules.json.",
          "market sub-site taxrules.json (referenced, not copied)", "https://zatca.gov.sa", "government", "low"),
    route: isUae
      ? routeField(["cn-tianjin-to-ae-jebel-ali", "cn-shanghai-to-ae-jebel-ali"], "Sea freight to Jebel Ali (Dubai), RoRo.",
          "market sub-site routes.json (referenced, not copied)", null, "industry", "low")
      : routeField(["cn-qingdao-to-sa-dammam", "cn-shanghai-to-sa-jeddah"], "Sea freight to Dammam or Jeddah (RoRo).",
          "market sub-site routes.json (referenced, not copied)", null, "industry", "low"),
    mc: sumField("noted", `${brand} ${name} is BYD's premium extended-range luxury SUV; ${entryNote}.`,
      "Data sub-site models.json (export intelligence)", sourceUrl, "manufacturer", "medium")
  });
}
relations.push(erevLhdPair("yangwang-u8", "Yangwang", "U8", "uae", "officially launched in the UAE via Al-Futtaim (AED 650,900)", "https://www.yangwanguae.ae/en/"));
relations.push(erevLhdPair("yangwang-u8", "Yangwang", "U8", "saudi-arabia", "officially sold in Saudi Arabia (from SAR 600,000)", "https://ksa.yallamotor.com/new-cars/yangwang/u8"));

for (const rel of relations) {
  if (!vm.relations.some(x => x.vehicle_id === rel.vehicle_id && x.country_id === rel.country_id)) vm.relations.push(rel);
}

// ---- vetoes (skips) — no independent increment beyond represented pairs ----
const skips = [
  { vehicle_id: "dongfeng-aeolus-yixuan", country_id: "kenya", reason: "ICE × RHD — Dongfeng brand RHD already represented by dongfeng-forthing-t5 × kenya/nigeria; Aeolus Yixuan is LHD-only (Russia/ME/Africa export). Mechanical brand cross-product (avoid)." },
  { vehicle_id: "geely-emgrand", country_id: "kenya", reason: "ICE × RHD — Geely brand RHD already represented by geely-coolray × tanzania; mechanical brand cross-product (avoid)." },
  { vehicle_id: "jac-j7", country_id: "kenya", reason: "ICE × RHD — JAC brand RHD already represented by jac-t9 × kenya/nigeria; J7 RHD not verified. Mechanical brand cross-product (avoid)." },
  { vehicle_id: "baic-x55", country_id: "kenya", reason: "ICE × RHD — BAIC brand RHD already represented by baic-bj40 × nigeria; X55 RHD not verified (Russia/ME LHD export). Mechanical brand cross-product (avoid)." },
  { vehicle_id: "chery-tiggo-5x", country_id: "kenya", reason: "ICE × RHD — Chery brand RHD already represented (tiggo-8/7/4); Tiggo 5X = Tiggo 4 in export markets. Mechanical brand cross-product (avoid)." },
  { vehicle_id: "nio-et5", country_id: "uae", reason: "EV × LHD — NIO is Europe-only (LHD), no UAE/GCC market entry evidence; charging-only delta already represented by byd-atto-3 × uae. No independent increment (avoid)." },
  { vehicle_id: "xpeng-p7", country_id: "uae", reason: "EV × LHD — XPeng Europe export only (LHD), no UAE/GCC market entry evidence; charging-only delta already represented. No independent increment (avoid)." },
  { vehicle_id: "xpeng-g9", country_id: "uae", reason: "EV × LHD — XPeng Europe export only (LHD), no UAE/GCC market entry evidence; charging-only delta already represented. No independent increment (avoid)." },
  { vehicle_id: "roewe-i5", country_id: "kenya", reason: "ICE × RHD — Roewe brand RHD already represented by roewe-rx5 × kenya/nigeria; mechanical brand cross-product (avoid)." },
  { vehicle_id: "faw-bestune-t90", country_id: "kenya", reason: "ICE × RHD — FAW brand RHD already represented by faw-bestune-t77 × kenya/nigeria; mechanical brand cross-product (avoid)." }
];
for (const s of skips) {
  if (!vm.skipped.some(x => x.vehicle_id === s.vehicle_id && x.country_id === s.country_id)) vm.skipped.push(s);
}

vm.meta.batch = "P3.8 (phase2/49 - Vehicle x Market Intelligence, batch 9 — vehicle-market-b9)";
vm.meta.updated = CHECKED;

fs.writeFileSync("shared/data/vehicle-market.json", JSON.stringify(vm, null, 2) + "\n");
console.log("relations now", vm.relations.length, "| skipped now", vm.skipped.length);
const relSet = new Set(vm.relations.map(x => x.vehicle_id + "×" + x.country_id));
const overlap = vm.skipped.filter(s => relSet.has(s.vehicle_id + "×" + s.country_id));
console.log("skipped∩relations overlap:", overlap.length);
