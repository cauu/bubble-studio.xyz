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
