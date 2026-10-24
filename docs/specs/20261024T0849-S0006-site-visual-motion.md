# S0006 Site Visual And Motion Upgrade

## Spec Control

- Spec ID：S0006
- Status：ACTIVE
- Created：2026-10-24 08:49 +08:00
- Depends on：用户授权激活（S0005 保持 QUEUED，不受影响）
- Active registry：`docs/specs/README.md`

## 1. Requirement Details

### 1.1 User Direction

用户要求按照 Bubble 视觉规范优化 UI，让页面整体更有动感和设计感，能够抓住访问者的眼球。范围覆盖全站页面。激活后先基于当前版本实现不同风格的 HTML 原型图，由用户选定方向后再进入实现。

### 1.2 Baseline Observations

- 当前站点已使用 Bubble-light token（`src/globals.css`、`tailwind.config.ts`），但八色品牌色主要以小色块、图标底和 Chip 出现，规范中的「饱和色卡片轮换」几乎未落地，页面以白、灰紫与单一 Incana 容器为主，首屏冲击力弱。
- 现有动效仅有 `Reveal` 淡入上移、Hero aura 漂移、live dot 脉冲与按钮 hover 位移，缺少首屏编排、滚动叙事、数字或数据动效与可感知的交互反馈。
- `DESIGN-bubble-light.md` 将动画与过渡时长列为 Known Gap，当前没有书面动效合同。
- 首页结构：Hero（标题 + Pool ledger 卡）→ 质押即订阅 → 现在质押可以获得 → 项目列表 → 收入构成 → 合作联系。

### 1.3 Goal

在 Bubble-light 规范内建立一套有辨识度的视觉与动效系统，先以首页原型确认方向，再推广到全站页面；不改变既有 SEO/GEO 合同。

### 1.4 Page Scope

首页、Blog 列表与文章页、Projects、Products、Skills、Governance、About、Staking。

### 1.5 Visual Contract

- 地面使用 `canvas`（#F9F8F6），不使用纯白画布与深色 Footer。
- 只使用八种品牌色；Incana 保持唯一深色锚点；lemon 与 mint 上使用 ink 文字。
- 只使用 Inter 与现有 CJK 回退字体 AlibabaPuHuiTi，不新增字体。
- 深度依靠色彩对比与细线，不依赖重阴影。

### 1.6 Motion Contract（s6-02 冻结具体数值）

- 动效必须服务于层级与叙事：首屏编排、滚动揭示、数据变化、交互反馈四类，禁止无目的循环动画占据阅读区。
- 所有动效在 `prefers-reduced-motion: reduce` 下降级为无位移的即时或淡入状态。
- 无 JavaScript 时内容完整可见（沿用 `Reveal` 的 `.js` 前置条件）。
- 优先 CSS 与原生 API；新增动画依赖须在执行日志中记录体积影响与理由。
- 只动画 `transform` 与 `opacity`，不得引入可感知的 CLS。

### 1.7 Semantic Preservation Contract

- 各页唯一 H1、section ID、metadata、canonical、hreflang、JSON-LD 与 sitemap 保持不变。
- S0002.1 staking 低曝光入口策略、S0002.2 staking 语义合同、S0003 文章 metadata 与正文链接、S0004 实体 ID 与 About 锚点保持不变。
- 激活本 spec 即解除 S0003 中「不改 Blog 可见模板」的限制，但仅限视觉与动效。
- 不修改文案与事实，不新增营销主张。

### 1.8 Non-goals

- 不修改 copy、翻译或文章内容。
- 不部署生产环境，不承诺搜索排名、流量或转化变化。
- 不重做品牌标识、Logo 或插画体系。

## 2. Execution Plan

事项只有在实现、对应验收通过并追加证据后才能标记为 `[x]`。

- [x] s6-01 截取当前版本基线，基于首页真实内容实现多种风格的 HTML 原型图。Acceptance：TC-01。
- [x] s6-02 用户选定方向，冻结视觉问题清单、动效合同数值与组件清单。Acceptance：TC-01、TC-02。
- [ ] s6-03 实现首页与全站共享动效基础（Hero、滚动揭示、交互微动效、NavBar、Footer）。Acceptance：TC-02 至 TC-05。
- [ ] s6-04 推广到 Blog 列表与文章页。Acceptance：TC-02 至 TC-06。
- [ ] s6-05 推广到 Projects、Products、Skills。Acceptance：TC-02 至 TC-05。
- [ ] s6-06 推广到 Governance、About、Staking，保持既有语义合同。Acceptance：TC-02 至 TC-06。
- [ ] s6-07 完成三语桌面/移动视觉验收、reduced-motion、性能抽样与 S0001–S0004 回归。Acceptance：TC-01 至 TC-07。

## 3. Test And Acceptance Criteria

- TC-01：原型位于 `docs/prototypes/s0006/`，使用当前首页真实中文文案与 section 顺序，只使用 Bubble-light token；每个原型在 375 px 与 1440 px 下无横向溢出。
- TC-02：实现只使用八色品牌 token、Inter/AlibabaPuHuiTi 与现有圆角/间距 token；Footer 保持浅色。
- TC-03：`prefers-reduced-motion: reduce` 下无位移动画；无 JS 时所有内容可见。
- TC-04：375 × 812、768 × 900、1440 × 900 下三语页面无横向溢出、无裁切与不可读重叠；焦点状态可见。
- TC-05：首页与抽样页面 CLS 不劣于基线，动效只作用于 `transform`/`opacity`。
- TC-06：三语 HTML 的唯一 H1、section ID、metadata、JSON-LD、sitemap、`llms.txt` 与非 cloaking 验收保持通过。
- TC-07：`pnpm exec tsc --noEmit`、`pnpm build`、Prettier、`git diff --check`、S0001 至 S0004 验收脚本通过。

## 4. Execution Log (append-only)

- 2026-10-24 08:49 +08:00 | 用户新建前端界面优化任务，范围为全站页面，方向为按 Bubble 视觉规范提升动感与设计感。
- 2026-10-24 08:49 +08:00 | 用户授权激活；对照 `DESIGN-bubble-light.md`、`src/globals.css`、Tailwind token 与首页组件创建并激活 S0006；用户要求先基于当前版本实现多风格 HTML 原型。
- 2026-10-24 09:40 +08:00 | s6-01 截取当前首页 1440/375 基线；在 `docs/prototypes/s0006/` 实现三个首页方向原型：A 泡泡浮游、B 动态编辑、C 彩色便当，共享 `base.css`/`base.js`，并提供 `index.html` 总览；等待用户选定方向进入 s6-02。
- 2026-10-24 10:30 +08:00 | 用户确认现行规范未收录 Logo 色彩，要求以 Logo 色彩探索大色块赛博朋克与孔版印刷两个方向，不受当前排版与内容限制，并允许删除首页「收入构成」；新增原型 D 霓虹赛博、E 孔版印刷，并更新总览页。
- 2026-10-24 11:20 +08:00 | 用户选定 D 霓虹赛博作为迭代基础；为 D 增加全屏开场：P、A、O 依次出现拼出 PAO 并打出 STUDIO，随后以共享元素 FLIP 过渡飞入 Hero 色块；支持点击、按键、滚动跳过，reduced-motion 下不播放，徽章提供「↻ 开场」重播。
- 2026-10-24 12:30 +08:00 | 用户要求在 D 原型上按优化方向直接迭代：D 首页升级为 v2，新增 `d-article.html` 文章阅读模式原型与 `pao_logo_dark.svg`（由 Logo 源文件将文字填色 #000000 改为 #F4F2FF）。v2 改动：深色版 Logo 替代 CSS 反色；故障字改为入场与悬停触发且每 1.5 s 最多一次，扫描光只扫一次；Hero 色块以 `translate` 叠加指针视差与滚动解体；矿池状态区并入 Hero 状态栏（实时 epoch 倒计时与进度）；跑马灯只保留口号且随滚动加速；质押面板详情在悬停或聚焦时出现；扫描线去除 mix-blend-mode；开场每会话一次（`?intro` 强制重播）；手机端 Hero 色块区接近方形，开场 P 竖笔比例恢复。
- 2026-10-24 13:40 +08:00 | 用户确定首页目标：说明我们做什么、鼓励委托 ADA、项目展示、内容分享，并保持设计感与高级感；确认 P·A·O 对应 POOL / AI / OPEN，质押阶段目标暂定 1M / 5M / 10M / 20M ADA。D 首页重排为：Hero（状态栏 + 阶段目标进度轨）→ 01 P·A·O → 02 项目（Ouro Pass 主推 + utxray / ouro-ops / voda / lottery，使用 messages 中的真实描述）→ 03 质押（规则面板、权益、三步委托、矿池参数终端）→ 04 文章（最新 4 篇真实文章）→ 05 委托与合作收尾；矿池数值取自 Koios pool_info（live_stake 1,539.59 ADA、4 位委托人、margin 3%、fixed_cost 170 ADA、pledge 500 ADA）。P·A·O 说明与三步委托为新增文案初稿，待用户审阅；新增文案突破 1.7「不新增营销主张」，需在 s6-02 以 Change Log 记录授权。
- 2026-10-24 14:05 +08:00 | 用户反馈 D 首页 ticker 以下区域全黑。定位：D 的 reveal 隐藏态 `clip-path: inset(0 100% 0 0)` 使元素可见面积为 0，IntersectionObserver 永不触发，`.in` 不会加入（v1/v2 已存在，新版各区块均用 reveal 后暴露）。改为 mask-position 擦除，过渡结束后移除 mask。
- 2026-10-24 15:10 +08:00 | 用户要求把新产品 Coil（https://coil.win/ ，桌面交易 Agent，v0.3.0，macOS Apple Silicon）与 VODA（https://voda.paopao.studio/ ，AI 编辑每日精选 Cardano 动态）作为卖点，并补充 Cardano / Web3 元素、只使用现有能力（不新增创始会员、阶段解锁、钱包连接等机制）。D 首页调整为：Hero（boot 行加区块高度）→ VODA 今日头条跑马灯 → 01 P·A·O（A 点名 Coil 与 VODA，O 点名开源项目）→ 02 旗舰产品（Coil 像素场景悬停唤醒、VODA 今日 Top 5 实景卡）→ 03 更多项目 → 04 链上的成员（Koios pool_delegators 真实委托者墙 + 下一位空位、保障标签、权益列表、钱包名称条、三步委托与矿池参数）→ 05 文章 → 06 收尾；页脚加 Built on Cardano。`coil-sleep.png`/`coil-awake.png` 为从 coil.win 截图裁切的原型占位素材；VODA 头条、委托者与区块高度为 2026-10-24 快照，正式实现需接实时数据。
- 2026-10-24 15:50 +08:00 | 按用户反馈精简 D 首页：旗舰产品与 build log 合并为单一「02 项目」模块（Coil、VODA 卡 + 4 行项目），删除区块副标题与卡片长段说明（Coil、VODA 各保留一句）；质押区删除副标题、保障标签、权益列表与三步委托，只保留委托者墙与一条细委托栏（Ticker、Pool ID 复制、费率、CardanoScan、委托按钮）；清理对应的无用样式。
- 2026-10-24 16:30 +08:00 | 项目区 Coil 改为全宽横向像素横幅（文案叠在天空上，悬停唤醒；手机端文案移到画面下方），VODA 作为项目列表一行；曾试做「今日 Cardano」（VODA 每日 Top 5 热度榜）区块，用户决定不需要，已删除，跑马灯恢复为品牌口号。当前顺序：Hero → 01 P·A·O → 02 项目 → 03 链上的成员 → 04 文章 → 05 收尾。
- 2026-10-24 16:50 +08:00 | 用户确定首页「作品和内容优先」：顺序调整为 Hero → 01 项目 → 02 文章 → 03 P·A·O → 04 链上的成员 → 05 收尾；Hero 次按钮改为「看看作品」指向项目区。
- 2026-10-24 17:40 +08:00 | 用户认为页面偏素。删除收尾说明段与 P·A·O、文章区副标题；「项目」改名「作品」。试做浅色文章区与柠檬黄成员区交替底色，用户判断不如纯黑高级，已撤回。保留并新增：作品行常驻双色调缩略图（悬停恢复原色，移除悬停预览浮层）、各区块超大 Logo 几何装饰（P / 三角 / 圆，随滚动视差，手机隐藏 P 与三角）、区块标题关键词色块擦入高亮；按用户要求新增全页固定 canvas 粒子（桌面 42 / 手机 18 颗 Logo 色像素方块上浮闪烁、偶发横向数据流光线、指针排斥，后台暂停，reduced-motion 不绘制）。
- 2026-10-24 18:40 +08:00 | 用户认可赛博风格与开场，认为排版过于常规；新增三个排版与转场探索稿，共享 `dx-base.css`（霓虹 token、按钮、Logo 几何）与 `dx-fx.js`（epoch 时钟、阶段目标、复制、粒子）：D1 `d1-editorial.html` 杂志网格（12 栏栏线、竖排章节索引、描边章节号滚动横移、阶梯作品索引、拼贴文章、账本成员表）；D2 `d2-filmstrip.html` 横向长卷（纵向滚动驱动横向轨道、章节闸门、深度视差、底部 HUD 时间轴）；D3 `d3-scenes.html` 全屏场景（逐屏切换、P/三角/圆形状蒙版转场、HUD 框架、Coil 场景自动唤醒）。三版在窄屏或 reduced-motion 下退化为纵向滚动；总览页新增第三轮入口。
- 2026-10-24 19:20 +08:00 | 用户认可 D2 的模块排版但不要横向滚动，也不喜欢 D3 的逐屏翻页；新增 D4 `d4-vertical.html` 纵向长卷：章节改为横向闸门横幅（描边编号 + 标题 + 霓虹线擦入），作品 / 文章 / 成员保持横排错落卡片，P·A·O 三栏并排，元素纵向视差（测量时扣除自身位移避免反馈抖动），底部 HUD 时间轴随纵向滚动；总览页新增 D4 入口。
- 2026-10-24 19:40 +08:00 | 按用户反馈调整 D4：章节闸门编号缩至 clamp(56px, 6vw, 96px)、标题缩至 clamp(32px, 3.4vw, 52px)，闸门留白收紧；Coil 横幅由固定 66vh 高度改为固定 1440:500 宽幅比例（像素场景不再随屏高拉伸裁切），说明栏字号同步缩小。
- 2026-10-24 20:10 +08:00 | 用户决定综合 D 与 D4：新增 D5 `d5-hybrid.html`，沿用 D 的开场、Hero、状态栏、阶段目标与跑马灯，沿用 D4 的章节闸门分割线、出场与纵向视差动效、作品排版及文章 / P·A·O / 成员模块；所有内容收进与 Hero 文案左对齐的 1180 px 阅读宽度（`--pad`），作品卡改为 3 列错落、文章改为左大图右列表、成员矿池信息改为卡片下方细栏；去除 D4 底部 HUD（状态已在 Hero 状态栏）；章节编号不再做视差，P·A·O 图形视差减弱；总览页新增 D5 并标为当前推荐。
- 2026-10-24 20:30 +08:00 | 修复 D5 Hero 与开场错误：D4 版块容器类 `.blk` 与 D 的 Hero 色块类 `.blk` 同名，后加载的 `position: relative; padding` 覆盖了色块绝对定位，开场克隆色块随之错位；容器改名 `.lane` 后，1440×900 截图 D 与 D5 的 Hero 一致。按用户要求作品卡由 3 列两行改为 5 列一行（奇偶上下错落 56px，标题与描述缩小，描述最多两行）。
- 2026-10-24 20:50 +08:00 | 用户认为 Hero 文字过多、不必再强调「一人公司」，改为直接引导质押。D5 Hero 改为：一行开机日志、H1「质押 ADA / 即成为会员」（「会员」黄色高亮，故障字落在「质押 ADA」）、一句说明「ADA 留在你的钱包里，照常获得质押奖励，同时解锁内容与产品。」、三个标签（$0 订阅 / 不托管 / 不锁仓）。该 H1 为待审文案初稿，且改变首页 H1，与 1.7 语义保持合同冲突，s6-02 须以 Change Log 记录授权并评估 SEO/GEO 影响（metadata、JSON-LD、三语翻译）。1440 与 375 截图检查通过，375 px scrollWidth=375。
- 2026-10-24 21:10 +08:00 | 用户保留 Hero 标题「质押 ADA / 即成为会员」，要求强调「无需注册，即可享受额外的服务」；会员权益暂未确定。D5 Hero 删除说明句与「$0 订阅 / 不托管 / 不锁仓」标签（均为 Cardano 委托通用特性，非 PAO 差异点），改为一句「无需注册，即可享受额外的服务。」（「无需注册」加粗），不列具体权益。
- 2026-10-24 21:40 +08:00 | 用户确定 Hero 方向：标题改为行动号召「Stake with / PAO Pool」（PAO 黄色高亮，故障字落在「Stake with」）；特色定义为「质押身份即会员凭证，凭质押享受 PAO Pool 的额外增值服务」。D5 副标题改为两行：小标题「质押身份 = 会员凭证」+ 说明「奖励照拿，PAO Pool 的增值服务另享。」（均为待审初稿）。1440 与 375 截图检查，375 px scrollWidth=375。
- 2026-10-24 21:50 +08:00 | 用户给定 Hero 说明文案「获取质押奖励，同时享受 PAO Pool 的增值服务。」，替换 D5 副标题第二行；小标题「质押身份 = 会员凭证」保留。
- 2026-10-24 22:40 +08:00 | 用户确认首页方向，要求设计其余页面。以 D5 设计语言完成全站页面原型（内容来自 `messages/zh.json`、`posts/*-zh.md`、`src/data/gov-contents-2025-05-15.json` 与 Koios 快照）：`d5-works.html` 作品（Coil 横幅、VODA、开源基础设施、应用）、`d5-blog.html` 博客（分类筛选、精选、按年份分组索引）、`d5-article.html` 文章（深色阅读默认、可切日读）、`d5-skills.html`（6 个 Skills 与安装命令复制）、`d5-governance.html`（治理行动卡、支持 / 反对比例、epoch 侧栏）、`d5-about.html`（工作室 / 作者 / 矿池）、`d5-staking.html`（机制、奖励周期、核验矿池、委托步骤、选择要点、FAQ、来源）。新增共享 `d5-pages.css`（页头、章节闸门、富页脚）与 `d5-pages.js`（出场与视差），页面由 scratchpad 脚本统一生成以保证导航与页脚一致；Products 路由已重定向到 Projects，不单独设计；首页导航接入各页面；总览页新增第四轮入口。
- 2026-10-24 23:00 +08:00 | 用户认为作品 / 博客 / Skills 页头文字过多。确立页头规则「路径 + 短标题 + 最多一句说明」，去掉英文眉标与数据行（与路径、分类筛选重复）：作品「作品」+「AI 产品、开源基础设施与链上应用。」；博客「博客」+「Cardano、AI 与独立开发的思考与记录。」；Skills「工程 Skills」+「面向 Coding Agent，开源、可独立安装。」与 GitHub 链接。375 px scrollWidth=375。
- 2026-10-24 23:10 +08:00 | 按用户反馈精简作品页：删除「BUILD IN PUBLIC / 开发过程都写在博客里」引导卡，删除基础设施与应用两个章节闸门右侧的分类描述。
- 2026-10-24 23:30 +08:00 | 用户指出部分页面为 SEO/GEO 占位，不应出现在导航。核对确认：`/staking` 按 S0002.1 为机器优先低曝光页（不进顶部导航、Footer、首页、Projects），`/about` 按 S0004 不进顶部导航、Footer、首页、Projects，`/governance` 现有导航与 Footer 均无入口。D5 原型页脚移除 CARDANO 栏（质押指南、治理、Pao Pool）与「关于 Pao Studio」，仅保留作品 / 博客 / Skills 与 X / GitHub；文章页底部委托卡改为直链 Cexplorer；About 页「查看 Pao Pool 详情」属正文上下文链接，保留。脚本核对 8 个 D5 页面的导航与页脚均不含 staking / about / governance 入口。s6-03 起实现须遵守同一入口约束。
- 2026-10-24 23:40 +08:00 | 页脚简介随首页口径调整：由「扎根 Cardano 的『一人公司』实验……」改为「在 Cardano 上构建 AI 产品与开源工具。Stake with PAO Pool，获取质押奖励，同时享受增值服务。」（待审初稿；实现时需同步三语 `footer.blurb`）。
- 2026-10-24 23:55 +08:00 | 首页与文章页改用与其余页面相同的富页脚（含新简介与 epoch 时钟）。用户指出文章详情页缺少设计：按 D5 语言重做 `d5-article.html`（由页面脚本生成）：顶部 Logo 渐变阅读进度条；页头为路径、分类色块、大标题、元信息（日期、作者链接到 About#martin——属 S0004 允许的作者入口、阅读时长、标签）与 21:9 封面；正文深色排版，左侧粘性编号目录随章节高亮，H2 带编号与霓虹短线并按 Logo 色轮换，代码块为终端样式；文末为作者卡、上一篇 / 下一篇、Stake with PAO Pool 委托条（直链 Cexplorer）。1440 截图检查，375 px scrollWidth=375。
- 2026-10-25 00:20 +08:00 | 用户确认按 D5 原型更新官网实现。s6-02 冻结合同：新增 `docs/redesign-v2/final/DESIGN-neon-d5.md` 作为实现依据（Bubble-light 文档保留为历史）；按下方 Change Log 改写视觉、动效、语义与验收合同；组件清单为：霓虹样式层、NavBar、富页脚、粒子层、开场、Hero（色块、状态栏、阶段进度、跑马灯）、Reveal / 视差、章节闸门、页头、作品 / 文章 / P·A·O / 成员 / 收尾区块、博客列表、文章页、作品页、Skills、About、Staking、Governance 与提案详情。

## 5. Validation Evidence (append-only)

- TC-01 | stack: browser | command: agent-browser 375×812 打开 index/A/B/C，比较 `scrollWidth` 与 `innerWidth`，并截取 1440 px 整页 | result: pass | note: 四页 scrollWidth=375；B 的策略图在入场缩放前被容器裁切，不构成溢出；原型只使用 Bubble-light 八色、Inter/AlibabaPuHuiTi，Footer 为浅色
- TC-01 | stack: browser | command: agent-browser 1440×900 与 375×812 打开 D/E，比较 `scrollWidth`，并检查图片加载与整页截图 | result: pass | note: 两页两档 scrollWidth=viewport；D 使用深色底与 JetBrains Mono，E 使用纸张底色与 riso 油墨色，均超出 1.5 视觉合同，属用户授权的探索稿
- TC-01/03 | stack: browser | command: agent-browser 1440×900 与 375×812 重播开场，逐帧截图并检查结束态 | result: pass | note: 开场结束后 overlay 与 ghost 节点全部移除，Hero 色块与原布局重合，375 px scrollWidth=375；reduced-motion 时 `intro-on` 不加入
- TC-01/03 | stack: browser | command: agent-browser 1440×900 与 375×812 打开 D v2 首页（`?intro`）与 `d-article.html`，比较 `scrollWidth`、截图检查开场、Hero、滚动解体、夜读切换，并以 reduced-motion 打开首页 | result: pass | note: 两页两档 scrollWidth=viewport（修复文章页代码块负边距与正文侧边距后）；开场结束后 overlay/ghost 移除，sessionStorage 记录后再次打开不播；reduced-motion 下不加入 `intro-on`，色块无 translate、跑马灯静止；D 仍使用深色底与 JetBrains Mono，属用户授权的探索稿
- TC-01 | stack: browser | command: agent-browser 1440×900 与 375×812 打开 D 首页（`?intro`），强制显示全部 reveal 后整页截图，比较 `scrollWidth` | result: pass | note: 修复三步委托网格在 375 px 被终端 nowrap 撑宽（408 px）后两档 scrollWidth=viewport；阶段目标显示 STAGE 01 · 1M ADA，还差 998,460 ADA，标记位于 0.154%
- TC-01/03 | stack: browser | command: agent-browser 1440×900 与 375×812 逐段滚动 D 首页，统计 `[data-reveal].in` 并比较 `scrollWidth` | result: pass | note: 修复后滚动到的 reveal 元素全部加入 `.in` 与 `.done`；375 px 滚动到底 17/17 揭示，scrollWidth=375
- TC-01 | stack: browser | command: agent-browser 1440×900 与 375×812 逐段滚动 D 首页，统计 reveal、比较 `scrollWidth`，悬停 Coil 卡检查唤醒态，整页截图 | result: pass | note: 两档 22/22 reveal 触发，scrollWidth=viewport；Coil 悬停切换唤醒场景，触屏设备默认显示唤醒态
- TC-01 | stack: browser | command: agent-browser 1440×900 与 375×812 逐段滚动 D 首页，统计 reveal、比较 `scrollWidth`、检查 H2 顺序 | result: pass | note: 两档 17/17 reveal 触发，scrollWidth=viewport；H2 顺序为 P·A·O / 项目 / 链上的成员 / 文章 / LET'S BUILD.
- TC-01 | stack: browser | command: agent-browser 1440×900 与 375×812 逐段滚动 D 首页，统计 reveal、比较 `scrollWidth`，悬停 Coil 横幅 | result: pass | note: 删除今日 Cardano 后 375 px 16/16 reveal 触发、scrollWidth=375；桌面 Coil 横幅悬停切换唤醒场景
- TC-01 | stack: browser | command: agent-browser 1280×900（agent-browser 默认视口）与 375×812 逐段滚动 D 首页，统计 reveal、比较 `scrollWidth`、检查 H2 顺序 | result: pass | note: 两档 16/16 reveal 触发、scrollWidth=viewport；H2 顺序为 项目 / 文章 / P·A·O / 链上的成员 / LET'S BUILD.
- TC-01/03 | stack: browser | command: agent-browser 1440×900 与 375×812 逐段滚动 D 首页（含 `?intro`），统计 reveal、比较 `scrollWidth`，截图检查粒子与装饰位置 | result: pass | note: 两档 16/16 reveal 触发、scrollWidth=viewport；开场结束后 intro 节点移除；粒子 canvas 固定于内容下层，不影响交互
- TC-01 | stack: browser | command: agent-browser 1440×900 逐章/逐场景截图 D1–D3，并在 375×812 滚动到底比较 `scrollWidth` | result: pass | note: 三版 375 px scrollWidth=375；D2 桌面轨道宽 12597 px 随滚动平移、HUD 时间轴随章节高亮；D3 键盘切换 7 个场景，形状蒙版与 HUD 正常，窄屏不加入 `scenes` 类
- TC-01 | stack: browser | command: agent-browser 1440×900 逐章截图 D4，375×812 滚动到底统计 reveal 并比较 `scrollWidth` | result: pass | note: 桌面 24/24 reveal 触发；375 px scrollWidth=375、全部 reveal 触发，HUD 隐藏、卡片纵排
- TC-01/03 | stack: browser | command: agent-browser 1440×900 打开 D5（`?intro`）检查开场结束与整页截图，375×812 滚动到底统计 reveal 并比较 `scrollWidth` | result: pass | note: 开场结束后 intro 节点移除；桌面 24/24 reveal 触发、scrollWidth=1440；375 px 24/24 reveal、scrollWidth=375
- TC-01 | stack: browser | command: agent-browser 1440×900 整页截图 7 个页面，并在 375×812 检查 8 个 D5 页面 `scrollWidth` 与越界元素 | result: pass | note: 修复 Skills 安装命令与质押页 Pool ID 在窄屏撑宽网格（改为 minmax(0, 1fr) 与 min-width: 0）后，8 个页面 375 px 均 scrollWidth=375；文章页代码块在块内横向滚动
- TC-06 | stack: source | command: 扫描 8 个 D5 原型页 `nav.nav` 与 `footer` 中的 staking / about / governance 链接 | result: pass | note: 0 处；原型切换条仅用于原型浏览，不进入实现
- TC-01/02 | stack: manual | command: 对照 D5 原型与 `DESIGN-neon-d5.md` 复核视觉、动效、入口与语义合同 | result: pass | note: 合同覆盖 token、字体、版式、动效数值、reduced-motion / 无 JS 降级与低曝光入口；S0002.2 视觉断言的取代范围已记录

## 6. Change Log (append-only)

- 2026-10-24 08:49 +08:00 | Initial spec. 注册表轮廓中的六个事项细化为七个：拆出 s6-02 方向选定与动效合同冻结，原型先行。
- 2026-10-24 10:30 +08:00 | 范围补充：用户允许原型突破当前排版、内容与 Bubble-light 八色/浅色画布合同，以 Logo 霓虹色（#FC5FF6/#C60A76、#2FFFF3/#078CBE、#FFF590/#D9B201、#31EE6B/#079F1B、#C141F2/#590AC6）探索；允许删除首页「收入构成」。若选定 D 或 E，s6-02 须以 Change Log 形式改写 1.5 视觉合同，并评估是否同步更新 `DESIGN-bubble-light.md`。
- 2026-10-25 00:20 +08:00 | s6-02 合同改写（用户授权选定 D5）。1.5 视觉合同由 `DESIGN-neon-d5.md` 取代：深色画布 `#0a0910`、Logo 霓虹色、JetBrains Mono 仅用于标签与数据、深色页脚、1180 px 阅读栏、章节闸门。1.6 动效合同数值见该文档第 2 节。1.7 语义合同调整：首页可见 H1 改为「Stake with PAO Pool」（三语一致），首页 metadata 标题与描述不变；授权新增首页文案（Hero 副标题、P·A·O、区块标题、成员与收尾）、页脚简介、页头短说明与文章页辅助标签（目录、复制链接、上一篇 / 下一篇、委托条），三语同步；各页唯一 H1、section ID、canonical、hreflang、JSON-LD、sitemap 与 S0003 / S0004 合同保持。入口约束：`/staking`、`/about`、`/governance` 不进入导航、页脚、首页与 Projects。S0002.2 的 staking 视觉系统（Incana / lemon 嵌入容器、禁用阴影卡片与五列布局等源码断言）被本合同取代，s6-06 更新 `scripts/verify-staking-hub.mjs` 中对应断言，staking 事实、section ID、FAQ、来源与低曝光断言保持不变。TC-02 改为：实现只使用 `DESIGN-neon-d5.md` token、Inter / AlibabaPuHuiTi 与 JetBrains Mono，页脚为深色且不含低曝光页入口。
