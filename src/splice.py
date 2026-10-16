import sys
s=open('main.v15.js').read()
P=lambda n:open('parts/'+n).read().rstrip('\n')+'\n'
def rep(s,a,b,new):
    i=s.index(a);j=s.index(b,i);return s[:i]+new+s[j:]
# vinyl block stays exactly as it was
i=s.index('function groove(){');j=s.index('var rec=discMesh(NOW,null,tt,Sx,.0876,Sz);')+len('var rec=discMesh(NOW,null,tt,Sx,.0876,Sz);')
vinyl=s[i:j]
s=rep(s,'// ---------- turntable ----------','// power cable falling behind the shelf',P('tt.js').replace('/*VINYL*/',vinyl))
s=rep(s,'// ---------- monstera deliciosa','// ---------- gallery wall',P('fig.js'))
s=rep(s,'// ---------- retro CRT television on the floor ----------','// video channels:',P('tv.js'))
s=rep(s,'// ---------- bean bag across from the shelf ----------','// ================= light =================',P('bean.js')+'\n')
s=rep(s,'// ---------- lava lamp ----------','// ---------- plant ----------',P('lava.js'))
assert s.count('BL.forEach(function(b){')==1
s=s.replace('BL.forEach(function(b){','lavaUpdate(t);BL.forEach(function(b){')
# diploma: carved moulding, reflective glass, engraved brass nameplate
a=s.index('var WOOD=M(0xffffff,.32,0,{map:mouldTex()');b=s.index('mesh(new T.PlaneGeometry(OW_,OH_),M(0x1a0d07',a)
s=s[:a]+P('frame.js')+s[b:]
a='var DG=M(0xffffff,.02,0,{transparent:true,opacity:.04,depthWrite:false,clearcoat:1,clearcoatRoughness:0},1);box(MW,MH,.001,DG,0,0,.004,dip).castShadow=false;'
assert s.count(a)==1
s=s.replace(a,'''var DG=new T.MeshBasicMaterial({color:0,combine:T.AddOperation,reflectivity:.09,transparent:true,blending:T.AdditiveBlending,depthWrite:false});ALLM.push(DG);var dgm=box(MW+.004,MH+.004,.0015,DG,0,0,.0045,dip);dgm.castShadow=dgm.receiveShadow=false;
''')
# postcards: tucked in the sleeve, slide out with the vinyl and fan beside it; click to bring one up close, click again to flip it
a='I.disc=dg;I.dspin=dsp;'
assert s.count(a)==1
s=s.replace(a,a+"""if(I.card){I.scene.remove(I.card);I.card=null}I.cf=0;I.cfo=0;I.cfs=0;if(r.pc){var cf=M(0xffffff,.7,0,0,0,E),cb=M(0xf3eee2,.8,0,0,0,E),ce=M(0xf3eee2,.9,0,0,0,E);loadTex(r.pc,cf);if(r.pcb)loadTex(r.pcb,cb);
I.card=new T.Mesh(new T.BoxGeometry(.148,.0985,.0007),[ce,ce,ce,ce,cf,cb]);I.card.matrixAutoUpdate=false;I.scene.add(I.card)}""")
a='if(I.disc){I.disc.position.x=I.out*.2;'
assert s.count(a)==1
s=s.replace(a,"""if(I.card){var ko=Math.max(0,Math.min(1,(I.out-.25)/.75)),ke=ko*ko*(3-2*ko),fz=I.cf>0?1:0;I.cfs+=(fz-I.cfs)*.12;I.cfo+=((I.cf>0?I.cf-1:0)*PI-I.cfo)*.14;
var lp=new T.Vector3(.02+.22*ke,-.088*ke+.004*Math.sin(t*.002)*ke,-.0016+.0105*ke),lq=new T.Quaternion().setFromEuler(new T.Euler(0,0,-.17*ke)),lm=new T.Matrix4().compose(lp,lq,new T.Vector3(1,1,1));I.g.updateMatrix();lm.premultiply(I.g.matrix);
var wp=new T.Vector3(),wq=new T.Quaternion(),ws=new T.Vector3();lm.decompose(wp,wq,ws);var fp=new T.Vector3(0,.005,.13),fq=new T.Quaternion().setFromEuler(new T.Euler(-.05,I.cfo,.02)),f=I.cfs*I.cfs*(3-2*I.cfs);
wp.lerp(fp,f);wq.slerp(fq,f);I.card.matrix.compose(wp,wq,new T.Vector3(1,1,1).multiplyScalar(1+.85*f));I.card.matrixWorldNeedsUpdate=true}"""+a)
# remember where the inspect camera looks so a picked-up card can come to the centre
a='I.cam.position.set(0,-vh*.17,d);I.cam.lookAt(0,-vh*.17,0)}'
assert s.count(a)==1
s=s.replace(a,'I.cam.position.set(0,-vh*.17,d);I.cam.lookAt(0,-vh*.17,0);I.cy=-vh*.17}')
a='addEventListener("pointerup",function(){if(d0){I.ty=Math.round(I.ty/PI)*PI;I.tp=0}d0=null});'
assert s.count(a)==1
s=s.replace(a,"""addEventListener("pointerup",function(e){if(d0&&I.card&&Math.hypot(e.clientX-d0.x,e.clientY-d0.y)<6){var rc=new T.Raycaster();I.card.updateMatrixWorld(true);rc.setFromCamera(new T.Vector2(e.clientX/innerWidth*2-1,-e.clientY/innerHeight*2+1),I.cam);
var hit=I.out>.6&&rc.intersectObject(I.card).length>0;if(hit)I.cf=I.cf>0?I.cf+1:1;else if(I.cf>0)I.cf=0}if(d0){if(I.cf>0)I.ty=d0.a;else I.ty=Math.round(I.ty/PI)*PI;I.tp=0}d0=null});""")
a='slide").onclick=function(){I.to=I.to?0:1;'
assert s.count(a)==1
s=s.replace(a,'slide").onclick=function(){I.to=I.to?0:1;I.cf=0;')
# spine photos replace the printed spine when a record has one
a='function spineMat(r){return SPM[r.id]||(SPM[r.id]=M(0xffffff,.62,0,{map:ctex(spineCanvas(r))}))}'
assert s.count(a)==1
s=s.replace(a,'''function spineMat(r){if(SPM[r.id])return SPM[r.id];var m=SPM[r.id]=M(0xffffff,.62,0,{map:ctex(spineCanvas(r))});
if(r.sp){var im=new Image();im.onload=function(){var c=cvs(64,1280),x=c.getContext("2d");x.save();x.translate(64,0);x.rotate(PI/2);x.drawImage(im,0,0,1280,64);x.restore();
var g=x.createLinearGradient(0,0,64,0);g.addColorStop(0,"rgba(255,255,255,.1)");g.addColorStop(.5,"rgba(255,255,255,0)");g.addColorStop(1,"rgba(0,0,0,.2)");x.fillStyle=g;x.fillRect(0,0,64,1280);m.map=ctex(c);m.needsUpdate=true};im.src=r.sp}return m}''')
# every plain black record uses the photographed disc; its own label sits on top
a='function vinylMats(r,env){if(r.dk){var fm=M(0xffffff,.3,0,{bumpMap:GROOVE,bumpScale:.0003,clearcoat:.8,clearcoatRoughness:.12},1,env);loadInto(r.dk,fm);return[M(r.v||"#dddddd",.35,0,0,1,env),fm,fm]}'
assert s.count(a)==1
s=s.replace(a,'var BLACKDISC=null;function vinylMats(r,env){var dk=r.dk||(r.v?null:"covers/black-disc.jpg");if(dk){var fm=M(0xffffff,.3,0,{bumpMap:GROOVE,bumpScale:.0003,clearcoat:.8,clearcoatRoughness:.12},1,env);if(r.dk)loadInto(r.dk,fm);else{if(!BLACKDISC){BLACKDISC=new T.TextureLoader().load(dk);BLACKDISC.encoding=T.sRGBEncoding;BLACKDISC.anisotropy=ren.capabilities.getMaxAnisotropy()}fm.map=BLACKDISC}return[M(r.v||(r.dk?"#dddddd":"#111112"),.35,0,0,1,env),fm,fm]}')
# the leaning now-playing sleeve: first click brings you in close, a second click picks it up
a='if(tag==="sleeve"){inspect(NOW);return}'
assert s.count(a)==1
s=s.replace(a,'if(tag==="sleeve"){if(focus==="sleeve"){inspect(NOW);return}var PS=pk(focus);if(PS){focus=null;layPocket(PS)}focus="sleeve";goal(V.sleeve);yaw=pit=0;$("name").classList.add("off");sheet.classList.remove("on");$("back").hidden=false;return}')
# postcard lives on the shelf
a='// ---------- leaning sleeve (now playing) ----------'
assert s.count(a)==1
s=s.replace(a,P('postcard.js')+a)
s=s.replace('lavaUpdate(t);BL.forEach','lavaUpdate(t);postcardUpdate();BL.forEach')
a='if(tag==="sleeve"){if(focus==="sleeve")'
assert s.count(a)==1
s=s.replace(a,'if(tag==="postcard"){if(focus==="postcard"){inspectCard();return}var PP=pk(focus);if(PP){focus=null;layPocket(PP)}focus="postcard";goal({p:[.47,1.1,.56],t:[.31,.76,.1]});yaw=pit=0;$("name").classList.add("off");sheet.classList.remove("on");$("back").hidden=false;return}'+a)
# putting a record back: the room comes back while the record drops away and the blur fades
a='function closeI(){inspecting=false;$("inspect").classList.remove("on");if(!focus)$("name").classList.remove("off");unpull()}'
assert s.count(a)==1
s=s.replace(a,'function closeI(){if(!inspecting)return;inspecting=false;I.closing=performance.now();$("inspect").classList.add("closing");if(!focus)$("name").classList.remove("off");unpull();setTimeout(function(){if(inspecting)return;$("inspect").classList.remove("on");$("inspect").classList.remove("closing");I.closing=0;I.g.position.y=0;I.g.scale.setScalar(1)},520)}')
a='(function loop(t){requestAnimationFrame(loop);if(!inspecting)return;'
assert s.count(a)==1
s=s.replace(a,'(function loop(t){requestAnimationFrame(loop);if(!inspecting&&!I.closing)return;')
a='I.g.position.y=Math.sin(t*.0012)*.004;I.g.position.x=0;I.g.scale.setScalar(1);'
assert s.count(a)==1,'gpos'
s=s.replace(a,a)
# pick the postcard up into the same view as a record: drag to turn it, flip it, put it back
a='function closeI(){'
assert s.count(a)==1
s=s.replace(a,"""function inspectCard(){if(!I)initI();I.cur=null;setHover(null);while(I.g.children.length)I.g.remove(I.g.children[0]);if(I.card){I.scene.remove(I.card);I.card=null}I.disc=null;I.dspin=null;I.closing=0;
var E=I.env,ce=M(0xf3eee2,.9,0,0,0,E),cf=M(0xffffff,.7,0,0,0,E),cb=M(0xffffff,.8,0,0,0,E);loadTex("covers/wywh-postcard.jpg",cf);loadTex("covers/wywh-postcard-back.jpg",cb);I.g.add(new T.Mesh(new T.BoxGeometry(.3,.2,.0014),[ce,ce,ce,ce,cf,cb]));
I.yaw=-.5;I.ty=0;I.pt=0;I.tp=0;I.out=0;I.to=0;$("it").textContent="Wish You Were Here";$("ia").textContent="Postcard";$("im").textContent="Hipgnosis  ·  Mono Lake, California, 1975";$("iw").textContent="It came tucked inside the Wish You Were Here sleeve. Now it lives on the shelf.";
$("play").hidden=true;$("slide").hidden=true;inspecting=true;$("name").classList.add("off");$("inspect").classList.remove("closing");$("inspect").classList.add("on");$("close").focus()}
"""+a)
a='$("play").hidden=r===NOW;'
assert s.count(a)==1
s=s.replace(a,a+'$("slide").hidden=false;I.closing=0;$("inspect").classList.remove("closing");')
# the room keeps living behind a picked-up record, so nothing freezes or jumps
a='runTw(performance.now());if(inspecting&&started)return;'
assert s.count(a)==1
s=s.replace(a,'runTw(performance.now());')
# a card has its own Step back, so the floating pill hides whenever a card opens
a='if(P){layPocket(P);pocketSheet(P)}else{'
assert s.count(a)==1
s=s.replace(a,'$("back").hidden=true;'+a)
# Spotify button on every record
a='$("play").hidden=r===NOW;'
assert s.count(a)==1
s=s.replace(a,a+'$("spot").hidden=false;$("spot").href=SPOTIFY[r.id]||("https://open.spotify.com/search/"+encodeURIComponent(r.a.replace(/ With Jaden Smith/,"")+" "+r.t));')
a='$("play").hidden=true;$("slide").hidden=true;'
assert s.count(a)==1
s=s.replace(a,a+'$("spot").hidden=true;')
# sit on the bean bag: drop to seated eye height and look across the room
a='bean=mesh(BBG,FAB,-.34,0,1.25);bean.rotation.y=2.6;'
assert s.count(a)==1
s=s.replace(a,a+'bean.userData.tag="bean";')
a='if(tag==="postcard"){'
assert s.count(a)==1
s=s.replace(a,'if(tag==="bean"){var PB=pk(focus);if(PB){focus=null;layPocket(PB)}focus="bean";goal({p:[-.36,.74,1.5],t:[.18,.62,.05]});yaw=pit=0;$("name").classList.add("off");sheet.classList.remove("on");$("back").hidden=false;return}'+a)
a='var lim=focus?.35:.2,rl=focus?.2:.08;'
assert s.count(a)==1
s=s.replace(a,'var lim=focus==="bean"?.75:focus?.35:.2-HYAW,rl=focus==="bean"?0:focus?.2:.08+HYAW;')
# a wider lens while seated, eased in and out
a='cam.fov=a<1?50:38;'
assert s.count(a)==1
s=s.replace(a,'BFOV=a<1?50:38;cam.fov=BFOV+FOVX;')
s=s.replace('var cp=new T.Vector3(),','var BFOV=38,FOVX=0,cp=new T.Vector3(),',1)
a='cam.lookAt(cam.position.clone().add(dir));'
assert s.count(a)==1
s=s.replace(a,a+'var fx=focus==="bean"?16:0;if(Math.abs(fx-FOVX)>.01){FOVX+=(fx-FOVX)*Math.min(1,dt*3);cam.fov=BFOV+FOVX;cam.updateProjectionMatrix()}')
# default desktop view: turned a little toward the floor lamp and tilted slightly down (the angle you'd get by dragging
# fully left), so the lamp, bean bag, shelf and TV all fit; the drag range keeps the same absolute limits as before
a='V.home.t=t;V.home.p=[t[0]+dir.x*k,t[1]+dir.y*k,t[2]+dir.z*k];'
assert s.count(a)==1
s=s.replace(a,a+'if(a>=1){var hd=new T.Vector3().fromArray(t).sub(new T.Vector3().fromArray(V.home.p)),hs=new T.Spherical().setFromVector3(hd);hs.theta+=HYAW;hs.phi+=HPIT;hd.setFromSpherical(hs);V.home.t=[V.home.p[0]+hd.x,V.home.p[1]+hd.y,V.home.p[2]+hd.z]}else HYAW=HPIT=0;')
a='function size(){'
assert s.count(a)==1
s=s.replace(a,'var HYAW=.15,HPIT=.08;'+a)
# narrower desktop windows step back so they keep the same framing as a wide (2:1) screen
a='Math.max(1.36,1.85/a)'
assert s.count(a)==1
s=s.replace(a,'Math.min(1.85,Math.max(1.36,2.72/a))')
a='pit=Math.max(-.3,Math.min(focus?.18:.06,'
assert s.count(a)==1
s=s.replace(a,'pit=Math.max(focus?-.3:-.3+HPIT,Math.min(focus?.18:.06+HPIT,')

assert s.count('Math.tan(cam.fov*PI/360)')==2
s=s.replace('Math.tan(cam.fov*PI/360)','Math.tan(BFOV*PI/360)')
# no claims about the real turntable: the card just names what's spinning
a='", on my actual turntable since "+NOW_SINCE+"."'
assert s.count(a)==1
s=s.replace(a,'"."')
s=s.replace('(r===NOW?"On my actual turntable right now. Your story about it goes here.":"Your story about this record goes here.")','"Your story about this record goes here."')
# the house: new model, door swings open when you come close, windows glow at night, opens the about card
s=rep(s,'// ---------- little house ----------','// ---------- hourglass ----------',P('house.js'))
a='[[.08,.045],[.2,.04]].forEach(function(p,i){var o=mesh(new T.SphereGeometry(.13,48,24),M(i?0xf1d6c6:0xeec8b6,.95,0,{bumpMap:noiseTex("#808080",.5,9000,256,1),bumpScale:.002}),-.36,p[0]+.03,-.01,shelf);o.scale.set(1,p[1]/.13,1)});'
assert s.count(a)==1
s=s.replace(a,'')
a='house:{t:"Home base",x:"Contact goes here. Come by."}'
assert s.count(a)==1
s=s.replace(a,'house:{t:esc(ABOUT.title),x:function(){return "<span class=\\"lede\\">"+esc(ABOUT.text)+"</span><span class=\\"connect\\"><span class=\\"lbl\\">Let\\u2019s connect</span><span class=\\"crow\\"><span class=\\"ico\\"><svg viewBox=\\"0 0 24 24\\" width=\\"16\\" height=\\"16\\" aria-hidden=\\"true\\"><rect x=\\"3\\" y=\\"5\\" width=\\"18\\" height=\\"14\\" rx=\\"2\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"1.8\\"/><path d=\\"M4 7l8 6 8-6\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"1.8\\"/></svg></span><a id=\\"aem\\" href=\\"mailto:"+esc(ABOUT.email)+"\\">"+esc(ABOUT.email)+"</a><button class=\\"btn ghost sm\\" id=\\"cpy\\" type=\\"button\\">Copy</button></span><span class=\\"crow\\"><span class=\\"ico in\\">in</span><a href=\\""+esc(ABOUT.linkedin)+"\\" target=\\"_blank\\" rel=\\"noopener\\">LinkedIn profile<span class=\\"ext\\" aria-hidden=\\"true\\"> \\u2197</span></a></span></span>"}}')
a='$("bk").onclick=step;if($("chn"))'
assert s.count(a)==1
s=s.replace(a,'$("bk").onclick=step;if($("cpy"))$("cpy").onclick=function(){var b=this,done=function(){b.textContent="Copied";setTimeout(function(){b.textContent="Copy"},1600)};try{navigator.clipboard.writeText(ABOUT.email).then(done,function(){var r=document.createRange();r.selectNodeContents($("aem"));var g=getSelection();g.removeAllRanges();g.addRange(r)})}catch(e){}};if($("chn"))')
a='LED.emissiveIntensity=.6+n*2.5;'
assert s.count(a)==1
s=s.replace(a,a+'HNIGHT=n;HGLOW.emissiveIntensity=.08+n*1.9;HDECO.forEach(function(m){m.emissiveIntensity=.6+n*.9});')
s=s.replace('lavaUpdate(t);postcardUpdate();','lavaUpdate(t);postcardUpdate();houseUpdate(t);HDOOR.rotation.y+=((focus==="house"?-1.25:0)-HDOOR.rotation.y)*Math.min(1,dt*4);',1)
a='house:{p:[.66,.95,.48],t:[.47,.8,.04]}'
assert s.count(a)==1
s=s.replace(a,'house:{p:[.64,.91,.33],t:[.49,.8,.04]}')
# the house opens its own panel on the right, leaving the house in view on the left
a='if(tag==="bean"){'
assert s.count(a)==1
s=s.replace(a,'if(tag!=="house")$("about").classList.remove("on");if(tag==="house"){var PH=pk(focus);if(PH){focus=null;layPocket(PH)}focus="house";goal(innerWidth>720?V.house:{p:[.6,.95,.42],t:[.49,.72,.04]});yaw=pit=0;$("name").classList.add("off");sheet.classList.remove("on");aboutPanel();$("about").classList.add("on");$("back").hidden=false;return}'+a)
assert s.count('function step(){')==1
s=s.replace('function step(){',P('about.js')+'function step(){$("about").classList.remove("on");',1)
# launch cleanup: no flip button on records (drag still turns them), plant and hourglass are scenery, no placeholder copy
s=s.replace('grp("hg",','grp(0,',1)
s=s.replace('"Your story about this record goes here."','""',1)
a='$("play").hidden=r===NOW;'
assert s.count(a)==1
s=s.replace(a,a+'$("flip").hidden=true;')
a='$("play").hidden=true;$("slide").hidden=true;'
assert s.count(a)==1
s=s.replace(a,a+'$("flip").hidden=false;')
# the bottom row of shelf labels sat half under the rug: lift and shrink them onto the bottom board
a='var o=mesh(new T.PlaneGeometry(w,.029),m,0,0,0,g);o.castShadow=false;o.rotation.z=(R()-.5)*.05;'
assert s.count(a)==1
s=s.replace(a,a+'if(P.p.row)o.scale.setScalar(.7);')
a='g.position.y=P.p.row?.015:.375;'
assert s.count(a)==1
s=s.replace(a,'g.position.y=P.p.row?.0195:.375;')
s=s.replace('fig:{t:"Growing",x:"What you\'re working on right now goes here."},','',1)
s=s.replace(',hg:{t:"Time",x:"Your story goes here. How you got here."}','',1)
assert "goes here" not in s
# knob behaviour: targets that the frame loop eases toward
for a,b in [('KNOB.tvpow.rotation.z=TV_ON?0:-1.2;','KNOB.tvpow.userData.rz=TV_ON?0:-1.2;KNOB.tvpow.userData.pz=TV_ON?.005:0;'),
            ('KNOB.tvch.rotation.z-=PI/3;','KNOB.tvch.userData.rz+=PI/6;'),
            ('CRT.uniforms.uOn.value=TVON;','CRT.uniforms.uOn.value=TVON;[KNOB.tvch,KNOB.tvpow].forEach(function(k){k.rotation.z+=(k.userData.rz-k.rotation.z)*Math.min(1,dt*12)});KNOB.tvpow.position.z+=(KNOB.tvpow.userData.z+KNOB.tvpow.userData.pz-KNOB.tvpow.position.z)*Math.min(1,dt*12);')]:
    assert s.count(a)==1,a
    s=s.replace(a,b)

for a,b in [('function tvPower(){TV_ON=!TV_ON;KNOB.tvpow.userData.rz=TV_ON?0:-1.2;','function tvPower(rot){TV_ON=!TV_ON;KNOB.tvpow.userData.rz+=rot==null?-PI/2:rot;'),
            ('function tune(i){if(!TV_ON)return;KNOB.tvch.userData.rz+=PI/6;','function tune(i,held){if(!held)KNOB.tvch.userData.rz-=PI/6;if(!TV_ON)return;'),
            ('cv.addEventListener("pointerdown",function(e){var p=pick(e);','var KD=null;function kAng(e){return Math.atan2(-(e.clientY-KD.cy),e.clientX-KD.cx)}\ncv.addEventListener("pointerdown",function(e){var p=pick(e);if(p&&(p.tag==="tvch"||p.tag==="tvpow")&&!inspecting){var k=KNOB[p.tag],w=new T.Vector3();k.getWorldPosition(w).project(cam);KD={tag:p.tag,k:k,cx:(w.x+1)/2*innerWidth,cy:(1-w.y)/2*innerHeight,x:e.clientX,y:e.clientY,r0:k.userData.rz,acc:0,moved:false};KD.a=kAng(e);hint();return}'),
            ('addEventListener("pointermove",function(e){if(CD){','addEventListener("pointermove",function(e){if(KD){if(Math.hypot(e.clientX-KD.x,e.clientY-KD.y)>6)KD.moved=true;var a=kAng(e),d=a-KD.a;KD.a=a;KD.acc+=Math.atan2(Math.sin(d),Math.cos(d));if(KD.moved){KD.k.userData.rz=KD.r0+KD.acc;KD.k.rotation.z=KD.k.userData.rz}return}if(CD){'),
            ('addEventListener("pointerup",function(e){if(CD){','addEventListener("pointerup",function(e){if(KD){var K=KD;KD=null;if(!K.moved){open_(K.tag);return}if(K.tag==="tvch"){var n=Math.round(K.acc/(PI/6));K.k.userData.rz=K.r0+n*PI/6;if(n)tune(TVCH-n,true)}else{var n=Math.round(K.acc/(PI/2));K.k.userData.rz=K.r0+n*PI/2;if(n%2)tvPower(0)}if(focus!=="tv")open_("tv");return}if(CD){')]:
    assert s.count(a)==1,a
    s=s.replace(a,b)

for a,b in [('vid.addEventListener("loadeddata",function(){VID_OK=true;','var TUNING=false,LOADED=-1,TUNE_TO=0;function tuned(){if(!TUNING)return;TUNING=false;clearTimeout(TUNE_TO);TUNE_T=performance.now()}\nvid.addEventListener("playing",tuned);vid.addEventListener("loadeddata",function(){VID_OK=true;tuned();'),
            ('vid.addEventListener("error",function(){VID_OK=false;','vid.addEventListener("error",function(){VID_OK=false;tuned();'),
            ('if(TV_ON){TUNE_T=performance.now();vid.play().catch(function(){})}','if(TV_ON){TUNE_T=performance.now();if(LOADED!==TVCH)tune(TVCH,true);else vid.play().catch(function(){})}'),
            ('function tune(i,held){if(!held)KNOB.tvch.userData.rz-=PI/6;if(!TV_ON)return;if(!TV_CHANNELS.length)return;TVCH=(i+TV_CHANNELS.length)%TV_CHANNELS.length;TUNE_T=performance.now();vid.src=TV_CHANNELS[TVCH].src+(vid.canPlayType(\'video/mp4; codecs="avc1.640028, mp4a.40.2"\')?".mp4":".webm");vid.load()}',
             'function tune(i,held){if(!held)KNOB.tvch.userData.rz-=PI/6;var n=TV_CHANNELS.length;if(!n)return;TVCH=((i%n)+n)%n;if(!TV_ON)return;LOADED=TVCH;TUNING=true;TUNE_T=performance.now();clearTimeout(TUNE_TO);TUNE_TO=setTimeout(tuned,5000);vid.src=TV_CHANNELS[TVCH].src+(vid.canPlayType(\'video/mp4; codecs="avc1.640028, mp4a.40.2"\')?".mp4":".webm");vid.load();vid.play().catch(function(){})}'),
            ('CRT.uniforms.uStatic.value=Math.max(0,1-(performance.now()-TUNE_T)/(VID_OK?500:1e9));','CRT.uniforms.uStatic.value=TUNING||!VID_OK?1:Math.max(0,1-(performance.now()-TUNE_T)/350);')]:
    assert s.count(a)==1,a
    s=s.replace(a,b)

for a,b in [('var sceneRT=rt(1,1,{depthBuffer:true,depthTexture:new T.DepthTexture(1,1,T.UnsignedIntType)});',
 '// 4x multisampling on the main pass (with its depth for AO) keeps edges and thin lines unbroken\nvar MSAA=ren.capabilities.isWebGL2&&T.WebGLMultisampleRenderTarget&&ren.extensions.get("EXT_color_buffer_float")?(MOB?2:4):0,sceneRT=MSAA?new T.WebGLMultisampleRenderTarget(1,1,{minFilter:T.LinearFilter,magFilter:T.LinearFilter,format:T.RGBAFormat,type:T.HalfFloatType,depthBuffer:true,depthTexture:new T.DepthTexture(1,1,T.UnsignedIntType)}):rt(1,1,{depthBuffer:true,depthTexture:new T.DepthTexture(1,1,T.UnsignedIntType)});if(MSAA)sceneRT.samples=MSAA;'),
 ('aa=fxaa&&ren.getPixelRatio()<1.5','aa=fxaa&&!MSAA&&ren.getPixelRatio()<1.5')]:
    assert s.count(a)==1,a
    s=s.replace(a,b)
# every section starts from its own fixed random seed, so adding things elsewhere never reshuffles it
SEEDS=[["// ---------- tufted rug: warped black-and-white checkerboar", -2096445971], ["// ---------- record pockets: face-out crates you flip throu", 432260141], ["// ---------- modeling helpers ----------", -778622920], ["// ---------- turntable ----------", -778622920], ["// ---------- lava lamp ----------", 131567688], ["// ---------- plant ----------", 860980552], ["// ---------- little house: a New England Victorian in minia", 876650456], ["// ---------- hourglass ----------", -780401805], ["// ---------- the Wish You Were Here postcard, left lying on", -780401805], ["// ---------- leaning sleeve (now playing) ----------", -780401805], ["// ---------- monstera deliciosa in a glazed stoneware pot -", -780401805], ["// ---------- gallery wall: posters taped, pinned and clippe", 438354701], ["// ---------- 1970s portable TV on the floor ----------", -2088987979], ["// ---------- framed diploma above the shelf ----------", 1641327418], ["// ---------- tripod floor lamp: click to switch it on and o", 1227179742], ["// ---------- bean bag across from the shelf ----------", -1355026450], ["// ---------- hover: outline what you can click ----------", 1435777220]]
for h,v in SEEDS:
    i=s.find('\n'+h)
    assert i>=0,h
    s=s[:i+1]+'seed=%d;'%v+s[i+1:]
# canvas can be taller than the visible area (it runs behind mobile browser bars): size from the canvas element and
# map pointers through its rect instead of innerWidth/innerHeight
a='m2.set(e.clientX/innerWidth*2-1,-e.clientY/innerHeight*2+1)'
assert s.count(a)==2
s=s.replace(a,'NDC(e)')
a='function size(){'
assert s.count(a)==1
s=s.replace(a,'function NDC(e){var r=ren.domElement.getBoundingClientRect();m2.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1)}'+a)
a='var w=innerWidth,h=innerHeight,a=w/h;ren.setSize(w,h);'
assert s.count(a)==1
s=s.replace(a,'var w=ren.domElement.clientWidth||innerWidth,h=ren.domElement.clientHeight||innerHeight,a=w/h;ren.setSize(w,h,false);')
a='cx:(w.x+1)/2*innerWidth,cy:(1-w.y)/2*innerHeight,'
assert s.count(a)==1
s=s.replace(a,'cx:(w.x+1)/2*ren.domElement.clientWidth,cy:(1-w.y)/2*ren.domElement.clientHeight,')
# phones: Safari paints its status bar from the page background, so keep that matched to the room's top row
# (sampled a couple of times a second)
a='started=true;perf(t)}'
assert s.count(a)==1
s=s.replace(a,'started=true;edgeSample(t);perf(t)}var EDG={t:0,on:matchMedia("(pointer:coarse)").matches,buf:null};function edgeSample(t){if(!EDG.on||t-EDG.t<500)return;EDG.t=t;var g=ren.getContext(),W=g.drawingBufferWidth,H=g.drawingBufferHeight;if(!EDG.buf||EDG.buf.length!==W*4)EDG.buf=new Uint8Array(W*4);ren.setRenderTarget(null);g.readPixels(0,H-1,W,1,g.RGBA,g.UNSIGNED_BYTE,EDG.buf);var r=0,gg=0,b=0,n=0;for(var i=0;i<W*4;i+=16){r+=EDG.buf[i];gg+=EDG.buf[i+1];b+=EDG.buf[i+2];n++}document.documentElement.style.background="rgb("+Math.round(r/n)+","+Math.round(gg/n)+","+Math.round(b/n)+")"}')
# rug: kilim border with a Galaga formation in the centre
i0=s.index('function rugArt(S){');j0=s.index('return[t0,t1]}',i0)+len('return[t0,t1]}')
s=s[:i0]+open('parts/rug.js').read().split('\n',2)[2].rstrip('\n')+s[j0:]
# postcard: just the Hipgnosis credit
a='$("iw").textContent="It came tucked inside the Wish You Were Here sleeve. Now it lives on the shelf.";'
assert s.count(a)==1
s=s.replace(a,'$("iw").textContent="";')
# lava lamp card: the line follows whether the room is lit or dark
a='lamp:{t:"Mood",x:"Switch the light to see the room at night.",b:"Switch the light"}'
assert s.count(a)==1
s=s.replace(a,'lamp:{t:"Mood",x:function(){return night?"Turn the lights back on to see the room by day.":"Switch the light to see the room at night."},b:"Switch the light"}')
a='if(tag==="lamp"){night=!night;$("go").textContent=night?"Turn the lights back on":"Switch the light"}'
assert s.count(a)==1
s=s.replace(a,'if(tag==="lamp"){night=!night;$("go").textContent=night?"Turn the lights back on":"Switch the light";var lp_=sheet.querySelector("p");if(lp_)lp_.textContent=TG.lamp.x()}')
# TV: first-time visitors land on the channel named in TV_START
a='\ntune(0);\n'
assert s.count(a)==1
s=s.replace(a,'\ntune(Math.max(0,TV_CHANNELS.map(function(c){return c.src}).indexOf(TV_START)));\n')
open('main.js','w').write(s)
print('ok',len(s))
