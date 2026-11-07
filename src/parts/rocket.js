// a display model of the Interstellar launch stack (where the hourglass used to stand): white multi-stage rocket with the
// black-and-white roll pattern, fins, engine bells and an escape tower, on a walnut stand with a brass plaque.
// Click it for the Twin Paradox card; "Launch" fires the engines (flame, shudder, a short hop) and opens the experience.
var rk=grp("rocket",.36,.39,.02),RKB=grp(0,0,0,0,rk),RKF,RK={t0:0};
(function(){
var WH=M(0xf1efe9,.38),BK=M(0x161616,.5),WAL=M(0x5b3a22,.5,0,{clearcoat:.4,clearcoatRoughness:.3},1),BR=M(0xc9a35a,.3,1),EN=M(0x2a2a2c,.45,.8);
cyl(.04,.042,.012,WAL,0,.006,0,rk,40);// stand
box(.026,.007,.002,BR,0,.006,.0405,rk);// plaque
cyl(.0016,.0016,.02,BR,0,.022,0,rk,10);// rod
var s=.62,Y=.03;RKB.position.y=Y;RKB.scale.setScalar(s);
// the roll pattern: black quarters on the white first stage, as on a Saturn V
var c=cvs(128,64),x=c.getContext("2d");x.fillStyle="#f1efe9";x.fillRect(0,0,128,64);x.fillStyle="#161616";
x.fillRect(0,0,32,22);x.fillRect(64,0,32,22);x.fillRect(32,42,32,22);x.fillRect(96,42,32,22);
var RT=M(0xffffff,.38,0,{map:ctex(c)});
var body=[[0,0],[.017,0],[.017,.09],[.0155,.097],[.0155,.148],[.012,.155],[.012,.188],[.0127,.19],[.0127,.205],[.009,.219],[.0045,.229],[0,.233]];
mesh(new T.LatheGeometry(body.map(function(p){return new T.Vector2(p[0],p[1])}),40),WH,0,0,0,RKB);
var rp=new T.CylinderGeometry(.0172,.0172,.05,40,1,true);mesh(rp,RT,0,.045,0,RKB);
[.09,.148,.19].forEach(function(y){var r=mesh(new T.TorusGeometry(y<.1?.0168:y<.15?.0153:.0124,.0014,6,40),BK,0,y,0,RKB);r.rotation.x=PI/2});
for(var i=0;i<4;i++){var a=i*PI/2+PI/4,f=box(.0016,.026,.016,BK,Math.cos(a)*.021,.012,Math.sin(a)*.021,RKB);f.rotation.y=-a}
[[0,0],[.008,0],[-.008,0],[0,.008],[0,-.008]].forEach(function(p){cyl(.003,.0055,.008,EN,p[0],-.004,p[1],RKB,14)});
cyl(.0011,.0011,.022,BK,0,.244,0,RKB,8);var tip=cyl(0,.0024,.006,BK,0,.258,0,RKB,10);
// engine flame, only seen at launch
var FL=new T.MeshBasicMaterial({color:0xff7a22,transparent:true,opacity:0,blending:T.AdditiveBlending,depthWrite:false}),FC=new T.MeshBasicMaterial({color:0xfff2c8,transparent:true,opacity:0,blending:T.AdditiveBlending,depthWrite:false});
RKF=grp(0,0,-.008,0,RKB);var fo=mesh(new T.ConeGeometry(.017,.085,20,1,true),FL,0,-.042,0,RKF),fi=mesh(new T.ConeGeometry(.008,.05,16,1,true),FC,0,-.025,0,RKF);
fo.rotation.x=fi.rotation.x=PI;fo.castShadow=fi.castShadow=false;RKF.material={set opacity(v){FL.opacity=v;FC.opacity=Math.min(1,v*1.2)}};
})();
function rocketLaunch(){if(!RK.t0)RK.t0=performance.now()}
function rocketUpdate(t){if(!RK.t0)return;var e=(performance.now()-RK.t0)/1000,fl=0,lift=0,sh=0;
if(e<.5){fl=e/.5;sh=.0006*fl}else if(e<2.2){fl=1;var k=Math.min(1,(e-.5)/1.2);lift=.028*k*k*(3-2*k);sh=.0009}else if(e<3.4){var k2=(e-2.2)/1.2;fl=Math.max(0,1-k2*1.5);lift=.028*(1-k2*k2*(3-2*k2))}else{RK.t0=0}
RKB.position.set((Math.random()-.5)*sh,.03+lift+(Math.random()-.5)*sh,(Math.random()-.5)*sh);
RKF.material.opacity=fl*(.75+.25*Math.random());RKF.scale.set(1,.7+.5*fl+.15*Math.random(),1)}
