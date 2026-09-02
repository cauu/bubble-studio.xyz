# S0002.1 Machine-first Staking Entry Correction

## Spec Control

- Spec ID：S0002.1
- Status：ACTIVE
- Created：2026-09-02 17:09 +08:00
- Corrects：S0002 的入口层级与页面定位，不撤销其事实、三语 URL 或结构化数据合同
- Depends on：S0002 COMPLETE
- Active registry：`docs/specs/README.md`

## 1. Requirement Details

### 1.1 User Direction

用户确认 `/staking` 现阶段应优先服务搜索与 AI crawler 的提取和引用，不作为普通用户可见的主导航或产品落地页推广。入口位置确定为根目录 `/llms.txt`、`/sitemap.xml`、相关博客正文中的自然链接和直接 URL。

### 1.2 Goal

把三语 staking 主题页调整为公开、可索引、机器优先且低曝光的语义文档，同时确保普通用户和 crawler 获得相同事实内容，避免 User-Agent 分流或隐藏文本形成 cloaking 风险。

### 1.3 User-visible Outcome

- 顶部导航、Footer、首页额外引导和 Projects 页不再展示 staking 主题页入口。
- 相关博客中的进一步阅读链接保留；知道 URL 的用户仍能直接访问主题页。
- 页面本身继续是可访问的公开 HTML，但视觉与信息架构不在本 spec 扩张为产品功能。

### 1.4 Machine Entry Contract

- 新增公开 `https://www.bubble-studio.xyz/llms.txt`。
- `llms.txt` 使用 `text/plain; charset=utf-8`，列出品牌与 Pao Pool 实体、完整 pool ID、三语 canonical 主题页、sitemap 和 S0002 已核验的一手来源。
- sitemap 继续列出三个 staking URL；robots.txt 继续通过标准 `Sitemap` 指令连接 sitemap，不添加非标准 robots 指令。
- 三语页面继续输出 canonical、hreflang、可见正文和与正文一致的 JSON-LD。

### 1.5 Constraints

- 不根据 User-Agent、IP、来源或 JavaScript 能力返回不同核心内容。
- 不把 `llms.txt` 描述为 Google、Bing 或任何 AI 平台保证采用的标准。
- 不使用隐藏关键词、透明文字、屏幕外堆砌内容或只对 crawler 输出的内容。
- 不声称这次修改提高了排名、流量、索引率、AI 召回率或引用份额。
- 单次 `geo-diagnose` 复核最多使用五个明确 HTML URL；纯文本发现入口单独记录。
- 不部署生产环境，不连接外部账号。

### 1.6 Non-goals

- 不删除或 `noindex` 三语 staking 页面。
- 不重写 S0002 的协议事实、FAQ、来源或结构化数据。
- 不新增钱包连接、收益计算、委托交易或营销转化功能。
- 不提前执行 S0003 内容模板改造。

## 2. Execution Plan

- [x] c2.1-01 激活修正 spec，冻结机器入口、低曝光和非 cloaking 合同。Acceptance：TC-01、TC-05。
- [x] c2.1-02 撤下导航、Footer、首页与 Projects 页的醒目入口，保留文章上下文入口。Acceptance：TC-02、TC-03。
- [x] c2.1-03 新增根目录 `llms.txt` 机器索引。Acceptance：TC-01、TC-04。
- [ ] c2.1-04 更新自动验收并完成生产构建、五页以内 HTML 抽样与证据追加。Acceptance：TC-01 至 TC-06。

## 3. Test And Acceptance Criteria

- TC-01：`/llms.txt` 返回 200 `text/plain`，包含 Pao Studio、Pao Pool、完整 pool ID、三语 staking canonical、sitemap 和四个一手来源。
- TC-02：三语页面的主导航与 Footer 不含 staking 入口；首页和 Projects 正文不含 `/staking` 入口或 Pao Pool 项目卡。
- TC-03：两组三语文章共六个文件保留对应语言的 staking 上下文链接；主题页继续反向连接相关文章。
- TC-04：普通请求与 Googlebot User-Agent 请求获得相同的 `/staking` HTML；页面不含 `noindex`，sitemap 继续列出三语 URL。
- TC-05：三语页面仍返回 200，并保留唯一 H1、canonical、hreflang、八个内容区块、五组可见 FAQ 及一致的 WebPage、BreadcrumbList、FAQPage JSON-LD。
- TC-06：`pnpm exec tsc --noEmit`、`pnpm build`、Prettier、`git diff --check`、S0001 回归脚本与修正后的 staking 验收脚本通过。

## 4. Execution Log (append-only)

- 2026-09-02 17:09 +08:00 | 用户确认采用机器优先、低曝光入口策略；明确入口为 `/llms.txt`、sitemap、相关文章上下文链接和直接 URL。
- 2026-09-02 17:09 +08:00 | 创建并激活 S0002.1；S0003-S0005 保持 QUEUED。
- 2026-09-02 17:09 +08:00 | c2.1-01 冻结四类入口、四处撤下范围、三语公开 HTML 与非 cloaking 验收合同。
- 2026-09-02 | c2.1-02 撤下顶部导航、Footer、首页额外引导和 Projects 页 Pao Pool 卡片，并恢复 ProjectCard 的纯外部项目合同；六篇相关文章的三语上下文链接保持不变。
- 2026-09-02 | c2.1-03 新增根目录 `public/llms.txt`，提供实体、pool ID、三语 canonical 页面、链上浏览器、四个协议来源、sitemap 与 robots 入口。

## 5. Validation Evidence (append-only)

- TC-05 | stack: policy | command: review Google Search cloaking guidance | result: pass | note: 修正合同禁止向 crawler 与普通用户提供不同核心内容
- TC-01 | stack: manual | command: llms.txt positioning review | result: limited | note: 将其作为实验性机器发现入口，不声明平台采用或表现结果
- TC-02/03 | stack: source+typescript | command: source reference scan; `pnpm exec tsc --noEmit` | result: pass | note: 四个醒目入口及其翻译键已移除，六篇文章仍保留对应语言的 staking 链接
- TC-01/04 | stack: source | command: `public/llms.txt` contract review | result: pass | note: 内容只索引公开事实与 canonical 资源，并明确奖励不保证和 HTML 为规范内容来源

## 6. Change Log (append-only)

- 2026-09-02 17:09 +08:00 | Initial corrective spec. S0002 remains an immutable completed record; this spec changes only presentation prominence and discovery entry points.
