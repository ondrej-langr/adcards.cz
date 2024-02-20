import{r as u,av as A,I as k,Y as T,J as B,R as N}from"./index-yOKIGyhs.js";import{_ as P}from"./extends-dGVwEr9R.js";var M={};function $(){return typeof process<"u"&&M?"production":"development"}var j=u.useLayoutEffect,Y=function(e){var t=u.useRef(e);return j(function(){t.current=e}),t},R=function(e,t){if(typeof e=="function"){e(t);return}e.current=t},O=function(e,t){var r=u.useRef();return u.useCallback(function(i){e.current=i,r.current&&R(r.current,null),r.current=t,t&&R(t,i)},[t])},L={"min-height":"0","max-height":"none",height:"0",visibility:"hidden",overflow:"hidden",position:"absolute","z-index":"-1000",top:"0",right:"0"},G=function(e){Object.keys(L).forEach(function(t){e.style.setProperty(t,L[t],"important")})},w=G,o=null,H=function(e,t){var r=e.scrollHeight;return t.sizingStyle.boxSizing==="border-box"?r+t.borderSize:r-t.paddingSize};function J(n,e,t,r){t===void 0&&(t=1),r===void 0&&(r=1/0),o||(o=document.createElement("textarea"),o.setAttribute("tabindex","-1"),o.setAttribute("aria-hidden","true"),w(o)),o.parentNode===null&&document.body.appendChild(o);var i=n.paddingSize,s=n.borderSize,a=n.sizingStyle,f=a.boxSizing;Object.keys(a).forEach(function(v){var p=v;o.style[p]=a[p]}),w(o),o.value=e;var d=H(o,n);o.value=e,d=H(o,n),o.value="x";var c=o.scrollHeight-i,l=c*t;f==="border-box"&&(l=l+i+s),d=Math.max(l,d);var g=c*r;return f==="border-box"&&(g=g+i+s),d=Math.min(g,d),[d,c]}var E=function(){},U=function(e,t){return e.reduce(function(r,i){return r[i]=t[i],r},{})},X=["borderBottomWidth","borderLeftWidth","borderRightWidth","borderTopWidth","boxSizing","fontFamily","fontSize","fontStyle","fontWeight","letterSpacing","lineHeight","paddingBottom","paddingLeft","paddingRight","paddingTop","tabSize","textIndent","textRendering","textTransform","width","wordBreak"],Z=!!document.documentElement.currentStyle,q=function(e){var t=window.getComputedStyle(e);if(t===null)return null;var r=U(X,t),i=r.boxSizing;if(i==="")return null;Z&&i==="border-box"&&(r.width=parseFloat(r.width)+parseFloat(r.borderRightWidth)+parseFloat(r.borderLeftWidth)+parseFloat(r.paddingRight)+parseFloat(r.paddingLeft)+"px");var s=parseFloat(r.paddingBottom)+parseFloat(r.paddingTop),a=parseFloat(r.borderBottomWidth)+parseFloat(r.borderTopWidth);return{sizingStyle:r,paddingSize:s,borderSize:a}},D=q;function C(n,e,t){var r=Y(t);u.useLayoutEffect(function(){var i=function(a){return r.current(a)};if(n)return n.addEventListener(e,i),function(){return n.removeEventListener(e,i)}},[])}var K=function(e){C(window,"resize",e)},Q=function(e){C(document.fonts,"loadingdone",e)},V=["cacheMeasurements","maxRows","minRows","onChange","onHeightChange"],ee=function(e,t){var r=e.cacheMeasurements,i=e.maxRows,s=e.minRows,a=e.onChange,f=a===void 0?E:a,d=e.onHeightChange,c=d===void 0?E:d,l=A(e,V),g=l.value!==void 0,v=u.useRef(null),p=O(v,t),z=u.useRef(0),b=u.useRef(),m=function(){var h=v.current,S=r&&b.current?b.current:D(h);if(S){b.current=S;var y=J(S,h.value||h.placeholder||"x",s,i),x=y[0],I=y[1];z.current!==x&&(z.current=x,h.style.setProperty("height",x+"px","important"),c(x,{rowHeight:I}))}},F=function(h){g||m(),f(h)};return u.useLayoutEffect(m),K(m),Q(m),u.createElement("textarea",P({},l,{onChange:F,ref:p}))},te=u.forwardRef(ee);const re={},_=k((n,e)=>{const{autosize:t,maxRows:r,minRows:i,__staticSelector:s,resize:a,...f}=B("Textarea",re,n),d=t&&$()!=="test",c=d?{maxRows:r,minRows:i}:{};return N.createElement(T,{component:d?te:"textarea",ref:e,...f,__staticSelector:s||"Textarea",multiline:!0,"data-no-overflow":t&&r===void 0||void 0,__vars:{"--input-resize":a},...c})});_.classes=T.classes;_.displayName="@mantine/core/Textarea";export{_ as T};
