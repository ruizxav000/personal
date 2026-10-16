// moulding swept along each mitred rail: outer bead, cove, ogee rising to a crest, gilt sight-edge liner, inner wall to the mat
function mahoganyArt(){var W=1024,H=256,C=[cvs(W,H),cvs(W,H)],x=C[0].getContext("2d"),r=C[1].getContext("2d");x.fillStyle="#4a1d0e";x.fillRect(0,0,W,H);r.fillStyle=gray(.5);r.fillRect(0,0,W,H);
for(var i=0;i<170;i++){var y=R()*H,a=.05+R()*.16,dk=R()<.6;x.strokeStyle=dk?"rgba(25,8,3,"+a+")":"rgba(160,72,36,"+a*.8+")";x.lineWidth=.6+R()*2.4;x.beginPath();for(var xx=-20;xx<=W+20;xx+=16){var yy=y+Math.sin(xx*.006+i)*3+Math.sin(xx*.021+i*2)*1.2;xx>-20?x.lineTo(xx,yy):x.moveTo(xx,yy)}x.stroke()}
for(var k=0;k<5;k++){var cx=R()*W,cy=H*(.2+R()*.6);for(var j=0;j<8;j++){x.strokeStyle="rgba(22,7,2,"+(.18-j*.018)+")";x.lineWidth=1.2;x.beginPath();x.ellipse(cx,cy,W*(.03+j*.025),H*(.03+j*.03),0,0,7);x.stroke()}}
for(var i=0;i<W*H/60;i++){var px=R()*W,py=R()*H,l=2+R()*6;x.fillStyle="rgba(18,6,2,"+(.1+R()*.25)+")";x.fillRect(px,py,l,1);r.fillStyle=gray(.75,.5);r.fillRect(px,py,l,1)}
var t0=ctex(C[0]),t1=ctex(C[1],1);[t0,t1].forEach(function(t){t.wrapS=t.wrapT=T.RepeatWrapping});return[t0,t1]}
var MA=mahoganyArt(),WOOD=M(0xffffff,.42,0,{map:MA[0],roughnessMap:MA[1],clearcoat:1,clearcoatRoughness:.1},1),GILT2=M(0xd4ad5a,.24,1,{bumpMap:noiseTex("#808080",.5,5000,256,1),bumpScale:.0004}),SIGHT=M(0x120805,.7);
var PROF=[[0,-.034,0],[0,-.006,0],[.0012,-.001,0],[.0035,.003,0],[.0062,.0042,0],[.0088,.0028,0],[.0108,.0012,0],[.013,.0012,0],[.0155,.0034,0],[.021,.0075,0],[.028,.0112,0],[.034,.0136,0],[.0385,.0146,0],[.042,.0138,0],[.0444,.0108,0],[.0452,.0078,0],
[.0452,.0078,1],[.0466,.0072,1],[.0482,.0052,1],[.0492,.0026,1],[.05,0,1],[.05,0,2],[.05,-.022,2]];
function rail(L){var pos=[],uv=[],idx=[],v=0,groups=[];for(var i=0;i<PROF.length;i++){var p=PROF[i];if(i)v+=Math.hypot(p[0]-PROF[i-1][0],p[1]-PROF[i-1][1]);var hx=L/2-p[0];pos.push(-hx,p[0],p[1],hx,p[0],p[1]);uv.push(-hx/.25,v*14,hx/.25,v*14)}
var g=new T.BufferGeometry(),start=0,mat=PROF[0][2];for(var i=0;i<PROF.length-1;i++){if(PROF[i][0]===PROF[i+1][0]&&PROF[i][1]===PROF[i+1][1])continue;var a=i*2;idx.push(a,a+1,a+3,a,a+3,a+2)}
g.setAttribute("position",new T.Float32BufferAttribute(pos,3));g.setAttribute("uv",new T.Float32BufferAttribute(uv,2));
var cur=-1,gs=0,n=0;for(var i=0,q=0;i<PROF.length-1;i++){if(PROF[i][0]===PROF[i+1][0]&&PROF[i][1]===PROF[i+1][1])continue;var m=PROF[i+1][2];if(m!==cur){if(cur>=0)g.addGroup(gs,q-gs,cur);cur=m;gs=q}q+=6;n=q}g.addGroup(gs,n-gs,cur);
g.setIndex(idx);g.computeVertexNormals();return g}
[[OW_,0,-OH_/2,0],[OW_,0,OH_/2,PI],[OH_,-OW_/2,0,-PI/2],[OH_,OW_/2,0,PI/2]].forEach(function(r){var o=mesh(rail(r[0]),[WOOD,GILT2,SIGHT],r[1],r[2],.02,dip);o.rotation.z=r[3]});
