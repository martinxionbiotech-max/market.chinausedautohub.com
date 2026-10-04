// MARKET 站数据访问层：只读共享数据 + 查询辅助
import countriesData from "../../shared/data/countries.json";
import importrulesData from "../../shared/data/importrules.json";
import taxrulesData from "../../shared/data/taxrules.json";
import portsData from "../../shared/data/ports.json";
import routesData from "../../shared/data/routes.json";
import modelsData from "../../shared/data/models.json";
import brandsData from "../../shared/data/brands.json";

export const countries = countriesData.countries;
export const rules = importrulesData.rules;
export const taxrules = taxrulesData.taxrules;
export const ports = portsData.ports;
export const routes = routesData.routes;
export const models = modelsData.models;
export const brands = brandsData.brands;

export const getCountry = (id: string) => countries.find((c) => c.country_id === id);

// PHASE 6 five-level confidence labels. Honest mapping from the stored
// confidence (high/medium/low/unknown) + source URL presence + needs_review.
// "Confirmed" is reserved for data independently verified against an official
// authority document; this platform does not yet perform that verification, so
// no rule currently carries it — the label is defined for completeness only.
export type ConfidenceLabel =
  | "Confirmed"
  | "Source-backed"
  | "Needs verification"
  | "Estimated"
  | "Unknown";

export interface ConfidenceSource {
  confidence?: string | null;
  source_url?: string | null;
  needs_review?: boolean | null;
}

export function confidenceLabel(item: ConfidenceSource): ConfidenceLabel {
  const hasUrl = Boolean(item.source_url);
  if (item.needs_review) return "Needs verification";
  if (!hasUrl) return "Needs verification";
  const c = (item.confidence ?? "unknown").toLowerCase();
  if (c === "high" || c === "medium") return "Source-backed";
  if (c === "low") return "Estimated";
  return "Unknown";
}

export function confidenceClass(label: ConfidenceLabel): string {
  switch (label) {
    case "Confirmed":
      return "badge-high";
    case "Source-backed":
      return "badge-high";
    case "Needs verification":
      return "badge-medium";
    case "Estimated":
      return "badge-low";
    default:
      return "badge-unknown";
  }
}

// Jurisdiction = the country the rule applies to (explicit display field).
export function jurisdictionFor(countryId: string): string {
  return getCountry(countryId)?.name ?? countryId;
}

// Applicability = what the rule/charge applies to, derived from its category.
const APPLICABILITY_BY_CATEGORY: Record<string, string> = {
  vehicle_age: "Used vehicles by age",
  drive_side: "All imported vehicles (drive side)",
  ev_policy: "Electric vehicles",
  import_eligibility: "Used vehicle imports",
  registration: "Vehicle registration",
  emission: "Emissions compliance",
  other: "General import requirement",
};

export function applicabilityForCategory(category: string): string {
  return APPLICABILITY_BY_CATEGORY[category] ?? category;
}

export function applicabilityForTaxType(taxType: string): string {
  switch (taxType) {
    case "import_duty":
      return "Imported used vehicles (CIF value)";
    case "vat":
      return "Imported vehicles (CIF + duty)";
    case "excise":
      return "Selected vehicles";
    default:
      return "General import charge";
  }
}
export const getRules = (countryId: string) => rules.filter((r) => r.country_id === countryId);
export const rulesByCategory = (countryId: string, category: string) =>
  rules.filter((r) => r.country_id === countryId && r.category === category);
export const getTaxRules = (countryId: string) => taxrules.filter((t) => t.country_id === countryId);
export const getDestPorts = (countryId: string) =>
  ports.filter((p) => p.country_id === countryId && p.type === "destination");
export const getRoutesForCountry = (countryId: string) => {
  const destIds = getDestPorts(countryId).map((p) => p.port_id);
  return routes.filter((r) => destIds.includes(r.destination_port_id));
};
export const portName = (id: string) => {
  const p = ports.find((x) => x.port_id === id);
  return p ? p.name : id;
};
export const getModel = (id: string) => models.find((m) => m.model_id === id);
export const getBrand = (id: string) => brands.find((b) => b.brand_id === id);
export const modelsByBodyType = (bodyType: string) => models.filter((m) => m.body_type === bodyType);
export const modelsByPowertrain = (powertrain: string) =>
  models.filter((m) => m.generations.some((g) => g.trims.some((t) => t.powertrain === powertrain)));
