import{r as g,j as s,aA as m,aS as j,u as p,a8 as S,cg as h}from"./index-yOKIGyhs.js";import{S as L}from"./Skeleton-ai2isshM.js";import{S as C}from"./Select-Tmriee6U.js";const E={en:"gb",cs:"cz"},u=g.forwardRef(function({countryCode:n,placeholder:t,width:r=20,height:e=15,...o},d){const[i,c]=g.useState(!0),[l,x]=g.useState(!1);return s.jsxs(s.Fragment,{children:[s.jsx("img",{ref:d,src:`https://flagicons.lipis.dev/flags/4x3/${E[n]??n}.svg`,width:r,height:e,style:{display:i||l?"none":void 0},onLoad:()=>c(!1),onError:()=>x(!0),...o}),(i||l)&&(t??s.jsx(L,{m:0,p:0,width:r,height:e,radius:0}))]})}),F={cs:"Czech",en:"English",fr:"Francais",de:"German"},f={en:"gb",cs:"cz"};g.forwardRef(function({label:n,value:t,...r},e){return s.jsx("div",{ref:e,...r,children:s.jsxs(m,{children:[s.jsx(u,{width:18,countryCode:f[t]??t}),s.jsx("div",{children:s.jsx(j,{size:"sm",children:n})})]})})});const $=({value:a,disabled:n,disabledOptions:t,...r})=>{const{t:e}=p(),o=S(),d=g.useMemo(()=>{var i;if(o)return(i=o.application)==null?void 0:i.i18n.languages.map(c=>{const l=t==null?void 0:t.includes(c);return{label:`${e(F[c]??c)} ${l?` (${e("Default")})`:""}`,value:c,disabled:l}})},[o,e]);return s.jsx(C,{data:d||[],label:e("Language"),placeholder:e("Select an option"),disabled:!o||n,value:a,leftSection:s.jsx(u,{width:18,countryCode:a&&f[a]||a,placeholder:s.jsx(h,{size:18})}),...r})};export{u as F,$ as L};