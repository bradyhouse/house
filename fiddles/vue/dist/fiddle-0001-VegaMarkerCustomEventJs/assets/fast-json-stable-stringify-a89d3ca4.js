import{g}from"./clone-450cff4c.js";var S=function(s,f){f||(f={}),typeof f=="function"&&(f={cmp:f});var v=typeof f.cycles=="boolean"?f.cycles:!1,a=f.cmp&&function(n){return function(r){return function(t,i){var c={key:t,value:r[t]},u={key:i,value:r[i]};return n(c,u)}}}(f.cmp),e=[];return function n(r){if(r&&r.toJSON&&typeof r.toJSON=="function"&&(r=r.toJSON()),r!==void 0){if(typeof r=="number")return isFinite(r)?""+r:"null";if(typeof r!="object")return JSON.stringify(r);var t,i;if(Array.isArray(r)){for(i="[",t=0;t<r.length;t++)t&&(i+=","),i+=n(r[t])||"null";return i+"]"}if(r===null)return"null";if(e.indexOf(r)!==-1){if(v)return JSON.stringify("__cycle__");throw new TypeError("Converting circular structure to JSON")}var c=e.push(r)-1,u=Object.keys(r).sort(a&&a(r));for(i="",t=0;t<u.length;t++){var l=u[t],y=n(r[l]);y&&(i&&(i+=","),i+=JSON.stringify(l)+":"+y)}return e.splice(c,1),"{"+i+"}"}}(s)};const b=g(S);export{b as s};