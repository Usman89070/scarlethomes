/* eslint-disable */
// @ts-nocheck
/* Page-only inline scripts from the reference, verbatim. */

export const pageScripts = {
  "projects": function () {
(function(){document.querySelectorAll(".sh-v[data-yt]").forEach(function(b){b.addEventListener("click",function(){var f=document.createElement("iframe");f.src="https://www.youtube-nocookie.com/embed/"+b.getAttribute("data-yt")+"?autoplay=1&rel=0";f.title=b.getAttribute("aria-label");f.allow="autoplay; encrypted-media; picture-in-picture; fullscreen";f.setAttribute("allowfullscreen","");var w=document.createElement("div");w.className="sh-v on";w.appendChild(f);b.replaceWith(w);});});})();
  },
};
