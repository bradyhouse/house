import{l as r,r as l,i as p}from"./@vue-49a2282a.js";var u=!1;/*!
  * pinia v2.0.36
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */const f=Symbol();var i;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(i||(i={}));function _(){const t=r(!0),n=t.run(()=>l({}));let c=[],s=[];const a=p({install(e){a._a=e,e.provide(f,a),e.config.globalProperties.$pinia=a,s.forEach(o=>c.push(o)),s=[]},use(e){return!this._a&&!u?s.push(e):c.push(e),this},_p:c,_a:null,_e:t,_s:new Map,state:n});return a}export{_ as c};
