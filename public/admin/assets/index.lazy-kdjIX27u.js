import{g as h,h as L,a4 as j,b as S,a as b,aB as I,u as C,r as E,x as l,j as s,o as r,B as g,L as v,ag as O,M as a,c as y,cj as w,ck as k,e as D}from"./index-SAZ6haNj.js";import{L as x}from"./LanguageSelect-MtCN2Zrq.js";import{u as F}from"./useRequestWithNotifications-h9wK2ZZ3.js";import{T as A}from"./Textarea-DXEk40Sb.js";import"./Flag-8M8pVeR5.js";import"./Skeleton-C4hdwXqm.js";import"./Select-rg4I4KJ2.js";const q=h("/_authorized/settings/translations/$lang/keys/create/")({component:G});function G(){var u,d;const o=L(),n=j(),c=S(),N=F(),{lang:t}=b({from:I.id}),{t:e}=C(),{handleSubmit:T,formState:R,register:m}=c,f=E.useCallback(()=>o({to:l.settings.translations(t).list}),[o]),p=async i=>{try{N({title:e(a.PLEASE_WAIT),message:e(a.TRANSLATION_CREATE_WORKING),successMessage:e(a.TRANSLATION_CREATE_DONE)},async()=>{await D.generalTranslations.upsert(i.key,i.value,t),f()})}catch{}},_=i=>{o({to:l.settings.translations(i).create})};return E.useEffect(()=>{var i;t&&n&&!((i=n.application)!=null&&i.i18n.languages.includes(t))&&o({to:"/404"})},[t,n]),s.jsxs(r,{children:[s.jsx("div",{className:"container mx-auto",children:s.jsx(g,{component:v,to:l.settings.translations(t).list,leftSection:s.jsx(O,{}),color:"red",variant:"subtle",className:"-ml-5",children:e(a.GO_BACK)})}),s.jsx(r.Header,{title:e(a.TRANSLATION_CREATE_PAGE_TITLE)}),s.jsx(r.Content,{children:s.jsx(y,{...c,children:s.jsxs("form",{className:"h-full",onSubmit:T(p),children:[s.jsxs("div",{className:"flex flex-col md:flex-row",children:[s.jsxs("div",{className:"w-full",children:[s.jsx(x,{disabled:!0,label:e(a.FROM_LANGUAGE),value:(u=n.application)==null?void 0:u.i18n.default}),s.jsx(A,{label:e(a.TRANSLATION_KEY),mt:"sm",minRows:4,autosize:!0,description:e(a.CREATE_TRANSLATION_KEY_KEY_DESC),...m("key",{min:{value:1,message:e(a.FIELD_REQUIRED)}})})]}),s.jsxs("div",{className:"flex-none flex items-center justify-center my-7 md:mx-5 lg:mx-10",children:[s.jsx(w,{className:"text-blue-300 hidden md:block",size:30}),s.jsx(k,{className:"text-blue-300 md:hidden block",size:30})]}),s.jsxs("div",{className:"w-full",children:[s.jsx(x,{disabledOptions:[(d=n.application)==null?void 0:d.i18n.default],label:e(a.FOR_LANGUAGE),value:t,onChange:_,tabIndex:-1}),s.jsx(A,{label:e(a.TRANSLATION_VALUE),mt:"sm",minRows:4,autosize:!0,description:e(a.CREATE_TRANSLATION_KEY_VALUE_DESC),...m("value",{min:{value:1,message:e(a.FIELD_REQUIRED)}})})]})]}),s.jsx(g,{className:"mr-auto block",type:"submit",loading:R.isSubmitting,mt:"lg",size:"md",children:e(a.CREATE_ITEM)})]})})})]})}export{q as Route};
