import{r as t,a as p,u as O,k as M,aH as D,aG as U,e as E,J as K,aa as A,aO as G,j as s,aP as k,A as B,T as F,az as P,aQ as R,p as T,Z as W,l as q,L as z,aR as Q,aS as H,O as J}from"./index-48692a22.js";const Z=(a,x)=>{const i=t.useCallback(()=>p.generalTranslations.getMany(a).then(({data:d})=>d.data),[a]),r=t.useMemo(()=>["generalTranslations",a],[a]),n=O(r,i,{enabled:!!a,...x});return t.useMemo(()=>({...n,key:r}),[n,r])},X=()=>{const{t:a}=M(),x=D(),i=U(),r=E(),{lang:n}=K(),d=A(),[m,{open:y,close:v}]=G(!1),[b,g]=t.useState(!1),{data:l,isLoading:N,refetch:u}=Z(n,{refetchOnMount:!m,refetchOnWindowFocus:!m}),[o,f]=t.useState(l),S=t.useMemo(()=>Object.entries(o||{}).sort(([e],[c])=>e.localeCompare(c)),[o]),C=t.useCallback(async(e,c)=>{f({...o||{},[e]:c})},[o]),j=async e=>{(l==null?void 0:l[e])!=o[e]&&(g(!0),await d({title:"Saving",message:a("Saving, please wait..."),successMessage:a("Key translated!")},async()=>{await p.generalTranslations.updateTranslation(e,o[e],n),await u(),g(!1),v()}))};t.useEffect(()=>{f(l)},[l]),t.useEffect(()=>{u()},[x]);const I=t.useCallback(e=>async()=>{if(confirm(a("Do you really want to delete this key for ALL languages?")))try{d({title:"Deleting",message:a("Deleting selected key, please wait..."),successMessage:a("Key deleted!")},async()=>{await p.generalTranslations.deleteKey(e),await u()})}catch{}},[a,u]),w=s.jsxs("tr",{children:[s.jsx("th",{children:a("Translation key")}),s.jsx("th",{className:"w-full max-w-[350px]",children:a("Translation value")}),s.jsx("th",{className:"w-full max-w-[100px] opacity-0",children:"Tools"})]}),L=S.map(([e,c])=>s.jsxs("tr",{children:[s.jsx("td",{className:"align-top",children:e}),s.jsx("td",{className:"w-full max-w-[350px]",children:s.jsx(k,{onFocus:y,onBlur:()=>j(e),onChange:h=>C(e,h.currentTarget.value),onKeyDown:h=>{h.key==="Enter"&&j(e)},value:c,placeholder:e})}),s.jsx("td",{className:"w-full max-w-[100px]",children:s.jsx(B,{onClick:I(e),color:"red",children:s.jsx(F,{})})})]},e));return s.jsxs(s.Fragment,{children:[s.jsxs(P,{position:"apart",mb:"md",mt:"md",children:[s.jsx(R,{label:"",value:n,disabledOptions:[i==null?void 0:i.i18n.default],onChange:e=>e&&r(T.settings.translations(e).list)}),s.jsx(W,{to:T.settings.translations(n).create,color:"green",leftIcon:s.jsx(q,{}),component:z,children:a("Add new")})]}),s.jsxs("div",{className:"relative min-h-[400px]",children:[s.jsx(Q,{visible:N||b,overlayBlur:2}),s.jsxs(H,{className:"-mx-5",horizontalSpacing:"xl",verticalSpacing:"sm",children:[s.jsx("thead",{children:w}),s.jsx("tbody",{children:L}),s.jsx("tfoot",{children:w})]})]}),s.jsx(J,{})]})};export{X as GeneralTranslationsSettings,X as default};
