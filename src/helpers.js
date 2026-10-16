var $=function(i){return document.getElementById(i)};
function lum(h){var n=parseInt(h.slice(1),16);return(.299*(n>>16)+.587*(n>>8&255)+.114*(n&255))/255}
function shade(h,k){var n=parseInt(h.slice(1),16),f=function(v){return Math.max(0,Math.min(255,Math.round(v*k)))};return"rgb("+f(n>>16)+","+f(n>>8&255)+","+f(n&255)+")"}
function wrap(x,s,w){var ws=s.split(" "),ls=[],l="";ws.forEach(function(q){var t=l?l+" "+q:q;if(x.measureText(t).width>w&&l){ls.push(l);l=q}else l=t});if(l)ls.push(l);return ls}
var CC={};
function coverCanvas(r,back){var k=r.t+(back?"#b":"#f");if(CC[k])return CC[k];var c=document.createElement("canvas");c.width=c.height=512;var x=c.getContext("2d");
var g=x.createLinearGradient(0,0,512,512);g.addColorStop(0,shade(r.c,1.12));g.addColorStop(1,shade(r.c,.82));x.fillStyle=g;x.fillRect(0,0,512,512);
for(var i=0;i<2600;i++){x.fillStyle="rgba("+(Math.random()<.5?"255,255,255":"0,0,0")+","+(Math.random()*.05)+")";x.fillRect(Math.random()*512,Math.random()*512,2,2)}
var ink=lum(r.c)>.55?"#1b1b1b":"#f4f1ea";x.fillStyle=ink;x.textBaseline="alphabetic";
if(!back){x.font="600 26px Arial, sans-serif";x.fillText(r.a.toUpperCase(),36,64);x.font="bold 52px Arial, sans-serif";var ls=wrap(x,r.t,440);ls.forEach(function(l,i){x.fillText(l,36,470-(ls.length-1-i)*56)})}
else{x.font="600 22px Arial, sans-serif";x.fillText(r.t,36,64);x.font="18px Arial, sans-serif";x.globalAlpha=.8;x.fillText(r.a+"  ·  "+r.f,36,94);x.fillText("Pressed "+r.y,36,120);x.globalAlpha=.55;x.fillText("Back cover coming soon",36,470)}
CC[k]=c;return c}
var THB={};function thumb(r){return r.fc?"url("+r.fc+")":(THB[r.id]||(THB[r.id]="url("+coverCanvas(r).toDataURL("image/jpeg",.8)+")"))}
