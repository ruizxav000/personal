// Galaga kilim ("give me a rug where the center looks like Galaga"): the photo in media/rug.webp, scaled up and
// overlaid with a knot texture so it reads as wool rather than a print; the rug lies long ways, the photo turned a quarter to the left
function rugArt(S){var W=Math.round(S*RUGW/RUGD),H=S,C=[cvs(W,H),cvs(W,H)],c=C[0].getContext("2d"),b=C[1].getContext("2d");
c.fillStyle="#2c2622";c.fillRect(0,0,W,H);b.fillStyle=gray(.5);b.fillRect(0,0,W,H);
var t0=ctex(C[0]),t1=ctex(C[1],1);[t0,t1].forEach(function(t){t.repeat.set(1/RUGW,1/RUGD);t.offset.set(.5,.5)});
var im=new Image();im.onload=function(){var cr=5;// trim the photo's outline
c.imageSmoothingQuality="high";c.save();c.translate(0,H);c.rotate(-PI/2);c.drawImage(im,cr,cr,im.width-2*cr,im.height-2*cr,0,0,H,W);c.restore();// turned a quarter to the left: lies long ways
var img=c.getImageData(0,0,W,H),d=img.data,bi=b.createImageData(W,H),bd=bi.data,K=W/150;// ~150 knots across
for(var py=0;py<H;py++){var fy=py/K%1;for(var px=0;px<W;px++){var fx=px/K%1,tf=Math.max(0,1-Math.hypot(fx-.5,fy-.5)*1.7),n=(Math.random()-.5)*12,i=(py*W+px)*4,
l=(d[i]+d[i+1]+d[i+2])/765;for(var ch=0;ch<3;ch++)d[i+ch]=Math.max(0,Math.min(255,d[i+ch]*(.86+.2*tf)+n));
bd[i]=bd[i+1]=bd[i+2]=Math.max(0,Math.min(255,60+tf*120+l*50+n));bd[i+3]=255}}
c.putImageData(img,0,0);b.putImageData(bi,0,0);t0.needsUpdate=t1.needsUpdate=true};
im.src="media/rug.webp";return[t0,t1]}
