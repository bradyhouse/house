import{e as r,r as l,m as p}from"./@vue-d88967be.js";var u=!1;/*!
 * pinia v2.1.6
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */const f=Symbol();var n;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(n||(n={}));function m(){const t=r(!0),i=t.run(()=>l({}));let c=[],s=[];const a=p({install(e){a._a=e,e.provide(f,a),e.config.globalProperties.$pinia=a,s.forEach(o=>c.push(o)),s=[]},use(e){return!this._a&&!u?s.push(e):c.push(e),this},_p:c,_a:null,_e:t,_s:new Map,state:i});return a}export{m as c};
