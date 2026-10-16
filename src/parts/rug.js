// hand-knotted kilim with a Galaga formation woven into the centre ("give me a rug where the center looks like Galaga")
// everything is laid out on a knot grid (GW x GH cells), then each knot is shaded as a tuft so it reads as wool
function rugArt(S){var W=S,H=Math.round(S*RUGD/RUGW),C=[cvs(W,H),cvs(W,H)],c=C[0].getContext("2d"),b=C[1].getContext("2d");
var GW=266,GH=Math.round(GW*RUGD/RUGW),G=new Array(GW*GH),J=new Float32Array(GW*GH);
var DK=[36,33,32],BR=[62,36,25],RU=[140,60,36],CR=[226,210,176],TN=[198,154,104],OC=[198,152,64],BK=[25,21,19],RD=[158,46,36];
function set(x,y,col){if(x>=0&&y>=0&&x<GW&&y<GH)G[y*GW+x]=col}
// border bands, by knot distance from the edge; s runs along whichever edge is nearest
for(var y=0;y<GH;y++)for(var x=0;x<GW;x++){var e=Math.min(x,y,GW-1-x,GH-1-y),s=(e===x||e===GW-1-x)?y:x,col;
if(e<2)col=BR;
else if(e<7){var ph=s%10,tri=5-Math.abs(ph-5);col=(e-2)<tri?CR:BR}// sawtooth guard
else if(e<9)col=BK;
else if(e<27){var q=s%24,dx=Math.abs(q-12),dy=Math.abs(e-18),d=dx+dy;col=RU;
if(d<=2)col=OC;else if(d<=4)col=BK;else if(d<=6)col=CR;else if(d<=8)col=BK;// stepped diamonds
else if((q<=1||q>=23)&&dy<=3&&(q===0||dy===0))col=CR;// small cross between diamonds
else if((e===10||e===25)&&s%4===0)col=TN}
else if(e<29)col=BK;
else if(e<33)col=(s%6===0&&(e===30||e===31))?RU:TN;
else if(e<34)col=RU;
else{var ab=.9+.08*Math.sin(y*.11+Math.sin(x*.013)*2)+.04*Math.sin(x*.05);col=[DK[0]*ab,DK[1]*ab,DK[2]*ab]}// field with abrash
G[y*GW+x]=col;J[y*GW+x]=.94+R()*.12}
// sprites: '.' empty, a/b palette colours
var BEE=["..b.......b..","...b.....b...","..aaaaaaaaa..",".aabaaaaabaa.","aaaaaaaaaaaaa","a.aa.aaa.aa.a","a..a.....a..a","...aa...aa..."],
FLY=["...b.....b...","....b...b....",".aa.aaaaa.aa.","aaaaabbbaaaaa","aabaaaaaaabaa",".aaaa.a.aaaa.","..aa..a..aa..","......a......"],
BOSS=["......aaa......",".....aabaa.....","....aabbbaa....","..aaaaaaaaaaa..",".aabbaaaaabbaa.","aaaaaaaaaaaaaaa","aa.aaa.a.aaa.aa","a...aa.a.aa...a","....a..a..a....","...aa.....aa..."],
SHIP=[".......a.......",".......a.......","......aaa......","......aba......","...a..aba..a...","...a.aaaaa.a...","a..aaabbbaaa..a","a..aaabbbaaa..a","aaaaaabbbaaaaaa","aaa.aaaaaaa.aaa","aa..aa.a.aa..aa","a....a...a....a"];
function spr(rows,cx,y,pal){var w=rows[0].length,x0=cx-(w>>1);rows.forEach(function(r,j){for(var i=0;i<w;i++){var ch=r[i];if(ch!==".")set(x0+i,y+j,pal[ch])}})}
function row(rows,n,gap,y,pal){var w=rows[0].length,step=w+gap,x0=Math.round(GW/2-(n*step-gap)/2+w/2);for(var k=0;k<n;k++)spr(rows,x0+k*step,y,pal)}
var Y0=34,Y1=GH-34;// the shelf stands on the far edge, so the formation starts below it
row(BOSS,4,8,Y0+21,{a:OC,b:RD});
row(FLY,8,6,Y0+35,{a:RD,b:CR});
row(BEE,8,7,Y0+47,{a:TN,b:CR});
row(BEE,8,7,Y0+59,{a:TN,b:CR});
spr(SHIP,GW>>1,Y1-17,{a:CR,b:RD});
set(GW>>1,Y1-25,CR);set(GW>>1,Y1-24,CR);set(GW>>1,Y1-23,CR);// the fighter's shot
// knots: each grid cell is shaded as a tuft, lighter wool sits a touch proud of the dark field
var img=c.createImageData(W,H),d=img.data,bi=b.createImageData(W,H),bd=bi.data,kx=GW/W,ky=GH/H;
for(var py=0;py<H;py++){var gy=Math.min(GH-1,py*ky|0),fy=py*ky-gy;for(var px=0;px<W;px++){var gx=Math.min(GW-1,px*kx|0),fx=px*kx-gx,k=gy*GW+gx,col=G[k],j=J[k],
tf=Math.max(0,1-Math.hypot(fx-.5,fy-.5)*1.7),n=(R()-.5)*14,i=(py*W+px)*4,l=(col[0]+col[1]+col[2])/765;
for(var ch=0;ch<3;ch++)d[i+ch]=Math.max(0,Math.min(255,col[ch]*j*(.82+.24*tf)+n));d[i+3]=255;
bd[i]=bd[i+1]=bd[i+2]=Math.max(0,Math.min(255,60+tf*120+l*50+n));bd[i+3]=255}}
c.putImageData(img,0,0);b.putImageData(bi,0,0);
var t0=ctex(C[0]),t1=ctex(C[1],1);[t0,t1].forEach(function(t){t.repeat.set(1/RUGW,1/RUGD);t.offset.set(.5,.5)});return[t0,t1]}
