# SEO 优化验证清单

## 概述
本文档用于验证 SEO 高优先级问题的修复是否生效。请按照以下步骤逐一验证。

## 前置条件

### 1. 环境准备
- [ ] 确保项目已构建：`pnpm build` 或 `npm run build`
- [ ] 确保开发服务器运行：`pnpm dev` 或 `npm run dev`
- [ ] 确保生产环境变量 `NEXT_PUBLIC_SITE_URL` 已正确设置（如：`https://bubble-studio.xyz`）

### 2. 浏览器工具准备
- [ ] 安装浏览器开发者工具扩展（推荐）
  - Chrome: [SEO META in 1 CLICK](https://chrome.google.com/webstore/detail/seo-meta-in-1-click/bjogjfinolnhfhkbipphpdlldadpnmhc)
  - Firefox: [SEO META in 1 CLICK](https://addons.mozilla.org/firefox/addon/seo-meta-in-1-click/)
- [ ] 准备在线验证工具
  - [Google Rich Results Test](https://search.google.com/test/rich-results)
  - [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
  - [Twitter Card Validator](https://cards-dev.twitter.com/validator)
  - [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

---

## 验证项目

### 一、根布局元数据验证

#### 1.1 英文版本 (/) 
- [ ] 访问 `http://localhost:3000/` 或生产环境
- [ ] 查看页面源代码（右键 → 查看页面源代码）
- [ ] 验证 `<title>` 标签：应显示 "Bubble Studio - A Small Family Workshop Rooted in Cardano"
- [ ] 验证 `<meta name="description">`：应显示英文描述
- [ ] 验证 `<meta property="og:title">`：应与 title 一致
- [ ] 验证 `<meta property="og:description">`：应与 description 一致
- [ ] 验证 `<meta property="og:site_name">`：应显示 "Bubble Studio"
- [ ] 验证 `<meta property="og:url">`：应指向正确的 URL
- [ ] 验证 `<meta property="og:image">`：应指向 og-default.png
- [ ] 验证 `<meta name="twitter:card">`：应为 "summary_large_image"
- [ ] 验证 `<link rel="canonical">`：应指向当前页面 URL
- [ ] 验证 `<html lang="en">`：语言属性正确

#### 1.2 中文版本 (/zh)
- [ ] 访问 `http://localhost:3000/zh` 或生产环境
- [ ] 验证所有元数据均为中文内容
- [ ] 验证 `<html lang="zh">`：语言属性正确

#### 1.3 繁体中文版本 (/tw)
- [ ] 访问 `http://localhost:3000/tw` 或生产环境
- [ ] 验证所有元数据均为繁体中文内容
- [ ] 验证 `<html lang="tw">`：语言属性正确

---

### 二、页面级元数据验证

#### 2.1 About 页面
- [ ] 访问 `/about`（英文）、`/zh/about`（中文）、`/tw/about`（繁体）
- [ ] 验证 `<title>`：应包含 "About Us - Bubble Studio" 或对应翻译
- [ ] 验证 `<meta name="description">`：应显示关于页面的描述
- [ ] 验证 Open Graph 标签完整
- [ ] 验证 Twitter Card 标签完整
- [ ] 验证 canonical 链接正确
- [ ] 验证 hreflang 标签包含所有语言版本

#### 2.2 Products 页面
- [ ] 访问 `/products`、`/zh/products`、`/tw/products`
- [ ] 验证 title 和 description 正确
- [ ] 验证所有 SEO 标签完整

#### 2.3 Staking 页面
- [ ] 访问 `/staking`、`/zh/staking`、`/tw/staking`
- [ ] 验证 title 和 description 正确
- [ ] 验证所有 SEO 标签完整

#### 2.4 Governance 页面
- [ ] 访问 `/governance`、`/zh/governance`、`/tw/governance`
- [ ] 验证 title 和 description 正确
- [ ] 验证所有 SEO 标签完整
- [ ] **注意**：此页面是客户端组件，元数据在 layout.tsx 中

#### 2.5 Blogs 列表页面
- [ ] 访问 `/blogs`、`/zh/blogs`、`/tw/blogs`
- [ ] 验证 title 和 description 正确
- [ ] 验证所有 SEO 标签完整

#### 2.6 博客文章详情页（已有，验证是否正常）
- [ ] 访问任意博客文章，如 `/blogs/20260119-weekly-updates-en`
- [ ] 验证元数据正常显示（此页面之前已有元数据）

---

### 三、Sitemap 验证

#### 3.1 访问 Sitemap
- [ ] 访问 `http://localhost:3000/sitemap.xml` 或生产环境 `/sitemap.xml`
- [ ] 验证 XML 格式正确
- [ ] 验证包含所有静态路由：
  - [ ] `/` (首页)
  - [ ] `/about`
  - [ ] `/products`
  - [ ] `/staking`
  - [ ] `/governance`
  - [ ] `/blogs`

#### 3.2 验证多语言版本
- [ ] 验证每个路由都有所有语言版本：
  - [ ] 英文版本（无语言前缀）
  - [ ] 中文版本（`/zh/...`）
  - [ ] 繁体中文版本（`/tw/...`）

#### 3.3 验证博客文章
- [ ] 验证 sitemap 包含所有博客文章
- [ ] 验证博客文章 URL 格式正确
- [ ] 验证 lastModified 日期合理
- [ ] 验证 changeFrequency 设置合理
- [ ] 验证 priority 设置合理（首页 1.0，其他页面 0.8，博客 0.7）

#### 3.4 验证 URL 格式
- [ ] 验证所有 URL 使用正确的 baseUrl
- [ ] 验证英文路径不带语言前缀
- [ ] 验证中文和繁体中文路径带语言前缀

---

### 四、Robots.txt 验证

#### 4.1 访问 Robots.txt
- [ ] 访问 `http://localhost:3000/robots.txt` 或生产环境 `/robots.txt`
- [ ] 验证内容格式正确
- [ ] 验证包含以下内容：
  ```
  User-agent: *
  Allow: /
  Disallow: /api/
  Disallow: /_next/
  Sitemap: https://bubble-studio.xyz/sitemap.xml
  ```

#### 4.2 验证 Sitemap 链接
- [ ] 验证 sitemap URL 指向正确的位置
- [ ] 验证 sitemap URL 使用正确的域名

---

### 五、在线工具验证

#### 5.1 Google Rich Results Test
- [ ] 访问 [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] 输入首页 URL
- [ ] 验证无错误
- [ ] 验证结构化数据（如果有）

#### 5.2 Facebook Sharing Debugger
- [ ] 访问 [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [ ] 输入首页 URL
- [ ] 点击 "Debug" 或 "Scrape Again"
- [ ] 验证 Open Graph 标签正确显示：
  - [ ] og:title
  - [ ] og:description
  - [ ] og:image
  - [ ] og:url
  - [ ] og:site_name
- [ ] 验证预览图片正确显示

#### 5.3 Twitter Card Validator
- [ ] 访问 [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [ ] 输入首页 URL
- [ ] 验证 Twitter Card 正确显示：
  - [ ] Card 类型：summary_large_image
  - [ ] Title 正确
  - [ ] Description 正确
  - [ ] Image 正确显示

#### 5.4 LinkedIn Post Inspector
- [ ] 访问 [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- [ ] 输入首页 URL
- [ ] 验证预览正确显示

---

### 六、多语言验证

#### 6.1 Hreflang 标签验证
- [ ] 访问任意页面（如 `/about`）
- [ ] 查看页面源代码
- [ ] 验证包含 `<link rel="alternate" hreflang="en">`
- [ ] 验证包含 `<link rel="alternate" hreflang="zh">`
- [ ] 验证包含 `<link rel="alternate" hreflang="tw">`
- [ ] 验证所有 hreflang URL 正确

#### 6.2 Canonical 链接验证
- [ ] 访问每个页面的所有语言版本
- [ ] 验证每个页面都有正确的 canonical 链接
- [ ] 验证 canonical 链接指向当前页面

---

### 七、控制台验证

#### 7.1 构建验证
- [ ] 运行 `pnpm build` 或 `npm run build`
- [ ] 验证构建成功，无错误
- [ ] 验证无元数据相关的警告

#### 7.2 运行时验证
- [ ] 启动开发服务器：`pnpm dev`
- [ ] 访问各个页面
- [ ] 检查浏览器控制台，确保无错误
- [ ] 检查网络请求，验证元数据正确加载

---

### 八、翻译内容验证

#### 8.1 验证翻译文件
- [ ] 检查 `messages/zh.json` 包含所有 `seo.*` 键
- [ ] 检查 `messages/en.json` 包含所有 `seo.*` 键
- [ ] 检查 `messages/tw.json` 包含所有 `seo.*` 键
- [ ] 验证所有翻译内容有意义且准确

#### 8.2 验证翻译键完整性
每个语言文件应包含：
- [ ] `seo.siteName`
- [ ] `seo.defaultTitle`
- [ ] `seo.defaultDescription`
- [ ] `seo.about.title`
- [ ] `seo.about.description`
- [ ] `seo.products.title`
- [ ] `seo.products.description`
- [ ] `seo.staking.title`
- [ ] `seo.staking.description`
- [ ] `seo.governance.title`
- [ ] `seo.governance.description`
- [ ] `seo.blogs.title`
- [ ] `seo.blogs.description`

---

## 常见问题排查

### 问题 1: 元数据未更新
**可能原因**：
- 浏览器缓存
- Next.js 构建缓存

**解决方法**：
- 清除浏览器缓存（Ctrl+Shift+Delete）
- 删除 `.next` 目录，重新构建
- 使用无痕模式访问

### 问题 2: Sitemap 404
**可能原因**：
- 文件位置不正确
- 构建未完成

**解决方法**：
- 确认 `src/app/sitemap.ts` 存在
- 重新构建项目
- 检查 Next.js 版本（需要 13.3+）

### 问题 3: 翻译内容未显示
**可能原因**：
- 翻译键拼写错误
- 翻译文件未正确加载

**解决方法**：
- 检查翻译键是否正确
- 检查 `messages/` 目录下的文件
- 验证 `getTranslations` 调用正确

### 问题 4: OG 图片未显示
**可能原因**：
- `og-default.png` 文件不存在
- 图片路径不正确

**解决方法**：
- 确认 `public/og-default.png` 存在
- 确认图片尺寸为 1200x630px
- 检查 baseUrl 配置

---

## 验证完成标准

所有验证项完成后，应满足以下标准：

✅ **所有页面都有正确的 title 和 description**  
✅ **所有页面都有完整的 Open Graph 标签**  
✅ **所有页面都有完整的 Twitter Card 标签**  
✅ **所有页面都有 canonical 链接**  
✅ **所有页面都有 hreflang 标签**  
✅ **Sitemap 包含所有路由和语言版本**  
✅ **Robots.txt 正确配置**  
✅ **多语言内容正确显示**  
✅ **在线工具验证通过**  
✅ **无控制台错误**

---

## 验证记录

**验证日期**: _______________  
**验证人员**: _______________  
**验证环境**: [ ] 开发环境 [ ] 生产环境  
**验证结果**: [ ] 通过 [ ] 部分通过 [ ] 未通过  

**备注**:
_________________________________________________
_________________________________________________
_________________________________________________

