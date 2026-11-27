/* eslint-disable */
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
(function(){function init(){document.querySelectorAll('.sh-tabs,.sh-flt').forEach(function(s){if(s.dataset.arw)return;s.dataset.arw=1;var w=document.createElement('div');w.className='sh-scr';s.parentNode.insertBefore(w,s);w.appendChild(s);['l','r'].forEach(function(d){var b=document.createElement('button');b.type='button';b.className='sh-arw '+d;b.setAttribute('aria-label',d=='r'?'Scroll right':'Scroll left');b.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="'+(d=='r'?'m9 6 6 6-6 6':'m15 6-6 6 6 6')+'"/></svg>';b.addEventListener('click',function(){s.scrollBy({left:(d=='r'?1:-1)*s.clientWidth*0.7,behavior:'smooth'});});w.appendChild(b);});function upd(){var m=s.scrollWidth-s.clientWidth;w.classList.toggle('can-r',s.scrollLeft<m-4);w.classList.toggle('can-l',s.scrollLeft>4);}s.addEventListener('scroll',upd,{passive:true});s.addEventListener('click',function(e){var t=e.target.closest('button');if(t&&s.contains(t)){var l=t.offsetLeft-(s.clientWidth-t.offsetWidth)/2;s.scrollTo({left:l,behavior:'smooth'});}});window.addEventListener('resize',upd);upd();setTimeout(upd,800);});}if(document.readyState!='loading')init();else document.addEventListener('DOMContentLoaded',init);})();
}

/* Main site script (portal for fixed UI, sticky header, slider, tabs, reveal, tilt, cursor,
   gallery filter + lightbox, estimator, contact form) */
export function initMain() {
(function(){
 /* EDIT THESE RATES ($ per m2) BEFORE GOING LIVE */
 var RATES = {standard:2200, premium:2800, luxury:3500};
 var DOUBLE_FACTOR = 1.08;
 var D = document, W = window, editor = D.body.classList.contains('elementor-editor-active');
 var canHover = W.matchMedia('(hover:hover)').matches, reduce = W.matchMedia('(prefers-reduced-motion:reduce)').matches;
 function q(s,c){ return (c||D).querySelector(s); } function qa(s,c){ return Array.prototype.slice.call((c||D).querySelectorAll(s)); }
 /* move fixed UI to <body> (page builders add transforms that break position:fixed) */
 if(!editor){ var pt = D.createElement('div'); pt.className = 'sh sh-pt'; ['#sh-hb','#sh-mnav','.sh-fab','.sh-tt','.sh-lb','.sh-prog','.sh-cur','.sh-mbar'].forEach(function(s){ var n = q(s); if(n) pt.appendChild(n); }); D.body.appendChild(pt); }
 var hb = q('#sh-hb'), mnav = q('#sh-mnav'), bg = q('#sh-burger'), prog = q('.sh-prog'), tt = q('.sh-tt'), ring = q('.sh-tt circle');
 var sl = qa('.sh-hero .sh-sl'), phbg = q('.sh-ph-bg');
 function onScroll(){
  var y = W.scrollY, h = D.documentElement.scrollHeight - W.innerHeight, p = h > 0 ? y / h : 0;
  if(hb){ if(y > 120) hb.classList.add('s'); else if(y < 40) hb.classList.remove('s'); }
  if(prog) prog.style.transform = 'scaleX(' + p + ')';
  if(tt){ tt.classList.toggle('on', y > 600); if(ring) ring.style.strokeDashoffset = 189 - 189 * p; }
  if(!reduce && W.innerWidth > 700 && y < 1100){ sl.forEach(function(s){ s.style.transform = 'translate3d(0,' + (y * 0.15).toFixed(1) + 'px,0)'; }); if(phbg) phbg.style.transform = 'translate3d(0,' + (y * 0.18).toFixed(1) + 'px,0)'; }
 }
 var tk = false; W.addEventListener('scroll', function(){ if(!tk){ tk = true; requestAnimationFrame(function(){ onScroll(); tk = false; }); } }, {passive:true}); W.addEventListener('resize', onScroll, {passive:true}); onScroll();
 if(tt) tt.addEventListener('click', function(){ W.scrollTo({top:0, behavior:'smooth'}); });
 if(bg){ bg.addEventListener('click', function(){ var o = mnav.classList.toggle('o'); hb.classList.toggle('m', o); bg.setAttribute('aria-expanded', o); D.body.style.overflow = o ? 'hidden' : ''; });
  qa('a', mnav).forEach(function(a){ a.addEventListener('click', function(){ mnav.classList.remove('o'); hb.classList.remove('m'); D.body.style.overflow = ''; }); }); }
 /* hero slider */
 var dots = qa('.sh-dots button'), nm = q('#sh-hname'), cur = 0, tm;
 function go(i){ sl[cur].classList.remove('on'); dots[cur].classList.remove('on'); cur = i; sl[cur].classList.add('on'); dots[cur].classList.add('on'); if(nm) nm.textContent = sl[cur].getAttribute('data-name'); }
 function auto(){ clearInterval(tm); tm = setInterval(function(){ go((cur + 1) % sl.length); }, 6500); }
 dots.forEach(function(d,i){ d.addEventListener('click', function(){ go(i); auto(); }); });
 if(sl.length > 1 && !editor) auto();
 /* facade tabs */
 var tabs = qa('.sh-tab'), panes = qa('.sh-fp');
 tabs.forEach(function(t){ t.addEventListener('click', function(){ var k = t.getAttribute('data-t'); tabs.forEach(function(x){ x.classList.toggle('on', x === t); }); panes.forEach(function(p){ p.classList.toggle('on', p.getAttribute('data-p') === k); }); }); });
 /* headline word reveal */
 qa('.sh-hero h1, .sh-ph h1').forEach(function(h){
  h.classList.remove('rv','d1');
  var out = [];
  Array.prototype.slice.call(h.childNodes).forEach(function(n){
   if(n.nodeType === 3){ n.textContent.split(' ').forEach(function(w){ if(w) out.push(D.createTextNode(w)); }); }
   else out.push(n);
  });
  h.innerHTML = '';
  out.forEach(function(n,i){ var o = D.createElement('span'); o.className = 'sh-hw'; var s = D.createElement('span'); s.style.transitionDelay = (0.15 + i * 0.09) + 's'; s.appendChild(n); o.appendChild(s); h.appendChild(o); h.appendChild(D.createTextNode(' ')); });
  setTimeout(function(){ h.classList.add('hw-in'); }, editor ? 0 : 120);
 });
 /* image curtain reveal */
 qa('.sh-why-img img, .sh-sp-img, .sh-map, .sh-est-l img, .sh-faqbox img, .sh-cta-in img, .sh-wide-map').forEach(function(e){ e.classList.add('rvi'); });
 /* scroll reveal */
 var els = qa('.sh .rv, .sh .rvi, .sh .rvs, .sh .rvl, .sh .rvr');
 if('IntersectionObserver' in W && !editor && !reduce){ var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }); }, {threshold:.1, rootMargin:'0px 0px -40px 0px'}); els.forEach(function(el){ io.observe(el); }); }
 else els.forEach(function(el){ el.classList.add('in'); });
 /* 3D tilt (smoothed with requestAnimationFrame) */
 if(canHover && !reduce){ qa('.sh-sc, .sh-pc, .sh-gi, .sh-fp figure, .sh-cd').forEach(function(el){
  var max = el.classList.contains('sh-cd') ? 3 : 5, lift = el.classList.contains('sh-cd') ? 10 : 6, tx = 0, ty = 0, tl = 0, cx = 0, cy = 0, cl = 0, raf = 0;
  function tick(){ cx += (tx - cx) * .1; cy += (ty - cy) * .1; cl += (tl - cl) * .1;
   el.style.transform = 'perspective(1000px) rotateX(' + cy.toFixed(3) + 'deg) rotateY(' + cx.toFixed(3) + 'deg) translate3d(0,' + (-cl).toFixed(2) + 'px,0)';
   if(Math.abs(tx - cx) > .005 || Math.abs(ty - cy) > .005 || Math.abs(tl - cl) > .01) raf = requestAnimationFrame(tick);
   else { raf = 0; if(tl === 0){ el.style.transform = ''; el.classList.remove('sh-tl'); } } }
  function kick(){ if(!raf) raf = requestAnimationFrame(tick); }
  el.addEventListener('mouseenter', function(){ el.classList.add('sh-tl'); tl = lift; kick(); });
  el.addEventListener('mousemove', function(e){ var r = el.getBoundingClientRect(); tx = ((e.clientX - r.left) / r.width - .5) * max * 2; ty = -((e.clientY - r.top) / r.height - .5) * max * 2; kick(); });
  el.addEventListener('mouseleave', function(){ tx = 0; ty = 0; tl = 0; kick(); });
 }); }
 /* mobile action bar */
 var mb = q('.sh-mbar'); if(mb){ var mbOn = function(){ mb.classList.toggle('on', W.scrollY > 380); }; W.addEventListener('scroll', mbOn, {passive:true}); mbOn(); }
 /* smooth page transitions */
 if(!editor && !reduce){ qa('a[href]').forEach(function(a){ var h = a.getAttribute('href'); if(!h || h.charAt(0) === '#' || /^(tel:|mailto:|https?:)/.test(h) || a.target === '_blank' || h.indexOf('#') > -1) return;
  a.addEventListener('click', function(e){ if(e.metaKey || e.ctrlKey || e.shiftKey || e.button) return; e.preventDefault(); D.body.classList.add('sh-leave'); setTimeout(function(){ location.href = h; }, 320); }); });
  W.addEventListener('pageshow', function(e){ if(e.persisted) D.body.classList.remove('sh-leave'); }); }
 /* "View" cursor */
 var cu = q('.sh-cur');
 if(cu && canHover){ var cx = 0, cy = 0, tx = 0, ty = 0;
  D.addEventListener('mousemove', function(e){ tx = e.clientX; ty = e.clientY; });
  (function loop(){ cx += (tx - cx) * .2; cy += (ty - cy) * .2; cu.style.left = cx + 'px'; cu.style.top = cy + 'px'; requestAnimationFrame(loop); })();
  qa('.sh-gi, .sh-pc').forEach(function(el){ el.addEventListener('mouseenter', function(){ cu.classList.add('on'); }); el.addEventListener('mouseleave', function(){ cu.classList.remove('on'); }); });
 }
 /* gallery filter + lightbox (scoped per gallery) */
 var lb = q('.sh-lb'), lbi = lb ? q('img', lb) : null, lbt = lb ? q('.t', lb) : null, li = 0, list = [];
 function show(i){ li = (i + list.length) % list.length; var g = list[li], im = q('img', g); lbi.src = im.src; lbi.alt = im.alt; lbt.innerHTML = '<small>' + g.getAttribute('data-cn') + '</small>' + g.getAttribute('data-n'); }
 qa('.sh-gal').forEach(function(gal){
  var sec = gal.closest('section') || gal.parentNode, gis = qa('.sh-gi', gal), fbs = qa('.sh-flt button', sec);
  gal._vis = gis;
  function filt(k){ fbs.forEach(function(b){ b.classList.toggle('on', b.getAttribute('data-f') === k); }); var v = []; gis.forEach(function(g){ var s = k === 'all' || g.getAttribute('data-c') === k; g.classList.toggle('hide', !s); g.classList.remove('pop'); if(s){ v.push(g); void g.offsetWidth; g.style.animationDelay = (Math.min(v.length, 12) * 0.04) + 's'; g.classList.add('pop'); } }); gal._vis = v; }
  fbs.forEach(function(b){ b.addEventListener('click', function(){ filt(b.getAttribute('data-f')); }); });
  if(fbs.length && sec.id === 'gallery'){ var m = (location.search.match(/style=([a-z-]+)/) || [])[1]; if(m && q('.sh-flt button[data-f="' + m + '"]', sec)) filt(m); }
  if(lb) gis.forEach(function(g){ g.addEventListener('click', function(){ list = gal._vis; show(list.indexOf(g)); lb.classList.add('o'); D.body.style.overflow = 'hidden'; }); });
 });
 if(lb){ var close = function(){ lb.classList.remove('o'); D.body.style.overflow = ''; };
  q('.x', lb).addEventListener('click', close); q('.pv', lb).addEventListener('click', function(){ show(li - 1); }); q('.nx', lb).addEventListener('click', function(){ show(li + 1); });
  lb.addEventListener('click', function(e){ if(e.target === lb) close(); });
  D.addEventListener('keydown', function(e){ if(!lb.classList.contains('o')) return; if(e.key === 'Escape') close(); if(e.key === 'ArrowLeft') show(li - 1); if(e.key === 'ArrowRight') show(li + 1); }); }
 /* estimator */
 var ef = q('#sh-est-form'); if(ef) ef.addEventListener('submit', function(e){ e.preventDefault(); }); /* replica: was onsubmit="return false" */
 var r = q('#sh-sqm'), o = q('#sh-sqm-o');
 if(r){ r.addEventListener('input', function(){ o.textContent = r.value + ' m²'; }); }
 function fmt(n){ return '$' + (Math.round(n / 1000) * 1000).toLocaleString('en-AU'); }
 var btn = q('#sh-calc');
 if(btn){ btn.addEventListener('click', function(){
  var st = q('input[name="sh-st"]:checked').value, fn = q('input[name="sh-fn"]:checked').value;
  var base = parseFloat(r.value) * RATES[fn] * (st === 'double' ? DOUBLE_FACTOR : 1);
  q('#sh-res-v').textContent = fmt(base * 0.9) + ' – ' + fmt(base * 1.1);
  var res = q('#sh-res'); res.style.display = 'none'; void res.offsetWidth; res.style.display = 'block';
 }); }
 /* contact form -> /api/enquiry.php (replica; was Contact Form 7) */
 var cf = q('#sh-cform');
 if(cf){ cf.addEventListener('submit', function(e){
  e.preventDefault(); var id = cf.getAttribute('data-cf7'), msg = q('.sh-msg', cf), sb = q('button[type=submit]', cf);
  var fd = new FormData(cf); fd.append('_wpcf7', id); fd.append('_wpcf7_version', '6'); fd.append('_wpcf7_locale', 'en_AU'); fd.append('_wpcf7_unit_tag', 'wpcf7-f' + id + '-o1'); fd.append('_wpcf7_container_post', '0');
  sb.setAttribute('disabled', ''); msg.className = 'sh-msg';
  fetch('/api/enquiry.php', {method:'POST', body:fd}).then(function(x){ return x.json(); }).then(function(d){
   sb.removeAttribute('disabled');
   if(d.status === 'mail_sent'){ msg.className = 'sh-msg ok'; msg.textContent = 'Thanks! Your enquiry has been sent. Our directors will be in touch shortly.'; cf.reset(); }
   else { msg.className = 'sh-msg bad'; msg.textContent = (d.invalid_fields && d.invalid_fields.length ? 'Please check: ' + d.invalid_fields.map(function(f){ return f.field.replace('your-',''); }).join(', ') + '. ' : '') + (d.message || 'Something went wrong. Please call 1800 727 538.'); }
  }).catch(function(){ sb.removeAttribute('disabled'); msg.className = 'sh-msg bad'; msg.textContent = 'Something went wrong. Please call us on 1800 727 538.'; });
 }); }
})();
}

/* v14: reveal safety net */
export function initRevealSafetyNet() {
/* v14: reveal safety net */(function(){if(document.body.classList.contains("elementor-editor-active"))return;var sel=".sh .rv:not(.in),.sh .rvs:not(.in),.sh .rvl:not(.in),.sh .rvr:not(.in),.sh .rvi:not(.in)";var t=0;function chk(){t=0;var vh=window.innerHeight;document.querySelectorAll(sel).forEach(function(e){var r=e.getBoundingClientRect();if(r.top<vh&&r.bottom>-vh*3)e.classList.add("in");});}function q(){if(!t)t=setTimeout(chk,120);}window.addEventListener("scroll",q,{passive:true});window.addEventListener("resize",q);if(document.readyState==="complete")setTimeout(chk,300);else window.addEventListener("load",function(){setTimeout(chk,300);});setTimeout(chk,2500);})();
}
