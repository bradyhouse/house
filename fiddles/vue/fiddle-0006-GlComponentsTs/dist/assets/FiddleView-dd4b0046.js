import{R as X}from"./vue-router-bc58095a.js";import{d as N,a as w,y as z,z as E,N as Y,O as ee,g as te,P as ne,A as r,F as oe,B as ie,n as V,L as F,H as G,Q as se,u as H,q as re,G as M,c as R,R as Z,b as ae}from"./@vue-2dbd05c2.js";import{V as le,L as de,I as W}from"./golden-layout-d7c3be82.js";import{d as ce}from"./pinia-3c14f515.js";import{d as ue}from"./dom-to-image-more-be15ce5f.js";import"./ag-grid-community-05da1561.js";import{A as me}from"./ag-grid-vue3-a6f539bd.js";import{i as j}from"./resize-observer-polyfill-0f9f8adb.js";import{_ as T}from"./index-90b8be14.js";import{s as pe}from"./vue3-plotly-0546d2f8.js";import"./vue-draggable-resizable-3bf4989e.js";/* empty css                   */import"./plotly.js-dist-b8c8e1c9.js";import"./uuid-4a60fe23.js";const he=N({__name:"GlComponent",props:{id:{type:Number,required:!0}},emits:["heightChange"],setup(e,{expose:t,emit:n}){const o=e,i=w(null),s=a=>a.toString(10)+"px";return t({setPosAndSize:(a,h,D,L)=>{if(i.value){const S=i.value;S.style.left=s(a),S.style.top=s(h),S.style.width=s(D),S.style.height=s(L),n("heightChange",S.style.height,o.id)}},setVisibility:a=>{if(i.value){const h=i.value;a?h.style.display="":h.style.display="none"}},setZIndex:a=>{if(i.value){const h=i.value;h.style.zIndex=a}},getContainerHeight:()=>i.value?i.value.style.height:"0px",getId:()=>o.id}),(a,h)=>(z(),E("div",{ref_key:"GlComponent",ref:i,style:{position:"absolute",overflow:"hidden"}},[Y(a.$slots,"default")],512))}}),fe={style:{position:"relative"}},ge={style:{position:"absolute",width:"100%",height:"100%"}},be=N({__name:"GoldenLayout",props:{config:{type:Object,default:()=>({})}},emits:["heightChange"],setup(e,{expose:t,emit:n}){const o=e,i=w(null);let s;const g=ee(w("glc_")),b=new Map,_=w(new Map),v=[];let c=0,a;const h=te(),D=h.slots,L=async(m,C)=>{const u=D[m];if(!u)throw new Error(`addComponent: Component '${m}' not found in slots`);let y=c;return v.length>0?y=v.pop():c++,_.value.set(y,()=>u(C)),y},S=async(m,C,u=void 0)=>{if(m.length==0)throw new Error("addGlComponent: Component's type is empty");const y=await L(m,u);await V(),s.addComponent(m,{refId:y,...u||{}},C)},A=async m=>{s.clear(),_.value.clear();const C=m.resolved?de.fromResolved(m):m;let u=[C.root.content],y=0;for(;u.length>0;){const P=u.shift();for(let x of P)x.type=="component"?(y=await L(x.componentType,x.componentState),typeof x.componentState=="object"?x.componentState.refId=y:x.componentState={refId:y}):x.content.length>0&&u.push(x.content)}await V(),s.loadLayout(C)},J=()=>s.saveLayout(),K=(m,C)=>{n("heightChange",m,C)};return ne(()=>{if(i.value==null)throw new Error("Golden Layout can't find the root DOM!");const m=()=>{const l=i.value;let d=l?l.offsetWidth:0,p=l?l.offsetHeight:0;s.setSize(d,p)};window.addEventListener("resize",m,{passive:!0});const C=l=>{a=i.value.getBoundingClientRect()},u=(l,d,p)=>{const f=b.get(l);if(!f||!(f!=null&&f.glc))throw new Error("handleContainerVirtualRectingRequiredEvent: Component not found");const k=l.element.getBoundingClientRect(),I=k.left-a.left,U=k.top-a.top;f.glc.setPosAndSize(I,U,d,p)},y=(l,d)=>{const p=b.get(l);if(!p||!(p!=null&&p.glc))throw new Error("handleContainerVirtualVisibilityChangeRequiredEvent: Component not found");p.glc.setVisibility(d)},P=(l,d,p)=>{const f=b.get(l);if(!f||!(f!=null&&f.glc))throw new Error("handleContainerVirtualZIndexChangeRequiredEvent: Component not found");f.glc.setZIndex(p)},x=(l,d)=>{let p=-1;if(d&&d.componentState)p=d.componentState.refId;else throw new Error("bindComponentEventListener: component's ref id is required");const f=g.value+p,k=h==null?void 0:h.refs[f];return b.set(l,{refId:p,glc:k[0]}),l.virtualRectingRequiredEvent=(I,U,$)=>u(I,U,$),l.virtualVisibilityChangeRequiredEvent=(I,U)=>y(I,U),l.virtualZIndexChangeRequiredEvent=(I,U,$)=>P(I,U,$),{component:k,virtual:!0}},Q=l=>{const d=b.get(l);if(!d||!(d!=null&&d.glc))throw new Error("handleUnbindComponentEvent: Component not found");b.delete(l),_.value.delete(d.refId),v.push(d.refId)};s=new le(i.value,x,Q),s.beforeVirtualRectingEvent=C,o.config&&A(o.config)}),t({addGlComponent:S,loadGLLayout:A,getLayoutConfig:J}),(m,C)=>(z(),E("div",fe,[r("div",{ref_key:"GLRoot",ref:i,style:{position:"absolute",width:"100%",height:"100%"}},null,512),r("div",ge,[(z(!0),E(oe,null,ie(_.value,u=>(z(),F(he,{key:u[0],id:u[0],ref_for:!0,ref:H(g)+u[0],onHeightChange:K},{default:G(()=>[(z(),F(se(u[1])))]),_:2},1032,["id"]))),128))])]))}}),Ce={root:{type:W.column,content:[{type:"component",title:"Top",header:{show:"top"},isClosable:!1,reorderEnabled:!1,componentType:"Content1",width:20,componentState:{main:!0,route:"/"}},{type:W.column,content:[{type:"component",title:"Component 2",header:{show:"top"},isClosable:!0,reorderEnabled:!0,componentType:"Content2",width:10,componentState:void 0}]}]}},ye={json:()=>({root:{type:"row",content:[{type:"column",content:[{type:"stack",content:[{type:"component",content:[],size:1,sizeUnit:"fr",minSizeUnit:"px",id:"",maximised:!1,isClosable:!0,reorderEnabled:!0,title:"Component 4",componentType:"Content3",componentState:{refId:1}}],size:25,sizeUnit:"%",minSizeUnit:"px",id:"",isClosable:!0,maximised:!1,activeItemIndex:0},{type:"stack",content:[{type:"component",content:[],size:1,sizeUnit:"fr",minSizeUnit:"px",id:"",maximised:!1,isClosable:!0,reorderEnabled:!0,title:"Component 3",componentType:"Content3",componentState:{refId:0}}],size:25,sizeUnit:"%",minSizeUnit:"px",id:"",isClosable:!0,maximised:!1,activeItemIndex:0},{type:"stack",content:[{type:"component",content:[],size:20,sizeUnit:"%",minSizeUnit:"px",id:"",maximised:!1,isClosable:!1,reorderEnabled:!1,title:"Top",header:{show:"top"},componentType:"Content1",componentState:{main:!0,route:"/",refId:2}}],size:50,sizeUnit:"%",minSizeUnit:"px",id:"",isClosable:!1,maximised:!1,activeItemIndex:0}],size:50,sizeUnit:"%",minSizeUnit:"px",id:"",isClosable:!0},{type:"column",content:[{type:"row",content:[{type:"stack",content:[{type:"component",content:[],size:1,sizeUnit:"fr",minSizeUnit:"px",id:"",maximised:!1,isClosable:!0,reorderEnabled:!0,title:"Component 6",componentType:"Content3",componentState:{refId:3}}],size:50,sizeUnit:"%",minSizeUnit:"px",id:"",isClosable:!0,maximised:!1,activeItemIndex:0},{type:"stack",content:[{type:"component",content:[],size:10,sizeUnit:"%",minSizeUnit:"px",id:"",maximised:!1,isClosable:!0,reorderEnabled:!0,title:"Component 2",header:{show:"top"},componentType:"Content2",componentState:{refId:4}}],size:50,sizeUnit:"%",minSizeUnit:"px",id:"",isClosable:!0,maximised:!1,activeItemIndex:0}],size:50,sizeUnit:"%",minSizeUnit:"px",id:"",isClosable:!0},{type:"row",content:[{type:"stack",content:[{type:"component",content:[],size:1,sizeUnit:"fr",minSizeUnit:"px",id:"",maximised:!1,isClosable:!0,reorderEnabled:!0,title:"Component 5",componentType:"Content3",componentState:{refId:5}}],size:50,sizeUnit:"%",minSizeUnit:"px",id:"",isClosable:!0,maximised:!1,activeItemIndex:0},{type:"stack",content:[{type:"component",content:[],size:1,sizeUnit:"fr",minSizeUnit:"px",id:"",maximised:!1,isClosable:!0,reorderEnabled:!0,title:"Component 7",componentType:"Content3",componentState:{refId:6}}],size:50,sizeUnit:"%",minSizeUnit:"px",id:"",isClosable:!0,maximised:!1,activeItemIndex:0}],size:50,sizeUnit:"%",minSizeUnit:"px",id:"",isClosable:!0}],size:50,sizeUnit:"%",minSizeUnit:"px",id:"",isClosable:!0}],size:1,sizeUnit:"fr",minSizeUnit:"px",id:"",isClosable:!0},openPopouts:[],settings:{constrainDragToContainer:!0,reorderEnabled:!0,popoutWholeStack:!1,blockedPopoutsThrowError:!0,closePopoutsOnUnload:!0,responsiveMode:"none",tabOverlapAllowance:0,reorderOnTabMenuClick:!0,tabControlOffset:10,popInOnClose:!1},dimensions:{borderWidth:5,borderGrabWidth:5,defaultMinItemHeight:0,defaultMinItemHeightUnit:"px",defaultMinItemWidth:10,defaultMinItemWidthUnit:"px",headerHeight:20,dragProxyWidth:300,dragProxyHeight:200},header:{show:"top",popout:"open in new window",dock:"dock",close:"close",maximise:"maximise",minimise:"minimise",tabDropdown:"additional tabs"},resolved:!0})},B={default:Ce,complex:ye},ve=ce("counter",()=>{const e=w(2),t=re(()=>e.value*2);function n(){e.value++}function o(){e.value>2&&e.value--}function i(){e.value=2}return{count:e,doubleCount:t,increment:n,decrement:o,zero:i}}),xe=e=>e.toString(10)+"px",_e={name:"GridComponent",components:{"ag-grid-vue":me},props:["gridHeight","id"],data:()=>({boxObserver:null,boxWidth:null,boxHeight:null,columnDefs:[{field:"athlete",minWidth:150,filter:"PersonFilter"},{field:"age",filter:"agNumberColumnFilter"},{field:"country",minWidth:150},{field:"year",filter:"agNumberColumnFilter"},{field:"date",minWidth:130,filter:"agDateColumnFilter",filterParams:{comparator:(e,t)=>{const o=t.split("/"),i=new Date(Number(o[2]),Number(o[1])-1,Number(o[0]));if(e.getTime()===i.getTime())return 0;if(i<e)return-1;if(i>e)return 1}}},{field:"sport"},{field:"gold",filter:"agNumberColumnFilter"},{field:"silver",filter:"agNumberColumnFilter"},{field:"bronze",filter:"agNumberColumnFilter"},{field:"total",filter:"agNumberColumnFilter"}],gridApi:null,columnApi:null,defaultColDef:{editable:!0,sortable:!0,flex:1,minWidth:100,filter:!0,resizable:!0},rowData:null}),computed:{cssVars(){return{"--card-height":this.boxHeight}}},setup(){return{GridContainer:w(null)}},mounted(){const t=this.$refs.GridContainer.getBoundingClientRect();this.boxWidth=t.width+"px",this.boxHeight=t.height+"px",this.initObserver();const n=new j((o,i)=>{for(const s of o){const{left:g,top:b,width:_,height:v}=s.contentRect;this.boxHeight=xe(v)}});V(()=>{if(this.GridContainer){const o=this.GridContainer;n.observe(o)}})},beforeDestroy(){this.boxObserver&&this.boxObserver.disconnect()},methods:{onGridReady(e){this.gridApi=e.api,this.columnApi=e.columnApi;const t=n=>{this.rowData=n};fetch("https://www.ag-grid.com/example-assets/olympic-winners.json").then(n=>n.json()).then(n=>t(n))},onRowDataChanged(){V(()=>{this.gridApi.sizeColumnsToFit()})},initObserver(){const e={attributes:!0},t=this,n=new MutationObserver(function(o){o.forEach(function(i){i.type==="attributes"&&t.onResize()})});n.observe(this.$refs.GridContainer,e),this.boxObserver=n},onResize(){const e=this.$refs.GridContainer;vm=this;let{width:t,height:n}=e.style;debugger;this.boxWidth=t,this.boxHeight=n,this.$emit("resize",{width:t,height:n})}}};const we={ref:"GridContainer",class:"scrollable"};function ze(e,t,n,o,i,s){const g=M("ag-grid-vue");return z(),E("div",we,[r("div",{id:"base-card",style:Z(s.cssVars)},[R(g,{style:{width:"100%",height:"100%"},class:"ag-theme-alpine",columnDefs:e.columnDefs,onGridReady:s.onGridReady,defaultColDef:e.defaultColDef,rowData:e.rowData},null,8,["columnDefs","onGridReady","defaultColDef","rowData"])],4)],512)}const Se=T(_e,[["render",ze],["__scopeId","data-v-a2025ee3"]]),Ie=e=>e.toString(10)+"px",O=e=>{const t=new Array(e);for(let n=0;n<e;n++)t[n]=Math.random()*50;return t},Ue={type:"scatter",mode:"markers",x:O(100),y:O(100),z:O(100),opacity:.7,marker:{size:O(100)},showlegend:!1},Re={name:"ChartComponent",components:{VuePlotly:pe},data:()=>({traces:1,boxObserver:null,boxWidth:null,boxHeight:null,chartConfig:{data:[Ue],layout:{modeBarButtons:[["resetCameraDefault3d","hoverClosest3d"]]}}}),computed:{cssVars(){return{"--card-height":this.boxHeight}}},setup(){const e=w(null),t=w(null);return{ChartContainer:e,PlotlyAnchor:t}},mounted(){const t=this.$refs.ChartContainer.getBoundingClientRect();this.boxWidth=t.width+"px",this.boxHeight=t.height+"px",this.initObserver();const n=new j((o,i)=>{for(const s of o){const{left:g,top:b,width:_,height:v}=s.contentRect;this.boxHeight=Ie(v)}});V(()=>{if(this.ChartContainer){const o=this.ChartContainer;n.observe(o)}})},beforeDestroy(){this.boxObserver&&this.boxObserver.disconnect()},methods:{initObserver(){const e={attributes:!0},t=this,n=new MutationObserver(function(o){o.forEach(function(i){i.type==="attributes"&&t.onResize()})});n.observe(this.$refs.ChartContainer,e),this.boxObserver=n},onResize(){const e=this.$refs.GridContainer;vm=this;let{width:t,height:n}=e.style;debugger;this.boxWidth=t,this.boxHeight=n,this.$emit("resize",{width:t,height:n})},onPlotlyChartClick(e){console.log(e)}}};const Ee={ref:"ChartContainer",class:"scrollable"};function ke(e,t,n,o,i,s){const g=M("VuePlotly");return z(),E("div",Ee,[r("div",{id:"base-card",style:Z(s.cssVars)},[R(g,{ref:"PlotlyAnchor",data:e.chartConfig.data,"plotly-click":s.onPlotlyChartClick,layout:e.chartConfig.layout,"display-mode-bar":!1,style:{width:"100%",height:"100%"}},null,8,["data","plotly-click","layout"])],4)],512)}const q=T(Re,[["render",ke],["__scopeId","data-v-fdabdc80"]]),Ge={ref:"FiddleView",id:"FiddleView",class:"full-height"},Ve={class:"card text-white bg-warning mb-3",style:{height:"calc(100%)"}},Le={class:"card-body",style:{overflow:"hidden !important"}},Oe={class:"card text-white bg-success mb-3",style:{height:"calc(100%)"}},De={class:"card-body",style:{overflow:"hidden !important"}},Pe={class:"card text-white bg-success mb-3",style:{height:"calc(100%)"}},$e={class:"card-body",style:{overflow:"hidden !important"}},He=N({__name:"FiddleView",setup(e){const t=ve(),n=ae({gridHeight:"200px"}),o=w(null),i=(c,a)=>{n.gridHeight=c},s=()=>{o.value&&(t.zero(),o.value.loadGLLayout(B.default))},g=()=>{if(!o.value)return;t.increment();const c="Component "+String(t.count);o.value.addGlComponent("Content3",c)},b=()=>{if(!o.value)return;const c=o.value.getLayoutConfig();console.log(JSON.stringify(c)),localStorage.setItem("gl_config",JSON.stringify(c))},_=()=>{const c=localStorage.getItem("gl_config");if(!c||!o.value)return;const a=JSON.parse(c);o.value.loadGLLayout(a)},v=()=>{const c=document.getElementById("FiddleView");ue.toPng(c).then(a=>{window.open("","_blank").document.write(`
                <html>
                    <head>
                        <title>Screenshot</title>
                    </head>
                    <body style="background: black;">
                    <img src="`+a+`" alt="Example" width="80%">
                    </body>
                </html>
            `)})};return(c,a)=>(z(),E("div",Ge,[r("div",{id:"nav",className:"navbar navbar-expand bg-warning navbar-top hide-0-to-350"},[r("div",{class:"container-fluid"},[r("ul",{className:"navbar-nav me-auto"},[r("li",{className:"nav-item"},[r("button",{class:"btn btn-primary",onClick:s},"Reset")]),r("li",{className:"nav-item"},[r("button",{class:"btn btn-info",onClick:g}," Add ")]),r("li",{className:"nav-item"},[r("button",{class:"btn btn-danger",onClick:b},"Save")]),r("li",{className:"nav-item"},[r("button",{class:"btn btn-success",onClick:_},"Load")]),r("li",{className:"nav-item"},[r("button",{class:"btn btn-primary",onClick:v},"Screenshot")])])])]),R(be,{ref_key:"GLayoutRoot",ref:o,config:H(B).default,onHeightChange:i,style:{width:"100%",height:"90%"}},{Content1:G(()=>[r("div",Ve,[r("div",Le,[R(Se)])])]),Content2:G(()=>[r("div",Oe,[r("div",De,[R(q)])])]),Content3:G(()=>[r("div",Pe,[r("div",$e,[R(q)])])]),route:G(()=>[R(H(X))]),_:1},8,["config"])],512))}});const Ye=T(He,[["__scopeId","data-v-98611fd9"]]);export{Ye as default};