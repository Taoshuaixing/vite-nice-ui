import{d as t,b as l,m as u,H as s,o as p,D as r}from"./framework.9d0920f0.js";const v=t({__name:"decimal",setup(c){const e=l(3);return u(()=>{console.log("value:",e.value)}),(m,n)=>{const o=s("n-input-number");return p(),r(o,{step:.1,value:e.value,"onUpdate:value":n[0]||(n[0]=a=>e.value=a)},null,8,["value"])}}});export{v as default};