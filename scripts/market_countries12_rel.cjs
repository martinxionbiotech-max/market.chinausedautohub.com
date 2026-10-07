// Batch: market-countries12 — Vehicle×Market relations for 4 new RHD countries.
// Gate: only pairs with an independent increment (drive-side needs_conversion,
// charging compatibility) are added. Myanmar (LHD traffic) has no drive-side
// increment, so no Myanmar relations are generated this batch.
const fs = require("fs");
const base = "shared/data";
const D = "2026-10-07";
const read = (f) => JSON.parse(fs.readFileSync(`${base}/${f}`, "utf8"));
const write = (f, obj, indent = 2) => fs.writeFileSync(`${base}/${f}`, JSON.stringify(obj, null, indent) + "\n");

const WIKI_LHT = "https://en.wikipedia.org/wiki/Left-_and_right-hand_traffic";
const GBTSRC = "https://en.wikipedia.org/wiki/GB/T_charging_standard";
const MODELS = "https://data.chinausedautohub.com/models/";

const vm = read("vehicle-market.json");
vm.meta.batch = "batch 23 — market-countries12";
vm.meta.updated = D;

const dsRhdAvailable = (rhdNote) => ({
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
  // ===== Fiji (RHD, ~8yr age limit, EV concessions, Suva) =====
  {
    vehicle_id: "byd-atto-3", country_id: "fiji",
    drive_side_fit: dsRhdAvailable("BYD sells the Atto 3 in RHD export markets (Australia, New Zealand, Thailand), so source an RHD unit."),
    age_rule_fit: { status: "eligible", summary: "Fiji's ~8-year age limit is satisfied by current-generation Atto 3 units (2022+); confirm the current FRCS cut-off.", source: "market sub-site importrules.json (~8yr age cap)", source_url: "https://jpsheet.com/import-guide/fiji/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — Fiji offers import-duty concessions for EVs; confirm the current rate with FRCS.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "low", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)", " Fiji's network is European-aligned (CCS2/Type 2)."),
    import_eligibility: { status: "conformity_required", requirements: ["RHD unit", "Age compliance (~8 years)", "FRCS clearance at Suva"], notes: "RHD mandatory; ~8-year age cap. Confirm duty + VAT with FRCS.", source: "market sub-site importrules.json (RHD + age cap)", source_url: "https://kmcjapan.co.jp/import-guide/fiji", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "fj-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "fj-vat", ev_duty_relief: false, notes: "EV duty concession not quantified — standard duty + 15% VAT referenced. Verify with FRCS.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://www.frcs.org.fj", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-fj-suva"], notes: "Sea to Suva (RoRo); Lautoka is secondary.", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV; Fiji's RHD requirement and ~8-year age cap are the key fit points, with GB/T-to-CCS2 charging to confirm.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/atto3", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },
  {
    vehicle_id: "mg-4", country_id: "fiji",
    drive_side_fit: dsRhdAvailable("MG sells the MG4 in RHD export markets (UK, Australia, New Zealand), so source an RHD unit."),
    age_rule_fit: { status: "eligible", summary: "Fiji's ~8-year age limit is satisfied by MG4 units (2022+).", source: "market sub-site importrules.json (~8yr age cap)", source_url: "https://jpsheet.com/import-guide/fiji/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — Fiji offers EV import-duty concessions; confirm with FRCS.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "low", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)"),
    import_eligibility: { status: "conformity_required", requirements: ["RHD unit", "Age compliance (~8 years)", "FRCS clearance at Suva"], notes: "RHD mandatory; ~8-year age cap. Confirm duty + VAT with FRCS.", source: "market sub-site importrules.json (RHD + age cap)", source_url: "https://kmcjapan.co.jp/import-guide/fiji", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "fj-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "fj-vat", ev_duty_relief: false, notes: "Standard duty + 15% VAT referenced. Verify with FRCS.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://www.frcs.org.fj", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-fj-suva"], notes: "Sea to Suva (RoRo).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "MG4 is a compact EV hatchback; Fiji's RHD requirement and ~8-year age cap are the key fit points, with GB/T-to-CCS2 charging to confirm.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.mgmotor.eu", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },

  // ===== Papua New Guinea (RHD, no universal age cap, GST 10%) =====
  {
    vehicle_id: "byd-atto-3", country_id: "papua-new-guinea",
    drive_side_fit: dsRhdAvailable("BYD sells the Atto 3 in RHD export markets (Australia, New Zealand, Thailand), so source an RHD unit."),
    age_rule_fit: { status: "eligible", summary: "Papua New Guinea has no universal age cap (roadworthiness/inspection applies), so current-generation Atto 3 units (2022+) are eligible — confirm any condition limits with PNG Customs.", source: "market sub-site importrules.json (no universal age cap)", source_url: "https://customs.gov.pg/trade/importing_used_vehicles", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — no EV-specific duty relief confirmed; EVs follow the standard duty + 10% GST stack.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)", " PNG's network is European-aligned (CCS2/Type 2)."),
    import_eligibility: { status: "conformity_required", requirements: ["RHD unit", "Roadworthiness / SGS inspection", "PNG Customs clearance (Lae/Port Moresby)"], notes: "RHD mandatory; roadworthiness/SGS inspection. Confirm duty + GST with PNG Customs.", source: "market sub-site importrules.json (RHD + process)", source_url: "https://suvhub.com/import-rules/papua-new-guinea", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "pg-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "pg-gst", ev_duty_relief: false, notes: "No EV relief: standard duty + 10% GST. Referenced from taxrules.json — verify with PNG Customs.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://customs.gov.pg/trade/importing_used_vehicles", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-pg-lae"], notes: "Sea to Lae (RoRo); Port Moresby secondary.", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV; PNG's RHD requirement and no-age-cap policy are the key fit points, with GB/T-to-CCS2 charging to confirm.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/atto3", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },
  {
    vehicle_id: "byd-seal", country_id: "papua-new-guinea",
    drive_side_fit: dsRhdAvailable("BYD sells the Seal in RHD export markets (Australia, New Zealand, Thailand, UK), so source an RHD unit."),
    age_rule_fit: { status: "eligible", summary: "PNG has no universal age cap; Seal units (2022+) are eligible — confirm condition limits with PNG Customs.", source: "market sub-site importrules.json (no universal age cap)", source_url: "https://customs.gov.pg/trade/importing_used_vehicles", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — no EV-specific duty relief confirmed; EVs follow the standard duty + 10% GST stack.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)"),
    import_eligibility: { status: "conformity_required", requirements: ["RHD unit", "Roadworthiness / SGS inspection", "PNG Customs clearance (Lae/Port Moresby)"], notes: "RHD mandatory; roadworthiness/SGS inspection. Confirm duty + GST with PNG Customs.", source: "market sub-site importrules.json (RHD + process)", source_url: "https://suvhub.com/import-rules/papua-new-guinea", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "pg-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "pg-gst", ev_duty_relief: false, notes: "No EV relief: standard duty + 10% GST. Referenced from taxrules.json — verify with PNG Customs.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://customs.gov.pg/trade/importing_used_vehicles", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-pg-lae"], notes: "Sea to Lae (RoRo).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Seal is a mid-size EV sedan; PNG's RHD requirement and no-age-cap policy are the key fit points, with GB/T-to-CCS2 charging to confirm.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/seal", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },

  // ===== Guyana (RHD, 8yr age limit, GRA, Georgetown) =====
  {
    vehicle_id: "byd-atto-3", country_id: "guyana",
    drive_side_fit: dsRhdAvailable("BYD sells the Atto 3 in RHD export markets (Australia, New Zealand, Thailand, Guyana via RHD export), so source an RHD unit."),
    age_rule_fit: { status: "eligible", summary: "Guyana's 8-year age limit is comfortably satisfied by current-generation Atto 3 units (2022+) — confirm the GRA cut-off date.", source: "market sub-site importrules.json (8yr age limit)", source_url: "https://gra.gov.gy/vehicles-8-years-old-used-tyres/", source_type: "regulatory", confidence: "high", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — Guyana has offered reduced/zero-rated EV import duty in recent budgets; confirm the current rate with GRA.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "low", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)", " Guyana's network is European-aligned (CCS2/Type 2)."),
    import_eligibility: { status: "conformity_required", requirements: ["RHD unit", "8-year age compliance", "GRA clearance at Georgetown"], notes: "RHD mandatory; 8-year age cap. Confirm duty band + VAT with GRA.", source: "market sub-site importrules.json (RHD + age cap)", source_url: "https://gra.gov.gy/business/customs-and-trade/imports/motor-vehicle/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "gy-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "gy-vat", ev_duty_relief: false, notes: "EV duty concession not quantified — engine-banded duty + 14% VAT referenced. Verify with GRA.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://gra.gov.gy/business/customs-and-trade/imports/motor-vehicle/", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-gy-georgetown"], notes: "Sea to Georgetown (RoRo, via Panama transshipment).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV; Guyana's RHD requirement and 8-year age cap are the key fit points, with GB/T-to-CCS2 charging to confirm.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/atto3", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },

  // ===== Timor-Leste (RHD, USD, no confirmed age cap, Dili) =====
  {
    vehicle_id: "byd-atto-3", country_id: "timor-leste",
    drive_side_fit: dsRhdAvailable("BYD sells the Atto 3 in RHD export markets (Australia, Thailand, New Zealand), so source an RHD unit."),
    age_rule_fit: null,
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — no EV-specific duty relief confirmed; EVs follow the standard import duty + tax structure.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)", " Timor-Leste's network is European-aligned (CCS2/Type 2)."),
    import_eligibility: { status: "conformity_required", requirements: ["RHD unit", "Timor-Leste Customs clearance at Dili"], notes: "RHD mandatory; age limit not clearly documented. Confirm duty + tax with the Timor-Leste Customs Authority.", source: "market sub-site importrules.json (RHD + process)", source_url: "https://customs.gov.tl/doing-business/laws-procedures-regulations/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "tl-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "tl-tax", ev_duty_relief: false, notes: "No EV relief: import duty + sales/service tax referenced. Verify with Timor-Leste Customs.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://customs.gov.tl/", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-guangzhou-to-tl-dili"], notes: "Sea to Dili (RoRo).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV; Timor-Leste's RHD requirement is the key fit point (age limit not clearly documented), with GB/T-to-CCS2 charging to confirm.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/atto3", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },
];

// Rejected (no independent increment) pairs — recorded for the skip list.
const skipped = [
  { vehicle_id: "geely-monjaro", country_id: "fiji", reason: "ICE × RHD — drive-side needs_conversion alone would pass the gate, but batch policy favours EV pairs where charging-compat adds a second increment; ICE pairs deferred." },
  { vehicle_id: "byd-atto-3", country_id: "myanmar", reason: "Myanmar drives on the right (LHD traffic) — no drive-side mismatch increment for China LHD units, and no confirmed EV duty relief; no independent increment recorded." },
  { vehicle_id: "byd-song-plus", country_id: "papua-new-guinea", reason: "PHEV × RHD — drive-side increment exists but charging/age facts already stated on parent pages; no second independent increment." },
  { vehicle_id: "mg-4", country_id: "guyana", reason: "Deferred — one EV pair per country this batch to keep relation count in the +4–8 target band." },
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
