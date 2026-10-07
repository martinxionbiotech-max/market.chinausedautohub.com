// Batch: market-countries2 — add 6 more high-commercial-value countries + data layer + Vehicle×Market relations.
// Countries: Thailand (RHD), Vietnam (LHD), Indonesia (RHD), Mexico (LHD), Ghana (RHD), Peru (LHD).
// All regulatory data cited to official/reliable sources; every statement carries source URL + last_checked (2026-10-07).
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
  { country_id: "thailand", name: "Thailand", name_zh: "泰国", region: "southeast-asia", drive_side: "rhd", currency: "THB", status: "active", source: "Thai Customs Department / Board of Investment (BOI)", source_url: "https://osos.boi.go.th/EN/news/1723/EV-Board-Gives-the-Green-Light-to-EV-3-5-Package-Positioning-Thailand-as-the-Key-Regional-Hub-for-Electric-Vehicle-Manufacturing/", source_date: D, confidence: "high" },
  { country_id: "vietnam", name: "Vietnam", name_zh: "越南", region: "southeast-asia", drive_side: "lhd", currency: "VND", status: "active", source: "Vietnam General Department of Customs / Decree 116/2017", source_url: "https://ucarsea.com/vietnam-used-car-import-guide/", source_date: D, confidence: "high" },
  { country_id: "indonesia", name: "Indonesia", name_zh: "印度尼西亚", region: "southeast-asia", drive_side: "rhd", currency: "IDR", status: "active", source: "Indonesia Directorate General of Customs and Excise", source_url: "https://www.aseanncap.org/indonesias-used-car-import-rules-permits-taxes-ev-benefits/", source_date: D, confidence: "high" },
  { country_id: "mexico", name: "Mexico", name_zh: "墨西哥", region: "north-america", drive_side: "lhd", currency: "MXN", status: "active", source: "US International Trade Administration (trade.gov)", source_url: "https://www.trade.gov/market-intelligence/mexico-import-regulations-used-vehicles", source_date: D, confidence: "high" },
  { country_id: "ghana", name: "Ghana", name_zh: "加纳", region: "africa", drive_side: "rhd", currency: "GHS", status: "active", source: "Ghana Standards Authority (GSA)", source_url: "https://chale.news/six-weeks-left-ghanas-new-car-import-rules-kick-in-october-1/", source_date: D, confidence: "high" },
  { country_id: "peru", name: "Peru", name_zh: "秘鲁", region: "latin-america", drive_side: "lhd", currency: "PEN", status: "active", source: "SUNAT (Peru Customs)", source_url: "https://www.sunat.gob.pe/customsinformation/importofvehicles/age_of_vehicle.html", source_date: D, confidence: "high" },
];
for (const c of newCountries) {
  if (!countries.countries.find((x) => x.country_id === c.country_id)) countries.countries.push(c);
}
write("countries.json", countries);

// ---------- importrules.json ----------
const importrules = read("importrules.json");
const rules = [
  // Thailand (RHD)
  { rule_id: "th-drive-side", country_id: "thailand", category: "drive_side", title: "Right-hand drive (RHD) only", rule_text: "Thailand drives on the left and registers right-hand-drive (RHD) vehicles. China-market LHD units cannot be registered as-is; source RHD export units.", effective_date: null, last_checked: D, source: "Left- and right-hand traffic (Wikipedia)", source_url: WIKI_LHT, confidence: "high", needs_review: false },
  { rule_id: "th-used-restriction", country_id: "thailand", category: "vehicle_age", title: "Used-vehicle imports tightly restricted", rule_text: "Thailand heavily restricts used-vehicle imports. Regular used passenger-car imports are generally not permitted for private registration; only new cars and limited special categories (classic vehicles 30+ years, returning residents) may qualify. Verify current rules with Thai Customs.", effective_date: null, last_checked: D, source: "Anglo Siam Legal (Thailand import guide)", source_url: "https://anglosiamlaw.com/blog/importing-car-to-thailand-rules-tax-procedure", confidence: "medium", needs_review: true, notes: "Uncertain / changes frequently — verify with Thai Customs before purchase." },
  { rule_id: "th-import-permit", country_id: "thailand", category: "import_eligibility", title: "Import permit (Department of Foreign Trade)", rule_text: "New-vehicle imports require an import permit from the Department of Foreign Trade and conformity with Thai emissions and safety standards. Confirm the full permit and clearance procedure before shipping.", effective_date: null, last_checked: D, source: "Anglo Siam Legal (Thailand import guide)", source_url: "https://anglosiamlaw.com/blog/importing-car-to-thailand-rules-tax-procedure", confidence: "medium", needs_review: true, notes: "Uncertain / changes frequently — verify with Thai Customs before purchase." },
  { rule_id: "th-ev-policy", country_id: "thailand", category: "ev_policy", title: "EV 3.5 package (excise 8%→2%)", rule_text: "Under the EV 3.5 package, battery-electric passenger cars priced up to 7 million baht receive an excise-tax reduction from 8% to 2%, and CBU EV imports during 2024–2025 benefit from reduced import duty. Confirm current rates with Thai Customs/BOI.", effective_date: null, last_checked: D, source: "Thailand Board of Investment (BOI OSOS)", source_url: "https://osos.boi.go.th/EN/news/1723/EV-Board-Gives-the-Green-Light-to-EV-3-5-Package-Positioning-Thailand-as-the-Key-Regional-Hub-for-Electric-Vehicle-Manufacturing/", confidence: "medium", needs_review: true, notes: "Uncertain / changes frequently — verify with Thai Customs before purchase." },

  // Vietnam (LHD)
  { rule_id: "vn-drive-side", country_id: "vietnam", category: "drive_side", title: "Left-hand drive (LHD) only", rule_text: "Vietnam drives on the right and registers left-hand-drive (LHD) vehicles — which rules out the large RHD used-car pipelines of Japan and Thailand and favors China-sourced LHD units.", effective_date: null, last_checked: D, source: "Left- and right-hand traffic (Wikipedia) / UCarsea", source_url: WIKI_LHT, confidence: "high", needs_review: false },
  { rule_id: "vn-age-limit", country_id: "vietnam", category: "vehicle_age", title: "5-year age limit (Decree 116/2017)", rule_text: "Under Decree 116/2017/ND-CP, imported used passenger cars must generally be no more than 5 years from the year of manufacture — a firm cutoff, not a guideline. In 2026 this means roughly model-year 2021 and newer.", effective_date: null, last_checked: D, source: "Vietnam Decree 116/2017 / UCarsea", source_url: "https://ucarsea.com/vietnam-used-car-import-guide/", confidence: "medium", needs_review: true, notes: "Uncertain / changes frequently — verify with Vietnam Customs before purchase." },
  { rule_id: "vn-import-docs", country_id: "vietnam", category: "import_eligibility", title: "Type approval + used-car surcharge", rule_text: "Imported vehicles require type approval and technical safety inspection; used combustion cars also face a fixed mixed-duty surcharge on top of import duty, special consumption tax and VAT. Confirm documents and the surcharge with Vietnam Customs.", effective_date: null, last_checked: D, source: "UCarsea (Vietnam used-car import guide)", source_url: "https://ucarsea.com/vietnam-used-car-import-guide/", confidence: "medium", needs_review: true, notes: "Uncertain / changes frequently — verify with Vietnam Customs before purchase." },
  { rule_id: "vn-ev-policy", country_id: "vietnam", category: "ev_policy", title: "EV incentive (0% duty + 3% SCT)", rule_text: "Electric vehicles enjoy 0% import duty and a reduced 3% special consumption tax under the current incentive window (running into early 2027) — a structural advantage over combustion used imports.", effective_date: null, last_checked: D, source: "UCarsea (Vietnam EV window)", source_url: "https://ucarsea.com/vietnam-used-car-import-guide/", confidence: "medium", needs_review: true, notes: "Uncertain / changes frequently — verify with Vietnam Customs before purchase." },

  // Indonesia (RHD)
  { rule_id: "id-drive-side", country_id: "indonesia", category: "drive_side", title: "Right-hand drive (RHD) only", rule_text: "Indonesia drives on the left and registers right-hand-drive (RHD) vehicles.", effective_date: null, last_checked: D, source: "Left- and right-hand traffic (Wikipedia)", source_url: WIKI_LHT, confidence: "high", needs_review: false },
  { rule_id: "id-used-ban", country_id: "indonesia", category: "import_eligibility", title: "Used-car imports effectively prohibited", rule_text: "Indonesia effectively prohibits the import of used (second-hand) vehicles — only new completely built-up (CBU) units may be imported under an importer licence (API) with type approval, and even those are restricted to protect local assembly.", effective_date: null, last_checked: D, source: "ASEAN NCAP / Indonesian trade regulations", source_url: "https://www.aseanncap.org/indonesias-used-car-import-rules-permits-taxes-ev-benefits/", confidence: "medium", needs_review: true, notes: "Uncertain / changes frequently — verify with Indonesian customs before purchase." },
  { rule_id: "id-ev-policy", country_id: "indonesia", category: "ev_policy", title: "CBU EV duty exemption (until Dec 2025)", rule_text: "Indonesia exempted CBU battery-electric cars from import duty and reduced the luxury-goods sales tax (PPnBM) until 31 December 2025; the Industry Ministry has announced the CBU EV incentive will not continue in 2026.", effective_date: "2025-12-31", last_checked: D, source: "Schinder Law Firm / Indonesia Industry Ministry", source_url: "https://schinderlawfirm.com/blog/import-of-completely-built-up-cbu-electric-cars-officially-duty-free-until-2025/", confidence: "medium", needs_review: true, notes: "CBU EV incentive ends Dec 2025 — verify current status with Indonesian customs." },

  // Mexico (LHD)
  { rule_id: "mx-drive-side", country_id: "mexico", category: "drive_side", title: "Left-hand drive (LHD) only", rule_text: "Mexico drives on the right and registers left-hand-drive (LHD) vehicles.", effective_date: null, last_checked: D, source: "Left- and right-hand traffic (Wikipedia)", source_url: WIKI_LHT, confidence: "high", needs_review: false },
  { rule_id: "mx-age-limit", country_id: "mexico", category: "vehicle_age", title: "Eight-year rule for definitive used import", rule_text: "Used passenger cars imported as definitive imports generally must have a model year within the last eight years; older units face additional hurdles, higher taxes or prohibition. Border-zone temporary import programs have their own age windows.", effective_date: null, last_checked: D, source: "Vertex Legal / US trade.gov", source_url: "https://vertexlegal.org/legalize-car-mexico-model-year-rules-import/", confidence: "medium", needs_review: true, notes: "Uncertain / changes frequently — verify with Mexican customs (Aduanas/SAT) before purchase." },
  { rule_id: "mx-nom", country_id: "mexico", category: "import_eligibility", title: "NOM conformity (emissions & safety)", rule_text: "Definitively imported vehicles must satisfy Mexican Official Standards (NOM) for emissions and safety; US/Canada-origin vehicles follow the border and decree procedures. Confirm the applicable NOM conformity path before shipment.", effective_date: null, last_checked: D, source: "US International Trade Administration (trade.gov)", source_url: "https://www.trade.gov/market-intelligence/mexico-import-regulations-used-vehicles", confidence: "medium", needs_review: true, notes: "Uncertain / changes frequently — verify with Mexican customs before purchase." },
  { rule_id: "mx-ev-policy", country_id: "mexico", category: "ev_policy", title: "No EV-specific import-duty relief recorded", rule_text: "No EV-specific import-duty relief is recorded for Mexico; imported vehicles face standard duty plus 16% IVA. Mexico has separate EV market incentives, but these do not reduce used-vehicle import duty.", effective_date: null, last_checked: D, source: "Dutiable.io (Mexico used-car duty)", source_url: "https://dutiable.io/duty-rates/mexico/used-cars", confidence: "low", needs_review: true, notes: "Uncertain / changes frequently — verify with Mexican customs before purchase." },

  // Ghana (RHD)
  { rule_id: "gh-drive-side", country_id: "ghana", category: "drive_side", title: "Right-hand drive (RHD) only", rule_text: "Ghana drives on the left and registers right-hand-drive (RHD) vehicles.", effective_date: null, last_checked: D, source: "Left- and right-hand traffic (Wikipedia)", source_url: WIKI_LHT, confidence: "high", needs_review: false },
  { rule_id: "gh-age-limit", country_id: "ghana", category: "vehicle_age", title: "15-year age limit (from 1 Oct 2026)", rule_text: "Under the Ghana Standards Authority's National Vehicle Homologation and Conformity Assessment Programme, effective 1 October 2026, used vehicles older than 15 years are refused entry; vehicles 10–15 years old may attract overage penalties. In 2026 this means roughly model-year 2011 and newer.", effective_date: "2026-10-01", last_checked: D, source: "Ghana Standards Authority / Chale News", source_url: "https://chale.news/six-weeks-left-ghanas-new-car-import-rules-kick-in-october-1/", confidence: "medium", needs_review: true, notes: "Uncertain / changes frequently — verify with GSA before purchase." },
  { rule_id: "gh-pre-shipment", country_id: "ghana", category: "import_eligibility", title: "Pre-shipment inspection + Certificate of Conformity", rule_text: "Every used vehicle must be inspected in its country of origin by a GSA-approved inspection organisation before shipment; a cleared unit receives a Certificate of Conformity confirming safety, quality and environmental compliance.", effective_date: "2026-10-01", last_checked: D, source: "Ghana Standards Authority / Chale News", source_url: "https://chale.news/six-weeks-left-ghanas-new-car-import-rules-kick-in-october-1/", confidence: "medium", needs_review: true, notes: "Uncertain / changes frequently — verify with GSA before purchase." },
  { rule_id: "gh-ev-policy", country_id: "ghana", category: "ev_policy", title: "EV import-duty reduction (developing)", rule_text: "Ghana has moved to reduce import duty on electric vehicles as part of its energy-transition policy; EV duty treatment is evolving and should be confirmed with the Ghana Revenue Authority before trading.", effective_date: null, last_checked: D, source: "Ghana Revenue Authority / ghanaduty.app", source_url: "https://ghanaduty.app/guides/ghana-import-duty-rates/", confidence: "low", needs_review: true, notes: "Uncertain / changes frequently — verify with GRA before purchase." },

  // Peru (LHD)
  { rule_id: "pe-drive-side", country_id: "peru", category: "drive_side", title: "Left-hand drive (LHD) only", rule_text: "Peru drives on the right and registers left-hand-drive (LHD) vehicles.", effective_date: null, last_checked: D, source: "Left- and right-hand traffic (Wikipedia)", source_url: WIKI_LHT, confidence: "high", needs_review: false },
  { rule_id: "pe-age-limit", country_id: "peru", category: "vehicle_age", title: "5-year age limit (2 years for diesel)", rule_text: "Peru limits used-vehicle imports to 5 years old for spark-ignition (petrol) vehicles and 2 years old for compression-ignition (diesel) vehicles; age is counted from the year of manufacture to shipment date.", effective_date: null, last_checked: D, source: "SUNAT (Peru Customs)", source_url: "https://www.sunat.gob.pe/customsinformation/importofvehicles/age_of_vehicle.html", confidence: "medium", needs_review: true, notes: "Uncertain / changes frequently — verify with SUNAT before purchase." },
  { rule_id: "pe-import-taxes", country_id: "peru", category: "import_eligibility", title: "Ad valorem + ISC + IGV layered taxes", rule_text: "Vehicle imports face ad valorem CIF customs duty, selective consumption tax (ISC) on duty-inclusive value, and general sales tax (IGV 17%) plus municipal promotion tax (IPM 2%) on the cumulative base. Clearance is via the Unique Customs Declaration (DUA).", effective_date: null, last_checked: D, source: "SUNAT (Peru Customs)", source_url: "https://www.sunat.gob.pe/customsinformation/importofvehicles/applicable_taxes.html", confidence: "medium", needs_review: true, notes: "Uncertain / changes frequently — verify with SUNAT before purchase." },
  { rule_id: "pe-ev-policy", country_id: "peru", category: "ev_policy", title: "No EV-specific import-duty relief recorded", rule_text: "No EV-specific import-duty relief is recorded for Peru; EVs are subject to the same ad valorem duty and IGV/IPM as combustion vehicles. Confirm current treatment with SUNAT.", effective_date: null, last_checked: D, source: "SUNAT (Peru Customs)", source_url: "https://www.sunat.gob.pe/customsinformation/importofvehicles/applicable_taxes.html", confidence: "low", needs_review: true, notes: "Uncertain / changes frequently — verify with SUNAT before purchase." },
];
for (const r of rules) {
  if (!importrules.rules.find((x) => x.rule_id === r.rule_id)) importrules.rules.push(r);
}
write("importrules.json", importrules);

// ---------- taxrules.json ----------
const taxrules = read("taxrules.json");
const taxes = [
  // Thailand
  { taxrule_id: "th-duty", country_id: "thailand", tax_type: "import_duty", label: "Import duty (new passenger vehicles, MFN)", rate_pct: 80.0, basis: "CIF value", effective_date: null, last_checked: D, source: "Anglo Siam Legal (Thailand import guide)", source_url: "https://anglosiamlaw.com/blog/importing-car-to-thailand-rules-tax-procedure", confidence: "medium", needs_review: true, notes: "Used imports are tightly restricted; EV CBU units benefit from reduced duty under EV 3.5. Verify with Thai Customs." },
  { taxrule_id: "th-vat", country_id: "thailand", tax_type: "vat", label: "VAT", rate_pct: 7.0, basis: "CIF + duty", effective_date: null, last_checked: D, source: "RennDriver (Thailand car tax)", source_url: "https://renndriver.com/guides/thailand-car-tax/", confidence: "medium", needs_review: false },
  { taxrule_id: "th-ev-excise", country_id: "thailand", tax_type: "excise", label: "Excise tax (EV, reduced under EV 3.5)", rate_pct: 2.0, basis: "Vehicle value", effective_date: null, last_checked: D, source: "Thailand Board of Investment (BOI OSOS)", source_url: "https://osos.boi.go.th/EN/news/1723/EV-Board-Gives-the-Green-Light-to-EV-3-5-Package-Positioning-Thailand-as-the-Key-Regional-Hub-for-Electric-Vehicle-Manufacturing/", confidence: "medium", needs_review: true, notes: "Reduced from 8% for BEVs ≤7M baht under EV 3.5. Verify with Thai Excise Department." },

  // Vietnam
  { taxrule_id: "vn-duty", country_id: "vietnam", tax_type: "import_duty", label: "Import duty (passenger vehicles, MFN)", rate_pct: 70.0, basis: "CIF value", effective_date: null, last_checked: D, source: "A+ Law (Vietnam car import tax)", source_url: "https://apluslaw.vn/en/research/car-import-tax-in-vietnam.html", confidence: "medium", needs_review: true, notes: "MFN rate; ASEAN/FTA origin may attract 0%. Plus used-car surcharge. Verify with Vietnam Customs." },
  { taxrule_id: "vn-ev-duty", country_id: "vietnam", tax_type: "import_duty", label: "Import duty (electric vehicles, exemption)", rate_pct: 0.0, basis: "CIF value", effective_date: null, last_checked: D, source: "UCarsea (Vietnam EV window)", source_url: "https://ucarsea.com/vietnam-used-car-import-guide/", confidence: "medium", needs_review: true, notes: "BEV 0% duty during incentive window (into early 2027). Verify with Vietnam Customs." },
  { taxrule_id: "vn-vat", country_id: "vietnam", tax_type: "vat", label: "VAT", rate_pct: 10.0, basis: "CIF + duty + SCT", effective_date: null, last_checked: D, source: "ASEAN NCAP (Vietnam registration fees)", source_url: "https://www.aseanncap.org/vietnam-registration-fees-for-imported-cars-explained-with-latest-updates/", confidence: "medium", needs_review: false },
  { taxrule_id: "vn-ev-sct", country_id: "vietnam", tax_type: "excise", label: "Special consumption tax (electric vehicles)", rate_pct: 3.0, basis: "CIF + duty", effective_date: null, last_checked: D, source: "UCarsea (Vietnam EV window)", source_url: "https://ucarsea.com/vietnam-used-car-import-guide/", confidence: "medium", needs_review: true, notes: "General SCT scales steeply with engine displacement for combustion vehicles. Verify with Vietnam Customs." },

  // Indonesia
  { taxrule_id: "id-ev-duty", country_id: "indonesia", tax_type: "import_duty", label: "Import duty (CBU electric vehicles, exempt until Dec 2025)", rate_pct: 0.0, basis: "CIF value", effective_date: "2025-12-31", last_checked: D, source: "Schinder Law Firm (Indonesia CBU EV)", source_url: "https://schinderlawfirm.com/blog/import-of-completely-built-up-cbu-electric-cars-officially-duty-free-until-2025/", confidence: "medium", needs_review: true, notes: "CBU EV duty exemption and PPnBM reduction end 31 Dec 2025; not continued in 2026. Verify with Indonesian customs." },
  { taxrule_id: "id-vat", country_id: "indonesia", tax_type: "vat", label: "VAT", rate_pct: 11.0, basis: "CIF + duty", effective_date: null, last_checked: D, source: "InvestinAsia (Indonesia import tax)", source_url: "https://investinasia.id/blog/indonesia-import-tax/", confidence: "medium", needs_review: false },

  // Mexico
  { taxrule_id: "mx-duty", country_id: "mexico", tax_type: "import_duty", label: "Import duty (used vehicles)", rate_pct: 20.0, basis: "CIF value", effective_date: null, last_checked: D, source: "Dutiable.io (Mexico used-car duty)", source_url: "https://dutiable.io/duty-rates/mexico/used-cars", confidence: "low", needs_review: true, notes: "Dutiable.io lists a 15–50% range for used cars by HS category; USMCA/NAFTA origin may be duty-free. Verify with Mexican customs (SAT)." },
  { taxrule_id: "mx-vat", country_id: "mexico", tax_type: "vat", label: "IVA (VAT)", rate_pct: 16.0, basis: "CIF + duty", effective_date: null, last_checked: D, source: "Dutiable.io (Mexico duty & IVA)", source_url: "https://dutiable.io/duty-rates/mexico", confidence: "medium", needs_review: false },

  // Ghana
  { taxrule_id: "gh-duty", country_id: "ghana", tax_type: "import_duty", label: "Import duty (used vehicles)", rate_pct: 20.0, basis: "CIF value", effective_date: null, last_checked: D, source: "ghanaduty.app (Ghana import duty rates)", source_url: "https://ghanaduty.app/guides/ghana-import-duty-rates/", confidence: "low", needs_review: true, notes: "Rate varies by vehicle type and age; 10–15 year units attract overage penalties. Verify with GRA." },
  { taxrule_id: "gh-vat", country_id: "ghana", tax_type: "vat", label: "VAT (incl. NHIL & GETFund levies)", rate_pct: 12.5, basis: "CIF + duty", effective_date: null, last_checked: D, source: "TaxLawGH (Ghana NHIL & GETFund)", source_url: "https://www.taxlawgh.com/ghana-nhil-getfund-levy", confidence: "medium", needs_review: true, notes: "Plus NHIL 2.5% + GETFund 2.5% + other levies — effective burden higher than 12.5%. Verify with GRA." },

  // Peru
  { taxrule_id: "pe-duty", country_id: "peru", tax_type: "import_duty", label: "Import duty (ad valorem, by HS subheading)", rate_pct: 6.0, basis: "CIF value", effective_date: null, last_checked: D, source: "SUNAT (Peru Customs)", source_url: "https://www.sunat.gob.pe/customsinformation/importofvehicles/applicable_taxes.html", confidence: "low", needs_review: true, notes: "Ad valorem rate varies by national subheading — verify exact rate with SUNAT." },
  { taxrule_id: "pe-igv", country_id: "peru", tax_type: "vat", label: "VAT (IGV)", rate_pct: 17.0, basis: "CIF + duty + ISC", effective_date: null, last_checked: D, source: "SUNAT (Peru Customs)", source_url: "https://www.sunat.gob.pe/customsinformation/importofvehicles/applicable_taxes.html", confidence: "medium", needs_review: false, notes: "Plus 2% municipal promotion tax (IPM) — combined VAT burden 19%." },
];
for (const t of taxes) {
  if (!taxrules.taxrules.find((x) => x.taxrule_id === t.taxrule_id)) taxrules.taxrules.push(t);
}
write("taxrules.json", taxrules);

// ---------- ports.json ----------
const ports = read("ports.json");
const newPorts = [
  { port_id: "th-laem-chabang", name: "Laem Chabang", country_id: "thailand", type: "destination", note: null },
  { port_id: "vn-hai-phong", name: "Haiphong", country_id: "vietnam", type: "destination", note: null },
  { port_id: "vn-cat-lai", name: "Ho Chi Minh City (Cat Lai)", country_id: "vietnam", type: "destination", note: null },
  { port_id: "id-tanjung-priok", name: "Tanjung Priok (Jakarta)", country_id: "indonesia", type: "destination", note: null },
  { port_id: "mx-lazaro-cardenas", name: "Lázaro Cárdenas", country_id: "mexico", type: "destination", note: null },
  { port_id: "mx-veracruz", name: "Veracruz", country_id: "mexico", type: "destination", note: null },
  { port_id: "gh-tema", name: "Tema", country_id: "ghana", type: "destination", note: null },
  { port_id: "gh-takoradi", name: "Takoradi", country_id: "ghana", type: "destination", note: null },
  { port_id: "pe-callao", name: "Callao", country_id: "peru", type: "destination", note: null },
];
for (const p of newPorts) {
  if (!ports.ports.find((x) => x.port_id === p.port_id)) ports.ports.push(p);
}
write("ports.json", ports);

// ---------- routes.json ----------
const routes = read("routes.json");
const newRoutes = [
  { route_id: "cn-shanghai-to-th-laem-chabang", origin_port_id: "cn-shanghai", destination_port_id: "th-laem-chabang", est_days_min: 6, est_days_max: 12, shipping_method: "roro", source: "Industry route estimates", source_url: null, last_checked: D, confidence: "low" },
  { route_id: "cn-guangzhou-to-vn-hai-phong", origin_port_id: "cn-guangzhou", destination_port_id: "vn-hai-phong", est_days_min: 3, est_days_max: 7, shipping_method: "roro", source: "Industry route estimates", source_url: null, last_checked: D, confidence: "low" },
  { route_id: "cn-shanghai-to-vn-cat-lai", origin_port_id: "cn-shanghai", destination_port_id: "vn-cat-lai", est_days_min: 8, est_days_max: 14, shipping_method: "roro", source: "Industry route estimates", source_url: null, last_checked: D, confidence: "low" },
  { route_id: "cn-shanghai-to-id-tanjung-priok", origin_port_id: "cn-shanghai", destination_port_id: "id-tanjung-priok", est_days_min: 12, est_days_max: 20, shipping_method: "roro", source: "Industry route estimates", source_url: null, last_checked: D, confidence: "low" },
  { route_id: "cn-shanghai-to-mx-lazaro-cardenas", origin_port_id: "cn-shanghai", destination_port_id: "mx-lazaro-cardenas", est_days_min: 24, est_days_max: 35, shipping_method: "roro", source: "Industry route estimates", source_url: null, last_checked: D, confidence: "low" },
  { route_id: "cn-tianjin-to-mx-veracruz", origin_port_id: "cn-tianjin", destination_port_id: "mx-veracruz", est_days_min: 26, est_days_max: 40, shipping_method: "roro", source: "Industry route estimates", source_url: null, last_checked: D, confidence: "low" },
  { route_id: "cn-guangzhou-to-gh-tema", origin_port_id: "cn-guangzhou", destination_port_id: "gh-tema", est_days_min: 25, est_days_max: 35, shipping_method: "roro", source: "Industry route estimates", source_url: null, last_checked: D, confidence: "low" },
  { route_id: "cn-shanghai-to-gh-takoradi", origin_port_id: "cn-shanghai", destination_port_id: "gh-takoradi", est_days_min: 26, est_days_max: 36, shipping_method: "roro", source: "Industry route estimates", source_url: null, last_checked: D, confidence: "low" },
  { route_id: "cn-shanghai-to-pe-callao", origin_port_id: "cn-shanghai", destination_port_id: "pe-callao", est_days_min: 28, est_days_max: 38, shipping_method: "roro", source: "Industry route estimates", source_url: null, last_checked: D, confidence: "low" },
];
for (const r of newRoutes) {
  if (!routes.routes.find((x) => x.route_id === r.route_id)) routes.routes.push(r);
}
write("routes.json", routes);

// ---------- vehicle-market.json relations ----------
const vm = read("vehicle-market.json");
vm.meta.batch = "batch 13 — market-countries2";
vm.meta.updated = D;

const dsMatch = (summary) => ({ status: "match", summary, source: "Data sub-site models.json (export intelligence) + Left- and right-hand traffic (Wikipedia)", source_url: WIKI_LHT, source_type: "database", confidence: "high", checked_date: D });
const dsRhd = (model, market, extra) => ({ status: "needs_conversion", summary: `China domestic-market production is left-hand drive (LHD), but ${market} registers right-hand drive (RHD) only — ${model} is produced in RHD for export markets (${extra}). Confirm RHD availability with the exporter and source an RHD unit.`, source: "Data sub-site models.json (export intelligence) + Left- and right-hand traffic (Wikipedia)", source_url: WIKI_LHT, source_type: "database", confidence: "medium", checked_date: D, needs_review: true });
const charging = (dest) => ({ standard: "GB/T", destination_standard: dest, connector: "GB/T AC / GB/T DC (vehicle inlet)", voltage: null, frequency: null, needs_adapter: true, notes: `China-market GB/T inlet vs ${dest} network — adapter required; confirm the sourced unit's inlet (some export units carry a CCS2 inlet).`, source: "Vehicle: GB/T charging standard (Wikipedia); Destination: Combined Charging System / Type 2 (Wikipedia)", source_url: GBTSRC, source_type: "reputable_media", confidence: "medium", checked_date: D, needs_review: true });

const relations = [
  // ===== Thailand (RHD, EV 3.5 relief) =====
  {
    vehicle_id: "byd-atto-3", country_id: "thailand",
    drive_side_fit: dsRhd("BYD Atto 3", "Thailand", "Thailand, Australia, Singapore"),
    age_rule_fit: null,
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — Thailand's EV 3.5 package reduces excise tax from 8% to 2% for BEVs ≤7M baht and provides reduced CBU import duty during 2024–2025.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)"),
    import_eligibility: { status: "conformity_required", requirements: ["Import permit (Department of Foreign Trade)"], notes: "Thailand tightly restricts used-vehicle imports — confirm the unit can clear as new/eligible and obtain the import permit.", source: "market sub-site importrules.json (import permit)", source_url: "https://anglosiamlaw.com/blog/importing-car-to-thailand-rules-tax-procedure", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "th-duty", ev_duty_taxrule_id: "th-ev-excise", vat_taxrule_id: "th-vat", ev_duty_relief: true, notes: "EV 3.5: excise reduced 8%→2% (th-ev-excise) vs 80% MFN import duty (th-duty), + 7% VAT. Referenced from taxrules.json — verify with Thai Customs.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://osos.boi.go.th/EN/news/1723/EV-Board-Gives-the-Green-Light-to-EV-3-5-Package-Positioning-Thailand-as-the-Key-Regional-Hub-for-Electric-Vehicle-Manufacturing/", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-th-laem-chabang"], notes: "Sea freight to Laem Chabang (RoRo).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV with strong RHD availability; the Thai used-import restriction and GB/T-vs-CCS2 charging are the key fit questions.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/atto3", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },
  {
    vehicle_id: "byd-seal", country_id: "thailand",
    drive_side_fit: dsRhd("BYD Seal", "Thailand", "Thailand, Australia, Singapore"),
    age_rule_fit: null,
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — Thailand's EV 3.5 package reduces excise 8%→2% for BEVs ≤7M baht and provides reduced CBU import duty.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)"),
    import_eligibility: { status: "conformity_required", requirements: ["Import permit (Department of Foreign Trade)"], notes: "Used-vehicle import is tightly restricted — confirm eligibility and permit before shipment.", source: "market sub-site importrules.json (import permit)", source_url: "https://anglosiamlaw.com/blog/importing-car-to-thailand-rules-tax-procedure", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "th-duty", ev_duty_taxrule_id: "th-ev-excise", vat_taxrule_id: "th-vat", ev_duty_relief: true, notes: "EV 3.5 excise 2% vs 80% MFN duty, + 7% VAT. Referenced from taxrules.json — verify with Thai Customs.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://osos.boi.go.th/EN/news/1723/EV-Board-Gives-the-Green-Light-to-EV-3-5-Package-Positioning-Thailand-as-the-Key-Regional-Hub-for-Electric-Vehicle-Manufacturing/", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-th-laem-chabang"], notes: "Sea freight to Laem Chabang (RoRo).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Seal (海豹) is an EV sedan with RHD availability in Thailand; the used-import restriction and charging-standard fit are the key questions.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/seal", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },
  {
    vehicle_id: "byd-dolphin", country_id: "thailand",
    drive_side_fit: dsRhd("BYD Dolphin", "Thailand", "Thailand, Australia, Singapore"),
    age_rule_fit: null,
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — Thailand's EV 3.5 package reduces excise 8%→2% for BEVs ≤7M baht; the Dolphin is a high-volume compact EV in the Thai market.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)"),
    import_eligibility: { status: "conformity_required", requirements: ["Import permit (Department of Foreign Trade)"], notes: "Used-vehicle import is tightly restricted — confirm eligibility and permit before shipment.", source: "market sub-site importrules.json (import permit)", source_url: "https://anglosiamlaw.com/blog/importing-car-to-thailand-rules-tax-procedure", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "th-duty", ev_duty_taxrule_id: "th-ev-excise", vat_taxrule_id: "th-vat", ev_duty_relief: true, notes: "EV 3.5 excise 2% vs 80% MFN duty, + 7% VAT. Referenced from taxrules.json — verify with Thai Customs.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://osos.boi.go.th/EN/news/1723/EV-Board-Gives-the-Green-Light-to-EV-3-5-Package-Positioning-Thailand-as-the-Key-Regional-Hub-for-Electric-Vehicle-Manufacturing/", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-th-laem-chabang"], notes: "Sea freight to Laem Chabang (RoRo).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Dolphin (海豚) is a compact EV hatchback popular in Thailand; RHD availability is strong and the EV 3.5 incentive applies.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/dolphin", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },
  {
    vehicle_id: "deepal-s07", country_id: "thailand",
    drive_side_fit: { status: "needs_conversion", summary: "China domestic-market production is left-hand drive (LHD), but Thailand registers right-hand drive (RHD) only — Changan shipped its first right-hand-drive Deepal models to Thailand in 2024, so source the RHD export unit rather than converting a China LHD unit.", source: "Data sub-site models.json (export intelligence) + iChongqing (RHD Deepal shipment)", source_url: "https://www.ichongqing.info/2024/01/10/changans-first-right-hand-drive-deepal-models-head-to-thailand/", source_type: "reputable_media", confidence: "medium", checked_date: D, needs_review: true },
    age_rule_fit: null,
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — Thailand's EV 3.5 package reduces excise 8%→2% for BEVs ≤7M baht.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)"),
    import_eligibility: { status: "conformity_required", requirements: ["Import permit (Department of Foreign Trade)"], notes: "Used-vehicle import is tightly restricted — confirm eligibility and permit before shipment.", source: "market sub-site importrules.json (import permit)", source_url: "https://anglosiamlaw.com/blog/importing-car-to-thailand-rules-tax-procedure", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "th-duty", ev_duty_taxrule_id: "th-ev-excise", vat_taxrule_id: "th-vat", ev_duty_relief: true, notes: "EV 3.5 excise 2% vs 80% MFN duty, + 7% VAT. Referenced from taxrules.json — verify with Thai Customs.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://osos.boi.go.th/EN/news/1723/EV-Board-Gives-the-Green-Light-to-EV-3-5-Package-Positioning-Thailand-as-the-Key-Regional-Hub-for-Electric-Vehicle-Manufacturing/", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-th-laem-chabang"], notes: "Sea freight to Laem Chabang (RoRo).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "Changan Deepal S07 (深蓝S07) is an EV SUV with documented RHD production for Thailand — a direct fit for the Thai RHD EV market.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.ichongqing.info/2024/01/10/changans-first-right-hand-drive-deepal-models-head-to-thailand/", source_type: "reputable_media", confidence: "medium", checked_date: D,
  },

  // ===== Vietnam (LHD, EV 0% duty + 5-year age rule) =====
  {
    vehicle_id: "byd-atto-3", country_id: "vietnam",
    drive_side_fit: dsMatch("China domestic-market production is left-hand drive (LHD); Vietnam registers LHD only — no conversion required."),
    age_rule_fit: { status: "eligible", summary: "Atto 3 production began 2022; Vietnam's 5-year rule (Decree 116/2017) is satisfied by 2022+ units — verify the unit's manufacture year.", source: "market sub-site importrules.json (5-year age limit)", source_url: "https://ucarsea.com/vietnam-used-car-import-guide/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — Vietnam exempts EVs from import duty (0% vs 70% MFN) and applies a reduced 3% special consumption tax during the incentive window into early 2027.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)"),
    import_eligibility: { status: "conformity_required", requirements: ["Type approval (Decree 116/2017)", "Technical safety inspection"], notes: "Type approval and technical inspection required; EVs avoid the used-combustion surcharge.", source: "market sub-site importrules.json (type approval)", source_url: "https://ucarsea.com/vietnam-used-car-import-guide/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "vn-duty", ev_duty_taxrule_id: "vn-ev-duty", vat_taxrule_id: "vn-vat", ev_duty_relief: true, notes: "EV trims: 0% import duty + 3% SCT (vn-ev-sct) vs 70% MFN + 10% VAT. Referenced from taxrules.json — verify with Vietnam Customs.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://ucarsea.com/vietnam-used-car-import-guide/", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-guangzhou-to-vn-hai-phong"], notes: "Sea freight to Haiphong (RoRo).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV; the 5-year age rule and GB/T-vs-CCS2 charging are the key fit questions for Vietnam.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/atto3", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },
  {
    vehicle_id: "byd-song-plus", country_id: "vietnam",
    drive_side_fit: dsMatch("China domestic-market production is left-hand drive (LHD); Vietnam registers LHD only — no conversion required."),
    age_rule_fit: { status: "ineligible", summary: "Song Plus production began 2020; Vietnam's 5-year rule means 2020 units are now ~6 years old (ineligible), while 2021+ units are within/borderline — verify the unit's manufacture year.", source: "market sub-site importrules.json (5-year age limit)", source_url: "https://ucarsea.com/vietnam-used-car-import-guide/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "PHEV (DM-i) and EV trims — Vietnam's 0% duty / 3% SCT incentive is BEV-specific, so the PHEV DM-i trim may not qualify; confirm classification with Vietnam Customs.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "low", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)"),
    import_eligibility: { status: "conformity_required", requirements: ["Type approval (Decree 116/2017)", "Technical safety inspection"], notes: "Type approval required; PHEV DM-i classification vs the BEV-only EV incentive is the key open question.", source: "market sub-site importrules.json (type approval)", source_url: "https://ucarsea.com/vietnam-used-car-import-guide/", source_type: "regulatory", confidence: "low", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "vn-duty", ev_duty_taxrule_id: "vn-ev-duty", vat_taxrule_id: "vn-vat", ev_duty_relief: true, notes: "EV trim: 0% duty + 3% SCT vs 70% MFN; PHEV DM-i classification uncertain. Referenced from taxrules.json — verify with Vietnam Customs.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://ucarsea.com/vietnam-used-car-import-guide/", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-vn-cat-lai"], notes: "Sea freight to Ho Chi Minh City (Cat Lai), RoRo.", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Song Plus (宋PLUS) is a compact SUV sold as PHEV (DM-i) and EV; the 5-year age rule and BEV-only EV incentive are the key fit questions for Vietnam.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "low", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/seal-u", source_type: "manufacturer", confidence: "low", checked_date: D,
  },

  // ===== Mexico (LHD, 8-year rule) =====
  {
    vehicle_id: "chery-tiggo-8", country_id: "mexico",
    drive_side_fit: dsMatch("China domestic-market production is left-hand drive (LHD); Mexico registers LHD only — no conversion required."),
    age_rule_fit: { status: "borderline", summary: "Tiggo 8 production began 2018; Mexico's eight-year rule for definitive used imports means 2018 units are now ~8 years old (borderline/over) — 2019+ units are within the window. Verify the exact cut-off.", source: "market sub-site importrules.json (eight-year rule)", source_url: "https://vertexlegal.org/legalize-car-mexico-model-year-rules-import/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Combustion (ICE) — subject to standard used-vehicle duty (15–50% range) + 16% IVA; no EV-specific relief.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: null,
    import_eligibility: { status: "conformity_required", requirements: ["NOM emissions & safety conformity"], notes: "NOM conformity and definitive-import procedures apply; confirm the applicable NOM path before shipment.", source: "market sub-site importrules.json (NOM conformity)", source_url: "https://www.trade.gov/market-intelligence/mexico-import-regulations-used-vehicles", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "mx-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "mx-vat", ev_duty_relief: false, notes: "ICE: 15–50% used-vehicle duty (mx-duty) + 16% IVA (mx-vat). Referenced from taxrules.json — verify with Mexican customs (SAT).", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://dutiable.io/duty-rates/mexico/used-cars", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-mx-lazaro-cardenas"], notes: "Sea freight to Lázaro Cárdenas (RoRo).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "Chery Tiggo 8 (瑞虎8) is an ICE SUV; the eight-year age rule vs its 2018 production start is the key fit question for Mexico.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://en.wikipedia.org/wiki/Chery_Tiggo_8", source_type: "reputable_media", confidence: "medium", checked_date: D,
  },

  // ===== Ghana (RHD, 15-year rule) =====
  {
    vehicle_id: "byd-atto-3", country_id: "ghana",
    drive_side_fit: dsRhd("BYD Atto 3", "Ghana", "South Africa, Australia, Thailand"),
    age_rule_fit: { status: "eligible", summary: "Atto 3 production began 2022; Ghana's 15-year age limit (from 1 Oct 2026) is comfortably satisfied — verify the unit's manufacture date.", source: "market sub-site importrules.json (15-year age limit)", source_url: "https://chale.news/six-weeks-left-ghanas-new-car-import-rules-kick-in-october-1/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — Ghana's EV import-duty reduction is developing; confirm current EV duty treatment with the Ghana Revenue Authority.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "low", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / CHAdeMO"),
    import_eligibility: { status: "conformity_required", requirements: ["GSA pre-shipment inspection", "Certificate of Conformity"], notes: "GSA-approved pre-shipment inspection and a Certificate of Conformity are mandatory before export.", source: "market sub-site importrules.json (GSA pre-shipment)", source_url: "https://chale.news/six-weeks-left-ghanas-new-car-import-rules-kick-in-october-1/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "gh-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "gh-vat", ev_duty_relief: false, notes: "20% base duty + 12.5% VAT (plus NHIL/GETFund levies); EV duty reduction developing. Referenced from taxrules.json — verify with GRA.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://ghanaduty.app/guides/ghana-import-duty-rates/", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-guangzhou-to-gh-tema"], notes: "Sea freight to Tema (RoRo).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV with RHD availability; the GSA pre-shipment regime and GB/T-vs-CCS2/CHAdeMO charging are the key fit questions for Ghana.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/atto3", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },
  {
    vehicle_id: "mg-4", country_id: "ghana",
    drive_side_fit: dsRhd("MG4 EV", "Ghana", "UK, Australia, South Africa"),
    age_rule_fit: { status: "eligible", summary: "MG4 production began 2022; Ghana's 15-year age limit is comfortably satisfied — verify the unit's manufacture date.", source: "market sub-site importrules.json (15-year age limit)", source_url: "https://chale.news/six-weeks-left-ghanas-new-car-import-rules-kick-in-october-1/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — Ghana's EV import-duty reduction is developing; confirm current EV duty treatment with GRA.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "low", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / CHAdeMO"),
    import_eligibility: { status: "conformity_required", requirements: ["GSA pre-shipment inspection", "Certificate of Conformity"], notes: "GSA-approved pre-shipment inspection and a Certificate of Conformity are mandatory before export.", source: "market sub-site importrules.json (GSA pre-shipment)", source_url: "https://chale.news/six-weeks-left-ghanas-new-car-import-rules-kick-in-october-1/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "gh-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "gh-vat", ev_duty_relief: false, notes: "20% base duty + 12.5% VAT (plus levies); EV duty reduction developing. Referenced from taxrules.json — verify with GRA.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://ghanaduty.app/guides/ghana-import-duty-rates/", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-gh-takoradi"], notes: "Sea freight to Takoradi (RoRo).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "MG4 EV is a RHD-capable compact EV hatchback; the GSA pre-shipment regime and charging-standard fit are the key questions for Ghana.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.auto-data.net/en/mg-mg4-ev-i-generation-8990", source_type: "reputable_media", confidence: "medium", checked_date: D,
  },

  // ===== Peru (LHD, 5-year rule) =====
  {
    vehicle_id: "chery-tiggo-8", country_id: "peru",
    drive_side_fit: dsMatch("China domestic-market production is left-hand drive (LHD); Peru registers LHD only — no conversion required."),
    age_rule_fit: { status: "ineligible", summary: "Tiggo 8 production began 2018; Peru's 5-year rule means 2018 units are now ~8 years old (ineligible) — only 2021+ units are within the window. Verify the unit's manufacture year.", source: "market sub-site importrules.json (5-year age limit)", source_url: "https://www.sunat.gob.pe/customsinformation/importofvehicles/age_of_vehicle.html", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Combustion (ICE) — subject to ad valorem duty + selective consumption tax (ISC) + 17% IGV (plus 2% IPM); no EV-specific relief.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: null,
    import_eligibility: { status: "conformity_required", requirements: ["Unique Customs Declaration (DUA)", "Ad valorem + ISC + IGV assessment"], notes: "Clearance via the DUA with layered duty/ISC/IGV assessment; confirm the unit meets the 5-year age rule.", source: "market sub-site importrules.json (layered taxes)", source_url: "https://www.sunat.gob.pe/customsinformation/importofvehicles/applicable_taxes.html", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "pe-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "pe-igv", ev_duty_relief: false, notes: "ICE: 6% ad valorem (pe-duty) + 17% IGV + 2% IPM (pe-igv), plus ISC. Referenced from taxrules.json — verify with SUNAT.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://www.sunat.gob.pe/customsinformation/importofvehicles/applicable_taxes.html", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-pe-callao"], notes: "Sea freight to Callao (RoRo).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "Chery Tiggo 8 (瑞虎8) is an ICE SUV; Peru's 5-year age rule vs its 2018 production start is the key blocker.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://en.wikipedia.org/wiki/Chery_Tiggo_8", source_type: "reputable_media", confidence: "medium", checked_date: D,
  },
];

for (const rel of relations) {
  if (!vm.relations.find((x) => x.vehicle_id === rel.vehicle_id && x.country_id === rel.country_id)) {
    vm.relations.push(rel);
  }
}
write("vehicle-market.json", vm);

console.log(`countries: ${countries.countries.length}, rules: ${importrules.rules.length}, taxes: ${taxrules.taxrules.length}, ports: ${ports.ports.length}, routes: ${routes.routes.length}, relations: ${vm.relations.length}`);
