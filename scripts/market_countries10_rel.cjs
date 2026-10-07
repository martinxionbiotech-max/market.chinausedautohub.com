// Batch: market-countries10 — Vehicle×Market relations for the 6 new countries.
// Gate: only pairs with an independent increment (drive-side mismatch/needs_conversion,
// charging compat, EV duty relief, age-rule fit, powertrain classification) are added.
const fs = require("fs");
const base = "shared/data";
const D = "2026-10-07";
const read = (f) => JSON.parse(fs.readFileSync(`${base}/${f}`, "utf8"));
const write = (f, obj, indent = 2) => fs.writeFileSync(`${base}/${f}`, JSON.stringify(obj, null, indent) + "\n");

const WIKI_LHT = "https://en.wikipedia.org/wiki/Left-_and_right-hand_traffic";
const GBTSRC = "https://en.wikipedia.org/wiki/GB/T_charging_standard";
const MODELS = "https://data.chinausedautohub.com/models/";

const vm = read("vehicle-market.json");
vm.meta.batch = "batch 21 — market-countries10";
vm.meta.updated = D;

const dsMatch = () => ({ status: "match", summary: "China domestic-market production is left-hand drive (LHD); this market registers LHD only — no conversion required.", source: "Data sub-site models.json (export intelligence) + Left- and right-hand traffic (Wikipedia)", source_url: WIKI_LHT, source_type: "database", confidence: "high", checked_date: D });
const dsRhdAvailable = (rhdNote) => ({ status: "needs_conversion", summary: `China domestic-market production is left-hand drive (LHD), but this market registers right-hand drive (RHD) only. ${rhdNote}`, source: "Data sub-site models.json (export intelligence) + Left- and right-hand traffic (Wikipedia)", source_url: WIKI_LHT, source_type: "database", confidence: "medium", checked_date: D, needs_review: true });

const charging = (dest, extra = "") => ({ standard: "GB/T", destination_standard: dest, connector: "GB/T AC / GB/T DC (vehicle inlet)", voltage: null, frequency: null, needs_adapter: true, notes: `China-market GB/T inlet vs ${dest} network — adapter required; confirm the sourced unit's inlet (some export units carry CCS2).${extra}`, source: "Vehicle: GB/T charging standard (Wikipedia); Destination: Combined Charging System / Type 2 (Wikipedia)", source_url: GBTSRC, source_type: "reputable_media", confidence: "medium", checked_date: D, needs_review: true });

const relations = [
  // ===== Nepal (RHD, EV flat 20% vs 200-317% ICE, no universal age cap) =====
  {
    vehicle_id: "byd-atto-3", country_id: "nepal",
    drive_side_fit: dsRhdAvailable("BYD sells the Atto 3 in RHD export markets (Thailand, Australia, Nepal), so source an RHD unit."),
    age_rule_fit: { status: "eligible", summary: "Nepal has no universal import age cap (20-year operation ban, 30 for EVs), so current-generation Atto 3 units (2022+) are eligible.", source: "market sub-site importrules.json (no universal age cap)", source_url: "https://www.newbusinessage.com/news/44302/nepal-moves-to-ban-import-of-vehicles-over-one-year-old-to-regulate-auto-market/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — Nepal's FY 2083/84 budget flattens EV customs duty to 20% versus a 200–317% total tax stack for combustion vehicles.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)", " Nepal follows the European-aligned CCS2/Type 2 standard."),
    import_eligibility: { status: "conformity_required", requirements: ["RHD unit", "Euro 6 emission standard", "Customs clearance via NNSW"], notes: "RHD mandatory; vehicles arrive via Kolkata/Vizag (India) or overland from China. Confirm EV duty and Euro 6 with the Department of Customs.", source: "market sub-site importrules.json (RHD + process)", source_url: "https://nnsw.gov.np/trade/customs/tariff/search", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "np-duty", ev_duty_taxrule_id: "np-ev-duty", vat_taxrule_id: "np-vat", ev_duty_relief: true, notes: "EV: 20% flat duty vs 200–317% ICE stack. Referenced from taxrules.json — verify with the Department of Customs.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://nepalautomart.com/ev-tax", source_type: "government", confidence: "medium", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-np-kathmandu"], notes: "Sea to Kolkata/Vizag (India) then road, or overland via the Tatopani/Rasuwagadhi China border.", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV; Nepal's flat 20% EV duty plus RHD availability make it a high-value EV destination, with GB/T-to-CCS2 charging to confirm.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/atto3", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },
  {
    vehicle_id: "byd-seal", country_id: "nepal",
    drive_side_fit: dsRhdAvailable("BYD sells the Seal in RHD export markets (Thailand, Australia, UK), so source an RHD unit."),
    age_rule_fit: { status: "eligible", summary: "Nepal has no universal import age cap; Seal (2022+) is eligible.", source: "market sub-site importrules.json (no universal age cap)", source_url: "https://www.newbusinessage.com/news/44302/nepal-moves-to-ban-import-of-vehicles-over-one-year-old-to-regulate-auto-market/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — qualifies for Nepal's flat 20% EV customs duty versus the 200–317% combustion stack.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)"),
    import_eligibility: { status: "conformity_required", requirements: ["RHD unit", "Euro 6 emission standard", "Customs clearance via NNSW"], notes: "RHD mandatory. Confirm EV duty and Euro 6 with the Department of Customs.", source: "market sub-site importrules.json (RHD + process)", source_url: "https://nnsw.gov.np/trade/customs/tariff/search", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "np-duty", ev_duty_taxrule_id: "np-ev-duty", vat_taxrule_id: "np-vat", ev_duty_relief: true, notes: "EV: 20% flat duty vs 200–317% ICE stack. Referenced from taxrules.json — verify with the Department of Customs.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://nepalautomart.com/ev-tax", source_type: "government", confidence: "medium", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-np-kathmandu"], notes: "Sea to Kolkata/Vizag then road, or overland via the China border.", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Seal is a mid-size EV sedan; Nepal's flat 20% EV duty and RHD availability are the key fit points, with GB/T-to-CCS2 charging to confirm.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/seal", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },

  // ===== Zambia (RHD, specific-duty schedule, hybrid 15% excise, no age limit) =====
  {
    vehicle_id: "byd-atto-3", country_id: "zambia",
    drive_side_fit: dsRhdAvailable("BYD sells the Atto 3 in RHD export markets (Thailand, Australia), so source an RHD unit."),
    age_rule_fit: { status: "eligible", summary: "Zambia has no legal import age limit (20% surtax over 5 years old), so current-generation Atto 3 units (2022+) are eligible but confirm the surtax on older units.", source: "market sub-site importrules.json (no age limit)", source_url: "https://www.japan-carrier.com/regulations/zambia?lang=en", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — Zambia applies the ZRA specific-duty schedule (flat Kwacha by engine size/age) plus carbon surtax and 16% VAT; no separate EV relief is confirmed (hybrids get 15% excise).", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "low", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)", " Zambia's network is European-aligned (CCS2/Type 2)."),
    import_eligibility: { status: "conformity_required", requirements: ["RHD unit", "JEVIC / Bureau Veritas pre-inspection"], notes: "RHD mandatory; JEVIC/BV pre-shipment inspection required. Vehicles transit via Durban/Dar es Salaam. Confirm with ZRA.", source: "market sub-site importrules.json (RHD + inspection)", source_url: "https://kmcjapan.co.jp/export-to/zambia", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "zm-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "zm-vat", ev_duty_relief: false, notes: "No EV relief: ZRA specific-duty + 30% excise + 16% VAT (hybrids 15% excise). Referenced from taxrules.json — verify with ZRA.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://www.levylegal.ai/answers/how-much-is-import-duty-on-a-car-in-zambia", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-guangzhou-to-zm-lusaka"], notes: "Sea to Durban/Dar es Salaam then road to Lusaka (landlocked).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV; Zambia's RHD requirement plus the flat ZRA specific-duty schedule are the key fit points, with GB/T-to-CCS2 charging to confirm.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/atto3", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },
  {
    vehicle_id: "mg-4", country_id: "zambia",
    drive_side_fit: dsRhdAvailable("MG sells the MG4 in RHD export markets (UK, Australia, New Zealand), so source an RHD unit."),
    age_rule_fit: { status: "eligible", summary: "Zambia has no legal import age limit; MG4 (2022+) is eligible.", source: "market sub-site importrules.json (no age limit)", source_url: "https://www.japan-carrier.com/regulations/zambia?lang=en", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — assessed under the ZRA specific-duty schedule plus 16% VAT; no separate EV relief confirmed.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "low", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)"),
    import_eligibility: { status: "conformity_required", requirements: ["RHD unit", "JEVIC / Bureau Veritas pre-inspection"], notes: "RHD mandatory; JEVIC/BV pre-shipment inspection required. Confirm with ZRA.", source: "market sub-site importrules.json (RHD + inspection)", source_url: "https://kmcjapan.co.jp/export-to/zambia", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "zm-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "zm-vat", ev_duty_relief: false, notes: "No EV relief: ZRA specific-duty + 30% excise + 16% VAT. Referenced from taxrules.json — verify with ZRA.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://www.levylegal.ai/answers/how-much-is-import-duty-on-a-car-in-zambia", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-guangzhou-to-zm-lusaka"], notes: "Sea to Durban/Dar es Salaam then road to Lusaka (landlocked).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "MG4 is a compact EV hatchback; Zambia's RHD requirement and the flat ZRA specific-duty schedule are the key fit points.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.mgmotor.eu", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },

  // ===== Laos (LHD, gas-car import ban, EV incentives, 40-65% duty stack) =====
  {
    vehicle_id: "byd-atto-3", country_id: "laos",
    drive_side_fit: dsMatch(),
    age_rule_fit: { status: "eligible", summary: "Laos removed its 5-year age limit in 2025, so current-generation Atto 3 units (2022+) are eligible — confirm the current rule.", source: "market sub-site importrules.json (5-year limit removed)", source_url: "https://blog.ucarsea.com/laos-used-car-import-policy-2025/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — Laos suspends new gas/diesel passenger-car imports (June 2024–2026) and offers EV tax incentives, making BEVs the practical import channel.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)", " Laos' network is developing; confirm the destination standard."),
    import_eligibility: { status: "conformity_required", requirements: ["LHD unit", "Automatic import licence", "EV (gas-import ban applies)"], notes: "Confirm the EV tax incentive and the gas/diesel import ban scope with the Ministry of Industry and Commerce before trading.", source: "market sub-site importrules.json (EV policy + licensing)", source_url: "https://www.trade.gov/country-commercial-guides/laos-automotive-sector", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "la-duty", ev_duty_taxrule_id: "la-ev-duty", vat_taxrule_id: "la-vat", ev_duty_relief: true, notes: "EV: incentivized (reduced/exempt) vs 40–65% ICE stack. Referenced from taxrules.json — verify with the Lao PDR Customs Department.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://www.trade.gov/country-commercial-guides/laos-automotive-sector", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-guangzhou-to-la-vientiane"], notes: "Sea to Laem Chabang (Thailand) + road, or overland via the China–Laos border.", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV; Laos' gas-car import ban and EV incentives make it a high-value LHD EV destination, with GB/T-to-CCS2 charging to confirm.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/atto3", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },
  {
    vehicle_id: "byd-dolphin", country_id: "laos",
    drive_side_fit: dsMatch(),
    age_rule_fit: { status: "eligible", summary: "Laos removed its 5-year age limit in 2025; Dolphin (2021+) is eligible.", source: "market sub-site importrules.json (5-year limit removed)", source_url: "https://blog.ucarsea.com/laos-used-car-import-policy-2025/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — benefits from Laos' gas-import ban and EV tax incentives.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)"),
    import_eligibility: { status: "conformity_required", requirements: ["LHD unit", "Automatic import licence", "EV (gas-import ban applies)"], notes: "Confirm the EV tax incentive and the gas/diesel import ban scope with the Ministry of Industry and Commerce.", source: "market sub-site importrules.json (EV policy + licensing)", source_url: "https://www.trade.gov/country-commercial-guides/laos-automotive-sector", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "la-duty", ev_duty_taxrule_id: "la-ev-duty", vat_taxrule_id: "la-vat", ev_duty_relief: true, notes: "EV: incentivized vs 40–65% ICE stack. Referenced from taxrules.json — verify with the Lao PDR Customs Department.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://www.trade.gov/country-commercial-guides/laos-automotive-sector", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-guangzhou-to-la-vientiane"], notes: "Sea to Laem Chabang + road, or overland via the China–Laos border.", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Dolphin is a compact EV hatchback; Laos' EV incentives and LHD fit are the key advantages, with GB/T-to-CCS2 charging to confirm.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/dolphin", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },

  // ===== Cambodia (LHD, EV 0% / PHEV 7% / ICE 35%, no hard age cap) =====
  {
    vehicle_id: "byd-atto-3", country_id: "cambodia",
    drive_side_fit: dsMatch(),
    age_rule_fit: { status: "eligible", summary: "Cambodia has no hard age cap as of 2026; Atto 3 (2022+) is eligible.", source: "market sub-site importrules.json (no hard age cap)", source_url: "https://ucarsea.com/cambodia-used-car-import-guide/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — Cambodia cut EV customs duty to 0% (from 1 Jan 2026) versus 35% + 10% VAT for ICE cars.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "high", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)", " Cambodia's network is European-aligned (CCS2/Type 2)."),
    import_eligibility: { status: "conformity_required", requirements: ["LHD unit", "Euro II emission minimum", "GDCE clearance at Sihanoukville"], notes: "LHD mandatory; Euro II minimum. Confirm the EV 0% rate with GDCE before trading.", source: "market sub-site importrules.json (LHD + Euro II)", source_url: "https://www.qualitextrading.com/import-regulations/cambodia", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "kh-duty", ev_duty_taxrule_id: "kh-ev-duty", vat_taxrule_id: "kh-vat", ev_duty_relief: true, notes: "EV: 0% duty vs 35% ICE. Referenced from taxrules.json — verify with GDCE.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://www.dfdl.com/insights/legal-and-tax-updates/cambodia-revised-customs-duty-and-tax-rates-on-certain-goods-effective-1-january-2026/", source_type: "government", confidence: "high", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-guangzhou-to-kh-sihanoukville"], notes: "Sea to Sihanoukville (RoRo).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV; Cambodia's 0% EV duty makes it price-competitive against local used cars, with GB/T-to-CCS2 charging to confirm.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "high", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/atto3", source_type: "manufacturer", confidence: "high", checked_date: D,
  },
  {
    vehicle_id: "byd-seal", country_id: "cambodia",
    drive_side_fit: dsMatch(),
    age_rule_fit: { status: "eligible", summary: "Cambodia has no hard age cap as of 2026; Seal (2022+) is eligible.", source: "market sub-site importrules.json (no hard age cap)", source_url: "https://ucarsea.com/cambodia-used-car-import-guide/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — Cambodia's 0% EV duty applies to this class (from 1 Jan 2026).", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "high", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)"),
    import_eligibility: { status: "conformity_required", requirements: ["LHD unit", "Euro II emission minimum", "GDCE clearance at Sihanoukville"], notes: "Confirm the EV 0% rate with GDCE before trading.", source: "market sub-site importrules.json (LHD + Euro II)", source_url: "https://www.qualitextrading.com/import-regulations/cambodia", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "kh-duty", ev_duty_taxrule_id: "kh-ev-duty", vat_taxrule_id: "kh-vat", ev_duty_relief: true, notes: "EV: 0% duty vs 35% ICE. Referenced from taxrules.json — verify with GDCE.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://www.dfdl.com/insights/legal-and-tax-updates/cambodia-revised-customs-duty-and-tax-rates-on-certain-goods-effective-1-january-2026/", source_type: "government", confidence: "high", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-guangzhou-to-kh-sihanoukville"], notes: "Sea to Sihanoukville (RoRo).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Seal is a mid-size EV sedan; Cambodia's 0% EV duty is the primary attraction, with GB/T-to-CCS2 charging to confirm.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "high", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/seal", source_type: "manufacturer", confidence: "high", checked_date: D,
  },
  {
    vehicle_id: "byd-song-plus", country_id: "cambodia",
    drive_side_fit: dsMatch(),
    age_rule_fit: { status: "eligible", summary: "Cambodia has no hard age cap as of 2026; Song Plus (2020+) is eligible.", source: "market sub-site importrules.json (no hard age cap)", source_url: "https://ucarsea.com/cambodia-used-car-import-guide/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "PHEV (DM-i) and EV trims — Cambodia cuts PHEV duty to 7% (from 35%) and EV duty to 0%, so the PHEV DM-i trim qualifies for a reduced rate versus ICE.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "high", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)", " PHEV DM-i charges on AC GB/T; EV trim on GB/T DC."),
    import_eligibility: { status: "conformity_required", requirements: ["LHD unit", "Euro II emission minimum", "GDCE clearance at Sihanoukville"], notes: "Confirm PHEV 7% / EV 0% classification with GDCE before trading.", source: "market sub-site importrules.json (LHD + Euro II)", source_url: "https://www.qualitextrading.com/import-regulations/cambodia", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "kh-duty", ev_duty_taxrule_id: "kh-ev-duty", vat_taxrule_id: "kh-vat", ev_duty_relief: true, notes: "EV 0% / PHEV 7% vs ICE 35%. Referenced from taxrules.json — verify with GDCE.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://www.yijieautosales.com/news/en/2026-Cambodia-Import-Tariff-Changes-for-EV-PHEV-Auto-Parts-Full-Guide-for-Global-Importers.html", source_type: "government", confidence: "high", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-guangzhou-to-kh-sihanoukville"], notes: "Sea to Sihanoukville (RoRo).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Song Plus (Sealion 6) is a compact SUV sold as PHEV and EV; Cambodia's PHEV 7% / EV 0% rates are the key advantage, with GB/T-to-CCS2 charging to confirm.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "high", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/seal-u", source_type: "manufacturer", confidence: "high", checked_date: D,
  },

  // ===== Honduras (LHD, 10-year age limit, no EV relief) =====
  {
    vehicle_id: "byd-atto-3", country_id: "honduras",
    drive_side_fit: dsMatch(),
    age_rule_fit: { status: "eligible", summary: "Honduras' 10-year age limit (some sources cite 7) is comfortably satisfied by current-generation Atto 3 units (2022+).", source: "market sub-site importrules.json (10-year age limit)", source_url: "https://www.trade.gov/country-commercial-guides/honduras-prohibited-restricted-imports", source_type: "regulatory", confidence: "high", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — no EV-specific duty relief recorded in Honduras; EVs follow the DAI 5–20% + 15% ISV + ecotasa stack.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS1 / Type 1 (SAE J1772)", " Honduras' network is North-America-aligned (J1772/CCS1)."),
    import_eligibility: { status: "conformity_required", requirements: ["10-year age limit", "LHD (RHD prohibited)", "DAI + ISV + ecotasa clearance"], notes: "Confirm the 10-year age cut-off and the DAI/ISV/ecotasa stack with the DEI before sourcing stock.", source: "market sub-site importrules.json (age + duty stack)", source_url: "https://www.seawayexport.com/destinations/shipping-to-honduras", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "hn-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "hn-isv", ev_duty_relief: false, notes: "No EV relief: DAI 5–20% + 15% ISV + ecotasa. Referenced from taxrules.json — verify with DEI.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://www.seawayexport.com/destinations/shipping-to-honduras", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-hn-puerto-cortes"], notes: "Sea to Puerto Cortés (via Panama transshipment).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV; Honduras' 10-year age window and LHD fit make it an accessible destination, with GB/T-to-J1772/CCS1 charging to confirm.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/atto3", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },

  // ===== El Salvador (LHD, 8-year age limit (15 trucks/SUVs), no EV relief) =====
  {
    vehicle_id: "byd-atto-3", country_id: "el-salvador",
    drive_side_fit: dsMatch(),
    age_rule_fit: { status: "eligible", summary: "El Salvador's 8-year age limit on passenger cars is satisfied by current-generation Atto 3 units (2022+).", source: "market sub-site importrules.json (8-year age limit)", source_url: "https://www.mgrautotransport.com/el-salvador", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — no EV-specific duty relief recorded in El Salvador; EVs follow the 25–30% duty + 13% VAT stack.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS1 / Type 1 (SAE J1772)", " El Salvador's network is North-America-aligned (J1772/CCS1)."),
    import_eligibility: { status: "conformity_required", requirements: ["8-year age limit (passenger)", "LHD unit", "DUCA clearance"], notes: "Confirm the 8-year age cut-off and the 25–30% duty + 13% VAT stack with the DGA before sourcing stock.", source: "market sub-site importrules.json (age + duty stack)", source_url: "https://www.rorofromusa.com/car-shipping-to-el-salvador/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "sv-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "sv-vat", ev_duty_relief: false, notes: "No EV relief: 25–30% duty + 13% VAT. Referenced from taxrules.json — verify with DGA.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://www.rorofromusa.com/car-shipping-to-el-salvador/", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-sv-acajutla"], notes: "Sea to Acajutla (via Panama transshipment).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV; El Salvador's 8-year age window and LHD fit are the key fit points, with GB/T-to-J1772/CCS1 charging to confirm.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/atto3", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },
  {
    vehicle_id: "byd-dolphin", country_id: "el-salvador",
    drive_side_fit: dsMatch(),
    age_rule_fit: { status: "eligible", summary: "El Salvador's 8-year passenger-car age limit is satisfied by Dolphin (2021+).", source: "market sub-site importrules.json (8-year age limit)", source_url: "https://www.mgrautotransport.com/el-salvador", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — follows the 25–30% duty + 13% VAT stack; no EV relief recorded.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS1 / Type 1 (SAE J1772)"),
    import_eligibility: { status: "conformity_required", requirements: ["8-year age limit (passenger)", "LHD unit", "DUCA clearance"], notes: "Confirm the 8-year age cut-off with the DGA before sourcing stock.", source: "market sub-site importrules.json (age + duty stack)", source_url: "https://www.rorofromusa.com/car-shipping-to-el-salvador/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "sv-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "sv-vat", ev_duty_relief: false, notes: "No EV relief: 25–30% duty + 13% VAT. Referenced from taxrules.json — verify with DGA.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://www.rorofromusa.com/car-shipping-to-el-salvador/", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-sv-acajutla"], notes: "Sea to Acajutla (via Panama transshipment).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Dolphin is a compact EV hatchback; El Salvador's 8-year age window and LHD fit are the key fit points, with GB/T-to-J1772/CCS1 charging to confirm.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/dolphin", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },
];

for (const rel of relations) {
  if (!vm.relations.find((x) => x.vehicle_id === rel.vehicle_id && x.country_id === rel.country_id)) {
    vm.relations.push(rel);
  }
}
write("vehicle-market.json", vm);
console.log("relations total:", vm.relations.length);
