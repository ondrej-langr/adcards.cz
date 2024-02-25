import{I as N,K as P,$,aD as z,R as e,a1 as k,aE as D,az as w,aF as T,V,aG as _,aH as F,aI as G}from"./index-SAZ6haNj.js";import{O}from"./Overlay-6lSEz1if.js";var A={root:"m-66836ed3",wrapper:"m-a5d60502",body:"m-667c2793",title:"m-6a03f287",label:"m-698f4f23",icon:"m-667f2a6a",message:"m-7fa78076",closeButton:"m-87f54839"};const K={},M=w((r,{radius:t,color:o,variant:l,autoContrast:d})=>{const n=r.variantColorResolver({color:o||r.primaryColor,theme:r,variant:l||"light",autoContrast:d});return{root:{"--alert-radius":t===void 0?void 0:T(t),"--alert-bg":o||l?n.background:void 0,"--alert-color":n.color,"--alert-bd":o||l?n.border:void 0}}}),I=N((r,t)=>{const o=P("Alert",K,r),{classNames:l,className:d,style:n,styles:b,unstyled:i,vars:f,radius:E,color:h,title:a,children:y,id:R,icon:u,withCloseButton:m,onClose:c,closeButtonLabel:p,variant:v,autoContrast:j,...x}=o,s=$({name:"Alert",classes:A,props:o,className:d,style:n,classNames:l,styles:b,unstyled:i,vars:f,varsResolver:M}),g=z(R),C=a&&`${g}-title`||void 0,L=`${g}-body`;return e.createElement(k,{id:g,...s("root",{variant:v}),variant:v,ref:t,...x,role:"alert","aria-describedby":L,"aria-labelledby":C},e.createElement("div",{...s("wrapper")},u&&e.createElement("div",{...s("icon")},u),e.createElement("div",{...s("body")},a&&e.createElement("div",{...s("title"),"data-with-close-button":m||void 0},e.createElement("span",{id:C,...s("label")},a)),y&&e.createElement("div",{id:L,...s("message"),"data-variant":v},y)),m&&e.createElement(D,{...s("closeButton"),onClick:c,variant:"transparent",size:16,iconSize:16,"aria-label":p,unstyled:i})))});I.classes=A;I.displayName="@mantine/core/Alert";var S={root:"m-6e45937b",loader:"m-e8eb006c",overlay:"m-df587f17"};const B={transitionProps:{transition:"fade",duration:0},overlayProps:{backgroundOpacity:.75},zIndex:G("overlay")},Z=w((r,{zIndex:t})=>({root:{"--lo-z-index":t==null?void 0:t.toString()}})),H=N((r,t)=>{const o=P("LoadingOverlay",B,r),{classNames:l,className:d,style:n,styles:b,unstyled:i,vars:f,transitionProps:E,loaderProps:h,overlayProps:a,visible:y,zIndex:R,...u}=o,m=V(),c=$({name:"LoadingOverlay",classes:S,props:o,className:d,style:n,classNames:l,styles:b,unstyled:i,vars:f,varsResolver:Z}),p={...B.overlayProps,...a};return e.createElement(_,{transition:"fade",...E,mounted:!!y},v=>e.createElement(k,{...c("root",{style:v}),ref:t,...u},e.createElement(F,{...c("loader"),unstyled:i,...h}),e.createElement(O,{...p,...c("overlay"),darkHidden:!0,unstyled:i,color:(a==null?void 0:a.color)||m.white}),e.createElement(O,{...p,...c("overlay"),lightHidden:!0,unstyled:i,color:(a==null?void 0:a.color)||m.colors.dark[5]})))});H.classes=S;H.displayName="@mantine/core/LoadingOverlay";export{I as A,H as L};
