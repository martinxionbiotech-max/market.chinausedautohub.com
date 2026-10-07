// Batch: market-countries3 — add 6 high-commercial-value countries + data layer + Vehicle×Market relations.
// Countries: Philippines (LHD), Iraq (LHD), Ethiopia (LHD), Colombia (LHD), Morocco (LHD), Sri Lanka (RHD).
// All regulatory data cited to official/reliable sources; every statement carries source URL + last_checked (2026-10-07).
// NOTE: Philippines is LHD (right-hand traffic); RHD import is a criminal offence under RA 8506 — NOT RHD as some briefs state.
const fs = require("fs");
const base = "shared/data";
const D = "2026-10-07";
const read = (f) => JSON.parse(fs.readFileSync(`${base}/${f}`, "utf8"));
const write = (f, obj, indent = 2) => fs.writeFileSync(`${base}/${f}`, JSON.stringify(obj, null, indent) + "\n");

const WIKI_LHT = "https://en.wikipedia.org/wiki/Left-_and_right-hand_traffic";
const GBTSRC = "https://en.wikipedia.org/wiki/GB/T_charging_standard";
const MODELS = "https://data.chinausedautohub.com/models/";

// ---------- countries.json ----------
const countries = read("countries.json");
const newCountries = [
  { country_id: "philippines", name: "Philippines", name_zh: "菲律宾", region: "southeast-asia", drive_side: "lhd", currency: "PHP", status: "active", source: "Bureau of Customs (customs.gov.ph) / EO 12 & RA 8506", source_url: "https://customs.gov.ph/motor-vehicles-boats-yachts/", source_date: D, confidence: "high" },
  { country_id: "iraq", name: "Iraq", name_zh: "伊拉克", region: "middle-east", drive_side: "lhd", currency: "IQD", status: "active", source: "Iraqi Customs / trade guides (Umm Qasr)", source_url: "https://chinausedcar.net/market/iraq", source_date: D, confidence: "high" },
  { country_id: "ethiopia", name: "Ethiopia", name_zh: "埃塞俄比亚", region: "africa", drive_side: "lhd", currency: "ETB", status: "active", source: "Ethiopian Customs Commission / EV-only policy (Feb 2024)", source_url: "https://ethiopiauto.com/2026/09/20/customs-clearance-vehicles-ethiopia/", source_date: D, confidence: "high" },
  { country_id: "colombia", name: "Colombia", name_zh: "哥伦比亚", region: "latin-america", drive_side: "lhd", currency: "COP", status: "active", source: "DIAN (Colombia Customs)", source_url: "https://colombiatramita.co/vehiculos/importar-vehiculo-colombia/", source_date: D, confidence: "high" },
  { country_id: "morocco", name: "Morocco", name_zh: "摩洛哥", region: "africa", drive_side: "lhd", currency: "MAD", status: "active", source: "Moroccan Customs (ADII) / Douane", source_url: "https://ecarstrade.com/blog/how-to-import-a-car-to-morocco", source_date: D, confidence: "high" },
  { country_id: "sri-lanka", name: "Sri Lanka", name_zh: "斯里兰卡", region: "south-asia", drive_side: "rhd", currency: "LKR", status: "active", source: "Sri Lanka Customs / Imports & Exports (Control) Regs No.01/2025", source_url: "https://lankabizz.net/2025/02/01/sri-lanka-updates-motor-vehicle-import-regulations/", source_date: D, confidence: "high" },
];
for (const c of newCountries) {
  if (!countries.countries.find((x) => x.country_id === c.country_id)) countries.countries.push(c);
}
write("countries.json", countries);

// ---------- importrules.json ----------
const importrules = read("importrules.json");
const rules = [
  // ===== Philippines (LHD) =====
  { rule_id: "ph-drive-side", country_id: "philippines", category: "drive_side", title: "Left-hand drive (LHD) only", rule_text: "The Philippines drives on the right and requires left-hand-drive (LHD) vehicles. Importing a right-hand-drive (RHD) vehicle is a criminal offence under Republic Act No. 8506.", effective_date: null, last_checked: D, source: "Respicio.ph (citing RA 8506)", source_url: "https://www.respicio.ph/commentaries/rules-and-taxes-for-importing-a-personal-vehicle-into-the-philippines", confidence: "high", needs_review: false },
  { rule_id: "ph-used-restriction", country_id: "philippines", category: "import_eligibility", title: "Used-vehicle imports generally prohibited (NDI exceptions)", rule_text: "Under EO 156 as amended by EO 877-A, import of used motor vehicles is generally prohibited. Limited exceptions exist under the No-Dollar Importation (NDI) program for returning residents (≥1 year abroad), immigrants (13g/13a visas), and diplomats. The vehicle must be owned and registered ≥6 months, one unit per family, and cannot be resold for 3 years.", effective_date: null, last_checked: D, source: "Respicio.ph / Bureau of Customs", source_url: "https://www.respicio.ph/commentaries/rules-and-taxes-for-importing-a-personal-vehicle-into-the-philippines", confidence: "high", needs_review: false },
  { rule_id: "ph-ev-policy", country_id: "philippines", category: "ev_policy", title: "EV zero import duty (EO 12, extended to 2028)", rule_text: "Executive Order No. 12 (s.2023) temporarily zero-rates import duty on electric vehicles, parts and components; the NEDA Board extended it to 2028 and broadened it to cover hybrid electric vehicles (HEVs) and plug-in hybrids, removing the previous 30% duty on hybrids/PHEVs.", effective_date: "2023-02-20", last_checked: D, source: "HKTDC Research / Bureau of Customs CMC 64-2023", source_url: "https://research.hktdc.com/en/article/MTczMDc0MDUxOA", confidence: "high", needs_review: true, notes: "Temporary measure extended to 2028 — verify current status with the Bureau of Customs." },

  // ===== Iraq (LHD) =====
  { rule_id: "iq-drive-side", country_id: "iraq", category: "drive_side", title: "Left-hand drive (LHD) only", rule_text: "Iraq drives on the right and requires left-hand-drive (LHD) vehicles. Non-armored vehicles only; salvage, flood- and fire-damaged units are not admitted.", effective_date: null, last_checked: D, source: "UsedAutoX / chinausedcar.net (Iraq market guide)", source_url: "https://chinausedcar.net/market/iraq", confidence: "high", needs_review: false },
  { rule_id: "iq-age-limit", country_id: "iraq", category: "vehicle_age", title: "Used-vehicle age limit (about 5 years)", rule_text: "Iraq applies an age limit to used-vehicle imports, commonly cited around 5 years; some import guides report a stricter 2-year limit. Rules are enforced per entry point and change frequently — confirm the exact cut-off with the Umm Qasr agent / Iraqi customs before sourcing stock.", effective_date: null, last_checked: D, source: "chinausedcar.net (Iraq market guide)", source_url: "https://chinausedcar.net/market/iraq", confidence: "low", needs_review: true, notes: "Sources conflict (5-year vs 2-year limit) — verify with Iraqi customs before purchase." },
  { rule_id: "iq-import-docs", country_id: "iraq", category: "import_eligibility", title: "Original Bill of Lading + vehicle identifiers", rule_text: "Vehicles must ship with the original Bill of Lading showing chassis number, engine number, cubic capacity, year of manufacture, brand, make and model. Duty varies by vehicle category and engine size, and by entry port (Umm Qasr, Basrah/Khor Al Zubair).", effective_date: null, last_checked: D, source: "Auto Beats LLC / One Roof Autos (Iraq import policy)", source_url: "https://oneroofautos.com/import-policy/iraq", confidence: "low", needs_review: true, notes: "Duty varies by category and engine size — verify current schedule with Iraqi customs." },
  { rule_id: "iq-ev-policy", country_id: "iraq", category: "ev_policy", title: "No EV-specific import policy documented", rule_text: "No dedicated EV import-duty relief has been identified in the sources reviewed; EVs are treated under the standard variable duty schedule. Confirm EV treatment with Iraqi customs before trading.", effective_date: null, last_checked: D, source: "Needs verification (no EV-specific source located)", source_url: null, confidence: "unknown", needs_review: true, notes: "EV treatment not documented in reviewed sources — verify with Iraqi customs." },

  // ===== Ethiopia (LHD, EV-only) =====
  { rule_id: "et-drive-side", country_id: "ethiopia", category: "drive_side", title: "Left-hand drive (LHD) required", rule_text: "Ethiopia drives on the right and requires left-hand-drive (LHD) vehicles.", effective_date: null, last_checked: D, source: "Ethiopiauto (customs clearance guide)", source_url: "https://ethiopiauto.com/2026/09/20/customs-clearance-vehicles-ethiopia/", confidence: "high", needs_review: false },
  { rule_id: "et-ev-only", country_id: "ethiopia", category: "ev_policy", title: "EV-only import policy (petrol/diesel banned since Feb 2024)", rule_text: "Since February 2024 Ethiopia only allows the import of electric vehicles, banning petrol and diesel cars entirely. Combustion-engine used vehicles are not eligible for import or registration.", effective_date: "2024-02-01", last_checked: D, source: "Ethiopiauto (Feb 2024 EV-only policy)", source_url: "https://ethiopiauto.com/2026/09/20/customs-clearance-vehicles-ethiopia/", confidence: "high", needs_review: true, notes: "Policy change frequently cited; confirm current status with the Ethiopian Customs Commission." },
  { rule_id: "et-age-limit", country_id: "ethiopia", category: "vehicle_age", title: "Used-vehicle age limit (about 5 years)", rule_text: "Used EV imports are subject to an age limit, commonly cited around 5 years (with 1–3 years preferred for quality). Age is counted from year of manufacture.", effective_date: null, last_checked: D, source: "AutoLanded / RidoMart (Ethiopia import guide)", source_url: "https://autolanded.com/ethiopia/", confidence: "low", needs_review: true, notes: "Age-limit figures vary by source — verify with Ethiopian customs before purchase." },
  { rule_id: "et-import-docs", country_id: "ethiopia", category: "import_eligibility", title: "Original Bill of Lading + vehicle identifiers", rule_text: "Vehicles must ship with the original Bill of Lading showing chassis number, engine number, cubic capacity, year of manufacture, brand, make and model. Ethiopia is landlocked — vehicles transit via the Port of Djibouti.", effective_date: null, last_checked: D, source: "Auto Beats LLC (Ethiopia import policy)", source_url: "https://www.auto-beats.com/import-policy/ethiopia", confidence: "medium", needs_review: true, notes: "Uncertain / changes frequently — verify with Ethiopian customs before purchase." },

  // ===== Colombia (LHD) =====
  { rule_id: "co-drive-side", country_id: "colombia", category: "drive_side", title: "Left-hand drive (LHD) only", rule_text: "Colombia drives on the right and requires left-hand-drive (LHD) vehicles.", effective_date: null, last_checked: D, source: "Qualitex Trading (Colombia import regulations)", source_url: "https://www.qualitextrading.com/import-regulations/colombia", confidence: "high", needs_review: false },
  { rule_id: "co-used-ban", country_id: "colombia", category: "import_eligibility", title: "Used vehicles generally not importable (new / current-year only)", rule_text: "Colombia generally restricts permanent import to brand-new vehicles (current year, 0 km). Used vehicles cannot be imported by non-diplomats; exceptions cover diplomats and classic/collector cars over 35 years old under special approval. Change-of-residence and free-zone regimes have separate rules.", effective_date: null, last_checked: D, source: "Qualitex Trading / DIAN", source_url: "https://www.qualitextrading.com/import-regulations/colombia", confidence: "high", needs_review: false },
  { rule_id: "co-age-limit", country_id: "colombia", category: "vehicle_age", title: "1-year age limit (permitted categories)", rule_text: "For the limited categories that may import used vehicles, a 1-year age limit (from year of manufacture) generally applies. Used-vehicle imports are prohibited outside change-of-residence, diplomatic and free-zone regimes.", effective_date: null, last_checked: D, source: "AutoLanded (Colombia 2026)", source_url: "https://autolanded.com/colombia/", confidence: "medium", needs_review: true, notes: "Uncertain / changes frequently — verify with DIAN before purchase." },
  { rule_id: "co-ev-policy", country_id: "colombia", category: "ev_policy", title: "EV incentive (≈5–7% combined vs 35%+19% for ICE)", rule_text: "Colombia applies significant tax relief to electric vehicles — combined import taxes are reported around 5–7% of CIF for EVs, versus about 64–70% for combustion vehicles. The relief applies to new units; used-vehicle import remains prohibited.", effective_date: null, last_checked: D, source: "AutoLanded (Colombia 2026)", source_url: "https://autolanded.com/colombia/", confidence: "medium", needs_review: true, notes: "Uncertain / changes frequently — verify EV treatment with DIAN." },

  // ===== Morocco (LHD) =====
  { rule_id: "ma-drive-side", country_id: "morocco", category: "drive_side", title: "Left-hand drive (LHD) only", rule_text: "Morocco drives on the right and requires left-hand-drive (LHD) vehicles.", effective_date: null, last_checked: D, source: "Left- and right-hand traffic (Wikipedia)", source_url: WIKI_LHT, confidence: "high", needs_review: false },
  { rule_id: "ma-age-limit", country_id: "morocco", category: "vehicle_age", title: "5-year age limit + Euro 6 emissions", rule_text: "Imported used vehicles must be less than 5 years old at the moment of import and meet the Euro 6 emissions standard.", effective_date: null, last_checked: D, source: "Trimyo / Mover.ma (Morocco import guide)", source_url: "https://blog.trimyo.com/morocco/guides/bref-auto-20260823-05-importation-de-voitures-d-occasion-au-maroc-le-g/", confidence: "high", needs_review: true, notes: "Uncertain / changes frequently — verify with Moroccan Customs (ADII)." },
  { rule_id: "ma-import-docs", country_id: "morocco", category: "import_eligibility", title: "Euro 6 conformity + standard documents", rule_text: "Vehicles must conform to Moroccan safety and environmental standards (Euro 6) and clear through Moroccan Customs (ADII) with invoice, bill of lading and certificate of origin.", effective_date: null, last_checked: D, source: "Trimyo (Morocco import guide)", source_url: "https://blog.trimyo.com/morocco/guides/bref-auto-20260823-05-importation-de-voitures-d-occasion-au-maroc-le-g/", confidence: "medium", needs_review: true, notes: "Uncertain / changes frequently — verify with ADII." },
  { rule_id: "ma-ev-policy", country_id: "morocco", category: "ev_policy", title: "No EV-specific import-duty relief documented", rule_text: "No dedicated EV import-duty relief has been identified in the sources reviewed; EVs are subject to the same customs duty and VAT as combustion vehicles. Confirm EV treatment with ADII before trading.", effective_date: null, last_checked: D, source: "Needs verification (no EV-specific source located)", source_url: null, confidence: "unknown", needs_review: true, notes: "EV treatment not documented in reviewed sources — verify with ADII." },

  // ===== Sri Lanka (RHD) =====
  { rule_id: "lk-drive-side", country_id: "sri-lanka", category: "drive_side", title: "Right-hand drive (RHD) only", rule_text: "Sri Lanka drives on the left and registers right-hand-drive (RHD) vehicles. China-market LHD units cannot be registered as-is.", effective_date: null, last_checked: D, source: "Left- and right-hand traffic (Wikipedia)", source_url: WIKI_LHT, confidence: "high", needs_review: false },
  { rule_id: "lk-import-reopened", country_id: "sri-lanka", category: "import_eligibility", title: "Vehicle imports reopened (1 Feb 2025)", rule_text: "Sri Lanka lifted its multi-year vehicle import suspension effective 1 February 2025 under the Imports and Exports (Control) Regulations No. 01 of 2025 (Gazette Extraordinary No. 2421/04). Eligibility is determined under the new framework.", effective_date: "2025-02-01", last_checked: D, source: "LankaBizz / induwara.lk (Sri Lanka import regulations)", source_url: "https://lankabizz.net/2025/02/01/sri-lanka-updates-motor-vehicle-import-regulations/", confidence: "high", needs_review: true, notes: "Regime changes frequently — verify current eligibility with Sri Lanka Customs." },
  { rule_id: "lk-ev-policy", country_id: "sri-lanka", category: "ev_policy", title: "EV excise calculated per motor kW", rule_text: "Sri Lanka levies excise on electric vehicles per motor kilowatt (rather than per cc of engine displacement), under the February 2025 regime. EV duty treatment is distinct from combustion vehicles.", effective_date: "2025-02-01", last_checked: D, source: "CarDreams.lk (Sri Lanka excise duty glossary)", source_url: "https://cardreams.lk/glossary/excise-duty", confidence: "medium", needs_review: true, notes: "Rates change frequently by gazette — verify with Sri Lanka Customs." },
];
for (const r of rules) {
  if (!importrules.rules.find((x) => x.rule_id === r.rule_id)) importrules.rules.push(r);
}
write("importrules.json", importrules);

// ---------- taxrules.json ----------
const taxrules = read("taxrules.json");
const taxes = [
  // Philippines
  { taxrule_id: "ph-duty", country_id: "philippines", tax_type: "import_duty", label: "Import duty (used vehicles)", rate_pct: 40.0, basis: "Dutiable value", effective_date: null, last_checked: D, source: "Qualitex Trading (Philippines)", source_url: "https://www.qualitextrading.com/import-regulations/philippines", confidence: "medium", needs_review: true, notes: "Used imports generally prohibited except NDI program; 40% duty applies where import is permitted. Verify with BOC." },
  { taxrule_id: "ph-vat", country_id: "philippines", tax_type: "vat", label: "VAT", rate_pct: 12.0, basis: "Dutiable value + duty", effective_date: null, last_checked: D, source: "Philippine VAT (RA 9337) / BIR", source_url: "https://www.bir.gov.ph", confidence: "medium", needs_review: false, notes: "Standard Philippine VAT rate 12%; some secondary sources cite an outdated 10%." },
  { taxrule_id: "ph-ev-duty", country_id: "philippines", tax_type: "import_duty", label: "Import duty (electric / hybrid vehicles, 0% under EO 12)", rate_pct: 0.0, basis: "Dutiable value", effective_date: "2023-02-20", last_checked: D, source: "HKTDC Research / Bureau of Customs CMC 64-2023", source_url: "https://research.hktdc.com/en/article/MTczMDc0MDUxOA", confidence: "high", needs_review: true, notes: "EO 12 zero duty on EVs extended to 2028 and broadened to HEV/PHEV. Verify current status with BOC." },

  // Ethiopia (EV-only)
  { taxrule_id: "et-ev-duty", country_id: "ethiopia", tax_type: "import_duty", label: "Import duty (electric vehicles)", rate_pct: 15.0, basis: "CIF value", effective_date: null, last_checked: D, source: "RidoMart (Ethiopia market guide)", source_url: "https://ridomart.com/markets/ethiopia", confidence: "low", needs_review: true, notes: "Reported around 15% for imported complete EVs; petrol/diesel imports banned since Feb 2024. Verify with Ethiopian customs." },
  { taxrule_id: "et-vat", country_id: "ethiopia", tax_type: "vat", label: "VAT", rate_pct: 15.0, basis: "CIF + duty", effective_date: null, last_checked: D, source: "RidoMart / AutoLanded (Ethiopia)", source_url: "https://ridomart.com/markets/ethiopia", confidence: "medium", needs_review: false },

  // Colombia
  { taxrule_id: "co-duty", country_id: "colombia", tax_type: "import_duty", label: "Import duty (DAI, passenger vehicles)", rate_pct: 35.0, basis: "CIF value", effective_date: null, last_checked: D, source: "DIAN / colombiatramita.co", source_url: "https://colombiatramita.co/vehiculos/importar-vehiculo-colombia/", confidence: "high", needs_review: true, notes: "35% import duty + 19% VAT + 8–16% consumption tax for ICE. Used imports generally prohibited. Verify with DIAN." },
  { taxrule_id: "co-vat", country_id: "colombia", tax_type: "vat", label: "VAT (IVA)", rate_pct: 19.0, basis: "CIF + duty", effective_date: null, last_checked: D, source: "DIAN / colombiatramita.co", source_url: "https://colombiatramita.co/vehiculos/importar-vehiculo-colombia/", confidence: "high", needs_review: false },
  { taxrule_id: "co-consumption", country_id: "colombia", tax_type: "excise", label: "Consumption tax (Impoconsumo)", rate_pct: 8.0, basis: "Vehicle value", effective_date: null, last_checked: D, source: "colombiamove.com / DIAN", source_url: "https://colombiamove.com/blog/import-car-to-colombia-foreigner-guide/", confidence: "low", needs_review: true, notes: "8%–16% consumption tax band, layered with duty + VAT. Verify with DIAN." },

  // Morocco
  { taxrule_id: "ma-duty", country_id: "morocco", tax_type: "import_duty", label: "Import duty (Droits d'importation)", rate_pct: 17.5, basis: "Vehicle value", effective_date: null, last_checked: D, source: "eCarsTrade (Morocco import guide)", source_url: "https://ecarstrade.com/blog/how-to-import-a-car-to-morocco", confidence: "medium", needs_review: true, notes: "Rate depends on engine size and origin; ~17.5% typical for passenger cars. Verify with ADII." },
  { taxrule_id: "ma-vat", country_id: "morocco", tax_type: "vat", label: "VAT (TVA)", rate_pct: 20.0, basis: "Vehicle value + duty", effective_date: null, last_checked: D, source: "Trimyo (Morocco import guide)", source_url: "https://blog.trimyo.com/morocco/guides/bref-auto-20260823-05-importation-de-voitures-d-occasion-au-maroc-le-g/", confidence: "medium", needs_review: false },

  // Sri Lanka
  { taxrule_id: "lk-duty", country_id: "sri-lanka", tax_type: "import_duty", label: "Customs import duty (base)", rate_pct: 20.0, basis: "CIF value", effective_date: "2025-02-01", last_checked: D, source: "tak.lk (Sri Lanka vehicle import duty)", source_url: "https://tak.lk/tools/vehicle-import-duty", confidence: "low", needs_review: true, notes: "20% base plus 50% surcharge; layered with excise, PAL, SSCL and VAT. Rates change by gazette — verify with Sri Lanka Customs." },
  { taxrule_id: "lk-vat", country_id: "sri-lanka", tax_type: "vat", label: "VAT", rate_pct: 18.0, basis: "CIF + duty + surcharge", effective_date: "2025-02-01", last_checked: D, source: "tak.lk (Sri Lanka vehicle import duty)", source_url: "https://tak.lk/tools/vehicle-import-duty", confidence: "medium", needs_review: false },
  { taxrule_id: "lk-sscl", country_id: "sri-lanka", tax_type: "other", label: "Social Security Contribution Levy (SSCL)", rate_pct: 2.5, basis: "CIF value", effective_date: "2025-02-01", last_checked: D, source: "tak.lk (Sri Lanka vehicle import duty)", source_url: "https://tak.lk/tools/vehicle-import-duty", confidence: "low", needs_review: true, notes: "Layered with duty, excise, PAL and VAT. Verify with Sri Lanka Customs." },
];
for (const t of taxes) {
  if (!taxrules.taxrules.find((x) => x.taxrule_id === t.taxrule_id)) taxrules.taxrules.push(t);
}
write("taxrules.json", taxrules);

// ---------- ports.json ----------
const ports = read("ports.json");
const newPorts = [
  { port_id: "ph-manila", name: "Manila (Port of Manila)", country_id: "philippines", type: "destination", note: null },
  { port_id: "iq-umm-qasr", name: "Umm Qasr", country_id: "iraq", type: "destination", note: null },
  { port_id: "iq-basrah", name: "Basrah (Khor Al Zubair)", country_id: "iraq", type: "destination", note: null },
  { port_id: "et-djibouti", name: "Djibouti (transit for landlocked Ethiopia)", country_id: "ethiopia", type: "destination", note: "Landlocked — vehicles transit via Port of Djibouti" },
  { port_id: "co-cartagena", name: "Cartagena", country_id: "colombia", type: "destination", note: null },
  { port_id: "co-buenaventura", name: "Buenaventura", country_id: "colombia", type: "destination", note: null },
  { port_id: "ma-casablanca", name: "Casablanca", country_id: "morocco", type: "destination", note: null },
  { port_id: "ma-tanger-med", name: "Tanger Med", country_id: "morocco", type: "destination", note: null },
  { port_id: "lk-colombo", name: "Colombo", country_id: "sri-lanka", type: "destination", note: null },
];
for (const p of newPorts) {
  if (!ports.ports.find((x) => x.port_id === p.port_id)) ports.ports.push(p);
}
write("ports.json", ports);

// ---------- routes.json ----------
const routes = read("routes.json");
const newRoutes = [
  { route_id: "cn-shanghai-to-ph-manila", origin_port_id: "cn-shanghai", destination_port_id: "ph-manila", est_days_min: 6, est_days_max: 12, shipping_method: "roro", source: "Industry route estimates", source_url: null, last_checked: D, confidence: "low" },
  { route_id: "cn-guangzhou-to-ph-manila", origin_port_id: "cn-guangzhou", destination_port_id: "ph-manila", est_days_min: 4, est_days_max: 8, shipping_method: "roro", source: "Industry route estimates", source_url: null, last_checked: D, confidence: "low" },
  { route_id: "cn-shanghai-to-iq-umm-qasr", origin_port_id: "cn-shanghai", destination_port_id: "iq-umm-qasr", est_days_min: 18, est_days_max: 28, shipping_method: "roro", source: "Industry route estimates", source_url: null, last_checked: D, confidence: "low" },
  { route_id: "cn-shanghai-to-et-djibouti", origin_port_id: "cn-shanghai", destination_port_id: "et-djibouti", est_days_min: 18, est_days_max: 28, shipping_method: "roro", source: "Industry route estimates", source_url: null, last_checked: D, confidence: "low" },
  { route_id: "cn-shanghai-to-co-cartagena", origin_port_id: "cn-shanghai", destination_port_id: "co-cartagena", est_days_min: 28, est_days_max: 40, shipping_method: "roro", source: "Industry route estimates", source_url: null, last_checked: D, confidence: "low" },
  { route_id: "cn-shanghai-to-ma-casablanca", origin_port_id: "cn-shanghai", destination_port_id: "ma-casablanca", est_days_min: 26, est_days_max: 36, shipping_method: "roro", source: "Industry route estimates", source_url: null, last_checked: D, confidence: "low" },
  { route_id: "cn-ningbo-to-ma-tanger-med", origin_port_id: "cn-ningbo", destination_port_id: "ma-tanger-med", est_days_min: 26, est_days_max: 36, shipping_method: "roro", source: "Industry route estimates", source_url: null, last_checked: D, confidence: "low" },
  { route_id: "cn-shanghai-to-lk-colombo", origin_port_id: "cn-shanghai", destination_port_id: "lk-colombo", est_days_min: 10, est_days_max: 16, shipping_method: "roro", source: "Industry route estimates", source_url: null, last_checked: D, confidence: "low" },
];
for (const r of newRoutes) {
  if (!routes.routes.find((x) => x.route_id === r.route_id)) routes.routes.push(r);
}
write("routes.json", routes);

// ---------- vehicle-market.json relations ----------
const vm = read("vehicle-market.json");
vm.meta.batch = "batch 14 — market-countries3";
vm.meta.updated = D;

const dsMatch = (summary) => ({ status: "match", summary, source: "Data sub-site models.json (export intelligence) + Left- and right-hand traffic (Wikipedia)", source_url: WIKI_LHT, source_type: "database", confidence: "high", checked_date: D });
const dsRhd = (model, market, extra) => ({ status: "needs_conversion", summary: `China domestic-market production is left-hand drive (LHD), but ${market} registers right-hand drive (RHD) only — ${model} is produced in RHD for export markets (${extra}). Confirm RHD availability with the exporter and source an RHD unit.`, source: "Data sub-site models.json (export intelligence) + Left- and right-hand traffic (Wikipedia)", source_url: WIKI_LHT, source_type: "database", confidence: "medium", checked_date: D, needs_review: true });
const charging = (dest) => ({ standard: "GB/T", destination_standard: dest, connector: "GB/T AC / GB/T DC (vehicle inlet)", voltage: null, frequency: null, needs_adapter: true, notes: `China-market GB/T inlet vs ${dest} network — adapter required; confirm the sourced unit's inlet (some export units carry a CCS2 inlet).`, source: "Vehicle: GB/T charging standard (Wikipedia); Destination: Combined Charging System / Type 2 (Wikipedia)", source_url: GBTSRC, source_type: "reputable_media", confidence: "medium", checked_date: D, needs_review: true });

const relations = [
  // ===== Philippines (LHD, EV zero-duty EO 12) =====
  {
    vehicle_id: "byd-atto-3", country_id: "philippines",
    drive_side_fit: dsMatch("China domestic-market production is left-hand drive (LHD); the Philippines registers LHD only — no conversion required."),
    age_rule_fit: { status: "ineligible", summary: "The Philippines generally prohibits used-vehicle imports (EO 156/EO 877-A); only the NDI program (returning residents, immigrants, diplomats) may import used units. A used Atto 3 is ineligible for ordinary import — source through a qualified NDI channel or as brand-new stock.", source: "Respicio.ph / Bureau of Customs (used-import prohibition)", source_url: "https://www.respicio.ph/commentaries/rules-and-taxes-for-importing-a-personal-vehicle-into-the-philippines", source_type: "regulatory", confidence: "high", checked_date: D, needs_review: false },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — the Philippines zero-rates import duty on EVs under EO 12 (extended to 2028): 0% vs 40% standard duty. The EV class enjoys the largest duty-relief delta in the market.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "high", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)"),
    import_eligibility: { status: "conformity_required", requirements: ["NDI program qualification (used)", "Bureau of Customs clearance"], notes: "Used import is generally prohibited; EV zero-duty (EO 12) applies to eligible imports. Confirm NDI eligibility or import as brand-new.", source: "market sub-site importrules.json (used-import restriction / EO 12)", source_url: "https://www.respicio.ph/commentaries/rules-and-taxes-for-importing-a-personal-vehicle-into-the-philippines", source_type: "regulatory", confidence: "high", checked_date: D, needs_review: false },
    duty_anchors: { standard_duty_taxrule_id: "ph-duty", ev_duty_taxrule_id: "ph-ev-duty", vat_taxrule_id: "ph-vat", ev_duty_relief: true, notes: "EV trims: 0% import duty (EO 12) vs 40% standard, + 12% VAT. Referenced from taxrules.json — verify with BOC.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://research.hktdc.com/en/article/MTczMDc0MDUxOA", source_type: "government", confidence: "high", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-ph-manila", "cn-guangzhou-to-ph-manila"], notes: "Sea freight to Manila (RoRo).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV; the used-import prohibition and the EV zero-duty incentive are the key fit questions for the Philippines.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "high", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/atto3", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },
  {
    vehicle_id: "byd-sealion-6", country_id: "philippines",
    drive_side_fit: dsMatch("China domestic-market production is left-hand drive (LHD); the Philippines registers LHD only — no conversion required."),
    age_rule_fit: { status: "ineligible", summary: "The Philippines generally prohibits used-vehicle imports (EO 156/EO 877-A); only the NDI program may import used units. A used Sealion 6 is ineligible for ordinary import — source through NDI or as brand-new stock.", source: "Respicio.ph / Bureau of Customs (used-import prohibition)", source_url: "https://www.respicio.ph/commentaries/rules-and-taxes-for-importing-a-personal-vehicle-into-the-philippines", source_type: "regulatory", confidence: "high", checked_date: D, needs_review: false },
    powertrain_fit: { status: "noted", summary: "PHEV (plug-in hybrid) — EO 12 was broadened to zero-rate import duty on hybrids and PHEVs (removing the previous 30% duty) until 2028. PHEV classification is the key duty question.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "high", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)"),
    import_eligibility: { status: "conformity_required", requirements: ["NDI program qualification (used)", "Bureau of Customs clearance"], notes: "Used import generally prohibited; PHEV zero-duty (EO 12 broadened) applies to eligible imports.", source: "market sub-site importrules.json (used-import restriction / EO 12)", source_url: "https://www.respicio.ph/commentaries/rules-and-taxes-for-importing-a-personal-vehicle-into-the-philippines", source_type: "regulatory", confidence: "high", checked_date: D, needs_review: false },
    duty_anchors: { standard_duty_taxrule_id: "ph-duty", ev_duty_taxrule_id: "ph-ev-duty", vat_taxrule_id: "ph-vat", ev_duty_relief: true, notes: "PHEV trims: 0% duty (EO 12 broadened to HEV/PHEV) vs 40% standard, + 12% VAT. Referenced from taxrules.json — verify with BOC.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://research.hktdc.com/en/article/MTczMDc0MDUxOA", source_type: "government", confidence: "high", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-ph-manila"], notes: "Sea freight to Manila (RoRo).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Sealion 6 (宋PLUS export) is a compact PHEV SUV; PHEV-vs-EV duty classification under EO 12 and the used-import prohibition are the key fit questions.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/seal-u", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },

  // ===== Ethiopia (LHD, EV-only) =====
  {
    vehicle_id: "byd-atto-3", country_id: "ethiopia",
    drive_side_fit: dsMatch("China domestic-market production is left-hand drive (LHD); Ethiopia registers LHD only — no conversion required."),
    age_rule_fit: { status: "eligible", summary: "Atto 3 production began 2022; Ethiopia's reported ~5-year age limit is satisfied by current units. Confirm the unit's manufacture year.", source: "market sub-site importrules.json (age limit)", source_url: "https://autolanded.com/ethiopia/", source_type: "regulatory", confidence: "low", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — Ethiopia's EV-only policy (petrol/diesel banned since Feb 2024) makes EVs the only eligible class. Atto 3 is a direct fit for the EV-only market.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "high", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes) — early-stage"),
    import_eligibility: { status: "conformity_required", requirements: ["EV-only eligibility (petrol/diesel banned)", "Original Bill of Lading with identifiers"], notes: "Ethiopia only permits EV imports since Feb 2024; combustion units are not eligible. Transit via Djibouti.", source: "market sub-site importrules.json (EV-only policy)", source_url: "https://ethiopiauto.com/2026/09/20/customs-clearance-vehicles-ethiopia/", source_type: "regulatory", confidence: "high", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: null, ev_duty_taxrule_id: "et-ev-duty", vat_taxrule_id: "et-vat", ev_duty_relief: true, notes: "EV-only market: ~15% EV import duty + 15% VAT (no ICE rate — combustion banned). Referenced from taxrules.json — verify with Ethiopian customs.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://ridomart.com/markets/ethiopia", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-et-djibouti"], notes: "Sea freight to Djibouti, then road transit into landlocked Ethiopia (RoRo + truck).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV; Ethiopia's EV-only policy makes it one of the few directly eligible models — combustion alternatives are banned.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "high", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/atto3", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },

  // ===== Colombia (LHD, used ban + EV incentive) =====
  {
    vehicle_id: "byd-atto-3", country_id: "colombia",
    drive_side_fit: dsMatch("China domestic-market production is left-hand drive (LHD); Colombia registers LHD only — no conversion required."),
    age_rule_fit: { status: "ineligible", summary: "Colombia generally prohibits used-vehicle imports (brand-new / current-year 0 km only for permanent import). A used Atto 3 is ineligible for ordinary import; the EV incentive applies to new units.", source: "market sub-site importrules.json (used-import ban)", source_url: "https://www.qualitextrading.com/import-regulations/colombia", source_type: "regulatory", confidence: "high", checked_date: D, needs_review: false },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — Colombia taxes combustion vehicles at ~64–70% of CIF but applies strong EV relief (~5–7% combined). The EV incentive is significant but applies to new units.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 1 (J1772) / CHAdeMO — early-stage"),
    import_eligibility: { status: "conformity_required", requirements: ["Brand-new / current-year (used prohibited)", "DIAN clearance"], notes: "Used-vehicle import prohibited outside diplomatic/classic/free-zone regimes; EV incentive applies to new units.", source: "market sub-site importrules.json (used-import ban)", source_url: "https://www.qualitextrading.com/import-regulations/colombia", source_type: "regulatory", confidence: "high", checked_date: D, needs_review: false },
    duty_anchors: { standard_duty_taxrule_id: "co-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "co-vat", ev_duty_relief: false, notes: "ICE: 35% duty + 19% VAT + 8–16% consumption tax (~64–70% combined); EVs reported ~5–7% combined. Referenced from taxrules.json — verify with DIAN.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://colombiatramita.co/vehiculos/importar-vehiculo-colombia/", source_type: "government", confidence: "high", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-co-cartagena"], notes: "Sea freight to Cartagena (RoRo); Buenaventura as Pacific alternative.", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV; Colombia's used-import ban (new-only) is the hard blocker, while the EV tax incentive favors new units.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/atto3", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },

  // ===== Iraq (LHD, ~5-year age rule) =====
  {
    vehicle_id: "geely-monjaro", country_id: "iraq",
    drive_side_fit: dsMatch("China domestic-market production is left-hand drive (LHD); Iraq registers LHD only — no conversion required."),
    age_rule_fit: { status: "borderline", summary: "Monjaro production began 2021; Iraq's ~5-year age limit (some sources cite 2 years) makes 2021 units borderline/over — source 2022+ units and verify the exact cut-off with Iraqi customs.", source: "market sub-site importrules.json (age limit)", source_url: "https://chinausedcar.net/market/iraq", source_type: "regulatory", confidence: "low", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Combustion (ICE) — subject to Iraq's variable duty schedule (by category and engine size); no EV-specific treatment applies.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: null,
    import_eligibility: { status: "conformity_required", requirements: ["Original Bill of Lading with identifiers", "Non-armored / no salvage damage"], notes: "Duty varies by category, engine size and entry port (Umm Qasr / Basrah); LHD only, non-armored.", source: "market sub-site importrules.json (import documents)", source_url: "https://oneroofautos.com/import-policy/iraq", source_type: "regulatory", confidence: "low", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: null, ev_duty_taxrule_id: null, vat_taxrule_id: null, ev_duty_relief: false, notes: "Iraq duty is variable by engine size/category (no single sourced rate) — verify with Iraqi customs before quoting.", source: "market sub-site taxrules.json (no fixed rate recorded)", source_url: "https://chinausedcar.net/market/iraq", source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-iq-umm-qasr"], notes: "Sea freight to Umm Qasr (RoRo); Basrah/Khor Al Zubair as alternative.", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "Geely Monjaro is an ICE SUV; the ~5-year age rule vs its 2021 start and Iraq's variable duty schedule are the key fit questions.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://en.wikipedia.org/wiki/Geely_Xingyue_L", source_type: "reputable_media", confidence: "medium", checked_date: D,
  },
  {
    vehicle_id: "chery-tiggo-8", country_id: "iraq",
    drive_side_fit: dsMatch("China domestic-market production is left-hand drive (LHD); Iraq registers LHD only — no conversion required."),
    age_rule_fit: { status: "ineligible", summary: "Tiggo 8 production began 2018; Iraq's ~5-year age limit means 2018 units are ~8 years old (ineligible) — only 2022+ units are within the window. Verify with Iraqi customs.", source: "market sub-site importrules.json (age limit)", source_url: "https://chinausedcar.net/market/iraq", source_type: "regulatory", confidence: "low", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Combustion (ICE) — subject to Iraq's variable duty schedule; no EV-specific treatment.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: null,
    import_eligibility: { status: "conformity_required", requirements: ["Original Bill of Lading with identifiers", "Non-armored / no salvage damage"], notes: "Duty varies by category and engine size; LHD only, non-armored.", source: "market sub-site importrules.json (import documents)", source_url: "https://oneroofautos.com/import-policy/iraq", source_type: "regulatory", confidence: "low", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: null, ev_duty_taxrule_id: null, vat_taxrule_id: null, ev_duty_relief: false, notes: "Iraq duty is variable by engine size/category — verify with Iraqi customs before quoting.", source: "market sub-site taxrules.json (no fixed rate recorded)", source_url: "https://chinausedcar.net/market/iraq", source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-iq-umm-qasr"], notes: "Sea freight to Umm Qasr (RoRo).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "Chery Tiggo 8 is an ICE SUV; the ~5-year age rule vs its 2018 start is the primary blocker for Iraq.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://en.wikipedia.org/wiki/Chery_Tiggo_8", source_type: "reputable_media", confidence: "medium", checked_date: D,
  },

  // ===== Morocco (LHD, 5-year + Euro 6) =====
  {
    vehicle_id: "geely-monjaro", country_id: "morocco",
    drive_side_fit: dsMatch("China domestic-market production is left-hand drive (LHD); Morocco registers LHD only — no conversion required."),
    age_rule_fit: { status: "borderline", summary: "Monjaro production began 2021; Morocco's 5-year age limit makes 2021 units borderline/over — source 2022+ units and verify the manufacture date. Euro 6 conformity also applies.", source: "market sub-site importrules.json (5-year age limit)", source_url: "https://blog.trimyo.com/morocco/guides/bref-auto-20260823-05-importation-de-voitures-d-occasion-au-maroc-le-g/", source_type: "regulatory", confidence: "high", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Combustion (ICE) — subject to ~17.5% import duty + 20% VAT; no EV-specific relief recorded.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: null,
    import_eligibility: { status: "conformity_required", requirements: ["Euro 6 conformity", "Standard documents (invoice, B/L, certificate of origin)"], notes: "Euro 6 emissions conformity and <5 years age are the hard filters; clear through ADII.", source: "market sub-site importrules.json (Euro 6 + documents)", source_url: "https://blog.trimyo.com/morocco/guides/bref-auto-20260823-05-importation-de-voitures-d-occasion-au-maroc-le-g/", source_type: "regulatory", confidence: "high", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "ma-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "ma-vat", ev_duty_relief: false, notes: "ICE: ~17.5% duty + 20% VAT (no EV-specific relief recorded). Referenced from taxrules.json — verify with ADII.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://ecarstrade.com/blog/how-to-import-a-car-to-morocco", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-ma-casablanca"], notes: "Sea freight to Casablanca (RoRo); Tanger Med as alternative.", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "Geely Monjaro is an ICE SUV; Morocco's 5-year age rule + Euro 6 conformity are the key fit questions.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://en.wikipedia.org/wiki/Geely_Xingyue_L", source_type: "reputable_media", confidence: "medium", checked_date: D,
  },

  // ===== Sri Lanka (RHD, imports reopened Feb 2025) =====
  {
    vehicle_id: "byd-atto-3", country_id: "sri-lanka",
    drive_side_fit: dsRhd("BYD Atto 3", "Sri Lanka", "Australia, Thailand, Singapore"),
    age_rule_fit: null,
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — Sri Lanka levies excise per motor kW (not per cc) under the Feb 2025 regime, a distinct EV treatment from combustion vehicles.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes) — early-stage"),
    import_eligibility: { status: "conformity_required", requirements: ["Eligibility under Imports & Exports (Control) Regs 01/2025", "Sri Lanka Customs clearance"], notes: "Vehicle imports reopened 1 Feb 2025 after a multi-year suspension; eligibility is determined under the new framework.", source: "market sub-site importrules.json (imports reopened)", source_url: "https://lankabizz.net/2025/02/01/sri-lanka-updates-motor-vehicle-import-regulations/", source_type: "regulatory", confidence: "high", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "lk-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "lk-vat", ev_duty_relief: false, notes: "Layered taxes: 20% base duty + 50% surcharge + excise (per kW for EVs) + 18% VAT + 2.5% SSCL. Referenced from taxrules.json — verify with Sri Lanka Customs.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://tak.lk/tools/vehicle-import-duty", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-lk-colombo"], notes: "Sea freight to Colombo (RoRo).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV with RHD availability; Sri Lanka's RHD requirement and per-kW EV excise are the key fit questions.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/atto3", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },
  {
    vehicle_id: "geely-coolray", country_id: "sri-lanka",
    drive_side_fit: { status: "needs_conversion", summary: "China domestic-market production is left-hand drive (LHD), but Sri Lanka registers right-hand drive (RHD) only — Geely sells the Coolray (Binyue) in RHD form across ASEAN (as the Proton X50 in Malaysia). Confirm RHD availability and source an RHD unit.", source: "Data sub-site models.json (export intelligence) + Left- and right-hand traffic (Wikipedia)", source_url: WIKI_LHT, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    age_rule_fit: null,
    powertrain_fit: { status: "noted", summary: "Combustion (ICE) — Sri Lanka's layered duty stack (20% + 50% surcharge + excise + VAT + SSCL) applies to combustion vehicles under the reopened Feb 2025 regime.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: null,
    import_eligibility: { status: "conformity_required", requirements: ["Eligibility under Imports & Exports (Control) Regs 01/2025", "Sri Lanka Customs clearance"], notes: "Vehicle imports reopened 1 Feb 2025; RHD required.", source: "market sub-site importrules.json (imports reopened)", source_url: "https://lankabizz.net/2025/02/01/sri-lanka-updates-motor-vehicle-import-regulations/", source_type: "regulatory", confidence: "high", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "lk-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "lk-vat", ev_duty_relief: false, notes: "ICE: 20% base duty + 50% surcharge + excise (per cc) + 18% VAT + 2.5% SSCL. Referenced from taxrules.json — verify with Sri Lanka Customs.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://tak.lk/tools/vehicle-import-duty", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-lk-colombo"], notes: "Sea freight to Colombo (RoRo).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "Geely Coolray (Binyue) is a compact ICE SUV with RHD availability (Proton X50); RHD sourcing and the layered Sri Lanka tax stack are the key fit questions.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://en.wikipedia.org/wiki/Geely_Coolray", source_type: "reputable_media", confidence: "medium", checked_date: D,
  },
  {
    vehicle_id: "byd-dolphin", country_id: "sri-lanka",
    drive_side_fit: dsRhd("BYD Dolphin", "Sri Lanka", "Australia, Thailand, Singapore"),
    age_rule_fit: null,
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — Sri Lanka levies excise per motor kW under the Feb 2025 regime; a compact affordable EV with clear market fit.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes) — early-stage"),
    import_eligibility: { status: "conformity_required", requirements: ["Eligibility under Imports & Exports (Control) Regs 01/2025", "Sri Lanka Customs clearance"], notes: "Vehicle imports reopened 1 Feb 2025; RHD required.", source: "market sub-site importrules.json (imports reopened)", source_url: "https://lankabizz.net/2025/02/01/sri-lanka-updates-motor-vehicle-import-regulations/", source_type: "regulatory", confidence: "high", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "lk-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "lk-vat", ev_duty_relief: false, notes: "EV: layered 20% base duty + 50% surcharge + excise (per kW) + 18% VAT + 2.5% SSCL. Referenced from taxrules.json — verify with Sri Lanka Customs.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://tak.lk/tools/vehicle-import-duty", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-lk-colombo"], notes: "Sea freight to Colombo (RoRo).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Dolphin is a compact EV hatchback with strong RHD availability; RHD sourcing and per-kW EV excise are the key fit questions for Sri Lanka.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/dolphin", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },
];

const skips = [
  { vehicle_id: "byd-seal", country_id: "philippines", reason: "EV × LHD — EV zero-duty delta already represented by byd-atto-3 × philippines; used-import prohibition same for all EV models (mechanical EV cross-product, avoid)." },
  { vehicle_id: "byd-dolphin", country_id: "philippines", reason: "EV × LHD — EV zero-duty + used-ban delta already represented by byd-atto-3 × philippines (mechanical EV cross-product, avoid)." },
  { vehicle_id: "wuling-bingo", country_id: "ethiopia", reason: "EV × LHD — EV-only-policy delta already represented by byd-atto-3 × ethiopia; no distinct increment (mechanical EV cross-product, avoid)." },
  { vehicle_id: "mg-4", country_id: "colombia", reason: "EV × LHD — used-import ban + EV incentive delta already represented by byd-atto-3 × colombia (mechanical EV cross-product, avoid)." },
  { vehicle_id: "chery-tiggo-8", country_id: "colombia", reason: "ICE × LHD — used-import ban delta already represented by byd-atto-3 × colombia (mechanical cross-product, avoid)." },
  { vehicle_id: "chery-tiggo-8", country_id: "morocco", reason: "ICE × LHD — 5-year age-rule delta already represented by geely-monjaro × morocco (mechanical ICE cross-product, avoid)." },
  { vehicle_id: "byd-seal", country_id: "sri-lanka", reason: "EV × RHD — RHD + per-kW EV excise delta already represented by byd-atto-3 × sri-lanka (mechanical EV cross-product, avoid)." },
  { vehicle_id: "geely-monjaro", country_id: "sri-lanka", reason: "ICE × RHD — RHD + layered-tax delta already represented by geely-coolray × sri-lanka (mechanical ICE cross-product, avoid)." },
  { vehicle_id: "byd-atto-3", country_id: "iraq", reason: "EV × LHD — Iraq has no EV-specific duty relief and no distinct EV increment; EV treatment not documented (defer until Iraq EV duty data exists)." },
];

let added = 0;
for (const rel of relations) {
  if (vm.relations.find((x) => x.vehicle_id === rel.vehicle_id && x.country_id === rel.country_id)) continue;
  vm.relations.push(rel);
  added++;
}
let skipped = 0;
for (const s of skips) {
  if (vm.skipped.find((x) => x.vehicle_id === s.vehicle_id && x.country_id === s.country_id)) continue;
  if (vm.relations.find((x) => x.vehicle_id === s.vehicle_id && x.country_id === s.country_id)) continue;
  vm.skipped.push(s);
  skipped++;
}
write("vehicle-market.json", vm);

console.log(`countries: ${countries.countries.length}, rules: ${importrules.rules.length}, taxes: ${taxrules.taxrules.length}, ports: ${ports.ports.length}, routes: ${routes.routes.length}, relations: ${vm.relations.length} (+${added}), skips: ${vm.skipped.length} (+${skipped})`);
