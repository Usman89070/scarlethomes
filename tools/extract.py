"""Step 1: cut the Elementor HTML widget out of each downloaded reference page.

Writes reference/widgets/<slug>.html (widget content only) and reference/seo.json.
"""
import json, os, re, sys
from bs4 import BeautifulSoup

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REF = os.path.join(ROOT, 'reference')
PAGES = ['index', 'duplex-builders-sydney', 'knockdown-rebuild-sydney', 'new-home-builders-sydney',
         'granny-flat-builders-sydney', 'projects', 'about', 'contact', 'service-areas',
         'home-builders-hornsby', 'home-builders-hills-district', 'home-builders-parramatta',
         'home-builders-leppington']

os.makedirs(os.path.join(REF, 'widgets'), exist_ok=True)
seo = {}
for slug in PAGES:
    html = open(os.path.join(REF, slug + '.html'), encoding='utf-8').read()
    m = re.search(r'data-widget_type="html\.default">\s*', html)
    if not m:
        sys.exit('widget not found in ' + slug)
    start = m.end()
    # widget ends at the last </script> before the Elementor closing divs
    end_marker = html.find('<script type="speculationrules">', start)
    seg = html[start:end_marker]
    end = seg.rfind('</script>') + len('</script>')
    widget = seg[:end]
    assert widget.lstrip().startswith('<style>'), slug
    open(os.path.join(REF, 'widgets', slug + '.html'), 'w', encoding='utf-8').write(widget)

    head = html[:m.start()]
    title = re.search(r'<title>(.*?)</title>', head, re.S).group(1)
    desc = re.search(r'<meta name="description" content="([^"]*)"', head)
    ld = re.findall(r'<script type="application/ld\+json">(.*?)</script>', widget, re.S)
    yoast = re.search(r'<script type="application/ld\+json" class="yoast-schema-graph">(.*?)</script>', head, re.S)
    soup = BeautifulSoup(title, 'html.parser')
    seo['/' if slug == 'index' else '/' + slug + '/'] = {
        'slug': slug,
        'title': soup.get_text(),
        'description': BeautifulSoup(desc.group(1), 'html.parser').get_text() if desc else None,
        'jsonld': [json.loads(x) for x in ld],
        'yoast_jsonld': json.loads(yoast.group(1)) if yoast else None,
    }
    print(slug, len(widget), seo['/' if slug == 'index' else '/' + slug + '/']['title'])

json.dump(seo, open(os.path.join(REF, 'seo.json'), 'w', encoding='utf-8'), indent=2, ensure_ascii=False)
