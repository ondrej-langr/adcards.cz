import{h as d,u as x,m as h,j as s,o as i,w as m}from"./index-LnQetCf-.js";import{I as j}from"./ItemsMissingMessage-PU1TwGDs.js";import{u as p}from"./useModelItems-AbJ8PUDc.js";import{L as u}from"./LoadingOverlay-BAwvvlsx.js";import{T as g}from"./Table-XxGuLzCw.js";import"./Overlay-BIcSuqKD.js";import"./ScrollArea-M3eh-8W2.js";const _=d("/_authorized/settings/user-roles/")({component:f});function f(){const{t:r}=x(),{data:e,isLoading:a,isError:n,isRefetching:l}=p(h.USER_ROLES),o=s.jsxs("tr",{children:[s.jsx("th",{children:r("Title")}),s.jsx("th",{children:r("Description")}),s.jsx("th",{className:"w-[100px] opacity-0",children:"Tools"})]}),c=e!=null&&e.data?e.data.map((t,E)=>s.jsxs("tr",{children:[s.jsx("td",{children:t.label}),s.jsx("td",{children:t.description}),s.jsx("td",{})]},t.id)):s.jsx("tr",{children:s.jsx("td",{colSpan:3,rowSpan:5,children:s.jsx(j,{className:"min-h-80"})})});return s.jsxs(i,{children:[s.jsx(i.Header,{title:"User roles"}),s.jsx(i.Content,{children:s.jsxs("div",{className:"relative min-h-[400px]",children:[s.jsx(u,{visible:a||l||n,overlayProps:{blur:2}}),s.jsxs(g,{className:m("-mx-5 mt-5"),horizontalSpacing:"xl",verticalSpacing:"sm",children:[s.jsx("thead",{children:o}),s.jsx("tbody",{children:c}),s.jsx("tfoot",{children:o})]})]})})]})}export{_ as Route};