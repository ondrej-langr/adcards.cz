import{r as n,u as p,j as t,ab as f,M as c,af as h,A as x,aj as b,g as v,ak as C,al as g,h as E,e as j,am as y,an as w,ao as T}from"./index-V81NBkkY.js";import{D as L}from"./Drawer-t_RC8ba3.js";import{D as I}from"./Divider-uU4n8YgE.js";import"./NativeScrollArea-3RcdrrPH.js";import"./Overlay-ZRnzj5aG.js";function N({timeout:e=2e3}={}){const[i,s]=n.useState(null),[o,a]=n.useState(!1),[l,r]=n.useState(null),u=d=>{window.clearTimeout(l),r(window.setTimeout(()=>a(!1),e)),a(d)};return{copy:d=>{"clipboard"in navigator?navigator.clipboard.writeText(d).then(()=>u(!0)).catch(m=>s(m)):s(new Error("useClipboard: navigator.clipboard is not supported"))},reset:()=>{a(!1),s(null),window.clearTimeout(l)},error:i,copied:o}}function R(){const[e,i]=n.useState(!1),s=n.useRef(null),o=n.useCallback(()=>i(!0),[]),a=n.useCallback(()=>i(!1),[]);return n.useEffect(()=>{if(s.current)return s.current.addEventListener("mouseenter",o),s.current.addEventListener("mouseleave",a),()=>{var l,r;(l=s.current)==null||l.removeEventListener("mouseenter",o),(r=s.current)==null||r.removeEventListener("mouseleave",a)}},[]),{ref:s,hovered:e}}const S=({fileUrl:e})=>{const{hovered:i,ref:s}=R(),o=N(),{t:a}=p(),l=()=>o.copy(e);return t.jsx(f,{label:a(c.FILE_URL),type:"string",className:"w-full",autoComplete:"off",value:e.pathname,rightSection:t.jsx(h,{label:a(o.copied?c.COPY_DONE:c.COPY_TO_CLIPBOARD),position:"left",radius:"xl",transitionProps:{transition:"fade",duration:200},opened:i||o.copied,children:t.jsx(x,{ref:s,onClick:l,color:"blue",variant:"filled",size:"xl",className:"mr-2",children:t.jsx(b,{className:"h-7 w-7"})})}),disabled:!0},"fileUrl")},A=v("/_authorized/files/$fileId/")({component:P});function P(){const e=C({from:g.id}),{t:i}=p(),s=E(),o=n.useMemo(()=>!!e.id&&j.library.files.getUrl(e.id),[e]),a=n.useMemo(()=>{var r;return(r=e==null?void 0:e.mimeType)==null?void 0:r.startsWith("image/")},[e]),l=()=>{if(!e)return;const r=e.filepath.split("/").slice(0,-1).join("/");let u="/files";r&&(u+=`?folder=/${r}`),s({to:u})};return t.jsx(L,{size:"xl",opened:!0,onClose:l,padding:"xl",position:"right",closeButtonProps:{"aria-label":i(c.CLOSE)},title:t.jsx(y,{order:4,children:t.jsxs(t.Fragment,{children:["File info of '",t.jsx("span",{className:"text-blue-500",children:e.filename}),"'"]})}),children:o?t.jsxs(t.Fragment,{children:[t.jsx(I,{mb:"lg",mt:"sm",size:"sm"}),a?t.jsx(w.Wrapper,{label:i(c.FILE_PREVIEW),className:"py-3",labelProps:{className:"font-semibold"},children:t.jsx(T,{quality:80,width:450,imageId:e.id,className:"mb-3 w-full"})}):null,t.jsx(S,{fileUrl:o})]}):null})}export{A as Route};
