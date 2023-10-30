import{r as u,e as z,J as L,am as k,Y as q,c as V,k as W,$ as O,a as b,p as P,an as B,j as l,y as F,z as Y,Z as G,l as J}from"./index-48692a22.js";import{f as Q,T as y}from"./_utils-7e9ca1e4.js";var Z=Object.defineProperty,$=Object.defineProperties,H=Object.getOwnPropertyDescriptors,N=Object.getOwnPropertySymbols,K=Object.prototype.hasOwnProperty,U=Object.prototype.propertyIsEnumerable,M=(c,r,a)=>r in c?Z(c,r,{enumerable:!0,configurable:!0,writable:!0,value:a}):c[r]=a,X=(c,r)=>{for(var a in r||(r={}))K.call(r,a)&&M(c,a,r[a]);if(N)for(var a of N(r))U.call(r,a)&&M(c,a,r[a]);return c},ee=(c,r)=>$(c,H(r));function te(c=[]){const[r,a]=u.useState(c);return[r,{setState:a,append:(...t)=>a(s=>[...s,...t]),prepend:(...t)=>a(s=>[...t,...s]),insert:(t,...s)=>a(i=>[...i.slice(0,t),...s,...i.slice(t)]),pop:()=>a(t=>{const s=[...t];return s.pop(),s}),shift:()=>a(t=>{const s=[...t];return s.shift(),s}),apply:t=>a(s=>s.map((i,n)=>t(i,n))),applyWhere:(t,s)=>a(i=>i.map((n,m)=>t(n,m)?s(n,m):n)),remove:(...t)=>a(s=>s.filter((i,n)=>!t.includes(n))),reorder:({from:t,to:s})=>a(i=>{const n=[...i],m=i[t];return n.splice(t,1),n.splice(s,0,m),n}),setItem:(t,s)=>a(i=>{const n=[...i];return n[t]=s,n}),setItemProp:(t,s,i)=>a(n=>{const m=[...n];return m[t]=ee(X({},m[t]),{[s]:i}),m}),filter:t=>{a(s=>s.filter(t))}}]}const ne=({})=>{const c=z(),{modelId:r}=L(),[a,x]=u.useState(1),[h,E]=u.useState(20),e=k(),d=q(),[j,_]=u.useState(!1),{data:o,isLoading:v,isError:w,refetch:S}=V(e==null?void 0:e.name,{params:{page:a,limit:h,...e!=null&&e.hasTimestamps?{"orderBy.created_at":"desc"}:{}}}),{t:g}=W(),[t,s]=te(o==null?void 0:o.data);u.useEffect(()=>{o!=null&&o.data&&s.setState(o==null?void 0:o.data)},[o]);const i=u.useMemo(()=>{if(!o)return!1;const{data:p,...f}=o;return f},[o]),n=async({source:p,destination:f})=>{if((f==null?void 0:f.index)===void 0)return;_(!0);const I=t[p.index].id,T=t[f.index].id;I!==T&&(s.reorder({from:p.index,to:f.index}),await b.entries.swap(e.name,{fromId:I,toId:T})),_(!1)},m=u.useMemo(()=>{if(e)return Q(e)},[e]),C=e&&(d!=null&&d.can({action:"delete",targetModel:e==null?void 0:e.name}))?async p=>{confirm(g(O.ON_DELETE_REQUEST_PROMPT))&&(await b.entries.delete(e.name,p),S())}:void 0,D=e&&(d!=null&&d.can({action:"create",targetModel:e==null?void 0:e.name}))?async p=>{confirm(g(O.ENTRY_ITEM_DUPLICATE))&&c(P.entryTypes(e==null?void 0:e.name).duplicate(p))}:void 0,R=()=>c(P.entryTypes(e==null?void 0:e.name).create),A=p=>c(P.entryTypes(e==null?void 0:e.name).view(p));return u.useEffect(()=>x(1),[r]),!e||!m||B(e.name)?l.jsx(F,{text:g("This model with this id does not exist.")}):l.jsxs(Y,{children:[l.jsxs("div",{className:"flex w-full flex-col justify-between gap-5 py-10 md:flex-row",children:[l.jsx("h1",{className:"text-3xl font-semibold capitalize",children:g(e.title??e.name)}),l.jsx("div",{className:"flex items-center gap-5",children:(d==null?void 0:d.can({action:"create",targetModel:e.name}))&&l.jsxs(G,{color:"green",className:" items-center font-semibold uppercase",size:"md",onClick:R,children:[l.jsx("span",{className:"hidden md:block",children:g("Add new entry")}),l.jsx(J,{className:"inline-block h-5 w-5 md:ml-3"})," "]})})]}),l.jsx(y,{isLoading:v||w,items:t,columns:m,onEditAction:A,onDeleteAction:C,onDuplicateAction:D,ordering:!!e.hasOrdering,onDragEnd:n,disabled:j}),l.jsxs(y.Footer,{children:[l.jsx(y.PageSizeSelect,{value:String(h),onChange:p=>{E(p?Number(p):20)}}),i&&l.jsx(y.Metadata,{className:"mr-auto ml-5",...i}),l.jsx(y.Pagination,{className:"ml-auto",total:(o==null?void 0:o.last_page)||1,page:a,onChange:x})]})]})};export{ne as default};
