import{d as s,b as a,m as c,H as f,o as l,D as p}from"./framework.9d0920f0.js";const i=s({__name:"size",setup(r){const n=a([{key:"1",tab:"Tab 1",content:"Content of Tab Pane 1"},{key:"2",tab:"Tab 2",content:"Content of Tab Pane 2"},{key:"3",tab:"Tab 3",content:"Content of Tab Pane 3"},{key:"4",tab:"Tab 4",content:"Content of Tab Pane 4"},{key:"5",tab:"Tab 5",content:"Content of Tab Pane 5"},{key:"6",tab:"Tab 6",content:"Content of Tab Pane 6"}]),e=a("1");return c(()=>{console.log("activeKey:",e.value)}),(T,t)=>{const o=f("n-tabs");return l(),p(o,{size:"large","tab-pages":n.value,"active-key":e.value,"onUpdate:activeKey":t[0]||(t[0]=b=>e.value=b)},null,8,["tab-pages","active-key"])}}});export{i as default};