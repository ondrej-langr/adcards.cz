import{u,n as o,cl as n,M as r}from"./index-SAZ6haNj.js";const l=4e3,M=()=>{const{t}=u();return async(e,i)=>{const a=o.show({loading:!0,title:e.title,message:e.message,autoClose:!1});try{const s=await i();return n({id:a,title:e.successMessage||t(r.PROMISE_FINISHED_MESSAGE_DEFAULT),message:"",autoClose:l,loading:!1}),s}catch(s){throw o.update({id:a,color:"red",title:e.errorMessage?typeof e.errorMessage=="function"?e.errorMessage(s):e.errorMessage:t(r.ERROR_BASIC),message:"",autoClose:l,loading:!1}),s}}};export{M as u};