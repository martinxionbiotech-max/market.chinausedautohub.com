// MARKET 站编辑部内容：每国概述 / 注意事项 / FAQ / 代表车型 / EV / SUV 摘要
export const regionMeta: Record<string, { label: string; label_zh: string }> = {
  "middle-east": { label: "Middle East", label_zh: "中东" },
  africa: { label: "Africa", label_zh: "非洲" },
  "central-asia": { label: "Central Asia", label_zh: "中亚" },
  "south-asia": { label: "South Asia", label_zh: "南亚" },
  "latin-america": { label: "Latin America", label_zh: "拉丁美洲" },
};

export interface CountryContent {
  overview: string;
  considerations: string[];
  faq: { q: string; a: string }[];
  popularModelIds: string[];
  evNote: string;
  suvNote?: string;
}

export const countryContent: Record<string, CountryContent> = {
  uae: {
    overview:
      "The UAE is the Gulf's largest used-car re-export hub, with high demand for premium SUVs, luxury sedans and new-energy vehicles. It is a left-hand-drive market operating under GCC specification, with Jebel Ali port as the main entry point for vehicles transiting onward across the region.",
    considerations: [
      "GCC specification conformity is the key entry requirement; non-GCC vehicles may need modification before registration.",
      "High ambient heat favors vehicles with strong air-conditioning and cooling systems.",
      "As a re-export hub, many imported vehicles are destined onward to other GCC or African markets.",
    ],
    faq: [
      { q: "Can I import a right-hand-drive vehicle into the UAE?", a: "Generally no — the UAE registers left-hand-drive vehicles only." },
      { q: "Is there an age limit for used cars?", a: "There is no universal age limit, but vehicles must meet GCC specification." },
      { q: "What duty and VAT apply?", a: "Import duty and VAT are listed in the Import Duties and VAT & Taxes tables on this page. Rates change — verify current figures with official customs before purchase." },
      { q: "Which port handles vehicle imports?", a: "Jebel Ali in Dubai is the main entry port." },
    ],
    popularModelIds: ["li-auto-l7", "byd-han", "nio-es6"],
    evNote:
      "EV adoption is growing quickly in the UAE, supported by public charging (DEWA Green Charger) and toll exemptions in some emirates. Premium and long-range EVs are in particular demand.",
  },
  "saudi-arabia": {
    overview:
      "Saudi Arabia is the Gulf's largest automotive market, with rapid EV adoption and strong demand for SUVs. It is a left-hand-drive market that enforces GCC/SASO standards, with Dammam and Jeddah as the main seaports for vehicle imports.",
    considerations: [
      "Used passenger cars are generally limited to five years of age — confirm before sourcing stock.",
      "SASO conformity and SABER registration are mandatory before shipment.",
      "Dust and heat favor robust cooling and sealed components.",
    ],
    faq: [
      { q: "What is the age limit for imported used cars?", a: "Passenger cars are generally limited to five years of age — verify with ZATCA." },
      { q: "What taxes apply?", a: "Import duty and VAT are listed in the Import Duties and VAT & Taxes tables on this page. Rates change — verify current figures with official customs (ZATCA) before purchase." },
      { q: "Do I need a SABER certificate?", a: "Yes — SASO conformity and SABER registration are required." },
    ],
    popularModelIds: ["geely-monjaro", "changan-cs75-plus", "great-wall-haval-h6"],
    evNote:
      "Saudi Arabia is investing heavily in EV charging and adoption, and SASO maintains EV standards. Long-range premium EVs are entering the market.",
  },
  kenya: {
    overview:
      "Kenya is East Africa's largest used-car import market and a right-hand-drive country with a strict eight-year age rule. Mombasa is the principal port of entry. Demand is concentrated on compact SUVs and economical sedans, with growing EV interest.",
    considerations: [
      "The eight-year age limit is strictly enforced — verify the exact cut-off with KRA/KEBS.",
      "Pre-shipment PVoC inspection is required before export.",
      "EVs benefit from reduced duty and excise relief.",
    ],
    faq: [
      { q: "What is the vehicle age limit?", a: "Used vehicles must not be older than eight years (KS 1515:2000)." },
      { q: "Is Kenya right-hand drive?", a: "Yes — Kenya is a right-hand-drive (RHD) market." },
      { q: "What taxes apply?", a: "Import duty, VAT and excise are listed in the Import Duties and VAT & Taxes tables on this page. Rates change — verify current figures with KRA before purchase." },
      { q: "Which port handles imports?", a: "Mombasa." },
    ],
    popularModelIds: ["byd-song-plus", "chery-tiggo-8", "byd-qin-plus"],
    evNote:
      "Kenya offers reduced duty and excise relief for EVs, and charging networks are expanding in Nairobi. Affordable compact EVs and PHEVs are gaining traction.",
    suvNote:
      "SUVs dominate Kenya's used import market, favored for mixed urban and rough-road use. Compact to mid-size SUVs are the strongest sellers.",
  },
  tanzania: {
    overview:
      "Tanzania is a right-hand-drive East African market importing used vehicles mainly through Dar es Salaam. An age limit around eight to ten years applies, and pre-shipment inspection is required. SUVs and light commercial vehicles dominate demand.",
    considerations: [
      "Confirm the current age limit with TRA before sourcing older stock.",
      "PVoC pre-shipment inspection is mandatory.",
      "Dar es Salaam port congestion can add lead time.",
    ],
    faq: [
      { q: "What is the age limit?", a: "Around eight to ten years — verify with the Tanzania Revenue Authority." },
      { q: "Is Tanzania right-hand drive?", a: "Yes — Tanzania is a right-hand-drive (RHD) market." },
      { q: "Which port handles imports?", a: "Dar es Salaam." },
    ],
    popularModelIds: ["chery-tiggo-8", "geely-monjaro", "gac-gs4"],
    evNote:
      "Tanzania has introduced EV incentives including reduced excise. The market is early-stage with limited charging infrastructure.",
  },
  nigeria: {
    overview:
      "Nigeria is West Africa's largest used-car market and a right-hand-drive country. Vehicles enter through Lagos (Apapa and Tin Can Island). Age restrictions apply and have changed in recent years, so rules should be confirmed with Nigeria Customs.",
    considerations: [
      "Vehicle age rules have changed recently — verify current limits.",
      "Lagos ports (Apapa and Tin Can Island) are the main entry points.",
      "SUVs and durable sedans suit local road conditions.",
    ],
    faq: [
      { q: "What is the age limit?", a: "Restrictions apply and have changed recently — verify with Nigeria Customs." },
      { q: "Is Nigeria right-hand drive?", a: "Yes — Nigeria is a right-hand-drive (RHD) market." },
      { q: "Which ports handle imports?", a: "Lagos (Apapa and Tin Can Island)." },
    ],
    popularModelIds: ["chery-tiggo-8", "gac-gs4", "byd-qin-plus"],
    evNote:
      "Nigeria's EV market is early-stage with developing policy and limited charging infrastructure; hybrid and PHEV interest is growing.",
    suvNote:
      "SUVs are in strong demand in Nigeria for durability on varied roads; mid-size SUVs are the most popular import segment.",
  },
  kazakhstan: {
    overview:
      "Kazakhstan is a left-hand-drive Central Asian market that imports vehicles under EAEU rules, with most units arriving by rail from China. Age limits have been adjusted in recent years, and EVs currently enjoy duty relief.",
    considerations: [
      "Most vehicles arrive by rail via Khorgos/Alashankou, not by sea.",
      "EAEU technical certification is required.",
      "EVs have temporary customs-duty and recycling-fee relief.",
    ],
    faq: [
      { q: "Is Kazakhstan right- or left-hand drive?", a: "Left-hand drive (LHD)." },
      { q: "How do cars arrive?", a: "By rail via Khorgos/Alashankou border crossings." },
      { q: "Are there EV incentives?", a: "EVs have had temporary duty and fee relief — confirm current status." },
    ],
    popularModelIds: ["chery-tiggo-8", "geely-monjaro", "great-wall-haval-h6"],
    evNote:
      "Kazakhstan temporarily exempts EVs from customs duty and recycling fee; adoption is rising, particularly for affordable EVs.",
  },
  uzbekistan: {
    overview:
      "Uzbekistan is a left-hand-drive Central Asian market with strict import controls, including certification and recycling fees. Most vehicles arrive by rail from China. EVs benefit from import-duty and excise exemptions.",
    considerations: [
      "Import controls are strict — confirm current requirements with customs.",
      "Rail transit via Khorgos/Alashankou is the main route.",
      "EVs are exempt from import duty and excise (confirm current status).",
    ],
    faq: [
      { q: "Is Uzbekistan right- or left-hand drive?", a: "Left-hand drive (LHD)." },
      { q: "How strict are import rules?", a: "Import controls are strict — verify with customs before trading." },
      { q: "Are there EV incentives?", a: "EVs are exempt from import duty and excise — confirm current rates." },
    ],
    popularModelIds: ["byd-song-plus", "chery-tiggo-8", "geely-monjaro"],
    evNote:
      "Uzbekistan exempts EVs from import duty and excise tax; local assembly and adoption are growing under government incentives.",
  },
  "south-africa": {
    overview:
      "South Africa is the continent's most developed automotive market and a right-hand-drive country that protects its local manufacturing base. Used-vehicle imports are tightly restricted to defined permit categories (returning residents, immigrants, special-purpose vehicles), and Durban is the principal RoRo entry port.",
    considerations: [
      "Used imports require an ITAC permit plus an NRCS Letter of Authority and Interpol clearance — eligibility is narrow.",
      "No fixed age limit, but permit categories are restrictive — confirm ITAC eligibility before sourcing stock.",
      "EVs face the same 25% passenger-vehicle duty with no EV-specific relief (and a 15% VAT).",
    ],
    faq: [
      { q: "Can I import a used car into South Africa?", a: "Only under defined ITAC permit categories — mainly returning South African nationals and permanent-residence immigrants." },
      { q: "Is South Africa right- or left-hand drive?", a: "Right-hand drive (RHD)." },
      { q: "What duty and VAT apply?", a: "Passenger vehicles attract 25% import duty plus 15% VAT (plus ad valorem excise on high-value units). Verify with SARS." },
      { q: "Which port handles imports?", a: "Durban is the main RoRo port, with Cape Town as an alternative." },
    ],
    popularModelIds: ["great-wall-haval-h6", "chery-tiggo-8", "byd-atto-3"],
    evNote:
      "South Africa has no EV-specific import-duty relief; EVs face the same 25% duty (higher than the 18% ICE rate in some classifications). Local EV adoption is growing but the tariff regime does not currently favor imports.",
  },
  egypt: {
    overview:
      "Egypt is a large left-hand-drive North African market with an engine-capacity-based customs regime and a mandatory NAFEZA single-window clearance system. It has introduced strong EV incentives since January 2025, and Alexandria is the principal vehicle entry port.",
    considerations: [
      "Used passenger cars are near-new only (about one year); EVs may be imported up to three years old.",
      "Conventional duty is 30% up to 1600cc and 100% above, plus a development fee and 14% VAT.",
      "BEVs enjoy 0% customs duty with a FOB deduction up to 50% — one EV per individual every five years.",
    ],
    faq: [
      { q: "Is Egypt right- or left-hand drive?", a: "Left-hand drive (LHD) — RHD vehicles cannot be registered." },
      { q: "What is the age limit?", a: "Used cars are near-new (about one year); EVs up to three years old under the 2025 policy." },
      { q: "What tax applies to EVs?", a: "BEVs (HS 8703.80) pay 0% customs duty plus 14% VAT." },
      { q: "Which port handles imports?", a: "Alexandria, with Port Said as an alternative." },
    ],
    popularModelIds: ["byd-atto-3", "byd-seal", "byd-dolphin"],
    evNote:
      "Egypt exempts pure-electric vehicles from customs duty (0%) from January 2025, with a progressive FOB-value deduction up to 50%; individuals may import one EV every five years. NAFEZA single-window clearance is mandatory.",
  },
  jordan: {
    overview:
      "Jordan is a left-hand-drive Middle East market and a regional re-export hub. Its June 2025 tax reform unified EV special tax at 27% (versus 51% petrol and 39% hybrid) and tightened import rules — banning salvage vehicles and capping EV age at three years. Aqaba is the main port.",
    considerations: [
      "EVs older than three years (including clearance year) may no longer be imported (from 1 Nov 2025).",
      "Salvage, fire- and flood-damaged vehicles are banned.",
      "Special tax is 27% for EVs, 39% for hybrids, 51% for petrol — plus 16% GST.",
    ],
    faq: [
      { q: "Is Jordan right- or left-hand drive?", a: "Left-hand drive (LHD)." },
      { q: "What is the EV age cap?", a: "Three years, including the year of customs clearance." },
      { q: "What tax applies to EVs?", a: "Special tax is unified at 27% for EVs, plus 16% GST." },
      { q: "Which port handles imports?", a: "Aqaba." },
    ],
    popularModelIds: ["byd-atto-3", "byd-han", "byd-seal"],
    evNote:
      "Jordan's 2025 reform cut EV special tax to a unified 27% and introduced a three-year EV age cap; it remains a regional EV re-export hub. Verify current rules with Jordan Customs before trading.",
  },
  pakistan: {
    overview:
      "Pakistan is a large right-hand-drive South Asian market. Used vehicles enter under the Personal Baggage, Gift and Transfer of Residence schemes (cars up to three years old), with a fixed US-dollar duty schedule by engine capacity. Karachi (Port Qasim) is the main entry port.",
    considerations: [
      "Used cars over three years old are generally ineligible under personal schemes.",
      "Duty is a fixed US-dollar schedule by engine size — not a simple percentage.",
      "EVs up to US$50,000 attract 25% duty; hybrids up to 1800cc get 50% duty exemption.",
    ],
    faq: [
      { q: "Is Pakistan right- or left-hand drive?", a: "Right-hand drive (RHD)." },
      { q: "What is the age limit?", a: "Cars up to three years old under personal schemes (commercial age cap removed July 2026)." },
      { q: "How is duty calculated?", a: "A fixed US-dollar schedule by engine capacity under the personal schemes." },
      { q: "Which port handles imports?", a: "Karachi (Port Qasim)." },
    ],
    popularModelIds: ["byd-song-plus", "byd-atto-3", "chery-tiggo-8"],
    evNote:
      "Pakistan applies concessional EV duty — 25% for 4-wheelers up to US$50,000, with hybrid exemptions of 50% (≤1800cc) and 25% (1800–2500cc) — under the Electric Vehicle Policy 2020–2025.",
  },
  bangladesh: {
    overview:
      "Bangladesh is a right-hand-drive South Asian market that imports reconditioned (used) vehicles under a compounding duty cascade — customs duty, supplementary duty, VAT, advance income tax and regulatory duty that can multiply CIF value several times. Chittagong is the main port.",
    considerations: [
      "Duty is a compounding cascade, not a single rate — budget 3–4× CIF for reconditioned cars.",
      "Pre-export inspection and standard export documents are required.",
      "PHEV/EV duty reductions are under discussion — policy is evolving.",
    ],
    faq: [
      { q: "Is Bangladesh right- or left-hand drive?", a: "Right-hand drive (RHD)." },
      { q: "How high is the duty?", a: "A compounding cascade (CD + SD + VAT + AIT + RD) that can multiply CIF several times — verify with NBR." },
      { q: "Are there EV incentives?", a: "PHEV/EV duty cuts have been proposed; policy is evolving — verify with NBR." },
      { q: "Which port handles imports?", a: "Chittagong." },
    ],
    popularModelIds: ["byd-song-plus", "toyota-rav4", "honda-cr-v"],
    evNote:
      "Bangladesh has proposed import-duty cuts on plug-in hybrids as part of its energy-efficiency strategy; EV/PHEV duty treatment is evolving and should be verified with the NBR.",
  },
  chile: {
    overview:
      "Chile is a left-hand-drive Latin American market and one of the region's most flexible for used-vehicle import — it has no age limit and a flat 6% ad valorem duty plus 19% VAT. Chinese brands (BYD, Chery, Geely, MG) have strong local presence, and Iquique's free-trade zone doubles as a regional re-export hub.",
    considerations: [
      "No import age limit — model-year flexibility is a key advantage.",
      "Flat 6% duty + 19% VAT (IVA); a RUT tax number is required.",
      "Iquique ZOFRI free-trade zone supports re-export to Bolivia and northern Chile.",
    ],
    faq: [
      { q: "Is Chile right- or left-hand drive?", a: "Left-hand drive (LHD)." },
      { q: "Is there an age limit?", a: "No — Chile has no import age limit for used vehicles." },
      { q: "What duty and VAT apply?", a: "6% ad valorem duty plus 19% VAT (IVA)." },
      { q: "Which port handles imports?", a: "San Antonio, with the Iquique free-trade zone as a clearance and re-export option." },
    ],
    popularModelIds: ["byd-atto-3", "mg-4", "chery-tiggo-8"],
    evNote:
      "Chile applies the same flat 6% duty to EVs (no EV-specific relief) but has one of Latin America's strongest Chinese-EV markets; no age limit makes it attractive for recent low-mileage EV stock.",
  },
};
