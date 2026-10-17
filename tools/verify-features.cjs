// 功能测试：复习 / 跳过 / 选择题（认识·语义填空）/ 词汇量（认识·会用）
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
  for (const name of ['catalog.js', 'enrichment.js', 'situations.js', 'lessons.js', 'book-lessons.js', 'source-materials.js', 'exam-lessons.js'])
    vm.runInContext(fs.readFileSync(path.join(SITE, name), 'utf8'), ctx);

  let source = fs.readFileSync(path.join(SITE, 'app.js'), 'utf8');
  const exp = `window.test={skipWord,unskipWord,beginReview,reviewPool,vocabStats,reviewPage,isSkipped,skippedMap,quizMap,monthData,monthPractice,beginCatalog,beginMonth,nav,render,orderedWords,beginQuiz,makeQuestion,answerQuiz,nextQuiz,endQuiz,quizPool,firstMeaning,shortMeaning,posOf,formIn,formsOf,quizPage,getState:()=>state};render();\n})();`;
  if (!/render\(\);\s*\}\)\(\);\s*$/.test(source)) throw new Error('app.js 尾部结构不符合预期');
  source = source.replace(/render\(\);\s*\}\)\(\);\s*$/, exp);
  vm.runInContext(source, ctx);
  return { t: ctx.window.test, nodes };
}

const { t, nodes } = boot();
const W = t.orderedWords;
let n = 0;
const ok = (name, fn) => { fn(); n++; console.log('  ✓ ' + name); };

// ── 词汇量基线 ──
ok('初始：认识 0 / 会用 0', () => {
  const v = t.vocabStats();
  assert.equal(v.recognize, 0);
  assert.equal(v.productive, 0);
});

const st = t.getState();
st.month = { started: '2026-10-17', reviewed: {}, active: null };
st.month.reviewed[W[0]] = { rating: 2, date: '2026-10-17', passes: 1 }; // 0.7
st.month.reviewed[W[1]] = { rating: 2, date: '2026-10-17', passes: 2 }; // 1.0
st.month.reviewed[W[2]] = { rating: 1, date: '2026-10-17', passes: 1 }; // 0.25

ok('会用 = 加权和（1.95 → 2）', () => {
  const v = t.vocabStats();
  assert.equal(v.productive, 2);
});
ok('认识 ≥ 会用', () => {
  const v = t.vocabStats();
  assert.ok(v.recognize >= v.productive);
});

// ── 跳过的词 ──
ok('跳过的词计入会用，且不再进入选择题题库', () => {
  t.skippedMap()[W[3]] = { at: '2026-10-17' };
  const v = t.vocabStats();
  assert.equal(v.skip, 1);
  assert.equal(v.productive, 3);
  assert.ok(!t.quizPool('meaning').includes(W[3]));
  assert.ok(!t.quizPool('cloze').includes(W[3]));
});

// ── 选择题：看英文选中文 ──
ok('认识题：4 个选项、恰好 1 个正确、正确项等于该词释义', () => {
  const q = t.makeQuestion('meaning', 'accumulate');
  assert.equal(q.options.length, 4);
  assert.equal(q.options.filter(o => o.ok).length, 1);
  assert.equal(q.question, 'accumulate');
  const right = q.options.find(o => o.ok).text;
  assert.equal(right, t.shortMeaning('accumulate'));
});

ok('认识题的干扰项互不重复', () => {
  for (const w of ['be', 'accumulate', 'significant', 'environment', 'run']) {
    const q = t.makeQuestion('meaning', w);
    const texts = q.options.map(o => o.text);
    assert.equal(new Set(texts).size, texts.length, w + ' 选项重复');
  }
});

// ── 选择题：语义填空 ──
const clozeWord = 'significant';
ok('填空题：句子里挖空、带中文提示、4 个选项', () => {
  const q = t.makeQuestion('cloze', clozeWord);
  assert.ok(q.sentence, '应有句子');
  assert.ok(q.sentence.includes('________'), '句子应有空');
  assert.equal(q.options.length, 4);
  assert.equal(q.options.filter(o => o.ok).length, 1);
  assert.equal(q.options.find(o => o.ok).text, clozeWord);
  assert.ok(q.hint && q.hint.length > 0, '应带中文提示');
});

ok('填空题：正确词本身不出现在挖空后的句子里', () => {
  for (const w of ['significant', 'accumulate', 'environment', 'run', 'go']) {
    const q = t.makeQuestion('cloze', w);
    if (!q.sentence) continue;
    assert.ok(!t.formIn(w, q.sentence), w + ' 的答案仍出现在句子里：' + q.sentence);
  }
});

ok('填空题：干扰词不出现在句子里（避免两个都对）', () => {
  for (const w of ['significant', 'accumulate', 'environment']) {
    const q = t.makeQuestion('cloze', w);
    for (const o of q.options.filter(o => !o.ok)) {
      assert.ok(!t.formIn(o.text, q.sentence), `干扰词 ${o.text} 出现在句子里，会有歧义`);
    }
  }
});

ok('formIn 能识别屈折形式', () => {
  assert.ok(t.formIn('run', 'She was running fast'));
  assert.ok(t.formIn('accumulate', 'Journals are accumulating in my office'));
  assert.equal(t.formIn('accumulate', 'nothing here'), '');
});

// ── 答题与计分 ──
ok('答对写入 quiz 记录并提升认识量', () => {
  const before = t.vocabStats().recognize;
  t.beginQuiz('meaning');
  const q = t.getState().quiz;
  assert.ok(q && q.current, '应生成题目');
  const idx = q.current.options.findIndex(o => o.ok);
  t.answerQuiz(idx);
  assert.equal(t.getState().quiz.right, 1);
  assert.equal(t.quizMap()[q.current.word].see.ok, 1);
  assert.ok(t.vocabStats().recognize >= before);
});

ok('答错也记录，且不会增加认识量上限', () => {
  t.beginQuiz('meaning');
  const q = t.getState().quiz;
  const idx = q.current.options.findIndex(o => !o.ok);
  t.answerQuiz(idx);
  assert.equal(t.getState().quiz.wrong, 1);
  assert.equal(t.quizMap()[q.current.word].see.bad, 1);
});

ok('同一题不能重复作答', () => {
  const q = t.getState().quiz;
  const before = q.right + q.wrong;
  t.answerQuiz(0);
  assert.equal(q.right + q.wrong, before);
});

ok('nextQuiz 推进到下一题', () => {
  const before = t.getState().quiz.i;
  t.nextQuiz();
  assert.equal(t.getState().quiz.i, before + 1);
  assert.ok(t.getState().quiz.answered === null);
});

ok('选择题答对两次后该词计入认识满分', () => {
  const word = W[10];
  t.quizMap()[word] = { see: { ok: 2, bad: 0 }, use: { ok: 0, bad: 0 } };
  const before = t.vocabStats().recognize;
  t.quizMap()[word] = { see: { ok: 0, bad: 0 }, use: { ok: 0, bad: 0 } };
  const without = t.vocabStats().recognize;
  assert.ok(before > without, '认识量应随选择题正向变化');
});

ok('endQuiz 清空会话', () => {
  t.endQuiz();
  assert.equal(t.getState().quiz, null);
});

// ── 复习 / 跳过仍然正常 ──
ok('beginReview 建立复习会话', () => {
  t.beginReview('all');
  const a = t.monthData().active;
  assert.ok(a && a.review === true);
});

ok('复习卡有跳过按钮，跳过生效', () => {
  const a = t.monthData().active;
  const word = a.words[a.index];
  assert.ok(t.monthPractice().includes('data-month-skip'));
  t.skipWord();
  assert.equal(t.isSkipped(word), true);
});

ok('unskipWord 可恢复', () => {
  t.unskipWord(W[3]);
  assert.equal(t.isSkipped(W[3]), false);
});

// ── 页面渲染 ──
ok('选择题页可渲染（选择方向 + 词汇量卡片）', () => {
  t.getState().quiz = null;
  t.nav('quiz');
  const html = nodes.get('#app').innerHTML;
  assert.ok(html.includes('CHOOSE, DO NOT SPELL'));
  assert.ok(html.includes('data-quiz-start="meaning"'));
  assert.ok(html.includes('data-quiz-start="cloze"'));
  assert.ok(html.includes('我的词汇量估算'));
});

ok('选择题答题界面可渲染 4 个可点选项', () => {
  t.beginQuiz('cloze');
  const html = nodes.get('#app').innerHTML;
  assert.ok((html.match(/data-quiz-answer=/g) || []).length === 4, '应有 4 个选项');
  assert.ok(html.includes('quiz-sentence'));
});

ok('复习页显示 认识/会用 两个数字', () => {
  t.nav('review');
  const html = nodes.get('#app').innerHTML;
  assert.ok(html.includes('认识 ≈'));
  assert.ok(html.includes('会用 ≈'));
});

ok('首页显示 认识/会用 并含选择题入口', () => {
  t.nav('home');
  const html = nodes.get('#app').innerHTML;
  assert.ok(html.includes('认识 ≈'));
  assert.ok(html.includes('会用 ≈'));
  assert.ok(html.includes('data-nav="quiz"'));
});

ok('原有页面仍能渲染（无回归）', () => {
  for (const p of ['home', 'library', 'scenes', 'difficult', 'settings', 'history', 'month', 'review', 'quiz']) {
    t.nav(p);
    assert.ok(nodes.get('#app').innerHTML.length > 500, p + ' 渲染异常');
  }
});

console.log(`\n全部 ${n} 项通过`);
