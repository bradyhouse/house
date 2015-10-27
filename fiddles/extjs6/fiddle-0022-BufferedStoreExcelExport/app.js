var meta = {
    fiddleHeader: 'Grid Excel Exporter',
    fiddleSubHeader: '<i>Fiddle exploring the Ext.grid.plugin.Exporter class.</i></br>',
    recordsUrl: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/data.json'
    },
    fiddleStore = null;

function getGridColumnState(grid) {
    var localStorage = Ext.state.Manager.getProvider(),
        state = localStorage.get(grid.getStateId(), []);
    return state && state.columns ? state.columns : null;
}

function onGridSaveState(grid) {
    var me = grid,
        state = {},
        storeState = me.store.getState(),
        localStorage = Ext.state.Manager.getProvider();

    state = me.addPropertyToState(state, 'columns', me.headerCt.getColumnsState());

    if (storeState) {
        state.storeState = storeState;
    }
    localStorage.set(me.getStateId(), state);
}

function onGridApplyState(grid) {
    var me = grid,
        localStorage = Ext.state.Manager.getProvider(),
        state = localStorage.get(me.getStateId(), []),
        sorter = !Ext.isEmpty(state) ? state.sort : null,
        storeState = !Ext.isEmpty(state) ? state.storeState : null,
        store = !Ext.isEmpty(state) ? me.store : null,
        columns = !Ext.isEmpty(state) ? state.columns : null;

    if (!Ext.isEmpty(state)) {
        store.loadRecords([], {addRecords: false});
        delete state.columns;
        if (columns) {
            me.headerCt.applyColumnsState(columns);
        }
        if (sorter) {
            if (store.remoteSort) {
                store.sort({
                    property: sorter.property,
                    direction: sorter.direction,
                    root: sorter.root
                }, null, false);
            } else {
                store.sort(sorter.property, sorter.direction);
            }
        }
        else if (storeState) {
            store.applyState(storeState);
        }
        store.load();
    }
}



Ext.define("Ext.exporter.file.Base",{requires:["Ext.XTemplate","Ext.util.Collection"],config:{id:""},tpl:null,constructor:function(a){var b=this;b.initConfig(a||{});return b.callParent(arguments)},applyId:function(a,b){if(Ext.isEmpty(b)){b=Ext.id()}if(!Ext.isEmpty(a)){b=a}return b},checkCollection:function(c,a,b){if(!a){a=this.constructCollection(b)}if(c){a.add(c)}return a},constructCollection:function(a){return new Ext.util.Collection({decoder:this.getCollectionDecoder(a)})},getCollectionDecoder:function(a){return function(b){return Ext.create(a,b||{})}},render:function(){return this.tpl?Ext.XTemplate.getTpl(this,"tpl").apply(this.getRenderData()):""},getRenderData:function(){return this.getConfig()}});
Ext.define("Ext.exporter.file.excel.Worksheet",{extend:"Ext.exporter.file.Base",config:{name:"Sheet",protection:null,rightToLeft:null,showGridLines:true,tables:[]},tpl:['   <Worksheet ss:Name="{name:htmlEncode}"','<tpl if="this.exists(protection)"> ss:Protected="{protection:this.toNumber}"</tpl>','<tpl if="this.exists(rightToLeft)"> ss:RightToLeft="{rightToLeft:this.toNumber}"</tpl>',">\n",'<tpl for="tables">{[values.render()]}</tpl>','       <WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">\n',"          <PageSetup>\n",'              <Layout x:CenterHorizontal="1" x:Orientation="Portrait" />\n','              <Header x:Margin="0.3" />\n','              <Footer x:Margin="0.3" x:Data="Page &amp;P of &amp;N" />\n','              <PageMargins x:Bottom="0.75" x:Left="0.7" x:Right="0.7" x:Top="0.75" />\n',"          </PageSetup>\n","          <FitToPage />\n","          <Print>\n","              <PrintErrors>Blank</PrintErrors>\n","              <FitWidth>1</FitWidth>\n","              <FitHeight>32767</FitHeight>\n","              <ValidPrinterInfo />\n","              <VerticalResolution>600</VerticalResolution>\n","          </Print>\n","          <Selected />\n",'<tpl if="!showGridLines">',"          <DoNotDisplayGridlines />\n","</tpl>","          <ProtectObjects>False</ProtectObjects>\n","          <ProtectScenarios>False</ProtectScenarios>\n","      </WorksheetOptions>\n","   </Worksheet>\n",{exists:function(a){return !Ext.isEmpty(a)},toNumber:function(a){return Number(Boolean(a))}}],destroy:function(){this.getTables().destroy();return this.callParent(arguments)},applyTables:function(b,a){return this.checkCollection(b,a,"Ext.exporter.file.excel.Table")},addTable:function(a){return this.getTables().add(a||{})},getTable:function(a){return this.getTables().get(a)},applyName:function(a){return Ext.String.ellipsis(String(a),31)},getRenderData:function(){return Ext.apply(this.callParent(arguments),{tables:this.getTables().getRange()})}});
Ext.define("Ext.exporter.file.excel.Table",{extend:"Ext.exporter.file.Base",config:{expandedColumnCount:null,expandedRowCount:null,fullColumns:1,fullRows:1,defaultColumnWidth:48,defaultRowHeight:12.75,styleId:null,leftCell:1,topCell:1,columns:[],rows:[]},tpl:['       <Table x:FullColumns="{fullColumns}" x:FullRows="{fullRows}"','<tpl if="this.exists(expandedRowCount)"> ss:ExpandedRowCount="{expandedRowCount}"</tpl>','<tpl if="this.exists(expandedColumnCount)"> ss:ExpandedColumnCount="{expandedColumnCount}"</tpl>','<tpl if="this.exists(defaultRowHeight)"> ss:DefaultRowHeight="{defaultRowHeight}"</tpl>','<tpl if="this.exists(defaultColumnWidth)"> ss:DefaultColumnWidth="{defaultColumnWidth}"</tpl>','<tpl if="this.exists(leftCell)"> ss:LeftCell="{leftCell}"</tpl>','<tpl if="this.exists(topCell)"> ss:TopCell="{topCell}"</tpl>','<tpl if="this.exists(styleId)"> ss:StyleID="{styleId}"</tpl>',">\n",'<tpl for="columns">{[values.render()]}</tpl>','<tpl if="this.exists(rows)">','<tpl for="rows">{[values.render()]}</tpl>','<tpl else>         <Row ss:AutoFitHeight="0"/>\n</tpl>',"       </Table>\n",{exists:function(a){return !Ext.isEmpty(a)}}],destroy:function(){this.getColumns().destroy();this.getRows().destroy();return this.callParent(arguments)},applyColumns:function(b,a){return this.checkCollection(b,a,"Ext.exporter.file.excel.Column")},applyRows:function(b,a){return this.checkCollection(b,a,"Ext.exporter.file.excel.Row")},addColumn:function(a){return this.getColumns().add(a||{})},getColumn:function(a){return this.getColumns().get(a)},addRow:function(a){return this.getRows().add(a||{})},getRow:function(a){return this.getRows().get(a)},getRenderData:function(){return Ext.apply(this.callParent(arguments),{columns:this.getColumns().getRange(),rows:this.getRows().getRange()})}});
Ext.define("Ext.exporter.file.excel.Style",{extend:"Ext.exporter.file.Base",config:{parentId:null,name:null,protection:null,alignment:null,font:null,interior:null,format:null,borders:null},statics:{checks:{alignment:{Horizontal:["Automatic","Left","Center","Right","Fill","Justify","CenterAcrossSelection","Distributed","JustifyDistributed"],Indent:null,ReadingOrder:["LeftToRight","RightToLeft","Context"],Rotate:null,ShrinkToFit:[true,false],Vertical:["Automatic","Top","Bottom","Center","Justify","Distributed","JustifyDistributed"],VerticalText:[true,false],WrapText:[true,false]},font:{Bold:[true,false],CharSet:null,Color:null,FontName:null,Family:["Automatic","Decorative","Modern","Roman","Script","Swiss"],Italic:[true,false],Outline:[true,false],Shadow:[true,false],Size:null,StrikeThrough:[true,false],Underline:["None","Single","Double","SingleAccounting","DoubleAccounting"],VerticalAlign:["None","Subscript","Superscript"]},border:{Position:["Left","Top","Right","Bottom","DiagonalLeft","DiagonalRight"],Color:null,LineStyle:["None","Continuous","Dash","Dot","DashDot","DashDotDot","SlantDashDot","Double"],Weight:[0,1,2,3]},interior:{Color:null,Pattern:["None","Solid","Gray75","Gray50","Gray25","Gray125","Gray0625","HorzStripe","VertStripe","ReverseDiagStripe","DiagStripe","DiagCross","ThickDiagCross","ThinHorzStripe","ThinVertStripe","ThinReverseDiagStripe","ThinDiagStripe","ThinHorzCross","ThinDiagCross"],PatternColor:null},protection:{Protected:[true,false],HideFormula:[true,false]}}},tpl:['       <Style ss:ID="{id}"','<tpl if="this.exists(parentId)"> ss:Parent="{parentId}"</tpl>','<tpl if="this.exists(name)"> ss:Name="{name}"</tpl>',">\n",'<tpl if="this.exists(alignment)">           <Alignment{[this.getAttributes(values.alignment, "alignment")]}/>\n</tpl>','<tpl if="this.exists(borders)">',"           <Borders>\n",'<tpl for="borders">               <Border{[this.getAttributes(values, "border")]}/>\n</tpl>',"           </Borders>\n","</tpl>",'<tpl if="this.exists(font)">           <Font{[this.getAttributes(values.font, "font")]}/>\n</tpl>','<tpl if="this.exists(interior)">           <Interior{[this.getAttributes(values.interior, "interior")]}/>\n</tpl>','<tpl if="this.exists(format)">           <NumberFormat ss:Format="{format}"/>\n</tpl>','<tpl if="this.exists(protection)">           <Protection{[this.getAttributes(values.protection, "protection")]}/>\n</tpl>',"       </Style>\n",{exists:function(a){return !Ext.isEmpty(a)},getAttributes:function(b,e){var h=' ss:{0}="{1}"',a=this.owner.self.checks,j=Ext.Object.getKeys(b||{}),f=j.length,k="",c,d,g;if(a[e]){for(c=0;c<f;c++){g=j[c];d=a[e][g];if(Ext.isEmpty(d)||Ext.Array.indexOf(d,b[g])>=0){k+=Ext.String.format(h,g,Ext.isBoolean(b[g])?Number(b[g]):b[g])}else{Ext.raise(Ext.String.format("Invalid key (%0) or value (%1) provided for Style!",g,b[g]))}}}return k}}]});
Ext.define("Ext.exporter.file.excel.Row",{extend:"Ext.exporter.file.Base",config:{autoFitHeight:false,caption:null,cells:[],height:null,index:null,span:null,styleId:null},tpl:["           <Row",'<tpl if="this.exists(index)"> ss:Index="{index}"</tpl>','<tpl if="this.exists(caption)"> c:Caption="{caption}"</tpl>','<tpl if="this.exists(autoFitHeight)"> ss:AutoFitHeight="{autoFitHeight:this.toNumber}"</tpl>','<tpl if="this.exists(span)"> ss:Span="{span}"</tpl>','<tpl if="this.exists(height)"> ss:Height="{height}"</tpl>','<tpl if="this.exists(styleId)"> ss:StyleID="{styleId}"</tpl>',">\n",'<tpl for="cells">{[values.render()]}</tpl>',"           </Row>\n",{exists:function(a){return !Ext.isEmpty(a)},toNumber:function(a){return Number(Boolean(a))}}],destroy:function(){this.getCells().destroy();return this.callParent(arguments)},applyCells:function(b,a){return this.checkCollection(b,a,"Ext.exporter.file.excel.Cell")},addCell:function(a){return this.getCells().add(a||{})},getCell:function(a){return this.getCells().get(a)},getRenderData:function(){return Ext.apply(this.callParent(arguments),{cells:this.getCells().getRange()})}});
Ext.define("Ext.exporter.file.excel.Column",{extend:"Ext.exporter.file.Base",config:{autoFitWidth:false,caption:null,hidden:null,index:null,span:null,styleId:null,width:null},tpl:["<Column",'<tpl if="this.exists(index)"> ss:Index="{index}"</tpl>','<tpl if="this.exists(caption)"> c:Caption="{caption}"</tpl>','<tpl if="this.exists(styleId)"> ss:StyleID="{styleId}"</tpl>','<tpl if="this.exists(hidden)"> ss:Hidden="{hidden}"</tpl>','<tpl if="this.exists(span)"> ss:Span="{span}"</tpl>','<tpl if="this.exists(width)"> ss:Width="{width}"</tpl>','<tpl if="this.exists(autoFitWidth)"> ss:AutoFitWidth="{autoFitWidth:this.toNumber}"</tpl>',"/>\n",{exists:function(a){return !Ext.isEmpty(a)},toNumber:function(a){return Number(Boolean(a))}}]});
Ext.define("Ext.exporter.file.excel.Cell",{extend:"Ext.exporter.file.Base",config:{dataType:"String",formula:null,index:null,styleId:null,mergeAcross:null,mergeDown:null,value:""},tpl:["               <Cell",'<tpl if="this.exists(index)"> ss:Index="{index}"</tpl>','<tpl if="this.exists(styleId)"> ss:StyleID="{styleId}"</tpl>','<tpl if="this.exists(mergeAcross)"> ss:MergeAcross="{mergeAcross}"</tpl>','<tpl if="this.exists(mergeDown)"> ss:MergeDown="{mergeDown}"</tpl>','<tpl if="this.exists(formula)"> ss:Formula="{formula}"</tpl>',">\n",'                   <Data ss:Type="{dataType}">{[this.formatValue(values.value)]}</Data>\n',"               </Cell>\n",{exists:function(a){return !Ext.isEmpty(a)},formatValue:function(a){var b=Ext.util.Format;return(a instanceof Date?Ext.Date.format(a,"Y-m-d\\TH:i:s.u"):b.htmlEncode(b.htmlDecode(a)))}}],render:function(){var b=this,a=b.getValue();if(a instanceof Date){b.setDataType("DateTime")}else{if(Ext.isNumeric(a)){b.setDataType("Number")}else{b.setDataType("String")}}return b.callParent(arguments)}});
Ext.define("Ext.exporter.file.excel.Workbook",{extend:"Ext.exporter.file.Base",requires:["Ext.exporter.file.excel.Worksheet","Ext.exporter.file.excel.Table","Ext.exporter.file.excel.Style","Ext.exporter.file.excel.Row","Ext.exporter.file.excel.Column","Ext.exporter.file.excel.Cell"],config:{title:"Workbook",author:"Sencha",windowHeight:9000,windowWidth:50000,protectStructure:false,protectWindows:false,styles:[],worksheets:[]},tpl:['<?xml version="1.0" encoding="utf-8"?>\n','<?mso-application progid="Excel.Sheet"?>\n',"<Workbook ",'xmlns="urn:schemas-microsoft-com:office:spreadsheet" ','xmlns:o="urn:schemas-microsoft-com:office:office" ','xmlns:x="urn:schemas-microsoft-com:office:excel" ','xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" ','xmlns:html="http://www.w3.org/TR/REC-html40">\n','   <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">\n',"       <Title>{title:htmlEncode}</Title>\n","       <Author>{author:htmlEncode}</Author>\n","       <Created>{createdAt}</Created>\n","   </DocumentProperties>\n",'   <ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel">\n',"       <WindowHeight>{windowHeight}</WindowHeight>\n","       <WindowWidth>{windowWidth}</WindowWidth>\n","       <ProtectStructure>{protectStructure}</ProtectStructure>\n","       <ProtectWindows>{protectWindows}</ProtectWindows>\n","   </ExcelWorkbook>\n","   <Styles>\n",'<tpl for="styles">{[values.render()]}</tpl>',"   </Styles>\n",'<tpl for="worksheets">{[values.render()]}</tpl>',"</Workbook>"],destroy:function(){this.getStyles().destroy();this.getWorksheets().destroy();return this.callParent(arguments)},getRenderData:function(){return Ext.apply(this.callParent(arguments),{worksheets:this.getWorksheets().getRange(),styles:this.getStyles().getRange()})},applyStyles:function(b,a){return this.checkCollection(b,a,"Ext.exporter.file.excel.Style")},applyWorksheets:function(b,a){return this.checkCollection(b,a,"Ext.exporter.file.excel.Worksheet")},addStyle:function(a){return this.getStyles().add(a||{})},getStyle:function(a){return this.getStyles().get(a)},addWorksheet:function(a){return this.getWorksheets().add(a||{})},getWorksheet:function(a){return this.getWorksheets().get(a)}});
Ext.define("Ext.exporter.File",{singleton:true},function(c){
/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
;var b=window.navigator,a=window.saveAs||(typeof b!=="undefined"&&b.msSaveOrOpenBlob&&b.msSaveOrOpenBlob.bind(b))||(function(q){if(typeof b!=="undefined"&&/MSIE [1-9]\./.test(b.userAgent)){return}var r=q.document,n=function(){return q.URL||q.webkitURL||q},t=r.createElementNS("http://www.w3.org/1999/xhtml","a"),g=!q.externalHost&&"download" in t,u=function(w){var v=r.createEvent("MouseEvents");v.initMouseEvent("click",true,false,q,0,0,0,0,0,false,false,false,false,0,null);w.dispatchEvent(v)},k=q.webkitRequestFileSystem,s=q.requestFileSystem||k||q.mozRequestFileSystem,h=function(v){(q.setImmediate||q.setTimeout)(function(){throw v},0)},p="application/octet-stream",m=0,l=[],j=function(){var w=l.length;while(w--){var v=l[w];if(typeof v==="string"){n().revokeObjectURL(v)}else{v.remove()}}l.length=0},o=function(w,v,z){v=[].concat(v);var y=v.length;while(y--){var A=w["on"+v[y]];if(typeof A==="function"){try{A.call(w,z||w)}catch(x){h(x)}}}},f=function(w,x){var y=this,E=w.type,H=false,A,z,v=function(){var I=n().createObjectURL(w);l.push(I);return I},D=function(){o(y,"writestart progress write writeend".split(" "))},G=function(){if(H||!A){A=v(w)}if(z){z.location.href=A}else{window.open(A,"_blank")}y.readyState=y.DONE;D()},C=function(I){return function(){if(y.readyState!==y.DONE){return I.apply(this,arguments)}}},B={create:true,exclusive:false},F;y.readyState=y.INIT;if(!x){x="download"}if(g){A=v(w);t.href=A;t.download=x;u(t);y.readyState=y.DONE;D();return}if(q.chrome&&E&&E!==p){F=w.slice||w.webkitSlice;w=F.call(w,0,w.size,p);H=true}if(k&&x!=="download"){x+=".download"}if(E===p||k){z=q}if(!s){G();return}m+=w.size;s(q.TEMPORARY,m,C(function(I){I.root.getDirectory("saved",B,C(function(J){var K=function(){J.getFile(x,B,C(function(L){L.createWriter(C(function(M){M.onwriteend=function(N){z.location.href=L.toURL();l.push(L);y.readyState=y.DONE;o(y,"writeend",N)};M.onerror=function(){var N=M.error;if(N.code!==N.ABORT_ERR){G()}};"writestart progress write abort".split(" ").forEach(function(N){M["on"+N]=y["on"+N]});M.write(w);y.abort=function(){M.abort();y.readyState=y.DONE};y.readyState=y.WRITING}),G)}),G)};J.getFile(x,{create:false},C(function(L){L.remove();K()}),C(function(L){if(L.code===L.NOT_FOUND_ERR){K()}else{G()}}))}),G)}),G)},e=f.prototype,i=function(v,w){return new f(v,w)};e.abort=function(){var v=this;v.readyState=v.DONE;o(v,"abort")};e.readyState=e.INIT=0;e.WRITING=1;e.DONE=2;e.error=e.onwritestart=e.onprogress=e.onwrite=e.onabort=e.onerror=e.onwriteend=null;q.addEventListener("unload",j,false);i.unload=function(){j();q.removeEventListener("unload",j,false)};return i}(typeof self!=="undefined"&&self||typeof window!=="undefined"&&window||this.content));if(typeof module!=="undefined"&&module!==null){module.exports=a}else{if((typeof define!=="undefined"&&define!==null)&&(define.amd!=null)){define([],function(){return a})}}var d=window.saveTextAs||(function(f,k,j){k=k||"download.txt";j=j||"utf-8";f=(f||"").replace(/\r?\n/g,"\r\n");if(a&&Blob){var e=new Blob([f],{type:"text/plain;charset="+j});a(e,k);return true}else{var g=window.frames.saveTxtWindow;if(!g){g=document.createElement("iframe");g.id="saveTxtWindow";g.style.display="none";document.body.insertBefore(g,null);g=window.frames.saveTxtWindow;if(!g){g=window.open("","_temp","width=100,height=100");if(!g){window.alert("Sorry, download file could not be created.");return false}}}var h=g.document;h.open("text/html","replace");h.charset=j;if(Ext.String.endsWith(k,".htm",true)||Ext.String.endsWith(k,".html",true)){h.close();h.body.innerHTML="\r\n"+f+"\r\n"}else{if(!Ext.String.endsWith(k,".txt",true)){k+=".txt"}h.write(f);h.close()}var i=h.execCommand("SaveAs",null,k);g.close();return i}});c.saveAs=d});
Ext.define("Ext.exporter.Base",{mixins:["Ext.mixin.Factoryable"],alias:"exporter.base",requires:["Ext.exporter.File"],config:{data:null,showSummary:true,title:"",author:"Sencha",fileName:"export.txt",charset:"UTF-8"},constructor:function(a){this.initConfig(a||{});return this.callParent(arguments)},getContent:Ext.identityFn,saveAs:function(){Ext.exporter.File.saveAs(this.getContent(),this.getFileName(),this.getCharset())},getColumnCount:function(b){var c=0;if(!b){return c}for(var a=0;a<b.length;a++){if(!b[a].columns){c+=1}else{c+=this.getColumnCount(b[a].columns)}}return c},applyData:function(a){if(Ext.isObject(a)){a.columns=a.columns||[];this.fixColumns(a.columns,this.getColDepth(a.columns,-1))}else{a={}}a.groups=a.groups||[];return a},getColDepth:function(c,d){var a=0;if(!c){return d}for(var b=0;b<c.length;b++){c[b].level=d+1;a=Math.max(a,this.getColDepth(c[b].columns,d+1))}return a},fixColumns:function(c,d){var a;if(!c){return}for(var b=0;b<c.length;b++){a=c[b];if(!a.columns&&d>a.level){a.columns=[];a.columns.push({text:"",level:a.level+1})}this.fixColumns(a.columns,d)}}});
Ext.define("Ext.exporter.Excel",{extend:"Ext.exporter.Base",alias:"exporter.excel",requires:["Ext.exporter.file.excel.Workbook"],config:{windowHeight:9000,windowWidth:50000,protectStructure:false,protectWindows:false,defaultStyle:{alignment:{Vertical:"Top"},font:{FontName:"Calibri",Family:"Swiss",Size:11,Color:"#000000"}},titleStyle:{name:"Title",alignment:{Horizontal:"Center",Vertical:"Center"},font:{FontName:"Cambria",Family:"Swiss",Size:18,Color:"#1F497D"}},groupHeaderStyle:{name:"Group Header",borders:[{Position:"Bottom",LineStyle:"Continuous",Weight:1,Color:"#4F81BD"}]},groupFooterStyle:{name:"Total Footer",borders:[{Position:"Top",LineStyle:"Continuous",Weight:1,Color:"#4F81BD"}]},tableHeaderStyle:{name:"Heading 1",alignment:{Horizontal:"Center",Vertical:"Center"},borders:[{Position:"Bottom",LineStyle:"Continuous",Weight:1,Color:"#4F81BD"}],font:{FontName:"Calibri",Family:"Swiss",Size:11,Color:"#1F497D"}}},fileName:"export.xml",destroy:function(){Ext.destroyMembers(this,"workbook","table");this.workbook=this.table=null;return this.callParent(arguments)},applyDefaultStyle:function(a){return Ext.applyIf({id:"Default",name:"Normal"},a||{})},getContent:function(){var b=this,a=this.getConfig(),c=a.data,d;b.workbook=Ext.create("Ext.exporter.file.excel.Workbook",{title:a.title,author:a.author,windowHeight:a.windowHeight,windowWidth:a.windowWidth,protectStructure:a.protectStructure,protectWindows:a.protectWindows});b.table=b.workbook.addWorksheet({name:a.title}).addTable();b.workbook.addStyle(a.defaultStyle);b.tableHeaderStyleId=b.workbook.addStyle(a.tableHeaderStyle).getId();b.groupHeaderStyleId=b.workbook.addStyle(a.groupHeaderStyle).getId();b.groupFooterStyleId=b.workbook.addStyle(a.groupFooterStyle).getId();d=b.getColumnCount(c.columns);b.addTitle(a,d);b.buildHeader();b.buildRows(d);return b.workbook.render()},addTitle:function(a,b){if(!Ext.isEmpty(a.title)){this.table.addRow({autoFitHeight:1,height:22.5,styleId:this.workbook.addStyle(a.titleStyle).getId()}).addCell({mergeAcross:b-1,value:a.title})}},buildRows:function(f){var c=this,d=c.getData(),a=Ext.isDefined(d.groups)?d.groups:Ext.Array.from(d),e;c.buildSummaryRows(a,f,1);if(c.getShowSummary()!==false&&Ext.isDefined(d.groups)&&d.summary&&d.summary.length>0){e=c.table.addRow({styleId:c.groupFooterStyleId});for(var b=0;b<d.summary.length;b++){e.addCell({value:d.summary[b]})}}},buildSummaryRows:function(c,a,b){var k=this,f=k.getShowSummary(),h,n,l,m;if(!c){return}l=k.workbook.addStyle({parentId:k.groupHeaderStyleId,alignment:{Horizontal:"Left",Indent:b-1}});m=k.workbook.addStyle({parentId:k.groupFooterStyleId,alignment:{Horizontal:"Left",Indent:b-1}});for(var e=0;e<c.length;e++){h=c[e];if(f!==false&&!Ext.isEmpty(h.text)){k.table.addRow({styleId:k.groupHeaderStyleId}).addCell({mergeAcross:a-1,value:h.text,styleId:l.getId()})}k.buildSummaryRows(h.groups,a,b+1);k.buildGroupRows(h.rows);if(f!==false&&h.summary&&h.summary.length>0){n=k.table.addRow({styleId:k.groupFooterStyleId});for(var d=0;d<h.summary.length;d++){n.addCell({value:h.summary[d],styleId:(d===0?m.getId():null)})}}}},buildGroupRows:function(b){var a,e,d,c;if(!b){return}for(d=0;d<b.length;d++){e=this.table.addRow();a=b[d];for(c=0;c<a.length;c++){e.addCell({value:a[c]})}}},buildHeader:function(){var g=this,d={},f,h,e,c,a,b;g.buildHeaderRows(g.getData().columns,d);f=Ext.Object.getKeys(d);a=f.length;for(e=0;e<a;e++){h=g.table.addRow({height:20.25,autoFitHeight:1,styleId:g.tableHeaderStyleId});b=d[f[e]].length;for(c=0;c<b;c++){h.addCell(d[f[e]][c])}}},buildHeaderRows:function(d,a){var b,f,e;if(!d){return}for(var c=0;c<d.length;c++){b=d[c];f=this.getColumnCount(b.columns);a["s"+b.level]=a["s"+b.level]||[];e={value:this.sanitizeHtml(b.text)};if(f>1){Ext.apply(e,{mergeAcross:f-1})}a["s"+b.level].push(e);this.buildHeaderRows(b.columns,a)}},sanitizeHtml:function(a){a=String(a).replace("<br>"," ");a=a.replace("<br/>"," ");return a.replace(/<\/?[^>]+>/gi,"")}});
Ext.define("Ext.grid.plugin.Exporter",{alias:["plugin.gridexporter"],extend:"Ext.AbstractPlugin",requires:["Ext.exporter.Excel"],lockableScope:"top",init:function(a){var b=this;a.saveDocumentAs=Ext.bind(b.saveDocumentAs,b);a.getDocumentData=Ext.bind(b.getDocumentData,b);b.grid=a;return b.callParent(arguments)},destroy:function(){var a=this;a.grid.saveDocumentAs=a.grid.getDocumentData=a.grid=null;return a.callParent(arguments)},saveDocumentAs:function(a){var b;if(this.disabled){return}b=this.getExporter.apply(this,arguments);b.saveAs();Ext.destroy(b)},getDocumentData:function(b){var c,a;if(this.disabled){return}c=this.getExporter.apply(this,arguments);a=c.getContent();Ext.destroy(c);return a},getExporter:function(a){return Ext.Factory.exporter(Ext.apply({type:"excel",data:this.prepareData()},a||{}))},prepareData:function(){var b=this,a=b.grid,d,c;c=b.extractGroups(a.getColumnManager().getColumns());if(a.lockedGrid){d=Ext.Array.merge(b.getColumnHeaders(a.lockedGrid.headerCt.items),b.getColumnHeaders(a.normalGrid.headerCt.items))}else{d=b.getColumnHeaders(a.headerCt.items)}return{columns:d,groups:[c]}},getColumnHeaders:function(c){var e=[],b,d,a;for(b=0;b<c.length;b++){a=c.get(b);if(!a.ignoreExport){d={text:a.text};if(a.isGroupHeader){d.columns=this.getColumnHeaders(a.items);if(d.columns.length===0){d=null}}if(d){e.push(d)}}}return e},extractGroups:function(c){var k=this.grid.getStore(),g=k.getCount(),b=c.length,m={rows:[]},e,d,f,n,a,h,l;for(e=0;e<g;e++){f=k.getAt(e);n=[];for(d=0;d<b;d++){a=c[d];if(!a.ignoreExport){h=!Ext.isEmpty(a.initialConfig.formatter)&&Ext.isEmpty(a.formatter);l=f.get(a.dataIndex)||"";n.push(h?a.renderer(l):l)}}m.rows.push(n)}return m}});
Ext.define('FiddleStateManager', {
    requires: ['Ext.state.Manager', 'Ext.state.LocalStorageProvider']
}, function () {
    Ext.state.Manager.setProvider(new Ext.state.LocalStorageProvider({
        prefix: 'fiddle-'
    }));
});
Ext.define('FiddleBaseGridColumn', {
    extend: 'Ext.Mixin',
    mixinConfig: {
        id: 'fiddleBaseGridColumm',
        before: {
            constructor: 'onBeforeConstructor'
        }
    },
    onBeforeConstructor: function (config) {
        var me = this;
        me.getStateId = function () {
            return this.dataIndex || this.headerId
        };
        me.getColumnState = function () {
            var me = this,
                items = me.items.items,
                iLen = items ? items.length : 0,
                i,
                columns = [],
                state = {
                    id: me.getStateId()
                };
            state = Ext.copyTo(state, this, 'dataIndex, text, width, flex, locked, hidden, sortable, xtype');
            if (me.isGroupHeader) {
                for (i = 0; i < iLen; i++) {
                    columns.push(items[i].getColumnState());
                }
                if (columns.length) {
                    state.columns = columns;
                }
            }
            if (!state.width) {
                delete state.width;
            }
            if ('width' in state || !state.flex) {
                delete state.flex;
            }
            return state;
        };
    }
});
Ext.define('FiddleColumn', {
    extend: 'Ext.grid.column.Column',
    alias: 'widget.fiddlecolumn',
    mixins: [
        'FiddleBaseGridColumn'
    ]
});
Ext.define('FiddleTooltipMixin', {
    extend: 'Ext.Mixin',
    isFiddleTooltipMixin: true,
    mixinConfig: {
        id: 'FiddleToolTip',
        after: {
            init: 'init'
        }
    },
    init: function () {
        this.listen({
            component: {
                fiddletooltip: {
                    beforeshow: 'onBeforeShow'
                }
            }
        })
    },
    onBeforeShow: function (tip) {
        var columns = tip.view.ownerGrid.columns,
            record = tip.view.getRecord(tip.triggerElement.parentNode),
            tooltipValue = this.table(columns, record, this);
        tip.update(tooltipValue);
    },
    privates: {
        tr: function (label, value) {
            return '<tr><td>' + label + ':&nbsp;</td><td>' + value + '</td></tr>';
        },
        table: function (columns, record, scope) {
            var html = '<table width="100%">';
            columns.forEach(function (column) {
                html += scope.tr(column.text, record.get(column.dataIndex));
            });
            return html + '</table>';
        }
    }
});
Ext.define('FiddleTooltipController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fiddletooltip',
    isFiddleTooltip: true,
    mixins: [
        'FiddleTooltipMixin'
    ]
});
Ext.define('FiddleTooltip', {
    extend: 'Ext.tip.ToolTip',
    alias: 'widget.fiddletooltip',
    requires: [
        'FiddleTooltipController'
    ],
    config: {
        controller: 'fiddletooltip',
        delegate: '.x-grid-cell',
        trackMouse: true
    }
});
Ext.define('Fiddle.Store', {
    extend: 'Ext.data.BufferedStore',
    config: {
        proxy: {
            type: 'ajax',
            url: meta.recordsUrl,
            reader: {
                type: 'json',
                rootProperty: 'data'
            }
        },
        fields: ['_id', 'index', 'isActive',
            'checkingBalance', 'savingBalance',
            'picture', 'age', 'eyeColor',
            'name', 'gender', 'company',
            'email', 'address', 'about',
            'latitude', 'longitude'],
        pageSize: 500,
        trailingBufferZone: 20,
        leadingBufferZone: 281,
        autoLoad: true
    }
}, function () {
    fiddleStore = Ext.create('Fiddle.Store', {
        storeId: 'myStore'
    });
});
Ext.application({
    name: 'Fiddle',
    launch: function () {
        Ext.QuickTips.init();
        var toolTipFactory = function (grid) {
                return new FiddleTooltip({
                    id: "gridToolTip" + grid.id,
                    target: grid.view.el,
                    renderTo: Ext.getBody()
                });
            },
            toolFactory = function () {
                return [{
                    text: 'export to excel',
                    handler: function () {
                        this.ownerCt.ownerCt.saveDocumentAs({
                                type: 'excel',
                                title: 'My export',
                                fileName: 'excel.xml'
                            });
                    }
                }]
            },
            pluginFactory = function () {
                return ['gridfilters', 'bufferedrenderer', 'gridexporter']
            },
            headerFactory = function () {
                var columns = [
                    {
                        xtype: 'fiddlecolumn',
                        dataIndex: 'index',
                        text: 'id',
                        filter: {
                            type: 'numeric'
                        },
                        locked: true
                    },
                    {
                        xtype: 'fiddlecolumn',
                        dataIndex: 'name',
                        text: 'Name',
                        filter: {
                            type: 'numeric'
                        },
                        locked: true,
                        width: 150
                    },
                    {
                        xtype: 'fiddlecolumn',
                        text: 'Banking',
                        defaults: {
                            hideable: false,
                            menuDisabled: true,
                            draggable: false
                        },
                        columns: [{
                            dataIndex: 'checkingBalance',
                            xtype: 'fiddlecolumn',
                            text: 'Checking',
                            filter: {}
                        },
                            {
                                dataIndex: 'savingsBalance',
                                xtype: 'fiddlecolumn',
                                text: 'Savings',
                                filter: {}
                            }]
                    }, {
                        xtype: 'fiddlecolumn',
                        dataIndex: 'age',
                        text: 'Age',
                        filter: {type: 'numeric'}
                    },
                    {
                        xtype: 'fiddlecolumn',
                        dataIndex: 'registered',
                        text: 'MemberSince',
                        renderer: Ext.util.Format.dateRenderer('Y-m-d'),
                        filter: {type: 'date'}
                    }, {
                        xtype: 'fiddlecolumn',
                        dataIndex: 'address',
                        text: 'Address',
                        filter: {type: 'string'},
                        flex: 2, stateId: 'address'
                    }, {
                        xtype: 'fiddlecolumn',
                        dataIndex: 'eyeColor',
                        text: 'Eye Color',
                        filter: {type: 'string'}
                    }, {
                        xtype: 'fiddlecolumn',
                        dataIndex: 'gender',
                        text: 'Gender',
                        filter: {type: 'string'}
                    },
                    {xtype: 'fiddlecolumn', dataIndex: 'company', text: 'Employer', filter: {type: 'string'}},
                    {xtype: 'fiddlecolumn', dataIndex: 'about', text: 'About', filter: {type: 'string'}},
                    {xtype: 'fiddlecolumn', dataIndex: 'latitude', text: 'Latitude', filter: {type: 'numeric'}},
                    {xtype: 'fiddlecolumn', dataIndex: 'longitude', text: 'Longitude', filter: {type: 'numeric'}},
                    {xtype: 'fiddlecolumn', dataIndex: 'tags', text: 'Tags', filter: {type: 'string'}},
                    {xtype: 'fiddlecolumn', dataIndex: 'favoriteFruit', text: 'Fruit', filter: {type: 'string'}}
                ];
                return columns;
            },
            onGridAfterRender = function (grid) {
                var view = grid.view;
                if (Ext.getCmp("gridToolTip" + grid.id) != undefined) {
                    Ext.destroy(Ext.getCmp("gridToolTip" + grid.id));
                }
                grid.tip = toolTipFactory(grid);
                grid.tip.view = view;
            },
            grid = Ext.create('Ext.grid.Panel', {
                border: false,
                requires: ['Ext.grid.plugin.Exporter', 'FiddleStateManager', 'FiddleColumn'],
                id: 'fiddleGrid',
                store: fiddleStore,
                stateful: true,
                stateId: 'grid-state',
                viewConfig: {
                    //enableLockable: true,
                    emptyText: '<div style="width:auto; height:auto; text-align:center; color:red; font-weight:bold;">Completely Empty.</div>'
                },
                columns: headerFactory(),
                loadMask: true,
                plugins: pluginFactory(),
                tbar: Ext.create('Ext.toolbar.Toolbar'),
                listeners: {
                    afterrender: onGridAfterRender,
                    applystate: onGridApplyState,
                    savestate: onGridSaveState
                }
            }),
            win = Ext.create('Ext.Window', {
                title: meta.fiddleHeader,
                height: 500,
                width: 700,
                maximizable: true,
                closable: false,
                layout: 'fit',
                items: grid
            }),
            positionX = 25,
            positionY = 125;
        grid.child('[dock=top]').add(toolFactory());
        fiddleStore.load();
        win.showAt([positionX, positionY]);
        window.setTimeout(function () {
            win.maximize(true);
        }, 2500);
        // Boiler Plate
        Ext.define('App.BoxModel', {
            extend: 'Ext.app.ViewModel',
            alias: 'viewmodel.box',
            data: {
                header: meta.fiddleHeader,
                subheader: meta.fiddleSubHeader
            }
        });
        Ext.define('App.Box', {
            extend: "Ext.container.Container",
            border: true,
            padding: 25,
            viewModel: {
                type: 'box'
            },
            items: [
                {
                    xtype: 'panel',
                    bind: {
                        title: '{header}'
                    },
                    items: [
                        {
                            xtype: 'panel',
                            padding: 10,
                            border: false,
                            bind: {
                                html: '{subheader}'
                            }
                        }
                    ],
                    region: 'north'
                }
            ]
        });
        Ext.create('App.Box', {
            renderTo: Ext.getBody()
        });
    }
});
