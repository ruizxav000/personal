// a desk model of the Apollo 11 Saturn V where the hourglass used to stand, built from the 3D-print model Xavier sent
// (S-IC in two halves with the F-1s, fairings and fins; the S-IC/S-II interstage with its ullage motors; the S-II with
// its J-2s and the conical interstage; the S-IVB; the lunar module adapter; the service module; the command module under
// its boost cover; and the escape tower). The parts are assembled, culled where sealed inside one another, and packed in
// media/saturnv.txt (gzipped binary, base64 so every host serves it). It stands on four hold-down posts on a walnut plinth.
// Paint, Apollo 11 (AS-506): white overall; S-IC roll pattern of four black stripes from the base to the intertank;
// a flag over a red "USA" on the LOX tank on four sides; "UNITED STATES" down the S-II on four sides; the two-bit roll
// code on the S-II/S-IVB interstage; a black stripe over the S-IVB forward skirt and instrument unit; silver service
// module with its flag and "UNITED STATES"; black F-1s; light-grey escape tower truss with a dark nose.
// Click it for the Twin Paradox card.
var rk=grp("rocket",.36,.39,.02),SVS=2.9e-4,SVH=1008.13,SVLIFT=2;
var WAL=(function(){var C=[cvs(512),cvs(512)],x=C[0].getContext("2d"),b=C[1].getContext("2d");x.fillStyle="#4d2c18";x.fillRect(0,0,512,512);b.fillStyle=gray(.5);b.fillRect(0,0,512,512);// walnut grain
for(var i=0;i<160;i++){var y=R()*512,amp=2+R()*6,f=.004+R()*.01,ph=R()*7,a=.06+R()*.22,dk=R()<.6;x.strokeStyle=dk?"rgba(22,10,4,"+a+")":"rgba(170,108,62,"+a*.8+")";b.strokeStyle=dk?gray(.38,.5):gray(.6,.4);x.lineWidth=b.lineWidth=.6+R()*2.6;
[x,b].forEach(function(c){c.beginPath();for(var xx=-12;xx<=524;xx+=8){var yy=y+Math.sin(xx*f+ph)*amp;xx>-12?c.lineTo(xx,yy):c.moveTo(xx,yy)}c.stroke()})}return[ctex(C[0]),ctex(C[1],1)]})();
rbox(.075,.012,.075,.006,.002,M(0xffffff,.42,0,{map:WAL[0],bumpMap:WAL[1],bumpScale:.0006}),0,.006,0,rk);
var SVP=M(0x3a3a3e,.4,.7);[0,1,2,3].forEach(function(k){var a=PI/4+k*PI/2,x=Math.cos(a)*40*SVS,z=Math.sin(a)*40*SVS,h=(47.5+SVLIFT)*SVS;cyl(.0016,.002,h,SVP,x,.012+h/2,z,rk,16)});
// clickable proxy: the real mesh is too heavy to raycast on every pointer move
var rkHit=cyl(.03,.03,.31,new T.MeshBasicMaterial({colorWrite:false,depthWrite:false}),0,.16,0,rk,12);rkHit.castShadow=rkHit.receiveShadow=false;
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
var SV=grp(0,0,.012+SVLIFT*SVS,0,rk);SV.scale.setScalar(SVS);SV.rotation.y=-PI/2;
function saturnBuild(buf){var dv=new DataView(buf),nv=dv.getUint32(4,true),ni=dv.getUint32(8,true),mn=[0,1,2].map(function(i){return dv.getFloat32(12+i*4,true)}),mx=[0,1,2].map(function(i){return dv.getFloat32(24+i*4,true)});
var o=36,q=new Uint16Array(buf.slice(o,o+nv*6));o+=nv*6;var nr=new Int8Array(buf,o,nv*3);o+=nv*3;var cl=new Uint8Array(buf,o,nv);o+=nv;o+=(4-(nv*10)%4)%4;var ix=new Uint32Array(buf,o,ni);
var p=new Float32Array(nv*3),col=new Float32Array(nv*3);for(var i=0;i<nv;i++){for(var a=0;a<3;a++){p[i*3+a]=mn[a]+q[i*3+a]/65535*(mx[a]-mn[a]);col[i*3+a]=SVPAL[cl[i]][a]}}
var g=new T.BufferGeometry();g.setAttribute("position",new T.BufferAttribute(p,3));g.setAttribute("normal",new T.BufferAttribute(nr,3,true));g.setAttribute("color",new T.BufferAttribute(col,3));g.setIndex(new T.BufferAttribute(ix,1));
var m=mesh(g,SVMAT,0,0,0,SV);m.raycast=function(){}}
fetch("media/saturnv.txt").then(function(r){if(!r.ok)throw 0;return r.text()}).then(function(s){s=atob(s.trim());var u=new Uint8Array(s.length);for(var i=0;i<s.length;i++)u[i]=s.charCodeAt(i);var b=u.buffer;
if(u[0]===0x1f&&u[1]===0x8b){if(!window.DecompressionStream)throw 0;return new Response(new Blob([b]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer()}return b}).then(saturnBuild).catch(function(){});
