import{r as i,e as p,u as d,j as s,T as f,f as v,A as x,C as h,g as b,c as g,h as C,i as j,D as L,k,l as I,I as N,B as y}from"./index-d65991cf.js";function E(){const[a,t]=i.useState(!1),l=i.useRef(null),e=i.useCallback(()=>t(!0),[]),n=i.useCallback(()=>t(!1),[]);return i.useEffect(()=>{if(l.current)return l.current.addEventListener("mouseenter",e),l.current.addEventListener("mouseleave",n),()=>{var o,c;(o=l.current)==null||o.removeEventListener("mouseenter",e),(c=l.current)==null||c.removeEventListener("mouseleave",n)}},[]),{ref:l,hovered:a}}const w=({fileUrl:a})=>{const{hovered:t,ref:l}=E(),e=p(),{t:n}=d(),o=()=>e.copy(a);return s.jsx(f,{label:n("File URL"),type:"string",className:"w-full",autoComplete:"off",value:a.pathname,rightSection:s.jsx(v,{label:n(e.copied?"Link copied!":"Copy link to clipboard"),position:"left",radius:"xl",transition:"fade",transitionDuration:200,opened:t||e.copied,children:s.jsx(x,{ref:l,onClick:o,color:"blue",variant:"filled",size:"xl",className:"mr-2",children:s.jsx(h,{className:"h-7 w-7"})})}),disabled:!0},"fileUrl")},F=()=>{const{t:a}=d(),{fileId:t}=b(),l=g(),{data:e,isLoading:n}=C("files",t),o=i.useMemo(()=>!!t&&j.files.getAssetUrl(t),[t]),c=i.useMemo(()=>{var r;return(r=e==null?void 0:e.mimeType)==null?void 0:r.startsWith("image/")},[e]),m=()=>{if(!e)return;const r=e.filepath.split("/").slice(0,-1).join("/");let u="/files";r&&(u+=`?folder=/${r}`),l(u)};return s.jsx(L,{size:"xl",opened:!0,onClose:m,padding:"xl",position:"right",closeButtonLabel:a("Close"),title:s.jsx(k,{order:4,children:n?a("Loading, please wait..."):s.jsxs(s.Fragment,{children:["File info of '",s.jsx("span",{className:"text-blue-500",children:e.filename}),"'"]})}),children:!n&&e&&o?s.jsxs(s.Fragment,{children:[s.jsx(I,{mb:"lg",mt:"sm",size:"sm"}),c?s.jsx(N.Wrapper,{label:a("File preview"),className:"py-3",labelProps:{className:"font-semibold"},children:s.jsx(y,{quality:80,width:450,imageId:t,className:"mb-3 w-full"})}):null,s.jsx(w,{fileUrl:o})]}):null})};export{F as default};