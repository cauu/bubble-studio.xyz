# Bubble Studio / Pao Studio GEO 诊断

诊断日期为 2026-09-02。范围为站点级只读诊断，目标是检查公开页面的可发现性、实体清晰度、可回答性、证据与引用准备度、结构化可提取性及新鲜度。

本报告按 `geo-diagnose` 的诊断方法与 Audit Catalog 1.0.0 生成。由于 Cola 安装包未携带入口脚本依赖的 `geo_seo_hub` Python 运行时，官方执行器无法启动，因此这是明确标记的手工降级报告，不是 Artifact Bus 运行目录，也不包含任何实时 AI 平台召回率、排名或引用份额结论。

## 来源范围

公开 HTML 快照：

- `https://www.bubble-studio.xyz/`，SHA-256 `1692abb5e9ec...`
- `https://www.bubble-studio.xyz/projects`，SHA-256 `9811b7913af1...`
- `https://www.bubble-studio.xyz/skills`，SHA-256 `49ff09b3fa48...`
- `https://www.bubble-studio.xyz/blogs`，SHA-256 `972ecc5762a2...`
- `https://www.bubble-studio.xyz/governance`，SHA-256 `93d422a51761...`
- 一篇公开博客文章，SHA-256 `1048d8e8da5d...`

本地实现证据，以下为诊断时的修复前哈希：

- `src/middleware.ts`，SHA-256 `71cfa823a177...`
- `src/app/[locale]/blogs/[slug]/page.tsx`，SHA-256 `f41ec3c2508c...`
- `src/app/[locale]/layout.tsx`，SHA-256 `6b38dd989935...`
- `src/app/sitemap.ts`，SHA-256 `a12601fa7bd9...`
- `src/services/pool.ts`，SHA-256 `c9d2f07a9a75...`

修复后的工作树哈希：

- `src/middleware.ts`，SHA-256 `77c090f1a9ef...`
- `src/app/[locale]/blogs/[slug]/page.tsx`，SHA-256 `ecc27d434ad9...`
- `src/services/pool.ts`，SHA-256 `0b6e2b128a72...`

## 结论

站点主体内容具备良好的基础语义结构。首页、项目页、Skills 页和博客页均有唯一 H1、`main` 区域、合理的标题描述与较多可抓取正文。主要阻塞集中在发现性、文章规范化、结构化数据、治理页服务端内容和证据透明度。

## 修复进度

以下 P0 修复已在当前工作树完成，尚待部署到生产环境：

- 国际化 middleware 已排除 `robots.txt` 与 `sitemap.xml`。本地生产服务复核两条路由均返回 200，并分别提供 `text/plain` 与 `application/xml`。
- 博客文章已生成页面级 canonical、Open Graph URL 和三个语言版本的 alternate URL。英文使用无语言前缀路由，中文与繁体中文使用各自前缀和文件后缀。
- Koios 错误日志已改为脱敏输出。无响应错误仅记录错误码与消息，不再输出 Axios 请求配置或 Authorization 头。

### P0

1. 线上 `robots.txt` 与 `sitemap.xml` 均返回 404。仓库虽然定义了两条 Metadata Route，但国际化中间件 matcher 没有排除它们。搜索与 AI 抓取入口因此缺失。当前工作树已修复，待部署。

2. 博客文章的 canonical 继承为站点首页，hreflang 也指向三个语言首页；同时 Open Graph URL 对英文文章生成了实际路由体系中不使用的 `/en/blogs/...`。这会合并错误页面信号并削弱文章级引用身份。当前工作树已修复，待部署。

3. 外部 API 请求失败时，代码直接记录完整 Axios 错误对象。构建实测中请求配置的 Authorization 头被输出。当前工作树已修复日志脱敏；已经进入日志的令牌仍需立即轮换。

### P1

1. 五个代表页和抽样文章均未发现 JSON-LD。建议至少为站点添加 `Organization` 或适合当前品牌形态的实体 schema，为文章添加 `BlogPosting`，并为项目或软件条目选择匹配其真实属性的 schema。所有字段应来自页面可见事实。

2. 治理页服务端 HTML 仅约 197 个可见字符，没有 H1、H2 或文章主体。核心信息依赖客户端请求，导致无脚本抓取器几乎无法理解页面。应服务端输出稳定的页面标题、解释文本和可索引摘要，再渐进增强动态治理数据。

3. canonical 使用 `https://bubble-studio.xyz`，而公开请求会 308 到 `https://www.bubble-studio.xyz/`。规范地址应统一为最终 200 URL，避免每个 canonical 都先经历重定向。

### P2

1. sitemap 对全部静态页和文章使用运行时 `new Date()` 作为 `lastModified`，会把构建或请求时间误报成内容更新时间。文章应使用 front matter 日期，静态页应使用真实更新时间或省略该字段。

2. 根布局把 `viewport` 与 `themeColor` 放在 Metadata 返回值中。Next.js 14 构建持续提示应迁移到独立 viewport export。

3. 繁体中文路由代码 `tw` 被直接用于 HTML `lang`、hreflang 与 Open Graph locale。路由可继续叫 `tw`，但公开语言标识宜映射为标准值，例如 `zh-Hant` 与 `zh_TW`。

## Audit Catalog 当前状态

| 审计项                    | 状态             | 证据摘要                                                   |
| ------------------------- | ---------------- | ---------------------------------------------------------- |
| entity clarity            | pass             | 首页清楚说明主体、定位、产品与收入构成                     |
| evidence density          | fail             | 核心主张缺少页面内来源、日期与可核验证明                   |
| citation readiness        | fail             | 文章 canonical 已修复，但代表页仍没有 JSON-LD              |
| authority signals         | missing-evidence | 有作者名和项目链接，但缺少可验证组织与作者实体连接         |
| freshness signals         | fail             | 博客有日期，sitemap 却统一写入当前时间，结构化更新时间缺失 |
| structured data validity  | missing-evidence | 抽样页面未发现 JSON-LD，无法进行有效性验证                 |
| answerability             | fail             | 多数页面结构较好，但治理页服务端正文几乎为空               |
| comparison completeness   | not-applicable   | 本次抽样不以对比或榜单页面为对象                           |
| source transparency       | fail             | 核心品牌与产品主张缺少来源谱系                             |
| content extraction health | fail             | 四个页面可提取性良好，但治理页与发现入口存在严重缺口       |

未计算聚合分数。缺失证据与不适用项不应进入分母，且上游运行时缺失使原始评分组件无法被官方执行器重建。

## 验证记录

- `pnpm build` 成功完成，生成 27 个静态页面。
- 构建出现 Metadata API 的 viewport/themeColor 告警。
- Koios 在受限网络下解析失败，但首页使用 fallback 数据继续生成。
- 公开首页可返回 200；裸域会 308 到 `www`。
- 公开 `robots.txt` 与 `sitemap.xml` 已用独立 HEAD 请求复核为 404。

## 建议修复顺序

先修复 middleware 排除规则与博客文章 canonical/hreflang/OG URL，再对错误日志做脱敏和令牌轮换。随后补齐 Organization、BlogPosting 等结构化数据，并让治理页输出稳定的服务端摘要。最后统一域名与语言代码，校正 sitemap 新鲜度字段。

## S0001 完成后复核

本节是 2026-09-02 16:16 +08:00 对本地生产构建的追加复核，未覆盖或删除前面的生产基线。改动尚未部署，因此这里的通过状态只代表当前 commit 序列与本地生产响应。

复核严格限制为五个代表性 HTML URL，另检查两个站点发现入口：

- 首页 `/`，SHA-256 `e2d0dbfc090c...`
- 简体中文项目页 `/zh/projects`，SHA-256 `f58fde396683...`
- Skills 页 `/skills`，SHA-256 `d25f678af98e...`
- Governance 页 `/governance`，SHA-256 `8499ebb5f60e...`
- 英文文章 `/blogs/20260405-subscriptions-are-failing-en`，SHA-256 `515d1794224c...`
- `robots.txt`，SHA-256 `3b1ca0320368...`
- `sitemap.xml`，SHA-256 `793c167f8a55...`

### 复核结果

- 五个 HTML 抽样均返回 200，canonical 使用最终 `www` origin，并指向页面自身。
- HTML language、hreflang 与 Open Graph locale 使用 `en`、`zh-Hans`、`zh-Hant` 和 `en_US`、`zh_CN`、`zh_TW` 映射。复核中发现并移除了 next-intl 自动产生的旧 `zh`、`tw` HTTP alternate，避免重复冲突信号。
- 五个页面的 Organization 与 WebSite JSON-LD 均能通过 `JSON.parse`。文章额外包含 BlogPosting，发布日期 `2026-04-05`、作者 `Martin`、语言 `en` 和 mainEntityOfPage 均与页面事实一致。
- Governance 原始响应 HTML 含一个 H1、解释性导语和 Amaru 治理行动摘要，核心语义不依赖客户端 JavaScript。
- robots 返回 200 `text/plain`，sitemap 返回 200 `application/xml`。sitemap 共 60 个 URL，其中 15 个静态 URL 不声明虚假更新时间，45 个文章 URL 与仓库中的真实语言文件和 front matter 日期逐项匹配。
- `pnpm build` 与 TypeScript 通过；构建不再出现 viewport/themeColor 告警。Koios DNS 失败只输出错误码和消息，没有请求配置或 Authorization。

### Audit Catalog 复核状态

| 审计项                    | S0001 后状态   | 证据边界                                                   |
| ------------------------- | -------------- | ---------------------------------------------------------- |
| entity clarity            | pass           | 组织名称、站点、Logo、联系方式与受控外部资料形成稳定实体图 |
| evidence density          | fail           | 核心品牌、产品与行业主张仍缺少页面内一手来源               |
| citation readiness        | pass           | 抽样页 canonical、语言链接与 JSON-LD 可解析且一致          |
| authority signals         | partial        | 已连接组织资料，作者专页与更强外部证明留给后续 spec        |
| freshness signals         | pass           | 文章 sitemap 日期来自 front matter，静态页不伪造更新时间   |
| structured data validity  | pass           | 五页 Organization/WebSite 与一篇 BlogPosting 通过解析断言  |
| answerability             | pass           | 五页可提取，Governance 首屏已有标题、导语与治理摘要        |
| comparison completeness   | not-applicable | 本次抽样不包含对比或榜单页面                               |
| source transparency       | fail           | 内容证据谱系尚未建立                                       |
| content extraction health | pass           | 五个 HTML 抽样与两个发现入口均可直接读取                   |

未计算聚合分数，也未观察 Google/Bing 实时排名、流量、索引变化或任何 AI 平台的召回与引用份额。`geo-diagnose` 仍以手工降级模式执行，因为 Cola 安装包中的入口脚本缺少 `geo_seo_hub` 运行时。下一阶段应等 S0002 明确激活后，再选择一个对用户可见的主题中心页进行试点。

## S0002 完成后复核

本节是 2026-09-02 16:59 +08:00 对 S0002 本地生产构建的追加复核。改动尚未部署，因此只证明当前 commit 序列的技术与内容合同已通过，不表示搜索引擎已经抓取、收录或提高排名。

复核严格限制为五个 HTML URL，另检查 sitemap：

- 英文主题页 `/staking`，SHA-256 `d82c6c90dd51d69ebf9b64660fa290b138e393136d60f993f7cdf0d8419c513a`
- 简体中文主题页 `/zh/staking`，SHA-256 `548fe446872cfc65be473249f406d54bb66a043c413f045bde876545cb4f5c9d`
- 繁体中文主题页 `/tw/staking`，SHA-256 `ee52849e020817fc554448b3b936431a586b9bf2bdc26cc4f1b1dc6ec5e4528c`
- 首页 `/`，SHA-256 `da6d61e127d6933c637dcc7ede30af5ef4d6c324ca0f7fb85580355cc91ba4af`
- 项目页 `/projects`，SHA-256 `bce331faebd8dd1c82db2efe5dbfb32e74375fd471ce54c091719a3580151458`
- `sitemap.xml`，SHA-256 `5d25aec55aaf8c4785238af7d36039d490bdbee24a34af9a1a93cf0af5ec3d09`

### 复核结果

- 三个主题页均返回 200，具有 self-canonical、三语 hreflang、标准 HTML lang 与 Open Graph locale，且没有冲突的 HTTP hreflang。
- 原始 HTML 均包含唯一 H1、直接答案、八个主要章节、五步委托、五组可见 FAQ、官方来源、Pao Pool 完整 pool ID、浏览器入口和奖励不保证说明。
- WebPage、BreadcrumbList 与 FAQPage JSON-LD 均可解析。FAQPage 的五组问题和答案逐项存在于可见页面中，没有增加隐藏主张。
- 首页导航、首页正文与项目页提供 `/staking` 上下文入口；两组三语文章共六个文件回链到对应语言主题页，主题页反向连接三组相关文章。
- sitemap 共 63 个 URL，三个 staking URL 与 canonical 一致，且不声明虚假 `lastModified`。
- 375 × 812 与 1440 × 900 的浏览器验收中，页面宽度均无横向溢出；移动菜单、桌面导航、CTA、标题与矿池数据卡布局正常。
- `pnpm build` 生成 30 个静态页面；TypeScript、基础 SEO 验证器、S0002 验证器与 diff whitespace 检查通过。

### Audit Catalog 复核状态

| 审计项                    | S0002 后状态   | 证据边界                                                       |
| ------------------------- | -------------- | -------------------------------------------------------------- |
| entity clarity            | pass           | Cardano staking、Pao Pool 与 Pao Studio 的关系在可见正文中明确 |
| evidence density          | pass           | 机制与选择说明连接四个 Cardano 一手来源和两个链上浏览器        |
| citation readiness        | pass           | 三语 canonical、语言链接、直接答案、FAQ 与页面实体可稳定引用   |
| authority signals         | partial        | 协议来源和矿池身份可核验；作者与更强组织证明留给 S0004         |
| freshness signals         | pass           | 动态数据区分 live 与 fallback，sitemap 不伪造静态更新时间      |
| structured data validity  | pass           | WebPage、BreadcrumbList、FAQPage 与可见内容通过自动断言        |
| answerability             | pass           | 三语原始 HTML 均提供完整问题解释、步骤、边界与来源             |
| comparison completeness   | not-applicable | 页面提供选择清单，但不声称进行最佳矿池排名或全面比较           |
| source transparency       | pass           | 协议事实、矿池身份、动态数据来源和 fallback 状态均在页面公开   |
| content extraction health | pass           | 三语页面无需客户端 JavaScript 即可提取主要内容与结构化数据     |

本次仍是 `geo-diagnose` 手工降级复核，因为 Cola 安装包缺少执行器依赖的 `geo_seo_hub` 运行时。没有连接 Search Console、Bing 或实时 AI 平台，也没有观察或声称排名、流量、索引变化、AI 召回率或引用份额提升。

## S0002.1 机器优先入口修正复核

本节是 2026-09-02 17:14 +08:00 对本地生产构建的追加复核。用户确认将 staking 主题页从全站醒目入口降级为机器优先、低曝光的公开语义页面。页面没有按 User-Agent 分流，也没有隐藏内容或 `noindex`。

复核仍限制为五个 HTML URL，另检查两个非 HTML 发现入口：

- 英文主题页 `/staking`，SHA-256 `123fe5dedd181dd41b5380420b667361ad63a801697d7ea349b2dc828370f399`
- 简体中文主题页 `/zh/staking`，SHA-256 `966613938c7de141cf323e45c488ce96cc751791bead2db86cf0b29939c369e5`
- 繁体中文主题页 `/tw/staking`，SHA-256 `4c697b90fa3c6ed4c74d8601bf2eca4e6cce3e4cf0913e241ffc18a88603999b`
- 首页 `/`，SHA-256 `bead894c4c860fb4229ec2f2b529dffd56fc62b5afe71f3fa65d888abb9fd8e2`
- 项目页 `/projects`，SHA-256 `9c5dcd6235f8c1d65a4cf0509e04b4a00bb6ac053881865ee7f3ff63f7ce2971`
- `llms.txt`，SHA-256 `0709823e2bc7e126ffe52d17e88bc12d1ab5aa42c04ba09c6a6ab24d82b844df`
- `sitemap.xml`，SHA-256 `5d25aec55aaf8c4785238af7d36039d490bdbee24a34af9a1a93cf0af5ec3d09`

### 复核结果

- 顶部导航、Footer、首页额外 staking 引导和 Projects 页 Pao Pool 卡片已撤下；三语页面仍能通过直接 URL、sitemap 和六篇相关文章的自然链接发现。
- `/llms.txt` 首轮因国际化 middleware 改写返回 404。matcher 排除修复后，本地生产响应为 200 `text/plain`，包含 Pao Studio、Pao Pool、完整 pool ID、三语 canonical、四个协议来源和 sitemap。
- 普通请求与 Googlebot User-Agent 请求得到逐字节一致的英文 staking HTML，确认当前实现没有 crawler 专用核心内容。
- 三语页面继续返回 200，保留 canonical、hreflang、唯一 H1、八个区块、五组可见 FAQ、WebPage、BreadcrumbList 与 FAQPage。
- 验收脚本同时修正了两类误判：FAQ 可见性比较会先排除 script/style/template，首页与项目页会断言醒目入口不存在，而不是被全局导航中的旧链接误导。
- `pnpm build`、TypeScript、S0001 回归脚本与 S0002.1 专项脚本通过。sitemap 仍为 63 个 URL，其中三个 staking URL 没有虚假更新时间。

`llms.txt` 在本项目中只是实验性机器发现入口，不代表搜索引擎或 AI 平台承诺读取。`geo-diagnose` 正式执行器再次以 deterministic 模式调用，仍因缺少 `geo_seo_hub` Python 模块失败，因此没有生成或伪造 Artifact Bus 运行目录。本节是明确标记的手工降级复核，不包含真实排名、流量、索引、AI 召回或引用份额结论。

## S0002.2 视觉系统修正复核

本节记录 2026-09-02 对 staking 页面视觉修正的本地生产构建验收。它只证明页面表现与已有技术合同没有回归，不表示搜索排名、索引状态或 AI 引用发生变化。

### 视觉与交互结果

- 页面继续使用 warm-neutral canvas；奖励与会员色块都收进内容宽度内，不再形成全宽黑色或黄色内容带。
- 机制、五步委托、矿池选择、FAQ 与来源改为分隔式编辑布局；staking 页面源码不再包含 `shadow-soft` 或五列步骤网格。
- 375 × 812、768 × 900、1440 × 900 三档分别检查英文、简体中文和繁体中文页面，九个组合均满足 `scrollWidth === clientWidth`。
- 三语页面都保留八个内容区块与五组 FAQ；移动端会员标签保持内容宽度，FAQ summary 可获得焦点并正常展开。

### 回归结果

- `pnpm build` 成功生成 30 个页面，TypeScript 与 diff whitespace 检查通过。现存 `<img>` lint 与 Browserslist 提示不属于本次变更；Koios DNS 不可达时仍使用既有 fallback。
- S0002 验收继续通过三语 canonical、hreflang、HTML lang、WebPage、BreadcrumbList、FAQPage、pool ID、四个官方来源、六篇文章回链、`llms.txt`、sitemap 与非 cloaking 检查。
- S0001 验收继续通过五个代表性 HTML 页面、BlogPosting、Governance 服务端摘要、robots 与包含 63 个 URL 的 sitemap。
