# S0002 Cardano Staking Page Contract

## Contract Control

- Spec：S0002
- Item：s2-02
- Route key：`staking`
- Public routes：`/staking`、`/zh/staking`、`/tw/staking`
- Primary entity：Pao Pool，ticker `PAO`
- Primary action：在 Cexplorer 查看并发起委托
- Verification action：在 CardanoScan 核验 Pao Pool
- Content status：三语语义冻结；实现可以调整断行和微文案，但不能改变事实边界

## Metadata Contract

| Locale | Title                                       | Description                                                                                                                      |
| ------ | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| en     | Cardano Staking & Pao Pool Delegation Guide | Learn how Cardano staking works, what delegation does to your ADA, how rewards work, and how to verify and delegate to Pao Pool. |
| zh     | Cardano 质押与 Pao Pool 委托指南            | 了解 Cardano 质押如何运作、委托是否转移或锁定 ADA、奖励边界，以及如何核验并委托给 Pao Pool。                                     |
| tw     | Cardano 質押與 Pao Pool 委託指南            | 了解 Cardano 質押如何運作、委託是否轉移或鎖定 ADA、獎勵邊界，以及如何核驗並委託給 Pao Pool。                                     |

禁止在 metadata 使用“最佳”“最高收益”“稳定收益”“零风险”及其他比较或保证性描述。

## Visible Page Contract

### Hero and direct answer

| Locale | H1                                          | Direct answer                                                                                                                                                                                                                         |
| ------ | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| en     | Cardano staking, explained through Pao Pool | Cardano staking lets you delegate the staking rights of your ADA to a pool without sending the ADA away or locking it. You keep control of your funds. Rewards depend on protocol timing and pool performance and are not guaranteed. |
| zh     | 从 Pao Pool 开始理解 Cardano 质押           | Cardano 质押允许你把 ADA 对应的质押权委托给矿池，而无需转出或锁定 ADA。资产仍由你的钱包控制。奖励取决于协议周期和矿池表现，并不保证。                                                                                                 |
| tw     | 從 Pao Pool 開始理解 Cardano 質押           | Cardano 質押允許你把 ADA 對應的質押權委託給權益池，而無需轉出或鎖定 ADA。資產仍由你的錢包控制。獎勵取決於協議週期和權益池表現，並不保證。                                                                                             |

Hero 同时显示两个行动：内部页面锚点“了解委托步骤”和外部 Cexplorer CTA。紧邻 CTA 显示“非托管、不锁定、奖励不保证”的短提示。

### Section order and semantic purpose

| Section ID      | H2 purpose                | Required visible facts                                                                      |
| --------------- | ------------------------- | ------------------------------------------------------------------------------------------- |
| `how-it-works`  | Cardano staking 如何运作  | 委托的是协议参与权；ADA 不转给矿池；矿池持续运行节点并代表委托 stake 参与区块生产           |
| `rewards`       | 奖励和时间边界            | 新委托需要经历若干 epoch 才开始收到奖励；金额由协议、pool stake 和表现等决定；奖励不保证    |
| `pao-pool`      | Pao Pool 是什么           | ticker、完整 pool ID、实时或 fallback 数据状态、CardanoScan、Cexplorer、Pao Studio 运营目的 |
| `delegate`      | 如何委托给 Pao Pool       | 打开公开池页面、连接或选择兼容钱包、核对 pool ID、确认委托、在钱包或浏览器核验              |
| `choose-a-pool` | 选择矿池时检查什么        | fixed cost、margin、saturation、历史表现、运营透明度、持续沟通；不做“最佳矿池”排序          |
| `membership`    | Pao Studio 的质押会员实验 | 说明这是 Pao Studio 提供的额外关系层，不是 Cardano 协议保证；委托者权益以当前页面说明为准   |
| `faq`           | 直接回答常见问题          | 问答内容与 FAQPage JSON-LD 完全一致                                                         |
| `sources`       | 来源与进一步阅读          | 四条 Cardano 官方资料、至少两组站内相关文章、非财务建议说明                                 |

## Delegation Steps

三种语言都必须表达以下五步，不能把第三方页面或钱包操作描述成由 Pao Studio 托管：

1. 打开 Pao Pool 的 Cexplorer 页面或兼容 Cardano 钱包的 stake pool 目录。
2. 搜索 ticker `PAO`，并核对完整 pool ID。
3. 在自己的钱包中选择委托；不要向 Pao Studio 或 Pao Pool 转账。
4. 阅读钱包显示的协议 deposit 与网络费用，然后确认 delegation transaction。
5. 在钱包或 CardanoScan 核验委托状态；奖励按协议周期开始，不能保证金额。

## FAQ Contract

### English

1. **Does delegating to Pao Pool move or lock my ADA?** No. Cardano delegation assigns staking rights to a pool. Your ADA stays under your wallet's control and remains spendable.
2. **Are Cardano staking rewards guaranteed?** No. Rewards depend on protocol rules, the amount delegated to the pool, and pool performance. A pool can have epochs without rewards.
3. **When will a new delegation start earning rewards?** Cardano uses stake snapshots across several epochs, so rewards do not start immediately. Check your wallet or an explorer for the current delegation and reward timeline.
4. **Can I change pools later?** Yes. You can redelegate from a compatible wallet. Redelegation changes which pool receives your staking rights; it does not send your ADA to that pool.
5. **What does delegating to Pao Pool support?** Pool operating revenue helps Pao Studio run infrastructure and develop its content and products. Any member benefits are an additional Pao Studio offering, not a Cardano protocol reward.

### 简体中文

1. **委托给 Pao Pool 会转出或锁定我的 ADA 吗？** 不会。Cardano 委托分配的是质押权，ADA 仍由你的钱包控制并可以使用。
2. **Cardano 质押奖励有保证吗？** 没有。奖励取决于协议规则、矿池获得的委托量和矿池表现，矿池可能出现没有奖励的 epoch。
3. **新委托什么时候开始获得奖励？** Cardano 会跨多个 epoch 使用 stake snapshot，因此奖励不会立即开始。请在钱包或浏览器中查看当前委托与奖励时间线。
4. **之后可以更换矿池吗？** 可以。你可以通过兼容钱包重新委托。重新委托只改变质押权指向的矿池，不会把 ADA 转给矿池。
5. **委托给 Pao Pool 会支持什么？** 矿池运营收入帮助 Pao Studio 维护基础设施并开发内容和产品。会员权益是 Pao Studio 额外提供的服务，不是 Cardano 协议奖励。

### 繁體中文

1. **委託給 Pao Pool 會轉出或鎖定我的 ADA 嗎？** 不會。Cardano 委託分配的是質押權，ADA 仍由你的錢包控制並可以使用。
2. **Cardano 質押獎勵有保證嗎？** 沒有。獎勵取決於協議規則、權益池獲得的委託量和權益池表現，權益池可能出現沒有獎勵的 epoch。
3. **新委託什麼時候開始獲得獎勵？** Cardano 會跨多個 epoch 使用 stake snapshot，因此獎勵不會立即開始。請在錢包或瀏覽器中查看目前委託與獎勵時間線。
4. **之後可以更換權益池嗎？** 可以。你可以透過相容錢包重新委託。重新委託只改變質押權指向的權益池，不會把 ADA 轉給權益池。
5. **委託給 Pao Pool 會支持什麼？** 權益池營運收入幫助 Pao Studio 維護基礎設施並開發內容和產品。會員權益是 Pao Studio 額外提供的服務，不是 Cardano 協議獎勵。

## Source And Link Contract

### Official external sources

- How to delegate：`https://docs.cardano.org/about-cardano/new-to-cardano/how-to-delegate`
- Staking：`https://developers.cardano.org/docs/get-started/infrastructure/cardano-cli/basic-operations/withdraw-rewards/`
- Stake pool operation：`https://cardano.org/stake-pool-operation/`
- Stake pools：`https://docs.cardano.org/about-cardano/learn/stake-pools`

所有外部链接使用可理解的文本、`target="_blank"` 和 `rel="noopener noreferrer"`。

### Related internal content

- `20260405-subscriptions-are-failing-{locale}`：质押即订阅模型。
- `20260131-digital-sovereignty-{locale}`：stake pool 与独立创造者的数字主权。
- `20251201-ai-sword-web3-shield-{locale}`：AI 时代的 Web3 基础设施与非托管委托。

## Structured Data Contract

- WebPage：页面 URL、名称、描述、语言、isPartOf、about 和 publisher。
- BreadcrumbList：首页与 Cardano staking 两级路径。
- FAQPage：使用同页可见的五组问答，不添加隐藏问题。
- 不使用 FinancialProduct、InvestmentFund、Review、AggregateRating 或收益声明 schema。

## Navigation And CTA Contract

- 主导航增加内部 Staking 链接，桌面与移动菜单一致。
- 首页现有外部委托按钮保留，同时在 staking 相关说明附近增加“了解 Cardano 质押”的内部链接。
- 项目页增加 Pao Pool 卡片，主链接指向 `/staking`，外部核验链接指向 CardanoScan。
- Footer 的 `Cardano · PAO` 可改为内部主题页入口；外部核验仍保留在主题页。

## Presentation And Accessibility Contract

- 复用现有 `wrap`、brand colors、card radius、shadow 和 responsive breakpoint。
- 移动端单列，375 px 无横向滚动；pool ID 必须允许断行或省略显示但提供完整可复制文本。
- H1 只有一个；H2 对应主要问题；卡片标题使用 H3。
- 锚点跳转保留清晰目标，按钮和链接有可见 focus，纯装饰图形使用 `aria-hidden`。
- 不依赖动画、客户端请求或 hydration 才能看到核心答案、FAQ 和来源。
