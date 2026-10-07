// Batch: market-countries13 — Vehicle×Market relations for 4 new countries
// (Rwanda, Malawi, Albania, Moldova) + skipped records. Gate: only pairs with an
// independent increment are added:
//   - Rwanda (LHD, EV full exemption until 2028-06-30): EV duty relief + charging compat
//   - Malawi (RHD, 2025 EV rules 0% duty + 8% VAT + excise-free): drive-side + EV relief + charging
//   - Moldova (LHD, EVs excise-free, VAT 20% from 2027): EV excise relief + charging
//   - Albania (LHD, EV VAT exemption new-only, ~10yr age): charging compat + new-only EV VAT nuance
// Myanmar (drives right / LHD traffic, but RHD fleet widespread) has no clean
// drive-side increment and unquantified EV concessions — recorded as skipped.
const fs = require("fs");
const base = "shared/data";
const D = "2026-10-07";
const read = (f) => JSON.parse(fs.readFileSync(`${base}/${f}`, "utf8"));
const write = (f, obj, indent = 2) => fs.writeFileSync(`${base}/${f}`, JSON.stringify(obj, null, indent) + "\n");

const WIKI_LHT = "https://en.wikipedia.org/wiki/Left-_and_right-hand_traffic";
const GBTSRC = "https://en.wikipedia.org/wiki/GB/T_charging_standard";
const MODELS = "https://data.chinausedautohub.com/models/";

const vm = read("vehicle-market.json");
vm.meta.batch = "batch 24 — market-countries13";
vm.meta.updated = D;

const dsMatch = (summary) => ({
  status: "match",
  summary,
  source: "Data sub-site models.json (export intelligence) + Left- and right-hand traffic (Wikipedia)",
  source_url: WIKI_LHT,
  source_type: "database",
  confidence: "high",
  checked_date: D,
});

const dsRhd = (rhdNote) => ({
  status: "needs_conversion",
  summary: `China domestic-market production is left-hand drive (LHD), but this market registers right-hand drive (RHD) only. ${rhdNote}`,
  source: "Data sub-site models.json (export intelligence) + Left- and right-hand traffic (Wikipedia)",
  source_url: WIKI_LHT,
  source_type: "database",
  confidence: "medium",
  checked_date: D,
  needs_review: true,
});

const charging = (dest, extra = "") => ({
  standard: "GB/T",
  destination_standard: dest,
  connector: "GB/T AC / GB/T DC (vehicle inlet)",
  voltage: null,
  frequency: null,
  needs_adapter: true,
  notes: `China-market GB/T inlet vs ${dest} network — adapter required; confirm the sourced unit's inlet (some export units carry CCS2).${extra}`,
  source: "Vehicle: GB/T charging standard (Wikipedia); Destination: Combined Charging System / Type 2 (Wikipedia)",
  source_url: GBTSRC,
  source_type: "reputable_media",
  confidence: "medium",
  checked_date: D,
  needs_review: true,
});

const relations = [
  // ===== Rwanda (LHD, EV full exemption until 2028-06-30) =====
  {
    vehicle_id: "byd-atto-3", country_id: "rwanda",
    drive_side_fit: dsMatch("China domestic-market production is left-hand drive (LHD); Rwanda registers LHD only — no conversion required."),
    age_rule_fit: { status: "eligible", summary: "Rwanda has no fixed age limit (Euro 4 emissions is the filter); current-generation Atto 3 units (2022+) comply — confirm the Euro 4 certificate with RRA.", source: "market sub-site importrules.json (no age limit; Euro 4 filter)", source_url: "https://automag.rw/2026/03/21/car-import-rules-rwanda-2026-taxes-age-limits/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — Rwanda exempts EVs from import duty, VAT, excise and withholding tax until 30 June 2028; this EV qualifies for 0% duty vs 25% standard.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)", " Rwanda's charging network is European-aligned (CCS2/Type 2)."),
    import_eligibility: { status: "conformity_required", requirements: ["Euro 4/IV (EAS 1047:2022) certificate of conformity", "ReSW single-window declaration + RSB physical inspection", "Kigali clearance (via Mombasa/Dar es Salaam transit)"], notes: "LHD mandatory; Euro 4 emissions is the filter (no age limit). Confirm EV exemption status with RRA.", source: "market sub-site importrules.json (ReSW + RSB + Euro 4)", source_url: "https://automag.rw/2026/03/21/car-import-rules-rwanda-2026-taxes-age-limits/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "rw-duty", ev_duty_taxrule_id: "rw-ev-duty", vat_taxrule_id: "rw-vat", ev_duty_relief: true, notes: "EVs: 0% duty + 0% VAT + 0% excise until 2028-06-30 vs 25% duty + 18% VAT standard. Referenced from taxrules.json — verify with RRA.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://www.rra.gov.rw", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-rw-kigali"], notes: "Sea to Mombasa/Dar es Salaam, then road transit to Kigali (landlocked).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV; Rwanda's EV full exemption (until 2028) is the key fit point, with GB/T-to-CCS2 charging and Euro 4 conformity to confirm.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/atto3", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },
  {
    vehicle_id: "byd-seal", country_id: "rwanda",
    drive_side_fit: dsMatch("China domestic-market production is left-hand drive (LHD); Rwanda registers LHD only — no conversion required."),
    age_rule_fit: { status: "eligible", summary: "Rwanda has no fixed age limit (Euro 4 filter); Seal units (2022+) comply — confirm the Euro 4 certificate with RRA.", source: "market sub-site importrules.json (no age limit; Euro 4 filter)", source_url: "https://automag.rw/2026/03/21/car-import-rules-rwanda-2026-taxes-age-limits/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — Rwanda's EV full exemption (0% duty/VAT/excise until 2028) applies; 0% duty vs 25% standard.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)"),
    import_eligibility: { status: "conformity_required", requirements: ["Euro 4/IV (EAS 1047:2022) certificate", "ReSW declaration + RSB inspection", "Kigali clearance (via Mombasa/Dar transit)"], notes: "LHD mandatory; Euro 4 filter (no age limit). Confirm EV exemption with RRA.", source: "market sub-site importrules.json (ReSW + RSB + Euro 4)", source_url: "https://automag.rw/2026/03/21/car-import-rules-rwanda-2026-taxes-age-limits/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "rw-duty", ev_duty_taxrule_id: "rw-ev-duty", vat_taxrule_id: "rw-vat", ev_duty_relief: true, notes: "EVs: 0% duty/VAT/excise until 2028-06-30 vs 25% duty + 18% VAT. Referenced from taxrules.json — verify with RRA.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://www.rra.gov.rw", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-rw-kigali"], notes: "Sea to Mombasa/Dar, then road transit to Kigali.", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Seal is a mid-size EV sedan; Rwanda's EV full exemption (until 2028) is the key fit point, with GB/T-to-CCS2 charging to confirm.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/seal", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },

  // ===== Malawi (RHD, 2025 EV rules: 0% duty + 8% VAT + excise-free) =====
  {
    vehicle_id: "byd-atto-3", country_id: "malawi",
    drive_side_fit: dsRhd("BYD sells the Atto 3 in RHD export markets (Australia, New Zealand, Thailand), so source an RHD unit."),
    age_rule_fit: { status: "eligible", summary: "Malawi applies no age limit to EVs under the 2025 rules; current-generation Atto 3 units are eligible (combustion vehicles are limited to ~10 years).", source: "market sub-site importrules.json (no EV age limit)", source_url: "https://www.carbarn.mw/import-rules-and-regulations", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — Malawi's 2025 EV rules exempt EVs from import duty, cut VAT to 8% and waive excise (<100 kW); this EV qualifies for 0% duty vs 25% standard.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)", " Malawi's 2025 rules encourage Type 2 / CCS ports."),
    import_eligibility: { status: "conformity_required", requirements: ["RHD unit", "BEV status (full EV, not hybrid) for duty exemption", "Pre-shipment condition appraisal", "Dar es Salaam transit clearance"], notes: "RHD mandatory; EV exemption requires full-EV (not hybrid) status. Confirm duty/VAT with MRA.", source: "market sub-site importrules.json (RHD + Dar transit)", source_url: "https://www.carbarn.mw/import-rules-and-regulations", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "mw-duty", ev_duty_taxrule_id: "mw-ev-duty", vat_taxrule_id: "mw-ev-vat", ev_duty_relief: true, notes: "EVs: 0% duty + 8% VAT + excise-free (<100 kW) vs 25% duty + 16.5% VAT + 0–110% excise standard. Referenced from taxrules.json — verify with MRA.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://www.mra.mw", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-mw-lilongwe"], notes: "Sea to Dar es Salaam, then road transit to Lilongwe (landlocked).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV; Malawi's RHD requirement and 2025 EV incentives (0% duty + 8% VAT) are the key fit points, with GB/T-to-CCS2 charging to confirm.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/atto3", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },
  {
    vehicle_id: "mg-4", country_id: "malawi",
    drive_side_fit: dsRhd("MG sells the MG4 in RHD export markets (UK, Australia, New Zealand), so source an RHD unit."),
    age_rule_fit: { status: "eligible", summary: "Malawi applies no age limit to EVs under the 2025 rules; MG4 units (2022+) are eligible.", source: "market sub-site importrules.json (no EV age limit)", source_url: "https://www.carbarn.mw/import-rules-and-regulations", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — Malawi's 2025 EV rules exempt EVs from import duty and cut VAT to 8%; 0% duty vs 25% standard.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)", " Malawi's 2025 rules encourage Type 2 / CCS ports."),
    import_eligibility: { status: "conformity_required", requirements: ["RHD unit", "BEV status for duty exemption", "Pre-shipment condition appraisal", "Dar es Salaam transit clearance"], notes: "RHD mandatory; EV exemption requires full-EV status. Confirm duty/VAT with MRA.", source: "market sub-site importrules.json (RHD + Dar transit)", source_url: "https://www.carbarn.mw/import-rules-and-regulations", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "mw-duty", ev_duty_taxrule_id: "mw-ev-duty", vat_taxrule_id: "mw-ev-vat", ev_duty_relief: true, notes: "EVs: 0% duty + 8% VAT + excise-free vs 25% duty + 16.5% VAT + 0–110% excise. Referenced from taxrules.json — verify with MRA.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://www.mra.mw", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-mw-lilongwe"], notes: "Sea to Dar es Salaam, then road transit to Lilongwe.", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "MG4 is a compact EV hatchback; Malawi's RHD requirement and 2025 EV incentives (0% duty + 8% VAT) are the key fit points, with GB/T-to-CCS2 charging to confirm.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.mgmotor.eu", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },

  // ===== Moldova (LHD, EVs excise-free, VAT 20% from 2027) =====
  {
    vehicle_id: "byd-atto-3", country_id: "moldova",
    drive_side_fit: dsMatch("China domestic-market production is left-hand drive (LHD); Moldova registers LHD only — no conversion required."),
    age_rule_fit: { status: "eligible", summary: "Moldova has had no age limit since 1 January 2021; current-generation Atto 3 units (2022+) are eligible.", source: "market sub-site importrules.json (no age limit since 2021)", source_url: "https://rapidasig.md/en/useful-info/car-excise-duties", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — Moldova levies excise by engine displacement, so EVs (no displacement) are excise-free; VAT 20% applies from 2027 (draft).", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)"),
    import_eligibility: { status: "conformity_required", requirements: ["Giurgiulesti clearance (72-hour declaration)"], notes: "LHD; no age limit since 2021. EVs excise-free; confirm VAT with the Customs Service.", source: "market sub-site importrules.json (Giurgiulesti clearance)", source_url: "https://www.qualitextrading.com/import-regulations/moldova", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "md-duty", ev_duty_taxrule_id: "md-ev-excise", vat_taxrule_id: "md-vat", ev_duty_relief: true, notes: "EVs: excise-free (no engine displacement) vs engine-cc + age excise for ICE; VAT 20% from 2027. Referenced from taxrules.json — verify with the Customs Service.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://customs.gov.md", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-md-giurgiulesti"], notes: "Sea to Giurgiulesti (Danube, sole Moldovan port).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV; Moldova's EV excise-free treatment and no-age-limit policy are the key fit points, with GB/T-to-CCS2 charging to confirm.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/atto3", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },
  {
    vehicle_id: "byd-seal", country_id: "moldova",
    drive_side_fit: dsMatch("China domestic-market production is left-hand drive (LHD); Moldova registers LHD only — no conversion required."),
    age_rule_fit: { status: "eligible", summary: "Moldova has had no age limit since 2021; Seal units (2022+) are eligible.", source: "market sub-site importrules.json (no age limit since 2021)", source_url: "https://rapidasig.md/en/useful-info/car-excise-duties", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — EVs are excise-free in Moldova (no engine displacement); VAT 20% applies from 2027.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)"),
    import_eligibility: { status: "conformity_required", requirements: ["Giurgiulesti clearance (72-hour declaration)"], notes: "LHD; no age limit. EVs excise-free; confirm VAT with the Customs Service.", source: "market sub-site importrules.json (Giurgiulesti clearance)", source_url: "https://www.qualitextrading.com/import-regulations/moldova", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "md-duty", ev_duty_taxrule_id: "md-ev-excise", vat_taxrule_id: "md-vat", ev_duty_relief: true, notes: "EVs excise-free vs engine-cc + age excise for ICE; VAT 20% from 2027. Referenced from taxrules.json — verify with the Customs Service.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://customs.gov.md", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-md-giurgiulesti"], notes: "Sea to Giurgiulesti (Danube).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Seal is a mid-size EV sedan; Moldova's EV excise-free treatment and no-age-limit policy are the key fit points, with GB/T-to-CCS2 charging to confirm.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/seal", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },

  // ===== Albania (LHD, EV VAT exemption new-only, ~10yr age) =====
  {
    vehicle_id: "byd-atto-3", country_id: "albania",
    drive_side_fit: dsMatch("China domestic-market production is left-hand drive (LHD); Albania registers LHD only — no conversion required."),
    age_rule_fit: { status: "eligible", summary: "Albania restricts used imports to ~10 years plus Euro 4/5 emissions; current-generation Atto 3 units (2022+) are well within the cut-off — confirm the current DPD age limit.", source: "market sub-site importrules.json (~10yr + Euro 4/5)", source_url: "https://encarexport.com/en/blog/used-car-import-age-limits-by-country", source_type: "regulatory", confidence: "low", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — Albania's VAT exemption for EVs applies to NEW vehicles only (Article 51(p)); used EVs (this site's segment) pay full 20% VAT, so no EV tax relief applies.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)"),
    import_eligibility: { status: "conformity_required", requirements: ["ASYCUDA World declaration", "NIPT (business tax ID) for commercial imports", "Euro 4/5 emissions + ~10-year age compliance"], notes: "LHD; ~10-year age + Euro 4/5. Used EVs pay full VAT (VAT exemption is new-only). Confirm with DPD.", source: "market sub-site importrules.json (ASYCUDA + NIPT + age)", source_url: "https://sherbimekontabiliteti.al/en/albania-customs-import-duties/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "al-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "al-vat", ev_duty_relief: false, notes: "No EV relief for used EVs (VAT exemption is new-only); 10% MFN duty + 20% VAT. Referenced from taxrules.json — verify with DPD.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://dogana.gov.al", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-al-durres"], notes: "Sea to Durrës (main RoRo port).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV; Albania's ~10-year age rule and the new-only EV VAT exemption (used EVs pay full VAT) are the key fit points, with GB/T-to-CCS2 charging to confirm.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/atto3", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },
];

// Rejected (no independent increment) pairs — recorded for the skip list.
const skipped = [
  { vehicle_id: "byd-seal", country_id: "myanmar", reason: "Myanmar officially drives on the right (LHD traffic) but its fleet is RHD-dominated (post-1970 switch without vehicle overhaul) — no clean drive-side increment for China LHD units, and EV concessions are unquantified; no independent increment recorded." },
  { vehicle_id: "geely-monjaro", country_id: "malawi", reason: "ICE × RHD — drive-side needs_conversion exists but no EV duty relief; Malawi's 2025 EV incentives (0% duty + 8% VAT + excise-free) make EV pairs the higher-value increment this batch, so ICE pairs are deferred." },
  { vehicle_id: "byd-song-plus", country_id: "moldova", reason: "PHEV × LHD — a PHEV carries a combustion engine so it is NOT excise-free (Moldova's EV excise relief applies to full EVs without engine displacement); no second independent increment beyond what parent pages state." },
  { vehicle_id: "byd-seal", country_id: "albania", reason: "Deferred — one EV pair per country this batch; the Atto 3 pair already captures Albania's charging-compat + new-only EV VAT nuance." },
];

for (const r of relations) {
  if (!vm.relations.find((x) => x.vehicle_id === r.vehicle_id && x.country_id === r.country_id)) {
    vm.relations.push(r);
  }
}
for (const s of skipped) {
  const key = `${s.vehicle_id}|${s.country_id}`;
  if (!vm.skipped.find((x) => `${x.vehicle_id}|${x.country_id}` === key)) {
    vm.skipped.push({ vehicle_id: s.vehicle_id, country_id: s.country_id, reason: s.reason });
  }
}
write("vehicle-market.json", vm);

console.log("relations:", vm.relations.length);
console.log("skipped:", vm.skipped.length);
