import{$ as k,a0 as te,a1 as se,a2 as b,a3 as A,R as v,a4 as ae,I as ne,J as re,K as oe,a5 as ie,Q as le,j as t,o as C,a6 as ce,B as G,L as me,D as W,a7 as $,u as I,H,z as E,M as T,a8 as de,r as S,a9 as Y,m as x,b as ue,s as pe,aa as Q,c as ge,ab as fe,ac as xe,e as _,h as he,k as ye,n as Se,X as je,p as ve}from"./index-yOKIGyhs.js";import{T as Ee}from"./TableView-YzxR0suN.js";import{a as Ne,u as be}from"./useModelItems-swOYtnuG.js";import{u as J}from"./useRequestWithNotifications-FyVDP3uy.js";import{A as Ce}from"./AsideItemWrap-x2lTjCPL.js";import{L as Te}from"./LanguageSelect-6tvgF7cz.js";import{I as Ie}from"./ImageSelect-uTX8WRsl.js";import{R as we}from"./Repeater-vXDQHgA9.js";import{T as Re}from"./Textarea-ClV9ngk2.js";import{S as Le}from"./Select-Tmriee6U.js";import"./ItemsMissingMessage-BErgMmqr.js";import"./extends-dGVwEr9R.js";import"./Skeleton-ai2isshM.js";import"./use-disclosure-kjKicoPJ.js";import"./Drawer-N9Gfdqty.js";import"./NativeScrollArea-RnWAygQU.js";import"./Overlay-cDVy-Pzy.js";import"./FileList-e-NMcu-p.js";import"./Modal-8cyUESLD.js";import"./Table-4rjFBSvi.js";function Ae(e,s){return e in s.breakpoints?k(s.breakpoints[e]):k(e)}function Pe(e,s){const n=e.map(i=>({value:i,px:Ae(i,s)}));return n.sort((i,l)=>i.px-l.px),n}function P(e){return typeof e=="object"&&e!==null?"base"in e?e.base:void 0:e}function De({spacing:e,verticalSpacing:s,cols:n,selector:i}){var u;const l=te(),c=s===void 0?e:s,d=se({"--sg-spacing-x":b(P(e)),"--sg-spacing-y":b(P(c)),"--sg-cols":(u=P(n))==null?void 0:u.toString()}),m=A(l.breakpoints).reduce((o,a)=>(o[a]||(o[a]={}),typeof e=="object"&&e[a]!==void 0&&(o[a]["--sg-spacing-x"]=b(e[a])),typeof c=="object"&&c[a]!==void 0&&(o[a]["--sg-spacing-y"]=b(c[a])),typeof n=="object"&&n[a]!==void 0&&(o[a]["--sg-cols"]=n[a]),o),{}),g=Pe(A(m),l).filter(o=>A(m[o.value]).length>0).map(o=>({query:`(min-width: ${l.breakpoints[o.value]})`,styles:m[o.value]}));return v.createElement(ae,{styles:d,media:g,selector:i})}var K={root:"m-2415a157"};const _e={cols:1,spacing:"md"},O=ne((e,s)=>{const n=re("SimpleGrid",_e,e),{classNames:i,className:l,style:c,styles:d,unstyled:m,vars:r,cols:g,verticalSpacing:u,spacing:o,...a}=n,f=oe({name:"SimpleGrid",classes:K,props:n,className:l,style:c,classNames:i,styles:d,unstyled:m,vars:r}),h=ie();return v.createElement(v.Fragment,null,v.createElement(De,{...n,selector:`.${h}`}),v.createElement(le,{ref:s,...f("root",{className:h}),...a}))});O.classes=K;O.displayName="@mantine/core/SimpleGrid";const Ge=()=>t.jsx(C,{children:t.jsx("div",{className:"w-full h-full px-5 flex",children:t.jsxs("div",{className:"m-auto text-center",children:[t.jsx("div",{children:t.jsx(ce,{size:50})}),t.jsx("h1",{className:"max-w-lg",children:"You don't have required permissions to access this page"}),t.jsx(G,{component:me,to:"/",children:"Go home"})]})})}),Oe=()=>{const{control:e}=W();return t.jsx(t.Fragment,{children:t.jsx($,{name:"content.data",control:e,render:({field:{onChange:s,value:n}})=>t.jsx(Ie,{label:"Image",onChange:s,selected:n})})})},Fe=[{type:"string",hide:!1,localized:!1,name:"value",primaryString:!1,readonly:!1,required:!0}],Me=()=>{const{t:e}=I();return t.jsx(we,{name:"content",label:e("Value"),placement:H.MAIN,columns:Fe})},qe=()=>{const{t:e}=I(),{register:s}=W();return t.jsx(Re,{autosize:!0,label:e("Value"),minRows:4,...s("content.data")})},D=E.string({required_error:T.FIELD_REQUIRED}).min(1,T.FIELD_REQUIRED),Be=E.object({id:E.any().optional(),name:D,slug:D,content:E.object({type:D,data:E.any({required_error:T.FIELD_REQUIRED})})}),ze=({optionToEdit:e,onOptionUpdateOrCreate:s})=>{var M,q,B,z;const n=de(),i=e===void 0,[l,c]=S.useState((q=(M=n.application)==null?void 0:M.i18n)==null?void 0:q.default),d=Y(),{data:m}=Ne(x.SETTINGS,e,{language:l}),{t:r}=I(),g=J(),u=ue({defaultValues:{},resolver:pe(Be)}),{register:o,reset:a,control:f,handleSubmit:h,setValue:N,formState:y}=u,j=d==null?void 0:d.can({action:"create",targetEntityTableName:x.SETTINGS});S.useEffect(()=>{e?m&&a(m):a({})},[m,a,e]);const w=Q({name:"content.type",control:f}),F=Q({name:"slug",control:f}),X=async p=>{try{g({title:r(i?"Creating option":"Updating option"),message:r("Please wait..."),successMessage:r(i?"Option has been created":"Option successfully updated")},async()=>{if(i)await _.settings.create(p);else{const{id:R,...L}=p;await _.settings.update(e,L,{language:l})}await s()})}catch{}};return t.jsx(ge,{...u,children:t.jsx(Ce,{title:i?"Create an option":"Update an option",className:" overflow-auto",children:t.jsxs("form",{className:"h-full px-3",onSubmit:h(X),children:[t.jsxs(O,{cols:1,spacing:"sm",children:[j&&t.jsxs(t.Fragment,{children:[t.jsx($,{name:"content.type",control:f,render:({field:{name:p,onChange:R,onBlur:L,value:Z}})=>{var U,V;return t.jsx(Le,{placeholder:"Select type",name:p,onChange:ee=>{R(ee),N("content.data",void 0)},onBlur:L,value:Z,label:"Select datatype",data:[{value:"list",label:"List"},{value:"textArea",label:"Long text"},{value:"image",label:"Image"}],error:typeof((U=y.errors.content)==null?void 0:U.type)=="object"?(V=y.errors.content)==null?void 0:V.type.message:void 0})}}),(((B=n.application)==null?void 0:B.i18n.languages.length)??0)>1&&t.jsx(Te,{value:l,onChange:p=>p&&c(p),className:"w-full",comboboxProps:{shadow:"xl"},pt:"md",disabled:!e})]}),t.jsx(fe,{label:"Label",...o("name",{onChange(p){i&&N("slug",xe(p.target.value,{replacement:"_",lower:!0,trim:!0}))}}),description:F?t.jsxs(t.Fragment,{children:["Slug: ",F]}):void 0,inputWrapperOrder:["label","input","description","error"],error:(z=y.errors.name)==null?void 0:z.message}),t.jsxs("div",{children:[w==="list"&&t.jsx(Me,{}),w==="textArea"&&t.jsx(qe,{}),w==="image"&&t.jsx(Oe,{})]})]}),t.jsx("div",{className:"right-0 mt-5 rounded-lg pb-4",children:t.jsx(G,{className:"mr-auto block",type:"submit",color:"green",loading:y.isSubmitting,children:r(e?"Save":"Create")})})]})})})},mt=he("/_authorized/settings/system/")({component:()=>{const{user:e}=ye();return!e||!Se({userRole:e.role,action:"read",targetEntityTableName:x.SETTINGS})?t.jsx(Ge,{}):t.jsx(Ve,{})}}),Ue=[{type:"string",admin:{editor:{placement:H.MAIN,width:12},fieldType:"normal",isHidden:!1},fieldName:"name",hide:!1,localized:!1,name:"jmeno",primaryString:!1,readonly:!1,required:!0,title:"dsafasd",unique:!1}];function Ve(){const{t:e}=I(),s=Y(),[n,i]=S.useState(1),{data:l,refetch:c,isLoading:d,isError:m}=be(x.SETTINGS,{params:{page:n}}),[r,g]=S.useState(),u=J(),o=s==null?void 0:s.can({action:"create",targetEntityTableName:x.SETTINGS}),a=s==null?void 0:s.can({action:"update",targetEntityTableName:x.SETTINGS}),f=s==null?void 0:s.can({action:"delete",targetEntityTableName:x.SETTINGS}),h=S.useCallback(j=>{g(j)},[]),N=S.useCallback(async j=>{if(confirm(e(T.ON_DELETE_REQUEST_PROMPT)))try{u({title:"Deleting",message:e("Deleting selected option, please wait..."),successMessage:e("Option deleted!")},async()=>{await _.settings.delete(j),await c()})}catch{}},[e,u,c]),y=r!==void 0?t.jsx(ze,{optionToEdit:r==="new"?void 0:r,onOptionUpdateOrCreate:async()=>{await c(),g(void 0)}}):null;return t.jsxs(C,{rightAsideOutlet:y,rightAsideClassName:"w-[500px]",children:[t.jsx(C.Header,{children:o||a&&r!==void 0?t.jsx(G,{color:r!==void 0?"red":"green",leftSection:r!==void 0?t.jsx(je,{}):t.jsx(ve,{}),onClick:()=>g(r!==void 0?void 0:"new"),className:"block mb-3 ml-auto",children:e(r!==void 0?"Close":"Add new")}):null}),t.jsx(C.Content,{children:t.jsx(Ee,{isLoading:d||m,items:(l==null?void 0:l.data)??[],onDeleteAction:f?N:void 0,onEditAction:a?h:void 0,columns:Ue})})]})}export{mt as Route};
