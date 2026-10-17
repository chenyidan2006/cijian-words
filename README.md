# 词间 · 把单词用起来

适合"看见认识、没有提示想不起"的英语学习者。纯静态网页，无外部字体、无运行库依赖、无后端。

## 直接访问

部署在 GitHub Pages：本仓库根目录即站点根目录。

## 文件说明

| 文件 | 用途 |
|---|---|
| `index.html` | 入口 |
| `style.css` | 样式 |
| `app.js` | 应用逻辑 |
| `catalog.js` | 9389 词条目录 |
| `enrichment.js` | 释义 / 词组 / 例句补充数据 |
| `situations.js` / `lessons.js` / `book-lessons.js` / `exam-lessons.js` / `source-materials.js` | 场景、搭配、书中章节、听力阅读语境、来源资料 |
| `licenses/` | 第三方数据许可（ECDICT、WordNet） |

## 特性

- 默认流程：中文提示 → 展开英文 → 想起了 / 还不会 → 自动下一条
- 间隔复习 1/3/7/14/30 天；不设每日上限，分组用于暂停
- 学习进度保存在浏览器 localStorage，支持 JSON 备份导入导出
- 桌面与移动端自适应，无外部依赖

## 部署

根目录直接作为静态站点根目录即可，无需构建：

- GitHub Pages：Settings → Pages → Source 选 `main` 分支根目录
- 腾讯 EdgeOne Pages：直接上传本目录
- 任意静态托管：发布目录填 `.`

## 数据来源与许可

词条释义与词组参考来自 [ECDICT](https://github.com/skywind3000/ECDICT)，
WordNet 用例参考 [Princeton WordNet](https://wordnet.princeton.edu/)。
完整许可文本见 `licenses/` 目录。
批量参考内容未逐条校对，专业领域义项折叠显示。
