# S0001 SEO/GEO Technical Foundation

## Spec Control

- Spec ID：S0001
- Status：ACTIVE
- Created：2026-09-02 16:02 +08:00
- Supersedes：none
- Active registry：`docs/specs/README.md`
- Evidence source：`docs/geo-diagnosis-2026-09-02.md`

## 1. Requirement Details

### 1.1 Background

Pao Studio 网站已经具备多语言页面、基础 Metadata、博客、项目页和站点地图实现，但公开诊断发现抓取入口、文章规范地址、结构化数据、服务端可提取内容、新鲜度和语言标识仍有缺口。搜索系统与 AI 检索系统因此难以稳定识别页面身份、内容更新时间、组织实体和文章之间的关系。

S0001 只解决技术基础。它不创建主题中心页，不批量改写内容，也不连接外部搜索平台。

### 1.2 Goal

让所有核心页面具备一致、可抓取、可解析和可验证的技术信号，为后续主题内容与权威建设提供稳定底座。

### 1.3 In Scope

- 修复根级 `robots.txt` 与 `sitemap.xml` 的路由可达性。
- 修复文章 canonical、Open Graph URL 和多语言 alternate URL。
- 防止外部 API 错误日志输出 Authorization 等请求配置。
- 建立统一的 canonical origin、locale path、BCP 47 语言标识和 Open Graph locale 映射。
- 将全部页面元数据迁移到统一 URL 与语言工具。
- 使用 Next.js 独立 viewport export，消除现有 Metadata API 告警。
- 为站点增加基于可见事实的 Organization 与 WebSite JSON-LD。
- 为博客文章增加基于 front matter 的 BlogPosting JSON-LD。
- 让 Governance 页面在不执行客户端 JavaScript 时仍包含 H1、页面说明和稳定摘要。
- 让 sitemap 使用真实文章日期，且 URL 与页面 canonical 完全一致。
- 更新诊断报告，记录修复后的证据与剩余边界。

### 1.4 Constraints

- 不编造搜索量、排名、引用、流量或转化数据。
- JSON-LD 只能表达页面可见内容、项目配置和明确的一手来源。
- 保持默认英文路由无 `/en` 前缀；中文使用 `/zh`；繁体中文使用 `/tw`。
- 路由段 `tw` 可以保留，但公开语言标识必须映射为 `zh-Hant`，Open Graph locale 映射为 `zh_TW`。
- canonical origin 必须是直接返回 200 的 `https://www.bubble-studio.xyz`。
- 不修改现有视觉设计和核心业务交互。
- 不使用 Search Console、Bing 或其他外部账号凭据。
- 不部署生产环境；部署必须由后续明确授权触发。

### 1.5 Non-goals

- 不创建 Cardano staking、治理、一人公司或开发工具主题中心页。
- 不批量改写博客或生成关键词文章。
- 不开展外链购买、关键词堆砌、隐藏页面或批量虚假 FAQ。
- 不保证搜索排名或 AI 平台引用结果。
- 不修复与本 spec 验收无关的视觉和产品问题。

## 2. Outline Design

### 2.1 Shared SEO Module

新增统一 SEO 工具模块，负责：

- 读取并规范化站点 origin。
- 将裸域规范化为 `www` 最终域名。
- 根据 locale 和 pathname 生成 canonical URL。
- 为普通页面生成 `en`、`zh-Hans`、`zh-Hant` 和 `x-default` alternate。
- 为文章生成带对应语言后缀的 alternate URL。
- 提供 HTML language 与 Open Graph locale 映射。

页面不得继续各自拼接 base URL 和语言前缀。

### 2.2 Structured Data

增加安全的 JSON-LD 渲染组件，序列化时转义 `<`，防止脚本上下文注入。

- 根布局输出 Organization 与 WebSite。
- Organization 使用稳定 `@id`，连接站点、Logo、联系邮箱、GitHub、X 和 CardanoScan 矿池页面。
- 博客详情输出 BlogPosting，并连接 Organization `@id`。
- 标题、描述、图片、作者、发布日期和语言均来自已经显示或存储的页面事实。

### 2.3 Governance Server Rendering

将当前客户端交互部分移入独立客户端组件。新的服务端 page 负责输出：

- 唯一 H1。
- 与 metadata 一致的页面说明。
- Cardano 治理背景说明。
- 客户端治理列表和标签交互。

动态卡片仍可在客户端运行，但页面基本语义不依赖 hydration。

### 2.4 Sitemap Freshness

扩展文章读取接口以返回 slug、locale 和 front matter date。sitemap 只为真实存在的语言文件生成 URL，并以文章日期作为 `lastModified`。静态页没有可靠更新时间时省略 `lastModified`，不使用构建时间冒充内容时间。

### 2.5 Risk And Rollback

- URL 工具错误可能生成错误 canonical。每种 locale 至少抽样一个普通页面和一个文章页面。
- JSON-LD 可能与可见内容不一致。验收时解析 JSON，并逐项核对来源。
- Governance 拆分可能改变 hydration。保留原客户端组件逻辑，只移动稳定外壳。
- sitemap 读取异常不得静默生成虚假文章 URL。
- 未部署改动可按事项使用 `git revert` 回退；已部署回退需要新建 rollback spec。

## 3. Execution Plan

事项只有在实现、对应验收通过并追加证据后才能标记为 `[x]`。

- [x] s1-01 修复 metadata routes 被 locale middleware 捕获的问题。Acceptance：TC-01。
- [x] s1-02 修复博客文章 canonical、OG URL 和语言 alternate。Acceptance：TC-03、TC-04。
- [x] s1-03 对 Koios 无响应错误日志进行脱敏。Acceptance：TC-09。
- [ ] s1-04 新增共享 SEO URL 与 locale 工具，统一 canonical origin。Acceptance：TC-02、TC-03、TC-05。
- [ ] s1-05 迁移根布局、首页、博客、项目、Skills、Governance、robots 与 sitemap，并迁移 viewport API。Acceptance：TC-02、TC-03、TC-05、TC-06。
- [ ] s1-06 增加 Organization、WebSite 与 BlogPosting JSON-LD。Acceptance：TC-07。
- [ ] s1-07 将 Governance 稳定语义外壳改为服务端输出。Acceptance：TC-08。
- [ ] s1-08 使用真实文章日期和真实语言文件生成 sitemap。Acceptance：TC-02、TC-06。
- [ ] s1-09 完成构建、生产 HTML 抽样、诊断报告更新和最终证据登记。Acceptance：TC-01 至 TC-10。

## 4. Test And Acceptance Criteria

- TC-01：本地生产服务的 `/robots.txt` 返回 200 与 `text/plain`；`/sitemap.xml` 返回 200 与 `application/xml`；两者不进入 locale 路由。
- TC-02：robots、sitemap 和全部抽样 canonical 使用 `https://www.bubble-studio.xyz`，该 origin 不再跳转到其他 canonical host。
- TC-03：首页、项目、Skills、博客列表、Governance 和博客详情各自 canonical 指向自身公开 URL，不继承站点首页 canonical。
- TC-04：英文文章 URL 不含 `/en`；英文、简体中文和繁体中文 alternate 分别指向真实存在的 `-en`、`-zh` 和 `-tw` 文件路由。
- TC-05：HTML `lang` 和 hreflang 使用 `en`、`zh-Hans`、`zh-Hant`；Open Graph locale 使用 `en_US`、`zh_CN`、`zh_TW`。
- TC-06：sitemap 不产生不存在的文章语言变体；文章 `lastModified` 等于 front matter 日期；静态页不使用运行时当前时间。
- TC-07：根页面和文章页面的 JSON-LD 可被 `JSON.parse` 解析；Organization、WebSite、BlogPosting 的 URL、名称、日期、作者和图片与页面事实一致。
- TC-08：关闭客户端 JavaScript 的 Governance HTML 仍包含一个 H1、页面说明和可理解的 Cardano 治理摘要。
- TC-09：Koios DNS、网络或超时失败的输出不包含 `Authorization`、Bearer token 或 Axios request config。
- TC-10：`pnpm exec tsc --noEmit`、`pnpm build`、Prettier 和 `git diff --check` 全部通过；报告明确说明没有观察实时排名、流量或 AI 引用表现。

## 5. Execution Log (append-only)

- 2026-09-02 | 完成公开站点与本地源码诊断，生成 `docs/geo-diagnosis-2026-09-02.md`。
- 2026-09-02 | s1-01 实现完成，locale middleware 排除 `robots.txt` 与 `sitemap.xml`。
- 2026-09-02 | s1-02 实现完成，文章 canonical、Open Graph URL 和三个语言 alternate 改为页面级 URL。
- 2026-09-02 | s1-03 实现完成，Koios 无响应错误只保留错误码和消息。
- 2026-09-02 | 用户要求先按 Immutable Spec 拆分范围；暂停 s1-04 及后续实现。
- 2026-09-02 16:02 +08:00 | 创建 S0001，并设为唯一 active spec。

## 6. Validation Evidence (append-only)

- TC-01 | stack: node/http | command: `pnpm start -p 3100` + local HEAD requests | result: pass | note: robots 返回 200 text/plain；sitemap 返回 200 application/xml
- TC-03 | stack: node/http | command: local production HTML inspection | result: partial | note: 博客详情已使用页面级 canonical；其他页面和 www origin 统一由 s1-04、s1-05 验收
- TC-04 | stack: node/http | command: inspect English and Chinese article HTML | result: pass | note: 英文无 /en；三个 alternate 使用对应 locale 路径和 slug 后缀
- TC-09 | stack: node | command: `pnpm build` with Koios DNS failure | result: pass | note: 输出仅含 ENOTFOUND 与消息，未出现请求配置或 Authorization
- TC-10 | stack: node | command: `pnpm exec tsc --noEmit` | result: pass | note: 当前实现通过类型检查
- TC-10 | stack: node | command: `pnpm build` | result: partial | note: 构建成功；viewport 与 themeColor 告警待 s1-05 消除
- TC-10 | stack: other | command: `git diff --check` and Prettier check | result: pass | note: 当前改动无空白错误并符合格式

## 7. Change Log (append-only)

- 2026-09-02 16:02 +08:00 | Initial immutable spec created from the approved phased SEO/GEO direction. Scope limited to technical foundation; topic hubs, content expansion, external authority work and measurement remain queued as S0002-S0005.
