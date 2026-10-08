// MARKET 站编辑部内容：每国概述 / 注意事项 / FAQ / 代表车型 / EV / SUV 摘要
export const regionMeta: Record<string, { label: string; label_zh: string }> = {
  "middle-east": { label: "Middle East", label_zh: "中东" },
  africa: { label: "Africa", label_zh: "非洲" },
  "central-asia": { label: "Central Asia", label_zh: "中亚" },
  "south-asia": { label: "South Asia", label_zh: "南亚" },
  "latin-america": { label: "Latin America", label_zh: "拉丁美洲" },
  caribbean: { label: "Caribbean", label_zh: "加勒比" },
  "southeast-asia": { label: "Southeast Asia", label_zh: "东南亚" },
  "north-america": { label: "North America", label_zh: "北美" },
  europe: { label: "Europe", label_zh: "欧洲" },
  oceania: { label: "Oceania", label_zh: "大洋洲" },
};

export interface CountryContent {
  overview: string;
  considerations: string[];
  faq: { q: string; a: string }[];
  popularModelIds: string[];
  evNote: string;
  suvNote?: string;
  commonBrands?: string[];
  brandsSource?: string;
  recommendSummary?: string;
  recommendedCharacteristics?: string[];
  marketRisks?: string[];
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
    commonBrands: ["byd", "geely", "changan", "chery", "mg", "gac", "haval", "jetour", "hongqi", "baic"],
    brandsSource:
      "Chinese brands are distributed in the UAE by established local dealers (e.g. BYD via Al-Futtaim, Geely via AGMC); MG, Changan and Chery have strong Gulf presence. Confirm current distributor line-ups locally.",
    recommendSummary:
      "LHD, GCC-spec; no universal age limit; premium SUVs, luxury sedans and long-range EVs.",
    recommendedCharacteristics: [
      "Left-hand-drive (LHD) units with GCC (Gulf Cooperation Council) specification to avoid modification before registration.",
      "No universal age limit, but newer, low-mileage units clear inspection and registration more easily.",
      "Premium SUVs, luxury sedans and long-range EVs with strong air-conditioning for extreme heat.",
      "Chinese premium and new-energy brands (BYD, Geely, Changan, Hongqi) are well accepted.",
    ],
    marketRisks: [
      "Non-GCC-specification vehicles may require modification before registration — confirm spec at source.",
      "The UAE is a re-export hub; demand can shift with regional GCC and African market conditions.",
      "Extreme ambient heat stresses cooling and battery systems — favour vehicles with robust thermal management.",
    ],
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
    commonBrands: ["geely", "changan", "chery", "mg", "haval", "jetour", "byd", "hongqi", "baic"],
    brandsSource:
      "Geely, Changan, Chery and MG have strong Saudi sales; BYD, Haval, Jetour and Hongqi are expanding. Reported in Saudi automotive media (2023–2025). Confirm current distributor line-ups locally.",
    recommendSummary:
      "LHD, SASO/SABER conformity; passenger cars ≤5 years; SUVs dominate.",
    recommendedCharacteristics: [
      "Left-hand-drive (LHD) units with SASO conformity and SABER registration completed before shipment.",
      "Passenger cars within five years of age — source recent, low-mileage stock.",
      "SUVs dominate demand; robust cooling and sealed components suit dust and heat.",
      "Chinese SUVs (Geely, Changan, Haval, Jetour) have strong local acceptance.",
    ],
    marketRisks: [
      "SABER/SASO conformity is mandatory and strict — factor certification time and cost before shipping.",
      "The five-year passenger-car age limit is a hard filter; confirm the exact cut-off with ZATCA.",
      "Dust and extreme heat accelerate wear on cooling and sealing components.",
    ],
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
    commonBrands: ["byd", "chery", "geely", "changan", "great-wall", "haval", "jac", "mg", "jetour", "dongfeng"],
    brandsSource:
      "Chinese-brand market presence in Kenya reported in automotive trade media (2023–2025); Chery and BYD have established local distribution/assembly. Confirm current distributor line-ups locally.",
    recommendSummary:
      "RHD units within 8 years; compact–mid SUVs and economical sedans; EVs benefit from duty relief.",
    recommendedCharacteristics: [
      "Right-hand-drive (RHD) units only — most Chinese brands produce RHD export versions for East Africa.",
      "Model year within eight years of import (2026 → roughly 2018 and newer) to clear the age rule.",
      "Compact to mid-size SUVs and economical sedans with durable, simple drivetrains for mixed roads.",
      "EVs and PHEVs benefit from reduced import duty and excise relief — recent low-mileage EVs are cost-competitive.",
    ],
    marketRisks: [
      "The eight-year age limit is strictly enforced; overage units are rejected at PVoC or port.",
      "Pre-shipment PVoC (KEBS) is mandatory and strict — factor inspection lead time and rejection risk.",
      "Kenyan shilling (KES) depreciation and EAC Common External Tariff changes can shift landed cost — verify rates before quoting.",
    ],
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
    commonBrands: ["chery", "byd", "geely", "changan", "great-wall", "jac", "dongfeng", "mg"],
    brandsSource:
      "Chery, BYD, Geely, Changan and GWM/JAC have established distribution in Tanzania. Reported in East African automotive media (2023–2025). Confirm current distributor line-ups locally.",
    recommendSummary:
      "RHD units; age limit ~8–10 years (verify); SUVs and light commercial vehicles.",
    recommendedCharacteristics: [
      "Right-hand-drive (RHD) units only.",
      "Within roughly eight to ten years of age — verify the current limit with TRA before sourcing.",
      "SUVs and light commercial vehicles with durable, simple drivetrains for rough roads.",
      "A PVoC pre-shipment inspection certificate is required before export.",
    ],
    marketRisks: [
      "Dar es Salaam port congestion can add significant lead time — plan for delays.",
      "The age limit has varied (sources cite 8–10 years) — confirm the current cut-off with TRA.",
      "PVoC (TBS) inspection is mandatory — factor inspection lead time and rejection risk.",
    ],
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
    commonBrands: ["chery", "gac", "geely", "byd", "changan", "great-wall", "haval", "jac", "jetour"],
    brandsSource:
      "Chery, GAC, Geely, Changan and Jetour have established Nigerian distribution (GAC and Jetour announced local assembly/partnerships). Reported in Nigerian automotive media (2023–2025). Confirm current distributor line-ups locally.",
    recommendSummary:
      "RHD units; confirm current age limit; mid-size SUVs and durable sedans.",
    recommendedCharacteristics: [
      "Right-hand-drive (RHD) units only.",
      "Confirm the current age limit — rules changed recently — and source recent stock.",
      "Mid-size SUVs and durable sedans with robust suspension for varied roads.",
      "SONCAP pre-shipment inspection is required before export.",
    ],
    marketRisks: [
      "Nigerian naira (NGN) exchange-rate volatility materially shifts landed cost — re-quote frequently.",
      "Vehicle age rules have changed in recent years — confirm the current limit with Nigeria Customs.",
      "Lagos port congestion (Apapa and Tin Can Island) adds lead time and handling cost.",
    ],
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
    commonBrands: ["chery", "geely", "changan", "byd", "jetour", "gac", "haval", "tank", "deepal", "zeekr"],
    brandsSource:
      "Chery, Geely, Changan and Jetour are locally assembled by Allur Group and have strong Kazakh sales; BYD and other Chinese brands are expanding. Reported in Kazakh/Central Asian automotive media (2023–2025). Confirm current distributor line-ups locally.",
    recommendSummary:
      "LHD, EAEU certification; most units arrive by rail; EVs enjoy duty relief.",
    recommendedCharacteristics: [
      "Left-hand-drive (LHD) units with EAEU technical certification (OTTC).",
      "Confirm the current age limit — it has been adjusted in recent years.",
      "SUVs and crossovers dominate; most units arrive by rail via Khorgos/Alashankou.",
      "EVs benefit from temporary customs-duty and recycling-fee relief.",
    ],
    marketRisks: [
      "EAEU technical certification (OTTC) is required and adds time and cost.",
      "The EV duty and recycling-fee exemption is temporary — confirm current status before quoting.",
      "Rail transit via Khorgos/Alashankou is the main route; schedule and clearance vary.",
    ],
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
    commonBrands: ["byd", "chery", "changan", "geely", "jetour", "haval", "deepal", "denza"],
    brandsSource:
      "BYD operates a local assembly plant in Jizzakh (opened 2024); Chery, Changan, Geely and Jetour also have established distribution. Reported in Uzbek/Central Asian automotive media (2024–2025). Confirm current distributor line-ups locally.",
    recommendSummary:
      "LHD, strict import controls; EVs exempt from duty and excise.",
    recommendedCharacteristics: [
      "Left-hand-drive (LHD) units; certification and recycling fees apply.",
      "Strict import controls — confirm current requirements before sourcing.",
      "EVs are exempt from import duty and excise — recent Chinese EVs are the standout category.",
      "Compact to mid-size SUVs and economical sedans; rail transit via Khorgos/Alashankou.",
    ],
    marketRisks: [
      "Import controls are strict — certification and recycling fees add cost and delay.",
      "Local assembly (e.g. BYD Jizzakh) is protected — confirm used-import eligibility before sourcing.",
      "Uzbek sum (UZS) volatility and the EV exemption's duration should be verified before quoting.",
    ],
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
  thailand: {
    overview:
      "Thailand is Southeast Asia's automotive manufacturing hub and a right-hand-drive market that heavily restricts used-vehicle imports. Its EV 3.5 package (excise cut from 8% to 2% for BEVs up to 7 million baht) makes it a leading destination for Chinese RHD EVs, with Laem Chabang as the main port.",
    considerations: [
      "Used-vehicle imports are tightly restricted — only new cars and limited special categories generally qualify.",
      "EV 3.5 reduces excise to 2% and provides reduced CBU duty for BEVs — confirm current rates with BOI/Thai Customs.",
      "RHD is mandatory — source RHD export units (BYD, Changan Deepal and others produce RHD for Thailand).",
    ],
    faq: [
      { q: "Is Thailand right- or left-hand drive?", a: "Right-hand drive (RHD)." },
      { q: "Can I import a used car into Thailand?", a: "Used-vehicle imports are tightly restricted — verify eligibility with Thai Customs before sourcing." },
      { q: "What EV incentive applies?", a: "EV 3.5 cuts excise from 8% to 2% for BEVs up to 7 million baht, plus reduced CBU duty during 2024–2025." },
      { q: "Which port handles imports?", a: "Laem Chabang." },
    ],
    popularModelIds: ["byd-atto-3", "byd-dolphin", "deepal-s07"],
    evNote:
      "Thailand's EV 3.5 package (excise 8%→2% for BEVs ≤7M baht, plus reduced CBU duty) and its RHD EV production base make it the key RHD EV market for Chinese exporters.",
  },
  vietnam: {
    overview:
      "Vietnam is a left-hand-drive Southeast Asian market with a firm five-year age rule for used passenger cars (Decree 116/2017) and a heavy combustion surcharge. EVs enjoy 0% import duty and a reduced 3% special consumption tax, and Haiphong and Ho Chi Minh City are the main ports.",
    considerations: [
      "The 5-year age rule is a firm cutoff — in 2026 that means roughly model-year 2021 and newer.",
      "Used combustion cars face a fixed mixed-duty surcharge that makes ICE imports expensive; EVs avoid it.",
      "EVs pay 0% duty + 3% SCT during the incentive window into early 2027.",
    ],
    faq: [
      { q: "Is Vietnam right- or left-hand drive?", a: "Left-hand drive (LHD)." },
      { q: "What is the age limit?", a: "Five years from the year of manufacture (Decree 116/2017)." },
      { q: "What EV incentive applies?", a: "0% import duty and a reduced 3% special consumption tax." },
      { q: "Which ports handle imports?", a: "Haiphong and Ho Chi Minh City (Cat Lai)." },
    ],
    popularModelIds: ["byd-atto-3", "byd-song-plus", "byd-seal"],
    evNote:
      "Vietnam's 0% import duty and 3% SCT for EVs create a structural cost advantage over combustion used imports, favoring recent low-mileage Chinese EVs.",
  },
  indonesia: {
    overview:
      "Indonesia is Southeast Asia's largest market but a right-hand-drive country that effectively prohibits used-vehicle imports — only new CBU units may enter under an importer licence. Its CBU EV import-duty exemption (until December 2025) was not continued into 2026, and Tanjung Priok is the main port.",
    considerations: [
      "Used-vehicle imports are effectively prohibited — only new CBU units qualify.",
      "The CBU EV import-duty exemption ended 31 December 2025 and was not continued in 2026.",
      "Local-assembly protection dominates — confirm any import window with Indonesian customs before sourcing.",
    ],
    faq: [
      { q: "Is Indonesia right- or left-hand drive?", a: "Right-hand drive (RHD)." },
      { q: "Can I import a used car into Indonesia?", a: "Effectively no — used-vehicle imports are prohibited; only new CBU units under permit." },
      { q: "What EV incentive applied?", a: "CBU EVs had import-duty exemption until 31 December 2025, not continued in 2026." },
      { q: "Which port handles imports?", a: "Tanjung Priok (Jakarta)." },
    ],
    popularModelIds: ["byd-atto-3", "byd-seal", "mg-4"],
    evNote:
      "Indonesia's CBU EV import-duty exemption ended December 2025; used imports are prohibited, so this is a market to monitor rather than a current used-export destination.",
  },
  mexico: {
    overview:
      "Mexico is a large left-hand-drive North American market where definitive used-vehicle imports generally must be within the last eight model years and meet NOM emissions/safety standards. Lázaro Cárdenas and Veracruz are the main vehicle ports, and IVA is 16%.",
    considerations: [
      "Definitive used imports follow an eight-year model-year rule — verify the exact cut-off with SAT/Aduanas.",
      "NOM emissions and safety conformity applies; border-zone temporary programs have separate rules.",
      "No EV-specific import-duty relief is recorded — standard duty plus 16% IVA applies.",
    ],
    faq: [
      { q: "Is Mexico right- or left-hand drive?", a: "Left-hand drive (LHD)." },
      { q: "What is the age rule?", a: "Definitive used imports generally must be within the last eight model years." },
      { q: "What tax applies?", a: "Used-vehicle duty (15–50% range) plus 16% IVA." },
      { q: "Which ports handle imports?", a: "Lázaro Cárdenas and Veracruz." },
    ],
    popularModelIds: ["chery-tiggo-8", "byd-song-plus", "mg-5"],
    evNote:
      "Mexico has no EV-specific import-duty relief; Chinese EV brands are growing locally but the used-import duty regime is the same for all powertrains.",
  },
  ghana: {
    overview:
      "Ghana is a right-hand-drive West African market that, from 1 October 2026, enforces a 15-year age limit plus GSA-approved pre-shipment inspection. Tema and Takoradi are the main ports, and EV import-duty reduction is developing.",
    considerations: [
      "The 15-year age limit (from 1 Oct 2026) plus overage penalties for 10–15-year vehicles apply.",
      "GSA-approved pre-shipment inspection and a Certificate of Conformity are mandatory.",
      "RHD is mandatory — source RHD export units.",
    ],
    faq: [
      { q: "Is Ghana right- or left-hand drive?", a: "Right-hand drive (RHD)." },
      { q: "What is the age limit?", a: "15 years from 1 October 2026, with overage penalties for 10–15-year vehicles." },
      { q: "What inspection is required?", a: "GSA-approved pre-shipment inspection and a Certificate of Conformity." },
      { q: "Which ports handle imports?", a: "Tema and Takoradi." },
    ],
    popularModelIds: ["byd-atto-3", "mg-4", "chery-tiggo-8"],
    evNote:
      "Ghana's EV import-duty reduction is developing; EV adoption is early-stage with limited charging infrastructure.",
  },
  philippines: {
    overview:
      "The Philippines is a large left-hand-drive Southeast Asian market that generally prohibits used-vehicle imports, with narrow exceptions under the No-Dollar Importation (NDI) program. Its EV zero-import-duty policy (EO 12, extended to 2028 and broadened to hybrids) makes it a leading destination for Chinese new-energy vehicles, with Manila as the main entry port.",
    considerations: [
      "Used-vehicle imports are generally prohibited (EO 156 / EO 877-A); only returning residents, immigrants and diplomats qualify under the NDI program.",
      "EVs and hybrids enjoy 0% import duty under EO 12 (extended to 2028) versus 40% standard duty — the strongest relief delta in the region.",
      "RHD import is a criminal offence (RA 8506) — source LHD units only.",
    ],
    faq: [
      { q: "Is the Philippines right- or left-hand drive?", a: "Left-hand drive (LHD). Importing an RHD vehicle is a criminal offence under RA 8506." },
      { q: "Can I import a used car into the Philippines?", a: "Generally no — used imports are prohibited except under the NDI program for returning residents, immigrants and diplomats." },
      { q: "What EV incentive applies?", a: "EVs and hybrids pay 0% import duty under EO 12, extended to 2028." },
      { q: "Which port handles imports?", a: "Manila (Port of Manila)." },
    ],
    popularModelIds: ["byd-atto-3", "byd-sealion-6", "byd-dolphin"],
    evNote:
      "The Philippines zero-rates import duty on EVs, hybrids and PHEVs under EO 12 (extended to 2028), versus a 40% standard duty. This makes new-energy vehicles the standout import category, though used imports remain restricted.",
  },
  iraq: {
    overview:
      "Iraq is a left-hand-drive Middle Eastern market importing used vehicles primarily through Umm Qasr (with Basrah/Khor Al Zubair as an alternative). An age limit around five years applies, duty varies by category and engine size, and durable SUVs and saloons dominate demand.",
    considerations: [
      "Confirm the exact age limit (sources cite 5 years, some 2 years) with the Umm Qasr agent / Iraqi customs before sourcing stock.",
      "Duty varies by vehicle category, engine size and entry port — quote per exact model and port.",
      "Non-armored vehicles only; salvage, flood- and fire-damaged units are not admitted.",
    ],
    faq: [
      { q: "Is Iraq right- or left-hand drive?", a: "Left-hand drive (LHD)." },
      { q: "What is the age limit?", a: "Around five years (some sources cite two) — verify with Iraqi customs." },
      { q: "How is duty calculated?", a: "Variable by category and engine size, and by entry port — verify with Iraqi customs." },
      { q: "Which port handles imports?", a: "Umm Qasr, with Basrah (Khor Al Zubair) as an alternative." },
    ],
    popularModelIds: ["geely-monjaro", "chery-tiggo-8", "great-wall-haval-h6"],
    evNote:
      "No dedicated EV import-duty relief has been identified for Iraq in the sources reviewed; EVs are treated under the standard variable duty schedule. Confirm EV treatment with Iraqi customs before trading.",
  },
  ethiopia: {
    overview:
      "Ethiopia is a left-hand-drive East African market that, since February 2024, has banned petrol and diesel car imports entirely — only electric vehicles may be imported. The landlocked country clears vehicles through Djibouti, and affordable compact EVs dominate the emerging market.",
    considerations: [
      "EV-only policy (Feb 2024): petrol/diesel imports are banned — only electric vehicles are eligible.",
      "Vehicles transit via the Port of Djibouti (Ethiopia is landlocked).",
      "Reported ~15% EV import duty plus 15% VAT; an age limit around five years applies.",
    ],
    faq: [
      { q: "Is Ethiopia right- or left-hand drive?", a: "Left-hand drive (LHD)." },
      { q: "Can I import a petrol or diesel car?", a: "No — Ethiopia banned petrol/diesel car imports in February 2024; only EVs are eligible." },
      { q: "What tax applies to EVs?", a: "Reported around 15% import duty plus 15% VAT — verify with Ethiopian customs." },
      { q: "Which port handles imports?", a: "Djibouti (transit for landlocked Ethiopia)." },
    ],
    popularModelIds: ["byd-atto-3", "wuling-bingo", "byd-dolphin"],
    evNote:
      "Ethiopia's EV-only import policy (petrol/diesel banned since Feb 2024) makes it a uniquely EV-focused market; affordable compact EVs are the strongest fit, with combustion alternatives excluded entirely.",
  },
  colombia: {
    overview:
      "Colombia is a left-hand-drive Latin American market that effectively prohibits used-vehicle imports — only brand-new (current-year, 0 km) vehicles may be permanently imported, with narrow diplomatic and classic-car exceptions. It imposes heavy ICE taxes (~64–70% combined) but strong EV relief, with Cartagena and Buenaventura as the main ports.",
    considerations: [
      "Used-vehicle imports are prohibited for non-diplomats — only new/current-year vehicles qualify.",
      "ICE taxes run ~35% duty + 19% VAT + 8–16% consumption tax (~64–70% combined); EVs reported ~5–7% combined.",
      "The EV incentive applies to new units, not used imports.",
    ],
    faq: [
      { q: "Is Colombia right- or left-hand drive?", a: "Left-hand drive (LHD)." },
      { q: "Can I import a used car into Colombia?", a: "Generally no — permanent import is limited to new/current-year vehicles, with diplomatic and classic-car exceptions." },
      { q: "What taxes apply?", a: "ICE: ~35% duty + 19% VAT + 8–16% consumption tax; EVs get strong relief (~5–7% combined)." },
      { q: "Which port handles imports?", a: "Cartagena, with Buenaventura as a Pacific alternative." },
    ],
    popularModelIds: ["byd-atto-3", "chery-tiggo-8", "mg-4"],
    evNote:
      "Colombia taxes combustion vehicles at ~64–70% of CIF but applies strong EV relief (~5–7% combined). The incentive favors new EV units — used-vehicle import remains prohibited.",
  },
  morocco: {
    overview:
      "Morocco is a left-hand-drive North African market that permits used-vehicle imports under two hard filters: the vehicle must be less than five years old and meet the Euro 6 emissions standard. Casablanca and Tanger Med are the main ports, with a ~17.5% customs duty plus 20% VAT.",
    considerations: [
      "Five-year age limit plus Euro 6 emissions conformity are the hard filters.",
      "~17.5% import duty plus 20% VAT (rate varies by engine size and origin).",
      "No EV-specific import-duty relief has been identified — EVs follow the standard schedule.",
    ],
    faq: [
      { q: "Is Morocco right- or left-hand drive?", a: "Left-hand drive (LHD)." },
      { q: "What is the age limit?", a: "Less than five years old, plus Euro 6 emissions conformity." },
      { q: "What duty and VAT apply?", a: "~17.5% import duty plus 20% VAT — verify with ADII." },
      { q: "Which port handles imports?", a: "Casablanca, with Tanger Med as an alternative." },
    ],
    popularModelIds: ["geely-monjaro", "chery-tiggo-8", "byd-atto-3"],
    evNote:
      "Morocco has not been found to offer EV-specific import-duty relief in the sources reviewed; EVs follow the same ~17.5% duty plus 20% VAT as combustion vehicles.",
  },
  "sri-lanka": {
    overview:
      "Sri Lanka is a right-hand-drive South Asian market that reopened vehicle imports on 1 February 2025 after a multi-year suspension. It applies a layered tax stack — base duty plus a 50% surcharge, excise (per kW for EVs), VAT and SSCL — with Colombo as the main port.",
    considerations: [
      "Vehicle imports reopened 1 February 2025 under the Imports & Exports (Control) Regulations No. 01 of 2025.",
      "RHD is mandatory — source RHD export units.",
      "Layered taxes: 20% base duty + 50% surcharge + excise + 18% VAT + 2.5% SSCL.",
    ],
    faq: [
      { q: "Is Sri Lanka right- or left-hand drive?", a: "Right-hand drive (RHD)." },
      { q: "Can I import a used car now?", a: "Yes — imports reopened 1 February 2025 after a multi-year suspension." },
      { q: "What taxes apply?", a: "20% base duty + 50% surcharge + excise (per kW for EVs) + 18% VAT + 2.5% SSCL." },
      { q: "Which port handles imports?", a: "Colombo." },
    ],
    popularModelIds: ["byd-atto-3", "byd-dolphin", "geely-coolray"],
    evNote:
      "Sri Lanka levies excise on EVs per motor kilowatt (rather than per cc) under the February 2025 regime, a distinct EV treatment from combustion vehicles.",
  },
  peru: {
    overview:
      "Peru is a left-hand-drive Latin American market with a five-year age limit for used vehicles (two years for diesel) and a layered tax stack of ad valorem duty, selective consumption tax and 17% IGV plus 2% IPM. Callao is the main port.",
    considerations: [
      "The 5-year age rule (2 years for diesel) is strictly applied by SUNAT.",
      "Taxes layer as ad valorem + ISC + IGV/IPM — budget the full stack.",
      "No EV-specific import-duty relief is recorded.",
    ],
    faq: [
      { q: "Is Peru right- or left-hand drive?", a: "Left-hand drive (LHD)." },
      { q: "What is the age limit?", a: "Five years for petrol vehicles, two years for diesel." },
      { q: "What tax applies?", a: "Ad valorem duty + selective consumption tax + 17% IGV plus 2% IPM." },
      { q: "Which port handles imports?", a: "Callao." },
    ],
    popularModelIds: ["chery-tiggo-8", "byd-atto-3", "mg-4"],
    evNote:
      "Peru applies the same duty/IGV stack to EVs (no EV-specific relief), but recent Chinese EVs have growing local presence.",
  },
  turkey: {
    overview:
      "Turkey is a large left-hand-drive Eurasian market whose automotive import cost is dominated by a compounding tax stack — 10% customs duty, a Special Consumption Tax (ÖTV/SCT) and 20% VAT. The July 2025 EV SCT reform rebuilt EV taxation into four brackets (25–75%), while Chinese-origin petrol and hybrid vehicles face an additional 50% tariff. Istanbul, Izmir and Mersin are the main entry ports.",
    considerations: [
      "The ÖTV/SCT is the single largest cost lever — an EV in the 25% bracket versus a combustion vehicle at 90–100%+ changes the landed cost dramatically.",
      "Chinese-origin petrol and hybrid vehicles attract an additional 50% tariff; EVs are exempt from that carve-out.",
      "No universal used-vehicle age limit was identified — confirm eligibility with the Turkish Ministry of Trade before sourcing.",
    ],
    faq: [
      { q: "Is Turkey right- or left-hand drive?", a: "Left-hand drive (LHD)." },
      { q: "What taxes apply?", a: "A compounding stack of 10% customs duty, ÖTV (SCT) and 20% VAT — verify current brackets with the Ministry of Trade." },
      { q: "What is the EV SCT rate?", a: "25–75% in four brackets by motor power and pre-tax price (Presidential Decision No. 10115, July 2025)." },
      { q: "Which ports handle imports?", a: "Istanbul (Ambarlı/Haydarpaşa), Izmir and Mersin." },
    ],
    popularModelIds: ["byd-atto-3", "li-auto-l7", "byd-seal"],
    evNote:
      "Turkey's July 2025 EV SCT reform set four brackets (25% / 55% / 65% / 75%) by motor power and pre-tax price, preserving a structural advantage over the 90–100%+ combustion rates. Chinese EVs are exempt from the additional 50% China tariff.",
  },
  malaysia: {
    overview:
      "Malaysia is a right-hand-drive Southeast Asian market that protects local assembly through an Approved Permit (AP) system and a layered duty stack (30% import duty, 60–105% excise, 10% SST). Fully electric cars received temporary import-duty and excise relief until 31 December 2025, making it a leading RHD EV destination. Port Klang is the main entry port.",
    considerations: [
      "The Approved Permit (AP) is the hard gate for used-vehicle imports — verify AP eligibility with MITI.",
      "RHD is mandatory — source RHD export units (BYD, Changan and others produce RHD for Malaysia).",
      "EV duty and excise relief (until 31 Dec 2025) — confirm 2026 status with MITI.",
    ],
    faq: [
      { q: "Is Malaysia right- or left-hand drive?", a: "Right-hand drive (RHD)." },
      { q: "Do I need an Approved Permit?", a: "Yes — an AP from MITI is required for used-vehicle imports, and APs are restricted." },
      { q: "What taxes apply?", a: "30% import duty, 60–105% excise and 10% SST for combustion vehicles — verify with RMCD." },
      { q: "What EV incentive applied?", a: "Temporary EV import-duty and excise relief until 31 December 2025, with a RM100,000 on-road price floor." },
      { q: "Which port handles imports?", a: "Port Klang, with Tanjung Pelepas (Johor) as an alternative." },
    ],
    popularModelIds: ["byd-atto-3", "byd-dolphin", "byd-sealion-6"],
    evNote:
      "Malaysia's temporary EV import-duty and excise relief (until 31 Dec 2025, price floor RM100k) made it a key RHD EV market for Chinese exporters; confirm the 2026 status with MITI.",
  },
  "new-zealand": {
    overview:
      "New Zealand is a right-hand-drive Oceania market and one of the most open used-car import regimes — passenger cars are duty-free with 15% GST, and eligibility is standards-based (emissions and frontal-impact compliance) rather than age-limited. Entry certification, biosecurity clearance and the Clean Car Standard CO₂ charge are the key process points. Auckland, Lyttelton and Wellington are the main ports.",
    considerations: [
      "RHD is mandatory — LHD vehicles are restricted to classics 20+ years or Special Interest Vehicle permits.",
      "No fixed age limit, but emissions (post-2005) and frontal-impact (post-2003) standards must be met.",
      "Duty-free passenger cars + 15% GST; a Clean Car Standard CO₂ charge applies to high-emission imports.",
    ],
    faq: [
      { q: "Is New Zealand right- or left-hand drive?", a: "Right-hand drive (RHD) — LHD is limited to classics 20+ or SIV permits." },
      { q: "Is there an age limit?", a: "No fixed age limit — eligibility is set by emissions and frontal-impact standards." },
      { q: "What duty and tax apply?", a: "0% customs duty on passenger cars plus 15% GST; a Clean Car Standard CO₂ charge may apply." },
      { q: "Which ports handle imports?", a: "Auckland, Lyttelton (Christchurch) and Wellington." },
    ],
    popularModelIds: ["byd-atto-3", "mg-4", "byd-dolphin"],
    evNote:
      "New Zealand is duty-free for passenger cars and zero-tailpipe EVs avoid the Clean Car Standard CO₂ charge, making it an attractive RHD EV destination for recent low-mileage Chinese stock.",
  },
  algeria: {
    overview:
      "Algeria is a left-hand-drive North African market that reopened used-car imports in 2023 under a strict under-3-years rule, with the 2025 Finance Law permitting resale subject to a sliding tax-benefit repayment. Imports face a 15–30% customs duty, internal consumption tax (TIC) and 19% VAT, while EVs receive up to an 80% personal-channel reduction. Algiers is the main entry port.",
    considerations: [
      "The under-3-years rule is the hard age filter — older stock is ineligible.",
      "Safety equipment (ABS, speed limiter, airbags over 1.2L) is mandatory.",
      "EVs receive up to an 80% import-tax reduction on the personal channel.",
    ],
    faq: [
      { q: "Is Algeria right- or left-hand drive?", a: "Left-hand drive (LHD)." },
      { q: "What is the age limit?", a: "Used cars must be less than 3 years old." },
      { q: "What taxes apply?", a: "15% (≤1800cc) or 30% (≥1800cc) customs duty + TIC + 19% VAT — verify with Algerian Customs." },
      { q: "What EV incentive applies?", a: "Up to 80% import-tax reduction on the personal channel." },
      { q: "Which port handles imports?", a: "Algiers (Alger), with Oran as an alternative." },
    ],
    popularModelIds: ["byd-atto-3", "geely-monjaro", "chery-tiggo-8"],
    evNote:
      "Algeria applies up to an 80% import-tax reduction on EVs (personal channel) versus the 15–30% standard duty plus TIC and 19% VAT — a strong relief delta, subject to the under-3-years age rule.",
  },
  qatar: {
    overview:
      "Qatar is a small but high-income left-hand-drive Gulf market that follows GCC specification, with a flat 5% customs duty, no VAT currently in force, and a 5-year age limit on imported vehicles. Hamad Port (Doha) is the main entry point.",
    considerations: [
      "The 5-year age limit is the key filter — source recent stock.",
      "GCC specification conformity and a Qatar ID plus driving licence are required.",
      "A flat 5% customs duty applies with no VAT currently imposed (a 5% GCC-framework VAT is expected in future).",
    ],
    faq: [
      { q: "Is Qatar right- or left-hand drive?", a: "Left-hand drive (LHD)." },
      { q: "What is the age limit?", a: "Vehicles over 5 years old are prohibited from import." },
      { q: "What duty and VAT apply?", a: "5% customs duty; no VAT currently imposed." },
      { q: "Which port handles imports?", a: "Hamad Port (Doha)." },
    ],
    popularModelIds: ["geely-monjaro", "great-wall-haval-h6", "byd-atto-3"],
    evNote:
      "Qatar has no EV-specific import-duty relief recorded; the flat 5% duty applies to all vehicles, with EV adoption driven by infrastructure rather than duty relief.",
  },
  azerbaijan: {
    overview:
      "Azerbaijan is a left-hand-drive Caucasus/Caspian-corridor market with a 10-year age ban (Decree No. 94), an engine-capacity-based duty and excise stack, and 18% VAT. Electric vehicles three years old or newer pay 0% duty and no excise, but 18% VAT from January 2026. Baku (Alat) is the main entry point.",
    considerations: [
      "The 10-year age ban (2016+ in 2026) plus ABS, airbag and Euro-4 requirements are the hard filters.",
      "Excise is engine-cc based (no flat duty); cars older than 7 years pay a higher excise coefficient from Jan 2026.",
      "EVs ≤3 years old get 0% duty and no excise, but 18% VAT from January 2026.",
    ],
    faq: [
      { q: "Is Azerbaijan right- or left-hand drive?", a: "Left-hand drive (LHD)." },
      { q: "What is the age limit?", a: "Cars older than 10 years cannot be imported (Decree No. 94)." },
      { q: "What taxes apply?", a: "Engine-cc based duty + excise + 18% VAT — verify with the State Customs Committee." },
      { q: "What EV incentive applies?", a: "EVs ≤3 years old pay 0% duty and no excise, but 18% VAT from January 2026." },
      { q: "Which port handles imports?", a: "Baku (Alat / Caspian)." },
    ],
    popularModelIds: ["byd-atto-3", "chery-tiggo-8", "geely-monjaro"],
    evNote:
      "Azerbaijan zero-rates customs duty and excise on EVs three years old or newer (18% VAT applies from Jan 2026), a strong incentive versus the engine-cc excise stack for combustion vehicles.",
  },
  australia: {
    overview:
      "Australia is a large, mature right-hand-drive Oceania market that tightly controls used-vehicle imports through the ROVER approval system under the Road Vehicle Standards Act 2018. Passenger vehicles attract 5% customs duty plus 10% GST, with a 33% Luxury Car Tax above a fuel-efficient threshold. Chinese RHD brands (BYD, MG, GWM, Chery) have strong local presence, and Melbourne and Sydney are the main RoRo entry ports.",
    considerations: [
      "Used-vehicle imports are restricted to narrow approval pathways (SEVS, 25-Year Rule, Personal Import Scheme) — confirm ROVER eligibility before sourcing stock.",
      "RHD is mandatory — source RHD export units (most Chinese brands produce RHD for Australia).",
      "No EV-specific duty relief, but EVs qualify for the higher fuel-efficient LCT threshold; 5% duty + 10% GST + LCT apply.",
    ],
    faq: [
      { q: "Is Australia right- or left-hand drive?", a: "Right-hand drive (RHD)." },
      { q: "Can I import a used car into Australia?", a: "Only under narrow approval pathways — SEVS, the 25-Year Rule, or the Personal Import Scheme (12+ months overseas ownership)." },
      { q: "What duty and tax apply?", a: "5% customs duty + 10% GST, plus 33% Luxury Car Tax above the threshold (higher for fuel-efficient vehicles)." },
      { q: "Which ports handle imports?", a: "Melbourne and Sydney (Port Botany), with Brisbane and Fremantle (Perth) as alternatives." },
    ],
    popularModelIds: ["byd-atto-3", "mg-4", "byd-sealion-6"],
    evNote:
      "Australia has no EV-specific import-duty relief, but EVs (and other vehicles ≤7L/100km) benefit from a higher Luxury Car Tax threshold. EV adoption is among the fastest in the region, and Chinese RHD EVs are well established.",
  },
  russia: {
    overview:
      "Russia is a large left-hand-drive market and one of the biggest destinations for Chinese-brand vehicles. Imports face a utilization (recycling) fee that has escalated since 2024, an engine-cc personal-import duty, an engine-power excise and 20% VAT, with EPTS electronic-passport activation. Vladivostok (Far East) and the Manzhouli/Zabaykalsk overland crossing are the main entry points.",
    considerations: [
      "The utilization (recycling) fee escalated from 2024 and 2025 and is a major cost component — verify current amounts with the Federal Customs Service.",
      "Personal-import duty is keyed to engine displacement, not a flat percentage — quote per exact model.",
      "Sanctions risk: Western automakers prohibit Russia exports, the EU bans luxury-car (>1,900cc) and EV/hybrid exports, and banking/payment friction plus compliance scrutiny apply — obtain legal advice before trading.",
    ],
    faq: [
      { q: "Is Russia right- or left-hand drive?", a: "Left-hand drive (LHD)." },
      { q: "What fees apply?", a: "A utilization (recycling) fee, engine-cc personal-import duty, engine-power excise and 20% VAT — verify current amounts with customs." },
      { q: "Are there EV incentives?", a: "No EV-specific duty relief; EVs still pay the utilization fee and VAT." },
      { q: "Which entry points are used?", a: "Vladivostok (sea) and the Manzhouli/Zabaykalsk overland crossing." },
    ],
    popularModelIds: ["li-auto-l7", "geely-monjaro", "chery-tiggo-8"],
    evNote:
      "Russia grants no EV-specific import-duty relief, and EV/hybrid trade is sanctions-sensitive (the EU bans EV/hybrid exports to Russia). Chinese new-energy vehicles nonetheless dominate the market; EREVs and PHEVs are the fastest-growing import segments.",
    suvNote:
      "SUVs and crossovers dominate Russia's market; Chinese EREV/PHEV SUVs (Li Auto L7/L9, Chery, Geely) are the fastest-growing import segment after Western brands exited.",
    commonBrands: ["chery", "haval", "geely", "changan", "jac", "li-auto", "tank", "jetour", "zeekr", "deepal"],
    brandsSource:
      "Chinese brands held roughly 50–57% of Russia's new-car market in 2025 (Autostat via Izvestia / Xinhua); the top groups are Chery Group, Great Wall (Haval), Geely and Changan, with Haval the top-selling Chinese brand in May 2025. Confirm current distributor line-ups locally.",
    recommendSummary:
      "LHD, EAEU certification; utilization fee + engine-cc duty + excise + 20% VAT; SUVs and EREVs dominate.",
    recommendedCharacteristics: [
      "Left-hand-drive (LHD) units with EAEU technical certification (OTTC) and EPTS electronic-passport activation.",
      "SUVs and EREV/PHEV crossovers — the dominant and fastest-growing import segments.",
      "Budget the escalating utilization (recycling) fee plus engine-cc personal-import duty, engine-power excise and 20% VAT.",
      "Obtain sanctions and compliance legal review before trading — banking/payment friction and export-control scrutiny apply.",
    ],
    marketRisks: [
      "Sanctions risk: Western automakers prohibit Russia exports, the EU bans luxury-car (>1,900cc) and EV/hybrid exports, and banking/payment friction plus compliance scrutiny apply.",
      "The utilization (recycling) fee has escalated since 2024 and is a major, variable cost component — re-quote frequently.",
      "Personal-import duty is keyed to engine displacement plus excise and VAT — quote per exact model, not a flat percentage.",
    ],
  },
  georgia: {
    overview:
      "Georgia is a left-hand-drive South Caucasus market with one of the region's lightest customs regimes — a nominal per-cc duty, a per-cc excise with a 6-year age cliff, and 18% VAT. Electric vehicles are exempt from duty and excise, and the Poti/Batumi corridor makes Georgia a re-export hub into Armenia, Azerbaijan and Central Asia.",
    considerations: [
      "The 6-year excise cliff (about 1.5 GEL/cc to 4.5 GEL/cc) materially raises the cost of older vehicles — source recent stock.",
      "EVs are exempt from import duty and excise (18% VAT only) — a strong relief delta.",
      "RHD vehicles face a tripled excise; re-export through Poti/Batumi may skip the tax.",
    ],
    faq: [
      { q: "Is Georgia right- or left-hand drive?", a: "Left-hand drive (LHD); RHD vehicles face a tripled excise." },
      { q: "What is the 6-year rule?", a: "A tax cliff, not a ban — the per-cc excise steps up sharply at 6 years of age." },
      { q: "What EV incentive applies?", a: "EVs are exempt from import duty and excise, paying 18% VAT only." },
      { q: "Which ports handle imports?", a: "Poti and Batumi, with onward re-export to Armenia, Azerbaijan and Central Asia." },
    ],
    popularModelIds: ["byd-atto-3", "geely-monjaro", "chery-tiggo-8"],
    evNote:
      "Georgia exempts EVs from import duty and per-cc excise (18% VAT only), and the Poti/Batumi corridor supports tax-skipping re-export — a distinctive EV + re-export value proposition in the Caucasus.",
  },
  tunisia: {
    overview:
      "Tunisia is a left-hand-drive North African market that permits used-vehicle imports under five years of age and an FCR conformity certificate. Combustion vehicles face high tariffs plus 19% VAT and a consumption tax, while fully electric vehicles under five years enjoy 0% customs duty, 0% VAT and 0% consumption tax — the strongest EV relief in North Africa. Rades (Tunis) is the main port.",
    considerations: [
      "The under-5-years rule is the hard age filter — older stock is ineligible.",
      "EVs under 5 years pay 0% duty + 0% VAT + 0% consumption tax, versus a heavy ICE tariff stack.",
      "An FCR conformity certificate is required for individual imports.",
    ],
    faq: [
      { q: "Is Tunisia right- or left-hand drive?", a: "Left-hand drive (LHD)." },
      { q: "What is the age limit?", a: "Used cars must be under five years old." },
      { q: "What EV incentive applies?", a: "Fully electric vehicles under 5 years pay 0% customs duty, 0% VAT and 0% consumption tax." },
      { q: "Which port handles imports?", a: "Rades (Tunis), with Sfax as an alternative." },
    ],
    popularModelIds: ["byd-atto-3", "geely-monjaro", "chery-tiggo-8"],
    evNote:
      "Tunisia's EV full-exemption (0% duty + 0% VAT + 0% consumption tax for vehicles under 5 years) makes recent Chinese EVs the standout import category, versus a heavy ICE tariff stack plus 19% VAT.",
  },
  oman: {
    overview:
      "Oman is a left-hand-drive Gulf market that follows GCC standard specifications. Oman Customs permits private vehicles under 7 years old, and imports attract a flat 5% customs duty plus 5% VAT. Sohar and Salalah are the main entry ports.",
    considerations: [
      "The 7-year age limit for private vehicles is the key filter — source recent stock.",
      "GCC standard specification is mandatory.",
      "A flat 5% customs duty plus 5% VAT applies, with no EV-specific relief recorded.",
    ],
    faq: [
      { q: "Is Oman right- or left-hand drive?", a: "Left-hand drive (LHD)." },
      { q: "What is the age limit?", a: "Private vehicles under 7 years old." },
      { q: "What duty and VAT apply?", a: "5% customs duty plus 5% VAT." },
      { q: "Which ports handle imports?", a: "Sohar and Salalah." },
    ],
    popularModelIds: ["chery-tiggo-8", "geely-monjaro", "great-wall-haval-h6"],
    evNote:
      "Oman has no EV-specific import-duty relief recorded; the flat 5% duty plus 5% VAT applies to all vehicles. EV adoption is early-stage and driven by charging rollout rather than duty relief.",
    suvNote:
      "SUVs and crossovers dominate Oman's market, where Chinese value-SUV brands (MG, Changan, Chery) have gained share against Japanese incumbents.",
    commonBrands: ["mg", "changan", "chery", "geely", "byd", "haval", "jetour", "gac"],
    brandsSource:
      "MG reached the #3 spot in Oman's Q1 2024 new-car sales (Best Selling Cars Blog); Changan, Chery, Geely and BYD maintain GCC dealer networks. Reported in Omani/GCC automotive media (2023–2025). Confirm current distributor line-ups locally.",
    recommendSummary:
      "LHD, GCC specification; private vehicles under 7 years; 5% duty + 5% VAT; value SUVs and durable crossovers.",
    recommendedCharacteristics: [
      "Left-hand-drive (LHD) units with GCC standard specification (mandatory for registration).",
      "Private vehicles under 7 years old — source recent, low-mileage stock to clear the age rule.",
      "Value SUVs and durable crossovers with strong air-conditioning for extreme Gulf heat.",
      "Chinese value brands (MG, Changan, Chery, Geely) are well accepted; budget the flat 5% duty + 5% VAT.",
    ],
    marketRisks: [
      "The 7-year age limit for private vehicles is a hard filter — overage units are rejected.",
      "GCC standard specification is mandatory; non-conforming units may require modification or assessment.",
      "A small, oil-price-sensitive market — demand for used imports can shift with regional conditions.",
    ],
  },
  bahrain: {
    overview:
      "Bahrain is a small but high-income left-hand-drive Gulf market following GCC specification. It applies 5% customs duty plus 10% VAT (the highest in the GCC) and restricts imported vehicles to about five years of age, with 5–10-year units paying a BHD 1,000 fee. Khalifa Bin Salman Port (Hidd) is the main entry point.",
    considerations: [
      "The ~5-year age limit (5–10-year units pay a BHD 1,000 fee) is the key filter — source recent stock.",
      "GCC specification is mandatory.",
      "5% customs duty + 10% VAT is the highest VAT in the GCC; no EV-specific relief recorded.",
    ],
    faq: [
      { q: "Is Bahrain right- or left-hand drive?", a: "Left-hand drive (LHD)." },
      { q: "What is the age limit?", a: "About five years; 5–10-year units pay an additional BHD 1,000 fee." },
      { q: "What duty and VAT apply?", a: "5% customs duty plus 10% VAT (~15% total)." },
      { q: "Which port handles imports?", a: "Khalifa Bin Salman Port (Hidd)." },
    ],
    popularModelIds: ["geely-monjaro", "chery-tiggo-8", "great-wall-haval-h6"],
    evNote:
      "Bahrain has no EV-specific import-duty relief recorded in the sources reviewed; the 5% duty plus 10% VAT applies, though Bahrain promotes EV adoption through other incentives.",
  },
  kuwait: {
    overview:
      "Kuwait is the final GCC market in the tracked set — a high-income, left-hand-drive Gulf economy that enforces GCC specification and a strict ~5-year age limit on used passenger cars. Its import tax burden is among the lightest in the region: a flat 5% customs duty with no VAT, clearing through Shuwaikh and Shuaiba ports.",
    considerations: [
      "The ~5-year age limit on used passenger cars is stricter than several other Gulf states — source recent stock.",
      "GCC specification conformity is mandatory; non-GCC-spec vehicles may require modification or assessment.",
      "A flat 5% customs duty applies with no VAT — a comparatively light total import tax burden.",
    ],
    faq: [
      { q: "Is Kuwait right- or left-hand drive?", a: "Left-hand drive (LHD)." },
      { q: "What is the age limit?", a: "Used private passenger cars are generally limited to about five years from manufacture." },
      { q: "What duty and VAT apply?", a: "A flat 5% customs duty with no VAT currently applied to vehicle imports." },
      { q: "Which ports handle imports?", a: "Shuwaikh and Shuaiba ports." },
    ],
    popularModelIds: ["geely-monjaro", "chery-tiggo-8", "great-wall-haval-h6"],
    evNote:
      "Kuwait has no EV-specific import-duty relief recorded in the sources reviewed; the flat 5% duty applies to all vehicles, with EV adoption driven by charging infrastructure rather than duty relief.",
    suvNote:
      "SUVs dominate Kuwait's market, and Chinese brands (MG, Changan, Geely) are gaining share in the value-SUV segment against Japanese and Korean incumbents.",
    commonBrands: ["mg", "changan", "geely", "chery", "byd", "haval", "jetour"],
    brandsSource:
      "MG Kuwait (mgkuwait.com) and Changan Kuwait (changankuwait.com) operate official dealer networks; Geely, Chery and BYD also have Gulf presence. Reported in Kuwait/GCC automotive media (2023–2025). Confirm current distributor line-ups locally.",
    recommendSummary:
      "LHD, GCC specification; ~5-year age limit; 5% duty with no VAT — a light total import tax burden.",
    recommendedCharacteristics: [
      "Left-hand-drive (LHD) units with GCC standard specification (mandatory).",
      "Used passenger cars within ~5 years of manufacture — source recent stock to clear the age rule.",
      "SUVs and premium sedans; strong air-conditioning for extreme Gulf heat.",
      "Chinese value brands (MG, Changan, Geely) are well accepted; the 5% duty with no VAT keeps landed cost low.",
    ],
    marketRisks: [
      "The ~5-year age limit on used passenger cars is stricter than several other Gulf states — older stock is ineligible.",
      "GCC specification conformity is mandatory; non-GCC-spec vehicles may require modification or assessment.",
      "An oil-price-sensitive, high-income market where demand can shift with regional economic conditions.",
    ],
  },
  armenia: {
    overview:
      "Armenia is a landlocked, left-hand-drive Caucasus market and an EAEU member that clears non-EAEU vehicles under the EAEU Common Customs Tariff (~15% plus 20% VAT). Its 2026 EV regime — an EAEU duty-free quota plus a VAT exemption to 31 December 2026 — makes it the strongest EV-relief market in the Caucasus, with vehicles transiting via Poti (Georgia) to Yerevan.",
    considerations: [
      "EVs benefit from a 2026 EAEU duty-free quota plus a VAT exemption (to 31 Dec 2026) — a strong relief delta versus ~15% + 20% VAT for combustion.",
      "Armenia is landlocked: the main corridor is sea to Poti (Georgia), then bonded road transit to Yerevan.",
      "Duty base differs by importer status — company imports pay ~15% ad valorem, individuals pay an age/engine EUR-per-cc payment.",
    ],
    faq: [
      { q: "Is Armenia right- or left-hand drive?", a: "Left-hand drive (LHD) — Japanese RHD cars cannot be registered." },
      { q: "What duty and VAT apply?", a: "EAEU Common Customs Tariff (~15% company) plus 20% VAT; individuals pay an age/engine EUR-per-cc payment." },
      { q: "What EV incentive applies?", a: "A 2026 EAEU duty-free quota plus a VAT exemption running to 31 December 2026." },
      { q: "How do vehicles arrive?", a: "Via Poti (Georgia) by sea, then bonded road transit to Yerevan." },
    ],
    popularModelIds: ["byd-atto-3", "li-auto-l7", "byd-han"],
    evNote:
      "Armenia's 2026 EV regime (EAEU 15,000-unit duty-free quota plus a VAT exemption to 31 Dec 2026) is the standout relief delta in the Caucasus; EREV and PHEV classification under the quota should be confirmed with the State Revenue Committee.",
  },
  "dominican-republic": {
    overview:
      "The Dominican Republic is a left-hand-drive Caribbean market with a firm five-year age rule on used passenger cars (Law 04-07) and a layered tax stack of 20% duty, 18% ITBIS and a CO₂-scaled 17% first-plate tax. Haina and Caucedo are the main entry ports, and EV/hybrid reduced-duty incentives are evolving.",
    considerations: [
      "The 5-year age rule (cars) is strictly enforced at inspection — source 2021+ stock.",
      "The layered tax stack (20% duty + 18% ITBIS + 17% first-plate + marbete + 2% transfer) can approach or exceed half the vehicle value.",
      "Salvage, rebuilt and lien-encumbered vehicles are prohibited (Decree 671-02).",
    ],
    faq: [
      { q: "Is the Dominican Republic right- or left-hand drive?", a: "Left-hand drive (LHD)." },
      { q: "What is the age limit?", a: "Five years for passenger cars (fifteen for trucks) under Law 04-07." },
      { q: "What taxes apply?", a: "20% duty + 18% ITBIS + 17% first-plate (CO₂-scaled) + marbete + 2% transfer." },
      { q: "Which ports handle imports?", a: "Haina and Caucedo (south), Puerto Plata (north)." },
    ],
    popularModelIds: ["byd-atto-3", "geely-monjaro", "chery-tiggo-8"],
    evNote:
      "The Dominican Republic has historically granted reduced duties on EVs and hybrids, and its CO₂-scaled first-plate tax favours EVs; the current 2026 incentive scope should be confirmed with the DGA.",
  },
  ecuador: {
    overview:
      "Ecuador is a dollarised, left-hand-drive Andean market that effectively prohibits used-vehicle imports (a ~1-year age rule) while taxing combustion vehicles at ~60–80% of CIF. Its EV incentive (~0.5–2% combined) is the widest EV-vs-ICE tax gap in the tracked set — but it applies to new units only. Guayaquil and Posorja are the main ports.",
    considerations: [
      "Used-vehicle imports are effectively prohibited (1-year rule); only diplomatic and returning-migrant cases are exceptions.",
      "Combustion imports face ~34% duty + 10% excise + 15% VAT (~70% combined), with ICE assessed on the official retail price.",
      "EVs attract ~0.5–2% combined but need Ministry-of-Environment approval — a new-EV market, not a used-EV destination.",
    ],
    faq: [
      { q: "Is Ecuador right- or left-hand drive?", a: "Left-hand drive (LHD)." },
      { q: "What is the age limit?", a: "About one year — used-vehicle imports are effectively prohibited." },
      { q: "What taxes apply?", a: "~34% duty + 10% excise + 15% VAT for combustion (~70% combined); EVs ~0.5–2%." },
      { q: "Which ports handle imports?", a: "Guayaquil and Posorja." },
    ],
    popularModelIds: ["byd-atto-3", "geely-monjaro", "chery-tiggo-8"],
    evNote:
      "Ecuador's EV incentive (~0.5–2% of CIF versus ~70% for combustion) is the widest EV-vs-ICE gap tracked, but it applies to new units only — used imports are effectively prohibited.",
  },
  uruguay: {
    overview:
      "Uruguay is a stable, left-hand-drive Mercosur market and a River Plate transshipment hub through the Port of Montevideo. Used-vehicle imports are restricted to returning Uruguayan citizens (Law 18.250), vehicles over ten years old are restricted, and imports face the Mercosur Common External Tariff plus 22% VAT.",
    considerations: [
      "Only returning Uruguayan citizens (12+ months' prior use, 2 years' residence abroad) may import a used vehicle — private non-citizens cannot.",
      "Used cars over 10 years old are restricted; Mercosur CET duty plus 22% VAT applies.",
      "Montevideo is a regional transshipment hub serving onward moves to Paraguay and Argentina.",
    ],
    faq: [
      { q: "Is Uruguay right- or left-hand drive?", a: "Left-hand drive (LHD)." },
      { q: "Can I import a used car into Uruguay?", a: "Only as a returning Uruguayan citizen under Law 18.250 — private non-citizens cannot import." },
      { q: "What is the age limit?", a: "Used cars over 10 years old are restricted." },
      { q: "What taxes apply?", a: "Mercosur Common External Tariff (by HS code) plus 22% VAT." },
      { q: "Which port handles imports?", a: "Montevideo." },
    ],
    popularModelIds: ["byd-atto-3", "geely-monjaro", "chery-tiggo-8"],
    evNote:
      "Uruguay has no EV-specific import-duty relief recorded; the Mercosur CET duty plus 22% VAT applies, with EV adoption promoted through local incentives rather than import-duty relief.",
  },
  mongolia: {
    overview:
      "Mongolia is a left-hand-drive North Asian market that imports heavily from China — uniquely, most vehicles arrive overland by rail through the Erlian/Zamyn-Üüd border crossing rather than by sea. It has no fixed age limit, but excise climbs with age, and electric, hybrid and gas vehicles receive up to a 50% excise discount.",
    considerations: [
      "Most vehicles arrive by rail via Tianjin and the Erlian/Zamyn-Üüd crossing, not by sea.",
      "No fixed age limit — but excise climbs with age, so source the newest stock the budget allows.",
      "RHD JDM imports are still permitted until a scheduled 1 June 2030 ban; LHD China units are unaffected.",
    ],
    faq: [
      { q: "Is Mongolia right- or left-hand drive?", a: "Left-hand drive (LHD); RHD JDM imports are permitted only until 1 June 2030." },
      { q: "Is there an age limit?", a: "No fixed age limit, but excise rises with age — confirm the current schedule with Mongolian Customs." },
      { q: "What taxes apply?", a: "Roughly 5% customs duty + 10% VAT + engine/age-based excise, with up to a 50% excise discount for EV/hybrid/gas vehicles." },
      { q: "How do vehicles arrive?", a: "By sea to Tianjin, then rail to Ulaanbaatar via Erlian/Zamyn-Üüd." },
    ],
    popularModelIds: ["byd-atto-3", "byd-seal", "byd-sealion-6"],
    evNote:
      "Mongolia grants up to a 50% excise discount on electric, hybrid and gas vehicles — a meaningful tax-side incentive for recent Chinese EVs, reinforced by a heavily China-influenced GB/T charging network.",
  },
  kyrgyzstan: {
    overview:
      "Kyrgyzstan is a landlocked, left-hand-drive EAEU member in Central Asia with a 10-year age limit on used imports and no pre-shipment inspection. Vehicles arrive by rail from China/Kazakhstan to Bishkek, and the country serves as a re-export corridor into the wider EAEU space.",
    considerations: [
      "The 10-year age limit is the hard filter — source 2017+ stock.",
      "EAEU Common Customs Tariff plus VAT apply to non-EAEU vehicles.",
      "No pre-shipment inspection is required, simplifying the export process.",
    ],
    faq: [
      { q: "Is Kyrgyzstan right- or left-hand drive?", a: "Left-hand drive (LHD)." },
      { q: "What is the age limit?", a: "Vehicles older than 10 years cannot be imported." },
      { q: "Is inspection required?", a: "No pre-shipment inspection is required." },
      { q: "What taxes apply?", a: "EAEU Common Customs Tariff plus VAT — verify current rates with the State Customs Service." },
    ],
    popularModelIds: ["chery-tiggo-8", "chery-tiggo-7", "haval-h9"],
    evNote:
      "Kyrgyzstan's EV import-duty treatment was not confirmed in the sources reviewed; as an EAEU member its EV framework is evolving. Verify with the State Customs Service before trading.",
    suvNote:
      "SUVs suit Kyrgyzstan's mountainous terrain and are the dominant import segment; mid-size Chinese SUVs are the strongest sellers.",
  },
  serbia: {
    overview:
      "Serbia is a left-hand-drive European market that imports around 130,000 used cars annually. It applies a 12.5% customs duty (non-EU origin) plus 20% VAT on an AMSS catalog value, a Euro 3 emission minimum, and no fixed age limit. Belgrade is reached via Bar (Montenegro) or Thessaloniki (Greece).",
    considerations: [
      "No fixed age limit — the Euro 3 emission standard is the binding eligibility gate.",
      "12.5% duty + 20% VAT, with taxes computed on the AMSS catalog value rather than the invoice price.",
      "All fuel types (petrol, diesel, hybrid, EV) are accepted by Serbian Customs.",
    ],
    faq: [
      { q: "Is Serbia right- or left-hand drive?", a: "Left-hand drive (LHD)." },
      { q: "Is there an age limit?", a: "No fixed age limit — eligibility is set by the Euro 3 emission standard." },
      { q: "What taxes apply?", a: "12.5% customs duty (non-EU) + 20% VAT, computed on the AMSS catalog value." },
      { q: "Which port handles imports?", a: "Belgrade, reached via Bar (Montenegro) or Thessaloniki (Greece)." },
    ],
    popularModelIds: ["byd-atto-3", "mg-4", "chery-tiggo-8"],
    evNote:
      "Serbia records no EV-specific import-duty relief — EVs face the same 12.5% + 20% VAT but avoid the Euro 3 combustion threshold. Chinese EVs entering via the CCS2/Type 2 network need a charging adapter.",
  },
  senegal: {
    overview:
      "Senegal is a left-hand-drive West African market with one of the strictest age rules in the region — private vehicles must be under 3 years from registration (4 years from manufacture). Pre-shipment inspection and prior import approval are mandatory, and Dakar is the main port.",
    considerations: [
      "The 3-year private age rule is the hard filter — source near-new 2023+ stock.",
      "Pre-shipment inspection in the country of origin and a prior import approval permit are required.",
      "Dakar is the main entry port, serving a regional re-export role.",
    ],
    faq: [
      { q: "Is Senegal right- or left-hand drive?", a: "Left-hand drive (LHD)." },
      { q: "What is the age limit?", a: "Private vehicles must be under 3 years from registration (4 years from manufacture); commercial up to 60 months/6 years." },
      { q: "What inspection is required?", a: "Pre-delivery inspection in the country of origin." },
      { q: "Which port handles imports?", a: "Dakar." },
    ],
    popularModelIds: ["byd-atto-3", "geely-monjaro", "chery-tiggo-8"],
    evNote:
      "Senegal's EV import-duty treatment was not confirmed in the sources reviewed; EV policy is developing and should be verified with Senegal Customs.",
    suvNote:
      "Senegal's strict age rule effectively restricts imports to near-new units; recent compact and mid-size SUVs are the strongest fit.",
  },
  "cote-divoire": {
    overview:
      "Côte d'Ivoire is a left-hand-drive West African market with a 5-year age limit on passenger cars and a heavy ~53% customs duty plus a registration fee. Abidjan is the principal port, and the country is one of West Africa's most dynamic economies.",
    considerations: [
      "The 5-year age limit is the hard filter — source 2021+ stock.",
      "~53% customs duty plus a ~EUR 690 registration fee make the landed cost heavy — budget accordingly.",
      "Vehicles cannot be shipped in the same container as household goods.",
    ],
    faq: [
      { q: "Is Côte d'Ivoire right- or left-hand drive?", a: "Left-hand drive (LHD)." },
      { q: "What is the age limit?", a: "Passenger cars are limited to 5 years of age." },
      { q: "What duty applies?", a: "Approximately 53% customs duty plus a ~EUR 690 registration fee — verify with Côte d'Ivoire Customs." },
      { q: "Which port handles imports?", a: "Abidjan." },
    ],
    popularModelIds: ["chery-tiggo-8", "geely-monjaro", "byd-atto-3"],
    evNote:
      "Côte d'Ivoire's EV import-duty treatment was not confirmed in the sources reviewed; EVs are expected to follow the standard ~53% schedule. Verify with Côte d'Ivoire Customs.",
  },
  cameroon: {
    overview:
      "Cameroon is a left-hand-drive Central African market with no fixed vehicle age limit but a steep engine-capacity-based duty — 58% for engines up to 2000cc and 77% above. Douala is the principal port and a gateway to the landlocked CEMAC interior (Chad, CAR).",
    considerations: [
      "No age limit — but the engine-capacity duty (58% ≤2000cc / 77% >2000cc) is the key cost lever.",
      "A non-sale certificate is required, and documents must be lodged at least one month before arrival.",
      "Douala serves as a re-export gateway to Chad and the Central African Republic.",
    ],
    faq: [
      { q: "Is Cameroon right- or left-hand drive?", a: "Left-hand drive (LHD)." },
      { q: "Is there an age limit?", a: "No fixed age limit — but taxes vary by age and engine power." },
      { q: "What duty applies?", a: "58% (≤2000cc) or 77% (>2000cc) of CIF — verify with Cameroon Customs." },
      { q: "Which port handles imports?", a: "Douala." },
    ],
    popularModelIds: ["chery-tiggo-8", "geely-monjaro", "byd-atto-3"],
    evNote:
      "Cameroon's engine-capacity-based duty does not cleanly map to EVs, so EV classification and rate are uncertain — confirm with Cameroon Customs before trading.",
  },
  panama: {
    overview:
      "Panama is a dollarised, left-hand-drive Central American market and a major regional re-export hub through the Colón Free Zone. Its vehicle age limit is cited inconsistently across sources, clean titles are mandatory, and imports face an ad valorem duty plus 7% ITBMS. Cristóbal (Atlantic) and Balboa (Pacific) are the entry ports.",
    considerations: [
      "The vehicle age limit is cited inconsistently (5/7/10 years) — verify the current threshold with a Panamanian customs broker.",
      "Clean, lien-free titles are mandatory; salvage and rebuilt titles are rejected.",
      "The Colón Free Zone enables duty-free entry for re-export, and Pensionado visa holders may claim a one-vehicle duty exemption every two years.",
    ],
    faq: [
      { q: "Is Panama right- or left-hand drive?", a: "Left-hand drive (LHD) — RHD vehicles are not importable for road registration." },
      { q: "What is the age limit?", a: "Cited inconsistently (5/7/10 years) — verify with a Panamanian customs broker." },
      { q: "What taxes apply?", a: "An ad valorem duty plus 7% ITBMS (VAT)." },
      { q: "Which ports handle imports?", a: "Cristóbal (Atlantic) and Balboa (Pacific)." },
    ],
    popularModelIds: ["byd-atto-3", "geely-monjaro", "chery-tiggo-8"],
    evNote:
      "Panama has no EV-specific import-duty relief recorded; the standard duty plus 7% ITBMS applies, with the Colón Free Zone and Pensionado exemption as scheme-specific routes.",
  },
  lebanon: {
    overview:
      "Lebanon is a left-hand-drive Middle East market and a regional re-export hub with an eight-year age limit and a diesel-vehicle ban. Duty is a flat 5 million LBP for vehicles up to 20 million LBP CIF (50% above), plus 10% VAT, and Beirut is the sole entry port.",
    considerations: [
      "The 8-year age limit is the key filter — source model-year 2018 and newer.",
      "Diesel used vehicles are prohibited; petrol, hybrid and electric powertrains are admissible.",
      "Duty is a flat LBP amount for low-CIF vehicles and 50% above 20M LBP CIF — quote per exact vehicle.",
    ],
    faq: [
      { q: "Is Lebanon right- or left-hand drive?", a: "Left-hand drive (LHD)." },
      { q: "What is the age limit?", a: "Eight years from the year of manufacture." },
      { q: "What taxes apply?", a: "Flat 5M LBP (≤20M CIF) or 50% above, plus 10% VAT — verify with Lebanese Customs." },
      { q: "Which port handles imports?", a: "Beirut." },
    ],
    popularModelIds: ["byd-atto-3", "chery-tiggo-8", "geely-monjaro"],
    evNote:
      "Lebanon bans diesel used vehicles and has no confirmed EV-specific duty relief; EVs are admissible but follow the standard duty schedule.",
  },
  ukraine: {
    overview:
      "Ukraine is a large left-hand-drive European market with a Euro-2 emissions gate, no firm age cap (a 20-year cap is proposed), and a duty stack of 10% import duty plus an age/engine-based excise plus 20% VAT. Its full EV exemption expired on 31 December 2025, and Odesa is the principal Black Sea entry port.",
    considerations: [
      "Euro-2 compliance is the binding gate — a proposed 20-year age cap is not yet law.",
      "The excise is a formula (engine type, displacement and age), not a flat percentage — quote per exact model.",
      "The full EV exemption (0% duty/excise/VAT) ended 31 Dec 2025 — EVs now face up to 10% duty + €1/kWh excise + 20% VAT.",
    ],
    faq: [
      { q: "Is Ukraine right- or left-hand drive?", a: "Left-hand drive (LHD)." },
      { q: "Is there an age limit?", a: "No firm cap (Euro-2 is the gate); a 20-year cap is proposed." },
      { q: "What taxes apply?", a: "10% duty + age/engine-based excise + 20% VAT — verify with the State Customs Service." },
      { q: "What EV treatment applies?", a: "The full EV exemption ended 31 Dec 2025." },
      { q: "Which port handles imports?", a: "Odesa, with Chornomorsk as an alternative." },
    ],
    popularModelIds: ["byd-atto-3", "li-auto-l7", "geely-monjaro"],
    evNote:
      "Ukraine's full EV exemption ended 31 December 2025, so EVs now face the standard duty + €1/kWh excise + 20% VAT — the previous EV cost advantage has narrowed.",
  },
  belarus: {
    overview:
      "Belarus is a left-hand-drive EAEU gateway that offers a 20,000-unit duty-free quota for pure electric vehicles (plus 0% individual EV VAT through 2028) and single customs clearance across the EAEU. There is no hard age ban — the individual unified rate scales with age and engine size — and the country is landlocked, transiting via Klaipėda/Riga or Brest.",
    considerations: [
      "The 20,000-unit EV duty-free quota is first-come-first-served and was over 40% consumed by April 2026 — confirm quota availability before purchase.",
      "Pure EVs pay 0% duty + 0% individual VAT; hybrids are excluded and pay 15% duty + 20% VAT.",
      "EAEU single clearance lets a cleared car move across Russia, Kazakhstan, Kyrgyzstan and Armenia without re-paying duty (Russia still levies a recycling fee).",
    ],
    faq: [
      { q: "Is Belarus right- or left-hand drive?", a: "Left-hand drive (LHD)." },
      { q: "Is there an age limit?", a: "No hard age ban — the unified rate scales with age and engine size." },
      { q: "What EV incentive applies?", a: "A 20,000-unit duty-free quota plus 0% individual EV VAT through 2028." },
      { q: "How do vehicles arrive?", a: "Overland via Brest or through the Klaipėda/Riga seaports to Minsk." },
    ],
    popularModelIds: ["byd-atto-3", "byd-seal", "zeekr-001"],
    evNote:
      "Belarus's 20,000-unit duty-free EV quota plus 0% individual EV VAT through 2028 make it a high-value EV corridor, but the quota is limited and resets annually.",
  },
  bolivia: {
    overview:
      "Bolivia is a left-hand-drive landlocked Latin American market with one of the region's strictest used-vehicle age rules — one model year old since December 2014 (some sources cite up to two years) — which effectively bars used imports. Imports face the NANDINA tariff plus 14.94% IVA, and vehicles transit via Iquique/Antofagasta (Chile) or Matarani/Ilo (Peru).",
    considerations: [
      "The ~1-model-year age rule is a near-total bar to used imports — only brand-new/current-model-year units qualify.",
      "Import requires a locally registered entity with NIT and a licensed customs broker (Agente Despachante) above USD 1,000.",
      "Landlocked transit via Chile or Peru adds cost and lead time.",
    ],
    faq: [
      { q: "Is Bolivia right- or left-hand drive?", a: "Left-hand drive (LHD)." },
      { q: "What is the age limit?", a: "~1 model year (some sources cite 2) — verify with Aduana Nacional." },
      { q: "What taxes apply?", a: "NANDINA tariff plus 14.94% IVA." },
      { q: "How do vehicles arrive?", a: "Via Iquique/Antofagasta (Chile) or Matarani/Ilo (Peru)." },
    ],
    popularModelIds: ["geely-monjaro", "chery-tiggo-8", "byd-atto-3"],
    evNote:
      "Bolivia has no confirmed EV-specific import-duty relief, and the strict age rule makes it a market to monitor rather than a current used-export destination.",
  },
  "costa-rica": {
    overview:
      "Costa Rica is a left-hand-drive Latin American market with no age limit but a sharply age-tiered import tax (52.29% ≤3 years, 63.91% at 4 years, 79.03% at 6+ years) and a full import-tax exemption for fully electric vehicles under Law 9518. Puerto Limón (Atlantic) and Caldera (Pacific) are the entry ports.",
    considerations: [
      "The zero EV import tax (Law 9518) versus 52–79% tiered ICE tax is the strongest EV relief in the tracked Latin American set.",
      "No age limit — but age drives the duty tier, and older vehicles need more frequent RITEVE inspections.",
      "Hybrids do not receive the full EV exemption — confirm the current hybrid treatment.",
    ],
    faq: [
      { q: "Is Costa Rica right- or left-hand drive?", a: "Left-hand drive (LHD)." },
      { q: "Is there an age limit?", a: "No — but import tax rises sharply with age." },
      { q: "What EV incentive applies?", a: "Fully electric vehicles are exempt from import tax (Law 9518)." },
      { q: "Which ports handle imports?", a: "Puerto Limón (Atlantic) and Caldera (Pacific)." },
    ],
    popularModelIds: ["byd-atto-3", "byd-seal", "mg-4"],
    evNote:
      "Costa Rica's zero import tax on fully electric vehicles (Law 9518) makes it a standout EV destination; hybrids receive only partial relief.",
  },
  guatemala: {
    overview:
      "Guatemala is a left-hand-drive Central American market with a ~10-year age limit (cited inconsistently) and a layered tax stack of DAI import duty (0–15%), 12% VAT and a ~20% first-registration IPRIMA tax. Puerto Quetzal (Pacific) and Santo Tomás de Castilla (Atlantic) are the entry ports.",
    considerations: [
      "The 10-year age limit is cited inconsistently — confirm with SAT or a licensed broker before sourcing stock.",
      "The DAI + 12% VAT + ~20% IPRIMA stack is layered — budget the full stack.",
      "No EV-specific import-duty relief is recorded.",
    ],
    faq: [
      { q: "Is Guatemala right- or left-hand drive?", a: "Left-hand drive (LHD)." },
      { q: "What is the age limit?", a: "~10 years (cited inconsistently) — verify with SAT." },
      { q: "What taxes apply?", a: "DAI duty (0–15%) + 12% VAT + ~20% IPRIMA." },
      { q: "Which ports handle imports?", a: "Puerto Quetzal (Pacific) and Santo Tomás de Castilla (Atlantic)." },
    ],
    popularModelIds: ["byd-atto-3", "chery-tiggo-8", "geely-monjaro"],
    evNote:
      "Guatemala has no confirmed EV-specific import-duty relief; EVs follow the standard DAI + VAT + IPRIMA stack.",
  },
  paraguay: {
    overview:
      "Paraguay is a left-hand-drive South American market and one of the region's most open used-vehicle importers — it caps used passenger cars at 10 model-years old and applies a comparatively light Arancel (0–20%) plus 10% IVA, roughly 28–32% all-in. Landlocked Asunción is reached via Montevideo or Brazilian ports, and the country is a re-export hub into the wider Mercosur interior.",
    considerations: [
      "The 10-year age limit (Ley 2018/2002) is the key filter — source 2016+ stock.",
      "A light duty stack (Arancel 0–20% + 10% IVA, ~28–32% all-in) makes Paraguay one of South America's lowest-tax used-import destinations.",
      "No EV-specific import-duty relief is recorded; vehicles transit via Montevideo (Uruguay) or Brazilian ports to Asunción.",
    ],
    faq: [
      { q: "Is Paraguay right- or left-hand drive?", a: "Left-hand drive (LHD)." },
      { q: "What is the age limit?", a: "Used passenger cars are capped at 10 model-years old (Ley 2018/2002)." },
      { q: "What duty and VAT apply?", a: "Arancel 0–20% plus 10% IVA, roughly 28–32% all-in — verify with Dirección Nacional de Aduanas." },
      { q: "Which port handles imports?", a: "Asunción, reached via Montevideo or Brazilian ports (landlocked)." },
    ],
    popularModelIds: ["byd-atto-3", "li-auto-l7", "chery-tiggo-8"],
    evNote:
      "Paraguay has no EV-specific import-duty relief recorded; EVs follow the standard Arancel + 10% IVA stack, though the light overall duty makes it an accessible EV destination.",
  },
  angola: {
    overview:
      "Angola is a left-hand-drive Southern African market with a restricted, high-duty import regime applied at the port of Luanda. The used-vehicle age rule is cited inconsistently (5–6 years), and imports face a 30% customs duty plus 14% VAT (combined ~42–55%).",
    considerations: [
      "The age rule is cited inconsistently (5 vs 6 years vs no strict limit) — confirm the current cut-off with Angola Customs before sourcing stock.",
      "A high-duty stack (30% + 14% VAT, ~42–55% combined) makes the landed cost heavy.",
      "Clearance runs through Luanda, with the regime dependent on vehicle category and assessed value.",
    ],
    faq: [
      { q: "Is Angola right- or left-hand drive?", a: "Left-hand drive (LHD)." },
      { q: "What is the age limit?", a: "Cited inconsistently at 5–6 years — verify with Angola Customs." },
      { q: "What duty and VAT apply?", a: "30% customs duty plus 14% VAT (combined ~42–55%)." },
      { q: "Which port handles imports?", a: "Luanda." },
    ],
    popularModelIds: ["byd-atto-3", "geely-monjaro", "chery-tiggo-8"],
    evNote:
      "Angola records no EV-specific import-duty relief; EVs follow the same 30% duty plus 14% VAT as combustion vehicles.",
  },
  mozambique: {
    overview:
      "Mozambique is a right-hand-drive Southern African market — an outlier among the former Portuguese colonies in driving on the left. It has no fixed used-vehicle age limit, applies engine-size-based duty plus 17% VAT, and clears through the JUE digital portal at Maputo and Beira, with mandatory Intertek pre-shipment inspection.",
    considerations: [
      "RHD is mandatory (drives on the left) — source RHD export units.",
      "No fixed age limit makes Mozambique one of the more accessible Southern African markets.",
      "JUE digital clearance, a NUIT tax number and the Intertek MOZ pre-shipment inspection are required.",
    ],
    faq: [
      { q: "Is Mozambique right- or left-hand drive?", a: "Right-hand drive (RHD) — Mozambique drives on the left." },
      { q: "Is there an age limit?", a: "No fixed age limit, though duty may rise with age." },
      { q: "What inspection is required?", a: "Intertek pre-shipment inspection (MOZ number) plus JUE digital clearance." },
      { q: "Which ports handle imports?", a: "Maputo and Beira." },
    ],
    popularModelIds: ["byd-atto-3", "mg-4", "byd-sealion-6"],
    evNote:
      "Mozambique records no EV-specific import-duty relief; EVs follow the engine-size duty plus 17% VAT.",
  },
  uganda: {
    overview:
      "Uganda is a right-hand-drive East African market with a 15-year age limit (a reduction to 13 years is proposed for 2026/27), a Euro 4/IV emission standard and mandatory UNBS inspection. It applies 25% import duty plus 18% VAT and an age-based environmental levy, with vehicles transiting via the Port of Mombasa to landlocked Kampala.",
    considerations: [
      "The 15-year age limit (13 proposed) and Euro 4 emission standard are the binding filters.",
      "The environmental levy is 0% under 9 years and 50% above — newer stock avoids the heaviest charge.",
      "RHD is mandatory; vehicles transit via Mombasa (Kenya) to Kampala.",
    ],
    faq: [
      { q: "Is Uganda right- or left-hand drive?", a: "Right-hand drive (RHD)." },
      { q: "What is the age limit?", a: "15 years (13 years proposed for 2026/27)." },
      { q: "What duty and VAT apply?", a: "25% import duty plus 18% VAT, plus an age-based environmental levy." },
      { q: "Which port handles imports?", a: "Kampala, via the Port of Mombasa (Kenya) transit." },
    ],
    popularModelIds: ["byd-atto-3", "byd-song-plus", "chery-tiggo-8"],
    evNote:
      "Uganda's environmental levy is 0% for vehicles under 9 years old, so newer EVs and PHEVs avoid the heaviest charge; confirm EV-specific treatment with URA.",
    suvNote:
      "SUVs suit Uganda's mixed urban and rural roads; compact and mid-size SUVs are the dominant import segment.",
  },
  tajikistan: {
    overview:
      "Tajikistan is a left-hand-drive Central Asian market that bans vehicles produced before 2013 (Government Decree No. 355) and requires a Euro 4 emission minimum. It offers a 10-year EV import-duty exemption (from October 2022) versus ~20–30% duty plus 18% VAT for combustion, and is reached overland via rail from China or through the Caucasus/Iran corridors.",
    considerations: [
      "The fixed pre-2013 cutoff (Decree No. 355) is the hard age filter — source 2013+ stock.",
      "The 10-year EV import-duty exemption is the standout relief delta versus ~20–30% duty + 18% VAT for combustion.",
      "Landlocked — vehicles arrive by rail from China (Khorgos) or via Poti/Batumi (Georgia) / Bandar Abbas (Iran).",
    ],
    faq: [
      { q: "Is Tajikistan right- or left-hand drive?", a: "Left-hand drive (LHD)." },
      { q: "What is the age limit?", a: "Vehicles produced before 2013 are banned (Decree No. 355)." },
      { q: "What EV incentive applies?", a: "A 10-year EV import-duty exemption from October 2022." },
      { q: "How do vehicles arrive?", a: "By rail from China, or via Poti/Batumi (Georgia) / Bandar Abbas (Iran)." },
    ],
    popularModelIds: ["byd-atto-3", "byd-seal", "chery-tiggo-8"],
    evNote:
      "Tajikistan's 10-year EV import-duty exemption makes recent Chinese EVs the standout import category versus ~20–30% duty plus 18% VAT for combustion vehicles.",
  },
  zimbabwe: {
    overview:
      "Zimbabwe is a right-hand-drive Southern African market with a 10-year age limit (S.I. 54 of 2024) and a ZIMRA duty schedule that taxes EVs at a reduced 25% (hybrids 40%). Landlocked, vehicles transit via Durban or Beira and clear at the Beitbridge or Forbes border posts.",
    considerations: [
      "The 10-year age limit (S.I. 54 of 2024, with S.I. 172 exceptions) is the key filter — source 2016+ stock.",
      "EVs attract a reduced 25% customs duty versus the engine-size ICE schedule — a structural advantage for EV imports.",
      "RHD is mandatory; vehicles transit via Durban (South Africa) or Beira (Mozambique) to the Beitbridge/Forbes border.",
    ],
    faq: [
      { q: "Is Zimbabwe right- or left-hand drive?", a: "Right-hand drive (RHD)." },
      { q: "What is the age limit?", a: "10 years from manufacture (S.I. 54 of 2024)." },
      { q: "What EV incentive applies?", a: "EVs are taxed at 25% duty (hybrids 40%) versus the engine-size ICE schedule." },
      { q: "Which ports handle imports?", a: "Harare, via Durban or Beira transit and the Beitbridge/Forbes border." },
    ],
    popularModelIds: ["byd-atto-3", "geely-monjaro", "chery-tiggo-8"],
    evNote:
      "Zimbabwe's reduced 25% EV duty (versus the engine-size ICE schedule) makes recent Chinese EVs the standout import category, subject to the 10-year age limit.",
  },
  nepal: {
    overview:
      "Nepal is a right-hand-drive South Asian market with no universal import age cap but a 20-year operation ban (30 years for EVs). The FY 2083/84 budget flattened EV customs duty to 20% (plus 13% VAT, CIIF and a 5% road fee) versus a 200–317% total tax stack for combustion vehicles. Landlocked, vehicles arrive via Indian ports (Kolkata/Vizag) or overland from China.",
    considerations: [
      "RHD is mandatory — China-market LHD units need an RHD export version before import.",
      "EVs pay a flat 20% customs duty versus a 200–317% combustion tax stack — a decisive EV advantage.",
      "No universal age cap today, but a 20-year operation ban and a proposed <1-year import rule — verify current rules with the Department of Customs.",
    ],
    faq: [
      { q: "Is Nepal right- or left-hand drive?", a: "Right-hand drive (RHD)." },
      { q: "What is the age limit?", a: "No universal import age cap, but a 20-year operation ban (30 for EVs)." },
      { q: "What EV incentive applies?", a: "Flat 20% EV customs duty (FY 2083/84) versus a 200–317% combustion stack." },
      { q: "How do vehicles arrive?", a: "Via Kolkata/Vizag (India) ports or overland via the China border." },
    ],
    popularModelIds: ["byd-atto-3", "byd-seal", "byd-dolphin"],
    evNote:
      "Nepal's flat 20% EV customs duty (replacing the old kW-based schedule) makes Chinese EVs the standout import category, provided an RHD export unit is sourced.",
  },
  zambia: {
    overview:
      "Zambia is a right-hand-drive Southern African market with no legal import age limit (but a 20% surtax on vehicles over 5 years old) and a ZRA specific-duty schedule assessed in flat Kwacha by engine size and age, plus a carbon-emission surtax and 16% VAT. Landlocked, vehicles transit via Durban or Dar es Salaam.",
    considerations: [
      "RHD is mandatory — China-market LHD units need an RHD export version.",
      "Duty is a flat ZRA specific-duty schedule (not a simple percentage) — age-banded, with a 20% surtax over 5 years old.",
      "JEVIC/Bureau Veritas pre-shipment inspection is mandatory before export.",
    ],
    faq: [
      { q: "Is Zambia right- or left-hand drive?", a: "Right-hand drive (RHD)." },
      { q: "What is the age limit?", a: "No legal age limit, but a 20% surtax applies over 5 years old." },
      { q: "How is duty assessed?", a: "ZRA specific-duty (flat Kwacha) schedule by engine size and age, plus carbon surtax and 16% VAT." },
      { q: "Which ports handle imports?", a: "Lusaka, via Durban or Dar es Salaam transit." },
    ],
    popularModelIds: ["byd-atto-3", "mg-4", "byd-dolphin"],
    evNote:
      "Zambia offers a reduced 15% hybrid excise; EV-specific relief is not separately documented, so EVs follow the ZRA specific-duty schedule — confirm treatment with ZRA before trading.",
  },
  laos: {
    overview:
      "Laos is a left-hand-drive Southeast Asian market that removed its 5-year used-vehicle age limit in 2025 and suspended new gasoline/diesel passenger-car imports from June 2024 to end-2026, making virtually all new passenger imports electric. Duty runs 40–65% of CIF depending on engine size. Landlocked, vehicles arrive via Thai ports or the China–Laos border.",
    considerations: [
      "The gas/diesel passenger-import ban (June 2024–2026) makes EVs the practical import channel.",
      "LHD is standard — China-market LHD units import directly without conversion.",
      "The 2025 removal of the 5-year age limit opens a window for 2018–2020 model-year units — verify current rules.",
    ],
    faq: [
      { q: "Is Laos right- or left-hand drive?", a: "Left-hand drive (LHD)." },
      { q: "What is the age limit?", a: "The 5-year limit was removed in 2025 — confirm the current rule." },
      { q: "What EV policy applies?", a: "A gas/diesel passenger-import ban plus EV tax incentives." },
      { q: "How do vehicles arrive?", a: "Via Laem Chabang (Thailand) or the China–Laos border." },
    ],
    popularModelIds: ["byd-atto-3", "byd-dolphin", "byd-seal"],
    evNote:
      "Laos' gas/diesel passenger-import suspension (June 2024–2026) and EV incentives make Chinese EVs the standout import category, subject to the 40–65% duty stack.",
  },
  cambodia: {
    overview:
      "Cambodia is a left-hand-drive Southeast Asian market that registers only LHD vehicles — making China a natural sourcing base. From 1 January 2026 EV customs duty fell to 0% and PHEV duty to 7%, versus 35% plus 10% VAT for ICE cars. There is no hard age cap, and Sihanoukville is the main port.",
    considerations: [
      "LHD is mandatory — China's pure-LHD production is a direct fit with no conversion.",
      "EV 0% / PHEV 7% duty (from Jan 2026) versus 35% + 10% VAT for ICE — a decisive EV advantage.",
      "No hard age cap as of 2026, but age-limit proposals recur — verify with GDCE.",
    ],
    faq: [
      { q: "Is Cambodia right- or left-hand drive?", a: "Left-hand drive (LHD) only." },
      { q: "What is the age limit?", a: "No hard age cap as of 2026; pre-2000 vehicles are discouraged." },
      { q: "What EV incentive applies?", a: "EV duty 0% and PHEV 7% from 1 January 2026." },
      { q: "Which port handles imports?", a: "Sihanoukville (Autonomous Port)." },
    ],
    popularModelIds: ["byd-atto-3", "byd-seal", "byd-song-plus"],
    evNote:
      "Cambodia's 0% EV duty (from 1 January 2026) makes Chinese BEVs price-competitive against local used cars, with PHEVs at 7% — a structural EV advantage.",
  },
  honduras: {
    overview:
      "Honduras is a left-hand-drive Central American market with a 10-year age limit (Financial Balance and Social Protection Act) and a landed-cost stack of DAI import duty (5–20%), 15% ISV sales tax and an ecotasa environmental fee. Puerto Cortés is the main port.",
    considerations: [
      "The 10-year age limit (some sources cite 7) is the key filter — source 2016+ stock and confirm with the DEI.",
      "LHD is standard and RHD imports are prohibited — China-market LHD units fit directly.",
      "No EV-specific relief is recorded; EVs follow the DAI + ISV + ecotasa stack.",
    ],
    faq: [
      { q: "Is Honduras right- or left-hand drive?", a: "Left-hand drive (LHD) only." },
      { q: "What is the age limit?", a: "10 years from manufacture (some sources cite 7)." },
      { q: "What taxes apply?", a: "DAI duty 5–20% + 15% ISV + ecotasa environmental fee." },
      { q: "Which port handles imports?", a: "Puerto Cortés." },
    ],
    popularModelIds: ["byd-atto-3", "chery-tiggo-8", "geely-monjaro"],
    evNote:
      "Honduras records no EV-specific import-duty relief, so EVs follow the standard DAI + 15% ISV + ecotasa stack — confirm EV treatment with the DEI before trading.",
  },
  "el-salvador": {
    overview:
      "El Salvador is a left-hand-drive Central American market with an 8-year age limit on passenger cars (15 years for trucks/SUVs) and a landed-cost stack of 25–30% duty plus 13% VAT (IVA). Acajutla is the main port, reached via Panama transshipment or a Guatemalan/Honduran port plus truck.",
    considerations: [
      "The 8-year age limit (15 for trucks/SUVs) is the key filter — source 2018+ passenger stock and confirm with the DGA.",
      "LHD is standard — China-market LHD units import directly without conversion.",
      "No EV-specific relief is recorded; EVs follow the 25–30% duty + 13% VAT stack.",
    ],
    faq: [
      { q: "Is El Salvador right- or left-hand drive?", a: "Left-hand drive (LHD) only." },
      { q: "What is the age limit?", a: "8 years for passenger cars (15 for trucks/SUVs)." },
      { q: "What taxes apply?", a: "25–30% duty + 13% VAT (IVA)." },
      { q: "Which port handles imports?", a: "Acajutla, via Panama transshipment or a Guatemalan/Honduran port." },
    ],
    popularModelIds: ["byd-atto-3", "chery-tiggo-8", "byd-dolphin"],
    evNote:
      "El Salvador records no EV-specific import-duty relief, so EVs follow the standard 25–30% duty + 13% VAT stack — confirm EV treatment with the DGA before trading.",
  },
  botswana: {
    overview:
      "Botswana is a landlocked right-hand-drive Southern African market that imports used vehicles (mainly from Japan and South Africa) under the Southern African Customs Union (SACU). There is no fixed age cap, but duty is assessed on CIF value (importer guides cite 27% customs + 12% VAT) and tax climbs with age. Vehicles transit via Durban, South Africa.",
    considerations: [
      "No hard age limit, but duty climbs with age and a 2-year no-sale rule applies — source the newest unit your budget allows.",
      "Landlocked — vehicles transit via Durban (South Africa) under SACU; allow for transit time and border clearance.",
      "RHD is the norm — China-market LHD units require sourcing an RHD export unit.",
    ],
    faq: [
      { q: "Is there an age limit for used cars?", a: "No fixed age cap, but duty is assessed on CIF value and generally climbs with age — confirm the BURS schedule." },
      { q: "Is Botswana right-hand drive?", a: "Yes — Botswana is a right-hand-drive (RHD) market." },
      { q: "What duty and VAT apply?", a: "Importer guides cite 27% customs duty + 12% VAT (SACU). Verify current rates with BURS." },
      { q: "Which port handles imports?", a: "Vehicles transit via Durban (South Africa) to Gaborone." },
    ],
    popularModelIds: ["byd-atto-3", "mg-4", "byd-song-plus"],
    evNote:
      "No EV-specific import-duty relief is confirmed for Botswana; EVs follow the SACU duty + VAT stack. Charging is European-aligned (Type 2 / CCS2), so a GB/T-to-CCS2 adapter is required for China-market units.",
  },
  namibia: {
    overview:
      "Namibia is a right-hand-drive Southern African market that enforces a strict 8-year age limit (counted from first registration) and requires an import permit before shipping. Walvis Bay is a direct deep-water port on the Atlantic, and NamRA is the customs authority. Duty is assessed on CIF value.",
    considerations: [
      "The strict 8-year age limit (from first registration, not model year) is the key filter — source units comfortably inside the window.",
      "Walvis Bay is a direct port, cutting transit time versus landlocked neighbours.",
      "RHD is mandatory — China-market LHD units require an RHD export unit.",
    ],
    faq: [
      { q: "What is the age limit?", a: "8 years from first registration, with an import permit required before shipping." },
      { q: "Is Namibia right-hand drive?", a: "Yes — Namibia is a right-hand-drive (RHD) market." },
      { q: "Which port handles imports?", a: "Walvis Bay (direct Atlantic port)." },
    ],
    popularModelIds: ["byd-atto-3", "byd-seal", "chery-tiggo-8"],
    evNote:
      "No EV-specific duty relief is confirmed for Namibia; EVs follow the standard duty + 15% VAT stack. Charging is European-aligned (Type 2 / CCS2) — confirm the GB/T-to-CCS2 adapter requirement.",
  },
  mauritius: {
    overview:
      "Mauritius is a right-hand-drive Indian Ocean island market with a tight used-car age cap (historically ~3–4 years, set by the Finance Act). Landed cost is dominated by high excise duty plus 15% VAT, and vehicles discharge at Port Louis with MRA customs and NLTA roadworthiness inspection.",
    considerations: [
      "The ~3–4-year age cap is the decisive filter — source late-production units and confirm the current Finance Act age with MRA before bidding.",
      "Excise duty (banded by engine size) plus 15% VAT dominate the landed cost; EV/hybrid excise concessions may apply.",
      "RHD is mandatory and LHD is not permitted for normal use.",
    ],
    faq: [
      { q: "What is the age limit?", a: "Around 3–4 years, set by the Finance Act and adjusted each budget — confirm with MRA." },
      { q: "Is Mauritius right-hand drive?", a: "Yes — Mauritius is RHD and does not permit LHD for normal use." },
      { q: "Which port handles imports?", a: "Port Louis." },
    ],
    popularModelIds: ["byd-atto-3", "byd-seal", "byd-dolphin"],
    evNote:
      "Mauritius has historically offered reduced excise for EVs and hybrids under successive Finance Acts. Charging is European-aligned (Type 2 / CCS2) — confirm the GB/T-to-CCS2 adapter requirement and current EV excise with MRA.",
  },
  jamaica: {
    overview:
      "Jamaica is a right-hand-drive Caribbean market with a 6-year age limit for cars and SUVs (10 years for pick-ups and vans) under the Motor Vehicle Import Policy. Individuals may import up to two vehicles every three years via a Trade Board permit, and vehicles clear at Kingston. EVs benefit from reduced import duty.",
    considerations: [
      "The 6-year car/SUV age limit is the key filter — source 2020+ stock and confirm with the Trade Board.",
      "Individuals need a Trade Board import permit (2 vehicles every 3 years).",
      "EVs enjoy reduced import duty — a structural advantage for Chinese BEVs.",
    ],
    faq: [
      { q: "What is the age limit?", a: "6 years for cars/SUVs, 10 years for pick-ups and vans (Ministry Paper #36/14)." },
      { q: "Is Jamaica right-hand drive?", a: "Yes — Jamaica is a right-hand-drive (RHD) market." },
      { q: "Do EVs get a duty break?", a: "Yes — Jamaica offers reduced import duty for EVs. Verify the current rate with the Jamaica Customs Agency." },
      { q: "Which port handles imports?", a: "Kingston." },
    ],
    popularModelIds: ["byd-atto-3", "byd-seal", "byd-dolphin"],
    evNote:
      "Jamaica's reduced EV import duty makes Chinese BEVs structurally competitive. Charging is Type 2 / CCS2 (European-aligned) — confirm the GB/T-to-Type 2 adapter requirement and the destination standard.",
  },
  "trinidad-and-tobago": {
    overview:
      "Trinidad & Tobago is a right-hand-drive Caribbean market that, from 1 January 2026, extended its used-vehicle age limits to 6 years for private cars (previously 3) and 10 years for light commercial vehicles (previously 7). Landed cost is set by 20–30% duty, an engine-banded Motor Vehicle Tax and 12.5% VAT, clearing at Port of Spain.",
    considerations: [
      "The extended 6-year car age limit (from Jan 2026) widens the eligible stock window versus the prior 3-year rule.",
      "Duty (20–30%) + MVT (engine-banded) + 12.5% VAT form the landed-cost stack — confirm the current figures.",
      "EV/hybrid eligibility was tightened in 2026 — verify before sourcing EV stock.",
    ],
    faq: [
      { q: "What is the age limit?", a: "6 years for private cars and 10 years for light commercial vehicles (from 1 January 2026)." },
      { q: "Is Trinidad & Tobago right-hand drive?", a: "Yes — Trinidad & Tobago is a right-hand-drive (RHD) market." },
      { q: "What taxes apply?", a: "20–30% import duty + Motor Vehicle Tax (engine-banded) + 12.5% VAT." },
      { q: "Which port handles imports?", a: "Port of Spain." },
    ],
    popularModelIds: ["byd-atto-3", "mg-4", "byd-seal"],
    evNote:
      "Trinidad & Tobago tightened EV/hybrid eligibility under the 2026 amendments, with no clear EV duty relief. Charging is Type 2 / CCS2 (European-aligned) — confirm the GB/T-to-Type 2 adapter requirement.",
  },
  brunei: {
    overview:
      "Brunei Darussalam is a right-hand-drive Southeast Asian market with a tight used-vehicle age cap — 3 years from registration (4 from manufacture) for private use and 60 months / 6 years for commercial. It levies import and excise duties but no VAT, and vehicles clear at Muara with an approval permit required before departure.",
    considerations: [
      "The 3-year private age cap is the decisive filter — source late-production units and confirm with RCED.",
      "No VAT, but import and excise duties apply — confirm the current rates.",
      "RHD is required; LHD vehicles are only permitted for temporary tour use and must be re-exported.",
    ],
    faq: [
      { q: "What is the age limit?", a: "3 years from registration (4 from manufacture) for private use; 60 months / 6 years for commercial." },
      { q: "Is Brunei right-hand drive?", a: "Yes — Brunei is a right-hand-drive (RHD) market." },
      { q: "Is there VAT?", a: "No — Brunei levies import and excise duties but no VAT." },
      { q: "Which port handles imports?", a: "Muara." },
    ],
    popularModelIds: ["byd-atto-3", "byd-seal", "byd-dolphin"],
    evNote:
      "No EV-specific import-duty relief is confirmed for Brunei; EVs follow the import + excise duty structure (no VAT). Charging is European-aligned (Type 2 / CCS2) — confirm the GB/T-to-CCS2 adapter requirement.",
  },
  fiji: {
    overview:
      "Fiji is a right-hand-drive Pacific island market that caps used-vehicle imports at around 8 years (adjusted in recent budgets) and levies import (fiscal) duty plus VAT through the Fiji Revenue and Customs Service. Vehicles clear mainly at Suva (Lautoka is secondary), and demand is concentrated on compact SUVs and economical sedans with growing EV interest.",
    considerations: [
      "The ~8-year age limit (has changed recently) is the key filter — source units comfortably inside the window and confirm the current FRCS cut-off.",
      "RHD is mandatory — China-market LHD units require an RHD export unit.",
      "EVs may attract duty concessions — confirm the current rate with FRCS before trading.",
    ],
    faq: [
      { q: "What is the age limit?", a: "Around 8 years for petrol/diesel passenger vehicles — verify the current cut-off with the Fiji Revenue and Customs Service (FRCS)." },
      { q: "Is Fiji right-hand drive?", a: "Yes — Fiji is a right-hand-drive (RHD) market." },
      { q: "What taxes apply?", a: "Import (fiscal) duty plus VAT (and an environment levy on some categories). Verify current rates with FRCS." },
      { q: "Which port handles imports?", a: "Suva (Lautoka is secondary)." },
    ],
    popularModelIds: ["byd-atto-3", "mg-4", "chery-tiggo-8"],
    evNote:
      "Fiji has offered import-duty concessions for EVs and hybrids, and charging is European-aligned (Type 2 / CCS2). A GB/T-to-CCS2 adapter is required for China-market units — confirm the destination standard and current EV duty with FRCS.",
  },
  "papua-new-guinea": {
    overview:
      "Papua New Guinea is a right-hand-drive Pacific market with no single universal age cap on used-vehicle imports — vehicles must meet roadworthiness and (for some categories) pre-shipment inspection, clearing through Lae and Port Moresby under PNG Customs. Import duty plus 10% GST apply, and demand favors durable SUVs and light commercial vehicles.",
    considerations: [
      "No fixed age cap, but roadworthiness and SGS inspection apply — confirm condition limits with PNG Customs.",
      "RHD is mandatory — China-market LHD units require an RHD export unit.",
      "No EV-specific duty relief is confirmed; EVs follow the standard duty + 10% GST stack.",
    ],
    faq: [
      { q: "Is there an age limit?", a: "No single universal age cap — roadworthiness and inspection requirements apply. Verify with PNG Customs." },
      { q: "Is Papua New Guinea right-hand drive?", a: "Yes — PNG is a right-hand-drive (RHD) market." },
      { q: "What taxes apply?", a: "Import duty plus 10% GST. Verify current duty with PNG Customs." },
      { q: "Which ports handle imports?", a: "Lae (main) and Port Moresby." },
    ],
    popularModelIds: ["byd-atto-3", "byd-seal", "tank-300"],
    evNote:
      "No EV-specific import-duty relief is confirmed for PNG; EVs follow the standard duty + 10% GST stack. Charging is European-aligned (Type 2 / CCS2) — confirm the GB/T-to-CCS2 adapter requirement.",
  },
  guyana: {
    overview:
      "Guyana is a right-hand-drive South American/Caribbean market (CARICOM) that restricts used-vehicle imports to 8 years old under Guyana Revenue Authority rules. Duty is banded by engine size plus 14% VAT, and vehicles clear at Georgetown. The oil-driven economy has lifted demand for SUVs and pick-ups, with emerging EV interest.",
    considerations: [
      "The 8-year age limit is the key filter — source units inside the window and confirm the exact GRA cut-off date.",
      "RHD is mandatory — China-market LHD units require an RHD export unit.",
      "EVs have received reduced or zero-rated import duty in recent budgets — confirm the current rate with GRA.",
    ],
    faq: [
      { q: "What is the age limit?", a: "8 years — verify the exact cut-off with the Guyana Revenue Authority (GRA)." },
      { q: "Is Guyana right-hand drive?", a: "Yes — Guyana is a right-hand-drive (RHD) market." },
      { q: "What taxes apply?", a: "Import duty (banded by engine size) plus 14% VAT. Verify current rates with GRA." },
      { q: "Which port handles imports?", a: "Georgetown." },
    ],
    popularModelIds: ["byd-atto-3", "great-wall-haval-h6", "chery-tiggo-8"],
    evNote:
      "Guyana has offered reduced or zero-rated import duty for EVs in recent budgets. Charging is European-aligned (Type 2 / CCS2) — confirm the GB/T-to-CCS2 adapter requirement and current EV duty with GRA.",
  },
  "timor-leste": {
    overview:
      "Timor-Leste is a right-hand-drive Southeast Asian market that prices trade in US dollars and clears vehicles through Dili under the Timor-Leste Customs Authority. A single current used-vehicle age limit is not clearly documented, and import duty plus a sales/service tax apply. The market is small and early-stage for new-energy vehicles.",
    considerations: [
      "No single age limit is clearly documented — confirm any age/condition rules with the Customs Authority before sourcing stock.",
      "RHD is mandatory — China-market LHD units require an RHD export unit.",
      "No EV-specific duty relief is confirmed; EVs follow the standard duty + sales/service tax stack.",
    ],
    faq: [
      { q: "Is there an age limit?", a: "A single current age limit is not clearly documented — verify with the Timor-Leste Customs Authority." },
      { q: "Is Timor-Leste right-hand drive?", a: "Yes — Timor-Leste is a right-hand-drive (RHD) market." },
      { q: "What taxes apply?", a: "Import duty plus a sales/service tax. Verify current rates with the Customs Authority." },
      { q: "Which port handles imports?", a: "Dili." },
    ],
    popularModelIds: ["byd-atto-3", "chery-tiggo-8", "toyota-rav4"],
    evNote:
      "No EV-specific import-duty relief is confirmed for Timor-Leste; EVs follow the standard duty + sales/service tax stack. Charging is European-aligned (Type 2 / CCS2) — confirm the GB/T-to-CCS2 adapter requirement.",
  },
  myanmar: {
    overview:
      "Myanmar is a large Southeast Asian market that drives on the right (left-hand-drive traffic) but retains a substantial right-hand-drive used-car fleet imported from Japan. Vehicle imports are regulated by an annual Ministry of Commerce notification on permitted model years (the 2025 policy, issued December 2024, reaffirmed existing rules), and vehicles clear mainly at Yangon (Thilawa) under Myanmar Customs with an import permit plus duty and commercial tax.",
    considerations: [
      "Permitted model years are set by the annual MOC notification — confirm the current permitted years before sourcing stock.",
      "Drive side is nuanced: official traffic is LHD (drives right), but RHD imports are widespread — verify the current drive-side requirement with MOC.",
      "Import permits and duty/commercial tax apply — confirm the document set and rates with Myanmar Customs.",
    ],
    faq: [
      { q: "What are the import restrictions?", a: "Model-year limits set by the annual Ministry of Commerce notification (2025 policy reaffirmed existing rules). Verify with MOC." },
      { q: "Is Myanmar right- or left-hand drive?", a: "Myanmar drives on the right (left-hand-drive traffic), but a large RHD used-car fleet exists — confirm the current rule with MOC." },
      { q: "What taxes apply?", a: "Import duty plus commercial tax (CTT). Verify current rates with Myanmar Customs." },
      { q: "Which port handles imports?", a: "Yangon (Thilawa)." },
    ],
    popularModelIds: ["byd-atto-3", "byd-song-plus", "chery-tiggo-8"],
    evNote:
      "Myanmar has reduced import duties for electric vehicles to encourage adoption, though exact current rates were not confirmed in the sources reviewed. Charging standard should be confirmed against the local network — verify EV treatment with the Ministry of Commerce.",
  },
  rwanda: {
    overview:
      "Rwanda is a left-hand-drive East African market with no fixed vehicle age limit — eligibility is driven by Euro 4 emissions compliance (EAC standard EAS 1047:2022). Imports clear through the Rwanda Electronic Single Window (ReSW) with a Rwanda Standards Board physical inspection, and the landlocked country transits vehicles via Mombasa (Kenya) or Dar es Salaam (Tanzania). Fully electric vehicles enjoy a full tax exemption until 30 June 2028.",
    considerations: [
      "Euro 4/IV emissions compliance (EAS 1047:2022) is the eligibility filter rather than a fixed age limit — confirm the certificate of conformity with RRA.",
      "EVs are fully exempt from duty, VAT, excise and withholding tax until 30 June 2028; hybrids lost their full exemption from July 2025.",
      "Landlocked — vehicles transit via Mombasa or Dar es Salaam, then travel by road; factor in transit time and cost.",
    ],
    faq: [
      { q: "Is Rwanda right- or left-hand drive?", a: "Left-hand drive (LHD)." },
      { q: "Is there an age limit?", a: "No fixed age limit — Euro 4 emissions compliance (EAS 1047:2022) is the filter." },
      { q: "What EV incentive applies?", a: "Fully electric vehicles are exempt from duty, VAT, excise and withholding tax until 30 June 2028." },
      { q: "Which port handles imports?", a: "Kigali, via Mombasa (Kenya) or Dar es Salaam (Tanzania) transit." },
    ],
    popularModelIds: ["byd-atto-3", "byd-seal", "byd-dolphin"],
    evNote:
      "Rwanda fully exempts electric vehicles from import duty, VAT, excise and withholding tax until 30 June 2028 — a strong incentive versus the 25% standard duty. Hybrids now pay tiered excise and 18% VAT. Confirm current status with RRA.",
  },
  malawi: {
    overview:
      "Malawi is a right-hand-drive Southern African market that is landlocked — vehicles ship to Dar es Salaam (Tanzania) by RoRo and travel onward by road. Its 2025 EV import rules exempt fully electric vehicles from import duty, cut EV VAT to 8%, waive excise for EVs under 100 kW and apply no age limit to EVs, making it an increasingly attractive destination for Chinese new-energy vehicles.",
    considerations: [
      "RHD is mandatory — source RHD export units.",
      "Malawi's 2025 EV rules give full EVs 0% import duty + 8% VAT + excise-free (<100 kW) with no age limit; combustion vehicles are reported limited to about 10 years.",
      "Landlocked — vehicles transit via Dar es Salaam; factor in transit time and cost.",
    ],
    faq: [
      { q: "Is Malawi right- or left-hand drive?", a: "Right-hand drive (RHD)." },
      { q: "What EV incentive applies?", a: "2025 rules: 0% import duty, 8% VAT and excise-free (<100 kW) for fully electric vehicles, with no age limit." },
      { q: "What taxes apply to combustion vehicles?", a: "About 25% import duty, 0–110% excise and 16.5% VAT — verify with MRA." },
      { q: "Which port handles imports?", a: "Lilongwe, via Dar es Salaam (Tanzania) transit." },
    ],
    popularModelIds: ["byd-atto-3", "mg-4", "byd-dolphin"],
    evNote:
      "Malawi's 2025 EV import rules (0% duty + 8% VAT + excise-free under 100 kW + no age limit) make recent Chinese EVs a strong fit, versus a 25% duty + 16.5% VAT + 0–110% excise stack for combustion vehicles. Confirm current figures with MRA.",
  },
  albania: {
    overview:
      "Albania is a left-hand-drive European market that restricts used-vehicle imports to about 10 years of age plus Euro 4/5 emissions. Customs clearance runs through the General Directorate of Customs (DPD) on the ASYCUDA World system, with Durrës as the main RoRo port. Vehicles face a 10% MFN duty plus 20% VAT, and the EV VAT exemption is limited to new vehicles only.",
    considerations: [
      "About a 10-year age limit plus Euro 4/5 emissions — confirm the current cut-off with DPD before sourcing stock.",
      "The EV VAT exemption (Article 51(p)) applies to new vehicles only — used EVs pay full 20% VAT.",
      "Commercial imports require an Albanian NIPT (business tax ID); ASYCUDA World declaration applies.",
    ],
    faq: [
      { q: "Is Albania right- or left-hand drive?", a: "Left-hand drive (LHD)." },
      { q: "What is the age limit?", a: "About 10 years plus Euro 4/5 emissions — verify with DPD." },
      { q: "What duty and VAT apply?", a: "10% MFN import duty plus 20% VAT." },
      { q: "Do EVs get a VAT exemption?", a: "Only new EVs — used EVs pay full 20% VAT (Article 51(p) VAT Law)." },
      { q: "Which port handles imports?", a: "Durrës." },
    ],
    popularModelIds: ["byd-atto-3", "geely-monjaro", "chery-tiggo-8"],
    evNote:
      "Albania exempts new electric vehicles from VAT under Article 51(p), but the exemption does not extend to used EVs — used EV imports pay the full 20% VAT plus 10% MFN duty. This is a key cost caveat for the used-EV trade.",
  },
  moldova: {
    overview:
      "Moldova is a left-hand-drive European market that has had no vehicle age limit since 1 January 2021. Excise duty is keyed to engine displacement and age, so electric vehicles (no displacement) are excise-free; VAT of 20% is set to apply from 2027 under the draft fiscal policy. Vehicles clear through the Danube port of Giurgiulesti.",
    considerations: [
      "No age limit since 2021 — model-year flexibility is a key advantage.",
      "EVs are excise-free (no engine displacement); from 2027 EVs pay 20% VAT plus the 0.4% customs procedures fee.",
      "Declarations must be submitted within 72 hours of import; clearance is via Giurgiulesti.",
    ],
    faq: [
      { q: "Is Moldova right- or left-hand drive?", a: "Left-hand drive (LHD)." },
      { q: "Is there an age limit?", a: "No age limit since 1 January 2021." },
      { q: "What EV incentive applies?", a: "EVs are excise-free (no engine displacement); 20% VAT applies from 2027." },
      { q: "Which port handles imports?", a: "Giurgiulesti (Danube)." },
    ],
    popularModelIds: ["byd-atto-3", "byd-seal", "geely-monjaro"],
    evNote:
      "Moldovan excise is engine-displacement based, so electric vehicles are excise-free. From 1 January 2027 (draft fiscal policy) EVs pay 20% VAT plus the 0.4% procedures fee. Confirm current VAT treatment with the Customs Service.",
  },
};
