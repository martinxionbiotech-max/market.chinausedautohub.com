// MARKET 站编辑部内容：每国概述 / 注意事项 / FAQ / 代表车型 / EV / SUV 摘要
export const regionMeta: Record<string, { label: string; label_zh: string }> = {
  "middle-east": { label: "Middle East", label_zh: "中东" },
  africa: { label: "Africa", label_zh: "非洲" },
  "central-asia": { label: "Central Asia", label_zh: "中亚" },
  "south-asia": { label: "South Asia", label_zh: "南亚" },
  "latin-america": { label: "Latin America", label_zh: "拉丁美洲" },
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
};
