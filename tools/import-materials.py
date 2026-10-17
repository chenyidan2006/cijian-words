"""Import user-supplied reference tables; preserve associations without declaring equivalence."""
import argparse, json, re, zipfile
from pathlib import Path
import xml.etree.ElementTree as ET
import pdfplumber

parser=argparse.ArgumentParser()
parser.add_argument('--source-dir',required=True)
args=parser.parse_args()
base=Path(args.source_dir)
root=Path(__file__).parent.parent
reading=[]
ns={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
with zipfile.ZipFile(base/'阅读高频考点词538.docx') as z:
    root=ET.fromstring(z.read('word/document.xml'))
for ti,table in enumerate(root.findall('.//w:tbl',ns),1):
    for ri,row in enumerate(table.findall('w:tr',ns),1):
        cells=[' '.join(''.join(n.text or '' for n in p.findall('.//w:t',ns)) for p in cell.findall('.//w:p',ns)).strip() for cell in row.findall('w:tc',ns)]
        if not cells or '考点词' in ''.join(cells):continue
        if len(cells)==4:rank,word,meaning,related=cells
        elif len(cells)==3:word,meaning,related=cells;rank=''
        else:raise ValueError(('unexpected table shape',ti,ri,cells))
        reading.append({'id':'reading-'+str(len(reading)+1),'word':word.replace('*','').strip(),'meaning':re.sub(r'\s+',' ',meaning),'related':re.sub(r'\s+',' ',related),'rank':rank.strip(),'table':ti,'row':ri,'tier':1 if ti<=2 else 2 if ti<=6 else 3,'source':'reading'})

listening=[]
with pdfplumber.open(base/'听力179词同义替换.pdf') as pdf:
    for pi,page in enumerate(pdf.pages[1:],2):
        words=page.extract_words(x_tolerance=1.5,y_tolerance=3)
        numbers=[w for w in words if 78<w['x0']<103 and w['text'].isdigit() and 70<w['top']<600]
        for i,num in enumerate(numbers):
            centre=(num['top']+num['bottom'])/2
            lo=((numbers[i-1]['top']+numbers[i-1]['bottom'])/2+centre)/2 if i else max(70,centre-14)
            hi=((numbers[i+1]['top']+numbers[i+1]['bottom'])/2+centre)/2 if i+1<len(numbers) else 600
            left=page.crop((104,lo,236,hi)).extract_text(x_tolerance=1.5,y_tolerance=3) or ''
            right=page.crop((237,lo,416,hi)).extract_text(x_tolerance=1.5,y_tolerance=3) or ''
            left=' '.join(left.split())
            if '[' in left:word=left.split('[')[0].strip()
            else:word=re.split(r'[\u4e00-\u9fff]',left,1)[0].strip();word=re.sub(r'\s+(?:adj|adv|conj|prep|pron|n|v)\.?\s*$','',word)
            match=re.search(r'[\u4e00-\u9fff].*',left)
            meaning=match.group(0) if match else left
            listening.append({'id':'listening-'+num['text'],'number':int(num['text']),'word':word,'meaning':meaning,'related':' '.join(right.split()),'pdfPage':pi,'printedPage':pi+6,'source':'listening'})
listening.sort(key=lambda r:r['number'])
assert [r['number'] for r in listening]==list(range(1,180)),[r['number'] for r in listening]
assert all(r['word'] and r['related'] for r in listening)
sources={'listening':{'title':'听力179词同义替换','label':'听力 179 考点词','data':listening},'reading':{'title':'阅读高频考点词538','label':'阅读考点词资料','data':reading}}
(root/'source-materials.js').write_text('window.EXAM_SOURCES = '+json.dumps(sources,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf-8')
print(json.dumps({'listening':len(listening),'readingHeadwordRows':len(reading),'listeningSamples':listening[:3],'readingSamples':reading[:2]},ensure_ascii=False,indent=2))
