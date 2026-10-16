// ---------- 1970s portable TV on the floor ----------
// lacquered walnut wrap with the grain running around it, brushed aluminum front panel with printed legends, the tube
// set back behind a chrome bezel under curved glass, VHF and UHF detent dials with numbers on their skirts, a pull-on
// volume knob, perforated speaker grille, tapered rear housing with vents, telescoping rabbit ears and twin-lead
var tv=grp("tv",.98,.012,.08);tv.rotation.y=-.4;
var TVW=.5,TH=.38,TD=.4,SX=-.05,SW=.29,SH2=.22,KNOB={},fr,scr,CRT,TVTEX,tvL;
(function(){
var TCY=.03+TH/2,FD=.25,WT=.024,PW=TVW-2*WT-.008,PH=TH-2*WT-.008,PZ=-.016,SY=.012,KX=.162;
var CHRM=M(0xdcdee1,.12,1),SATB=M(0x141414,.4,.1),GBK=M(0x0b0b0b,.22,0,{clearcoat:1,clearcoatRoughness:.08},1);
// walnut: flowing grain, cathedral figure and open pores under a satin lacquer
function walnutArt(W,H){var C=[cvs(W,H),cvs(W,H)],x=C[0].getContext("2d"),r=C[1].getContext("2d");x.fillStyle="#4d2c18";x.fillRect(0,0,W,H);r.fillStyle=gray(.5);r.fillRect(0,0,W,H);
var g=x.createLinearGradient(0,0,0,H);for(var i=0;i<=10;i++)g.addColorStop(i/10,R()<.5?"rgba(28,13,5,"+R()*.28+")":"rgba(128,76,40,"+R()*.2+")");x.fillStyle=g;x.fillRect(0,0,W,H);
function line(y,amp,f,ph,lw,col){x.strokeStyle=col;x.lineWidth=lw;x.beginPath();for(var xx=-24;xx<=W+24;xx+=12){var yy=y+Math.sin(xx*f+ph)*amp+Math.sin(xx*f*2.7+ph*1.7)*amp*.3;xx>-24?x.lineTo(xx,yy):x.moveTo(xx,yy)}x.stroke()}
for(var i=0;i<220;i++){var a=.06+R()*.2;line(R()*H,3+R()*9,.002+R()*.004,R()*7,.6+R()*3.4,R()<.58?"rgba(22,10,4,"+a+")":"rgba(176,112,64,"+a*.8+")")}
for(var k=0;k<5;k++){var cx=R()*W,cy=H*(.12+R()*.76),n=7+(R()*7|0),dir=R()<.5?1:-1;for(var j=0;j<n;j++){var L=W*(.05+j*.03),w=H*(.02+j*.02);x.strokeStyle="rgba(20,9,3,"+(.24-j*.013)+")";x.lineWidth=1+R()*2.4;
x.beginPath();x.moveTo(cx-dir*L,cy-w);x.bezierCurveTo(cx-dir*L*.2,cy-w,cx+dir*L*.25,cy-w*.15,cx+dir*L*.3,cy);x.bezierCurveTo(cx+dir*L*.25,cy+w*.15,cx-dir*L*.2,cy+w,cx-dir*L,cy+w);x.stroke()}}
for(var i=0;i<W*H/40;i++){var px=R()*W,py=R()*H,l=2+R()*7;x.fillStyle="rgba(16,7,2,"+(.12+R()*.3)+")";x.fillRect(px,py,l,1);r.fillStyle=gray(.8,.6);r.fillRect(px,py,l,1)}
return[ctex(C[0]),ctex(C[1],1)]}
var WA=walnutArt(MOB?1024:2048,MOB?512:1024);WA.forEach(function(t){rep(t,1/.62,1/.31)});
var VEN=M(0xffffff,.62,0,{map:WA[0],roughnessMap:WA[1],clearcoat:.55,clearcoatRoughness:.3},1),VENE=M(0xd8c2b0,.55,0,{map:WA[0],clearcoat:.5,clearcoatRoughness:.3},1);
var ws=rrShape(T.Shape,TVW-.008,TH-.008,.026);ws.holes.push(rrShape(T.Path,TVW-2*WT,TH-2*WT,.01));
mesh(new T.ExtrudeGeometry(ws,{depth:FD-.008,bevelEnabled:true,bevelThickness:.004,bevelSize:.004,bevelSegments:3,curveSegments:12}),[VENE,VEN],0,TCY,TD/2-FD+.004,tv);
[[.2,.15],[-.2,.15],[.2,-.03],[-.2,-.03]].forEach(function(p){cyl(.014,.017,.03,M(0x141110,.55),p[0],.015,p[1],tv,20)});
// rear housing tapers toward the neck of the tube, vent slots on every face
function ventArt(){var S=256,c=cvs(S),x=c.getContext("2d");x.fillStyle="#2c2119";x.fillRect(0,0,S,S);for(var i=0;i<5000;i++){x.fillStyle="rgba("+(R()<.5?"0,0,0":"95,74,58")+","+R()*.12+")";x.fillRect(R()*S,R()*S,1,1)}
x.fillStyle="#090605";for(var j=0;j<8;j++)for(var i=0;i<2;i++){if(x.roundRect){x.beginPath();x.roundRect(S*(.16+i*.36),S*(.22+j*.07),S*.3,S*.024,S*.012);x.fill()}else x.fillRect(S*(.16+i*.36),S*(.22+j*.07),S*.3,S*.024)}return ctex(c)}
var bg=new T.BoxGeometry(1,1,1),bp=bg.attributes.position;for(var i=0;i<bp.count;i++){var f=bp.getZ(i)>0;bp.setXYZ(i,bp.getX(i)*(f?PW+.004:.27),bp.getY(i)*(f?PH+.004:.2)+(f?0:.02),bp.getZ(i)*.16)}bg.computeVertexNormals();
mesh(bg,M(0xffffff,.74,0,{map:ventArt()}),0,TCY,TD/2-FD-.07,tv);
// front panel: brushed aluminum, ink legends (metal where bare, matte where printed)
fr=grp(0,0,TCY,TD/2,tv);
function panelArt(){var CW=MOB?768:1536,CH=Math.round(CW*PH/PW),k=CW/PW,C=[cvs(CW,CH),cvs(CW,CH)],x=C[0].getContext("2d"),m=C[1].getContext("2d");
x.fillStyle="#c6c8cb";x.fillRect(0,0,CW,CH);m.fillStyle="rgb(0,90,255)";m.fillRect(0,0,CW,CH);
for(var i=0;i<CH;i++){x.fillStyle="rgba("+(R()<.5?"255,255,255":"70,70,72")+","+R()*.07+")";x.fillRect(0,i,CW,1);m.fillStyle="rgba(0,"+((.2+R()*.3)*255|0)+",255,.7)";m.fillRect(0,i,CW,1)}
for(var i=0;i<1100;i++){m.fillStyle="rgba(0,"+((.12+R()*.45)*255|0)+",255,.6)";m.fillRect(R()*CW,R()*CH,40+R()*500,1)}
function P(px,py){return[(px/PW+.5)*CW,(.5-py/PH)*CH]}
function both(fn){x.fillStyle=x.strokeStyle="#161616";m.fillStyle=m.strokeStyle="rgb(0,170,0)";fn(x);fn(m)}
function txt(c,s,px,py,mm,wt,al,ls){var p=P(px,py),sz=mm*.001*k;c.font=(wt||600)+" "+Math.round(sz)+"px 'Helvetica Neue', Helvetica, Arial, sans-serif";c.textAlign=al||"center";c.textBaseline="middle";try{c.letterSpacing=(ls||0)*sz+"px"}catch(e){}c.fillText(s,p[0],p[1]);try{c.letterSpacing="0px"}catch(e){}}
function tri(c,px,py,s){var p=P(px,py),q=s*.001*k;c.beginPath();c.moveTo(p[0]-q,p[1]-q*.9);c.lineTo(p[0]+q,p[1]-q*.9);c.lineTo(p[0],p[1]+q*.7);c.closePath();c.fill()}
both(function(c){txt(c,"VHF",KX-.03,.112,3.4,700,"center",.15);tri(c,KX,.111,2.6);txt(c,"UHF",KX-.024,.03,3,700,"center",.15);tri(c,KX,.029,2.2);
txt(c,"VOLUME",KX-.027,-.071,2.4,600,"center",.1);txt(c,"PULL ON",KX-.027,-.0775,1.9,600,"center",.1);txt(c,"CONTRAST",KX+.027,-.071,2.4,600,"center",.1);
txt(c,"XR-12",-.197,-.128,6.5,800,"left",.04);txt(c,"SOLID STATE  ·  INSTANT PICTURE",-.197,-.143,2.6,600,"left",.14);
c.lineWidth=.0006*k;c.beginPath();var a=P(-.197,-.1515),b=P(.09,-.1515);c.moveTo(a[0],a[1]);c.lineTo(b[0],b[1]);c.stroke()});
var t0=ctex(C[0]),t1=ctex(C[1],1);[t0,t1].forEach(function(t){t.repeat.set(1/PW,1/PH);t.offset.set(.5,.5)});return[t0,t1]}
var PA=panelArt(),PNL=M(0xffffff,1,1,{map:PA[0],roughnessMap:PA[1],metalnessMap:PA[1]});
var ps=rrShape(T.Shape,PW,PH,.006);ps.holes.push(rrShape(T.Path,SW+.014,SH2+.014,.028,SX,SY));
mesh(new T.ExtrudeGeometry(ps,{depth:.004,bevelEnabled:true,bevelThickness:.0008,bevelSize:.0008,bevelSegments:2,curveSegments:16}),[PNL,M(0xb9bcc0,.35,1)],0,0,PZ-.004,fr);
// chrome bezel ring, black sleeve back to the tube
var rs=rrShape(T.Shape,SW+.024,SH2+.024,.033,SX,SY);rs.holes.push(rrShape(T.Path,SW+.012,SH2+.012,.027,SX,SY));
mesh(new T.ExtrudeGeometry(rs,{depth:.0018,bevelEnabled:true,bevelThickness:.0012,bevelSize:.0012,bevelSegments:3,curveSegments:16}),CHRM,0,0,PZ+.0006,fr);
var ss=rrShape(T.Shape,SW+.018,SH2+.018,.03,SX,SY);ss.holes.push(rrShape(T.Path,SW+.004,SH2+.004,.024,SX,SY));
mesh(new T.ExtrudeGeometry(ss,{depth:.032,bevelEnabled:false,curveSegments:16}),M(0x060606,.85),0,0,PZ-.036,fr);
// the screen: curved glass with a CRT shader (scanlines, barrel distortion, glow)
function testCard(){var c=cvs(320,240),x=c.getContext("2d");["#c0c0c0","#c0c000","#00c0c0","#00c000","#c000c0","#c00000","#0000c0"].forEach(function(col,i){x.fillStyle=col;x.fillRect(i*320/7,0,320/7+1,160)});
x.fillStyle="#101010";x.fillRect(0,160,320,80);x.fillStyle="#f2efe8";x.font="bold 46px Georgia, serif";x.textAlign="center";x.textBaseline="middle";x.fillText("XR",160,82);x.font="15px monospace";x.fillText("CH 03  ·  PLEASE STAND BY",160,202);return c}
TVTEX=new T.CanvasTexture(testCard());
function bulge(w,h,amp){var g=new T.PlaneGeometry(w,h,24,18),p=g.attributes.position;for(var i=0;i<p.count;i++){var x=p.getX(i)/(w/2),y=p.getY(i)/(h/2);p.setZ(i,amp*(1-.5*(x*x+y*y)))}g.computeVertexNormals();return g}
CRT=new T.ShaderMaterial({uniforms:{tMap:{value:TVTEX},uT:{value:0},uGain:{value:1.6},uNight:{value:0},uStatic:{value:0},uOn:{value:1}},vertexShader:"varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
fragmentShader:"uniform sampler2D tMap;uniform float uT,uGain,uNight,uStatic,uOn;varying vec2 vUv;float h(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233))+uT)*43758.5453);}void main(){vec2 q=vUv-.5;vec3 off=vec3(.011,.013,.012)*(1.-dot(q,q)*1.6);float sy=clamp(uOn*2.-1.,.004,1.),sx=clamp(uOn*2.,.01,1.);if(abs(q.y)>sy*.5||abs(q.x)>sx*.5){gl_FragColor=vec4(off,1.);return;}q.y/=sy;q.x/=sx;vec2 uv=q;uv*=1.+dot(uv,uv)*.22;uv+=.5;if(uv.x<0.||uv.x>1.||uv.y<0.||uv.y>1.){gl_FragColor=vec4(off,1.);return;}vec3 c=pow(texture2D(tMap,uv).rgb,vec3(2.2));c*=.78+.22*sin(uv.y*540.);c*=.9+.1*sin(uv.x*1600.);float v=uv.x*uv.y*(1.-uv.x)*(1.-uv.y)*16.;c*=pow(v,.35);c+=(h(floor(uv*vec2(320.,240.)))-.5)*.035;c=mix(c,vec3(h(floor(uv*vec2(260.,200.))+uT)*.8),uStatic);c*=uGain*(.97+.03*sin(uT*50.));c=mix(vec3(2.4),c,smoothstep(.45,1.,uOn));gl_FragColor=vec4(max(c,off),1.);}"});
scr=new T.Mesh(bulge(SW,SH2,.014),CRT);scr.position.set(SX,SY,PZ-.032);fr.add(scr);
// the glass only reflects the room, so the set's own glow never shows up as a hot spot
var GLS=new T.MeshBasicMaterial({color:0,combine:T.AddOperation,reflectivity:.16,transparent:true,blending:T.AdditiveBlending,depthWrite:false});ALLM.push(GLS);
var gl=mesh(bulge(SW+.006,SH2+.006,.0145),GLS,SX,SY,PZ-.0305,fr);gl.castShadow=gl.receiveShadow=false;
// badge
function badgeArt(){var c=cvs(512,128),x=c.getContext("2d");x.fillStyle="#000";x.fillRect(0,0,512,128);x.fillStyle="#fff";x.font="italic 800 88px Georgia, 'Times New Roman', serif";x.textAlign="center";x.textBaseline="middle";try{x.letterSpacing="6px"}catch(e){}x.fillText("XR",256,68);return ctex(c,1)}
var BA=badgeArt();BA.repeat.set(1/.064,1/.017);BA.offset.set(.5,.5);rbox(.064,.004,.017,.003,.0008,[M(0xffffff,.16,1,{map:BA,metalnessMap:BA}),GBK],KX,.142,PZ+.0012,fr).rotation.x=PI/2;
rbox(.069,.0035,.022,.0035,.0008,CHRM,KX,.142,PZ+.0004,fr).rotation.x=PI/2;
// dials: the numbers ride on the skirt and turn with it under a fixed index, chrome knurled grip with a fin
function dialArt(nums,big){var S=512,c=cvs(S),x=c.getContext("2d");x.fillStyle="#0e0e0e";x.fillRect(0,0,S,S);var g=x.createRadialGradient(S/2,S/2,S*.25,S/2,S/2,S*.5);g.addColorStop(0,"#1c1c1c");g.addColorStop(1,"#0b0b0b");x.fillStyle=g;x.beginPath();x.arc(S/2,S/2,S/2,0,7);x.fill();
x.fillStyle="#efe9dc";x.textAlign="center";x.textBaseline="middle";x.font="700 "+(S*(big?.095:.08)|0)+"px 'Helvetica Neue', Arial, sans-serif";
nums.forEach(function(n,i){var a=-PI/2-i*2*PI/nums.length,rr=S*.395;x.save();x.translate(S/2+Math.cos(a)*rr,S/2+Math.sin(a)*rr);x.rotate(a+PI/2);x.fillText(n,0,0);x.restore()});
x.strokeStyle="rgba(239,233,220,.6)";x.lineWidth=S*.006;for(var i=0;i<nums.length*2;i++){var a=-PI/2+i*PI/nums.length,r0=S*.47,r1=i%2?S*.485:S*.495;x.beginPath();x.moveTo(S/2+Math.cos(a)*r0,S/2+Math.sin(a)*r0);x.lineTo(S/2+Math.cos(a)*r1,S/2+Math.sin(a)*r1);x.stroke()}return ctex(c)}
function dial(tag,px,py,R0,R1,nums){var g=grp(tag,px,py,PZ,fr);var sk=mesh(new T.CylinderGeometry(R0*.97,R0,.006,64),SATB,0,0,.003,g);sk.rotation.x=PI/2;
mesh(new T.CircleGeometry(R0*.97,64),M(0xffffff,.42,0,{map:dialArt(nums,R0>.025)}),0,0,.0061,g).castShadow=false;
var kn=mesh(knurlGeo(R1,.013,22,.07),CHRM,0,0,.0125,g);kn.rotation.x=PI/2;var cp=mesh(new T.CircleGeometry(R1*.86,40),CHRM,0,0,.019,g);cp.castShadow=false;
rbox(R1*.5,.007,R1*1.8,.0015,.0008,CHRM,0,0,.0215,g).rotation.x=PI/2;var dot=mesh(new T.CircleGeometry(.0013,12),M(0xefe9dc,.5),0,R1*.68,.0252,g);dot.castShadow=false;g.userData.rz=0;return g}
KNOB.tvch=dial("tvch",KX,.074,.031,.0165,["2","3","4","5","6","7","8","9","10","11","12","13"]);
dial(0,KX,.0,.022,.0115,["14","20","26","32","38","44","50","56","62","68","74","83"]);
function sknob(tag,px,py,r){var g=grp(tag,px,py,PZ,fr);var b=mesh(knurlGeo(r,.012,18,.05),CHRM,0,0,.006,g);b.rotation.x=PI/2;mesh(new T.CircleGeometry(r*.84,40),GBK,0,0,.0122,g).castShadow=false;
var ln=box(.0016,r*.85,.0006,M(0xefe9dc,.5),0,r*.42,.0125,g);ln.castShadow=false;g.userData.rz=0;g.userData.z=PZ;g.userData.pz=0;return g}
KNOB.tvpow=sknob("tvpow",KX-.027,-.047,.0125);KNOB.tvpow.userData.pz=.005;KNOB.tvpow.position.z=PZ+.005;sknob(0,KX+.027,-.047,.011).rotation.z=.6;
// perforated speaker grille in a chrome frame
function grilleArt(){var S=512,H=Math.round(S*.066/.104),c=cvs(S,H),x=c.getContext("2d");x.fillStyle="#a7a9ad";x.fillRect(0,0,S,H);for(var i=0;i<H;i++){x.fillStyle="rgba(255,255,255,"+R()*.08+")";x.fillRect(0,i,S,1)}x.fillStyle="#0a0a0a";
for(var j=0;j*17<H+17;j++)for(var i=-1;i*17<S+17;i++){x.beginPath();x.arc(i*17+(j%2)*8.5,j*17,5.6,0,7);x.fill()}return ctex(c)}
var GA=grilleArt();GA.repeat.set(1/.104,1/.066);GA.offset.set(.5,.5);
var gs=rrShape(T.Shape,.104,.066,.007,0,0);mesh(new T.ExtrudeGeometry(gs,{depth:.002,bevelEnabled:false,curveSegments:8}),[M(0xffffff,.45,.7,{map:GA,bumpMap:GA,bumpScale:-.0005}),SATB],KX,-.118,PZ+.0009,fr);
var gf=rrShape(T.Shape,.11,.072,.009,0,0);gf.holes.push(rrShape(T.Path,.104,.066,.007,0,0));mesh(new T.ExtrudeGeometry(gf,{depth:.0026,bevelEnabled:true,bevelThickness:.0008,bevelSize:.0006,bevelSegments:2,curveSegments:8}),CHRM,KX,-.118,PZ+.0004,fr);
// rabbit ears: dome base with a selector knob, two telescoping rods at different reaches, twin-lead down the back
var ant=grp(0,-.07,TCY+TH/2,-.01,tv);mesh(new T.LatheGeometry([[.046,0],[.046,.004],[.043,.012],[.035,.02],[.02,.026],[0,.028]].map(v2),48),GBK,0,0,0,ant);
var sel=cyl(.007,.007,.008,SATB,0,.011,.042,ant,20);sel.rotation.x=PI/2;
[[-1,.6,-.22,[.15,.14,.12]],[1,.47,-.34,[.15,.13,.06]]].forEach(function(a){var e=grp(0,a[0]*.012,.022,0,ant);e.rotation.z=-a[0]*a[1];e.rotation.x=a[2];mesh(new T.SphereGeometry(.0062,16,12),CHRM,0,0,0,e);
var y=0,rad=[.0032,.0025,.0019];a[3].forEach(function(L,i){cyl(rad[i],rad[i],L,CHRM,0,y+L/2,0,e,10);cyl(rad[i]+.0008,rad[i]+.0008,.007,CHRM,0,y+.0035,0,e,12);y+=L-.006});mesh(new T.SphereGeometry(.0045,12,10),CHRM,0,y+.006,0,e)});
var TT_=TCY+TH/2,TLP=[[-.07,TT_+.002,-.035],[-.066,TT_+.003,-.05],[-.058,.3785,-.075],[-.03,.367,-.15],[.02,.3445,-.2],[.06,.29,-.2025]].map(function(a){return new T.Vector3().fromArray(a)}),
TLN=[[0,1,0],[0,1,0],[0,.964,-.265],[0,.964,-.265],[0,.6,-.8],[0,0,-1]].map(function(a){return new T.Vector3().fromArray(a)}),TLC=new T.CatmullRomCurve3(TLP),TP=[],TN=[];
for(var i=0;i<=48;i++){var t=i/48,f=t*5,k=Math.min(4,Math.floor(f));TP.push(TLC.getPointAt(t));TN.push(TLN[k].clone().lerp(TLN[k+1],f-k).normalize())}
mesh(ribbonGeo(TP,TN,.0075,.0016),M(0x7b5232,.5),0,0,0,tv);
tvL=new T.PointLight(0x9fc4ff,.2,1.6,2);tvL.color.convertSRGBToLinear();fr.add(tvL);tvL.position.set(SX,0,.25);
})();
