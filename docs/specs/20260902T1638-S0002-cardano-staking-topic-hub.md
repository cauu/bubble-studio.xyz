# S0002 Cardano Staking Topic Hub

## Spec Control

- Spec ID：S0002
- Status：ACTIVE
- Created：2026-09-02 16:38 +08:00
- Supersedes：none
- Depends on：S0001 COMPLETE
- Active registry：`docs/specs/README.md`
- Topic decision：Cardano staking 与 Pao Pool 委托指南

## 1. Requirement Details

### 1.1 Background

S0001 已完成抓取入口、canonical、多语言标识、结构化数据与服务端可提取性的技术底座。当前首页已经解释 Pao Studio 以 Cardano stake pool 建立会员关系与持续收入，并展示 Pao Pool 数据、委托权益和 CTA；多篇文章也讨论非托管委托、流动性质押与“质押即订阅”。这些信息分散在首页和文章中，缺少一个能独立回答用户基础问题、解释风险边界并连接 Pao Pool 行动的稳定页面。

Cardano 官方资料说明，ADA 持有人可以把 stake 委托给公共 stake pool，在不持续运行节点的情况下参与共识和获得潜在奖励；委托不转移资金，ADA 仍可使用；实际奖励受矿池表现等因素影响，不能保证。S0002 将这些可核验事实与 Pao Pool 的公开信息组织成一个对用户可见的主题中心页。

本 spec 没有 Search Console、关键词工具或 AI 平台观测数据，因此不声称该主题具有特定搜索量，也不承诺搜索排名或 AI 引用提升。选题依据是现有业务中心度、站内内容覆盖、用户任务完整性与一手资料可验证性。

### 1.2 Goal

新增一个多语言、可抓取、可引用、能独立帮助 ADA 持有人理解 Cardano staking 并判断是否委托给 Pao Pool 的公开主题中心页，同时建立首页、项目与相关文章之间的清晰内部链接。

### 1.3 User-visible Outcome

- 新增公开路由 `/staking`、`/zh/staking`、`/tw/staking`。
- 页面明确回答 Cardano staking 是什么、委托时资产如何处理、奖励与时间边界、如何选择矿池、如何委托给 Pao Pool。
- 页面展示 Pao Pool 可核验身份、动态或明确标记为 fallback 的矿池数据、外部浏览器入口和委托 CTA。
- 页面列出 Cardano 官方来源和相关站内文章。
- 首页与相关上下文增加可理解的站内入口。

### 1.4 In Scope

- 形成主题、受众、搜索意图、事实边界和来源矩阵。
- 定义主题中心页的信息架构、直接答案、FAQ、来源与风险提示。
- 实现三种语言的 staking 页面和页面级 metadata。
- 增加基于可见内容的 WebPage、BreadcrumbList 与 FAQPage JSON-LD。
- 将 staking 页面纳入 sitemap，并建立首页、项目页与相关博客文章的内部链接。
- 在本地生产模式验证 HTML、移动端布局、语言链接、结构化数据和链接完整性。
- 更新 GEO 手工降级诊断证据。

### 1.5 Constraints

- 不编造搜索量、关键词难度、排名、流量、转化或 AI 引用数据。
- 不保证 staking 奖励、年化收益或矿池表现；动态数据必须显示来源与可用状态。
- 不把委托描述为转账、托管、购买或无风险投资。
- 协议机制优先引用 Cardano 官方资料；Pao Pool 身份和状态连接可核验的链上浏览器。
- 页面必须对未持有 ADA 或不准备委托的访客仍具有独立教育价值。
- 保持现有视觉语言与默认英文无 `/en` 前缀的路由规则。
- 单次 GEO 诊断最多使用五个明确 HTML 来源。
- 不连接外部账号，不部署生产环境。

### 1.6 Non-goals

- 不创建钱包连接、链上委托交易或收益计算器。
- 不提供个性化投资、税务或财务建议。
- 不批量创建 staking 关键词页面或城市、钱包、收益率变体页。
- 不重写全部相关文章，不启动 S0003 的全站内容模板改造。
- 不进入 Search Console、Bing 或实时 AI 平台测量。

## 2. Evidence And Topic Decision

### 2.1 Existing Site Evidence

- 首页 Hero、Pao Pool ledger、Stake Benefits 与 Perks 已把 stake pool 作为 Pao Studio 商业与会员模型的核心。
- 三语 message catalog 已包含委托、非托管、无锁仓、奖励、会员权益和 Pao Pool 介绍。
- `20260405-subscriptions-are-failing-*`、`20260131-digital-sovereignty-*`、`20251201-ai-sword-web3-shield-*` 等文章提供相关上下文。
- 当前没有独立 staking 页面；`seo.staking` 与 `stakingGuide` 文案存在，但没有对应可索引路由。

### 2.2 Public First-party Sources

- Cardano Docs，How to delegate：`https://docs.cardano.org/about-cardano/new-to-cardano/how-to-delegate`
- Cardano Developer Portal，Staking：`https://developers.cardano.org/docs/get-started/infrastructure/cardano-cli/basic-operations/withdraw-rewards/`
- Cardano，Stake pool operation：`https://cardano.org/stake-pool-operation/`
- Cardano Docs，Stake pools：`https://docs.cardano.org/about-cardano/learn/stake-pools`
- Pao Pool explorer identity：使用项目配置中的 pool ID 连接 CardanoScan 与 Cexplorer；无法取得动态数据时作为 source gap，不推断当前表现。

### 2.3 Audience And Intent

主要受众是已经持有或正在了解 ADA、希望理解委托机制并评估 Pao Pool 的访客。页面覆盖四类紧邻意图：

1. 理解 Cardano staking 与 delegation 的基本机制。
2. 判断委托是否转移、锁定或使 ADA 承担本金损失。
3. 理解奖励时间、矿池表现和不保证收益的边界。
4. 获取 Pao Pool 的身份、公开数据、委托步骤和进一步阅读入口。

### 2.4 Decision

首个主题中心页使用稳定 URL `staking`，主标题围绕 Cardano staking 与 Pao Pool，而不是只使用品牌词或只做委托落地页。它同时承担教育、核验与行动三种用途。页面不以“最佳矿池”“最高收益”或其他无法证明的比较型定位作为目标。

## 3. Outline Design

### 3.1 Information Architecture

页面按用户决策顺序组织：

1. Hero：一句直接答案、适用对象、主要 CTA 与查看链上数据入口。
2. 机制：委托的含义，以及资产所有权、流动性和网络参与方式。
3. 时间与奖励：首次奖励存在协议延迟，奖励取决于矿池表现且不保证。
4. Pao Pool：稳定 pool ID、公开浏览器链接、实时或 fallback 数据状态、运营目的。
5. 委托步骤：选择兼容钱包、搜索 PAO 或 pool ID、确认委托、链上核验。
6. 选择与风险清单：费用、margin、saturation、表现、运营透明度和个人安全责任。
7. FAQ、官方来源与相关站内文章。

### 3.2 Page And Metadata Contract

- 页面必须服务端渲染唯一 H1、直接答案、主要章节、FAQ 和来源。
- canonical 与三语 alternate 使用 S0001 共享 SEO helper。
- metadata 标题与描述必须准确描述 Cardano staking 教育与 Pao Pool，不承诺收益。
- 页面使用根 Organization/WebSite 实体 ID，并输出 WebPage、BreadcrumbList 与 FAQPage。
- FAQPage JSON-LD 的问题和答案必须与可见 FAQ 完全一致。

### 3.3 Internal Link Contract

- 首页至少提供一个带上下文的 `/staking` 站内链接，同时保留外部委托 CTA。
- 项目页增加 Pao Pool 条目或说明，链接到主题中心页。
- 最相关的既有文章增加指向主题中心页的上下文链接；主题中心页反向链接至这些文章。
- sitemap 增加三种语言的 staking 静态 URL。

### 3.4 Evidence And Freshness

- 协议事实靠 Cardano 官方资料支撑，来源区域显示页面标题和外部链接。
- Pao Pool 动态数据沿用 Koios；请求失败时保留 fallback 状态，不把 fallback 写成实时值。
- 奖励和 APY 只能使用清楚限定的估算或当前项目配置，必须紧邻“不保证”说明。
- 页面事实发生变化时通过后续 spec 更新，不在 JSON-LD 中添加页面不可见主张。

### 3.5 Risk And Rollback

- 过度重复首页内容可能造成页面竞争。主题中心页必须承担更完整的问题解释与证据任务，首页保持品牌概览。
- 金融措辞可能误导。验收逐项核对非托管、流动性、奖励与风险表述。
- 动态矿池请求可能失败。页面应显示 fallback/暂不可用状态并保留外部核验入口。
- 新链接可能出现语言或 slug 错误。验收遍历所有新增内部链接。
- 未部署变更按事项使用 `git revert` 回退；已部署回退需要新建 rollback spec。

## 4. Execution Plan

事项只有在实现、对应验收通过并追加证据后才能标记为 `[x]`。

- [ ] s2-01 固化主题、受众、查询意图、事实与来源矩阵。Acceptance：TC-01、TC-03、TC-10。
- [ ] s2-02 固化页面信息架构、三语内容合同、URL、CTA 与非目标。Acceptance：TC-02、TC-03。
- [ ] s2-03 实现三语 Cardano staking 主题中心页与 metadata。Acceptance：TC-01 至 TC-04。
- [ ] s2-04 增加 WebPage、BreadcrumbList 与 FAQPage JSON-LD。Acceptance：TC-05。
- [ ] s2-05 建立首页、项目页、相关文章双向链接并更新 sitemap。Acceptance：TC-06、TC-07。
- [ ] s2-06 完成本地生产构建、五页以内 HTML 抽样、移动端与链接验证，追加报告和最终证据。Acceptance：TC-01 至 TC-10。

## 5. Test And Acceptance Criteria

- TC-01：`/staking`、`/zh/staking`、`/tw/staking` 返回 200，并具有 self-canonical、正确 hreflang、HTML lang 与 Open Graph locale。
- TC-02：未执行客户端 JavaScript 的页面 HTML 包含唯一 H1、开头直接答案、机制、时间与奖励、Pao Pool、委托步骤、风险清单、FAQ、来源和相关文章。
- TC-03：非托管、资金可用、奖励、延迟、saturation 与矿池职责等事实都有页面内来源；页面不保证收益，不声称特定搜索量或排名结果。
- TC-04：Pao Pool pool ID、浏览器链接和 CTA 一致；动态数据失败时明确标记 fallback 或暂不可用，不冒充实时结果。
- TC-05：WebPage、BreadcrumbList 与 FAQPage JSON-LD 均能通过 `JSON.parse`，URL、语言、问题与答案和可见页面一致。
- TC-06：首页、项目页和至少两组三语相关文章与主题中心页形成上下文双向链接；所有新增站内链接返回 200。
- TC-07：sitemap 包含三个真实 staking URL，不添加虚假 lastModified，且 URL 与页面 canonical 一致。
- TC-08：375 px 与桌面宽度无横向溢出；标题层级、列表、外部链接、焦点状态和 CTA 可访问。
- TC-09：`pnpm exec tsc --noEmit`、`pnpm build`、S0002 文件 Prettier、`git diff --check` 与自动验证脚本通过。
- TC-10：诊断和交付明确说明没有观察实时搜索排名、流量、索引变化、AI 召回或引用份额；最多使用五个 HTML 诊断来源。

## 6. Execution Log (append-only)

- 2026-09-02 16:38 +08:00 | S0001 已 COMPLETE；用户授权继续下一份 spec。
- 2026-09-02 16:38 +08:00 | 根据站内业务中心度、已有三语内容与 Cardano 一手资料，将 S0002 主题确定为 Cardano staking 与 Pao Pool 委托指南。
- 2026-09-02 16:38 +08:00 | 创建并激活 S0002；S0003-S0005 保持 QUEUED。

## 7. Validation Evidence (append-only)

- TC-03 | stack: source | command: repository content inspection | result: pass | note: 首页、多语言 messages 与三组文章共同覆盖 Cardano 委托、Pao Pool、会员关系和流动性主题
- TC-03 | stack: web | command: review Cardano first-party staking/delegation documentation | result: pass | note: 官方资料支持委托不转移资金、ADA 可使用、公共矿池参与和奖励不保证等事实边界
- TC-10 | stack: manual | command: topic decision review | result: pass | note: 未使用或虚构 Search Console、搜索量、排名、流量或 AI 平台表现数据

## 8. Change Log (append-only)

- 2026-09-02 16:38 +08:00 | Initial immutable spec activated after S0001 completion. The queued topic-hub outline is narrowed to one user-visible Cardano staking and Pao Pool page; later specs remain out of scope.
