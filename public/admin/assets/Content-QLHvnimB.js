import{r as m,h as I,k as K,l as A,j as s,x as j,a as W,U as G,y as q,u as w,D as C,f as O,M as o,e as R,E as h,w as U,i as k,m as B,B as _,G as x,A as V,T as Q,b as H,s as T,H as b,c as Y,o as N}from"./index-V81NBkkY.js";import{A as z}from"./AvatarSelect-yT2jWG2n.js";import{c as J,u as X,p as Z,F as $}from"./prepareFieldsForMapper-TK_7T33O.js";import{u as P}from"./useRequestWithNotifications-5KUl0Wuo.js";import{A as ee}from"./AsideItemWrap-3liaxek8.js";import{A as se}from"./AsideWrapper-A8p_gaHo.js";function te(r){const[a,t]=m.useState(r),c=m.useCallback(e=>t(l=>({...l,...typeof e=="function"?e(l):e})),[]);return[a,c]}const M=m.createContext({view:"create",exitView:()=>{}}),f=()=>m.useContext(M),me=({view:r,children:a})=>{const t=I(),c=K(A.USERS),e=()=>t({to:j.users.list});return s.jsx(M.Provider,{value:m.useMemo(()=>({view:r,exitView:e,model:c}),[r,e,c]),children:a})},g=()=>{const{userId:r}=W({from:G.id});return q(r)},ae=()=>{const r=I(),a=P(),{data:t,refetch:c}=g(),{view:e}=f(),{t:l}=w(),{setError:n}=C();return async E=>{var u;try{await a({title:e==="update"?"Updating":"Creating",message:l(e==="update"?"Updating user data, please wait":"Creating new user, please wait"),successMessage:l(e==="update"?"User data has been updated!":"New user has been created!"),errorMessage:i=>{var d;return O.isAxiosError(i)&&((d=i.response)==null?void 0:d.status)===409?l(o.DUPLICATE_USER):l(o.ERROR_BASIC)}},async()=>{if(e==="update")await R.users.update(t==null?void 0:t.id,h(t,E)),await c();else if(e==="create"){const i=await R.users.create(h(t||{},E));i!=null&&i.data&&r({to:j.users.list})}})}catch(i){O.isAxiosError(i)&&((u=i.response)==null?void 0:u.status)===409&&n("email",{message:l(o.DUPLICATE_USER)})}}},oe=()=>{const{view:r}=f(),{data:a}=g(),{t}=w();return s.jsx(se,{isOpen:!0,children:s.jsx(ee,{className:"!pt-0",title:t(o.PUBLISH_INFO),children:r==="update"&&s.jsx("div",{className:U("w-full bg-white py-5 px-4"),children:s.jsx("ul",{className:"flex list-disc flex-col gap-2 pl-5",children:s.jsxs("li",{children:[t(o.STATE),":"," ",s.jsx("span",{className:"font-semibold text-blue-600",children:a==null?void 0:a.state})]})})})})})},re=()=>{const{watch:r,formState:{isSubmitting:a}}=C(),{view:t,exitView:c}=f(),{data:e,refetch:l}=g(),{t:n}=w(),S=r(),{user:E}=k(),u=P(),[i,d]=te({isSendingPasswordReset:!1,isTogglingBlock:!1}),v=async()=>{confirm(n(o.ON_DELETE_REQUEST_PROMPT))&&(c(),R.users.delete(e==null?void 0:e.id))},y=m.useMemo(()=>t==="update"?!!Object.keys(h(e||{},S)).length:!0,[S,t,e]),D=async()=>{d({isSendingPasswordReset:!0});const p=(e==null?void 0:e.state)===x.passwordReset;try{await u({title:n(o.PLEASE_WAIT),message:n(p?o.PASSWORD_RESET_FOR_USER_WORKING_RESEND:o.PASSWORD_RESET_FOR_USER_WORKING),successMessage:n(o.PASSWORD_RESET_FOR_USER_DONE)},async()=>{await R.profile.requestPasswordReset(e.email)})}catch{}d({isSendingPasswordReset:!1})},L=async()=>{d({isTogglingBlock:!0});const p=e.state===x.blocked;try{await u({title:n(p?o.USER_BLOCKING_WORKING_UNBLOCK:o.USER_BLOCKING_WORKING_BLOCK),message:n(o.PLEASE_WAIT),successMessage:n(p?o.USER_BLOCKING_DONE_BLOCKED:o.USER_BLOCKING_DONE_UNBLOCKED)},async()=>{await R.users[p?"unblock":"block"](e.id),await l()})}catch{}d({isTogglingBlock:!1})};return s.jsxs("div",{className:"flex items-center justify-between pb-3",children:[s.jsx("header",{className:"mr-2 w-full",children:s.jsx("h1",{className:"m-0 text-3xl font-bold",children:n(t=="update"?o.UPDATE_AN_USER:o.CREATE_AN_USER)})}),s.jsxs("div",{className:"flex gap-5",children:[t==="update"&&E&&B({userRole:E.role,action:"update",targetEntityTableName:A.USERS})&&s.jsxs(s.Fragment,{children:[s.jsx(_,{loading:i.isSendingPasswordReset,disabled:!e||(e==null?void 0:e.state)===x.blocked,onClick:D,children:n((e==null?void 0:e.state)===x.passwordReset?o.PASSWORD_RESET_FOR_USER_REQUEST_AGAIN:o.PASSWORD_RESET_FOR_USER_REQUEST)}),s.jsx(_,{loading:i.isTogglingBlock,disabled:!e,color:"red",onClick:L,children:n((e==null?void 0:e.state)===x.blocked?o.USER_BLOCKING_REQUEST_UNBLOCK:o.USER_BLOCKING_REQUEST_BLOCK)})]}),s.jsx(_,{color:"green",type:"submit",disabled:a||!y,loading:a,className:U(a&&"!cursor-progress"),children:n(a?t==="create"?o.ITEM_CREATE_WORKING:o.ITEM_UPDATE_WORKING:t==="create"?o.CREATE_ITEM:o.UPDATE_ITEM)}),t==="update"?s.jsx(V,{type:"button",loading:a,onClick:v,color:"red",variant:"light",className:U(a&&"!cursor-progress","text-sm text-red-500"),children:s.jsx(Q,{className:"aspect-square w-5"})}):null]})]})},ne=({children:r})=>{const{handleSubmit:a}=C(),t=ae();return s.jsx("form",{onSubmit:a(t),autoComplete:"off",className:"h-full",children:r})},Se=()=>{const{view:r}=f(),{model:a}=f(),{data:t}=g(),{user:c}=k(),e=H({defaultValues:t||{},reValidateMode:"onBlur",mode:"onBlur",resolver:r==="create"?T(J):T(X)}),{reset:l,formState:n}=e,S=m.useMemo(()=>{if(!a)return[];const E=a.columns.findIndex(d=>d.name==="role");E>-1&&c&&!B({userRole:c.role,action:"update",targetEntityTableName:A.USERS})&&(a.columns=a.columns.splice(E,1));const u=Z(a,b.MAIN),i=u.findIndex(d=>d.name==="avatar");return i>-1&&u.splice(i,1),u},[a,t]);return m.useEffect(()=>{t&&l(t)},[t,l]),s.jsx(Y,{...e,children:s.jsx(ne,{children:s.jsxs(N,{rightAsideOutlet:r==="update"?s.jsx(oe,{}):null,children:[s.jsx(N.Header,{children:s.jsx(re,{})}),s.jsxs(N.Content,{children:[s.jsxs("div",{className:"mt-6 w-full gap-8 pb-5 flex flex-col items-baseline md:flex-row h-full",children:[s.jsx(z,{user:t??null}),s.jsx("div",{className:"flex flex-col gap-3 w-full",children:S?s.jsx($,{type:b.MAIN,fields:S}):null})]}),n.isSubmitting?s.jsx("div",{className:"absolute inset-0 cursor-progress bg-white/20 backdrop-blur-[2px]"}):null]})]})})})};export{me as C,Se as a};
