import{N as e}from"./index.bd029905.js";import{d as u,H as _,o as m,c as f,J as o,E as n,a as s,F as i}from"./framework.9d0920f0.js";import"./Message.vue_vue_type_style_index_0_scoped_3564736d_lang.10a42063.js";const b=u({__name:"state",setup(C){const c=()=>{e({type:"info",text:"文本消息提示!"})},a=()=>{e({type:"success",text:"成功状态消息提示!"})},r=()=>{e({type:"warn",text:"警告状态消息提示!"})},p=()=>{e({type:"error",text:"错误状态消息提示!"})},l=()=>{e({type:"custom",text:"自定义消息弹窗样式",icon:"chrome",textColor:"#000",bgColor:"#e19af3"})};return(d,x)=>{const t=_("n-button");return m(),f(i,null,[o(t,{onClick:c},{default:n(()=>[s("文本状态")]),_:1}),o(t,{onClick:a},{default:n(()=>[s("成功状态")]),_:1}),o(t,{onClick:r},{default:n(()=>[s("警告状态")]),_:1}),o(t,{onClick:p},{default:n(()=>[s("错误状态")]),_:1}),o(t,{onClick:l},{default:n(()=>[s("自定义")]),_:1})],64)}}});export{b as default};