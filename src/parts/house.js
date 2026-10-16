// ---------- little house: a New England Victorian in miniature, the home base ----------
// sage clapboard with cream trim and burgundy accents, steep front gable with fish-scale shingles and gingerbread
// bargeboards, a corner turret under a conical slate roof, a front porch with turned posts and spindle railing,
// tall two-over-two windows that glow at night, a hinged front door that swings open when you come close.
// Roofs are solid prisms, so slopes meet in a closed ridge. Decorations change with the season.
var hs2=grp("house",.49,.75,.05),HDOOR,HGLOW,HDECO=[],HNIGHT=0,houseUpdate;
(function(){
var MX=-.01,MZ=-.006,W=.046,D=.046,H=.06,Y0=.005,FZ=MZ+D/2,RISE=.032,TX=.022,TZ=.016,TR=.014,TH=.075;
function C(w,h){return cvs(w,h)}
function clap(base){var c=C(256,256),x=c.getContext("2d");x.fillStyle=base;x.fillRect(0,0,256,256);
for(var y=0;y<256;y+=12){var g=x.createLinearGradient(0,y,0,y+12);g.addColorStop(0,"rgba(255,255,255,.14)");g.addColorStop(.8,"rgba(0,0,0,0)");g.addColorStop(1,"rgba(10,25,20,.45)");x.fillStyle=g;x.fillRect(0,y,256,12)}
for(var i=0;i<700;i++){x.fillStyle="rgba("+(R()<.5?"20,30,25":"255,250,235")+","+R()*.07+")";x.fillRect(R()*256,R()*256,2+R()*9,1)}return c}
function scales(base,dark){var c=C(256,256),x=c.getContext("2d");x.fillStyle=dark;x.fillRect(0,0,256,256);
for(var r=-1;r<12;r++)for(var k=-1;k<10;k++){var cx=k*28+(r%2)*14,cy=r*22,v=.88+R()*.24,b=base.map(function(q){return Math.round(q*v)});x.fillStyle="rgb("+b.join(",")+")";
x.beginPath();x.moveTo(cx-13,cy);x.lineTo(cx-13,cy+12);x.arc(cx,cy+12,13,PI,0,true);x.lineTo(cx+13,cy);x.closePath();x.fill();x.strokeStyle="rgba(0,0,0,.35)";x.lineWidth=2;x.beginPath();x.arc(cx,cy+12,13,PI,0,true);x.stroke()}return c}
function brick(){var c=C(64,128),x=c.getContext("2d");x.fillStyle="#cfc4b6";x.fillRect(0,0,64,128);
for(var r=0;r<16;r++)for(var k=-1;k<3;k++){var v=.8+R()*.35;x.fillStyle="rgb("+Math.round(140*v)+","+Math.round(58*v)+","+Math.round(44*v)+")";x.fillRect(k*32+(r%2)*16+1,r*8+1,30,6)}return c}
function tex(c,rx,ry){var t=ctex(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(rx,ry);return t}
var BODY=M(0xffffff,.62,0,{map:tex(clap("#6f8f80"),1,4)}),BODYW=M(0xffffff,.62,0,{map:tex(clap("#6f8f80"),1/.046,1/.012)}),
FISH=M(0xffffff,.6,0,{map:tex(scales([214,170,92],"#6b4f22"),1/.02,1/.016)}),
TRIM=M(0xf1e8d4,.45),BURG=M(0x74222c,.45,0,{clearcoat:.4,clearcoatRoughness:.3},1),
SLATE=M(0xffffff,.55,0,{map:tex(scales([72,78,88],"#24272c"),1/.014,1/.012),clearcoat:.2,clearcoatRoughness:.5},1),
SLATEC=M(0xffffff,.55,0,{map:tex(scales([72,78,88],"#24272c"),5,3)}),
WOOD=M(0x8a6a48,.75),STONE=M(0xa9a297,.85),BRASS=M(0xc9a24a,.3,1),BRK=M(0xffffff,.8,0,{map:ctex(brick())});
HGLOW=M(0x3a2a14,.3,0,{emissive:new T.Color(0xffc27a),emissiveIntensity:.08});
// solid gable roof: a chevron extruded along z, so both slopes share one closed ridge
function roofGeo(hw,r,o,t,depth){var s=r/hw,e=hw+o,ey=r-e*s,tv=t*Math.sqrt(1+s*s),sh=new T.Shape();
sh.moveTo(-e,ey);sh.lineTo(0,r);sh.lineTo(e,ey);sh.lineTo(e,ey+tv);sh.lineTo(0,r+tv);sh.lineTo(-e,ey+tv);sh.lineTo(-e,ey);
var g=new T.ExtrudeGeometry(sh,{depth:depth,bevelEnabled:false});g.translate(0,0,-depth/2);return g}
// plinth, main block and its front and back gables
rbox(.088,.005,.084,.003,.001,WOOD,0,.0025,.004,hs2);box(W,H,D,BODY,MX,Y0+H/2,MZ,hs2);
var gs=new T.Shape();gs.moveTo(-W/2,0);gs.lineTo(W/2,0);gs.lineTo(0,RISE);gs.lineTo(-W/2,0);
[[FZ+.0002,0],[MZ-D/2-.0002,PI]].forEach(function(q){var g=mesh(new T.ShapeGeometry(gs),FISH,MX,Y0+H,q[0],hs2);g.rotation.y=q[1];g.castShadow=false});
var roof=mesh(roofGeo(W/2,RISE,.0045,.0026,D+.009),SLATE,MX,Y0+H,MZ,hs2);
// gingerbread: cream bargeboards under the front slopes, a sunburst at the peak, a round attic window, a finial
var sl=Math.hypot(W/2+.0045,RISE*(W/2+.0045)/(W/2)),ang=Math.atan2(RISE,W/2);
[-1,1].forEach(function(s){var b=box(sl,.0022,.0012,TRIM,MX+s*(W/4+.001),Y0+H+RISE/2-.0016,FZ+.0048,hs2);b.rotation.z=-s*ang;b.castShadow=false;
for(var i=1;i<6;i++){var d=box(.0009,.0034,.0008,TRIM,MX+s*(W/2+.004)*i/6,Y0+H+RISE*(1-i/6)-.0034,FZ+.0046,hs2);d.castShadow=false}});
var sun=mesh(new T.CircleGeometry(.0072,16,0,PI),TRIM,MX,Y0+H+RISE-.011,FZ+.0006,hs2);sun.castShadow=false;
for(var i=1;i<8;i++){var a=PI*i/8,rr=box(.0006,.0068,.0004,M(0xb9ad94,.5),MX+Math.cos(a)*.0036,Y0+H+RISE-.011+Math.sin(a)*.0036,FZ+.0009,hs2);rr.rotation.z=a-PI/2;rr.castShadow=false}
var aw=mesh(new T.CircleGeometry(.0034,20),HGLOW,MX,Y0+H+RISE*.4,FZ+.0005,hs2);aw.castShadow=false;var awr=mesh(new T.TorusGeometry(.0036,.0007,6,20),TRIM,MX,Y0+H+RISE*.4,FZ+.0008,hs2);
cyl(.0005,.0005,.006,TRIM,MX,Y0+H+RISE+.0055,FZ+.004,hs2,6);
// corner boards and a belt course between the floors
[[-1,1],[1,1],[-1,-1],[1,-1]].forEach(function(q){box(.0026,H,.0026,TRIM,MX+q[0]*(W/2-.0002),Y0+H/2,MZ+q[1]*(D/2-.0002),hs2)});
box(W+.002,.0018,D+.002,TRIM,MX,Y0+H*.5,MZ,hs2);
// chimney on the back slope
box(.008,.032,.008,BRK,MX-.011,Y0+H+RISE*.62,MZ-.013,hs2);box(.0105,.0025,.0105,M(0x5d5a56,.6),MX-.011,Y0+H+RISE*.62+.0168,MZ-.013,hs2);
// turret: eight-sided tower with a flared conical roof and a finial
var ts=-PI/8,tw=mesh(new T.CylinderGeometry(TR,TR,TH,8,1,false,ts),BODY,TX,Y0+TH/2,TZ,hs2);
[.5].forEach(function(f){mesh(new T.CylinderGeometry(TR+.0012,TR+.0012,.0018,8,1,false,ts),TRIM,TX,Y0+TH*f,TZ,hs2)});
mesh(new T.CylinderGeometry(TR+.0014,TR+.0014,.0022,8,1,false,ts),TRIM,TX,Y0+TH,TZ,hs2);
var cone=mesh(new T.ConeGeometry(TR+.004,.042,8,1,false,ts),SLATEC,TX,Y0+TH+.021,TZ,hs2);
cyl(.0006,.0006,.008,BRASS,TX,Y0+TH+.045,TZ,hs2,6);mesh(new T.SphereGeometry(.0012,8,6),BRASS,TX,Y0+TH+.049,TZ,hs2);
// windows: tall two-over-two sashes with cream casing, a little pediment and a sill
function win(par,x,y,z,ry,w,h){var g=grp(0,x,y,z,par);g.rotation.y=ry;var gl=mesh(new T.PlaneGeometry(w,h),HGLOW,0,0,.0004,g);gl.castShadow=false;
[[w+.0026,.0014,0,h/2],[w+.0026,.0014,0,-h/2],[.0014,h,-w/2,0],[.0014,h,w/2,0],[w,.0012,0,0],[.0008,h,0,0]].forEach(function(b){box(b[0],b[1],.0014,TRIM,b[2],b[3],.0011,g)});
box(w+.0046,.0016,.0024,TRIM,0,h/2+.0017,.0016,g);box(w+.004,.0013,.003,TRIM,0,-h/2-.0011,.0019,g);return g}
var WIN=[];WIN.push(win(hs2,MX-.012,Y0+H*.76,FZ,0,.0075,.0135),win(hs2,MX+.006,Y0+H*.76,FZ,0,.0075,.0135),win(hs2,MX-.012,Y0+H*.27,FZ,0,.0075,.013));
[-1].forEach(function(s){WIN.push(win(hs2,MX+s*W/2,Y0+H*.76,MZ,s*PI/2,.0075,.0135),win(hs2,MX+s*W/2,Y0+H*.27,MZ,s*PI/2,.0075,.013))});win(hs2,MX,Y0+H*.76,MZ-D/2,PI,.0075,.0135);
var ap=TR*Math.cos(PI/8);[0,PI/4,PI/2,-PI/4].forEach(function(a){[.27,.76].forEach(function(f){WIN.push(win(hs2,TX+Math.sin(a)*(ap+.0001),Y0+TH*f*(H/TH)+(f>.5?.004:0),TZ+Math.cos(a)*(ap+.0001),a,.0062,.0125))})});
// front door with a glowing transom, on its hinge
var DX=MX+.004;box(.0132,.0012,.0016,TRIM,DX,Y0+.0275,FZ+.0008,hs2);[-1,1].forEach(function(s){box(.0012,.0215,.0016,TRIM,DX+s*.006,Y0+.0158,FZ+.0008,hs2)});
var tr=mesh(new T.PlaneGeometry(.0108,.0035),HGLOW,DX,Y0+.0248,FZ+.0003,hs2);tr.castShadow=false;
var dk=mesh(new T.PlaneGeometry(.0108,.0178),M(0x2a1a0e,.9),DX,Y0+.0139,FZ+.0002,hs2);dk.castShadow=false;
HDOOR=grp(0,DX-.0054,Y0+.0139,FZ+.0011,hs2);rbox(.0106,.0014,.0176,.0008,.0003,BURG,.0053,0,0,HDOOR).rotation.x=PI/2;
[.0045,-.004].forEach(function(y){box(.007,.0062,.0005,M(0x5e1a22,.5),.0053,y,.0009,HDOOR)});mesh(new T.SphereGeometry(.0009,10,8),BRASS,.0094,-.0006,.0013,HDOOR);
// porch: floor, steps, turned posts, spindle railing, a sloped roof on brackets with a cream frieze
var PZ0=FZ,PZ1=FZ+.017,PX0=MX-W/2-.002,PX1=TX-.009,PY=Y0+.005,PC=(PZ0+PZ1)/2;
box(PX1-PX0,.005,PZ1-PZ0,WOOD,(PX0+PX1)/2,Y0+.0025,PC,hs2);box(PX1-PX0+.001,.001,PZ1-PZ0+.001,TRIM,(PX0+PX1)/2,PY+.0002,PC,hs2);
box(.012,.0034,.004,STONE,DX,Y0+.0017,PZ1+.002,hs2);box(.012,.0017,.004,STONE,DX,Y0+.0009,PZ1+.006,hs2);
var POST=[PX0+.0015,DX-.0075,DX+.0075,PX1-.0015];POST.forEach(function(x){var p=grp(0,x,PY,PZ1-.0016,hs2);cyl(.0009,.0009,.024,TRIM,0,.012,0,p,8);
[.002,.012,.022].forEach(function(y){mesh(new T.SphereGeometry(.00135,8,6),TRIM,0,y,0,p)});box(.0026,.0012,.0026,TRIM,0,.0006,0,p)});
function rail(x0,z0,x1,z1){var L=Math.hypot(x1-x0,z1-z0),g=grp(0,(x0+x1)/2,PY,(z0+z1)/2,hs2);g.rotation.y=-Math.atan2(z1-z0,x1-x0);
box(L,.0011,.0014,TRIM,0,.0085,0,g);box(L,.0008,.0012,TRIM,0,.0012,0,g);for(var u=-L/2+.0022;u<L/2-.001;u+=.0022)box(.00055,.0072,.00055,TRIM,u,.0048,0,g).castShadow=false}
rail(POST[0],PZ1-.0016,POST[1],PZ1-.0016);rail(POST[2],PZ1-.0016,POST[3],PZ1-.0016);
rail(POST[0],PZ1-.0016,POST[0],PZ0+.0006);rail(POST[3],PZ1-.0016,POST[3],TZ+TR*.95);
[[POST[0],PZ0+.0012]].forEach(function(q){var p=grp(0,q[0],PY,q[1],hs2);cyl(.0009,.0009,.024,TRIM,0,.012,0,p,8)});
var pr=grp(0,(PX0+PX1)/2,PY+.0245,PC+.001,hs2);pr.rotation.x=.16;box(PX1-PX0+.004,.0016,PZ1-PZ0+.005,SLATE,0,.0012,0,pr);box(PX1-PX0+.004,.0028,.0012,TRIM,0,-.0008,(PZ1-PZ0)/2+.0022,pr);
POST.forEach(function(x){var b=box(.0024,.0024,.0008,TRIM,x,PY+.0225,PZ1-.0016,hs2);b.rotation.z=PI/4;b.castShadow=false});
// ---- seasonal decorations
var mo=(typeof SEASON_OVERRIDE!=="undefined"&&SEASON_OVERRIDE)||["winter","winter","spring","spring","spring","summer","summer","summer","fall","halloween","fall","holiday"][new Date().getMonth()];
var deco=grp(0,0,0,0,hs2),BATS=[],LIGHTS=[],HALOS={};
// a little teardrop bulb on a dark socket, and one soft additive halo material per color
var BULB=new T.LatheGeometry([[0,-.0016],[.0005,-.0014],[.00085,-.0008],[.0008,-.0002],[.00045,.0003],[.0003,.0006],[0,.0006]].map(v2),10);
function haloMat(c){if(HALOS[c])return HALOS[c];var cv=cvs(64),x=cv.getContext("2d"),g=x.createRadialGradient(32,32,0,32,32,32),col=new T.Color(c);
g.addColorStop(0,"rgba(255,255,255,1)");g.addColorStop(.25,"rgba("+Math.round(col.r*255)+","+Math.round(col.g*255)+","+Math.round(col.b*255)+",.55)");g.addColorStop(1,"rgba(0,0,0,0)");x.fillStyle=g;x.fillRect(0,0,64,64);
var m=new T.SpriteMaterial({map:ctex(cv),color:0xffffff,transparent:true,depthWrite:false,blending:T.AdditiveBlending,opacity:.2});return HALOS[c]=m}
function glow(c,i){var m=M(c,.4,0,{emissive:new T.Color(c),emissiveIntensity:i||1});HDECO.push(m);return m}
// a string of little bulbs hanging in shallow swags between the given points
function lights(pts,cols,every){var bulbs=[],wire=[];for(var i=0;i<pts.length-1;i++){var a=pts[i],b=pts[i+1],n=Math.max(2,Math.round(a.distanceTo(b)/.0034));
for(var k=0;k<n;k++){var f=k/n,p=a.clone().lerp(b,f);p.y-=Math.sin(PI*((f*n)%1))*.0011;wire.push(p.clone());if(k%(every||1)===0)bulbs.push(p.clone())}}wire.push(pts[pts.length-1].clone());
var wm=mesh(new T.TubeGeometry(new T.CatmullRomCurve3(wire),wire.length*2,.00028,4),M(0x111111,.6),0,0,0,deco);wm.castShadow=false;
bulbs.forEach(function(p,i){var c=cols[i%cols.length],m=M(c,.35,0,{emissive:new T.Color(c),emissiveIntensity:1}),b=mesh(BULB,m,p.x,p.y-.0011,p.z,deco);b.castShadow=false;
var h=new T.Sprite(haloMat(c));h.position.copy(b.position);h.scale.setScalar(.0062);h.renderOrder=6;deco.add(h);LIGHTS.push({m:m,h:h,ph:R()*6.28,sp:.6+R()*1.8,dip:R()<.18})})}
var s_=RISE/(W/2),e_=W/2+.0045,eY=Y0+H+RISE-e_*s_,ez=FZ+.0055;
var eave=[new T.Vector3(MX-e_,eY-.0006,ez),new T.Vector3(MX,Y0+H+RISE-.0004,ez),new T.Vector3(MX+e_*.55,Y0+H+RISE-e_*.55*s_-.0006,ez)];
var porchEdge=[new T.Vector3(PX0-.002,PY+.0205,PZ1+.0035),new T.Vector3(PX1+.002,PY+.0205,PZ1+.0035)];
var coneRing=[];for(var i=0;i<=6;i++){var a=-PI/2+i*PI/4;coneRing.push(new T.Vector3(TX+Math.sin(a)*(TR+.0042),Y0+TH+.0012,TZ+Math.cos(a)*(TR+.0042)))}
function snow(){var sm=M(0xf6f8fb,.75);mesh(roofGeo(W/2+.0002,RISE+.0001,.0047,.0016,D+.0094),sm,MX,Y0+H+.0024,MZ,deco).castShadow=false;
mesh(new T.ConeGeometry(TR+.0043,.03,8,1,false,ts),sm,TX,Y0+TH+.0275,TZ,deco).castShadow=false;var pr2=box(PX1-PX0+.004,.0012,PZ1-PZ0+.005,sm,0,.0026,0,pr);pr2.castShadow=false;
box(.0088,.0016,.0088,sm,MX-.011,Y0+H+RISE*.62+.0186,MZ-.013,deco)}
function icicles(pts){for(var i=0;i<pts.length-1;i++)for(var f=.1;f<1;f+=.16){var p=pts[i].clone().lerp(pts[i+1],f),c=mesh(new T.ConeGeometry(.0005,.0028+R()*.003,5),M(0xdfeef8,.1,0,{transparent:true,opacity:.8}),p.x,p.y-.0024,p.z,deco);c.rotation.x=PI;c.castShadow=false}}
function pumpkin(x,y,z,r,face){var g=new T.SphereGeometry(r,24,16),pp=g.attributes.position,v=new T.Vector3();for(var i=0;i<pp.count;i++){v.fromBufferAttribute(pp,i);var a=Math.atan2(v.z,v.x),k=1-.07*Math.pow(Math.abs(Math.cos(a*5)),3);pp.setXYZ(i,v.x*k,v.y*.78,v.z*k)}g.computeVertexNormals();
var m;if(face){var c=C(256,128),x2=c.getContext("2d");x2.fillStyle="#000";x2.fillRect(0,0,256,128);x2.fillStyle="#ffb02e";[[112,48],[144,48]].forEach(function(e){x2.beginPath();x2.moveTo(e[0]-9,e[1]+7);x2.lineTo(e[0],e[1]-8);x2.lineTo(e[0]+9,e[1]+7);x2.fill()});
x2.beginPath();x2.moveTo(104,74);x2.quadraticCurveTo(128,96,152,74);x2.lineTo(146,80);x2.lineTo(140,74);x2.lineTo(134,82);x2.lineTo(128,75);x2.lineTo(122,82);x2.lineTo(116,74);x2.lineTo(110,80);x2.closePath();x2.fill();
m=M(0xe46f12,.55,0,{emissive:new T.Color(0xffffff),emissiveMap:ctex(c),emissiveIntensity:1});HDECO.push(m)}else m=M(0xe0751a,.55);
var o=mesh(g,m,x,y+r*.78,z,deco);o.rotation.y=-PI/2;cyl(r*.12,r*.16,r*.5,M(0x5a4a25,.8),x,y+r*1.75,z,deco,6);return o}
function webTex(){var S=256,c=C(S),x=c.getContext("2d");x.strokeStyle="rgba(240,240,245,.9)";x.lineWidth=1.6;var n=9;
for(var i=0;i<n;i++){var a=i/(n-1)*PI/2;x.beginPath();x.moveTo(0,0);x.lineTo(Math.cos(a)*S,Math.sin(a)*S);x.stroke()}
for(var r=24;r<S;r+=22+R()*6){x.beginPath();for(var i=0;i<n;i++){var a=i/(n-1)*PI/2,rr=r*(1-.06*Math.sin(i*1.7));var px=Math.cos(a)*rr,py=Math.sin(a)*rr;i?x.quadraticCurveTo(Math.cos(a-PI/(4*(n-1)))*rr*.94,Math.sin(a-PI/(4*(n-1)))*rr*.94,px,py):x.moveTo(px,py)}x.stroke()}return ctex(c)}
function webs(){var wm=M(0xffffff,.6,0,{map:webTex(),transparent:true,alphaTest:.05,side:T.DoubleSide,depthWrite:false});
[[POST[0]+.0006,PY+.0215,PZ1-.0012,0,.008],[POST[3]-.0006,PY+.0215,PZ1-.0012,PI/2,.008],[MX-W/2+.0004,Y0+H-.0004,FZ+.0024,0,.009]].forEach(function(q){var p=mesh(new T.PlaneGeometry(q[4],q[4]),wm,q[0],q[1],q[2],deco);p.rotation.z=PI+q[3];p.geometry.translate(q[4]/2,q[4]/2,0);p.castShadow=false})}
function bats(){var ws=new T.Shape();ws.moveTo(0,.0006);ws.quadraticCurveTo(.0016,.0016,.0034,.0013);ws.quadraticCurveTo(.0046,.001,.0056,.0002);
[[.0049,-.0004,.0046,-.0012],[.0039,-.0006,.0034,-.0014],[.0026,-.0006,.0021,-.0013],[.0012,-.0004,0,-.0008]].forEach(function(q,i){ws.quadraticCurveTo(q[0],q[1],q[2],q[3]);if(i<3)ws.lineTo(q[2],q[3])});ws.lineTo(0,.0006);
var wg=new T.ShapeGeometry(ws,6),bm=M(0x141218,.6,0,{side:T.DoubleSide}),bd=M(0x1c1a20,.8);
[[.024,.0,1],[.019,2.1,-1],[.03,4.2,1]].forEach(function(q,i){var g=grp(0,TX,Y0+TH+.03+i*.006,TZ,deco),b=grp(0,q[0],0,0,g);b.rotation.y=q[2]>0?PI:0;
var body=mesh(new T.SphereGeometry(.0006,10,8),bd,0,0,0,b);body.scale.set(.7,.62,2);mesh(new T.SphereGeometry(.00042,8,6),bd,0,.0001,.0013,b);
[-1,1].forEach(function(s){var e=mesh(new T.ConeGeometry(.00016,.0006,4),bd,s*.00022,.00055,.0013,b);e.rotation.z=-s*.25});
var L=grp(0,-.0003,0,0,b),Rw=grp(0,.0003,0,0,b),wl=mesh(wg,bm,0,0,0,L),wr=mesh(wg,bm,0,0,0,Rw);wl.rotation.x=PI/2;wl.scale.set(-1.45,1,1);wr.rotation.x=PI/2;wr.scale.set(1.45,1,1);
[wl,wr,body].forEach(function(o){o.castShadow=false});b.scale.setScalar(1.25);BATS.push({g:g,b:b,L:L,R:Rw,p:q[1],dir:q[2],y:g.position.y})})}
function boxes(cols){WIN.slice(0,3).forEach(function(w,i){if(i===2)return;var wp=w.position;box(.0095,.003,.0034,BURG,wp.x,wp.y-.0095,wp.z+.0028,hs2);
for(var k=0;k<7;k++){var f=mesh(new T.SphereGeometry(.0009,6,5),M(cols[k%cols.length],.6),wp.x-.0038+k*.00125,wp.y-.0074+R()*.0008,wp.z+.0028+(R()-.5)*.0016,hs2);f.castShadow=false}
box(.0088,.0012,.003,M(0x3f6b2d,.7),wp.x,wp.y-.0081,wp.z+.0028,hs2)})}
function wreath(c,bow){var w=mesh(new T.TorusGeometry(.0034,.0012,8,20),M(c,.7),DX,Y0+.0175,FZ+.0028,deco);w.castShadow=false;if(bow){mesh(new T.SphereGeometry(.0011,8,6),M(bow,.5),DX,Y0+.0145,FZ+.0036,deco)}}
if(mo==="halloween"){lights(eave,[0x9b4dff,0x9b4dff,0xff8a1f],1);lights(porchEdge,[0x9b4dff,0xff8a1f],1);lights(coneRing,[0x9b4dff],1);webs();bats();
pumpkin(PX0+.0035,Y0,PZ1+.0075,.0044,true);pumpkin(DX+.0105,Y0,PZ1+.0058,.0027,false);HGLOW.emissive.setHex(0xffa25a)}
else if(mo==="fall"){pumpkin(PX0+.0035,Y0,PZ1+.0075,.0038,false);pumpkin(DX+.0105,Y0,PZ1+.0055,.003,false);pumpkin(DX-.0105,Y0,PZ1+.006,.0024,false);wreath(0xb5531c,0);
for(var i=0;i<26;i++){var l=mesh(new T.PlaneGeometry(.0016,.0011),M([0xc2491b,0xd9861c,0x9a2f17,0xe0a83a][i%4],.7,0,{side:T.DoubleSide}),-.04+R()*.08,.0052,-.036+R()*.076,deco);l.rotation.set(-PI/2,0,R()*6);l.castShadow=false}}
else if(mo==="holiday"){snow();lights(eave,[0xff3b30,0x34c759,0xffcc00,0x2f7bff,0xfff1d0],1);lights(porchEdge,[0xff3b30,0x34c759,0xffcc00,0x2f7bff,0xfff1d0],1);lights(coneRing,[0xfff1d0],1);wreath(0x24572c,0xc8102e)}
else if(mo==="winter"){snow();icicles(eave);icicles(porchEdge)}
else if(mo==="spring")boxes([0xf6a9c8,0xffffff,0xf0d35a]);
else boxes([0xd7263d,0xffffff,0xd7263d]);
houseUpdate=function(t){var s=t*.001;BATS.forEach(function(b){var f=Math.sin(s*26+b.p*3);b.L.rotation.z=.1+f*.6;b.R.rotation.z=-.1-f*.6;b.g.rotation.y=b.dir*s*.9+b.p;b.g.position.y=b.y+Math.sin(s*1.1+b.p)*.004;b.b.rotation.z=b.dir*.25+Math.sin(s*1.7+b.p)*.12;b.b.position.y=-f*.00025});
var n=HNIGHT;LIGHTS.forEach(function(l){var tw=.72+.28*Math.sin(s*l.sp+l.ph);if(l.dip)tw*=.35+.65*Math.max(0,Math.sin(s*.35+l.ph));l.m.emissiveIntensity=(.5+n*1.1)*tw;l.h.scale.setScalar(.0045+.0035*tw*(.3+n))});
for(var k in HALOS)HALOS[k].opacity=.12+HNIGHT*.5};
})();
