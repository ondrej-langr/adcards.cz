import{k as g,j as s,z as i,$ as n,O as m,e as p,aG as f,aH as h,Y as j,r as N,aI as E,aJ as I,aK as w,p as u,aL as L,Z as v,i as b}from"./index-48692a22.js";import{aM as C,aN as G}from"./index-48692a22.js";const y=()=>{let l=p();const e=f(),{pathname:o}=h(),{t:x}=g(),t=j(),r=N.useMemo(()=>!e||!t?[]:[{title:"Profile",url:"/settings/profile",Icon:E},{title:n.USER_ROLES,url:"/settings/roles",Icon:I,canBeShown:(t==null?void 0:t.role.id)===0},{title:n.SYSTEM_SETTINGS,url:"/settings/system",Icon:w,canBeShown:!!(t!=null&&t.can({action:"read",targetModel:"settings"}))},{title:n.GENERAL_TRANSLATIONS,url:u.settings.translations(e==null?void 0:e.i18n.languages[1]).list,isInUrl(a){return a.startsWith(u.settings.translations(e==null?void 0:e.i18n.languages[1]).list.replace(e==null?void 0:e.i18n.languages[1],""))},Icon:L,canBeShown:e&&e.i18n.languages.length>=2}].filter(a=>a.canBeShown||a.canBeShown===void 0),[e,t]);return s.jsx("div",{className:"h-full px-5 pt-6",children:s.jsx("nav",{className:"mt-24 flex flex-none gap-3 lg:flex-col",children:r&&r.map(({url:a,title:d,Icon:S,isInUrl:c})=>s.jsx(v,{component:"a",size:"lg",variant:"subtle",color:o===a?"green":"blue",className:b((c===void 0?o===a:c(o))?"border-green-300 underline":"border-blue-200","border-2 bg-white"),styles:()=>({inner:{justifyContent:"space-between"}}),leftIcon:s.jsx(S,{className:"mr-auto aspect-square w-6"}),onClick:()=>l(a,{replace:!0}),children:x(d)},a))})})},A=()=>{const{t:l}=g();return s.jsxs(i,{withAside:!0,leftAside:s.jsx(y,{}),children:[s.jsx(i.Header,{title:l(n.SETTINGS)}),s.jsx(i.Section,{className:"mt-5 min-h-[500px] justify-evenly lg:flex",children:s.jsx("div",{className:"w-full",children:s.jsx(m,{})})})]})};export{i as PageLayout,A as ProfileLayout,C as SiteLayout,G as useConstructedMenuItems};
