// Batch: market-countries8 — Vehicle×Market relations for the 6 new countries.
// Gate: only pairs with an independent increment (charging compat / EV duty relief /
// age-rule fit / powertrain classification) are added. All LHD markets, so drive-side is "match".
const fs = require("fs");
const base = "shared/data";
const D = "2026-10-07";
const read = (f) => JSON.parse(fs.readFileSync(`${base}/${f}`, "utf8"));
const write = (f, obj, indent = 2) => fs.writeFileSync(`${base}/${f}`, JSON.stringify(obj, null, indent) + "\n");

const WIKI_LHT = "https://en.wikipedia.org/wiki/Left-_and_right-hand_traffic";
const GBTSRC = "https://en.wikipedia.org/wiki/GB/T_charging_standard";
const MODELS = "https://data.chinausedautohub.com/models/";

const vm = read("vehicle-market.json");
vm.meta.batch = "batch 19 — market-countries8";
vm.meta.updated = D;

const dsMatch = () => ({ status: "match", summary: "China domestic-market production is left-hand drive (LHD); this market registers LHD only — no conversion required.", source: "Data sub-site models.json (export intelligence) + Left- and right-hand traffic (Wikipedia)", source_url: WIKI_LHT, source_type: "database", confidence: "high", checked_date: D });

// charging: GB/T vehicle inlet vs destination standard (non-GB/T) => needs_adapter true
const charging = (dest, extra = "") => ({ standard: "GB/T", destination_standard: dest, connector: "GB/T AC / GB/T DC (vehicle inlet)", voltage: null, frequency: null, needs_adapter: true, notes: `China-market GB/T inlet vs ${dest} network — adapter required; confirm the sourced unit's inlet (some export units carry CCS2).${extra}`, source: "Vehicle: GB/T charging standard (Wikipedia); Destination: Combined Charging System / Type 1 (Wikipedia)", source_url: GBTSRC, source_type: "reputable_media", confidence: "medium", checked_date: D, needs_review: true });

const relations = [
  // ===== Belarus (LHD, EV duty-free quota 20k + 0% EV VAT, EAEU) =====
  {
    vehicle_id: "byd-atto-3", country_id: "belarus",
    drive_side_fit: dsMatch(),
    age_rule_fit: { status: "eligible", summary: "Belarus has no hard age ban (the unified rate scales with age), so current-generation Atto 3 units (2022+) are eligible. Source the newest unit to minimise the age-based unified rate.", source: "market sub-site importrules.json (no hard age ban)", source_url: "https://carawon.com/en/import-to-belarus", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — Belarus's 20,000-unit duty-free quota and 0% individual EV VAT (through 2028) give pure EVs a decisive cost advantage over combustion (48–54% unified rate).", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)", " Belarus's EAEU network follows the European CCS2/Type 2 standard."),
    import_eligibility: { status: "conformity_required", requirements: ["EAEU customs clearance (single clearance across the union)", "EV duty-free quota allocation (pure EV only)"], notes: "Quota is first-come-first-served and more than 40% was used by April 2026 — confirm quota availability before purchase. Hybrids are excluded from the perk.", source: "market sub-site importrules.json (EAEU + EV quota)", source_url: "https://carawon.com/en/import-to-belarus", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "by-duty", ev_duty_taxrule_id: "by-ev-duty", vat_taxrule_id: "by-vat", ev_duty_relief: true, notes: "EV: 0% duty (quota) + 0% individual VAT vs 48–54% unified rate. Referenced from taxrules.json — verify quota status with the State Customs Committee.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://carawon.com/en/import-to-belarus", source_type: "government", confidence: "medium", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-by-minsk"], notes: "Sea to Klaipėda/Riga then road to Minsk (landlocked), or overland via Brest.", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV; the duty-free quota and 0% EV VAT make it a high-value import, but quota timing and GB/T-to-CCS2 charging are the key fit points.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/atto3", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },
  {
    vehicle_id: "byd-seal", country_id: "belarus",
    drive_side_fit: dsMatch(),
    age_rule_fit: { status: "eligible", summary: "No hard age ban in Belarus; Seal units (2022+) are eligible and the newest stock minimises the age-based unified rate.", source: "market sub-site importrules.json (no hard age ban)", source_url: "https://carawon.com/en/import-to-belarus", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — qualifies for Belarus's duty-free quota and 0% individual EV VAT through 2028.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)"),
    import_eligibility: { status: "conformity_required", requirements: ["EAEU customs clearance", "EV duty-free quota allocation (pure EV only)"], notes: "Confirm quota availability before purchase; more than 40% of the 2026 quota was consumed by April.", source: "market sub-site importrules.json (EV quota)", source_url: "https://carawon.com/en/import-to-belarus", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "by-duty", ev_duty_taxrule_id: "by-ev-duty", vat_taxrule_id: "by-vat", ev_duty_relief: true, notes: "EV: 0% duty (quota) + 0% individual VAT vs 48–54% unified rate. Referenced from taxrules.json.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://carawon.com/en/import-to-belarus", source_type: "government", confidence: "medium", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-by-minsk"], notes: "Sea to Klaipėda/Riga then road to Minsk.", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Seal is a mid-size EV sedan; Belarus's duty-free EV quota and 0% EV VAT are the primary attraction, with GB/T-to-CCS2 charging as the compatibility check.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/seal", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },
  {
    vehicle_id: "zeekr-001", country_id: "belarus",
    drive_side_fit: dsMatch(),
    age_rule_fit: { status: "eligible", summary: "Zeekr 001 (2021+) is current-generation; Belarus's no-hard-age-ban regime makes it eligible, favouring the newest units.", source: "market sub-site importrules.json (no hard age ban)", source_url: "https://carawon.com/en/import-to-belarus", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — premium EV that qualifies for Belarus's duty-free quota and 0% individual EV VAT.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)"),
    import_eligibility: { status: "conformity_required", requirements: ["EAEU customs clearance", "EV duty-free quota allocation (pure EV only)"], notes: "Confirm quota availability before purchase.", source: "market sub-site importrules.json (EV quota)", source_url: "https://carawon.com/en/import-to-belarus", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "by-duty", ev_duty_taxrule_id: "by-ev-duty", vat_taxrule_id: "by-vat", ev_duty_relief: true, notes: "EV: 0% duty (quota) + 0% individual VAT vs 48–54% unified rate. Referenced from taxrules.json.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://carawon.com/en/import-to-belarus", source_type: "government", confidence: "medium", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-by-minsk"], notes: "Sea to Klaipėda/Riga then road to Minsk.", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "Zeekr 001 is a premium EV shooting-brake; Belarus's EV duty relief is attractive, but confirm quota availability and CCS2 charging adapter needs.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://en.wikipedia.org/wiki/Zeekr_001", source_type: "reputable_media", confidence: "medium", checked_date: D,
  },

  // ===== Costa Rica (LHD, EV zero import tax Law 9518, tiered ICE duty) =====
  {
    vehicle_id: "byd-atto-3", country_id: "costa-rica",
    drive_side_fit: dsMatch(),
    age_rule_fit: { status: "eligible", summary: "Costa Rica has no age limit, but import tax rises with age — current-generation Atto 3 (2022+) sits in the lowest (≤3-year) duty tier.", source: "market sub-site importrules.json (no age limit)", source_url: "https://vamosrentacar.com/ship-or-buy-import-taxes/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — Costa Rica exempts fully electric vehicles from import tax under Law 9518, versus a 52–79% tiered import tax for combustion vehicles. The strongest EV relief in the tracked Latin American set.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS1 / Type 1 (SAE J1772)", " Costa Rica's network is North-America-aligned (J1772/CCS1), not the European CCS2 — confirm connector specifics."),
    import_eligibility: { status: "conformity_required", requirements: ["RITEVE emissions/safety inspection"], notes: "EVs are exempt from import tax under Law 9518; confirm the US$30,000 threshold and current hybrid treatment with Costa Rica Customs.", source: "market sub-site importrules.json (RITEVE + EV policy)", source_url: "https://www.trade.gov/market-intelligence/costa-rica-electric-vehicles", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "cr-duty", ev_duty_taxrule_id: "cr-ev-duty", vat_taxrule_id: null, ev_duty_relief: true, notes: "EV: 0% import tax vs 52.29–79.03% tiered ICE import tax. Referenced from taxrules.json — verify with Costa Rica Customs.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://www.trade.gov/market-intelligence/costa-rica-electric-vehicles", source_type: "government", confidence: "medium", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-cr-puerto-limon"], notes: "Sea to Puerto Limón (Atlantic) or Caldera (Pacific).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV; Costa Rica's zero EV import tax makes it the standout EV destination, with GB/T-to-J1772/CCS1 charging as the compatibility check.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/atto3", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },
  {
    vehicle_id: "byd-seal", country_id: "costa-rica",
    drive_side_fit: dsMatch(),
    age_rule_fit: { status: "eligible", summary: "No age limit in Costa Rica; Seal (2022+) sits in the lowest duty tier.", source: "market sub-site importrules.json (no age limit)", source_url: "https://vamosrentacar.com/ship-or-buy-import-taxes/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — qualifies for Costa Rica's zero EV import tax under Law 9518.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS1 / Type 1 (SAE J1772)"),
    import_eligibility: { status: "conformity_required", requirements: ["RITEVE emissions/safety inspection"], notes: "EV import-tax exemption under Law 9518; confirm threshold and hybrid treatment with Costa Rica Customs.", source: "market sub-site importrules.json (RITEVE + EV policy)", source_url: "https://www.trade.gov/market-intelligence/costa-rica-electric-vehicles", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "cr-duty", ev_duty_taxrule_id: "cr-ev-duty", vat_taxrule_id: null, ev_duty_relief: true, notes: "EV: 0% import tax vs 52.29–79.03% tiered ICE. Referenced from taxrules.json — verify with Costa Rica Customs.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://www.trade.gov/market-intelligence/costa-rica-electric-vehicles", source_type: "government", confidence: "medium", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-cr-puerto-limon"], notes: "Sea to Puerto Limón (Atlantic) or Caldera (Pacific).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Seal is a mid-size EV sedan; Costa Rica's zero EV import tax is the key advantage, with charging-standard compatibility to confirm.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/seal", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },

  // ===== Ukraine (LHD, Euro-2, EV exemption ended Dec 2025, 10% + excise + 20% VAT) =====
  {
    vehicle_id: "byd-atto-3", country_id: "ukraine",
    drive_side_fit: dsMatch(),
    age_rule_fit: { status: "eligible", summary: "Ukraine's binding gate is Euro-2 (not a hard age cap); Atto 3 (2022+) complies easily. A proposed 20-year cap would not affect current-generation units.", source: "market sub-site importrules.json (Euro-2 minimum)", source_url: "https://cargoline.com.ua/en/customs-clearance-cars/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — Ukraine's full EV exemption (0% duty/excise/VAT) ended 31 Dec 2025, so EVs now face up to 10% duty + €1/kWh excise + 20% VAT. The EV cost advantage has narrowed but EVs remain admissible.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)", " Ukraine follows the European CCS2/Type 2 standard."),
    import_eligibility: { status: "conformity_required", requirements: ["Certificate of Conformity (individually approved wheeled vehicle)", "Preliminary declaration + financial guarantee"], notes: "Ukraine excludes vehicles from states recognised as occupier/aggressor — China is not affected. Confirm the document set with the State Customs Service.", source: "market sub-site importrules.json (conformity + docs)", source_url: "https://cargoline.com.ua/en/customs-clearance-cars/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "ua-duty", ev_duty_taxrule_id: "ua-ev-duty", vat_taxrule_id: "ua-vat", ev_duty_relief: false, notes: "EV exemption ended 31 Dec 2025 — EVs now follow the standard 10% duty + €1/kWh excise + 20% VAT. Referenced from taxrules.json — verify with the State Customs Service.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://wah.ua/en/blog/195-customs-clearance-of-electric-vehicles-new-rules-and-features", source_type: "government", confidence: "medium", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-ua-odesa"], notes: "Sea to Odesa/Chornomorsk (Black Sea).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV; Ukraine's EV exemption ended Dec 2025, so budget the full duty + €1/kWh excise + VAT. GB/T-to-CCS2 charging is the compatibility check.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/atto3", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },
  {
    vehicle_id: "li-auto-l7", country_id: "ukraine",
    drive_side_fit: dsMatch(),
    age_rule_fit: { status: "eligible", summary: "Li Auto L7 (2023+) easily meets Ukraine's Euro-2 gate; no hard age cap applies.", source: "market sub-site importrules.json (Euro-2 minimum)", source_url: "https://cargoline.com.ua/en/customs-clearance-cars/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "EREV (extended-range electric) — an under-explained class in Ukraine's duty schedule. EREVs are not BEVs, so the (now-ended) EV exemption never applied; they follow the standard 10% duty + excise + 20% VAT.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "low", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)", " EREV charges on AC GB/T; Ukraine uses Type 2 AC."),
    import_eligibility: { status: "conformity_required", requirements: ["Certificate of Conformity", "Preliminary declaration + financial guarantee"], notes: "Confirm EREV classification with the State Customs Service before trading.", source: "market sub-site importrules.json (conformity + docs)", source_url: "https://cargoline.com.ua/en/customs-clearance-cars/", source_type: "regulatory", confidence: "low", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "ua-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "ua-vat", ev_duty_relief: false, notes: "EREV: 10% duty + excise (formula) + 20% VAT; no EV relief. Referenced from taxrules.json — verify with the State Customs Service.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://eauto.org.ua/en/instrumenty/rozmytnennia", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-ua-odesa"], notes: "Sea to Odesa/Chornomorsk (Black Sea).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "Li Auto L7 is an EREV SUV; its powertrain classification in Ukraine's duty schedule is the key open question — confirm with the State Customs Service.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "low", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://en.wikipedia.org/wiki/Li_L7", source_type: "reputable_media", confidence: "low", checked_date: D,
  },

  // ===== Lebanon (LHD, 8-year age limit, diesel ban, flat/50% duty + 10% VAT) =====
  {
    vehicle_id: "byd-atto-3", country_id: "lebanon",
    drive_side_fit: dsMatch(),
    age_rule_fit: { status: "eligible", summary: "Lebanon's 8-year age limit is satisfied by current-generation Atto 3 (2022+).", source: "market sub-site importrules.json (8-year age limit)", source_url: "https://blog.japanesecartrade.com/558-lebanon-import-regulation-for-japan-used-cars/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — Lebanon bans diesel used vehicles; EVs are admissible but receive no confirmed EV-specific duty relief (flat 5M LBP ≤20M CIF or 50% above, plus 10% VAT).", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)"),
    import_eligibility: { status: "conformity_required", requirements: ["8-year age limit", "No diesel powertrain", "Bill of lading + registration + title + invoice"], notes: "Lebanon prohibits diesel used vehicles — EVs and petrol/hybrid are admissible. Confirm the age cut-off with Lebanese Customs.", source: "market sub-site importrules.json (age + diesel ban + docs)", source_url: "https://blog.japanesecartrade.com/558-lebanon-import-regulation-for-japan-used-cars/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "lb-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "lb-vat", ev_duty_relief: false, notes: "No EV-specific relief: flat 5M LBP (≤20M CIF) or 50% above, plus 10% VAT. Referenced from taxrules.json — verify with Lebanese Customs.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://blog.japanesecartrade.com/558-lebanon-import-regulation-for-japan-used-cars/", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-lb-beirut"], notes: "Sea to Beirut (East Mediterranean).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV; Lebanon's diesel ban and 8-year age rule favour recent EVs, with GB/T-to-CCS2 charging as the compatibility check.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/atto3", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },
  {
    vehicle_id: "chery-tiggo-8", country_id: "lebanon",
    drive_side_fit: dsMatch(),
    age_rule_fit: { status: "borderline", summary: "Tiggo 8 production began 2018; Lebanon's 8-year age limit makes 2018 units ~8 years old (borderline/over) in 2026. Source 2019+ units and verify the exact cut-off with Lebanese Customs.", source: "market sub-site importrules.json (8-year age limit)", source_url: "https://blog.japanesecartrade.com/558-lebanon-import-regulation-for-japan-used-cars/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Combustion (ICE) — Lebanon's diesel ban does not apply to petrol units, but the flat/50% duty plus 10% VAT applies. No EV-specific relief.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: null,
    import_eligibility: { status: "conformity_required", requirements: ["8-year age limit", "Petrol powertrain (no diesel)", "Bill of lading + registration + title + invoice"], notes: "The 8-year age rule renders 2018 units borderline — the age rule is the primary blocker. Petrol units are admissible.", source: "market sub-site importrules.json (age + diesel ban + docs)", source_url: "https://blog.japanesecartrade.com/558-lebanon-import-regulation-for-japan-used-cars/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "lb-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "lb-vat", ev_duty_relief: false, notes: "ICE: flat 5M LBP (≤20M CIF) or 50% above, plus 10% VAT. Referenced from taxrules.json — verify with Lebanese Customs.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://blog.japanesecartrade.com/558-lebanon-import-regulation-for-japan-used-cars/", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-lb-beirut"], notes: "Sea to Beirut (East Mediterranean).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "Chery Tiggo 8 is an ICE SUV; Lebanon's 8-year age rule renders 2018 units borderline — source 2019+ units.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://en.wikipedia.org/wiki/Chery_Tiggo_8", source_type: "reputable_media", confidence: "medium", checked_date: D,
  },

  // ===== Bolivia (LHD, strict ~1 model-year age rule, NANDINA + 14.94% IVA) =====
  {
    vehicle_id: "geely-monjaro", country_id: "bolivia",
    drive_side_fit: dsMatch(),
    age_rule_fit: { status: "ineligible", summary: "Bolivia's age rule (one model year old since Dec 2014; some sources cite up to two years) makes any used Monjaro ineligible — the model has been in production since 2021, far exceeding the ~1-year cut-off.", source: "market sub-site importrules.json (strict age rule)", source_url: "https://www.privacyshield.gov/ps/article?id=Bolivia-Trade-Barriers", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Combustion (ICE) — subject to NANDINA tariff + 14.94% IVA, but the strict age rule makes used import effectively barred.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "low", checked_date: D, needs_review: true },
    ev_charging_compat: null,
    import_eligibility: { status: "conformity_required", requirements: ["≤1–2 model years old", "NIT + licensed customs broker (Agente Despachante)"], notes: "Bolivia's near-total age bar means used vehicles are effectively ineligible; only brand-new/current-model-year units qualify. The age rule is the decisive blocker.", source: "market sub-site importrules.json (strict age rule)", source_url: "https://www.privacyshield.gov/ps/article?id=Bolivia-Trade-Barriers", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "bo-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "bo-iva", ev_duty_relief: false, notes: "ICE: NANDINA tariff + 14.94% IVA (used import barred by age rule). Referenced from taxrules.json — verify with Aduana Nacional.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://carraglobe.com/importer-of-record-bolivia/", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-bo-santa-cruz"], notes: "Sea to Iquique/Arica then rail/road to Santa Cruz (landlocked).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "Geely Monjaro is an ICE SUV; Bolivia's ~1-model-year age rule makes used import effectively barred — a market to monitor, not a current used-export destination.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://en.wikipedia.org/wiki/Geely_Xingyue_L", source_type: "reputable_media", confidence: "medium", checked_date: D,
  },

  // ===== Guatemala (LHD, ~10-year age limit, DAI + 12% VAT + IPRIMA 20%) =====
  {
    vehicle_id: "byd-atto-3", country_id: "guatemala",
    drive_side_fit: dsMatch(),
    age_rule_fit: { status: "eligible", summary: "Guatemala's ~10-year age limit (cited inconsistently) is comfortably satisfied by current-generation Atto 3 (2022+).", source: "market sub-site importrules.json (age limit)", source_url: "https://www.wcshipping.com/blog/guatemala-vehicle-import-rules-2025-sat-regulations-vs-reality-guide", source_type: "regulatory", confidence: "low", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — no confirmed EV-specific duty relief in Guatemala; EVs follow the DAI + 12% VAT + IPRIMA stack.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "low", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS1 / Type 1 (SAE J1772)", " Guatemala's network is North-America-aligned (J1772/CCS1)."),
    import_eligibility: { status: "conformity_required", requirements: ["~10-year age limit", "SAT customs clearance via licensed broker"], notes: "Age limit cited inconsistently — confirm with SAT / a licensed broker before sourcing stock.", source: "market sub-site importrules.json (age + SAT)", source_url: "https://www.wcshipping.com/blog/guatemala-vehicle-import-rules-2025-sat-regulations-vs-reality-guide", source_type: "regulatory", confidence: "low", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "gt-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "gt-vat", ev_duty_relief: false, notes: "No EV relief: DAI (0–15%) + 12% VAT + IPRIMA ~20%. Referenced from taxrules.json — verify with SAT.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://www.wcshipping.com/blog/guatemala-vehicle-import-rules-2025-sat-regulations-vs-reality-guide", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-gt-puerto-quetzal"], notes: "Sea to Puerto Quetzal (Pacific) or Santo Tomás de Castilla (Atlantic).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV; Guatemala has no confirmed EV relief, so the value proposition is standard DAI + VAT + IPRIMA, with GB/T-to-J1772/CCS1 charging to confirm.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "low", checked_date: D, needs_review: true },
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
