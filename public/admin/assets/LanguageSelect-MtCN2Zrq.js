import{r as u,j as a,au as m,aR as x,u as E,a4 as f,M as c}from"./index-SAZ6haNj.js";import{F as L}from"./Flag-8M8pVeR5.js";import{S}from"./Select-rg4I4KJ2.js";const j={cs:"🇨🇿 Česky",cz:"🇨🇿 Česky",en:"🇬🇧 English",fr:"🇫🇷 Francais",sk:"🇸🇰 Slovensky",de:"🇩🇪 German"},k={cs:"🇨🇿",cz:"🇨🇿",en:"🇬🇧",fr:"🇫🇷",sk:"🇸🇰",de:"🇩🇪"},h={en:"gb",cs:"cz"};u.forwardRef(function({label:t,value:e,...o},s){return a.jsx("div",{ref:s,...o,children:a.jsxs(m,{children:[a.jsx(L,{width:18,countryCode:h[e]??e}),a.jsx("div",{children:a.jsx(x,{size:"sm",children:t})})]})})});const A=({value:i,disabled:t,disabledOptions:e,...o})=>{const{t:s}=E(),n=f(),d=u.useMemo(()=>{var g;if(n)return(g=n.application)==null?void 0:g.i18n.languages.map(r=>{const l=e==null?void 0:e.includes(r);return{label:`${s(j[r]??r)} ${l?` (${s(c.DEFAULT)})`:""}`,value:r,disabled:l}})},[n,s]);return a.jsx(S,{data:d||[],label:s(c.LANGUAGE),placeholder:s(c.SELECT_PLACEHOLDER),disabled:!n||t,value:i,...o})};export{A as L,k as a};