const path=require('node:path');
// Persistence, scheduling, no-answer-leakage, timer and backup regression checks.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
let clock=new Date('2026-10-19T12:00:00+08:00').getTime();
class TestDate extends Date{constructor(...a){super(...(a.length?a:[clock]));}static now(){return clock;}}
const SITE=process.env.SITE_DIR||path.resolve(__dirname,'..');
const disk=new Map();let checks=0;
function check(name,fn){fn();checks++;console.log('✓ '+name);}
function boot(){
 const nodes=new Map(['#app','#toast','#modal','#import-file'].map(k=>[k,{innerHTML:'',textContent:'',classList:{add(){},remove(){}},open:false,showModal(){this.open=true;},close(){this.open=false;}}]));
 let interval;const callbacks={};
 const ctx={window:{scrollTo(){}},document:{hidden:false,querySelector:s=>nodes.get(s)||null,addEventListener:(n,f)=>callbacks[n]=f},localStorage:{getItem:k=>disk.get(k)||null,setItem:(k,v)=>disk.set(k,v)},Date:TestDate,console,Map,Set,Blob,URL,FormData:class{},setTimeout:()=>1,clearTimeout(){},setInterval:f=>{interval=f;}};
 vm.createContext(ctx);
 for(const name of ['catalog.js','lexicon-core.js','situations.js','lessons.js','book-lessons.js','source-materials.js','exam-lessons.js'])vm.runInContext(fs.readFileSync(path.join(SITE,name),'utf8'),ctx);
 let source=fs.readFileSync(path.join(SITE,'app.js'),'utf8');
 if(process.argv[2]){const html=fs.readFileSync(process.argv[2],'utf8');source=html.slice(html.lastIndexOf("'use strict';"),html.lastIndexOf('</script>')).replaceAll('<\\/script','</script');}
 source=source.replace(/render\(\);\s*ensureNotes\(\);\s*\}\)\(\);\s*$/,`window.test={prefs:wordPrefs,words:practiceWords,order:orderPractice,matches:wordMatches,state:()=>state,data:sprintData,today:sprintDay,queue:sprintQueue,start:sprintStart,rate:sprintRate,reveal:sprintReveal,submit:sprintSubmit,audio:sprintAudio,page:sprintPage,summary:sprintSummary,valid:validate,nav,save,week:sprintWeek,due:sprintDue};render();})();`);
 vm.runInContext(source,ctx);return {t:ctx.window.test,ctx,nodes,tick:()=>interval(),callbacks};
}
let {t,ctx,nodes,tick,callbacks}=boot();
check('默认是200个快筛新词，精练25分钟与8搭配独立设置',()=>{assert.equal(t.data().screenCount,200);assert.equal(t.data().minutes,25);assert.equal(t.data().newCount,8);assert.equal(t.queue('screen').length,200);assert.equal(t.queue('mix').filter(q=>q.skill==='recall').length,8);});
check('快筛英文不会提前出现在页面',()=>{t.start('screen');const a=t.data().active,word=a.queue[0].id.slice(5);assert.ok(!t.page().includes('>'+word+'<'));assert.equal(a.queue.length,200);});
check('看答案不会直接完成或算作客观掌握',()=>{t.reveal();assert.equal(t.data().events.length,0);t.rate('no');assert.equal(t.data().events.length,1);assert.equal(t.data().events[0].ok,false);assert.equal(t.today().screenIds.length,1);assert.equal(t.state().month.reviewed[t.data().events[0].id.slice(5)].rating,1);});
check('同题重复点击不会重复累计',()=>{t.rate('no');assert.equal(t.data().events.length,1);});
check('快筛结果与旧版复习页共享，不改变跳过名单',()=>{const w=t.data().active.queue[0].id.slice(5);t.state().month.skipped={[w]:true};t.data().active=null;assert.ok(!t.queue('screen').some(q=>q.id==='word:'+w));});
check('精练按模式分项，英文答案在作答前隐藏',()=>{t.start('mix');const a=t.data().active;assert.equal(a.queue[0].skill,'recall');const l=ctx.window.LESSONS.find(l=>l.id===a.queue[0].id);assert.ok(!t.page().includes(l.phrase));t.reveal();t.rate('yes');assert.equal(t.data().active.queue[t.data().active.i].skill,'listen');assert.ok(t.data().progress[l.id].recall);assert.equal(t.data().progress[l.id].listen,undefined);});
check('音频未成功播放不允许提交，不记错误',()=>{const a=t.data().active;const count=t.data().events.length;a.ui.input='anything';t.submit();assert.equal(a.ui.feedback,null);t.audio();assert.equal(a.ui.audio,'error');assert.equal(t.data().events.length,count);});
check('成功播放后才能检查；错误原答案保留且不能二次覆盖',()=>{const a=t.data().active;a.ui.audio='played';a.ui.input='incorrect';t.submit();assert.equal(a.ui.feedback,false);a.ui.input='still incorrect';t.submit();assert.equal(a.ui.feedback,false);t.rate('next');const e=t.data().events.at(-1);assert.equal(e.skill,'listen');assert.equal(e.ok,false);});
check('提示在刷新后保留，不能算无提示正确',()=>{const a=t.data().active;a.ui.hinted=true;a.ui.input=ctx.window.LESSONS.find(l=>l.id===a.queue[a.i].id).phrase;t.save();({t,ctx,nodes,tick,callbacks}=boot());assert.equal(t.data().active.ui.hinted,true);t.submit();t.rate('next');const e=t.data().events.at(-1);assert.equal(e.ok,true);assert.equal(e.hinted,true);});
check('导入校验保留旧字段与冲刺数据，并拒绝坏队列',()=>{const good=t.valid(JSON.parse(disk.get('word-garden-v1')));assert.equal(good.sprint.events.length,4);assert.ok(good.month);const bad=JSON.parse(JSON.stringify(good));bad.sprint.active.queue[0].id='missing-lesson';assert.throws(()=>t.valid(bad));bad.sprint=good.sprint;bad.sprint.events[0].ok='yes';assert.throws(()=>t.valid(bad));});
check('跨天复习独立统计，不因同日多次答对增加跨天等级',()=>{const id=t.data().events.find(e=>e.skill==='recall').id;const p=t.data().progress[id].recall,streak=p.streak;clock+=86400000;t.data().active={kind:'review',day:'2026-10-20',queue:[{id,skill:'recall'}],i:0,ui:{input:'',revision:'',hinted:false,revealed:true,audio:'idle',feedback:null}};t.rate('yes');assert.equal(p.streak,streak+1);assert.equal(t.data().events.at(-1).delayed,true);t.data().active={kind:'review',day:'2026-10-20',queue:[{id,skill:'recall'}],i:0,ui:{input:'',revision:'',hinted:false,revealed:true,audio:'idle',feedback:null}};t.rate('yes');assert.equal(p.streak,streak+1);});
check('自主表达不匹配范句评分，保存原答案和修改版',()=>{const id=ctx.window.LESSONS[0].id;t.data().active={kind:'mix',day:'2026-10-20',queue:[{id,skill:'use'}],i:0,ui:{input:'My own different sentence.',revision:'',hinted:false,revealed:false,audio:'idle',feedback:null}};t.submit();assert.equal(t.data().active.ui.revealed,true);t.rate('no');assert.ok(t.data().active,'Requires revision before recording a mistake');t.data().active.ui.revision='My corrected sentence.';t.rate('no');assert.equal(t.data().outputs.at(-1).original,'My own different sentence.');assert.equal(t.data().outputs.at(-1).revision,'My corrected sentence.');assert.equal(t.data().active,null);});
check('精练预算只计前台时间，达到时长暂停且保留当前题',()=>{t.today().ms=t.data().minutes*60000-1000;t.start('review');assert.ok(t.data().active);t.nav('sprint');ctx.document.hidden=true;clock+=1000;tick();assert.equal(t.today().ms,t.data().minutes*60000-1000);ctx.document.hidden=false;clock+=1000;tick();assert.equal(t.today().ms,t.data().minutes*60000);assert.ok(t.data().active);assert.ok(t.page().includes('调整每日安排'));});
check('旧版备份没有冲刺字段仍可导入',()=>{const old=JSON.parse(disk.get('word-garden-v1'));delete old.sprint;assert.equal(t.valid(old).sprint.screenCount,200);});
check('到期积压时不再加入精练新搭配',()=>{t.data().active=null;t.today().ms=0;for(const l of ctx.window.LESSONS.slice(0,20))t.data().progress[l.id]={recall:{attempts:1,hits:0,misses:1,due:0,last:0,streak:0,day:'2026-10-18'}};assert.ok(t.queue('mix').length>=16);assert.ok(t.queue('mix').every(q=>t.data().progress[q.id]));});
check('摘要正确渲染，无未求值模板或HTML注入',()=>{const s=t.summary();assert.ok(s.includes('200'));assert.ok(!s.includes('${'));t.data().outputs.push({id:ctx.window.LESSONS[0].id,at:clock,day:'2026-10-20',original:'<img src=x onerror=alert(1)>',revision:'',error:'语法'});assert.ok(!t.summary().includes('<img src=x'));});
check('统计表渲染真实表头和已有记录，不泄露拼接代码',()=>{
 const id=ctx.window.LESSONS[0].id,phrase=ctx.window.LESSONS[0].phrase;
 t.data().progress={[id]:{listen:{attempts:3,hits:2,misses:1,due:clock,last:clock,streak:1,day:'2026-10-20'}}};
 const html=t.summary();
 for(const label of ['主动回忆（自评）','短句听辨','搭配拼写','自主表达（自评）'])assert.ok(html.includes('<th scope="col">'+label+'</th>'));
 assert.ok(html.includes('<th scope="row">'+phrase+'</th>'));
 assert.ok(html.includes('<td>1 次需复习 · 3 次作答</td>'));
 assert.ok(html.includes('<td>未练</td>'));
 for(const leaked of ['.map(','.join(',"'+",'sprintLabels[','Object.entries(',"p[k]."])assert.ok(!html.includes(leaked),'Leaked code: '+leaked);
});
check('空表显示五列占位提示，不泄露拼接代码',()=>{
 const previous=t.data().progress;t.data().progress={};
 const html=t.summary();assert.ok(html.includes('colspan="5"'));assert.ok(!html.includes('.map('));t.data().progress=previous;
});
check('随机顺序保留全部词且不修改原词表',()=>{
 const words=Array.from(ctx.window.CATALOG,c=>c.word),original=[...words];
 t.prefs().order='random';t.prefs().type='all';t.prefs().range='all';
 vm.runInContext('var savedRandom=Math.random;Math.random=()=>0;',ctx);
 const mixed=Array.from(t.words(words));
 vm.runInContext('Math.random=savedRandom;',ctx);
 assert.deepEqual(words,original);assert.equal(new Set(mixed).size,9389);assert.notDeepEqual(mixed,original);
 t.prefs().order='ordered';assert.deepEqual(Array.from(t.words(words)),original);
});
check('词表范围准确，词性分组非空且每个词符合筛选',()=>{
 const words=Array.from(ctx.window.CATALOG,c=>c.word);
 t.prefs().range='common';assert.equal(t.words(words).length,7956);
 t.prefs().range='extra';assert.equal(t.words(words).length,1433);t.prefs().range='all';
 for(const type of ['noun','verb','adj','adv','phrase']){t.prefs().type=type;const group=Array.from(t.words(words));assert.ok(group.length>0,type+' should have entries');assert.ok(group.every(w=>t.matches(w)));if(type==='phrase')assert.ok(group.every(w=>/\s/.test(w)));}
 t.prefs().type='all';
});
check('筛选设置可备份恢复，旧备份默认随机，精练新词遵守筛选',()=>{
 t.prefs().range='common';t.prefs().type='verb';t.prefs().order='random';
 t.data().progress={};t.data().active=null;t.today().newIds=[];t.today().ms=0;
 const tasks=Array.from(t.queue('mix'));assert.ok(tasks.length>0);
 assert.ok(tasks.every(q=>{const l=ctx.window.LESSONS.find(l=>l.id===q.id);return t.matches(l.word,l.phrase);}));
 const imported=t.valid(JSON.parse(JSON.stringify(t.state())));assert.equal(imported.wordPractice.type,'verb');
 delete imported.wordPractice;assert.equal(t.valid(imported).wordPractice.order,'random');
});
console.log(`\n${checks} sprint checks passed.`);
