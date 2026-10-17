"""Create the portable HTML and deployment ZIP from the current static source."""
from pathlib import Path
import re,zipfile
root=Path(__file__).parent.parent; dist=root; out=root.parent
html=(dist/'index.html').read_text(encoding='utf-8')
scripts=re.findall(r'<script src="([^"]+)" defer></script>',html)
html=re.sub(r'<script src="[^"]+" defer></script>','',html)
html=html.replace('<link rel="stylesheet" href="style.css">','<style>'+ (dist/'style.css').read_text(encoding='utf-8')+'</style>')
code='\n'.join((dist/name).read_text(encoding='utf-8') for name in scripts)
code=code.replace('</script','<\\/script')
html=html.replace('</body>','<script>'+code+'</script></body>')
html=html.replace('href="licenses/ECDICT-LICENSE.txt"','href="https://github.com/skywind3000/ECDICT/blob/master/LICENSE"').replace('href="licenses/WordNet-LICENSE.txt"','href="https://wordnet.princeton.edu/license-and-commercial-use"')
(out/'词间-单词练习.html').write_text(html,encoding='utf-8')
with zipfile.ZipFile(out/'词间-网页部署包.zip','w',zipfile.ZIP_DEFLATED) as z:
 for p in dist.rglob('*'):
  if p.is_file():z.write(p,p.relative_to(dist).as_posix())
print('Portable HTML and ZIP updated; '+str(len(scripts))+' scripts embedded.')
