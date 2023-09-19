import{s as ee,v as me,x as ye,n as $,r as ie,o as _e}from"../chunks/scheduler.e13a2fcd.js";import{S as te,i as le,g as x,s as w,m as H,C as ve,h as z,f as C,c as D,j as L,n as j,E as W,k as v,l as Y,x as d,a as R,G as X,o as K,F as Q,d as O,p as re,b as ce,t as G,D as fe,J as ge,r as ue,u as de,v as pe,w as he}from"../chunks/index.ad816803.js";import{e as Z,g as Ee}from"../chunks/transform.bc8addb8.js";import{b as Ce}from"../chunks/paths.8298bd3e.js";function be(l,e){return l==null||e==null?NaN:e<l?-1:e>l?1:e>=l?0:NaN}async function xe(l){if("clipboard"in navigator)await navigator.clipboard.writeText(l);else{const e=document.createElement("input");e.type="text",e.disabled=!0,e.style.setProperty("position","fixed"),e.style.setProperty("z-index","-100"),e.style.setProperty("pointer-events","none"),e.style.setProperty("opacity","0"),e.value=l,document.body.appendChild(e),e.click(),e.select(),document.execCommand("copy"),document.body.removeChild(e)}}const ze=(l,e)=>{async function s(){if(r)try{await xe(r),l.dispatchEvent(new CustomEvent("svelte-copy",{detail:r}))}catch(o){l.dispatchEvent(new CustomEvent("svelte-copy:error",{detail:o}))}}let t=typeof e=="string"?["click"]:[e.events].flat(1),r=typeof e=="string"?e:e.text;return t.forEach(o=>{l.addEventListener(o,s,!0)}),{update:o=>{const b=typeof o=="string"?["click"]:[o.events].flat(1),g=typeof o=="string"?o:o.text,p=b.filter(y=>!t.includes(y)),n=t.filter(y=>!b.includes(y));p.forEach(y=>{l.addEventListener(y,s,!0)}),n.forEach(y=>{l.removeEventListener(y,s,!0)}),t=b,r=g},destroy:()=>{t.forEach(o=>{l.removeEventListener(o,s,!0)})}}};function ke(l){let e,s,t,r,o,b,g,p,n,y,a,c="CSS Snippet",h,_,F,N,A,T,S="Copy CSS to Clipboard",B,k,M,U,V;return{c(){e=x("link"),s=w(),t=x("div"),r=x("h3"),o=H(l[0]),b=w(),g=x("p"),p=H(l[1]),n=w(),y=x("details"),a=x("summary"),a.textContent=c,h=w(),_=x("code"),F=H(l[2]),N=w(),A=x("p"),T=x("button"),T.textContent=S,k=x("span"),M=H(l[3]),this.h()},l(E){const i=ve("svelte-1uevrx3",document.head);e=z(i,"LINK",{rel:!0,href:!0}),i.forEach(C),s=D(E),t=z(E,"DIV",{style:!0,class:!0});var P=L(t);r=z(P,"H3",{class:!0});var f=L(r);o=j(f,l[0]),f.forEach(C),b=D(P),g=z(P,"P",{});var m=L(g);p=j(m,l[1]),m.forEach(C),n=D(P),y=z(P,"DETAILS",{class:!0});var u=L(y);a=z(u,"SUMMARY",{class:!0,"data-svelte-h":!0}),W(a)!=="svelte-1p4cxwi"&&(a.textContent=c),h=D(u),_=z(u,"CODE",{class:!0});var I=L(_);F=j(I,l[2]),I.forEach(C),u.forEach(C),N=D(P),A=z(P,"P",{});var q=L(A);T=z(q,"BUTTON",{class:!0,"data-svelte-h":!0}),W(T)!=="svelte-v2s51m"&&(T.textContent=S),k=z(q,"SPAN",{class:!0});var J=L(k);M=j(J,l[3]),J.forEach(C),q.forEach(C),P.forEach(C),this.h()},h(){v(e,"rel","external stylesheet"),v(e,"href",l[5]),v(r,"class","svelte-19ry7n"),Y(g,"font-size",l[4]),v(a,"class","svelte-19ry7n"),v(_,"class","svelte-19ry7n"),v(y,"class","svelte-19ry7n"),v(T,"class","svelte-19ry7n"),v(k,"class","svelte-19ry7n"),Y(t,"font-family","'"+l[0]+"'"),v(t,"class","svelte-19ry7n")},m(E,i){d(document.head,e),R(E,s,i),R(E,t,i),d(t,r),d(r,o),d(t,b),d(t,g),d(g,p),d(t,n),d(t,y),d(y,a),d(y,h),d(y,_),d(_,F),d(t,N),d(t,A),d(A,T),d(A,k),d(k,M),U||(V=[me(B=ze.call(null,T,l[2])),X(T,"svelte-copy",l[6])],U=!0)},p(E,[i]){i&1&&K(o,E[0]),i&2&&K(p,E[1]),i&16&&Y(g,"font-size",E[4]),i&4&&K(F,E[2]),B&&ye(B.update)&&i&4&&B.update.call(null,E[2]),i&8&&K(M,E[3]),i&1&&Y(t,"font-family","'"+E[0]+"'")},i:$,o:$,d(E){E&&(C(s),C(t)),C(e),U=!1,ie(V)}}}function Te(l,e,s){let t,{id:r=""}=e,{family:o=""}=e,{size:b=16}=e,{text:g}=e,p="",n="";const y=`${Ce}/assets/demo/fonts/${r}.css`,a=()=>{s(3,n="Copied!"),setTimeout(()=>{s(3,n="")},1e3)};return _e(async()=>{const c=await fetch(y);s(2,p=await c.text())}),l.$$set=c=>{"id"in c&&s(7,r=c.id),"family"in c&&s(0,o=c.family),"size"in c&&s(8,b=c.size),"text"in c&&s(1,g=c.text)},l.$$.update=()=>{l.$$.dirty&256&&s(4,t=`${b}px`)},[o,g,p,n,t,y,a,r,b]}class Se extends te{constructor(e){super(),le(this,e,Te,ke,ee,{id:7,family:0,size:8,text:1})}}const Le=[{id:"atkinson",family:"Atkinson",type:"sans-serif"},{id:"atlas",family:"Atlas Grotesk",type:"sans-serif"},{id:"baloo-bhai",family:"Baloo Bhai",type:"sans-serif"},{id:"canela",family:"Canela",type:"serif"},{id:"computer-modern",family:"Computer Modern",type:"serif"},{id:"cozette",family:"Cozette",type:"other"},{id:"inter",family:"Inter",type:"sans-serif"},{id:"jamboree",family:"Jamboree",type:"other"},{id:"jersey",family:"Jersey M54",type:"other"},{id:"lyon",family:"Lyon Display",type:"serif"},{id:"metropolis",family:"Metropolis",type:"sans-serif"},{id:"national",family:"National 2 Web",type:"sans-serif"},{id:"publico",family:"Publico Text",type:"serif"},{id:"recoleta",family:"Recoleta",type:"serif"},{id:"rubik",family:"Rubik",type:"sans-serif"},{id:"spacemono",family:"Space Mono",type:"mono"},{id:"tiempos",family:"Tiempos Text",type:"serif"}];function se(l,e,s){const t=l.slice();return t[5]=e[s][0],t[6]=e[s][1],t}function ne(l,e,s){const t=l.slice();return t[9]=e[s].family,t[10]=e[s].id,t}function oe(l){let e,s;return e=new Se({props:{id:l[10],family:l[9],size:l[0],text:l[1]}}),{c(){ue(e.$$.fragment)},l(t){de(e.$$.fragment,t)},m(t,r){pe(e,t,r),s=!0},p(t,r){const o={};r&1&&(o.size=t[0]),r&2&&(o.text=t[1]),e.$set(o)},i(t){s||(O(e.$$.fragment,t),s=!0)},o(t){G(e.$$.fragment,t),s=!1},d(t){he(e,t)}}}function ae(l){let e,s=l[5]+"",t,r,o,b,g,p=Z(l[6]),n=[];for(let a=0;a<p.length;a+=1)n[a]=oe(ne(l,p,a));const y=a=>G(n[a],1,1,()=>{n[a]=null});return{c(){e=x("h2"),t=H(s),r=w(),o=x("section");for(let a=0;a<n.length;a+=1)n[a].c();b=w(),this.h()},l(a){e=z(a,"H2",{});var c=L(e);t=j(c,s),c.forEach(C),r=D(a),o=z(a,"SECTION",{class:!0});var h=L(o);for(let _=0;_<n.length;_+=1)n[_].l(h);b=D(h),h.forEach(C),this.h()},h(){v(o,"class","svelte-1lzc8ku")},m(a,c){R(a,e,c),d(e,t),R(a,r,c),R(a,o,c);for(let h=0;h<n.length;h+=1)n[h]&&n[h].m(o,null);d(o,b),g=!0},p(a,c){if(c&7){p=Z(a[6]);let h;for(h=0;h<p.length;h+=1){const _=ne(a,p,h);n[h]?(n[h].p(_,c),O(n[h],1)):(n[h]=oe(_),n[h].c(),O(n[h],1),n[h].m(o,b))}for(re(),h=p.length;h<n.length;h+=1)y(h);ce()}},i(a){if(!g){for(let c=0;c<p.length;c+=1)O(n[c]);g=!0}},o(a){n=n.filter(Boolean);for(let c=0;c<n.length;c+=1)G(n[c]);g=!1},d(a){a&&(C(e),C(r),C(o)),fe(n,a)}}}function we(l){let e,s,t="Hosted Fonts on The Pudding",r,o,b="<em>Do not use fonts hosted by The Pudding without written permission.</em>",g,p,n,y,a,c,h,_,F,N,A="text sample",T,S,B,k,M,U,V,E=Z(l[2]),i=[];for(let f=0;f<E.length;f+=1)i[f]=ae(se(l,E,f));const P=f=>G(i[f],1,1,()=>{i[f]=null});return{c(){e=x("div"),s=x("h1"),s.textContent=t,r=w(),o=x("p"),o.innerHTML=b,g=w(),p=x("form"),n=x("label"),y=H("font-size: "),a=H(l[0]),c=H("px"),h=w(),_=x("input"),F=w(),N=x("label"),N.textContent=A,T=w(),S=x("input"),B=w(),k=x("article");for(let f=0;f<i.length;f+=1)i[f].c();this.h()},l(f){e=z(f,"DIV",{id:!0,class:!0});var m=L(e);s=z(m,"H1",{"data-svelte-h":!0}),W(s)!=="svelte-1m2hcwq"&&(s.textContent=t),r=D(m),o=z(m,"P",{"data-svelte-h":!0}),W(o)!=="svelte-895ja5"&&(o.innerHTML=b),g=D(m),p=z(m,"FORM",{});var u=L(p);n=z(u,"LABEL",{for:!0,class:!0});var I=L(n);y=j(I,"font-size: "),a=j(I,l[0]),c=j(I,"px"),I.forEach(C),h=D(u),_=z(u,"INPUT",{id:!0,type:!0,min:!0,max:!0}),F=D(u),N=z(u,"LABEL",{for:!0,class:!0,"data-svelte-h":!0}),W(N)!=="svelte-16zo6eo"&&(N.textContent=A),T=D(u),S=z(u,"INPUT",{id:!0,type:!0,maxlength:!0}),u.forEach(C),m.forEach(C),B=D(f),k=z(f,"ARTICLE",{class:!0});var q=L(k);for(let J=0;J<i.length;J+=1)i[J].l(q);q.forEach(C),this.h()},h(){v(n,"for","size"),v(n,"class","svelte-1lzc8ku"),v(_,"id","size"),v(_,"type","range"),v(_,"min","12"),v(_,"max","48"),v(N,"for","text"),v(N,"class","svelte-1lzc8ku"),v(S,"id","text"),v(S,"type","text"),v(S,"maxlength","100"),v(e,"id","info"),v(e,"class","svelte-1lzc8ku"),v(k,"class","svelte-1lzc8ku")},m(f,m){R(f,e,m),d(e,s),d(e,r),d(e,o),d(e,g),d(e,p),d(p,n),d(n,y),d(n,a),d(n,c),d(p,h),d(p,_),Q(_,l[0]),d(p,F),d(p,N),d(p,T),d(p,S),Q(S,l[1]),R(f,B,m),R(f,k,m);for(let u=0;u<i.length;u+=1)i[u]&&i[u].m(k,null);M=!0,U||(V=[X(_,"change",l[3]),X(_,"input",l[3]),X(S,"input",l[4])],U=!0)},p(f,[m]){if((!M||m&1)&&K(a,f[0]),m&1&&Q(_,f[0]),m&2&&S.value!==f[1]&&Q(S,f[1]),m&7){E=Z(f[2]);let u;for(u=0;u<E.length;u+=1){const I=se(f,E,u);i[u]?(i[u].p(I,m),O(i[u],1)):(i[u]=ae(I),i[u].c(),O(i[u],1),i[u].m(k,null))}for(re(),u=E.length;u<i.length;u+=1)P(u);ce()}},i(f){if(!M){for(let m=0;m<E.length;m+=1)O(i[m]);M=!0}},o(f){i=i.filter(Boolean);for(let m=0;m<i.length;m+=1)G(i[m]);M=!1},d(f){f&&(C(e),C(B),C(k)),fe(i,f),U=!1,ie(V)}}}function De(l,e,s){let t=18,r="The quick brown fox jumps over the lazy dog.";const o=Ee(Le,p=>p.type);o.sort((p,n)=>be(p[1].length,n[1].length));function b(){t=ge(this.value),s(0,t)}function g(){r=this.value,s(1,r)}return[t,r,o,b,g]}class Ne extends te{constructor(e){super(),le(this,e,De,we,ee,{})}}function Me(l){let e,s;return e=new Ne({}),{c(){ue(e.$$.fragment)},l(t){de(e.$$.fragment,t)},m(t,r){pe(e,t,r),s=!0},p:$,i(t){s||(O(e.$$.fragment,t),s=!0)},o(t){G(e.$$.fragment,t),s=!1},d(t){he(e,t)}}}class Fe extends te{constructor(e){super(),le(this,e,null,Me,ee,{})}}export{Fe as component};
