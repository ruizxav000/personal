// ---------- modeling helpers ----------
function v2(p){return new T.Vector2(p[0],p[1])}
// rounded rectangle as a Shape (or a Path for holes), true circular corners
function rrShape(C,w,h,r,cx,cy){cx=cx||0;cy=cy||0;var s=new C(),W=w/2-r,H=h/2-r;s.moveTo(cx-W,cy-H-r);s.lineTo(cx+W,cy-H-r);s.absarc(cx+W,cy-H,r,-PI/2,0,false);s.lineTo(cx+W+r,cy+H);s.absarc(cx+W,cy+H,r,0,PI/2,false);
s.lineTo(cx-W,cy+H+r);s.absarc(cx-W,cy+H,r,PI/2,PI,false);s.lineTo(cx-W-r,cy-H);s.absarc(cx-W,cy-H,r,PI,1.5*PI,false);return s}
// a flat strap swept along points P, lying on the surface whose normals are N
function ribbonGeo(P,N,w,th){var pos=[],uv=[],idx=[],n=P.length,t=new T.Vector3(),s=new T.Vector3(),L=0;
for(var i=0;i<n;i++){t.subVectors(P[Math.min(i+1,n-1)],P[Math.max(i-1,0)]).normalize();s.crossVectors(t,N[i]).normalize();if(i)L+=P[i].distanceTo(P[i-1]);
[[w/2,th],[-w/2,th],[-w/2,0],[w/2,0]].forEach(function(q,k){var v=P[i].clone().addScaledVector(s,q[0]).addScaledVector(N[i],q[1]);pos.push(v.x,v.y,v.z);uv.push(L,k/3)})}
for(var i=0;i<n-1;i++)for(var k=0;k<4;k++){var a=i*4+k,b=i*4+(k+1)%4;idx.push(a,a+4,b,b,a+4,b+4)}
var g=new T.BufferGeometry();g.setAttribute("position",new T.Float32BufferAttribute(pos,3));g.setAttribute("uv",new T.Float32BufferAttribute(uv,2));g.setIndex(idx);g.computeVertexNormals();return g}
// cylinder with grip flutes around its side
function knurlGeo(r,h,n,dep){var g=new T.CylinderGeometry(r,r,h,n*4,1),p=g.attributes.position;
for(var i=0;i<p.count;i++){var x=p.getX(i),z=p.getZ(i);if(Math.hypot(x,z)>r*.6){var k=1-dep*(.5+.5*Math.cos(Math.atan2(x,z)*n));p.setX(i,x*k);p.setZ(i,z*k)}}g.computeVertexNormals();return g}

// ---------- turntable ----------
// modeled on a Sony PS-LX deck: satin top plate with printed legends over a matte body, die-cast platter with a
// lathe-turned rim and diamond-cut chamfers, rubber mat, straight aluminum arm on a gimbal, offset headshell with
// cartridge, stylus and lead wires, arm rest with its clip flipped open, smoked acrylic dust cover propped open
var tt=grp("tt",-.1,.75,0),Sx=-.045,Sz=-.005,LED;
/*VINYL*/
(function(){
var W=.43,D=.367,TOP=.07,
BODY=M(0x151618,.74,0,{roughnessMap:noiseTex("#d8d8d8",.1,3000,256,1)}),SAT=M(0x1a1b1e,.42,.15),RUB=M(0x0b0b0c,.95),
ALU=M(0xd3d6da,.36,1),CHR=M(0xeef0f2,.07,1),GLB=M(0x0c0c0e,.2,0,{clearcoat:1,clearcoatRoughness:.06},1);
// top plate: fine hairline brushing, a little dust, white legends
function topArt(){var CW=MOB?1024:2048,CH=Math.round(CW*D/W),k=CW/W,C=[cvs(CW,CH),cvs(CW,CH)],x=C[0].getContext("2d"),r=C[1].getContext("2d");
x.fillStyle="#18191c";x.fillRect(0,0,CW,CH);r.fillStyle=gray(.4);r.fillRect(0,0,CW,CH);
for(var i=0;i<CH;i++){x.fillStyle="rgba(255,255,255,"+R()*.02+")";x.fillRect(0,i,CW,1);r.fillStyle=gray(.3+R()*.2,.6);r.fillRect(0,i,CW,1)}
for(var i=0;i<1600;i++){r.fillStyle=gray(.22+R()*.36,.5);r.fillRect(R()*CW,R()*CH,30+R()*300,1)}
for(var i=0;i<CW*CH/2500;i++){var s=.5+R()*1.5;x.fillStyle="rgba(205,198,186,"+R()*.3+")";x.fillRect(R()*CW,R()*CH,s,s)}
function P(px,pz){return[(px/W+.5)*CW,(pz/D+.5)*CH]}
function txt(s,px,pz,mm,font,al,ls){var p=P(px,pz),sz=mm*.001*k;x.font=font.replace("#",Math.round(sz)+"px");x.textAlign=al||"center";x.textBaseline="middle";try{x.letterSpacing=(ls||0)*sz+"px"}catch(e){}x.fillText(s,p[0],p[1]);try{x.letterSpacing="0px"}catch(e){}}
var SANS="600 # 'Helvetica Neue', Helvetica, Arial, sans-serif";
x.fillStyle="#e4e4e6";txt("SONY",-.15,.163,7,"700 # Georgia, 'Times New Roman', serif","center",.14);
x.fillStyle="#c9cacd";txt("POWER",-.193,.149,2.3,SANS);
[["SPEED",.03],["SIZE",.075],["LIFT",.12],["STOP",.152],["START",.184]].forEach(function(s){txt(s[0],s[1],.149,2.4,SANS,"center",.08)});
[["33",.023],["45",.037],["30",.068],["17",.082]].forEach(function(s){txt(s[0],s[1],.176,1.9,SANS)});
x.fillStyle="#050506";[.03,.075].forEach(function(sx){var a=P(sx-.0085,.1612),b=P(sx+.0085,.1648);x.beginPath();if(x.roundRect)x.roundRect(a[0],a[1],b[0]-a[0],b[1]-a[1],(b[1]-a[1])/2);else x.rect(a[0],a[1],b[0]-a[0],b[1]-a[1]);x.fill()});
x.fillStyle="#7f8083";txt("STEREO TURNTABLE SYSTEM",-.205,-.173,2.1,SANS,"left",.12);txt("FULLY AUTOMATIC  ·  BELT DRIVE",.205,-.173,2,SANS,"right",.12);
var t0=ctex(C[0]),t1=ctex(C[1],1);[t0,t1].forEach(function(t){t.repeat.set(1/W,1/D);t.offset.set(.5,.5)});return[t0,t1]}
var TA=topArt(),TOPM=M(0xffffff,1,0,{map:TA[0],roughnessMap:TA[1],clearcoat:.2,clearcoatRoughness:.4},1);
rbox(W,.012,D,.016,.0025,[TOPM,SAT],0,TOP-.006,0,tt);
rbox(W-.005,.052,D-.005,.014,.004,BODY,0,.034,0,tt);
[[-.185,.15],[.185,.15],[-.185,-.15],[.185,-.15]].forEach(function(p){cyl(.02,.022,.006,RUB,p[0],.003,p[1],tt,28);cyl(.023,.023,.003,SAT,p[0],.0075,p[1],tt,28)});
// flush round buttons in a dark gap, slide switches, power button ringed by its LED
function btn(px,pz,r){mesh(new T.LatheGeometry([[r,TOP],[r,TOP+.0021],[r*.82,TOP+.003],[0,TOP+.0033]].map(v2),40),SAT,px,0,pz,tt);
var g=mesh(new T.RingGeometry(r+.0002,r+.0011,40),M(0x040405,.7),px,TOP+.0002,pz,tt);g.rotation.x=-PI/2;g.castShadow=false}
[.12,.152,.184].forEach(function(x){btn(x,.163,.0072)});btn(-.193,.163,.0058);
LED=M(0x2a6b47,.45,0,{emissive:new T.Color(0x3cff8a),emissiveIntensity:.6});var led=mesh(new T.TorusGeometry(.0069,.00065,8,40),LED,-.193,TOP+.0005,.163,tt);led.rotation.x=PI/2;led.castShadow=false;
[.0243,.0693].forEach(function(x){rbox(.0048,.0034,.0042,.001,.0006,SAT,x,TOP+.0017,.163,tt)});
// platter: lathe-turned rim between two diamond-cut chamfers, rubber mat on top
var plt=grp(0,Sx,0,Sz,tt);
function latheMarks(){var c=cvs(4,256),x=c.getContext("2d");for(var i=0;i<256;i++){x.fillStyle=gray(.25+R()*.3);x.fillRect(0,i,4,1)}var t=ctex(c,1);t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(1,3);return t}
var LMK=latheMarks();mesh(new T.CylinderGeometry(.15,.15,.0092,160,1,true),M(0xd4d7da,1,1,{roughnessMap:LMK,bumpMap:LMK,bumpScale:.00004}),0,.0777,0,plt);
mesh(new T.LatheGeometry([[.15,.0823],[.1479,.0838]].map(v2),160),CHR,0,0,0,plt);mesh(new T.LatheGeometry([[.1482,.0712],[.15,.0731]].map(v2),160),CHR,0,0,0,plt);
var ptop=mesh(new T.RingGeometry(.1454,.148,160),M(0xb4b8bc,.32,1),0,.0838,0,plt);ptop.rotation.x=-PI/2;
var pbot=mesh(new T.CircleGeometry(.149,64),M(0x0d0d0e,.8),0,.0712,0,plt);pbot.rotation.x=PI/2;
cyl(.1454,.1454,.0028,RUB,0,.0852,0,plt,128);
mesh(new T.LatheGeometry([[.0036,.0866],[.0036,.0976],[.0031,.1003],[.0018,.1015],[0,.1018]].map(v2),32),CHR,Sx,0,Sz,tt);
// tonearm: stepped boss with a chrome trim ring, bearing post, gimbal yoke, aluminum tube, knurled counterweight
var PV=[.158,-.108],AY=.1055,LT=.205,HX=.042,HY=.017,OFF=.38;
mesh(new T.LatheGeometry([[.0345,TOP],[.0345,TOP+.0034],[.033,TOP+.005],[.0235,TOP+.005],[.0225,TOP+.0062],[.0145,TOP+.0064],[.0135,AY-.0125],[.0122,AY-.0112],[0,AY-.0112]].map(v2),64),SAT,PV[0],0,PV[1],tt);
var trim=mesh(new T.TorusGeometry(.0338,.0007,6,64),CHR,PV[0],TOP+.0043,PV[1],tt);trim.rotation.x=PI/2;
// place the stylus on the record: the headshell turns OFF toward the spindle, which way is whichever tracks the groove
function solve(s){var bx=LT+HX*Math.cos(s*OFF),bz=-HX*Math.sin(s*OFF),Le=Math.hypot(bx,bz),al=Math.atan2(-bz,bx),dx=Sx-PV[0],dz=Sz-PV[1],Dd=Math.hypot(dx,dz),rr=.112,
a=(Le*Le-rr*rr+Dd*Dd)/(2*Dd),h=Math.sqrt(Math.max(0,Le*Le-a*a)),mx=PV[0]+dx*a/Dd,mz=PV[1]+dz*a/Dd,c1=[mx+h*dz/Dd,mz-h*dx/Dd],c2=[mx-h*dz/Dd,mz+h*dx/Dd],tg=c1[1]>c2[1]?c1:c2,
th=Math.atan2(-(tg[1]-PV[1]),tg[0]-PV[0])-al,tn=Math.atan2(-(tg[1]-Sz),tg[0]-Sx)+PI/2;return{th:th,err:Math.abs(Math.sin(th+s*OFF-tn))}}
var A1=solve(1),A2=solve(-1),AS=A1.err<A2.err?1:-1,AT=(AS>0?A1:A2).th;
var arm=grp(0,PV[0],AY,PV[1],tt);arm.rotation.y=AT;
cyl(.0118,.0118,.009,SAT,0,-.0075,0,arm,40);[-1,1].forEach(function(s){rbox(.016,.016,.0022,.002,.0005,SAT,0,.001,s*.0082,arm)});
var axl=cyl(.0021,.0021,.0215,CHR,0,.001,0,arm,16);axl.rotation.x=PI/2;
var tb=cyl(.0036,.0036,LT+.062,ALU,(LT-.062)/2,0,0,arm,20);tb.rotation.z=PI/2;
function knurlTex(){var c=cvs(256,8),x=c.getContext("2d");for(var i=0;i<256;i++){x.fillStyle=gray(i%4<2?.85:.2);x.fillRect(i,0,1,8)}return ctex(c,1)}
var cwt=cyl(.0158,.0158,.03,SAT,-.052,0,0,arm,48);cwt.rotation.z=PI/2;
var knr=mesh(knurlGeo(.0161,.008,40,.04),M(0x26272a,.45,.5),-.043,0,0,arm);knr.rotation.z=PI/2;
var cap=cyl(.0115,.0125,.0022,CHR,-.068,0,0,arm,40);cap.rotation.z=PI/2;var cr2=mesh(new T.TorusGeometry(.0158,.0006,6,48),CHR,-.0372,0,0,arm);cr2.rotation.y=PI/2;
// headshell: collar, tapered gloss shell with a finger lift, cartridge, white stylus grip, cantilever, four lead wires
var spz=(Sx-PV[0])*Math.sin(AT)+(Sz-PV[1])*Math.cos(AT),FS=spz>0?-1:1;
var hs=grp(0,LT,0,0,arm);hs.rotation.y=AS*OFF;
var col=cyl(.0047,.0047,.013,SAT,-.003,0,0,hs,24);col.rotation.z=PI/2;var lr=mesh(new T.TorusGeometry(.0047,.0006,6,24),CHR,-.0095,0,0,hs);lr.rotation.y=PI/2;
var hp=new T.Shape();hp.moveTo(0,-.0074);hp.lineTo(.046,-.0094);hp.quadraticCurveTo(.051,-.0094,.051,-.005);hp.lineTo(.051,.005);hp.quadraticCurveTo(.051,.0094,.046,.0094);hp.lineTo(0,.0074);hp.lineTo(0,-.0074);
var hg=new T.ExtrudeGeometry(hp,{depth:.0024,bevelEnabled:true,bevelThickness:.0006,bevelSize:.0006,bevelSegments:2,curveSegments:6});hg.rotateX(PI/2);mesh(hg,GLB,0,-.0013,0,hs);
mesh(new T.TubeGeometry(new T.CatmullRomCurve3([[.03,-.0025,FS*.008],[.036,-.0016,FS*.017],[.039,.0012,FS*.024],[.04,.0042,FS*.027]].map(function(a){return new T.Vector3().fromArray(a)})),12,.0011,6),GLB,0,0,0,hs);
rbox(.021,.0098,.0165,.0015,.0008,GLB,.031,-.0093,0,hs);rbox(.0088,.0026,.011,.001,.0005,M(0xdcd8cf,.45),.0385,-.0155,0,hs);
var cnt=stem([.0378,-.0163,0],[.042,-.0168,0],.00035,ALU,hs);cnt.castShadow=false;var tip=cyl(.00025,.0001,.0006,M(0xdfe8ee,.1,1),.042,-.0171,0,hs,6);tip.castShadow=false;
[[0xc8302a,-.0035,-.0072],[0x2f8a3c,.0035,-.0072],[0x2a54c8,-.0035,-.0118],[0xe8e8e8,.0035,-.0118]].forEach(function(w){var m=mesh(new T.TubeGeometry(new T.CatmullRomCurve3([new T.Vector3(.0205,w[2],w[1]),new T.Vector3(.0168,w[2]+.0018,w[1]*1.3),new T.Vector3(.0125,-.0045,w[1]*.8)]),8,.00042,5),M(w[0],.5),0,0,0,hs);m.castShadow=false});
// arm rest where the arm parks, rubber cradle, chrome clip flipped open
var RP=[.178,.03],rest=grp(0,RP[0],0,RP[1],tt);rest.rotation.y=Math.atan2(-(RP[1]-PV[1]),RP[0]-PV[0]);
cyl(.0046,.0052,AY-.01-TOP,SAT,0,TOP+(AY-.01-TOP)/2,0,rest,20);rbox(.013,.003,.012,.001,.0006,RUB,0,AY-.0085,0,rest);
[-1,1].forEach(function(s){rbox(.013,.0068,.0022,.001,.0005,RUB,0,AY-.0049,s*.0052,rest)});
var clip=grp(0,0,AY-.0062,-.0064,rest);clip.rotation.x=-2.4;var cl=mesh(new T.TorusGeometry(.0058,.0006,6,20,PI),CHR,0,.0002,0,clip);cl.rotation.y=PI/2;cl.castShadow=false;
// smoked acrylic dust cover, closed, on two hinges
var lid=grp(0,0,.128,-.1835,tt);
var AC=M(0xd9e1e6,.03,0,{transparent:true,opacity:.17,depthWrite:false,clearcoat:1,clearcoatRoughness:.04},1),ACE=M(0xb4c4c8,.06,0,{transparent:true,opacity:.75,depthWrite:false},1);
[[.432,.003,.368,0,-.0015,.184],[.003,.058,.368,-.2145,-.029,.184],[.003,.058,.368,.2145,-.029,.184],[.432,.058,.003,0,-.029,.3665],[.432,.058,.003,0,-.029,.0015]].forEach(function(p){box(p[0],p[1],p[2],AC,p[3],p[4],p[5],lid).castShadow=false});
[[.432,.003,.003,0,-.0575,.3665],[.003,.003,.368,-.2145,-.0575,.184],[.003,.003,.368,.2145,-.0575,.184],[.432,.003,.003,0,-.0015,.3665],[.432,.003,.003,0,-.0575,.0015],[.003,.058,.003,-.2145,-.029,.3665],[.003,.058,.003,.2145,-.029,.3665]].forEach(function(p){box(p[0],p[1],p[2],ACE,p[3],p[4],p[5],lid).castShadow=false});
[-.13,.13].forEach(function(x){rbox(.024,.05,.008,.002,.001,SAT,x,.095,-.1895,tt);var kn=cyl(.0048,.0048,.026,SAT,x,.12,-.19,tt,16);kn.rotation.z=PI/2});
})();
