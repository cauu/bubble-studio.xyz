# Bubble Studio 首页重构方案

## 一、设计理念

### 从 Ratcheteer 和 YouMind 各取什么

**从 Ratcheteer 学结构**：
- 单页聚焦：所有核心内容在一页内完成，不依赖多级导航
- "海报卡片"布局：深色背景 + 居中的浅色内容卡，内容像一张贴在墙上的海报
- 极简信息层级：Hero → 核心行动 → 补充说明 → 联系方式，自上而下线性阅读
- 有趣的小彩蛋（Ratcheteer 的 "Choose Palette" 调色盘功能）

**从 YouMind 学质感**：
- 暖色调底色，不用冷灰白
- 手绘插画承载品牌个性，而非通用图标
- 柔和阴影（纸张感而非玻璃感）
- 慷慨的留白和舒适的阅读节奏
- 圆角、贴纸感、拼贴风

**Bubble Studio 自己的灵魂**：
- "泡泡"不再是装饰，而是世界观——海底小工作室的故事
- Paopao 是品牌的脸，而非一个 emoji
- 告别通用 SaaS 模板感：不用 backdrop-blur 毛玻璃，不用 sky→blue 渐变

---

## 二、视觉语言

### 色彩方案

```
页面底色（body）    深海墨蓝   #0b1d3a    ← 类似 Ratcheteer 的深色"画框"
                   可加微弱点阵纹理，呼应气泡感

内容卡底色         暖奶白     #faf6f0    ← YouMind 的温暖画布
卡片/区块底色      纯白       #ffffff

主文字             暖黑       #1a1a2e    ← 不用纯黑，保留温度
次要文字           暖灰       #6b7280
辅助文字           浅灰       #9ca3af

主强调色（CTA）    珊瑚橙     #e86c3a    ← 跳出 Cardano 蓝，建立自己的色彩身份
主强调色 hover     深珊瑚     #d45a2a
次强调色           海藻绿     #3a9e8f    ← 标签、次要按钮、链接

Cardano 官方蓝     #0033ad    ← 仅在矿池 ID、钱包连接等"官方身份"场景使用
```

### 为什么跳出 Cardano 蓝？

现在你全站主色是 sky-500 → blue-500，这和 Cardano 生态里大量项目撞色。
珊瑚橙作为主 accent：温暖、有活力、在深海蓝背景上极其醒目。
Cardano 蓝只在和链上身份相关的元素出现（池 ID、钱包按钮），反而更有仪式感。

### 字体方案

```
Display（标题）    Space Grotesk（英文）     ← 几何感、现代、有个性但不花哨
                   AlibabaPuHuiTi Black（中文） ← 你已有的字体，保留

正文               Inter（英文）/ AlibabaPuHuiTi Regular（中文）
等宽（池数据）     JetBrains Mono             ← 技术感，用于池指标数字
```

Space Grotesk 免费、Google Fonts 直接可用，和 Inter 搭配协调但有辨识度。
在 Hero 标题处使用更大的字重（Black 900）+ 紧凑字距（-1px tracking），制造"独立游戏标题"的冲击感。

### 圆角与阴影

```
内容卡整体         border-radius: 24px
区块/卡片          border-radius: 16px
按钮               border-radius: 12px（不要 pill/full）
输入框             border-radius: 10px

阴影原则           只用柔和的单层阴影 rgba(0,0,0,0.06) 0px 2px 12px
                   hover 时微微加深 rgba(0,0,0,0.1) 0px 4px 20px
                   ❌ 不再使用 shadow-lg/xl + backdrop-blur 组合
```

---

## 三、页面结构（从上到下）

整体布局模仿 Ratcheteer：
- body 是深海墨蓝底 + 微弱圆点纹理（气泡暗示）
- 内容是一张居中的暖白大卡片（max-width ~940px，rounded-3xl）
- 卡片内部分为清晰的纵向 sections

```
┌─────────────────────────────────────────┐
│           深海墨蓝 body 背景              │
│    ┌───────────────────────────────┐    │
│    │                               │    │
│    │  ① Hero                       │    │
│    │  Paopao 插画 + 品牌名 + 标语    │    │
│    │                               │    │
│    │  ② Stake 会员卡                │    │
│    │  矿池数据 + 一键委托 CTA        │    │
│    │                               │    │
│    │  ③ 最近动态 / 活动预告          │    │
│    │  即将分享的内容 / 事件时间线      │    │
│    │                               │    │
│    │  ④ 会员权益说明                 │    │
│    │  多渠道内容 + 免费 App          │    │
│    │                               │    │
│    │  ⑤ Footer                     │    │
│    │  社交链接 + 版权 + Paopao 小尾巴 │    │
│    │                               │    │
│    └───────────────────────────────┘    │
│                                         │
└─────────────────────────────────────────┘
```

---

## 四、各 Section 详细设计

### ① Hero Section

**目标**：一屏之内让人知道"这是谁、做什么、什么调性"。

**构成**：
- 顶部左侧：Bubble Studio 手绘 logo 或文字 mark
- 顶部右侧：语言切换 + X/Telegram 图标（极简，不需要完整 NavBar）
- 中央主体：一幅手绘插画（Paopao 在海底工作室场景，周围有气泡）
- 插画下方：
  - "Bubble Studio" 大标题（Space Grotesk Black, 48-56px）
  - 一行 tagline："A tiny studio making fun stuff on Cardano"（或中文对应）
  - 不需要额外的按钮，滚动即到 Stake 区

**关键设计决策**：
- 不要居中对称的"SaaS Hero"，而是像 Ratcheteer 那样让插画占主视觉，文字做配角
- 不用渐变背景，插画本身的色彩就是视觉焦点
- Logo 区不需要 wiggle 动画，静态即可，质感 > 花哨

**临时替代方案**（如果暂时没有手绘插画）：
- 用一个纯 SVG 的大气泡 + Paopao emoji（🐾）放大作为 placeholder
- 用暖色调的几何波浪形状做背景装饰
- 但最终一定要换成手绘——这是全站灵魂

### ② Stake 会员卡 Section（最高优先级）

**目标**：把"Stake 到 Pao Pool = 成为会员"这个核心转化动作讲清楚、做漂亮。

**设计方案**：做成一张"会员卡"视觉——

```
┌──────────────────────────────────────┐
│  🏊 MEMBERSHIP                       │
│                                      │
│  Stake to Pao Pool,                  │
│  become a Bubble Studio member.      │
│                                      │
│  ┌────────┐ ┌────────┐ ┌────────┐   │
│  │ 💰     │ │ 📈     │ │ 👥     │   │
│  │ 1.2M   │ │ 2.2%   │ │ 15     │   │
│  │ ADA    │ │ APR    │ │ 委托人  │   │
│  └────────┘ └────────┘ └────────┘   │
│                                      │
│  ┌──────────────────────────────┐   │
│  │   🎯  Stake to Pao Pool     │   │  ← 珊瑚橙大按钮
│  └──────────────────────────────┘   │
│                                      │
│  Pool Ticker: [PAO]  ·  查看详情 →   │
│                                      │
└──────────────────────────────────────┘
```

**设计要点**：
- 卡片背景用极浅的暖黄/奶油（#fef9f0），和页面的暖白底有轻微区分
- 指标数字用 JetBrains Mono，大号加粗，是视觉焦点
- CTA 按钮是珊瑚橙（#e86c3a），白字，12px 圆角，hover 时微微上浮 + 加深
- 不用 "gradient from sky to blue" 按钮，不用 shadow-xl
- "Pool Ticker: [PAO]" 用 monospace 小字，Cardano 蓝（#0033ad）作标签色
- 下方可加一行小字："Your ADA never leaves your wallet. Staking is safe."

**SubscriptionCard（钱包连接领 Token）怎么处理？**
- 移入 Stake 卡片内部作为第二步：点击 Stake 按钮后 → 展开钱包连接流程
- 或者在 Stake 卡片下方紧跟一个小 section："Already a member? Connect wallet to get your token"
- 不再独立作为一个大 section

### ③ 最近动态 / 活动预告 Section

**目标**：让访客看到"这是一个活跃的团队"，制造内容期待。

**设计方案**：简单的时间线或者卡片列表——

```
── What's Coming ──────────────────────

  📝  Apr 18   Cardano Chang 硬分叉深度解读
                Article · Coming Soon

  🎬  Apr 25   Cardano 治理系统入门视频
                Video · In Production

  🎯  May 1    Catalyst Fund 14 投票指南
                Event · Upcoming
```

**设计要点**：
- 左侧是类型 emoji + 日期，右侧是标题 + 状态标签
- 标签用海藻绿底色（#3a9e8f），白字，小号 pill 形
- 最多显示 3-5 条，够用就好
- 这个数据可以来自 posts/ 目录的 frontmatter（复用你已有的 blog 系统），增加一个 `upcoming: true` 字段
- 或者简单起见，先做成一个 JSON/常量文件手动维护

**为什么这个排在会员说明前面？**
- 你说得对："说明优先级低"。用户不关心你有多少渠道，他们关心的是"你最近在做什么有意思的东西"
- 活跃感 > 功能列表。一个有动态更新的站比"我们支持 5 个渠道"更能打动人

### ④ 会员权益说明 Section

**目标**：让人理解 Stake → 会员 → 享受什么，但不需要很重。

**设计方案**：图标 + 文字的横排卡片，轻描淡写——

```
── Member Perks ───────────────────────

  ┌──────────┐  ┌──────────┐  ┌──────────┐
  │  📬      │  │  🤖      │  │  🔧      │
  │ 内容推送  │  │ TG Bot   │  │ 免费 App │
  │          │  │          │  │          │
  │ 文章/视频 │  │ 机器人自动│  │ 我们开发的│
  │ 第一时间  │  │ 推送+交互 │  │ 工具免费用│
  │ 送达     │  │          │  │          │
  └──────────┘  └──────────┘  └──────────┘

  更多渠道（Email、WhatsApp）正在路上...
```

**设计要点**：
- 三张小卡片横排（mobile 竖排）
- 每张卡片：图标 + 标题 + 一行描述，不要多
- 不需要按钮、不需要展开详情
- 底部一行 coming soon 的提示，用浅灰色
- 这个 section 视觉份量要比 Stake 和 What's Coming 明显轻

### ⑤ Footer

**目标**：收尾，留联系方式，体现团队人味。

**设计方案**：
```
──────────────────────────────────────

  Made with ☕ by Martin, Yoyo & Paopao 🐾

  X · Telegram · Email

  © 2024-2026 Bubble Studio
```

**设计要点**：
- 在内容卡片内部的底部，不是独立的 dark footer
- 一行 "Made with" 署名，温暖、个人化
- 社交图标保持当前的 X 和 Telegram，加一个 Email
- 极简，3-4 行搞定
- 如果未来有手绘插画，可以在 footer 放一个小 Paopao 探头的插画

---

## 五、导航怎么处理？

### 砍掉独立的 NavBar

当前的 NavBar 有 Home / Staking / Products / Blogs 四个入口 + hamburger 菜单。
新方案里首页是单页滚动，不需要顶部导航栏。

**替代方案**：
- Hero 顶部放一行极简的"工具栏"：左侧 logo，右侧语言切换 + 社交图标
- Blog 入口在 What's Coming section 底部加一个"查看所有文章 →"链接
- Staking 详情（步骤指南等）在 Stake 卡片的 CTA 按钮直接外链到 JamonBread
- Products 页暂时不需要独立入口（VODA 可以作为"免费 App"在会员权益里提一句）
- Governance 页维持现有路由但不在首页暴露

**如果未来内容增多需要导航**：
- 做一个浮动的小圆形菜单（类似 FAB），点击展开 3-4 个链接
- 而不是回到传统的 NavBar

---

## 六、现有代码改动清单

### 删除 / 大幅重写的文件

| 文件 | 操作 | 原因 |
|------|------|------|
| `src/components/Layout/index.tsx` | **重写** | 去掉渐变背景和 bounce 泡泡，改为深海蓝底 + 居中卡片 |
| `src/components/NavBar/index.tsx` | **重写** | 简化为极简工具栏（logo + lang + social） |
| `src/app/[locale]/HomeClient.tsx` | **重写** | 当前 7 个 section 全部替换为新的 4 个 section |
| `src/globals.css` | **清理** | 删除所有注释掉的旧样式、candy-gradient、wiggle 等 |
| `tailwind.config.ts` | **扩展** | 加入新色彩 token（coral、ocean、cream 等） |

### 复用 / 小幅调整的文件

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/components/subscription/SubscriptionCard.tsx` | **迁入** | 嵌入 Stake section，不再独立 |
| `src/components/staking/CardanoStaking.tsx` | **提取数据逻辑** | MetricCard 数据获取复用，UI 全部重写 |
| `src/components/staking/MetricCard.tsx` | **重写样式** | 保留逻辑，换新视觉 |
| `src/services/pool.ts` | **保留** | 池数据 API 不变 |
| `src/services/subscription.ts` | **保留** | Token 逻辑不变 |
| `src/constants/constants.ts` | **扩展** | 加入新的设计 token |
| `src/i18n/*` | **保留** | 多语言架构不变 |
| `public/locales/*/common.json` | **更新** | 新增 section 的翻译 key |

### 新增的文件

| 文件 | 说明 |
|------|------|
| `src/components/home/HeroSection.tsx` | 新 Hero |
| `src/components/home/StakeCard.tsx` | 新 Stake 会员卡 |
| `src/components/home/WhatsComingSection.tsx` | 新动态预告 |
| `src/components/home/MemberPerksSection.tsx` | 新权益说明 |
| `src/components/home/MiniToolbar.tsx` | 新极简顶栏 |
| `src/data/upcoming-events.json`（或 ts） | 动态预告数据源 |

### 保持不动的路由

| 路由 | 说明 |
|------|------|
| `/blogs` + `/blogs/[slug]` | 博客系统完全保留，入口从首页"查看全部"链接 |
| `/governance` | 保留，不在导航暴露 |
| `/staking` | 可保留作为详情页，但首页 Stake 卡片是主入口 |
| `/about` | 可考虑移除或降级，首页已包含核心信息 |
| `/products` | 移除或降级，VODA 在权益说明里提及即可 |

---

## 七、关于插画资产

这是整个方案里最大的"非代码依赖"。

### 必须有的（MVP）

1. **一张 Paopao 主插画**（用在 Hero 区）：Paopao 在海底/气泡环境中的全身像
2. **Bubble Studio 手绘 wordmark**（可选）：如果能画一个有手绘感的 logo 文字更好，否则 Space Grotesk Black 也够用

### 锦上添花的

3. Paopao 的 3-5 个表情/姿态小图（用在各 section 的装饰）
4. 团队三人的手绘头像（替代现在的首字母圆圈）
5. 海底场景元素（气泡、海藻、珊瑚）的 SVG 装饰

### 过渡方案

在插画完成之前：
- Hero 用 logo 图片（你 CDN 上已有的 bubble-logo.png）放大 + 纯色装饰背景
- 各 section 用 emoji 作为图标（你现在已经在用了，比如 💰📈👥）
- 先把结构和配色做对，插画后续可以"换皮"式替换

---

## 八、实施建议

### Phase 1: 结构 + 配色（可以立即做）
- 重写 Layout：深海蓝底 + 居中暖白卡
- 重写 HomeClient：新的 4-section 结构
- 更新 tailwind.config 色彩 token
- 清理 globals.css
- 简化 NavBar → MiniToolbar

### Phase 2: Stake 核心体验
- 将 CardanoStaking 数据逻辑抽出，做新的 StakeCard 组件
- 将 SubscriptionCard 集成进 StakeCard 流程
- 新增 upcoming-events 数据和 WhatsComingSection

### Phase 3: 插画与细节打磨
- 替换 placeholder 为真实手绘插画
- 加入微动效（气泡慢速漂浮、卡片进入动画）
- 404 页面、loading 状态等细节个性化

---

## 总结

核心改动只有三个词：**聚焦、去模板、建个性**。

- **聚焦**：从 7 个 section 砍到 4 个，每个都有明确的任务
- **去模板**：抛弃 glassmorphism + sky 渐变 + shadow-xl 的 SaaS 套路
- **建个性**：深海蓝画框 + 暖奶白画布 + 珊瑚橙 accent + Paopao 插画 = 只有 Bubble Studio 才长这样
