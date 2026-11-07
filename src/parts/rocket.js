// a desk model of the Ranger from Interstellar (where the hourglass used to stand), hovering over a walnut maglev base
// like the magnetic floaters people keep on their desks: it bobs and slowly turns on its own.
// Built feature by feature from photos of a Ranger model:
//  - top deck: the cockpit's cracked, web-like window cluster (irregular panes with grey rims, seams running between
//    them), panel shading, the fine grey mesh band down both sides and over the nose, a dotted decal plate and a
//    three-hole block near the back
//  - a black shield-shaped frame under the deck, with a raised louvered band across the back
//  - black chevron wings: from the top of the rear housing down past the belly, then up into spikes beside the nose
//  - a white nose tongue with panel lines ending in a black tip with holes
//  - the tall rear housing with rounded shoulders, black stepped pattern and panel lines on its sides
//  - the rear face: hatch plate with a link-by-link chrome chain ring around a spoked door, four recessed bolts with
//    gold pins and caution decals; hexagonal thruster housings with recessed intakes and slots either side; black
//    bumpers and a ribbed grille below
//  - a dark lower pod with three-hole side panels, and a dark belly tapering toward the nose
// Click it for the Twin Paradox card; "Launch" lights the thrusters, lifts it nose-up and opens the experience.
var rk=grp("rocket",.36,.39,.02),RKSG=grp(0,0,0,0,rk),RKB=grp(0,0,.074,0,rk),RKF,RK={t0:0};
(function(){
RKB.scale.setScalar(.92);
var L=.2,HW=.046,WH=M(0xecebe7,.42),DK=M(0x2b2c2f,.55),BL=M(0x18191b,.42),BL2=M(0x222326,.36),SV=M(0xf6f6f8,.22,.8),GD=M(0xc9a35a,.28,1),
ST=M(0x1d1e20,.5),GR=M(0x4a4b4f,.6),HO=M(0x050505,.85);
function crown(u){return .024-.017*u*u}
var O=[[0,.66],[.1,1],[.52,.95],[.84,.56],[1,.24]];
function hw(u){for(var i=1;i<O.length;i++)if(u<=O[i][0]){var a=O[i-1],b=O[i],k=(u-a[0])/(b[0]-a[0]);return HW*(a[1]+(b[1]-a[1])*k)}return HW*O[O.length-1][1]}
// extrude a profile drawn in the rear view (x = across the ship, y = up) back along the ship from xf toward the rear
function rearX(shape,depth,mat,xf,bev){var g=new T.ExtrudeGeometry(shape,{depth:depth,bevelEnabled:!!bev,bevelThickness:bev||0,bevelSize:bev||0,bevelSegments:2,curveSegments:10});
g.rotateY(-PI/2);return mesh(g,mat,xf,0,0,RKB)}
function rshape(w,h,rt,rb,cx,cy){var s=new T.Shape(),x0=cx-w/2,x1=cx+w/2,y0=cy-h/2,y1=cy+h/2;
s.moveTo(x0+rb,y0);s.lineTo(x1-rb,y0);s.quadraticCurveTo(x1,y0,x1,y0+rb);s.lineTo(x1,y1-rt);s.quadraticCurveTo(x1,y1,x1-rt,y1);
s.lineTo(x0+rt,y1);s.quadraticCurveTo(x0,y1,x0,y1-rt);s.lineTo(x0,y0+rb);s.quadraticCurveTo(x0,y0,x0+rb,y0);return s}
function poly(pts){var s=new T.Shape();pts.forEach(function(p,i){i?s.lineTo(p[0],p[1]):s.moveTo(p[0],p[1])});s.closePath();return s}

// ================= deck skin =================
var CW=2048,CH=1024,c=cvs(CW,CH),x=c.getContext("2d");
x.fillStyle="#ecebe7";x.fillRect(0,0,CW,CH);
function grid(x0,y0,w,h){x.save();x.beginPath();x.rect(x0,y0,w,h);x.clip();x.fillStyle="#dddcd8";x.fillRect(x0,y0,w,h);
x.strokeStyle="rgba(110,110,108,.42)";x.lineWidth=1.2;for(var gx=x0;gx<x0+w;gx+=7){x.beginPath();x.moveTo(gx,y0);x.lineTo(gx,y0+h);x.stroke()}
for(var gy=y0;gy<y0+h;gy+=7){x.beginPath();x.moveTo(x0,gy);x.lineTo(x0+w,gy);x.stroke()}x.restore()}
grid(0,0,CW,130);grid(0,CH-130,CW,130);grid(1500,0,548,CH);// mesh bands down both sides and over the nose
x.strokeStyle="#8d8d8a";x.lineWidth=2.4;x.beginPath();x.moveTo(0,130);x.lineTo(1500,130);x.lineTo(1500,CH-130);x.lineTo(0,CH-130);x.stroke();
// panel seams outside the cockpit
x.lineWidth=2;[[60,130,60,CH-130],[300,130,300,CH-130],[300,330,150,330],[300,694,150,694],[1320,130,1360,CH-130],[1500,512,2048,512],[1700,0,1700,CH],[1860,200,2048,200],[1860,824,2048,824],[1860,200,1860,824]].forEach(function(l){x.beginPath();x.moveTo(l[0],l[1]);x.lineTo(l[2],l[3]);x.stroke()});
// cockpit: a web of panels (Voronoi cells inside an ellipse), most of the inner ones glazed
var ECX=900,ECY=512,ERX=560,ERY=330,pts=[],tries=0;
while(pts.length<48&&tries<6000){tries++;var px=ECX+(R()*2-1)*ERX,py=ECY+(R()*2-1)*ERY,dx=(px-ECX)/ERX,dy=(py-ECY)/ERY;if(dx*dx+dy*dy>1)continue;
var ok=true;for(var i=0;i<pts.length;i++){var ex=pts[i][0]-px,ey=pts[i][1]-py;if(ex*ex+ey*ey<74*74){ok=false;break}}if(ok)pts.push([px,py])}
function clip(pl,a,b,cc){var out=[];for(var i=0;i<pl.length;i++){var P=pl[i],Q=pl[(i+1)%pl.length],dP=a*P[0]+b*P[1]-cc,dQ=a*Q[0]+b*Q[1]-cc;
if(dP<=0)out.push(P);if(dP*dQ<0){var t=dP/(dP-dQ);out.push([P[0]+t*(Q[0]-P[0]),P[1]+t*(Q[1]-P[1])])}}return out}
var cells=pts.map(function(p,i){var pl=[[ECX-ERX-60,ECY-ERY-60],[ECX+ERX+60,ECY-ERY-60],[ECX+ERX+60,ECY+ERY+60],[ECX-ERX-60,ECY+ERY+60]];
pts.forEach(function(q,j){if(i===j)return;var a=q[0]-p[0],b=q[1]-p[1];pl=clip(pl,a,b,(q[0]*q[0]+q[1]*q[1]-p[0]*p[0]-p[1]*p[1])/2)});return pl});
x.save();x.beginPath();x.ellipse(ECX,ECY,ERX,ERY,0,0,PI*2);x.clip();
x.fillStyle="#f3f2ee";x.fillRect(ECX-ERX,ECY-ERY,2*ERX,2*ERY);
cells.forEach(function(pl){var t=235+Math.round(R()*14);x.fillStyle="rgb("+t+","+t+","+(t-3)+")";x.beginPath();pl.forEach(function(p,i){i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1])});x.closePath();x.fill()});
x.strokeStyle="#7f7f7c";x.lineWidth=2.6;cells.forEach(function(pl){x.beginPath();pl.forEach(function(p,i){i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1])});x.closePath();x.stroke()});
cells.forEach(function(pl,i){var cx=0,cy=0;pl.forEach(function(p){cx+=p[0];cy+=p[1]});cx/=pl.length;cy/=pl.length;
var dx=(cx-ECX)/ERX,dy=(cy-ECY)/ERY;if(dx*dx+dy*dy>.66||R()<.3)return;var k=.5+R()*.2;
x.beginPath();pl.forEach(function(p,j){var qx=cx+(p[0]-cx)*k,qy=cy+(p[1]-cy)*k;j?x.lineTo(qx,qy):x.moveTo(qx,qy)});x.closePath();
x.fillStyle="#0e0f12";x.fill();x.strokeStyle="#a3a3a0";x.lineWidth=5;x.stroke();
x.fillStyle="rgba(120,140,170,.18)";x.beginPath();x.moveTo(cx-6,cy-10);x.lineTo(cx+10,cy-14);x.lineTo(cx+2,cy-4);x.closePath();x.fill()});// a glint in each pane
x.restore();
x.strokeStyle="#77777a";x.lineWidth=3.4;x.beginPath();x.ellipse(ECX,ECY,ERX,ERY,0,0,PI*2);x.stroke();// cockpit seam
x.lineWidth=2;x.beginPath();x.ellipse(ECX,ECY,ERX+30,ERY+26,0,0,PI*2);x.stroke();
// two small gold-framed panes low on the cockpit
[[1130,770],[1168,772]].forEach(function(p){x.fillStyle="#141414";x.fillRect(p[0],p[1],30,26);x.strokeStyle="#b08a3a";x.lineWidth=4;x.strokeRect(p[0],p[1],30,26)});
// dotted decal plate and a three-hole block near the back
x.fillStyle="#cfcfcc";x.fillRect(210,250,74,74);x.strokeStyle="#8d8d8a";x.lineWidth=2;x.strokeRect(210,250,74,74);
x.fillStyle="#6a6a68";for(var di=0;di<4;di++)for(var dj=0;dj<4;dj++){x.beginPath();x.arc(222+di*17,262+dj*17,4,0,PI*2);x.fill()}
x.fillStyle="#3a3b3e";x.beginPath();x.moveTo(190,690);x.lineTo(330,676);x.lineTo(336,744);x.lineTo(196,756);x.closePath();x.fill();
x.fillStyle="#060606";[[222,716,15],[262,712,18],[304,708,15]].forEach(function(h){x.beginPath();x.arc(h[0],h[1],h[2],0,PI*2);x.fill()});
var DTX=ctex(c);

// ================= deck =================
var NU=40,NV=20,P=[],UV=[],TOP=[],BOT=[];
function vtx(px,py,pz,u,v){P.push(px,py,pz);UV.push(u,v);return P.length/3-1}
for(var a=0;a<=NU;a++){var u=a/NU,X=u*L-L/2,w=hw(u),rt=[],rb=[];
for(var b=0;b<=NV;b++){var v=b/NV*2-1;rt.push(vtx(X,.006+crown(u)*(1-.62*v*v),v*w,u,(v+1)/2));rb.push(vtx(X,0,v*w,u,(v+1)/2))}TOP.push(rt);BOT.push(rb)}
var gT=[],gS=[];
for(a=0;a<NU;a++)for(b=0;b<NV;b++){var p0=TOP[a][b],p1=TOP[a+1][b],p2=TOP[a+1][b+1],p3=TOP[a][b+1];gT.push(p0,p3,p1,p1,p3,p2);
p0=BOT[a][b];p1=BOT[a+1][b];p2=BOT[a+1][b+1];p3=BOT[a][b+1];gS.push(p0,p1,p3,p1,p2,p3)}
for(a=0;a<NU;a++)[0,NV].forEach(function(b,k){var p0=TOP[a][b],p1=TOP[a+1][b],p2=BOT[a+1][b],p3=BOT[a][b];k?gS.push(p0,p3,p1,p1,p3,p2):gS.push(p0,p1,p3,p1,p2,p3)});
for(b=0;b<NV;b++)[0,NU].forEach(function(a,k){var p0=TOP[a][b],p1=TOP[a][b+1],p2=BOT[a][b+1],p3=BOT[a][b];k?gS.push(p0,p3,p1,p1,p3,p2):gS.push(p0,p1,p3,p1,p2,p3)});
var G=new T.BufferGeometry();G.setAttribute("position",new T.Float32BufferAttribute(P,3));G.setAttribute("uv",new T.Float32BufferAttribute(UV,2));
G.setIndex(gT.concat(gS));G.addGroup(0,gT.length,0);G.addGroup(gT.length,gS.length,1);G.computeVertexNormals();
mesh(G,[M(0xffffff,.4,0,{map:DTX}),WH],0,0,0,RKB);

// ================= black shield frame under the deck =================
var FO=[[-.04,.76],[.08,1.0],[.54,.94],[.86,.52],[.97,.22]],fs=new T.Shape();
FO.forEach(function(p,i){var px=p[0]*L-L/2,py=p[1]*HW;i?fs.lineTo(px,py):fs.moveTo(px,py)});for(var f=FO.length-1;f>=0;f--)fs.lineTo(FO[f][0]*L-L/2,-FO[f][1]*HW);
var fg=new T.ExtrudeGeometry(fs,{depth:.0045,bevelEnabled:true,bevelThickness:.0008,bevelSize:.0008,bevelSegments:2});fg.rotateX(-PI/2);mesh(fg,BL2,0,.0005,0,RKB).scale.set(1,1,.92);// tucked under the deck edge: only the louvered band and wings read as the black frame
// louvered band across the back, raised and overhanging the rear housing
var lc=cvs(128,512),lx=lc.getContext("2d");lx.fillStyle="#1b1c1e";lx.fillRect(0,0,128,512);
for(var s2=3;s2<128;s2+=9){lx.fillStyle="#38393d";lx.fillRect(s2,8,4,496);lx.fillStyle="#0c0c0d";lx.fillRect(s2+4,8,2,496)}
var LM=M(0xffffff,.45,0,{map:ctex(lc)});
var lv=box(.036,.0042,.09,[BL,BL,LM,BL,BL,BL],-.087,.0298,0,RKB);lv.rotation.z=-.05;// lies on top of the hull, rising slightly toward the back

// ================= chevron wings =================
[-1,1].forEach(function(s){
var W=poly([[-.094,.038],[-.006,-.013],[.062,.01],[.11,.02],[.058,.0015],[-.01,-.026],[-.1,.026]]);
var g=new T.ExtrudeGeometry(W,{depth:.0034,bevelEnabled:true,bevelThickness:.0008,bevelSize:.0008,bevelSegments:2});g.translate(0,0,-.0017);
var m=mesh(g,BL2,0,0,s*HW*.98,RKB);m.rotation.x=-s*.1});

// ================= nose tongue and tip =================
var ng=new T.ExtrudeGeometry(poly([[.094,.0115],[.131,.0072],[.131,-.0072],[.094,-.0115]]),{depth:.0045,bevelEnabled:false});ng.rotateX(-PI/2);
var nc=cvs(256,128),nx=nc.getContext("2d");nx.fillStyle="#dcdbd7";nx.fillRect(0,0,256,128);nx.strokeStyle="rgba(110,110,108,.5)";nx.lineWidth=1;
for(var q=0;q<256;q+=6){nx.beginPath();nx.moveTo(q,0);nx.lineTo(q,128);nx.stroke()}for(q=0;q<128;q+=6){nx.beginPath();nx.moveTo(0,q);nx.lineTo(256,q);nx.stroke()}
nx.strokeStyle="#7f7f7c";nx.lineWidth=2.5;nx.strokeRect(30,30,120,68);nx.beginPath();nx.moveTo(150,64);nx.lineTo(256,64);nx.stroke();
var NT=ctex(nc);NT.repeat.set(1/.037,1/.023);NT.offset.set(-.094/.037,.5);
mesh(ng,[M(0xffffff,.45,0,{map:NT}),WH],0,.0035,0,RKB);
var tip=box(.008,.006,.0155,BL,.1345,.006,0,RKB);
[-.004,0,.004].forEach(function(z,i){var h=mesh(new T.CircleGeometry(i===1?.0016:.0012,14),HO,.1386,.006,z,RKB);h.rotation.y=PI/2;
var t2=mesh(new T.CircleGeometry(.0011,12),HO,.1345,.0091,z,RKB);t2.rotation.x=-PI/2});

// ================= rear section (matched to the close-up of the back) =================
var RX=-.106;// rear face of the hull
// hull rear: wide, rounded shoulders, two-tone sides; the last few mm form a shell with the two thruster bays cut in
var BAY=[-1,1].map(function(s){return {z:s*.026,y:.003}});
function bayShape(b,grow){var g=grow||0;return rshape(.025+g,.019+g,.005+g/2,.005+g/2,b.z,b.y)}
rearX(rshape(.084,.044,.012,.003,0,.006),.043,WH,-.056,0);
var shell=rshape(.084,.044,.012,.003,0,.006);BAY.forEach(function(b){var h=new T.Path();bayShape(b).getPoints(6).forEach(function(p,i){i?h.lineTo(p.x,p.y):h.moveTo(p.x,p.y)});shell.holes.push(h)});
rearX(shell,.007,WH,RX+.007,0);
BAY.forEach(function(b){rearX(bayShape(b),.001,M(0x101012,.7),RX+.0068,0)});// bay floors
// sides: white over dark grey, black panel lines, the square outline, two big and two small holes
var sc=cvs(512,288),sx=sc.getContext("2d");sx.fillStyle="#ecebe7";sx.fillRect(0,0,512,288);
sx.fillStyle="#3a3b3f";sx.beginPath();sx.moveTo(0,288);sx.lineTo(0,150);sx.lineTo(250,150);sx.lineTo(250,170);sx.lineTo(512,170);sx.lineTo(512,288);sx.closePath();sx.fill();
sx.fillStyle="#1c1d1f";sx.fillRect(14,162,214,96);
sx.fillStyle="#050505";[[60,206,23],[112,206,23]].forEach(function(h){sx.beginPath();sx.arc(h[0],h[1],h[2],0,PI*2);sx.fill()});
[[158,214,10],[184,214,10]].forEach(function(h){sx.beginPath();sx.arc(h[0],h[1],h[2],0,PI*2);sx.fill()});
sx.strokeStyle="#141414";sx.lineWidth=4;sx.strokeRect(78,44,70,62);
[[[200,0],[200,58],[226,58],[226,150]],[[300,0],[300,76],[270,76],[270,150]],[[360,0],[360,170]],[[0,124],[60,124]],[[420,40],[512,28]],[[440,170],[440,110],[512,110]]].forEach(function(l){sx.beginPath();l.forEach(function(p,i){i?sx.lineTo(p[0],p[1]):sx.moveTo(p[0],p[1])});sx.stroke()});
sx.strokeStyle="rgba(0,0,0,.12)";sx.lineWidth=1;for(var w2=0;w2<30;w2++){var wx=R()*512,wy=R()*150;sx.beginPath();sx.moveTo(wx,wy);sx.lineTo(wx+R()*24-12,wy+R()*6);sx.stroke()}// light wear
var SM=M(0xffffff,.42,0,{map:ctex(sc)});
[-1,1].forEach(function(s){var pl=mesh(new T.PlaneGeometry(.05,.028),SM,RX+.025,-.002,s*.0421,RKB);pl.rotation.y=s>0?0:PI});
// thick black loops around each bay, heavier along the bottom
BAY.forEach(function(b){var o=rshape(.033,.031,.008,.009,b.z,b.y-.003),h=new T.Path();bayShape(b).getPoints(6).forEach(function(p,i){i?h.lineTo(p.x,p.y):h.moveTo(p.x,p.y)});o.holes.push(h);
rearX(o,.006,BL2,RX+.003,.001)});
// thruster nozzles: black chamfered octagons with a dark throat and a grey slot bar just below centre
function hex(w,h,c){return [[-w/2+c,-h/2],[w/2-c,-h/2],[w/2,-h/2+c],[w/2,h/2-c],[w/2-c,h/2],[-w/2+c,h/2],[-w/2,h/2-c],[-w/2,-h/2+c]]}
BAY.forEach(function(b){var oc=poly(hex(.019,.016,.0055).map(function(p){return [p[0]+b.z,p[1]+b.y]})),hl=new T.Path();
hex(.0125,.0095,.0035).forEach(function(p,i){i?hl.lineTo(p[0]+b.z,p[1]+b.y):hl.moveTo(p[0]+b.z,p[1]+b.y)});hl.closePath();oc.holes.push(hl);
rearX(oc,.009,BL,RX+.007,.0008);
rearX(poly(hex(.0125,.0095,.0035).map(function(p){return [p[0]+b.z,p[1]+b.y]})),.001,M(0x060607,.8),RX+.0035,0);
box(.0022,.0021,.0078,M(0xb9b9bd,.3,.8),RX-.0004,b.y-.0012,b.z,RKB)});
// the hatch: a raised square module with rounded edges between the bays
var HY=.0045,HF=RX-.0093;
rearX(rshape(.029,.031,.004,.004,0,HY),.016,WH,RX+.008,.0012);
var hc=cvs(256,272),hx=hc.getContext("2d");hx.fillStyle="#e9e8e3";hx.fillRect(0,0,256,272);
for(var sc2=0;sc2<40;sc2++){hx.strokeStyle="rgba(60,60,60,"+(.08+R()*.18)+")";hx.lineWidth=1+R()*1.5;var ax=R()*256,ay=R()*272;hx.beginPath();hx.moveTo(ax,ay);hx.lineTo(ax+R()*30-15,ay+R()*8-4);hx.stroke()}
var gg=hx.createLinearGradient(0,200,0,272);gg.addColorStop(0,"rgba(80,70,60,0)");gg.addColorStop(1,"rgba(80,70,60,.18)");hx.fillStyle=gg;hx.fillRect(0,200,256,72);// grime low down
hx.fillStyle="#a83030";hx.font="bold 11px Arial";hx.textAlign="center";hx.fillText("CAUTION",66,246);hx.fillText("CAUTION",190,246);
hx.fillStyle="#666";hx.font="7px Arial";hx.fillText("HATCH RELEASE",66,256);hx.fillText("HATCH RELEASE",190,256);
hx.fillStyle="#24408e";hx.fillRect(52,260,28,7);for(var st=0;st<5;st++){hx.fillStyle=st%2?"#fff":"#b22234";hx.fillRect(176,259+st*1.6,28,1.6)}hx.fillStyle="#3c3b6e";hx.fillRect(176,259,11,5);
var hf=mesh(new T.PlaneGeometry(.0268,.0288),M(0xffffff,.45,0,{map:ctex(hc)}),HF-.0001,HY,0,RKB);hf.rotation.y=-PI/2;
// recessed spoked door
var dc=cvs(256),dx=dc.getContext("2d");var dg=dx.createRadialGradient(128,128,4,128,128,128);dg.addColorStop(0,"#e6e6e3");dg.addColorStop(.85,"#c8c8c5");dg.addColorStop(1,"#8d8d8a");
dx.fillStyle=dg;dx.fillRect(0,0,256,256);dx.strokeStyle="#9a9a98";dx.lineWidth=6;
for(var k=0;k<8;k++){var an=k/8*PI*2+PI/8;dx.beginPath();dx.moveTo(128+Math.cos(an)*30,128+Math.sin(an)*30);dx.lineTo(128+Math.cos(an)*112,128+Math.sin(an)*112);dx.stroke()}
dx.lineWidth=4;[30,70,112].forEach(function(r){dx.beginPath();dx.arc(128,128,r,0,PI*2);dx.stroke()});
dx.strokeStyle="#7d7d7b";dx.lineWidth=5;[[80,60,128,128],[176,60,128,128],[60,170,128,128],[196,170,128,128]].forEach(function(l){dx.beginPath();dx.moveTo(l[0],l[1]);dx.lineTo(l[2],l[3]);dx.stroke()});
dx.fillStyle="#b4b4b1";dx.beginPath();dx.arc(128,128,22,0,PI*2);dx.fill();dx.fillStyle="#8a8a87";dx.fillRect(120,150,16,46);
var dsh=mesh(new T.RingGeometry(.0066,.0076,40),M(0x2a2a2c,.7),HF-.0002,HY,0,RKB);dsh.rotation.y=-PI/2;// shadow line where the door sits in
var door=mesh(new T.CircleGeometry(.0068,36),M(0xffffff,.5,.1,{map:ctex(dc)}),HF-.0003,HY,0,RKB);door.rotation.y=-PI/2;
// chunky gunmetal chain ring around the door
var GM=M(0x9a9aa0,.32,.9);
var cr=mesh(new T.TorusGeometry(.0089,.0007,8,48),M(0x55555a,.4,.9),HF-.0006,HY,0,RKB);cr.rotation.y=PI/2;
for(k=0;k<32;k++){var an2=k/32*PI*2,cy=HY+Math.sin(an2)*.0089,cz=Math.cos(an2)*.0089,lk;
if(k%2)lk=rbox(.0014,.0023,.0012,.0005,.0003,GM,HF-.0012,cy,cz,RKB);else lk=rbox(.0018,.002,.0007,.0003,.0002,GM,HF-.001,cy,cz,RKB);
lk.rotation.x=-an2;lk.castShadow=false}
// four raised round bolt buttons with slots
[[1,1],[1,-1],[-1,1],[-1,-1]].forEach(function(q){var by=HY+q[0]*.0116,bz=q[1]*.0106;
var bt=cyl(.0021,.0022,.0014,M(0xeceae6,.4),HF-.0007,by,bz,RKB,20);bt.rotation.z=PI/2;
box(.0005,.0006,.0028,M(0x9c9c99,.5),HF-.0015,by,bz,RKB)});
// slotted grille block under the hatch, set under the hull
box(.026,.0095,.032,DK,RX+.009,-.0165,0,RKB);
for(k=0;k<9;k++)box(.0012,.0066,.0015,M(0x070708,.8),RX-.0042,-.0165,-.0128+k*.0032,RKB);
// dark belly under the deck
var lb=poly([[-.06,-.001],[.05,-.001],[.0,-.011],[-.06,-.014]]);var lg=new T.ExtrudeGeometry(lb,{depth:HW*1.15,bevelEnabled:true,bevelThickness:.0015,bevelSize:.0015,bevelSegments:2});
lg.translate(0,0,-HW*.575);mesh(lg,DK,0,0,0,RKB);

// ================= maglev base =================
var WAL=M(0x5b3a22,.45,0,{clearcoat:.5,clearcoatRoughness:.25},1);
cyl(.056,.058,.016,WAL,0,.008,0,RKSG,48);cyl(.036,.036,.0012,M(0x141414,.35),0,.0166,0,RKSG,40);
var GL=new T.MeshBasicMaterial({color:0x7fb2ff,transparent:true,opacity:.25,blending:T.AdditiveBlending,depthWrite:false});
var gr=mesh(new T.RingGeometry(.026,.03,48),GL,0,.0174,0,RKSG);gr.rotation.x=-PI/2;gr.castShadow=false;RK.glow=GL;
box(.03,.007,.0015,GD,0,.008,.0575,RKSG);

// ================= thruster glow (launch only) =================
var FL=new T.MeshBasicMaterial({color:0x8fb8ff,transparent:true,opacity:0,blending:T.AdditiveBlending,depthWrite:false}),FC=new T.MeshBasicMaterial({color:0xf2f6ff,transparent:true,opacity:0,blending:T.AdditiveBlending,depthWrite:false});
RKF=grp(0,RX-.004,.002,0,RKB);
[-1,1].forEach(function(s){var zc=s*.026,fo=mesh(new T.ConeGeometry(.0065,.05,16,1,true),FL,-.025,0,zc,RKF),fi=mesh(new T.ConeGeometry(.0032,.028,12,1,true),FC,-.014,0,zc,RKF);
fo.rotation.z=fi.rotation.z=PI/2;fo.castShadow=fi.castShadow=false});
RKF.material={set opacity(v){FL.opacity=v;FC.opacity=Math.min(1,v*1.2)}};
})();
var RKY=RKB.position.y;
function rocketLaunch(){if(!RK.t0)RK.t0=performance.now()}
// always floating: a slow bob, a gentle sway and a lazy turn, like a magnetic desk levitator; a launch rides on top of that
function rocketUpdate(t){var s=t*.001,e=RK.t0?(performance.now()-RK.t0)/1000:9,fl=0,lift=0,pitch=0,sh=0;
if(e<.5){fl=e/.5;sh=.0005*fl}else if(e<2.3){fl=1;var k=Math.min(1,(e-.5)/1.3),q=k*k*(3-2*k);lift=.03*q;pitch=.16*q;sh=.0006}
else if(e<3.6){var k2=(e-2.3)/1.3,q2=k2*k2*(3-2*k2);fl=Math.max(0,1-k2*1.6);lift=.03*(1-q2);pitch=.16*(1-q2)}else RK.t0=0;
RKB.position.set((Math.random()-.5)*sh,RKY+.0035*Math.sin(s*1.3)+lift+(Math.random()-.5)*sh,(Math.random()-.5)*sh);
RKB.rotation.set(.025*Math.sin(s*.9),-.42+s*.12,pitch+.02*Math.sin(s*1.1+1));
RKF.material.opacity=fl*(.75+.25*Math.random());RKF.scale.set(.7+.5*fl+.15*Math.random(),1,1);
RK.glow.opacity=.2+.06*Math.sin(s*2.1)+.4*fl}
