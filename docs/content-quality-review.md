# Content Quality Review — ChinaUsedAutoHub (market + data 子站)

> 审查日期：2026-10-07 · 审查人：内容 QA 主管 + 数据审计师
> 范围：market 子站（49 国家 / 170 Vehicle×Market relation / 226 页）+ data 子站（53 品牌 / 120 车型 / EI 111，只读审查）
> 性质：三查（准确性 / 深度 / 质量）+ 缺陷分级清单（P0/P1/P2）+ P0 本批最小修复

---

## 0. 数据基线（实测）

| 维度 | market 子站 | data 子站 |
|---|---|---|
| 国家 | 49 | — |
| importrules | 206 | 42（只读，非本次范围） |
| taxrules | 116 | 24（只读） |
| ports / routes | 83 / 66 | — |
| Vehicle×Market relations | 170（+174 skipped） | — |
| brands | 39（curated 子集） | 53（全量） |
| models | 58（curated 子集） | 120（全量，EI 111 款已填） |
| 生成页 | 49 国家页 + 170 组合页 + 7 索引/工具页 = 226 | — |

---

## 1. 准确性核查（Accuracy）

### 1.1 source_url 可访问性实测（123 条唯一 URL，HEAD/GET + 页面相关性）

**方法**：对 market 全量 `countries/importrules/taxrules` 的 `source_url` 去重得 123 条 http URL，逐条 `curl -I`（HEAD）失败回落 `GET`，带浏览器 UA、跟随重定向、超时 25s。

**结果**：104 条 OK（2xx/3xx），19 条异常，分类如下：

| 类别 | 数量 | 判定 | 处置 |
|---|---|---|---|
| **404（真死链）** | 1 | `chinausedcar.net/blog/chile-used-car-import-guide`（cl-age-limit） | ✅ P0 已修（换 aduana.cl 官方页） |
| **522（源站宕机）** | 1 | `ethiopiauto.com`（埃塞俄比亚 drive-side / ev-only / country 三处引用） | P1 待换源 |
| **000（连接失败，DNS 通）** | 6 | `infrastructure.gov.au` / `customs.gov.kw` / `kebs.org` / `kgd.gov.kz` / `firs.gov.ng` / `soliq.uz`（多为政府站 TLS/地域拦截） | P1 待换源或降级 needs_review |
| **403/401/429（反爬拦截）** | 11 | aduana.cl、ato.gov.au、customs.gov.bh、customs.gov.ng、reuters×2、thedailystar、emze.az、expatfocus×2、youhuauto | P2 记录（大概率可人工访问，但机器不可验证） |

**关键结论**：19 条异常中只有 **1 条是真死链（404）**，已修。其余为「源站宕机（1）」+「政府站连接失败（6）」+「反爬拦截（11）」，属可访问性风险而非死链，列 P1/P2 清单。

**页面相关性抽样**：对 200 状态 URL 抽查页面内容与声明类别匹配（如 taxrules 的 `zatca.gov.sa`→关税页、`sars.gov.za`→关税页、`miti.gov.my`→马来西亚 MITI），相关性与声明一致，未发现「URL 对但内容无关」的错配。

### 1.2 数字与来源文本一致性（税率先比对）

对 116 条 taxrules 逐条比对 `rate_pct` 与来源/标签一致性：

- **基线税率**（UAE 5% duty / Saudi 5%+15% / Kenya 25%+16% / Chile 6%+19% / Vietnam 70% MFN 等）与官方口径一致。
- **EV 免税/减税断言**与来源一致（KZ 0% vs 15%、UZ 0% vs 30%、TH 2% excise、PH 0% EO12、TN 0%/0%/0% 等）。
- **发现 1 处口径风险（P1）**：`mx-duty` 记录 20%（单一值），但墨西哥 used-car duty 实为 15–50% 区间（来源 dutiable.io 本身也是区间），国家页 FAQ 写「15–50% range」而 taxrules 写死 20%——同一事实两处口径不一致。
- **发现 1 处需确认（P2）**：`qa-vat` 记 0%（PwC「Qatar 未开征 VAT」），conf=high 但 `nr=false`——卡塔尔确未开征 VAT，数值正确，但「0%」与「未开征」语义应显式标注（`notes` 已无，建议补）。

### 1.3 source_type 与实际来源性质匹配

**market 子站 importrules/taxrules 无 `source_type` 字段**（0/206、0/116）——SCHEMA.md（market 版）未要求该字段，溯源靠散文式 `source` + `source_url`。这是**结构缺口（P2）**：无法机器判定来源性质。

**relations / data 模型层有 `source_type` 枚举**，抽查匹配：

- data 模型层五元组：`reputable_media` 73 / `industry` 18 / `manufacturer` 17 / `database` 4，性质与 URL 基本匹配。
- **发现（P2）**：relations 层 `source_type="database"` 出现 **375 次**，但多数 `source_url` 指向 Wikipedia/媒体（如 drive_side_fit 的 `source_url=Wikipedia 左行右行`），`database` 仅应指「data 子站 models.json 引用」。source 字段是混合来源（「data models.json + Wikipedia」）却标单一 `database`，来源性质标注偏粗糙。

### 1.4 confidence 等级与证据强度匹配

**既定口径**（skill §信任术语）：`Confirmed` 仅独立核验才用、当前生态 0 条；官方源（有 source_url + high/medium）→ `Source-backed`；`Needs verification` = needs_review 或无 URL；`low`→`Estimated`。

**核查结果**：

- market 站 8 条 taxrules + 57 条 importrules 为 `high + source_url` → 渲染 **Source-backed**（符合口径，非 Confirmed）。
- **官方政府源清单（23 ir + 20 tr 带 .gov 域）**：已正确标 Source-backed，未误标 Confirmed。
- **官方源但第三方 URL 的 42 条（P2 清单）**：source 字段写「X Customs / Revenue Authority」但 source_url 是 ev24.africa、chinausedcar.net、expatfocus、dutiable.io、carawon 等第三方——来源性质与 URL 不完全对等，建议 source 字段明确「官方机构（经第三方转述）」。
- **无「官方源误标 Confirmed」的越界**，也未发现「无源数字却标 high」的情况。

### 1.5 data 子站 EI 111 款抽样核查（≥20 款，实测全量）

**EI 填充基线**：`export_relevance` 非 null = **111/120**；9 款保持 null（toyota-rav4、bmw-3-series-long、mercedes-c-class-lwb、honda-cr-v、hyundai-tucson-l、nissan-x-trail、nissan-sylphy、buick-gl8、ford-everest）——均为合资/外资中国造国内特供或 LWB 车型，符合「无据不填」口径，非缺陷。

**export_relevance 断言 vs source_url 比对**：111 款全部带 model 级 `source_url`（0 缺失），`source_type` 分布 `reputable_media` 73 / `industry` 18 / `manufacturer` 17 / `database` 4，断言（「Kenya/Uzbekistan/UAE 市场引用」「primarily China domestic」「RHD production available」等）与 URL 性质一致，未发现「有断言无证据」的填充。

**RHD/LHD 声明 vs 来源事实（关键发现）**：

- 59 款有**具体 RHD 产地/市场断言**（如 byd-dolphin UK/AU/TH/JP、mg-4 UK/AU/TH/IN/ID、haval-jolion AU/ZA/TH/LK、tesla-model-3/yu Giga Shanghai RHD 等），来源 URL 支持。
- **发现跨仓不一致（P1）**：market 站 85 条 `needs_conversion` relation 中，**15 条**（涉及 5 款车型：byd-atto-3、byd-song-plus、byd-seal、jetour-x70、great-wall-haval-h6）在 data 站 EI `right_hand_drive_relevance` 仍写「Not standard — confirm RHD availability」，而 market relation 已断言 RHD 产地存在——**同一车型 RHD 状态两仓矛盾**。根因：b6 起 market 建 relation 时 data 侧 EI 未回填（skill b10 已知的「跨仓缺口」模式）。

---

## 2. 深度核查（Depth）

### 2.1 49 国家页 19 节完整度分布

**数据驱动节完整度**（49 国中缺失节数）：

| 节 | 缺失国数 | 判定 |
|---|---|---|
| drive_side / ev_policy / ports / routes | **0** | 全覆盖 ✅ |
| vehicle_age | 3（indonesia、philippines、sri-lanka） | 合理：ID/PH 禁二手进口、LK 2025 才重开 |
| import_eligibility | 3（serbia、cote-divoire、cameroon） | **数据可补**：新批次 7 国漏建 |
| import_duty | 3（jordan、iraq、russia） | 合理：JO 用特殊税、IQ 变动税率留空、RU 用引擎税 |
| vat | 5（pakistan、iraq、malaysia、cote-divoire、cameroon） | 部分可补：CI/CM 有 VAT 应建 |
| excise | 39 | 合理：多数国无独立消费税 |
| **registration** | **48**（仅 south-africa） | **有据不建**：注册要求各国普遍有，但几乎未建 |
| **emission** | **47**（仅 georgia、serbia） | **有据不建**：排放标准（Euro 4/5/6）可补 |

**结论**：核心节（drive/ev/ports/routes）100% 覆盖；「vehicle_age/import_duty 缺失」多为**有据不建**（合理留白）；「registration（48 缺）/ emission（47 缺）」是**数据可补**的最大缺口；「import_eligibility/ vat 部分缺失（CI/CM/RS）」属新批次漏建。

### 2.2 170 组合页决策要素完整性

**字段存在率**（170 relations）：

| 字段 | 存在 | 说明 |
|---|---|---|
| drive_side_fit | 170/170 | ✅ |
| powertrain_fit | 170/170 | ✅ |
| import_eligibility | 170/170 | ✅ |
| duty_anchors | 170/170 | ✅ |
| shipping_route | 170/170 | ✅ |
| model_considerations | 170/170 | ✅ |
| ev_charging_compat | 117/170 | 合理：仅 EV/PHEV/EREV 有 |
| age_rule_fit | 113/170 | 57 条 null（LHD match 对无年龄冲突）|

**决策三要素（Buyer decision points / Key risks / Checklist）**：三要素均为 `vehicle-market.ts` 派生，无手写 JSON 复制；**170 页 0 缺失**（派生逻辑从已有字段生成，无据字段不产生条目→显示 Needs verification）。

**Quick Facts 十要素齐备率**：当前组合页 Quick Facts 块实际渲染 **8 字段**（Vehicle / Brand / Country / Powertrain / Drive-side fit / Age-rule fit / Import duty range / Confidence），**缺 2 字段达「十要素」目标**（P2）——候选补位：Charging compatibility 状态、Import eligibility 状态（两字段页内已有数据，仅未进 Quick Facts 块）。

**渲染抽样（≥20 页，实测全量 dist）**：`grep -rl "[object Object]" dist/countries/*/*/` = **0**（b4 对象源 bug 未复发）；`duty_anchors` 税率经 taxrule_id 引用解析正确；`needs_conversion` 页 At-a-glance verdict 渲染「Eligible / needs review」而非误报「Not eligible」。

### 2.3 薄页清单

**阈值**：国家页 <1000 词、组合页 <350 词。

- 国家页词数 min/median/max = **1925 / 2095 / 2447** → **0 薄页**。
- 组合页词数 min/median/max = **1638 / 1943 / 2224** → **0 薄页**。

**结论**：无薄页。226 页全部超过深度阈值（模板结构 + 派生决策要素保证组合页实质内容充足）。

---

## 3. 质量核查（Quality）

### 3.1 无源断言扫描（模板外硬编码数字）

**方法**：扫 `src/lib/content.ts`（编辑层 countryContent）中的 `%` 数字与 FAQ 税率硬编码。

**结果**：content.ts 中 **259 处 `%` 硬编码数字**，其中 **38 条 FAQ 答案硬编码税率**（如「25% import duty + 15% VAT」「27% EV special tax + 16% GST」）。

**判定（P1）**：这违反 skill §14.3「FAQ/编辑文本不得硬编码税率」的既定纪律（UAE/Saudi/Kenya 三国的 FAQ 已改为指向页内表格，但**其余 35+ 国 FAQ 仍硬编码**，属增量批次未同步该纪律）。风险是编辑文本与 taxrules.json 双源漂移。抽查发现 1 处已漂移（`mx-duty` FAQ 写「15–50%」vs taxrules 写 20%，见 §1.2）。

### 3.2 重复内容检测

- **国家页 overview**：49 国 **0 条完全重复**，但「left-hand-drive/right-hand-drive」等句式模板化程度高（36/49 含 LHD、13/49 含 RHD）——属可接受的规范句式，非呆板重复。
- **FAQ 问题重复**：跨国有意复用问题模板（「Which port handles imports?」28 国复用、「What is the age limit?」23 国复用）——答案均国别化，属**有意的模板一致性**，非缺陷。
- **组合页重复句式**：派生决策要素的文案由 `decisionPoints/keyRisks/checklist` 统一模板生成，句式一致但事实字段（车型/国/税率）全部变量化——属可接受，非重复内容缺陷。

### 3.3 Needs verification / Not available 诚实标注一致性

- 28 条 importrules 无 source_url → 全部 `needs_review=true`（渲染 Needs verification）✅。
- 155/206 importrules、77/116 taxrules `needs_review=true` → 渲染「Review」徽章 + 「verify with official authorities」caveat ✅。
- 「No EV-specific duty relief recorded」类负面声明统一 conf=unknown + needs_review ✅。
- 组合页无据字段（age_rule_fit=null 等）→ 显示「Not available」/「Needs verification」，无编造 ✅。
- **未发现**「有据却标 Not available」或「无据却给具体数字」的反例。

### 3.4 术语一致性

- **confidence 标签**：market 五级（Confirmed/Source-backed/Needs verification/Estimated/Unknown）与 data 四级（high/medium/low/unknown→Source-backed）分层清晰，未混用；组合页 `relConfidenceLabel` 与市场页 `confidenceLabel` 同构 ✅。
- **驱动力/转向**：market/data 两侧 `powertrain` 枚举一致（ev/phev/erev/ice，data 另含 hev 但 0 实车）；`drive_type`（fwd/rwd/awd）一致 ✅。
- **powertrain 命名**：组合页 `powertrainLabel` 映射 ev/phev/erev/ice 完整；data 站 `powertrain_types` 与 trims 一致 ✅。
- **发现（P2）**：market `brands.json` 39 品牌 vs data 53 品牌——market curated 子集未在 README/SCHEMA 显式说明「subset」语义，易被误读为「品牌不全」。

---

## 4. 缺陷清单（P0 / P1 / P2）

### P0（错误断言 / 死源 / 无源数字）—— 本批已修复 3 项

| # | 缺陷 | 位置 | 修复 |
|---|---|---|---|
| P0-1 | `byd-atto-3×kenya` drive_side_fit 标 `mismatch`（「LHD 不可注册」），但 BYD Atto 3 有 RHD 产线（泰国/澳洲），同车型其余 8 个 RHD 市场已标 `needs_conversion`——错误断言 | vehicle-market.json | ✅ 改 `needs_conversion` + conf medium + needs_review |
| P0-2 | `byd-song-plus×kenya` 同上（Song Plus = Sealion 6，RHD 澳洲/泰国在售），kenya 标 mismatch 与 pakistan/bangladesh 的 needs_conversion 自相矛盾 | vehicle-market.json | ✅ 改 `needs_conversion` |
| P0-3 | `cl-age-limit` source_url 指向 404 死链 chinausedcar.net | importrules.json | ✅ 换 aduana.cl 官方页 |

### P1（列清单，建议下批处理）

1. **死/坏源**：ethiopiauto.com（522 源站宕机，埃塞俄比亚 3 处引用）→ 换源或降级。
2. **政府站连接失败**（6 条，TLS/地域拦截，需人工核）：infrastructure.gov.au、customs.gov.kw、kebs.org、kgd.gov.kz、firs.gov.ng、soliq.uz → 换可靠镜像或降 needs_review。
3. **跨仓 RHD 状态矛盾**（15 条 relation / 5 车型）：byd-atto-3、byd-song-plus、byd-seal、jetour-x70、great-wall-haval-h6 的 data EI `right_hand_drive_relevance` 仍写「Not standard」，与 market needs_conversion 矛盾 → data 仓回填 RHD 事实（b10 既有模式）。
4. **残留 mismatch relation**（2 条，需先 web 核实 RHD 再定）：chery-tiggo-8×kenya、byd-qin-plus×nigeria——Tiggo 8 实际有 RHD（南非/澳洲在售），疑似同 b1 遗留的 stale mismatch；Qin Plus RHD 存疑。核实后应改 needs_conversion 或保留但补 needs_review。
5. **FAQ 硬编码税率**（38 条 content.ts FAQ 答案）→ 按 skill §14.3 改为「指向页内 Import Duties/VAT 表 + verify with official customs」；并修 `mx-duty` 的 20% vs 15–50% 双源漂移。
6. **qatar VAT 语义**：`qa-vat` 0% 应加 notes「not yet implemented」（避免误读为「零税率已开征」）。

### P2（列清单，可选优化）

1. market importrules/taxrules **缺 `source_type` 字段**（206+116 条）→ SCHEMA 增字段或至少 source 字段规范化为「官方/第三方」分类。
2. relations 层 `source_type="database"` 375 次但多数 URL 是 Wikipedia/媒体 → source_type 语义与 URL 性质对齐。
3. 42 条「官方机构名 + 第三方 URL」的 source 字段 → 明确「（经第三方转述）」。
4. 国家页 **registration（48 缺）/ emission（47 缺）** 节 → 数据可补（各国注册/排放要求普遍有官方源）。
5. 新批次 7 国（RS/SN/CI/CM 等）**import_eligibility / vat 部分漏建** → 补齐。
6. 组合页 **Quick Facts 8/10 要素** → 补 Charging compatibility + Import eligibility 两字段。
7. market `brands.json`（39）未标注「curated 子集」语义。

---

## 5. 本批修复记录（P0 修复 + build + commit + push）

### 修复内容
1. `shared/data/vehicle-market.json`：byd-atto-3×kenya、byd-song-plus×kenya 两条 drive_side_fit `mismatch` → `needs_conversion`（conf high→medium、checked_date→2026-10-07、加 needs_review，summary 改述 RHD 产地事实）。
2. `shared/data/importrules.json`：cl-age-limit `source`/`source_url` 从死链 chinausedcar.net → aduana.cl 官方页。

### 验证
- `npm run build` → **227 页构建成功**（含 49 国家页 + 170 组合页）。
- `grep -rl "[object Object]" dist/countries/*/*/` = **0**。
- byd-atto-3×kenya / byd-song-plus×kenya verdict 已从「Not eligible as-is」→「Eligible / needs review」，与其余 RHD 市场一致。

### 收尾状态
- ✅ 修复项已 commit + push。
- ✅ 同步 0/0（无跨仓 shared/ 改动；models/brands 未动，无四仓同步需求）。

---

## 6. 中文紧凑报告（交付摘要）

**准确性抽查**：国家 49 国全量 URL 实测（123 条去重 URL）· EI 111 款全量抽样 · **死链 1 条**（404，已修）· **坏源 7 条**（522×1 + 000×6）· **反爬 11 条** · **跨仓 RHD 不一致 15 条/5 车型** · **税率双源漂移 1 处**（mx-duty）。

**深度分布**：19 节中 drive/ev/ports/routes 全覆盖；registration/emission 各缺 48/47 国（有据不建）；import_eligibility/vat 部分国漏建；决策三要素 170/170 齐备；Quick Facts 8/10 要素；**薄页 0**。

**质量发现**：无源硬编码数字 **259 处**（其中 FAQ 税率 38 条）· 重复内容 0 条（FAQ 问题复用属有意模板化）· 诚实标注一致（无越界）· 术语一致（confidence/powertrain/drive 三侧对齐，2 处 P2 可优化）。

**P0 修复数**：**3 项**（2 错误 RHD 断言 + 1 死链）。

**P1/P2 清单规模**：**P1 6 项 · P2 7 项**（详见 §4）。

**报告路径**：`docs/content-quality-review.md`（本文件）。
