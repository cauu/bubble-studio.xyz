# S0003 Content Template And Topic Network

## Spec Control

- Spec ID：S0003
- Status：ACTIVE
- Created：2026-09-02 20:23 +08:00
- Depends on：S0002 COMPLETE；S0002.2 COMPLETE
- Active registry：`docs/specs/README.md`

## 1. Requirement Details

### 1.1 Diagnosis Brief

- Subject：Pao Studio article template and Cardano topic network
- Scope：site
- Audience：阅读 Cardano、AI Agent 与独立开发内容的人，以及需要抽取和核验文章信息的检索系统
- Goals：稳定提供编辑摘要、真实修订信息和受控主题链接，同时保持三语 canonical、结构化数据与现有 Blog 视觉完全一致

### 1.2 Evidence Baseline

- 仓库共有 45 个三语 Markdown 文件；`summary`、`updated`、`sources`、`related` frontmatter 字段均为 0。
- 文章模板把去标签后的正文前 160 个字符直接当作 description，无法保证摘要完整、语言自然或与页面直接答案一致。
- BlogPosting 已有 `datePublished`、author name、publisher 与 language，但没有 `dateModified`，description 也没有编辑合同。
- 45 篇文章正文只含 6 条站内链接，全部来自两个文章家族指向对应语言的 staking 主题页。
- `geo-diagnose` deterministic 执行器因安装包缺少 `geo_seo_hub` 模块失败，没有产生 Artifact Bus。本 Spec 只使用仓库源码、文章 frontmatter、可见链接和经核验的一手来源形成明确标注的降级诊断。

### 1.3 Goal

建立一个不改变页面视觉的向后兼容文章数据合同，并以三个 Cardano 相关三语文章家族作为试点，让 metadata 与 BlogPosting 使用人工摘要和真实修订日期，同时通过正文中的普通文本链接形成明确而克制的主题关系。

### 1.4 Content Contract

- 新增可选 `summary` 与 `updated` frontmatter；旧文章缺少字段时继续正常渲染。
- `summary` 是作者编辑的完整摘要；存在时驱动 metadata description 与 BlogPosting description，但本轮不新增可见摘要模块。
- `updated` 只记录本轮实际修订日期，并写入 BlogPosting `dateModified`；未提供时不伪造修改时间。
- 主题关系只通过正文中人工编写的普通 Markdown 链接建立，不增加自动推荐逻辑或新的可见 UI 容器。
- 不新增 messages、CSS class、图片、卡片、来源区、相关文章区或文章页交互。

### 1.5 Pilot Scope

试点覆盖三个文章家族、共九个 Markdown 文件：

- `20260405-subscriptions-are-failing-*`
- `20260131-digital-sovereignty-*`
- `20260325-composability-ai-cardano-ethereum-*`

每个试点文件补齐本语言 summary 与真实修订日期。前两个家族保留现有 staking 正文链接并各增加一条相关文章普通文本链接；组合性文章增加对应语言的 staking 与相关文章普通文本链接。

### 1.6 Non-goals

- 不批量重写其余 36 篇文章，不为观点性判断伪造来源。
- 不在本阶段创建作者详情页、Person 实体 ID 或外部身份对齐；这些属于 S0004。
- 不新增可见摘要、修订日期、来源、相关文章组件，不调整 Blog 列表、文章正文、封面、分类、评论或响应式样式。
- 不自动生成标签页、分类落地页、目录或全站推荐算法。
- 不改 staking 页的低曝光入口策略，不把 staking 恢复到顶部导航、Footer、首页或 Projects。
- 不部署，不承诺排名、流量、索引或 AI 引用提升。

## 2. Execution Plan

- [x] s3-01 固化 45 篇文章基线、内容字段、试点范围、证据边界和回退合同。Acceptance：TC-01、TC-06。
- [ ] s3-02 实现 typed frontmatter、统一 description 与 BlogPosting `dateModified`，不改变文章视觉结构。Acceptance：TC-01 至 TC-04。
- [ ] s3-03 为九个试点文件补齐三语摘要、修订日期和人工正文链接。Acceptance：TC-02 至 TC-05。
- [ ] s3-04 建立并验证三语试点主题链接图，不恢复醒目 staking 入口。Acceptance：TC-04 至 TC-06。
- [ ] s3-05 完成构建、三语浏览器检查、结构化数据、旧文章兼容和 S0001/S0002 回归证据。Acceptance：TC-01 至 TC-07。

## 3. Test And Acceptance Criteria

- TC-01：不含新字段的旧文章仍返回 200，metadata 与页面可渲染；frontmatter 解析不使用不受控的 `any` 扩散新字段。
- TC-02：九个试点页都有本语言 summary 与 `updated: 2026-09-02`；三个 locale 的 metadata 与正文链接不互相串语言。
- TC-03：试点页 metadata description 与 BlogPosting description 等于 frontmatter summary；`datePublished` 保持原值，`dateModified` 等于真实 `updated`。
- TC-04：文章页 JSX 的可见结构与样式 class 不新增摘要、来源、相关文章或日期模块；旧文章的生成 HTML 可见正文保持兼容。
- TC-05：三个组合性文章新增对应语言 staking 与相关文章链接；现有六条 staking 正文链接保持；新增站内链接无 404。
- TC-06：顶部导航、Footer、首页与 Projects 不新增醒目 staking 入口；`llms.txt`、sitemap 与普通用户/Googlebot 同内容继续通过。
- TC-07：`pnpm exec tsc --noEmit`、`pnpm build`、Prettier、`git diff --check`、S0001、S0002 与 S0003 专项验收通过。

## 4. Execution Log (append-only)

- 2026-09-02 20:23 +08:00 | 用户确认关闭 S0002.2 并继续；注册并激活 S0003。
- 2026-09-02 20:23 +08:00 | 按 `geo-diagnose` Skill 准备五页公开文章 brief 并启动 deterministic 执行；入口脚本因 `ModuleNotFoundError: geo_seo_hub` 退出，未产生运行目录。
- 2026-09-02 20:23 +08:00 | s3-01 以源码降级诊断冻结 45 篇文章、四类字段均为 0、六条站内正文链接、三语三文章家族试点和不伪造来源边界。
- 2026-09-02 20:31 +08:00 | 用户要求收窄 S0003；冻结为 metadata、BlogPosting 与普通正文内部链接变更，明确禁止任何 Blog 可见模板或样式调整。

## 5. Validation Evidence (append-only)

- TC-01/06 | stack: repository | command: count `posts/*.md`; search `summary`/`updated`/`sources`/`related` and Markdown internal links | result: fail-before | note: posts=45, each new field=0, internal body links=6
- TC-03/04 | stack: source | command: inspect `src/app/[locale]/blogs/[slug]/page.tsx` and `src/lib/posts.ts` | result: fail-before | note: description is first 160 stripped characters; BlogPosting has no dateModified or typed editorial summary
- TC-04 | stack: primary-source research | command: verify Cardano Docs delegation/EUTXO and ERC-4337 canonical pages | result: pass-input | note: pilot source URLs resolve to official first-party documentation
- TC-07 | stack: skill-runtime | command: `python3 .agents/skills/geohub-geo-diagnose/scripts/run_diagnose.py ... --execution-mode deterministic` | result: blocked-tooling | note: missing `geo_seo_hub`; no Artifact Bus claimed

## 6. Change Log (append-only)

- 2026-09-02 20:23 +08:00 | Initial immutable spec. S0002.2 remains COMPLETE; S0003 is the only ACTIVE spec.
- 2026-09-02 20:31 +08:00 | Scope narrowed by user before implementation: no visible Blog template or style changes; sources/related UI removed from the execution contract.
