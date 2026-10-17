"""Build an attributed lexical reference for the user's exact 9,389-entry list.
Dictionary phrases are reference entries, not claims of collocational frequency.
WordNet example sentences are used only when the actual target/inflection occurs.
"""
import csv,json,re,zipfile,collections
from pathlib import Path
root=Path(__file__).parent.parent
raw=(root/'catalog.js').read_text(encoding='utf-8')
catalog=json.loads(raw.split('=',1)[1].strip().rstrip(';'))
targets={x['word'] for x in catalog}; entries={}; candidates=collections.defaultdict(list)
data=root/'tmp/enrichment'
def clean(x):return x.replace('\\n','\n').replace('\\r','').strip()
def freq(r):return min([int(r.get(k) or 0) for k in ['bnc','frq'] if (r.get(k) or '0').isdigit() and int(r.get(k) or 0)>0] or [999999])
with (data/'ecdict.csv').open(encoding='utf-8-sig',newline='') as f:
 for r in csv.DictReader(f):
  word=r['word'].strip();key=word.lower()
  # Prefer an exact-case ordinary headword over an uppercase abbreviation.
  if key in targets and (key not in entries or (word==key and entries[key].get('headword')!=key)):
   entries[key]={'headword':word,'meaning':clean(r['translation']),'definition':clean(r['definition']),'phonetic':r.get('phonetic',''),'rank':freq(r),'forms':r.get('exchange',''),'phrases':[],'examples':[],'domains':[],'source':'ECDICT'}
  if 2<=len(word.split())<=6 and word==word.lower() and re.fullmatch(r"[a-z][a-z '\-]+",word) and r['translation']:
   if word in {'a suite of apartment'}:continue # Malformed source entry; do not present as a model.
   tokens=set(re.findall(r"[a-z]+",word));matches=tokens&targets
   if matches:
    meaning=clean(r['translation']);penalty=60 if re.search(r'\[(?:医|化|计|电|机|法|经)\]',meaning) else 0
    score=1000-min(freq(r),999999)/1000 + (25 if re.match(r'^(?:be |have |make |take |get |give |pay |keep |go |come |look |in |on |at |for |with |by |to |as |a |an |the )',word) else 0)-penalty
    for key in matches:candidates[key].append((score,word,meaning))
with zipfile.ZipFile(data/'wordnet.zip') as z:
 lexnames={line.split()[0]:line.split()[1] for line in z.read('wordnet/lexnames').decode().splitlines()}
 wn=collections.defaultdict(list)
 for pos in ['noun','verb','adj','adv']:
  offsets={}
  for line in z.read('wordnet/index.'+pos).decode().splitlines():
   if not line or line.startswith(' '):continue
   tok=line.split();key=tok[0].replace('_',' ').lower()
   if key in targets:
    ptr=int(tok[3]);syn_count=int(tok[2]);offsets[key]=tok[6+ptr:6+ptr+syn_count]
  synsets={}
  wanted={off for values in offsets.values() for off in values[:3]}
  for line in z.read('wordnet/data.'+pos).decode().splitlines():
   if not line or line.startswith(' '):continue
   head,_,gloss=line.partition(' | ');tok=head.split()
   if tok[0] not in wanted:continue
   synsets[tok[0]]=(lexnames.get(tok[1],''),gloss)
  for key,offs in offsets.items():
   for off in offs[:3]:
    if off in synsets:wn[key].append(synsets[off])
 for key in targets:
  if key not in entries:entries[key]={'meaning':'','definition':'','phonetic':'','rank':999999,'forms':'','phrases':[],'examples':[],'domains':[],'source':''}
  e=entries[key];forms={key}
  for part in e['forms'].split('/'):
   if ':' in part:forms.add(part.split(':',1)[1])
  if re.fullmatch('[a-z]+',key):forms.update([key+'s',key+'ed',key+'ing'])
  patt=re.compile(r'(?<![a-z])(?:'+'|'.join(re.escape(s) for s in forms if s)+r')(?![a-z])',re.I)
  for domain,gloss in wn.get(key,[]):
   if domain and domain not in e['domains']:e['domains'].append(domain)
   if not e['definition']:e['definition']=gloss.split('; "',1)[0]
   for text in re.findall(r'"([^"]+)"',gloss):
    if 8<len(text)<=180 and patt.search(text) and text not in e['examples']:e['examples'].append(text)
  e['examples']=e['examples'][:3]
  seen=set()
  for score,phrase,meaning in sorted(candidates[key],reverse=True):
   if phrase in seen:continue
   seen.add(phrase);e['phrases'].append({'en':phrase,'zh':meaning,'source':'ECDICT'})
   if len(e['phrases'])==4:break
 (root/'licenses').mkdir(exist_ok=True)
 (root/'licenses/WordNet-LICENSE.txt').write_bytes(z.read('wordnet/LICENSE'))
(root/'licenses/ECDICT-LICENSE.txt').write_bytes((data/'ECDICT-LICENSE.txt').read_bytes())
domains={'noun.food':'点餐购物','noun.artifact':'居家生活','noun.person':'人际交往','noun.communication':'沟通表达','verb.communication':'沟通表达','noun.act':'工作学习','noun.cognition':'教育学习','verb.cognition':'教育学习','noun.animal':'自然环境','noun.plant':'自然环境','noun.object':'自然环境','noun.location':'交通出行','noun.body':'健康身体','noun.state':'状态感受','noun.feeling':'情绪表达','noun.possession':'金钱消费','noun.group':'社会生活','noun.time':'时间安排','verb.motion':'交通出行','verb.social':'人际交往','verb.consumption':'点餐购物','verb.creation':'科技创作'}
core=json.loads((root/'core-usage.json').read_text(encoding='utf-8'))
for word,e in entries.items():
 # Keep marked specialist senses available, but never put them in the recall cue.
 common=[];special=[]
 for line in e['meaning'].splitlines():
  (special if re.search(r'\[[^\]]+\]',line) else common).append(line)
 e['specialistMeaning']='\n'.join(special)
 e['meaning']='\n'.join(common)
 if word in core:
  e['meaning']=core[word]['meaning'];e['learner']=core[word]
  # Short function words can match names, chemical symbols, or abbreviations.
  e['definition']='';e['examples']=[];e['domains']=[]
 e['scenes']=list(dict.fromkeys(domains[d] for d in e['domains'] if d in domains))[:2]
 e['dictionaryUrl']='https://github.com/skywind3000/ECDICT'
 e['exampleUrl']='https://wordnet.princeton.edu/'
stats={'total':len(targets),'meanings':sum(bool(e['meaning'] or e['specialistMeaning']) for e in entries.values()),'phrases':sum(bool(e['phrases']) for e in entries.values()),'phraseCount':sum(len(e['phrases']) for e in entries.values()),'examples':sum(bool(e['examples']) for e in entries.values()),'exampleCount':sum(len(e['examples']) for e in entries.values()),'suggestedScenes':sum(bool(e['scenes']) for e in entries.values()),'specialistSeparated':sum(bool(e['specialistMeaning']) for e in entries.values()),'coreReviewed':len(core),'missingMeanings':[k for k,e in entries.items() if not e['meaning'] and not e['specialistMeaning']]}
(root/'enrichment.js').write_text('window.LEXICON = '+json.dumps(entries,ensure_ascii=False,separators=(',',':'))+';\nwindow.ENRICHMENT_STATS = '+json.dumps(stats,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf-8')
(data/'coverage.json').write_text(json.dumps(stats,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(stats,ensure_ascii=False,indent=2))
