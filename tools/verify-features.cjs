// 功能测试：复习 / 跳过 / 选择题（只考练过的词 + 讲解）/ 词汇量（认识·会用）
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const assert = require('node:assert/strict');

const SITE = process.argv[2] || path.resolve(__dirname, '..');
const disk = new Map();

function boot() {
  const nodes = new Map(['#app', '#toast', '#modal', '#import-file'].map(s => [s, {
    innerHTML: '', textContent: '',
    classList: { add() {}, remove() {} },
    open: false, showModal() { this.open = true; }, close() { this.open = false; },
  }]));
  const ctx = {
    window: { scrollTo() {} },
    document: { querySelector: s => nodes.get(s) || null, addEventListener() {} },
    localStorage: { getItem: k => disk.get(k) || null, setItem: (k, v) => disk.set(k, v) },
    Date, console, setTimeout: () => 1, clearTimeout() {}, Map, Set, Blob, URL, FormData: class {},
  };
  vm.createContext(ctx);
  for (const name of ['catalog.js', 'lexicon-core.js', 'lexicon-notes.js', 'zh-lexicon.js', 'situations.js', 'lessons.js', 'book-lessons.js', 'source-materials.js', 'exam-lessons.js'])
    vm.runInContext(fs.readFileSync(path.join(SITE, name), 'utf8'), ctx);

  // 拆分后的数据合并成 window.LEXICON（仅为兼容原有断言）
vm.runInContext(`(function(){
 const C=window.LEXICON_CORE||{},N=window.LEXICON_NOTES||{},out={};
 for(const w of new Set([...Object.keys(C),...Object.keys(N)])){
  const c=C[w]||{},n=N[w]||{};
  out[w]={meaning:c.m||'',forms:c.f||'',rank:c.r,phonetic:c.p||'',definition:n.d||'',
   phrases:n.ph||[],examples:n.ex||[],domains:n.dm||[],scenes:n.sc||[],
   specialistMeaning:n.sm||'',learner:n.l};
 }
 window.LEXICON=out;
})();`, ctx);
  let source = fs.readFileSync(path.join(SITE, 'app.js'), 'utf8');
  const exp = `window.test={skipWord,unskipWord,beginReview,reviewPool,vocabStats,reviewPage,isSkipped,skippedMap,quizMap,monthData,monthPractice,beginCatalog,beginMonth,nav,render,orderedWords,beginQuiz,makeQuestion,answerQuiz,nextQuiz,endQuiz,quizPool,firstMeaning,shortMeaning,posOf,formIn,formsOf,quizPage,practicedWords,skippedCount,unskipAll,includeSkipped,bestExample,explainHtml,usablePhrases,zhOf,zhExamples,zhHook,zhExplain,getState:()=>state,ZH:()=>window.ZH_LEXICON};render();\n})();`;
  if (!/render\(\);\s*(?:ensureNotes\(\);\s*)?(?:ensureZh\(\);\s*)?\}\)\(\);\s*$/.test(source)) throw new Error('app.js 尾部结构不符合预期');
  source = source.replace(/render\(\);\s*(?:ensureNotes\(\);\s*)?(?:ensureZh\(\);\s*)?\}\)\(\);\s*$/, exp);
  vm.runInContext(source, ctx);
  return { t: ctx.window.test, nodes };
}

const { t, nodes } = boot();
const W = t.orderedWords;
let n = 0;
const ok = (name, fn) => { fn(); n++; console.log('  ✓ ' + name); };

ok('初始：认识 0 / 会用 0', () => {
  const v = t.vocabStats();
  assert.equal(v.recognize, 0);
  assert.equal(v.productive, 0);
});
ok('没练过任何词时，选择题题库为空', () => {
  assert.equal(t.practicedWords().length, 0);
  assert.equal(t.quizPool('meaning').length, 0);
  assert.equal(t.quizPool('cloze').length, 0);
  assert.equal(t.quizPool('phrase').length, 0);
});

const st = t.getState();
st.month = { started: '2026-10-17', reviewed: {}, active: null };
const practised = W.slice(0, 12);
for (const w of practised) st.month.reviewed[w] = { rating: 2, date: '2026-10-17', passes: 1 };

ok('练过后题库只含练过的词', () => {
  const pool = t.quizPool('meaning');
  assert.ok(pool.length > 0);
  for (const w of pool) assert.ok(practised.includes(w), w + ' 不该出现在题库');
});
ok('未练过的词绝不进入题库', () => {
  const pool = new Set(t.quizPool('meaning').concat(t.quizPool('cloze'), t.quizPool('phrase')));
  for (const w of pool) assert.ok(st.month.reviewed[w], w + ' 未练过却进了题库');
});

ok('认识题：4 选项、唯一正确、带选项归属词', () => {
  const q = t.makeQuestion('meaning', practised[0]);
  assert.equal(q.options.length, 4);
  assert.equal(q.options.filter(o => o.ok).length, 1);
  assert.equal(q.options.find(o => o.ok).text, t.shortMeaning(practised[0]));
  for (const o of q.options) assert.ok(o.owner, '每个选项应带归属词');
});
ok('认识题的干扰项互不重复', () => {
  for (const w of practised.slice(0, 5)) {
    const q = t.makeQuestion('meaning', w);
    const texts = q.options.map(o => o.text);
    assert.equal(new Set(texts).size, texts.length);
  }
});

const withExample = practised.find(w => t.bestExample(w));
ok('填空题：有空、有中文提示、4 选项', () => {
  assert.ok(withExample, '样例词应有例子');
  const q = t.makeQuestion('cloze', withExample);
  assert.equal(q.type, 'cloze');
  assert.ok(q.sentence.includes('________'));
  assert.equal(q.options.length, 4);
  assert.equal(q.options.filter(o => o.ok).length, 1);
  assert.ok(q.hint && q.hint.length > 0);
});
ok('填空题：答案不出现在挖空后的句子里', () => {
  for (const w of practised) {
    if (!t.bestExample(w)) continue;
    const q = t.makeQuestion('cloze', w);
    if (q.type !== 'cloze') continue;
    assert.ok(!t.formIn(w, q.sentence), w + ' 的答案仍留在句中');
  }
});
ok('填空题：干扰词不出现在同一句（避免双解）', () => {
  for (const w of practised) {
    if (!t.bestExample(w)) continue;
    const q = t.makeQuestion('cloze', w);
    if (q.type !== 'cloze') continue;
    for (const o of q.options.filter(o => !o.ok)) {
      if (t.formIn(o.text, q.sentence)) assert.fail(`干扰词 ${o.text} 出现在句中，会有歧义`);
    }
  }
});

const withPhrase = practised.find(w => t.usablePhrases(w).length);
ok('搭配题：中文提示 + 4 个英文搭配 + 唯一正确', () => {
  assert.ok(withPhrase, '需要至少一个带搭配的词');
  const q = t.makeQuestion('phrase', withPhrase);
  assert.equal(q.type, 'phrase');
  assert.ok(q.promptZh && /[\u4e00-\u9fff]/.test(q.promptZh), '应有中文提示');
  assert.equal(q.options.length, 4);
  assert.equal(q.options.filter(o => o.ok).length, 1);
  assert.ok(q.answerPhrase);
  for (const o of q.options) assert.ok(o.owner, '搭配选项应带中文释义');
});

ok('讲解包含：四选项对照、该词释义、常见搭配', () => {
  const q = t.makeQuestion('meaning', practised[0]);
  const html = t.explainHtml(q, q.options.findIndex(o => o.ok));
  assert.ok(html.includes('四个选项对照'));
  assert.ok(html.includes('这个词'));
  assert.ok(html.includes('释义'));
  assert.ok(html.includes('常见搭配'));
  assert.ok(html.includes('答对了'));
});
ok('讲解在答错时给出正确答案', () => {
  const q = t.makeQuestion('meaning', practised[0]);
  const wrong = q.options.findIndex(o => !o.ok);
  const html = t.explainHtml(q, wrong);
  assert.ok(html.includes('正确答案'));
});
ok('讲解渲染了例句或搭配', () => {
  for (const w of practised.slice(0, 6)) {
    const q = t.makeQuestion('meaning', w);
    const html = t.explainHtml(q, 0);
    assert.ok(html.includes('例句') || html.includes('常见搭配'), w + ' 的讲解既无例句也无搭配');
  }
});

ok('beginQuiz 建立会话；答题写入记录', () => {
  t.beginQuiz('meaning');
  const q = t.getState().quiz;
  assert.ok(q && q.current);
  const idx = q.current.options.findIndex(o => o.ok);
  t.answerQuiz(idx);
  assert.equal(t.getState().quiz.right, 1);
  assert.ok(t.quizMap()[q.current.word].see.ok >= 1);
});
ok('同一题不能重复作答', () => {
  const q = t.getState().quiz;
  const before = q.right + q.wrong;
  t.answerQuiz(0);
  assert.equal(q.right + q.wrong, before);
});
ok('nextQuiz 推进、endQuiz 清空', () => {
  const before = t.getState().quiz.i;
  t.nextQuiz();
  assert.equal(t.getState().quiz.i, before + 1);
  t.endQuiz();
  assert.equal(t.getState().quiz, null);
});

ok('跳过的词不计入练过的词库', () => {
  const w = practised[3];
  t.skippedMap()[w] = { at: '2026-10-17' };
  assert.ok(!t.practicedWords().includes(w));
  assert.ok(!t.quizPool('meaning').includes(w));
  t.unskipWord(w);
  assert.ok(t.practicedWords().includes(w));
});

ok('没练过时选择题页给出引导，而不是空题库', () => {
  const backup = t.getState().month;
  t.getState().month = { started: '2026-10-17', reviewed: {}, active: null };
  t.nav('quiz');
  const html = nodes.get('#app').innerHTML;
  assert.ok(html.includes('还没有练过的词'));
  t.getState().month = backup;
});
ok('练过后选择题页显示三种题型与词数', () => {
  t.nav('quiz');
  const html = nodes.get('#app').innerHTML;
  assert.ok(html.includes('data-quiz-start="meaning"'));
  assert.ok(html.includes('data-quiz-start="cloze"'));
  assert.ok(html.includes('data-quiz-start="phrase"'));
  assert.ok(html.includes('练过的词'));
});
ok('答题界面渲染 4 个选项', () => {
  t.beginQuiz('meaning');
  const html = nodes.get('#app').innerHTML;
  assert.equal((html.match(/data-quiz-answer=/g) || []).length, 4);
});
// ── 中文讲解数据（Open Dictionary）──
ok('双语例句数据已载入且有覆盖', () => {
  const Z = t.ZH() || {};
  const n = Object.keys(Z).length;
  assert.ok(n > 8000, '命中词条应超过 8000，实际 ' + n);
  const withZh = Object.values(Z).filter(v => (v.ex || []).some(e => e.zh)).length;
  assert.ok(withZh > 8000, '带中文译文的例句应超过 8000，实际 ' + withZh);
});
ok('讲解含记忆线索或用法说明，且署名来源', () => {
  const word = practised.find(w => t.zhHook(w)) || practised[0];
  const q = t.makeQuestion('meaning', word);
  const html = t.explainHtml(q, q.options.findIndex(o => o.ok));
  assert.ok(html.includes('记忆线索') || html.includes('用法'), '讲解缺少讲解字段');
  assert.ok(html.includes('Open Dictionary'), '缺少来源署名');
});
ok('填空题优先使用双语例句', () => {
  const w2 = practised.find(w => t.zhExamples(w).length) || W.find(w => t.zhExamples(w).length);
  assert.ok(w2, '应有带双语例句的词');
  const q = t.makeQuestion('cloze', w2);
  assert.equal(q.type, 'cloze');
  assert.ok(q.zh, '双语例句的题目应带中文译文');
});

ok('默认排除已跳过的词，打开开关后纳入', () => {
  const w = practised[4];
  t.skippedMap()[w] = { at: '2026-10-17' };
  assert.ok(!t.practicedWords().includes(w), '默认应排除');
  t.getState().quizOpt = { includeSkipped: true };
  assert.ok(t.practicedWords().includes(w), '开启后应纳入');
  t.getState().quizOpt = { includeSkipped: false };
  assert.ok(!t.practicedWords().includes(w), '关闭后应再次排除');
  t.unskipAll();
  assert.equal(t.skippedCount(), 0);
  assert.ok(t.practicedWords().includes(w));
});
ok('选择题页文案已求值（不出现 ${ 字面量）', () => {
  t.endQuiz();
  t.nav('quiz');
  const html = nodes.get('#app').innerHTML;
  assert.ok(!html.includes('${'), '页面不应出现未求值的模板占位符');
  assert.ok(/练过\s*\d+\s*个词/.test(html), '应显示具体词数');
});
ok('已覆盖不会小于会用', () => {
  const v = t.vocabStats();
  assert.ok(v.covered >= v.productive, `covered=${v.covered} productive=${v.productive}`);
  assert.ok(v.recognize >= v.productive, '认识应 >= 会用');
});
ok('原有点击流程未受影响', () => {
  t.beginQuiz('meaning');
  assert.ok(t.getState().quiz && t.getState().quiz.current);
  t.endQuiz();
});

ok('原有页面无回归', () => {
  for (const p of ['home', 'library', 'scenes', 'difficult', 'settings', 'history', 'month', 'review']) {
    t.nav(p);
    assert.ok(nodes.get('#app').innerHTML.length > 500, p + ' 渲染异常');
  }
});

console.log(`\n全部 ${n} 项通过`);
