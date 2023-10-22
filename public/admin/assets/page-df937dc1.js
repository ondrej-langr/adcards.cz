import{r as a,N as Z,u as W,a as v,b as K,c as Y,d as _,e as G,s as B,j as e,t as k,f as D,g as J,h as X,U as ee,i as w,H as se,F as $,k as S,P as A,l as te,m as E,M as oe,A as O,T as Q,L as re,p as le,S as ae,n as ne,o as ie,q as ce,v as U,w as de,I as ue,x as me,y as fe,z as xe,B as pe,O as he}from"./index-c439a344.js";import{B as ge}from"./Button-71b50145.js";function je(){const t=a.useContext(Z);if(!t)throw new Error("@mantine/notifications: use-notifications hook was called outside of NotificationsProvider context");return t}const be=t=>()=>v.folders.getMany(t).then(o=>o.data.data),Fe=t=>{const o=a.useMemo(()=>["folders",t],[t]),s=W(o,be(t),{enabled:!!t});return a.useMemo(()=>({...s,key:o}),[s,o])},V=t=>{const o=K(),{data:s,isError:l,isLoading:r,key:n,refetch:d}=Y("files",{params:{path:t,limit:9999}}),{data:m,isError:c,key:f,refetch:h}=Fe(t),u=a.useCallback(j=>o.setQueryData(n,j),[o,n]),p=a.useCallback(j=>{o.setQueryData(f,j)},[o,f]);return a.useMemo(()=>({data:s!=null&&s.data||m?{files:s==null?void 0:s.data,folders:m}:void 0,isError:l||c,isLoading:r||!c&&!m,mutateFiles:u,mutateFolders:p,refetchFolders:h,refetchFiles:d}),[u,p,h,d,r,c,m,l,s])},we=(t,o)=>o.map(s=>({key:`${t==="/"?"":t}/${s.name}`,file:s,formattedSize:s.size/1e6+"MB",name:s.name.split(".").slice(0,-1).join(),uploaded:!1})),H={currentPath:"/",uploadingFiles:[],showNewFolderCreator:!1,workingFolders:{},files:void 0,isError:!1,isLoading:!0,mutateFiles:()=>{},mutateFolders:()=>{},getDropZoneInputProps:()=>{},getDropZoneRootProps:()=>{},openFilePicker:()=>{},updateValue:()=>{}},T=a.createContext(H),y=()=>a.useContext(T);function Ne(t,{name:o,value:s}){return{...t,[o]:s}}const Ce=X(),ke=({children:t})=>{const[o,s]=a.useReducer(Ne,H),l=_("folder"),r=G(),n=a.useMemo(()=>(l||"/").replaceAll("//","/"),[l]),{data:d,isError:m,isLoading:c,mutateFiles:f,mutateFolders:h,refetchFiles:u}=V(n),p=a.useCallback((x,g)=>{if(x==="currentPath"){r({search:`?folder=${g}`});return}s({name:x,value:g})},[s,r]),j=a.useCallback(async x=>{let g=we(n,x);p("uploadingFiles",g);const P="on-drop-file-info";B({id:P,message:e.jsx(e.Fragment,{children:k("Working")}),title:k("Uploading files...").toString(),color:"blue",autoClose:!1});for(const{key:N,file:L}of g){try{await v.files.create(L,{root:n})}catch(I){D({id:P,message:e.jsx(e.Fragment,{children:k("Error")}),title:k("An error happened").toString(),color:"red",autoClose:2e3}),Ce.error(`An error happened during onDrop creation: ${I.message}`)}g=g.filter(({key:I})=>I!==N),p("uploadingFiles",g),await u(),D({id:P,message:e.jsx(e.Fragment,{children:k("Success")}),title:k("All files has been uploaded").toString(),color:"green",autoClose:2e3})}},[p,n,f]),{getInputProps:b,getRootProps:F,open:C}=J({onDrop:j,noClick:!0,noKeyboard:!0}),i=a.useMemo(()=>({...o,files:d,isError:m,isLoading:c,updateValue:p,openFilePicker:C,getDropZoneRootProps:F,getDropZoneInputProps:b,currentPath:n,mutateFiles:f,mutateFolders:h}),[d,m,c,p,C,F,b,n,f,h,o]);return e.jsxs(T.Provider,{value:i,children:[e.jsx("input",{...b({className:"hidden"})}),t]})},q=({isLast:t,onClick:o,icon:s,title:l,label:r})=>e.jsxs(e.Fragment,{children:[e.jsxs(ee,{onClick:o,className:w("flex flex-none items-center",t&&"pointer-events-none"),title:r,children:[e.jsx(s,{className:"w-6 text-blue-500"}),l&&e.jsx("span",{className:w("ml-2 text-lg font-semibold",t&&"underline"),children:l})]}),!t&&e.jsx("span",{className:"mx-2 flex-none text-2xl font-semibold text-gray-300",children:"/"})]}),ve=()=>{const{currentPath:t,updateValue:o}=y(),s=a.useMemo(()=>t.split("/").filter(r=>!!r),[t]),l=a.useCallback(r=>()=>{o("currentPath",r)},[o]);return e.jsxs("nav",{role:"navigation",className:"flex w-full items-center overflow-auto rounded-2xl border-2 border-project-border bg-white px-4",children:[e.jsx(q,{icon:se,onClick:l("/"),isLast:!s.length}),s.map((r,n)=>e.jsx(q,{icon:$,label:"/"+s.slice(0,n+1).join("/"),onClick:l("/"+s.slice(0,n+1).join("/")),title:r,isLast:n===s.length-1},r))]})},ye=()=>{const{updateValue:t,openFilePicker:o}=y(),{t:s}=S();return e.jsx("div",{className:"ml-3 grid aspect-square h-full flex-none",children:e.jsxs(A,{offset:10,position:"bottom-end",children:[e.jsx(A.Target,{children:e.jsx(ge,{color:"success",className:"relative flex aspect-square h-full cursor-pointer",children:e.jsx(te,{size:32,className:"absolute left-3 top-3"})})}),e.jsx(A.Dropdown,{children:e.jsxs(E,{children:[e.jsx(E.Item,{icon:"FilePlus",title:"Add new file to current folder",onClick:o,children:s("Add new file")}),e.jsx(E.Item,{icon:"FolderPlus",onClick:()=>t("showNewFolderCreator",!0),title:"Add new folder to current folder",children:s("Add new folder")})]})})]})})},Pe=()=>e.jsxs("section",{className:"mb-5 flex h-[55px]",children:[e.jsx(ve,{}),e.jsx(ye,{})]}),De=({isOpen:t,onClose:o})=>{const{getDropZoneRootProps:s}=y(),{t:l}=S();return e.jsx(oe,{opened:t,onClose:o,children:e.jsx("div",{...s({className:"flex h-full min-h-[750px] w-full rounded-2xl border-4 border-dashed border-blue-300 bg-gray-100"}),children:e.jsx("div",{className:"m-auto text-center",children:e.jsx("p",{className:"text-xl font-semibold text-gray-400",children:l("Drag your files here here")})})})})},M=()=>({itemsWrap:w("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-7 items-start"),itemRoot:w("relative block group"),itemSquare:(t=!0)=>w("aspect-square w-full rounded-lg bg-white shadow-md overflow-hidden relative",t?"group-hover:shadow-lg duration-200":"cursor-default"),itemLabel:w("mt-2 overflow-hidden text-ellipsis font-semibold group-hover:underline")}),z=M(),Se=({itemId:t,children:o,className:s,...l})=>e.jsx(re,{to:le.files.view(t),...l,children:o}),Me=({id:t,filename:o,mimeType:s,onDeleteClick:l})=>{var c;const r=o.split(".").at(-1)||"unknown",d=(((c=s==null?void 0:s.split("/"))==null?void 0:c[0])||"unknown")==="image",m=a.useCallback(()=>l(t),[t,l]);return e.jsxs("article",{className:z.itemRoot,children:[e.jsxs(Se,{itemId:t,children:[e.jsx("div",{className:z.itemSquare(),children:d?e.jsx("img",{alt:"uploaded file",className:"absolute top-0 left-0 h-full w-full object-cover",src:v.files.getAssetUrl(t,{w:"250",q:"60"}).toString()}):e.jsx("div",{className:"flex h-full w-full",children:e.jsx("p",{className:"m-auto text-3xl font-bold text-gray-400",children:r})})}),e.jsx("h3",{className:z.itemLabel,children:o})]}),e.jsx("div",{className:"absolute top-0 right-0 m-2.5",children:e.jsx(O,{onClick:m,size:45,color:"red",className:"border-2 border-project-border bg-white",children:e.jsx(Q,{size:25})})})]})},R=()=>{const t=M();return e.jsx(ae,{className:t.itemSquare(!1)})},Le=({itemKey:t,name:o,onClick:s,onDeleteClick:l})=>{var b,F;const{currentPath:r,workingFolders:n}=y(),[d,m]=a.useState(!1),c=M(),f=a.useMemo(()=>`${r==="/"?"":r}/${t}`,[t,r]),h=()=>m(!d),u=a.useMemo(()=>d?$:ne,[d]),p=a.useCallback(()=>s(f),[s,f]),j=a.useCallback(()=>l(f),[l,f]);return e.jsxs("div",{className:c.itemRoot,onMouseEnter:h,onMouseLeave:h,role:"link",children:[e.jsx("div",{className:w(c.itemSquare(),"flex cursor-pointer"),onClick:p,children:e.jsx(u,{className:"m-auto block h-28 w-28 text-blue-500"})}),e.jsx("h3",{className:w(c.itemLabel,"cursor-pointer text-left"),onClick:p,children:o}),e.jsx("div",{className:"absolute top-0 right-0 m-2.5",children:e.jsx(O,{onClick:j,size:45,color:"red",className:"border-2 border-project-border bg-white",disabled:((b=n[f])==null?void 0:b.type)==="deleting"||((F=n[f])==null?void 0:F.type)==="uploading",children:e.jsx(Q,{size:25})})})]})},Ie=({styles:t={}})=>{var j,b;const{updateValue:o,currentPath:s}=y(),l=M(),{t:r}=S(),{register:n,handleSubmit:d,setFocus:m,formState:c,setError:f}=ie(),{refetchFolders:h}=V(s);a.useEffect(()=>{m("name")},[m]);const u=async({name:F})=>{var C;try{await v.folders.create(`${s}/${F}`),await h(),o("showNewFolderCreator",!1)}catch(i){if(U.isAxiosError(i)&&((C=i.response)==null?void 0:C.status)===409)return f("name",{message:"This folder already exists"}),!1;throw i}},p=()=>{c.isSubmitting||o("showNewFolderCreator",!1)};return e.jsxs("div",{className:w(l.itemRoot,"text-left",c.isSubmitting&&"cursor-wait"),style:t,children:[e.jsx("div",{className:w(l.itemSquare(!1),"flex"),children:e.jsx(ce,{className:"m-auto h-28 w-28 text-blue-500"})}),e.jsxs("form",{onSubmit:d(u),className:"relative",children:[e.jsx("input",{className:"mt-1 w-full !border-b-4 !border-blue-500 bg-transparent text-lg font-medium outline-0 disabled:opacity-50",disabled:c.isSubmitting||c.isSubmitSuccessful,autoComplete:"off",...n("name",{onBlur:p})}),((b=(j=c.errors)==null?void 0:j.name)==null?void 0:b.message)&&e.jsx("small",{className:"b-0 translate-y-full text-lg font-semibold text-red-500",children:r(c.errors.name.message)})]})]})},Ae=()=>{var F,C;const{isLoading:t,isError:o,files:s,showNewFolderCreator:l,updateValue:r,uploadingFiles:n,workingFolders:d,mutateFiles:m,mutateFolders:c}=y(),f=je(),h=M(),{t:u}=S(),p=a.useCallback(i=>{r("currentPath",i)},[r]),j=a.useCallback(async i=>{var g;const x="Deleting folder";if(B({id:x,loading:!0,title:u("Deleting folder"),message:u("Deleting folder")+"...",autoClose:!1,disallowClose:!0}),confirm(u("Do you really want to delete this folder?"))){const P=i.split("/").at(-1);r("workingFolders",{...d,path:{type:"deleting"}});try{await v.folders.delete(i),c(N=>N==null?void 0:N.filter(L=>L!==P)),r("workingFolders",{...d,path:{type:"none"}}),D({id:x,color:"green",message:u("Your folder has been deleted"),autoClose:2e3})}catch(N){if(console.log(N),U.isAxiosError(N)&&((g=N.response)==null?void 0:g.status)===400){D({id:x,color:"red",message:u("This folder is not empty! Delete its contents first"),autoClose:2e3});return}D({id:x,color:"red",message:u("An unexpected error happened"),autoClose:2e3})}}},[d,r,c,u,f]),b=a.useCallback(async i=>{confirm(u("Do you really want to delete this file?"))&&(await v.files.delete(i),m(x=>x&&{...x,data:x.data.filter(g=>g.id!==i)}))},[m,u]);return t||o?e.jsx("div",{className:h.itemsWrap,children:new Array(10).fill(!0).map((i,x)=>e.jsx(R,{},x))}):e.jsx(e.Fragment,{children:(F=s==null?void 0:s.files)!=null&&F.length||(C=s==null?void 0:s.folders)!=null&&C.length||l?e.jsx("div",{className:h.itemsWrap,children:e.jsxs(e.Fragment,{children:[(s==null?void 0:s.folders)&&s.folders.map(i=>e.jsx(Le,{itemKey:i,name:i,onClick:p,onDeleteClick:j},i)),(s==null?void 0:s.files)&&s.files.map(i=>e.jsx(Me,{onDeleteClick:b,...i},i.id)),e.jsx(de,{mounted:l,transition:"pop-top-left",duration:200,timingFunction:"ease",children:i=>e.jsx(Ie,{styles:i})}),Object.entries(n).map(([i])=>e.jsx(R,{},i))]})}):e.jsx(ue,{})})},Ee=()=>{const[t,o]=a.useState(!1),s=a.useCallback(n=>{var d;n.preventDefault(),!t&&(((d=n==null?void 0:n.dataTransfer)==null?void 0:d.types)||[]).join("")==="Files"&&o(!0)},[t,o]),l=a.useCallback(n=>{n.preventDefault(),t&&o(!1)},[t,o]),r=a.useCallback(()=>o(!1),[o]);return e.jsx(ke,{children:e.jsxs("div",{onDragOver:s,onDrop:l,children:[e.jsx(Pe,{}),e.jsx(Ae,{}),e.jsx(De,{isOpen:t,onClose:r})]})})},Re=()=>{const{t}=S(),o=me("files");return o?e.jsxs(xe,{children:[e.jsx("div",{className:"flex w-full flex-col justify-between gap-5 py-10 md:flex-row",children:e.jsx("h1",{className:"text-3xl font-semibold capitalize",children:t(pe(o.tableName||""))})}),e.jsx(Ee,{}),e.jsx(he,{})]}):e.jsx(fe,{text:t("This model with this id does not exist.")})};export{Re as default};