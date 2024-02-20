import{r as p,h as z,i as D,aj as L,a2 as q,u as W,M as k,e as A,x as S,ak as B,j as r,o as T,B as F,p as v,A as V}from"./index-LnQetCf-.js";import{T as g}from"./TableView-8p7tzltT.js";import{f as O}from"./_utils-UdYZV02l.js";import{u as G}from"./useModelItems-AbJ8PUDc.js";import"./ItemsMissingMessage-PU1TwGDs.js";import"./extends-nsRUvlwd.js";import"./mustache-7WwGepO-.js";import"./get-auto-contrast-value-TBhcg1GA.js";import"./Skeleton-_tGmaWaA.js";import"./Drawer-a-Oo-rWY.js";import"./NativeScrollArea-HhO51BOk.js";import"./Overlay-BIcSuqKD.js";import"./Select-V6q-zMFP.js";import"./ScrollArea-M3eh-8W2.js";function H(d=[]){const[h,o]=p.useState(d);return[h,{setState:o,append:(...t)=>o(s=>[...s,...t]),prepend:(...t)=>o(s=>[...t,...s]),insert:(t,...s)=>o(a=>[...a.slice(0,t),...s,...a.slice(t)]),pop:()=>o(t=>{const s=[...t];return s.pop(),s}),shift:()=>o(t=>{const s=[...t];return s.shift(),s}),apply:t=>o(s=>s.map((a,n)=>t(a,n))),applyWhere:(t,s)=>o(a=>a.map((n,c)=>t(n,c)?s(n,c):n)),remove:(...t)=>o(s=>s.filter((a,n)=>!t.includes(n))),reorder:({from:t,to:s})=>o(a=>{const n=[...a],c=a[t];return n.splice(t,1),n.splice(s,0,c),n}),swap:({from:t,to:s})=>o(a=>{const n=[...a],c=n[t],E=n[s];return n.splice(s,1,c),n.splice(t,1,E),n}),setItem:(t,s)=>o(a=>{const n=[...a];return n[t]=s,n}),setItemProp:(t,s,a)=>o(n=>{const c=[...n];return c[t]={...c[t],[s]:a},c}),filter:t=>{o(s=>s.filter(t))}}]}const re=z("/_authorized/entities/$modelId/")({component:Q});function Q(){const d=D(),[h,o]=p.useState(1),[y,w]=p.useState(20),e=L(),m=q(),[b,j]=p.useState(!1),{data:i,isLoading:N,isError:C,refetch:P}=G(e==null?void 0:e.name,{params:{page:h,limit:y,...e!=null&&e.timestamp?{"orderBy.created_at":"desc"}:{}}}),{t:f}=W(),[x,I]=H(i==null?void 0:i.data);p.useEffect(()=>{i!=null&&i.data&&I.setState(i==null?void 0:i.data)},[i]);const t=p.useMemo(()=>{if(!i)return!1;const{data:l,...u}=i;return u},[i]),s=async({source:l,destination:u})=>{if((u==null?void 0:u.index)===void 0)return;j(!0);const M=x[l.index].id,R=x[u.index].id;M!==R&&(I.reorder({from:l.index,to:u.index}),await A.entries.for(e.name).swap({fromId:M,toId:R})),j(!1)},a=p.useMemo(()=>{if(e)return O(e)},[e]),n=e&&(m!=null&&m.can({action:"delete",targetEntityTableName:e==null?void 0:e.name}))?async l=>{confirm(f(k.ON_DELETE_REQUEST_PROMPT))&&(await A.entries.for(e.name).delete(l),P())}:void 0,c=e&&(m!=null&&m.can({action:"create",targetEntityTableName:e==null?void 0:e.name}))?async l=>{confirm(f(k.ENTRY_ITEM_DUPLICATE))&&d({to:S.entryTypes(e==null?void 0:e.name).duplicate(l)})}:void 0,E=()=>d({to:S.entryTypes(e==null?void 0:e.name).create}),_=l=>d({to:S.entryTypes(e==null?void 0:e.name).view(l)});if(p.useEffect(()=>o(1),[e]),!e||!a||B(e.name))throw new Error("not found");return r.jsxs(T,{children:[r.jsx(T.Header,{classNames:{wrapper:"flex items-center justify-between"},title:f(e.title??e.name),children:(m==null?void 0:m.can({action:"create",targetEntityTableName:e.name}))&&r.jsxs(r.Fragment,{children:[r.jsx(F,{color:"green",className:"font-semibold uppercase hidden md:block",size:"md",onClick:E,leftSection:r.jsx(v,{className:"inline-block h-5 w-5"}),children:r.jsx("span",{className:"hidden md:block",children:f("Add new entry")})}),r.jsx(V,{color:"green",className:" block md:hidden",size:"xl",onClick:E,children:r.jsx(v,{className:"inline-block h-7 w-7"})})]})}),r.jsxs(T.Content,{children:[r.jsx(g,{isLoading:N||C,items:x,columns:a,onEditAction:_,onDeleteAction:n,onDuplicateAction:c,ordering:!!e.sorting,onDragEnd:s,disabled:b}),r.jsxs(g.Footer,{children:[r.jsx(g.PageSizeSelect,{value:String(y),onChange:l=>{w(l?Number(l):20)}}),t&&r.jsx(g.Metadata,{className:"mr-auto ml-5",...t}),r.jsx(g.Pagination,{className:"ml-auto",total:(i==null?void 0:i.last_page)||1,value:h,onChange:o})]})]})]})}export{re as Route};