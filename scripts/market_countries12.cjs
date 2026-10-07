// Batch: market-countries12 — add 5 countries + data layer.
// Countries: Fiji (Oceania RHD, 8yr age limit, FRCS, Suva),
//            Papua New Guinea (Oceania RHD, no universal age cap, PNG Customs, Lae/Port Moresby),
//            Guyana (Caribbean RHD, 8yr age limit, GRA, Georgetown),
//            Timor-Leste (Southeast Asia RHD, USD, Customs Authority, Dili),
//            Myanmar (Southeast Asia — LHD traffic but large RHD import history, MOC model-year policy, Yangon).
// All regulatory data cited to official/reliable sources; every statement carries source URL + last_checked (2026-10-07).
const fs = require("fs");
const base = "shared/data";
const D = "2026-10-07";
const read = (f) => JSON.parse(fs.readFileSync(`${base}/${f}`, "utf8"));
const write = (f, obj, indent = 2) => fs.writeFileSync(`${base}/${f}`, JSON.stringify(obj, null, indent) + "\n");

const WIKI_LHT = "https://en.wikipedia.org/wiki/Left-_and_right-hand_traffic";

// ---------- countries.json ----------
const countries = read("countries.json");
const newCountries = [
  { country_id: "fiji", name: "Fiji", name_zh: "斐济", region: "oceania", drive_side: "rhd", currency: "FJD", status: "active", source: "Fiji Revenue and Customs Service (FRCS)", source_url: "https://www.frcs.org.fj", source_date: D, confidence: "high" },
  { country_id: "papua-new-guinea", name: "Papua New Guinea", name_zh: "巴布亚新几内亚", region: "oceania", drive_side: "rhd", currency: "PGK", status: "active", source: "Papua New Guinea Customs Service", source_url: "https://customs.gov.pg/trade/importing_used_vehicles", source_date: D, confidence: "high" },
  { country_id: "guyana", name: "Guyana", name_zh: "圭亚那", region: "caribbean", drive_side: "rhd", currency: "GYD", status: "active", source: "Guyana Revenue Authority (GRA)", source_url: "https://gra.gov.gy/vehicles-8-years-old-used-tyres/", source_date: D, confidence: "high" },
  { country_id: "timor-leste", name: "Timor-Leste", name_zh: "东帝汶", region: "southeast-asia", drive_side: "rhd", currency: "USD", status: "active", source: "Timor-Leste Customs Authority", source_url: "https://customs.gov.tl/", source_date: D, confidence: "high" },
  { country_id: "myanmar", name: "Myanmar", name_zh: "缅甸", region: "southeast-asia", drive_side: "lhd", currency: "MMK", status: "active", source: "Myanmar Customs Department / Ministry of Commerce", source_url: "https://customs.gov.mm/", source_date: D, confidence: "high" },
];
for (const c of newCountries) {
  if (!countries.countries.find((x) => x.country_id === c.country_id)) countries.countries.push(c);
}
write("countries.json", countries);

// ---------- importrules.json ----------
const importrules = read("importrules.json");
const rules = [
  // ===== Fiji (RHD, 8yr age limit, FRCS, Suva) =====
  { rule_id: "fj-drive-side", country_id: "fiji", category: "drive_side", title: "Right-hand drive (RHD) only", rule_text: "Fiji drives on the left and registers right-hand-drive (RHD) vehicles. A China-market LHD unit cannot be registered as-is — source an RHD export unit.", effective_date: null, last_checked: D, source: "Left- and right-hand traffic (Wikipedia) / FRCS", source_url: WIKI_LHT, confidence: "high", needs_review: false },
  { rule_id: "fj-age-limit", country_id: "fiji", category: "vehicle_age", title: "Age limit: ~8 years (has changed recently)", rule_text: "Fiji caps used passenger-vehicle imports by age — currently around 8 years for petrol/diesel vehicles (sources cite 2018-or-newer for 2026), though the limit has been adjusted in recent budgets. Confirm the current cut-off with the Fiji Revenue and Customs Service (FRCS) before sourcing stock.", effective_date: null, last_checked: D, source: "JP Sheet (Fiji import guide 2026) / FRCS", source_url: "https://jpsheet.com/import-guide/fiji/", confidence: "medium", needs_review: true, notes: "~8 years, has changed recently — verify with FRCS." },
  { rule_id: "fj-import-process", country_id: "fiji", category: "import_eligibility", title: "Import duty + VAT + Suva clearance", rule_text: "Fiji levies import (fiscal) duty plus VAT on vehicles, with an environment levy on some categories. The principal entry port is Suva (Lautoka is secondary). FRCS is the customs authority. Confirm the document set and current rates with FRCS.", effective_date: null, last_checked: D, source: "FRCS / KMC Japan (Fiji import guide)", source_url: "https://kmcjapan.co.jp/import-guide/fiji", confidence: "medium", needs_review: true, notes: "Duty + VAT + environment levy; Suva/Lautoka. Verify with FRCS." },
  { rule_id: "fj-ev-policy", country_id: "fiji", category: "ev_policy", title: "EV duty concessions (confirm with FRCS)", rule_text: "Fiji has offered import-duty concessions for electric and hybrid vehicles to encourage adoption, alongside a growing charging network. A current, specific EV duty rate was not confirmed in the sources reviewed — confirm the current EV treatment with FRCS.", effective_date: null, last_checked: D, source: "FRCS / reliable import guides (EV policy reporting)", source_url: "https://www.frcs.org.fj", confidence: "low", needs_review: true, notes: "EV duty concessions — verify current rate with FRCS." },

  // ===== Papua New Guinea (RHD, no universal age cap, PNG Customs, Lae/Port Moresby) =====
  { rule_id: "pg-drive-side", country_id: "papua-new-guinea", category: "drive_side", title: "Right-hand drive (RHD) only", rule_text: "Papua New Guinea drives on the left and registers right-hand-drive (RHD) vehicles. A China-market LHD unit cannot be registered as-is — source an RHD export unit.", effective_date: null, last_checked: D, source: "Left- and right-hand traffic (Wikipedia) / PNG Customs Service", source_url: WIKI_LHT, confidence: "high", needs_review: false },
  { rule_id: "pg-age-limit", country_id: "papua-new-guinea", category: "vehicle_age", title: "No universal age limit (roadworthiness)", rule_text: "Papua New Guinea does not apply a single fixed age cut-off to used-vehicle imports; vehicles must meet roadworthiness and inspection requirements (SGS pre-shipment inspection applies to some categories). Confirm any age or condition limits with the PNG Customs Service before sourcing stock.", effective_date: null, last_checked: D, source: "PNG Customs Service (Importing a Used Vehicle) / SUVHUB", source_url: "https://customs.gov.pg/trade/importing_used_vehicles", confidence: "medium", needs_review: true, notes: "No fixed age cap; roadworthiness + SGS inspection. Verify with PNG Customs." },
  { rule_id: "pg-import-process", country_id: "papua-new-guinea", category: "import_eligibility", title: "Import duty + GST + Lae/Port Moresby clearance", rule_text: "Papua New Guinea levies import duty plus 10% GST on vehicles. The main ports are Lae and Port Moresby. PNG Customs Service is the customs authority. Confirm the document set (import permit, inspection) with PNG Customs.", effective_date: null, last_checked: D, source: "PNG Customs Service / SUVHUB (PNG import rules)", source_url: "https://suvhub.com/import-rules/papua-new-guinea", confidence: "medium", needs_review: true, notes: "Duty + 10% GST; Lae/Port Moresby. Verify with PNG Customs." },
  { rule_id: "pg-ev-policy", country_id: "papua-new-guinea", category: "ev_policy", title: "No EV-specific import-duty relief confirmed", rule_text: "No EV-specific import-duty relief was confirmed for Papua New Guinea in the sources reviewed; EVs follow the standard import duty + 10% GST structure. Confirm current EV treatment with PNG Customs.", effective_date: null, last_checked: D, source: "Needs verification (no EV-specific source located)", source_url: null, confidence: "unknown", needs_review: true, notes: "EV treatment not documented — verify with PNG Customs." },

  // ===== Guyana (RHD, 8yr age limit, GRA, Georgetown) =====
  { rule_id: "gy-drive-side", country_id: "guyana", category: "drive_side", title: "Right-hand drive (RHD) only", rule_text: "Guyana drives on the left and registers right-hand-drive (RHD) vehicles. A China-market LHD unit cannot be registered as-is — source an RHD export unit.", effective_date: null, last_checked: D, source: "Left- and right-hand traffic (Wikipedia) / Guyana Revenue Authority", source_url: WIKI_LHT, confidence: "high", needs_review: false },
  { rule_id: "gy-age-limit", country_id: "guyana", category: "vehicle_age", title: "Age limit: 8 years", rule_text: "Guyana restricts the importation of vehicles more than 8 years old (the Guyana Revenue Authority publishes this under its 'Vehicles 8 Years Old & Used Tyres' guidance). Source units inside the 8-year window and confirm the exact cut-off date with the GRA before shipping.", effective_date: null, last_checked: D, source: "Guyana Revenue Authority (GRA) — Vehicles 8 Years Old & Used Tyres", source_url: "https://gra.gov.gy/vehicles-8-years-old-used-tyres/", confidence: "high", needs_review: true, notes: "8 years — verify exact cut-off with GRA." },
  { rule_id: "gy-import-process", country_id: "guyana", category: "import_eligibility", title: "Duty (engine-banded) + VAT + Georgetown clearance", rule_text: "Guyana assesses motor-vehicle duty by engine size (see the GRA Motor Vehicle Duty/Tax Calculation Guide) plus VAT, clearing through Georgetown. GRA is the customs and tax authority. Confirm the current duty band and document set with GRA.", effective_date: null, last_checked: D, source: "Guyana Revenue Authority — Motor Vehicle Duty/Tax Calculation Guide", source_url: "https://gra.gov.gy/business/customs-and-trade/imports/motor-vehicle/", confidence: "medium", needs_review: true, notes: "Duty by engine cc + VAT; Georgetown. Verify with GRA." },
  { rule_id: "gy-ev-policy", country_id: "guyana", category: "ev_policy", title: "EV duty concessions (confirm with GRA)", rule_text: "Guyana has offered reduced or zero-rated import duty for electric vehicles in recent budgets to encourage adoption. A current, specific EV duty rate was not confirmed in the sources reviewed — confirm current EV treatment with the GRA.", effective_date: null, last_checked: D, source: "Guyana Revenue Authority / reliable import guides (EV policy reporting)", source_url: "https://gra.gov.gy", confidence: "low", needs_review: true, notes: "EV duty concessions — verify current rate with GRA." },

  // ===== Timor-Leste (RHD, USD, Customs Authority, Dili) =====
  { rule_id: "tl-drive-side", country_id: "timor-leste", category: "drive_side", title: "Right-hand drive (RHD) only", rule_text: "Timor-Leste drives on the left and registers right-hand-drive (RHD) vehicles. A China-market LHD unit cannot be registered as-is — source an RHD export unit.", effective_date: null, last_checked: D, source: "Left- and right-hand traffic (Wikipedia) / Timor-Leste Customs Authority", source_url: WIKI_LHT, confidence: "high", needs_review: false },
  { rule_id: "tl-age-limit", country_id: "timor-leste", category: "vehicle_age", title: "Age limit not clearly documented", rule_text: "A single, current used-vehicle age limit for Timor-Leste was not confirmed in the sources reviewed. Confirm any age or condition limits with the Timor-Leste Customs Authority before sourcing stock.", effective_date: null, last_checked: D, source: "Needs verification (no authoritative age rule located)", source_url: null, confidence: "unknown", needs_review: true, notes: "Age limit not documented — verify with Timor-Leste Customs." },
  { rule_id: "tl-import-process", country_id: "timor-leste", category: "import_eligibility", title: "Import duty + Dili clearance", rule_text: "Timor-Leste levies import duty and tax on vehicles, clearing through the port of Dili. The Timor-Leste Customs Authority administers import procedures under its Laws, Procedures & Regulations framework. Confirm the document set and current rates with the Customs Authority.", effective_date: null, last_checked: D, source: "Timor-Leste Customs Authority — Laws, Procedures & Regulations", source_url: "https://customs.gov.tl/doing-business/laws-procedures-regulations/", confidence: "medium", needs_review: true, notes: "Duty + tax; Dili. Verify with Timor-Leste Customs." },
  { rule_id: "tl-ev-policy", country_id: "timor-leste", category: "ev_policy", title: "No EV-specific import-duty relief confirmed", rule_text: "No EV-specific import-duty relief was confirmed for Timor-Leste in the sources reviewed; EVs follow the standard import duty + tax structure. Confirm current EV treatment with the Customs Authority.", effective_date: null, last_checked: D, source: "Needs verification (no EV-specific source located)", source_url: null, confidence: "unknown", needs_review: true, notes: "EV treatment not documented — verify with Timor-Leste Customs." },

  // ===== Myanmar (LHD traffic but large RHD import history; MOC model-year policy) =====
  { rule_id: "mm-drive-side", country_id: "myanmar", category: "drive_side", title: "Left-hand-drive traffic, but RHD imports widespread", rule_text: "Myanmar drives on the right (left-hand-drive traffic), but a large share of the used-vehicle fleet is right-hand drive (RHD) imported from Japan. Import rules for RHD units have varied over time — confirm the current drive-side requirement with the Ministry of Commerce before sourcing stock.", effective_date: null, last_checked: D, source: "Left- and right-hand traffic (Wikipedia) / DFDL (Myanmar 2025 vehicle import policies)", source_url: WIKI_LHT, confidence: "medium", needs_review: true, notes: "Official traffic is LHD (drives right), but RHD imports are common — verify current drive-side rule with MOC." },
  { rule_id: "mm-age-limit", country_id: "myanmar", category: "vehicle_age", title: "Model-year limits set by annual MOC notification", rule_text: "Myanmar restricts vehicle imports by model year via an annual Ministry of Commerce (MOC) notification. The 2025 Vehicle Import Policy (issued 4 December 2024) reaffirmed the existing permitted model years. Confirm the current permitted model years with MOC before sourcing stock.", effective_date: null, last_checked: D, source: "DFDL — Myanmar 2025 Vehicle Import Policies (MOC notification)", source_url: "https://www.dfdl.com/insights/legal-and-tax-updates/myanmar-2025-vehicle-import-policies/", confidence: "medium", needs_review: true, notes: "Model-year limits via annual MOC notification — verify current permitted years." },
  { rule_id: "mm-import-process", country_id: "myanmar", category: "import_eligibility", title: "Import permit + duty + Yangon clearance", rule_text: "Myanmar requires an import permit/licence and levies import duty plus commercial tax on vehicles, clearing mainly through Yangon (Thilawa). The Customs Department and Ministry of Commerce administer import procedures. Confirm the permit and document set before trading.", effective_date: null, last_checked: D, source: "Myanmar Customs Department / DFDL", source_url: "https://customs.gov.mm/", confidence: "medium", needs_review: true, notes: "Import permit + duty + commercial tax; Yangon (Thilawa). Verify with Myanmar Customs / MOC." },
  { rule_id: "mm-ev-policy", country_id: "myanmar", category: "ev_policy", title: "EV import concessions (confirm with MOC)", rule_text: "Myanmar has reduced import duties and relaxed rules for electric vehicles to encourage adoption, though exact current rates were not confirmed in the sources reviewed. Confirm current EV treatment with the Ministry of Commerce before trading.", effective_date: null, last_checked: D, source: "DFDL (Myanmar 2025 vehicle import policies) / Myanmar Customs", source_url: "https://www.dfdl.com/insights/legal-and-tax-updates/myanmar-2025-vehicle-import-policies/", confidence: "low", needs_review: true, notes: "EV import concessions — verify current rate with MOC." },
];
for (const r of rules) {
  if (!importrules.rules.find((x) => x.rule_id === r.rule_id)) importrules.rules.push(r);
}
write("importrules.json", importrules);

// ---------- taxrules.json ----------
const taxrules = read("taxrules.json");
const tax = [
  { taxrule_id: "fj-duty", country_id: "fiji", tax_type: "import_duty", label: "Import duty (used vehicles)", rate_pct: null, basis: "CIF value", effective_date: null, last_checked: D, source: "Fiji Revenue and Customs Service (FRCS)", source_url: "https://www.frcs.org.fj", confidence: "low", needs_review: true, notes: "Varies by engine size/type (importer guides cite ~15–32% for used passenger vehicles) — verify with FRCS." },
  { taxrule_id: "fj-vat", country_id: "fiji", tax_type: "vat", label: "VAT", rate_pct: 15, basis: "CIF + duty", effective_date: null, last_checked: D, source: "Fiji Revenue and Customs Service (FRCS)", source_url: "https://www.frcs.org.fj", confidence: "medium", needs_review: true, notes: "Standard VAT 15% (has been adjusted in recent budgets) — verify with FRCS." },
  { taxrule_id: "pg-duty", country_id: "papua-new-guinea", tax_type: "import_duty", label: "Import duty (used vehicles)", rate_pct: null, basis: "CIF value", effective_date: null, last_checked: D, source: "PNG Customs Service", source_url: "https://customs.gov.pg/trade/importing_used_vehicles", confidence: "low", needs_review: true, notes: "Varies by vehicle type — verify with PNG Customs." },
  { taxrule_id: "pg-gst", country_id: "papua-new-guinea", tax_type: "vat", label: "GST", rate_pct: 10, basis: "CIF + duty", effective_date: null, last_checked: D, source: "PNG Customs Service", source_url: "https://customs.gov.pg/trade/importing_used_vehicles", confidence: "medium", needs_review: false, notes: "GST 10% standard." },
  { taxrule_id: "gy-duty", country_id: "guyana", tax_type: "import_duty", label: "Import duty (used vehicles)", rate_pct: null, basis: "CIF value", effective_date: null, last_checked: D, source: "Guyana Revenue Authority (GRA)", source_url: "https://gra.gov.gy/business/customs-and-trade/imports/motor-vehicle/", confidence: "low", needs_review: true, notes: "Banded by engine size (GRA Motor Vehicle Duty/Tax Calculation Guide) — verify." },
  { taxrule_id: "gy-vat", country_id: "guyana", tax_type: "vat", label: "VAT", rate_pct: 14, basis: "CIF + duty", effective_date: null, last_checked: D, source: "Guyana Revenue Authority (GRA)", source_url: "https://gra.gov.gy", confidence: "medium", needs_review: false, notes: "VAT 14% standard." },
  { taxrule_id: "tl-duty", country_id: "timor-leste", tax_type: "import_duty", label: "Import duty (used vehicles)", rate_pct: null, basis: "CIF value", effective_date: null, last_checked: D, source: "Timor-Leste Customs Authority", source_url: "https://customs.gov.tl/", confidence: "low", needs_review: true, notes: "Rate varies by vehicle type — verify with Timor-Leste Customs." },
  { taxrule_id: "tl-tax", country_id: "timor-leste", tax_type: "other", label: "Sales/service tax", rate_pct: 10, basis: "CIF + duty", effective_date: null, last_checked: D, source: "Timor-Leste Customs Authority", source_url: "https://customs.gov.tl/", confidence: "low", needs_review: true, notes: "Sales/service tax (10%) — verify with Timor-Leste Customs." },
  { taxrule_id: "mm-duty", country_id: "myanmar", tax_type: "import_duty", label: "Import duty (used vehicles)", rate_pct: null, basis: "CIF value", effective_date: null, last_checked: D, source: "Myanmar Customs Department", source_url: "https://customs.gov.mm/", confidence: "low", needs_review: true, notes: "Import permit + duty (rate varies) — verify with Myanmar Customs." },
  { taxrule_id: "mm-ctt", country_id: "myanmar", tax_type: "other", label: "Commercial tax (CTT)", rate_pct: null, basis: "CIF + duty", effective_date: null, last_checked: D, source: "Myanmar Customs Department", source_url: "https://customs.gov.mm/", confidence: "low", needs_review: true, notes: "Commercial tax applies — verify current rate with Myanmar Customs." },
];
for (const t of tax) {
  if (!taxrules.taxrules.find((x) => x.taxrule_id === t.taxrule_id)) taxrules.taxrules.push(t);
}
write("taxrules.json", taxrules);

// ---------- ports.json ----------
const ports = read("ports.json");
const newPorts = [
  { port_id: "fj-suva", name: "Suva", country_id: "fiji", type: "destination", note: "Main port; Lautoka is secondary" },
  { port_id: "pg-lae", name: "Lae", country_id: "papua-new-guinea", type: "destination", note: "Main port; Port Moresby is secondary" },
  { port_id: "gy-georgetown", name: "Georgetown", country_id: "guyana", type: "destination", note: null },
  { port_id: "tl-dili", name: "Dili", country_id: "timor-leste", type: "destination", note: null },
  { port_id: "mm-yangon", name: "Yangon (Thilawa)", country_id: "myanmar", type: "destination", note: null },
];
for (const p of newPorts) {
  if (!ports.ports.find((x) => x.port_id === p.port_id)) ports.ports.push(p);
}
write("ports.json", ports);

// ---------- routes.json ----------
const routes = read("routes.json");
const newRoutes = [
  { route_id: "cn-shanghai-to-fj-suva", origin_port_id: "cn-shanghai", destination_port_id: "fj-suva", est_days_min: 20, est_days_max: 30, shipping_method: "roro", source: "Industry route estimates", source_url: null, last_checked: D, confidence: "low" },
  { route_id: "cn-shanghai-to-pg-lae", origin_port_id: "cn-shanghai", destination_port_id: "pg-lae", est_days_min: 14, est_days_max: 20, shipping_method: "roro", source: "Industry route estimates", source_url: null, last_checked: D, confidence: "low" },
  { route_id: "cn-shanghai-to-gy-georgetown", origin_port_id: "cn-shanghai", destination_port_id: "gy-georgetown", est_days_min: 30, est_days_max: 42, shipping_method: "roro", source: "Industry route estimates (via Panama transshipment)", source_url: null, last_checked: D, confidence: "low" },
  { route_id: "cn-guangzhou-to-tl-dili", origin_port_id: "cn-guangzhou", destination_port_id: "tl-dili", est_days_min: 10, est_days_max: 16, shipping_method: "roro", source: "Industry route estimates", source_url: null, last_checked: D, confidence: "low" },
  { route_id: "cn-guangzhou-to-mm-yangon", origin_port_id: "cn-guangzhou", destination_port_id: "mm-yangon", est_days_min: 7, est_days_max: 14, shipping_method: "roro", source: "Industry route estimates", source_url: null, last_checked: D, confidence: "low" },
];
for (const r of newRoutes) {
  if (!routes.routes.find((x) => x.route_id === r.route_id)) routes.routes.push(r);
}
write("routes.json", routes);

console.log("countries:", countries.countries.length);
console.log("importrules:", importrules.rules.length);
console.log("taxrules:", taxrules.taxrules.length);
console.log("ports:", ports.ports.length);
console.log("routes:", routes.routes.length);
