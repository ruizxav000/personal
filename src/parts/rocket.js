// a desk model of the Ranger from Interstellar (where the hourglass used to stand), hovering over a walnut maglev base
// like the magnetic floaters people keep on their desks: it bobs and slowly turns on its own.
// Built from reference photos of a Ranger model: a white lens-shaped deck with the cockpit seam, a cluster of irregular
// windows and a cross-hatched nose; a raised, ribbed black vent block across the back; black chevron wings that dip
// from the rear corners past the belly and sweep up into spikes beside the nose; a dark lower body with three-hole
// panels; and at the back the hatch plate with its chrome chain ring, spoked door and corner bolts, flanked by two
// thruster housings over a ribbed grille.
// Click it for the Twin Paradox card; "Launch" lights the thrusters, lifts it nose-up and opens the experience.
var rk=grp("rocket",.36,.39,.02),RKSG=grp(0,0,0,0,rk),RKB=grp(0,0,.072,0,rk),RKF,RK={t0:0};
(function(){
var L=.2,HW=.046,WH=M(0xeceae5,.42),DK=M(0x26272a,.55),BL=M(0x18191b,.42),SV=M(0xe6e6ea,.18,1),ST=M(0x1d1e20,.5),GR=M(0x5b5c60,.6),HO=M(0x050505,.8);
function crown(u){return .021-.014*u*u}
var O=[[0,.66],[.1,1],[.52,.95],[.84,.56],[1,.24]];
function hw(u){for(var i=1;i<O.length;i++)if(u<=O[i][0]){var a=O[i-1],b=O[i],k=(u-a[0])/(b[0]-a[0]);return HW*(a[1]+(b[1]-a[1])*k)}return HW*O[O.length-1][1]}
// ---- deck skin
var c=cvs(1024,512),x=c.getContext("2d");x.fillStyle="#eceae5";x.fillRect(0,0,1024,512);
x.fillStyle="#d6d5d1";x.fillRect(730,0,294,512);x.strokeStyle="rgba(120,120,118,.55)";x.lineWidth=1;// cross-hatched nose
for(var q=730;q<1024;q+=6){x.beginPath();x.moveTo(q,0);x.lineTo(q,512);x.stroke()}for(q=0;q<512;q+=6){x.beginPath();x.moveTo(730,q);x.lineTo(1024,q);x.stroke()}
x.strokeStyle="#8f8f8c";x.lineWidth=2.4;x.beginPath();x.ellipse(430,256,300,190,0,0,PI*2);x.stroke();// cockpit seam
x.fillStyle="#f4f3ef";x.beginPath();x.ellipse(430,256,296,186,0,0,PI*2);x.fill();
x.lineWidth=1.6;[[140,130,250,150],[140,382,250,362],[250,150,250,362],[610,96,620,416],[700,140,730,256],[700,372,730,256],[150,256,250,256],[620,256,720,256]].forEach(function(l){x.beginPath();x.moveTo(l[0],l[1]);x.lineTo(l[2],l[3]);x.stroke()});
// window cluster: irregular dark panes, bigger toward the middle, rimmed in grey
x.fillStyle="#101114";x.strokeStyle="#6f6f6c";x.lineWidth=2;
[[[300,180],[352,166],[360,206],[310,214]],[[372,150],[430,140],[438,186],[380,196]],[[452,138],[506,148],[498,190],[446,184]],[[522,160],[566,182],[552,214],[512,200]],
[[296,236],[350,226],[356,270],[300,276]],[[374,214],[438,206],[444,256],[380,262]],[[462,206],[522,214],[516,262],[458,258]],[[540,232],[584,246],[578,284],[536,276]],
[[306,300],[356,292],[352,330],[312,338]],[[378,282],[436,278],[432,326],[382,330]],[[458,282],[514,286],[508,330],[456,326]],[[530,300],[572,306],[562,338],[524,334]],
[[392,350],[440,346],[436,378],[396,380]],[[462,348],[506,352],[500,380],[460,378]],[[258,214],[284,208],[286,240],[262,246]],[[258,272],[286,268],[284,300],[260,302]],
[[598,214],[622,220],[620,250],[600,248]],[[598,268],[622,266],[622,294],[600,298]]].forEach(function(w){x.beginPath();w.forEach(function(p,i){i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1])});x.closePath();x.fill();x.stroke()});
x.fillStyle="#8a6b2c";x.fillRect(470,384,14,12);x.fillRect(488,384,14,12);// two little gold-framed panes, as on the model
// side holes panels painted near the rear corners of the deck
x.fillStyle="#2a2b2e";[[120,70],[120,442]].forEach(function(p){x.fillRect(p[0],p[1]-14,58,28)});x.fillStyle="#050505";[[132,70],[150,70],[166,70],[132,442],[150,442],[166,442]].forEach(function(p){x.beginPath();x.arc(p[0],p[1],6,0,PI*2);x.fill()});
var TX=ctex(c);
// ---- deck: a lens over the outline, white on top, dark sides and belly
var NU=32,NV=16,P=[],UV=[],TOP=[],BOT=[];
function vtx(px,py,pz,u,v){P.push(px,py,pz);UV.push(u,v);return P.length/3-1}
for(var a=0;a<=NU;a++){var u=a/NU,X=u*L-L/2,w=hw(u),rt=[],rb=[];
for(var b=0;b<=NV;b++){var v=b/NV*2-1;rt.push(vtx(X,.007+crown(u)*(1-.66*v*v),v*w,u,(v+1)/2));rb.push(vtx(X,0,v*w,u,(v+1)/2))}TOP.push(rt);BOT.push(rb)}
var gT=[],gS=[];
for(a=0;a<NU;a++)for(b=0;b<NV;b++){var p=TOP[a][b],q1=TOP[a+1][b],r=TOP[a+1][b+1],t=TOP[a][b+1];gT.push(p,t,q1,q1,t,r);p=BOT[a][b];q1=BOT[a+1][b];r=BOT[a+1][b+1];t=BOT[a][b+1];gS.push(p,q1,t,q1,r,t)}
for(a=0;a<NU;a++)[0,NV].forEach(function(b,k){var p=TOP[a][b],q1=TOP[a+1][b],r=BOT[a+1][b],t=BOT[a][b];k?gS.push(p,t,q1,q1,t,r):gS.push(p,q1,t,q1,r,t)});
for(b=0;b<NV;b++)[0,NU].forEach(function(a,k){var p=TOP[a][b],q1=TOP[a][b+1],r=BOT[a][b+1],t=BOT[a][b];k?gS.push(p,t,q1,q1,t,r):gS.push(p,q1,t,q1,r,t)});
var G=new T.BufferGeometry();G.setAttribute("position",new T.Float32BufferAttribute(P,3));G.setAttribute("uv",new T.Float32BufferAttribute(UV,2));
G.setIndex(gT.concat(gS));G.addGroup(0,gT.length,0);G.addGroup(gT.length,gS.length,1);G.computeVertexNormals();
mesh(G,[M(0xffffff,.4,0,{map:TX}),DK],0,0,0,RKB);
// ---- raised black vent block across the back of the deck, ribbed on top
var vc=cvs(64,256),vx=vc.getContext("2d");vx.fillStyle="#1d1e20";vx.fillRect(0,0,64,256);vx.fillStyle="#333438";for(var s2=4;s2<64;s2+=8)vx.fillRect(s2,0,3,256);
var vb=box(.017,.007,2*hw(.06)*1.04,[BL,BL,M(0xffffff,.5,0,{map:ctex(vc)}),BL,BL,BL],-L/2+.012,.007+crown(.06)*.98,0,RKB);vb.rotation.z=-.06;
// ---- dark lower body: deep at the back (where the hatch is), tapering under the deck toward the nose
var lb=new T.Shape();lb.moveTo(-L/2,0);lb.lineTo(.03,0);lb.lineTo(-.01,-.012);lb.lineTo(-L/2+.004,-.016);lb.closePath();
var lg=new T.ExtrudeGeometry(lb,{depth:HW*1.3,bevelEnabled:true,bevelThickness:.002,bevelSize:.002,bevelSegments:2});lg.translate(0,0,-HW*.65);mesh(lg,DK,0,0,0,RKB);
[-1,1].forEach(function(s){var pnl=box(.024,.008,.001,ST,-L/2+.03,-.006,s*(HW*.65+.0025),RKB);
[0,1,2].forEach(function(i){var h=mesh(new T.CircleGeometry(i?.0014:.0019,14),HO,-L/2+.022+i*.007,-.006,s*(HW*.65+.0032),RKB);h.rotation.y=s>0?0:PI})});
// ---- chevron wings: dip from the rear corner past the belly, sweep up into a spike beside the nose
[-1,1].forEach(function(s){var W=new T.Shape(),pts=[[-.098,.027],[-.006,-.011],[.06,.01],[.11,.016],[.058,.003],[-.01,-.022],[-.098,.013]];
pts.forEach(function(p,i){i?W.lineTo(p[0],p[1]):W.moveTo(p[0],p[1])});W.closePath();
var g=new T.ExtrudeGeometry(W,{depth:.0022,bevelEnabled:true,bevelThickness:.0006,bevelSize:.0006,bevelSegments:1});g.translate(0,0,-.0011);
var m=mesh(g,BL,0,0,s*HW*.97,RKB);m.rotation.x=-s*.12;});// hugging the hull side, leaning out only slightly
// thin black rim under the deck so the white edge reads crisply against the wings
var rim=new T.Shape();O.forEach(function(p,i){var px=p[0]*L-L/2,py=p[1]*HW*1.05;i?rim.lineTo(px,py):rim.moveTo(px,py)});for(var f=O.length-1;f>=0;f--)rim.lineTo(O[f][0]*L-L/2,-O[f][1]*HW*1.05);
var rg=new T.ExtrudeGeometry(rim,{depth:.003,bevelEnabled:false});rg.rotateX(-PI/2);mesh(rg,BL,0,.0005,0,RKB);
// dark nose tip with its little holes
var nt=box(.009,.006,2*hw(1)*1.1,BL,L/2+.002,.005,0,RKB);[-1,0,1].forEach(function(i){var h=mesh(new T.CircleGeometry(.0012,12),HO,L/2+.0066,.005,i*.004,RKB);h.rotation.y=PI/2});
// ---- rear face: hatch plate, chrome chain ring around a spoked door, corner bolts, thruster housings, ribbed grille
var RX=-L/2-.004;
box(.007,.03,.032,WH,RX,.013,0,RKB);
var dc=cvs(128),dx=dc.getContext("2d");dx.fillStyle="#cfcfcc";dx.fillRect(0,0,128,128);dx.strokeStyle="#77777a";dx.lineWidth=4;
for(var k=0;k<10;k++){var an=k/10*PI*2;dx.beginPath();dx.moveTo(64+Math.cos(an)*14,64+Math.sin(an)*14);dx.lineTo(64+Math.cos(an)*60,64+Math.sin(an)*60);dx.stroke()}
dx.beginPath();dx.arc(64,64,14,0,PI*2);dx.stroke();dx.fillStyle="#9a9a9d";dx.beginPath();dx.arc(64,64,7,0,PI*2);dx.fill();
var door=mesh(new T.CircleGeometry(.0092,28),M(0xffffff,.45,0,{map:ctex(dc)}),RX-.0037,.0135,0,RKB);door.rotation.y=-PI/2;
var ring=mesh(new T.TorusGeometry(.0105,.0017,8,40),SV,RX-.0038,.0135,0,RKB);ring.rotation.y=PI/2;
for(k=0;k<22;k++){var an2=k/22*PI*2,lk=box(.0016,.0034,.0022,SV,RX-.0045,.0135+Math.sin(an2)*.0105,Math.cos(an2)*.0105,RKB);lk.rotation.x=-an2}// chain links
[[1,1],[1,-1],[-1,1],[-1,-1]].forEach(function(q){var bt=cyl(.0017,.0017,.0012,SV,RX-.0038,.0135+q[0]*.0115,q[1]*.0125,RKB,12);bt.rotation.z=PI/2});
[-1,1].forEach(function(s){var zc=s*(.016+.0085);rbox(.014,.017,.016,.003,.0015,ST,RX+.004,.012,zc,RKB);
box(.002,.011,.011,HO,RX-.0035,.012,zc,RKB);box(.0022,.0022,.007,GR,RX-.0042,.012,zc,RKB)});
var gb=box(.006,.007,.022,GR,RX+.001,-.002,0,RKB);for(k=0;k<6;k++)box(.0008,.006,.0016,ST,RX-.0024,-.002,-.009+k*.0036,RKB);
// ---- maglev base: walnut puck with a dark inset, a faint glow ring and a brass plaque
var WAL=M(0x5b3a22,.45,0,{clearcoat:.5,clearcoatRoughness:.25},1);
cyl(.056,.058,.016,WAL,0,.008,0,RKSG,48);var ins=cyl(.036,.036,.0012,M(0x141414,.35),0,.0166,0,RKSG,40);
var GL=new T.MeshBasicMaterial({color:0x7fb2ff,transparent:true,opacity:.25,blending:T.AdditiveBlending,depthWrite:false});
var gr=mesh(new T.RingGeometry(.026,.03,48),GL,0,.0174,0,RKSG);gr.rotation.x=-PI/2;gr.castShadow=false;RK.glow=GL;
box(.03,.007,.0015,M(0xc9a35a,.3,1),0,.008,.0575,RKSG);
// ---- thruster glow, only at launch (pale blue-white out of both housings)
var FL=new T.MeshBasicMaterial({color:0x8fb8ff,transparent:true,opacity:0,blending:T.AdditiveBlending,depthWrite:false}),FC=new T.MeshBasicMaterial({color:0xf2f6ff,transparent:true,opacity:0,blending:T.AdditiveBlending,depthWrite:false});
RKF=grp(0,RX-.006,.012,0,RKB);
[-1,1].forEach(function(s){var zc=s*(.016+.0085),fo=mesh(new T.ConeGeometry(.0065,.05,16,1,true),FL,-.025,0,zc,RKF),fi=mesh(new T.ConeGeometry(.0032,.028,12,1,true),FC,-.014,0,zc,RKF);
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
