// ---------- lava lamp ----------
// classic rocket lamp: lathe-turned metal base with a rubber foot and glowing vents, a glass bottle of pink liquid in
// which the wax is ray-marched as one gooey field (blobs swell out of the bottom pool, stretch as they rise, cool and sink
// back to merge), lit from the bulb below; a cap with a rolled lip; cord to the wall outlet with an inline switch
var lp=grp("lamp",-.37,.75,-.1),BL=[],lavaUpdate;
var LIQ=M(0xd6286e,.12,0,{emissive:new T.Color(0xff2f7a),emissiveIntensity:.35}),WAX=M(0xffb347,.4,0,{emissive:new T.Color(0xff8a2a),emissiveIntensity:.55});
var lampL=new T.PointLight(0xff8a86,0,1.3,2);lampL.color.convertSRGBToLinear();lampL.position.set(-.37,.93,-.03);scene.add(lampL);
(function(){
var GP=[[.0436,0],[.0446,.0088],[.0375,.054],[.0303,.0992],[.0232,.1444]];
function gr(y){for(var i=1;i<GP.length;i++)if(y<=GP[i][1]){var a=GP[i-1],b=GP[i];return a[0]+(b[0]-a[0])*(y-a[1])/(b[1]-a[1])}return GP[GP.length-1][0]}
function marks(){var c=cvs(4,256),x=c.getContext("2d");for(var i=0;i<256;i++){x.fillStyle=gray(.3+R()*.12);x.fillRect(0,i,4,1)}var t=ctex(c,1);t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(1,4);return t}
var MK=marks(),MET=M(0xc9ccd1,1,1,{roughnessMap:MK,bumpMap:MK,bumpScale:.00001}),RUBR=M(0x0c0c0d,.9);
// base: flared foot, concave cone, collar that holds the bottle
mesh(new T.LatheGeometry([[.0418,0],[.043,.0016],[.043,.0034],[.0216,.0735],[.0209,.0741],[.0216,.0748],[.0441,.1474],[.0437,.1484],[.042,.1486]].map(v2),72),MET,0,0,0,lp);
var ft=mesh(new T.TorusGeometry(.0418,.0014,8,64),RUBR,0,.0012,0,lp);ft.rotation.x=PI/2;
[[.0741,.0212],[.1478,.044]].forEach(function(q){var r=mesh(new T.TorusGeometry(q[1],.0007,6,64),M(0x5a5d62,.4,1),0,q[0],0,lp);r.rotation.x=PI/2;r.castShadow=false});
var VEN_=M(0x1a0d06,.6,0,{emissive:new T.Color(0xff7a2a),emissiveIntensity:.6});
// glass bottle
var GLS=M(0xffffff,.03,0,{transparent:true,opacity:.12,depthWrite:false,clearcoat:1,clearcoatRoughness:.04},1);var gls=mesh(new T.LatheGeometry(GP.map(v2),64),GLS,0,.1486,0,lp);gls.rotation.y=PI;gls.castShadow=false;
// liquid and wax: the inner volume of the bottle is ray-marched in its own object space
var NB=6,UB=[],US=[];for(var i=0;i<NB;i++){UB.push(new T.Vector4(0,-1,0,.001));US.push(1)}
var LAVA=new T.ShaderMaterial({uniforms:{uCam:{value:new T.Vector3()},uB:{value:UB},uS:{value:US},uT:{value:0},uI:{value:1},uPool:{value:.012}},
vertexShader:"varying vec3 vP;void main(){vP=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
fragmentShader:["uniform vec3 uCam;uniform vec4 uB["+NB+"];uniform float uS["+NB+"];uniform float uT,uI,uPool;varying vec3 vP;",
"float R(float y){return (y<.0088?mix(.0436,.0446,y/.0088):mix(.0446,.0232,clamp((y-.0088)/.1356,0.,1.)))-.0013;}",
"float smin(float a,float b,float k){float h=clamp(.5+.5*(b-a)/k,0.,1.);return mix(b,a,h)-k*h*(1.-h);}",
"float wax(vec3 p){float d=p.y-uPool-.0012*sin(p.x*260.+uT*.7)*sin(p.z*230.-uT*.5);for(int i=0;i<"+NB+";i++){vec3 q=p-uB[i].xyz;float s=uS[i];q.y/=s;d=smin(d,(length(q)-uB[i].w)*min(1.,s),.009);}",
"return d;}",
"vec3 nrm(vec3 p){vec2 e=vec2(.0006,-.0006);return normalize(e.xyy*wax(p+e.xyy)+e.yyx*wax(p+e.yyx)+e.yxy*wax(p+e.yxy)+e.xxx*wax(p+e.xxx));}",
"void main(){vec3 d=normalize(vP-uCam),p=vP;float t=0.;vec3 liq=vec3(0.);float tr=1.;bool hit=false;",
"for(int i=0;i<110;i++){float rr=length(p.xz);if(p.y<-.001||p.y>.1455||rr>R(p.y)+.0004)break;float w=wax(p);if(w<.0005){hit=true;break;}float st=clamp(w*.9,.0005,.003);",
"float heat=exp(-p.y*19.)*1.4+.18,core=1.-.55*rr/max(R(p.y),.001);liq+=tr*vec3(.95,.05,.3)*heat*core*st*30.;tr*=exp(-st*17.);p+=d*st;t+=st;}",
"vec3 c=liq;if(hit){vec3 n=nrm(p);float h=clamp(1.-p.y/.144,0.,1.),fr=pow(1.-abs(dot(n,-d)),2.);",
"vec3 wc=mix(vec3(.9,.2,.03),vec3(1.,.55,.12),h*h);float lit=.08+1.25*pow(max(0.,-n.y*.8+.2),1.5)*(.45+h)+.3*h*h+.6*fr*(.5+h);c+=tr*wc*lit*.9;}",
"c*=uI;gl_FragColor=vec4(c,1.);}"].join("\n")});
var liq=new T.Mesh(new T.LatheGeometry(GP.map(function(p){return new T.Vector2(p[0]-.0011,p[1])}),48),LAVA);liq.position.y=.1486;liq.rotation.y=PI;lp.add(liq);
liq.onBeforeRender=function(r,s,cam){LAVA.uniforms.uCam.value.copy(cam.position);liq.worldToLocal(LAVA.uniforms.uCam.value)};
// cap: cone with a rolled lip
mesh(new T.LatheGeometry([[.023,0],[.0236,.0012],[.0234,.004],[.0146,.0545],[.0138,.0566],[.0122,.0572],[0,.0572]].map(v2),48),MET,0,.293,0,lp);
var lip=mesh(new T.TorusGeometry(.0233,.0009,8,48),MET,0,.2934,0,lp);lip.rotation.x=PI/2;
// blobs: each lives on its own slow cycle, swelling out of the pool, stretching as it rises, rounding off at the top
var BB=[[.0105,71,0,.004,.6],[.009,93,1.7,-.006,2.1],[.0075,58,3.4,.003,4.3],[.0068,104,4.9,-.004,1.1],[.006,83,2.6,.005,5.6],[.0115,127,5.8,-.002,3.2]];
lavaUpdate=function(t){var s=t*.001;LAVA.uniforms.uT.value=s;LAVA.uniforms.uI.value=.45+WAX.emissiveIntensity*.4;VEN_.emissiveIntensity=WAX.emissiveIntensity*1.2;LAVA.uniforms.uPool.value=.012+.0015*Math.sin(s*.23);
BB.forEach(function(b,i){var ph=(s/b[1]+b[2]/(2*PI))%1,up=ph<.55,k=up?ph/.55:(1-ph)/.45,e=k*k*(3-2*k),y=.006+e*.126,vel=Math.sin(PI*k),
r=Math.min(b[0]*(.55+.45*Math.min(1,k*5)),gr(y)*.72),lim=Math.max(0,gr(y)-.0013-r*1.1),x=Math.max(-lim,Math.min(lim,b[3]+.003*Math.sin(s*.31+b[4]))),z=Math.max(-lim,Math.min(lim,.004*Math.sin(s*.27+b[4]*1.3)));
UB[i].set(x,y,z,r);US[i]=1+(up?.55:.3)*vel+(up&&k<.18?.7*(1-k/.18):0)})};
// cord from the back of the base, inline rocker switch, down behind the shelf to the outlet's upper socket
var CRD=M(0x111111,.5),cpts=[[-.37,.752,-.138],[-.36,.751,-.17],[-.3,.751,-.182],[-.22,.751,-.186],[-.14,.752,-.19],[-.09,.74,-.199],[-.08,.6,-.2],[.05,.38,-.2],[.2,.33,-.199],[.295,.31,-.196],[.3,.296,-.19]].map(function(a){return new T.Vector3().fromArray(a)});
mesh(new T.TubeGeometry(new T.CatmullRomCurve3(cpts),90,.0024,6),CRD);
var sw=grp(0,-.25,.75,-.184);sw.rotation.y=.05;rbox(.034,.012,.016,.004,.002,M(0x1b1b1c,.45),0,.006,0,sw);var rk=rbox(.012,.004,.009,.002,.0008,M(0x2a2a2c,.35),.004,.0128,0,sw);rk.rotation.z=-.12;
box(.02,.024,.014,M(0x151515,.6),.3,.295,BZ+.012);
})();
