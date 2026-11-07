// a desk model of the Ranger from Interstellar (where the hourglass used to stand): flat white arrowhead hull with a
// cluster of dark windows and panel lines, black chevron side wings ending in forward spikes, a vented black band at the
// back, the docking hatch with its ring and two thruster pods on the rear face, on a black display stand.
// Click it for the Twin Paradox card; "Launch" lights the thrusters, lifts the ship off its stand nose-up and opens
// the experience.
var rk=grp("rocket",.36,.39,.02),RKB=grp(0,0,.045,0,rk),RKSG=grp(0,0,.045,0,rk),RKF,RK={t0:0};
(function(){
var L=.2,HW=.046,WH=M(0xe9e8e4,.42),DK=M(0x26272a,.55),BL=M(0x1b1c1e,.45),SV=M(0xd8d8dc,.25,1),ST=M(0x1d1e20,.5);
RKB.rotation.y=RKSG.rotation.y=-.42;// nose toward the front-right, top deck and the hatch both in view
// hull: a lens-shaped deck built as a grid over the top-view outline (white on top, dark sides and belly)
var O=[[0,.62],[.12,1],[.55,.94],[.86,.55],[1,.26]];
function hw(u){for(var i=1;i<O.length;i++)if(u<=O[i][0]){var a=O[i-1],b=O[i],k=(u-a[0])/(b[0]-a[0]);return HW*(a[1]+(b[1]-a[1])*k)}return HW*O[O.length-1][1]}
function crown(u){return .02-.013*u*u}
var NU=28,NV=14,P=[],UV=[],I=[];
function vtx(x,y,z,u,v){P.push(x,y,z);UV.push(u,v);return P.length/3-1}
var TOP=[],BOT=[];
for(var a=0;a<=NU;a++){var u=a/NU,x=u*L-L/2,w=hw(u),rowT=[],rowB=[];
for(var b=0;b<=NV;b++){var v=b/NV*2-1,z=v*w;rowT.push(vtx(x,.006+crown(u)*(1-.62*v*v),z,u,(v+1)/2));rowB.push(vtx(x,0,z,u,(v+1)/2))}TOP.push(rowT);BOT.push(rowB)}
var gT=[],gS=[];
for(a=0;a<NU;a++)for(var b=0;b<NV;b++){var p=TOP[a][b],q=TOP[a+1][b],r=TOP[a+1][b+1],t=TOP[a][b+1];gT.push(p,t,q,q,t,r);
p=BOT[a][b];q=BOT[a+1][b];r=BOT[a+1][b+1];t=BOT[a][b+1];gS.push(p,q,t,q,r,t)}
for(a=0;a<NU;a++){[0,NV].forEach(function(b,k){var p=TOP[a][b],q=TOP[a+1][b],r=BOT[a+1][b],t=BOT[a][b];k?gS.push(p,t,q,q,t,r):gS.push(p,q,t,q,r,t)})}
for(b=0;b<NV;b++){[0,NU].forEach(function(a,k){var p=TOP[a][b],q=TOP[a][b+1],r=BOT[a][b+1],t=BOT[a][b];k?gS.push(p,t,q,q,t,r):gS.push(p,q,t,q,r,t)})}
var G=new T.BufferGeometry();G.setAttribute("position",new T.Float32BufferAttribute(P,3));G.setAttribute("uv",new T.Float32BufferAttribute(UV,2));
G.setIndex(gT.concat(gS));G.addGroup(0,gT.length,0);G.addGroup(gT.length,gS.length,1);G.computeVertexNormals();
// top skin: panel lines, the window cluster, the vented rear band and the meshed nose
var c=cvs(512,256),x=c.getContext("2d");x.fillStyle="#e9e8e4";x.fillRect(0,0,512,256);
x.fillStyle="#2a2b2e";x.fillRect(0,0,64,256);x.strokeStyle="#45464a";x.lineWidth=2;for(var vv=8;vv<64;vv+=7){x.beginPath();x.moveTo(vv,10);x.lineTo(vv,246);x.stroke()}
x.fillStyle="#cfcfcc";x.fillRect(372,0,140,256);x.strokeStyle="#b6b6b3";x.lineWidth=1;for(var q2=372;q2<512;q2+=5){x.beginPath();x.moveTo(q2,0);x.lineTo(q2,256);x.stroke()}
x.strokeStyle="#9a9a97";x.lineWidth=1.2;[[64,62,372,74],[64,194,372,182],[64,128,120,128],[330,128,372,128],[118,40,112,216],[340,52,346,204],[96,62,90,194],[300,60,306,196]].forEach(function(l){x.beginPath();x.moveTo(l[0],l[1]);x.lineTo(l[2],l[3]);x.stroke()});// panel seams
x.fillStyle="#131417";[[150,100,30,24],[186,86,26,22],[218,98,26,26],[160,134,30,22],[196,122,32,24],[234,132,24,22],[266,106,28,24],[272,140,24,20],[128,120,22,20],[210,156,28,20],[246,162,22,18],[178,160,24,18],[300,122,20,20],[236,78,22,18]].forEach(function(w){
x.beginPath();x.moveTo(w[0],w[1]+w[3]*.2);x.lineTo(w[0]+w[2]*.8,w[1]);x.lineTo(w[0]+w[2],w[1]+w[3]*.7);x.lineTo(w[0]+w[2]*.3,w[1]+w[3]);x.closePath();x.fill()});
mesh(G,[M(0xffffff,.42,0,{map:ctex(c)}),M(0x2a2b2e,.55)],0,0,0,RKB);
// black chevron frame: a thin plate a little larger than the deck, ending in two spikes beside the nose
var FO=[[-.03,.66],[.1,1.16],[.62,1.08],[1.14,.8],[.93,.5],[1.01,.27]],fs=new T.Shape();
FO.forEach(function(p,i){var px=p[0]*L-L/2,py=p[1]*HW;i?fs.lineTo(px,py):fs.moveTo(px,py)});for(var f=FO.length-1;f>=0;f--)fs.lineTo(FO[f][0]*L-L/2,-FO[f][1]*HW);
var fg=new T.ExtrudeGeometry(fs,{depth:.004,bevelEnabled:false});fg.rotateX(-PI/2);mesh(fg,BL,0,.004,0,RKB);
// belly and rear: dark keel, docking hatch with its ring, thruster pods either side
box(L*.55,.011,HW*1.1,DK,-L*.12,-.009,0,RKB);
var hb=box(.012,.026,HW*.95,WH,-L/2-.004,.013,0,RKB);
var ring=mesh(new T.TorusGeometry(.0095,.0016,8,28),SV,-L/2-.0105,.014,0,RKB);ring.rotation.y=PI/2;
var disc=mesh(new T.CircleGeometry(.008,24),M(0xbfbfbb,.5),-L/2-.0102,.014,0,RKB);disc.rotation.y=-PI/2;
[-1,1].forEach(function(s){box(.014,.016,.018,ST,-L/2-.001,.009,s*HW*.78,RKB);box(.002,.008,.01,M(0x0a0a0b,.6),-L/2-.0085,.009,s*HW*.78,RKB)});
// stand: oval black base and an angled post up into the keel
var base=cyl(.05,.05,.006,ST,0,-.042,0,RKSG,40);base.scale.set(1,1,.55);
var post=box(.007,.036,.012,ST,-.004,-.024,0,RKSG);post.rotation.z=-.3;
// thruster glow, only seen at launch (pale blue-white from the rear pods)
var FL=new T.MeshBasicMaterial({color:0x8fb8ff,transparent:true,opacity:0,blending:T.AdditiveBlending,depthWrite:false}),FC=new T.MeshBasicMaterial({color:0xf2f6ff,transparent:true,opacity:0,blending:T.AdditiveBlending,depthWrite:false});
RKF=grp(0,-L/2-.008,.009,0,RKB);
[-1,1].forEach(function(s){var fo=mesh(new T.ConeGeometry(.007,.05,16,1,true),FL,-.025,0,s*HW*.78,RKF),fi=mesh(new T.ConeGeometry(.0035,.028,12,1,true),FC,-.014,0,s*HW*.78,RKF);
fo.rotation.z=fi.rotation.z=PI/2;fo.castShadow=fi.castShadow=false});
RKF.material={set opacity(v){FL.opacity=v;FC.opacity=Math.min(1,v*1.2)}};
})();
var RKY=RKB.position.y;
function rocketLaunch(){if(!RK.t0)RK.t0=performance.now()}
// the stand (RKSG) stays put while the ship lifts off it
function rocketUpdate(t){if(!RK.t0)return;
var e=(performance.now()-RK.t0)/1000,fl=0,lift=0,pitch=0,sh=0;
if(e<.5){fl=e/.5;sh=.0005*fl}else if(e<2.3){fl=1;var k=Math.min(1,(e-.5)/1.3),s=k*k*(3-2*k);lift=.03*s;pitch=.16*s;sh=.0007}
else if(e<3.6){var k2=(e-2.3)/1.3,s2=k2*k2*(3-2*k2);fl=Math.max(0,1-k2*1.6);lift=.03*(1-s2);pitch=.16*(1-s2)}else{RK.t0=0}
RKB.position.set((Math.random()-.5)*sh,RKY+lift+(Math.random()-.5)*sh,(Math.random()-.5)*sh);RKB.rotation.z=pitch;
RKF.material.opacity=fl*(.75+.25*Math.random());RKF.scale.set(.7+.5*fl+.15*Math.random(),1,1)}
