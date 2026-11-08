// a floating model of the Apollo 11 Saturn V, built from the 3D-print model Xavier sent (S-IC in two halves with the
// F-1s, fairings and fins; the S-IC/S-II interstage with its ullage motors; the S-II with its J-2s and the conical
// interstage; the S-IVB; the lunar module adapter; the service module; the command module under its boost cover; and the
// escape tower). The parts are assembled, culled where sealed inside one another, and packed in media/saturnv.txt
// (gzipped binary, base64 so every host serves it). The tank walls, which came out of the print
// files slightly lumpy and faceted, are trued to round cylinders with smooth normals, and it wears a satin painted finish. It stands in the back right corner of the shelf top, behind
// the little house, set in evenly from the right and back edges.
// Paint, Apollo 11 (AS-506): white overall; S-IC roll pattern of four black stripes from the base to the intertank;
// a flag over a red "USA" on the LOX tank on four sides; "UNITED STATES" down the S-II on four sides; the two-bit roll
// code on the S-II/S-IVB interstage; a black stripe over the S-IVB forward skirt and instrument unit; silver service
// module with its flag and "UNITED STATES"; black F-1s; light-grey escape tower truss with a dark nose.
// Click it and the five F-1s light and it lifts off the shelf and hovers above the house, drifting (Twin Paradox card);
// step back and it settles back down as they wind down. Launch opens Twin Paradox. Each flame is cut short above the
// shelf top so it never burns through it, and grows as the rocket climbs.
var RKHT=.5,RKP=[{at:[.485,.751,-.125],v:{p:[.98,1.36,1.38],t:[.48,1.0,-.1]}}],RKUP=.22,RKFLOOR=.757,RKX=RKP[0].at[0],RKY=RKP[0].at[1],RKZ=RKP[0].at[2];
var SVH=1008.13,SVS=RKHT/SVH,rk=grp("rocket",RKX,RKY,RKZ),RKB=grp(0,0,0,0,rk),RKFX=grp(0,RKX,RKY,RKZ),RK={b:0,s:0,t:0};
// clickable proxy: the real mesh is too heavy to raycast on every pointer move
var rkHit=cyl(.06,.06,RKHT+.04,new T.MeshBasicMaterial({colorWrite:false,depthWrite:false}),0,RKHT/2,0,rk,12);rkHit.castShadow=rkHit.receiveShadow=false;
function saturnLivery(W,H){var c=cvs(W,H),x=c.getContext("2d");
function X(deg){return(.5-deg/360)*W}function Y(mm){return(1-mm/SVH)*H}function pw(mm,R){return mm*W/(2*PI*R)}var ph=H/SVH;
function band(d0,d1,y0,y1,col){x.fillStyle=col;for(var o=-360;o<=360;o+=360){var a=X(d0+o),b=X(d1+o);x.fillRect(Math.min(a,b),Y(y1),Math.abs(a-b),Y(y0)-Y(y1))}}
x.fillStyle="#f3f2ee";x.fillRect(0,0,W,H);
// S-IC roll pattern: base to intertank
for(var k=0;k<4;k++)band(k*90,k*90+45,40,193,"#141414");
// S-II/S-IVB interstage: two-bit roll code, split at mid-length
band(45,135,645,669,"#141414");band(135,225,622,645,"#141414");band(225,315,622,669,"#141414");
// S-IVB forward skirt and instrument unit: one solid black stripe
band(135,225,753,797,"#141414");
// service module
band(-180,180,846,894,"#c4c7cb");band(132.75-7,132.75+7,846,894,"#f3f2ee");
function flag(deg,ymid,wmm,hmm,R){var w=pw(wmm,R),h=hmm*ph;for(var o=-360;o<=360;o+=360){var cx=X(deg+o),l=cx-w/2,t=Y(ymid)-h/2;if(cx<-w||cx>W+w)continue;
for(var i=0;i<13;i++){x.fillStyle=i%2?"#f6f4ef":"#b3202e";x.fillRect(l,t+i*h/13,w,h/13+.5)}x.fillStyle="#2a3263";x.fillRect(l,t,w*.4,h*7/13);
x.fillStyle="#f6f4ef";for(var r=0;r<9;r++)for(var s=0;s<(r%2?5:6);s++){x.beginPath();x.arc(l+w*.4*((s+(r%2?1:.5))/6),t+h*7/13*((r+.5)/9),Math.max(.6,h*.018),0,7);x.fill()}}}
function letters(deg,str,ytop,hmm,wmm,pitch,R,col){x.fillStyle=col;x.textAlign="center";x.textBaseline="alphabetic";x.font="bold 100px Helvetica, Arial, sans-serif";
for(var i=0;i<str.length;i++){var ch=str[i];if(ch===" ")continue;var y1=ytop-i*pitch,m=x.measureText(ch),sx=pw(wmm,R)/Math.max(60,m.width),sy=hmm*ph/72;
for(var o=-360;o<=360;o+=360){var cx=X(deg+o);if(cx<-80||cx>W+80)continue;x.save();x.translate(cx,Y(y1-hmm));x.scale(sx,sy);x.fillText(ch,0,0);x.restore()}}}
[0,90,180,270].forEach(function(d){flag(d,326,28,15,44.5);letters(d,"USA",314,15,11,17.5,44.5,"#b3202e");letters(d,"UNITED STATES",590,7.2,6,8.8,45,"#b3202e")});
flag(132.75,889,9,5,19.5);letters(132.75,"UNITED STATES",885,2.2,1.9,2.6,19.5,"#b3202e");
var t=ctex(c);t.wrapS=T.RepeatWrapping;return t}
var SVPAL=[[1,0,1],[.95,.945,.925],[.07,.07,.075],[.16,.16,.18],[.77,.78,.8],[.62,.62,.64]];
var SVMAT=M(0xffffff,.42,0,{vertexColors:true,side:T.DoubleSide,clearcoat:.45,clearcoatRoughness:.3},1),SVLIV=saturnLivery(MOB?512:1024,MOB?2048:4096);
SVMAT.onBeforeCompile=function(sh){sh.uniforms.livery={value:SVLIV};sh.uniforms.svH={value:SVH};
sh.vertexShader=sh.vertexShader.replace("#include <common>","#include <common>\nvarying vec3 vLP;").replace("#include <begin_vertex>","#include <begin_vertex>\nvLP=position;");
sh.fragmentShader=sh.fragmentShader.replace("#include <common>","#include <common>\nvarying vec3 vLP;uniform sampler2D livery;uniform float svH;").replace("#include <color_fragment>",
"#ifdef USE_COLOR\nif(vColor.g<.01&&vColor.r>.99){vec2 lu=vec2(.5-atan(vLP.z,vLP.x)/6.2831853,vLP.y/svH);diffuseColor.rgb*=sRGBToLinear(texture2D(livery,lu)).rgb;}else diffuseColor.rgb*=vColor;\n#endif")};
var SV=grp(0,0,0,0,RKB);SV.scale.setScalar(SVS);SV.rotation.y=-PI/2;
// engine fire: five F-1 jets (centre and four on the axes, 40 mm out, 17.4 mm exit radius at model scale) that merge into
// one plume, plus a warm light that throws the glow on the rocket, the window and the floor. Kept outside the clickable
// group so the hover outline skips it.
var FLV="varying vec3 vP;varying vec3 vN;varying vec3 vV;varying float vH;uniform float uL;void main(){vec3 p=position;vH=uv.y;vP=p;vec4 w=modelViewMatrix*vec4(p,1.);vN=normalize(normalMatrix*normal);vV=normalize(-w.xyz);gl_Position=projectionMatrix*w;}",
FLF="varying vec3 vP;varying vec3 vN;varying vec3 vV;varying float vH;uniform float uT,uA,uK,uG;uniform vec3 c0,c1,c2;"+
"float h3(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453);}"+
"float n3(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(h3(i),h3(i+vec3(1,0,0)),f.x),mix(h3(i+vec3(0,1,0)),h3(i+vec3(1,1,0)),f.x),f.y),mix(mix(h3(i+vec3(0,0,1)),h3(i+vec3(1,0,1)),f.x),mix(h3(i+vec3(0,1,1)),h3(i+vec3(1,1,1)),f.x),f.y),f.z);}"+
"void main(){float d=1.-vH,face=abs(dot(normalize(vN),normalize(vV)));"+
"float n=n3(vec3(vP.x*uK,vP.y*uK+uT*7.,vP.z*uK))*.65+n3(vec3(vP.x*uK*2.3,vP.y*uK*2.3+uT*13.,vP.z*uK*2.3))*.35;"+
"float a=min(1.,pow(face,1.2)*smoothstep(0.,.05,d)*pow(1.-d,.9)*(.6+.8*n)*uA*1.4);"+
"vec3 c=mix(c2,c1,smoothstep(.15,.75,1.-d+n*.25));c=mix(c,c0,smoothstep(.55,1.,(1.-d)*face+n*.15));gl_FragColor=vec4(c*a*uG,a);}";
function flameMat(c0,c1,c2,k,g){return new T.ShaderMaterial({uniforms:{uT:{value:0},uA:{value:0},uK:{value:k},uG:{value:g},c0:{value:new T.Color(c0)},c1:{value:new T.Color(c1)},c2:{value:new T.Color(c2)}},
vertexShader:FLV,fragmentShader:FLF,transparent:true,depthWrite:false,blending:T.AdditiveBlending,side:T.DoubleSide})}
var FC=flameMat(0xfff6d6,0xffd070,0xff9020,160,1.2),FJ=flameMat(0xffd27a,0xff8a1e,0xff3c08,90,1),FP=flameMat(0xff9a30,0xff5a10,0x7a1e06,38,.85),FMS=[FC,FJ,FP],FPL=new T.Group();RKFX.add(FPL);
function flameGeo(r0,r1,len){var g=new T.CylinderGeometry(r1,r0,len,28,12,true);g.translate(0,-len/2,0);return g}
var FCG=flameGeo(3*SVS,13*SVS,95*SVS),FJG=flameGeo(15*SVS,20*SVS,250*SVS),FPG=flameGeo(125*SVS,55*SVS,780*SVS);
[[0,0],[40,0],[-40,0],[0,40],[0,-40]].forEach(function(e,ei){[[FCG,FC,4],[FJG,FJ,3]].forEach(function(q){var m=new T.Mesh(q[0],q[1]);m.position.set(e[0]*SVS,0,e[1]*SVS);m.userData.e=ei;m.raycast=function(){};m.renderOrder=q[2];FPL.add(m)})});
var fpm=new T.Mesh(FPG,FP);fpm.position.y=-45*SVS;fpm.raycast=function(){};fpm.renderOrder=3;FPL.add(fpm);FPL.visible=false;
var RKL=new T.PointLight(0xff8a3a,0,1.6,2);RKL.position.y=-.08;RKFX.add(RKL);
// on the pad the fire has nowhere to go but out across the shelf top: a flat, turning splash of flame under the engines,
// and steam and smoke that billow out from the base, roll along the shelf and spill over its edge
function rkSplashTex(){var c=cvs(256),x=c.getContext("2d"),g=x.createRadialGradient(128,128,0,128,128,128);g.addColorStop(0,"rgba(255,246,214,1)");g.addColorStop(.3,"rgba(255,206,104,1)");g.addColorStop(.6,"rgba(255,128,32,.8)");g.addColorStop(.85,"rgba(200,60,10,.3)");g.addColorStop(1,"rgba(0,0,0,0)");x.fillStyle=g;x.fillRect(0,0,256,256);
x.globalCompositeOperation="lighter";for(var k=0;k<38;k++){var a=k/38*6.2832+Math.sin(k*7.3)*.12,l=70+((k*53)%47),w=.05+((k*31)%7)*.008;x.fillStyle="rgba(255,"+(120+(k*29)%90)+",40,.16)";x.beginPath();x.moveTo(128,128);x.arc(128,128,l,a-w,a+w);x.closePath();x.fill()}return ctex(c)}
function rkPuffTex(){var c=cvs(128),x=c.getContext("2d");for(var k=0;k<9;k++){var px=64+Math.sin(k*2.4)*22*(k%3)/2,py=64+Math.cos(k*2.4)*22*(k%3)/2,r=26+(k*13)%18,g=x.createRadialGradient(px,py,0,px,py,r);g.addColorStop(0,"rgba(255,255,255,.55)");g.addColorStop(1,"rgba(255,255,255,0)");x.fillStyle=g;x.fillRect(0,0,128,128)}return ctex(c)}
var RKSPT=rkSplashTex(),RKSP=new T.Group(),RKSPM=[0,1].map(function(i){var m=new T.Mesh(new T.CircleGeometry(1,40),new T.MeshBasicMaterial({map:RKSPT,color:0xffffff,transparent:true,opacity:0,depthWrite:false,toneMapped:false}));m.rotation.x=-PI/2;m.raycast=function(){};m.renderOrder=5;RKSP.add(m);return m});
RKSP.position.set(RKX,RKFLOOR-.0045,RKZ);scene.add(RKSP);RKSP.visible=false;
var RKPT=rkPuffTex(),RKSM=[];for(var rki=0;rki<40;rki++){var rkS=new T.Sprite(new T.SpriteMaterial({map:RKPT,transparent:true,opacity:0,depthWrite:false}));rkS.raycast=function(){};rkS.renderOrder=2;rkS.visible=false;scene.add(rkS);RKSM.push({s:rkS,a:0,l:1,v:new T.Vector3(),r0:.02,r1:.1})}
RK.y=0;RK.v=0;RK.on=0;RK.tOn=0;RK.hold=0;RK.eng=[0,0,0,0,0];RK.spawn=0;
// the launch: engines light centre first, then one opposing pair, then the other; it is held down about three seconds
// while thrust builds, then released, and climbs slowly, gathering speed, before easing into a hover. Stepping back
// brings it down on throttled engines, which cut at touchdown.
var RKIGN=[0,.35,.35,.7,.7],RKHOLD=3,RKACC=.025,RKVUP=.05,RKVDN=.045;
function rocketUpdate(t){var dt=Math.min(.05,(t-(RK.t||t))/1000);RK.t=t;var P=RKP[0];RKX=P.at[0];RKY=P.at[1];RKZ=P.at[2];rk.position.set(RKX,RKY,RKZ);if(V.rocket!==P.v){V.rocket=P.v;if(focus==="rocket")goal(P.v)}
var on=focus==="rocket"?1:0,s=t/1000;
if(on&&!RK.on){RK.tOn=0;RK.hold=RK.y<.003?RKHOLD:0}RK.on=on;if(on)RK.tOn+=dt;
var b=0;for(var i=0;i<5;i++){var g=on?(RK.tOn>(RK.hold?RKIGN[i]:0)?1:RK.eng[i]):(RK.y>.002?.6:0);RK.eng[i]+=(g-RK.eng[i])*Math.min(1,dt*(g>RK.eng[i]?2.4:(on?1:2)));if(RK.eng[i]<.002&&!g)RK.eng[i]=0;b+=RK.eng[i]/5}RK.b=b;
RK.s=Math.max(0,RK.s-dt*.7);
// thrust-limited climb and descent: slow off the pad, speeding up, then settling
var tgt=on&&RK.tOn>RK.hold?RKUP:0,dv=tgt>RK.y?Math.min(RKVUP,(tgt-RK.y)*.9):-Math.min(RKVDN,Math.max(.006,(RK.y-tgt)*.9));if(Math.abs(tgt-RK.y)<.0004&&!tgt)dv=0;
RK.v+=Math.max(-RKACC*dt,Math.min(RKACC*dt,dv-RK.v));RK.y+=RK.v*dt;if(RK.y<=0){RK.y=0;RK.v=Math.max(0,RK.v)}
var h=Math.min(1,RK.y/RKUP),f=b*(1+RK.s*.5),sh=.0011*b*(1-.7*h);
RKB.position.set(Math.sin(s*.53)*.004*h+(Math.random()-.5)*sh,RK.y+Math.sin(s*1.1)*.007*h*h+(Math.random()-.5)*sh*.5,Math.cos(s*.71)*.003*h+(Math.random()-.5)*sh);
RKB.rotation.set(Math.sin(s*.8)*.006*h+(Math.random()-.5)*sh*.8,Math.sin(s*.27)*.05*h,Math.sin(s*.63)*.008*h+(Math.random()-.5)*sh*.8);
RKFX.position.set(RKX+RKB.position.x,RKY+RKB.position.y,RKZ+RKB.position.z);
var gap=Math.max(0,RKFX.position.y-RKFLOOR),pad=b*Math.max(0,1-gap/.1),fl=.85+.15*Math.random();
FPL.visible=f>.003;if(FPL.visible){FMS.forEach(function(m){m.uniforms.uT.value=s;m.uniforms.uA.value=Math.min(1,f)*fl});
FPL.children.forEach(function(m){var L=m.geometry.parameters.height,y0=-m.position.y,e=m.userData.e,lv=e==null?f:RK.eng[e]*(1+RK.s*.5),k=Math.min(.35+.65*lv+.08*Math.random(),(gap-y0)/L);m.visible=k>.01&&lv>.02;m.scale.set(e==null?1:.45+.55*Math.min(1,lv),Math.max(.01,k),e==null?1:.45+.55*Math.min(1,lv))})}
RKSP.position.set(RKX,RKFLOOR-.0045,RKZ);RKSP.visible=pad>.01;if(RKSP.visible)RKSPM.forEach(function(m,i){var r=(.055+.03*pad)*(1+.08*Math.sin(s*(23+i*7))+.05*Math.random())*(i?.7:1);m.scale.set(r,r,1);m.rotation.z=s*(i?-1.7:1.1);m.material.opacity=Math.min(1,pad*1.3)*fl*(i?.8:1);m.material.color.setScalar(1.25+.5*fl)});
// smoke: born at the base while the fire is on the shelf, rolling outward and up, growing and thinning
RK.spawn+=dt*pad*16;while(RK.spawn>=1){RK.spawn-=1;for(var j=0;j<RKSM.length&&RKSM[j].a<RKSM[j].l;j++);if(j===RKSM.length)break;var q=RKSM[j],an=Math.random()*6.2832,sp2=.07+.08*Math.random();
q.a=0;q.l=2.2+Math.random()*1.6;q.s.position.set(RKX+Math.cos(an)*.04,RKFLOOR+.018,RKZ+Math.sin(an)*.04);q.v.set(Math.cos(an)*sp2,.01+.025*Math.random(),Math.sin(an)*sp2);q.r0=.035+.02*Math.random();q.r1=.13+.09*Math.random();q.s.visible=true;q.s.material.rotation=Math.random()*6.28}
var smc=night?.42:.86;RKSM.forEach(function(q){if(q.a>=q.l){q.s.visible=false;return}q.a+=dt;var u=q.a/q.l;q.v.multiplyScalar(Math.max(0,1-dt*.9));q.v.y+=dt*.006;q.s.position.addScaledVector(q.v,dt);
var r=q.r0+(q.r1-q.r0)*(1-Math.pow(1-u,2));q.s.scale.set(r,r,1);q.s.material.opacity=Math.min(1,u*5)*Math.pow(1-u,1.3)*.85;var w=pad*.6;q.s.material.color.setRGB(smc+w*.55,smc+w*.3,smc+w*.12);q.s.material.rotation+=dt*.15})
RKL.position.y=Math.max(-.08,RKFLOOR+.02-RKFX.position.y);RKL.intensity=f>.003?(night?2.2:1.2)*Math.min(1.3,f)*fl:0}
function rocketBoost(){RK.s=1}
function saturnBuild(buf){var dv=new DataView(buf),nv=dv.getUint32(4,true),ni=dv.getUint32(8,true),mn=[0,1,2].map(function(i){return dv.getFloat32(12+i*4,true)}),mx=[0,1,2].map(function(i){return dv.getFloat32(24+i*4,true)});
var o=36,q=new Uint16Array(buf.slice(o,o+nv*6));o+=nv*6;var nr=new Int8Array(buf,o,nv*3);o+=nv*3;var cl=new Uint8Array(buf,o,nv);o+=nv;o+=(4-(nv*10)%4)%4;var ix=new Uint32Array(buf,o,ni);
var p=new Float32Array(nv*3),col=new Float32Array(nv*3);for(var i=0;i<nv;i++){for(var a=0;a<3;a++){p[i*3+a]=mn[a]+q[i*3+a]/65535*(mx[a]-mn[a]);col[i*3+a]=SVPAL[cl[i]][a]}}
var g=new T.BufferGeometry();g.setAttribute("position",new T.BufferAttribute(p,3));g.setAttribute("normal",new T.BufferAttribute(nr,3,true));g.setAttribute("color",new T.BufferAttribute(col,3));g.setIndex(new T.BufferAttribute(ix,1));
var m=mesh(g,SVMAT,0,0,0,SV);m.raycast=function(){}}
fetch("media/saturnv.txt").then(function(r){if(!r.ok)throw 0;return r.text()}).then(function(s){s=atob(s.trim());var u=new Uint8Array(s.length);for(var i=0;i<s.length;i++)u[i]=s.charCodeAt(i);var b=u.buffer;
if(u[0]===0x1f&&u[1]===0x8b){if(!window.DecompressionStream)throw 0;return new Response(new Blob([b]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer()}return b}).then(saturnBuild).catch(function(){});
