// the house's about panel on the right
// on phones the panel opens collapsed to the greeting so the house stays visible; the arrow reveals the rest
function aboutPanel(){var A=ABOUT,el=$("about");el.classList.remove("open");el.innerHTML='<h2>'+esc(A.title)+'</h2><p class="hi">'+esc(A.text)+'</p>'+
'<button class="amore" type="button" aria-expanded="false" aria-label="More about me"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>'+
'<div class="more"><div>'+(A.bio||[]).map(function(t){return '<p>'+esc(t)+'</p>'}).join('')+
'<div class="connect"><div class="lbl">Let’s connect</div><div class="crow"><span class="ico"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.8"/></svg></span><a id="aem" href="mailto:'+esc(A.email)+'">'+esc(A.email)+'</a></div>'+
'<div class="crow"><span class="ico">in</span><a href="'+esc(A.linkedin)+'" target="_blank" rel="noopener">LinkedIn profile<span class="ext" aria-hidden="true"> ↗</span></a></div></div></div></div>';
var b=el.querySelector(".amore");b.onclick=function(){var o=el.classList.toggle("open");b.setAttribute("aria-expanded",o);b.setAttribute("aria-label",o?"Show less":"More about me")};
}
