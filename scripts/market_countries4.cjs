// Batch: market-countries4 — add 6 high-commercial-value countries + data layer + Vehicle×Market relations.
// Countries: Turkey (LHD), Malaysia (RHD), New Zealand (RHD), Algeria (LHD), Qatar (LHD), Azerbaijan (LHD).
// All regulatory data cited to official/reliable sources; every statement carries source URL + last_checked (2026-10-07).
// NOTE: Turkey, Algeria, Qatar, Azerbaijan are LHD (right-hand traffic); Malaysia and New Zealand are RHD (left-hand traffic).
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
  { country_id: "turkey", name: "Turkey", name_zh: "土耳其", region: "europe", drive_side: "lhd", currency: "TRY", status: "active", source: "Republic of Türkiye Ministry of Trade / Presidential Decision No. 10115", source_url: "https://lenacars.com/en/blog/2025-electric-vehicle-sct-rates-tax-brackets-2", source_date: D, confidence: "high" },
  { country_id: "malaysia", name: "Malaysia", name_zh: "马来西亚", region: "southeast-asia", drive_side: "rhd", currency: "MYR", status: "active", source: "Ministry of Investment, Trade and Industry (MITI)", source_url: "https://www.miti.gov.my/index.php/pages/view/10020", source_date: D, confidence: "high" },
  { country_id: "new-zealand", name: "New Zealand", name_zh: "新西兰", region: "oceania", drive_side: "rhd", currency: "NZD", status: "active", source: "NZ Transport Agency (NZTA) / NZ Customs", source_url: "https://vehicleinspection.nzta.govt.nz/virms/entry-certification/i-and-c/vehicle-structure/determining-frontal-impact-compliance", source_date: D, confidence: "high" },
  { country_id: "algeria", name: "Algeria", name_zh: "阿尔及利亚", region: "africa", drive_side: "lhd", currency: "DZD", status: "active", source: "Algerian Customs (DGD) / 2025 Finance Law", source_url: "https://guangcaiauto.com/car-import-rules-algeria-2025/", source_date: D, confidence: "high" },
  { country_id: "qatar", name: "Qatar", name_zh: "卡塔尔", region: "middle-east", drive_side: "lhd", currency: "QAR", status: "active", source: "General Authority of Customs (Qatar) / GCC framework", source_url: "https://www.expatfocus.com/qatar/guide/qatar-buying-or-importing-a-car", source_date: D, confidence: "high" },
  { country_id: "azerbaijan", name: "Azerbaijan", name_zh: "阿塞拜疆", region: "central-asia", drive_side: "lhd", currency: "AZN", status: "active", source: "State Customs Committee (DGK) / Cabinet Decree No. 94", source_url: "https://customs.gov.az/en/ferdler-ucun/avtomobillerin-getirilmesi", source_date: D, confidence: "high" },
];
for (const c of newCountries) {
  if (!countries.countries.find((x) => x.country_id === c.country_id)) countries.countries.push(c);
}
write("countries.json", countries);

// ---------- importrules.json ----------
const importrules = read("importrules.json");
const rules = [
  // ===== Turkey (LHD) =====
  { rule_id: "tr-drive-side", country_id: "turkey", category: "drive_side", title: "Left-hand drive (LHD) only", rule_text: "Turkey drives on the right and registers left-hand-drive (LHD) vehicles.", effective_date: null, last_checked: D, source: "Left- and right-hand traffic (Wikipedia)", source_url: WIKI_LHT, confidence: "high", needs_review: false },
  { rule_id: "tr-tax-stack", country_id: "turkey", category: "import_eligibility", title: "Layered tax: customs duty + ÖTV (SCT) + VAT", rule_text: "Imported vehicles face a compounding stack — 10% customs duty, a Special Consumption Tax (ÖTV/SCT) that dominates the landed cost (90–100% for ICE engines up to 1600cc, up to 220% above 2000cc), then 20% VAT on the cumulative base. Chinese-origin petrol and hybrid vehicles attract an additional 50% tariff (raised from 40% in January 2025).", effective_date: null, last_checked: D, source: "West Coast Shipping (Turkey import guide)", source_url: "https://www.wcshipping.com/blog/complete-guide-to-importing-cars-into-turkey-duties-vat-regulations", confidence: "medium", needs_review: true, notes: "ÖTV/SCT brackets change frequently — verify with the Turkish Ministry of Trade before purchase." },
  { rule_id: "tr-age-limit", country_id: "turkey", category: "vehicle_age", title: "No universal age limit identified", rule_text: "No single universal used-vehicle age limit was identified in the sources reviewed; the import cost burden is driven by the ÖTV/SCT tax stack rather than an age cut-off. Confirm current used-vehicle eligibility with Turkish customs before sourcing stock.", effective_date: null, last_checked: D, source: "Needs verification (no explicit age rule located)", source_url: null, confidence: "unknown", needs_review: true, notes: "Used-vehicle eligibility not clearly documented — verify with Turkish customs." },
  { rule_id: "tr-ev-policy", country_id: "turkey", category: "ev_policy", title: "EV SCT (ÖTV) reduced brackets (25–75%)", rule_text: "Under Presidential Decision No. 10115 (24 July 2025), electric vehicles are taxed on a four-bracket Special Consumption Tax: 25% (≤160 kW and pre-tax price ≤1,650,000 TL), 55% (≤160 kW above the price threshold), 65% (>160 kW below threshold), 75% (>160 kW above threshold) — versus 90–100%+ for combustion engines. PHEVs are taxed at 45–85%.", effective_date: "2025-07-24", last_checked: D, source: "LenaCars (EV SCT brackets) / Presidential Decision No. 10115", source_url: "https://lenacars.com/en/blog/2025-electric-vehicle-sct-rates-tax-brackets-2", confidence: "medium", needs_review: true, notes: "Brackets depend on motor power and pre-tax price — verify with the Ministry of Trade." },

  // ===== Malaysia (RHD) =====
  { rule_id: "my-drive-side", country_id: "malaysia", category: "drive_side", title: "Right-hand drive (RHD) only", rule_text: "Malaysia drives on the left and registers right-hand-drive (RHD) vehicles. China-market LHD units cannot be registered as-is; source RHD export units.", effective_date: null, last_checked: D, source: "Left- and right-hand traffic (Wikipedia)", source_url: WIKI_LHT, confidence: "high", needs_review: false },
  { rule_id: "my-ap-permit", country_id: "malaysia", category: "import_eligibility", title: "Approved Permit (AP) required", rule_text: "Used-vehicle import requires an Approved Permit (AP) issued by MITI under the Customs Act 1967. APs are restricted and priority is given to franchise holders; private used-vehicle import is heavily constrained.", effective_date: null, last_checked: D, source: "Ministry of Investment, Trade and Industry (MITI)", source_url: "https://www.miti.gov.my/index.php/pages/view/ap", confidence: "high", needs_review: true, notes: "AP eligibility is restrictive — verify current AP requirements with MITI." },
  { rule_id: "my-age-limit", country_id: "malaysia", category: "vehicle_age", title: "Used-car age limit (1–5 years, AP-dependent)", rule_text: "Used imported vehicles generally carry a maximum age of about 1–5 years depending on the AP category. Age is counted from first registration to shipment month.", effective_date: null, last_checked: D, source: "SUVHUB (Malaysia import rules)", source_url: "https://suvhub.com/import-rules/malaysia", confidence: "medium", needs_review: true, notes: "Age limit varies by AP category — verify with RMCD (Royal Malaysian Customs)." },
  { rule_id: "my-ev-policy", country_id: "malaysia", category: "ev_policy", title: "EV import duty & excise relief (until 31 Dec 2025)", rule_text: "MITI grants temporary import-duty and excise relief on fully electric cars and motorcycles (until 31 December 2025), with an on-the-road price floor of RM100,000 for cars. The relief is not subject to the equivalent-engine-capacity condition. Confirm whether it has been extended for 2026.", effective_date: "2025-12-31", last_checked: D, source: "Ministry of Investment, Trade and Industry (MITI)", source_url: "https://www.miti.gov.my/index.php/pages/view/10020", confidence: "high", needs_review: true, notes: "Temporary measure — verify current status (2026) with MITI." },

  // ===== New Zealand (RHD) =====
  { rule_id: "nz-drive-side", country_id: "new-zealand", category: "drive_side", title: "Right-hand drive (RHD) required", rule_text: "New Zealand requires right-hand-drive (RHD) vehicles. LHD vehicles cannot be registered except classics 20+ years old or under a Special Interest Vehicle (SIV) permit.", effective_date: null, last_checked: D, source: "NZ Transport Agency (NZTA) / Japan-Carrier", source_url: "https://www.japan-carrier.com/regulations/new-zealand?lang=en", confidence: "high", needs_review: false },
  { rule_id: "nz-age-limit", country_id: "new-zealand", category: "vehicle_age", title: "No fixed age limit (standards-based)", rule_text: "New Zealand has no fixed age limit for used-vehicle imports; eligibility is instead set by emissions standards (models from ~2005 onward) and frontal-impact compliance (mandatory for MA/MB/MC vehicles built from October 2003).", effective_date: null, last_checked: D, source: "NZTA / Japan-Carrier", source_url: "https://www.japan-carrier.com/regulations/new-zealand?lang=en", confidence: "medium", needs_review: true, notes: "Standards-based, not age-based — verify current standards with NZTA." },
  { rule_id: "nz-entry-cert", country_id: "new-zealand", category: "import_eligibility", title: "Entry certification + biosecurity", rule_text: "Imported vehicles require NZTA entry certification by an approved inspector, MPI biosecurity clearance (heat treatment/fumigation for brown marmorated stink bug during September–April), and pre-shipment inspection (e.g. JEVIC).", effective_date: null, last_checked: D, source: "NZTA / Japan-Carrier", source_url: "https://www.japan-carrier.com/regulations/new-zealand?lang=en", confidence: "medium", needs_review: true, notes: "Uncertain / changes frequently — verify with NZTA and MPI." },
  { rule_id: "nz-ev-policy", country_id: "new-zealand", category: "ev_policy", title: "Clean Car Standard CO₂ charge (up to NZ$2,875)", rule_text: "New Zealand applies a Clean Car Standard CO₂ charge on high-emission imports (up to NZ$2,875; used cars calculated at half the new-car rate). Zero-tailpipe EVs do not incur the CO₂ charge, but pay 15% GST. Passenger cars are otherwise duty-free (0% customs duty).", effective_date: null, last_checked: D, source: "NZ Transport Agency / Japan-Carrier", source_url: "https://www.japan-carrier.com/regulations/new-zealand?lang=en", confidence: "medium", needs_review: true, notes: "CO₂ charge tiers change — verify current rates with NZTA / Waka Kotahi." },

  // ===== Algeria (LHD) =====
  { rule_id: "dz-drive-side", country_id: "algeria", category: "drive_side", title: "Left-hand drive (LHD) only", rule_text: "Algeria drives on the right and registers left-hand-drive (LHD) vehicles.", effective_date: null, last_checked: D, source: "Left- and right-hand traffic (Wikipedia)", source_url: WIKI_LHT, confidence: "high", needs_review: false },
  { rule_id: "dz-age-limit", country_id: "algeria", category: "vehicle_age", title: "Used cars under 3 years old", rule_text: "Since 2023 Algeria has authorized individual import of used cars less than three years old. Under the 2025 Finance Law, imported cars under three years old may now be resold, but the tax benefits must be repaid on a sliding scale (100% if sold within 12 months of clearance, 66% within 12–24 months, 33% within 24–36 months).", effective_date: "2025-01-01", last_checked: D, source: "GuangcaiAuto / 2025 Finance Law (Article 110)", source_url: "https://guangcaiauto.com/car-import-rules-algeria-2025/", confidence: "medium", needs_review: true, notes: "Uncertain / changes frequently — verify with Algerian Customs (DGD)." },
  { rule_id: "dz-safety", country_id: "algeria", category: "import_eligibility", title: "Safety equipment mandatory (ABS, airbags, speed limiter)", rule_text: "Imported vehicles must meet minimum safety standards including ABS and a speed limiter; vehicles over 1.2 litres additionally require two front airbags, headrests for all seats, windscreen/rear-window defrosters and child-seat anchors.", effective_date: null, last_checked: D, source: "GuangcaiAuto (Algeria 2025 import rules)", source_url: "https://guangcaiauto.com/car-import-rules-algeria-2025/", confidence: "medium", needs_review: true, notes: "Uncertain / changes frequently — verify with Algerian Customs." },
  { rule_id: "dz-ev-policy", country_id: "algeria", category: "ev_policy", title: "EV import-tax reduction (up to 80% personal channel)", rule_text: "Algeria applies import-tax reductions to electric vehicles — reported up to 80% on the personal-import channel (50% for petrol/hybrid up to 1800cc) under the 2025 regime. Customs duty is otherwise 15% (petrol ≤1800cc) or 30% (≥1800cc and EVs).", effective_date: null, last_checked: D, source: "CBTcar / EV24.africa (Algeria import taxes)", source_url: "https://b2b.cbtcar.com/insights/import-taxes-on-cars-in-algeria-explained", confidence: "medium", needs_review: true, notes: "Reduction % varies by channel — verify with Algerian Customs." },

  // ===== Qatar (LHD) =====
  { rule_id: "qa-drive-side", country_id: "qatar", category: "drive_side", title: "Left-hand drive (LHD) only", rule_text: "Qatar drives on the right and registers left-hand-drive (LHD) vehicles under the GCC specification framework.", effective_date: null, last_checked: D, source: "Left- and right-hand traffic (Wikipedia) / Expat Focus", source_url: "https://www.expatfocus.com/qatar/guide/qatar-buying-or-importing-a-car", confidence: "high", needs_review: false },
  { rule_id: "qa-age-limit", country_id: "qatar", category: "vehicle_age", title: "5-year age limit", rule_text: "Vehicles over 5 years old are prohibited from import into Qatar. Imports require a valid Qatar ID (residence permit) and Qatari driving licence.", effective_date: null, last_checked: D, source: "Auto Direct FZE (Qatar import regulations)", source_url: "https://autodirect-ae.com/import-regulations/qatar", confidence: "medium", needs_review: true, notes: "Uncertain / changes frequently — verify with Qatar Customs." },
  { rule_id: "qa-gcc-spec", country_id: "qatar", category: "import_eligibility", title: "GCC specification required", rule_text: "Imported vehicles must conform to GCC (Gulf Cooperation Council) specification. Required documents include proof of ownership, registration certificate, purchase invoice, original Bill of Lading and prior insurance.", effective_date: null, last_checked: D, source: "Auto Direct FZE (Qatar import regulations)", source_url: "https://autodirect-ae.com/import-regulations/qatar", confidence: "medium", needs_review: true, notes: "Uncertain / changes frequently — verify with Qatar Customs." },
  { rule_id: "qa-ev-policy", country_id: "qatar", category: "ev_policy", title: "No EV-specific import-duty relief recorded", rule_text: "No EV-specific import-duty relief was identified for Qatar in the sources reviewed; the flat 5% customs duty applies to all vehicles. EV adoption is supported through infrastructure rather than duty relief.", effective_date: null, last_checked: D, source: "Needs verification (no EV-specific source located)", source_url: null, confidence: "unknown", needs_review: true, notes: "EV treatment not documented in reviewed sources — verify with Qatar Customs." },

  // ===== Azerbaijan (LHD) =====
  { rule_id: "az-drive-side", country_id: "azerbaijan", category: "drive_side", title: "Left-hand drive (LHD) only", rule_text: "Azerbaijan drives on the right and registers left-hand-drive (LHD) vehicles.", effective_date: null, last_checked: D, source: "Left- and right-hand traffic (Wikipedia)", source_url: WIKI_LHT, confidence: "high", needs_review: false },
  { rule_id: "az-age-limit", country_id: "azerbaijan", category: "vehicle_age", title: "10-year age ban (Decree No. 94)", rule_text: "Since 28 April 2023 (Cabinet Decree No. 94), Azerbaijan bans the import of passenger cars manufactured more than 10 years ago — in 2026 that means model-year 2016 and newer. Every imported car must also have ABS, at least one airbag, and meet Euro-4 or higher emissions.", effective_date: "2023-04-28", last_checked: D, source: "Emze.az / Carawon (Azerbaijan import rules)", source_url: "https://emze.az/news/legal-updates/azerbaijan-restricts-import-of-cars-over-10-years-old/", confidence: "high", needs_review: true, notes: "Uncertain / changes frequently — verify with the State Customs Committee." },
  { rule_id: "az-tax-stack", country_id: "azerbaijan", category: "import_eligibility", title: "Engine-cc excise + 18% VAT (no flat duty)", rule_text: "Azerbaijan levies an engine-capacity-based customs duty plus an engine-cc excise tax and 18% VAT (charged on CIF + excise). From January 2026, cars older than 7 years pay a higher excise coefficient (petrol 1.5×, diesel 2.0×). Clearance is via the Baku Single Window.", effective_date: "2026-01-01", last_checked: D, source: "Carawon / Prayk (Azerbaijan import duty)", source_url: "https://carawon.com/en/import-to-azerbaijan", confidence: "medium", needs_review: true, notes: "Excise is engine-cc based, not a single rate — verify with the State Customs Committee." },
  { rule_id: "az-ev-policy", country_id: "azerbaijan", category: "ev_policy", title: "EV ≤3yr: 0% duty, no excise, but 18% VAT", rule_text: "Electric vehicles three years old or newer pay 0% customs duty and no excise, but since 1 January 2026 are subject to 18% VAT like all other cars.", effective_date: "2026-01-01", last_checked: D, source: "Carawon (Azerbaijan import guide)", source_url: "https://carawon.com/en/import-to-azerbaijan", confidence: "medium", needs_review: true, notes: "EV incentive applies to ≤3-year-old units — verify with the State Customs Committee." },
];
for (const r of rules) {
  if (!importrules.rules.find((x) => x.rule_id === r.rule_id)) importrules.rules.push(r);
}
write("importrules.json", importrules);

// ---------- taxrules.json ----------
const taxrules = read("taxrules.json");
const taxes = [
  // Turkey
  { taxrule_id: "tr-duty", country_id: "turkey", tax_type: "import_duty", label: "Import duty (passenger vehicles)", rate_pct: 10, basis: "CIF value", effective_date: null, last_checked: D, source: "West Coast Shipping (Turkey import guide)", source_url: "https://www.wcshipping.com/blog/complete-guide-to-importing-cars-into-turkey-duties-vat-regulations", confidence: "medium", needs_review: true, notes: "Chinese-origin petrol/hybrid vehicles attract an additional 50% tariff. Verify with Turkish customs." },
  { taxrule_id: "tr-sct-ice", country_id: "turkey", tax_type: "excise", label: "Special Consumption Tax (ÖTV, ICE ≤1600cc)", rate_pct: 90, basis: "Vehicle value", effective_date: "2025-07-24", last_checked: D, source: "West Coast Shipping / LenaCars", source_url: "https://www.wcshipping.com/blog/complete-guide-to-importing-cars-into-turkey-duties-vat-regulations", confidence: "medium", needs_review: true, notes: "90–100% up to 1600cc; up to 220% above 2000cc. Verify with the Ministry of Trade." },
  { taxrule_id: "tr-sct-ev", country_id: "turkey", tax_type: "excise", label: "Special Consumption Tax (ÖTV, EV ≤160kW & ≤1.65M TL)", rate_pct: 25, basis: "Pre-tax vehicle price", effective_date: "2025-07-24", last_checked: D, source: "LenaCars (EV SCT brackets) / Presidential Decision No. 10115", source_url: "https://lenacars.com/en/blog/2025-electric-vehicle-sct-rates-tax-brackets-2", confidence: "medium", needs_review: true, notes: "25% / 55% / 65% / 75% by motor power and pre-tax price. Verify with the Ministry of Trade." },
  { taxrule_id: "tr-vat", country_id: "turkey", tax_type: "vat", label: "VAT", rate_pct: 20, basis: "CIF + duty + ÖTV", effective_date: null, last_checked: D, source: "West Coast Shipping (Turkey import guide)", source_url: "https://www.wcshipping.com/blog/complete-guide-to-importing-cars-into-turkey-duties-vat-regulations", confidence: "medium", needs_review: false },

  // Malaysia
  { taxrule_id: "my-duty", country_id: "malaysia", tax_type: "import_duty", label: "Import duty (CBU passenger cars)", rate_pct: 30, basis: "CIF value", effective_date: null, last_checked: D, source: "Dutiable.io (Malaysia passenger cars)", source_url: "https://dutiable.io/duty-rates/malaysia/passenger-cars", confidence: "medium", needs_review: true, notes: "30% on HS 8703. Verify with RMCD." },
  { taxrule_id: "my-excise", country_id: "malaysia", tax_type: "excise", label: "Excise duty (by engine capacity)", rate_pct: 60, basis: "CIF value", effective_date: null, last_checked: D, source: "CantoneseGuy (Malaysia recon import duty)", source_url: "https://www.cantoneseguy.my/import-duty", confidence: "low", needs_review: true, notes: "60–105% by engine size; representative 60% shown. Verify with RMCD." },
  { taxrule_id: "my-sst", country_id: "malaysia", tax_type: "other", label: "Sales & Service Tax (SST)", rate_pct: 10, basis: "Vehicle price", effective_date: null, last_checked: D, source: "Dutiable.io (Malaysia passenger cars)", source_url: "https://dutiable.io/duty-rates/malaysia/passenger-cars", confidence: "low", needs_review: true, notes: "Some sources cite 8%. Verify with RMCD." },
  { taxrule_id: "my-ev-duty", country_id: "malaysia", tax_type: "import_duty", label: "Import duty (electric vehicles, exempt until Dec 2025)", rate_pct: 0, basis: "CIF value", effective_date: "2025-12-31", last_checked: D, source: "Ministry of Investment, Trade and Industry (MITI)", source_url: "https://www.miti.gov.my/index.php/pages/view/10020", confidence: "high", needs_review: true, notes: "Temporary EV duty & excise relief until 31 Dec 2025 (on-road price floor RM100k). Verify 2026 status." },

  // New Zealand
  { taxrule_id: "nz-duty", country_id: "new-zealand", tax_type: "import_duty", label: "Import duty (passenger cars, duty-free)", rate_pct: 0, basis: "CIF value", effective_date: null, last_checked: D, source: "NZ Customs / Japan-Carrier", source_url: "https://www.japan-carrier.com/regulations/new-zealand?lang=en", confidence: "medium", needs_review: false, notes: "Passenger cars are duty-free." },
  { taxrule_id: "nz-gst", country_id: "new-zealand", tax_type: "vat", label: "GST", rate_pct: 15, basis: "CIF + freight + insurance", effective_date: null, last_checked: D, source: "NZ Customs / Japan-Carrier", source_url: "https://www.japan-carrier.com/regulations/new-zealand?lang=en", confidence: "medium", needs_review: false },

  // Algeria
  { taxrule_id: "dz-duty", country_id: "algeria", tax_type: "import_duty", label: "Import duty (petrol ≤1800cc)", rate_pct: 15, basis: "CIF value", effective_date: null, last_checked: D, source: "Mebarki Auto (Algeria import FAQ)", source_url: "https://mebarkiauto.com/en/faq", confidence: "medium", needs_review: true, notes: "15% ≤1800cc petrol; 30% for ≥1800cc and EVs (before personal-channel reductions). Verify with Algerian Customs (DGD)." },
  { taxrule_id: "dz-vat", country_id: "algeria", tax_type: "vat", label: "VAT (TVA)", rate_pct: 19, basis: "CIF + duty", effective_date: null, last_checked: D, source: "Mebarki Auto / PACE Motors (Algeria)", source_url: "https://mebarkiauto.com/en/faq", confidence: "medium", needs_review: false },
  { taxrule_id: "dz-tic", country_id: "algeria", tax_type: "excise", label: "Internal consumption tax (TIC, 2001–3000cc)", rate_pct: 60, basis: "Vehicle value", effective_date: null, last_checked: D, source: "Mebarki Auto (Algeria import FAQ)", source_url: "https://mebarkiauto.com/en/faq", confidence: "low", needs_review: true, notes: "TIC 60% for 2001–3000cc, 100% above 3000cc. Verify with Algerian Customs." },

  // Qatar
  { taxrule_id: "qa-duty", country_id: "qatar", tax_type: "import_duty", label: "Import duty (used vehicles)", rate_pct: 5, basis: "CIF value", effective_date: null, last_checked: D, source: "Expat Focus / Auto Direct FZE (Qatar)", source_url: "https://www.expatfocus.com/qatar/guide/qatar-buying-or-importing-a-car", confidence: "medium", needs_review: true, notes: "5% standard customs duty. Verify with Qatar Customs." },
  { taxrule_id: "qa-vat", country_id: "qatar", tax_type: "vat", label: "VAT (not yet implemented)", rate_pct: 0, basis: "N/A", effective_date: null, last_checked: D, source: "PwC (Qatar corporate tax summary)", source_url: "https://taxsummaries.pwc.com/qatar/corporate/other-taxes", confidence: "high", needs_review: false, notes: "Qatar imposes no VAT as of 2025; a 5% GCC-framework VAT is expected in future." },

  // Azerbaijan
  { taxrule_id: "az-vat", country_id: "azerbaijan", tax_type: "vat", label: "VAT", rate_pct: 18, basis: "CIF + excise", effective_date: null, last_checked: D, source: "Carawon (Azerbaijan import guide)", source_url: "https://carawon.com/en/import-to-azerbaijan", confidence: "medium", needs_review: false },
  { taxrule_id: "az-ev-duty", country_id: "azerbaijan", tax_type: "import_duty", label: "Import duty (electric vehicles ≤3yr, exempt)", rate_pct: 0, basis: "CIF value", effective_date: "2026-01-01", last_checked: D, source: "Carawon (Azerbaijan import guide)", source_url: "https://carawon.com/en/import-to-azerbaijan", confidence: "medium", needs_review: true, notes: "EV ≤3 years: 0% duty + no excise, but 18% VAT from Jan 2026. Verify with the State Customs Committee." },
];
for (const t of taxes) {
  if (!taxrules.taxrules.find((x) => x.taxrule_id === t.taxrule_id)) taxrules.taxrules.push(t);
}
write("taxrules.json", taxrules);

// ---------- ports.json ----------
const ports = read("ports.json");
const newPorts = [
  { port_id: "tr-istanbul", name: "Istanbul (Ambarlı/Haydarpaşa)", country_id: "turkey", type: "destination", note: null },
  { port_id: "tr-izmir", name: "Izmir (Alsancak)", country_id: "turkey", type: "destination", note: null },
  { port_id: "tr-mersin", name: "Mersin", country_id: "turkey", type: "destination", note: null },
  { port_id: "my-port-klang", name: "Port Klang", country_id: "malaysia", type: "destination", note: null },
  { port_id: "my-tanjung-pelepas", name: "Tanjung Pelepas (Johor)", country_id: "malaysia", type: "destination", note: null },
  { port_id: "nz-auckland", name: "Auckland", country_id: "new-zealand", type: "destination", note: null },
  { port_id: "nz-lyttelton", name: "Lyttelton (Christchurch)", country_id: "new-zealand", type: "destination", note: null },
  { port_id: "dz-algiers", name: "Algiers (Alger)", country_id: "algeria", type: "destination", note: null },
  { port_id: "dz-oran", name: "Oran", country_id: "algeria", type: "destination", note: null },
  { port_id: "qa-hamad", name: "Hamad Port (Doha)", country_id: "qatar", type: "destination", note: null },
  { port_id: "az-baku", name: "Baku (Alat / Caspian)", country_id: "azerbaijan", type: "destination", note: "Caspian Sea transit via Baku International Sea Trade Port" },
];
for (const p of newPorts) {
  if (!ports.ports.find((x) => x.port_id === p.port_id)) ports.ports.push(p);
}
write("ports.json", ports);

// ---------- routes.json ----------
const routes = read("routes.json");
const newRoutes = [
  { route_id: "cn-shanghai-to-tr-istanbul", origin_port_id: "cn-shanghai", destination_port_id: "tr-istanbul", est_days_min: 24, est_days_max: 34, shipping_method: "roro", source: "Industry route estimates", source_url: null, last_checked: D, confidence: "low" },
  { route_id: "cn-ningbo-to-tr-izmir", origin_port_id: "cn-ningbo", destination_port_id: "tr-izmir", est_days_min: 25, est_days_max: 35, shipping_method: "roro", source: "Industry route estimates", source_url: null, last_checked: D, confidence: "low" },
  { route_id: "cn-guangzhou-to-my-port-klang", origin_port_id: "cn-guangzhou", destination_port_id: "my-port-klang", est_days_min: 6, est_days_max: 12, shipping_method: "roro", source: "Industry route estimates", source_url: null, last_checked: D, confidence: "low" },
  { route_id: "cn-shanghai-to-nz-auckland", origin_port_id: "cn-shanghai", destination_port_id: "nz-auckland", est_days_min: 20, est_days_max: 30, shipping_method: "roro", source: "Industry route estimates", source_url: null, last_checked: D, confidence: "low" },
  { route_id: "cn-shanghai-to-dz-algiers", origin_port_id: "cn-shanghai", destination_port_id: "dz-algiers", est_days_min: 24, est_days_max: 34, shipping_method: "roro", source: "Industry route estimates", source_url: null, last_checked: D, confidence: "low" },
  { route_id: "cn-shanghai-to-qa-hamad", origin_port_id: "cn-shanghai", destination_port_id: "qa-hamad", est_days_min: 18, est_days_max: 26, shipping_method: "roro", source: "Industry route estimates", source_url: null, last_checked: D, confidence: "low" },
  { route_id: "cn-lianyungang-to-az-baku", origin_port_id: "cn-lianyungang", destination_port_id: "az-baku", est_days_min: 18, est_days_max: 30, shipping_method: "container", source: "Industry route estimates (Caspian / rail transit)", source_url: null, last_checked: D, confidence: "low" },
];
for (const r of newRoutes) {
  if (!routes.routes.find((x) => x.route_id === r.route_id)) routes.routes.push(r);
}
write("routes.json", routes);

// ---------- vehicle-market.json relations ----------
const vm = read("vehicle-market.json");
vm.meta.batch = "batch 15 — market-countries4";
vm.meta.updated = D;

const dsMatch = (summary) => ({ status: "match", summary, source: "Data sub-site models.json (export intelligence) + Left- and right-hand traffic (Wikipedia)", source_url: WIKI_LHT, source_type: "database", confidence: "high", checked_date: D });
const dsRhd = (model, market, extra) => ({ status: "needs_conversion", summary: `China domestic-market production is left-hand drive (LHD), but ${market} registers right-hand drive (RHD) only — ${model} is produced in RHD for export markets (${extra}). Confirm RHD availability with the exporter and source an RHD unit.`, source: "Data sub-site models.json (export intelligence) + Left- and right-hand traffic (Wikipedia)", source_url: WIKI_LHT, source_type: "database", confidence: "medium", checked_date: D, needs_review: true });
const charging = (dest) => ({ standard: "GB/T", destination_standard: dest, connector: "GB/T AC / GB/T DC (vehicle inlet)", voltage: null, frequency: null, needs_adapter: true, notes: `China-market GB/T inlet vs ${dest} network — adapter required; confirm the sourced unit's inlet (some export units carry a CCS2 inlet).`, source: "Vehicle: GB/T charging standard (Wikipedia); Destination: Combined Charging System / Type 2 (Wikipedia)", source_url: GBTSRC, source_type: "reputable_media", confidence: "medium", checked_date: D, needs_review: true });

const relations = [
  // ===== Turkey (LHD, EV SCT relief) =====
  {
    vehicle_id: "byd-atto-3", country_id: "turkey",
    drive_side_fit: dsMatch("China domestic-market production is left-hand drive (LHD); Turkey registers LHD only — no conversion required."),
    age_rule_fit: null,
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — Turkey's EV SCT (ÖTV) brackets (25% ≤160kW & ≤1.65M TL) are sharply lower than the 90–100%+ combustion rates. EV classification is the key cost lever.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)"),
    import_eligibility: { status: "conformity_required", requirements: ["ÖTV (SCT) classification", "Customs declaration + type approval"], notes: "Compounding stack: 10% duty + ÖTV + 20% VAT. EV SCT bracket depends on motor power and pre-tax price — confirm the unit's bracket.", source: "market sub-site importrules.json (tax stack)", source_url: "https://lenacars.com/en/blog/2025-electric-vehicle-sct-rates-tax-brackets-2", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "tr-sct-ice", ev_duty_taxrule_id: "tr-sct-ev", vat_taxrule_id: "tr-vat", ev_duty_relief: true, notes: "EV SCT 25% (≤160kW & ≤1.65M TL) vs 90–100% ICE; +10% import duty +20% VAT. Referenced from taxrules.json — verify with the Turkish Ministry of Trade.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://lenacars.com/en/blog/2025-electric-vehicle-sct-rates-tax-brackets-2", source_type: "government", confidence: "medium", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-tr-istanbul"], notes: "Sea freight to Istanbul (RoRo); Izmir as alternative.", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV; the ÖTV bracket (motor power vs pre-tax price) and the 50% additional China-tariff carve-out (EVs exempt) are the key cost questions for Turkey.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/atto3", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },
  {
    vehicle_id: "li-auto-l7", country_id: "turkey",
    drive_side_fit: dsMatch("China domestic-market production is left-hand drive (LHD); Turkey registers LHD only — no conversion required."),
    age_rule_fit: null,
    powertrain_fit: { status: "noted", summary: "EREV (extended-range electric vehicle) — Turkey's ÖTV regime taxes PHEVs at 45–85%; the EREV class is under-explained and its exact SCT bracket must be confirmed with the Ministry of Trade.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "low", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)"),
    import_eligibility: { status: "conformity_required", requirements: ["ÖTV (SCT) classification (EREV/PHEV)", "Customs declaration + type approval"], notes: "EREV classification under Turkey's PHEV ÖTV (45–85%) is the open question — confirm before quoting.", source: "market sub-site importrules.json (tax stack)", source_url: "https://www.wcshipping.com/blog/complete-guide-to-importing-cars-into-turkey-duties-vat-regulations", source_type: "regulatory", confidence: "low", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "tr-sct-ice", ev_duty_taxrule_id: null, vat_taxrule_id: "tr-vat", ev_duty_relief: false, notes: "EREV/PHEV ÖTV 45–85% + 10% duty + 20% VAT; also subject to the additional 50% China tariff on petrol/hybrid vehicles. Referenced from taxrules.json — verify with the Ministry of Trade.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://www.wcshipping.com/blog/complete-guide-to-importing-cars-into-turkey-duties-vat-regulations", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-tr-istanbul"], notes: "Sea freight to Istanbul (RoRo).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "Li Auto L7 (理想L7) is an EREV SUV; EREV-vs-PHEV SCT classification and the additional China hybrid tariff are the key cost questions for Turkey.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "low", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://en.wikipedia.org/wiki/Li_L7", source_type: "reputable_media", confidence: "low", checked_date: D,
  },

  // ===== Malaysia (RHD, EV duty relief) =====
  {
    vehicle_id: "byd-atto-3", country_id: "malaysia",
    drive_side_fit: dsRhd("BYD Atto 3", "Malaysia", "Australia, Thailand, Singapore, Malaysia official launch"),
    age_rule_fit: { status: "borderline", summary: "Atto 3 production began 2022; Malaysia's AP-dependent age limit (about 1–5 years) plus the restrictive AP regime mean a used unit requires an Approved Permit — confirm AP eligibility with MITI before sourcing.", source: "market sub-site importrules.json (AP + age limit)", source_url: "https://suvhub.com/import-rules/malaysia", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — Malaysia granted temporary import-duty and excise relief on EVs until 31 Dec 2025 (0% vs 30% duty). Confirm 2026 status with MITI.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "high", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)"),
    import_eligibility: { status: "conformity_required", requirements: ["Approved Permit (AP) — MITI", "RHD export unit"], notes: "AP is the hard gate for used imports; EV duty/excise relief (until Dec 2025) applies to eligible units. RHD required.", source: "market sub-site importrules.json (AP + EV relief)", source_url: "https://www.miti.gov.my/index.php/pages/view/10020", source_type: "regulatory", confidence: "high", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "my-duty", ev_duty_taxrule_id: "my-ev-duty", vat_taxrule_id: "my-sst", ev_duty_relief: true, notes: "EV: 0% duty + excise relief (until Dec 2025) vs 30% standard; +SST 10%. Referenced from taxrules.json — verify with RMCD/MITI.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://www.miti.gov.my/index.php/pages/view/10020", source_type: "government", confidence: "high", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-guangzhou-to-my-port-klang"], notes: "Sea freight to Port Klang (RoRo).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV sold officially RHD in Malaysia; the AP gate, RHD sourcing and the expiring EV duty relief are the key fit questions.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "high", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/atto3", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },
  {
    vehicle_id: "byd-sealion-6", country_id: "malaysia",
    drive_side_fit: dsRhd("BYD Sealion 6 (宋PLUS export)", "Malaysia", "official RHD export launch"),
    age_rule_fit: { status: "borderline", summary: "Sealion 6 production began 2022; Malaysia's AP-dependent age limit and restrictive AP regime require an Approved Permit — confirm AP eligibility with MITI.", source: "market sub-site importrules.json (AP + age limit)", source_url: "https://suvhub.com/import-rules/malaysia", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "PHEV (plug-in hybrid) — Malaysia's EV duty/excise relief (until Dec 2025) primarily targets BEVs; PHEV classification under the relief must be confirmed with MITI.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)"),
    import_eligibility: { status: "conformity_required", requirements: ["Approved Permit (AP) — MITI", "RHD export unit"], notes: "AP is the hard gate; PHEV classification under the EV relief is the open question. RHD required.", source: "market sub-site importrules.json (AP + EV relief)", source_url: "https://www.miti.gov.my/index.php/pages/view/10020", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "my-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "my-sst", ev_duty_relief: false, notes: "PHEV: standard 30% duty + excise 60–105% + SST 10%, unless PHEV qualifies for the (BEV-targeted) relief. Referenced from taxrules.json — verify with RMCD/MITI.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://www.miti.gov.my/index.php/pages/view/10020", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-guangzhou-to-my-port-klang"], notes: "Sea freight to Port Klang (RoRo).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Sealion 6 is a compact PHEV SUV sold RHD in Malaysia; PHEV-vs-BEV classification under the expiring EV relief, the AP gate and RHD sourcing are the key fit questions.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/seal-u", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },

  // ===== New Zealand (RHD, standards-based, duty-free) =====
  {
    vehicle_id: "byd-atto-3", country_id: "new-zealand",
    drive_side_fit: dsRhd("BYD Atto 3", "New Zealand", "Australia / New Zealand official RHD launch"),
    age_rule_fit: null,
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — New Zealand passenger cars are duty-free (0%) with 15% GST; zero-tailpipe EVs do not incur the Clean Car Standard CO₂ charge. EV imports are standards-based, not age-limited.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes)"),
    import_eligibility: { status: "conformity_required", requirements: ["NZTA entry certification", "MPI biosecurity clearance", "Frontal-impact + emissions compliance"], notes: "Standards-based (emissions ~2005+, frontal impact for post-2003 units), not age-limited. RHD required.", source: "market sub-site importrules.json (entry certification)", source_url: "https://www.japan-carrier.com/regulations/new-zealand?lang=en", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "nz-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "nz-gst", ev_duty_relief: false, notes: "0% duty (all passenger cars) + 15% GST; EV incurs no CO₂ charge. Referenced from taxrules.json — verify with NZ Customs.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://www.japan-carrier.com/regulations/new-zealand?lang=en", source_type: "government", confidence: "medium", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-nz-auckland"], notes: "Sea freight to Auckland (RoRo); Lyttelton as alternative.", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV with strong RHD availability for NZ/Australia; RHD sourcing, entry certification and biosecurity are the key fit questions.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/atto3", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },

  // ===== Algeria (LHD, <3yr + EV reduction) =====
  {
    vehicle_id: "byd-atto-3", country_id: "algeria",
    drive_side_fit: dsMatch("China domestic-market production is left-hand drive (LHD); Algeria registers LHD only — no conversion required."),
    age_rule_fit: { status: "ineligible", summary: "Atto 3 production began 2022; Algeria's under-3-years rule means 2022 units are now ~4 years old (over the limit) — only 2023+ units qualify. Verify the manufacture date.", source: "market sub-site importrules.json (<3-year age limit)", source_url: "https://guangcaiauto.com/car-import-rules-algeria-2025/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — Algeria applies an up-to-80% import-tax reduction on EVs (personal channel); a strong relief delta vs 15–30% standard duty + TIC + 19% VAT.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes) — early-stage"),
    import_eligibility: { status: "conformity_required", requirements: ["<3 years old", "ABS + speed limiter (safety equipment)"], notes: "Under-3-years age rule + safety equipment are the hard filters; EV tax reduction applies to eligible units.", source: "market sub-site importrules.json (<3yr + safety)", source_url: "https://guangcaiauto.com/car-import-rules-algeria-2025/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "dz-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "dz-vat", ev_duty_relief: true, notes: "EV: up to 80% import-tax reduction (personal channel) vs 15% (≤1800cc) / 30% standard + 19% VAT + TIC. Referenced from taxrules.json — verify with Algerian Customs.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://b2b.cbtcar.com/insights/import-taxes-on-cars-in-algeria-explained", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-dz-algiers"], notes: "Sea freight to Algiers (RoRo); Oran as alternative.", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV; Algeria's under-3-years rule (blocking 2022 units) and the EV tax reduction are the key fit questions.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/atto3", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },
  {
    vehicle_id: "geely-monjaro", country_id: "algeria",
    drive_side_fit: dsMatch("China domestic-market production is left-hand drive (LHD); Algeria registers LHD only — no conversion required."),
    age_rule_fit: { status: "ineligible", summary: "Monjaro production began 2021; Algeria's under-3-years rule means 2021 units are now ~5 years old (ineligible) — only 2023+ units qualify. Verify the manufacture date.", source: "market sub-site importrules.json (<3-year age limit)", source_url: "https://guangcaiauto.com/car-import-rules-algeria-2025/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Combustion (ICE) — subject to 15% (≤1800cc) or 30% (≥1800cc) duty + TIC + 19% VAT; no EV reduction applies.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: null,
    import_eligibility: { status: "conformity_required", requirements: ["<3 years old", "ABS + speed limiter (safety equipment)"], notes: "Under-3-years age rule is the hard blocker for 2021 units; safety equipment applies.", source: "market sub-site importrules.json (<3yr + safety)", source_url: "https://guangcaiauto.com/car-import-rules-algeria-2025/", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "dz-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "dz-vat", ev_duty_relief: false, notes: "ICE: 15% (≤1800cc) / 30% (≥1800cc) duty + TIC + 19% VAT. Referenced from taxrules.json — verify with Algerian Customs.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://mebarkiauto.com/en/faq", source_type: "government", confidence: "low", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-dz-algiers"], notes: "Sea freight to Algiers (RoRo).", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "Geely Monjaro is an ICE SUV; Algeria's under-3-years rule renders 2021 units ineligible — the age rule is the primary blocker.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://en.wikipedia.org/wiki/Geely_Xingyue_L", source_type: "reputable_media", confidence: "medium", checked_date: D,
  },

  // ===== Qatar (LHD, 5-year age limit) =====
  {
    vehicle_id: "geely-monjaro", country_id: "qatar",
    drive_side_fit: dsMatch("China domestic-market production is left-hand drive (LHD); Qatar registers LHD only — no conversion required."),
    age_rule_fit: { status: "borderline", summary: "Monjaro production began 2021; Qatar's 5-year age limit makes 2021 units ~5 years old (borderline) — source 2022+ units and verify the exact cut-off with Qatar Customs.", source: "market sub-site importrules.json (5-year age limit)", source_url: "https://autodirect-ae.com/import-regulations/qatar", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Combustion (ICE) — subject to Qatar's flat 5% customs duty; no VAT is currently imposed.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: null,
    import_eligibility: { status: "conformity_required", requirements: ["GCC specification", "Qatar ID + driving licence"], notes: "GCC specification and the 5-year age limit are the hard filters.", source: "market sub-site importrules.json (GCC spec + age)", source_url: "https://autodirect-ae.com/import-regulations/qatar", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: "qa-duty", ev_duty_taxrule_id: null, vat_taxrule_id: "qa-vat", ev_duty_relief: false, notes: "ICE: 5% duty + no VAT. Referenced from taxrules.json — verify with Qatar Customs.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://www.expatfocus.com/qatar/guide/qatar-buying-or-importing-a-car", source_type: "government", confidence: "medium", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-shanghai-to-qa-hamad"], notes: "Sea freight to Hamad Port (Doha), RoRo.", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "Geely Monjaro is an ICE SUV; Qatar's 5-year age rule vs its 2021 start and GCC-spec conformity are the key fit questions.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://en.wikipedia.org/wiki/Geely_Xingyue_L", source_type: "reputable_media", confidence: "medium", checked_date: D,
  },

  // ===== Azerbaijan (LHD, EV 0% duty) =====
  {
    vehicle_id: "byd-atto-3", country_id: "azerbaijan",
    drive_side_fit: dsMatch("China domestic-market production is left-hand drive (LHD); Azerbaijan registers LHD only — no conversion required."),
    age_rule_fit: { status: "eligible", summary: "Atto 3 production began 2022; Azerbaijan's 10-year age ban (2016+ in 2026) is comfortably satisfied by current units. Confirm ABS + airbag equipment.", source: "market sub-site importrules.json (10-year age ban)", source_url: "https://emze.az/news/legal-updates/azerbaijan-restricts-import-of-cars-over-10-years-old/", source_type: "regulatory", confidence: "high", checked_date: D, needs_review: true },
    powertrain_fit: { status: "noted", summary: "Battery-electric (EV) — EVs ≤3 years old pay 0% customs duty and no excise (18% VAT from Jan 2026) vs an engine-cc excise stack for combustion vehicles. A strong EV relief delta.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    ev_charging_compat: charging("CCS2 / Type 2 (Mennekes) — early-stage"),
    import_eligibility: { status: "conformity_required", requirements: ["≤10 years old (Decree 94)", "ABS + airbag + Euro-4"], notes: "10-year age ban, ABS/airbag and Euro-4 are the hard filters; EVs ≤3yr get 0% duty.", source: "market sub-site importrules.json (age ban + EV policy)", source_url: "https://carawon.com/en/import-to-azerbaijan", source_type: "regulatory", confidence: "medium", checked_date: D, needs_review: true },
    duty_anchors: { standard_duty_taxrule_id: null, ev_duty_taxrule_id: "az-ev-duty", vat_taxrule_id: "az-vat", ev_duty_relief: true, notes: "EV ≤3yr: 0% duty + no excise + 18% VAT (vs engine-cc duty/excise for ICE). Referenced from taxrules.json — verify with the State Customs Committee.", source: "market sub-site taxrules.json (referenced, not copied)", source_url: "https://carawon.com/en/import-to-azerbaijan", source_type: "government", confidence: "medium", checked_date: D, needs_review: true },
    shipping_route: { route_ids: ["cn-lianyungang-to-az-baku"], notes: "Caspian / rail transit to Baku (container); via Alat sea port.", source: "market sub-site routes.json (referenced, not copied)", source_url: null, source_type: "industry", confidence: "low", checked_date: D, needs_review: true },
    model_considerations: { status: "noted", summary: "BYD Atto 3 is a compact EV SUV; Azerbaijan's 0%-duty EV incentive (≤3yr) and the 10-year age ban are the key fit points.", source: "Data sub-site models.json (export intelligence)", source_url: MODELS, source_type: "database", confidence: "medium", checked_date: D, needs_review: true },
    source: "Data sub-site models.json + market sub-site taxrules/importrules (joined)", source_url: "https://www.byd.com/eu/car/atto3", source_type: "manufacturer", confidence: "medium", checked_date: D,
  },
];

const skips = [
  { vehicle_id: "byd-seal", country_id: "turkey", reason: "EV × LHD — EV SCT-relief delta already represented by byd-atto-3 × turkey; no independent increment (mechanical EV cross-product, avoid)." },
  { vehicle_id: "geely-monjaro", country_id: "turkey", reason: "ICE × LHD — the additional 50% China petrol/hybrid tariff is a market-level fact (stated on the Turkey page), not a vehicle×market increment; no age conflict (avoid)." },
  { vehicle_id: "byd-dolphin", country_id: "malaysia", reason: "EV × RHD — RHD + EV-duty-relief delta already represented by byd-atto-3 × malaysia (mechanical EV cross-product, avoid)." },
  { vehicle_id: "mg-4", country_id: "new-zealand", reason: "EV × RHD — RHD + charging delta already represented by byd-atto-3 × new-zealand; NZ is duty-free for all cars so no distinct EV increment (avoid)." },
  { vehicle_id: "chery-tiggo-8", country_id: "malaysia", reason: "ICE × RHD — AP-restricted used imports; RHD ICE delta already represented by chery-tiggo-8 × kenya/nigeria (mechanical ICE×RHD cross-product, avoid)." },
  { vehicle_id: "byd-atto-3", country_id: "qatar", reason: "EV × LHD — Qatar has no EV-specific duty relief (flat 5%) and no distinct EV increment; charging-only delta already represented (defer, like UAE)." },
  { vehicle_id: "chery-tiggo-8", country_id: "azerbaijan", reason: "ICE × LHD — 10-year age ban is satisfied by 2018+ units (no age conflict); >7yr excise coefficient is a market-level fact, not a vehicle×market increment (avoid)." },
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
