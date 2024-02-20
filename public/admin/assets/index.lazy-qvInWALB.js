import{r as u,u as j,j as t,ad as k,ae as F,h as P,k as L,b as y,E as C,o as b,c as z,ab as N,af as D,M as E,A as M,L as J,ag as R,B as U,O as W,a7 as _,w as B,ah as G,g as H,e as T,ai as q,aj as I}from"./index-yOKIGyhs.js";import{I as K}from"./ImageSelect-uTX8WRsl.js";import{u as A}from"./NativeScrollArea-RnWAygQU.js";import{S as $}from"./Select-Tmriee6U.js";import{D as Q}from"./Divider-dZ2Ci_Vh.js";import"./FileList-e-NMcu-p.js";import"./Modal-8cyUESLD.js";import"./ItemsMissingMessage-BErgMmqr.js";import"./Skeleton-ai2isshM.js";import"./Overlay-cDVy-Pzy.js";function X(e,a="use-local-storage"){try{return JSON.stringify(e)}catch{throw new Error(`@mantine/hooks ${a}: Failed to serialize the value`)}}function Y(e){try{return e&&JSON.parse(e)}catch{return e}}function Z(e){return{getItem:o=>{try{return window[e].getItem(o)}catch{return console.warn("use-local-storage: Failed to get value from storage, localStorage is blocked"),null}},setItem:(o,n)=>{try{window[e].setItem(o,n)}catch{console.warn("use-local-storage: Failed to set value to storage, localStorage is blocked")}},removeItem:o=>{try{window[e].removeItem(o)}catch{console.warn("use-local-storage: Failed to remove value from storage, localStorage is blocked")}}}}function V(e,a){const r=e==="localStorage"?"mantine-local-storage":"mantine-session-storage",{getItem:c,setItem:o,removeItem:n}=Z(e);return function({key:l,defaultValue:i,getInitialValueInEffect:w=!0,deserialize:m=Y,serialize:h=g=>X(g,a)}){const g=u.useCallback(s=>{let d;try{d=typeof window>"u"||!(e in window)||window[e]===null||!!s}catch{d=!0}if(d)return i;const f=c(l);return f!==null?m(f):i},[l,i]),[S,x]=u.useState(g(w)),v=u.useCallback(s=>{s instanceof Function?x(d=>{const f=s(d);return o(l,h(f)),window.dispatchEvent(new CustomEvent(r,{detail:{key:l,value:s(d)}})),f}):(o(l,h(s)),window.dispatchEvent(new CustomEvent(r,{detail:{key:l,value:s}})),x(s))},[l]),O=u.useCallback(()=>{n(l),window.dispatchEvent(new CustomEvent(r,{detail:{key:l,value:i}}))},[]);return A("storage",s=>{s.storageArea===window[e]&&s.key===l&&x(m(s.newValue??void 0))}),A(r,s=>{s.detail.key===l&&x(s.detail.value)}),u.useEffect(()=>{i!==void 0&&S===void 0&&v(i)},[i,S,v]),u.useEffect(()=>{w&&v(g())},[]),[S===void 0?i:S,v,O]}}function ee(e){return V("localStorage","use-local-storage")(e)}const te=[{value:"en",label:"🇬🇧 English"},{value:"cs",label:"🇨🇿 Česky"},{value:"de",label:"🇩🇪 German"},{value:"sk",label:"🇸🇰 Slovensky"}],ae=()=>{const{t:e}=j(),[a,r]=ee({key:k,defaultValue:"en"}),c=o=>{r(o||"en"),F.changeLanguage(o||"en")};return t.jsx($,{label:e("Admin language"),placeholder:e("Select an option"),data:te,value:a,onChange:c})},we=P("/_authorized/settings/profile/")({component:se}),oe=()=>{const{t:e}=j(),{user:a}=L();return t.jsx(_,{name:"avatar",render:({field:{onChange:r,onBlur:c,value:o}})=>t.jsx(K,{label:e("Avatar"),selected:o,multiple:!1,onChange:n=>n&&r(n),onBlur:c,wrapperClassName:B("md:w-3/6 w-full text-left"),classNames:{wrapper:"flex-col items-start gap-3",imageWrapper:"relative w-full aspect-square rounded-prom overflow-hidden"},imageProps:{width:400},placeholderElement:t.jsx("div",{className:"m-auto text-4xl",children:G((a==null?void 0:a.name)||"-- --")}),imageWrapperProps:{disableStyles:!0}})})};function se(){const{user:e}=L(),{t:a}=j(),r=y({defaultValues:e??void 0}),{register:c,handleSubmit:o,watch:n}=r,p=n(),l=u.useMemo(()=>!!Object.keys(C(e,p)).length,[e,p]),i=async w=>{const m="update-profile-settings-notification";H({id:m,loading:!0,title:"Updating",message:a("Updating your data, please wait..."),autoClose:!1,disallowClose:!0});const h=C(e,w);try{await T.profile.update(h),await q(),I({id:m,message:a("Update done!"),autoClose:2e3})}catch{I({id:m,color:"red",message:a("An error happened"),autoClose:2e3})}};return t.jsxs(b,{children:[t.jsx(b.Header,{title:a("My profile")}),t.jsx(b.Content,{children:t.jsx(z,{...r,children:t.jsxs("form",{onSubmit:o(i),className:"mt-6 w-full gap-8 pb-5 flex flex-col items-baseline md:flex-row h-full",autoComplete:"off",children:[t.jsx(oe,{}),t.jsxs("div",{className:"w-full",children:[t.jsxs("div",{className:"flex gap-4 flex-col w-full",children:[t.jsx(N,{label:a("Full name"),className:"w-full",...c("name")}),t.jsx(N,{disabled:!0,label:"Email",className:"w-full",rightSection:t.jsx(D,{label:a(E.CHANGE_PASSWORD),children:t.jsx(M,{component:J,to:"/settings/profile/password/change",className:"w-5 h-5",children:t.jsx(R,{size:17})})}),...c("email")})]}),t.jsx(Q,{label:a(E.ADMIN_PANEL),labelPosition:"left",mt:"xl",mb:"sm"}),t.jsx(ae,{}),t.jsx(U,{className:"mt-5 max-w-[150px]",size:"md",color:"green",type:"submit",disabled:!l,loading:r.formState.isSubmitting,children:a("Save")})]})]})})}),t.jsx(W,{})]})}export{we as Route};
