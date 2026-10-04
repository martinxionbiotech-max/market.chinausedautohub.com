// MARKET 站编辑部内容：每国概述 / 注意事项 / FAQ / 代表车型 / EV / SUV 摘要
export const regionMeta: Record<string, { label: string; label_zh: string }> = {
  "middle-east": { label: "Middle East", label_zh: "中东" },
  africa: { label: "Africa", label_zh: "非洲" },
  "central-asia": { label: "Central Asia", label_zh: "中亚" },
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
      { q: "What duty and VAT apply?", a: "A 5% import duty and 5% VAT are the headline rates — verify with official customs." },
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
      { q: "What taxes apply?", a: "A 5% import duty and 15% VAT are the headline rates — verify with official customs." },
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
      { q: "What taxes apply?", a: "A 25% import duty, 16% VAT plus excise — verify with KRA." },
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
};
