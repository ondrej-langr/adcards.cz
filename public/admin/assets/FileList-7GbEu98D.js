import{r as u,Y as xr,R as S,_ as Le,bZ as et,b2 as wr,ah as xe,b_ as rt,V as Dr,W as Cr,aQ as tt,b$ as nt,aP as ot,aD as at,c0 as it,aZ as st,c1 as nr,c2 as lt,an as ct,ay as Fr,e as Z,bE as ut,g as Me,aK as K,M as H,c3 as pt,c4 as ft,ac as ye,j as i,c5 as dt,bc as mt,w as W,c6 as gt,c7 as jr,u as Fe,B as ze,aI as he,A as Ue,bJ as bt,c8 as Er,T as kr,x as ht,c9 as vt,b as yt,f as Ar,ca as xt,aA as wt}from"./index-LnQetCf-.js";import{_ as te,a as ne,b as or,c as ar}from"./NativeScrollArea-HhO51BOk.js";import{M as Dt}from"./Modal-3srM9rDe.js";import{I as Ct}from"./ItemsMissingMessage-PU1TwGDs.js";import{g as Ft}from"./get-auto-contrast-value-TBhcg1GA.js";import{C as jt,S as ir}from"./Skeleton-_tGmaWaA.js";var Or={root:"m-5f75b09e",body:"m-5f6e695e",labelWrapper:"m-d3ea56bb",label:"m-8ee546b8",description:"m-328f68c0",error:"m-8e8a99cc"};const Et=Or,_r=u.forwardRef(({__staticSelector:e,__stylesApiProps:r,className:t,classNames:n,styles:o,unstyled:a,children:l,label:c,description:p,id:b,disabled:d,error:g,size:v,labelPosition:y="left",variant:m,style:E,vars:P,mod:N,...M},R)=>{const F=xr({name:e,props:r,className:t,style:E,classes:Or,classNames:n,styles:o,unstyled:a});return S.createElement(Le,{...F("root"),ref:R,__vars:{"--label-fz":et(v),"--label-lh":wr(v,"label-lh")},mod:[{"label-position":y},N],variant:m,size:v,...M},S.createElement("div",{...F("body")},l,S.createElement("div",{...F("labelWrapper"),"data-disabled":d||void 0},c&&S.createElement("label",{...F("label"),"data-disabled":d||void 0,htmlFor:b},c),p&&S.createElement(xe.Description,{size:v,__inheritStyles:!1,...F("description")},p),g&&g!=="boolean"&&S.createElement(xe.Error,{size:v,__inheritStyles:!1,...F("error")},g))))});_r.displayName="@mantine/core/InlineInput";const Sr=u.createContext(null),kt=Sr.Provider,At=()=>u.useContext(Sr);function Ot({children:e,role:r}){const t=rt();return t?S.createElement("div",{role:r,"aria-labelledby":t.labelId,"aria-describedby":t.describedBy},e):S.createElement(S.Fragment,null,e)}const _t={},Ge=Dr((e,r)=>{const{value:t,defaultValue:n,onChange:o,size:a,wrapperProps:l,children:c,readOnly:p,...b}=Cr("CheckboxGroup",_t,e),[d,g]=tt({value:t,defaultValue:n,finalValue:[],onChange:o}),v=y=>{const m=y.currentTarget.value;!p&&g(d.includes(m)?d.filter(E=>E!==m):[...d,m])};return S.createElement(kt,{value:{value:d,onChange:v,size:a}},S.createElement(xe.Wrapper,{size:a,ref:r,...l,...b,labelElement:"div",__staticSelector:"CheckboxGroup"},S.createElement(Ot,{role:"group"},c)))});Ge.classes=xe.Wrapper.classes;Ge.displayName="@mantine/core/CheckboxGroup";var Pr={root:"m-bf2d988c",inner:"m-26062bec",input:"m-26063560",icon:"m-bf295423","input--outline":"m-215c4542"};const St={labelPosition:"right",icon:jt},Pt=at((e,{radius:r,color:t,size:n,iconColor:o,variant:a,autoContrast:l})=>{const c=it({color:t||e.primaryColor,theme:e}),p=c.isThemeColor&&c.shade===void 0?`var(--mantine-color-${c.color}-outline)`:c.color;return{root:{"--checkbox-size":wr(n,"checkbox-size"),"--checkbox-radius":r===void 0?void 0:st(r),"--checkbox-color":a==="outline"?p:nr(t,e),"--checkbox-icon-color":o?nr(o,e):Ft(l,e)?lt({color:t,theme:e}):void 0}}}),je=Dr((e,r)=>{const t=Cr("Checkbox",St,e),{classNames:n,className:o,style:a,styles:l,unstyled:c,vars:p,color:b,label:d,id:g,size:v,radius:y,wrapperProps:m,children:E,checked:P,labelPosition:N,description:M,error:R,disabled:F,variant:k,indeterminate:z,icon:h,rootRef:w,iconColor:O,onChange:A,autoContrast:$,mod:U,...J}=t,C=At(),T=v||(C==null?void 0:C.size),Ee=h,G=xr({name:"Checkbox",props:t,classes:Pr,className:o,style:a,classNames:n,styles:l,unstyled:c,vars:p,varsResolver:Pt}),{styleProps:ae,rest:I}=nt(J),pe=ot(g),ie=C?{checked:C.value.includes(I.value),onChange:V=>{C.onChange(V),A==null||A(V)}}:{};return S.createElement(_r,{...G("root"),__staticSelector:"Checkbox",__stylesApiProps:t,id:pe,size:T,labelPosition:N,label:d,description:M,error:R,disabled:F,classNames:n,styles:l,unstyled:c,"data-checked":ie.checked||P||void 0,variant:k,ref:w,mod:U,...ae,...m},S.createElement(Le,{...G("inner"),mod:{"data-label-position":N}},S.createElement(Le,{component:"input",id:pe,ref:r,checked:P,disabled:F,mod:{error:!!R,indeterminate:z},...G("input",{focusable:!0,variant:k}),onChange:A,...I,...ie,type:"checkbox"}),S.createElement(Ee,{indeterminate:z,...G("icon")})))});je.classes={...Pr,...Et};je.displayName="@mantine/core/Checkbox";je.Group=Ge;var Nr={exports:{}},Nt="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",It=Nt,Tt=It;function Ir(){}function Tr(){}Tr.resetWarningCache=Ir;var Rt=function(){function e(n,o,a,l,c,p){if(p!==Tt){var b=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw b.name="Invariant Violation",b}}e.isRequired=e;function r(){return e}var t={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:r,element:e,elementType:e,instanceOf:r,node:e,objectOf:r,oneOf:r,oneOfType:r,shape:r,exact:r,checkPropTypes:Tr,resetWarningCache:Ir};return t.PropTypes=t,t};Nr.exports=Rt();var Lt=Nr.exports;const x=ct(Lt),Mt=e=>()=>Z.library.folders.getMany(e).then(r=>r.data.data),zt=e=>{const r=u.useMemo(()=>["folders",e],[e]),t=Fr(r,Mt(e),{enabled:!!e});return u.useMemo(()=>({...t,key:r}),[t,r])},Rr=(e,r)=>{const t=ut(),n=u.useMemo(()=>["files",e,r],[e,r]),{data:o,isError:a,isLoading:l,refetch:c}=Fr(n,()=>Z.library.files.getMany({path:e,limit:9999,where:r})),{data:p,isError:b,key:d,refetch:g}=zt(e),v=u.useCallback(m=>t.setQueryData(n,m),[t,n]),y=u.useCallback(m=>{t.setQueryData(d,m)},[t,d]);return u.useMemo(()=>({data:o!=null&&o.data.data||p?{files:o==null?void 0:o.data.data,folders:p}:void 0,isError:a||b,isLoading:l||!b&&!p,mutateFiles:v,mutateFolders:y,refetchFolders:g,refetchFiles:c}),[v,y,g,c,l,b,p,a,o])};var $t=new Map([["aac","audio/aac"],["abw","application/x-abiword"],["arc","application/x-freearc"],["avif","image/avif"],["avi","video/x-msvideo"],["azw","application/vnd.amazon.ebook"],["bin","application/octet-stream"],["bmp","image/bmp"],["bz","application/x-bzip"],["bz2","application/x-bzip2"],["cda","application/x-cdf"],["csh","application/x-csh"],["css","text/css"],["csv","text/csv"],["doc","application/msword"],["docx","application/vnd.openxmlformats-officedocument.wordprocessingml.document"],["eot","application/vnd.ms-fontobject"],["epub","application/epub+zip"],["gz","application/gzip"],["gif","image/gif"],["heic","image/heic"],["heif","image/heif"],["htm","text/html"],["html","text/html"],["ico","image/vnd.microsoft.icon"],["ics","text/calendar"],["jar","application/java-archive"],["jpeg","image/jpeg"],["jpg","image/jpeg"],["js","text/javascript"],["json","application/json"],["jsonld","application/ld+json"],["mid","audio/midi"],["midi","audio/midi"],["mjs","text/javascript"],["mp3","audio/mpeg"],["mp4","video/mp4"],["mpeg","video/mpeg"],["mpkg","application/vnd.apple.installer+xml"],["odp","application/vnd.oasis.opendocument.presentation"],["ods","application/vnd.oasis.opendocument.spreadsheet"],["odt","application/vnd.oasis.opendocument.text"],["oga","audio/ogg"],["ogv","video/ogg"],["ogx","application/ogg"],["opus","audio/opus"],["otf","font/otf"],["png","image/png"],["pdf","application/pdf"],["php","application/x-httpd-php"],["ppt","application/vnd.ms-powerpoint"],["pptx","application/vnd.openxmlformats-officedocument.presentationml.presentation"],["rar","application/vnd.rar"],["rtf","application/rtf"],["sh","application/x-sh"],["svg","image/svg+xml"],["swf","application/x-shockwave-flash"],["tar","application/x-tar"],["tif","image/tiff"],["tiff","image/tiff"],["ts","video/mp2t"],["ttf","font/ttf"],["txt","text/plain"],["vsd","application/vnd.visio"],["wav","audio/wav"],["weba","audio/webm"],["webm","video/webm"],["webp","image/webp"],["woff","font/woff"],["woff2","font/woff2"],["xhtml","application/xhtml+xml"],["xls","application/vnd.ms-excel"],["xlsx","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],["xml","application/xml"],["xul","application/vnd.mozilla.xul+xml"],["zip","application/zip"],["7z","application/x-7z-compressed"],["mkv","video/x-matroska"],["mov","video/quicktime"],["msg","application/vnd.ms-outlook"]]);function ce(e,r){var t=Wt(e);if(typeof t.path!="string"){var n=e.webkitRelativePath;Object.defineProperty(t,"path",{value:typeof r=="string"?r:typeof n=="string"&&n.length>0?n:e.name,writable:!1,configurable:!1,enumerable:!0})}return t}function Wt(e){var r=e.name,t=r&&r.lastIndexOf(".")!==-1;if(t&&!e.type){var n=r.split(".").pop().toLowerCase(),o=$t.get(n);o&&Object.defineProperty(e,"type",{value:o,writable:!1,configurable:!1,enumerable:!0})}return e}var Bt=[".DS_Store","Thumbs.db"];function Kt(e){return te(this,void 0,void 0,function(){return ne(this,function(r){return we(e)&&Ht(e.dataTransfer)?[2,qt(e.dataTransfer,e.type)]:Ut(e)?[2,Gt(e)]:Array.isArray(e)&&e.every(function(t){return"getFile"in t&&typeof t.getFile=="function"})?[2,Vt(e)]:[2,[]]})})}function Ht(e){return we(e)}function Ut(e){return we(e)&&we(e.target)}function we(e){return typeof e=="object"&&e!==null}function Gt(e){return $e(e.target.files).map(function(r){return ce(r)})}function Vt(e){return te(this,void 0,void 0,function(){var r;return ne(this,function(t){switch(t.label){case 0:return[4,Promise.all(e.map(function(n){return n.getFile()}))];case 1:return r=t.sent(),[2,r.map(function(n){return ce(n)})]}})})}function qt(e,r){return te(this,void 0,void 0,function(){var t,n;return ne(this,function(o){switch(o.label){case 0:return e.items?(t=$e(e.items).filter(function(a){return a.kind==="file"}),r!=="drop"?[2,t]:[4,Promise.all(t.map(Yt))]):[3,2];case 1:return n=o.sent(),[2,sr(Lr(n))];case 2:return[2,sr($e(e.files).map(function(a){return ce(a)}))]}})})}function sr(e){return e.filter(function(r){return Bt.indexOf(r.name)===-1})}function $e(e){if(e===null)return[];for(var r=[],t=0;t<e.length;t++){var n=e[t];r.push(n)}return r}function Yt(e){if(typeof e.webkitGetAsEntry!="function")return lr(e);var r=e.webkitGetAsEntry();return r&&r.isDirectory?Mr(r):lr(e)}function Lr(e){return e.reduce(function(r,t){return or(or([],ar(r),!1),ar(Array.isArray(t)?Lr(t):[t]),!1)},[])}function lr(e){var r=e.getAsFile();if(!r)return Promise.reject("".concat(e," is not a File"));var t=ce(r);return Promise.resolve(t)}function Zt(e){return te(this,void 0,void 0,function(){return ne(this,function(r){return[2,e.isDirectory?Mr(e):Jt(e)]})})}function Mr(e){var r=e.createReader();return new Promise(function(t,n){var o=[];function a(){var l=this;r.readEntries(function(c){return te(l,void 0,void 0,function(){var p,b,d;return ne(this,function(g){switch(g.label){case 0:if(c.length)return[3,5];g.label=1;case 1:return g.trys.push([1,3,,4]),[4,Promise.all(o)];case 2:return p=g.sent(),t(p),[3,4];case 3:return b=g.sent(),n(b),[3,4];case 4:return[3,6];case 5:d=Promise.all(c.map(Zt)),o.push(d),a(),g.label=6;case 6:return[2]}})})},function(c){n(c)})}a()})}function Jt(e){return te(this,void 0,void 0,function(){return ne(this,function(r){return[2,new Promise(function(t,n){e.file(function(o){var a=ce(o,e.fullPath);t(a)},function(o){n(o)})})]})})}var Qt=function(e,r){if(e&&r){var t=Array.isArray(r)?r:r.split(","),n=e.name||"",o=(e.type||"").toLowerCase(),a=o.replace(/\/.*$/,"");return t.some(function(l){var c=l.trim().toLowerCase();return c.charAt(0)==="."?n.toLowerCase().endsWith(c):c.endsWith("/*")?a===c.replace(/\/.*$/,""):o===c})}return!0};function cr(e){return rn(e)||en(e)||$r(e)||Xt()}function Xt(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function en(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function rn(e){if(Array.isArray(e))return We(e)}function ur(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),t.push.apply(t,n)}return t}function pr(e){for(var r=1;r<arguments.length;r++){var t=arguments[r]!=null?arguments[r]:{};r%2?ur(Object(t),!0).forEach(function(n){zr(e,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ur(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})}return e}function zr(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function le(e,r){return on(e)||nn(e,r)||$r(e,r)||tn()}function tn(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function $r(e,r){if(e){if(typeof e=="string")return We(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);if(t==="Object"&&e.constructor&&(t=e.constructor.name),t==="Map"||t==="Set")return Array.from(e);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return We(e,r)}}function We(e,r){(r==null||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function nn(e,r){var t=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(t!=null){var n=[],o=!0,a=!1,l,c;try{for(t=t.call(e);!(o=(l=t.next()).done)&&(n.push(l.value),!(r&&n.length===r));o=!0);}catch(p){a=!0,c=p}finally{try{!o&&t.return!=null&&t.return()}finally{if(a)throw c}}return n}}function on(e){if(Array.isArray(e))return e}var an="file-invalid-type",sn="file-too-large",ln="file-too-small",cn="too-many-files",un=function(r){r=Array.isArray(r)&&r.length===1?r[0]:r;var t=Array.isArray(r)?"one of ".concat(r.join(", ")):r;return{code:an,message:"File type must be ".concat(t)}},fr=function(r){return{code:sn,message:"File is larger than ".concat(r," ").concat(r===1?"byte":"bytes")}},dr=function(r){return{code:ln,message:"File is smaller than ".concat(r," ").concat(r===1?"byte":"bytes")}},pn={code:cn,message:"Too many files"};function Wr(e,r){var t=e.type==="application/x-moz-file"||Qt(e,r);return[t,t?null:un(r)]}function Br(e,r,t){if(Y(e.size))if(Y(r)&&Y(t)){if(e.size>t)return[!1,fr(t)];if(e.size<r)return[!1,dr(r)]}else{if(Y(r)&&e.size<r)return[!1,dr(r)];if(Y(t)&&e.size>t)return[!1,fr(t)]}return[!0,null]}function Y(e){return e!=null}function fn(e){var r=e.files,t=e.accept,n=e.minSize,o=e.maxSize,a=e.multiple,l=e.maxFiles,c=e.validator;return!a&&r.length>1||a&&l>=1&&r.length>l?!1:r.every(function(p){var b=Wr(p,t),d=le(b,1),g=d[0],v=Br(p,n,o),y=le(v,1),m=y[0],E=c?c(p):null;return g&&m&&!E})}function De(e){return typeof e.isPropagationStopped=="function"?e.isPropagationStopped():typeof e.cancelBubble<"u"?e.cancelBubble:!1}function ve(e){return e.dataTransfer?Array.prototype.some.call(e.dataTransfer.types,function(r){return r==="Files"||r==="application/x-moz-file"}):!!e.target&&!!e.target.files}function mr(e){e.preventDefault()}function dn(e){return e.indexOf("MSIE")!==-1||e.indexOf("Trident/")!==-1}function mn(e){return e.indexOf("Edge/")!==-1}function gn(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:window.navigator.userAgent;return dn(e)||mn(e)}function B(){for(var e=arguments.length,r=new Array(e),t=0;t<e;t++)r[t]=arguments[t];return function(n){for(var o=arguments.length,a=new Array(o>1?o-1:0),l=1;l<o;l++)a[l-1]=arguments[l];return r.some(function(c){return!De(n)&&c&&c.apply(void 0,[n].concat(a)),De(n)})}}function bn(){return"showOpenFilePicker"in window}function hn(e){if(Y(e)){var r=Object.entries(e).filter(function(t){var n=le(t,2),o=n[0],a=n[1],l=!0;return Kr(o)||(console.warn('Skipped "'.concat(o,'" because it is not a valid MIME type. Check https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types for a list of valid MIME types.')),l=!1),(!Array.isArray(a)||!a.every(Hr))&&(console.warn('Skipped "'.concat(o,'" because an invalid file extension was provided.')),l=!1),l}).reduce(function(t,n){var o=le(n,2),a=o[0],l=o[1];return pr(pr({},t),{},zr({},a,l))},{});return[{accept:r}]}return e}function vn(e){if(Y(e))return Object.entries(e).reduce(function(r,t){var n=le(t,2),o=n[0],a=n[1];return[].concat(cr(r),[o],cr(a))},[]).filter(function(r){return Kr(r)||Hr(r)}).join(",")}function yn(e){return e instanceof DOMException&&(e.name==="AbortError"||e.code===e.ABORT_ERR)}function xn(e){return e instanceof DOMException&&(e.name==="SecurityError"||e.code===e.SECURITY_ERR)}function Kr(e){return e==="audio/*"||e==="video/*"||e==="image/*"||e==="text/*"||/\w+\/[-+.\w]+/g.test(e)}function Hr(e){return/^.*\.[\w]+$/.test(e)}var wn=["children"],Dn=["open"],Cn=["refKey","role","onKeyDown","onFocus","onBlur","onClick","onDragEnter","onDragOver","onDragLeave","onDrop"],Fn=["refKey","onChange","onClick"];function jn(e){return An(e)||kn(e)||Ur(e)||En()}function En(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function kn(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function An(e){if(Array.isArray(e))return Be(e)}function Te(e,r){return Sn(e)||_n(e,r)||Ur(e,r)||On()}function On(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ur(e,r){if(e){if(typeof e=="string")return Be(e,r);var t=Object.prototype.toString.call(e).slice(8,-1);if(t==="Object"&&e.constructor&&(t=e.constructor.name),t==="Map"||t==="Set")return Array.from(e);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return Be(e,r)}}function Be(e,r){(r==null||r>e.length)&&(r=e.length);for(var t=0,n=new Array(r);t<r;t++)n[t]=e[t];return n}function _n(e,r){var t=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(t!=null){var n=[],o=!0,a=!1,l,c;try{for(t=t.call(e);!(o=(l=t.next()).done)&&(n.push(l.value),!(r&&n.length===r));o=!0);}catch(p){a=!0,c=p}finally{try{!o&&t.return!=null&&t.return()}finally{if(a)throw c}}return n}}function Sn(e){if(Array.isArray(e))return e}function gr(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),t.push.apply(t,n)}return t}function D(e){for(var r=1;r<arguments.length;r++){var t=arguments[r]!=null?arguments[r]:{};r%2?gr(Object(t),!0).forEach(function(n){Ke(e,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):gr(Object(t)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})}return e}function Ke(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function Ce(e,r){if(e==null)return{};var t=Pn(e,r),n,o;if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],!(r.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(t[n]=e[n])}return t}function Pn(e,r){if(e==null)return{};var t={},n=Object.keys(e),o,a;for(a=0;a<n.length;a++)o=n[a],!(r.indexOf(o)>=0)&&(t[o]=e[o]);return t}var Ve=u.forwardRef(function(e,r){var t=e.children,n=Ce(e,wn),o=Vr(n),a=o.open,l=Ce(o,Dn);return u.useImperativeHandle(r,function(){return{open:a}},[a]),S.createElement(u.Fragment,null,t(D(D({},l),{},{open:a})))});Ve.displayName="Dropzone";var Gr={disabled:!1,getFilesFromEvent:Kt,maxSize:1/0,minSize:0,multiple:!0,maxFiles:0,preventDropOnDocument:!0,noClick:!1,noKeyboard:!1,noDrag:!1,noDragEventsBubbling:!1,validator:null,useFsAccessApi:!0,autoFocus:!1};Ve.defaultProps=Gr;Ve.propTypes={children:x.func,accept:x.objectOf(x.arrayOf(x.string)),multiple:x.bool,preventDropOnDocument:x.bool,noClick:x.bool,noKeyboard:x.bool,noDrag:x.bool,noDragEventsBubbling:x.bool,minSize:x.number,maxSize:x.number,maxFiles:x.number,disabled:x.bool,getFilesFromEvent:x.func,onFileDialogCancel:x.func,onFileDialogOpen:x.func,useFsAccessApi:x.bool,autoFocus:x.bool,onDragEnter:x.func,onDragLeave:x.func,onDragOver:x.func,onDrop:x.func,onDropAccepted:x.func,onDropRejected:x.func,onError:x.func,validator:x.func};var He={isFocused:!1,isFileDialogActive:!1,isDragActive:!1,isDragAccept:!1,isDragReject:!1,acceptedFiles:[],fileRejections:[]};function Vr(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},r=D(D({},Gr),e),t=r.accept,n=r.disabled,o=r.getFilesFromEvent,a=r.maxSize,l=r.minSize,c=r.multiple,p=r.maxFiles,b=r.onDragEnter,d=r.onDragLeave,g=r.onDragOver,v=r.onDrop,y=r.onDropAccepted,m=r.onDropRejected,E=r.onFileDialogCancel,P=r.onFileDialogOpen,N=r.useFsAccessApi,M=r.autoFocus,R=r.preventDropOnDocument,F=r.noClick,k=r.noKeyboard,z=r.noDrag,h=r.noDragEventsBubbling,w=r.onError,O=r.validator,A=u.useMemo(function(){return vn(t)},[t]),$=u.useMemo(function(){return hn(t)},[t]),U=u.useMemo(function(){return typeof P=="function"?P:br},[P]),J=u.useMemo(function(){return typeof E=="function"?E:br},[E]),C=u.useRef(null),T=u.useRef(null),Ee=u.useReducer(Nn,He),G=Te(Ee,2),ae=G[0],I=G[1],pe=ae.isFocused,ie=ae.isFileDialogActive,V=u.useRef(typeof window<"u"&&window.isSecureContext&&N&&bn()),qe=function(){!V.current&&ie&&setTimeout(function(){if(T.current){var f=T.current.files;f.length||(I({type:"closeDialog"}),J())}},300)};u.useEffect(function(){return window.addEventListener("focus",qe,!1),function(){window.removeEventListener("focus",qe,!1)}},[T,ie,J,V]);var Q=u.useRef([]),Ye=function(f){C.current&&C.current.contains(f.target)||(f.preventDefault(),Q.current=[])};u.useEffect(function(){return R&&(document.addEventListener("dragover",mr,!1),document.addEventListener("drop",Ye,!1)),function(){R&&(document.removeEventListener("dragover",mr),document.removeEventListener("drop",Ye))}},[C,R]),u.useEffect(function(){return!n&&M&&C.current&&C.current.focus(),function(){}},[C,M,n]);var q=u.useCallback(function(s){w?w(s):console.error(s)},[w]),Ze=u.useCallback(function(s){s.preventDefault(),s.persist(),ge(s),Q.current=[].concat(jn(Q.current),[s.target]),ve(s)&&Promise.resolve(o(s)).then(function(f){if(!(De(s)&&!h)){var j=f.length,_=j>0&&fn({files:f,accept:A,minSize:l,maxSize:a,multiple:c,maxFiles:p,validator:O}),L=j>0&&!_;I({isDragAccept:_,isDragReject:L,isDragActive:!0,type:"setDraggedFiles"}),b&&b(s)}}).catch(function(f){return q(f)})},[o,b,q,h,A,l,a,c,p,O]),Je=u.useCallback(function(s){s.preventDefault(),s.persist(),ge(s);var f=ve(s);if(f&&s.dataTransfer)try{s.dataTransfer.dropEffect="copy"}catch{}return f&&g&&g(s),!1},[g,h]),Qe=u.useCallback(function(s){s.preventDefault(),s.persist(),ge(s);var f=Q.current.filter(function(_){return C.current&&C.current.contains(_)}),j=f.indexOf(s.target);j!==-1&&f.splice(j,1),Q.current=f,!(f.length>0)&&(I({type:"setDraggedFiles",isDragActive:!1,isDragAccept:!1,isDragReject:!1}),ve(s)&&d&&d(s))},[C,d,h]),fe=u.useCallback(function(s,f){var j=[],_=[];s.forEach(function(L){var se=Wr(L,A),re=Te(se,2),Ae=re[0],Oe=re[1],_e=Br(L,l,a),be=Te(_e,2),Se=be[0],Pe=be[1],Ne=O?O(L):null;if(Ae&&Se&&!Ne)j.push(L);else{var Ie=[Oe,Pe];Ne&&(Ie=Ie.concat(Ne)),_.push({file:L,errors:Ie.filter(function(Xr){return Xr})})}}),(!c&&j.length>1||c&&p>=1&&j.length>p)&&(j.forEach(function(L){_.push({file:L,errors:[pn]})}),j.splice(0)),I({acceptedFiles:j,fileRejections:_,type:"setFiles"}),v&&v(j,_,f),_.length>0&&m&&m(_,f),j.length>0&&y&&y(j,f)},[I,c,A,l,a,p,v,y,m,O]),de=u.useCallback(function(s){s.preventDefault(),s.persist(),ge(s),Q.current=[],ve(s)&&Promise.resolve(o(s)).then(function(f){De(s)&&!h||fe(f,s)}).catch(function(f){return q(f)}),I({type:"reset"})},[o,fe,q,h]),X=u.useCallback(function(){if(V.current){I({type:"openDialog"}),U();var s={multiple:c,types:$};window.showOpenFilePicker(s).then(function(f){return o(f)}).then(function(f){fe(f,null),I({type:"closeDialog"})}).catch(function(f){yn(f)?(J(f),I({type:"closeDialog"})):xn(f)?(V.current=!1,T.current?(T.current.value=null,T.current.click()):q(new Error("Cannot open the file picker because the https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API is not supported and no <input> was provided."))):q(f)});return}T.current&&(I({type:"openDialog"}),U(),T.current.value=null,T.current.click())},[I,U,J,N,fe,q,$,c]),Xe=u.useCallback(function(s){!C.current||!C.current.isEqualNode(s.target)||(s.key===" "||s.key==="Enter"||s.keyCode===32||s.keyCode===13)&&(s.preventDefault(),X())},[C,X]),er=u.useCallback(function(){I({type:"focus"})},[]),rr=u.useCallback(function(){I({type:"blur"})},[]),tr=u.useCallback(function(){F||(gn()?setTimeout(X,0):X())},[F,X]),ee=function(f){return n?null:f},ke=function(f){return k?null:ee(f)},me=function(f){return z?null:ee(f)},ge=function(f){h&&f.stopPropagation()},Zr=u.useMemo(function(){return function(){var s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},f=s.refKey,j=f===void 0?"ref":f,_=s.role,L=s.onKeyDown,se=s.onFocus,re=s.onBlur,Ae=s.onClick,Oe=s.onDragEnter,_e=s.onDragOver,be=s.onDragLeave,Se=s.onDrop,Pe=Ce(s,Cn);return D(D(Ke({onKeyDown:ke(B(L,Xe)),onFocus:ke(B(se,er)),onBlur:ke(B(re,rr)),onClick:ee(B(Ae,tr)),onDragEnter:me(B(Oe,Ze)),onDragOver:me(B(_e,Je)),onDragLeave:me(B(be,Qe)),onDrop:me(B(Se,de)),role:typeof _=="string"&&_!==""?_:"presentation"},j,C),!n&&!k?{tabIndex:0}:{}),Pe)}},[C,Xe,er,rr,tr,Ze,Je,Qe,de,k,z,n]),Jr=u.useCallback(function(s){s.stopPropagation()},[]),Qr=u.useMemo(function(){return function(){var s=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},f=s.refKey,j=f===void 0?"ref":f,_=s.onChange,L=s.onClick,se=Ce(s,Fn),re=Ke({accept:A,multiple:c,type:"file",style:{display:"none"},onChange:ee(B(_,de)),onClick:ee(B(L,Jr)),tabIndex:-1},j,T);return D(D({},re),se)}},[T,t,c,de,n]);return D(D({},ae),{},{isFocused:pe&&!n,getRootProps:Zr,getInputProps:Qr,rootRef:C,inputRef:T,open:ee(X)})}function Nn(e,r){switch(r.type){case"focus":return D(D({},e),{},{isFocused:!0});case"blur":return D(D({},e),{},{isFocused:!1});case"openDialog":return D(D({},He),{},{isFileDialogActive:!0});case"closeDialog":return D(D({},e),{},{isFileDialogActive:!1});case"setDraggedFiles":return D(D({},e),{},{isDragActive:r.isDragActive,isDragAccept:r.isDragAccept,isDragReject:r.isDragReject});case"setFiles":return D(D({},e),{},{acceptedFiles:r.acceptedFiles,fileRejections:r.fileRejections});case"reset":return D({},He);default:return e}}function br(){}const In=(e,r)=>r.map(t=>({key:`${e==="/"?"":e}/${t.name}`,file:t,formattedSize:t.size/1e6+"MB",name:t.name.split(".").slice(0,-1).join(),uploaded:!1})),qr={currentPath:"/",uploadingFiles:[],showNewFolderCreator:!1,workingFolders:{},files:void 0,isError:!1,isLoading:!0,mutateFiles:()=>{},mutateFolders:()=>{},getDropZoneInputProps:()=>{},getDropZoneRootProps:()=>{},openFilePicker:()=>{},updateValue:()=>{}},Yr=u.createContext(qr),oe=()=>u.useContext(Yr);function Tn(e,{name:r,value:t}){return{...e,[r]:t}}const Rn=dt(),Ln=({children:e,currentFolder:r,onFolderChange:t,onToggleSelectedFile:n,selectedFileIds:o,fileQueryParameters:a})=>{const[l,c]=u.useReducer(Tn,qr),{data:p,isError:b,isLoading:d,mutateFiles:g,mutateFolders:v,refetchFiles:y}=Rr(r,a==null?void 0:a.where),m=u.useCallback((F,k)=>{if(F==="currentPath"){t(String(k));return}c({name:F,value:k})},[c]),E=u.useCallback(async F=>{let k=In(r,F);m("uploadingFiles",k);const z="on-drop-file-info";Me({id:z,title:K(H.UPLOADING).toString(),message:K(H.UPLOADING_FILES).toString(),color:"blue",autoClose:!1});for(const{key:h,file:w}of k){try{await Z.library.files.create(w,{root:r})}catch(O){let A=K(H.FILE_CANNOT_BE_UPLOADED).toString();O instanceof pt?(A+=" ",A+=K(H.FILE_TOO_LARGE).toString()):O instanceof ft&&(A+=" ",A+=K(H.FILE_EXTENSION_UNSUPPORTED).toString().replaceAll("{{extension}}",w.name.split(".").at(-1)??"extension")),Me({id:`failed-upload-${w.name}`,title:K(H.UPLOADING_FAILED).toString(),message:A.replaceAll("{{fileName}}",w.name??"file"),color:"red",autoClose:8e3}),Rn.error(O)}k=k.filter(({key:O})=>O!==h),m("uploadingFiles",k),await y()}ye({id:z,title:i.jsx(i.Fragment,{children:K(H.UPLOADING_FINISHED)}),message:K(H.ALL_FILES_HAS_BEEN_PROCESSED).toString(),color:"green",autoClose:3e3})},[m,r,g]),{getInputProps:P,getRootProps:N,open:M}=Vr({onDrop:E,noClick:!0,noKeyboard:!0}),R=u.useMemo(()=>({...l,onToggleSelectedFile:n,selectedFileIds:o,files:p,isError:b,isLoading:d,updateValue:m,openFilePicker:M,getDropZoneRootProps:N,getDropZoneInputProps:P,currentPath:r,mutateFiles:g,mutateFolders:v}),[p,b,d,m,M,N,P,r,g,v,l,n,o]);return i.jsxs(Yr.Provider,{value:R,children:[i.jsx("input",{...P({className:"hidden"})}),e]})},hr=({isLast:e,onClick:r,icon:t,title:n,label:o})=>i.jsxs(i.Fragment,{children:[i.jsxs(mt,{onClick:r,className:W("flex flex-none items-center",e&&"pointer-events-none"),title:o,children:[i.jsx(t,{className:"w-6 text-blue-500"}),n&&i.jsx("span",{className:W("ml-2 text-lg font-semibold",e&&"underline"),children:n})]}),!e&&i.jsx("span",{className:"mx-2 flex-none text-2xl font-semibold text-gray-300",children:"/"})]}),Mn=()=>{const{currentPath:e,updateValue:r}=oe(),t=u.useMemo(()=>e.split("/").filter(o=>!!o),[e]),n=u.useCallback(o=>()=>{r("currentPath",o)},[r]);return i.jsxs("nav",{role:"navigation",className:"flex w-full overflow-auto items-center ml-2",children:[i.jsx(hr,{icon:gt,onClick:n("/"),isLast:!t.length}),t.map((o,a)=>i.jsx(hr,{icon:jr,label:"/"+t.slice(0,a+1).join("/"),onClick:n("/"+t.slice(0,a+1).join("/")),title:o,isLast:a===t.length-1},o))]})},zn=()=>{const{updateValue:e,openFilePicker:r}=oe(),{t}=Fe();return i.jsx("div",{className:"ml-3 h-full flex-none",children:i.jsxs("div",{className:"flex",children:[i.jsx(ze,{size:"sm",className:"rounded-r-none",onClick:r,children:t("Add new file")}),i.jsxs(he,{withArrow:!0,arrowPosition:"center",position:"bottom-end",children:[i.jsx(he.Target,{children:i.jsx(Ue,{variant:"outline",className:"rounded-l-none flex-none h-full py-1.5 px-1 w-auto",size:"md",children:i.jsx(bt,{size:22})})}),i.jsx(he.Dropdown,{children:i.jsx(he.Item,{color:"blue",leftSection:i.jsx(Er,{className:"w-4"}),onClick:()=>e("showNewFolderCreator",!0),title:"Add new folder to current folder",children:t("Add new folder")})})]})]})})},$n=()=>i.jsxs("section",{className:"mb-5 flex h-[55px] p-2 items-center rounded-prom shadow-md shadow-blue-100 bg-white dark:bg-transparent dark:shadow-none border-blue-200 border dark:border-none",children:[i.jsx(Mn,{}),i.jsx(zn,{})]}),Wn=({isOpen:e,onClose:r})=>{const{getDropZoneRootProps:t}=oe(),{t:n}=Fe();return i.jsx(Dt,{opened:e,onClose:r,children:i.jsx("div",{...t({className:"flex h-full min-h-[750px] w-full rounded-2xl border-4 border-dashed border-blue-300 bg-gray-100"}),children:i.jsx("div",{className:"m-auto text-center",children:i.jsx("p",{className:"text-xl font-semibold text-gray-400",children:n("Drag your files here here")})})})})},ue=()=>({itemsWrap:W("grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-5 items-start relative"),itemRoot:W("relative block group"),itemSquare:(e=!0)=>W("aspect-square w-full rounded-lg bg-white shadow-md overflow-hidden relative border-blue-200 border","dark:border-2 dark:bg-transparent dark:border-dashed backdrop-blur-md",e?"group-hover:shadow-lg duration-200":"cursor-default"),itemLabel:W("mt-2 overflow-hidden text-ellipsis font-semibold group-hover:underline")}),Re=ue(),Bn=({itemId:e,children:r,className:t,...n})=>i.jsx("a",{href:`/admin${ht.files.view(e)}`,...n,children:r}),Kn=({onDeleteClick:e,onTogglePick:r,isPicked:t,...n})=>{var g,v;const o=u.useRef(null),a=n.filename.split(".").at(-1)||"unknown",c=(((v=(g=n.mimeType)==null?void 0:g.split("/"))==null?void 0:v[0])||"unknown")==="image",p=u.useCallback(()=>{e(n.id),r&&r(n,!1)},[n.id,e,r]),b=u.useCallback(y=>r?r(n,y.currentTarget.checked):null,[n.id,r]),d=u.useCallback(y=>{var m;r&&(y.preventDefault(),(m=o.current)==null||m.click())},[r]);return i.jsxs("article",{className:Re.itemRoot,children:[i.jsxs(Bn,{onClick:d,itemId:n.id,children:[i.jsx("div",{className:Re.itemSquare(),children:c?i.jsx("img",{alt:"uploaded file",className:"absolute top-0 left-0 h-full w-full object-cover",src:Z.library.files.getUrl(n.id,{w:"250",q:"60"}).toString()}):i.jsx("div",{className:"flex h-full w-full",children:i.jsx("p",{className:"m-auto text-3xl font-bold text-gray-400",children:a})})}),i.jsx("h3",{className:Re.itemLabel,children:n.filename})]}),i.jsxs("div",{className:"absolute top-0 right-0 m-2.5 flex gap-2",children:[r?i.jsx(je,{ref:o,checked:t,onChange:b,color:"blue",size:"xl",className:"flex-none cursor-pointer"}):null,i.jsx(Ue,{onClick:p,size:36,color:"red",className:"flex-none",children:i.jsx(kr,{size:20})})]})]})},vr=["w-4/5","w-1/2","w-1/3","w-4/6","w-8/12"],yr=({animate:e,className:r})=>{const t=ue(),n=u.useRef(vr[Math.floor(Math.random()*vr.length)]);return i.jsxs("div",{className:r,children:[i.jsx(ir,{animate:e,className:t.itemSquare(!1)}),i.jsx(ir,{animate:e,className:W(t.itemLabel,n.current,"h-7")})]})},Hn=({itemKey:e,name:r,onClick:t,onDeleteClick:n})=>{var m,E;const{currentPath:o,workingFolders:a}=oe(),[l,c]=u.useState(!1),p=ue(),b=u.useMemo(()=>`${o==="/"?"":o}/${e}`,[e,o]),d=()=>c(!l),g=u.useMemo(()=>l?jr:vt,[l]),v=u.useCallback(()=>t(b),[t,b]),y=u.useCallback(()=>n(b),[n,b]);return i.jsxs("div",{className:p.itemRoot,onMouseEnter:d,onMouseLeave:d,role:"link",children:[i.jsx("div",{className:W(p.itemSquare(),"flex cursor-pointer"),onClick:v,children:i.jsx(g,{className:"m-auto block h-16 w-16 text-blue-500"})}),i.jsx("h3",{className:W(p.itemLabel,"cursor-pointer text-left"),onClick:v,children:r}),i.jsx("div",{className:"absolute top-0 right-0 m-2.5",children:i.jsx(Ue,{onClick:y,size:36,color:"red",disabled:((m=a[b])==null?void 0:m.type)==="deleting"||((E=a[b])==null?void 0:E.type)==="uploading",children:i.jsx(kr,{size:20})})})]})},Un=({styles:e={}})=>{var y,m;const{updateValue:r,currentPath:t}=oe(),n=ue(),{t:o}=Fe(),{register:a,handleSubmit:l,setFocus:c,formState:p,setError:b}=yt(),{refetchFolders:d}=Rr(t);u.useEffect(()=>{c("name")},[c]);const g=async({name:E})=>{var P;try{await Z.library.folders.create(`${t}/${E}`),await d(),r("showNewFolderCreator",!1)}catch(N){if(Ar.isAxiosError(N)&&((P=N.response)==null?void 0:P.status)===409)return b("name",{message:"This folder already exists"}),!1;throw N}},v=()=>{p.isSubmitting||r("showNewFolderCreator",!1)};return i.jsxs("div",{className:W(n.itemRoot,"text-left",p.isSubmitting&&"cursor-wait"),style:e,children:[i.jsx("div",{className:W(n.itemSquare(!1),"flex"),children:i.jsx(Er,{className:"m-auto h-16 w-16 text-blue-500"})}),i.jsxs("form",{onSubmit:l(g),className:"relative",children:[i.jsx("input",{className:"mt-1 w-full !border-b-2 !border-blue-200 bg-transparent text-lg font-medium outline-0 disabled:opacity-50",disabled:p.isSubmitting||p.isSubmitSuccessful,autoComplete:"off",...a("name",{onBlur:v})}),((m=(y=p.errors)==null?void 0:y.name)==null?void 0:m.message)&&i.jsx("small",{className:"b-0 translate-y-full text-lg font-semibold text-red-500",children:o(p.errors.name.message)})]})]})},Gn=()=>{var R,F,k,z;const{isLoading:e,isError:r,files:t,showNewFolderCreator:n,updateValue:o,uploadingFiles:a,workingFolders:l,mutateFiles:c,mutateFolders:p,onToggleSelectedFile:b,selectedFileIds:d,openFilePicker:g}=oe(),v=xt(),y=ue(),{t:m}=Fe(),E=u.useCallback(h=>{o("currentPath",h)},[o]),P=u.useCallback(async h=>{var O;const w="Deleting folder";if(Me({id:w,loading:!0,title:m("Deleting folder"),message:m("Deleting folder")+"...",autoClose:!1,disallowClose:!0}),confirm(m("Do you really want to delete this folder?"))){const A=h.split("/").at(-1);o("workingFolders",{...l,path:{type:"deleting"}});try{await Z.library.folders.delete(h),p($=>$==null?void 0:$.filter(U=>U!==A)),o("workingFolders",{...l,path:{type:"none"}}),ye({id:w,color:"green",message:m("Your folder has been deleted"),autoClose:2e3})}catch($){if(console.log($),Ar.isAxiosError($)&&((O=$.response)==null?void 0:O.status)===400){ye({id:w,color:"red",message:m("This folder is not empty! Delete its contents first"),autoClose:2e3});return}ye({id:w,color:"red",message:m("An unexpected error happened"),autoClose:2e3})}}},[l,o,p,m,v]),N=u.useCallback(async h=>{confirm(m("Do you really want to delete this file?"))&&(await Z.library.files.delete(h),c(w=>w&&{...w,data:{...w.data,data:w.data.data.filter(O=>O.id!==h)}}))},[c,m]);if(e||r)return i.jsx("div",{className:y.itemsWrap,children:new Array(10).fill(!0).map((h,w)=>i.jsx(yr,{},w))});const M=!((R=t==null?void 0:t.folders)!=null&&R.length)&&!((F=t==null?void 0:t.files)!=null&&F.length)&&!n;return i.jsxs("div",{className:y.itemsWrap,children:[(k=t==null?void 0:t.folders)==null?void 0:k.map(h=>i.jsx(Hn,{itemKey:h,name:h,onClick:E,onDeleteClick:P},h)),(z=t==null?void 0:t.files)==null?void 0:z.map(h=>i.jsx(Kn,{onDeleteClick:N,isPicked:!!(d!=null&&d.find(w=>w.id===h.id)),onTogglePick:b,...h},h.id)),i.jsx(wt,{mounted:n,transition:"pop-top-left",duration:200,timingFunction:"ease",children:h=>i.jsx(Un,{styles:h})}),Object.entries(a).map(([h])=>i.jsx(yr,{},h)),M?i.jsx(i.Fragment,{children:i.jsx("div",{className:"col-span-full flex items-center bg-white dark:bg-transparent backdrop-blur-md bg-opacity-40 dark:bg-opacity-0 shadow-blue-100 rounded-prom py-20 border-2 border-dashed border-blue-200",children:i.jsxs("div",{className:"flex flex-col mx-auto",children:[i.jsx(Ct,{}),i.jsxs("div",{className:"flex gap-5 mt-5",children:[i.jsx(ze,{onClick:g,children:"Add new file"}),i.jsx(ze,{onClick:()=>o("showNewFolderCreator",!0),children:"Add new folder"})]})]})})}):null]})},Xn=({currentFolder:e,onFolderChange:r,selectedFileIds:t,onToggleSelectedFile:n,fileQueryParameters:o})=>{const[a,l]=u.useState(!1),c=u.useCallback(d=>{var g;d.preventDefault(),!a&&(((g=d==null?void 0:d.dataTransfer)==null?void 0:g.types)||[]).join("")==="Files"&&l(!0)},[a,l]),p=u.useCallback(d=>{d.preventDefault(),a&&l(!1)},[a,l]),b=u.useCallback(()=>l(!1),[l]);return i.jsx(Ln,{currentFolder:e,onFolderChange:r,selectedFileIds:t,onToggleSelectedFile:n,fileQueryParameters:o,children:i.jsxs("div",{onDragOver:c,onDrop:p,children:[i.jsx($n,{}),i.jsx(Gn,{}),i.jsx(Wn,{isOpen:a,onClose:b})]})})};export{je as C,Xn as F};