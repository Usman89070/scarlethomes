"""Generate the Next.js app source from the extracted reference.

Inputs : reference/widgets/*.html (style/script blocks), reference/dom/*.json (browser-parsed DOM),
         reference/seo.json, web/public/images/*
Outputs: web/styles/global.css, web/styles/pages/*.css, web/app/**/page.tsx,
         web/components/{Header,Footer,FixedUI}.tsx, web/lib/legacy/*.js, web/data/seo.json

Run once (python3 -I tools/generate.py). After that the generated files are normal source
files; the generator is kept so the conversion is reproducible and auditable.
"""
import hashlib, json, os, re, sys
from collections import OrderedDict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REF = os.path.join(ROOT, 'reference')
WEB = os.path.join(ROOT, 'web')
REF_HOST = 'https://gleaming-gold-raccoon-58.hostingersite.com'
PROD = 'https://scarlethomes.com.au'

PAGES = ['index', 'duplex-builders-sydney', 'knockdown-rebuild-sydney', 'new-home-builders-sydney',
         'granny-flat-builders-sydney', 'projects', 'about', 'contact', 'service-areas',
         'home-builders-hornsby', 'home-builders-hills-district', 'home-builders-parramatta',
         'home-builders-leppington']

def route(slug):
    return '/' if slug == 'index' else '/' + slug + '/'

def h8(s):
    return hashlib.md5(s.encode()).hexdigest()[:8]

def write(rel, text):
    p = os.path.join(WEB, rel)
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, 'w', encoding='utf-8') as f:
        f.write(text)
    print('wrote', rel, len(text))

# --------------------------------------------------------------------------------------------
# 1. CSS + JS blocks
# --------------------------------------------------------------------------------------------
seq = {}          # slug -> [hash...] (style + pre scripts) in original order
blocks = {}       # hash -> (type, text)
post_scripts = {} # slug -> [text...] scripts after #sh-top (except JSON-LD)
for slug in PAGES:
    w = open(os.path.join(REF, 'widgets', slug + '.html'), encoding='utf-8').read()
    i = w.find('<div class="sh" id="sh-top">')
    seq[slug] = []
    for t, b in re.findall(r'<(style|script)>(.*?)</\1>', w[:i], re.S):
        k = h8(b); blocks[k] = (t, b); seq[slug].append(k)
    post_scripts[slug] = [b for b in re.findall(r'<script>(.*?)</script>', w[i:], re.S)]

# Blocks that are not on every page and DO match elements on pages that lack them
# (see tools/css_inert.py). They go to the page's own CSS file, after global.css.
# tools/css_conflicts.py confirmed no later shared rule competes with them.
PAGE_ONLY = {'5728765d', '5a9085d5', '0441bb18', '2331b527'}
# The home page's copy of the v3 block lacks two `.sh-ph .sh-eye` rules; the home page has no
# .sh-ph element, so the 12-page version is used globally.
REPLACE = {'79c8a1f1': 'aa7c1275'}

def norm(slug):
    return [REPLACE.get(k, k) for k in seq[slug]]

# topological merge of all page sequences (shared + inert page-only blocks)
order = []
graph = OrderedDict()
for slug in PAGES:
    s = [k for k in norm(slug) if blocks[k][0] == 'style' and k not in PAGE_ONLY]
    for a, b in zip(s, s[1:]):
        graph.setdefault(a, set()).add(b)
    for k in s:
        graph.setdefault(k, set())
indeg = {k: 0 for k in graph}
for a in graph:
    for b in graph[a]:
        indeg[b] += 1
first_seen = []
for slug in PAGES:
    for k in norm(slug):
        if k in graph and k not in first_seen:
            first_seen.append(k)
ready = [k for k in first_seen if indeg[k] == 0]
while ready:
    k = ready.pop(0); order.append(k)
    for b in sorted(graph[k], key=first_seen.index):
        indeg[b] -= 1
        if indeg[b] == 0:
            ready.append(b)
    ready.sort(key=first_seen.index)
assert len(order) == len(graph), 'cycle in CSS block order'
# every page's own relative order must be preserved
for slug in PAGES:
    s = [k for k in norm(slug) if blocks[k][0] == 'style' and k not in PAGE_ONLY]
    assert [k for k in order if k in s] == s, slug

def fix_css(css):
    css = re.sub(r"@import url\('https://fonts\.googleapis\.com[^']*'\);\s*", '', css)
    css = re.sub(r"""(['"])DM Serif Display\1""", 'var(--f-serif)', css)
    css = re.sub(r"""(['"])Plus Jakarta Sans\1""", 'var(--f-sans)', css)
    css = css.replace(REF_HOST, '')
    css = re.sub(r'/wp-content/uploads/\d{4}/\d{2}/', '/images/', css)
    assert 'wp-content' not in css and 'hostingersite' not in css
    return css

def label(css):
    m = re.match(r'\s*/\*(.*?)\*/', css, re.S)
    return m.group(1).strip() if m else 'base'

pages_with = {k: [s for s in PAGES if k in norm(s)] for k in order}
out = ['/* Scarlet Homes - global styles.\n'
       ' * Every <style> block from the reference widget, in the original cascade order.\n'
       ' * Blocks marked "pages:" exist only on those pages in the reference; their selectors match\n'
       ' * nothing on the other pages, so keeping them here (in order) changes nothing there.\n'
       ' * Only mechanical edits: Google Fonts @import removed (fonts come from next/font),\n'
       " * font names -> var(--f-serif)/var(--f-sans), upload URLs -> /images/. */\n"]
for n, k in enumerate(order, 1):
    ps = pages_with[k]
    scope = 'all pages' if len(ps) == len(PAGES) else 'pages: ' + ', '.join(ps)
    out.append('\n/* ==== block %02d | %s | %s ==== */\n' % (n, label(blocks[k][1])[:60], scope))
    out.append(fix_css(blocks[k][1]).strip() + '\n')
write('styles/global.css', ''.join(out))

page_css = {}
for slug in PAGES:
    ks = [k for k in norm(slug) if k in PAGE_ONLY]
    if ks:
        txt = '/* Styles that exist only on %s in the reference (they would change other pages). */\n' % route(slug)
        for k in ks:
            txt += '\n/* ==== %s ==== */\n' % label(blocks[k][1])[:60] + fix_css(blocks[k][1]).strip() + '\n'
        page_css[slug] = slug
        write('styles/pages/%s.css' % slug, txt)

# scripts ---------------------------------------------------------------------------------------
pre_scripts = [k for k in OrderedDict.fromkeys(k for s in PAGES for k in seq[s]) if blocks[k][0] == 'script']
assert len(pre_scripts) == 1, pre_scripts
ARROWS = blocks[pre_scripts[0]][1]
common_post = None
for slug in PAGES:
    ss = [s for s in post_scripts[slug]]
    common_post = ss[-2:]  # main + safety net, identical on every page (checked below)
for slug in PAGES:
    assert post_scripts[slug][-2:] == common_post, slug
MAIN, SAFETY = common_post

def fn_body(src):
    src = src.strip()
    assert src.startswith('(function(){') or src.startswith('/*'), src[:40]
    return src

main_js = MAIN
main_js = main_js.replace("fetch('/wp-json/contact-form-7/v1/contact-forms/' + id + '/feedback'",
                          "fetch('/api/enquiry.php'")
assert "fetch('/api/enquiry.php'" in main_js
# estimator form had onsubmit="return false" in the markup (string handlers are not possible in JSX)
main_js = main_js.replace(" /* estimator */\n",
                          " /* estimator */\n var ef = q('#sh-est-form'); if(ef) ef.addEventListener('submit', function(e){ e.preventDefault(); }); /* replica: was onsubmit=\"return false\" */\n")
assert 'replica: was onsubmit' in main_js
safety_js = SAFETY.replace('window.addEventListener("load",function(){setTimeout(chk,300);});',
                           'if(document.readyState==="complete")setTimeout(chk,300);else window.addEventListener("load",function(){setTimeout(chk,300);});')
assert safety_js != SAFETY

legacy = '''/* eslint-disable */
// @ts-nocheck
/*
 * Scripts from the reference widget, ported verbatim. Each original IIFE is wrapped in a
 * function so it can run once after React hydration (components/SiteScripts.tsx).
 * Edits (marked "replica"): contact form posts to /api/enquiry.php instead of Contact Form 7,
 * the estimator form's inline onsubmit="return false" moved here, and the safety net also
 * runs when the window "load" event has already fired.
 */

/* Tab / filter scroll arrows (reference: inline before #sh-top, ran on DOMContentLoaded) */
export function initScrollArrows() {
%s
}

/* Main site script (portal for fixed UI, sticky header, slider, tabs, reveal, tilt, cursor,
   gallery filter + lightbox, estimator, contact form) */
export function initMain() {
%s
}

/* v14: reveal safety net */
export function initRevealSafetyNet() {
%s
}
''' % (ARROWS.strip(), main_js.strip(), safety_js.strip())
legacy = legacy.replace(" /* contact form -> Contact Form 7 */", " /* contact form -> /api/enquiry.php (replica; was Contact Form 7) */")
write('lib/legacy/site.js', legacy)

# --------------------------------------------------------------------------------------------
# 2. DOM -> JSX
# --------------------------------------------------------------------------------------------
HTML_ATTR = {
    'class': 'className', 'for': 'htmlFor', 'tabindex': 'tabIndex', 'readonly': 'readOnly',
    'maxlength': 'maxLength', 'minlength': 'minLength', 'autocomplete': 'autoComplete',
    'autofocus': 'autoFocus', 'novalidate': 'noValidate', 'enctype': 'encType', 'srcset': 'srcSet',
    'fetchpriority': 'fetchPriority', 'referrerpolicy': 'referrerPolicy',
    'allowfullscreen': 'allowFullScreen', 'frameborder': 'frameBorder', 'playsinline': 'playsInline',
    'crossorigin': 'crossOrigin', 'datetime': 'dateTime', 'inputmode': 'inputMode',
    'colspan': 'colSpan', 'rowspan': 'rowSpan', 'contenteditable': 'contentEditable',
    'accesskey': 'accessKey', 'enterkeyhint': 'enterKeyHint', 'itemprop': 'itemProp',
    'itemscope': 'itemScope', 'itemtype': 'itemType', 'hreflang': 'hrefLang', 'charset': 'charSet',
    'http-equiv': 'httpEquiv', 'spellcheck': 'spellCheck', 'formnovalidate': 'formNoValidate',
}
BOOL = {'required', 'disabled', 'hidden', 'open', 'multiple', 'autoplay', 'muted', 'loop', 'controls',
        'allowfullscreen', 'novalidate', 'readonly', 'autofocus', 'playsinline', 'defer', 'async',
        'itemscope', 'selected', 'formnovalidate'}
VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'}
SVG_KEEP = {'viewBox', 'preserveAspectRatio', 'gradientUnits', 'gradientTransform', 'patternUnits',
            'pathLength', 'stdDeviation', 'spreadMethod', 'clipPathUnits', 'textLength'}

def svg_attr(n):
    if n.startswith('data-') or n.startswith('aria-'):
        return n
    if n == 'class':
        return 'className'
    if n in SVG_KEEP:
        return n
    if n.startswith('xlink:'):
        return 'xlink' + n[6].upper() + n[7:]
    if n == 'xmlns:xlink':
        return 'xmlnsXlink'
    return re.sub(r'-([a-z])', lambda m: m.group(1).upper(), n)

def js(s):
    return json.dumps(s, ensure_ascii=False)

def style_obj(s):
    items = []
    for d in s.split(';'):
        if ':' not in d:
            continue
        k, v = d.split(':', 1); k = k.strip(); v = v.strip()
        if not k:
            continue
        if not k.startswith('--'):
            k = re.sub(r'-([a-z])', lambda m: m.group(1).upper(), k)
            if k.startswith('Ms'):
                k = 'ms' + k[2:]
        key = k if re.match(r'^[A-Za-z_$][\w$]*$', k) else js(k)
        items.append('%s: %s' % (key, js(v)))
    return '{{ ' + ', '.join(items) + ' }}'

def fix_url(v):
    v = v.replace(REF_HOST, '')
    if v.startswith('https://www.scarlethomes.com.au/login'):
        return '/portal/'
    m = re.match(r'https://i0\.wp\.com/(i\.ytimg\.com/[^?]+)', v)
    if m:
        return 'https://' + m.group(1)
    v = re.sub(r'^/wp-content/uploads/\d{4}/\d{2}/', '/images/', v)
    return v

TEXT_SAFE = re.compile(r'^[^\s{}<>&\n][^{}<>&\n]*(?<!\s)$')

def text_jsx(v):
    if TEXT_SAFE.match(v) and '  ' not in v:
        return v
    return '{' + js(v) + '}'

DIRECT_IMG_PARENTS = ('sh-cta-in', 'sh-sp-img', 'sh-tc-img')  # CSS uses ".parent>img"
HERO_IMG = lambda ctx: ctx.get('hero')
counters = {'img': 0}

class Ctx(dict):
    pass

def attrs_jsx(el, ctx, override=None):
    out = []
    tag = el['tag']
    for n, v in el['a']:
        if override and n in override:
            continue
        if n.startswith('on'):
            continue  # string event handlers: handled in lib/legacy/site.js
        if n in ('href', 'src', 'action', 'poster'):
            v = fix_url(v)
        if el['ns'] == 'svg':
            name = svg_attr(n)
        else:
            name = HTML_ATTR.get(n, n)
        if n == 'style':
            out.append('style=' + style_obj(v)); continue
        if el['ns'] == 'html' and tag == 'input' and n == 'checked':
            out.append('defaultChecked'); continue
        if el['ns'] == 'html' and tag == 'input' and n == 'value' and dict(el['a']).get('type') not in ('radio', 'checkbox', 'submit', 'button', 'hidden'):
            out.append('defaultValue=' + js_attr(v)); continue
        if el['ns'] == 'html' and n in BOOL and v in ('', n):
            out.append(name); continue
        out.append('%s=%s' % (name, js_attr(v)))
    if override:
        for k, v in override.items():
            if v is not None:
                out.append('%s=%s' % (k, v))
    return out

def js_attr(v):
    if '"' not in v and '\\' not in v and '\n' not in v and '{' not in v:
        return '"' + v + '"'
    return '{' + js(v) + '}'

def classes(el):
    return dict(el['a']).get('class', '').split()

def emit(el, ctx, ind=0, hook=None):
    """Return JSX for a node (element or text)."""
    if el['t'] == 'x':
        return text_jsx(el['v'])
    tag = el['tag']
    if tag == 'script':
        ctx.setdefault('scripts', []).append(''.join(c['v'] for c in el['c'] if c['t'] == 'x'))
        return None
    if tag == 'style':
        raise SystemExit('inline <style> inside content is not expected')
    override = hook(el, ctx) if hook else None
    if override == 'SKIP':
        return None
    if tag == 'img' and dict(el['a']).get('src', '').startswith('/wp-content/uploads/'):
        return emit_img(el, ctx)
    attrs = attrs_jsx(el, ctx, override)
    # <select> with a selected option -> defaultValue on the select
    if tag == 'select':
        for o in el['c']:
            if o['t'] == 'e' and o['tag'] == 'option' and 'selected' in dict(o['a']):
                attrs.append('defaultValue=' + js_attr(dict(o['a']).get('value', ''.join(x.get('v', '') for x in o['c']))))
                o['a'] = [a for a in o['a'] if a[0] != 'selected']
    if tag == 'textarea':
        txt = ''.join(c.get('v', '') for c in el['c'])
        if txt:
            attrs.append('defaultValue=' + js_attr(txt))
        el = dict(el, c=[])
    open_ = '<' + tag + (' ' + ' '.join(attrs) if attrs else '')
    pad = '  ' * ind
    if tag in VOID or (not el['c']):
        return open_ + ' />'
    kids = [emit(c, ctx, ind + 1, hook) for c in el['c']]
    kids = [k for k in kids if k is not None]
    inner_inline = all('\n' not in k for k in kids) and sum(len(k) for k in kids) < 90
    if inner_inline:
        return open_ + '>' + ''.join(kids) + '</' + tag + '>'
    return open_ + '>\n' + ''.join(pad + '  ' + k + '\n' for k in kids) + pad + '</' + tag + '>'

def emit_img(el, ctx):
    a = OrderedDict(el['a'])
    src = fix_url(a.pop('src'))
    alt = a.pop('alt', '')
    props = ['src=' + js_attr(src), 'alt=' + js_attr(alt)]
    if 'width' in a and 'height' in a:
        props.append('width={%s}' % a.pop('width')); props.append('height={%s}' % a.pop('height'))
        props.append('keepSize')
    if a.get('fetchpriority') == 'high':
        a.pop('loading', None)
        props.append('priority')
        a.pop('fetchpriority')
    for n, v in a.items():
        if n in ('decoding', 'loading', 'class', 'data-recalc-dims'):
            if n == 'class':
                props.append('className=' + js_attr(v))
            elif n == 'loading':
                props.append('loading=' + js_attr(v))
            elif n == 'decoding':
                pass  # Img always renders decoding="async" like the reference
            continue
        props.append('%s=%s' % (HTML_ATTR.get(n, n), js_attr(v)))
    parent = ctx.get('parent_classes', [])
    if any(c in DIRECT_IMG_PARENTS for c in parent):
        props.append('direct')
    if ctx.get('sizes'):
        props.append('sizes=' + js_attr(ctx['sizes']))
    ctx['uses_img'] = True
    ctx.setdefault('first_img', src)
    return '<Img ' + ' '.join(props) + ' />'

# patch emit to track the parent's classes for <img> handling
_emit = emit
def emit(el, ctx, ind=0, hook=None):  # noqa: F811
    if el['t'] == 'e':
        prev = ctx.get('parent_classes'); prev_s = ctx.get('sizes'); prev_cur = ctx.get('cur_classes')
        cls = classes(el)
        ctx['parent_classes'] = prev_cur or []
        # sizes hints for responsive images
        if any(c in ('sh-hero', 'sh-ph-bg', 'sh-sl', 'sh-strip', 'sh-cta-in', 'sh-lead-bg') for c in cls):
            ctx['sizes'] = '100vw'
        elif any(c in ('sh-gi', 'sh-ig', 'sh-igg', 'sh-ins', 'sh-pc', 'sh-v') for c in cls):
            ctx['sizes'] = '(max-width: 700px) 50vw, 33vw'
        ctx['cur_classes'] = cls
        r = _emit(el, ctx, ind, hook)
        ctx['parent_classes'] = prev; ctx['sizes'] = prev_s; ctx['cur_classes'] = prev_cur
        return r
    return _emit(el, ctx, ind, hook)

# --------------------------------------------------------------------------------------------
# 3. pages
# --------------------------------------------------------------------------------------------
seo = json.load(open(os.path.join(REF, 'seo.json'), encoding='utf-8'))
dom = {s: json.load(open(os.path.join(REF, 'dom', s + '.json'), encoding='utf-8')) for s in PAGES}

def kids(el, cls=None):
    return [c for c in el['c'] if c['t'] == 'e' and (cls is None or cls in classes(c))]

def child(el, cls):
    r = kids(el, cls)
    assert len(r) == 1, cls
    return r[0]

def fix_ld(o):
    s = json.dumps(o, ensure_ascii=False)
    s = s.replace(REF_HOST, PROD)
    s = re.sub(r'/wp-content/uploads/\d{4}/\d{2}/', '/images/', s)
    return json.loads(s)

seo_out = {}
for slug in PAGES:
    r = route(slug)
    e = seo[r]
    seo_out[r] = {'title': e['title'], 'description': e['description'],
                  'jsonld': [fix_ld(x) for x in e['jsonld']]}

def comp_name(slug):
    return ''.join(p.capitalize() for p in re.split(r'[-]', 'home' if slug == 'index' else slug)) + 'Page'

page_scripts = {}
for slug in PAGES:
    top = dom[slug]['top']
    main = child(top, 'sh-main')
    secs = kids(main)
    assert secs[-1]['tag'] == 'footer'
    body = secs[:-1]
    ctx = Ctx()
    parts = []
    for s in body:
        parts.append(emit(s, ctx, 2))
    # spam honeypot for /api/enquiry.php (not on the reference; invisible, last child of the form)
    for i, ptxt in enumerate(parts):
        k = ptxt.find('id="sh-cform"')
        if k >= 0:
            e = ptxt.find('</form>', k)
            hp = ('<div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: "1px", height: "1px", overflow: "hidden" }}>'
                  '<label htmlFor="cf-w">Website</label><input id="cf-w" name="website" tabIndex={-1} autoComplete="off" /></div>\n')
            line_start = ptxt.rfind('\n', 0, e) + 1
            parts[i] = ptxt[:line_start] + ' ' * (e - line_start + 2) + hp + ptxt[line_start:]
    scripts = ctx.get('scripts', [])
    r = route(slug)
    seo_out[r]['image'] = ctx.get('first_img')
    imports = ["import type { Metadata } from 'next';", "import { pageMetadata } from '@/lib/seo';",
               "import JsonLd from '@/components/JsonLd';"]
    if ctx.get('uses_img'):
        imports.append("import Img from '@/components/Img';")
    if slug in page_css:
        imports.append("import '@/styles/pages/%s.css';" % slug)
    if scripts:
        page_scripts[slug] = scripts
        imports.append("import PageScripts from '@/components/PageScripts';")
    tsx = '\n'.join(imports) + '\n\n'
    tsx += "export const metadata: Metadata = pageMetadata(%s);\n\n" % js(r)
    tsx += 'export default function %s() {\n  return (\n    <>\n' % comp_name(slug)
    for p in parts:
        tsx += '      ' + p + '\n'
    tsx += '      <JsonLd path=%s />\n' % js(r)
    if scripts:
        tsx += '      <PageScripts page=%s />\n' % js(slug)
    tsx += '    </>\n  );\n}\n'
    write('app/page.tsx' if slug == 'index' else 'app/%s/page.tsx' % slug, tsx)

write('data/seo.json', json.dumps(seo_out, indent=2, ensure_ascii=False) + '\n')

if page_scripts:
    js_out = '/* eslint-disable */\n// @ts-nocheck\n/* Page-only inline scripts from the reference, verbatim. */\n\nexport const pageScripts = {\n'
    for slug, ss in page_scripts.items():
        js_out += '  %s: function () {\n' % js(slug)
        for s in ss:
            js_out += s.strip() + '\n'
        js_out += '  },\n'
    js_out += '};\n'
    write('lib/legacy/pages.js', js_out)

# --------------------------------------------------------------------------------------------
# 4. shared chrome: Header (+ mobile menu), Footer, fixed UI
# --------------------------------------------------------------------------------------------
about = dom['about']['top']
SERVICES = ['/duplex-builders-sydney/', '/knockdown-rebuild-sydney/', '/new-home-builders-sydney/', '/granny-flat-builders-sydney/']
AREAS = ['/home-builders-hornsby/', '/home-builders-hills-district/', '/home-builders-parramatta/', '/home-builders-leppington/']

def header_hook(el, ctx):
    """Override map for attrs_jsx: keys are skipped from the source element; keys with a
    non-None value are (re-)added with that JSX expression."""
    if not ctx.get('nav_ids'):
        return None
    if id(el) not in ctx['nav_ids']:
        return None
    if el['tag'] == 'li' and 'sh-dd' in classes(el):
        grp = 'services' if ctx.get('dd_count', 0) == 0 else 'areas'
        ctx['dd_count'] = ctx.get('dd_count', 0) + 1
        return {'class': None, 'className': '{ddClass(%s)}' % js(grp)}
    if el['tag'] == 'a':
        href = dict(el['a']).get('href')
        cls = classes(el)
        if 'sh-ddt' in cls:   # "Service Areas" top link: aria-current on the hub page only
            return {'aria-current': '{current(%s)}' % js(href)}
        if 'sh-ddall' in cls:
            return None
        assert not cls, cls
        return {'class': None, 'className': '{on(%s)}' % js(href), 'aria-current': '{current(%s)}' % js(href)}
    return None

hdr_ctx = Ctx()
hb = child(about, 'sh-hb')
# neutral header: remove the About page's active state, then emit with hooks
def strip_active(el):
    if el['t'] != 'e':
        return
    if el['tag'] == 'a' and dict(el['a']).get('href') == '/about/' and 'on' in classes(el):
        el['a'] = [x for x in el['a'] if x[0] not in ('class', 'aria-current')]
    for c in el['c']:
        strip_active(c)
strip_active(hb)

def emit_hdr(el, ctx, ind):
    def mark(n, inside):
        if n['t'] != 'e':
            return
        inside = inside or (n['tag'] == 'ul' and 'sh-nav' in classes(n))
        if inside:
            ctx.setdefault('nav_ids', set()).add(id(n))
        for c in n['c']:
            mark(c, inside)
    mark(el, False)
    return emit(el, ctx, ind, header_hook)

# attrs_jsx skips names present in override; for aria-current we want to both skip the source
# value and add an expression -> handled because override value is not None.
hb_jsx = emit_hdr(hb, hdr_ctx, 3)
mnav = child(about, 'sh-mnav')
mnav_jsx = emit(mnav, Ctx(), 3)
header = '''\'use client\';

/*
 * Site header (top bar, logo, desktop nav with dropdowns, phone + CTA, burger) and the
 * mobile menu (#sh-mnav). Rendered once from app/layout.tsx. Markup and classes are the
 * reference's; the active-page state (class "on" + aria-current) is computed from the URL
 * exactly as it was hard-coded on each reference page.
 */
import { usePathname } from 'next/navigation';
import Img from '@/components/Img';

const SERVICES = %s;
const AREAS = %s;

export default function Header() {
  const raw = usePathname() || '/';
  const path = raw.endsWith('/') ? raw : raw + '/';
  const on = (href: string) => (path === href ? 'on' : undefined);
  const current = (href: string) => (path === href ? ('page' as const) : undefined);
  const ddClass = (group: 'services' | 'areas') => {
    const list = group === 'services' ? SERVICES : [...AREAS, '/service-areas/'];
    return list.includes(path) ? 'sh-dd on' : 'sh-dd';
  };
  return (
    <>
      %s
      %s
    </>
  );
}
''' % (js(SERVICES), js(AREAS), hb_jsx, mnav_jsx)
write('components/Header.tsx', header)

footer_el = kids(child(about, 'sh-main'))[-1]
fctx = Ctx()
footer_jsx = emit(footer_el, fctx, 2)
footer_jsx = footer_jsx.replace('© 2026 Scarlet Homes.', '© {YEAR} Scarlet Homes.')
assert '{YEAR}' in footer_jsx
footer = '''/*
 * Site footer, rendered once from app/layout.tsx (last child of .sh-main, as on the reference).
 * Only change from the reference: "Contractor Login" points to /portal/ (was /login on the old site).
 */
import Img from '@/components/Img';

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    %s
  );
}
''' % footer_jsx
write('components/Footer.tsx', footer)

# fixed UI: fab, prog, tt, cur, mbar (+ lightbox, which differs per page)
fixed = [c for c in kids(about) if classes(c)[0] in ('sh-fab', 'sh-prog', 'sh-tt', 'sh-cur', 'sh-mbar')]
lb_labels = {}
for slug in PAGES:
    l = [c for c in kids(dom[slug]['top']) if 'sh-lb' in classes(c)]
    lb_labels[route(slug)] = dict(l[0]['a']).get('aria-label') if l else None
lb = [c for c in kids(about) if 'sh-lb' in classes(c)][0]
lb['a'] = [x if x[0] != 'aria-label' else ('aria-label', '__LBLABEL__') for x in lb['a']]
lb_jsx = emit(lb, Ctx(), 3).replace('aria-label="__LBLABEL__"', 'aria-label={label}')
# React drops src="" with a warning; the lightbox <img> gets its src from the script.
lb_jsx = lb_jsx.replace(' src=""', '')
fixed_jsx = '\n      '.join(emit(c, Ctx(), 3) for c in fixed)
fixedui = '''\'use client\';

/*
 * Fixed UI from the reference: call FAB, scroll progress bar, back-to-top, "View" cursor,
 * mobile action bar and the gallery lightbox. lib/legacy/site.js moves these (and the header)
 * into a body-level <div class="sh sh-pt"> portal so transforms never break position:fixed.
 * The lightbox label differs per page on the reference; the contact page has none.
 */
import { usePathname } from 'next/navigation';

const LIGHTBOX: Record<string, string | null> = %s;

export default function FixedUI() {
  const raw = usePathname() || '/';
  const path = raw.endsWith('/') ? raw : raw + '/';
  const label = path in LIGHTBOX ? LIGHTBOX[path] : 'Project gallery';
  return (
    <>
      %s
      {label ? (
        %s
      ) : null}
    </>
  );
}
''' % (json.dumps(lb_labels, indent=2), fixed_jsx, lb_jsx)
# order on the reference: fab, prog, tt, cur, mbar, lb
write('components/FixedUI.tsx', fixedui)
print('done')
