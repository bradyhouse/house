import{o as u,f as d,g as i,F as L,j as E,k as C,t as T,l as $,q as h,v as p,x as b,y,z as P,A as w,B,C as A}from"./@vue-20508c0d.js";import{c as O}from"./pinia-f0881e96.js";import{c as R,a as x}from"./vue-router-c28b90d7.js";/* empty css                   */(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))c(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const s of e.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&c(s)}).observe(document,{childList:!0,subtree:!0});function n(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function c(t){if(t.ep)return;t.ep=!0;const e=n(t);fetch(t.href,e)}})();const I={name:"BreadCrumbs",props:{crumbs:{type:Array,required:!0}},methods:{isLast(o){return o===this.crumbs.length-1},selected(o){o.url&&window.open(o.url,"_blank")}}};const g=(o,r)=>{const n=o.__vccOpts||o;for(const[c,t]of r)n[c]=t;return n},V={class:"hide-0-to-750"},S={className:"navbar-nav me-auto"},D=["onClick"],F={key:0,class:"btn btn-primary disabled"};function q(o,r,n,c,t,e){return u(),d("nav",V,[i("ul",S,[(u(!0),d(L,null,E(n.crumbs,(s,a)=>(u(),d("li",{key:a,class:"nav-item"},[i("button",{type:"button",class:C(["btn btn-primary",{disabled:e.isLast(a)}]),onClick:v=>e.selected(s)},T(s.title),11,D),e.isLast(a)?$("",!0):(u(),d("button",F," \\ "))]))),128))])])}const z=g(I,[["render",q],["__scopeId","data-v-f43058aa"]]),G={name:"TopNav",props:{href:{type:String,required:!0}},components:{BreadCrumbs:z},data(){return{crumbs:[{title:"fiddle.sh",url:"https://bradyhouse.github.io/"},{title:"Vue",url:"https://bradyhouse.github.io/vue/index.html"},{title:"fiddle-0000-TemplateTs",url:null}]}},methods:{onLinkClick(){window.open(this.href,"_blank")}}};const H=o=>(P("data-v-b8759836"),o=o(),w(),o),U={className:"navbar navbar-expand navbar-dark bg-primary navbar-top hide-0-to-350"},W={class:"container-fluid"},j={className:"collapse navbar-collapse"},K=H(()=>i("ul",{className:"navbar-nav me-auto"},null,-1)),M={className:"navbar-nav my-2 my-lg-0"},J={className:"nav-item"},Q={className:"nav-item"},X={className:"nav-item"},Y={className:"nav-item"};function Z(o,r,n,c,t,e){const s=h("BreadCrumbs"),a=h("RouterLink");return u(),d("nav",U,[i("div",W,[p(s,{crumbs:t.crumbs},null,8,["crumbs"]),i("div",j,[K,i("ul",M,[i("li",J,[p(a,{to:"/"},{default:b(()=>[y("Fiddle")]),_:1})]),i("li",Q,[p(a,{to:"/about"},{default:b(()=>[y("About")]),_:1})]),i("li",X,[p(a,{to:"/docs"},{default:b(()=>[y("Docs")]),_:1})]),i("li",Y,[i("a",{className:"nav-link custom-nav-link",rel:"noreferrer",alt:"Fork me on GitHub",target:"_blank",onClick:r[0]||(r[0]=(...v)=>e.onLinkClick&&e.onLinkClick(...v)),href:"return false"}," Fork Me On Github ")])])])])])}const ee=g(G,[["render",Z],["__scopeId","data-v-b8759836"]]),te={name:"App",components:{TopNav:ee}};function oe(o,r,n,c,t,e){const s=h("TopNav"),a=h("RouterView");return u(),d(L,null,[p(s,{href:"https://github.com/bradyhouse/house/tree/master/fiddles/vue/fiddle-0000-TemplateTs"}),(u(),B(a,{key:o.$route.fullPath}))],64)}const se=g(te,[["render",oe],["__scopeId","data-v-938b9afd"]]),re="modulepreload",ne=function(o){return"/vue/fiddle-0000-TemplateTs/"+o},N={},f=function(r,n,c){if(!n||n.length===0)return r();const t=document.getElementsByTagName("link");return Promise.all(n.map(e=>{if(e=ne(e),e in N)return;N[e]=!0;const s=e.endsWith(".css"),a=s?'[rel="stylesheet"]':"";if(!!c)for(let _=t.length-1;_>=0;_--){const m=t[_];if(m.href===e&&(!s||m.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${e}"]${a}`))return;const l=document.createElement("link");if(l.rel=s?"stylesheet":re,s||(l.as="script",l.crossOrigin=""),l.href=e,document.head.appendChild(l),s)return new Promise((_,m)=>{l.addEventListener("load",_),l.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${e}`)))})})).then(()=>r()).catch(e=>{const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=e,window.dispatchEvent(s),!s.defaultPrevented)throw e})},ae="/vue/fiddle-0000-TemplateTs/",ie=R({history:x(ae),routes:[{path:"/",name:"fiddle",component:()=>f(()=>import("./FiddleView-c88c7f75.js"),["assets/FiddleView-c88c7f75.js","assets/@vue-20508c0d.js","assets/pinia-f0881e96.js","assets/vue-router-c28b90d7.js","assets/FiddleView-b3434618.css","assets/bootswatch-5839da7a.css"])},{path:"/docs",name:"docs",component:()=>f(()=>import("./HomeView-fc29c897.js"),["assets/HomeView-fc29c897.js","assets/@vue-20508c0d.js","assets/pinia-f0881e96.js","assets/vue-router-c28b90d7.js","assets/HomeView-e4f1c2fc.css","assets/bootswatch-5839da7a.css"])},{path:"/about",name:"about",component:()=>f(()=>import("./AboutView-c8b5218f.js"),["assets/AboutView-c8b5218f.js","assets/marked-fcaba525.js","assets/@vue-20508c0d.js","assets/pinia-f0881e96.js","assets/vue-router-c28b90d7.js","assets/AboutView-927f5dac.css","assets/bootswatch-5839da7a.css"])},{path:"/404",component:()=>f(()=>import("./404View-d3b74597.js"),["assets/404View-d3b74597.js","assets/@vue-20508c0d.js","assets/pinia-f0881e96.js","assets/vue-router-c28b90d7.js","assets/404View-73c2a70f.css","assets/bootswatch-5839da7a.css"])},{path:"/:catchAll(.*)",beforeEnter:ce,redirect:"/404"}]});function ce(o,r,n){r.fullPath==="/"||r.fullPath.includes("index.html")?n("/"):n()}const k=A(se);k.use(O());k.use(ie);k.mount("#app");export{g as _};