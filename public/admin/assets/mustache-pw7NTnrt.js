import{aQ as ve,r as L,cb as ye,V as A,W as j,R as h,bc as me,_ as X,cc as Pe,Y as we,aD as be,cd as D,aZ as Ce,b2 as Ee,bZ as ke,c1 as xe,c2 as Se,at as Re,an as Le,e as Ie,ay as Me}from"./index-RZzWi_an.js";import{g as Ne}from"./get-auto-contrast-value-TBhcg1GA.js";function R(n,e){const t=e-n+1;return Array.from({length:t},(r,o)=>o+n)}const _="dots";function Te({total:n,siblings:e=1,boundaries:t=1,page:r,initialPage:o=1,onChange:a}){const s=Math.max(Math.trunc(n),0),[i,c]=ve({value:r,onChange:a,defaultValue:o,finalValue:o}),l=p=>{p<=0?c(1):p>s?c(s):c(p)},u=()=>l(i+1),f=()=>l(i-1),d=()=>l(1),P=()=>l(s);return{range:L.useMemo(()=>{if(e*2+3+t*2>=s)return R(1,s);const m=Math.max(i-e,t),g=Math.min(i+e,s-t),v=m>t+2,C=g<s-(t+1);if(!v&&C){const E=e*2+t+2;return[...R(1,E),_,...R(s-(t-1),s)]}if(v&&!C){const E=t+1+2*e;return[...R(1,t),_,...R(s-E,s)]}return[...R(1,t),_,...R(m,g),_,...R(s-t+1,s)]},[s,e,i]),active:i,setPage:l,next:u,previous:f,first:d,last:P}}const[je,V]=ye("Pagination.Root component was not found in tree");var z={root:"m-4addd315",control:"m-326d024a",dots:"m-4ad7767d"};const ze={withPadding:!0},F=A((n,e)=>{const t=j("PaginationControl",ze,n),{classNames:r,className:o,style:a,styles:s,vars:i,active:c,disabled:l,withPadding:u,mod:f,...d}=t,P=V(),x=l||P.disabled;return h.createElement(me,{ref:e,disabled:x,mod:[{active:c,disabled:x,"with-padding":u},f],...P.getStyles("control",{className:o,style:a,classNames:r,styles:s,active:!x}),...d})});F.classes=z;F.displayName="@mantine/core/PaginationControl";function U({style:n,children:e,path:t,...r}){return h.createElement("svg",{viewBox:"0 0 16 16",xmlns:"http://www.w3.org/2000/svg",style:{width:"calc(var(--pagination-control-size) / 1.8)",height:"calc(var(--pagination-control-size) / 1.8)",...n},...r},h.createElement("path",{d:t,fill:"currentColor"}))}const Fe=n=>h.createElement(U,{...n,path:"M8.781 8l-3.3-3.3.943-.943L10.667 8l-4.243 4.243-.943-.943 3.3-3.3z"}),Ue=n=>h.createElement(U,{...n,path:"M7.219 8l3.3 3.3-.943.943L5.333 8l4.243-4.243.943.943-3.3 3.3z"}),Oe=n=>h.createElement(U,{...n,path:"M6.85355 3.85355C7.04882 3.65829 7.04882 3.34171 6.85355 3.14645C6.65829 2.95118 6.34171 2.95118 6.14645 3.14645L2.14645 7.14645C1.95118 7.34171 1.95118 7.65829 2.14645 7.85355L6.14645 11.8536C6.34171 12.0488 6.65829 12.0488 6.85355 11.8536C7.04882 11.6583 7.04882 11.3417 6.85355 11.1464L3.20711 7.5L6.85355 3.85355ZM12.8536 3.85355C13.0488 3.65829 13.0488 3.34171 12.8536 3.14645C12.6583 2.95118 12.3417 2.95118 12.1464 3.14645L8.14645 7.14645C7.95118 7.34171 7.95118 7.65829 8.14645 7.85355L12.1464 11.8536C12.3417 12.0488 12.6583 12.0488 12.8536 11.8536C13.0488 11.6583 13.0488 11.3417 12.8536 11.1464L9.20711 7.5L12.8536 3.85355Z"}),De=n=>h.createElement(U,{...n,path:"M2.14645 11.1464C1.95118 11.3417 1.95118 11.6583 2.14645 11.8536C2.34171 12.0488 2.65829 12.0488 2.85355 11.8536L6.85355 7.85355C7.04882 7.65829 7.04882 7.34171 6.85355 7.14645L2.85355 3.14645C2.65829 2.95118 2.34171 2.95118 2.14645 3.14645C1.95118 3.34171 1.95118 3.65829 2.14645 3.85355L5.79289 7.5L2.14645 11.1464ZM8.14645 11.1464C7.95118 11.3417 7.95118 11.6583 8.14645 11.8536C8.34171 12.0488 8.65829 12.0488 8.85355 11.8536L12.8536 7.85355C13.0488 7.65829 13.0488 7.34171 12.8536 7.14645L8.85355 3.14645C8.65829 2.95118 8.34171 2.95118 8.14645 3.14645C7.95118 3.34171 7.95118 3.65829 8.14645 3.85355L11.7929 7.5L8.14645 11.1464Z"}),_e=n=>h.createElement(U,{...n,path:"M2 8c0-.733.6-1.333 1.333-1.333.734 0 1.334.6 1.334 1.333s-.6 1.333-1.334 1.333C2.6 9.333 2 8.733 2 8zm9.333 0c0-.733.6-1.333 1.334-1.333C13.4 6.667 14 7.267 14 8s-.6 1.333-1.333 1.333c-.734 0-1.334-.6-1.334-1.333zM6.667 8c0-.733.6-1.333 1.333-1.333s1.333.6 1.333 1.333S8.733 9.333 8 9.333 6.667 8.733 6.667 8z"}),Ae={icon:_e},q=A((n,e)=>{const t=j("PaginationDots",Ae,n),{classNames:r,className:o,style:a,styles:s,vars:i,icon:c,...l}=t,u=V(),f=c;return h.createElement(X,{ref:e,...u.getStyles("dots",{className:o,style:a,styles:s,classNames:r}),...l},h.createElement(f,{style:{width:"calc(var(--pagination-control-size) / 1.8)",height:"calc(var(--pagination-control-size) / 1.8)"}}))});q.classes=z;q.displayName="@mantine/core/PaginationDots";function B({icon:n,name:e,action:t,type:r}){const o={icon:n},a=L.forwardRef((s,i)=>{const{icon:c,...l}=j(e,o,s),u=c,f=V(),d=r==="next"?f.active===f.total:f.active===1;return h.createElement(F,{disabled:f.disabled||d,ref:i,onClick:f[t],withPadding:!1,...l},h.createElement(u,{style:{width:"calc(var(--pagination-control-size) / 1.8)",height:"calc(var(--pagination-control-size) / 1.8)"}}))});return a.displayName=`@mantine/core/${e}`,Pe(a)}const ee=B({icon:Fe,name:"PaginationNext",action:"onNext",type:"next"}),te=B({icon:Ue,name:"PaginationPrevious",action:"onPrevious",type:"previous"}),ne=B({icon:Oe,name:"PaginationFirst",action:"onFirst",type:"previous"}),re=B({icon:De,name:"PaginationLast",action:"onLast",type:"next"});function H({dotsIcon:n}){const e=V(),t=e.range.map((r,o)=>{var a;return r==="dots"?h.createElement(q,{icon:n,key:o}):h.createElement(F,{key:o,active:r===e.active,"aria-current":r===e.active?"page":void 0,onClick:()=>e.onChange(r),disabled:e.disabled,...(a=e.getItemProps)==null?void 0:a.call(e,r)},r)});return h.createElement(h.Fragment,null,t)}H.displayName="@mantine/core/PaginationItems";const Ve={siblings:1,boundaries:1},qe=be((n,{size:e,radius:t,color:r,autoContrast:o})=>({root:{"--pagination-control-radius":t===void 0?void 0:Ce(t),"--pagination-control-size":Ee(e,"pagination-control-size"),"--pagination-control-fz":ke(e),"--pagination-active-bg":r?xe(r,n):void 0,"--pagination-active-color":Ne(o,n)?Se({color:r,theme:n}):void 0}})),W=A((n,e)=>{const t=j("PaginationRoot",Ve,n),{classNames:r,className:o,style:a,styles:s,unstyled:i,vars:c,total:l,value:u,defaultValue:f,onChange:d,disabled:P,siblings:x,boundaries:p,color:m,radius:g,onNextPage:v,onPreviousPage:C,onFirstPage:E,onLastPage:S,getItemProps:N,autoContrast:K,...w}=t,Q=we({name:"Pagination",classes:z,props:t,className:o,style:a,classNames:r,styles:s,unstyled:i,vars:c,varsResolver:qe}),{range:oe,setPage:se,next:ie,previous:ce,active:le,first:ue,last:fe}=Te({page:u,initialPage:f,onChange:d,total:l,siblings:x,boundaries:p}),pe=D(v,ie),he=D(C,ce),de=D(E,ue),ge=D(S,fe);return h.createElement(je,{value:{total:l,range:oe,active:le,disabled:P,getItemProps:N,onChange:se,onNext:pe,onPrevious:he,onFirst:de,onLast:ge,getStyles:Q}},h.createElement(X,{ref:e,...Q("root"),...w}))});W.classes=z;W.displayName="@mantine/core/PaginationRoot";const Be={withControls:!0,siblings:1,boundaries:1,gap:8},k=A((n,e)=>{const t=j("Pagination",Be,n),{withEdges:r,withControls:o,getControlProps:a,nextIcon:s,previousIcon:i,lastIcon:c,firstIcon:l,dotsIcon:u,total:f,gap:d,...P}=t;return f<=0?null:h.createElement(W,{ref:e,total:f,...P},h.createElement(Re,{gap:d},r&&h.createElement(ne,{icon:l,...a==null?void 0:a("first")}),o&&h.createElement(te,{icon:i,...a==null?void 0:a("previous")}),h.createElement(H,{dotsIcon:u}),o&&h.createElement(ee,{icon:s,...a==null?void 0:a("next")}),r&&h.createElement(re,{icon:c,...a==null?void 0:a("last")})))});k.classes=z;k.displayName="@mantine/core/Pagination";k.Root=W;k.Control=F;k.Dots=q;k.First=ne;k.Last=re;k.Next=ee;k.Previous=te;k.Items=H;var We=["left","right","center","justify"],Ze={delimiter:function(){return"<br/>"},header:function(n){var e=n.data;return"<h"+e.level+">"+e.text+"</h"+e.level+">"},paragraph:function(n){var e=n.data,t=e.alignment||e.align;return t!==void 0&&We.includes(t)?'<p style="text-align:'+t+';">'+e.text+"</p>":"<p>"+e.text+"</p>"},list:function(n){var e=n.data,t=e.style==="unordered"?"ul":"ol",r=function(o,a){var s=o.map(function(i){if(!i.content&&!i.items)return"<li>"+i+"</li>";var c="";return i.items&&(c=r(i.items,a)),i.content?"<li> "+i.content+" </li>"+c:void 0});return"<"+a+">"+s.join("")+"</"+a+">"};return r(e.items,t)},image:function(n){var e=n.data,t=e.caption?e.caption:"Image";return'<img src="'+(e.file&&e.file.url?e.file.url:e.url)+'" alt="'+t+'" />'},quote:function(n){var e=n.data;return"<blockquote>"+e.text+"</blockquote> - "+e.caption},code:function(n){return"<pre><code>"+n.data.code+"</code></pre>"},embed:function(n){var e=n.data;switch(e.service){case"vimeo":return'<iframe src="'+e.embed+'" height="'+e.height+'" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';case"youtube":return'<iframe width="'+e.width+'" height="'+e.height+'" src="'+e.embed+'" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';default:throw new Error("Only Youtube and Vime Embeds are supported right now.")}}};function Z(n){return new Error('\x1B[31m The Parser function of type "'+n+`" is not defined. 

  Define your custom parser functions as: \x1B[34mhttps://github.com/pavittarx/editorjs-html#extend-for-custom-blocks \x1B[0m`)}var ae=function(n){n===void 0&&(n={});var e=Object.assign({},Ze,n);return{parse:function(t){return t.blocks.map(function(r){return e[r.type]?e[r.type](r):Z(r.type)})},parseBlock:function(t){return e[t.type]?e[t.type](t):Z(t.type)},parseStrict:function(t){var r=t.blocks,o=ae(e).validate({blocks:r});if(o.length)throw new Error("Parser Functions missing for blocks: "+o.toString());for(var a=[],s=0;s<r.length;s++){if(!e[r[s].type])throw Z(r[s].type);a.push(e[r[s].type](r[s]))}return a},validate:function(t){var r=t.blocks.map(function(a){return a.type}).filter(function(a,s,i){return i.indexOf(a)===s}),o=Object.keys(e);return r.filter(function(a){return!o.includes(a)})}}},$e=ae;const He=Le($e),Ye={image:function(e){return"<img />"}},ht=(n,e,t,r)=>{const o=L.useMemo(()=>e!==void 0,[e]),a=L.useCallback(()=>Ie.entries.for(n).getOne(e,t).then(({data:c})=>c.data),[n,e,t]),s=L.useMemo(()=>[n,e],[n,e]),i=Me([s,t],a,{enabled:o,...r});return L.useMemo(()=>{const{data:c}=i;for(const[l,u]of Object.entries(c??{}))if(!(typeof u!="object"||u===null)&&"blocks"in u&&"time"in u&&"version"in u){const d=He(Ye).parse(u);c[l]=d}return{...i,key:s}},[s,i])};/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */var Ke=Object.prototype.toString,M=Array.isArray||function(e){return Ke.call(e)==="[object Array]"};function Y(n){return typeof n=="function"}function Qe(n){return M(n)?"array":typeof n}function $(n){return n.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function G(n,e){return n!=null&&typeof n=="object"&&e in n}function Ge(n,e){return n!=null&&typeof n!="object"&&n.hasOwnProperty&&n.hasOwnProperty(e)}var Je=RegExp.prototype.test;function Xe(n,e){return Je.call(n,e)}var et=/\S/;function tt(n){return!Xe(et,n)}var nt={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"};function rt(n){return String(n).replace(/[&<>"'`=\/]/g,function(t){return nt[t]})}var at=/\s*/,ot=/\s+/,J=/\s*=/,st=/\s*\}/,it=/#|\^|\/|>|\{|&|=|!/;function ct(n,e){if(!n)return[];var t=!1,r=[],o=[],a=[],s=!1,i=!1,c="",l=0;function u(){if(s&&!i)for(;a.length;)delete o[a.pop()];else a=[];s=!1,i=!1}var f,d,P;function x(w){if(typeof w=="string"&&(w=w.split(ot,2)),!M(w)||w.length!==2)throw new Error("Invalid tags: "+w);f=new RegExp($(w[0])+"\\s*"),d=new RegExp("\\s*"+$(w[1])),P=new RegExp("\\s*"+$("}"+w[1]))}x(e||b.tags);for(var p=new O(n),m,g,v,C,E,S;!p.eos();){if(m=p.pos,v=p.scanUntil(f),v)for(var N=0,K=v.length;N<K;++N)C=v.charAt(N),tt(C)?(a.push(o.length),c+=C):(i=!0,t=!0,c+=" "),o.push(["text",C,m,m+1]),m+=1,C===`
`&&(u(),c="",l=0,t=!1);if(!p.scan(f))break;if(s=!0,g=p.scan(it)||"name",p.scan(at),g==="="?(v=p.scanUntil(J),p.scan(J),p.scanUntil(d)):g==="{"?(v=p.scanUntil(P),p.scan(st),p.scanUntil(d),g="&"):v=p.scanUntil(d),!p.scan(d))throw new Error("Unclosed tag at "+p.pos);if(g==">"?E=[g,v,m,p.pos,c,l,t]:E=[g,v,m,p.pos],l++,o.push(E),g==="#"||g==="^")r.push(E);else if(g==="/"){if(S=r.pop(),!S)throw new Error('Unopened section "'+v+'" at '+m);if(S[1]!==v)throw new Error('Unclosed section "'+S[1]+'" at '+m)}else g==="name"||g==="{"||g==="&"?i=!0:g==="="&&x(v)}if(u(),S=r.pop(),S)throw new Error('Unclosed section "'+S[1]+'" at '+p.pos);return ut(lt(o))}function lt(n){for(var e=[],t,r,o=0,a=n.length;o<a;++o)t=n[o],t&&(t[0]==="text"&&r&&r[0]==="text"?(r[1]+=t[1],r[3]=t[3]):(e.push(t),r=t));return e}function ut(n){for(var e=[],t=e,r=[],o,a,s=0,i=n.length;s<i;++s)switch(o=n[s],o[0]){case"#":case"^":t.push(o),r.push(o),t=o[4]=[];break;case"/":a=r.pop(),a[5]=o[2],t=r.length>0?r[r.length-1][4]:e;break;default:t.push(o)}return e}function O(n){this.string=n,this.tail=n,this.pos=0}O.prototype.eos=function(){return this.tail===""};O.prototype.scan=function(e){var t=this.tail.match(e);if(!t||t.index!==0)return"";var r=t[0];return this.tail=this.tail.substring(r.length),this.pos+=r.length,r};O.prototype.scanUntil=function(e){var t=this.tail.search(e),r;switch(t){case-1:r=this.tail,this.tail="";break;case 0:r="";break;default:r=this.tail.substring(0,t),this.tail=this.tail.substring(t)}return this.pos+=r.length,r};function I(n,e){this.view=n,this.cache={".":this.view},this.parent=e}I.prototype.push=function(e){return new I(e,this)};I.prototype.lookup=function(e){var t=this.cache,r;if(t.hasOwnProperty(e))r=t[e];else{for(var o=this,a,s,i,c=!1;o;){if(e.indexOf(".")>0)for(a=o.view,s=e.split("."),i=0;a!=null&&i<s.length;)i===s.length-1&&(c=G(a,s[i])||Ge(a,s[i])),a=a[s[i++]];else a=o.view[e],c=G(o.view,e);if(c){r=a;break}o=o.parent}t[e]=r}return Y(r)&&(r=r.call(this.view)),r};function y(){this.templateCache={_cache:{},set:function(e,t){this._cache[e]=t},get:function(e){return this._cache[e]},clear:function(){this._cache={}}}}y.prototype.clearCache=function(){typeof this.templateCache<"u"&&this.templateCache.clear()};y.prototype.parse=function(e,t){var r=this.templateCache,o=e+":"+(t||b.tags).join(":"),a=typeof r<"u",s=a?r.get(o):void 0;return s==null&&(s=ct(e,t),a&&r.set(o,s)),s};y.prototype.render=function(e,t,r,o){var a=this.getConfigTags(o),s=this.parse(e,a),i=t instanceof I?t:new I(t,void 0);return this.renderTokens(s,i,r,e,o)};y.prototype.renderTokens=function(e,t,r,o,a){for(var s="",i,c,l,u=0,f=e.length;u<f;++u)l=void 0,i=e[u],c=i[0],c==="#"?l=this.renderSection(i,t,r,o,a):c==="^"?l=this.renderInverted(i,t,r,o,a):c===">"?l=this.renderPartial(i,t,r,a):c==="&"?l=this.unescapedValue(i,t):c==="name"?l=this.escapedValue(i,t,a):c==="text"&&(l=this.rawValue(i)),l!==void 0&&(s+=l);return s};y.prototype.renderSection=function(e,t,r,o,a){var s=this,i="",c=t.lookup(e[1]);function l(d){return s.render(d,t,r,a)}if(c){if(M(c))for(var u=0,f=c.length;u<f;++u)i+=this.renderTokens(e[4],t.push(c[u]),r,o,a);else if(typeof c=="object"||typeof c=="string"||typeof c=="number")i+=this.renderTokens(e[4],t.push(c),r,o,a);else if(Y(c)){if(typeof o!="string")throw new Error("Cannot use higher-order sections without the original template");c=c.call(t.view,o.slice(e[3],e[5]),l),c!=null&&(i+=c)}else i+=this.renderTokens(e[4],t,r,o,a);return i}};y.prototype.renderInverted=function(e,t,r,o,a){var s=t.lookup(e[1]);if(!s||M(s)&&s.length===0)return this.renderTokens(e[4],t,r,o,a)};y.prototype.indentPartial=function(e,t,r){for(var o=t.replace(/[^ \t]/g,""),a=e.split(`
`),s=0;s<a.length;s++)a[s].length&&(s>0||!r)&&(a[s]=o+a[s]);return a.join(`
`)};y.prototype.renderPartial=function(e,t,r,o){if(r){var a=this.getConfigTags(o),s=Y(r)?r(e[1]):r[e[1]];if(s!=null){var i=e[6],c=e[5],l=e[4],u=s;c==0&&l&&(u=this.indentPartial(s,l,i));var f=this.parse(u,a);return this.renderTokens(f,t,r,u,o)}}};y.prototype.unescapedValue=function(e,t){var r=t.lookup(e[1]);if(r!=null)return r};y.prototype.escapedValue=function(e,t,r){var o=this.getConfigEscape(r)||b.escape,a=t.lookup(e[1]);if(a!=null)return typeof a=="number"&&o===b.escape?String(a):o(a)};y.prototype.rawValue=function(e){return e[1]};y.prototype.getConfigTags=function(e){return M(e)?e:e&&typeof e=="object"?e.tags:void 0};y.prototype.getConfigEscape=function(e){if(e&&typeof e=="object"&&!M(e))return e.escape};var b={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(n){T.templateCache=n},get templateCache(){return T.templateCache}},T=new y;b.clearCache=function(){return T.clearCache()};b.parse=function(e,t){return T.parse(e,t)};b.render=function(e,t,r,o){if(typeof e!="string")throw new TypeError('Invalid template! Template should be a "string" but "'+Qe(e)+'" was given as the first argument for mustache#render(template, view, partials)');return T.render(e,t,r,o)};b.escape=rt;b.Scanner=O;b.Context=I;b.Writer=y;export{k as P,b as m,ht as u};
