import{g as m,u as p,k as h,l as d,h as x,q as F,t as f,v as g,r,j as e,o as t,w as j,O as v}from"./index-SAZ6haNj.js";import{F as E}from"./FileList-mh70E_HU.js";import"./NativeScrollArea-YDPG7T6l.js";import"./use-window-event-PmHn1Oon.js";import"./Overlay-6lSEz1if.js";import"./ItemsMissingMessage-kmo3gTn6.js";import"./Skeleton-C4hdwXqm.js";const P=m("/_authorized/files/")({component:N});function N(){const{t:n}=p(),s=h(d.FILES),a=x(),c=F(),o=f({from:g.id}).folder,l=r.useMemo(()=>(o||"/").replaceAll("//","/"),[o]),i=r.useCallback(u=>{a({to:c.history.location.pathname,search:{folder:u}})},[a]);return e.jsxs(t,{children:[e.jsx(t.Header,{title:n((s==null?void 0:s.tableName)||""),classNames:{wrapper:j("")}}),e.jsx(t.Content,{className:" mb-20 mt-10",children:e.jsx(E,{currentFolder:l,onFolderChange:i})}),e.jsx(v,{})]})}export{P as Route};