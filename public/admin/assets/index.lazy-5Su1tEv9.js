import{u as d,j as e,M as s,g as b,i as A,b as j,r as S,E as u,o as n,c as L,a7 as m,a9 as N,A as v,L as w,aa as _,B as C,O as D,n as i,e as P,ab as I}from"./index-SAZ6haNj.js";import{A as T}from"./AvatarSelect-nzAdmEAX.js";import{S as O}from"./Select-rg4I4KJ2.js";import{D as R}from"./Divider-QJYEE8_b.js";import"./ImageSelect-3Gp8KeLo.js";import"./FileList-mh70E_HU.js";import"./NativeScrollArea-YDPG7T6l.js";import"./use-window-event-PmHn1Oon.js";import"./Overlay-6lSEz1if.js";import"./ItemsMissingMessage-kmo3gTn6.js";import"./Skeleton-C4hdwXqm.js";const M=[{value:"cs",label:"🇨🇿 Česky"},{value:"en",label:"🇬🇧 English"},{value:"fr",label:"🇫🇷 Français"},{value:"sk",label:"🇸🇰 Slovensky"},{value:"de",label:"🇩🇪 Allemand"}],y=()=>{const{t,i18n:a}=d(),l=o=>{a.changeLanguage(o||"en")};return e.jsx(O,{label:t(s.ADMIN_LANGUAGE),placeholder:t(s.SELECT_PLACEHOLDER),data:M,value:a.language,onChange:l,allowDeselect:!0})},X=b("/_authorized/settings/profile/")({component:k});function k(){const{user:t}=A(),{t:a}=d(),l=j({defaultValues:t??void 0}),{register:o,handleSubmit:f,watch:g}=l,r=g(),p=S.useMemo(()=>!!Object.keys(u(t,r)).length,[t,r]),x=async h=>{const c=i.show({loading:!0,title:a(s.PLEASE_WAIT),message:a(s.ITEM_UPDATE_WORKING),autoClose:!1}),E=u(t,h);try{await P.profile.update(E),await I(),i.update({id:c,message:a(s.ITEM_UPDATE_DONE),autoClose:2e3,loading:!1})}catch{i.update({id:c,color:"red",message:a(s.ERROR_BASIC),autoClose:2e3,loading:!1})}};return e.jsxs(n,{children:[e.jsx(n.Header,{title:a(s.PROFILE_PAGE_TITLE)}),e.jsx(n.Content,{children:e.jsx(L,{...l,children:e.jsxs("form",{onSubmit:f(x),className:"mt-6 w-full gap-8 pb-5 flex flex-col items-baseline md:flex-row h-full",autoComplete:"off",children:[e.jsx(T,{user:t}),e.jsxs("div",{className:"w-full",children:[e.jsxs("div",{className:"flex gap-4 flex-col w-full",children:[e.jsx(m,{label:a(s.FULL_NAME),className:"w-full",...o("name")}),e.jsx(m,{disabled:!0,label:"Email",className:"w-full",rightSection:e.jsx(N,{label:a(s.CHANGE_PASSWORD),children:e.jsx(v,{component:w,to:"/settings/profile/password/change",className:"w-5 h-5",children:e.jsx(_,{size:17})})}),...o("email")})]}),e.jsx(R,{label:a(s.ADMIN_PANEL),labelPosition:"left",mt:"xl",mb:"sm"}),e.jsx(y,{}),e.jsx(C,{className:"mt-5 max-w-[150px]",size:"md",color:"green",type:"submit",disabled:!p,loading:l.formState.isSubmitting,children:a(s.SAVE)})]})]})})}),e.jsx(D,{})]})}export{X as Route};