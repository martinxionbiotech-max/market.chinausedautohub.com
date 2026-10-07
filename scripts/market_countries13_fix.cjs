// Batch: market-countries13 — data-layer QA fix pass.
// 1) Correct mw-ev-policy: prior record said "no EV relief confirmed" (source_url null,
//    confidence unknown). Firecrawl research confirmed Malawi's 2025 EV import rules:
//    0% import duty + 8% VAT (vs 16.5%) + excise-free under 100 kW + no EV age limit
//    (EV24.africa, corroborated by BRT Automobile). Only verifiable facts are written.
// 2) Add the corresponding EV taxrules (mw-ev-duty / mw-ev-vat / mw-ev-excise) so the
//    Vehicle×Market relation layer can truthfully reference EV duty relief.
// 3) Refine mw-age-limit to reflect the 10-year combustion cap vs no-limit-for-EVs.
const fs = require("fs");
const base = "shared/data";
const D = "2026-10-07";
const read = (f) => JSON.parse(fs.readFileSync(`${base}/${f}`, "utf8"));
const write = (f, obj, indent = 2) => fs.writeFileSync(`${base}/${f}`, JSON.stringify(obj, null, indent) + "\n");

const MW_EV_URL = "https://www.ev24.africa/malawi-ev-import-regulations-2025-how-to-bring-in-your-electric-vehicle/";

// ---------- importrules.json ----------
const ir = read("importrules.json");
const replaceRule = (rid, patch) => {
  const idx = ir.rules.findIndex((x) => x.rule_id === rid);
  if (idx >= 0) ir.rules[idx] = { ...ir.rules[idx], ...patch };
  else console.error("!! missing rule:", rid);
};

replaceRule("mw-ev-policy", {
  title: "EV duty exemption (2025): 0% duty + 8% VAT + excise-free",
  rule_text:
    "Malawi's 2025 EV import rules exempt fully electric vehicles (not hybrids) from import duty, reduce VAT on EVs to 8% (down from 16.5%), waive excise tax for EVs under 100 kW, and apply no age limit to EVs (combustion vehicles are limited to about 10 years). Hybrids receive a reduced excise scale (0% under 8 years, 35% 8–12 years, 60% over 12 years). Charging ports are expected to be Type 2 or CCS. Confirm current figures with the Malawi Revenue Authority (MRA) before trading.",
  effective_date: null,
  last_checked: D,
  source: "EV24.africa (Malawi EV Import Regulations 2025) / BRT Automobile (Malawi EV tariff)",
  source_url: MW_EV_URL,
  confidence: "medium",
  needs_review: true,
  notes: "0% duty + 8% VAT + excise-free (<100 kW) for full EVs; no EV age limit. Verify with MRA.",
});

replaceRule("mw-age-limit", {
  title: "No age limit for EVs; ~10 years for combustion",
  rule_text:
    "Malawi applies no age limit to imported electric vehicles under the 2025 EV rules, while combustion used-vehicle imports are reported as limited to about 10 years. A mandatory pre-shipment condition appraisal by an approved inspection body is part of the document set. Confirm the current age rules for each powertrain with the Malawi Revenue Authority (MRA) before sourcing stock.",
  last_checked: D,
  source: "Carbarn Malawi (import rules) / EV24.africa (Malawi EV Import Regulations 2025)",
  source_url: "https://www.carbarn.mw/import-rules-and-regulations",
  confidence: "medium",
  needs_review: true,
  notes: "EVs: no age limit. Combustion: ~10-year cap reported. Verify with MRA.",
});
write("importrules.json", ir);

// ---------- taxrules.json ----------
const tr = read("taxrules.json");
const newTax = [
  { taxrule_id: "mw-ev-duty", country_id: "malawi", tax_type: "import_duty", label: "Import duty (electric vehicles)", rate_pct: 0, basis: "CIF value", effective_date: null, last_checked: D, source: "EV24.africa (Malawi EV Import Regulations 2025)", source_url: MW_EV_URL, confidence: "medium", needs_review: true, notes: "Fully electric vehicles (not hybrids) are exempt from import duty under the 2025 rules. Verify with MRA." },
  { taxrule_id: "mw-ev-vat", country_id: "malawi", tax_type: "vat", label: "VAT (electric vehicles)", rate_pct: 8, basis: "CIF + duty", effective_date: null, last_checked: D, source: "EV24.africa (Malawi EV Import Regulations 2025)", source_url: MW_EV_URL, confidence: "medium", needs_review: true, notes: "EV VAT reduced to 8% (down from 16.5%). Verify with MRA." },
  { taxrule_id: "mw-ev-excise", country_id: "malawi", tax_type: "excise", label: "Excise (electric vehicles <100 kW)", rate_pct: 0, basis: "Not applicable (<100 kW)", effective_date: null, last_checked: D, source: "EV24.africa (Malawi EV Import Regulations 2025)", source_url: MW_EV_URL, confidence: "medium", needs_review: true, notes: "EVs under 100 kW are excise-tax-free under the 2025 rules. Verify with MRA." },
];
for (const t of newTax) {
  if (!tr.taxrules.find((x) => x.taxrule_id === t.taxrule_id)) tr.taxrules.push(t);
}
write("taxrules.json", tr);

console.log("mw-ev-policy fixed:", !!ir.rules.find((x) => x.rule_id === "mw-ev-policy")?.source_url);
console.log("taxrules:", tr.taxrules.length);
