import{m as n}from"./marked-0c61a8a7.js";import{_ as r}from"./index-d5180f6b.js";import{o as a,c}from"./@vue-49a2282a.js";import"./pinia-95208572.js";import"./vue-router-b6acc7cf.js";/* empty css                   */const s={name:"AboutView",data(){return{content:"loading ..."}},mounted(){window.location.pathname.replace("/about",""),fetch("README.md").then(e=>e.text()).then(e=>this.bindText(e))},components:{},computed:{markdownToHtml(){return n.parse(this.content)}},methods:{bindText(t){console.log(t),this.content=t}}};const i=["innerHTML"];function m(t,e,d,_,p,o){return a(),c("div",{innerHTML:o.markdownToHtml},null,8,i)}const x=r(s,[["render",m],["__scopeId","data-v-04a2367c"]]);export{x as default};