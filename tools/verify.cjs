const path=require('node:path');
const fs=require('node:fs');
const vm=require('node:vm');
const assert=require('node:assert/strict');
let clock=new Date('2026-10-17T12:00:00+08:00').getTime();
class TestDate extends Date {constructor(...a){super(...(a.length?a:[clock]));}static now(){return clock;}}
const SITE=process.env.SITE_DIR||path.resolve(__dirname,'..');
const disk=new Map();
function boot(){
  const nodes=new Map(['#app','#toast','#modal','#import-file'].map(s=>[s,{innerHTML:'',textContent:'',classList:{add(){},remove(){}},open:false,showModal(){this.open=true;},close(){this.open=false;}}]));
  const ctx={window:{scrollTo(){}},document:{querySelector:s=>nodes.get(s)||null,addEventListener(){}},localStorage:{getItem:k=>disk.get(k)||null,setItem:(k,v)=>disk.set(k,v)},Date:TestDate,console,setTimeout:()=>1,clearTimeout(){},Map,Set,Blob,URL,FormData:class{}};
  vm.createContext(ctx);
  for(const name of ['catalog.js','lexicon-core.js','lexicon-notes.js','situations.js','lessons.js','book-lessons.js','source-materials.js','exam-lessons.js'])vm.runInContext(fs.readFileSync(path.join(SITE,name),'utf8'),ctx);
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
  let source=fs.readFileSync(path.join(SITE,'app.js'),'utf8');
  source=source.replace(/render\(\);\s*(?:ensureNotes\(\);\s*)?(?:ensureZh\(\);\s*)?\}\)\(\);\s*$/,`window.test={continuePractice,result,monthPage,getState:()=>state,getUI:()=>taskUI,start:(...args)=>{state.active=null;start(...args);},advance,makeTask,pFor,dueLessons,validate,status,filteredLibrary,switchLibraryTab,getLib:()=>lib,dictionaryHtml,meaningPrompt,beginCatalog,oralPractice,monthWords,monthData,beginMonth,monthPractice,rateMonth,setHint:n=>{taskUI.hint=n;persistUI();},setFeedback:()=>{taskUI.feedback={correct:true};persistUI();},nav,esc};render();\n})();`);
  vm.runInContext(source,ctx);
  return {t:ctx.window.test,window:ctx.window,nodes};
}
let {t,window:w}=boot();
assert.equal(w.CATALOG.length,9389);
assert.equal(w.CATALOG.filter(c=>c.common).length,7956);
assert.equal(new Set(w.CATALOG.map(c=>c.word)).size,9389);
assert.equal(new Set(w.LESSONS.map(l=>l.id)).size,w.LESSONS.length,'Lesson IDs must be unique');
assert.equal(w.BOOK_LESSONS.length,249);
assert.equal(w.EXAM_LESSONS.length,60);
assert.equal(w.EXAM_SOURCES.listening.data.length,179);
assert.equal(w.EXAM_SOURCES.reading.data.length,376);
for(const l of w.EXAM_LESSONS){assert.ok(l.sourceRecordId,l.id+' source');assert.ok(l.originalSentence);}
for(const l of w.BOOK_LESSONS){assert.ok(l.reference);assert.equal(l.pdfPage,l.bookPage+11);assert.ok(l.bookChapter);}
for(const l of w.LESSONS){assert.ok(l.sentence.includes(l.phrase),l.id+' sentence target');if(l.prep)assert.ok(new RegExp('\\b'+l.prep+'\\b').test(l.phrase),l.id+' prep target');for(const v of l.variants||[])assert.ok(v.sentence.includes(l.phrase),l.id+' variant target');}
assert.equal(t.getState().settings.book,'daily');
t.start('id','seed-1');t.advance(true);
let p=t.pFor('seed-1');assert.equal(p.streak,1);assert.equal(p.due-clock,86400000);assert.equal(p.recallDays.length,1);assert.equal(t.getState().sessions[0].independent,1);
t.start('id','seed-1');t.advance(true);p=t.pFor('seed-1');assert.equal(p.streak,1,'Same-day repetitions must not inflate spacing');assert.equal(p.recallDays.length,1);assert.notEqual(t.status(w.LESSONS[0]),'隔天也能想起');
clock+=86400000;t.start('id','seed-1');assert.equal(t.makeTask(w.LESSONS[0]).type,'open');t.advance(true,true);assert.equal(t.pFor('seed-1').recallDays.length,1,'Self assessment must not count as objective recall');
t.start('id','seed-1');t.advance(true);p=t.pFor('seed-1');assert.equal(p.recallDays.length,2);assert.equal(p.streak,2);assert.equal(p.due-clock,3*86400000);
t.start('id','seed-2');t.setHint(1);t.setFeedback();
({t,window:w}=boot());assert.equal(t.getState().active.queue[0],'seed-2');assert.equal(t.getUI().hint,1,'Reload must retain hints');assert.equal(t.getUI().feedback.correct,true,'Reload must retain feedback');assert.equal(t.getState().progress['seed-1'].hits,3,'Reload must retain records');
t.advance(true);p=t.pFor('seed-2');assert.equal(p.hits,0);assert.equal(p.hints,1);assert.equal(p.due-clock,6*3600000);
t.start('id','seed-3');t.advance(false);p=t.pFor('seed-3');assert.equal(p.streak,0);assert.equal(p.due-clock,10*60000);
assert.throws(()=>t.validate({version:2}));
const imported=t.validate(JSON.parse(disk.get('word-garden-v1')));assert.equal(imported.sessions.length,6);
assert.equal(t.esc('<img onerror="x">'),'&lt;img onerror=&quot;x&quot;&gt;');
assert.equal(Object.keys(w.LEXICON).length,9389);
assert.equal(w.ENRICHMENT_STATS.meanings,9344);
assert.equal(w.ENRICHMENT_STATS.phrases,7822);
assert.ok(!w.LEXICON.be.meaning.includes('总线'));
assert.ok(w.LEXICON.be.specialistMeaning.includes('总线允许'));
assert.ok(!t.meaningPrompt('be').includes('后端'));
for(const word of ['it','us','as','at','may'])assert.ok(w.LEXICON[word].learner,'Core words must have ordinary-language guidance');
const beHtml=t.dictionaryHtml('be');assert.ok(beHtml.includes('在官网查看'));assert.ok(beHtml.includes('本站编写'));assert.ok(beHtml.includes('专业 / 领域义项'));assert.ok(!beHtml.includes('WordNet 语境用例'));assert.ok(t.dictionaryHtml('accumulate').includes('阅读 · 同义改写练习'));assert.ok(t.dictionaryHtml('accumulate').includes('研究人员继续收集证据。'));assert.ok(t.dictionaryHtml('accumulate').includes('开始回忆练习'));
Object.assign(t.getLib(),{tab:'ready',book:'all',source:'zhenjing'});assert.equal(t.filteredLibrary().length,249);
t.getLib().tab='all';assert.equal(t.filteredLibrary().length,211,'Book exercise scope has 211 unique catalog headwords');
t.switchLibraryTab('all');assert.equal(t.filteredLibrary().length,9389,'All-words tab must clear stale book filters');
t.getLib().book='common';assert.equal(t.filteredLibrary().length,7956);t.getLib().book='all';t.getLib().q='be';assert.equal(t.filteredLibrary()[0].word,'be','Exact headwords must rank before phrase matches');t.getLib().q='';
t.switchLibraryTab('ready');assert.equal(t.filteredLibrary().length,395);
t.beginCatalog(['be','it']);let active=t.monthData().active;assert.equal(active.words[0],'be');active.flipped=true;active.tried=true;t.rateMonth(2);t.monthData().active=null;t.beginCatalog(['be','it']);assert.equal(t.monthData().active.words[0],'it','Next group must continue unseen words');t.monthData().active=null;
const partition=Array.from({length:30},(_,i)=>t.monthWords(i+1)).flat();assert.equal(partition.length,9389);assert.equal(new Set(partition).size,9389,'30-day plan must cover each source entry once');
assert.ok(Array.from({length:30},(_,i)=>t.monthWords(i+1).length).every(n=>n>=312&&n<=313));
t.start('id','seed-4');let oral=t.oralPractice();assert.ok(!oral.includes('participate in the discussion'),'Default recall must not expose English target');assert.ok(!oral.includes('answer-input'),'Default recall must not require typing');t.advance(false,true);
t.beginMonth();let ma=t.monthData().active;assert.equal(ma.words.length,20);assert.ok(!ma.flipped);const before=t.monthPractice();assert.ok(!before.includes('lex-head'),'Monthly target must be hidden until flip');ma.flipped=true;ma.tried=false;const word=ma.words[0];t.rateMonth(2);assert.equal(t.monthData().reviewed[word].rating,1,'Seeing the answer first cannot count as active recall');
for(const k of w.SITUATIONS)for(const phrase of k.phrases)assert.ok(w.LESSONS.some(l=>l.phrase===phrase),k.id+': missing expression '+phrase);
// Completing a one-item context lesson must offer another group, without daily caps.
t.getState().active=null;t.start('id','seed-4');const original=t.getState().active.queue[0];t.advance(true,true);assert.ok(t.getState().active,'A completed context must automatically continue');assert.ok(!t.getState().active.queue.includes(original),'Continuation must advance within the same context');
t.getState().active=null;t.start('daily');assert.ok(t.getState().active.queue.length>0,'Daily counts must never block a new session');
t.getState().month.active=null;t.beginCatalog(['be']);let single=t.monthData().active;single.flipped=true;single.tried=true;t.rateMonth(2);assert.ok(t.monthData().active,'Word groups automatically continue');assert.notEqual(t.monthData().active.words[0],'be');
console.log(JSON.stringify({catalog:w.CATALOG.length,lessons:w.LESSONS.length,variants:w.LESSONS.reduce((n,l)=>n+(l.variants||[]).length,0),checks:'catalog integrity, exact targets, recall scheduling, day separation, self assessment separation, reload persistence, hint retention, backup validation, HTML escaping: passed'},null,2));
