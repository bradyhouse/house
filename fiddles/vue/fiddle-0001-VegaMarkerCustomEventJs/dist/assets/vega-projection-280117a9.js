import{I as c}from"./vega-scale-1e252b35.js";import{d as n,e as l,f as u,h as g,i as h,j as f,k as p,l as m,m as d,n as q,o as E,q as j,r as A,s as b,t as P,u as w,v as C}from"./d3-geo-55025d8a.js";import{g as z}from"./d3-geo-projection-e07100d1.js";const v=n(),M=["clipAngle","clipExtent","scale","translate","center","rotate","parallels","precision","reflectX","reflectY","coefficient","distance","fraction","lobes","parallel","radius","ratio","spacing","tilt"];function k(a,o){return function s(){const e=o();return e.type=a,e.path=n().projection(e),e.copy=e.copy||function(){const r=s();return M.forEach(i=>{e[i]&&r[i](e[i]())}),r.path.pointRadius(e.path.pointRadius()),r},c(e)}}function x(a,o){if(!a||typeof a!="string")throw new Error("Projection type must be a name string.");return a=a.toLowerCase(),arguments.length>1?(t[a]=k(a,o),this):t[a]||null}function S(a){return a&&a.path||v}const t={albers:l,albersusa:u,azimuthalequalarea:g,azimuthalequidistant:h,conicconformal:f,conicequalarea:p,conicequidistant:m,equalEarth:d,equirectangular:q,gnomonic:E,identity:j,mercator:A,mollweide:z,naturalEarth1:b,orthographic:P,stereographic:w,transversemercator:C};for(const a in t)x(a,t[a]);export{M as a,S as g,x as p};