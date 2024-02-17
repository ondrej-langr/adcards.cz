import{am as K,V as g,W as C,R as r,_ as w,Y as O,ap as $,aW as D,N as H,au as v}from"./index-UkeQhmow.js";import{S as L}from"./ScrollArea-n1YaU9Cl.js";const[M,Q]=K("Table component was not found in the tree");var y={table:"m-b23fa0ef",th:"m-4e7aa4f3",tr:"m-4e7aa4fd",td:"m-4e7aa4ef",tbody:"m-b2404537",thead:"m-b242d975",caption:"m-9e5a3ac7",scrollContainer:"m-a100c15",scrollContainerInner:"m-62259741"};function X(e,a){if(!a)return;const t={};return a.columnBorder&&e.withColumnBorders&&(t["data-with-column-border"]=!0),a.rowBorder&&e.withRowBorders&&(t["data-with-row-border"]=!0),a.striped&&e.striped&&(t["data-striped"]=e.striped),a.highlightOnHover&&e.highlightOnHover&&(t["data-hover"]=!0),a.captionSide&&e.captionSide&&(t["data-side"]=e.captionSide),a.stickyHeader&&e.stickyHeader&&(t["data-sticky"]=!0),t}function b(e,a){const t=`Table${e.charAt(0).toUpperCase()}${e.slice(1)}`,o=g((n,c)=>{const s=C(t,{},n),{classNames:i,className:m,style:p,styles:u,...d}=s,h=Q();return r.createElement(w,{component:e,ref:c,...X(h,a),...h.getStyles(e,{className:m,classNames:i,style:p,styles:u,props:s}),...d})});return o.displayName=`@mantine/core/${t}`,o.classes=y,o}const S=b("th",{columnBorder:!0}),P=b("td",{columnBorder:!0}),T=b("tr",{rowBorder:!0,striped:!0,highlightOnHover:!0}),A=b("thead",{stickyHeader:!0}),W=b("tbody"),z=b("tfoot"),I=b("caption",{captionSide:!0});function E({data:e}){return r.createElement(r.Fragment,null,e.caption&&r.createElement(I,null,e.caption),e.head&&r.createElement(A,null,r.createElement(T,null,e.head.map((a,t)=>r.createElement(S,{key:t},a)))),e.body&&r.createElement(W,null,e.body.map((a,t)=>r.createElement(T,{key:t},a.map((o,n)=>r.createElement(P,{key:n},o))))),e.foot&&r.createElement(z,null,r.createElement(T,null,e.foot.map((a,t)=>r.createElement(S,{key:t},a)))))}E.displayName="@mantine/core/TableDataRenderer";const Z={type:"scrollarea"},x=$((e,{minWidth:a,type:t})=>({scrollContainer:{"--table-min-width":D(a),"--table-overflow":t==="native"?"auto":void 0}})),B=g((e,a)=>{const t=C("TableScrollContainer",Z,e),{classNames:o,className:n,style:c,styles:s,unstyled:i,vars:m,children:p,minWidth:u,type:d,...h}=t,f=O({name:"TableScrollContainer",classes:y,props:t,className:n,style:c,classNames:o,styles:s,unstyled:i,vars:m,varsResolver:x,rootSelector:"scrollContainer"});return r.createElement(w,{component:d==="scrollarea"?L:"div",...d==="scrollarea"?{offsetScrollbars:"x"}:{},ref:a,...f("scrollContainer"),...h},r.createElement("div",{...f("scrollContainerInner")},p))});B.classes=y;B.displayName="@mantine/core/TableScrollContainer";const ee={withRowBorders:!0,verticalSpacing:7},te=$((e,{layout:a,captionSide:t,horizontalSpacing:o,verticalSpacing:n,borderColor:c,stripedColor:s,highlightOnHoverColor:i,striped:m,highlightOnHover:p,stickyHeaderOffset:u,stickyHeader:d})=>({table:{"--table-layout":a,"--table-caption-side":t,"--table-horizontal-spacing":H(o),"--table-vertical-spacing":H(n),"--table-border-color":c?v(c,e):void 0,"--table-striped-color":m&&s?v(s,e):void 0,"--table-highlight-on-hover-color":p&&i?v(i,e):void 0,"--table-sticky-header-offset":d?D(u):void 0}})),l=g((e,a)=>{const t=C("Table",ee,e),{classNames:o,className:n,style:c,styles:s,unstyled:i,vars:m,horizontalSpacing:p,verticalSpacing:u,captionSide:d,stripedColor:h,highlightOnHoverColor:f,striped:R,highlightOnHover:V,withColumnBorders:_,withRowBorders:F,withTableBorder:U,borderColor:ae,layout:re,variant:Y,data:k,children:j,stickyHeader:q,stickyHeaderOffset:oe,mod:G,...J}=t,N=O({name:"Table",props:t,className:n,style:c,classes:y,classNames:o,styles:s,unstyled:i,rootSelector:"table",vars:m,varsResolver:te});return r.createElement(M,{value:{getStyles:N,stickyHeader:q,striped:R===!0?"odd":R||void 0,highlightOnHover:V,withColumnBorders:_,withRowBorders:F,captionSide:d||"bottom"}},r.createElement(w,{component:"table",variant:Y,ref:a,mod:[{"data-with-table-border":U},G],...N("table"),...J},j||!!k&&r.createElement(E,{data:k})))});l.classes=y;l.displayName="@mantine/core/Table";l.Td=P;l.Th=S;l.Tr=T;l.Thead=A;l.Tbody=W;l.Tfoot=z;l.Caption=I;l.ScrollContainer=B;l.DataRenderer=E;export{l as T};
