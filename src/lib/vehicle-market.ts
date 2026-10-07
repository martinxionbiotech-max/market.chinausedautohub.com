// Vehicle x Market relationship layer (P3.8) — delta-only records + generation gate.
//
// A combination page is generated ONLY when the pair produces knowledge that
// neither the vehicle page (data sub-site) nor the country page (market sub-site)
// already states. This is the "independent-information-increment" gate (model doc §3).
import relationsData from "../../shared/data/vehicle-market.json";
import { taxrules, getTaxRules, getCountry, rateLabel } from "./market";
import { getTranslations, t } from "../i18n";

export interface RelationField {
  status?: string;
  summary?: string;
  source?: string;
  source_url?: string | null;
  source_type?: string | null;
  confidence?: string | null;
  checked_date?: string | null;
  needs_review?: boolean;
  [k: string]: unknown;
}

export interface Relation {
  vehicle_id: string;
  country_id: string;
  drive_side_fit: RelationField | null;
  age_rule_fit: RelationField | null;
  powertrain_fit: RelationField | null;
  ev_charging_compat: (RelationField & {
    standard?: string | null;
    destination_standard?: string | null;
    connector?: string | null;
    voltage?: string | null;
    frequency?: string | null;
    needs_adapter?: boolean | null;
    notes?: string | null;
  }) | null;
  import_eligibility: (RelationField & {
    requirements?: string[];
    notes?: string | null;
  }) | null;
  duty_anchors: (RelationField & {
    standard_duty_taxrule_id?: string | null;
    ev_duty_taxrule_id?: string | null;
    vat_taxrule_id?: string | null;
    ev_duty_relief?: boolean | null;
    notes?: string | null;
  }) | null;
  shipping_route: (RelationField & {
    route_ids?: string[];
    notes?: string | null;
  }) | null;
  model_considerations: RelationField | null;
  source?: string;
  source_url?: string | null;
  source_type?: string | null;
  confidence?: string | null;
  checked_date?: string | null;
}

export const relations = relationsData.relations as Relation[];

export const getRelation = (vehicleId: string, countryId: string) =>
  relations.find((r) => r.vehicle_id === vehicleId && r.country_id === countryId);

export const getRelationsForCountry = (countryId: string) =>
  relations.filter((r) => r.country_id === countryId);

export const getRelationsForVehicle = (vehicleId: string) =>
  relations.filter((r) => r.vehicle_id === vehicleId);

// ---- Generation gate (§3) ---------------------------------------------------

export type IncrementType =
  | "drive-side mismatch"
  | "charging compatibility"
  | "EV duty relief"
  | "age-rule fit"
  | "powertrain classification";

/**
 * The independent increments a relation contributes. These are the only facts
 * that justify generating a combination page — each is a per-pair computation
 * that neither parent page states on its own.
 */
export function incrementTypes(rel: Relation): IncrementType[] {
  const out: IncrementType[] = [];
  if (rel.drive_side_fit && ["mismatch", "needs_conversion"].includes(rel.drive_side_fit.status ?? "")) {
    out.push("drive-side mismatch");
  }
  if (rel.ev_charging_compat?.needs_adapter) {
    out.push("charging compatibility");
  }
  if (rel.duty_anchors?.ev_duty_relief) {
    out.push("EV duty relief");
  }
  if (rel.age_rule_fit && ["borderline", "ineligible"].includes(rel.age_rule_fit.status ?? "")) {
    out.push("age-rule fit");
  }
  // EREV / PHEV-vs-EV classification is a distinct, under-explained class.
  const pf = (rel.powertrain_fit?.summary ?? "") + (rel.model_considerations?.summary ?? "");
  if (/erev|extended-range|phev.*classif|classif.*phev|phev.*exempt/i.test(pf)) {
    out.push("powertrain classification");
  }
  return [...new Set(out)];
}

/** Gate: generate the page only if at least one independent increment exists. */
export function passesGate(rel: Relation): boolean {
  return incrementTypes(rel).length > 0;
}

// ---- Duty anchors resolved from taxrules (reference, not copy) ---------------

export interface DutyAnchorView {
  standard: { label: string; rate: string } | null;
  ev: { label: string; rate: string } | null;
  vat: { label: string; rate: string } | null;
  rangeLabel: string;
}

export function dutyAnchorsFor(rel: Relation): DutyAnchorView | null {
  const a = rel.duty_anchors;
  if (!a) return null;
  const byId = (id?: string | null) => {
    if (!id) return null;
    const t = taxrules.find((x) => (x as any).taxrule_id === id);
    return t ? { label: t.label, rate: rateLabel(t) } : null;
  };
  const standard = byId(a.standard_duty_taxrule_id);
  const ev = byId(a.ev_duty_taxrule_id);
  const vat = byId(a.vat_taxrule_id);
  let rangeLabel = standard ? standard.rate : "Not available";
  if (ev && standard && ev.rate !== standard.rate) {
    rangeLabel = `${ev.rate} (EV) – ${standard.rate} (standard)`;
  }
  return { standard, ev, vat, rangeLabel };
}

// ---- Confidence labels ------------------------------------------------------

const CONF_CLASS: Record<string, string> = {
  high: "badge-high",
  medium: "badge-medium",
  low: "badge-low",
  unknown: "badge-unknown",
};

export function relConfidenceLabel(field: RelationField | null): string {
  if (!field) return "Unknown";
  const c = (field.confidence ?? "unknown").toLowerCase();
  if (field.needs_review) return "Needs verification";
  if (!field.source_url) return "Needs verification";
  if (c === "high" || c === "medium") return "Source-backed";
  if (c === "low") return "Estimated";
  return "Unknown";
}

export function relConfidenceClass(field: RelationField | null): string {
  if (!field) return CONF_CLASS["unknown"];
  const c = (field.confidence ?? "unknown").toLowerCase();
  if (field.needs_review) return "badge-medium";
  if (!field.source_url) return "badge-medium";
  return CONF_CLASS[c] ?? "badge-unknown";
}

export { getCountry, getTaxRules };

// ---- P3.8 batch 4: decision deepening (buyer decision points / key risks / checklist) ----
// These are DERIVED from the relation's existing sourced fields so that every
// assertion carries a source; where a field is absent (no evidence), no item is
// emitted (zero-fabrication rule).

export interface SourcedPoint {
  text: string;
  source?: string;
  source_url?: string | null;
  source_type?: string | null;
  confidence?: string | null;
  checked_date?: string | null;
  needs_review?: boolean;
}

function fieldMeta(f: RelationField | null): Omit<SourcedPoint, "text"> {
  if (!f) return {};
  // `source` may be a string (drive/age/duty/eligibility/charging) or an object
  // (powertrain_fit / model_considerations) — normalise to a string.
  const src = typeof f.source === "string" ? f.source : (f.source as any)?.source;
  const url = typeof f.source_url === "string" ? f.source_url : (f.source as any)?.source_url ?? null;
  return {
    source: src,
    source_url: url,
    source_type: (f.source_type as string) ?? (typeof f.source === "object" ? (f.source as any)?.source_type : undefined),
    confidence: f.confidence,
    checked_date: f.checked_date,
    needs_review: f.needs_review,
  };
}

/** Buyer decision points: when this vehicle × market is suitable / not suitable. */
export function decisionPoints(
  rel: Relation,
  locale = "en",
): {
  suitable: SourcedPoint[];
  notSuitable: SourcedPoint[];
} {
  const dict = getTranslations(locale);
  const d = (key: string) => t(dict, `vehicle.decision.${key}`);
  const suitable: SourcedPoint[] = [];
  const notSuitable: SourcedPoint[] = [];

  const ds = rel.drive_side_fit;
  if (ds?.status === "match") {
    suitable.push({ text: d("driveMatch"), ...fieldMeta(ds) });
  } else if (ds?.status === "needs_conversion") {
    suitable.push({ text: d("driveConversion"), ...fieldMeta(ds) });
  } else if (ds?.status === "mismatch") {
    notSuitable.push({ text: d("driveMismatch"), ...fieldMeta(ds) });
  }

  const ag = rel.age_rule_fit;
  if (ag?.status === "eligible") {
    suitable.push({ text: d("ageEligible"), ...fieldMeta(ag) });
  } else if (ag?.status === "borderline") {
    notSuitable.push({ text: d("ageBorderline"), ...fieldMeta(ag) });
  } else if (ag?.status === "ineligible") {
    notSuitable.push({ text: d("ageIneligible"), ...fieldMeta(ag) });
  }

  if (rel.duty_anchors?.ev_duty_relief) {
    suitable.push({ text: d("evDutyRelief"), ...fieldMeta(rel.duty_anchors) });
  }

  if (rel.ev_charging_compat?.needs_adapter) {
    notSuitable.push({ text: d("chargingMismatch"), ...fieldMeta(rel.ev_charging_compat) });
  }

  return { suitable, notSuitable };
}

/** Key risks — emitted only when the underlying field is flagged needs-review / low-confidence. */
export function keyRisks(rel: Relation, locale = "en"): SourcedPoint[] {
  const dict = getTranslations(locale);
  const d = (key: string) => t(dict, `vehicle.risks.${key}`);
  const risks: SourcedPoint[] = [];

  if (rel.duty_anchors?.needs_review) {
    risks.push({ text: d("duty"), ...fieldMeta(rel.duty_anchors) });
  }
  if (rel.age_rule_fit?.needs_review) {
    risks.push({ text: d("age"), ...fieldMeta(rel.age_rule_fit) });
  }
  if (rel.import_eligibility?.needs_review) {
    risks.push({ text: d("conformity"), ...fieldMeta(rel.import_eligibility) });
  }
  if (rel.ev_charging_compat?.needs_review) {
    risks.push({ text: d("charging"), ...fieldMeta(rel.ev_charging_compat) });
  }

  return risks;
}

/** Practical pre-import checklist — only destination-evidenced steps. */
export function checklist(rel: Relation, locale = "en"): SourcedPoint[] {
  const dict = getTranslations(locale);
  const d = (key: string) => t(dict, `vehicle.checklist.${key}`);
  const items: SourcedPoint[] = [];

  if (rel.age_rule_fit) {
    items.push({ text: d("age"), ...fieldMeta(rel.age_rule_fit) });
  }
  if (rel.drive_side_fit && ["mismatch", "needs_conversion"].includes(rel.drive_side_fit.status ?? "")) {
    items.push({ text: d("rhd"), ...fieldMeta(rel.drive_side_fit) });
  }
  if (rel.import_eligibility?.requirements?.length) {
    items.push({
      text: t(dict, "vehicle.checklist.conformity", { requirements: rel.import_eligibility.requirements.join(", ") }),
      ...fieldMeta(rel.import_eligibility),
    });
  }
  if (rel.ev_charging_compat?.needs_adapter) {
    items.push({ text: d("adapter"), ...fieldMeta(rel.ev_charging_compat) });
  }

  return items;
}
