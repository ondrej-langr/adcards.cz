import{k as g,j as a,z as i,a0 as n,O as m,e as p,aF as f,aG as h,Y as j,r as E,aH as N,aI as I,aJ as w,p as u,aK as L,_ as v,i as b}from"./index-94e961fe.js";import{aL as C,aM as G}from"./index-94e961fe.js";const y=()=>{let l=p();const e=f(),{pathname:o}=h(),{t:x}=g(),t=j(),r=E.useMemo(()=>!e||!t?[]:[{title:"Profile",url:"/settings/profile",Icon:N},{title:n.USER_ROLES,url:"/settings/roles",Icon:I,canBeShown:(t==null?void 0:t.role.id)===0},{title:n.SYSTEM_SETTINGS,url:"/settings/system",Icon:w,canBeShown:!!(t!=null&&t.can({action:"read",targetModel:"settings"}))},{title:n.GENERAL_TRANSLATIONS,url:u.settings.translations(e==null?void 0:e.i18n.languages[1]).list,isInUrl(s){return s.startsWith(u.settings.translations(e==null?void 0:e.i18n.languages[1]).list.replace(e==null?void 0:e.i18n.languages[1],""))},Icon:L,canBeShown:e&&e.i18n.languages.length>=2}].filter(s=>s.canBeShown||s.canBeShown===void 0),[e,t]);return a.jsx("div",{className:"h-full px-5 pt-6",children:a.jsx("nav",{className:"mt-24 flex flex-none gap-3 lg:flex-col",children:r&&r.map(({url:s,title:d,Icon:S,isInUrl:c})=>a.jsx(v,{component:"a",size:"lg",variant:"subtle",color:o===s?"green":"blue",className:b((c===void 0?o===s:c(o))?"border-green-300 underline":"border-blue-200","border-2 bg-white"),styles:()=>({inner:{justifyContent:"space-between"}}),leftIcon:a.jsx(S,{className:"mr-auto aspect-square w-6"}),onClick:()=>l(s,{replace:!0}),children:x(d)},s))})})},A=()=>{const{t:l}=g();return a.jsxs(i,{withAside:!0,leftAside:a.jsx(y,{}),children:[a.jsx(i.Header,{title:l(n.SETTINGS)}),a.jsx(i.Section,{className:"mt-5 min-h-[500px] justify-evenly lg:flex",children:a.jsx("div",{className:"w-full",children:a.jsx(m,{})})})]})};export{i as PageLayout,A as ProfileLayout,C as SiteLayout,G as useConstructedMenuItems};