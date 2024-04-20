import{b as s,d as c,F as b,e as _,o as r,n as f,t as g,f as h}from"./vue.esm-bundler-elrXQCQQ.js";import{_ as y}from"./_plugin-vue_export-helper-DlAUqK2U.js";const l={name:"BreadCrumbs",props:{crumbs:{type:Array,required:!0}},methods:{isLast(e){return e===this.crumbs.length-1},selected(e){e.url&&window.open(e.url,"_blank")}}},C={class:"hide-0-to-750"},B={className:"navbar-nav me-auto"},v=["onClick"],k={key:0,class:"btn btn-primary disabled"};function x(e,D,p,L,w,a){return r(),s("nav",C,[c("ul",B,[(r(!0),s(b,null,_(p.crumbs,(o,n)=>(r(),s("li",{key:n,class:"nav-item"},[c("button",{type:"button",class:f(["btn btn-primary",{disabled:a.isLast(n)}]),onClick:F=>a.selected(o)},g(o.title),11,v),a.isLast(n)?h("",!0):(r(),s("button",k," \\ "))]))),128))])])}const i=y(l,[["render",x],["__scopeId","data-v-9d62a9fa"]]);l.__docgenInfo={displayName:"BreadCrumbs",exportName:"default",description:"",tags:{},props:[{name:"crumbs",type:{name:"array"},required:!0}],sourceFiles:["/Users/bradyhouseknecht/git/house/fiddles/vue/fiddle-0013-GoJsDragZoomHwJs/src/components/BreadCrumbs.vue"]};const E={title:"components/BreadCrumbs",component:i,tags:["autodocs"],argTypes:{crumbs:{control:"array"}}},N=e=>({components:{BreadCrumbs:i},setup(){return{args:e}},template:'<BreadCrumbs v-bind="args" />'}),t=N.bind({});t.args={crumbs:[{title:"Home",url:"https://example.com/home"},{title:"About",url:"https://example.com/about"},{title:"Contact",url:""}]};var u,m,d;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`args => ({
  components: {
    BreadCrumbs
  },
  setup() {
    return {
      args
    };
  },
  template: '<BreadCrumbs v-bind="args" />'
})`,...(d=(m=t.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};const H=["Default"];export{t as Default,H as __namedExportsOrder,E as default};
