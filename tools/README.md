# 构建与校验脚本

站点成品直接放在**仓库根目录**（`index.html` 等同级）。本目录的脚本按这个布局适配过；
原始源码仓库里站点位于 `dist/`，因此脚本中原来的 `dist/` 路径已改为仓库根目录。

## 运行环境

- Node.js 18+（`verify.cjs` 只用内置模块，无需 `npm install`）
- Python 3.10+，仅数据管线需要：`pdfplumber`、`python-docx` 的等价能力用标准库 + pdfplumber

## 数据管线

```
用户提供的原始资料
      │
      ├─ import-materials.py   ──→  source-materials.js   （听力 179 / 阅读 376 条主词条）
      │
      ├─ build-enrichment.py   ──→  enrichment.js         （释义 / 词组 / 语境用例）
      │        ↑
      │   catalog.js（词条目录，人工整理）
      │
      ├─ verify.cjs            ──→  自检报告（不产出文件）
      │
      └─ package-local.py      ──→  单文件 HTML + 部署 ZIP
```

### `build-enrichment.py`

以 `catalog.js` 的 9389 个词条为目标集合，从 ECDICT 与 WordNet 生成 `enrichment.js`：

- 只接受**词条或变形真的出现在句子里**的 WordNet 用例，避免张冠李戴
- 词典短语作为**参考条目**，不宣称搭配频率
- 带领域标记的义项（如 `[计算机]`）单独归入 `specialistMeaning`，**不进入回忆提示**，避免把专业义项当常用义误导
- 同时写出 `licenses/` 下的许可原文

输入需自行准备（不随仓库分发）：`tmp/enrichment/ecdict.csv`、WordNet 压缩包、ECDICT许可文件。

### `import-materials.py`

从用户提供的资料里抽取表格与 PDF 文本，产出 `source-materials.js`：

- 阅读部分按 Word 表格行列解析，保留表格序号与行号
- 听力部分按 PDF 版面坐标切分左右栏，恢复编号 1–179
- 保留原始资料名与实际条数，**不把"相关词"一律当同义词**

用法：`python tools/import-materials.py --source-dir <资料目录>`

### `verify.cjs`

在 Node 的 `vm` 里真实启动一次 `app.js`，用假 DOM 驱动完整学习流程，断言：

| 检查 | 内容 |
|---|---|
| 词库完整性 | 9389 条、常用 7956 条、词条唯一 |
| 练习目标 | 例句必须包含目标搭配；介词填空必须命中 |
| 复习安排 | 独立答对 1/3/7/14/30 天；同日重复不加等级；提示后约 6 小时；答错约 10 分钟 |
| 跨天区分 | 间隔跨天后才计入独立回忆 |
| 自评分离 | 口头自评不计入客观回忆 |
| 状态持久 | 刷新后保留提示、反馈与记录 |
| 备份校验 | 非法备份结构必须被拒绝 |
| HTML 转义 | 用户内容注入必须转义 |
| 30 天计划 | 每天 312–313 词，覆盖每个词条且不重复 |

```bash
node tools/verify.cjs
```

输出 9389 / 395 / 69 与 `passed` 即全部通过。可用 `SITE_DIR` 指定其它站点目录。

### `package-local.py`

把站点压成单个可双击打开的 HTML，再打一个部署 ZIP。输出写到仓库的**上一级目录**，不污染仓库。

## `core-usage.json`

`build-enrichment.py` 的输入之一：为 `be`、`can`、`it`、`us`、`as`、`at`、`in`、`on`、`may`
这类高频功能词提供本站编写的易读英英讲解（不称其为牛津内容）。

## `ocr-pages.ps1`

Windows 内置 OCR（`Windows.Media.Ocr`）批量识别扫描页的辅助脚本，用于把纸书页面转成可校对文本。
