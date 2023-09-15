import{T as s}from"./vega-dataflow-7e3fa937.js";import{u as m}from"./vega-util-7f144c9d.js";import{D as y}from"./d3-delaunay-a951443a.js";function i(e){s.call(this,null,e)}i.Definition={type:"Voronoi",metadata:{modifies:!0},params:[{name:"x",type:"field",required:!0},{name:"y",type:"field",required:!0},{name:"size",type:"number",array:!0,length:2},{name:"extent",type:"array",array:!0,length:2,default:[[-1e5,-1e5],[1e5,1e5]],content:{type:"number",array:!0,length:2}},{name:"as",type:"string",default:"path"}]};const c=[-1e5,-1e5,1e5,1e5];m(i,s,{transform(e,r){const n=e.as||"path",t=r.source;if(!t||!t.length)return r;let o=e.size;o=o?[0,0,o[0],o[1]]:(o=e.extent)?[o[0][0],o[0][1],o[1][0],o[1][1]]:c;const u=this.value=y.from(t,e.x,e.y).voronoi(o);for(let a=0,f=t.length;a<f;++a){const l=u.cellPolygon(a);t[a][n]=l?d(l):null}return r.reflow(e.modified()).modifies(n)}});function d(e){const r=e[0][0],n=e[0][1];let t=e.length-1;for(;e[t][0]===r&&e[t][1]===n;--t);return"M"+e.slice(0,t+1).join("L")+"Z"}const v=Object.freeze(Object.defineProperty({__proto__:null,voronoi:i},Symbol.toStringTag,{value:"Module"}));export{v};