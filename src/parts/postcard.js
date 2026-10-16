// ---------- the Wish You Were Here postcard, left lying on the shelf: click to look closer, click again to flip it ----------
var PCD=grp("postcard",.315,.7502,.118);PCD.rotation.y=.34;var PCF=M(0xffffff,.7),PCB=M(0xf3eee2,.8),PCE=M(0xf3eee2,.9);loadInto("covers/wywh-postcard.jpg",PCF);loadInto("covers/wywh-postcard-back.jpg",PCB);
var PCC=grp(0,0,.0004,0,PCD),PCFL=0;box(.148,.0007,.0985,[PCE,PCE,PCF,PCB,PCE,PCE],0,0,0,PCC).receiveShadow=true;
function postcardUpdate(){var tg=PCFL*PI;PCC.rotation.x+=(tg-PCC.rotation.x)*.12;PCC.position.y=.0004+.035*Math.abs(Math.sin(PCC.rotation.x))}
