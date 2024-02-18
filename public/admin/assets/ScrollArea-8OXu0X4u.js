import{r as u,cb as _,aY as re,R as f,W as F,b1 as L,_ as Y,ce as ne,V as q,Y as le,aD as se,a_ as ce}from"./index-RZzWi_an.js";function T(e){const o=u.useRef(e);return u.useEffect(()=>{o.current=e}),u.useMemo(()=>(...t)=>{var r;return(r=o.current)==null?void 0:r.call(o,...t)},[])}function X(e,o){const t=T(e),r=u.useRef(0);return u.useEffect(()=>()=>window.clearTimeout(r.current),[]),u.useCallback(()=>{window.clearTimeout(r.current),r.current=window.setTimeout(t,o)},[t,o])}const[ae,y]=_("ScrollArea.Root component was not found in tree");function W(e,o){const t=T(o);re(()=>{let r=0;if(e){const n=new ResizeObserver(()=>{cancelAnimationFrame(r),r=window.requestAnimationFrame(t)});return n.observe(e),()=>{window.cancelAnimationFrame(r),n.unobserve(e)}}},[e,t])}const ie=f.forwardRef((e,o)=>{const{style:t,...r}=e,n=y(),[l,s]=f.useState(0),[c,b]=f.useState(0),i=!!(l&&c);return W(n.scrollbarX,()=>{var h;const a=((h=n.scrollbarX)==null?void 0:h.offsetHeight)||0;n.onCornerHeightChange(a),b(a)}),W(n.scrollbarY,()=>{var h;const a=((h=n.scrollbarY)==null?void 0:h.offsetWidth)||0;n.onCornerWidthChange(a),s(a)}),i?f.createElement("div",{...r,ref:o,style:{...t,width:l,height:c}}):null}),ue=f.forwardRef((e,o)=>{const t=y(),r=!!(t.scrollbarX&&t.scrollbarY);return t.type!=="scroll"&&r?f.createElement(ie,{...e,ref:o}):null}),de={scrollHideDelay:1e3,type:"hover"},j=u.forwardRef((e,o)=>{const t=F("ScrollAreaRoot",de,e),{type:r,scrollHideDelay:n,scrollbars:l,...s}=t,[c,b]=u.useState(null),[i,a]=u.useState(null),[h,m]=u.useState(null),[d,p]=u.useState(null),[C,g]=u.useState(null),[v,R]=u.useState(0),[D,E]=u.useState(0),[w,x]=u.useState(!1),[H,S]=u.useState(!1),P=L(o,z=>b(z));return f.createElement(ae,{value:{type:r,scrollHideDelay:n,scrollArea:c,viewport:i,onViewportChange:a,content:h,onContentChange:m,scrollbarX:d,onScrollbarXChange:p,scrollbarXEnabled:w,onScrollbarXEnabledChange:x,scrollbarY:C,onScrollbarYChange:g,scrollbarYEnabled:H,onScrollbarYEnabledChange:S,onCornerWidthChange:R,onCornerHeightChange:E}},f.createElement(Y,{...s,ref:P,__vars:{"--sa-corner-width":l!=="xy"?"0px":`${v}px`,"--sa-corner-height":l!=="xy"?"0px":`${D}px`}}))});j.displayName="@mantine/core/ScrollAreaRoot";function G(e,o){const t=e/o;return Number.isNaN(t)?0:t}function U(e){const o=G(e.viewport,e.content),t=e.scrollbar.paddingStart+e.scrollbar.paddingEnd,r=(e.scrollbar.size-t)*o;return Math.max(r,18)}function J(e,o){return t=>{if(e[0]===e[1]||o[0]===o[1])return o[0];const r=(o[1]-o[0])/(e[1]-e[0]);return o[0]+r*(t-e[0])}}function fe(e,[o,t]){return Math.min(t,Math.max(o,e))}function k(e,o,t="ltr"){const r=U(o),n=o.scrollbar.paddingStart+o.scrollbar.paddingEnd,l=o.scrollbar.size-n,s=o.content-o.viewport,c=l-r,b=t==="ltr"?[0,s]:[s*-1,0],i=fe(e,b);return J([0,s],[0,c])(i)}function he(e,o,t,r="ltr"){const n=U(t),l=n/2,s=o||l,c=n-s,b=t.scrollbar.paddingStart+s,i=t.scrollbar.size-t.scrollbar.paddingEnd-c,a=t.content-t.viewport,h=r==="ltr"?[0,a]:[a*-1,0];return J([b,i],h)(e)}function K(e,o){return e>0&&e<o}function M(e){return e?parseInt(e,10):0}function A(e,o,{checkForDefaultPrevented:t=!0}={}){return r=>{e==null||e(r),(t===!1||!r.defaultPrevented)&&(o==null||o(r))}}const[be,Q]=_("ScrollAreaScrollbar was not found in tree"),Z=u.forwardRef((e,o)=>{const{sizes:t,hasThumb:r,onThumbChange:n,onThumbPointerUp:l,onThumbPointerDown:s,onThumbPositionChange:c,onDragScroll:b,onWheelScroll:i,onResize:a,...h}=e,m=y(),[d,p]=f.useState(null),C=L(o,S=>p(S)),g=f.useRef(null),v=f.useRef(""),{viewport:R}=m,D=t.content-t.viewport,E=T(i),w=T(c),x=X(a,10),H=S=>{if(g.current){const P=S.clientX-g.current.left,z=S.clientY-g.current.top;b({x:P,y:z})}};return u.useEffect(()=>{const S=P=>{const z=P.target;(d==null?void 0:d.contains(z))&&E(P,D)};return document.addEventListener("wheel",S,{passive:!1}),()=>document.removeEventListener("wheel",S,{passive:!1})},[R,d,D,E]),u.useEffect(w,[t,w]),W(d,x),W(m.content,x),f.createElement(be,{value:{scrollbar:d,hasThumb:r,onThumbChange:T(n),onThumbPointerUp:T(l),onThumbPositionChange:w,onThumbPointerDown:T(s)}},f.createElement("div",{...h,ref:C,style:{position:"absolute",...h.style},onPointerDown:A(e.onPointerDown,S=>{S.button===0&&(S.target.setPointerCapture(S.pointerId),g.current=d.getBoundingClientRect(),v.current=document.body.style.webkitUserSelect,document.body.style.webkitUserSelect="none",H(S))}),onPointerMove:A(e.onPointerMove,H),onPointerUp:A(e.onPointerUp,S=>{const P=S.target;P.hasPointerCapture(S.pointerId)&&P.releasePointerCapture(S.pointerId),document.body.style.webkitUserSelect=v.current,g.current=null})}))}),me=u.forwardRef((e,o)=>{const{sizes:t,onSizesChange:r,style:n,...l}=e,s=y(),[c,b]=u.useState(),i=u.useRef(null),a=L(o,i,s.onScrollbarXChange);return u.useEffect(()=>{i.current&&b(getComputedStyle(i.current))},[i]),f.createElement(Z,{"data-orientation":"horizontal",...l,ref:a,sizes:t,style:{...n,"--sa-thumb-width":`${U(t)}px`},onThumbPointerDown:h=>e.onThumbPointerDown(h.x),onDragScroll:h=>e.onDragScroll(h.x),onWheelScroll:(h,m)=>{if(s.viewport){const d=s.viewport.scrollLeft+h.deltaX;e.onWheelScroll(d),K(d,m)&&h.preventDefault()}},onResize:()=>{i.current&&s.viewport&&c&&r({content:s.viewport.scrollWidth,viewport:s.viewport.offsetWidth,scrollbar:{size:i.current.clientWidth,paddingStart:M(c.paddingLeft),paddingEnd:M(c.paddingRight)}})}})}),Se=u.forwardRef((e,o)=>{const{sizes:t,onSizesChange:r,style:n,...l}=e,s=y(),[c,b]=f.useState(),i=u.useRef(null),a=L(o,i,s.onScrollbarYChange);return u.useEffect(()=>{i.current&&b(getComputedStyle(i.current))},[i]),f.createElement(Z,{...l,"data-orientation":"vertical",ref:a,sizes:t,style:{"--sa-thumb-height":`${U(t)}px`,...n},onThumbPointerDown:h=>e.onThumbPointerDown(h.y),onDragScroll:h=>e.onDragScroll(h.y),onWheelScroll:(h,m)=>{if(s.viewport){const d=s.viewport.scrollTop+h.deltaY;e.onWheelScroll(d),K(d,m)&&h.preventDefault()}},onResize:()=>{i.current&&s.viewport&&c&&r({content:s.viewport.scrollHeight,viewport:s.viewport.offsetHeight,scrollbar:{size:i.current.clientHeight,paddingStart:M(c.paddingTop),paddingEnd:M(c.paddingBottom)}})}})}),N=u.forwardRef((e,o)=>{const{orientation:t="vertical",...r}=e,{dir:n}=ne(),l=y(),s=u.useRef(null),c=u.useRef(0),[b,i]=u.useState({content:0,viewport:0,scrollbar:{size:0,paddingStart:0,paddingEnd:0}}),a=G(b.viewport,b.content),h={...r,sizes:b,onSizesChange:i,hasThumb:a>0&&a<1,onThumbChange:d=>{s.current=d},onThumbPointerUp:()=>{c.current=0},onThumbPointerDown:d=>{c.current=d}},m=(d,p)=>he(d,c.current,b,p);return t==="horizontal"?f.createElement(me,{...h,ref:o,onThumbPositionChange:()=>{if(l.viewport&&s.current){const d=l.viewport.scrollLeft,p=k(d,b,n);s.current.style.transform=`translate3d(${p}px, 0, 0)`}},onWheelScroll:d=>{l.viewport&&(l.viewport.scrollLeft=d)},onDragScroll:d=>{l.viewport&&(l.viewport.scrollLeft=m(d,n))}}):t==="vertical"?f.createElement(Se,{...h,ref:o,onThumbPositionChange:()=>{if(l.viewport&&s.current){const d=l.viewport.scrollTop,p=k(d,b);s.current.style.transform=`translate3d(0, ${p}px, 0)`}},onWheelScroll:d=>{l.viewport&&(l.viewport.scrollTop=d)},onDragScroll:d=>{l.viewport&&(l.viewport.scrollTop=m(d))}}):null}),ee=u.forwardRef((e,o)=>{const t=y(),{forceMount:r,...n}=e,[l,s]=u.useState(!1),c=e.orientation==="horizontal",b=X(()=>{if(t.viewport){const i=t.viewport.offsetWidth<t.viewport.scrollWidth,a=t.viewport.offsetHeight<t.viewport.scrollHeight;s(c?i:a)}},10);return W(t.viewport,b),W(t.content,b),r||l?f.createElement(N,{"data-state":l?"visible":"hidden",...n,ref:o}):null}),pe=u.forwardRef((e,o)=>{const{forceMount:t,...r}=e,n=y(),[l,s]=u.useState(!1);return u.useEffect(()=>{const{scrollArea:c}=n;let b=0;if(c){const i=()=>{window.clearTimeout(b),s(!0)},a=()=>{b=window.setTimeout(()=>s(!1),n.scrollHideDelay)};return c.addEventListener("pointerenter",i),c.addEventListener("pointerleave",a),()=>{window.clearTimeout(b),c.removeEventListener("pointerenter",i),c.removeEventListener("pointerleave",a)}}},[n.scrollArea,n.scrollHideDelay]),t||l?f.createElement(ee,{"data-state":l?"visible":"hidden",...r,ref:o}):null}),ve=u.forwardRef((e,o)=>{const{forceMount:t,...r}=e,n=y(),l=e.orientation==="horizontal",[s,c]=u.useState("hidden"),b=X(()=>c("idle"),100);return u.useEffect(()=>{if(s==="idle"){const i=window.setTimeout(()=>c("hidden"),n.scrollHideDelay);return()=>window.clearTimeout(i)}},[s,n.scrollHideDelay]),u.useEffect(()=>{const{viewport:i}=n,a=l?"scrollLeft":"scrollTop";if(i){let h=i[a];const m=()=>{const d=i[a];h!==d&&(c("scrolling"),b()),h=d};return i.addEventListener("scroll",m),()=>i.removeEventListener("scroll",m)}},[n.viewport,l,b]),t||s!=="hidden"?f.createElement(N,{"data-state":s==="hidden"?"hidden":"visible",...r,ref:o,onPointerEnter:A(e.onPointerEnter,()=>c("interacting")),onPointerLeave:A(e.onPointerLeave,()=>c("idle"))}):null}),O=f.forwardRef((e,o)=>{const{forceMount:t,...r}=e,n=y(),{onScrollbarXEnabledChange:l,onScrollbarYEnabledChange:s}=n,c=e.orientation==="horizontal";return f.useEffect(()=>(c?l(!0):s(!0),()=>{c?l(!1):s(!1)}),[c,l,s]),n.type==="hover"?f.createElement(pe,{...r,ref:o,forceMount:t}):n.type==="scroll"?f.createElement(ve,{...r,ref:o,forceMount:t}):n.type==="auto"?f.createElement(ee,{...r,ref:o,forceMount:t}):n.type==="always"?f.createElement(N,{...r,ref:o}):null});function we(e,o=()=>{}){let t={left:e.scrollLeft,top:e.scrollTop},r=0;return function n(){const l={left:e.scrollLeft,top:e.scrollTop},s=t.left!==l.left,c=t.top!==l.top;(s||c)&&o(),t=l,r=window.requestAnimationFrame(n)}(),()=>window.cancelAnimationFrame(r)}const ge=u.forwardRef((e,o)=>{const{style:t,...r}=e,n=y(),l=Q(),{onThumbPositionChange:s}=l,c=L(o,a=>l.onThumbChange(a)),b=u.useRef(),i=X(()=>{b.current&&(b.current(),b.current=void 0)},100);return u.useEffect(()=>{const{viewport:a}=n;if(a){const h=()=>{if(i(),!b.current){const m=we(a,s);b.current=m,s()}};return s(),a.addEventListener("scroll",h),()=>a.removeEventListener("scroll",h)}},[n.viewport,i,s]),f.createElement("div",{"data-state":l.hasThumb?"visible":"hidden",...r,ref:c,style:{width:"var(--sa-thumb-width)",height:"var(--sa-thumb-height)",...t},onPointerDownCapture:A(e.onPointerDownCapture,a=>{const m=a.target.getBoundingClientRect(),d=a.clientX-m.left,p=a.clientY-m.top;l.onThumbPointerDown({x:d,y:p})}),onPointerUp:A(e.onPointerUp,l.onThumbPointerUp)})}),$=f.forwardRef((e,o)=>{const{forceMount:t,...r}=e,n=Q();return t||n.hasThumb?f.createElement(ge,{ref:o,...r}):null}),te=u.forwardRef(({children:e,style:o,...t},r)=>{const n=y(),l=L(r,n.onViewportChange);return f.createElement(Y,{...t,ref:l,style:{overflowX:n.scrollbarXEnabled?"scroll":"hidden",overflowY:n.scrollbarYEnabled?"scroll":"hidden",...o}},f.createElement("div",{style:{minWidth:"100%",display:"table"},ref:n.onContentChange},e))});te.displayName="@mantine/core/ScrollAreaViewport";var B={root:"m-d57069b5",viewport:"m-c0783ff9",viewportInner:"m-f8f631dd",scrollbar:"m-c44ba933",thumb:"m-d8b5e363",corner:"m-21657268"};const oe={scrollHideDelay:1e3,type:"hover",scrollbars:"xy"},ye=se((e,{scrollbarSize:o})=>({root:{"--scrollarea-scrollbar-size":ce(o)}})),V=q((e,o)=>{const t=F("ScrollArea",oe,e),{classNames:r,className:n,style:l,styles:s,unstyled:c,scrollbarSize:b,vars:i,type:a,scrollHideDelay:h,viewportProps:m,viewportRef:d,onScrollPositionChange:p,children:C,offsetScrollbars:g,scrollbars:v,...R}=t,[D,E]=u.useState(!1),w=le({name:"ScrollArea",props:t,classes:B,className:n,style:l,classNames:r,styles:s,unstyled:c,vars:i,varsResolver:ye});return f.createElement(j,{type:a==="never"?"always":a,scrollHideDelay:h,ref:o,scrollbars:v,...w("root"),...R},f.createElement(te,{...m,...w("viewport",{style:m==null?void 0:m.style}),ref:d,"data-offset-scrollbars":g===!0?"xy":g||void 0,"data-scrollbars":v||void 0,onScroll:typeof p=="function"?({currentTarget:x})=>p({x:x.scrollLeft,y:x.scrollTop}):void 0},C),(v==="xy"||v==="x")&&f.createElement(O,{...w("scrollbar"),orientation:"horizontal","data-hidden":a==="never"||void 0,forceMount:!0,onMouseEnter:()=>E(!0),onMouseLeave:()=>E(!1)},f.createElement($,{...w("thumb")})),(v==="xy"||v==="y")&&f.createElement(O,{...w("scrollbar"),orientation:"vertical","data-hidden":a==="never"||void 0,forceMount:!0,onMouseEnter:()=>E(!0),onMouseLeave:()=>E(!1)},f.createElement($,{...w("thumb")})),f.createElement(ue,{...w("corner"),"data-hovered":D||void 0,"data-hidden":a==="never"||void 0}))});V.displayName="@mantine/core/ScrollArea";const I=q((e,o)=>{const{children:t,classNames:r,styles:n,scrollbarSize:l,scrollHideDelay:s,type:c,dir:b,offsetScrollbars:i,viewportRef:a,onScrollPositionChange:h,unstyled:m,variant:d,viewportProps:p,scrollbars:C,style:g,vars:v,...R}=F("ScrollAreaAutosize",oe,e);return f.createElement(Y,{...R,ref:o,style:[{display:"flex",overflow:"auto"},g]},f.createElement(Y,{style:{display:"flex",flexDirection:"column",flex:1}},f.createElement(V,{classNames:r,styles:n,scrollHideDelay:s,scrollbarSize:l,type:c,dir:b,offsetScrollbars:i,viewportRef:a,onScrollPositionChange:h,unstyled:m,variant:d,viewportProps:p,vars:v,scrollbars:C},t)))});V.classes=B;I.displayName="@mantine/core/ScrollAreaAutosize";I.classes=B;V.Autosize=I;export{V as S};