import{m as n}from"./marked-bFW9FanU.js";import{_ as r}from"./index-t-TeUpeO.js";import{k as a,j as c}from"./@vue-DmS-pc64.js";import"./vue-router-mtoXMsig.js";/* empty css                   */const m={name:"AboutView",data(){return{content:"loading ..."}},mounted(){window.location.pathname.replace("/about",""),fetch("README.md").then(e=>e.text()).then(e=>this.bindText(e))},components:{},computed:{markdownToHtml(){return n.parse(this.content)}},methods:{bindText(t){console.log(t),this.content=t}}},s=["innerHTML"];function d(t,e,i,p,l,o){return c(),a("div",{innerHTML:o.markdownToHtml},null,8,s)}const w=r(m,[["render",d],["__scopeId","data-v-9dc45e38"]]);export{w as default};