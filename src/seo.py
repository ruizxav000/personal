# makes ../index.html readable without running the 3D room: search engines, link previews and screen readers get the
# about panel as plain text (visually hidden, so the page looks the same), plus structured data and share tags.
# Everything comes from ABOUT and the diploma in editme.js / main.v15.js, so it never drifts from what the room shows.
import json,re,html
src=open('editme.js').read()
A=json.loads(re.search(r'var ABOUT=(\{.*?\});\n',src).group(1))
TWIN=re.search(r'var TWIN_URL="([^"]+)"',src).group(1)
URL='https://xavierruiz.io/'
e=lambda s:html.escape(s,quote=True)
p='../index.html';s=open(p).read()
DESC=html.unescape(re.search(r'<meta name="description" content="([^"]*)">',s).group(1))
head=f'''<link rel="canonical" href="{URL}">
<meta property="og:type" content="profile"><meta property="og:url" content="{URL}"><meta property="og:title" content="Xavier Ruiz"><meta property="og:description" content="{e(DESC)}"><meta property="og:site_name" content="Xavier Ruiz">
<meta name="twitter:card" content="summary"><meta name="twitter:title" content="Xavier Ruiz"><meta name="twitter:description" content="{e(DESC)}">
<script type="application/ld+json">{json.dumps({"@context":"https://schema.org","@type":"Person","name":"Xavier Ruiz","url":URL,"jobTitle":"Product Marketing","worksFor":{"@type":"Organization","name":"ServiceNow"},"address":{"@type":"PostalAddress","addressLocality":"Boston","addressRegion":"MA","addressCountry":"US"},"alumniOf":{"@type":"CollegeOrUniversity","name":"Texas A&M University"},"sameAs":[A["linkedin"]]},ensure_ascii=False)}</script>
'''
bio=''.join(f'<p>{e(p)}</p>' for p in A['bio'])
body=f'''<main class="sr" aria-label="About Xavier Ruiz"><h2>About</h2><p>{e(A["text"])}</p>{bio}
<h2>Contact</h2><ul><li><a tabindex="-1" href="mailto:{e(A["email"])}">{e(A["email"])}</a></li><li><a tabindex="-1" href="{e(A["linkedin"])}">LinkedIn profile</a></li></ul>
<h2>Education</h2><p>Texas A&amp;M University: Bachelor of Science in Technology Management, College of Education and Human Development. Class of 2022.</p>
<h2>Built for fun</h2><p><a tabindex="-1" href="{e(TWIN)}">Twin Paradox</a>: a first-person trip to a black hole, ray traced live in your browser.</p></main>
'''
a='<meta name="description"';assert s.count(a)==1
s=re.sub(r'(<meta name="description" content="[^"]*">)',lambda m:m.group(1)+'\n'+head.rstrip('\n'),s,1)
a='<canvas id="c" aria-label="';assert s.count(a)==1
s=re.sub(r'<canvas id="c" aria-label="[^"]*">',body+'<canvas id="c" aria-label="A 3D room: a shelf of records with a turntable, a lava lamp, a little house, a Saturn V model, posters, a diploma and an old TV">',s,1)
a='</style>';assert a in s
s=s.replace(a,'.sr{position:absolute!important;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);white-space:nowrap;border:0}\n'+a,1)
open(p,'w').write(s)
