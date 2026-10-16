// the house's about panel on the right
function aboutPanel(){var A=ABOUT,el=$("about");el.innerHTML='<h2>'+esc(A.title)+'</h2><p class="hi">'+esc(A.text)+'</p>'+(A.bio||[]).map(function(t){return '<p>'+esc(t)+'</p>'}).join('')+
'<div class="connect"><div class="lbl">Let’s connect</div><div class="crow"><span class="ico"><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" stroke-width="1.8"/></svg></span><a id="aem" href="mailto:'+esc(A.email)+'">'+esc(A.email)+'</a></div>'+
'<div class="crow"><span class="ico">in</span><a href="'+esc(A.linkedin)+'" target="_blank" rel="noopener">LinkedIn profile<span class="ext" aria-hidden="true"> ↗</span></a></div></div>';
}
