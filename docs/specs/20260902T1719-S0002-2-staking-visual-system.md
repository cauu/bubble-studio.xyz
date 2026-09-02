# S0002.2 Staking Visual System Correction

## Spec Control

- Spec ID：S0002.2
- Status：ACTIVE
- Created：2026-09-02 17:19 +08:00
- Corrects：S0002 的页面视觉设计，不改变 S0002.1 的入口层级
- Depends on：S0002.1 COMPLETE
- Active registry：`docs/specs/README.md`

## 1. Requirement Details

### 1.1 User Evidence

用户提供四张桌面截图并指出 staking 页面卡片、样式和配色没有遵循网站设计规范。截图覆盖奖励时间、五步委托、矿池评估、会员强调区和 FAQ。

### 1.2 Observed Design Gaps

- 全宽纯黑奖励区与全宽黄色会员区把页面切成独立活动页，偏离 warm-neutral canvas 与 Incana 单一深色锚点规则。
- 机制、步骤、检查项和来源都使用圆角、描边、阴影卡片，容器层级过多，内容优先级反而变弱。
- 五列委托卡在中文环境中过窄，标题和正文换行碎裂，不符合长文阅读节奏。
- 同类信息同时使用白卡、灰卡、黑卡、青色图标块和黄色色带，品牌色缺乏角色约束。
- FAQ 左侧标题占据过大空白，阅读路径断裂。

### 1.3 Goal

在不修改正文事实、三语 metadata、JSON-LD、页面 ID、机器入口和低曝光策略的前提下，把 staking 页面重构为符合 Bubble-light 规范的编辑式长文页面。

### 1.4 Visual Contract

- 页面地面统一使用 `canvas`；白色和 cool-lavender 仅作为聚合容器或交替阅读区，不使用纯黑全宽内容段。
- Incana 只用于一个内嵌奖励强调容器；lemon 只用于小范围会员强调容器或标签，不形成全宽色带。
- 机制、五步委托、矿池检查和来源改为带分隔线的列表或网格行，单项不再拥有独立阴影卡。
- 页面只在 Hero pool ledger、奖励聚合容器、Pao Pool 身份聚合容器和会员强调容器使用明显容器层级。
- 标题使用现有 display 尺度；中文标题不增加负 tracking。正文宽度控制在可读行长，主要正文使用 15–17 px、1.65–1.8 行高。
- 桌面内容列不使用五个等宽窄卡；375 px 下所有结构退化为单列，CTA 可触达且无横向溢出。
- 交互只保留按钮、链接和 FAQ disclosure；hover、focus-visible 与 reduced-motion 继承全站规则。

### 1.5 Semantic Preservation Contract

- 保留唯一 H1 和 `how-it-works`、`rewards`、`pao-pool`、`delegate`、`choose-a-pool`、`membership`、`faq`、`sources` 八个 section ID。
- FAQ 的五组可见问答与 FAQPage JSON-LD 逐项一致。
- 保留 WebPage、BreadcrumbList、FAQPage、canonical、hreflang、pool ID、四个官方来源与三组相关文章。
- 不恢复顶部导航、Footer、首页或 Projects 的醒目 staking 入口。
- `/llms.txt`、sitemap 和普通用户/Googlebot 同内容验收保持通过。

### 1.6 Non-goals

- 不修改 staking 文案或新增营销主张。
- 不创建新插画、位图或第三方组件库。
- 不重构全站设计系统、首页、博客或 Projects 页面。
- 不部署生产环境，不测量或承诺搜索排名与 AI 引用变化。

## 2. Execution Plan

- [x] c2.2-01 固化截图问题、设计 token、容器预算与语义保留合同。Acceptance：TC-01、TC-05。
- [ ] c2.2-02 重构 staking 页面布局、配色、列表、强调容器和响应式表现。Acceptance：TC-01 至 TC-04。
- [ ] c2.2-03 完成三语桌面/移动视觉验收、自动回归、构建与证据记录。Acceptance：TC-01 至 TC-06。

## 3. Test And Acceptance Criteria

- TC-01：页面不含全宽 `bg-primary` 或全宽 `bg-brand-lemon` 内容 section；奖励使用内嵌 Incana 容器，会员使用内嵌 lemon 容器。
- TC-02：机制、委托步骤、矿池检查和来源单项不使用独立阴影卡；桌面委托步骤不再使用五个等宽窄列。
- TC-03：375 × 812、768 × 900、1440 × 900 下无横向溢出，标题、CTA、pool ID、列表、FAQ 和来源无裁切或不可读重叠。
- TC-04：设计只使用现有 token 和组件，焦点状态与 disclosure 交互可用，不新增图片依赖。
- TC-05：三语 HTML 的唯一 H1、八个 section、五组 FAQ、metadata、JSON-LD、来源、相关文章、sitemap、`llms.txt` 与非 cloaking 验收全部保持通过。
- TC-06：`pnpm exec tsc --noEmit`、`pnpm build`、Prettier、`git diff --check`、S0001 与 staking 验收脚本通过。

## 4. Execution Log (append-only)

- 2026-09-02 17:19 +08:00 | 用户提供四张页面截图并要求修复卡片、样式和配色与设计规范不一致的问题。
- 2026-09-02 17:19 +08:00 | 对照 `docs/principle/design.md`、`docs/redesign-v2/final/DESIGN-bubble-light.md`、Tailwind token 和现有首页组件，创建并激活 S0002.2。
- 2026-09-02 17:19 +08:00 | c2.2-01 冻结色彩角色、容器预算、编辑式列表、三档响应式和 S0002 语义保留合同。

## 5. Validation Evidence (append-only)

- TC-01/02 | stack: visual+source | command: inspect four supplied screenshots and staking component structure | result: fail-before | note: 全宽黑/黄 band、十二个以上阴影卡、五列中文步骤与 FAQ 空白比例共同造成视觉系统漂移
- TC-04 | stack: design-contract | command: compare Tailwind tokens and Bubble-light specification | result: pass-contract | note: 修正只允许使用现有 canvas、surface、Incana、lemon、hairline、rounded 与 typography tokens

## 6. Change Log (append-only)

- 2026-09-02 17:19 +08:00 | Initial corrective spec. S0002/S0002.1 remain immutable completed records; this spec changes presentation only.
