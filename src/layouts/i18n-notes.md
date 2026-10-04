# i18n / hreflang 接入方案（语言就绪说明）

状态：**语言就绪（language-ready）**，未翻译。本文件是给后续本地化工作的接入方案，不建实际翻译页。

## 目标
让 MARKET 子站（及整个生态）未来可新增语言（如 zh / ar / ru），而不破坏现有英文站的 SEO 与数据契约。

## 方案

### 1. URL 结构（目录式语言前缀）
- 英文（默认，保持现状）：`/`、`/countries/kenya/` …
- 新增语言：`/zh/`、`/ar/`、`/ru/` 前缀，例如 `/zh/countries/kenya/`
- 默认语言（en）不带前缀，避免改动现有 canonical 与内链。

### 2. hreflang 接入
在 `BaseLayout` 的 `<head>` 中，为每页输出 `hreflang` 与 `x-default` 交替链接。约定通过页面 frontmatter 传入 `lang` 与 `alternates`：

```astro
// 未来在 BaseLayout Props 增加：
interface Props {
  // ...
  lang?: string;            // 当前页语言，默认 "en"
  alternates?: { lang: string; url: string }[];
}
```

输出示例（英文页）：

```html
<link rel="alternate" hreflang="en" href="https://market.chinausedautohub.com/countries/kenya/" />
<link rel="alternate" hreflang="zh" href="https://market.chinausedautohub.com/zh/countries/kenya/" />
<link rel="alternate" hreflang="x-default" href="https://market.chinausedautohub.com/countries/kenya/" />
```

### 3. metadata 可本地化
- `title` / `description` 目前由各页面 frontmatter 硬编码为英文。
- 本地化时抽出到字典（如 `src/i18n/zh.ts`），页面按 `lang` 取文案。
- 数据内容（countries.json 的 `name` / `name_zh` 等）已含中文名，页面只需按语言切换渲染字段。

### 4. 数据契约影响
- `shared/data/*.json` 已有 `name_zh` 等字段；新增语言时在 schema 追加对应字段（如 `name_ar`），不改变现有字段语义。
- 法规文本（importrules / taxrules 的 `rule_text`）本地化风险最高：翻译须保留 `source` / `confidence` / `needs_review` 徽标，且不得改写数字。

### 5. 建议实施顺序
1. 先接 hreflang + `x-default`（不翻译，指向英文），保证未来上线语言时旧页不被判为重复内容。
2. 再做 metadata 字典化。
3. 最后翻译页面与法规文本（法规翻译需逐条人工核实）。

## 当前不做
- 不建实际翻译页、不生成 `/zh/` 等路由。
- 不引入 i18n 路由中间件，避免增加构建复杂度。
