// a floating model of the Apollo 11 Saturn V, built from the 3D-print model Xavier sent (S-IC in two halves with the
// F-1s, fairings and fins; the S-IC/S-II interstage with its ullage motors; the S-II with its J-2s and the conical
// interstage; the S-IVB; the lunar module adapter; the service module; the command module under its boost cover; and the
// escape tower). The parts are assembled, culled where sealed inside one another, and packed in media/saturnv.txt
// (gzipped binary, base64 so every host serves it). It hangs in the air in front of the window, drifting gently.
// Paint, Apollo 11 (AS-506): white overall; S-IC roll pattern of four black stripes from the base to the intertank;
// a flag over a red "USA" on the LOX tank on four sides; "UNITED STATES" down the S-II on four sides; the two-bit roll
// code on the S-II/S-IVB interstage; a black stripe over the S-IVB forward skirt and instrument unit; silver service
// module with its flag and "UNITED STATES"; black F-1s; light-grey escape tower truss with a dark nose.
// Click it and the five F-1s light (Twin Paradox card); step back and they wind down. Launch opens Twin Paradox.
// where it hangs: in front of the window on landscape screens; on portrait (phone) screens, whose view and drag range
// never reach the window, high in the corner above the monstera so it is in the opening view. Each with its close-up.
var RKHT=.5,RKP=[{at:[-.84,.84,1.4],v:{p:[.08,1.1,2.09],t:[-.84,.95,1.4]}},{at:[-.3,1.45,.5],v:{p:[.25,1.55,1.7],t:[-.3,1.38,.5]}}],RKX=RKP[0].at[0],RKY=RKP[0].at[1],RKZ=RKP[0].at[2];
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
var SVMAT=M(0xffffff,.55,0,{vertexColors:true,side:T.DoubleSide}),SVLIV=saturnLivery(MOB?512:1024,MOB?2048:4096);
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
[[0,0],[40,0],[-40,0],[0,40],[0,-40]].forEach(function(e){[[FCG,FC,4],[FJG,FJ,3]].forEach(function(q){var m=new T.Mesh(q[0],q[1]);m.position.set(e[0]*SVS,0,e[1]*SVS);m.raycast=function(){};m.renderOrder=q[2];FPL.add(m)})});
var fpm=new T.Mesh(FPG,FP);fpm.position.y=-45*SVS;fpm.raycast=function(){};fpm.renderOrder=3;FPL.add(fpm);FPL.visible=false;
var RKL=new T.PointLight(0xff8a3a,0,1.6,2);RKL.position.y=-.08;RKFX.add(RKL);
function rocketUpdate(t){var dt=Math.min(.05,(t-(RK.t||t))/1000);RK.t=t;var P=RKP[cam.aspect<1?1:0];RKX=P.at[0];RKY=P.at[1];RKZ=P.at[2];rk.position.set(RKX,RKY,RKZ);if(V.rocket!==P.v){V.rocket=P.v;if(focus==="rocket")goal(P.v)}var on=focus==="rocket"?1:0;
RK.b+=(on-RK.b)*Math.min(1,dt*(on?3.2:1.6));if(RK.b<.002&&!on)RK.b=0;RK.s=Math.max(0,RK.s-dt*.7);
var b=RK.b,f=b*(1+RK.s*.5),s=t/1000,sh=.0007*b;
RKB.position.set(Math.sin(s*.53)*.004+(Math.random()-.5)*sh,Math.sin(s*1.1)*.007+.025*b*b*(3-2*b)+(Math.random()-.5)*sh,Math.cos(s*.71)*.003+(Math.random()-.5)*sh);
RKB.rotation.set(Math.sin(s*.8)*.012*(1-b),Math.sin(s*.27)*.05,Math.sin(s*.63)*.015*(1-b));
RKFX.position.set(RKX+RKB.position.x,RKY+RKB.position.y,RKZ+RKB.position.z);
FPL.visible=f>.003;if(!FPL.visible){RKL.intensity=0;return}var fl=.85+.15*Math.random();
FMS.forEach(function(m){m.uniforms.uT.value=s;m.uniforms.uA.value=Math.min(1,f)*fl});FPL.scale.set(1,.35+.65*f+.08*Math.random(),1);
RKL.intensity=(night?2.2:1.2)*Math.min(1.3,f)*fl}
function rocketBoost(){RK.s=1}
function saturnBuild(buf){var dv=new DataView(buf),nv=dv.getUint32(4,true),ni=dv.getUint32(8,true),mn=[0,1,2].map(function(i){return dv.getFloat32(12+i*4,true)}),mx=[0,1,2].map(function(i){return dv.getFloat32(24+i*4,true)});
var o=36,q=new Uint16Array(buf.slice(o,o+nv*6));o+=nv*6;var nr=new Int8Array(buf,o,nv*3);o+=nv*3;var cl=new Uint8Array(buf,o,nv);o+=nv;o+=(4-(nv*10)%4)%4;var ix=new Uint32Array(buf,o,ni);
var p=new Float32Array(nv*3),col=new Float32Array(nv*3);for(var i=0;i<nv;i++){for(var a=0;a<3;a++){p[i*3+a]=mn[a]+q[i*3+a]/65535*(mx[a]-mn[a]);col[i*3+a]=SVPAL[cl[i]][a]}}
var g=new T.BufferGeometry();g.setAttribute("position",new T.BufferAttribute(p,3));g.setAttribute("normal",new T.BufferAttribute(nr,3,true));g.setAttribute("color",new T.BufferAttribute(col,3));g.setIndex(new T.BufferAttribute(ix,1));
var m=mesh(g,SVMAT,0,0,0,SV);m.raycast=function(){}}
fetch("media/saturnv.txt").then(function(r){if(!r.ok)throw 0;return r.text()}).then(function(s){s=atob(s.trim());var u=new Uint8Array(s.length);for(var i=0;i<s.length;i++)u[i]=s.charCodeAt(i);var b=u.buffer;
if(u[0]===0x1f&&u[1]===0x8b){if(!window.DecompressionStream)throw 0;return new Response(new Blob([b]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer()}return b}).then(saturnBuild).catch(function(){});
