// Batch 11 market work — sync Arcfox brand/model + add 2 Vehicle×Market relations + reject records.
const fs = require("fs");

const base = "shared/data";

// ---- 1. Sync Arcfox brand (2-space indent) ----
const brandsPath = `${base}/brands.json`;
const brands = JSON.parse(fs.readFileSync(brandsPath, "utf8"));
if (!brands.brands.find(b => b.brand_id === "arcfox")) {
  brands.brands.push({
    "brand_id": "arcfox",
    "name": "Arcfox",
    "name_zh": "极狐",
    "origin_country": "CN",
    "founded": 2017,
    "powertrains": ["ev"],
    "vehicle_types": ["sedan", "suv"],
    "source": "Official brand history",
    "source_url": "https://www.arcfox.com.cn/",
    "source_date": "2026-10-07",
    "confidence": "high"
  });
  fs.writeFileSync(brandsPath, JSON.stringify(brands, null, 2) + "\n");
  console.log("added brand: arcfox");
} else {
  console.log("brand arcfox already present");
}

// ---- 2. Sync arcfox-alpha-s model (1-space indent) ----
const modelsPath = `${base}/models.json`;
const models = JSON.parse(fs.readFileSync(modelsPath, "utf8"));
if (!models.models.find(m => m.model_id === "arcfox-alpha-s")) {
  models.models.push({
    "model_id": "arcfox-alpha-s",
    "brand_id": "arcfox",
    "name": "Alpha S",
    "name_zh": "极狐阿尔法S",
    "body_type": "sedan",
    "status": "active",
    "generations": [
      {
        "generation_id": "arcfox-alpha-s-g1",
        "name": "First Generation",
        "production_years": [2021, 2025],
        "trims": [
          {
            "trim_id": "arcfox-alpha-s-g1-ev",
            "name": "525S",
            "powertrain": "ev",
            "production_years": [2021, 2025],
            "specs": {
              "motor_power_kw": 163,
              "battery_capacity_kwh": 67.3,
              "range_km": 525,
              "drive_type": "fwd",
              "seats": 5
            },
            "spec_source": "Reputable media specifications",
            "spec_source_url": "https://en.wikipedia.org/wiki/Arcfox_Alpha-S6",
            "spec_source_date": "2026-10-06",
            "confidence": "medium"
          }
        ]
      }
    ],
    "source": "Reputable media specifications",
    "source_url": "https://en.wikipedia.org/wiki/Arcfox_Alpha-S6",
    "source_date": "2026-10-06",
    "confidence": "medium"
  });
  fs.writeFileSync(modelsPath, JSON.stringify(models, null, 1) + "\n");
  console.log("added model: arcfox-alpha-s");
} else {
  console.log("model arcfox-alpha-s already present");
}

// ---- 3. Add relations + skips ----
const vmPath = `${base}/vehicle-market.json`;
const vm = JSON.parse(fs.readFileSync(vmPath, "utf8"));

const relations = [
  {
    "vehicle_id": "arcfox-alpha-s",
    "country_id": "uae",
    "drive_side_fit": {
      "status": "match",
      "summary": "China domestic-market production is left-hand drive (LHD); the UAE registers LHD only — no conversion required.",
      "source": "Data sub-site models.json (export intelligence) + Left- and right-hand traffic (Wikipedia)",
      "source_url": "https://en.wikipedia.org/wiki/Left-_and_right-hand_traffic",
      "source_type": "database",
      "confidence": "high",
      "checked_date": "2026-10-07",
      "needs_review": true
    },
    "age_rule_fit": null,
    "powertrain_fit": {
      "status": "noted",
      "summary": "Battery-electric (EV) — the UAE records no EV-specific import duty (5% standard + 5% VAT), so the increment is charging compatibility plus official GCC market entry of a new premium EV brand.",
      "source": "Data sub-site models.json (export intelligence)",
      "source_url": "https://data.chinausedautohub.com/models/",
      "source_type": "database",
      "confidence": "medium",
      "checked_date": "2026-10-07",
      "needs_review": true
    },
    "ev_charging_compat": {
      "standard": "GB/T",
      "destination_standard": "CCS2 / Type 2 (Mennekes)",
      "connector": "GB/T AC / GB/T DC (vehicle inlet)",
      "voltage": null,
      "frequency": null,
      "needs_adapter": true,
      "notes": "China-market GB/T inlet vs UAE CCS2 / Type 2 network — adapter required; regional export units may carry a CCS2 inlet (confirm the sourced unit).",
      "source": "Vehicle: GB/T charging standard (Wikipedia); Destination: IEC 62196-2 Type 2 connector (Wikipedia)",
      "source_url": "https://en.wikipedia.org/wiki/GB/T_charging_standard",
      "source_type": "reputable_media",
      "confidence": "medium",
      "checked_date": "2026-10-07",
      "needs_review": true
    },
    "import_eligibility": {
      "status": "conformity_required",
      "requirements": ["GCC specification"],
      "notes": "UAE requires GCC specification; non-GCC vehicles may need modification before registration. No universal age limit.",
      "source": "market sub-site importrules.json (GCC specification)",
      "source_url": null,
      "source_type": "regulatory",
      "confidence": "medium",
      "checked_date": "2026-10-07",
      "needs_review": true
    },
    "duty_anchors": {
      "standard_duty_taxrule_id": "uae-duty",
      "ev_duty_taxrule_id": null,
      "vat_taxrule_id": "uae-vat",
      "ev_duty_relief": false,
      "notes": "No EV-specific duty — 5% standard import duty + 5% VAT. Referenced from taxrules.json.",
      "source": "market sub-site taxrules.json (referenced, not copied)",
      "source_url": "https://www.dubaicustoms.gov.ae",
      "source_type": "government",
      "confidence": "low",
      "checked_date": "2026-10-07",
      "needs_review": true
    },
    "shipping_route": {
      "route_ids": ["cn-tianjin-to-ae-jebel-ali", "cn-shanghai-to-ae-jebel-ali"],
      "notes": "Sea freight to Jebel Ali (Dubai), RoRo.",
      "source": "market sub-site routes.json (referenced, not copied)",
      "source_url": null,
      "source_type": "industry",
      "confidence": "low",
      "checked_date": "2026-10-07",
      "needs_review": true
    },
    "model_considerations": {
      "status": "noted",
      "summary": "Arcfox Alpha S is BAIC's premium battery-electric sedan; officially entered the UAE in February 2025 via Next Generation Mobility (Al Khoory Group) — the brand's first GCC presence.",
      "source": "Data sub-site models.json (export intelligence)",
      "source_url": "https://ngmuae.com/2025/02/27/next-generation-mobility-introduces-arcfoxs-advanced-evs-to-the-uae-market/",
      "source_type": "reputable_media",
      "confidence": "medium",
      "checked_date": "2026-10-07",
      "needs_review": true
    },
    "source": "Data sub-site models.json + market sub-site taxrules/importrules (joined)",
    "source_url": "https://data.chinausedautohub.com/models/",
    "source_type": "database",
    "confidence": "medium",
    "checked_date": "2026-10-07"
  },
  {
    "vehicle_id": "arcfox-alpha-s",
    "country_id": "saudi-arabia",
    "drive_side_fit": {
      "status": "match",
      "summary": "China domestic-market production is left-hand drive (LHD); Saudi Arabia registers LHD only — no conversion required.",
      "source": "Data sub-site models.json (export intelligence) + Left- and right-hand traffic (Wikipedia)",
      "source_url": "https://en.wikipedia.org/wiki/Left-_and_right-hand_traffic",
      "source_type": "database",
      "confidence": "high",
      "checked_date": "2026-10-07",
      "needs_review": true
    },
    "age_rule_fit": {
      "status": "borderline",
      "summary": "Saudi Arabia restricts used passenger-car imports to five years or newer; Alpha S production began 2021, so early units sit at the five-year boundary — verify the unit's production date before sourcing.",
      "source": "Data sub-site models.json (export intelligence) + Saudi age rule (importrules.json)",
      "source_url": null,
      "source_type": "regulatory",
      "confidence": "medium",
      "checked_date": "2026-10-07",
      "needs_review": true
    },
    "powertrain_fit": {
      "status": "noted",
      "summary": "Battery-electric (EV) — Saudi Arabia records no EV-specific import duty (5% standard + 15% VAT), so the increment is charging compatibility plus official GCC market entry of a new premium EV brand.",
      "source": "Data sub-site models.json (export intelligence)",
      "source_url": "https://data.chinausedautohub.com/models/",
      "source_type": "database",
      "confidence": "medium",
      "checked_date": "2026-10-07",
      "needs_review": true
    },
    "ev_charging_compat": {
      "standard": "GB/T",
      "destination_standard": "CCS2 / Type 2 (Mennekes)",
      "connector": "GB/T AC / GB/T DC (vehicle inlet)",
      "voltage": null,
      "frequency": null,
      "needs_adapter": true,
      "notes": "China-market GB/T inlet vs Saudi Arabia CCS2 / Type 2 network — adapter required; regional export units may carry a CCS2 inlet (confirm the sourced unit).",
      "source": "Vehicle: GB/T charging standard (Wikipedia); Destination: IEC 62196-2 Type 2 connector (Wikipedia)",
      "source_url": "https://en.wikipedia.org/wiki/GB/T_charging_standard",
      "source_type": "reputable_media",
      "confidence": "medium",
      "checked_date": "2026-10-07",
      "needs_review": true
    },
    "import_eligibility": {
      "status": "conformity_required",
      "requirements": ["SASO conformity", "SABER registration"],
      "notes": "SASO conformity and SABER registration required before shipment.",
      "source": "market sub-site importrules.json (SABER/SASO)",
      "source_url": null,
      "source_type": "regulatory",
      "confidence": "medium",
      "checked_date": "2026-10-07",
      "needs_review": true
    },
    "duty_anchors": {
      "standard_duty_taxrule_id": "sa-duty",
      "ev_duty_taxrule_id": null,
      "vat_taxrule_id": "sa-vat",
      "ev_duty_relief": false,
      "notes": "No EV-specific duty — 5% standard import duty + 15% VAT. Referenced from taxrules.json.",
      "source": "market sub-site taxrules.json (referenced, not copied)",
      "source_url": "https://zatca.gov.sa",
      "source_type": "government",
      "confidence": "low",
      "checked_date": "2026-10-07",
      "needs_review": true
    },
    "shipping_route": {
      "route_ids": ["cn-qingdao-to-sa-dammam", "cn-shanghai-to-sa-jeddah"],
      "notes": "Sea freight to Dammam or Jeddah (RoRo).",
      "source": "market sub-site routes.json (referenced, not copied)",
      "source_url": null,
      "source_type": "industry",
      "confidence": "low",
      "checked_date": "2026-10-07",
      "needs_review": true
    },
    "model_considerations": {
      "status": "noted",
      "summary": "Arcfox Alpha S is BAIC's premium battery-electric sedan; Arcfox's overseas operator BAIC INTL launched a Saudi Arabia brand refresh in Jeddah (August 2026).",
      "source": "Data sub-site models.json (export intelligence)",
      "source_url": "https://www.baicglobal.com/news/newsRelease/detail/305",
      "source_type": "manufacturer",
      "confidence": "medium",
      "checked_date": "2026-10-07",
      "needs_review": true
    },
    "source": "Data sub-site models.json + market sub-site taxrules/importrules (joined)",
    "source_url": "https://data.chinausedautohub.com/models/",
    "source_type": "database",
    "confidence": "medium",
    "checked_date": "2026-10-07"
  }
];

const skips = [
  { "vehicle_id": "arcfox-alpha-t", "country_id": "uae", "reason": "EV × LHD — Arcfox brand official-GCC-entry increment already represented by arcfox-alpha-s × uae/saudi; mechanical brand cross-product (avoid)." },
  { "vehicle_id": "arcfox-alpha-t", "country_id": "saudi-arabia", "reason": "EV × LHD — Arcfox brand official-GCC-entry increment already represented by arcfox-alpha-s; mechanical brand cross-product (avoid)." },
  { "vehicle_id": "im-motors-l6", "country_id": "uae", "reason": "EV × LHD — no RHD, no documented official GCC entry; charging-only delta already represented by byd-atto-3 × uae (avoid)." },
  { "vehicle_id": "im-motors-l6", "country_id": "kazakhstan", "reason": "EV × LHD — EV-duty delta already represented by byd-atto-3 × kazakhstan; no distinct increment (avoid)." },
  { "vehicle_id": "im-motors-l6", "country_id": "uzbekistan", "reason": "EV × LHD — EV-duty delta already represented by byd-seal × uzbekistan; no distinct increment (avoid)." },
  { "vehicle_id": "lynk-co-03", "country_id": "kenya", "reason": "ICE × RHD — Lynk & Co 03 is LHD-only (RHD ruled out until 2028); drive-side mismatch already represented by chery-tiggo-8 × kenya (avoid)." },
  { "vehicle_id": "kia-sportage", "country_id": "kenya", "reason": "ICE × RHD — China-built Sportage is LHD; Yancheng RHD production is EV5-specific, not Sportage. Drive-side mismatch already represented by chery-tiggo-8 × kenya (avoid)." },
  { "vehicle_id": "kia-k5", "country_id": "kenya", "reason": "ICE × RHD — China-built K5 is LHD-only; no RHD production documented. Drive-side mismatch already represented by chery-tiggo-8 × kenya (avoid)." },
  { "vehicle_id": "ford-territory", "country_id": "kenya", "reason": "ICE × RHD — China-built Territory is LHD-only (RHD China-built not documented); drive-side mismatch already represented by chery-tiggo-8 × kenya (avoid)." },
  { "vehicle_id": "volkswagen-tiguan-l", "country_id": "uzbekistan", "reason": "ICE × LHD — SAIC-VW official Uzbekistan export is a model-level fact, not a vehicle×market increment; no EV relief, no age conflict, LHD match (avoid)." },
  { "vehicle_id": "buick-envision", "country_id": "uae", "reason": "ICE × LHD — Buick Envision exports to the US, not to platform markets; ICE LHD no age/EV/RHD increment (avoid)." },
  { "vehicle_id": "ford-mondeo", "country_id": "uae", "reason": "ICE × LHD, no age conflict, no EV relief — pure compatible pair, no independent increment (avoid)." }
];

let added = 0;
for (const r of relations) {
  if (vm.relations.find(x => x.vehicle_id === r.vehicle_id && x.country_id === r.country_id)) continue;
  vm.relations.push(r);
  added++;
}
let skipped = 0;
for (const s of skips) {
  if (vm.skipped.find(x => x.vehicle_id === s.vehicle_id && x.country_id === s.country_id)) continue;
  if (vm.relations.find(x => x.vehicle_id === s.vehicle_id && x.country_id === s.country_id)) continue;
  vm.skipped.push(s);
  skipped++;
}

vm.meta.batch = "P3.8 (phase2/49 - Vehicle x Market Intelligence, batch 11 — vehicle-market-b11)";
vm.meta.updated = "2026-10-07";

fs.writeFileSync(vmPath, JSON.stringify(vm, null, 2) + "\n");
console.log(`added ${added} relations, ${skipped} skips`);
console.log(`relations total: ${vm.relations.length}, skipped total: ${vm.skipped.length}`);
