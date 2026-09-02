# S0002 Cardano Staking Topic Evidence

## Evidence Control

- Spec：S0002
- Item：s2-01
- Collected：2026-09-02
- Scope：主题选择、受众、查询意图、事实和来源矩阵
- Method：仓库内容检查与公开一手资料检查
- Limitation：没有 Search Console、关键词搜索量、实时排名、流量或 AI 平台观测数据

## Topic Decision

选择 `Cardano staking 与 Pao Pool 委托指南` 作为首个主题中心，不是因为已经证明某个关键词有特定搜索量，而是因为它同时满足以下条件：

1. 它是 Pao Studio 当前首页叙事、会员关系和收入模型的中心概念。
2. 现有三语文案和三组文章已经提供足够的站内内容基础。
3. 用户从理解机制到核验矿池、再到完成委托，构成清晰且完整的任务。
4. Cardano 官方资料能够支撑核心机制与风险边界。
5. Pao Pool 拥有稳定 pool ID、公开浏览器入口和现有数据读取实现。

不选择泛化的“AI 一人公司”作为首个中心页，因为当前可验证的操作任务和外部一手资料不如 staking 集中。不选择“最佳 Cardano 矿池”或“最高 ADA 收益”，因为现有证据无法支持比较性或收益领先主张。

## Audience And Query Intent Map

下表是基于站内用语和用户任务推导的内容覆盖，不代表搜索量数据。

| Intent   | English phrasing                           | 简体中文表达           | 繁体中文表達           | Page answer                                            |
| -------- | ------------------------------------------ | ---------------------- | ---------------------- | ------------------------------------------------------ |
| 概念理解 | what is Cardano staking                    | Cardano 质押是什么     | Cardano 質押是什麼     | 委托 stake 权利，让矿池代表持有人参与共识              |
| 资产控制 | does Cardano staking lock ADA              | Cardano 质押会锁仓吗   | Cardano 質押會鎖倉嗎   | 委托不转移 ADA，资金仍由钱包控制并可使用               |
| 奖励边界 | when do Cardano staking rewards start      | Cardano 质押多久有奖励 | Cardano 質押多久有獎勵 | 首次奖励存在协议周期延迟，金额与矿池表现相关且不保证   |
| 选择矿池 | how to choose a Cardano stake pool         | Cardano 矿池怎么选     | Cardano 權益池怎麼選   | 检查费用、margin、saturation、表现、透明度与运营连续性 |
| 操作委托 | how to delegate ADA to a pool              | ADA 如何委托矿池       | ADA 如何委託權益池     | 使用兼容钱包搜索 ticker 或 pool ID 并确认 delegation   |
| 品牌核验 | Pao Pool / PAO stake pool                  | Pao Pool 怎么样        | Pao Pool 怎麼樣        | 展示稳定 pool ID、公开浏览器、数据状态、运营目的和 CTA |
| 关系理解 | staking membership / stake as subscription | 质押即订阅             | 質押即訂閱             | 解释 Pao Studio 如何把链上委托识别为会员支持关系       |

## Fact And Source Matrix

### Public protocol evidence

| Evidence ID | Claim allowed on page                                                                            | Source                                                                                                                                             | Basis    | Freshness rule                         |
| ----------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------------------------------------- |
| S2-E001     | ADA 持有人可以把 stake 委托给公共 stake pool，在不自己持续运行节点的情况下参与协议并获得潜在奖励 | [Cardano Docs: How to delegate](https://docs.cardano.org/about-cardano/new-to-cardano/how-to-delegate)                                             | observed | 发布前复核页面仍可访问                 |
| S2-E002     | 委托不移动 ADA，持有人保留支出控制；资金不锁定                                                   | [Cardano Developer Portal: Staking](https://developers.cardano.org/docs/get-started/infrastructure/cardano-cli/basic-operations/withdraw-rewards/) | observed | 不硬编码可变化的协议参数               |
| S2-E003     | 矿池获得区块机会和奖励与委托 stake 及表现有关；委托奖励不能保证                                  | [Cardano: Stake pool operation](https://cardano.org/stake-pool-operation/)                                                                         | observed | 紧邻奖励表述显示不保证说明             |
| S2-E004     | stake pool 是持续运行 Cardano 节点、处理交易并生产区块的运营实体                                 | [Cardano Docs: Stake pools](https://docs.cardano.org/about-cardano/learn/stake-pools)                                                              | observed | 用于机制解释，不推断 Pao Pool 当前表现 |
| S2-E005     | saturation 会影响奖励，并用于鼓励 stake 分散                                                     | [Cardano: Stake pool operation](https://cardano.org/stake-pool-operation/)                                                                         | observed | 不硬编码 saturation 数值               |

### Repository and brand evidence

| Evidence ID | Claim allowed on page                                                         | Source                                                   | SHA-256                                                                                  | Basis    |
| ----------- | ----------------------------------------------------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------- | -------- |
| S2-E006     | Pao Studio 把 Pao Pool、委托会员关系和 stake-supported model 作为首页核心内容 | `src/app/[locale]/page.tsx` 与三语 message catalog       | page `75ba6d7853c9...`; en `c68ce2c726a7...`; zh `7e918667071c...`; tw `bc35b4a926dd...` | observed |
| S2-E007     | Pao Pool 稳定身份使用项目配置中的 pool ID，并链接至外部浏览器进行核验         | `src/constants/constants.ts`                             | `38dcce99240a...`                                                                        | observed |
| S2-E008     | “质押即订阅”已有三语长文，能够作为主题页的相关解释材料                        | `posts/20260405-subscriptions-are-failing-{en,zh,tw}.md` | en `df59371a125f...`; zh `ccc7373eb918...`; tw `c3e58d11b6b...`                          | observed |
| S2-E009     | 数字主权文章解释 stake pool、委托和独立创作者关系                             | `posts/20260131-digital-sovereignty-en.md` 及语言版本    | en `4fc1c6dc6b9c...`                                                                     | observed |
| S2-E010     | AI/Web3 文章解释非托管委托和小型运营者的社区作用                              | `posts/20251201-ai-sword-web3-shield-en.md` 及语言版本   | en `93b5effa81f2...`                                                                     | observed |

## Source Gaps And Prohibited Claims

- 没有 Search Console 或关键词工具数据，不能声称主题搜索量、难度或排名机会大小。
- CardanoScan 与 Cexplorer 的特定 Pao Pool 页面在本次搜索工具中未取得可解析快照。页面可显示项目已配置的外部核验链接，但矿池实时表现必须来自 Koios 成功响应，失败时标记为 fallback 或暂不可用。
- 当前配置中的 APY 是项目值，不是本次公开资料验证出的实时收益率。页面可以显示带限定的估算，但不能称为保证收益或当前链上实绩。
- “安全”只能具体解释为委托不转移资金、无锁仓和 Cardano 委托机制，不得泛化为投资无风险。钱包私钥、钓鱼、资产价格和操作错误仍由用户自行管理。
- 不使用“最佳”“最高收益”“零风险”“稳定收益”等无法由现有证据支持的表述。

## Content Requirements Derived From Evidence

- 开头先直接回答 staking 和 delegation 的关系，再介绍 Pao Pool。
- 把“资产仍在钱包”“可使用”“奖励不保证”放在首屏或紧邻 CTA 的位置。
- 将协议事实与 Pao Studio 的会员实验分开表达，避免把品牌模型说成 Cardano 官方机制。
- 显示 pool ID 与至少一个公开浏览器链接，动态数据标注 live 或 fallback。
- 相关内容至少链接到质押即订阅、数字主权与 AI/Web3 三组文章中的两组。
- 页面末尾提供 Cardano 官方来源列表和非财务建议说明。
