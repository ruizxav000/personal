// ---------- bean bag across from the shelf ----------
// the same squat, slouchy bag with a sitting dent, now in fine-wale corduroy with a velvet sheen
var bean;
(function(){
var NG=8,PH0=0;
// corduroy: rounded wales with narrow valleys and stray fibres, as color and normal maps
function cordMaps(){var W=512,H=64,P=8,C=[cvs(W,H),cvs(W,H)],c=C[0].getContext("2d"),nx=C[1].getContext("2d"),cd=c.createImageData(W,H),nd=nx.createImageData(W,H),hgt=new Float32Array(W*H);
for(var y=0;y<H;y++)for(var x=0;x<W;x++){var f=(x%P)/P,h=Math.pow(Math.sin(PI*f),.55)+(R()-.5)*.25;hgt[y*W+x]=h}
for(var y=0;y<H;y++)for(var x=0;x<W;x++){var i=y*W+x,hl=hgt[y*W+(x+W-1)%W],hr=hgt[y*W+(x+1)%W],hu=hgt[((y+H-1)%H)*W+x],hd=hgt[((y+1)%H)*W+x],ddx=(hr-hl)*1.6,ddy=(hd-hu)*.5,iz=1/Math.sqrt(ddx*ddx+ddy*ddy+1),k=i*4;
nd.data[k]=(-ddx*iz*.5+.5)*255;nd.data[k+1]=(ddy*iz*.5+.5)*255;nd.data[k+2]=(iz*.5+.5)*255;nd.data[k+3]=255;
var v=Math.max(0,Math.min(255,(.72+.28*Math.max(0,hgt[i]))*255));cd.data[k]=cd.data[k+1]=cd.data[k+2]=v;cd.data[k+3]=255}
c.putImageData(cd,0,0);nx.putImageData(nd,0,0);return[rep(ctex(C[0]),1.7,39),rep(ctex(C[1],1),1.7,39)]}
var CM=cordMaps();
function velvet(m){m.onBeforeCompile=function(sh){sh.fragmentShader=sh.fragmentShader.replace("#include <lights_fragment_end>","#include <lights_fragment_end>\nfloat fz=pow(1.-saturate(dot(normal,normalize(vViewPosition))),2.5);reflectedLight.indirectDiffuse*=1.+fz*1.5;reflectedLight.directDiffuse*=1.+fz*.8;")};return m}
var FAB=velvet(M(0x8a4024,.86,0,{map:CM[0],normalMap:CM[1],normalScale:new T.Vector2(.55,.55),sheen:new T.Color(.34,.2,.14)},1)),
FABP=velvet(M(0x6e331c,.8,0,{map:CM[0],normalMap:CM[1],normalScale:new T.Vector2(.4,.4),sheen:new T.Color(.36,.2,.13)},1));
var BBG=new T.SphereGeometry(1,160,110),bpa=BBG.attributes.position,buv=BBG.attributes.uv;
for(var q=0;q<bpa.count;q++){var x=bpa.getX(q),y=bpa.getY(q),z=bpa.getZ(q),X=x*.46,Z=z*.48,Y=y*.34;
if(Y<-.16)Y=-.16+(Y+.16)*.08;Y-=.15*Math.exp(-((X+.06)*(X+.06)+(Z-.06)*(Z-.06))/.035)*(Y>-.05?1:0);
var w=1+.018*Math.sin(x*9+z*5)*Math.sin(y*11)+.012*Math.sin(z*17+y*6);bpa.setXYZ(q,X*w,Y+.17,Z*w);buv.setXY(q,buv.getX(q)*NG,buv.getY(q)*1.2)}BBG.computeVertexNormals();
bean=mesh(BBG,FAB,-.34,0,1.25);bean.rotation.y=2.6;
})();
