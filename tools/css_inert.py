"""For each CSS block that is not on every page, test whether its selectors match
anything on the pages that lack it. Inert blocks can live in global.css at their
original position without changing those pages."""
import re, os, hashlib, sys
from bs4 import BeautifulSoup

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
W = os.path.join(ROOT, 'reference', 'widgets')
P = [f[:-5] for f in sorted(os.listdir(W))]
pages, blocks = {}, {}
for p in P:
    w = open(os.path.join(W, p + '.html'), encoding='utf-8').read()
    i = w.find('<div class="sh" id="sh-top">')
    pages[p] = BeautifulSoup(w[i:], 'lxml')
    for t, b in re.findall(r'<(style|script)>(.*?)</\1>', w[:i], re.S):
        h = hashlib.md5(b.encode()).hexdigest()[:8]
        blocks.setdefault(h, [t, b, []])[2].append(p)

def selectors(css):
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
    css = re.sub(r'@import[^;]*;', '', css)
    out = []
    # crude rule walk: take every "prelude {" that is not an at-rule
    for m in re.finditer(r'([^{}]+)\{', css):
        pre = m.group(1).strip()
        if pre.startswith('@') or re.match(r'^(from|to|\d+%)', pre):
            continue
        out += [s.strip() for s in pre.split(',') if s.strip()]
    return out

def simplify(sel):
    s = re.sub(r'::?(before|after|placeholder|-webkit-[a-z-]+|selection|marker)', '', sel)
    s = re.sub(r':not\((?:[^()]|\([^()]*\))*\)', '', s)
    s = re.sub(r':(hover|focus-visible|focus-within|focus|active|visited|checked|disabled|first-child|last-child|nth-child\([^)]*\)|nth-of-type\([^)]*\)|last-of-type|first-of-type|only-child|empty|where\([^)]*\)|is\([^)]*\))', '', s)
    # JS-added state classes: drop them so the static DOM can still match
    s = re.sub(r'\.(in|on|open|is-open|shrink|scrolled|show|act|active|vis|sh-ready|done|stuck|playing|ok|bad|err|sel|cur|sh-js|sh-in|ready|loaded|can-l|can-r|lb-on)\b', '', s)
    s = re.sub(r'\s+', ' ', s).strip()
    s = re.sub(r'(^|[\s>+~])(?=[\s>+~]|$)', r'\1*', s)  # fill empty compound
    return s or '*'

res = {}
for h, (t, b, ps) in blocks.items():
    if len(ps) == len(P) or t != 'style':
        continue
    hits = {}
    for p in P:
        if p in ps:
            continue
        for sel in selectors(b):
            ss = simplify(sel)
            if ss in ('*', 'html', 'body'):
                hits.setdefault(p, []).append(sel); continue
            try:
                if pages[p].select_one(ss) is not None:
                    hits.setdefault(p, []).append(sel)
            except Exception as e:
                hits.setdefault(p, []).append('ERR ' + sel)
    m = re.match(r'\s*/\*([^*]*)\*/', b)
    print(h, (m.group(1).strip() if m else '?'), 'pages', len(ps), '->', 'INERT' if not hits else {k: v[:4] for k, v in hits.items()})
