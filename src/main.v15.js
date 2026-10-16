(function(){
if(!window.THREE){$("hint").textContent="Couldn't load the 3D engine. Check your connection and reload.";return}
var T=THREE,PI=Math.PI,BOOT=performance.now();
var MOB=matchMedia("(pointer:coarse)").matches||Math.min(innerWidth,innerHeight)<600;
var Q={shadow:MOB?2048:4096,tex:MOB?1024:2048,dpr:Math.min(devicePixelRatio||1,2),steps:MOB?16:28};
var POST=!!(T.EffectComposer&&T.UnrealBloomPass&&T.FullScreenQuad);
var seed=11;function R(){seed|=0;seed=seed+0x6D2B79F5|0;var t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}
function cvs(w,h){var c=document.createElement("canvas");c.width=w;c.height=h||w;return c}
function mkRen(cv,alpha){var r=new T.WebGLRenderer({canvas:cv,antialias:!POST||!!alpha,alpha:!!alpha,powerPreference:"high-performance"});r.setPixelRatio(alpha?Math.min(devicePixelRatio,2):Q.dpr);r.outputEncoding=T.sRGBEncoding;r.toneMapping=T.ACESFilmicToneMapping;r.toneMappingExposure=1.0;return r}
function mkEnv(r){var es=new T.Scene();es.add(new T.Mesh(new T.SphereGeometry(10,32,16),new T.MeshBasicMaterial({color:0x121417,side:T.BackSide})));
[[-6,4,4,7,5,4],[6,3,2,4,3,3],[0,8,0,6,6,1.4]].forEach(function(w){var m=new T.Mesh(new T.PlaneGeometry(w[3],w[4]),new T.MeshBasicMaterial({color:new T.Color(w[5],w[5],w[5]*1.04),side:T.DoubleSide}));m.position.set(w[0],w[1],w[2]);m.lookAt(0,0,0);es.add(m)});
var pm=new T.PMREMGenerator(r),t=pm.fromScene(es,.03).texture;pm.dispose();return t}
var ren=mkRen($("c"));ren.shadowMap.enabled=true;ren.shadowMap.type=T.PCFSoftShadowMap;ren.physicallyCorrectLights=false;
if(POST){ren.toneMapping=T.NoToneMapping;ren.outputEncoding=T.LinearEncoding}
if(T.RectAreaLightUniformsLib)T.RectAreaLightUniformsLib.init();
var scene=new T.Scene(),cam=new T.PerspectiveCamera(38,1,.04,20);scene.background=new T.Color(0);
var ALLM=[],CUR_ENV=null;
function M(c,r,m,o,phys,env){var x=new(phys?T.MeshPhysicalMaterial:T.MeshStandardMaterial)(Object.assign({color:c,roughness:r==null?.6:r,metalness:m||0,envMap:env||null},o||{}));
x.color.convertSRGBToLinear();if(x.emissive)x.emissive.convertSRGBToLinear();if(!env){ALLM.push(x);if(CUR_ENV){x.envMap=CUR_ENV;x.envMapIntensity=.55}}return x}
function mesh(g,m,x,y,z,p){var o=new T.Mesh(g,m);o.position.set(x,y,z);o.castShadow=o.receiveShadow=true;(p||scene).add(o);return o}
function box(w,h,d,m,x,y,z,p){return mesh(new T.BoxGeometry(w,h,d),m,x,y,z,p)}
function cyl(a,b,h,m,x,y,z,p,s){return mesh(new T.CylinderGeometry(a,b,h,s||40),m,x,y,z,p)}
function grp(tag,x,y,z,p){var g=new T.Group();g.position.set(x,y,z);if(tag)g.userData.tag=tag;(p||scene).add(g);return g}
function rbox(w,h,d,r,b,m,x,y,z,p){var W=w/2-b,D=d/2-b,Rr=Math.min(r,W,D),s=new T.Shape();
s.moveTo(-W+Rr,-D);s.lineTo(W-Rr,-D);s.quadraticCurveTo(W,-D,W,-D+Rr);s.lineTo(W,D-Rr);s.quadraticCurveTo(W,D,W-Rr,D);s.lineTo(-W+Rr,D);s.quadraticCurveTo(-W,D,-W,D-Rr);s.lineTo(-W,-D+Rr);s.quadraticCurveTo(-W,-D,-W+Rr,-D);
var g=new T.ExtrudeGeometry(s,{depth:h-2*b,bevelEnabled:true,bevelThickness:b,bevelSize:b,bevelSegments:3,curveSegments:8});g.rotateX(-PI/2);g.translate(0,-(h/2-b),0);return mesh(g,m,x,y,z,p)}
function stem(a,b,r,m,p){var A=new T.Vector3().fromArray(a),B=new T.Vector3().fromArray(b),d=B.clone().sub(A),o=mesh(new T.CylinderGeometry(r,r,d.length(),6),m,0,0,0,p);
o.position.copy(A.clone().add(B).multiplyScalar(.5));o.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.normalize());return o}
function ctex(c,lin){var t=new T.CanvasTexture(c);if(!lin)t.encoding=T.sRGBEncoding;t.anisotropy=ren.capabilities.getMaxAnisotropy();return t}
function rep(t,x,y){t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(x,y);return t}
function noiseTex(base,amp,n,S,lin){S=S||256;var c=cvs(S),x=c.getContext("2d");x.fillStyle=base;x.fillRect(0,0,S,S);
for(var i=0;i<n;i++){var v=R()<.5?0:255;x.fillStyle="rgba("+v+","+v+","+v+","+R()*amp+")";x.fillRect(R()*S,R()*S,1+R()*2,1+R()*2)}return rep(ctex(c,lin),1,1)}
function gray(v,a){v=Math.round(v*255);return"rgba("+v+","+v+","+v+","+(a==null?1:a)+")"}

// ================= procedural surfaces =================
// White oak floor: planks run along x, 16cm wide, one texture tile = 2.4m square
function floorMaps(S){var pm=S/2.4,rows=15,rh=S/rows,C=[cvs(S),cvs(S),cvs(S)],X=C.map(function(c){return c.getContext("2d")});
for(var r=0;r<rows;r++){var y0=Math.round(r*rh),h=Math.round((r+1)*rh)-y0,px=-R()*S*.6;
while(px<S){var w=Math.round((.6+R()*1.2)*pm),P=plank(w,h);[0,-S].forEach(function(o){X.forEach(function(x,k){x.drawImage(P[k],px+o,y0)});if(px+w>S)X.forEach(function(x,k){x.drawImage(P[k],px-S,y0)})});px+=w}}
return C.map(function(c,k){return rep(ctex(c,k>0),1,1)})}
function plank(w,h){var P=[cvs(w,h),cvs(w,h),cvs(w,h)],c=P[0].getContext("2d"),r=P[1].getContext("2d"),b=P[2].getContext("2d");
var hu=30+R()*8,sa=20+R()*10,li=54+R()*12;c.fillStyle="hsl("+hu+","+sa+"%,"+li+"%)";c.fillRect(0,0,w,h);
var rv=.36+R()*.14;r.fillStyle=gray(rv);r.fillRect(0,0,w,h);b.fillStyle=gray(.5);b.fillRect(0,0,w,h);
var g=c.createLinearGradient(0,0,w,0);for(var i=0;i<=4;i++)g.addColorStop(i/4,R()<.5?"rgba(90,55,25,"+R()*.12+")":"rgba(255,235,200,"+R()*.1+")");c.fillStyle=g;c.fillRect(0,0,w,h);
var n=Math.round(h*.45),ph=R()*6;
for(var i=0;i<n;i++){var yy=R()*h,a=.03+R()*.13,amp=R()*h*.06,f=.5+R()*2.5,lw=.4+R()*1.6,dk=R()<.8;
c.strokeStyle=dk?"rgba(80,46,18,"+a+")":"rgba(255,230,190,"+a*.6+")";c.lineWidth=lw;b.strokeStyle=gray(dk?.3:.62,a*2.2);b.lineWidth=lw;r.strokeStyle=gray(rv+.15,a*1.5);r.lineWidth=lw;
[c,b,r].forEach(function(x){x.beginPath();for(var xx=0;xx<=w+16;xx+=16){var yv=yy+Math.sin(xx/w*f*PI*2+ph+i*.13)*amp;xx?x.lineTo(xx,yv):x.moveTo(xx,yv)}x.stroke()})}
// cathedral figure
if(R()<.55){var cx=R()*w,cy=h*(.3+R()*.4);for(var k=0;k<9;k++){var rx=w*(.08+k*.03),ry=h*(.12+k*.05);c.strokeStyle="rgba(95,55,22,"+(.1-k*.008)+")";c.lineWidth=1.2;c.beginPath();c.ellipse(cx,cy,rx,ry,0,0,PI*2);c.stroke()}}
// knot
if(R()<.18){var kx=R()*w,ky=h*(.25+R()*.5),kr=h*(.06+R()*.06),kg=c.createRadialGradient(kx,ky,0,kx,ky,kr*2.2);kg.addColorStop(0,"rgba(55,30,12,.85)");kg.addColorStop(.45,"rgba(90,52,22,.45)");kg.addColorStop(1,"rgba(90,52,22,0)");c.fillStyle=kg;c.beginPath();c.ellipse(kx,ky,kr*3,kr*1.6,0,0,PI*2);c.fill();b.fillStyle=gray(.35,.8);b.beginPath();b.ellipse(kx,ky,kr,kr*.7,0,0,PI*2);b.fill()}
// wear: scuffs and micro scratches in the roughness
for(var i=0;i<w*h/2500;i++){var sx=R()*w,sy=R()*h,sl=4+R()*30;r.strokeStyle=gray(.7,.25+R()*.3);r.lineWidth=.5;r.beginPath();r.moveTo(sx,sy);r.lineTo(sx+sl,sy+(R()-.5)*sl*.6);r.stroke()}
var sg=r.createRadialGradient(w/2,h/2,0,w/2,h/2,w/2);sg.addColorStop(0,gray(.3,.25));sg.addColorStop(1,gray(.3,0));r.fillStyle=sg;r.fillRect(0,0,w,h);
// eased edges + seams
c.fillStyle="rgba(40,22,8,.75)";c.fillRect(0,0,w,1.5);c.fillRect(0,0,1.5,h);c.fillStyle="rgba(40,22,8,.2)";c.fillRect(0,1.5,w,2);c.fillRect(1.5,0,2,h);
b.fillStyle=gray(0);b.fillRect(0,0,w,2);b.fillRect(0,0,2,h);b.fillStyle=gray(.3);b.fillRect(0,2,w,2);b.fillRect(2,0,2,h);
r.fillStyle=gray(.95);r.fillRect(0,0,w,2);r.fillRect(0,0,2,h);return P}
// Painted plaster: one tile = 1.2m
function plasterMaps(S){var C=[cvs(S),cvs(S)],c=C[0].getContext("2d"),b=C[1].getContext("2d");c.fillStyle="#f4f2ee";c.fillRect(0,0,S,S);b.fillStyle=gray(.5);b.fillRect(0,0,S,S);
function blot(x,rad,col,a){for(var i=0;i<60;i++){var px=R()*S,py=R()*S,rr=rad*(.4+R()),g=x.createRadialGradient(px,py,0,px,py,rr);g.addColorStop(0,col+(a*R())+")");g.addColorStop(1,col+"0)");x.fillStyle=g;[-S,0,S].forEach(function(ox){[-S,0,S].forEach(function(oy){x.fillRect(px-rr+ox,py-rr+oy,rr*2,rr*2)})})}}
blot(c,S*.25,"rgba(120,100,80,",.05);blot(c,S*.18,"rgba(255,255,255,",.08);blot(b,S*.08,"rgba(255,255,255,",.18);blot(b,S*.06,"rgba(0,0,0,",.18);
for(var i=0;i<S*S/40;i++){var v=R()<.5,x=R()*S,y=R()*S;c.fillStyle=v?"rgba(0,0,0,"+R()*.02+")":"rgba(255,255,255,"+R()*.03+")";c.fillRect(x,y,1,1);b.fillStyle=gray(v?.2:.8,R()*.25);b.fillRect(x,y,1+R()*1.5,1+R()*1.5)}
return[rep(ctex(C[0]),1,1),rep(ctex(C[1],1),1,1)]}
// Wool rug with a hand-drawn lattice (Beni Ourain style), 1.7 x 1.15m, no repeat
function rugMaps(W,H){var C=[cvs(W,H),cvs(W,H)],c=C[0].getContext("2d"),b=C[1].getContext("2d");c.fillStyle="#ebe4d6";c.fillRect(0,0,W,H);b.fillStyle=gray(.55);b.fillRect(0,0,W,H);
for(var i=0;i<W*H/22;i++){var x=R()*W,y=R()*H,a=R()*PI*2,l=3+R()*7,v=R()<.5;c.strokeStyle=v?"rgba(120,100,75,"+R()*.14+")":"rgba(255,252,245,"+R()*.2+")";c.lineWidth=1+R();c.beginPath();c.moveTo(x,y);c.lineTo(x+Math.cos(a)*l,y+Math.sin(a)*l);c.stroke();
b.strokeStyle=gray(v?.15:.95,.35);b.lineWidth=1.5;b.beginPath();b.moveTo(x,y);b.lineTo(x+Math.cos(a)*l,y+Math.sin(a)*l);b.stroke()}
var cols=5,rows=3,dw=W/cols,dh=H/rows;c.lineCap=b.lineCap="round";
function jline(x0,y0,x1,y1){[c,b].forEach(function(x,k){x.strokeStyle=k?gray(.25,.9):"rgba(38,34,31,.88)";x.lineWidth=k?W*.009:W*.0065;x.beginPath();var n=14;for(var i=0;i<=n;i++){var t=i/n,jx=(R()-.5)*W*.006,jy=(R()-.5)*W*.006;x.lineTo(x0+(x1-x0)*t+jx,y0+(y1-y0)*t+jy)}x.stroke()})}
for(var i=0;i<=cols;i++)for(var j=0;j<=rows;j++){var x=i*dw,y=j*dh;if(i<cols&&j<rows){jline(x,y+dh/2,x+dw/2,y);jline(x+dw/2,y,x+dw,y+dh/2);jline(x+dw,y+dh/2,x+dw/2,y+dh);jline(x+dw/2,y+dh,x,y+dh/2);
if(R()<.5){c.fillStyle="rgba(38,34,31,.8)";c.beginPath();c.arc(x+dw/2,y+dh/2,W*.008,0,7);c.fill()}}}
for(var i=0;i<W*H/14;i++){var x=R()*W,y=R()*H;c.fillStyle="rgba(235,228,214,"+R()*.35+")";c.fillRect(x,y,2,2)}
return[ctex(C[0]),ctex(C[1],1)]}
function paperTex(){var t=noiseTex("#eee9df",.07,5000);return t}

// ================= room =================
var BZ=-.205,LX=-1.25,RX=2.6,FZ=3.0,RH=2.6,WT=.14,WZ0=.28,WZ1=1.2,WY0=.86,WY1=2.2;
var FM=floorMaps(Q.tex),floorM=M(0xffffff,1,0,{map:FM[0],roughnessMap:FM[1],bumpMap:FM[2],bumpScale:.0025,clearcoat:.45,clearcoatRoughness:.28},1);
[FM[0],FM[1],FM[2]].forEach(function(t){t.repeat.set((RX-LX)/2.4,(FZ-BZ)/2.4)});
var floor=mesh(new T.PlaneGeometry(RX-LX,FZ-BZ),floorM,(LX+RX)/2,0,(BZ+FZ)/2);floor.rotation.x=-PI/2;floor.castShadow=false;
var TEXA=performance.now();var PM=plasterMaps(MOB?512:1024);PM.forEach(function(t){t.repeat.set(1/1.2,1/1.2)});
var WALL=M(0xcdc6ba,.92,0,{map:PM[0],bumpMap:PM[1],bumpScale:.00025});
function wallShape(w,h,holes){var s=new T.Shape();s.moveTo(0,0);s.lineTo(w,0);s.lineTo(w,h);s.lineTo(0,h);s.lineTo(0,0);(holes||[]).forEach(function(q){var p=new T.Path();p.moveTo(q[0],q[1]);p.lineTo(q[0],q[3]);p.lineTo(q[2],q[3]);p.lineTo(q[2],q[1]);p.lineTo(q[0],q[1]);s.holes.push(p)});return new T.ShapeGeometry(s)}
function wall(geo,x,y,z,ry){var o=mesh(geo,WALL,x,y,z);o.rotation.y=ry;o.castShadow=false;return o}
wall(wallShape(RX-LX+.2,RH),LX-.2,0,BZ,0);                          // back wall
wall(wallShape(FZ-BZ,RH,[[FZ-WZ1,WY0,FZ-WZ0,WY1]]),LX,0,FZ,PI/2); // left wall with the window
wall(wallShape(RX-LX,RH),RX,0,FZ,PI);                          // front wall
var ceil=mesh(new T.PlaneGeometry(RX-LX,FZ-BZ),M(0xf1efe9,.95),(LX+RX)/2,RH,(BZ+FZ)/2);ceil.rotation.x=PI/2;ceil.castShadow=false;
// invisible occluders so the sun only gets in through the window
var OCC=new T.MeshBasicMaterial({colorWrite:false,depthWrite:false,shadowSide:T.DoubleSide});
function occ(w,h,d,x,y,z){var o=new T.Mesh(new T.BoxGeometry(w,h,d),OCC);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=false;o.userData.occ=1;scene.add(o)}
var OW=WT+.004,ox=LX-WT/2+.002;occ(OW,WY0,FZ-BZ+2,ox,WY0/2,(BZ+FZ)/2);occ(OW,RH-WY1+.3,FZ-BZ+2,ox,(WY1+RH+.3)/2,(BZ+FZ)/2);
occ(OW,WY1-WY0,WZ0-BZ+1,ox,(WY0+WY1)/2,(WZ0+BZ-1)/2);occ(OW,WY1-WY0,FZ+1-WZ1,ox,(WY0+WY1)/2,(WZ1+FZ+1)/2);
occ(RX-LX+2,.1,FZ-BZ+2,(LX+RX)/2,RH+.05,(BZ+FZ)/2);occ(RX-LX+2,RH+.2,.1,(LX+RX)/2,RH/2,FZ+.05);occ(RX-LX+2,RH+.2,.1,(LX+RX)/2,RH/2,BZ-.06);occ(.1,RH+.2,FZ-BZ+2,RX+.05,RH/2,(BZ+FZ)/2);
// window reveals
var REV=M(0xe9e6de,.9,0,{map:PM[0]});
[[WY1,PI/2],[WY0,-PI/2]].forEach(function(p){var o=mesh(new T.PlaneGeometry(WT+.024,WZ1-WZ0+.01),REV,LX-WT/2,p[0],(WZ0+WZ1)/2);o.rotation.x=p[1];o.castShadow=false});
[[WZ0,0],[WZ1,PI]].forEach(function(p){var o=mesh(new T.PlaneGeometry(WT+.024,WY1-WY0+.01),REV,LX-WT/2,(WY0+WY1)/2,p[0]);o.rotation.y=p[1];o.castShadow=false});
// trim: casing, sill, sash with a 2 x 3 grid of panes
var TRIM=M(0xf2f0ea,.38,0,{bumpMap:PM[1],bumpScale:.0004});
var cw=.07,wx=LX+.008;
box(.016,WY1-WY0+cw,cw,TRIM,wx,(WY0+WY1+cw)/2,WZ0-cw/2);box(.016,WY1-WY0+cw,cw,TRIM,wx,(WY0+WY1+cw)/2,WZ1+cw/2);box(.016,cw,WZ1-WZ0+cw*2,TRIM,wx,WY1+cw/2,(WZ0+WZ1)/2);
rbox(.2,.028,WZ1-WZ0+.16,.006,.004,TRIM,LX+.02,WY0-.004,(WZ0+WZ1)/2);box(.016,.06,WZ1-WZ0+.1,TRIM,wx,WY0-.05,(WZ0+WZ1)/2);
var GLASS=M(0xffffff,.02,0,{transparent:true,opacity:.07,depthWrite:false,clearcoat:1,clearcoatRoughness:0},1),SH=(WY1-WY0)/2+.02,OPEN=.36;
function sashAt(x,y0){var g=grp(0,x,y0,(WZ0+WZ1)/2),fb=.042,mb=.018,W=WZ1-WZ0-.004,d=.034;
box(d,fb,W,TRIM,0,fb/2,0,g);box(d,fb,W,TRIM,0,SH-fb/2,0,g);box(d,SH,fb,TRIM,0,SH/2,-W/2+fb/2,g);box(d,SH,fb,TRIM,0,SH/2,W/2-fb/2,g);
box(d*.7,SH-fb*2,mb,TRIM,0,SH/2,0,g);box(d*.7,mb,W-fb*2,TRIM,0,SH/2,0,g);
var gl=mesh(new T.PlaneGeometry(W-fb*2,SH-fb*2),GLASS,0,SH/2,0,g);gl.rotation.y=PI/2;gl.castShadow=false;return g}
sashAt(LX-WT*.7,WY1-SH);sashAt(LX-WT*.38,WY0+OPEN);

// outside: a bright, overexposed late-afternoon view with soft trees
function skyCanvas(){var W=1024,H=640,c=cvs(W,H),x=c.getContext("2d"),g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,"#8e8fb8");g.addColorStop(.35,"#e7a98f");g.addColorStop(.6,"#f6c486");g.addColorStop(1,"#f2a765");x.fillStyle=g;x.fillRect(0,0,W,H);
x.filter="blur(14px)";for(var i=0;i<46;i++){var px=R()*W,py=H*(.45+R()*.6),rr=40+R()*120;x.fillStyle="rgba("+(60+R()*40)+","+(78+R()*40)+","+(52+R()*30)+","+(.35+R()*.4)+")";x.beginPath();x.ellipse(px,py,rr,rr*(.7+R()*.5),0,0,7);x.fill()}
x.filter="blur(3px)";x.strokeStyle="rgba(70,62,52,.55)";for(var i=0;i<7;i++){x.lineWidth=2+R()*4;x.beginPath();var bx=R()*W;x.moveTo(bx,H);x.bezierCurveTo(bx+R()*80-40,H*.7,bx+R()*160-80,H*.5,bx+R()*200-100,H*.3);x.stroke()}x.filter="none";return c}
var SKY=new T.MeshBasicMaterial({map:ctex(skyCanvas()),toneMapped:true});SKY.color.setRGB(3.2,3.0,2.8);
var sky=new T.Mesh(new T.PlaneGeometry(9,5.6),SKY);sky.position.set(LX-3.2,1.6,.9);sky.rotation.y=PI/2;scene.add(sky);
// sheer linen curtain gathered on the front side of the window, plus the rod
var cg=new T.PlaneGeometry(.42,WY1-WY0+.5,48,24),cpa=cg.attributes.position;for(var i=0;i<cpa.count;i++){var X_=cpa.getX(i),Y_=cpa.getY(i),hh=(Y_+(WY1-WY0+.5)/2)/(WY1-WY0+.5);cpa.setZ(i,Math.sin(X_*52)*.018*(.6+.4*(1-hh))+Math.sin(X_*17+Y_*1.3)*.008)}cg.computeVertexNormals();
function linenTex(){var W=512,H=1024,c=cvs(W,H),x=c.getContext("2d");x.fillStyle="#f5f0e7";x.fillRect(0,0,W,H);
for(var i=0;i<W;i+=2){x.fillStyle="rgba(150,128,96,"+(R()*.08)+")";x.fillRect(i,0,1,H)}for(var j=0;j<H;j+=2){x.fillStyle="rgba(255,255,255,"+(R()*.09)+")";x.fillRect(0,j,W,1)}
for(var i=0;i<500;i++){x.fillStyle="rgba(140,118,88,"+R()*.14+")";x.fillRect(R()*W,R()*H,1,6+R()*34)}
for(var i=0;i<W;i+=48){x.fillStyle="rgba(196,170,126,.12)";x.fillRect(i+18,0,2,H)}
x.fillStyle="rgba(170,146,106,.35)";x.fillRect(0,H-74,W,2);x.fillRect(0,44,W,2);x.fillStyle="rgba(170,146,106,.18)";x.fillRect(0,H-66,W,1);x.fillRect(0,50,W,1);return c}
function linenAlpha(){var c=cvs(16,1024),x=c.getContext("2d");x.fillStyle=gray(.6);x.fillRect(0,0,16,1024);x.fillStyle=gray(.93);x.fillRect(0,0,16,46);x.fillRect(0,1024-74,16,74);return ctex(c,1)}
function ditherTex(){var S=256,c=cvs(S),x=c.getContext("2d"),d=x.createImageData(S,S);for(var i=0;i<S*S;i++){var v=R()*255;d.data[i*4]=d.data[i*4+1]=d.data[i*4+2]=v;d.data[i*4+3]=255}x.putImageData(d,0,0);
var t=new T.CanvasTexture(c);t.magFilter=t.minFilter=T.NearestFilter;t.generateMipmaps=false;t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(9,45);return t}
var LIN=M(0xffffff,.9,0,{side:T.DoubleSide,transparent:true,opacity:1,alphaMap:linenAlpha(),map:ctex(linenTex()),emissive:new T.Color(0xffc48a),emissiveIntensity:0});
var CX=LX+.17,CZF=WZ1+.36,CZO=WZ1+.09,CZC=WZ0-.2,curLead=CZO,curLeadT=CZO;var curt=mesh(cg,LIN,CX,(WY0+WY1)/2+.02,(CZF+CZO)/2);curt.userData.tag="curtain";curt.rotation.y=PI/2;curt.castShadow=false;curt.receiveShadow=false;curt.frustumCulled=false;curt.customDepthMaterial=new T.MeshDepthMaterial({depthPacking:T.RGBADepthPacking,alphaMap:ditherTex(),alphaTest:.38,side:T.DoubleSide});
var CB=Float32Array.from(cpa.array),CH=WY1-WY0+.5;
function wind(t){var g=Math.max(0,Math.sin(t*.45)*.6+Math.sin(t*1.13+1.7)*.3+Math.sin(t*.21+.4)*.4);
for(var i=0;i<cpa.count;i++){var x=CB[i*3],y=CB[i*3+1],z=CB[i*3+2],hh=(CH/2-y)/CH,f=hh*hh;
cpa.setZ(i,z+f*(.015+.13*g)*(.75+.25*Math.sin(t*2.1+x*9+y*3))+Math.sin(t*1.7+y*4+x*6)*.006*f);cpa.setX(i,x+f*g*.03*Math.sin(t*.8+y*2))}
cpa.needsUpdate=true;cg.computeVertexNormals()}
var ROD=M(0xa47a3c,.32,1);var rod=cyl(.009,.009,WZ1-WZ0+.58,ROD,LX+.17,WY1+.26,(WZ0+WZ1)/2+.13);rod.rotation.x=PI/2;
[WZ0-.16,WZ1+.42].forEach(function(z){mesh(new T.SphereGeometry(.021,24,16),ROD,LX+.17,WY1+.26,z)});var RINGS=[];for(var i=0;i<12;i++){var rg_=mesh(new T.TorusGeometry(.017,.0028,8,24),ROD,LX+.17,WY1+.26,0);rg_.castShadow=false;RINGS.push(rg_)}
[WZ0-.1,WZ1+.36].forEach(function(z){cyl(.018,.018,.03,ROD,LX+.17,WY1+.26,z).rotation.x=PI/2;box(.19,.012,.012,ROD,LX+.085,WY1+.26,z);box(.012,.05,.03,ROD,LX+.006,WY1+.26,z)});
// baseboards with a small cap
function baseboard(len){var s=new T.Shape();s.moveTo(0,0);s.lineTo(.013,0);s.lineTo(.013,.075);s.quadraticCurveTo(.013,.085,.006,.088);s.lineTo(.006,.092);s.lineTo(0,.094);s.lineTo(0,0);var g=new T.ExtrudeGeometry(s,{depth:len,bevelEnabled:false});return g}
var BB=M(0xf3f1ec,.34);
var bg1=baseboard(RX-LX);bg1.rotateY(-PI/2);mesh(bg1,BB,RX,0,BZ);mesh(baseboard(WZ0-BZ),BB,LX,0,BZ);mesh(baseboard(FZ-WZ0),BB,LX,0,WZ0);
// ---------- tufted rug: warped black-and-white checkerboard ----------
var RUGW=2.05,RUGD=1.46;
function rugArt(S){var W=S,H=Math.round(S*RUGD/RUGW),C=[cvs(W,H),cvs(W,H)],c=C[0].getContext("2d"),b=C[1].getContext("2d");
var img=c.createImageData(W,H),d=img.data,bi=b.createImageData(W,H),bd=bi.data,CELL=.088,E=.2,
wells=[[.12,.14,.46,1.9,.36],[-.62,.45,.3,-1.1,.22],[.72,-.1,.26,.9,.18]];// swirl centers: x, z, radius, twist, bulge
var DK=[22,21,20],LT=[238,233,222];
for(var py=0;py<H;py++)for(var px=0;px<W;px++){var u=(px/W-.5)*RUGW,v=(py/H-.5)*RUGD;
wells.forEach(function(w){var dx=u-w[0],dy=v-w[1],r2=(dx*dx+dy*dy)/(w[2]*w[2]),f=Math.exp(-r2*1.6),a=w[3]*f,cs=Math.cos(a),sn=Math.sin(a),k=1-w[4]*f;u=w[0]+(dx*cs-dy*sn)*k;v=w[1]+(dx*sn+dy*cs)*k});
var sv=Math.sin(PI*u/CELL)*Math.sin(PI*v/CELL),m=Math.max(0,Math.min(1,.5+sv/(2*E))),t=px%5,q=py%5,tf=Math.max(0,1-Math.hypot(t-2,q-2+((px/5|0)%2)*1.5)/3),n=(R()-.5)*16,i=(py*W+px)*4;
for(var ch=0;ch<3;ch++)d[i+ch]=Math.max(0,Math.min(255,(DK[ch]+(LT[ch]-DK[ch])*m)*(.86+.18*tf)+n));d[i+3]=255;
var carve=Math.min(1,Math.abs(sv)/.18);bd[i]=bd[i+1]=bd[i+2]=Math.max(0,Math.min(255,70+tf*110+carve*60+n));bd[i+3]=255}
c.putImageData(img,0,0);b.putImageData(bi,0,0);
var t0=ctex(C[0]),t1=ctex(C[1],1);[t0,t1].forEach(function(t){t.repeat.set(1/RUGW,1/RUGD);t.offset.set(.5,.5)});return[t0,t1]}
var RG=rugArt(MOB?1000:1600),rs_=new T.Shape(),RR=.05,hw=RUGW/2,hd_=RUGD/2;
rs_.moveTo(-hw+RR,-hd_);rs_.lineTo(hw-RR,-hd_);rs_.quadraticCurveTo(hw,-hd_,hw,-hd_+RR);rs_.lineTo(hw,hd_-RR);rs_.quadraticCurveTo(hw,hd_,hw-RR,hd_);rs_.lineTo(-hw+RR,hd_);rs_.quadraticCurveTo(-hw,hd_,-hw,hd_-RR);rs_.lineTo(-hw,-hd_+RR);rs_.quadraticCurveTo(-hw,-hd_,-hw+RR,-hd_);
var rgeo=new T.ExtrudeGeometry(rs_,{depth:.006,bevelEnabled:true,bevelThickness:.003,bevelSize:.006,bevelSegments:3,curveSegments:6});rgeo.rotateX(-PI/2);
var rug=mesh(rgeo,[M(0xffffff,1,0,{map:RG[0],bumpMap:RG[1],bumpScale:.007}),M(0x6e6a64,1)],.28,.003,.56);rug.castShadow=false;

// ================= shelf (2 x 3 cubes) =================
var WH=M(0xf5f4f0,.45),shelf=grp(0,0,0,0);
[.735,.015,.375].forEach(function(y){rbox(1.11,.03,.39,.004,.003,WH,0,y,0,shelf)});
[-.54,-.18,.18,.54].forEach(function(x){rbox(.03,.69,.388,.003,.002,WH,x,.375,0,shelf)});
[-.47,.47].forEach(function(x){cyl(.012,.012,.012,M(0x9b9a95,.6),x,-.004,.14,shelf,12);cyl(.012,.012,.012,M(0x9b9a95,.6),x,-.004,-.14,shelf,12)});
[[.08,.045],[.2,.04]].forEach(function(p,i){var o=mesh(new T.SphereGeometry(.13,48,24),M(i?0xf1d6c6:0xeec8b6,.95,0,{bumpMap:noiseTex("#808080",.5,9000,256,1),bumpScale:.002}),-.36,p[0]+.03,-.01,shelf);o.scale.set(1,p[1]/.13,1)});

// ---------- record pockets: face-out crates you flip through ----------
function byId(id){return RECS.filter(function(r){return r.id===id})[0]}
var NOW=(function(){var s=null;try{s=localStorage.getItem("room.now")}catch(e){}return byId(s)||byId(NOW_ID)||RECS[0]})();
var PAPER=M(0xe4ded2,.85,0,{map:paperTex()}),COVM={},SPM={};
function loadInto(url,m){new T.TextureLoader().load(url,function(t){t.encoding=T.sRGBEncoding;t.anisotropy=ren.capabilities.getMaxAnisotropy();m.map=t;m.needsUpdate=true})}
function coverMat(r,back){var k=r.id+(back?"b":"f");if(COVM[k])return COVM[k];var m=M(0xffffff,.55,0,{map:ctex(coverCanvas(r,back))});var u=back?r.bc:r.fc;if(u)loadInto(u,m);return COVM[k]=m}
function spineCanvas(r){var c=cvs(48,512),x=c.getContext("2d");x.fillStyle=r.c;x.fillRect(0,0,48,512);
x.save();x.translate(24,256);x.rotate(PI/2);x.fillStyle=lum(r.c)>.55?"#1b1b1b":"#f4f1ea";var s=(r.a+"   "+r.t).toUpperCase(),sz=22;
do{x.font="bold "+sz+"px Arial, sans-serif";sz--}while(x.measureText(s).width>480&&sz>9);x.textAlign="center";x.textBaseline="middle";x.fillText(s,0,1);x.restore();
for(var i=0;i<700;i++){x.fillStyle="rgba("+(R()<.5?"0,0,0":"255,255,255")+","+R()*.07+")";x.fillRect(R()*48,R()*512,1,1+R()*3)}return c}
function spineMat(r){return SPM[r.id]||(SPM[r.id]=M(0xffffff,.62,0,{map:ctex(spineCanvas(r))}))}
var _sc=spineCanvas;spineCanvas=function(r){var c=_sc(r),x=c.getContext("2d"),g=x.createLinearGradient(0,0,48,0);g.addColorStop(0,"rgba(255,255,255,.12)");g.addColorStop(.5,"rgba(255,255,255,0)");g.addColorStop(1,"rgba(0,0,0,.25)");x.fillStyle=g;x.fillRect(0,0,48,512);return c};
function pocketOf(r){return TOP10.indexOf(r.id)>=0?"top10":r.g}
var PK=POCKETS.map(function(p){var cx=[-.36,0,.36][p.col],y0=p.row?.03:.39;return{p:p,cx:cx,y0:y0,g:grp("pk:"+p.k,cx,y0,0,shelf),list:[],items:[],k:0,hv:-1}});
function fillPockets(){PK.forEach(function(P){
P.list=(P.p.k==="top10"?TOP10.map(byId):RECS.filter(function(r){return pocketOf(r)===P.p.k})).filter(function(r){return r&&r!==NOW});
while(P.g.children.length)P.g.remove(P.g.children[0]);P.items=[];var z=.12;
var x=-.165+.006,n=P.list.length;P.list.forEach(function(r,j){var th=.0032+.0024*r.n,h=.312,pv=grp(0,x+th/2,0,.018+(R()-.5)*.008,P.g);pv.userData.rec=RECS.indexOf(r);
var lean=j===n-1&&n>4,tl=.17;if(lean){pv.position.x=x+h*Math.sin(tl)+.0015;pv.rotation.z=tl}
var m=box(th,h,.312,[coverMat(r),coverMat(r,1),PAPER,PAPER,spineMat(r),PAPER],lean?th/2:0,h/2,0,pv);P.items.push({pv:pv,m:m,r:r,x:pv.position.x,z:pv.position.z,ry:0,rz:pv.rotation.z||0,y:pv.position.y});x+=th+.0015+R()*.001});
P.k=Math.min(P.k,Math.max(0,P.list.length-1));layPocket(P,true)});if(typeof HOV!=="undefined"&&HOV)layerTag(HOV,true)}
function layPocket(P,snap){P.items.forEach(function(it){[["position","z",it.z],["position","x",it.x],["position","y",it.y],["rotation","y",it.ry],["rotation","z",it.rz]].forEach(function(q){if(snap)it.pv[q[0]][q[1]]=q[2];else tween(it.pv[q[0]],q[1],q[2],450)})})}
// handwritten kraft tags on the shelf lip
var TAGC=[];
function tagCanvas(txt){var c=cvs(320,84),x=c.getContext("2d");x.fillStyle="#c8a877";x.fillRect(0,0,320,84);for(var i=0;i<1400;i++){x.fillStyle="rgba("+(R()<.5?"60,40,20":"255,240,210")+","+R()*.12+")";x.fillRect(R()*320,R()*84,1+R()*2,1)}
x.fillStyle="#2a2522";x.font="600 58px Caveat, 'Bradley Hand', cursive";x.textAlign="center";x.textBaseline="middle";x.fillText(txt,160,46);return c}
PK.forEach(function(P){var w=.05+P.p.name.length*.012,g=grp("pk:"+P.p.k,P.cx,P.row?.015:.375,.1962,shelf),m=M(0xffffff,.9,0,{map:ctex(tagCanvas(P.p.name))});P.row=P.p.row;g.position.y=P.p.row?.015:.375;
var o=mesh(new T.PlaneGeometry(w,.029),m,0,0,0,g);o.castShadow=false;o.rotation.z=(R()-.5)*.05;TAGC.push({m:m,t:P.p.name})});
if(document.fonts&&document.fonts.load)document.fonts.load("600 58px Caveat").then(function(){TAGC.forEach(function(t){t.m.map=ctex(tagCanvas(t.t));t.m.needsUpdate=true})}).catch(function(){});
fillPockets();

// ---------- turntable ----------
var tt=grp("tt",-.1,.75,0),BK=M(0x1c1d20,.78,0,{roughnessMap:noiseTex("#e0e0e0",.12,3000,256,1)}),BK2=M(0x131416,.7,0);
[[-.185,.15],[.185,.15],[-.185,-.15],[.185,-.15]].forEach(function(p){cyl(.02,.022,.008,BK2,p[0],.004,p[1],tt,24)});
rbox(.43,.062,.367,.014,.004,BK,0,.039,0,tt);
var Sx=-.045,Sz=-.005;
cyl(.15,.15,.014,M(0xc3c7cb,.22,1),Sx,.077,Sz,tt,96);cyl(.147,.147,.003,M(0x161618,1),Sx,.0855,Sz,tt,96);
function groove(){var c=cvs(1024),x=c.getContext("2d");x.fillStyle="#dcdcdc";x.fillRect(0,0,1024,1024);
for(var r=150;r<508;r+=1.3){var v=190+R()*60;x.strokeStyle="rgb("+v+","+v+","+v+")";x.lineWidth=.9;x.beginPath();x.arc(512,512,r,0,7);x.stroke()}
[250,330,410].forEach(function(r){x.strokeStyle="#9a9a9a";x.lineWidth=3;x.beginPath();x.arc(512,512,r,0,7);x.stroke()});return ctex(c)}
var GROOVE=groove();
function labelCanvas(r,img,crop){var c=cvs(512),x=c.getContext("2d");x.beginPath();x.arc(256,256,256,0,7);x.clip();
if(img&&crop){var W=img.naturalWidth,H=img.naturalHeight,k=.046/.1475;x.drawImage(img,W*(1-k)/2,H*(1-k)/2,W*k,H*k,0,0,512,512)}else if(img){x.drawImage(img,0,0,512,512)}else{x.fillStyle=shade(r.c,1);x.fillRect(0,0,512,512);x.fillStyle=lum(r.c)>.55?"#1b1b1b":"#f4f1ea";x.textAlign="center";x.font="bold 34px Arial, sans-serif";wrap(x,r.t.toUpperCase(),380).slice(0,3).forEach(function(l,i){x.fillText(l,256,150+i*40)});x.font="26px Arial, sans-serif";x.fillText(r.a,256,380)}
x.fillStyle="#1b1b1b";x.beginPath();x.arc(256,256,10,0,7);x.fill();return c}
function vinylMats(r,env){if(r.dk){var fm=M(0xffffff,.3,0,{bumpMap:GROOVE,bumpScale:.0003,clearcoat:.8,clearcoatRoughness:.12},1,env);loadInto(r.dk,fm);return[M(r.v||"#dddddd",.35,0,0,1,env),fm,fm]}var clear=r.v==="clear",col=r.v&&!clear?r.v:(clear?"#e6ecef":"#0e0e10");
var face=M(col,clear?.08:.5,0,{map:GROOVE,clearcoat:.35,clearcoatRoughness:.08,transparent:clear,opacity:clear?.5:1},1,env),edge=M(col,.4,0,{transparent:clear,opacity:clear?.5:1},1,env);
if(!r.v)face.color.setRGB(.012,.012,.013);return[edge,face,face]}
function discMesh(r,env,parent,x,y,z){var g=grp(0,x,y,z,parent),vm=vinylMats(r,env);mesh(new T.CylinderGeometry(.1475,.1475,.0018,128),vm,0,0,0,g);
var lm=M(0xffffff,.75,0,{map:ctex(labelCanvas(r))},0,env),lab=mesh(new T.CylinderGeometry(.046,.046,.0021,64),[M(0xdcd6c8,.8,0,0,0,env),lm,lm],0,0,0,g);
var lu=r.lb||r.dk||r.fc;if(lu){var im=new Image();im.onload=function(){lm.map=ctex(labelCanvas(r,im,!r.lb&&!!r.dk));lm.needsUpdate=true};im.src=lu}
cyl(.0035,.0035,.0024,M(0x050505,1,0,0,0,env),0,0,0,g,16);return g}
var rec=discMesh(NOW,null,tt,Sx,.0876,Sz);
cyl(.0026,.0026,.016,M(0xdddddd,.2,1),Sx,.094,Sz,tt,16);
var P=[.155,-.105],L=.235,rr=.11,D=Math.hypot(Sx-P[0],Sz-P[1]),base=Math.atan2(-(Sz-P[1]),Sx-P[0]),ang=base+Math.acos((D*D+L*L-rr*rr)/(2*D*L));
cyl(.03,.032,.012,BK2,P[0],.076,P[1],tt,40);cyl(.016,.018,.028,BK,P[0],.096,P[1],tt,32);
var arm=grp(0,P[0],.104,P[1],tt);arm.rotation.y=ang;
var AM=M(0x1a1b1d,.3,.6);var tube=cyl(.0034,.0034,L-.02,AM,(L-.02)/2,0,0,arm,16);tube.rotation.z=PI/2;
var cw_=cyl(.017,.017,.034,BK,-.045,0,0,arm,32);cw_.rotation.z=PI/2;var cws=cyl(.006,.006,.03,AM,-.02,0,0,arm,12);cws.rotation.z=PI/2;
var hs=grp(0,L-.012,-.004,0,arm);hs.rotation.y=.33;box(.038,.004,.018,AM,.012,0,0,hs);box(.012,.011,.016,M(0xe9e6df,.5),.018,-.0075,0,hs);box(.004,.003,.022,AM,.034,.002,.013,hs).rotation.y=-.5;
cyl(.005,.005,.022,BK,.2,.08,.04,tt,12);box(.014,.004,.014,BK,.2,.092,.04,tt);
cyl(.012,.012,.012,BK2,.19,.076,.1,tt,28);cyl(.012,.012,.012,BK2,.15,.076,.1,tt,28);
var LED=M(0x2a6b47,.45,0,{emissive:new T.Color(0x3cff8a),emissiveIntensity:.6});
[[.05,LED],[.1,M(0x18191b,.45)],[.15,M(0x18191b,.45)]].forEach(function(b){cyl(.011,.011,.008,b[1],b[0],.074,.155,tt,28)});
cyl(.011,.011,.002,M(0x2b2c2f,.4,.3),-.18,.0705,.155,tt,28);
var lid=grp(0,0,.135,-.18,tt);lid.rotation.x=0;
var AC=M(0xe8eef2,.03,0,{transparent:true,opacity:.16,depthWrite:false,clearcoat:1,clearcoatRoughness:.03},1),ACE=M(0xb9c2c8,.1,0,{transparent:true,opacity:.55,depthWrite:false},1);
[[.43,.004,.367,0,0,.1835],[.004,.062,.367,-.213,-.031,.1835],[.004,.062,.367,.213,-.031,.1835],[.43,.062,.004,0,-.031,.365]].forEach(function(p){var o=box(p[0],p[1],p[2],AC,p[3],p[4],p[5],lid);o.castShadow=false});
[[.43,.004,.004,0,0,.367],[.004,.004,.367,-.213,0,.1835],[.004,.004,.367,.213,0,.1835],[.004,.062,.004,-.213,-.031,.365],[.004,.062,.004,.213,-.031,.365]].forEach(function(p){var o=box(p[0],p[1],p[2],ACE,p[3],p[4],p[5],lid);o.castShadow=false});
[-.13,.13].forEach(function(x){box(.03,.075,.012,BK2,x,.1,-.186,tt)});
// power cable falling behind the shelf
var cc=new T.CatmullRomCurve3([[-.1,.78,-.19],[-.08,.74,-.2],[-.07,.4,-.2],[-.02,.05,-.199],[.14,.008,-.19],[.26,.03,-.195],[.3,.2,-.2]].map(function(a){return new T.Vector3().fromArray(a)}));
mesh(new T.TubeGeometry(cc,60,.0028,6),M(0x111111,.5));

// duplex outlet the turntable is plugged into
var otl=grp(0,.3,.27,BZ+.003),PLT=M(0xf4f2ed,.35);rbox(.07,.006,.115,.006,.002,PLT,0,0,0,otl).rotation.x=PI/2;
[.025,-.025].forEach(function(y){var f=rbox(.034,.006,.03,.008,.002,PLT,0,y,.004,otl);f.rotation.x=PI/2;[-.006,.006].forEach(function(x){box(.002,.007,.002,M(0x222222,.8),x,y+.003,.0072,otl)});cyl(.0025,.0025,.002,M(0x222222,.8),0,y-.007,.0072,otl,10).rotation.x=PI/2});
box(.02,.024,.014,M(0x151515,.6),0,-.025,.012,otl);cyl(.0012,.0012,.002,M(0x9a9a9a,.3,1),0,0,.004,otl,8).rotation.x=PI/2;
// ---------- lava lamp ----------
var lp=grp("lamp",-.37,.75,-.1),MT=M(0xc4c8cc,.25,.9);
var bprof=[[.041,0],[.042,.004],[.04,.008],[.024,.072],[.0225,.078]].map(function(p){return new T.Vector2(p[0],p[1])});
mesh(new T.LatheGeometry(bprof,64),MT,0,0,0,lp);cyl(.0225,.0225,.004,M(0x2a2a2a,.5),0,.078,0,lp,32);
var GP=[[.0215,0],[.028,.018],[.0335,.045],[.033,.07],[.028,.11],[.021,.15],[.0155,.18],[.0145,.19]];
function gr_(y){for(var i=1;i<GP.length;i++)if(y<=GP[i][1]){var a=GP[i-1],b=GP[i],k=(y-a[1])/(b[1]-a[1]);return a[0]+(b[0]-a[0])*k}return GP[GP.length-1][0]}
var LIQ=M(0xd6286e,.12,0,{transparent:true,opacity:.62,emissive:new T.Color(0xff2f7a),emissiveIntensity:.35,depthWrite:false,side:T.DoubleSide},1);
var liq=mesh(new T.LatheGeometry(GP.map(function(p){return new T.Vector2(p[0]-.0012,p[1])}),48),LIQ,0,.08,0,lp);liq.castShadow=false;
var GLS=M(0xffffff,.02,0,{transparent:true,opacity:.14,depthWrite:false,clearcoat:1},1);var gls=mesh(new T.LatheGeometry(GP.map(function(p){return new T.Vector2(p[0],p[1])}),48),GLS,0,.08,0,lp);gls.castShadow=false;
var cprof=[[.0158,0],[.0162,.004],[.0065,.046],[0,.048]].map(function(p){return new T.Vector2(p[0],p[1])});mesh(new T.LatheGeometry(cprof,48),MT,0,.268,0,lp);
var WAX=M(0xffb347,.4,0,{emissive:new T.Color(0xff8a2a),emissiveIntensity:.55});
var pool=mesh(new T.SphereGeometry(.02,24,12),WAX,0,.084,0,lp);pool.scale.set(1,.28,1);
var BL=[{r:.011,s:.32,p:0,x:.004},{r:.0085,s:.45,p:2.1,x:-.006},{r:.007,s:.27,p:4.2,x:.002},{r:.006,s:.55,p:1.2,x:-.003}].map(function(b){b.m=mesh(new T.SphereGeometry(1,20,14),WAX,0,.1,0,lp);b.m.scale.setScalar(b.r);b.m.castShadow=false;return b});
var lampL=new T.PointLight(0xff8a86,0,1.3,2);lampL.color.convertSRGBToLinear();lampL.position.set(-.37,.93,-.03);scene.add(lampL);
// ---------- plant ----------
var pl=new T.Group(),GM=M(0xffffff,.05,0,{transparent:true,opacity:.18,depthWrite:false,side:T.DoubleSide},1);
mesh(new T.CylinderGeometry(.034,.03,.07,32,1,true),GM,0,.035,0,pl).castShadow=false;cyl(.031,.028,.04,M(0x3b2f26,1,0,{bumpMap:noiseTex("#808080",.6,3000,256,1),bumpScale:.002}),0,.02,0,pl,24);
var LG=[M(0x7fb069,.5),M(0x4f8a4a,.5),M(0x6aa356,.5)];
var LS=new T.Shape();LS.moveTo(0,0);LS.bezierCurveTo(.5,.18,.7,.62,0,1);LS.bezierCurveTo(-.7,.62,-.5,.18,0,0);
var LGeo=new T.ShapeGeometry(LS,12),pa=LGeo.attributes.position;for(var q=0;q<pa.count;q++){var X=pa.getX(q),Y=pa.getY(q);pa.setZ(q,-X*X*.9+Math.sin(Y*PI)*.06)}LGeo.computeVertexNormals();
LG.forEach(function(m){m.side=T.DoubleSide});
function leaf(p,a,tilt,sz,m){var g=grp(0,p[0],p[1],p[2],pl);g.rotation.set(0,a,0);var o=mesh(LGeo,m,0,0,0,g);o.scale.set(sz*.62,sz,sz);o.rotation.set(-PI/2+tilt,0,0)}
for(var i=0;i<13;i++){var a=i*2.39,h=.05+i*.014,rad=.03+i*.003,tp=[Math.cos(a)*rad,.045+h,Math.sin(a)*rad];stem([0,.045,0],tp,.0012,LG[1],pl);
leaf(tp,-a+PI/2,.6+.25*Math.sin(i),.07+.014*(i%3),LG[i%3])}
stem([0,.045,0],[0,.25,0],.0016,LG[1],pl);[0,2.1,4.2].forEach(function(a){leaf([0,.25,0],a,.9,.06,LG[0])});
// ---------- little house ----------
var hs2=grp("house",.49,.75,.05),OR=M(0xf0b04a,.5),GR=M(0x2f7d5b,.5),WHt=M(0xffffff,.4);
box(.065,.085,.05,OR,0,.0425,0,hs2);[[-.0195,.62],[.0195,-.62]].forEach(function(s){var r=box(.048,.004,.062,GR,s[0],.0985,0,hs2);r.rotation.z=s[1]});
box(.01,.02,.01,OR,.012,.112,-.008,hs2);[-.02,0,.02].forEach(function(x){[.06,.025].forEach(function(y){box(.01,.014,.002,WHt,x,y,.0255,hs2)})});
// ---------- hourglass ----------
var hg=grp("hg",.36,.39,.02),GL=M(0xffb84a,.06,0,{transparent:true,opacity:.42,depthWrite:false},1),pr=[[0,0],[.022,.004],[.03,.02],[.028,.04],[.012,.052],[.004,.058],[.012,.064],[.028,.076],[.03,.096],[.022,.112],[0,.116]].map(function(p){return new T.Vector2(p[0],p[1]+.006)});
cyl(.034,.034,.006,M(0x7a5a2b,.6),0,.003,0,hg);cyl(.034,.034,.006,M(0x7a5a2b,.6),0,.128,0,hg);
mesh(new T.LatheGeometry(pr,32),GL,0,0,0,hg).castShadow=false;var sd=mesh(new T.LatheGeometry(pr,32),M(0xe0952a,.7),0,.006,0,hg);sd.scale.set(.8,.42,.8);

// ---------- leaning sleeve (now playing) ----------
var sl=grp("sleeve",.27,.75,-.15);sl.rotation.x=-.14;sl.rotation.y=-.08;
var sleeve=box(.312,.312,.004,[PAPER,PAPER,PAPER,PAPER,coverMat(NOW),coverMat(NOW,1)],0,.156,0,sl);

// ---------- monstera deliciosa in a fluted ceramic pot ----------
var fig=grp("fig",-.98,0,.08);fig.rotation.y=-.75;fig.scale.setScalar(.92);
var pg=new T.CylinderGeometry(.165,.15,.31,168,6,true),ppa=pg.attributes.position;for(var q=0;q<ppa.count;q++){var x=ppa.getX(q),z=ppa.getZ(q),a=Math.atan2(z,x),k=1+.035*Math.pow(Math.abs(Math.cos(a*14)),.6);ppa.setX(q,x*k);ppa.setZ(q,z*k)}pg.computeVertexNormals();
var POT=M(0xece6da,.42,0,{side:T.DoubleSide,clearcoat:.25,clearcoatRoughness:.5,bumpMap:noiseTex("#808080",.3,6000,256,1),bumpScale:.0012},1);mesh(pg,POT,0,.155,0,fig);
cyl(.15,.15,.01,POT,0,.004,0,fig,64);var rim=mesh(new T.TorusGeometry(.168,.007,10,96),POT,0,.31,0,fig);rim.rotation.x=PI/2;
cyl(.158,.158,.01,M(0x2b2117,1,0,{bumpMap:noiseTex("#808080",.9,9000,256,1),bumpScale:.004}),0,.29,0,fig,48);
// leaf atlas: front color, back color and a normal map, all sharing one cut-out
var LS=MOB?640:1024;
function monLeaf(splits,holes,young){var S=LS,cx=S/2,C=[cvs(S),cvs(S),cvs(S),cvs(S)],f=C[0].getContext("2d"),bk=C[1].getContext("2d"),hgt=C[2].getContext("2d"),msk=C[3].getContext("2d");
function outline(x){x.beginPath();x.moveTo(cx,S*.085);x.bezierCurveTo(cx-S*.13,S*.0,cx-S*.49,S*.06,cx-S*.475,S*.44);x.bezierCurveTo(cx-S*.46,S*.75,cx-S*.24,S*.93,cx,S*.985);x.bezierCurveTo(cx+S*.24,S*.93,cx+S*.46,S*.75,cx+S*.475,S*.44);x.bezierCurveTo(cx+S*.49,S*.06,cx+S*.13,S*.0,cx,S*.085);x.closePath()}
// vein layout: pinnate veins leave the midrib and sweep out and down
var V=[];for(var k=0;k<9;k++)V.push(S*(.13+k*.095)+(R()-.5)*S*.012);
function vein(x,y,s,len){var ex=cx+s*S*.5*len,ey=y+S*(.13+.08*len);x.moveTo(cx,y);x.quadraticCurveTo(cx+s*S*.2*len,y+S*.015,ex,ey);return[ex,ey]}
// mask: leaf silhouette minus splits and holes
outline(msk);msk.fillStyle="#fff";msk.fill();msk.globalCompositeOperation="destination-out";msk.fillStyle="#000";
var cuts=[];for(var k=0;k<8;k++){[-1,1].forEach(function(s){if(k%2===0||(k>>1)>=splits)return;var y=(V[k]+V[k+1])/2,dep=.55+R()*.22,x0=cx+s*S*.5*(1-dep)*.9,y0=y+S*.03,x2=cx+s*S*.58,y2=y+S*(.19+.03*k/8),w=S*(.022+.018*R());
msk.beginPath();msk.moveTo(x0,y0-w*.2);msk.quadraticCurveTo((x0+x2)/2,y0+S*.01-w,x2,y2-w*2.4);msk.lineTo(x2,y2+w*2.4);msk.quadraticCurveTo((x0+x2)/2,y0+S*.01+w,x0,y0+w*.2);msk.closePath();msk.fill();msk.beginPath();msk.arc(x0,y0,w*.45,0,7);msk.fill();cuts.push([x0,y0])})}
for(var k=0;k<holes;k++){var s=k%2?1:-1,y=V[1+(k>>1)]+S*.045,hx=cx+s*S*(.07+R()*.04);msk.save();msk.translate(hx,y);msk.rotate(s*.55);msk.beginPath();msk.ellipse(0,0,S*(.011+R()*.007),S*(.028+R()*.018),0,0,7);msk.fill();msk.restore()}
// height: lamina puffs between veins, veins and midrib sink
hgt.fillStyle=gray(.62);hgt.fillRect(0,0,S,S);hgt.strokeStyle=gray(.35);hgt.lineCap="round";hgt.lineWidth=S*.014;hgt.beginPath();hgt.moveTo(cx,S*.09);hgt.lineTo(cx,S*.97);hgt.stroke();
hgt.lineWidth=S*.007;V.forEach(function(y){[-1,1].forEach(function(s){hgt.beginPath();vein(hgt,y,s,1);hgt.stroke()})});hgt.strokeStyle=gray(.5);hgt.lineWidth=S*.002;
for(var i=0;i<140;i++){var y=S*(.1+R()*.85),s=R()<.5?-1:1;hgt.beginPath();vein(hgt,y,s,.3+R()*.7);hgt.stroke()}
// front: deep waxy green, lighter toward the midrib, faint yellow veins
var g=f.createRadialGradient(cx,S*.4,S*.05,cx,S*.5,S*.6);g.addColorStop(0,young?"#4f8f3c":"#2f6a2f");g.addColorStop(.7,young?"#3f7d33":"#245626");g.addColorStop(1,young?"#376f2d":"#1d4a21");f.fillStyle=g;f.fillRect(0,0,S,S);
for(var i=0;i<S*6;i++){f.fillStyle="rgba("+(R()<.5?"10,30,8":"120,170,80")+","+R()*.05+")";f.fillRect(R()*S,R()*S,1+R()*3,1+R()*3)}
f.strokeStyle="rgba(190,215,120,.75)";f.lineWidth=S*.009;f.beginPath();f.moveTo(cx,S*.09);f.lineTo(cx,S*.97);f.stroke();f.strokeStyle="rgba(150,190,95,.38)";f.lineWidth=S*.004;
V.forEach(function(y){[-1,1].forEach(function(s){f.beginPath();vein(f,y,s,1);f.stroke()})});
// back: pale, matte, veins stand out
bk.fillStyle=young?"#7fae62":"#6f9d58";bk.fillRect(0,0,S,S);bk.strokeStyle="rgba(215,235,170,.85)";bk.lineWidth=S*.012;bk.beginPath();bk.moveTo(cx,S*.09);bk.lineTo(cx,S*.97);bk.stroke();bk.lineWidth=S*.006;bk.strokeStyle="rgba(200,225,150,.6)";
V.forEach(function(y){[-1,1].forEach(function(s){bk.beginPath();vein(bk,y,s,1);bk.stroke()})});
// apply the cut-out alpha to both color sides
[f,bk].forEach(function(x){x.globalCompositeOperation="destination-in";x.drawImage(C[3],0,0);x.globalCompositeOperation="source-over"});
// normal map from height (sobel)
hgt.filter="blur(1.5px)";hgt.drawImage(C[2],0,0);hgt.filter="none";var hd=hgt.getImageData(0,0,S,S).data,nc=cvs(S),nx=nc.getContext("2d"),nd=nx.createImageData(S,S);
for(var y=0;y<S;y++)for(var x=0;x<S;x++){var i=(y*S+x)*4,l=hd[(y*S+Math.max(0,x-1))*4],r=hd[(y*S+Math.min(S-1,x+1))*4],u=hd[(Math.max(0,y-1)*S+x)*4],dn=hd[(Math.min(S-1,y+1)*S+x)*4],dx=(r-l)/255*3.2,dy=(dn-u)/255*3.2,iz=1/Math.sqrt(dx*dx+dy*dy+1);
nd.data[i]=(-dx*iz*.5+.5)*255;nd.data[i+1]=(dy*iz*.5+.5)*255;nd.data[i+2]=(iz*.5+.5)*255;nd.data[i+3]=255}nx.putImageData(nd,0,0);
var tf=ctex(C[0]),tb=ctex(C[1]),tn=ctex(nc,1);[tf,tb,tn].forEach(function(t){t.anisotropy=ren.capabilities.getMaxAnisotropy()});return{f:tf,b:tb,n:tn}}
// leaves glow when light comes from behind them
var TL={value:new T.Vector3(0,1,0)},TI={value:1};
function translucent(m,col){m.onBeforeCompile=function(sh){sh.uniforms.uTL=TL;sh.uniforms.uTI=TI;sh.fragmentShader="uniform vec3 uTL;uniform float uTI;\n"+sh.fragmentShader.replace("#include <lights_fragment_end>","#include <lights_fragment_end>\nfloat bl=max(0.,-dot(normal,uTL));reflectedLight.directDiffuse+=diffuseColor.rgb*vec3("+col+")*bl*uTI;")};return m}
var LV=[monLeaf(4,6,0),monLeaf(4,4,0),monLeaf(3,4,0),monLeaf(1,0,1)];
function leafMats(L){var front=translucent(M(0xffffff,.3,0,{map:L.f,normalMap:L.n,normalScale:new T.Vector2(.8,.8),side:T.FrontSide,alphaTest:.5,clearcoat:.55,clearcoatRoughness:.22},1),".9,1.15,.45"),
back=translucent(M(0xffffff,.62,0,{map:L.b,normalMap:L.n,normalScale:new T.Vector2(-.8,-.8),side:T.BackSide,alphaTest:.5},1),"1.,1.2,.5"),dep=new T.MeshDepthMaterial({depthPacking:T.RGBADepthPacking,map:L.f,alphaTest:.5,side:T.DoubleSide});return{front:front,back:back,dep:dep}}
var LM=LV.map(leafMats);
// leaf surface: folds along the midrib, droops toward the tip, edges ripple
var LGEO=(function(){var g=new T.PlaneGeometry(1,1,28,28);g.rotateX(-PI/2);g.translate(0,0,.5);var p=g.attributes.position;
for(var i=0;i<p.count;i++){var x=p.getX(i),z=p.getZ(i),ax=Math.abs(x);p.setY(i,-z*z*.36+ax*.16-x*x*.55+Math.sin(z*17+ax*6)*.012*ax*2+Math.sin(z*5.5)*.015)}g.computeVertexNormals();return g})();
// stems taper from a fat sheath at the base to a slim stalk at the leaf
var PET=M(0x55773d,.45,0,{clearcoat:.3,clearcoatRoughness:.4},1),STM=M(0x5e5a38,.7);
function taperTube(curve,r0,r1,mat){var tub=28,rad=8,g=new T.TubeGeometry(curve,tub,1,rad),p=g.attributes.position,c=new T.Vector3(),v=new T.Vector3();
for(var i=0;i<=tub;i++){curve.getPointAt(i/tub,c);var r=r0+(r1-r0)*Math.pow(i/tub,.6);for(var j=0;j<=rad;j++){var k=i*(rad+1)+j;v.fromBufferAttribute(p,k).sub(c).multiplyScalar(r).add(c);p.setXYZ(k,v.x,v.y,v.z)}}g.computeVertexNormals();return mesh(g,mat,0,0,0,fig)}
// central stem with nodes
var stemC=new T.CatmullRomCurve3([[0,.29,0],[.015,.36,.01],[.03,.44,.025],[.04,.52,.035]].map(function(a){return new T.Vector3().fromArray(a)}));taperTube(stemC,.022,.016,STM);
for(var i=1;i<6;i++){var np=stemC.getPointAt(i/6);var nr=mesh(new T.TorusGeometry(.021-i*.0008,.003,6,20),M(0x6b6340,.8),np.x,np.y,np.z,fig);nr.rotation.x=PI/2}
// [azimuth, height, reach, leaf size, tilt, leaf variant, node t]
var MON=[[.15,1.25,.42,.5,.55,0,.9],[.75,1.08,.52,.46,.72,1,.75],[1.35,.98,.5,.42,.8,2,.6],[-.25,.95,.26,.38,.6,1,.85],[.45,.78,.62,.4,1.0,0,.45],[1.05,.74,.58,.36,1.05,2,.35],[1.9,.66,.4,.32,.9,1,.3],
[.95,1.38,.28,.44,.48,0,1],[-.6,.76,.22,.3,.78,2,.5],[.2,.6,.66,.34,1.12,1,.2],[1.6,1.18,.4,.42,.62,0,.8],[.6,1.5,.16,.24,.35,3,1],[1.25,1.32,.3,.27,.5,3,.95]];
var OBST=[new T.Box3(new T.Vector3(-.6,-.1,-.25),new T.Vector3(.6,.8,.26)),new T.Box3(new T.Vector3(-.45,.7,-.2),new T.Vector3(-.28,1.1,.02)),new T.Box3(new T.Vector3(-.36,.7,-.25),new T.Vector3(.16,.95,.24))],LEAVES=[];
fig.updateMatrixWorld(true);var _lp=new T.Vector3();
function leafHits(grpObj,curve){grpObj.updateMatrixWorld(true);var bad=false,pts=[];for(var k=0;k<=12;k++)pts.push(curve.getPointAt(k/12).clone().applyMatrix4(fig.matrixWorld));
grpObj.traverse(function(o){if(o.isMesh&&o.geometry===LGEO){var p=LGEO.attributes.position;for(var q=0;q<p.count;q+=5)pts.push(_lp.fromBufferAttribute(p,q).applyMatrix4(o.matrixWorld).clone())}});
for(var j=0;j<pts.length&&!bad;j++){var P=pts[j];if(P.z<BZ+.025||P.x<LX+.025)bad=true;for(var o2=0;o2<OBST.length&&!bad;o2++)if(OBST[o2].containsPoint(P))bad=true}return bad}
MON.forEach(function(L,i){var tries=[0,-.3,.3,-.6,.6,-.9,.9,-1.2,1.2,-1.6,1.6],sc=[1];
for(var si=0;si<sc.length;si++)for(var ti=0;ti<tries.length;ti++){var a=L[0]+tries[ti],h=L[1]*(.85+.15*sc[si]),r=L[2]*sc[si],sz=L[3]*(.9+.1*sc[si]),d=new T.Vector3(Math.sin(a),0,Math.cos(a)),o=stemC.getPointAt(L[6]),hh=h-o.y+.22;
var c=new T.CatmullRomCurve3([o.clone(),o.clone().add(new T.Vector3(0,hh*.3,0)).addScaledVector(d,r*.12),o.clone().add(new T.Vector3(0,hh*.72,0)).addScaledVector(d,r*.5),o.clone().add(new T.Vector3(0,hh,0)).addScaledVector(d,r*.92),o.clone().add(new T.Vector3(0,hh-.015,0)).addScaledVector(d,r)]);
var holder=grp(0,0,0,0,fig);var tube=taperTube(c,.0105+sz*.006,.0042+sz*.003,PET);fig.remove(tube);holder.add(tube);var tip=c.getPointAt(1),lg=grp(0,tip.x,tip.y,tip.z,holder);lg.rotation.order="YXZ";lg.rotation.set(L[4],a+(R()-.5)*.35,(R()-.5)*.3);
var m=LM[L[5]];[m.front,m.back].forEach(function(mt,j){var lf=mesh(LGEO,mt,0,0,0,lg);lf.scale.set(sz*1.02,sz,sz*1.0);if(j)lf.castShadow=false;else lf.customDepthMaterial=m.dep});
if(!leafHits(holder,c)){LEAVES.push({g:lg,rx:lg.rotation.x,rz:lg.rotation.z,i:i});return}fig.remove(holder)}});
// dried sheaths at the base of the stems
for(var i=0;i<4;i++){var sp=stemC.getPointAt(.15+i*.2),sh=mesh(new T.CylinderGeometry(.006,.018,.05,10,1,true),M(0x8b6a43,.9,0,{side:T.DoubleSide}),sp.x,sp.y+.02,sp.z,fig);sh.rotation.set((R()-.5)*.5,R()*6,(R()-.5)*.5);sh.castShadow=false}
function plantSway(t,g){LEAVES.forEach(function(Lf){var w=Math.sin(t*.0009+Lf.i*1.7)*.018+Math.sin(t*.0023+Lf.i)*.008+g*.03*Math.sin(t*.003+Lf.i*.6);Lf.g.rotation.x=Lf.rx+w;Lf.g.rotation.z=Lf.rz+w*.6})}
// aerial roots
[[[.03,.48,.03],[.1,.5,.09],[.16,.4,.15],[.19,.31,.17]],[[.0,.42,.0],[-.05,.38,.09],[-.07,.3,.15]]].forEach(function(P){taperTube(new T.CatmullRomCurve3(P.map(function(p){return new T.Vector3().fromArray(p)})),.006,.004,M(0x6a5a40,.75))});

// ---------- gallery wall: posters taped, pinned and clipped around the diploma ----------
var WASHI=["#9fd8c8","#f4a9c0","#f5d76e","#b9a7f0"],PINC=[0xe0463a,0x3a7de0,0xf2c230,0x2f9e62];
POSTERS.forEach(function(P,pi){var h=P.w*P.ar,g=grp("poster:"+P.k,P.x,P.y,BZ+.002);g.rotation.z=P.r;
var geo=new T.PlaneGeometry(P.w,h,10,14),pa=geo.attributes.position;for(var i=0;i<pa.count;i++){var x=pa.getX(i)/(P.w/2),y=pa.getY(i)/(h/2);pa.setZ(i,.0015+.006*Math.pow(Math.max(Math.abs(x),Math.abs(y)),6)*(P.hang==="clip"?(y<0?1.6:.3):1))}geo.computeVertexNormals();
var pm=M(0xffffff,.72,0,{side:T.DoubleSide});loadInto(P.src,pm);var pp=mesh(geo,pm,0,0,0,g);pp.castShadow=true;
if(P.hang==="tape")[[-1,1,.7],[1,1,-.6],[-1,-1,-.65],[1,-1,.55]].forEach(function(c,i){var tp=box(.07,.024,.0008,M(WASHI[(pi+i)%4],.6,0,{transparent:true,opacity:.82}),c[0]*(P.w/2-.012),c[1]*(h/2-.012),.0035,g);tp.rotation.z=c[2]+(R()-.5)*.2;tp.castShadow=false});
if(P.hang==="pins")[[-1,1],[1,1],[-1,-1],[1,-1]].forEach(function(c,i){var px=c[0]*(P.w/2-.015),py=c[1]*(h/2-.015);var hd=mesh(new T.SphereGeometry(.0075,16,10),M(PINC[i],.3,0,{clearcoat:1},1),px,py,.012,g);hd.scale.z=.7;cyl(.0045,.0045,.006,M(PINC[i],.3),px,py,.006,g,12).rotation.x=PI/2});
if(P.hang==="clip"){var nl=cyl(.0025,.0025,.012,M(0x8a8a8a,.3,1),0,h/2+.035,.006,g,8);nl.rotation.x=PI/2;box(.05,.028,.012,M(0x111111,.35),0,h/2-.006,.006,g);
[-1,1].forEach(function(s){stem([s*.012,h/2+.008,.013],[0,h/2+.035,.014],.0012,M(0xcfcfd2,.2,1),g)})}});
// ---------- retro CRT television on the floor ----------
var tv=grp("tv",.98,.012,.08);tv.rotation.y=-.4;
function veneerTex(){var W=512,H=256,c=cvs(W,H),x=c.getContext("2d");x.fillStyle="#6b3f22";x.fillRect(0,0,W,H);for(var i=0;i<90;i++){var y=R()*H,a=.05+R()*.14;x.strokeStyle=R()<.65?"rgba(40,20,8,"+a+")":"rgba(190,120,70,"+a*.8+")";x.lineWidth=.8+R()*2.5;x.beginPath();for(var xx=0;xx<=W;xx+=16){var yy=y+Math.sin(xx*.012+i)*6+Math.sin(xx*.05+i*2)*2;xx?x.lineTo(xx,yy):x.moveTo(xx,yy)}x.stroke()}return ctex(c)}
var VEN=M(0xffffff,.42,0,{map:veneerTex(),clearcoat:.5,clearcoatRoughness:.25},1),BEZ=M(0x1d1b19,.5),CHRM=M(0xdadbdd,.15,1),TVW=.5,TH=.38,TD=.4;
[[.018,.012,.13,.13],[.018,.012,-.13,.13],[.018,.012,.13,-.13],[.018,.012,-.13,-.13]].forEach(function(f){cyl(f[0],f[0]*.8,.03,M(0x1a1512,.5),f[2]*1.5,.015,f[3],tv,16)});
rbox(TVW,TH,TD,.035,.012,VEN,0,.03+TH/2,0,tv).rotation.x=0;
var fr=grp(0,0,.03+TH/2,TD/2,tv);rbox(TVW-.03,.012,TH-.03,.02,.004,BEZ,0,0,.0,fr).rotation.x=PI/2;
var SW=.31,SH2=.235,SX=-.06;rbox(SW+.03,.01,SH2+.03,.03,.004,M(0x0c0b0a,.3),SX,0,.006,fr).rotation.x=PI/2;
// the screen: curved glass with a CRT shader (scanlines, barrel distortion, glow)
function testCard(){var c=cvs(320,240),x=c.getContext("2d");["#c0c0c0","#c0c000","#00c0c0","#00c000","#c000c0","#c00000","#0000c0"].forEach(function(col,i){x.fillStyle=col;x.fillRect(i*320/7,0,320/7+1,160)});
x.fillStyle="#101010";x.fillRect(0,160,320,80);x.fillStyle="#f2efe8";x.font="bold 46px Georgia, serif";x.textAlign="center";x.textBaseline="middle";x.fillText("XR",160,82);x.font="15px monospace";x.fillText("CH 03  ·  PLEASE STAND BY",160,202);return c}
var TVTEX=new T.CanvasTexture(testCard());
var sg=new T.PlaneGeometry(SW,SH2,24,18),sp=sg.attributes.position;for(var i=0;i<sp.count;i++){var x=sp.getX(i)/(SW/2),y=sp.getY(i)/(SH2/2);sp.setZ(i,.016*(1-.5*(x*x+y*y)))}
var CRT=new T.ShaderMaterial({uniforms:{tMap:{value:TVTEX},uT:{value:0},uGain:{value:1.6},uNight:{value:0},uStatic:{value:0},uOn:{value:1}},vertexShader:"varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
fragmentShader:"uniform sampler2D tMap;uniform float uT,uGain,uNight,uStatic,uOn;varying vec2 vUv;float h(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233))+uT)*43758.5453);}void main(){vec2 q=vUv-.5;float sy=clamp(uOn*2.-1.,.004,1.),sx=clamp(uOn*2.,.01,1.);if(abs(q.y)>sy*.5||abs(q.x)>sx*.5){gl_FragColor=vec4(0.,0.,0.,1.);return;}q.y/=sy;q.x/=sx;vec2 uv=q;uv*=1.+dot(uv,uv)*.22;uv+=.5;if(uv.x<0.||uv.x>1.||uv.y<0.||uv.y>1.){gl_FragColor=vec4(0.,0.,0.,1.);return;}vec3 c=pow(texture2D(tMap,uv).rgb,vec3(2.2));c*=.78+.22*sin(uv.y*540.);c*=.9+.1*sin(uv.x*1600.);float v=uv.x*uv.y*(1.-uv.x)*(1.-uv.y)*16.;c*=pow(v,.35);c+=(h(floor(uv*vec2(320.,240.)))-.5)*.035;c=mix(c,vec3(h(floor(uv*vec2(260.,200.))+uT)*.8),uStatic);c*=uGain*(.97+.03*sin(uT*50.));c=mix(vec3(2.4),c,smoothstep(.45,1.,uOn));gl_FragColor=vec4(max(c,0.),1.);}"});
var scr=new T.Mesh(sg,CRT);scr.position.set(SX,0,.012);fr.add(scr);

// control panel: two chrome knobs and a speaker grille
var KNOB={};[["tvch",.15,.06],["tvpow",.15,-.02]].forEach(function(k){var kg=grp(k[0],k[1],k[2],.014,fr),kn=cyl(.02,.022,.018,CHRM,0,0,0,kg,24);kn.rotation.x=PI/2;box(.003,.016,.002,M(0x222222,.5),0,.004,.01,kg);KNOB[k[0]]=kg});
for(var i=0;i<6;i++)box(.07,.004,.002,M(0x0e0d0c,.8),.15,-.075-i*.011,.008,fr);
// rabbit-ear antenna
var ant=grp(0,.02,.03+TH+.004,-.05,tv);cyl(.035,.04,.02,M(0x1a1716,.5),0,.01,0,ant,24);
[[-1,.5],[1,.35]].forEach(function(a){var e=grp(0,0,.02,0,ant);e.rotation.z=a[0]*.45;e.rotation.x=-a[1]*.3;cyl(.0025,.0015,.42,CHRM,0,.21,0,e,8);mesh(new T.SphereGeometry(.005,10,8),CHRM,0,.42,0,e)});
var tvL=new T.PointLight(0x9fc4ff,.2,1.6,2);tvL.color.convertSRGBToLinear();fr.add(tvL);tvL.position.set(SX,0,.25);
// video channels: play muted on the screen, sound on when you tune in, flip channels with a burst of static
var TUNE_T=0,vid=document.createElement("video"),VID_OK=false,TVCH=0,VT=null;vid.muted=true;vid.loop=true;vid.playsInline=true;vid.setAttribute("playsinline","");vid.preload="auto";
vid.addEventListener("loadeddata",function(){VID_OK=true;if(!VT){VT=new T.VideoTexture(vid);VT.minFilter=VT.magFilter=T.LinearFilter;CRT.uniforms.tMap.value=VT}vid.play().catch(function(){});if(typeof focus!=="undefined"&&focus==="tv")open_("tv")});
vid.addEventListener("error",function(){VID_OK=false;CRT.uniforms.tMap.value=TVTEX});
var TV_ON=true,TVON=1;function tvPower(){TV_ON=!TV_ON;KNOB.tvpow.rotation.z=TV_ON?0:-1.2;if(TV_ON){TUNE_T=performance.now();vid.play().catch(function(){})}else setTimeout(function(){if(!TV_ON)vid.pause()},500)}
function tune(i){if(!TV_ON)return;KNOB.tvch.rotation.z-=PI/3;if(!TV_CHANNELS.length)return;TVCH=(i+TV_CHANNELS.length)%TV_CHANNELS.length;TUNE_T=performance.now();vid.src=TV_CHANNELS[TVCH].src+(vid.canPlayType('video/mp4; codecs="avc1.640028, mp4a.40.2"')?".mp4":".webm");vid.load()}
tune(0);

// ---------- framed diploma above the shelf ----------
// cherry-mahogany moulding with dark lips, black top mat, thin gold inner mat
var dip=grp("diploma",.05,1.44,BZ+.019),DW=.33,DH=DW/1.284,GR_=.007,MB_=.068,FW=.05,MY=0,
MW=DW+GR_*2+MB_*2,MH=DH+GR_*2+MB_*2,OW_=MW+FW*2,OH_=MH+FW*2;
function mouldTex(len){var W=1024,H=128,c=cvs(W,H),x=c.getContext("2d"),g=x.createLinearGradient(0,0,0,H);
[[0,"#1a0d07"],[.07,"#3a1a0c"],[.12,"#1a0d07"],[.2,"#6b2f14"],[.45,"#8e4520"],[.62,"#7a3818"],[.8,"#4a2210"],[.86,"#150a05"],[.92,"#2a150b"],[1,"#0d0604"]].forEach(function(p){g.addColorStop(p[0],p[1])});
x.fillStyle=g;x.fillRect(0,0,W,H);for(var i=0;i<140;i++){var y=H*(.2+R()*.6),a=.04+R()*.1;x.strokeStyle=R()<.6?"rgba(40,14,4,"+a+")":"rgba(200,110,60,"+a*.7+")";x.lineWidth=.6+R()*1.6;x.beginPath();x.moveTo(0,y);
for(var xx=0;xx<=W;xx+=32)x.lineTo(xx,y+Math.sin(xx*.01+i)*2+Math.sin(xx*.043+i*3)*1.2);x.stroke()}
var hl=x.createLinearGradient(0,H*.3,0,H*.5);hl.addColorStop(0,"rgba(255,210,170,0)");hl.addColorStop(.5,"rgba(255,210,170,.16)");hl.addColorStop(1,"rgba(255,210,170,0)");x.fillStyle=hl;x.fillRect(0,H*.3,W,H*.2);return ctex(c)}
var WOOD=M(0xffffff,.32,0,{map:mouldTex(),clearcoat:1,clearcoatRoughness:.14},1);
// four mitred rails: a trapezoid profile per side, texture running along the rail, inner edge at v=1
function rail(outerLen,innerLen,w){var g=new T.BufferGeometry(),d=.034,ho=outerLen/2,hi=innerLen/2,
P=[-ho,0,0, ho,0,0, hi,w,0, -hi,w,0, -ho,0,-d, ho,0,-d, hi,w,-.006, -hi,w,-.006];
var pos=[],uv=[],idx=function(a,b,c,u){[a,b,c].forEach(function(k,j){pos.push(P[k*3],P[k*3+1],P[k*3+2]);uv.push(u[j*2],u[j*2+1])})};
// face tilted toward the wall on the outside (outer edge at depth, inner edge raised), like a bevelled moulding
P[2]=-.004;P[5]=-.004;P[8]=.022;P[11]=.022;
idx(0,1,2,[0,0,1,0,1-(ho-hi)/outerLen,1]);idx(0,2,3,[0,0,1-(ho-hi)/outerLen,1,(ho-hi)/outerLen,1]);
idx(4,0,3,[0,.02,0,.02,0,.02]);idx(4,3,7,[0,.02,0,.02,0,.02]);idx(1,5,6,[0,.02,0,.02,0,.02]);idx(1,6,2,[0,.02,0,.02,0,.02]);
idx(4,5,1,[0,.01,0,.01,0,.01]);idx(4,1,0,[0,.01,0,.01,0,.01]);idx(3,2,6,[0,.95,0,.95,0,.95]);idx(3,6,7,[0,.95,0,.95,0,.95]);
g.setAttribute("position",new T.Float32BufferAttribute(pos,3));g.setAttribute("uv",new T.Float32BufferAttribute(uv,2));g.computeVertexNormals();return g}
[[OW_,MW,0,-OH_/2,0],[OW_,MW,0,OH_/2,PI],[OH_,MH,-OW_/2,0,-PI/2],[OH_,MH,OW_/2,0,PI/2]].forEach(function(r){var o=mesh(rail(r[0],r[1],FW),WOOD,r[2],r[3],.02,dip);o.rotation.z=r[4]});
mesh(new T.PlaneGeometry(OW_,OH_),M(0x1a0d07,.8),0,0,-.0145,dip).castShadow=false;
function matTex(){var S=1024,H=Math.round(S*MH/MW),c=cvs(S,H),x=c.getContext("2d"),k=S/MW;x.fillStyle="#1b1a1a";x.fillRect(0,0,S,H);
for(var i=0;i<S*H/25;i++){x.fillStyle="rgba("+(R()<.5?"0,0,0":"255,255,255")+","+R()*.035+")";x.fillRect(R()*S,R()*H,1+R(),1)}
var gw=(DW+GR_*2)*k,gh=(DH+GR_*2)*k,bev=Math.max(3,.0035*k);x.fillStyle="#f0ece2";x.fillRect((S-gw)/2-bev,(H-gh)/2-bev,gw+bev*2,gh+bev*2);
var g=x.createLinearGradient(0,0,S,H);g.addColorStop(0,"#e4c878");g.addColorStop(.5,"#b8903c");g.addColorStop(1,"#d9b964");x.fillStyle=g;x.fillRect((S-gw)/2,(H-gh)/2,gw,gh);
x.fillStyle="#f3efe6";x.fillRect((S-DW*k)/2-bev*.6,(H-DH*k)/2-bev*.6,DW*k+bev*1.2,DH*k+bev*1.2);return ctex(c)}
var MATM=M(0xffffff,.88,0,{map:matTex()});box(MW,MH,.004,[MATM,MATM,MATM,MATM,MATM,MATM],0,0,-.004,dip);
var DIPM=M(0xffffff,.85,0);loadInto("covers/diploma.jpg",DIPM);box(DW,DH,.001,[PAPER,PAPER,PAPER,PAPER,DIPM,PAPER],0,MY,-.0015,dip).castShadow=false;
var DG=M(0xffffff,.02,0,{transparent:true,opacity:.04,depthWrite:false,clearcoat:1,clearcoatRoughness:0},1);box(MW,MH,.001,DG,0,0,.004,dip).castShadow=false;
var GILT=M(0xc9a24a,.28,1);
// brass picture light
var BRS=M(0xb8904a,.3,1),pl=grp(0,0,OH_/2+.05,.0,dip);box(.05,.03,.01,BRS,0,-.012,.004,pl);
var parm=cyl(.004,.004,.1,BRS,0,.005,.05,pl,10);parm.rotation.x=PI/2-.25;
var plShade=cyl(.022,.022,.24,BRS,0,.016,.1,pl,32);plShade.rotation.z=PI/2;cyl(.019,.019,.238,M(0x2a241c,.8),0,.012,.1,pl,24).rotation.z=PI/2;
[-.12,.12].forEach(function(x){cyl(.024,.024,.006,BRS,x,.016,.1,pl,32).rotation.z=PI/2});
var PLB=M(0xfff1d8,.4,0,{emissive:new T.Color(0xffd9a0),emissiveIntensity:.2});var bulb=box(.2,.004,.01,PLB,0,.0,.1,pl);bulb.castShadow=false;
var picL=new T.SpotLight(0xffd6a0,0,1.1,.9,.8,2);picL.color.convertSRGBToLinear();picL.position.set(.05,1.44+OH_/2+.05,BZ+.11);picL.target.position.set(.05,1.44-.05,BZ);scene.add(picL);scene.add(picL.target);

// ---------- tripod floor lamp: click to switch it on and off ----------
var FLX=-1.0,FLZ=1.86,fl=grp("floorlamp",FLX,0,FLZ),OAK=M(0x8a5a32,.5,0,{clearcoat:.3,clearcoatRoughness:.4},1),BRASS=M(0xb8904a,.3,1);
[1.047,3.14159,5.236].forEach(function(a){stem([Math.cos(a)*.22,0,Math.sin(a)*.22],[0,1.02,0],.011,OAK,fl)});
cyl(.018,.018,.05,BRASS,0,1.03,0,fl,16);cyl(.006,.006,.28,BRASS,0,1.19,0,fl,10);
var LBULB=M(0xfff4e0,.3,0,{emissive:new T.Color(0xffc27a),emissiveIntensity:0});mesh(new T.SphereGeometry(.03,20,14),LBULB,0,1.29,0,fl).castShadow=false;
var LSH=M(0xf1e6d2,.95,0,{side:T.DoubleSide,transparent:true,opacity:.96,map:ctex(linenTex()),emissive:new T.Color(0xffb46a),emissiveIntensity:0});
var shd=mesh(new T.CylinderGeometry(.17,.2,.26,48,1,true),LSH,0,1.3,0,fl);shd.castShadow=false;
[1.17,1.43].forEach(function(y,i){var r=mesh(new T.TorusGeometry(i?.17:.2,.003,6,48),BRASS,0,y,0,fl);r.rotation.x=PI/2;r.castShadow=false});
var FLL=new T.PointLight(0xffb066,0,4.2,2);FLL.color.convertSRGBToLinear();FLL.position.set(FLX,1.28,FLZ);scene.add(FLL);
var FLD=new T.PointLight(0xffa860,0,1.6,2);FLD.color.convertSRGBToLinear();FLD.position.set(FLX,1.1,FLZ);scene.add(FLD);
var LAMP_ON=true,LAMPV=1;function lampToggle(){LAMP_ON=!LAMP_ON}

// ---------- bean bag across from the shelf ----------
function cordTex(){var c=cvs(512,64),x=c.getContext("2d");x.fillStyle=gray(.5);x.fillRect(0,0,512,64);for(var i=0;i<64;i++){var g=x.createLinearGradient(i*8,0,i*8+8,0);g.addColorStop(0,gray(.2));g.addColorStop(.5,gray(.85));g.addColorStop(1,gray(.2));x.fillStyle=g;x.fillRect(i*8,0,8,64)}
for(var i=0;i<3000;i++){x.fillStyle=gray(R(),.15);x.fillRect(R()*512,R()*64,1,2)}return rep(ctex(c,1),6,10)}
var BBG=new T.SphereGeometry(1,120,80),bpa=BBG.attributes.position;
for(var q=0;q<bpa.count;q++){var x=bpa.getX(q),y=bpa.getY(q),z=bpa.getZ(q),X=x*.46,Z=z*.48,Y=y*.34;
if(Y<-.16)Y=-.16+(Y+.16)*.08;Y-=.15*Math.exp(-((X+.06)*(X+.06)+(Z-.06)*(Z-.06))/.035)*(Y>-.05?1:0);
var w=1+.018*Math.sin(x*9+z*5)*Math.sin(y*11)+.012*Math.sin(z*17+y*6);bpa.setXYZ(q,X*w,Y+.17,Z*w)}BBG.computeVertexNormals();
var BBM=M(0x8a4128,.9,0,{bumpMap:cordTex(),bumpScale:.004,roughnessMap:null});
var bean=mesh(BBG,BBM,-.34,0,1.25);bean.rotation.y=2.6;

// ================= light =================
// late-afternoon sun through the window; everything else is bounce
var SUN_DIR=new T.Vector3(-.78,.33,.5).normalize(),SUN_T=new T.Vector3(0,.6,.4);
var KI=3.8,key=new T.DirectionalLight(0xffb77a,KI);key.color.convertSRGBToLinear();key.position.copy(SUN_T).addScaledVector(SUN_DIR,7);key.target.position.copy(SUN_T);scene.add(key.target);
key.castShadow=true;key.shadow.mapSize.set(Q.shadow,Q.shadow);var sc=key.shadow.camera;sc.near=.5;sc.far=14;key.shadow.bias=-.00025;key.shadow.normalBias=.012;scene.add(key);
// fit the sun's shadow volume to the room so nothing inside is lit by accident
(function(){key.updateMatrixWorld();key.target.updateMatrixWorld();var lc=new T.Matrix4().lookAt(key.position,key.target.position,new T.Vector3(0,1,0)),inv=new T.Matrix4().makeRotationFromEuler(new T.Euler().setFromRotationMatrix(lc)).invert(),b=new T.Box3();
[LX-.2,RX].forEach(function(x){[0,RH].forEach(function(y){[BZ,FZ].forEach(function(z){b.expandByPoint(new T.Vector3(x,y,z).sub(key.position).applyMatrix4(inv))})})});sc.left=b.min.x-.05;sc.right=b.max.x+.05;sc.bottom=b.min.y-.05;sc.top=b.max.y+.05;sc.updateProjectionMatrix()})();
var WIN_I=2.3,win=T.RectAreaLight?new T.RectAreaLight(0xffd9bd,WIN_I,WZ1-WZ0,WY1-WY0):null;
if(win){win.color.convertSRGBToLinear();win.position.set(LX-.02,(WY0+WY1)/2,(WZ0+WZ1)/2);win.lookAt(2,(WY0+WY1)/2-.2,(WZ0+WZ1)/2);scene.add(win)}
var BNC=T.RectAreaLight?new T.RectAreaLight(0xffae6e,0,1.2,1.1):null;if(BNC){BNC.color.convertSRGBToLinear();BNC.position.set(.42,1.4,BZ+.03);BNC.lookAt(.42,1.1,2);scene.add(BNC)}
var AMB=new T.HemisphereLight(0xd9d2e6,0x7a6050,.2);scene.add(AMB);
// dust through the whole room: drifts on slow currents, lit by every light it passes (sun or moon beam, floor lamp,
// lava lamp, TV), flakes glint as they turn, and motes right in front of the lens blow up into soft bokeh
var DN=MOB?900:1900,dpos=new Float32Array(DN*3),dseed=new Float32Array(DN*2),DB0=new T.Vector3(-1.15,.04,-.17),DBS=new T.Vector3(3.3,2.45,3.3);
for(var i=0;i<DN;i++){dpos[i*3]=DB0.x+R()*DBS.x;dpos[i*3+1]=DB0.y+R()*DBS.y;dpos[i*3+2]=DB0.z+R()*DBS.z;dseed[i*2]=R();dseed[i*2+1]=R()}
var dg=new T.BufferGeometry();dg.setAttribute("position",new T.BufferAttribute(dpos,3));dg.setAttribute("aSeed",new T.BufferAttribute(dseed,2));
var DL=[new T.Vector3(),new T.Vector3(),new T.Vector3(),new T.Vector3()],DLC=[new T.Color(),new T.Color(),new T.Color(),new T.Color()];
var DUST=new T.ShaderMaterial({transparent:true,depthWrite:false,blending:T.AdditiveBlending,
uniforms:{uTime:{value:0},uShadow:{value:null},uSM:{value:new T.Matrix4()},uCol:{value:new T.Color(1,.82,.6)},uI:{value:1},uPx:{value:1},uB0:{value:DB0},uBS:{value:DBS},uL:{value:DL},uLC:{value:DLC},uSun:{value:SUN_DIR}},
vertexShader:["attribute vec2 aSeed;uniform float uTime,uPx;uniform vec3 uB0,uBS,uL[4],uLC[4],uSun;varying vec3 vW,vPt;varying float vA,vBok,vSunPh;",
"void main(){vec3 p=position;float s=aSeed.x,t=uTime;",
// slow convection: warm air rises near the lamps, settles elsewhere; wrap inside the room box
"p+=vec3(sin(t*.07+s*40.+p.y*1.7)*.09+sin(t*.023+s*13.)*.05, t*(.004+.006*aSeed.y)*(sin(s*31.)>.2?1.:-.6)+sin(t*.11+s*20.)*.03, cos(t*.06+s*27.+p.x*1.3)*.09);",
"p=uB0+mod(p-uB0,uBS);vec4 w=vec4(p,1.);vW=w.xyz;vec4 mv=viewMatrix*w;float z=-mv.z;",
"vec3 V=normalize(cameraPosition-vW);vec3 pt=vec3(0.);for(int i=0;i<4;i++){vec3 d=uL[i]-vW;float r2=dot(d,d);float mu=dot(normalize(-d),V);float ph=.35+1.1*pow(max(mu,0.),6.);pt+=uLC[i]*ph/(1.+r2*9.);}vPt=pt;",
"float mu=dot(-uSun,V);vSunPh=.4+2.2*pow(max(mu,0.),8.);",
"float glint=pow(.5+.5*sin(t*(.6+1.8*aSeed.y)+s*90.),10.);vA=.45+.55*(.5+.5*sin(t*.9+s*60.))+2.5*glint;",
// bokeh: anything nearer than ~45cm to the lens grows into a soft disc and dims so its energy stays the same
"float b=smoothstep(.55,.12,z);vBok=b;float sz=uPx*(.7+1.3*aSeed.y)/z;sz=mix(sz,uPx*(4.+6.*aSeed.y)*.14,b);gl_PointSize=min(sz,uPx*.9);vA*=mix(1.,.2,b);",
"gl_Position=projectionMatrix*mv;}"].join("\n"),
fragmentShader:["#include <packing>","uniform sampler2D uShadow;uniform mat4 uSM;uniform vec3 uCol;uniform float uI;varying vec3 vW,vPt;varying float vA,vBok,vSunPh;",
"void main(){vec2 c=gl_PointCoord-.5;float r=length(c)*2.;if(r>1.)discard;",
"float core=1.-smoothstep(0.,1.,r);core*=core;float disc=(1.-smoothstep(.8,1.,r))*(.75+.25*smoothstep(.55,.95,r));float a=mix(core,disc,vBok);",
"vec4 s=uSM*vec4(vW,1.);float v=0.;if(s.x>0.&&s.x<1.&&s.y>0.&&s.y<1.)v=step(s.z,unpackRGBAToDepth(texture2D(uShadow,s.xy))+.002);",
"vec3 col=uCol*uI*v*vSunPh*3.4+vPt*3.6+vec3(.012,.011,.015);gl_FragColor=vec4(col*a*vA,1.);}"].join("\n")});
var dust=new T.Points(dg,DUST);dust.frustumCulled=false;dust.userData.noEnv=1;dust.renderOrder=5;scene.add(dust);

// ================= environment (baked from the room itself) =================
var pmrem=new T.PMREMGenerator(ren);
// cube captures come out mirrored in x, so capture a mirrored room and the two flips cancel
function bakeEnv(){var C=new T.Vector3(.45,.95,.95),crt=new T.WebGLCubeRenderTarget(256,{type:T.HalfFloatType,format:T.RGBAFormat,generateMipmaps:false}),cc=new T.CubeCamera(.05,20,crt);cc.position.copy(C);cc.updateMatrixWorld(true);
var tm=ren.toneMapping,oe=ren.outputEncoding,bg=scene.background;ren.toneMapping=T.NoToneMapping;ren.outputEncoding=T.LinearEncoding;dust.visible=false;scene.scale.x=-1;scene.position.x=2*C.x;scene.updateMatrixWorld(true);
var env=null;for(var k=0;k<2;k++){cc.update(ren,scene);var e=pmrem.fromCubemap(crt.texture).texture;ALLM.forEach(function(m){m.envMap=e;m.needsUpdate=true});if(env)env.dispose();env=e}
scene.scale.x=1;scene.position.x=0;scene.updateMatrixWorld(true);scene.background=bg;ren.toneMapping=tm;ren.outputEncoding=oe;dust.visible=true;crt.dispose();return env}

// ================= post: AO + volumetric sun + bloom + grade =================
var FX=null;
function rt(w,h,o){return new T.WebGLRenderTarget(w,h,Object.assign({minFilter:T.LinearFilter,magFilter:T.LinearFilter,format:T.RGBAFormat,type:T.HalfFloatType,depthBuffer:false},o||{}))}
var VS="varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}";
if(POST){try{
var sceneRT=rt(1,1,{depthBuffer:true,depthTexture:new T.DepthTexture(1,1,T.UnsignedIntType)});
var maskRT=rt(1,1,{type:T.UnsignedByteType,depthBuffer:true}),MASKM=new T.MeshBasicMaterial({color:0xffffff}),atmRT=rt(1,1),compRT=rt(1,1),gradeRT=rt(1,1,{type:T.UnsignedByteType});
var KER=[];for(var i=0;i<14;i++){var v=new T.Vector3(R()*2-1,R()*2-1,R()).normalize(),s=(i+1)/14;v.multiplyScalar(.15+.85*s*s);KER.push(v)}
var atm=new T.ShaderMaterial({defines:{STEPS:Q.steps,KN:14},uniforms:{tDepth:{value:sceneRT.depthTexture},tShadow:{value:null},uSM:{value:new T.Matrix4()},uPI:{value:new T.Matrix4()},uP:{value:new T.Matrix4()},uCW:{value:new T.Matrix4()},uCam:{value:new T.Vector3()},uSun:{value:SUN_DIR},uSunC:{value:new T.Color()},uRes:{value:new T.Vector2()},uT:{value:0},uDen:{value:1},uK:{value:KER},uR:{value:.13},uPL:{value:[new T.Vector3(),new T.Vector3(),new T.Vector3()]},uPC:{value:[new T.Color(),new T.Color(),new T.Color()]},uBMin:{value:new T.Vector3(LX,0,BZ)},uBMax:{value:new T.Vector3(RX,RH,FZ)}},
vertexShader:VS,fragmentShader:[
"#include <packing>","uniform sampler2D tDepth,tShadow;uniform mat4 uSM,uPI,uP,uCW;uniform vec3 uCam,uSun,uSunC,uBMin,uBMax,uK[KN],uPL[3],uPC[3];uniform vec2 uRes;uniform float uT,uDen,uR;varying vec2 vUv;",
"vec3 vpos(vec2 uv){float d=texture2D(tDepth,uv).x;vec4 p=uPI*vec4(uv*2.-1.,d*2.-1.,1.);return p.xyz/p.w;}",
"float ign(vec2 p){return fract(52.9829189*fract(dot(p,vec2(.06711056,.00583715))));}",
"float h3(vec3 p){p=fract(p*.3183099+.1);p*=17.;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}",
"float n3(vec3 x){vec3 i=floor(x),f=fract(x);f=f*f*(3.-2.*f);return mix(mix(mix(h3(i),h3(i+vec3(1,0,0)),f.x),mix(h3(i+vec3(0,1,0)),h3(i+vec3(1,1,0)),f.x),f.y),mix(mix(h3(i+vec3(0,0,1)),h3(i+vec3(1,0,1)),f.x),mix(h3(i+vec3(0,1,1)),h3(i+vec3(1,1,1)),f.x),f.y),f.z);}",
"float sv(vec3 w){vec4 s=uSM*vec4(w,1.);if(s.x<0.||s.x>1.||s.y<0.||s.y>1.)return 0.;return step(s.z,unpackRGBAToDepth(texture2D(tShadow,s.xy))+.0015);}",
"void main(){vec3 P=vpos(vUv);vec2 bq=mod(floor(gl_FragCoord.xy),2.);float j=(bq.x*2.+bq.y*3.-floor((bq.x*2.+bq.y*3.)/4.)*4.+.5)/4.;",
// ambient occlusion
"vec2 px=1./uRes;vec3 r1=vpos(vUv+vec2(px.x,0.))-P,l1=P-vpos(vUv-vec2(px.x,0.)),u1=vpos(vUv+vec2(0.,px.y))-P,d1=P-vpos(vUv-vec2(0.,px.y));",
"vec3 N=normalize(cross(abs(r1.z)<abs(l1.z)?r1:l1,abs(u1.z)<abs(d1.z)?u1:d1));if(dot(N,P)>0.)N=-N;",
"float a=0.;vec3 rv=vec3(cos(a),sin(a),0.);vec3 Tn=normalize(rv-N*dot(rv,N));vec3 Bn=cross(N,Tn);float occ=0.;float rad=uR*clamp(-P.z*.4,.5,1.5);",
"for(int i=0;i<KN;i++){vec3 k=uK[i];vec3 S=P+(Tn*k.x+Bn*k.y+N*k.z)*rad;vec4 o=uP*vec4(S,1.);vec2 su=o.xy/o.w*.5+.5;float sd=vpos(su).z;float rc=1.-smoothstep(rad*.5,rad*1.5,abs(P.z-sd));occ+=(sd>=S.z+.012+.012*(-P.z)?1.:0.)*rc;}",
"float ao=1.-occ/float(KN);",
// volumetric sunlight
"vec3 W=(uCW*vec4(P,1.)).xyz;vec3 rd=W-uCam;float Ld=length(rd);rd/=Ld;vec3 t1=(uBMin-uCam)/rd,t2=(uBMax-uCam)/rd;vec3 tx=max(t1,t2);float te=min(Ld,min(min(tx.x,tx.y),tx.z));",
"float st=te/float(STEPS),acc=0.;for(int i=0;i<STEPS;i++){vec3 p=uCam+rd*(float(i)+j)*st;float n=n3(p*7.+vec3(0.,uT*.05,uT*.03))*.7+n3(p*19.-uT*.04)*.3;acc+=sv(p)*(.35+1.3*n);}",
"acc*=st;float mu=dot(rd,uSun);float g=.55;float ph=(1.-g*g)/pow(1.+g*g-2.*g*mu,1.5)*.25+.08;",
"vec3 pf=vec3(0.);for(int i=0;i<3;i++){vec3 oc=uPL[i]-uCam;float tc=dot(oc,rd);float hh=length(oc-rd*tc)+.04;pf+=uPC[i]*(atan((te-tc)/hh)-atan(-tc/hh))/hh;}",
"gl_FragColor=vec4(uSunC*acc*uDen*ph+pf*.0065,ao);}"].join("\n")});
var comp=new T.ShaderMaterial({uniforms:{tC:{value:sceneRT.texture},tA:{value:atmRT.texture},tDepth:{value:sceneRT.depthTexture},tM:{value:maskRT.texture},uMR:{value:new T.Vector2()},uHL:{value:0},uHR:{value:new T.Vector2()},uAO:{value:1},uN:{value:.05},uF:{value:20}},vertexShader:VS,fragmentShader:[
"uniform sampler2D tC,tA,tDepth,tM;uniform vec2 uHR,uMR;uniform float uAO,uN,uF,uHL;varying vec2 vUv;",
"float ld(vec2 uv){float z=texture2D(tDepth,uv).x*2.-1.;return 2.*uN*uF/(uF+uN-z*(uF-uN));}",
"void main(){float dc=ld(vUv);vec4 s=vec4(0.);float ws=0.;for(int x=-2;x<=2;x++)for(int y=-2;y<=2;y++){vec2 o=vec2(float(x),float(y))/uHR;float w=exp(-abs(ld(vUv+o)-dc)/(dc*.03))*(1.-.1*float(x*x+y*y));vec4 a=texture2D(tA,vUv+o);s+=a*w;ws+=w;}s/=ws;",
"vec3 c=texture2D(tC,vUv).rgb;float ao=mix(1.,s.a,uAO*.6);c=c*ao+s.rgb;",
"if(uHL>0.){float m0=texture2D(tM,vUv).r,mx=0.;for(int i=0;i<16;i++){float a=float(i)*.3927;mx=max(mx,texture2D(tM,vUv+vec2(cos(a),sin(a))*uMR*2.2).r);mx=max(mx,texture2D(tM,vUv+vec2(cos(a),sin(a))*uMR*1.1).r);}c+=uHL*(clamp(mx-m0,0.,1.)*vec3(1.,.9,.72)*1.4+m0*vec3(.06,.05,.04));}",
"gl_FragColor=vec4(c,1.);}"].join("\n")});
var grade=new T.ShaderMaterial({uniforms:{tD:{value:compRT.texture},uE:{value:1},uT:{value:0},uNt:{value:0},uRes:{value:new T.Vector2()}},vertexShader:VS,fragmentShader:[
"uniform sampler2D tD;uniform float uE,uT,uNt;uniform vec2 uRes;varying vec2 vUv;",
"vec3 RRT(vec3 v){vec3 a=v*(v+.0245786)-.000090537;vec3 b=v*(.983729*v+.4329510)+.238081;return a/b;}",
"vec3 aces(vec3 c){const mat3 I=mat3(vec3(.59719,.07600,.02840),vec3(.35458,.90834,.13383),vec3(.04823,.01566,.83777));const mat3 O=mat3(vec3(1.60475,-.10208,-.00327),vec3(-.53108,1.10813,-.07276),vec3(-.07367,-.00605,1.07602));return clamp(O*RRT(I*(c/.6)),0.,1.);}",
"float hash(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}",
"vec3 srgb(vec3 c){return mix(c*12.92,1.055*pow(c,vec3(1./2.4))-.055,step(.0031308,c));}",
"void main(){vec2 d=vUv-.5;float r2=dot(d,d);vec2 px=1./uRes;vec3 c=texture2D(tD,vUv).rgb,nb=(texture2D(tD,vUv+vec2(px.x,0.)).rgb+texture2D(tD,vUv-vec2(px.x,0.)).rgb+texture2D(tD,vUv+vec2(0.,px.y)).rgb+texture2D(tD,vUv-vec2(0.,px.y)).rgb)*.25;c=max(c+(c-nb)*.45,0.);",
"c*=uE;c=aces(c);float l=dot(c,vec3(.2126,.7152,.0722));",
"vec3 sh=mix(vec3(.92,1.,1.06),vec3(.86,.95,1.12),uNt),hi=mix(vec3(1.03,1.,.95),vec3(1.06,.96,1.02),uNt);c*=mix(sh,hi,smoothstep(.05,.7,l));",
"c=mix(vec3(l),c,1.1);c=mix(c,c*c*(3.-2.*c),.35);c=c*.97+.014;",
"float v=smoothstep(1.05,.2,length(d*vec2(1.,.85))*1.25);c*=mix(.62,1.,v);",
"c=srgb(clamp(c,0.,1.));gl_FragColor=vec4(c,1.);}"].join("\n")});
var FQ=new T.FullScreenQuad(atm);
var bloom=new T.UnrealBloomPass(new T.Vector2(256,256),.16,.4,.9);
var fxaa=T.FXAAShader?new T.ShaderMaterial({uniforms:T.UniformsUtils.clone(T.FXAAShader.uniforms),vertexShader:T.FXAAShader.vertexShader,fragmentShader:T.FXAAShader.fragmentShader}):null;
if(fxaa)fxaa.uniforms.tDiffuse.value=gradeRT.texture;
FX={resize:function(w,h,pr){var W=Math.round(w*pr),H=Math.round(h*pr);sceneRT.setSize(W,H);compRT.setSize(W,H);gradeRT.setSize(W,H);atmRT.setSize(Math.ceil(W/2),Math.ceil(H/2));maskRT.setSize(Math.ceil(W/2),Math.ceil(H/2));comp.uniforms.uMR.value.set(1/Math.ceil(W/2),1/Math.ceil(H/2));
atm.uniforms.uRes.value.set(Math.ceil(W/2),Math.ceil(H/2));comp.uniforms.uHR.value.set(Math.ceil(W/2),Math.ceil(H/2));grade.uniforms.uRes.value.set(W,H);bloom.setSize(W,H);if(fxaa)fxaa.uniforms.resolution.value.set(1/W,1/H)},
render:function(t){ren.setRenderTarget(sceneRT);ren.clear();ren.render(scene,cam);
var U=atm.uniforms;U.tShadow.value=key.shadow.map&&key.shadow.map.texture;U.uSM.value.copy(key.shadow.matrix);U.uPI.value.copy(cam.projectionMatrixInverse);U.uP.value.copy(cam.projectionMatrix);U.uCW.value.copy(cam.matrixWorld);U.uCam.value.copy(cam.position);U.uT.value=t*.001;
FQ.material=atm;ren.setRenderTarget(atmRT);FQ.render(ren);
if(false){ren.shadowMap.autoUpdate=false;scene.overrideMaterial=MASKM;var bg0=scene.background;scene.background=null;cam.layers.set(1);ren.setRenderTarget(maskRT);ren.setClearColor(0,0);ren.clear();ren.render(scene,cam);cam.layers.set(0);scene.background=bg0;scene.overrideMaterial=null;ren.setClearColor(0,1);ren.shadowMap.autoUpdate=true}
comp.uniforms.uN.value=cam.near;comp.uniforms.uF.value=cam.far;FQ.material=comp;ren.setRenderTarget(compRT);FQ.render(ren);
bloom.render(ren,null,compRT,0,false);
grade.uniforms.uT.value=t*.001;FQ.material=grade;var aa=fxaa&&ren.getPixelRatio()<1.5;ren.setRenderTarget(aa?gradeRT:null);FQ.render(ren);
if(aa){FQ.material=fxaa;ren.setRenderTarget(null);FQ.render(ren)}},atm:atm,comp:comp,grade:grade,bloom:bloom};
}catch(e){console.warn(e);FX=null;ren.toneMapping=T.ACESFilmicToneMapping;ren.outputEncoding=T.sRGBEncoding}}
if(!FX&&POST){POST=false}

// ================= camera + interaction =================
var V={home:{p:[0,0,0],t:[0,0,0]},tt:{p:[.1,1.13,.6],t:[-.12,.8,-.02]},lamp:{p:[-.12,1.03,.45],t:[-.37,.9,-.1]},house:{p:[.66,.95,.48],t:[.47,.8,.04]},hg:{p:[.5,.62,.7],t:[.36,.46,.02]},sleeve:{p:[.42,1.0,.52],t:[.27,.9,-.15]},
fig:{p:[-.2,1.2,1.35],t:[-.95,.95,.1]},diploma:{p:[.08,1.5,.78],t:[.05,1.5,BZ]}};
PK.forEach(function(P){var y=P.y0+.17;V["pk:"+P.p.k]={p:[P.cx+.2,y+.05,.88],t:[P.cx,y-.06,.02]}});
var cp=new T.Vector3(),ct=new T.Vector3(),gp=new T.Vector3(),gt=new T.Vector3(),yaw=0,pit=0,ay=0,ap=0,focus=null,night=true,nt=1,inspecting=false;
function goal(v){gp.fromArray(v.p);gt.fromArray(v.t)}
function size(){var w=innerWidth,h=innerHeight,a=w/h;ren.setSize(w,h);cam.aspect=a;cam.fov=a<1?50:38;cam.updateProjectionMatrix();
var t=a<1?[.05,.7,0]:[-.08,.86,0],dir=a<1?new T.Vector3(1.0,.55,2.1):new T.Vector3(1.2,.72,2.1),k=a<1?Math.min(1.7,.95+(1-a)*1.05):Math.max(1.36,1.85/a);V.home.t=t;V.home.p=[t[0]+dir.x*k,t[1]+dir.y*k,t[2]+dir.z*k];
if(!focus)goal(V.home);if(FX)FX.resize(w,h,ren.getPixelRatio());$("vig").style.display=FX?"none":"";DUST.uniforms.uPx.value=h*ren.getPixelRatio()*.0078}
size();cp.copy(gp);ct.copy(gt);addEventListener("resize",size);
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
var sheet=$("sheet"),TG={tt:{t:"Now spinning",x:function(){return esc(NOW.t)+" by "+esc(NOW.a)+", on my actual turntable since "+NOW_SINCE+"."},b:"Pick up the sleeve"},fig:{t:"Growing",x:"What you're working on right now goes here."},house:{t:"Home base",x:"Contact goes here. Come by."},hg:{t:"Time",x:"Your story goes here. How you got here."},lamp:{t:"Mood",x:"Switch the light to see the room at night.",b:"Switch the light"},tv:{t:"Channel XR",x:function(){return VID_OK?"CH 0"+(TVCH+1)+" · "+esc(TV_CHANNELS[TVCH].name):"Warming up the tube..."},x2:1},diploma:{t:"Texas A&M University",x:"Bachelor of Science in Technology Management, College of Education and Human Development. Class of 2022."}};
(function(){tv.updateMatrixWorld(true);var c=new T.Vector3(SX,.03+TH/2,TD/2).applyMatrix4(tv.matrixWorld),d=new T.Vector3(0,0,1).transformDirection(tv.matrixWorld);V.tv={p:[c.x+d.x*.62,c.y+.1,c.z+d.z*.62],t:[c.x,c.y-.09,c.z]}})();
POSTERS.forEach(function(P){var h=P.w*P.ar,k="poster:"+P.k;TG[k]={t:P.t,x:esc(P.c)};V[k]={p:[P.x,P.y,BZ+Math.max(P.w,h)*1.25+.22],t:[P.x,P.y,BZ]}});
var TIP={tt:["Turntable","Now spinning"],sleeve:["Now playing",function(){return NOW.t}],lamp:["Lava lamp","Mood"],fig:["Fiddle leaf fig","Growing"],house:["Little house","Home base"],hg:["Hourglass","Time"],guitar:["Guitar","Off the clock"]};
PK.forEach(function(P){TIP["pk:"+P.p.k]=[P.p.name,function(){return P.list.length+(P.list.length===1?" record":" records")}]});
function pk(tag){return tag&&tag.indexOf("pk:")===0?PK.filter(function(P){return"pk:"+P.p.k===tag})[0]:null}
function hint(){$("hint").classList.add("off")}
$("back").onclick=step;
function step(){$("back").hidden=true;var P0=pk(focus);focus=null;if(P0)layPocket(P0);goal(V.home);yaw=pit=0;sheet.classList.remove("on");$("name").classList.remove("off")}
function fitView(cx,cy,cz,nx,nz,w,h){var tf=Math.tan(cam.fov*PI/360),dist=Math.max((h+.14)/(2*tf),(w+.14)/(2*tf*cam.aspect));return{p:[cx+nx*dist,cy,cz+nz*dist],t:[cx,cy,cz]}}
function wallView(tag){if(tag==="diploma")return fitView(.05,1.44+.04,BZ,0,1,OW_,OH_+.1);var P=POSTERS.filter(function(p){return"poster:"+p.k===tag})[0];return P?fitView(P.x,P.y,BZ,0,1,P.w,P.w*P.ar):null}
function tvView(){tv.updateMatrixWorld(true);var c=new T.Vector3(0,.03+TH/2+.02,TD/2).applyMatrix4(tv.matrixWorld),d=new T.Vector3(0,0,1).transformDirection(tv.matrixWorld),tf=Math.tan(cam.fov*PI/360),
dist=Math.max((TH+.16)/(2*tf),(TVW+.14)/(2*tf*cam.aspect));return{p:[c.x+d.x*dist,c.y+.03,c.z+d.z*dist],t:[c.x,c.y,c.z]}}
function open_(tag){hint();if(tag==="floorlamp"){lampToggle();return}if(tag==="sleeve"){inspect(NOW);return}
var WV=(tag==="diploma"||tag.indexOf("poster:")===0)?wallView(tag):null;if(WV){var PW=pk(focus);if(PW){focus=null;layPocket(PW)}focus=tag;goal(WV);yaw=pit=0;$("name").classList.add("off");sheet.classList.remove("on");$("back").hidden=false;return}
if(tag==="tv"||tag==="tvch"||tag==="tvpow"){var PT=pk(focus);if(PT){focus=null;layPocket(PT)}if(tag==="tvch")tune(TVCH+1);if(tag==="tvpow")tvPower();focus="tv";goal(tvView());yaw=pit=0;$("name").classList.add("off");sheet.classList.remove("on");$("back").hidden=false;return}var P=pk(tag),d=TG[tag];if(!d&&!P)return;var P0=pk(focus);if(P0&&P0!==P){focus=null;layPocket(P0)}focus=tag;goal(V[tag]);yaw=pit=0;$("name").classList.add("off");
if(P){layPocket(P);pocketSheet(P)}else{sheet.innerHTML="<h2>"+d.t+"</h2><p>"+(typeof d.x==="function"?d.x():d.x)+'</p><div class="row">'+(tag==="tv"&&VID_OK&&TV_CHANNELS.length>1?'<button class="btn ghost" id="chn">Next channel</button>':"")+(d.b?'<button class="btn" id="go">'+(tag==="lamp"&&night?"Turn the lights back on":d.b)+"</button>":"")+'<button class="btn ghost" id="bk">Step back</button></div>';
$("bk").onclick=step;if($("chn"))$("chn").onclick=function(){tune(TVCH+1);setTimeout(function(){open_("tv")},500)};if($("go"))$("go").onclick=function(){if(tag==="lamp"){night=!night;$("go").textContent=night?"Turn the lights back on":"Switch the light"}else if(tag==="tv"){vid.muted=!vid.muted;if(!vid.muted){vid.currentTime=0;vid.play().catch(function(){})}$("go").textContent=vid.muted?"Turn the sound on":"Mute it"}else inspect(NOW)}}
sheet.classList.add("on")}
function pocketSheet(P){var n=P.list.length,top=P.p.k==="top10";
var h="<h2>"+esc(P.p.name)+"</h2><p>"+(n?n+(n===1?" record":" records")+". Tap a spine to pull one out, or pick from here.":"Nothing in here right now.")+"</p>";
if(n)h+='<div class="strip">'+P.list.map(function(q,i){return'<button data-i="'+i+'" aria-label="'+esc(q.t)+" by "+esc(q.a)+'" style="background-image:'+thumb(q)+'">'+(top?"<b>"+(i+1)+"</b>":"")+"</button>"}).join("")+"</div>";
h+='<div class="row"><button class="btn ghost" id="bk">Step back</button></div>';sheet.innerHTML=h;$("bk").onclick=step;
sheet.querySelectorAll(".strip button").forEach(function(b){b.onclick=function(){pullP(P,+b.getAttribute("data-i"))}})}
function flipTo(P,k){if(!P.list.length)return;P.k=k;layPocket(P);if(focus==="pk:"+P.p.k)pocketSheet(P)}
var TW=[];function tween(o,k,to,dur,cb){TW=TW.filter(function(w){return!(w.o===o&&w.k===k)});TW.push({o:o,k:k,a:o[k],b:to,t0:performance.now(),d:dur,cb:cb})}
function runTw(now){TW=TW.filter(function(w){var k=Math.min(1,(now-w.t0)/w.d),e=1-Math.pow(1-k,3);w.o[w.k]=w.a+(w.b-w.a)*e;if(k>=1){if(w.cb)w.cb();return false}return true})}
var pulled=null;
function pullP(P,i){var it=P.items[i==null?P.k:i];if(pulled||!it)return;pulled={P:P,it:it};tween(it.pv.position,"z",it.z+.2,420,function(){inspect(it.r)});tween(it.pv.position,"y",.012,420);if(it.rz){tween(it.pv.rotation,"z",0,300);tween(it.pv.position,"x",it.x+.03,300)}}
function unpull(){if(!pulled)return;var it=pulled.it,P=pulled.P;pulled=null;layPocket(P)}
// swap what's on the turntable
function setNow(r){if(!r||r===NOW)return;NOW=r;try{localStorage.setItem("room.now",r.id)}catch(e){}
var mats=sleeve.material.slice();mats[4]=coverMat(NOW);mats[5]=coverMat(NOW,1);sleeve.material=mats;tt.remove(rec);rec=discMesh(NOW,null,tt,Sx,.0876,Sz);pulled=null;fillPockets()}
// ---------- hover: outline what you can click ----------
var ray=new T.Raycaster(),m2=new T.Vector2(),HOV=null,mx=0,my=0,hovDirty=false,tip=$("tip");
function pick(e){m2.set(e.clientX/innerWidth*2-1,-e.clientY/innerHeight*2+1);ray.setFromCamera(m2,cam);var hs=ray.intersectObjects(scene.children,true);
for(var i=0;i<hs.length;i++){var o=hs[i].object;if(o.userData.occ||o.isPoints||!o.visible)continue;var ri=null;while(o){if(o.userData&&o.userData.rec!=null&&ri==null)ri=o.userData.rec;if(o.userData&&o.userData.tag)return{tag:o.userData.tag,rec:ri};o=o.parent}return null}return null}
function layerTag(tag,on){scene.traverse(function(o){if(o.userData.tag===tag)o.traverse(function(c){if(c.isMesh){if(on)c.layers.enable(1);else c.layers.disable(1)}})})}
function setHover(tag){if(tag===HOV)return;if(HOV)layerTag(HOV,false);HOV=tag;if(tag)layerTag(tag,true);cv.classList.toggle("hov",!!tag);
var t=false;if(t&&!inspecting){tip.innerHTML=esc(t[0])+"<span>"+esc(typeof t[1]==="function"?t[1]():t[1])+"</span>";tip.hidden=false}else tip.hidden=true}
var dr=null,mv=false,cv=$("c"),touchUI=matchMedia("(hover:none)").matches;
$("hint").textContent=touchUI?"Drag to look around · tap things":"Drag to look around · click things";
var CD=null;function rayZ(e){m2.set(e.clientX/innerWidth*2-1,-e.clientY/innerHeight*2+1);ray.setFromCamera(m2,cam);var o=ray.ray.origin,d=ray.ray.direction;return Math.abs(d.x)<1e-4?null:o.z+d.z*(CX-o.x)/d.x}
cv.addEventListener("pointerdown",function(e){var p=pick(e);if(p&&p.tag==="curtain"&&!inspecting){var z=rayZ(e);CD={off:z==null?0:curLeadT-z,moved:false,x:e.clientX,y:e.clientY};hint();return}dr={x:e.clientX,y:e.clientY,yw:yaw,pt:pit};mv=false});
addEventListener("pointermove",function(e){if(CD){if(Math.hypot(e.clientX-CD.x,e.clientY-CD.y)>5)CD.moved=true;var z=rayZ(e);if(CD.moved&&z!=null)curLeadT=Math.max(CZC,Math.min(CZO,z+CD.off));return}if(e.pointerType==="mouse"){mx=e.clientX;my=e.clientY;hovDirty=true;tip.style.left=mx+"px";tip.style.top=my+"px"}
if(!dr||inspecting)return;var dx=e.clientX-dr.x,dy=e.clientY-dr.y;if(!mv&&Math.hypot(dx,dy)>6){mv=true;hint();setHover(null)}
var lim=focus?.35:.2,rl=focus?.2:.08;if(mv){yaw=Math.max(-rl,Math.min(lim,dr.yw+dx*.004));pit=Math.max(-.3,Math.min(focus?.18:.06,dr.pt+dy*.004))}});
cv.addEventListener("pointerleave",function(){setHover(null)});
addEventListener("pointerup",function(e){if(CD){if(!CD.moved)curLeadT=curLeadT<(CZO+CZC)/2?CZO:CZC;CD=null;return}if(dr&&!mv&&e.target===cv&&!inspecting){var p=pick(e);if(p){if(e.pointerType!=="mouse"){setHover(p.tag);setTimeout(function(){if(!inspecting)setHover(null)},650)}
var P=pk(p.tag);if(P&&focus===p.tag){var ix=p.rec!=null?P.list.indexOf(RECS[p.rec]):-1;if(ix>=0)pullP(P,ix)}else open_(p.tag)}}dr=null});
// bake the bounce light for day and night, then start
var SHEER=1,COV=-1;function setLight(n){var d=1-n;key.intensity=KI*d+.5*n;key.color.setHex(n>.5?0x8fa8ff:0xffb77a).convertSRGBToLinear();if(win){win.intensity=WIN_I*d+.35*n;win.color.setHex(n>.5?0x5d74b8:0xffd9bd).convertSRGBToLinear()}
AMB.intensity=.16*d+.04*n;SKY.color.setRGB(2.3*d+.05*n,2.0*d+.07*n,1.9*d+.16*n);key.intensity*=SHEER;if(BNC)BNC.intensity=.55*d*SHEER;if(win)win.intensity*=SHEER;SKY.color.multiplyScalar(.75+.25*SHEER);lampL.intensity=.03+n*.75;LIN.emissiveIntensity=.07*d;picL.intensity=.2*d+1.3*n;PLB.emissiveIntensity=.25+n*2.2;LIQ.emissiveIntensity=.35+n*1.6;WAX.emissiveIntensity=.55+n*1.4;LED.emissiveIntensity=.6+n*2.5;
DUST.uniforms.uI.value=(d*.5+n*.35)*SHEER;if(FX){FX.atm.uniforms.uSunC.value.copy(key.color).multiplyScalar(key.intensity*.12);FX.grade.uniforms.uNt.value=n;FX.bloom.strength=.16+.12*n;FX.grade.uniforms.uE.value=1.0+n*.7}}
setLight(1);var ENVN=bakeEnv();setLight(0);var ENVD=bakeEnv(),curEnv=ENVD;CUR_ENV=ENVD;ALLM.forEach(function(m){m.envMapIntensity=.7});
var v3=new T.Vector3(),last=0,started=false;BOOT=performance.now()-BOOT;
function frame(t){requestAnimationFrame(frame);var dt=Math.min((t-last)/1000||.016,.05);last=t;runTw(performance.now());if(inspecting&&started)return;
rec.rotation.y=-(t/1000)*(100/3)/60*2*PI%(2*PI);var k=1-Math.pow(.0005,dt);cp.lerp(gp,k);ct.lerp(gt,k);ay+=(yaw-ay)*.12;ap+=(pit-ap)*.12;
var pn=nt;nt+=((night?1:0)-nt)*.05;if(Math.abs(nt-(night?1:0))<.002)nt=night?1:0;if(nt!==pn||!started)setLight(nt);document.body.classList.toggle("night",nt>.5);
var want=nt>.5?ENVN:ENVD;if(want!==curEnv){curEnv=CUR_ENV=want;ALLM.forEach(function(m){m.envMap=want})}
curLead+=(curLeadT-curLead)*.12;var cov=Math.max(0,Math.min(1,(WZ1-.11-Math.max(curLead,WZ0-.11))/(WZ1-WZ0)));if(Math.abs(cov-COV)>.004){COV=cov;SHEER=1-.55*cov;setLight(nt)}var cw=CZF-curLead;curt.scale.x=cw/.42;curt.position.z=(CZF+curLead)/2;RINGS.forEach(function(r,i){r.position.z=CZF-.02-(cw-.04)*i/(RINGS.length-1)});LAMPV+=((LAMP_ON?1:0)-LAMPV)*Math.min(1,dt*8);FLL.intensity=LAMPV*(.62+.3*nt);FLD.intensity=LAMPV*.4;LBULB.emissiveIntensity=LAMPV*3;LSH.emissiveIntensity=LAMPV*(.55+.25*nt);plantSway(t,Math.max(0,Math.sin(t*.00045)*.6+Math.sin(t*.00113+1.7)*.3));wind(t*.001);TVON+=((TV_ON?1:0)-TVON)*Math.min(1,dt*(TV_ON?5:7));CRT.uniforms.uOn.value=TVON;CRT.uniforms.uT.value=t*.001;CRT.uniforms.uStatic.value=Math.max(0,1-(performance.now()-TUNE_T)/(VID_OK?500:1e9));tvL.intensity=(.18+.05*Math.sin(t*.013)*Math.sin(t*.0071))*(1+nt*1.5)*TVON;BL.forEach(function(b){var ph=t*.001*b.s+b.p,u=.5-.5*Math.cos(ph),y=.012+u*.15,v=Math.sin(ph),rr_=Math.min(b.r,gr_(y)*.72);b.m.position.set(b.x*gr_(y)/.03,.08+y,0);b.m.scale.set(rr_*(1-.12*Math.abs(v)),rr_*(1+.35*Math.abs(v)),rr_*(1-.12*Math.abs(v)))});
var dir=ct.clone().sub(cp),sp=new T.Spherical().setFromVector3(dir);sp.theta+=ay;sp.phi=Math.min(Math.max(sp.phi-ap,.3),2.8);dir.setFromSpherical(sp);
cam.position.copy(cp);cam.position.x+=Math.sin(t*.00037)*.006;cam.position.y+=Math.sin(t*.00029)*.004;cam.lookAt(cam.position.clone().add(dir));cam.updateMatrixWorld();
DUST.uniforms.uTime.value=t*.001;TL.value.copy(key.position).sub(key.target.position).normalize().transformDirection(cam.matrixWorldInverse);TI.value=key.intensity*.18*SHEER+LAMPV*.25;DL[0].set(FLX,1.25,FLZ);DLC[0].setRGB(1,.62,.3).multiplyScalar(.55*LAMPV);DL[1].set(-.37,.95,-.03);DLC[1].setRGB(1,.35,.6).multiplyScalar(.1+.35*nt);
DL[2].set(SX,0,.25).applyMatrix4(fr.matrixWorld);DLC[2].setRGB(.45,.62,1).multiplyScalar(.28*TVON);if(FX){var PU=FX.atm.uniforms;PU.uPL.value[0].set(FLX,1.3,FLZ);PU.uPC.value[0].setRGB(1,.6,.28).multiplyScalar(LAMPV);PU.uPL.value[1].set(-.37,.95,-.03);PU.uPC.value[1].setRGB(1,.3,.55).multiplyScalar(.12+.3*nt);PU.uPL.value[2].copy(DL[2]);PU.uPC.value[2].setRGB(.4,.6,1).multiplyScalar(.35*TVON)}
DL[3].set(.05,1.4,BZ+.15);DLC[3].setRGB(1,.8,.55).multiplyScalar(.04+.12*nt);if(key.shadow.map){DUST.uniforms.uShadow.value=key.shadow.map.texture;DUST.uniforms.uSM.value.copy(key.shadow.matrix)}
if(hovDirty&&!dr&&!inspecting){hovDirty=false;var hp=pick({clientX:mx,clientY:my});setHover(hp?hp.tag:null);}
if(FX)FX.render(t);else{ren.setRenderTarget(null);ren.render(scene,cam)}started=true;perf(t)}
var PF={n:0,t0:0,done:false};function perf(t){if(PF.done||document.hidden)return;if(!PF.t0){PF.t0=t;return}PF.n++;if(t-PF.t0>2500){var ms=(t-PF.t0)/PF.n;PF.n=0;PF.t0=t;var pr=ren.getPixelRatio();
if(ms>42&&pr>1){ren.setPixelRatio(Math.max(1,pr*.8));size()}else PF.done=true}}
requestAnimationFrame(frame);
// ================= inspect: pick up a record =================
var I=null;
function initI(){I={ren:mkRen($("ic"),true)};I.ren.toneMapping=T.NoToneMapping;I.env=mkEnv(I.ren);I.scene=new T.Scene();I.cam=new T.PerspectiveCamera(30,1,.05,10);
var k=new T.DirectionalLight(0xffffff,.55);k.position.set(-.5,.8,1.4);I.scene.add(k);var f=new T.DirectionalLight(0xffffff,.2);f.position.set(.8,-.2,.8);I.scene.add(f);I.scene.add(new T.HemisphereLight(0xffffff,0xd8d2c8,.5));
I.g=new T.Group();I.scene.add(I.g);I.yaw=0;I.ty=0;I.pt=0;I.tp=0;I.out=0;I.to=0;
function rs(){var w=innerWidth,h=innerHeight,a=w/h,t=Math.tan(15*PI/180),d=Math.max(.36/(.84*2*t*a),.36/(.52*2*t));I.ren.setSize(w,h);I.cam.aspect=a;I.cam.updateProjectionMatrix();var vh=2*d*t;I.cam.position.set(0,-vh*.17,d);I.cam.lookAt(0,-vh*.17,0)}
rs();addEventListener("resize",rs);
var d0=null;$("ic").addEventListener("pointerdown",function(e){d0={x:e.clientX,y:e.clientY,a:I.ty,b:I.tp}});
addEventListener("pointermove",function(e){if(!d0)return;I.ty=d0.a+(e.clientX-d0.x)*.012;I.tp=Math.max(-.5,Math.min(.5,d0.b+(e.clientY-d0.y)*.006))});
addEventListener("pointerup",function(){if(d0){I.ty=Math.round(I.ty/PI)*PI;I.tp=0}d0=null});
(function loop(t){requestAnimationFrame(loop);if(!inspecting)return;I.yaw+=(I.ty-I.yaw)*.14;I.pt+=(I.tp-I.pt)*.14;I.out+=(I.to-I.out)*.09;
I.g.rotation.set(I.pt,I.yaw,0);I.g.position.y=Math.sin(t*.0012)*.004;I.g.position.x=0;I.g.scale.setScalar(1);if(I.disc){I.disc.position.x=I.out*.2;I.disc.position.y=0;I.disc.rotation.y=0;I.dspin.rotation.y-=I.out*.01}I.ren.render(I.scene,I.cam)})(0)}
function loadTex(url,mat){new T.TextureLoader().load(url,function(t){t.encoding=T.sRGBEncoding;t.anisotropy=8;mat.map=t;mat.needsUpdate=true})}
function inspect(r){if(!I)initI();I.cur=r;setHover(null);
while(I.g.children.length)I.g.remove(I.g.children[0]);
var th=.003+.0016*r.n,E=I.env,ed=M(0xece7dd,.85,0,0,0,E),fm=M(0xffffff,.88,0,{map:ctex(coverCanvas(r)),envMapIntensity:.12},0,E),bm=M(0xffffff,.88,0,{map:ctex(coverCanvas(r,1)),envMapIntensity:.12},0,E);
if(r.fc)loadTex(r.fc,fm);if(r.bc)loadTex(r.bc,bm);
var sl=new T.Mesh(new T.BoxGeometry(.312,.312,th),[ed,ed,ed,ed,fm,bm]);I.g.add(sl);
var dg=new T.Group();I.g.add(dg);var dsp=discMesh(r,E,dg,0,0,0);dsp.rotation.x=PI/2;I.disc=dg;I.dspin=dsp;
I.yaw=-.5;I.ty=0;I.pt=0;I.tp=0;I.out=0;I.to=0;var top=TOP10.indexOf(r.id);
$("it").textContent=r.t;$("ia").textContent=r.a;$("im").textContent=(top>=0?"#"+(top+1)+" of my top 10  ·  ":"")+r.f+"  ·  pressed "+r.y;
$("iw").textContent=(r.id&&NOTES[r.id])||(r===NOW?"On my actual turntable right now. Your story about it goes here.":"Your story about this record goes here.");
$("play").hidden=r===NOW;$("slide").textContent="Slide out the vinyl";inspecting=true;$("name").classList.add("off");$("inspect").classList.add("on");$("close").focus()}
function closeI(){inspecting=false;$("inspect").classList.remove("on");if(!focus)$("name").classList.remove("off");unpull()}
$("close").onclick=closeI;
$("play").onclick=function(){var r=I.cur;pulled=null;inspecting=false;$("inspect").classList.remove("on");setNow(r);open_("tt")};
$("flip").onclick=function(){I.ty=Math.round(I.ty/PI)*PI+PI};
$("slide").onclick=function(){I.to=I.to?0:1;this.textContent=I.to?"Slide it back in":"Slide out the vinyl"};
addEventListener("keydown",function(e){if(e.key==="Escape"){if(inspecting)closeI();else if(focus)step()}});
window.__room={tvPower:function(){tvPower()},tvCh:function(){open_("tvch")},curtain:function(v){curLeadT=curLead=v?CZC:CZO},scene:scene,T:T,ren:ren,open:open_,inspect:function(id){inspect(byId(id)||NOW)},pocket:function(k,i){var P=pk("pk:"+k);open_("pk:"+k);if(i!=null)flipTo(P,i)},pull:function(k){pullP(pk("pk:"+k))},hover:setHover,close:closeI,step:step,cam:cam,setNight:function(v,snap){night=v;if(snap){nt=v?1:0;setLight(nt)}},fx:FX,setView:function(p,t){gp.fromArray(p);gt.fromArray(t);cp.copy(gp);ct.copy(gt)}};
})();
