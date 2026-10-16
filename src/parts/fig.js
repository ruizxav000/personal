// ---------- monstera deliciosa in a glazed stoneware pot ----------
// climbing a coir pole: a rolled new leaf at the top, glossy juveniles, split and fenestrated mature leaves, one old leaf
// yellowing from the tip, each blade on a geniculum knee; speckled cream glaze pools in the flutes and stops short of a
// raw clay foot in drips; matching saucer; soil dressed with bark chips and perlite
var fig=grp(0,-.98,.008*.92,.08);fig.rotation.y=-.75;fig.scale.setScalar(.92);
var TL={value:new T.Vector3(0,1,0)},TI={value:1},LEAVES=[];
(function(){
// ---- pot and saucer
function glazeArt(){var W=MOB?1024:2048,H=W/4,C=[cvs(W,H),cvs(W,H)],x=C[0].getContext("2d"),m=C[1].getContext("2d"),FOOT=H*.885;
x.fillStyle="#a06f4c";x.fillRect(0,0,W,H);for(var i=0;i<W*H/25;i++){x.fillStyle="rgba("+(R()<.5?"70,40,22":"205,165,125")+","+R()*.22+")";x.fillRect(R()*W,R()*H,1+R(),1+R())}
m.fillStyle="rgb(0,225,0)";m.fillRect(0,0,W,H);
var edge=new Float32Array(W),drips=[];for(var i=0;i<W;i++)edge[i]=FOOT+Math.sin(i/W*2*PI*3)*4+Math.sin(i/W*2*PI*11+1)*2+(R()-.5);
for(var d=0;d<30;d++){var cx=R()*W,wd=3+R()*10,len=6+R()*32;drips.push([cx,wd,len]);for(var i=Math.floor(cx-wd*2.5);i<cx+wd*2.5;i++){var ii=(i%W+W)%W;edge[ii]=Math.max(edge[ii],FOOT+Math.exp(-Math.pow((i-cx)/wd,2))*len)}}
for(var i=0;i<W;i++){var rg=Math.pow(Math.abs(Math.cos(i/W*2*PI*14)),.6),e=edge[i];
x.fillStyle="rgb("+[238-11*(1-rg),231-14*(1-rg),216-20*(1-rg)].map(Math.round).join(",")+")";x.fillRect(i,0,1,e);
var g=x.createLinearGradient(0,e-14,0,e);g.addColorStop(0,"rgba(222,206,178,0)");g.addColorStop(1,"rgba(206,186,150,.85)");x.fillStyle=g;x.fillRect(i,e-14,1,14);m.fillStyle="rgb(255,46,0)";m.fillRect(i,0,1,e)}
drips.forEach(function(d){x.fillStyle="rgba(206,186,150,.7)";x.beginPath();x.ellipse(d[0],FOOT+d[2]-2,d[1]*.7,3.5,0,0,7);x.fill()});
for(var i=0;i<150;i++){var px=R()*W,py=R()*FOOT*.95,rr=20+R()*90,g=x.createRadialGradient(px,py,0,px,py,rr);g.addColorStop(0,R()<.5?"rgba(255,252,240,.2)":"rgba(196,176,146,.15)");g.addColorStop(1,"rgba(0,0,0,0)");x.fillStyle=g;x.fillRect(px-rr,py-rr,rr*2,rr*2)}
for(var i=0;i<W*H/170;i++){var px=R()*W,py=R()*H;if(py>edge[px|0]-2)continue;var s=R()<.88?.5+R()*1.1:1.4+R()*2.2;if(s>1.4){x.fillStyle="rgba(150,105,65,.13)";x.beginPath();x.arc(px,py,s*2.6,0,7);x.fill()}x.fillStyle="rgba(86,54,32,"+(.35+R()*.5)+")";x.beginPath();x.arc(px,py,s,0,7);x.fill()}
return[ctex(C[0]),ctex(C[1],1)]}
var GZ=glazeArt(),POT=M(0xffffff,1,0,{map:GZ[0],roughnessMap:GZ[1],clearcoat:1,clearcoatMap:GZ[1],clearcoatRoughness:.14,side:T.DoubleSide,bumpMap:noiseTex("#808080",.3,6000,256,1),bumpScale:.0007},1),
GLZ=M(0xebe3d2,.24,0,{clearcoat:1,clearcoatRoughness:.14},1);
var pg=new T.CylinderGeometry(.165,.15,.31,168,6,true),ppa=pg.attributes.position;for(var q=0;q<ppa.count;q++){var x=ppa.getX(q),z=ppa.getZ(q),a=Math.atan2(z,x),k=1+.035*Math.pow(Math.abs(Math.cos(a*14)),.6);ppa.setX(q,x*k);ppa.setZ(q,z*k)}pg.computeVertexNormals();
mesh(pg,POT,0,.155,0,fig);cyl(.15,.15,.01,M(0x9a6b4a,.9),0,.004,0,fig,64);var rim=mesh(new T.TorusGeometry(.1685,.0068,12,120),GLZ,0,.31,0,fig);rim.rotation.x=PI/2;
mesh(new T.LatheGeometry([[0,-.008],[.168,-.008],[.176,-.006],[.192,.008],[.198,.0175],[.2,.0195],[.1965,.0207],[.191,.012],[.18,.002],[.17,0],[0,0]].map(v2),96),GLZ,0,0,0,fig);
// soil dressed with bark chips and perlite, kept clear of the stem and pole
cyl(.159,.159,.012,M(0x2a2018,1,0,{bumpMap:noiseTex("#808080",.9,9000,256,1),bumpScale:.004}),0,.289,0,fig,56);
function bits(geo,mat,n,col,size,yy){var im=new T.InstancedMesh(geo,mat,n),o=new T.Object3D(),c=new T.Color();for(var i=0;i<n;i++){var rr,an,x,z;do{rr=.148*Math.sqrt(R());an=R()*2*PI;x=Math.cos(an)*rr;z=Math.sin(an)*rr}while(Math.hypot(x,z)<.035||Math.hypot(x+.04,z+.035)<.04);
o.position.set(x,yy+R()*.004,z);o.rotation.set((R()-.5)*.5,R()*6.3,(R()-.5)*.5);var s=size[0]+R()*(size[1]-size[0]);o.scale.set(s,s*(.22+R()*.2),s*(.55+R()*.4));o.updateMatrix();im.setMatrixAt(i,o.matrix);
im.setColorAt(i,c.set(col[(R()*col.length)|0]).convertSRGBToLinear().multiplyScalar(.65+R()*.45))}im.castShadow=im.receiveShadow=true;fig.add(im);return im}
var bk_=new T.BoxGeometry(1,1,1,3,1,3),bkp=bk_.attributes.position;for(var i=0;i<bkp.count;i++){var x=bkp.getX(i),y=bkp.getY(i),z=bkp.getZ(i),j=Math.sin(x*41+z*17)*.12;bkp.setXYZ(i,x+j*.3,y*(1+j),z+Math.sin(x*13-z*29)*.1)}bk_.computeVertexNormals();
bits(bk_,M(0xffffff,.9),46,["#4a2c1a","#5a3722","#3d2416","#6b4429","#57402c"],[.014,.026],.296);
bits(new T.IcosahedronGeometry(.5,0),M(0xffffff,.8),80,["#efebe3","#e4e0d6","#f6f4ee"],[.004,.008],.297);
// ---- coir pole the stem climbs, with two plant ties
function coirArt(){var W=256,H=1024,C=[cvs(W,H),cvs(W,H)],x=C[0].getContext("2d"),b=C[1].getContext("2d");x.fillStyle="#5a3e26";x.fillRect(0,0,W,H);b.fillStyle=gray(.45);b.fillRect(0,0,W,H);
for(var i=0;i<6000;i++){var px=R()*W,py=R()*H,a=(R()-.5)*1.4,l=8+R()*40,v=R()<.5;x.strokeStyle=v?"rgba(28,16,7,"+(.3+R()*.4)+")":"rgba("+(150+R()*60|0)+","+(104+R()*40|0)+","+(60+R()*30|0)+","+(.3+R()*.45)+")";x.lineWidth=.6+R()*1.4;b.strokeStyle=gray(v?.18:.85,.6);b.lineWidth=1+R();
[x,b].forEach(function(c){c.beginPath();c.moveTo(px,py);c.lineTo(px+Math.sin(a)*l,py+Math.cos(a)*l);c.stroke()})}return[rep(ctex(C[0]),1,1.2),rep(ctex(C[1],1),1,1.2)]}
var CO=coirArt();cyl(.028,.03,.86,M(0xffffff,.96,0,{map:CO[0],bumpMap:CO[1],bumpScale:.003}),-.04,.72,-.035,fig,28);
[.47,.68].forEach(function(y){var t=mesh(new T.TorusGeometry(.056,.0035,6,48),M(0x3f7a33,.6),-.024,y,-.012,fig);t.rotation.x=PI/2;t.scale.set(1,.82,1)});
// ---- leaves: front color, back color and normal map sharing one cut-out
var LS=MOB?640:1024;
function monLeaf(o){var S=LS,C=[cvs(S),cvs(S),cvs(S),cvs(S)],f=C[0].getContext("2d"),bk=C[1].getContext("2d"),hg=C[2].getContext("2d"),mk=C[3].getContext("2d");
function X(u){return S*(.5+u)}function Y(t){return S*t}
// right half of the outline in leaf units (u out from the midrib, t from the petiole sinus to the tip), mirrored for the left
var B=[[[0,.15],[.03,.06],[.12,.012],[.22,.03]],[[.22,.03],[.37,.055],[.485,.2],[.483,.41]],[[.483,.41],[.48,.63],[.33,.86],[.075,.955]],[[.075,.955],[.04,.968],[.015,.983],[0,.995]]];
function bz(s,k){var m=1-k;return[0,1].map(function(c){return m*m*m*s[0][c]+3*m*m*k*s[1][c]+3*m*k*k*s[2][c]+k*k*k*s[3][c]})}
var OL=[];B.forEach(function(s){for(var i=0;i<24;i++)OL.push(bz(s,i/24))});OL.push([0,.995]);OL.forEach(function(p){p[0]*=o.w});
function hw(t){var b=0;for(var i=24;i<OL.length-1;i++){var a=OL[i],c=OL[i+1];if((a[1]-t)*(c[1]-t)<=0&&a[1]!==c[1])b=Math.max(b,a[0]+(c[0]-a[0])*(t-a[1])/(c[1]-a[1]))}return b}
function outline(c){c.beginPath();OL.forEach(function(p,i){i?c.lineTo(X(p[0]),Y(p[1])):c.moveTo(X(p[0]),Y(p[1]))});for(var i=OL.length-1;i>=0;i--)c.lineTo(X(-OL[i][0]),Y(OL[i][1]));c.closePath()}
// primary veins leave the midrib and sweep out toward the tip; the lowest one curls back into the basal lobe
var NV=o.nv,VN=[];for(var i=0;i<NV;i++){var tb=.2+i*(.72/NV)+(R()-.5)*.01,te=Math.min(.965,tb+.09+.08*i/NV),ue=hw(te)*.985;if(!i){te=.1;ue=hw(.1)*.95}VN.push({b:[0,tb],c:[ue*.4,tb+(te-tb)*.15],e:[ue,te]})}
function vp(v,s){var m=1-s;return[m*m*v.b[0]+2*m*s*v.c[0]+s*s*v.e[0],m*m*v.b[1]+2*m*s*v.c[1]+s*s*v.e[1]]}
function between(i,mix,s){var a=vp(VN[i],s),b=vp(VN[i+1],s);return[a[0]+(b[0]-a[0])*mix,a[1]+(b[1]-a[1])*mix]}
function vpath(c,v,sd){c.beginPath();for(var k=0;k<=20;k++){var p=vp(v,k/20);k?c.lineTo(X(p[0]*sd),Y(p[1])):c.moveTo(X(p[0]*sd),Y(p[1]))}c.stroke()}
function secondaries(c){for(var i=0;i<NV-1;i++)for(var j=1;j<4;j++)[-1,1].forEach(function(sd){c.beginPath();for(var k=0;k<=16;k++){var p=between(i,j/4,.06+.94*k/16);k?c.lineTo(X(p[0]*sd),Y(p[1])):c.moveTo(X(p[0]*sd),Y(p[1]))}c.stroke()})}
function midrib(c,w){c.beginPath();c.moveTo(X(-w),Y(.15));c.lineTo(X(w),Y(.15));c.lineTo(X(w*.18),Y(.99));c.lineTo(X(-w*.18),Y(.99));c.closePath();c.fill()}
// mask: the silhouette minus the splits, holes and a few nicks
outline(mk);mk.fillStyle="#fff";mk.fill();mk.globalCompositeOperation="destination-out";mk.fillStyle="#000";var RIMS=[],S0={};
function cut(poly){mk.beginPath();poly.forEach(function(p,k){k?mk.lineTo(p[0],p[1]):mk.moveTo(p[0],p[1])});mk.closePath();mk.fill();RIMS.push(poly)}
(o.splits||[]).forEach(function(i){[-1,1].forEach(function(sd){if(i>=NV-1||R()<(o.skip||0))return;var mix=.4+R()*.2,s0=o.dep[0]+R()*(o.dep[1]-o.dep[0]);S0[i+":"+sd]=s0;var w0=.011+R()*.006,w1=.05+R()*.05,pts=[];
for(var k=0;k<=18;k++)pts.push(between(i,mix,s0+(1-s0)*k/18));var n=pts.length,dl=[pts[n-1][0]-pts[n-2][0],pts[n-1][1]-pts[n-2][1]],dn=Math.hypot(dl[0],dl[1])||1;for(var k=1;k<=3;k++)pts.push([pts[n-1][0]+dl[0]/dn*.03*k,pts[n-1][1]+dl[1]/dn*.03*k]);
var Lp=[],Rp=[];pts.forEach(function(p,k){var q=pts[Math.min(k+1,pts.length-1)],r=pts[Math.max(k-1,0)],tx=q[0]-r[0],ty=q[1]-r[1],tl=Math.hypot(tx,ty)||1,w=(w0+(w1-w0)*Math.pow(Math.min(1,k/18),1.6))/2;Lp.push([p[0]-ty/tl*w,p[1]+tx/tl*w]);Rp.push([p[0]+ty/tl*w,p[1]-tx/tl*w])});
var poly=[],c0=pts[0],tx0=pts[1][0]-c0[0],ty0=pts[1][1]-c0[1],tl0=Math.hypot(tx0,ty0)||1,ux=tx0/tl0,uy=ty0/tl0,nx=-uy,ny=ux,rc=w0*.55;for(var k=0;k<=10;k++){var ph=PI*k/10,px=c0[0]+rc*(nx*Math.cos(ph)-ux*Math.sin(ph)),py=c0[1]+rc*(ny*Math.cos(ph)-uy*Math.sin(ph));poly.push([X(px*sd),Y(py)])}
Rp.forEach(function(p){poly.push([X(p[0]*sd),Y(p[1])])});for(var k=Lp.length-1;k>=0;k--)poly.push([X(Lp[k][0]*sd),Y(Lp[k][1])]);cut(poly)})});
(o.holes||[]).forEach(function(i){[-1,1].forEach(function(sd){if(i>=NV-1||R()<(o.hskip||0))return;var lim=S0[i+":"+sd]!=null?S0[i+":"+sd]-.08:.6,sa=o.hs*.7+R()*.05,sb=Math.min(sa+.12+R()*.12,lim);if(sb-sa<.07)return;
var mix=.46+R()*.08,mid=(sa+sb)/2,ga=vp(VN[i],mid),gb=vp(VN[i+1],mid),wm=Math.min(.008+R()*.007,Math.hypot(gb[0]-ga[0],gb[1]-ga[1])*.27),C=[];for(var k=0;k<=18;k++)C.push(between(i,mix,sa+(sb-sa)*k/18));
var L=[],Rr=[];C.forEach(function(p,k){var q=C[Math.min(k+1,18)],r=C[Math.max(k-1,0)],tx=q[0]-r[0],ty=q[1]-r[1],tl=Math.hypot(tx,ty)||1,f=k/18,w=wm*Math.pow(Math.sin(PI*f),.32)*(1.06-.22*f);L.push([X((p[0]-ty/tl*w)*sd),Y(p[1]+tx/tl*w)]);Rr.push([X((p[0]+ty/tl*w)*sd),Y(p[1]-tx/tl*w)])});
cut(L.concat(Rr.reverse()))})});
for(var i=0;i<(o.nicks||0);i++){var t=.3+R()*.6,u=hw(t)*(R()<.5?-1:1);mk.beginPath();mk.arc(X(u),Y(t),S*(.006+R()*.01),0,7);mk.fill()}
mk.globalCompositeOperation="source-over";
// height: veins and midrib sink into the upper surface, the lamina puffs up between them
hg.fillStyle=gray(.6);hg.fillRect(0,0,S,S);hg.lineCap="round";hg.filter="blur("+(S*.006)+"px)";hg.fillStyle=gray(.38);midrib(hg,.012);hg.strokeStyle=gray(.44);hg.lineWidth=S*.012;VN.forEach(function(v){vpath(hg,v,1);vpath(hg,v,-1)});hg.filter="none";
hg.strokeStyle=gray(.575);hg.lineWidth=S*.0015;secondaries(hg);hg.strokeStyle=gray(.68);hg.lineWidth=S*.008;RIMS.forEach(function(poly){hg.beginPath();poly.forEach(function(p,k){k?hg.lineTo(p[0],p[1]):hg.moveTo(p[0],p[1])});hg.closePath();hg.stroke()});
// front: deep waxy green, paler at the midrib, faint secondary veins
f.fillStyle=o.young?"#4a8a34":"#1e4823";f.fillRect(0,0,S,S);var rg=f.createRadialGradient(X(0),Y(.42),S*.04,X(0),Y(.5),S*.6);rg.addColorStop(0,o.young?"rgba(150,200,90,.35)":"rgba(80,130,60,.32)");rg.addColorStop(1,"rgba(8,25,8,.3)");f.fillStyle=rg;f.fillRect(0,0,S,S);
for(var i=0;i<26;i++){var px=R()*S,py=R()*S,rr=S*(.08+R()*.2),g2=f.createRadialGradient(px,py,0,px,py,rr);g2.addColorStop(0,R()<.5?"rgba(10,32,14,.22)":"rgba(70,120,60,.16)");g2.addColorStop(1,"rgba(0,0,0,0)");f.fillStyle=g2;f.fillRect(px-rr,py-rr,rr*2,rr*2)}
for(var i=0;i<S*7;i++){var s=1+R()*4;f.fillStyle="rgba("+(R()<.5?"8,26,8":"110,160,80")+","+R()*.04+")";f.fillRect(R()*S,R()*S,s,s)}
f.lineCap="round";f.strokeStyle=o.young?"rgba(200,230,140,.07)":"rgba(150,190,100,.05)";f.lineWidth=S*.0018;secondaries(f);
f.strokeStyle=o.young?"rgba(190,225,140,.4)":"rgba(120,170,95,.32)";f.lineWidth=S*.006;VN.forEach(function(v){vpath(f,v,1);vpath(f,v,-1)});
f.fillStyle=o.young?"rgba(190,228,150,.85)":"rgba(140,186,112,.8)";midrib(f,.013);
// back: pale and matte, the veins stand proud
bk.fillStyle=o.young?"#8fbe6c":"#749f5a";bk.fillRect(0,0,S,S);for(var i=0;i<S*4;i++){bk.fillStyle="rgba("+(R()<.5?"40,70,30":"200,225,160")+","+R()*.05+")";bk.fillRect(R()*S,R()*S,2,2)}
bk.lineCap="round";bk.strokeStyle="rgba(200,225,160,.25)";bk.lineWidth=S*.0022;secondaries(bk);bk.strokeStyle="rgba(215,235,170,.75)";bk.lineWidth=S*.0075;VN.forEach(function(v){vpath(bk,v,1);vpath(bk,v,-1)});bk.fillStyle="rgba(222,238,180,.92)";midrib(bk,.015);
// an old leaf yellows from the tip and crisps brown along the edge
if(o.old)[[f,1],[bk,.8]].forEach(function(q){var x=q[0],yg=x.createRadialGradient(X(.04),Y(1.02),S*.02,X(.04),Y(1.02),S*.52);yg.addColorStop(0,"rgba(224,198,72,"+.97*q[1]+")");yg.addColorStop(.42,"rgba(198,184,66,"+.7*q[1]+")");yg.addColorStop(.78,"rgba(150,160,60,"+.22*q[1]+")");yg.addColorStop(1,"rgba(120,150,60,0)");x.fillStyle=yg;x.fillRect(0,0,S,S);
x.save();x.beginPath();x.arc(X(0),Y(.98),S*.34,0,7);x.clip();outline(x);x.strokeStyle="rgba(150,100,40,.55)";x.lineWidth=S*.05;x.stroke();x.strokeStyle="rgba(108,70,28,.95)";x.lineWidth=S*.024;x.stroke();x.restore();
for(var i=0;i<14;i++){var t=.55+R()*.4,u=(R()-.5)*hw(t)*1.6;x.fillStyle="rgba(120,85,35,"+(.35+R()*.4)*q[1]+")";x.beginPath();x.arc(X(u),Y(t),S*(.004+R()*.01),0,7);x.fill()}});
function rims(x,col,w){x.save();x.strokeStyle=col;x.lineWidth=w;x.lineJoin="round";RIMS.forEach(function(poly){x.beginPath();poly.forEach(function(p,k){k?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1])});x.closePath();x.stroke()});x.restore()}
rims(f,"rgba(30,60,20,.3)",S*.011);rims(f,o.young?"rgba(185,220,130,.32)":"rgba(140,178,96,.26)",S*.0035);rims(bk,"rgba(215,232,170,.45)",S*.005);
[f,bk].forEach(function(x){x.globalCompositeOperation="destination-in";x.drawImage(C[3],0,0);x.globalCompositeOperation="source-over"});
hg.filter="blur(1.5px)";hg.drawImage(C[2],0,0);hg.filter="none";var hd=hg.getImageData(0,0,S,S).data,nc=cvs(S),nx=nc.getContext("2d"),nd=nx.createImageData(S,S);
for(var y=0;y<S;y++)for(var x=0;x<S;x++){var i=(y*S+x)*4,l=hd[(y*S+Math.max(0,x-1))*4],r=hd[(y*S+Math.min(S-1,x+1))*4],u=hd[(Math.max(0,y-1)*S+x)*4],dn=hd[(Math.min(S-1,y+1)*S+x)*4],dx=(r-l)/255*2.2,dy=(dn-u)/255*2.2,iz=1/Math.sqrt(dx*dx+dy*dy+1);
nd.data[i]=(-dx*iz*.5+.5)*255;nd.data[i+1]=(dy*iz*.5+.5)*255;nd.data[i+2]=(iz*.5+.5)*255;nd.data[i+3]=255}nx.putImageData(nd,0,0);
var g=new T.PlaneGeometry(1,1,56,56);g.rotateX(-PI/2);g.translate(0,0,.5);var gp=g.attributes.position,VP=VN.map(function(v){var a=[];for(var k=0;k<=20;k++)a.push(vp(v,k/20));return a});
for(var i=0;i<gp.count;i++){var x=gp.getX(i),z=gp.getZ(i),ax=Math.abs(x),dm=1;VP.forEach(function(a){for(var k=0;k<a.length;k++){var d=Math.hypot(a[k][0]-ax,a[k][1]-z);if(d<dm)dm=d}});
var w=Math.max(hw(Math.min(.97,Math.max(.04,z))),.05),rr=Math.min(1.4,ax/w),pl=Math.min(1,dm/.035);
gp.setY(i,-z*z*.3+ax*.2-Math.pow(Math.max(0,rr-.3),2)*.16*w*2-x*x*.2+(pl*pl*(3-2*pl))*.011*Math.min(1,ax*8)+Math.sin(z*5.5)*.012)}g.computeVertexNormals();
var mc=cvs(64),mx_=mc.getContext("2d");mx_.drawImage(C[3],0,0,64,64);var md=mx_.getImageData(0,0,64,64).data,ma=new Uint8Array(4096);for(var i=0;i<4096;i++)ma[i]=md[i*4]>128?1:0;
return{f:ctex(C[0]),b:ctex(C[1]),n:ctex(nc,1),g:g,a:ma}}
// leaves glow when light comes from behind them
function translucent(m,col){m.onBeforeCompile=function(sh){sh.uniforms.uTL=TL;sh.uniforms.uTI=TI;sh.fragmentShader="uniform vec3 uTL;uniform float uTI;\n"+sh.fragmentShader.replace("#include <lights_fragment_end>","#include <lights_fragment_end>\nfloat bl=max(0.,-dot(normal,uTL));reflectedLight.directDiffuse+=diffuseColor.rgb*vec3("+col+")*bl*uTI;")};return m}
var LV=[monLeaf({w:1,nv:8,splits:[1,2,3,4,5,6],skip:.12,dep:[.3,.46],holes:[2,3,4,5],hs:.12,hskip:.35,nicks:1}),monLeaf({w:.98,nv:7,splits:[1,2,3,4,5],dep:[.36,.55],holes:[1,2,3,4],hs:.11,hskip:.25}),
monLeaf({w:.95,nv:7,splits:[2,3,4],dep:[.45,.62],skip:.15,holes:[1,2,3,4,5],hs:.14,hskip:.35}),monLeaf({w:.86,nv:6,holes:[2,3],hs:.22,hskip:.5,young:1}),
monLeaf({w:1,nv:8,splits:[1,2,3,4,5,6],skip:.1,dep:[.32,.48],holes:[2,3,4],hs:.12,hskip:.35,nicks:3,old:1})];
function leafMats(L,young){var front=translucent(M(0xffffff,young?.22:.3,0,{map:L.f,normalMap:L.n,normalScale:new T.Vector2(.8,.8),side:T.FrontSide,alphaTest:.5,alphaToCoverage:true,clearcoat:young?.7:.32,clearcoatRoughness:young?.14:.34},1),".9,1.15,.45"),
back=translucent(M(0xffffff,.62,0,{map:L.b,normalMap:L.n,normalScale:new T.Vector2(-.8,-.8),side:T.BackSide,alphaTest:.5,alphaToCoverage:true},1),"1.,1.2,.5"),dep=new T.MeshDepthMaterial({depthPacking:T.RGBADepthPacking,map:L.f,alphaTest:.5,side:T.DoubleSide});return{front:front,back:back,dep:dep}}
var LM=LV.map(function(L,i){return leafMats(L,i===3)});
// leaf surface: folds along the midrib, droops toward the tip, edges ripple
var LGEO=(function(){var g=new T.PlaneGeometry(1,1,28,28);g.rotateX(-PI/2);g.translate(0,0,.5);var p=g.attributes.position;
for(var i=0;i<p.count;i++){var x=p.getX(i),z=p.getZ(i),ax=Math.abs(x);p.setY(i,-z*z*.36+ax*.16-x*x*.55+Math.sin(z*17+ax*6)*.012*ax*2+Math.sin(z*5.5)*.015)}g.computeVertexNormals();return g})();
// petioles taper from a sheathing base to the blade, where they swell into the geniculum
var PET=M(0x5f8a42,.42,0,{clearcoat:.35,clearcoatRoughness:.35},1),GEN=M(0x8aa95a,.5,0,{clearcoat:.3,clearcoatRoughness:.4},1),STM=M(0x5e5a38,.7);
function taperTube(curve,r0,r1,mat){var tub=28,rad=8,g=new T.TubeGeometry(curve,tub,1,rad),p=g.attributes.position,c=new T.Vector3(),v=new T.Vector3();
for(var i=0;i<=tub;i++){curve.getPointAt(i/tub,c);var r=r0+(r1-r0)*Math.pow(i/tub,.6);for(var j=0;j<=rad;j++){var k=i*(rad+1)+j;v.fromBufferAttribute(p,k).sub(c).multiplyScalar(r).add(c);p.setXYZ(k,v.x,v.y,v.z)}}g.computeVertexNormals();return mesh(g,mat,0,0,0,fig)}
// the stem hugs the pole, ringed by old leaf scars
var stemC=new T.CatmullRomCurve3([[0,.29,0],[-.003,.4,.006],[-.008,.55,.012],[-.012,.7,.014],[-.016,.84,.012]].map(function(a){return new T.Vector3().fromArray(a)}));taperTube(stemC,.022,.015,STM);
for(var i=1;i<8;i++){var np=stemC.getPointAt(i/8),nr=mesh(new T.TorusGeometry(.0205-i*.0007,.0028,6,20),M(0x6b6340,.8),np.x,np.y,np.z,fig);nr.rotation.x=PI/2;nr.castShadow=false}
// [azimuth, height, reach, leaf size, tilt, leaf variant, node t]
var MON=[[.15,1.25,.42,.5,.55,0,.9],[.75,1.08,.52,.46,.72,1,.75],[1.35,.98,.5,.42,.8,2,.6],[-.25,.95,.26,.38,.6,1,.85],[.45,.78,.62,.4,1.0,0,.45],[1.05,.74,.58,.36,1.05,2,.35],[1.9,.66,.4,.32,.9,1,.3],
[.95,1.38,.28,.44,.48,0,1],[-.6,.76,.22,.3,.78,2,.5],[.2,.6,.66,.34,1.12,4,.2],[1.6,1.18,.4,.42,.62,0,.8],[.6,1.5,.16,.24,.35,3,1],[1.25,1.32,.3,.27,.5,3,.95]];
var OBST=[new T.Box3(new T.Vector3(-.6,-.1,-.25),new T.Vector3(.6,.8,.26)),new T.Box3(new T.Vector3(-.45,.7,-.2),new T.Vector3(-.28,1.1,.02)),new T.Box3(new T.Vector3(-.36,.7,-.25),new T.Vector3(.16,.95,.24))];
fig.updateMatrixWorld(true);var _lp=new T.Vector3(),_q=new T.Vector3(),_inv=new T.Matrix4().copy(fig.matrixWorld).invert();
// leaves keep clear of each other: every placed leaf drops its points into a coarse grid
var GRID={},GC=.04,GAP=.04;function gk(x,y,z){return Math.floor(x/GC)+","+Math.floor(y/GC)+","+Math.floor(z/GC)}
function near(P){var cx=Math.floor(P.x/GC),cy=Math.floor(P.y/GC),cz=Math.floor(P.z/GC);for(var a=-1;a<2;a++)for(var b=-1;b<2;b++)for(var c=-1;c<2;c++){var L=GRID[(cx+a)+","+(cy+b)+","+(cz+c)];if(L)for(var i=0;i<L.length;i++)if(L[i].distanceToSquared(P)<GAP*GAP)return true}return false}
function claim(pts){pts.forEach(function(P){var k=gk(P.x,P.y,P.z);(GRID[k]||(GRID[k]=[])).push(P)})}
var LASTPTS=null;
function leafHits(grpObj,curve){grpObj.updateMatrixWorld(true);var bad=false,pts=[];for(var k=0;k<=12;k++)pts.push(curve.getPointAt(k/12).clone().applyMatrix4(fig.matrixWorld));
var nc=pts.length;grpObj.traverse(function(o){if(o.isMesh&&o.userData.blade&&!o.userData.backFace){var p=o.geometry.attributes.position,uv=o.geometry.attributes.uv,A=o.userData.alpha;for(var q=0;q<p.count;q+=3){var iu=Math.min(63,uv.getX(q)*64|0),iv=Math.min(63,(1-uv.getY(q))*64|0);if(A[iv*64+iu])pts.push(_lp.fromBufferAttribute(p,q).applyMatrix4(o.matrixWorld).clone())}}});
for(var j=0;j<pts.length&&!bad;j++){var P=pts[j];if(P.z<BZ+.025||P.x<LX+.025)bad=true;_q.copy(P).applyMatrix4(_inv);if(_q.y>.3&&_q.y<1.17&&Math.hypot(_q.x+.04,_q.z+.035)<.042)bad=true;for(var o2=0;o2<OBST.length&&!bad;o2++)if(OBST[o2].containsPoint(P))bad=true;if(!bad&&j>4&&near(P))bad=true}LASTPTS=pts;return bad}
function sub(c,t0){return new T.CatmullRomCurve3([0,.33,.66,1].map(function(k){return c.getPointAt(t0+(1-t0)*k)}))}
MON.forEach(function(L,i){var tries=[0,-.3,.3,-.6,.6,-.9,.9,-1.2,1.2,-1.6,1.6];
for(var tj=0;tj<tries.length*3;tj++){var ti=tj>>0,hv=[1,.9,1.1][Math.floor(tj/tries.length)];ti=tj%tries.length;var a=L[0]+tries[ti],h=L[1]*hv,r=L[2]*(hv>1?.9:1.05),sz=L[3]*(hv===1?1:.94),d=new T.Vector3(Math.sin(a),0,Math.cos(a)),o=stemC.getPointAt(L[6]),hh=h-o.y+.22;
var c=new T.CatmullRomCurve3([o.clone(),o.clone().add(new T.Vector3(0,hh*.3,0)).addScaledVector(d,r*.12),o.clone().add(new T.Vector3(0,hh*.72,0)).addScaledVector(d,r*.5),o.clone().add(new T.Vector3(0,hh,0)).addScaledVector(d,r*.92),o.clone().add(new T.Vector3(0,hh-.015,0)).addScaledVector(d,r)]);
var holder=grp(0,0,0,0,fig),r1=.0042+sz*.003;[taperTube(c,.0105+sz*.006,r1,PET),taperTube(sub(c,.91),r1*1.05,r1*1.5,GEN)].forEach(function(tb){fig.remove(tb);holder.add(tb)});
var tip=c.getPointAt(1),lg=grp(0,tip.x,tip.y,tip.z,holder);mesh(new T.SphereGeometry(r1*1.5,12,8),GEN,tip.x,tip.y,tip.z,holder);lg.rotation.order="YXZ";lg.rotation.set(L[4],a+(R()-.5)*.35,(R()-.5)*.3);
var m=LM[L[5]];[m.front,m.back].forEach(function(mt,j){var lf=mesh(LV[L[5]].g,mt,0,.004*sz,-.16*sz,lg);lf.userData.blade=1;lf.userData.alpha=LV[L[5]].a;lf.userData.backFace=j;lf.scale.set(sz*1.02,sz,sz);if(j)lf.castShadow=false;else lf.customDepthMaterial=m.dep});
if(!leafHits(holder,c)){claim(LASTPTS);LEAVES.push({g:lg,rx:lg.rotation.x,rz:lg.rotation.z,i:i});return}fig.remove(holder)}});
// the low yellowing leaf swings toward the front of the room so it no longer covers the shelf from the main view
LEAVES.forEach(function(Lf){if(Lf.i===9)Lf.g.parent.rotation.y=-.9});
// a new leaf still rolled tight, on a pale young petiole at the top of the stem
function rollArt(){var c=cvs(128,512),x=c.getContext("2d"),g=x.createLinearGradient(0,0,0,512);g.addColorStop(0,"#c3dd84");g.addColorStop(1,"#8ab44c");x.fillStyle=g;x.fillRect(0,0,128,512);
x.strokeStyle="rgba(60,100,35,.5)";x.lineWidth=3;for(var k=-6;k<9;k++){x.beginPath();x.moveTo(0,k*70);x.lineTo(128,k*70+150);x.stroke()}x.strokeStyle="rgba(235,248,190,.35)";x.lineWidth=2;for(var k=-6;k<9;k++){x.beginPath();x.moveTo(0,k*70+5);x.lineTo(128,k*70+155);x.stroke()}return ctex(c)}
var st=stemC.getPointAt(1),nlc=new T.CatmullRomCurve3([st.clone(),st.clone().add(new T.Vector3(.012,.08,.022)),st.clone().add(new T.Vector3(.03,.17,.05))]);taperTube(nlc,.009,.0058,M(0x7ea84c,.4,0,{clearcoat:.4},1));
var ntp=nlc.getPointAt(1),roll=mesh(new T.LatheGeometry([[0,0],[.0055,.008],[.0098,.035],[.0104,.065],[.0088,.11],[.0052,.155],[.0016,.188],[0,.194]].map(v2),24),translucent(M(0xffffff,.3,0,{map:rollArt(),clearcoat:.7,clearcoatRoughness:.15},1),".8,1.1,.4"),ntp.x,ntp.y,ntp.z,fig);
roll.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),nlc.getTangentAt(1).lerp(new T.Vector3(0,1,0),.35).normalize());
// papery brown cataphylls left at the nodes
for(var i=0;i<5;i++){var sp=stemC.getPointAt(.12+i*.18),sh=mesh(new T.CylinderGeometry(.006,.019,.05,10,1,true),M(0x8b6a43,.9,0,{side:T.DoubleSide}),sp.x,sp.y+.02,sp.z,fig);sh.rotation.set((R()-.5)*.5,R()*6,(R()-.5)*.5);sh.castShadow=false}
// aerial roots: two reaching down into the pot, one gripping the pole
var ROOT=M(0x6a5a40,.75);[[[-.006,.5,.012],[.06,.5,.08],[.12,.42,.14],[.15,.31,.15]],[[-.012,.64,.016],[-.07,.6,.06],[-.1,.48,.1],[-.11,.31,.12]],[[-.014,.76,.014],[-.03,.745,.004],[-.052,.72,-.004],[-.066,.69,-.02]]].forEach(function(P){taperTube(new T.CatmullRomCurve3(P.map(function(p){return new T.Vector3().fromArray(p)})),.0062,.0038,ROOT)});
})();
function plantSway(t,g){LEAVES.forEach(function(Lf){var w=Math.sin(t*.0009+Lf.i*1.7)*.018+Math.sin(t*.0023+Lf.i)*.008+g*.03*Math.sin(t*.003+Lf.i*.6);Lf.g.rotation.x=Lf.rx+w;Lf.g.rotation.z=Lf.rz+w*.6})}
// the rug's back corner runs under the saucer: once the leaves are placed (their layout is checked in room space, so this
// has to come last), lift and rock the whole plant ~2 degrees so it sits on the floor on one side and the rug on the other
fig.position.y+=.006;fig.quaternion.premultiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(-.28,0,.96).normalize(),.0375));
