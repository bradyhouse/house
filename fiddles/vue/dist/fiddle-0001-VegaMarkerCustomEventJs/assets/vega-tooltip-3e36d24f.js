import{w as g,G as y,C as d}from"./vega-util-7f144c9d.js";function s(t){"@babel/helpers - typeof";return s=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s(t)}function O(t,e){if(s(t)!=="object"||t===null)return t;var n=t[Symbol.toPrimitive];if(n!==void 0){var i=n.call(t,e||"default");if(s(i)!=="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function x(t){var e=O(t,"string");return s(e)==="symbol"?e:String(e)}function w(t,e,n){return e=x(e),e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function v(t,e){if(t==null)return{};var n={},i=Object.keys(t),r,o;for(o=0;o<i.length;o++)r=i[o],!(e.indexOf(r)>=0)&&(n[r]=t[r]);return n}function S(t,e){if(t==null)return{};var n=v(t,e),i,r;if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(r=0;r<o.length;r++)i=o[r],!(e.indexOf(i)>=0)&&Object.prototype.propertyIsEnumerable.call(t,i)&&(n[i]=t[i])}return n}const P=["title","image"];function j(t,e,n){if(g(t))return`[${t.map(i=>e(y(i)?i:h(i,n))).join(", ")}]`;if(d(t)){let i="";const r=t,{title:o,image:f}=r,c=S(r,P);o&&(i+=`<h2>${e(o)}</h2>`),f&&(i+=`<img src="${e(f)}">`);const p=Object.keys(c);if(p.length>0){i+="<table>";for(const a of p){let l=c[a];l!==void 0&&(d(l)&&(l=h(l,n)),i+=`<tr><td class="key">${e(a)}:</td><td class="value">${e(l)}</td></tr>`)}i+="</table>"}return i||"{}"}return e(t)}function k(t){const e=[];return function(n,i){if(typeof i!="object"||i===null)return i;const r=e.indexOf(this)+1;return e.length=r,e.length>t?"[Object]":e.indexOf(i)>=0?"[Circular]":(e.push(i),i)}}function h(t,e){return JSON.stringify(t,k(e))}var E=`#vg-tooltip-element {
  visibility: hidden;
  padding: 8px;
  position: fixed;
  z-index: 1000;
  font-family: sans-serif;
  font-size: 11px;
  border-radius: 3px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  /* The default theme is the light theme. */
  background-color: rgba(255, 255, 255, 0.95);
  border: 1px solid #d9d9d9;
  color: black;
}
#vg-tooltip-element.visible {
  visibility: visible;
}
#vg-tooltip-element h2 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 13px;
}
#vg-tooltip-element table {
  border-spacing: 0;
}
#vg-tooltip-element table tr {
  border: none;
}
#vg-tooltip-element table tr td {
  overflow: hidden;
  text-overflow: ellipsis;
  padding-top: 2px;
  padding-bottom: 2px;
}
#vg-tooltip-element table tr td.key {
  color: #808080;
  max-width: 150px;
  text-align: right;
  padding-right: 4px;
}
#vg-tooltip-element table tr td.value {
  display: block;
  max-width: 300px;
  max-height: 7em;
  text-align: left;
}
#vg-tooltip-element.dark-theme {
  background-color: rgba(32, 32, 32, 0.9);
  border: 1px solid #f5f5f5;
  color: white;
}
#vg-tooltip-element.dark-theme td.key {
  color: #bfbfbf;
}
`;const b="vg-tooltip-element",D={offsetX:10,offsetY:10,id:b,styleId:"vega-tooltip-style",theme:"light",disableDefaultStyle:!1,sanitize:I,maxDepth:2,formatTooltip:j};function I(t){return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;")}function _(t){if(!/^[A-Za-z]+[-:.\w]*$/.test(t))throw new Error("Invalid HTML ID");return E.toString().replace(b,t)}function L(t,e,n,i){let r=t.clientX+n;r+e.width>window.innerWidth&&(r=+t.clientX-n-e.width);let o=t.clientY+i;return o+e.height>window.innerHeight&&(o=+t.clientY-i-e.height),{x:r,y:o}}function u(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),n.push.apply(n,i)}return n}function m(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?u(Object(n),!0).forEach(function(i){w(t,i,n[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach(function(i){Object.defineProperty(t,i,Object.getOwnPropertyDescriptor(n,i))})}return t}class C{constructor(e){this.options=m(m({},D),e);const n=this.options.id;if(this.el=null,this.call=this.tooltipHandler.bind(this),!this.options.disableDefaultStyle&&!document.getElementById(this.options.styleId)){const i=document.createElement("style");i.setAttribute("id",this.options.styleId),i.innerHTML=_(n);const r=document.head;r.childNodes.length>0?r.insertBefore(i,r.childNodes[0]):r.appendChild(i)}}tooltipHandler(e,n,i,r){if(this.el=document.getElementById(this.options.id),this.el||(this.el=document.createElement("div"),this.el.setAttribute("id",this.options.id),this.el.classList.add("vg-tooltip"),(document.fullscreenElement??document.body).appendChild(this.el)),r==null||r===""){this.el.classList.remove("visible",`${this.options.theme}-theme`);return}this.el.innerHTML=this.options.formatTooltip(r,this.options.sanitize,this.options.maxDepth),this.el.classList.add("visible",`${this.options.theme}-theme`);const{x:o,y:f}=L(n,this.el.getBoundingClientRect(),this.options.offsetX,this.options.offsetY);this.el.style.top=`${f}px`,this.el.style.left=`${o}px`}}export{C as H};
