import{R as g,I as be,K as Ne,$ as ge,aT as xe,N as we,r as D,bG as Se,bb as oe,J as ue,aS as je,b2 as Re,az as ye,aA as Ce,aY as Ee,u as De,bB as ze,j as t,ah as Y,B as Pe,M as U,P as Te,w as le,H as Ve,A as J,bH as Ae,bI as Ie,T as Me,a3 as W,a7 as ke}from"./index-SAZ6haNj.js";import{I as Le}from"./ItemsMissingMessage-kmo3gTn6.js";import{T as _e}from"./Textarea-DXEk40Sb.js";import{C as $e}from"./FileList-mh70E_HU.js";import{N as Be}from"./useModelItems-twPoOEQZ.js";function H(s,n,a){return n===void 0&&a===void 0?s:n!==void 0&&a===void 0?Math.max(s,n):Math.min(n===void 0&&a!==void 0?s:Math.max(s,n),a)}function ie({direction:s,style:n,...a}){return g.createElement("svg",{style:{width:"var(--ni-chevron-size)",height:"var(--ni-chevron-size)",transform:s==="up"?"rotate(180deg)":void 0,...n},viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg",...a},g.createElement("path",{d:"M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z",fill:"currentColor",fillRule:"evenodd",clipRule:"evenodd"}))}var Q={root:"m-e2f5cd4e",controls:"m-95e17d22",control:"m-80b4b171"};const Fe=/^-0(\.0*)?$/,Ue=/^-?0\d+$/;function We(s){return(typeof s=="number"?s<Number.MAX_SAFE_INTEGER:!Number.isNaN(Number(s)))&&!Number.isNaN(s)}function He({value:s,min:n,step:a=1,allowNegative:x}){const o=s-a;return n!==void 0&&o<n?n:!x&&o<0&&n===void 0?s:(n!==void 0&&n>=0&&o<=n,o)}function ce(s,n,a){if(s===void 0)return!0;const x=n===void 0||s>=n,o=a===void 0||s<=a;return x&&o}const Oe={step:1,clampBehavior:"blur",allowDecimal:!0,allowNegative:!0,startValue:0},Ge=ye((s,{size:n})=>({controls:{"--ni-chevron-size":Ce(n,"ni-chevron-size")}})),X=be((s,n)=>{const a=Ne("NumberInput",Oe,s),{className:x,classNames:o,styles:z,unstyled:I,vars:u,onChange:M,onValueChange:h,value:O,defaultValue:k,max:i,min:c,step:v,hideControls:w,rightSection:T,isAllowed:S,clampBehavior:V,onBlur:j,allowDecimal:m,decimalScale:R,onKeyDown:f,handlersRef:P,startValue:y,disabled:p,rightSectionPointerEvents:d,allowNegative:l,readOnly:C,size:L,rightSectionWidth:G,stepHoldInterval:b,stepHoldDelay:_,allowLeadingZeros:q,...de}=a,Z=ge({name:"NumberInput",classes:Q,props:a,classNames:o,styles:z,unstyled:I,vars:u,varsResolver:Ge}),{resolvedClassNames:me,resolvedStyles:fe}=xe({classNames:o,styles:z,props:a}),[r,E]=we({value:O,defaultValue:k,onChange:M}),ee=_!==void 0&&b!==void 0,te=D.useRef(null),A=D.useRef(null),K=D.useRef(0),pe=(e,N)=>{N.source==="event"&&E(We(e.floatValue)&&!Fe.test(e.value)&&!(q&&Ue.test(e.value))?e.floatValue:e.value),h==null||h(e,N)},$=D.useRef();$.current=()=>{typeof r!="number"||Number.isNaN(r)?E(H(y,c,i)):E(i!==void 0?r+v<=i?r+v:i:r+v)};const B=D.useRef();B.current=()=>{typeof r!="number"||Number.isNaN(r)?E(H(y,c,i)):E(He({value:r,min:c,step:v,allowNegative:l}))};const he=e=>{f==null||f(e),!C&&(e.key==="ArrowUp"&&(e.preventDefault(),$.current()),e.key==="ArrowDown"&&(e.preventDefault(),B.current()))};Se(P,{increment:$.current,decrement:B.current});const se=e=>{e?$.current():B.current(),K.current+=1},ne=e=>{if(se(e),ee){const N=typeof b=="number"?b:b(K.current);A.current=window.setTimeout(()=>ne(e),N)}},ae=(e,N)=>{var re;e.preventDefault(),(re=te.current)==null||re.focus(),se(N),ee&&(A.current=window.setTimeout(()=>ne(N),_))},F=()=>{A.current&&window.clearTimeout(A.current),A.current=null,K.current=0},ve=g.createElement("div",{...Z("controls")},g.createElement(oe,{...Z("control"),tabIndex:-1,"aria-hidden":!0,disabled:p||typeof r=="number"&&i!==void 0&&r>=i,mod:{direction:"up"},onMouseDown:e=>e.preventDefault(),onPointerDown:e=>{ae(e,!0)},onPointerUp:F,onPointerLeave:F},g.createElement(ie,{direction:"up"})),g.createElement(oe,{...Z("control"),tabIndex:-1,"aria-hidden":!0,disabled:p||typeof r=="number"&&c!==void 0&&r<=c,mod:{direction:"down"},onMouseDown:e=>e.preventDefault(),onPointerDown:e=>{ae(e,!1)},onPointerUp:F,onPointerLeave:F},g.createElement(ie,{direction:"down"})));return g.createElement(ue,{component:Be,allowNegative:l,className:je(Q.root,x),size:L,...de,readOnly:C,disabled:p,value:r,getInputRef:Re(n,te),onValueChange:pe,rightSection:w||C?T:T||ve,classNames:me,styles:fe,unstyled:I,__staticSelector:"NumberInput",decimalScale:m?R:0,onKeyDown:he,rightSectionPointerEvents:d??(p?"none":void 0),rightSectionWidth:G??`var(--ni-right-section-width-${L||"sm"})`,allowLeadingZeros:q,onBlur:e=>{j==null||j(e),V==="blur"&&typeof r=="number"&&H(r,c,i)!==r&&E(H(r,c,i))},isAllowed:e=>V==="strict"?S?S(e)&&ce(e.floatValue,c,i):ce(e.floatValue,c,i):S?S(e):!0})});X.classes={...ue.classes,...Q};X.displayName="@mantine/core/NumberInput";const Xe=({name:s,label:n,columns:a,placement:x,disabled:o,readonly:z})=>{var T,S,V;const I=Ee(),{t:u}=De(),M=`${s}.data`,{fields:h,remove:O,move:k,append:i}=ze({name:M}),c=(V=(S=(T=I.errors)==null?void 0:T[s])==null?void 0:S.data)==null?void 0:V.message,v=D.useMemo(()=>!!Array.from(a.values()).find(({title:j})=>!!j),[a]),w=h!=null&&h.length?h:[];return t.jsx(Y.Wrapper,{size:"md",classNames:{label:"flex w-full justify-between items-center"},error:typeof c=="string"?u(c):void 0,label:t.jsxs(t.Fragment,{children:[t.jsx("span",{children:n}),z?null:t.jsx(Pe,{size:"compact-sm",color:"green",onClick:()=>i({}),children:u(U.ADD_ROW)})]}),children:t.jsxs(Te,{className:le(["mt-2 flex flex-col divide-y divide-blue-200",x===Ve.MAIN?"p-3":"p-1",c?"mb-1 border-red-400":""]),children:[w.map((j,m)=>t.jsxs("div",{className:le("flex w-full gap-2 first:pt-0 last:pb-0","py-3"),children:[z?null:t.jsxs("div",{className:"flex flex-col w-10 mt-6",children:[t.jsx(J,{size:"sm",disabled:m===0,className:"w-full max-h-[22px] min-h-[22px] rounded-b-none rounded-prom",variant:"white",onClick:()=>k(m,m-1),children:t.jsx(Ae,{size:16})}),t.jsx(J,{size:"sm",disabled:w.length-1===m,className:"w-full max-h-[22px] min-h-[22px] rounded-t-none rounded-prom",variant:"white",onClick:()=>k(m,m+1),children:t.jsx(Ie,{size:16})})]}),a.map(R=>{let f=t.jsx(t.Fragment,{});const P=`${M}.${m}.${R.name}`,y=R.title||(v?u(`${s} label`):void 0),p=R.title?void 0:{label:"opacity-0"};switch(R.type){case"number":f=t.jsx(W,{name:P,render:({field:{onChange:d,name:l,onBlur:C,ref:L,value:G},fieldState:{error:b}})=>t.jsx(X,{ref:L,name:l,onBlur:C,onChange:_=>d(_),label:y,autoComplete:"off",classNames:p,error:u((b==null?void 0:b.message)??""),value:G,className:"w-full",disabled:o})});break;case"string":f=t.jsx(W,{name:P,render:({field:d,fieldState:{error:l}})=>t.jsx(ke,{label:y,type:"string",autoComplete:"off",error:u((l==null?void 0:l.message)??""),className:"w-full",classNames:p,disabled:o,...d})});break;case"boolean":f=t.jsx(W,{name:P,render:({field:d,fieldState:{error:l}})=>t.jsx(Y.Wrapper,{classNames:p,size:"md",label:y,error:u((l==null?void 0:l.message)??""),children:t.jsx($e,{name:d.name,checked:!!d.value,size:"md",onChange:C=>d.onChange(C.currentTarget.checked),label:u(d.value?U.YES:U.NO),className:"mt-1",disabled:o})})});break;case"longText":f=t.jsx(W,{name:P,render:({field:d,fieldState:{error:l}})=>t.jsx(_e,{autosize:!0,minRows:9,label:y,className:"w-full",error:u((l==null?void 0:l.message)??""),disabled:o,classNames:p,...d})});break}return t.jsx(D.Fragment,{children:f},R.name)}),z?null:t.jsx(Y.Wrapper,{label:v?u("Actions"):void 0,classNames:{label:"opacity-0"},className:"flex-none",children:t.jsx("div",{className:"grid grid-cols-1",children:t.jsx(J,{disabled:o,p:"xs",size:"xl",variant:"subtle",color:"red",onClick:()=>confirm(u(U.ON_DELETE_REQUEST_PROMPT))&&O(m),children:t.jsx(Me,{})})})})]},j.id)),w!=null&&w.length?null:t.jsx(Le,{className:"py-4"})]})})};export{X as N,Xe as R,H as c};
