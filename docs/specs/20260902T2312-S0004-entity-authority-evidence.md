# S0004 Entity Authority And Evidence Consistency

## Spec Control

- Spec ID：S0004
- Status：ACTIVE
- Created：2026-09-02 23:12 +08:00
- Depends on：S0003 COMPLETE
- Active registry：`docs/specs/README.md`

## 1. Requirement Details

### 1.1 Diagnosis Brief

- Subject：Pao Studio 品牌、作者与 Pao Pool 的实体身份
- Scope：brand
- Audience：搜索引擎、AI 回答系统、读者与技术评估者
- Goals：建立稳定且有证据支撑的组织、作者与矿池关系；分开组织身份链接和项目链接；保持低曝光且不增加无法验证的宣传说法

### 1.2 Evidence Baseline

- 根布局已有稳定 Organization 与 WebSite `@id`，但把 GitHub、X 和 CardanoScan 矿池页一起写入 Organization `sameAs`，混合了个人身份与矿池项目。
- About 路由目前重定向到首页，没有可供作者、组织和项目共同引用的独立事实页；sitemap 也没有列出 About。
- 45 篇文章中 42 篇署名 Martin，3 篇署名 MartinBot。BlogPosting 只输出没有稳定 `@id` 的内联 Person，页面作者名也不可点击。
- 站点当前使用 Pao Studio，根 JSON-LD 已把 Bubble Studio 作为 alternateName；现有公开域名与较早公开首页仍使用 Bubble Studio，可据此保留别名关系。
- 网站配置连接的 GitHub 账号为 `cauu`，公开资料显示名为 `0xMartin`；现有文章署名为 Martin。S0004 只建立这两个公开名字的关联，不补写履历、年限、资历或无法核验的成果。
- Pao Pool 的 pool ID 已在首页、staking 页和配置中一致出现。CardanoScan 页面属于矿池服务的外部证据，不属于 Pao Studio Organization 的同一身份页面。
- `public/md.json` 含较早的 Bubble Studio 描述，可能参与链上 metadata hash。未核对链上登记和 hash 前禁止修改。
- `geo-diagnose` deterministic 执行器因安装包缺少 `geo_seo_hub` 模块失败，没有产生 Artifact Bus。本 Spec 使用公开页面、仓库源码和配置做明确标注的降级诊断。

### 1.3 Goal

让 Pao Studio、Martin / 0xMartin 与 Pao Pool 分别拥有稳定实体 ID，并通过一个简洁的三语 About 事实页、文章作者链接和一致的结构化数据建立可核验关系。

### 1.4 Identity Contract

- Organization ID：`https://www.bubble-studio.xyz/#organization`。
- WebSite ID：`https://www.bubble-studio.xyz/#website`。
- Person ID：`https://www.bubble-studio.xyz/about#martin`，显示名 Martin，alternateName 为 0xMartin。
- Pao Pool Service ID：`https://www.bubble-studio.xyz/staking#pao-pool`，identifier 使用完整 pool ID。
- GitHub 与 X 归入 Person `sameAs`；CardanoScan 与 Cexplorer 归入 Pao Pool Service `sameAs`。
- Person 通过 `worksFor` 连接 Organization；Pao Pool Service 通过 `provider` 连接 Organization；BlogPosting 只在作者为 Martin 时引用 Person ID。
- MartinBot 保留独立署名，不映射成 Martin，也不生成虚假的个人资料链接。

### 1.5 Visible Scope

- 把现有 `/about` 重定向页改成三语事实页，内容只包括 Pao Studio / Bubble Studio 名称关系、Martin / 0xMartin 的公开角色、Pao Pool 关系、pool ID、GitHub、X、CardanoScan、Cexplorer 与联系邮箱。
- About 使用现有字体、颜色、间距、边框与按钮系统，不创建新的全站视觉语言。
- 42 篇 Martin 文章的可见作者名改为同语言 About 锚点链接，保持原有字号、位置和布局；3 篇 MartinBot 不变。
- About 不进入顶部导航、Footer、首页、Projects 或 staking 的醒目入口。其主要入口是文章作者链接和机器可读清单。

### 1.6 Non-goals

- 不改 Blog 列表或文章正文样式，不新增作者卡片、推荐模块、弹窗或营销区块。
- 不修改 GitHub、X、CardanoScan 或其他外部账号资料；外部写操作需要另行授权。
- 不修改 `public/md.json`，不触碰潜在链上 metadata hash。
- 不扩写项目维护状态、团队履历、客户、收入、奖项、年限或绩效结果。
- 不恢复 staking 的顶部导航、Footer、首页或 Projects 入口。
- 不部署，不承诺搜索排名、流量、收录或 AI 引用结果。

## 2. Execution Plan

- [ ] s4-01 固化证据基线、稳定实体 ID、可见范围和未知项。Acceptance：TC-01、TC-06。
- [x] s4-02 建立 Organization、Person、WebSite 与 Pao Pool Service 的可复用实体图。Acceptance：TC-02、TC-03。
- [ ] s4-03 实现三语 About 事实页、metadata、结构化数据与 sitemap 收录。Acceptance：TC-01、TC-04。
- [ ] s4-04 把 Martin 的文章署名连接到 Person ID 与本语言 About，保留 MartinBot 边界，并更新机器清单。Acceptance：TC-03、TC-05、TC-06。
- [ ] s4-05 完成构建、三语响应式浏览器检查、结构化数据、链接和 S0001-S0003 回归。Acceptance：TC-01 至 TC-07。

## 3. Test And Acceptance Criteria

- TC-01：`/about`、`/zh/about`、`/tw/about` 返回 200；各有一个 H1、自指 canonical、完整 hreflang、正确 html lang 与本语言可见事实。
- TC-02：全站 JSON-LD 中 Organization、Person、WebSite 与 Service 使用稳定 ID；Person 和 Service 分别正确连接 Organization。
- TC-03：Organization `sameAs` 不再包含 CardanoScan；Person `sameAs` 包含 GitHub 与 X；Service `sameAs` 包含 CardanoScan 与 Cexplorer；pool ID 与配置完全一致。
- TC-04：About 的可见名称、角色、链接和 pool ID 与 JSON-LD 一致；三语页面在 375 和 1440 宽度无横向溢出，并符合现有设计 token。
- TC-05：Martin 文章的可见署名指向同语言 About 锚点，BlogPosting author 引用稳定 Person ID；MartinBot 文章不出现该链接或错误 ID。
- TC-06：About 不出现在顶部导航、Footer、首页或 Projects；sitemap 与 `llms.txt` 可以发现 About；`public/md.json` 内容不变。
- TC-07：`pnpm exec tsc --noEmit`、`pnpm build`、Prettier、`git diff --check`、S0001、S0002、S0003 与 S0004 专项验收通过。

## 4. Execution Log (append-only)

- 2026-09-02 23:12 +08:00 | 用户确认继续 S0004；注册并激活实体权威与证据一致性 spec。
- 2026-09-02 23:12 +08:00 | 按 `geo-diagnose` Skill 准备品牌、About、文章、GitHub 与 CardanoScan brief 并启动 deterministic 执行；入口脚本因 `ModuleNotFoundError: geo_seo_hub` 退出，未产生运行目录。
- 2026-09-02 23:12 +08:00 | s4-01 以公开页面、仓库源码和配置完成降级诊断，冻结四个稳定实体 ID、低曝光可见范围、MartinBot 例外及 `public/md.json` 禁改边界。
- 2026-09-02 23:19 +08:00 | s4-02 增加统一实体 helper；GitHub/X 归入 Martin，CardanoScan/Cexplorer 归入 Pao Pool Service，Organization、Person、WebSite 与 Service 通过稳定 ID 建立关系。

## 5. Validation Evidence (append-only)

- TC-01/02 | stack: source | command: inspect About route, locale layout and sitemap | result: fail-before | note: About redirects; sitemap omits About; site graph has only Organization and WebSite
- TC-03 | stack: source | command: inspect Organization sameAs | result: fail-before | note: personal GitHub/X and pool CardanoScan links are mixed in one Organization identity list
- TC-05 | stack: content+source | command: count post authors and inspect BlogPosting/UI author | result: fail-before | note: Martin=42, MartinBot=3; all authors are unlinked inline Person nodes
- TC-06 | stack: repository | command: inspect `public/md.json` and configured pool ID | result: protected-input | note: legacy description recorded; file excluded until on-chain metadata hash is verified
- TC-07 | stack: skill-runtime | command: `python3 .agents/skills/geohub-geo-diagnose/scripts/run_diagnose.py ... --execution-mode deterministic` | result: blocked-tooling | note: missing `geo_seo_hub`; no Artifact Bus claimed
- TC-02/03 | stack: type+source | command: `pnpm exec tsc --noEmit`; inspect site entity graph | result: pass | note: four stable IDs share one helper; identity and service sameAs links are separated by entity

## 6. Change Log (append-only)

- 2026-09-02 23:12 +08:00 | Initial immutable spec. S0003 remains COMPLETE; S0004 is the only ACTIVE spec.
