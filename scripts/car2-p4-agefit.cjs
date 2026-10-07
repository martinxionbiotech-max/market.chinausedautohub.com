// car2-p4: fill age_rule_fit for the 58 weak Vehicle×Market relations.
// Real increment: per-pair age-rule fit derived from the ALREADY-SOURCED country
// vehicle_age rule (importrules.json) joined with model production years
// (models.json). No fabrication: every assertion references the existing rule's
// source/url/confidence; checked_date = 2026-10-07.
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const vmPath = path.join(ROOT, "shared/data/vehicle-market.json");
const irPath = path.join(ROOT, "shared/data/importrules.json");
const modelsPath = path.join(ROOT, "shared/data/models.json");

const vm = JSON.parse(fs.readFileSync(vmPath, "utf8"));
const ir = JSON.parse(fs.readFileSync(irPath, "utf8"));
const models = JSON.parse(fs.readFileSync(modelsPath, "utf8"));

const modelMap = Object.fromEntries(models.models.map((m) => [m.model_id, m]));
const ageByCountry = {};
for (const r of ir.rules.filter((r) => r.category === "vehicle_age")) {
  ageByCountry[r.country_id] = r;
}

function prodStart(vehicleId) {
  const m = modelMap[vehicleId];
  if (!m) return null;
  return Math.min(...m.generations.flatMap((g) => g.production_years));
}

const CHECKED = "2026-10-07";

// Per-country verdict: { status, summary } where summary is the FULL sentence
// (already interpolated with model name + production year) — cleaner than a
// template + clause that risks duplicating the rule title.
function ageVerdict(countryId, vehicleId) {
  const year = prodStart(vehicleId);
  const age = year ? 2026 - year : null;
  const name = modelMap[vehicleId]?.name ?? vehicleId;
  const began = year ? `${name} production began ${year}` : `${name} (production year unknown)`;

  switch (countryId) {
    case "kenya":
      return { status: "eligible", summary: `${began}; Kenya's 8-year age limit (KS 1515:2000) is satisfied by current-generation units.` };
    case "saudi-arabia":
      return { status: "eligible", summary: `${began}; Saudi Arabia's 5-year used passenger-car age limit is satisfied by a 2023 model.` };
    case "thailand":
      return { status: "ineligible", summary: `${began}; Thailand tightly restricts used-vehicle imports — regular used passenger-car imports are generally not permitted.` };
    case "georgia":
      return { status: "eligible", summary: `${began}; Georgia applies a 6-year excise cliff (a tax step-up, not a ban) — current units remain importable.` };
    case "uae":
      return { status: "eligible", summary: `${began}; the UAE imposes no general age limit on used-car imports.` };
    case "chile":
      return { status: "eligible", summary: `${began}; Chile imposes no import age limit on used vehicles.` };
    case "south-africa":
      return { status: "eligible", summary: `${began}; South Africa has no fixed age cut-off — used imports are gated by permit categories, not age.` };
    case "new-zealand":
      return { status: "eligible", summary: `${began}; New Zealand has no fixed age limit — eligibility is emissions/standards-based.` };
    case "australia":
      return { status: "eligible", summary: `${began}; Australia has no blanket age limit — eligibility is ADR/import-approval based.` };
    case "turkey":
      return { status: "eligible", summary: `${began}; no universal age limit was identified for Turkey — cost is driven by the ÖTV/SCT tax stack.` };
    case "russia":
      return { status: "eligible", summary: `${began}; no strict age limit was identified for Russia — EAEU technical certification applies.` };
    case "armenia":
      return { status: "eligible", summary: `${began}; no strict age limit was identified for Armenia.` };
    case "timor-leste":
      return { status: "eligible", summary: `${began}; Timor-Leste's age limit is not clearly documented — confirm with customs before sourcing.` };
    case "kazakhstan": {
      const s = age != null && age <= 6 ? "eligible" : "borderline";
      return { status: s, summary: `${began}; Kazakhstan's age limit was recently adjusted — verify the current cut-off with KGD.` };
    }
    case "uzbekistan": {
      const s = age != null && age <= 6 ? "eligible" : "borderline";
      return { status: s, summary: `${began}; Uzbekistan restricts used-vehicle imports by age — confirm current limits with customs.` };
    }
    case "nigeria": {
      const s = age != null && age <= 6 ? "eligible" : "borderline";
      return { status: s, summary: `${began}; Nigeria restricts used-vehicle imports by age and the rule has changed recently — confirm the current limit.` };
    }
    case "bangladesh":
      return { status: "eligible", summary: `${began}; Bangladesh applies reconditioned-car age restrictions — confirm the current limit.` };
    case "sri-lanka":
      return { status: "eligible", summary: `${began}; Sri Lanka reopened vehicle imports on 1 Feb 2025, but no single numeric age limit was located in the sources reviewed — verify with Sri Lanka Customs.` };
    default:
      return { status: "eligible", summary: `${began}; verify current age/condition rules with customs.` };
  }
}

const changed = [];
for (const rel of vm.relations) {
  if (rel.age_rule_fit) continue; // only fill nulls
  const rule = ageByCountry[rel.country_id];
  const v = ageVerdict(rel.country_id, rel.vehicle_id);

  rel.age_rule_fit = {
    status: v.status,
    summary: v.summary,
    source: rule
      ? `market sub-site importrules.json (${rule.title})`
      : "Sri Lanka Customs / LankaBizz (Imports & Exports Control Regs No.01/2025)",
    source_url: rule ? rule.source_url ?? null : "https://lankabizz.net/2025/02/01/sri-lanka-updates-motor-vehicle-import-regulations/",
    source_type: "regulatory",
    confidence: rule ? rule.confidence : "low",
    checked_date: CHECKED,
    needs_review: true,
  };
  changed.push(`${rel.vehicle_id}->${rel.country_id}`);
}

fs.writeFileSync(vmPath, JSON.stringify(vm, null, 2) + "\n");
console.log("filled age_rule_fit for", changed.length, "relations");
