"""If page-only block X is moved after all global blocks, would any later global rule that
originally overrode X now lose? Report (page, block, selector, prop) pairs that overlap."""
import re, os, hashlib, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from css_inert import P, pages, blocks, simplify

def rules(css):
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
    css = re.sub(r'@import[^;]*;', '', css)
    out = []; stack = []; i = 0; buf = ''
    for m in re.finditer(r'([^{}]*)([{}])', css):
        pre, br = m.group(1).strip(), m.group(2)
        if br == '{':
            stack.append(pre)
        else:
            if pre and stack and not stack[-1].startswith('@'):
                sel = stack[-1]; media = ' '.join(s for s in stack[:-1])
                props = [d.split(':', 1)[0].strip() for d in pre.split(';') if ':' in d]
                for s in sel.split(','):
                    out.append((media, s.strip(), props))
            if stack: stack.pop()
    # rules with declarations directly before '}' handled above; also catch "a{b:c}" form
    return out

def r2(css):
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.S); css = re.sub(r'@import[^;]*;', '', css)
    out = []; stack = []
    for tok in re.finditer(r'([^{}]*)\{|([^{}]*)\}', css):
        if tok.group(1) is not None:
            stack.append([tok.group(1).strip(), ''])
        else:
            body = tok.group(2)
            if stack:
                pre, _ = stack.pop()
                if not pre.startswith('@') and not re.match(r'^(from|to|[\d.]+%)', pre):
                    props = {d.split(':', 1)[0].strip() for d in body.split(';') if ':' in d}
                    media = ' & '.join(s[0] for s in stack)
                    for s in pre.split(','):
                        if s.strip(): out.append((media, s.strip(), props))
    return out

_cache = {}
def matches(doc, sel):
    ss = simplify(sel)
    key = (id(doc), ss)
    if key in _cache: return _cache[key]
    _cache[key] = _m(doc, ss)
    return _cache[key]
def _m(doc, ss):
    try:
        return set(id(e) for e in doc.select(ss)) if ss not in ('*',) else None
    except Exception:
        return None

moved = sys.argv[1:]
W = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'reference', 'widgets')
for p in P:
    w = open(os.path.join(W, p + '.html'), encoding='utf-8').read()
    pre = w[:w.find('<div class="sh" id="sh-top">')]
    seq = [hashlib.md5(b.encode()).hexdigest()[:8] for t, b in re.findall(r'<(style|script)>(.*?)</\1>', pre, re.S)]
    doc = pages[p]
    for k, h in enumerate(seq):
        if h not in moved: continue
        later = [x for x in seq[k+1:] if x not in moved and blocks[x][0] == 'style']
        for media, sel, props in r2(blocks[h][1]):
            A = matches(doc, sel)
            if not A: continue
            for lh in later:
                for m2, s2, p2 in r2(blocks[lh][1]):
                    common = props & p2
                    if not common: continue
                    B = matches(doc, s2)
                    if B and (A & B):
                        print(p, h, repr(media), sel, '<->', lh, repr(m2), s2, sorted(common))
