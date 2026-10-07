// Batch: market-countries9 — Vehicle×Market relations for the 6 new countries.
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
vm.meta.batch = "batch 20 — market-countries9";
vm.meta.updated = D;

const dsMatch = () => ({ status: "match", summary: "China domestic-market production is left-hand drive (LHD); this market registers LHD only — no conversion required.", source: "Data sub-site models.json (export intelligence) + Left- and right-hand traffic (Wikipedia)", source_url: WIKI_LHT, source_type: "database", confidence: "high", checked_date: D });
const dsRhdAvailable = (rhdNote) => ({ status: "needs_conversion", summary: `China domestic-market production is left-hand drive (LHD), but this market registers right-hand drive (RHD) only. ${rhdNote}`, source: "Data sub-site models.json (export intelligence) + Left- and right-hand traffic (Wikipedia)", source_url: WIKI_LHT, source_type: "database", confidence: "medium", checked_date: D, needs_review: true });
const dsMismatch = () => ({ status: "mismatch", summary: "China domestic-market production is left-hand drive (LHD), but this market registers right-hand drive (RHD) only. Confirm RHD availability with the exporter — a China-market LHD unit cannot be registered as-is.", source: "Data sub-site models.json (export intelligence) + Left- and right-hand traffic (Wikipedia)", source_url: WIKI_LHT, source_type: "database", confidence: "high", checked_date: D });

const charging = (dest, extra = "") => ({ standard: "GB/T", destination_standard: dest, connector: "GB/T AC / GB/T DC (vehicle inlet)", voltage: null, frequency: null, needs_adapter: true, notes: `China-market GB/T inlet vs ${dest} network — adapter required; confirm the sourced unit's inlet (some export units carry CCS2).${extra}`, source: "Vehicle: GB/T charging standard (Wikipedia); Destination: Combined Charging System / Type 2 (Wikipedia)", source_url: GBTSRC, source_type: "reputable_media", confidence: "medium", checked_date: D, needs_review: true });

const relations = [
  // ===== Paraguay (LHD, 10-year age limit, Arancel + 10% IVA) =====
  {
    vehicle_id: "byd-atto-3", country_id: "paraguay",
    drive_side_fit: dsMatch(),
    age_rule_fit: { status: "eligible", summary: "Paraguay's 10-year age limit (Ley 2018/2002) is comfortably satisfied by current-generation Atto 3 units (2022+).", source: "market sub-site importrules.json (10-year age limit)", source_url: "https://jpsheet.com/import-guide/paraguay/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — no EV-specific import-duty relief is recorded for Paraguay, so the Atto 3 follows the standard Arancel + 10% IVA + fees stack (~28–32% all-in).", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS1 / Type 1 (SAE J1772)", " Paraguay's network is North-America-aligned (J1772/CCS1)."),
    import_eligibility: { status: "conformity_required", requirements: ["10-year age limit", "Arancel + IVA + fees clearance"], notes: "Confirm the 10-year age cut-off and current duty stack with Dirección Nacional de Aduanas before sourcing stock.", source: "market sub-site importrules.json (age + duty stack)", source_url: "https://moveparaguay.com/en/importing/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "py-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "py-vat", ev_duty_relief: false, notes: "No EV relief: Arancel 0–20% + 10% IVA (~28–32% all-in). Referenced from taxrules.json — verify with Dirección Nacional de Aduanas.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://www.seawayexport.com/destinations/shipping-to-paraguay", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-py-asuncion"], notes: "Container via Montevideo transshipment to Asunción (landlocked).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV; Paraguay's 10-year age window and low duty make it an accessible LHD EV destination, with GB/T-to-J1772/CCS1 charging as the compatibility check.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/atto3", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },
  {
    vehicle_id: "li-auto-l7", country_id: "paraguay",
    drive_side_fit: dsMatch(),
    age_rule_fit: { status: "eligible", summary: "Li Auto L7 (2023+) sits well within Paraguay's 10-year age limit.", source: "market sub-site importrules.json (10-year age limit)", source_url: "https://jpsheet.com/import-guide/paraguay/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "EREV (extended-range electric) — an under-explained class in Paraguay's duty schedule. EREVs are not BEVs, so any EV incentive would not apply; they follow the standard Arancel + IVA stack. Confirm EREV classification with customs.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "low", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS1 / Type 1 (SAE J1772)", " EREV charges on AC GB/T; Paraguay uses Type 1 AC."),
    import_eligibility: { status: "conformity_required", requirements: ["10-year age limit", "Arancel + IVA + fees clearance"], notes: "Confirm EREV powertrain classification and the duty stack with Dirección Nacional de Aduanas.", source: "market sub-site importrules.json (age + duty stack)", source_url: "https://moveparaguay.com/en/importing/", source_type: "regulatory", confidence: "low", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "py-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "py-vat", ev_duty_relief: false, notes: "EREV: Arancel 0–20% + 10% IVA; no EV relief. Referenced from taxrules.json — verify with Dirección Nacional de Aduanas.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://www.seawayexport.com/destinations/shipping-to-paraguay", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-py-asuncion"], notes: "Container via Montevideo transshipment to Asunción (landlocked).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "Li Auto L7 is an EREV SUV; its powertrain classification in Paraguay's duty schedule is the key open question — confirm with Dirección Nacional de Aduanas.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "low", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://en.wikipedia.org/wiki/Li_L7", source_type: "reputable_media", confidence: "low", checked_date: D,
  },

  // ===== Angola (LHD, uncertain 5–6-year age rule, 30% + 14% VAT) =====
  {
    vehicle_id: "byd-atto-3", country_id: "angola",
    drive_side_fit: dsMatch(),
    age_rule_fit: { status: "borderline", summary: "Angola's age rule is cited inconsistently (5–6 years); Atto 3 production began 2022, so 2022 units are now ~4 years old — eligible under a 5–6-year rule but with little margin. Verify the exact cut-off with Angola Customs.", source: "market sub-site importrules.json (uncertain age rule)", source_url: "https://autolanded.com/angola/", source_type: "regulatory", confidence: "low", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — Angola records no EV-specific duty relief; EVs follow the 30% duty + 14% VAT (combined ~42–55%).", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)", " Angola's network is European-aligned (CCS2/Type 2)."),
    import_eligibility: { status: "conformity_required", requirements: ["Uncertain 5–6-year age rule", "Luanda clearance + import licence"], notes: "The conflicting age rule (5 vs 6 years vs no strict limit) is the primary uncertainty — confirm with Angola Customs before sourcing stock.", source: "market sub-site importrules.json (uncertain age rule)", source_url: "https://chinausedcar.net/blog/angola-used-car-import-guide", source_type: "regulatory", confidence: "low", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "ao-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "ao-vat", ev_duty_relief: false, notes: "No EV relief: 30% duty + 14% VAT (~42–55% combined). Referenced from taxrules.json — verify with Angola Customs.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://autolanded.com/angola/", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-guangzhou-to-ao-luanda"], notes: "Sea to Luanda (RoRo).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV; Angola's high duty and uncertain age rule are the key fit questions, with GB/T-to-CCS2 charging as the compatibility check.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/atto3", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },
  {
    vehicle_id: "geely-monjaro", country_id: "angola",
    drive_side_fit: dsMatch(),
    age_rule_fit: { status: "borderline", summary: "Monjaro production began 2021; Angola's cited 5–6-year age rule makes 2021 units ~5 years old in 2026 — borderline/over. Source 2022+ units and verify the exact cut-off with Angola Customs.", source: "market sub-site importrules.json (uncertain age rule)", source_url: "https://autolanded.com/angola/", source_type: "regulatory", confidence: "low", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Combustion (ICE) — subject to 30% duty + 14% VAT (~42–55% combined); no EV relief.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: null,
    import_eligibility: { status: "conformity_required", requirements: ["Uncertain 5–6-year age rule", "Luanda clearance + import licence"], notes: "The age rule is the primary blocker — 2021 units sit near or over the cited cut-off. Confirm with Angola Customs.", source: "market sub-site importrules.json (uncertain age rule)", source_url: "https://chinausedcar.net/blog/angola-used-car-import-guide", source_type: "regulatory", confidence: "low", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "ao-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "ao-vat", ev_duty_relief: false, notes: "ICE: 30% duty + 14% VAT (~42–55% combined). Referenced from taxrules.json — verify with Angola Customs.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://autolanded.com/angola/", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-guangzhou-to-ao-luanda"], notes: "Sea to Luanda (RoRo).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "Geely Monjaro is an ICE SUV; Angola's high duty plus the uncertain 5–6-year age rule are the key fit questions.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://en.wikipedia.org/wiki/Geely_Xingyue_L", source_type: "reputable_media", confidence: "medium", checked_date: D,
  },

  // ===== Mozambique (RHD, no age limit, duty by engine + 17% VAT) =====
  {
    vehicle_id: "byd-atto-3", country_id: "mozambique",
    drive_side_fit: dsRhdAvailable("BYD sells the Atto 3 in RHD export markets (Thailand, Australia), so source an RHD unit rather than converting a China LHD unit."),
    age_rule_fit: { status: "eligible", summary: "Mozambique has no fixed age limit, so current-generation Atto 3 units (2022+) are eligible.", source: "market sub-site importrules.json (no age limit)", source_url: "https://www.carimports.co.mz/insights/the-complete-2026-guide-to-car-import-age-limits-and-restrictions-in-mozambique/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — no EV-specific duty relief recorded; EVs follow the engine-size duty plus 17% VAT.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)"),
    import_eligibility: { status: "conformity_required", requirements: ["RHD unit", "JUE digital clearance + NUIT", "Intertek pre-shipment inspection (MOZ number)"], notes: "Mozambique is RHD — source an RHD unit; Intertek MOZ inspection is mandatory. Confirm with the Autoridade Tributária.", source: "market sub-site importrules.json (RHD + JUE/NUIT/Intertek)", source_url: "https://carimports.co.mz/insights/a-step-by-step-guide-to-port-clearance-and-freight-forwarding-at-maputo-port/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "mz-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "mz-vat", ev_duty_relief: false, notes: "No EV relief: engine-size duty (~20%+) + 17% VAT. Referenced from taxrules.json — verify with the Autoridade Tributária.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://shipmz.com/artigo/import-tax-in-mozambique-duties-vat-customs-fees-explained", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-mz-maputo"], notes: "Sea to Maputo or Beira (RoRo).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV; RHD availability and the Intertek MOZ inspection are the key fit points for Mozambique, with GB/T-to-CCS2 charging to confirm.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/atto3", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },
  {
    vehicle_id: "mg-4", country_id: "mozambique",
    drive_side_fit: dsRhdAvailable("MG sells the MG4 in RHD export markets (UK, Australia, New Zealand), so source an RHD unit."),
    age_rule_fit: { status: "eligible", summary: "Mozambique has no fixed age limit; MG4 (2022+) is eligible.", source: "market sub-site importrules.json (no age limit)", source_url: "https://www.carimports.co.mz/insights/the-complete-2026-guide-to-car-import-age-limits-and-restrictions-in-mozambique/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — no EV-specific duty relief; MG4 follows the engine-size duty plus 17% VAT.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)"),
    import_eligibility: { status: "conformity_required", requirements: ["RHD unit", "JUE digital clearance + NUIT", "Intertek pre-shipment inspection (MOZ number)"], notes: "RHD mandatory; Intertek MOZ inspection required. Confirm with the Autoridade Tributária.", source: "market sub-site importrules.json (RHD + JUE/NUIT/Intertek)", source_url: "https://carimports.co.mz/insights/a-step-by-step-guide-to-port-clearance-and-freight-forwarding-at-maputo-port/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "mz-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "mz-vat", ev_duty_relief: false, notes: "No EV relief: engine-size duty (~20%+) + 17% VAT. Referenced from taxrules.json — verify with the Autoridade Tributária.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://shipmz.com/artigo/import-tax-in-mozambique-duties-vat-customs-fees-explained", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-guangzhou-to-mz-beira"], notes: "Sea to Beira or Maputo (RoRo).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "MG4 is a compact EV hatchback; RHD availability (UK/AU/NZ) and the Intertek MOZ inspection are the key fit points for Mozambique.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.mgmotor.eu", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },

  // ===== Uganda (RHD, 15-year age limit (13 proposed), 25% + 18% + env levy) =====
  {
    vehicle_id: "byd-atto-3", country_id: "uganda",
    drive_side_fit: dsRhdAvailable("BYD sells the Atto 3 in RHD export markets (Thailand, Australia), so source an RHD unit."),
    age_rule_fit: { status: "eligible", summary: "Uganda's 15-year age limit (13 proposed) is comfortably satisfied by current-generation Atto 3 units (2022+).", source: "market sub-site importrules.json (15-year age limit)", source_url: "https://www.carimports.co.ug/insights/environmental-levy-and-vehicle-age-rules-in-uganda-2026/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — Uganda's environmental levy is 0% for vehicles under 9 years old (50% above), so newer EVs avoid the heaviest levy. No separate EV import-duty relief recorded.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)"),
    import_eligibility: { status: "conformity_required", requirements: ["RHD unit", "UNBS inspection", "Euro 4/IV emission standard"], notes: "RHD mandatory; UNBS inspection and Euro 4 compliance required. Vehicles transit via Mombasa (landlocked). Confirm with URA.", source: "market sub-site importrules.json (RHD + UNBS + Euro 4)", source_url: "https://automag.ug/2025/07/07/importing-a-car-to-uganda-in-2025-heres-what-you-need-to-know/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "ug-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "ug-vat", ev_duty_relief: false, notes: "No EV duty relief: 25% duty + 18% VAT + environmental levy (0% <9yr). Referenced from taxrules.json — verify with URA.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://ura.go.ug/en/import-export-faqs/", source_type: "government", confidence: "medium", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-ug-kampala"], notes: "Sea to Mombasa (Kenya) then road to Kampala (landlocked).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV; RHD availability plus UNBS/Euro 4 compliance are the key fit points for Uganda, with GB/T-to-CCS2 charging to confirm.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/atto3", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },
  {
    vehicle_id: "byd-song-plus", country_id: "uganda",
    drive_side_fit: dsRhdAvailable("BYD sells the Song Plus as the Sealion 6 in RHD export markets (Australia, Thailand), so source an RHD unit."),
    age_rule_fit: { status: "eligible", summary: "Uganda's 15-year age limit is comfortably satisfied by Song Plus (2020+).", source: "market sub-site importrules.json (15-year age limit)", source_url: "https://www.carimports.co.ug/insights/environmental-levy-and-vehicle-age-rules-in-uganda-2026/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "PHEV (DM-i) and EV trims — Uganda's environmental levy is 0% under 9 years (50% above); confirm whether the PHEV DM-i trim qualifies for any reduced treatment.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "low", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)", " PHEV DM-i charges on AC GB/T; EV trim on GB/T DC."),
    import_eligibility: { status: "conformity_required", requirements: ["RHD unit", "UNBS inspection", "Euro 4/IV emission standard"], notes: "RHD mandatory (Sealion 6 RHD available); UNBS + Euro 4 required. Confirm with URA.", source: "market sub-site importrules.json (RHD + UNBS + Euro 4)", source_url: "https://automag.ug/2025/07/07/importing-a-car-to-uganda-in-2025-heres-what-you-need-to-know/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "ug-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "ug-vat", ev_duty_relief: false, notes: "EV/PHEV: 25% duty + 18% VAT + environmental levy (0% <9yr). Referenced from taxrules.json — verify with URA.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://ura.go.ug/en/import-export-faqs/", source_type: "government", confidence: "medium", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-ug-kampala"], notes: "Sea to Mombasa then road to Kampala (landlocked).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Song Plus (Sealion 6) is a compact SUV sold as PHEV and EV; RHD availability via the Sealion 6 plus UNBS/Euro 4 compliance are the key fit points for Uganda.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/seal-u", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },

  // ===== Tajikistan (LHD, pre-2013 ban, EV exemption 10yr) =====
  {
    vehicle_id: "byd-atto-3", country_id: "tajikistan",
    drive_side_fit: dsMatch(),
    age_rule_fit: { status: "eligible", summary: "Tajikistan bans vehicles produced before 2013 (Decree No. 355); Atto 3 (2022+) is well within the fixed cutoff.", source: "market sub-site importrules.json (pre-2013 ban)", source_url: "https://www.productcomplianceinstitute.com/2023/09/05/tajikistan-new-regulation-for-the-import-of-vehicles/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — Tajikistan exempts EVs from import duty for 10 years from October 2022, versus ~20–30% duty + 18% VAT for combustion vehicles.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)", " Tajikistan follows the European CCS2/Type 2 standard."),
    import_eligibility: { status: "conformity_required", requirements: ["Pre-2013 ban (Decree No. 355)", "Euro 4 emission standard"], notes: "Confirm the EV import-duty exemption status and Euro 4 compliance with Tajik Customs before trading.", source: "market sub-site importrules.json (age + EV policy)", source_url: "https://www.autocango.com/blog-detail/tajikistan-regulation-import-used-cars-from-china", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "tj-duty", ev_duty_taxrule_id: "tj-ev-duty", vat_taxrule_id: "tj-vat", ev_duty_relief: true, notes: "EV: 0% duty (10-year exemption) vs 20–30% standard. Referenced from taxrules.json — verify with Tajik Customs.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://www.autocango.com/blog-detail/tajikistan-regulation-import-used-cars-from-china", source_type: "government", confidence: "medium", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-lianyungang-to-tj-dushanbe"], notes: "Rail transit via Khorgos to Dushanbe (landlocked), or via Poti/Batumi (Georgia) overland.", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV; Tajikistan's 10-year EV duty exemption makes it a high-value EV destination, with GB/T-to-CCS2 charging as the compatibility check.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/atto3", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },
  {
    vehicle_id: "byd-seal", country_id: "tajikistan",
    drive_side_fit: dsMatch(),
    age_rule_fit: { status: "eligible", summary: "Tajikistan's pre-2013 ban is comfortably satisfied by Seal (2022+).", source: "market sub-site importrules.json (pre-2013 ban)", source_url: "https://www.productcomplianceinstitute.com/2023/09/05/tajikistan-new-regulation-for-the-import-of-vehicles/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — qualifies for Tajikistan's 10-year EV import-duty exemption (from Oct 2022).", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)"),
    import_eligibility: { status: "conformity_required", requirements: ["Pre-2013 ban (Decree No. 355)", "Euro 4 emission standard"], notes: "Confirm the EV duty exemption and Euro 4 compliance with Tajik Customs.", source: "market sub-site importrules.json (age + EV policy)", source_url: "https://www.autocango.com/blog-detail/tajikistan-regulation-import-used-cars-from-china", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "tj-duty", ev_duty_taxrule_id: "tj-ev-duty", vat_taxrule_id: "tj-vat", ev_duty_relief: true, notes: "EV: 0% duty (10-year exemption) vs 20–30% standard. Referenced from taxrules.json — verify with Tajik Customs.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://www.autocango.com/blog-detail/tajikistan-regulation-import-used-cars-from-china", source_type: "government", confidence: "medium", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-lianyungang-to-tj-dushanbe"], notes: "Rail transit via Khorgos to Dushanbe (landlocked).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Seal is a mid-size EV sedan; Tajikistan's 10-year EV duty exemption is the primary attraction, with GB/T-to-CCS2 charging to confirm.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/seal", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },

  // ===== Zimbabwe (RHD, 10-year age limit, EV 25%) =====
  {
    vehicle_id: "byd-atto-3", country_id: "zimbabwe",
    drive_side_fit: dsRhdAvailable("BYD sells the Atto 3 in RHD export markets (Thailand, Australia), so source an RHD unit."),
    age_rule_fit: { status: "eligible", summary: "Zimbabwe's 10-year age limit (S.I. 54 of 2024) is comfortably satisfied by current-generation Atto 3 units (2022+).", source: "market sub-site importrules.json (10-year age limit)", source_url: "https://www.zimra.co.zw/public-notices", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — Zimbabwe taxes EVs at a reduced 25% customs duty (hybrids 40%) versus the engine-size ICE schedule.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)"),
    import_eligibility: { status: "conformity_required", requirements: ["RHD unit", "10-year age limit", "ZIMRA valuation + border clearance (Beitbridge/Forbes)"], notes: "RHD mandatory; vehicles transit via Durban/Beira and clear at the Beitbridge or Forbes border. Confirm with ZIMRA.", source: "market sub-site importrules.json (RHD + age + process)", source_url: "https://www.carimports.co.zw/insights/the-complete-2026-guide-to-car-import-age-limits-and-restrictions-in-zimbabwe/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "zw-duty", ev_duty_taxrule_id: "zw-ev-duty", vat_taxrule_id: "zw-vat", ev_duty_relief: true, notes: "EV: 25% duty vs engine-size ICE schedule, + 15% VAT. Referenced from taxrules.json — verify with ZIMRA.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://www.ev24.africa/zimbabwe-hybrid-ev-duty-rules-zimra-explained/", source_type: "government", confidence: "medium", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-zw-harare"], notes: "Sea to Durban then road to Harare (landlocked), clearing at Beitbridge/Forbes.", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV; Zimbabwe's reduced 25% EV duty plus RHD availability are the key fit points, with GB/T-to-CCS2 charging to confirm.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/atto3", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },
  {
    vehicle_id: "geely-monjaro", country_id: "zimbabwe",
    drive_side_fit: dsMismatch(),
    age_rule_fit: { status: "eligible", summary: "Monjaro production began 2021; Zimbabwe's 10-year age limit is satisfied by 2021+ units (source the newest).", source: "market sub-site importrules.json (10-year age limit)", source_url: "https://www.zimra.co.zw/public-notices", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Combustion (ICE) — subject to the engine-size customs duty plus surtax and 15% VAT; no EV relief (Geely Monjaro is LHD-only).", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: null,
    import_eligibility: { status: "conformity_required", requirements: ["RHD availability (mismatch risk)", "10-year age limit", "ZIMRA valuation + border clearance"], notes: "Drive-side mismatch is the primary blocker — Geely Monjaro is LHD-only; Zimbabwe registers RHD. Confirm RHD availability before sourcing.", source: "market sub-site importrules.json (RHD + age + process)", source_url: "https://www.carimports.co.zw/insights/the-complete-2026-guide-to-car-import-age-limits-and-restrictions-in-zimbabwe/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "zw-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "zw-vat", ev_duty_relief: false, notes: "ICE: engine-size duty + surtax + 15% VAT. Referenced from taxrules.json — verify with ZIMRA.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://japanesecarsdurban.co.za/blog/zimbabwe-vehicle-import-duty-zimra-rates-2025", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-zw-harare"], notes: "Sea to Durban then road to Harare (landlocked).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "Geely Monjaro is an LHD-only ICE SUV; Zimbabwe's RHD requirement is the decisive blocker unless an RHD variant is confirmed with the exporter.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://en.wikipedia.org/wiki/Geely_Xingyue_L", source_type: "reputable_media", confidence: "medium", checked_date: D,
  },
];

for (const rel of relations) {
  if (!vm.relations.find((x) => x.vehicle_id === rel.vehicle_id && x.country_id === rel.country_id)) {
    vm.relations.push(rel);
  }
}
write("vehicle-market.json", vm);
console.log("relations total:", vm.relations.length);
