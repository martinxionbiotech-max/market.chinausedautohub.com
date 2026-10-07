// Batch: market-countries11 — Vehicle×Market relations for the 6 new RHD countries.
// Gate: only pairs with an independent increment (drive-side mismatch/needs_conversion,
// charging compat, EV duty relief, age-rule fit) are added.
const fs = require("fs");
const base = "shared/data";
const D = "2026-10-07";
const read = (f) => JSON.parse(fs.readFileSync(`${base}/${f}`, "utf8"));
const write = (f, obj, indent = 2) => fs.writeFileSync(`${base}/${f}`, JSON.stringify(obj, null, indent) + "\n");

const WIKI_LHT = "https://en.wikipedia.org/wiki/Left-_and_right-hand_traffic";
const GBTSRC = "https://en.wikipedia.org/wiki/GB/T_charging_standard";
const MODELS = "https://data.chinausedautohub.com/models/";

const vm = read("vehicle-market.json");
vm.meta.batch = "batch 22 — market-countries11";
vm.meta.updated = D;

const dsRhdAvailable = (rhdNote) => ({ status: "needs_conversion", summary: `China domestic-market production is left-hand drive (LHD), but this market registers right-hand drive (RHD) only. ${rhdNote}`, source: "Data sub-site models.json (export intelligence) + Left- and right-hand traffic (Wikipedia)", source_url: WIKI_LHT, source_type: "database", confidence: "medium", checked_date: D, needs_review: true });

const charging = (dest, extra = "") => ({ standard: "GB/T", destination_standard: dest, connector: "GB/T AC / GB/T DC (vehicle inlet)", voltage: null, frequency: null, needs_adapter: true, notes: `China-market GB/T inlet vs ${dest} network — adapter required; confirm the sourced unit's inlet (some export units carry CCS2).${extra}`, source: "Vehicle: GB/T charging standard (Wikipedia); Destination: Combined Charging System / Type 2 (Wikipedia)", source_url: GBTSRC, source_type: "reputable_media", confidence: "medium", checked_date: D, needs_review: true });

const relations = [
  // ===== Botswana (RHD, no fixed age cap, 27% duty + 12% VAT, no EV relief) =====
  {
    vehicle_id: "byd-atto-3", country_id: "botswana",
    drive_side_fit: dsRhdAvailable("BYD sells the Atto 3 in RHD export markets (Australia, Thailand, New Zealand, South Africa), so source an RHD unit."),
    age_rule_fit: { status: "eligible", summary: "Botswana has no fixed age cap (duty climbs with age), so current-generation Atto 3 units (2022+) are eligible — confirm the BURS schedule and the 2-year no-sale rule.", source: "market sub-site importrules.json (no fixed age cap)", source_url: "https://suvhub.com/import-rules/botswana", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — no EV-specific duty relief confirmed; EVs follow the SACU 27% duty + 12% VAT stack.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)", " Botswana's network is European-aligned (CCS2/Type 2)."),
    import_eligibility: { status: "conformity_required", requirements: ["RHD unit", "BURS import permit", "SACU clearance via Durban"], notes: "RHD mandatory; landlocked — transit via Durban (South Africa). Confirm the 27% duty + VAT and permit with BURS.", source: "market sub-site importrules.json (RHD + process)", source_url: "https://oneroofautos.com/import-policy/botswana", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "bw-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "bw-vat", ev_duty_relief: false, notes: "No EV relief: 27% duty + 12% VAT. Referenced from taxrules.json — verify with BURS.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://oneroofautos.com/import-policy/botswana", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-bw-gaborone"], notes: "Sea to Durban (South Africa) then road to Gaborone (landlocked).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV; Botswana's RHD requirement and no-age-cap policy are the key fit points, with GB/T-to-CCS2 charging to confirm.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/atto3", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },
  {
    vehicle_id: "mg-4", country_id: "botswana",
    drive_side_fit: dsRhdAvailable("MG sells the MG4 in RHD export markets (UK, Australia, New Zealand), so source an RHD unit."),
    age_rule_fit: { status: "eligible", summary: "Botswana has no fixed age cap; MG4 (2022+) is eligible.", source: "market sub-site importrules.json (no fixed age cap)", source_url: "https://suvhub.com/import-rules/botswana", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — follows the SACU 27% duty + 12% VAT stack; no EV relief confirmed.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)"),
    import_eligibility: { status: "conformity_required", requirements: ["RHD unit", "BURS import permit", "SACU clearance via Durban"], notes: "RHD mandatory; landlocked — transit via Durban. Confirm duty/VAT and permit with BURS.", source: "market sub-site importrules.json (RHD + process)", source_url: "https://oneroofautos.com/import-policy/botswana", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "bw-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "bw-vat", ev_duty_relief: false, notes: "No EV relief: 27% duty + 12% VAT. Referenced from taxrules.json — verify with BURS.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://oneroofautos.com/import-policy/botswana", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-bw-gaborone"], notes: "Sea to Durban then road to Gaborone (landlocked).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "MG4 is a compact EV hatchback; Botswana's RHD requirement and no-age-cap policy are the key fit points.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.mgmotor.eu", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },

  // ===== Namibia (RHD, strict 8-year age limit, no EV relief) =====
  {
    vehicle_id: "byd-atto-3", country_id: "namibia",
    drive_side_fit: dsRhdAvailable("BYD sells the Atto 3 in RHD export markets (Australia, Thailand, New Zealand, South Africa), so source an RHD unit."),
    age_rule_fit: { status: "eligible", summary: "Namibia's strict 8-year age limit (from first registration) is comfortably satisfied by current-generation Atto 3 units (2022+).", source: "market sub-site importrules.json (8-year age limit)", source_url: "https://namibiatradeportal.gov.na/general-trade-information", source_type: "regulatory", confidence: "high", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — no EV-specific duty relief confirmed; EVs follow the standard SACU duty + 15% VAT stack.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)", " Namibia's network is European-aligned (CCS2/Type 2)."),
    import_eligibility: { status: "conformity_required", requirements: ["RHD unit", "Import permit before shipping", "NamRA clearance at Walvis Bay"], notes: "RHD mandatory; import permit required before shipping. Confirm duty schedule with NamRA.", source: "market sub-site importrules.json (RHD + process)", source_url: "https://walvislink.com/resources/vehicle-import-namibia-walvis-bay", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "na-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "na-vat", ev_duty_relief: false, notes: "No EV relief: SACU duty on CIF + 15% VAT. Referenced from taxrules.json — verify with NamRA.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://walvislink.com/resources/vehicle-import-namibia-walvis-bay", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-na-walvis-bay"], notes: "Sea direct to Walvis Bay (Atlantic coast).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV; Namibia's 8-year age window and RHD fit are the key fit points, with GB/T-to-CCS2 charging to confirm.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/atto3", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },
  {
    vehicle_id: "byd-seal", country_id: "namibia",
    drive_side_fit: dsRhdAvailable("BYD sells the Seal in RHD export markets (Australia, Thailand, UK, New Zealand), so source an RHD unit."),
    age_rule_fit: { status: "eligible", summary: "Namibia's 8-year age limit is satisfied by Seal units (2022+).", source: "market sub-site importrules.json (8-year age limit)", source_url: "https://namibiatradeportal.gov.na/general-trade-information", source_type: "regulatory", confidence: "high", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — follows the standard SACU duty + 15% VAT stack; no EV relief confirmed.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)"),
    import_eligibility: { status: "conformity_required", requirements: ["RHD unit", "Import permit before shipping", "NamRA clearance at Walvis Bay"], notes: "RHD mandatory; import permit required. Confirm duty schedule with NamRA.", source: "market sub-site importrules.json (RHD + process)", source_url: "https://walvislink.com/resources/vehicle-import-namibia-walvis-bay", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "na-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "na-vat", ev_duty_relief: false, notes: "No EV relief: SACU duty on CIF + 15% VAT. Referenced from taxrules.json — verify with NamRA.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://walvislink.com/resources/vehicle-import-namibia-walvis-bay", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-na-walvis-bay"], notes: "Sea direct to Walvis Bay.", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Seal is a mid-size EV sedan; Namibia's 8-year age window and RHD fit are the key fit points, with GB/T-to-CCS2 charging to confirm.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/seal", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },

  // ===== Mauritius (RHD, ~3-4yr age cap — borderline, excise + 15% VAT) =====
  {
    vehicle_id: "byd-atto-3", country_id: "mauritius",
    drive_side_fit: dsRhdAvailable("BYD sells the Atto 3 in RHD export markets (Australia, Thailand, New Zealand, Mauritius), so source an RHD unit."),
    age_rule_fit: { status: "borderline", summary: "Mauritius caps used-car imports at ~3–4 years (set by the Finance Act); early Atto 3 units (2022) are near or over the cut-off — source late-2023+ units and confirm the current MRA age rule.", source: "market sub-site importrules.json (~3–4yr age cap)", source_url: "https://expat-mauritius.com/en/blog/importing-a-car-to-mauritius-customs-taxes-procedures-2026/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — Mauritius applies high excise plus 15% VAT; EV/hybrid excise concessions may apply (confirm with MRA).", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "low", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)", " Mauritius' network is European-aligned (CCS2/Type 2)."),
    import_eligibility: { status: "conformity_required", requirements: ["RHD unit", "Current Finance Act age compliance", "MRA customs + NLTA roadworthiness"], notes: "RHD mandatory; tight age cap + MRA/NLTA clearance. Confirm the current age rule and EV excise with MRA before bidding.", source: "market sub-site importrules.json (RHD + age cap)", source_url: "https://kmcjapan.co.jp/import-guide/mauritius", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "mu-excise", ev_duty_taxrule_id: null, vat_taxrule_id: "mu-vat", ev_duty_relief: false, notes: "Excise + 15% VAT (no confirmed EV relief). Referenced from taxrules.json — verify with MRA.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://expat-mauritius.com/en/blog/importing-a-car-to-mauritius-customs-taxes-procedures-2026/", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-mu-port-louis"], notes: "Sea direct to Port Louis.", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV; Mauritius' ~3–4yr age cap makes late-production units essential, with GB/T-to-CCS2 charging to confirm.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/atto3", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },
  {
    vehicle_id: "byd-seal", country_id: "mauritius",
    drive_side_fit: dsRhdAvailable("BYD sells the Seal in RHD export markets (Australia, Thailand, UK, New Zealand), so source an RHD unit."),
    age_rule_fit: { status: "borderline", summary: "Mauritius caps used-car imports at ~3–4 years; early Seal units (2022) are near or over the cut-off — source late-2023+ units and confirm the current MRA age rule.", source: "market sub-site importrules.json (~3–4yr age cap)", source_url: "https://expat-mauritius.com/en/blog/importing-a-car-to-mauritius-customs-taxes-procedures-2026/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — high excise + 15% VAT; EV/hybrid excise concessions may apply (confirm with MRA).", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "low", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)"),
    import_eligibility: { status: "conformity_required", requirements: ["RHD unit", "Current Finance Act age compliance", "MRA customs + NLTA roadworthiness"], notes: "RHD mandatory; tight age cap + MRA/NLTA clearance. Confirm the current age rule with MRA.", source: "market sub-site importrules.json (RHD + age cap)", source_url: "https://kmcjapan.co.jp/import-guide/mauritius", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "mu-excise", ev_duty_taxrule_id: null, vat_taxrule_id: "mu-vat", ev_duty_relief: false, notes: "Excise + 15% VAT (no confirmed EV relief). Referenced from taxrules.json — verify with MRA.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://expat-mauritius.com/en/blog/importing-a-car-to-mauritius-customs-taxes-procedures-2026/", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-mu-port-louis"], notes: "Sea direct to Port Louis.", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Seal is a mid-size EV sedan; Mauritius' ~3–4yr age cap makes late-production units essential.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/seal", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },

  // ===== Jamaica (RHD, 6yr car age limit, EV duty relief) =====
  {
    vehicle_id: "byd-atto-3", country_id: "jamaica",
    drive_side_fit: dsRhdAvailable("BYD sells the Atto 3 in RHD export markets (Australia, Thailand, New Zealand), so source an RHD unit."),
    age_rule_fit: { status: "eligible", summary: "Jamaica's 6-year age limit for cars/SUVs is satisfied by current-generation Atto 3 units (2022+).", source: "market sub-site importrules.json (6-year car age limit)", source_url: "https://www.tradeboard.gov.jm/ttbl/MV_Age.php", source_type: "regulatory", confidence: "high", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — Jamaica offers reduced import duty for EVs, a structural advantage over combustion vehicles.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "low", checked_date: D, needs_review: true },
    ev_charging_compat: charging("Type 2 / CCS2 (Mennekes)", " Confirm the destination standard — Caribbean networks vary."),
    import_eligibility: { status: "conformity_required", requirements: ["RHD unit", "Motor Vehicle Import Permit (Trade Board)", "6-year age compliance"], notes: "RHD mandatory; individuals may import up to 2 vehicles every 3 years. Confirm the EV duty rate and permit with the Trade Board / JCA.", source: "market sub-site importrules.json (RHD + permit)", source_url: "https://www.tradeboard.gov.jm/ttbl/MV_General.php", source_type: "regulatory", confidence: "high", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "jm-duty", ev_duty_taxrule_id: "jm-ev-duty", vat_taxrule_id: "jm-gct", ev_duty_relief: true, notes: "EV: reduced duty vs standard. Referenced from taxrules.json — verify with the Jamaica Customs Agency.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://jca.gov.jm", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-jm-kingston"], notes: "Sea to Kingston (via Panama transshipment).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV; Jamaica's EV duty relief plus RHD availability make it a high-value EV destination, with GB/T-to-Type 2 charging to confirm.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/atto3", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },

  // ===== Trinidad & Tobago (RHD, 6yr car age limit from Jan 2026, 20-30% duty + 12.5% VAT) =====
  {
    vehicle_id: "byd-atto-3", country_id: "trinidad-and-tobago",
    drive_side_fit: dsRhdAvailable("BYD sells the Atto 3 in RHD export markets (Australia, Thailand, New Zealand), so source an RHD unit."),
    age_rule_fit: { status: "eligible", summary: "Trinidad & Tobago's 6-year age limit for private cars (from Jan 2026) is satisfied by current-generation Atto 3 units (2022+).", source: "market sub-site importrules.json (6-year car age limit)", source_url: "https://www.pacemotorsthailand.com/blog/2026-trinidad-vehicle-import-regulations-direct", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — follows the 20–30% duty + MVT + 12.5% VAT stack; EV/hybrid eligibility has been tightened.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "low", checked_date: D, needs_review: true },
    ev_charging_compat: charging("Type 2 / CCS2 (Mennekes)", " Confirm the destination standard — Caribbean networks vary."),
    import_eligibility: { status: "conformity_required", requirements: ["RHD unit", "6-year age compliance (private cars)", "Customs & Excise clearance at Port of Spain"], notes: "RHD mandatory; confirm the 6-year cut-off and duty/VAT stack with the Customs & Excise Division.", source: "market sub-site importrules.json (RHD + age limit)", source_url: "https://www.pacemotorsthailand.com/blog/2026-trinidad-vehicle-import-regulations-direct", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "tt-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "tt-vat", ev_duty_relief: false, notes: "No EV relief: 20–30% duty + MVT + 12.5% VAT. Referenced from taxrules.json — verify with the Customs & Excise Division.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://www.pacemotorsthailand.com/blog/2026-trinidad-vehicle-import-regulations-direct", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-tt-port-of-spain"], notes: "Sea to Port of Spain (via Panama transshipment).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV; T&T's extended 6-year age window and RHD fit are the key fit points, with GB/T-to-Type 2 charging to confirm.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/atto3", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },
  {
    vehicle_id: "mg-4", country_id: "trinidad-and-tobago",
    drive_side_fit: dsRhdAvailable("MG sells the MG4 in RHD export markets (UK, Australia, New Zealand), so source an RHD unit."),
    age_rule_fit: { status: "eligible", summary: "T&T's 6-year private-car age limit (from Jan 2026) is satisfied by MG4 units (2022+).", source: "market sub-site importrules.json (6-year car age limit)", source_url: "https://www.pacemotorsthailand.com/blog/2026-trinidad-vehicle-import-regulations-direct", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — follows the 20–30% duty + MVT + 12.5% VAT stack.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "low", checked_date: D, needs_review: true },
    ev_charging_compat: charging("Type 2 / CCS2 (Mennekes)", " Confirm the destination standard."),
    import_eligibility: { status: "conformity_required", requirements: ["RHD unit", "6-year age compliance (private cars)", "Customs & Excise clearance at Port of Spain"], notes: "RHD mandatory; confirm the 6-year cut-off with the Customs & Excise Division.", source: "market sub-site importrules.json (RHD + age limit)", source_url: "https://www.pacemotorsthailand.com/blog/2026-trinidad-vehicle-import-regulations-direct", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "tt-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "tt-vat", ev_duty_relief: false, notes: "No EV relief: 20–30% duty + MVT + 12.5% VAT. Referenced from taxrules.json — verify with the Customs & Excise Division.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://www.pacemotorsthailand.com/blog/2026-trinidad-vehicle-import-regulations-direct", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-tt-port-of-spain"], notes: "Sea to Port of Spain (via Panama transshipment).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "MG4 is a compact EV hatchback; T&T's extended age window and RHD fit are the key fit points.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.mgmotor.eu", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },

  // ===== Brunei (RHD, 3yr private age cap — borderline, import+excise, no VAT) =====
  {
    vehicle_id: "byd-atto-3", country_id: "brunei",
    drive_side_fit: dsRhdAvailable("BYD sells the Atto 3 in RHD export markets (Australia, Thailand, New Zealand), so source an RHD unit."),
    age_rule_fit: { status: "borderline", summary: "Brunei caps private used-vehicle imports at 3 years from registration (4 from manufacture); early Atto 3 units (2022) are near or over the cut-off — source late-2023+ units and confirm with RCED.", source: "market sub-site importrules.json (3-year private age cap)", source_url: "https://www.washinauto.com/import-guide?country=Brunei", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — Brunei levies import + excise duty (no VAT); no EV relief confirmed.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "low", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)", " Brunei's network is European-aligned (CCS2/Type 2)."),
    import_eligibility: { status: "conformity_required", requirements: ["RHD unit", "3-year age compliance (private)", "Approval permit before departure"], notes: "RHD mandatory; approval permit required before departure. Confirm the 3-year cut-off with RCED.", source: "market sub-site importrules.json (RHD + age cap)", source_url: "https://www.washinauto.com/import-guide?country=Brunei", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "bn-duty", ev_duty_taxrule_id: null, vat_taxrule_id: null, ev_duty_relief: false, notes: "Import + excise duty (no VAT). Referenced from taxrules.json — verify with RCED.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://www.expatfocus.com/brunei/guide/brunei-buying-or-importing-a-car", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-guangzhou-to-bn-muara"], notes: "Sea to Muara (RoRo).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV; Brunei's 3-year age cap makes late-production units essential, with GB/T-to-CCS2 charging to confirm.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/atto3", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },
];

for (const rel of relations) {
  if (!vm.relations.find((x) => x.vehicle_id === rel.vehicle_id && x.country_id === rel.country_id)) {
    vm.relations.push(rel);
  }
}
write("vehicle-market.json", vm);
console.log("relations total:", vm.relations.length);
