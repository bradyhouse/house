var meta = {
    fiddleHeader: 'The "Premium" Pivot Grid',
    fiddleSubHeader: 'Fiddle exploring the celebrated (but mysterious) Pivot Grid Control.' +
        '<br />',
    recordsUrl: 'data.json'
};

var fiddleStore = null;




Ext.define("Ext.exporter.file.Base", {
    requires: ["Ext.XTemplate", "Ext.util.Collection"],
    config: {
        id: ""
    },
    tpl: null,
    constructor: function(a) {
        var b = this;
        b.initConfig(a || {});
        return b.callParent(arguments)
    },
    applyId: function(a, b) {
        if (Ext.isEmpty(b)) {
            b = Ext.id()
        }
        if (!Ext.isEmpty(a)) {
            b = a
        }
        return b
    },
    checkCollection: function(c, a, b) {
        if (!a) {
            a = this.constructCollection(b)
        }
        if (c) {
            a.add(c)
        }
        return a
    },
    constructCollection: function(a) {
        return new Ext.util.Collection({
            decoder: this.getCollectionDecoder(a)
        })
    },
    getCollectionDecoder: function(a) {
        return function(b) {
            return Ext.create(a, b || {})
        }
    },
    render: function() {
        return this.tpl ? Ext.XTemplate.getTpl(this, "tpl").apply(this.getRenderData()) : ""
    },
    getRenderData: function() {
        return this.getConfig()
    }
});


Ext.define("Ext.exporter.file.excel.Worksheet", {
    extend: "Ext.exporter.file.Base",
    config: {
        name: "Sheet",
        protection: null,
        rightToLeft: null,
        showGridLines: true,
        tables: []
    },
    tpl: ['   <Worksheet ss:Name="{name:htmlEncode}"', '<tpl if="this.exists(protection)"> ss:Protected="{protection:this.toNumber}"</tpl>', '<tpl if="this.exists(rightToLeft)"> ss:RightToLeft="{rightToLeft:this.toNumber}"</tpl>', ">\n", '<tpl for="tables">{[values.render()]}</tpl>', '       <WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">\n', "          <PageSetup>\n", '              <Layout x:CenterHorizontal="1" x:Orientation="Portrait" />\n', '              <Header x:Margin="0.3" />\n', '              <Footer x:Margin="0.3" x:Data="Page &amp;P of &amp;N" />\n', '              <PageMargins x:Bottom="0.75" x:Left="0.7" x:Right="0.7" x:Top="0.75" />\n', "          </PageSetup>\n", "          <FitToPage />\n", "          <Print>\n", "              <PrintErrors>Blank</PrintErrors>\n", "              <FitWidth>1</FitWidth>\n", "              <FitHeight>32767</FitHeight>\n", "              <ValidPrinterInfo />\n", "              <VerticalResolution>600</VerticalResolution>\n", "          </Print>\n", "          <Selected />\n", '<tpl if="!showGridLines">', "          <DoNotDisplayGridlines />\n", "</tpl>", "          <ProtectObjects>False</ProtectObjects>\n", "          <ProtectScenarios>False</ProtectScenarios>\n", "      </WorksheetOptions>\n", "   </Worksheet>\n", {
        exists: function(a) {
            return !Ext.isEmpty(a)
        },
        toNumber: function(a) {
            return Number(Boolean(a))
        }
    }],
    destroy: function() {
        this.getTables().destroy();
        return this.callParent(arguments)
    },
    applyTables: function(b, a) {
        return this.checkCollection(b, a, "Ext.exporter.file.excel.Table")
    },
    addTable: function(a) {
        return this.getTables().add(a || {})
    },
    getTable: function(a) {
        return this.getTables().get(a)
    },
    applyName: function(a) {
        return Ext.String.ellipsis(String(a), 31)
    },
    getRenderData: function() {
        return Ext.apply(this.callParent(arguments), {
            tables: this.getTables().getRange()
        })
    }
});


Ext.define("Ext.exporter.file.excel.Table", {
    extend: "Ext.exporter.file.Base",
    config: {
        expandedColumnCount: null,
        expandedRowCount: null,
        fullColumns: 1,
        fullRows: 1,
        defaultColumnWidth: 48,
        defaultRowHeight: 12.75,
        styleId: null,
        leftCell: 1,
        topCell: 1,
        columns: [],
        rows: []
    },
    tpl: ['       <Table x:FullColumns="{fullColumns}" x:FullRows="{fullRows}"', '<tpl if="this.exists(expandedRowCount)"> ss:ExpandedRowCount="{expandedRowCount}"</tpl>', '<tpl if="this.exists(expandedColumnCount)"> ss:ExpandedColumnCount="{expandedColumnCount}"</tpl>', '<tpl if="this.exists(defaultRowHeight)"> ss:DefaultRowHeight="{defaultRowHeight}"</tpl>', '<tpl if="this.exists(defaultColumnWidth)"> ss:DefaultColumnWidth="{defaultColumnWidth}"</tpl>', '<tpl if="this.exists(leftCell)"> ss:LeftCell="{leftCell}"</tpl>', '<tpl if="this.exists(topCell)"> ss:TopCell="{topCell}"</tpl>', '<tpl if="this.exists(styleId)"> ss:StyleID="{styleId}"</tpl>', ">\n", '<tpl for="columns">{[values.render()]}</tpl>', '<tpl if="this.exists(rows)">', '<tpl for="rows">{[values.render()]}</tpl>', '<tpl else>         <Row ss:AutoFitHeight="0"/>\n</tpl>', "       </Table>\n", {
        exists: function(a) {
            return !Ext.isEmpty(a)
        }
    }],
    destroy: function() {
        this.getColumns().destroy();
        this.getRows().destroy();
        return this.callParent(arguments)
    },
    applyColumns: function(b, a) {
        return this.checkCollection(b, a, "Ext.exporter.file.excel.Column")
    },
    applyRows: function(b, a) {
        return this.checkCollection(b, a, "Ext.exporter.file.excel.Row")
    },
    addColumn: function(a) {
        return this.getColumns().add(a || {})
    },
    getColumn: function(a) {
        return this.getColumns().get(a)
    },
    addRow: function(a) {
        return this.getRows().add(a || {})
    },
    getRow: function(a) {
        return this.getRows().get(a)
    },
    getRenderData: function() {
        return Ext.apply(this.callParent(arguments), {
            columns: this.getColumns().getRange(),
            rows: this.getRows().getRange()
        })
    }
});


Ext.define("Ext.exporter.file.excel.Style", {
    extend: "Ext.exporter.file.Base",
    config: {
        parentId: null,
        name: null,
        protection: null,
        alignment: null,
        font: null,
        interior: null,
        format: null,
        borders: null
    },
    statics: {
        checks: {
            alignment: {
                Horizontal: ["Automatic", "Left", "Center", "Right", "Fill", "Justify", "CenterAcrossSelection", "Distributed", "JustifyDistributed"],
                Indent: null,
                ReadingOrder: ["LeftToRight", "RightToLeft", "Context"],
                Rotate: null,
                ShrinkToFit: [true, false],
                Vertical: ["Automatic", "Top", "Bottom", "Center", "Justify", "Distributed", "JustifyDistributed"],
                VerticalText: [true, false],
                WrapText: [true, false]
            },
            font: {
                Bold: [true, false],
                CharSet: null,
                Color: null,
                FontName: null,
                Family: ["Automatic", "Decorative", "Modern", "Roman", "Script", "Swiss"],
                Italic: [true, false],
                Outline: [true, false],
                Shadow: [true, false],
                Size: null,
                StrikeThrough: [true, false],
                Underline: ["None", "Single", "Double", "SingleAccounting", "DoubleAccounting"],
                VerticalAlign: ["None", "Subscript", "Superscript"]
            },
            border: {
                Position: ["Left", "Top", "Right", "Bottom", "DiagonalLeft", "DiagonalRight"],
                Color: null,
                LineStyle: ["None", "Continuous", "Dash", "Dot", "DashDot", "DashDotDot", "SlantDashDot", "Double"],
                Weight: [0, 1, 2, 3]
            },
            interior: {
                Color: null,
                Pattern: ["None", "Solid", "Gray75", "Gray50", "Gray25", "Gray125", "Gray0625", "HorzStripe", "VertStripe", "ReverseDiagStripe", "DiagStripe", "DiagCross", "ThickDiagCross", "ThinHorzStripe", "ThinVertStripe", "ThinReverseDiagStripe", "ThinDiagStripe", "ThinHorzCross", "ThinDiagCross"],
                PatternColor: null
            },
            protection: {
                Protected: [true, false],
                HideFormula: [true, false]
            }
        }
    },
    tpl: ['       <Style ss:ID="{id}"', '<tpl if="this.exists(parentId)"> ss:Parent="{parentId}"</tpl>', '<tpl if="this.exists(name)"> ss:Name="{name}"</tpl>', ">\n", '<tpl if="this.exists(alignment)">           <Alignment{[this.getAttributes(values.alignment, "alignment")]}/>\n</tpl>', '<tpl if="this.exists(borders)">', "           <Borders>\n", '<tpl for="borders">               <Border{[this.getAttributes(values, "border")]}/>\n</tpl>', "           </Borders>\n", "</tpl>", '<tpl if="this.exists(font)">           <Font{[this.getAttributes(values.font, "font")]}/>\n</tpl>', '<tpl if="this.exists(interior)">           <Interior{[this.getAttributes(values.interior, "interior")]}/>\n</tpl>', '<tpl if="this.exists(format)">           <NumberFormat ss:Format="{format}"/>\n</tpl>', '<tpl if="this.exists(protection)">           <Protection{[this.getAttributes(values.protection, "protection")]}/>\n</tpl>', "       </Style>\n", {
        exists: function(a) {
            return !Ext.isEmpty(a)
        },
        getAttributes: function(b, e) {
            var h = ' ss:{0}="{1}"',
                a = this.owner.self.checks,
                j = Ext.Object.getKeys(b || {}),
                f = j.length,
                k = "",
                c, d, g;
            if (a[e]) {
                for (c = 0; c < f; c++) {
                    g = j[c];
                    d = a[e][g];
                    if (Ext.isEmpty(d) || Ext.Array.indexOf(d, b[g]) >= 0) {
                        k += Ext.String.format(h, g, Ext.isBoolean(b[g]) ? Number(b[g]) : b[g])
                    } else {
                        Ext.raise(Ext.String.format("Invalid key (%0) or value (%1) provided for Style!", g, b[g]))
                    }
                }
            }
            return k
        }
    }]
});


Ext.define("Ext.exporter.file.excel.Row", {
    extend: "Ext.exporter.file.Base",
    config: {
        autoFitHeight: false,
        caption: null,
        cells: [],
        height: null,
        index: null,
        span: null,
        styleId: null
    },
    tpl: ["           <Row", '<tpl if="this.exists(index)"> ss:Index="{index}"</tpl>', '<tpl if="this.exists(caption)"> c:Caption="{caption}"</tpl>', '<tpl if="this.exists(autoFitHeight)"> ss:AutoFitHeight="{autoFitHeight:this.toNumber}"</tpl>', '<tpl if="this.exists(span)"> ss:Span="{span}"</tpl>', '<tpl if="this.exists(height)"> ss:Height="{height}"</tpl>', '<tpl if="this.exists(styleId)"> ss:StyleID="{styleId}"</tpl>', ">\n", '<tpl for="cells">{[values.render()]}</tpl>', "           </Row>\n", {
        exists: function(a) {
            return !Ext.isEmpty(a)
        },
        toNumber: function(a) {
            return Number(Boolean(a))
        }
    }],
    destroy: function() {
        this.getCells().destroy();
        return this.callParent(arguments)
    },
    applyCells: function(b, a) {
        return this.checkCollection(b, a, "Ext.exporter.file.excel.Cell")
    },
    addCell: function(a) {
        return this.getCells().add(a || {})
    },
    getCell: function(a) {
        return this.getCells().get(a)
    },
    getRenderData: function() {
        return Ext.apply(this.callParent(arguments), {
            cells: this.getCells().getRange()
        })
    }
});


Ext.define("Ext.exporter.file.excel.Column", {
    extend: "Ext.exporter.file.Base",
    config: {
        autoFitWidth: false,
        caption: null,
        hidden: null,
        index: null,
        span: null,
        styleId: null,
        width: null
    },
    tpl: ["<Column", '<tpl if="this.exists(index)"> ss:Index="{index}"</tpl>', '<tpl if="this.exists(caption)"> c:Caption="{caption}"</tpl>', '<tpl if="this.exists(styleId)"> ss:StyleID="{styleId}"</tpl>', '<tpl if="this.exists(hidden)"> ss:Hidden="{hidden}"</tpl>', '<tpl if="this.exists(span)"> ss:Span="{span}"</tpl>', '<tpl if="this.exists(width)"> ss:Width="{width}"</tpl>', '<tpl if="this.exists(autoFitWidth)"> ss:AutoFitWidth="{autoFitWidth:this.toNumber}"</tpl>', "/>\n", {
        exists: function(a) {
            return !Ext.isEmpty(a)
        },
        toNumber: function(a) {
            return Number(Boolean(a))
        }
    }]
});


Ext.define("Ext.exporter.file.excel.Cell", {
    extend: "Ext.exporter.file.Base",
    config: {
        dataType: "String",
        formula: null,
        index: null,
        styleId: null,
        mergeAcross: null,
        mergeDown: null,
        value: ""
    },
    tpl: ["               <Cell", '<tpl if="this.exists(index)"> ss:Index="{index}"</tpl>', '<tpl if="this.exists(styleId)"> ss:StyleID="{styleId}"</tpl>', '<tpl if="this.exists(mergeAcross)"> ss:MergeAcross="{mergeAcross}"</tpl>', '<tpl if="this.exists(mergeDown)"> ss:MergeDown="{mergeDown}"</tpl>', '<tpl if="this.exists(formula)"> ss:Formula="{formula}"</tpl>', ">\n", '                   <Data ss:Type="{dataType}">{[this.formatValue(values.value)]}</Data>\n', "               </Cell>\n", {
        exists: function(a) {
            return !Ext.isEmpty(a)
        },
        formatValue: function(a) {
            var b = Ext.util.Format;
            return (a instanceof Date ? Ext.Date.format(a, "Y-m-d\\TH:i:s.u") : b.htmlEncode(b.htmlDecode(a)))
        }
    }],
    render: function() {
        var b = this,
            a = b.getValue();
        if (a instanceof Date) {
            b.setDataType("DateTime")
        } else {
            if (Ext.isNumeric(a)) {
                b.setDataType("Number")
            } else {
                b.setDataType("String")
            }
        }
        return b.callParent(arguments)
    }
});


Ext.define("Ext.exporter.file.excel.Workbook", {
    extend: "Ext.exporter.file.Base",
    requires: ["Ext.exporter.file.excel.Worksheet", "Ext.exporter.file.excel.Table", "Ext.exporter.file.excel.Style", "Ext.exporter.file.excel.Row", "Ext.exporter.file.excel.Column", "Ext.exporter.file.excel.Cell"],
    config: {
        title: "Workbook",
        author: "Sencha",
        windowHeight: 9000,
        windowWidth: 50000,
        protectStructure: false,
        protectWindows: false,
        styles: [],
        worksheets: []
    },
    tpl: ['<?xml version="1.0" encoding="utf-8"?>\n', '<?mso-application progid="Excel.Sheet"?>\n', "<Workbook ", 'xmlns="urn:schemas-microsoft-com:office:spreadsheet" ', 'xmlns:o="urn:schemas-microsoft-com:office:office" ', 'xmlns:x="urn:schemas-microsoft-com:office:excel" ', 'xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" ', 'xmlns:html="http://www.w3.org/TR/REC-html40">\n', '   <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">\n', "       <Title>{title:htmlEncode}</Title>\n", "       <Author>{author:htmlEncode}</Author>\n", "       <Created>{createdAt}</Created>\n", "   </DocumentProperties>\n", '   <ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel">\n', "       <WindowHeight>{windowHeight}</WindowHeight>\n", "       <WindowWidth>{windowWidth}</WindowWidth>\n", "       <ProtectStructure>{protectStructure}</ProtectStructure>\n", "       <ProtectWindows>{protectWindows}</ProtectWindows>\n", "   </ExcelWorkbook>\n", "   <Styles>\n", '<tpl for="styles">{[values.render()]}</tpl>', "   </Styles>\n", '<tpl for="worksheets">{[values.render()]}</tpl>', "</Workbook>"],
    destroy: function() {
        this.getStyles().destroy();
        this.getWorksheets().destroy();
        return this.callParent(arguments)
    },
    getRenderData: function() {
        return Ext.apply(this.callParent(arguments), {
            worksheets: this.getWorksheets().getRange(),
            styles: this.getStyles().getRange()
        })
    },
    applyStyles: function(b, a) {
        return this.checkCollection(b, a, "Ext.exporter.file.excel.Style")
    },
    applyWorksheets: function(b, a) {
        return this.checkCollection(b, a, "Ext.exporter.file.excel.Worksheet")
    },
    addStyle: function(a) {
        return this.getStyles().add(a || {})
    },
    getStyle: function(a) {
        return this.getStyles().get(a)
    },
    addWorksheet: function(a) {
        return this.getWorksheets().add(a || {})
    },
    getWorksheet: function(a) {
        return this.getWorksheets().get(a)
    }
});


Ext.define("Ext.exporter.File", {
    singleton: true
}, function(c) {
    /*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
    ;
    var b = window.navigator,
        a = window.saveAs || (typeof b !== "undefined" && b.msSaveOrOpenBlob && b.msSaveOrOpenBlob.bind(b)) || (function(q) {
            if (typeof b !== "undefined" && /MSIE [1-9]\./.test(b.userAgent)) {
                return
            }
            var r = q.document,
                n = function() {
                    return q.URL || q.webkitURL || q
                },
                t = r.createElementNS("http://www.w3.org/1999/xhtml", "a"),
                g = !q.externalHost && "download" in t,
                u = function(w) {
                    var v = r.createEvent("MouseEvents");
                    v.initMouseEvent("click", true, false, q, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                    w.dispatchEvent(v)
                },
                k = q.webkitRequestFileSystem,
                s = q.requestFileSystem || k || q.mozRequestFileSystem,
                h = function(v) {
                    (q.setImmediate || q.setTimeout)(function() {
                        throw v
                    }, 0)
                },
                p = "application/octet-stream",
                m = 0,
                l = [],
                j = function() {
                    var w = l.length;
                    while (w--) {
                        var v = l[w];
                        if (typeof v === "string") {
                            n().revokeObjectURL(v)
                        } else {
                            v.remove()
                        }
                    }
                    l.length = 0
                },
                o = function(w, v, z) {
                    v = [].concat(v);
                    var y = v.length;
                    while (y--) {
                        var A = w["on" + v[y]];
                        if (typeof A === "function") {
                            try {
                                A.call(w, z || w)
                            } catch (x) {
                                h(x)
                            }
                        }
                    }
                },
                f = function(w, x) {
                    var y = this,
                        E = w.type,
                        H = false,
                        A, z, v = function() {
                            var I = n().createObjectURL(w);
                            l.push(I);
                            return I
                        },
                        D = function() {
                            o(y, "writestart progress write writeend".split(" "))
                        },
                        G = function() {
                            if (H || !A) {
                                A = v(w)
                            }
                            if (z) {
                                z.location.href = A
                            } else {
                                window.open(A, "_blank")
                            }
                            y.readyState = y.DONE;
                            D()
                        },
                        C = function(I) {
                            return function() {
                                if (y.readyState !== y.DONE) {
                                    return I.apply(this, arguments)
                                }
                            }
                        },
                        B = {
                            create: true,
                            exclusive: false
                        },
                        F;
                    y.readyState = y.INIT;
                    if (!x) {
                        x = "download"
                    }
                    if (g) {
                        A = v(w);
                        t.href = A;
                        t.download = x;
                        u(t);
                        y.readyState = y.DONE;
                        D();
                        return
                    }
                    if (q.chrome && E && E !== p) {
                        F = w.slice || w.webkitSlice;
                        w = F.call(w, 0, w.size, p);
                        H = true
                    }
                    if (k && x !== "download") {
                        x += ".download"
                    }
                    if (E === p || k) {
                        z = q
                    }
                    if (!s) {
                        G();
                        return
                    }
                    m += w.size;
                    s(q.TEMPORARY, m, C(function(I) {
                        I.root.getDirectory("saved", B, C(function(J) {
                            var K = function() {
                                J.getFile(x, B, C(function(L) {
                                    L.createWriter(C(function(M) {
                                        M.onwriteend = function(N) {
                                            z.location.href = L.toURL();
                                            l.push(L);
                                            y.readyState = y.DONE;
                                            o(y, "writeend", N)
                                        };
                                        M.onerror = function() {
                                            var N = M.error;
                                            if (N.code !== N.ABORT_ERR) {
                                                G()
                                            }
                                        };
                                        "writestart progress write abort".split(" ").forEach(function(N) {
                                            M["on" + N] = y["on" + N]
                                        });
                                        M.write(w);
                                        y.abort = function() {
                                            M.abort();
                                            y.readyState = y.DONE
                                        };
                                        y.readyState = y.WRITING
                                    }), G)
                                }), G)
                            };
                            J.getFile(x, {
                                create: false
                            }, C(function(L) {
                                L.remove();
                                K()
                            }), C(function(L) {
                                if (L.code === L.NOT_FOUND_ERR) {
                                    K()
                                } else {
                                    G()
                                }
                            }))
                        }), G)
                    }), G)
                },
                e = f.prototype,
                i = function(v, w) {
                    return new f(v, w)
                };
            e.abort = function() {
                var v = this;
                v.readyState = v.DONE;
                o(v, "abort")
            };
            e.readyState = e.INIT = 0;
            e.WRITING = 1;
            e.DONE = 2;
            e.error = e.onwritestart = e.onprogress = e.onwrite = e.onabort = e.onerror = e.onwriteend = null;
            q.addEventListener("unload", j, false);
            i.unload = function() {
                j();
                q.removeEventListener("unload", j, false)
            };
            return i
        }(typeof self !== "undefined" && self || typeof window !== "undefined" && window || this.content));
    if (typeof module !== "undefined" && module !== null) {
        module.exports = a
    } else {
        if ((typeof define !== "undefined" && define !== null) && (define.amd != null)) {
            define([], function() {
                return a
            })
        }
    }
    var d = window.saveTextAs || (function(f, k, j) {
        k = k || "download.txt";
        j = j || "utf-8";
        f = (f || "").replace(/\r?\n/g, "\r\n");
        if (a && Blob) {
            var e = new Blob([f], {
                type: "text/plain;charset=" + j
            });
            a(e, k);
            return true
        } else {
            var g = window.frames.saveTxtWindow;
            if (!g) {
                g = document.createElement("iframe");
                g.id = "saveTxtWindow";
                g.style.display = "none";
                document.body.insertBefore(g, null);
                g = window.frames.saveTxtWindow;
                if (!g) {
                    g = window.open("", "_temp", "width=100,height=100");
                    if (!g) {
                        window.alert("Sorry, download file could not be created.");
                        return false
                    }
                }
            }
            var h = g.document;
            h.open("text/html", "replace");
            h.charset = j;
            if (Ext.String.endsWith(k, ".htm", true) || Ext.String.endsWith(k, ".html", true)) {
                h.close();
                h.body.innerHTML = "\r\n" + f + "\r\n"
            } else {
                if (!Ext.String.endsWith(k, ".txt", true)) {
                    k += ".txt"
                }
                h.write(f);
                h.close()
            }
            var i = h.execCommand("SaveAs", null, k);
            g.close();
            return i
        }
    });
    c.saveAs = d
});


Ext.define("Ext.exporter.Base", {
    mixins: ["Ext.mixin.Factoryable"],
    alias: "exporter.base",
    requires: ["Ext.exporter.File"],
    config: {
        data: null,
        showSummary: true,
        title: "",
        author: "Sencha",
        fileName: "export.txt",
        charset: "UTF-8"
    },
    constructor: function(a) {
        this.initConfig(a || {});
        return this.callParent(arguments)
    },
    getContent: Ext.identityFn,
    saveAs: function() {
        Ext.exporter.File.saveAs(this.getContent(), this.getFileName(), this.getCharset())
    },
    getColumnCount: function(b) {
        var c = 0;
        if (!b) {
            return c
        }
        for (var a = 0; a < b.length; a++) {
            if (!b[a].columns) {
                c += 1
            } else {
                c += this.getColumnCount(b[a].columns)
            }
        }
        return c
    },
    applyData: function(a) {
        if (Ext.isObject(a)) {
            a.columns = a.columns || [];
            this.fixColumns(a.columns, this.getColDepth(a.columns, -1))
        } else {
            a = {}
        }
        a.groups = a.groups || [];
        return a
    },
    getColDepth: function(c, d) {
        var a = 0;
        if (!c) {
            return d
        }
        for (var b = 0; b < c.length; b++) {
            c[b].level = d + 1;
            a = Math.max(a, this.getColDepth(c[b].columns, d + 1))
        }
        return a
    },
    fixColumns: function(c, d) {
        var a;
        if (!c) {
            return
        }
        for (var b = 0; b < c.length; b++) {
            a = c[b];
            if (!a.columns && d > a.level) {
                a.columns = [];
                a.columns.push({
                    text: "",
                    level: a.level + 1
                })
            }
            this.fixColumns(a.columns, d)
        }
    }
});


Ext.define("Ext.exporter.Excel", {
    extend: "Ext.exporter.Base",
    alias: "exporter.excel",
    requires: ["Ext.exporter.file.excel.Workbook"],
    config: {
        windowHeight: 9000,
        windowWidth: 50000,
        protectStructure: false,
        protectWindows: false,
        defaultStyle: {
            alignment: {
                Vertical: "Top"
            },
            font: {
                FontName: "Calibri",
                Family: "Swiss",
                Size: 11,
                Color: "#000000"
            }
        },
        titleStyle: {
            name: "Title",
            alignment: {
                Horizontal: "Center",
                Vertical: "Center"
            },
            font: {
                FontName: "Cambria",
                Family: "Swiss",
                Size: 18,
                Color: "#1F497D"
            }
        },
        groupHeaderStyle: {
            name: "Group Header",
            borders: [{
                Position: "Bottom",
                LineStyle: "Continuous",
                Weight: 1,
                Color: "#4F81BD"
            }]
        },
        groupFooterStyle: {
            name: "Total Footer",
            borders: [{
                Position: "Top",
                LineStyle: "Continuous",
                Weight: 1,
                Color: "#4F81BD"
            }]
        },
        tableHeaderStyle: {
            name: "Heading 1",
            alignment: {
                Horizontal: "Center",
                Vertical: "Center"
            },
            borders: [{
                Position: "Bottom",
                LineStyle: "Continuous",
                Weight: 1,
                Color: "#4F81BD"
            }],
            font: {
                FontName: "Calibri",
                Family: "Swiss",
                Size: 11,
                Color: "#1F497D"
            }
        }
    },
    fileName: "export.xml",
    destroy: function() {
        Ext.destroyMembers(this, "workbook", "table");
        this.workbook = this.table = null;
        return this.callParent(arguments)
    },
    applyDefaultStyle: function(a) {
        return Ext.applyIf({
            id: "Default",
            name: "Normal"
        }, a || {})
    },
    getContent: function() {
        var b = this,
            a = this.getConfig(),
            c = a.data,
            d;
        b.workbook = Ext.create("Ext.exporter.file.excel.Workbook", {
            title: a.title,
            author: a.author,
            windowHeight: a.windowHeight,
            windowWidth: a.windowWidth,
            protectStructure: a.protectStructure,
            protectWindows: a.protectWindows
        });
        b.table = b.workbook.addWorksheet({
            name: a.title
        }).addTable();
        b.workbook.addStyle(a.defaultStyle);
        b.tableHeaderStyleId = b.workbook.addStyle(a.tableHeaderStyle).getId();
        b.groupHeaderStyleId = b.workbook.addStyle(a.groupHeaderStyle).getId();
        b.groupFooterStyleId = b.workbook.addStyle(a.groupFooterStyle).getId();
        d = b.getColumnCount(c.columns);
        b.addTitle(a, d);
        b.buildHeader();
        b.buildRows(d);
        return b.workbook.render()
    },
    addTitle: function(a, b) {
        if (!Ext.isEmpty(a.title)) {
            this.table.addRow({
                autoFitHeight: 1,
                height: 22.5,
                styleId: this.workbook.addStyle(a.titleStyle).getId()
            }).addCell({
                mergeAcross: b - 1,
                value: a.title
            })
        }
    },
    buildRows: function(f) {
        var c = this,
            d = c.getData(),
            a = Ext.isDefined(d.groups) ? d.groups : Ext.Array.from(d),
            e;
        c.buildSummaryRows(a, f, 1);
        if (c.getShowSummary() !== false && Ext.isDefined(d.groups) && d.summary && d.summary.length > 0) {
            e = c.table.addRow({
                styleId: c.groupFooterStyleId
            });
            for (var b = 0; b < d.summary.length; b++) {
                e.addCell({
                    value: d.summary[b]
                })
            }
        }
    },
    buildSummaryRows: function(c, a, b) {
        var k = this,
            f = k.getShowSummary(),
            h, n, l, m;
        if (!c) {
            return
        }
        l = k.workbook.addStyle({
            parentId: k.groupHeaderStyleId,
            alignment: {
                Horizontal: "Left",
                Indent: b - 1
            }
        });
        m = k.workbook.addStyle({
            parentId: k.groupFooterStyleId,
            alignment: {
                Horizontal: "Left",
                Indent: b - 1
            }
        });
        for (var e = 0; e < c.length; e++) {
            h = c[e];
            if (f !== false && !Ext.isEmpty(h.text)) {
                k.table.addRow({
                    styleId: k.groupHeaderStyleId
                }).addCell({
                    mergeAcross: a - 1,
                    value: h.text,
                    styleId: l.getId()
                })
            }
            k.buildSummaryRows(h.groups, a, b + 1);
            k.buildGroupRows(h.rows);
            if (f !== false && h.summary && h.summary.length > 0) {
                n = k.table.addRow({
                    styleId: k.groupFooterStyleId
                });
                for (var d = 0; d < h.summary.length; d++) {
                    n.addCell({
                        value: h.summary[d],
                        styleId: (d === 0 ? m.getId() : null)
                    })
                }
            }
        }
    },
    buildGroupRows: function(b) {
        var a, e, d, c;
        if (!b) {
            return
        }
        for (d = 0; d < b.length; d++) {
            e = this.table.addRow();
            a = b[d];
            for (c = 0; c < a.length; c++) {
                e.addCell({
                    value: a[c]
                })
            }
        }
    },
    buildHeader: function() {
        var g = this,
            d = {},
            f, h, e, c, a, b;
        g.buildHeaderRows(g.getData().columns, d);
        f = Ext.Object.getKeys(d);
        a = f.length;
        for (e = 0; e < a; e++) {
            h = g.table.addRow({
                height: 20.25,
                autoFitHeight: 1,
                styleId: g.tableHeaderStyleId
            });
            b = d[f[e]].length;
            for (c = 0; c < b; c++) {
                h.addCell(d[f[e]][c])
            }
        }
    },
    buildHeaderRows: function(d, a) {
        var b, f, e;
        if (!d) {
            return
        }
        for (var c = 0; c < d.length; c++) {
            b = d[c];
            f = this.getColumnCount(b.columns);
            a["s" + b.level] = a["s" + b.level] || [];
            e = {
                value: this.sanitizeHtml(b.text)
            };
            if (f > 1) {
                Ext.apply(e, {
                    mergeAcross: f - 1
                })
            }
            a["s" + b.level].push(e);
            this.buildHeaderRows(b.columns, a)
        }
    },
    sanitizeHtml: function(a) {
        a = String(a).replace("<br>", " ");
        a = a.replace("<br/>", " ");
        return a.replace(/<\/?[^>]+>/gi, "")
    }
});


Ext.define("Ext.grid.plugin.Exporter", {
    alias: ["plugin.gridexporter"],
    extend: "Ext.AbstractPlugin",
    requires: ["Ext.exporter.Excel"],
    lockableScope: "top",
    init: function(a) {
        var b = this;
        a.saveDocumentAs = Ext.bind(b.saveDocumentAs, b);
        a.getDocumentData = Ext.bind(b.getDocumentData, b);
        b.grid = a;
        return b.callParent(arguments)
    },
    destroy: function() {
        var a = this;
        a.grid.saveDocumentAs = a.grid.getDocumentData = a.grid = null;
        return a.callParent(arguments)
    },
    saveDocumentAs: function(a) {
        var b;
        if (this.disabled) {
            return
        }
        b = this.getExporter.apply(this, arguments);
        b.saveAs();
        Ext.destroy(b)
    },
    getDocumentData: function(b) {
        var c, a;
        if (this.disabled) {
            return
        }
        c = this.getExporter.apply(this, arguments);
        a = c.getContent();
        Ext.destroy(c);
        return a
    },
    getExporter: function(a) {
        return Ext.Factory.exporter(Ext.apply({
            type: "excel",
            data: this.prepareData()
        }, a || {}))
    },
    prepareData: function() {
        var b = this,
            a = b.grid,
            d, c;
        c = b.extractGroups(a.getColumnManager().getColumns());
        if (a.lockedGrid) {
            d = Ext.Array.merge(b.getColumnHeaders(a.lockedGrid.headerCt.items), b.getColumnHeaders(a.normalGrid.headerCt.items))
        } else {
            d = b.getColumnHeaders(a.headerCt.items)
        }
        return {
            columns: d,
            groups: [c]
        }
    },
    getColumnHeaders: function(c) {
        var e = [],
            b, d, a;
        for (b = 0; b < c.length; b++) {
            a = c.get(b);
            if (!a.ignoreExport) {
                d = {
                    text: a.text
                };
                if (a.isGroupHeader) {
                    d.columns = this.getColumnHeaders(a.items);
                    if (d.columns.length === 0) {
                        d = null
                    }
                }
                if (d) {
                    e.push(d)
                }
            }
        }
        return e
    },
    extractGroups: function(c) {
        var k = this.grid.getStore(),
            g = k.getCount(),
            b = c.length,
            m = {
                rows: []
            },
            e, d, f, n, a, h, l;
        for (e = 0; e < g; e++) {
            f = k.getAt(e);
            n = [];
            for (d = 0; d < b; d++) {
                a = c[d];
                if (!a.ignoreExport) {
                    h = !Ext.isEmpty(a.initialConfig.formatter) && Ext.isEmpty(a.formatter);
                    l = f.get(a.dataIndex) || "";
                    n.push(h ? a.renderer(l) : l)
                }
            }
            m.rows.push(n)
        }
        return m
    }
});


Ext.define("Ext.pivot.Aggregators", {
    alternateClassName: ["Mz.aggregate.Aggregators"],
    singleton: true,
    sum: function(b, d, a, g, h) {
        var f = b.length,
            e = 0,
            c;
        for (c = 0; c < f; c++) {
            e += Ext.Number.from(b[c].get(d), 0)
        }
        return e
    },
    avg: function(b, d, a, g, h) {
        var f = b.length,
            e = 0,
            c;
        for (c = 0; c < f; c++) {
            e += Ext.Number.from(b[c].get(d), 0)
        }
        return f > 0 ? (e / f) : 0
    },
    min: function(d, a, g, j, b) {
        var e = [],
            c = d.length,
            f, h;
        for (f = 0; f < c; f++) {
            e.push(d[f].get(a))
        }
        h = Ext.Array.min(e);
        return h
    },
    max: function(b, d, a, f, h) {
        var g = [],
            e = b.length,
            c;
        for (c = 0; c < e; c++) {
            g.push(b[c].get(d))
        }
        v = Ext.Array.max(g);
        return v
    },
    count: function(b, c, a, d, e) {
        return b.length
    },
    groupSumPercentage: function(e, b, g, i, c) {
        var a = Ext.pivot.Aggregators.sum,
            d = e.length,
            l, k, f = 0,
            h = 0,
            j = i.split(g.keysSeparator);
        if (d == 0) {
            return 0
        }
        j.pop();
        j = j.join(g.keysSeparator);
        if (Ext.isEmpty(j)) {
            j = g.grandTotalKey
        }
        l = g.results.get(i, c);
        if (l) {
            f = l.getValue("groupSum");
            if (!Ext.isDefined(f)) {
                f = l.calculateByFn("groupSum", b, a)
            }
        }
        k = g.results.get(j, c);
        if (k) {
            h = k.getValue("groupSum");
            if (!Ext.isDefined(h)) {
                h = k.calculateByFn("groupSum", b, a)
            }
        }
        return (h > 0 && f > 0) ? f / h * 100 : 0
    },
    groupCountPercentage: function(d, a, f, h, b) {
        var k = Ext.pivot.Aggregators.count,
            c = d.length,
            l, j, e = 0,
            g = 0,
            i = h.split(f.keysSeparator);
        if (c == 0) {
            return 0
        }
        i.pop();
        i = i.join(f.keysSeparator);
        if (Ext.isEmpty(i)) {
            i = f.grandTotalKey
        }
        l = f.results.get(h, b);
        if (l) {
            e = l.getValue("groupCount");
            if (!Ext.isDefined(e)) {
                e = l.calculateByFn("groupCount", a, k)
            }
        }
        j = f.results.get(i, b);
        if (j) {
            g = j.getValue("groupCount");
            if (!Ext.isDefined(g)) {
                g = j.calculateByFn("groupCount", a, k)
            }
        }
        return (g > 0 && e > 0) ? e / g * 100 : 0
    },
    variance: function(d, a, j, k, b) {
        var g = Ext.pivot.Aggregators,
            c = d.length,
            f = g.avg.apply(g, arguments),
            h = 0,
            e;
        if (f > 0) {
            for (e = 0; e < c; e++) {
                h += Math.pow(Ext.Number.from(d[e].get(a), 0) - f, 2)
            }
        }
        return (h > 0 && c > 1) ? (h / (c - 1)) : 0
    },
    varianceP: function(d, a, j, k, b) {
        var g = Ext.pivot.Aggregators,
            c = d.length,
            f = g.avg.apply(g, arguments),
            h = 0,
            e;
        if (f > 0) {
            for (e = 0; e < c; e++) {
                h += Math.pow(Ext.Number.from(d[e].get(a), 0) - f, 2)
            }
        }
        return (h > 0 && c > 0) ? (h / c) : 0
    },
    stdDev: function(c, d, b, f, g) {
        var e = Ext.pivot.Aggregators,
            a = e.variance.apply(e, arguments);
        return a > 0 ? Math.sqrt(a) : 0
    },
    stdDevP: function(c, d, b, f, g) {
        var e = Ext.pivot.Aggregators,
            a = e.varianceP.apply(e, arguments);
        return a > 0 ? Math.sqrt(a) : 0
    }
});


Ext.define("Ext.pivot.MixedCollection", {
    extend: "Ext.util.MixedCollection",
    alternateClassName: ["Mz.aggregate.MixedCollection"],
    removeAt: function(a) {
        Ext.destroy(this.callParent(arguments))
    },
    clear: function() {
        Ext.destroy(this.items);
        this.callParent(arguments)
    },
    removeAll: function() {
        Ext.destroy(this.items);
        this.callParent(arguments)
    },
    destroy: function() {
        this.clear()
    }
});


Ext.define("Ext.pivot.filter.Base", {
    alternateClassName: ["Mz.aggregate.filter.Abstract"],
    alias: "pivotfilter.base",
    mixins: ["Ext.mixin.Factoryable"],
    operator: null,
    value: null,
    caseSensitive: true,
    parent: null,
    constructor: function(a) {
        Ext.apply(this, a || {});
        return this.callParent(arguments)
    },
    destroy: function() {
        this.parent = null;
        return this.callParent(arguments)
    },
    serialize: function() {
        var a = this;
        return Ext.apply({
            type: a.type,
            operator: a.operator,
            value: a.value,
            caseSensitive: a.caseSensitive
        }, a.getSerialArgs() || {})
    },
    getSerialArgs: Ext.emptyFn,
    isMatch: function(e) {
        var b = this,
            i = Ext.pivot.matrix.Base.prototype.naturalSort,
            f = b.value,
            a, h, g, d, c;
        f = (Ext.isArray(f) ? f[0] : f) || "";
        a = (b.caseSensitive ? i(e || "", f) : i(String(e || "").toLowerCase(), String(f).toLowerCase()));
        if (b.operator == "=") {
            return (a === 0)
        }
        if (b.operator == "!=") {
            return (a !== 0)
        }
        if (b.operator == ">") {
            return (a > 0)
        }
        if (b.operator == ">=") {
            return (a >= 0)
        }
        if (b.operator == "<") {
            return (a < 0)
        }
        if (b.operator == "<=") {
            return (a <= 0)
        }
        f = b.value;
        d = (Ext.isArray(f) ? f[0] : f) || "";
        c = (Ext.isArray(f) ? f[1] : f) || "";
        h = (b.caseSensitive ? i(String(e || "").toLowerCase(), String(d).toLowerCase()) : i(e || "", d));
        g = (b.caseSensitive ? i(String(e || "").toLowerCase(), String(c).toLowerCase()) : i(e || "", c));
        if (b.operator == "between") {
            return (h >= 0 && g <= 0)
        }
        if (b.operator == "not between") {
            return !(h >= 0 && g <= 0)
        }
        return true
    }
});


Ext.define("Ext.pivot.filter.Label", {
    alternateClassName: ["Mz.aggregate.filter.Label"],
    extend: "Ext.pivot.filter.Base",
    alias: "pivotfilter.label",
    isMatch: function(c) {
        var b = this,
            a;
        if (b.operator == "begins") {
            return Ext.String.startsWith(String(c || ""), String(b.value || ""), !b.caseSensitive)
        }
        if (b.operator == "not begins") {
            return !Ext.String.startsWith(String(c || ""), String(b.value || ""), !b.caseSensitive)
        }
        if (b.operator == "ends") {
            return Ext.String.endsWith(String(c || ""), String(b.value || ""), !b.caseSensitive)
        }
        if (b.operator == "not ends") {
            return !Ext.String.endsWith(String(c || ""), String(b.value || ""), !b.caseSensitive)
        }
        if (b.operator == "contains") {
            return b.stringContains(String(c || ""), String(b.value || ""), !b.caseSensitive)
        }
        if (b.operator == "not contains") {
            return !b.stringContains(String(c || ""), String(b.value || ""), !b.caseSensitive)
        }
        if (b.operator == "in") {
            return b.foundInArray(b.value)
        }
        if (b.operator == "not in") {
            return !b.foundInArray(b.value)
        }
        return b.callParent(arguments)
    },
    foundInArray: function(d) {
        var b = Ext.Array.from(this.value),
            a = b.length,
            e = false,
            c;
        if (this.caseSensitive) {
            return Ext.Array.indexOf(b, d) >= 0
        } else {
            for (c = 0; c < a; c++) {
                e = e || (String(d).toLowerCase() == String(b[c]).toLowerCase());
                if (e) {
                    break
                }
            }
            return e
        }
    },
    stringContains: function(c, d, b) {
        var a = (d.length <= c.length);
        if (a) {
            if (b) {
                c = c.toLowerCase();
                d = d.toLowerCase()
            }
            a = (c.lastIndexOf(d) >= 0)
        }
        return a
    }
});


Ext.define("Ext.pivot.filter.Value", {
    alternateClassName: ["Mz.aggregate.filter.Value"],
    extend: "Ext.pivot.filter.Base",
    alias: "pivotfilter.value",
    dimensionId: "",
    topType: "items",
    topOrder: "top",
    topSort: true,
    isTopFilter: false,
    constructor: function() {
        var b = this,
            a = b.callParent(arguments);
        if (Ext.isEmpty(b.dimensionId)) {
            Ext.raise("dimensionId is mandatory on Value filters")
        } else {
            if (!b.parent.matrix.aggregate.getByKey(b.dimensionId)) {
                Ext.raise("There is no aggregate dimension that matches the dimensionId provided")
            }
        }
        b.dimension = b.parent.matrix.aggregate.getByKey(b.dimensionId);
        b.isTopFilter = (b.operator === "top10");
        return a
    },
    destroy: function() {
        this.dimension = null;
        return this.callParent(arguments)
    },
    isMatch: function(d) {
        var c = this,
            a = c.value,
            b = c.callParent(arguments);
        if (!b) {
            c.value = c.dimension.renderer(Ext.isNumeric(a) ? parseFloat(a) : a);
            b = c.callParent([c.dimension.renderer(Ext.isNumeric(d) ? parseFloat(d) : d)]);
            c.value = a
        }
        return b
    },
    getSerialArgs: function() {
        return {
            dimensionId: this.dimensionId,
            topType: this.topType,
            topOrder: this.topOrder
        }
    },
    applyFilter: function(c, e) {
        var d = this,
            a = d.topSort ? e : Ext.Array.clone(e),
            b = [];
        if (e.length == 0) {
            return b
        }
        d.sortItemsByGrandTotal(c, a);
        switch (d.topType) {
            case "items":
                b = d.extractTop10Items(a);
                break;
            case "sum":
                b = d.extractTop10Sum(a);
                break;
            case "percent":
                b = d.extractTop10Percent(c, a);
                break
        }
        if (!d.topSort) {
            a.length = 0
        }
        return b
    },
    extractTop10Items: function(a) {
        var c = this,
            d = [],
            b;
        for (b = 0; b < a.length; b++) {
            if (d.indexOf(a[b]["tempVar"]) < 0) {
                d.push(a[b]["tempVar"]);
                if (d.length > c.value || (c.value < b + 1 && b > 0)) {
                    break
                }
            }
        }
        return Ext.Array.slice(a, b)
    },
    extractTop10Sum: function(a) {
        var d = this,
            c = 0,
            b;
        for (b = 0; b < a.length; b++) {
            c += a[b]["tempVar"];
            if (c >= d.value) {
                break
            }
        }
        return Ext.Array.slice(a, b + 1)
    },
    extractTop10Percent: function(b, g) {
        var h = this,
            e = 0,
            k = g[0].key.split(b.matrix.keysSeparator),
            c, d, f, j, l, a;
        k.length--;
        j = (k.length > 0 ? k.join(b.matrix.keysSeparator) : b.matrix.grandTotalKey);
        d = (b.isLeftAxis ? j : b.matrix.grandTotalKey);
        f = (b.isLeftAxis ? b.matrix.grandTotalKey : j);
        l = b.matrix.results.get(d, f);
        a = (l ? l.getValue(h.dimensionId) : 0);
        for (c = 0; c < g.length; c++) {
            e += g[c]["tempVar"];
            if ((e * 100 / a) >= h.value) {
                break
            }
        }
        return Ext.Array.slice(g, c + 1)
    },
    sortItemsByGrandTotal: function(d, b) {
        var e = this,
            g, f, a, c;
        for (c = 0; c < b.length; c++) {
            g = (d.isLeftAxis ? b[c].key : d.matrix.grandTotalKey);
            f = (d.isLeftAxis ? d.matrix.grandTotalKey : b[c].key);
            a = d.matrix.results.get(g, f);
            b[c]["tempVar"] = (a ? a.getValue(e.dimensionId) : 0)
        }
        Ext.Array.sort(b, function(j, i) {
            var h = d.matrix.naturalSort(j.tempVar, i.tempVar);
            if (h < 0 && e.topOrder === "top") {
                return 1
            }
            if (h > 0 && e.topOrder === "top") {
                return -1
            }
            return h
        })
    }
});


Ext.define("Ext.pivot.dimension.Item", {
    alternateClassName: ["Mz.aggregate.dimension.Item"],
    requires: ["Ext.pivot.MixedCollection", "Ext.pivot.filter.Label", "Ext.pivot.filter.Value"],
    header: "",
    dataIndex: "",
    sortIndex: "",
    width: 100,
    flex: 0,
    align: "left",
    sortable: true,
    direction: "ASC",
    sorterFn: null,
    caseSensitiveSort: true,
    filter: null,
    renderer: null,
    grouperFn: null,
    blankText: "(blank)",
    showZeroAsBlank: false,
    aggregator: "sum",
    isAggregate: false,
    id: "",
    values: null,
    matrix: null,
    constructor: function(a) {
        var c = this,
            b = Ext.pivot.Aggregators;
        c.initialConfig = a || {};
        if (a.isAggregate === true && Ext.isEmpty(a.align)) {
            a.align = "left"
        }
        Ext.apply(c, a || {});
        if (Ext.isEmpty(c.id)) {
            c.id = Ext.id()
        }
        if (c.isAggregate) {
            if (Ext.isEmpty(c.dataIndex) && Ext.isDefined(c.measure)) {
                c.dataIndex = c.measure;
                delete c.measure
            }
            if (Ext.isEmpty(c.aggregator)) {
                c.aggregator = "sum"
            }
            if (Ext.isString(c.aggregator) && Ext.isFunction(b[c.aggregator])) {
                c.aggregatorFn = Ext.bind(b[c.aggregator], b)
            } else {
                if (Ext.isFunction(c.aggregator)) {
                    c.aggregatorFn = c.aggregator
                }
            }
            c.filter = false
        } else {
            if (Ext.isObject(c.filter)) {
                Ext.applyIf(c.filter, {
                    type: "label",
                    parent: c
                });
                c.filter = Ext.Factory.pivotfilter(c.filter)
            } else {
                c.filter = false
            }
        } if (!Ext.isFunction(c.grouperFn)) {
            c.grouperFn = c.defaultGrouperFn
        }
        if (c.sortable && !c.sorterFn) {
            c.sorterFn = c.defaultSorterFn
        }
        if (Ext.isEmpty(c.sortIndex)) {
            c.sortIndex = c.dataIndex
        }
        if (!c.renderer) {
            c.renderer = c.getDefaultFormatRenderer(c.isAggregate ? "0,000.00" : "")
        } else {
            if (Ext.isString(c.renderer)) {
                c.renderer = c.getDefaultFormatRenderer(c.renderer)
            }
        }
        c.values = Ext.create("Ext.pivot.MixedCollection");
        c.values.getKey = function(d) {
            return d.value
        };
        c.callParent(arguments)
    },
    destroy: function() {
        var a = this;
        Ext.destroyMembers(a, "values", "filter");
        a.matrix = a.values = a.filter = null
    },
    serialize: function() {
        var a = this;
        return {
            id: a.id,
            header: a.header,
            dataIndex: a.dataIndex,
            sortIndex: a.sortIndex,
            width: a.width,
            flex: a.flex,
            align: a.align,
            sortable: a.sortable,
            direction: a.direction,
            caseSensitiveSort: a.caseSensitiveSort,
            filter: a.filter ? a.filter.serialize() : null,
            aggregator: Ext.isString(a.aggregator) ? a.aggregator : "sum",
            showZeroAsBlank: a.showZeroAsBlank
        }
    },
    addValue: function(a, b) {
        if (!this.values.getByKey(a)) {
            this.values.add({
                value: a,
                display: b
            })
        }
    },
    getValues: function() {
        return this.values
    },
    getId: function() {
        return this.id
    },
    defaultSorterFn: function(f, e) {
        var d = this,
            c = f.sortValue,
            b = e.sortValue,
            a;
        if (c instanceof Date) {
            c = c.getTime()
        }
        if (b instanceof Date) {
            b = b.getTime()
        }
        if (!d.caseSensitiveSort) {
            c = String(c).toUpperCase();
            b = String(b).toUpperCase()
        }
        a = Ext.pivot.matrix.Base.prototype.naturalSort(c, b);
        if (a < 0 && d.direction === "DESC") {
            return 1
        }
        if (a > 0 && d.direction === "DESC") {
            return -1
        }
        return a
    },
    getDefaultFormatRenderer: function(b) {
        var a = this;
        return function(d) {
            var c;
            if (Ext.isEmpty(b)) {
                return d
            }
            if (Ext.isFunction(b)) {
                return b.apply(a, arguments)
            }
            if (!Ext.isNumber(d)) {
                return d
            }
            if (a.isAggregate && d === 0 && a.showZeroAsBlank) {
                return ""
            }
            c = (d >= 0);
            d = Math.abs(d);
            d = Ext.util.Format.number(d, b);
            return c ? d : "-" + d
        }
    },
    defaultGrouperFn: function(a) {
        return a.get(this.dataIndex)
    }
});


Ext.define("Ext.pivot.axis.Item", {
    alternateClassName: ["Mz.aggregate.axis.Item"],
    level: 0,
    key: "",
    value: "",
    sortValue: "",
    name: "",
    dimensionId: "",
    dimension: null,
    children: null,
    record: null,
    axis: null,
    data: null,
    expanded: false,
    constructor: function(a) {
        var b = this;
        Ext.apply(b, a || {});
        if (Ext.isEmpty(b.sortValue)) {
            b.sortValue = b.value
        }
        b.callParent(arguments)
    },
    destroy: function() {
        var a = this;
        Ext.destroy(a.children);
        a.axis = a.data = a.dimension = a.record = a.children = null;
        a.callParent(arguments)
    },
    getTextTotal: function() {
        var b = this,
            a = Ext.XTemplate.getTpl(b.axis.matrix, "textTotalTpl");
        return a.apply({
            groupField: b.dimension.dataIndex,
            columnName: b.dimension.dataIndex,
            name: b.name,
            rows: b.children || []
        })
    },
    expand: function(a) {
        var b = this;
        b.expanded = true;
        if (a === true) {
            b.expandCollapseChildrenTree(b, true)
        }
        b.axis.matrix.fireEvent("groupexpand", b.axis.matrix, (b.axis.isLeftAxis ? "row" : "col"), b)
    },
    collapse: function(a) {
        var b = this;
        b.expanded = false;
        if (a === true) {
            b.expandCollapseChildrenTree(b, false)
        }
        b.axis.matrix.fireEvent("groupcollapse", b.axis.matrix, (b.axis.isLeftAxis ? "row" : "col"), b)
    },
    expandCollapseChildrenTree: function(c, d) {
        var b = this,
            a;
        c.expanded = d;
        if (Ext.isArray(b.children)) {
            for (a = 0; a < b.children.length; a++) {
                b.expandCollapseChildrenTree(b.children[a], d)
            }
        }
    }
});


Ext.define("Ext.pivot.axis.Base", {
    alternateClassName: ["Mz.aggregate.axis.Abstract"],
    alias: "pivotaxis.base",
    mixins: ["Ext.mixin.Factoryable"],
    requires: ["Ext.pivot.MixedCollection", "Ext.pivot.dimension.Item", "Ext.pivot.axis.Item"],
    dimensions: null,
    matrix: null,
    items: null,
    tree: null,
    levels: 0,
    isLeftAxis: false,
    constructor: function(a) {
        var c = this,
            b, d;
        if (!a || !a.matrix) {
            Ext.log("Wrong initialization of the axis!");
            return
        }
        c.isLeftAxis = a.isLeftAxis || c.isLeftAxis;
        c.matrix = a.matrix;
        c.tree = [];
        c.dimensions = Ext.create("Ext.pivot.MixedCollection");
        c.dimensions.getKey = function(e) {
            return e.getId()
        };
        c.items = Ext.create("Ext.pivot.MixedCollection");
        c.items.getKey = function(e) {
            return e.key
        };
        Ext.Array.each(Ext.Array.from(a.dimensions || []), c.addDimension, c)
    },
    destroy: function() {
        var a = this;
        Ext.destroyMembers(a, "dimensions", "items", "tree");
        a.matrix = a.dimensions = a.items = a.tree = null
    },
    addDimension: function(a) {
        if (a) {
            this.dimensions.add(Ext.create("Ext.pivot.dimension.Item", Ext.apply({
                matrix: this.matrix
            }, a)))
        }
    },
    addItem: function(b) {
        var a = this;
        if (!Ext.isObject(b) || Ext.isEmpty(b.key) || Ext.isEmpty(b.value) || Ext.isEmpty(b.dimensionId)) {
            return false
        }
        b.key = String(b.key);
        b.dimension = a.dimensions.getByKey(b.dimensionId);
        b.name = b.name || b.dimension.renderer(b.value);
        b.dimension.addValue(b.value, b.name);
        b.axis = a;
        if (!a.items.getByKey(b.key) && b.dimension) {
            a.items.add(Ext.create("Ext.pivot.axis.Item", b));
            return true
        }
        return false
    },
    clear: function() {
        this.items.clear();
        this.tree = null
    },
    getTree: function() {
        if (!this.tree) {
            this.buildTree()
        }
        return this.tree
    },
    findTreeElement: function(c, d) {
        var a = arguments[2] || this.tree || [],
            f = arguments[3] || 1,
            e = null;
        var b = Ext.Array.filter(a, function(i, g, h) {
            return Ext.isDate(d) ? Ext.Date.isEqual(i[c], d) : i[c] === d
        }, this);
        if (b.length > 0) {
            return {
                level: f,
                node: b[0]
            }
        }
        Ext.Array.each(a, function(i, g, h) {
            if (i.children) {
                e = this.findTreeElement(c, d, i.children, f + 1);
                if (e) {
                    return false
                }
            }
        }, this);
        return e
    },
    buildTree: function() {
        var a = this;
        a.tree = [];
        a.items.each(a.addItemToTree, a);
        a.sortTree()
    },
    addItemToTree: function(e) {
        var d = this,
            c = String(e.key).split(d.matrix.keysSeparator),
            a = "",
            b;
        c = Ext.Array.slice(c, 0, c.length - 1);
        a = c.join(d.matrix.keysSeparator);
        b = d.findTreeElement("key", a);
        if (b) {
            e.level = b.level;
            e.data = Ext.clone(b.node.data || {});
            b.node.children = b.node.children || [];
            b.node.children.push(e)
        } else {
            e.level = 0;
            e.data = {};
            d.tree.push(e)
        }
        e.data[e.dimension.getId()] = e.name;
        d.levels = Math.max(d.levels, e.level)
    },
    sortTree: function() {
        var a = arguments[0] || this.tree,
            b;
        if (a.length > 0) {
            b = a[0].dimension
        }
        if (b && b.sortable === true) {
            Ext.Array.sort(a, function(d, c) {
                return b.sorterFn(d, c)
            })
        }
        Ext.Array.each(a, function(c) {
            if (c.children) {
                this.sortTree(c.children)
            }
        }, this)
    },
    sortTreeByField: function(e, d) {
        var b = this,
            a = false,
            c;
        if (e == b.matrix.compactViewKey) {
            a = b.sortTreeByDimension(b.tree, b.dimensions.getRange(), d);
            b.dimensions.each(function(f) {
                f.direction = d
            })
        } else {
            d = d || "ASC";
            c = b.dimensions.getByKey(e);
            if (c) {
                a = b.sortTreeByDimension(b.tree, c, d);
                c.direction = d
            } else {
                a = b.sortTreeByRecords(b.tree, e, d)
            }
        }
        return a
    },
    sortTreeByDimension: function(j, c, g) {
        var f = false,
            a = Ext.Array.from(c),
            b, e, d, h;
        j = j || [];
        e = j.length;
        if (e > 0) {
            b = j[0].dimension
        }
        if (Ext.Array.indexOf(a, b) >= 0) {
            if (b.sortable) {
                h = b.direction;
                b.direction = g;
                Ext.Array.sort(j, Ext.bind(b.sorterFn, b));
                b.direction = h
            }
            f = b.sortable
        }
        for (d = 0; d < e; d++) {
            f = this.sortTreeByDimension(j[d].children, c, g) || f
        }
        return f
    },
    sortTreeByRecords: function(b, e, d) {
        var c, a;
        b = b || [];
        a = b.length;
        if (a <= 0) {
            return false
        }
        if (b[0].record) {
            this.sortTreeRecords(b, e, d)
        } else {
            this.sortTreeLeaves(b, e, d)
        }
        for (c = 0; c < a; c++) {
            this.sortTreeByRecords(b[c].children, e, d)
        }
        return true
    },
    sortTreeRecords: function(a, d, c) {
        var b = this.matrix.naturalSort;
        c = c || "ASC";
        Ext.Array.sort(a || [], function(g, f) {
            var e, i = g.record,
                h = f.record;
            if (!(i && i.isModel && h && h.isModel)) {
                return 0
            }
            e = b(i.get(d) || "", h.get(d) || "");
            if (e < 0 && c === "DESC") {
                return 1
            }
            if (e > 0 && c === "DESC") {
                return -1
            }
            return e
        })
    },
    sortTreeLeaves: function(i, d, e) {
        var g = this.matrix.naturalSort,
            b = this.matrix.results,
            h = this.matrix.model,
            f = Ext.Array.indexOf(Ext.Array.pluck(h, "name"), d),
            a, c;
        if (f < 0) {
            return false
        }
        a = h[f]["col"];
        c = h[f]["agg"];
        e = e || "ASC";
        Ext.Array.sort(i || [], function(l, k) {
            var j, n, m;
            n = b.get(l.key, a);
            if (n) {
                n = n.getValue(c)
            } else {
                n = 0
            }
            m = b.get(k.key, a);
            if (m) {
                m = m.getValue(c)
            } else {
                m = 0
            }
            j = g(n, m);
            if (j < 0 && e === "DESC") {
                return 1
            }
            if (j > 0 && e === "DESC") {
                return -1
            }
            return j
        })
    }
});


Ext.define("Ext.pivot.result.Base", {
    alias: "pivotresult.base",
    mixins: ["Ext.mixin.Factoryable"],
    leftKey: "",
    topKey: "",
    dirty: false,
    values: null,
    matrix: null,
    constructor: function(a) {
        var b = this;
        Ext.apply(b, a || {});
        b.values = {};
        return b.callParent(arguments)
    },
    destroy: function() {
        var a = this;
        a.matrix = a.values = null;
        a.leftAxisItem = a.topAxisItem = null;
        return a.callParent(arguments)
    },
    calculate: Ext.emptyFn,
    calculateByFn: Ext.emptyFn,
    addValue: function(b, a) {
        this.values[b] = a
    },
    getValue: function(a) {
        return this.values[a]
    },
    getLeftAxisItem: function() {
        return this.matrix.leftAxis.items.getByKey(this.leftKey)
    },
    getTopAxisItem: function() {
        return this.matrix.topAxis.items.getByKey(this.topKey)
    }
});


Ext.define("Ext.pivot.result.Collection", {
    alternateClassName: ["Mz.aggregate.matrix.Results"],
    requires: ["Ext.pivot.MixedCollection", "Ext.pivot.result.Base"],
    resultType: "base",
    items: null,
    matrix: null,
    constructor: function(a) {
        var b = this;
        Ext.apply(b, a || {});
        b.items = Ext.create("Ext.pivot.MixedCollection");
        b.items.getKey = function(c) {
            return c.leftKey + "/" + c.topKey
        };
        return b.callParent(arguments)
    },
    destroy: function() {
        var a = this;
        Ext.destroy(a.items);
        a.matrix = a.items = null;
        a.callParent(arguments)
    },
    clear: function() {
        this.items.clear()
    },
    add: function(c, a) {
        var b = this.get(c, a);
        if (!b) {
            b = this.items.add(Ext.Factory.pivotresult({
                type: this.resultType,
                leftKey: c,
                topKey: a,
                matrix: this.matrix
            }))
        }
        return b
    },
    get: function(b, a) {
        return this.items.getByKey(b + "/" + a)
    },
    getByLeftKey: function(b) {
        var a = this.items.filterBy(function(e, c) {
            var d = String(c).split("/");
            return (b == d[0])
        });
        return a.getRange()
    },
    getByTopKey: function(b) {
        var a = this.items.filterBy(function(e, c) {
            var d = String(c).split("/");
            return (d.length > 1 && b == d[1])
        });
        return a.getRange()
    },
    calculate: function() {
        this.items.each(function(a) {
            a.calculate()
        })
    }
});


Ext.define("Ext.pivot.matrix.Base", {
    alternateClassName: ["Mz.aggregate.matrix.Abstract"],
    extend: "Ext.util.Observable",
    alias: "pivotmatrix.base",
    mixins: ["Ext.mixin.Factoryable"],
    requires: ["Ext.util.DelayedTask", "Ext.data.ArrayStore", "Ext.XTemplate", "Ext.pivot.Aggregators", "Ext.pivot.MixedCollection", "Ext.pivot.axis.Base", "Ext.pivot.dimension.Item", "Ext.pivot.result.Collection"],
    resultType: "base",
    leftAxisType: "base",
    topAxisType: "base",
    textRowLabels: "Row labels",
    textTotalTpl: "Total ({name})",
    textGrandTotalTpl: "Grand total",
    keysSeparator: "#_#",
    grandTotalKey: "grandtotal",
    compactViewKey: "_compactview_",
    viewLayoutType: "outline",
    rowSubTotalsPosition: "first",
    rowGrandTotalsPosition: "first",
    colSubTotalsPosition: "first",
    colGrandTotalsPosition: "first",
    showZeroAsBlank: false,
    leftAxis: null,
    topAxis: null,
    aggregate: null,
    results: null,
    pivotStore: null,
    isDestroyed: false,
    constructor: function(b) {
        var a = this.callParent(arguments);
        this.initialize(true, b);
        return a
    },
    destroy: function() {
        var a = this;
        a.delayedTask.cancel();
        a.delayedTask = null;
        if (Ext.isFunction(a.onDestroy)) {
            a.onDestroy()
        }
        Ext.destroy(a.results, a.leftAxis, a.topAxis, a.aggregate, a.pivotStore);
        a.results = a.leftAxis = a.topAxis = a.aggregate = a.pivotStore = null;
        if (Ext.isArray(a.columns)) {
            a.columns.length = 0
        }
        if (Ext.isArray(a.model)) {
            a.model.length = 0
        }
        if (Ext.isArray(a.totals)) {
            a.totals.length = 0
        }
        a.columns = a.model = a.totals = a.keysMap = null;
        a.isDestroyed = true;
        a.callParent(arguments)
    },
    getKey: function(b) {
        var a = this;
        a.keysMap = a.keysMap || {};
        if (!Ext.isDefined(a.keysMap[b])) {
            a.keysMap[b] = Ext.id()
        }
        return a.keysMap[b]
    },
    naturalSort: (function() {
        var d = /(^([+\-]?(?:\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[\da-fA-F]+$|\d+)/g,
            f = /^\s+|\s+$/g,
            c = /\s+/g,
            b = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
            e = /^0x[0-9a-f]+$/i,
            a = /^0/,
            g = function(i, h) {
                i = i || "";
                return (!i.match(a) || h == 1) && parseFloat(i) || i.replace(c, " ").replace(f, "") || 0
            };
        return function(q, o) {
            var r = String(q instanceof Date ? q.getTime() : (q || "")).replace(f, ""),
                n = String(o instanceof Date ? o.getTime() : (o || "")).replace(f, ""),
                t = r.replace(d, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0"),
                l = n.replace(d, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0"),
                j = parseInt(r.match(e), 16) || (t.length !== 1 && Date.parse(r)),
                u = parseInt(n.match(e), 16) || j && n.match(b) && Date.parse(n) || null,
                s, m;
            if (u) {
                if (j < u) {
                    return -1
                } else {
                    if (j > u) {
                        return 1
                    }
                }
            }
            for (var p = 0, i = t.length, k = l.length, h = Math.max(i, k); p < h; p++) {
                s = g(t[p], i);
                m = g(l[p], k);
                if (isNaN(s) !== isNaN(m)) {
                    return (isNaN(s)) ? 1 : -1
                } else {
                    if (typeof s !== typeof m) {
                        s += "";
                        m += ""
                    }
                } if (s < m) {
                    return -1
                }
                if (s > m) {
                    return 1
                }
            }
            return 0
        }
    }()),
    initialize: function(e, a) {
        var d = this,
            c = ["viewLayoutType", "rowSubTotalsPosition", "rowGrandTotalsPosition", "colSubTotalsPosition", "colGrandTotalsPosition", "showZeroAsBlank"],
            b;
        d.initResults();
        d.initAggregates(a.aggregate || []);
        d.initAxis(a.leftAxis || [], a.topAxis || []);
        for (b = 0; b < c.length; b++) {
            if (a.hasOwnProperty(c[b])) {
                d[c[b]] = a[c[b]]
            }
        }
        d.totals = [];
        d.keysMap = null;
        if (e) {
            d.pivotStore = Ext.create("Ext.data.ArrayStore", {
                autoDestroy: false,
                fields: []
            });
            d.delayedTask = new Ext.util.DelayedTask(d.startProcess, d);
            if (Ext.isFunction(d.onInitialize)) {
                d.onInitialize()
            }
        }
    },
    onInitialize: Ext.emptyFn,
    onDestroy: Ext.emptyFn,
    reconfigure: function(a) {
        var b = this,
            a = Ext.clone(a || {});
        b.initialize(false, a);
        b.clearData();
        if (Ext.isFunction(b.onReconfigure)) {
            b.onReconfigure(a)
        }
        b.delayedTask.delay(5)
    },
    onReconfigure: Ext.emptyFn,
    initResults: function() {
        Ext.destroy(this.results);
        this.results = Ext.create("Ext.pivot.result.Collection", {
            resultType: this.resultType,
            matrix: this
        })
    },
    initAggregates: function(d) {
        var c = this,
            a, b;
        Ext.destroy(c.aggregate);
        c.aggregate = Ext.create("Ext.pivot.MixedCollection");
        c.aggregate.getKey = function(e) {
            return e.getId()
        };
        if (Ext.isEmpty(d)) {
            return
        }
        d = Ext.Array.from(d);
        for (a = 0; a < d.length; a++) {
            b = d[a];
            Ext.applyIf(b, {
                isAggregate: true,
                align: "right",
                showZeroAsBlank: c.showZeroAsBlank
            });
            c.aggregate.add(Ext.create("Ext.pivot.dimension.Item", b))
        }
    },
    initAxis: function(c, a) {
        var b = this;
        c = Ext.Array.from(c || []);
        a = Ext.Array.from(a || []);
        Ext.destroy(b.leftAxis);
        b.leftAxis = Ext.Factory.pivotaxis({
            type: b.leftAxisType,
            matrix: b,
            dimensions: c,
            isLeftAxis: true
        });
        Ext.destroy(b.topAxis);
        b.topAxis = Ext.Factory.pivotaxis({
            type: b.topAxisType,
            matrix: b,
            dimensions: a,
            isLeftAxis: false
        })
    },
    clearData: function() {
        var a = this;
        a.fireEvent("cleardata", a);
        a.leftAxis.clear();
        a.topAxis.clear();
        a.results.clear();
        if (Ext.isArray(a.columns)) {
            a.columns.length = 0
        }
        if (Ext.isArray(a.model)) {
            a.model.length = 0
        }
        a.totals = [];
        a.keysMap = null;
        if (a.pivotStore) {
            a.pivotStore.removeAll(true)
        }
    },
    startProcess: Ext.emptyFn,
    endProcess: function() {
        var a = this;
        a.leftAxis.getTree();
        a.topAxis.getTree();
        a.buildModelAndColumns();
        a.buildPivotStore();
        if (Ext.isFunction(a.onBuildStore)) {
            a.onBuildStore(a.pivotStore)
        }
        a.fireEvent("storebuilt", a, a.pivotStore);
        a.fireEvent("done")
    },
    onBuildModel: Ext.emptyFn,
    onBuildColumns: Ext.emptyFn,
    onBuildRecord: Ext.emptyFn,
    onBuildTotals: Ext.emptyFn,
    onBuildStore: Ext.emptyFn,
    buildModelAndColumns: function() {
        var a = this;
        a.model = [{
            name: "id",
            type: "string"
        }];
        a.buildColumnHeaders(false)
    },
    buildColumnHeaders: function(a) {
        var b = this;
        b.internalCounter = 0;
        b.columns = [];
        if (b.viewLayoutType == "compact") {
            b.generateCompactLeftAxis(a)
        } else {
            b.leftAxis.dimensions.each(function(c) {
                this.parseLeftAxisDimension(c, a)
            }, b)
        } if (b.colGrandTotalsPosition == "first") {
            b.columns.push(b.parseAggregateForColumn(null, {
                text: b.textGrandTotalTpl,
                grandTotal: true
            }, a))
        }
        Ext.Array.each(b.topAxis.getTree(), function(c) {
            this.parseTopAxisItem(c, a)
        }, b);
        if (b.colGrandTotalsPosition == "last") {
            b.columns.push(b.parseAggregateForColumn(null, {
                text: b.textGrandTotalTpl,
                grandTotal: true
            }, a))
        }
        if (!a) {
            if (Ext.isFunction(b.onBuildModel)) {
                b.onBuildModel(b.model)
            }
            b.fireEvent("modelbuilt", b, b.model)
        }
        if (Ext.isFunction(b.onBuildColumns)) {
            b.onBuildColumns(b.columns)
        }
        b.fireEvent("columnsbuilt", b, b.columns)
    },
    parseLeftAxisDimension: function(b, a) {
        if (!a) {
            this.model.push({
                name: b.getId(),
                type: "string"
            })
        }
        this.columns.push({
            dataIndex: b.getId(),
            text: b.header,
            dimension: b,
            leftAxis: true
        })
    },
    generateCompactLeftAxis: function(a) {
        var b = this;
        if (!a) {
            b.model.push({
                name: b.compactViewKey,
                type: "string"
            })
        }
        b.columns.push({
            dataIndex: b.compactViewKey,
            text: b.textRowLabels,
            leftAxis: true,
            width: 200
        })
    },
    parseTopAxisItem: function(f, a) {
        var e = this,
            c = [],
            b = [],
            h, d, g = false;
        if (!f.children) {
            c = e.parseAggregateForColumn(f, null, a);
            if (f.level === 0) {
                e.columns.push(c)
            } else {
                return c
            }
        } else {
            if (e.colSubTotalsPosition == "first") {
                d = e.addColSummary(f, a, true);
                if (d) {
                    b.push(d)
                }
            }
            Ext.Array.each(f.children, function(j) {
                var i = e.parseTopAxisItem(j, a);
                if (Ext.isArray(i)) {
                    c = Ext.Array.merge(c, i)
                } else {
                    c.push(i)
                }
            });
            if (f.expanded || !a) {
                h = {
                    text: f.name,
                    columns: c,
                    key: f.key,
                    xcollapsible: f.expanded,
                    xexpanded: f.expanded,
                    xexpandable: true
                };
                if (f.level === 0) {
                    e.columns.push(h)
                }
                b.push(h)
            }
            if (e.colSubTotalsPosition == "last") {
                d = e.addColSummary(f, a, true);
                if (d) {
                    b.push(d)
                }
            }
            if (e.colSubTotalsPosition == "none") {
                d = e.addColSummary(f, a, false);
                if (d) {
                    b.push(d)
                }
            }
            return b
        }
    },
    addColSummary: function(d, a, f) {
        var c = this,
            b, e = false;
        b = c.parseAggregateForColumn(d, {
            text: d.expanded ? d.getTextTotal() : d.name,
            subTotal: true
        }, a);
        if (f) {
            e = true
        } else {
            e = !d.expanded
        } if (e) {
            if (d.level === 0) {
                c.columns.push(b)
            }
            Ext.apply(b, {
                key: d.key,
                xcollapsible: !d.expanded,
                xexpanded: d.expanded,
                xexpandable: !d.expanded
            });
            return b
        }
    },
    parseAggregateForColumn: function(f, b, a) {
        var e = this,
            c = [],
            d = {};
        e.aggregate.each(function(g) {
            e.internalCounter++;
            if (!a) {
                e.model.push({
                    name: "c" + e.internalCounter,
                    type: "auto",
                    defaultValue: undefined,
                    useNull: true,
                    col: f ? f.key : e.grandTotalKey,
                    agg: g.getId()
                })
            }
            c.push({
                dataIndex: "c" + e.internalCounter,
                text: g.header,
                topAxis: true,
                subTotal: (b ? b.subTotal === true : false),
                grandTotal: (b ? b.grandTotal === true : false),
                dimension: g
            })
        });
        if (c.length == 0 && e.aggregate.getCount() == 0) {
            e.internalCounter++;
            d = Ext.apply({
                text: f ? f.name : "",
                dataIndex: "c" + e.internalCounter
            }, b || {})
        } else {
            if (c.length == 1) {
                d = Ext.applyIf({
                    text: f ? f.name : ""
                }, c[0]);
                Ext.apply(d, b || {});
                if (b && b.grandTotal && e.aggregate.getCount() == 1) {
                    d.text = e.aggregate.getAt(0).header || b.text
                }
            } else {
                d = Ext.apply({
                    text: f ? f.name : "",
                    columns: c
                }, b || {})
            }
        }
        return d
    },
    buildPivotStore: function() {
        var a = this;
        if (Ext.isFunction(a.pivotStore.model.setFields)) {
            a.pivotStore.model.setFields(a.model)
        } else {
            a.pivotStore.model.replaceFields(a.model, true)
        }
        a.pivotStore.removeAll(true);
        Ext.Array.each(a.leftAxis.getTree(), a.addRecordToPivotStore, a);
        a.addGrandTotalsToPivotStore()
    },
    addGrandTotalsToPivotStore: function() {
        var b = this,
            a = [];
        a.push({
            title: b.textGrandTotalTpl,
            values: b.preparePivotStoreRecordData({
                key: b.grandTotalKey
            })
        });
        if (Ext.isFunction(b.onBuildTotals)) {
            b.onBuildTotals(a)
        }
        b.fireEvent("buildtotals", b, a);
        Ext.Array.forEach(a, function(c) {
            if (Ext.isObject(c) && Ext.isObject(c.values)) {
                b.totals.push({
                    title: c.title || "",
                    record: b.pivotStore.add(c.values)[0]
                })
            }
        })
    },
    addRecordToPivotStore: function(c) {
        var b = this,
            a;
        if (!c.children) {
            a = b.pivotStore.add(b.preparePivotStoreRecordData(c));
            c.record = a[0];
            if (Ext.isFunction(b.onBuildRecord)) {
                b.onBuildRecord(a[0])
            }
            b.fireEvent("recordbuilt", b, a[0])
        } else {
            Ext.Array.each(c.children, function(d) {
                b.addRecordToPivotStore(d)
            })
        }
    },
    preparePivotStoreRecordData: function(c) {
        var a = this,
            b = {};
        b.id = c.key;
        Ext.apply(b, c.data || {});
        Ext.Array.each(a.model, function(e) {
            var d;
            if (e.col && e.agg) {
                d = a.results.get(c.key, e.col);
                if (d) {
                    b[e.name] = d.getValue(e.agg)
                }
            }
        });
        if (a.viewLayoutType == "compact") {
            b[a.compactViewKey] = c.name
        }
        return b
    },
    getColumns: function() {
        return this.model
    },
    getColumnHeaders: function() {
        var a = this;
        if (!a.model) {
            a.buildModelAndColumns()
        } else {
            a.buildColumnHeaders(true)
        }
        return a.columns
    },
    isGroupRow: function(a) {
        var b = this.leftAxis.findTreeElement("key", a);
        if (!b) {
            return false
        }
        return (b.node.children && b.nodel.children.length == 0) ? 0 : b.level
    },
    isGroupCol: function(a) {
        var b = this.topAxis.findTreeElement("key", a);
        if (!b) {
            return false
        }
        return (b.node.children && b.node.children.length == 0) ? 0 : b.level
    },
    deprecated: {
        "6.0": {
            properties: {
                mztype: "type",
                mztypeLeftAxis: "leftAxisType",
                mztypeTopAxis: "topAxisType"
            }
        }
    }
});


Ext.define("Ext.pivot.axis.Local", {
    alternateClassName: ["Mz.aggregate.axis.Local"],
    extend: "Ext.pivot.axis.Base",
    alias: "pivotaxis.local",
    processRecord: function(d) {
        var f = this,
            e = [],
            g = "",
            j = true,
            h = f.dimensions.getCount(),
            a, k, b, c;
        for (c = 0; c < h; c++) {
            b = f.dimensions.getAt(c);
            a = b.grouperFn(d);
            k = g ? g + f.matrix.keysSeparator : "";
            a = Ext.isEmpty(a) ? b.blankText : a;
            k += f.matrix.getKey(a);
            if (b.filter instanceof Ext.pivot.filter.Label) {
                j = b.filter.isMatch(a)
            }
            if (!j) {
                break
            }
            e.push({
                value: a,
                sortValue: d.get(b.sortIndex),
                key: k,
                dimensionId: b.getId()
            });
            g = k
        }
        if (j) {
            return e
        } else {
            return null
        }
    },
    buildTree: function() {
        this.callParent(arguments);
        this.filterTree()
    },
    filterTree: function() {
        var d = this,
            c = d.dimensions.getCount(),
            a = false,
            b;
        for (b = 0; b < c; b++) {
            a = a || (d.dimensions.getAt(b).filter instanceof Ext.pivot.filter.Value)
        }
        if (!a) {
            return
        }
        d.matrix.filterApplied = true;
        d.filterTreeItems(d.tree)
    },
    filterTreeItems: function(a) {
        var d = this,
            c, b, e;
        if (!a || !Ext.isArray(a) || a.length <= 0) {
            return
        }
        c = a[0].dimension.filter;
        if (c && (c instanceof Ext.pivot.filter.Value)) {
            if (c.isTopFilter) {
                e = c.applyFilter(d, a) || []
            } else {
                e = Ext.Array.filter(a, d.canRemoveItem, d)
            }
            d.removeRecordsFromResults(e);
            d.removeItemsFromArray(a, e);
            for (b = 0; b < e.length; b++) {
                d.removeTreeChildren(e[b])
            }
        }
        for (b = 0; b < a.length; b++) {
            if (a[b].children) {
                d.filterTreeItems(a[b].children);
                if (a[b].children.length === 0) {
                    d.items.remove(a[b]);
                    Ext.Array.erase(a, b, 1);
                    b--
                }
            }
        }
    },
    removeTreeChildren: function(c) {
        var b, a;
        if (c.children) {
            a = c.children.length;
            for (b = 0; b < a; b++) {
                this.removeTreeChildren(c.children[b])
            }
        }
        this.items.remove(c)
    },
    canRemoveItem: function(d) {
        var c = this,
            f = (c.isLeftAxis ? d.key : c.matrix.grandTotalKey),
            e = (c.isLeftAxis ? c.matrix.grandTotalKey : d.key),
            a = c.matrix.results.get(f, e),
            b = d.dimension.filter;
        return (a ? !b.isMatch(a.getValue(b.dimensionId)) : false)
    },
    removeItemsFromArray: function(c, a) {
        for (var b = 0; b < c.length; b++) {
            if (Ext.Array.indexOf(a, c[b]) >= 0) {
                Ext.Array.erase(c, b, 1);
                b--
            }
        }
    },
    removeRecordsFromResults: function(a) {
        for (var b = 0; b < a.length; b++) {
            this.removeRecordsByItem(a[b])
        }
    },
    removeRecordsByItem: function(g) {
        var f = this,
            e, c, b, a, d;
        if (g.children) {
            f.removeRecordsFromResults(g.children)
        }
        if (f.isLeftAxis) {
            d = f.matrix.results.get(g.key, f.matrix.grandTotalKey);
            b = f.matrix.results.getByLeftKey(f.matrix.grandTotalKey)
        } else {
            d = f.matrix.results.get(f.matrix.grandTotalKey, g.key);
            b = f.matrix.results.getByTopKey(f.matrix.grandTotalKey)
        } if (!d) {
            return
        }
        for (c = 0; c < b.length; c++) {
            f.removeItemsFromArray(b[c].records, d.records)
        }
        e = g.key.split(f.matrix.keysSeparator);
        e.length = e.length - 1;
        while (e.length > 0) {
            if (f.isLeftAxis) {
                b = f.matrix.results.getByLeftKey(e.join(f.matrix.keysSeparator))
            } else {
                b = f.matrix.results.getByTopKey(e.join(f.matrix.keysSeparator))
            }
            for (c = 0; c < b.length; c++) {
                f.removeItemsFromArray(b[c].records, d.records)
            }
            e.length = e.length - 1
        }
    }
});


Ext.define("Ext.pivot.result.Local", {
    extend: "Ext.pivot.result.Base",
    alias: "pivotresult.local",
    alternateClassName: ["Mz.aggregate.matrix.Result"],
    records: null,
    constructor: function(a) {
        this.records = [];
        return this.callParent(arguments)
    },
    destroy: function() {
        this.records.length = 0;
        this.records = null;
        return this.callParent(arguments)
    },
    calculate: function() {
        var c = this,
            a, d, b = c.matrix.aggregate.getCount();
        for (a = 0; a < b; a++) {
            d = c.matrix.aggregate.getAt(a);
            c.addValue(d.getId(), d.aggregatorFn(c.records, d.dataIndex, c.matrix, c.leftKey, c.topKey))
        }
    },
    calculateByFn: function(d, c, a) {
        var e = this,
            b = a(e.records, c, e.matrix, e.leftKey, e.topKey);
        e.addValue(d, b);
        return b
    },
    addRecord: function(a) {
        this.records.push(a)
    }
});


Ext.define("Ext.pivot.matrix.Local", {
    alternateClassName: ["Mz.aggregate.matrix.Local"],
    extend: "Ext.pivot.matrix.Base",
    alias: "pivotmatrix.local",
    requires: ["Ext.pivot.matrix.Base", "Ext.pivot.axis.Local", "Ext.pivot.result.Local"],
    resultType: "local",
    leftAxisType: "local",
    topAxisType: "local",
    store: null,
    recordsPerJob: 1000,
    timeBetweenJobs: 2,
    onInitialize: function() {
        var a = this;
        a.localDelayedTask = new Ext.util.DelayedTask(a.delayedProcess, a);
        a.newRecordsDelayedTask = new Ext.util.DelayedTask(a.onOriginalStoreAddDelayed, a);
        a.updateRecordsDelayedTask = new Ext.util.DelayedTask(a.onOriginalStoreUpdateDelayed, a);
        a.callParent(arguments)
    },
    onReconfigure: function(c) {
        var d = this,
            a, b;
        if (c.store) {
            b = c.store
        } else {
            if (d.store) {
                if (d.store.isStore && !d.storeListeners) {
                    a = d.store
                } else {
                    b = d.store
                }
            }
        } if (b) {
            a = Ext.getStore(b || "");
            if (Ext.isEmpty(a) && Ext.isString(b)) {
                a = Ext.create(b)
            }
        }
        if (a && a.isStore) {
            Ext.destroy(d.storeListeners);
            if (d.store && d.store.autoDestroy && a != d.store) {
                Ext.destroy(d.store)
            }
            d.store = a;
            d.storeListeners = d.store.on({
                refresh: d.startProcess,
                beforeload: d.onOriginalStoreBeforeLoad,
                add: d.onOriginalStoreAdd,
                update: d.onOriginalStoreUpdate,
                remove: d.onOriginalStoreRemove,
                clear: d.startProcess,
                scope: d,
                destroyable: true
            })
        }
        d.callParent(arguments)
    },
    onDestroy: function() {
        var a = this;
        a.localDelayedTask.cancel();
        a.localDelayedTask = null;
        a.newRecordsDelayedTask.cancel();
        a.newRecordsDelayedTask = null;
        a.updateRecordsDelayedTask.cancel();
        a.updateRecordsDelayedTask = null;
        if (Ext.isArray(a.records)) {
            a.records.length = 0
        }
        a.records = null;
        Ext.destroy(a.storeListeners);
        if (a.store && a.store.isStore && a.store.autoDestroy) {
            Ext.destroy(a.store)
        }
        a.store = a.storeListeners = null;
        a.callParent(arguments)
    },
    onOriginalStoreBeforeLoad: function(a) {
        this.fireEvent("start", this)
    },
    onOriginalStoreAdd: function(b, a) {
        var c = this;
        c.newRecords = c.newRecords || [];
        c.newRecords = Ext.Array.merge(c.newRecords, Ext.Array.from(a));
        c.newRecordsDelayedTask.delay(100)
    },
    onOriginalStoreAddDelayed: function() {
        var c = this,
            b, a;
        a = Ext.Array.from(c.newRecords || []);
        for (b = 0; b < a.length; b++) {
            c.processRecord(a[b], b, a.length)
        }
        c.newRecords = [];
        c.leftAxis.tree = null;
        c.leftAxis.buildTree();
        c.topAxis.tree = null;
        c.topAxis.buildTree();
        c.recalculateResults(c.store, a)
    },
    onOriginalStoreUpdate: function(b, a) {
        var c = this;
        c.updateRecords = c.updateRecords || [];
        c.updateRecords = Ext.Array.merge(c.updateRecords, Ext.Array.from(a));
        c.updateRecordsDelayedTask.delay(100)
    },
    onOriginalStoreUpdateDelayed: function() {
        var a = this;
        a.recalculateResults(a.store, a.updateRecords);
        a.updateRecords.length = 0
    },
    onOriginalStoreRemove: function(c, a, d, b) {
        if (b) {
            return
        }
        this.startProcess()
    },
    isReallyDirty: function(b, a) {
        var c = true;
        a = Ext.Array.from(a);
        this.leftAxis.dimensions.each(function(d) {
            Ext.Array.forEach(a, function(e) {
                c = (e && e.isModel && d.values.containsKey(e.get(d.dataIndex)));
                return c
            });
            return c
        });
        return !c
    },
    recalculateResults: function(b, a) {
        var c = this;
        if (c.isReallyDirty(b, a)) {
            c.startProcess();
            return
        }
        c.fireEvent("beforeupdate", c);
        c.results.calculate();
        Ext.Array.each(c.leftAxis.getTree(), c.updateRecordToPivotStore, c);
        c.updateGrandTotalsToPivotStore();
        c.fireEvent("afterupdate", c)
    },
    updateGrandTotalsToPivotStore: function() {
        var c = this,
            b = [],
            a;
        if (c.totals.length <= 0) {
            return
        }
        b.push({
            title: c.textGrandTotalTpl,
            values: c.preparePivotStoreRecordData({
                key: c.grandTotalKey
            })
        });
        if (Ext.isFunction(c.onBuildTotals)) {
            c.onBuildTotals(b)
        }
        c.fireEvent("buildtotals", c, b);
        if (c.totals.length === b.length) {
            for (a = 0; a < c.totals.length; a++) {
                if (Ext.isObject(b[a]) && Ext.isObject(b[a].values) && (c.totals[a].record instanceof Ext.data.Model)) {
                    delete(b[a].values.id);
                    c.totals[a].record.set(b[a].values)
                }
            }
        }
    },
    updateRecordToPivotStore: function(a) {
        if (!a.children) {
            if (a.record) {
                a.record.set(this.preparePivotStoreRecordData(a))
            }
        } else {
            Ext.Array.each(a.children, function(b) {
                this.updateRecordToPivotStore(b)
            }, this)
        }
    },
    startProcess: function() {
        var a = this;
        if (!a.store || (a.store && !a.store.isStore) || a.isDestroyed) {
            return
        }
        a.clearData();
        a.localDelayedTask.delay(50)
    },
    delayedProcess: function() {
        var a = this;
        a.fireEvent("start", a);
        a.records = a.store.getRange();
        if (a.records.length == 0) {
            a.endProcess();
            return
        }
        a.statusInProgress = false;
        a.processRecords(0)
    },
    processRecords: function(a) {
        var c = this,
            b = a,
            d;
        if (c.isDestroyed) {
            return
        }
        d = c.records.length;
        c.statusInProgress = true;
        while (b < d && b < a + c.recordsPerJob && c.statusInProgress) {
            c.processRecord(c.records[b], b, d);
            b++
        }
        if (b >= d) {
            c.statusInProgress = false;
            c.results.calculate();
            c.leftAxis.buildTree();
            c.topAxis.buildTree();
            if (c.filterApplied) {
                c.results.calculate()
            }
            c.records = null;
            c.endProcess();
            return
        }
        if (c.statusInProgress && d > 0) {
            Ext.defer(c.processRecords, c.timeBetweenJobs, c, [b])
        }
    },
    processRecord: function(e, f, a) {
        var g = this,
            h = g.grandTotalKey,
            k, b, d, c;
        k = g.leftAxis.processRecord(e);
        b = g.topAxis.processRecord(e);
        if (k && b) {
            g.results.add(h, h).addRecord(e);
            for (d = 0; d < b.length; d++) {
                g.topAxis.addItem(b[d]);
                g.results.add(h, b[d].key).addRecord(e)
            }
            for (d = 0; d < k.length; d++) {
                g.leftAxis.addItem(k[d]);
                g.results.add(k[d].key, h).addRecord(e);
                for (c = 0; c < b.length; c++) {
                    g.results.add(k[d].key, b[c].key).addRecord(e)
                }
            }
        }
        g.fireEvent("progress", g, f + 1, a)
    },
    getRecordsByRowGroup: function(d) {
        var c = this.results.getByLeftKey(d),
            e = c.length,
            a = [],
            b;
        for (b = 0; b < e; b++) {
            a = Ext.Array.merge(a, c[b].records || [])
        }
        return a
    },
    getRecordsByColGroup: function(d) {
        var c = this.results.getByTopKey(d),
            e = c.length,
            a = [],
            b;
        for (b = 0; b < e; b++) {
            a = Ext.Array.merge(a, c[b].records || [])
        }
        return a
    },
    getRecordsByGroups: function(c, b) {
        var a = this.results.get(c, b);
        return (a ? a.records || [] : [])
    }
});


Ext.define("Ext.pivot.matrix.Remote", {
    alternateClassName: ["Mz.aggregate.matrix.Remote"],
    extend: "Ext.pivot.matrix.Base",
    alias: "pivotmatrix.remote",
    url: "",
    timeout: 3000,
    onBeforeRequest: Ext.emptyFn,
    onRequestException: Ext.emptyFn,
    onInitialize: function() {
        var a = this;
        a.remoteDelayedTask = new Ext.util.DelayedTask(a.delayedProcess, a);
        a.callParent(arguments)
    },
    startProcess: function() {
        var a = this;
        if (Ext.isEmpty(a.url)) {
            return
        }
        a.clearData();
        a.fireEvent("start", a);
        a.statusInProgress = false;
        a.remoteDelayedTask.delay(5)
    },
    delayedProcess: function() {
        var e = this,
            d = [],
            a = [],
            c = [],
            b, f;
        e.leftAxis.dimensions.each(function(g) {
            d.push(g.serialize())
        });
        e.topAxis.dimensions.each(function(g) {
            a.push(g.serialize())
        });
        e.aggregate.each(function(g) {
            c.push(g.serialize())
        });
        f = {
            keysSeparator: e.keysSeparator,
            grandTotalKey: e.grandTotalKey,
            leftAxis: d,
            topAxis: a,
            aggregate: c
        };
        b = e.fireEvent("beforerequest", e, f);
        if (b !== false) {
            if (Ext.isFunction(e.onBeforeRequest)) {
                b = e.onBeforeRequest(f)
            }
        }
        if (b === false) {
            e.endProcess()
        } else {
            Ext.Ajax.request({
                url: e.url,
                timeout: e.timeout,
                jsonData: f,
                callback: e.processRemoteResults,
                scope: e
            })
        }
    },
    processRemoteResults: function(b, f, a) {
        var d = this,
            c = !f,
            e = Ext.JSON.decode(a.responseText, true);
        if (f) {
            c = (!e || !e.success)
        }
        if (c) {
            d.fireEvent("requestexception", d, a);
            if (Ext.isFunction(d.onRequestException)) {
                d.onRequestException(a)
            }
            d.endProcess();
            return
        }
        Ext.Array.each(Ext.Array.from(e.leftAxis || []), function(g) {
            if (Ext.isObject(g)) {
                d.leftAxis.addItem(g)
            }
        });
        Ext.Array.each(Ext.Array.from(e.topAxis || []), function(g) {
            if (Ext.isObject(g)) {
                d.topAxis.addItem(g)
            }
        });
        Ext.Array.each(Ext.Array.from(e.results || []), function(h) {
            if (Ext.isObject(h)) {
                var g = d.results.add(h.leftKey || "", h.topKey || "");
                Ext.Object.each(h.values || {}, g.addValue, g)
            }
        });
        d.endProcess()
    }
});


Ext.define("Ext.pivot.feature.PivotStore", {
    constructor: function(a) {
        Ext.apply(this, a);
        this.bindStore(a.store)
    },
    destroy: function() {
        var a = this;
        Ext.destroy(a.storeListeners);
        a.store = a.matrix = a.pivotFeature = null;
        a.storeInfo = a.storeListeners = a.store = null;
        a.callParent(arguments)
    },
    bindStore: function(a) {
        var b = this;
        if (b.store) {
            Ext.destroy(b.storeListeners);
            b.store = null
        }
        if (a) {
            b.storeListeners = a.on({
                pivotstoreremodel: b.processStore,
                scope: b,
                destroyable: true
            });
            b.store = a
        }
    },
    processStore: function() {
        if (!this.matrix) {
            return
        }
        var c = this,
            b = c["processGroup" + Ext.String.capitalize(c.matrix.viewLayoutType)],
            a = c.matrix.getColumns(),
            d;
        c.store.model.replaceFields(a, true);
        c.store.removeAll(true);
        c.store.suspendEvents(false);
        c.storeInfo = {};
        if (!Ext.isFunction(b)) {
            b = c.processGroupOutline
        }
        d = Ext.Function.bind(b, c);
        if (c.matrix.rowGrandTotalsPosition == "first") {
            c.processGrandTotal()
        }
        Ext.Array.each(c.matrix.leftAxis.getTree(), function(g, e, f) {
            c.store.add(d({
                group: g,
                previousExpanded: (e > 0 ? f[e - 1].expanded : false)
            }))
        }, c);
        if (c.matrix.rowGrandTotalsPosition == "last") {
            c.processGrandTotal()
        }
        c.store.resumeEvents();
        c.store.fireEvent("refresh", c.store)
    },
    processGroup: function(a) {
        var c = this,
            b = c["processGroup" + Ext.String.capitalize(c.matrix.viewLayoutType)],
            d;
        if (!Ext.isFunction(b)) {
            b = c.processGroupOutline
        }
        d = Ext.Function.bind(b, c);
        return d(a)
    },
    createGridStoreRecord: function(b) {
        var c = this,
            d = c.matrix.preparePivotStoreRecordData(b || {}),
            a;
        d.id = "";
        a = new c.store.model(d);
        if (Ext.isEmpty(b)) {
            Ext.Object.each(d, function(e) {
                if (e != "id") {
                    a.set(e, null)
                }
            });
            a.commit()
        }
        a.isPlaceholder = true;
        return a
    },
    processGrandTotal: function() {
        var a = this,
            b = false,
            c = {
                key: a.matrix.grandTotalKey
            };
        Ext.Array.forEach(a.matrix.totals || [], function(f) {
            var d = f.record,
                e = a.matrix.leftAxis.dimensions.getCount();
            if (!(d instanceof Ext.data.Model)) {
                return
            }
            a.storeInfo[d.internalId] = {
                leftKey: c.key,
                rowStyle: "",
                rowClasses: [a.pivotFeature.gridMaster.clsGrandTotal, a.pivotFeature.summaryDataCls],
                rendererParams: {}
            };
            a.matrix.leftAxis.dimensions.each(function(i, g) {
                var h;
                if (a.matrix.viewLayoutType == "compact" || g === 0) {
                    if (a.matrix.viewLayoutType == "compact") {
                        h = a.matrix.compactViewKey;
                        e = 1
                    } else {
                        h = i.getId()
                    }
                    d.set(h, f.title);
                    d.commit(false, [h]);
                    a.storeInfo[d.internalId].rendererParams[h] = {
                        fn: "groupOutlineRenderer",
                        group: c,
                        colspan: e,
                        hidden: false,
                        subtotalRow: true
                    };
                    b = true
                } else {
                    a.storeInfo[d.internalId].rendererParams[i.getId()] = {
                        fn: "groupOutlineRenderer",
                        group: c,
                        colspan: 0,
                        hidden: b,
                        subtotalRow: true
                    };
                    e--
                }
                a.storeInfo[d.internalId].rendererParams.topaxis = {
                    fn: "topAxisRenderer"
                }
            });
            a.store.add(d)
        })
    },
    processGroupOutline: function(a) {
        var c = this,
            d = a.group,
            b = [];
        if (d.record) {
            c.processRecordOutline({
                results: b,
                group: d
            })
        } else {
            c.processGroupOutlineWithChildren({
                results: b,
                group: d,
                previousExpanded: a.previousExpanded
            })
        }
        return b
    },
    processGroupOutlineWithChildren: function(c) {
        var f = this,
            g = c.group,
            b = c.previousExpanded,
            e = false,
            a, d;
        if (!g.expanded || (g.expanded && f.matrix.rowSubTotalsPosition == "first")) {
            e = true;
            a = f.createGridStoreRecord(g)
        } else {
            if (f.matrix.rowSubTotalsPosition == "last" || f.matrix.rowSubTotalsPosition == "none") {
                a = f.createGridStoreRecord();
                a.set(g.dimension.getId(), g.name)
            }
        }
        a.commit();
        f.processGroupHeaderRecordOutline({
            results: c.results,
            group: g,
            record: a,
            previousExpanded: b,
            hasSummaryData: e
        });
        if (g.expanded) {
            if (g.children) {
                for (d = 0; d < g.children.length; d++) {
                    if (g.children[d]["children"]) {
                        f.processGroupOutlineWithChildren({
                            results: c.results,
                            group: g.children[d]
                        })
                    } else {
                        f.processRecordOutline({
                            results: c.results,
                            group: g.children[d]
                        })
                    }
                }
            }
            if (f.matrix.rowSubTotalsPosition == "last") {
                a = f.createGridStoreRecord(g);
                a.set(g.dimension.getId(), g.getTextTotal());
                a.commit();
                f.processGroupHeaderRecordOutline({
                    results: c.results,
                    group: g,
                    record: a,
                    previousExpanded: b,
                    subtotalRow: true,
                    hasSummaryData: true
                })
            }
        }
    },
    processGroupHeaderRecordOutline: function(a) {
        var f = this,
            g = a.group,
            d = a.record,
            b = a.previousExpanded,
            h = a.subtotalRow,
            e = a.hasSummaryData,
            c = f.matrix.leftAxis.dimensions.getCount(),
            j = false;
        f.storeInfo[d.internalId] = {
            leftKey: g.key,
            rowStyle: "",
            rowClasses: [f.pivotFeature.gridMaster.clsGroupTotal, e ? f.pivotFeature.summaryDataCls : ""],
            rendererParams: {}
        };
        f.matrix.leftAxis.dimensions.each(function(k, i) {
            if (k.getId() == g.dimension.getId()) {
                f.storeInfo[d.internalId].rendererParams[k.getId()] = {
                    fn: "groupOutlineRenderer",
                    group: g,
                    colspan: c,
                    hidden: false,
                    previousExpanded: b,
                    subtotalRow: h
                };
                j = true
            } else {
                f.storeInfo[d.internalId].rendererParams[k.getId()] = {
                    fn: "groupOutlineRenderer",
                    group: g,
                    colspan: 0,
                    hidden: j,
                    previousExpanded: b,
                    subtotalRow: h
                };
                c--
            }
        });
        f.storeInfo[d.internalId].rendererParams.topaxis = {
            fn: (e ? "topAxisRenderer" : "topAxisNoRenderer")
        };
        a.results.push(d)
    },
    processRecordOutline: function(b) {
        var c = this,
            e = b.group,
            d = false,
            a = e.record;
        c.storeInfo[a.internalId] = {
            leftKey: e.key,
            rowStyle: "",
            rowClasses: [c.pivotFeature.rowCls, c.pivotFeature.summaryDataCls],
            rendererParams: {}
        };
        c.matrix.leftAxis.dimensions.each(function(g, f) {
            if (g.getId() == e.dimension.getId()) {
                d = true
            }
            c.storeInfo[a.internalId].rendererParams[g.getId()] = {
                fn: "recordOutlineRenderer",
                group: e,
                hidden: !d
            }
        });
        c.storeInfo[a.internalId].rendererParams.topaxis = {
            fn: "topAxisRenderer"
        };
        b.results.push(a)
    },
    processGroupCompact: function(b) {
        var d = this,
            e = b.group,
            a = b.previousExpanded,
            c = [];
        if (e.record) {
            d.processRecordCompact({
                results: c,
                group: e
            })
        } else {
            d.processGroupCompactWithChildren({
                results: c,
                group: e,
                previousExpanded: a
            })
        }
        return c
    },
    processGroupCompactWithChildren: function(c) {
        var f = this,
            g = c.group,
            b = c.previousExpanded,
            e = false,
            a, d;
        if (!g.expanded || (g.expanded && f.matrix.rowSubTotalsPosition == "first")) {
            e = true;
            a = f.createGridStoreRecord(g)
        } else {
            if (f.matrix.rowSubTotalsPosition == "last" || f.matrix.rowSubTotalsPosition == "none") {
                a = f.createGridStoreRecord();
                a.set(f.matrix.compactViewKey, g.name)
            }
        }
        a.commit();
        f.processGroupHeaderRecordCompact({
            results: c.results,
            group: g,
            record: a,
            previousExpanded: b,
            hasSummaryData: e
        });
        if (g.expanded) {
            if (g.children) {
                for (d = 0; d < g.children.length; d++) {
                    if (g.children[d]["children"]) {
                        f.processGroupCompactWithChildren({
                            results: c.results,
                            group: g.children[d]
                        })
                    } else {
                        f.processRecordCompact({
                            results: c.results,
                            group: g.children[d]
                        })
                    }
                }
            }
            if (f.matrix.rowSubTotalsPosition == "last") {
                a = f.createGridStoreRecord(g);
                a.set(f.matrix.compactViewKey, g.getTextTotal());
                a.commit();
                f.processGroupHeaderRecordCompact({
                    results: c.results,
                    group: g,
                    record: a,
                    previousExpanded: b,
                    subtotalRow: true,
                    hasSummaryData: true
                })
            }
        }
    },
    processGroupHeaderRecordCompact: function(a) {
        var f = this,
            g = a.group,
            d = a.record,
            b = a.previousExpanded,
            h = a.subtotalRow,
            e = a.hasSummaryData,
            c = f.matrix.leftAxis.dimensions.getCount(),
            j = false;
        f.storeInfo[d.internalId] = {
            leftKey: g.key,
            rowStyle: "",
            rowClasses: [f.pivotFeature.gridMaster.clsGroupTotal, e ? f.pivotFeature.summaryDataCls : ""],
            rendererParams: {}
        };
        f.storeInfo[d.internalId].rendererParams[f.matrix.compactViewKey] = {
            fn: "groupCompactRenderer",
            group: g,
            colspan: 0,
            previousExpanded: b,
            subtotalRow: h
        };
        f.storeInfo[d.internalId].rendererParams.topaxis = {
            fn: (e ? "topAxisRenderer" : "topAxisNoRenderer")
        };
        a.results.push(d)
    },
    processRecordCompact: function(b) {
        var c = this,
            e = b.group,
            d = false,
            a = c.createGridStoreRecord(e);
        c.storeInfo[a.internalId] = {
            leftKey: e.key,
            rowStyle: "",
            rowClasses: [c.pivotFeature.rowCls, c.pivotFeature.summaryDataCls],
            rendererParams: {}
        };
        c.storeInfo[a.internalId].rendererParams[c.matrix.compactViewKey] = {
            fn: "recordCompactRenderer",
            group: e
        };
        c.storeInfo[a.internalId].rendererParams.topaxis = {
            fn: "topAxisRenderer"
        };
        b.results.push(a)
    },
    doExpandCollapse: function(c, a) {
        var d = this,
            b = d.pivotFeature.gridMaster,
            e;
        e = d.matrix.leftAxis.findTreeElement("key", c);
        if (!e) {
            return
        }
        d.doExpandCollapseInternal(e, a);
        b.fireEvent((e.node.expanded ? "pivotgroupexpand" : "pivotgroupcollapse"), b, "row", e.node)
    },
    doExpandCollapseInternal: function(f, b) {
        var e = this,
            c, g, d, a;
        g = e.processGroup({
            group: f.node,
            previousExpanded: false
        });
        f.node.expanded = !f.node.expanded;
        c = e.processGroup({
            group: f.node,
            previousExpanded: false
        });
        if (c.length && (d = e.store.indexOf(b)) !== -1) {
            e.store.suspendEvents();
            if (f.node.expanded) {
                e.store.remove(e.store.getAt(d));
                e.store.insert(d, c);
                g = [b]
            } else {
                a = g.length;
                g = e.store.getRange(d, d + a - 1);
                e.store.remove(g);
                e.store.insert(d, c)
            }
            e.removeStoreInfoData(g);
            e.store.resumeEvents();
            e.store.fireEvent("replace", e.store, d, g, c)
        }
    },
    removeStoreInfoData: function(a) {
        Ext.Array.each(a, function(b) {
            if (this.storeInfo[b.internalId]) {
                delete this.storeInfo[b.internalId]
            }
        }, this)
    }
});


Ext.define("Ext.pivot.feature.PivotEvents", {
    alternateClassName: ["Mz.pivot.feature.PivotEvents"],
    extend: "Ext.grid.feature.Feature",
    alias: "feature.pivotevents",
    requires: ["Ext.pivot.feature.PivotStore"],
    eventPrefix: "pivotcell",
    eventSelector: "." + Ext.baseCSSPrefix + "grid-cell",
    summaryDataCls: Ext.baseCSSPrefix + "pivot-summary-data",
    summaryDataSelector: "." + Ext.baseCSSPrefix + "pivot-summary-data",
    cellSelector: "." + Ext.baseCSSPrefix + "grid-cell",
    groupHeaderCls: Ext.baseCSSPrefix + "pivot-grid-group-header",
    groupHeaderCollapsibleCls: Ext.baseCSSPrefix + "pivot-grid-group-header-collapsible",
    summaryRowCls: Ext.baseCSSPrefix + "pivot-grid-group-total",
    summaryRowSelector: "." + Ext.baseCSSPrefix + "pivot-grid-group-total",
    grandSummaryRowCls: Ext.baseCSSPrefix + "pivot-grid-grand-total",
    grandSummaryRowSelector: "." + Ext.baseCSSPrefix + "pivot-grid-grand-total",
    init: function(b) {
        var d = this,
            a = d.view,
            c;
        d.initEventsListeners();
        d.summaryRowSelector = "." + d.summaryRowCls;
        d.grandSummaryRowSelector = "." + d.grandSummaryRowCls;
        d.callParent(arguments);
        c = d.lockingPartner;
        if (c && c.dataSource) {
            d.dataSource = c.dataSource
        } else {
            d.dataSource = new Ext.pivot.feature.PivotStore({
                store: d.grid.store,
                pivotFeature: d
            })
        }
    },
    destroy: function() {
        var a = this;
        a.destroyEventsListeners();
        Ext.destroy(a.dataSource);
        a.view = a.grid = a.gridMaster = a.matrix = a.dataSource = null;
        a.callParent(arguments)
    },
    initEventsListeners: function() {
        var a = this;
        a.eventsViewListeners = a.view.on(Ext.apply({
            scope: a,
            destroyable: true
        }, a.getViewListeners() || {}));
        a.gridListeners = a.grid.on(Ext.apply({
            scope: a,
            destroyable: true
        }, a.getGridListeners() || {}))
    },
    getViewListeners: function() {
        var b = this,
            a = {
                afterrender: b.onViewAfterRender
            };
        a[b.eventPrefix + "click"] = b.onCellEvent;
        a[b.eventPrefix + "dblclick"] = b.onCellEvent;
        a[b.eventPrefix + "contextmenu"] = b.onCellEvent;
        return a
    },
    getGridListeners: Ext.emptyFn,
    destroyEventsListeners: function() {
        Ext.destroyMembers(this, "eventsViewListeners", "gridListeners");
        this.eventsViewListeners = this.gridListeners = null
    },
    onViewAfterRender: function() {
        var a = this;
        a.gridMaster = a.view.up("pivotgrid");
        a.matrix = a.gridMaster.getMatrix();
        a.dataSource.matrix = a.matrix
    },
    getRowId: function(a) {
        return this.view.id + "-record-" + a.internalId
    },
    getRecord: function(a) {
        return this.view.getRecord(a)
    },
    onCellEvent: function(l, a, j) {
        var k = this,
            o = Ext.fly(a).findParent(k.summaryDataSelector) || Ext.fly(a).findParent(k.summaryRowSelector),
            f = k.getRecord(o),
            c = {
                grid: k.gridMaster,
                view: k.view,
                cellEl: a
            },
            n, i, g, b, m, d, h;
        if (!o || !f) {
            return false
        }
        d = k.dataSource.storeInfo[f.internalId].leftKey;
        o = Ext.fly(o);
        if (o.hasCls(k.grandSummaryRowCls)) {
            g = "pivottotal"
        } else {
            if (o.hasCls(k.summaryRowCls)) {
                g = "pivotgroup"
            } else {
                if (o.hasCls(k.summaryDataCls)) {
                    g = "pivotitem"
                }
            }
        }
        n = Ext.getDom(a).getAttribute("data-columnid");
        b = k.getColumnHeaderById(n);
        Ext.apply(c, {
            columnId: n,
            column: b,
            leftKey: d
        });
        if (Ext.fly(a).hasCls(k.groupHeaderCls)) {} else {
            if (b) {
                g += "cell";
                m = k.getTopAxisGroupByDataIndex(b.dataIndex);
                if (m) {
                    h = m.col;
                    Ext.apply(c, {
                        topKey: h,
                        dimensionId: m.agg
                    })
                }
            }
        }
        i = k.gridMaster.fireEvent(g + j.type, c, j);
        if (i !== false && j.type == "click" && Ext.fly(a).hasCls(k.groupHeaderCollapsibleCls)) {
            k.dataSource.doExpandCollapse(d, f);
            if (!k.view.bufferedRenderer && Ext.fly(k.getRowId(f))) {
                Ext.fly(k.getRowId(f)).scrollIntoView(k.view.el, false, false)
            }
        }
        return false
    },
    getColumnHeaderById: function(c) {
        var b = this.view.getGridColumns(),
            a;
        for (a = 0; a < b.length; a++) {
            if (b[a].id === c) {
                return b[a]
            }
        }
    },
    getTopAxisGroupByDataIndex: function(c) {
        var b = this.gridMaster.matrix.getColumns(),
            a;
        for (a = 0; a < b.length; a++) {
            if (b[a].name === c) {
                return b[a]
            }
        }
    }
});


Ext.define("Ext.pivot.feature.PivotView", {
    extend: "Ext.pivot.feature.PivotEvents",
    alias: "feature.pivotview",
    groupTitleCls: Ext.baseCSSPrefix + "pivot-grid-group-title",
    groupHeaderCollapsedCls: Ext.baseCSSPrefix + "pivot-grid-group-header-collapsed",
    tableCls: Ext.baseCSSPrefix + "grid-table",
    rowCls: Ext.baseCSSPrefix + "grid-row",
    dirtyCls: Ext.baseCSSPrefix + "grid-dirty-cell",
    outlineCellHiddenCls: Ext.baseCSSPrefix + "pivot-grid-outline-cell-hidden",
    outlineCellGroupExpandedCls: Ext.baseCSSPrefix + "pivot-grid-outline-cell-previous-expanded",
    compactGroupHeaderCls: Ext.baseCSSPrefix + "pivot-grid-group-header-compact",
    compactLayoutPadding: 25,
    outerTpl: ["{%", "var me = this.pivotViewFeature;", "if (!(me.disabled)) {", "me.setup();", "}", "this.nextTpl.applyOut(values, out, parent);", "%}", {
        priority: 200
    }],
    rowTpl: ["{%", "var me = this.pivotViewFeature;", "me.setupRowData(values.record, values.rowIndex, values);", "values.view.renderColumnSizer(values, out);", "this.nextTpl.applyOut(values, out, parent);", "me.resetRenderers();", "%}", {
        priority: 200,
        syncRowHeights: function(d, a) {
            var b, c;
            d = Ext.fly(d, "syncDest");
            if (d) {
                b = d.offsetHeight
            }
            a = Ext.fly(a, "sycSrc");
            if (a) {
                c = a.offsetHeight
            }
            if (d && a) {
                if (b > c) {
                    Ext.fly(a).setHeight(b)
                } else {
                    if (c > b) {
                        Ext.fly(d).setHeight(c)
                    }
                }
            }
        }
    }],
    cellTpl: ["{%", 'values.hideCell = values.tdAttr == "hidden";\n', "%}", '<tpl if="!hideCell">', '<td class="{tdCls}" role="{cellRole}" {tdAttr} {cellAttr:attributes}', ' style="width:{column.cellWidth}px;<tpl if="tdStyle">{tdStyle}</tpl>"', ' tabindex="-1" data-columnid="{[values.column.getItemId()]}">', '<div {unselectableAttr} class="' + Ext.baseCSSPrefix + 'grid-cell-inner {innerCls}" ', 'style="text-align:{align};<tpl if="style">{style}</tpl>" ', "{cellInnerAttr:attributes}>{value}</div>", "</td>", "</tpl>", {
        priority: 0
    }],
    rtlCellTpl: ["{%", 'values.hideCell = values.tdAttr == "hidden";\n', "%}", '<tpl if="!hideCell">', '<td class="{tdCls}" role="{cellRole}" {tdAttr} {cellAttr:attributes}', ' style="width:{column.cellWidth}px;<tpl if="tdStyle">{tdStyle}</tpl>"', ' tabindex="-1" data-columnid="{[values.column.getItemId()]}">', '<div {unselectableAttr} class="' + Ext.baseCSSPrefix + 'grid-cell-inner {innerCls}" ', 'style="text-align:{align};<tpl if="style">{style}</tpl>" ', "{cellInnerAttr:attributes}>{value}</div>", "</td>", "</tpl>", {
        priority: 200,
        rtlAlign: {
            right: "left",
            left: "right",
            center: "center"
        },
        getAlign: function(a) {
            return this.rtlAlign[a]
        }
    }],
    init: function(b) {
        var c = this,
            a = c.view;
        c.callParent(arguments);
        a.addTpl(Ext.XTemplate.getTpl(c, "outerTpl")).pivotViewFeature = c;
        a.addRowTpl(Ext.XTemplate.getTpl(c, "rowTpl")).pivotViewFeature = c;
        a.preserveScrollOnRefresh = true;
        if (a.bufferedRenderer) {
            a.bufferedRenderer.variableRowHeight = true
        } else {
            b.variableRowHeight = a.variableRowHeight = true
        }
    },
    destroy: function() {
        this.columns = null;
        this.callParent(arguments)
    },
    setup: function() {
        this.columns = this.view.getGridColumns()
    },
    isRTL: function() {
        var b = this,
            a = b.gridMaster || b.grid;
        if (Ext.isFunction(a.isLocalRtl)) {
            return a.isLocalRtl()
        }
        return false
    },
    getGridListeners: function() {
        var a = this;
        return Ext.apply(a.callParent(arguments) || {}, {
            beforerender: a.onBeforeGridRendered
        })
    },
    onBeforeGridRendered: function(a) {
        var b = this;
        if (b.isRTL()) {
            b.view.addCellTpl(Ext.XTemplate.getTpl(b, "rtlCellTpl"))
        } else {
            b.view.addCellTpl(Ext.XTemplate.getTpl(b, "cellTpl"))
        }
    },
    vetoEvent: function(a, c, d, b) {
        if (b.type !== "mouseover" && b.type !== "mouseout" && b.type !== "mouseenter" && b.type !== "mouseleave" && b.getTarget(this.eventSelector)) {
            return false
        }
    },
    setupRowData: function(b, a, e) {
        var d = this.dataSource.storeInfo[b.internalId],
            c = d ? d.rendererParams : {};
        e.rowClasses.length = 0;
        Ext.Array.insert(e.rowClasses, 0, d ? d.rowClasses : []);
        this.setRenderers(c)
    },
    setRenderers: function(a) {
        Ext.Array.each(this.columns, function(b) {
            if (Ext.isDefined(a[b.dataIndex])) {
                b.savedRenderer = b.renderer;
                b.renderer = this[a[b.dataIndex].fn](Ext.apply({
                    renderer: b.savedRenderer
                }, a[b.dataIndex]))
            } else {
                if (Ext.isDefined(a.topaxis)) {
                    b.savedRenderer = b.renderer;
                    b.renderer = this[a.topaxis.fn](Ext.apply({
                        renderer: b.savedRenderer
                    }, a[b.dataIndex]))
                }
            }
        }, this)
    },
    resetRenderers: function() {
        Ext.Array.each(this.columns, function(a) {
            if (Ext.isDefined(a.savedRenderer)) {
                a.renderer = a.savedRenderer;
                delete a.savedRenderer
            }
        })
    },
    groupOutlineRenderer: function(b) {
        var e = this,
            c = b.renderer,
            g = b.group,
            h = b.colspan,
            f = b.hidden,
            a = b.previousExpanded,
            d = b.subtotalRow;
        return function(n, k, j, o, m, l, i) {
            if (Ext.isFunction(c)) {
                n = c.apply(this, arguments)
            }
            n = e.encodeValue(n, g);
            if (h > 0) {
                k.tdAttr = 'colspan = "' + h + '"';
                k.tdCls = e.groupHeaderCls;
                if (!d) {
                    k.tdCls += " " + e.groupHeaderCollapsibleCls;
                    if (!g.expanded) {
                        k.tdCls += " " + e.groupHeaderCollapsedCls
                    }
                    if (a) {
                        k.tdCls += " " + e.outlineCellGroupExpandedCls
                    }
                }
                return '<div class="' + e.groupTitleCls + '">' + n + "</div>"
            }
            if (f) {
                k.tdAttr = "hidden"
            }
            k.tdCls = e.outlineCellHiddenCls;
            return ""
        }
    },
    recordOutlineRenderer: function(a) {
        var c = this,
            b = a.renderer,
            e = a.group,
            d = a.hidden;
        return function(k, h, g, l, j, i, f) {
            if (Ext.isFunction(b)) {
                k = b.apply(this, arguments)
            }
            k = c.encodeValue(k, e);
            if (d) {
                h.tdCls = c.outlineCellHiddenCls;
                return ""
            }
            h.tdCls = c.groupHeaderCls + " " + c.groupTitleCls;
            return k
        }
    },
    groupCompactRenderer: function(b) {
        var e = this,
            c = b.renderer,
            f = b.group,
            g = b.colspan,
            a = b.previousExpanded,
            d = b.subtotalRow;
        return function(m, j, i, n, l, k, h) {
            if (Ext.isFunction(c)) {
                m = c.apply(this, arguments)
            }
            m = e.encodeValue(m, f);
            if (f.level > 0) {
                j.style = (e.isRTL() ? "margin-right: " : "margin-left: ") + (e.compactLayoutPadding * f.level) + "px;"
            }
            j.tdCls = e.groupHeaderCls + " " + e.compactGroupHeaderCls;
            if (!d) {
                j.tdCls += " " + e.groupHeaderCollapsibleCls;
                if (!f.expanded) {
                    j.tdCls += " " + e.groupHeaderCollapsedCls
                }
                if (a) {
                    j.tdCls += " " + e.outlineCellGroupExpandedCls
                }
            }
            return '<div class="' + e.groupTitleCls + '">' + m + "</div>"
        }
    },
    recordCompactRenderer: function(a) {
        var c = this,
            b = a.renderer,
            d = a.group;
        return function(j, g, f, k, i, h, e) {
            if (Ext.isFunction(b)) {
                j = b.apply(this, arguments)
            }
            j = c.encodeValue(j, d);
            if (d.level > 0) {
                g.style = (c.isRTL() ? "margin-right: " : "margin-left: ") + (c.compactLayoutPadding * d.level) + "px;"
            }
            g.tdCls = c.groupHeaderCls + " " + c.groupTitleCls + " " + c.compactGroupHeaderCls;
            return j
        }
    },
    topAxisNoRenderer: function(a) {
        return function(g, d, c, h, f, e, b) {
            return ""
        }
    },
    topAxisRenderer: function(a) {
        var c = this,
            b = a.renderer;
        return function(i, f, e, k, h, g, d) {
            var j = (i === 0 && c.gridMaster.showZeroAsBlank);
            if (Ext.isFunction(b)) {
                i = b.apply(this, arguments)
            }
            return j ? "" : i
        }
    },
    encodeValue: function(a, b) {
        return a
    }
});


Ext.define("Ext.pivot.Grid", {
    extend: "Ext.grid.Panel",
    alternateClassName: ["Mz.pivot.Grid", "Mz.pivot.Table"],
    xtype: ["pivotgrid", "mzpivotgrid"],
    requires: ["Ext.pivot.matrix.Local", "Ext.pivot.matrix.Remote", "Ext.pivot.feature.PivotView", "Ext.util.DelayedTask", "Ext.data.ArrayStore"],
    subGridXType: "gridpanel",
    matrixConfig: null,
    enableLoadMask: true,
    enableLocking: false,
    enableColumnSort: true,
    columnLines: true,
    viewLayoutType: "outline",
    rowSubTotalsPosition: "first",
    rowGrandTotalsPosition: "last",
    colSubTotalsPosition: "last",
    colGrandTotalsPosition: "last",
    textTotalTpl: "Total ({name})",
    textGrandTotalTpl: "Grand total",
    leftAxis: null,
    topAxis: null,
    aggregate: null,
    clsGroupTotal: Ext.baseCSSPrefix + "pivot-grid-group-total",
    clsGrandTotal: Ext.baseCSSPrefix + "pivot-grid-grand-total",
    startRowGroupsCollapsed: true,
    startColGroupsCollapsed: true,
    showZeroAsBlank: false,
    stateEvents: ["pivotgroupexpand", "pivotgroupcollapse", "pivotdone"],
    isPivotGrid: true,
    initComponent: function() {
        var a = this;
        a.columns = [];
        a.preInitialize();
        a.callParent(arguments);
        a.postInitialize()
    },
    preInitialize: function() {
        var a = this;
        a.features = [{
            id: "group",
            ftype: "pivotview",
            summaryRowCls: a.clsGroupTotal,
            grandSummaryRowCls: a.clsGrandTotal
        }];
        a.addCls(Ext.baseCSSPrefix + "pivot-grid");
        if (a.store) {
            a.originalStore = a.store
        }
        a.store = Ext.create("Ext.data.ArrayStore", {
            fields: []
        });
        a.enableColumnMove = false;
        a.delayedTask = new Ext.util.DelayedTask(a.refreshView, a)
    },
    postInitialize: function() {
        var c = this,
            a = {},
            b = {
                headerclick: c.onHeaderClick,
                scope: c,
                destroyable: true
            };
        if (c.enableLocking) {
            c.lockedHeaderCtListeners = c.getView().lockedView.getHeaderCt().on(b);
            c.headerCtListeners = c.getView().normalView.getHeaderCt().on(b)
        } else {
            c.headerCtListeners = c.getView().getHeaderCt().on(b)
        }
        Ext.apply(a, {
            leftAxis: c.leftAxis,
            topAxis: c.topAxis,
            aggregate: c.aggregate,
            showZeroAsBlank: c.showZeroAsBlank,
            textTotalTpl: c.textTotalTpl,
            textGrandTotalTpl: c.textGrandTotalTpl,
            viewLayoutType: c.viewLayoutType,
            rowSubTotalsPosition: c.rowSubTotalsPosition,
            rowGrandTotalsPosition: c.rowGrandTotalsPosition,
            colSubTotalsPosition: c.colSubTotalsPosition,
            colGrandTotalsPosition: c.colGrandTotalsPosition
        });
        Ext.applyIf(a, c.matrixConfig || {});
        Ext.applyIf(a, {
            type: "local"
        });
        if (a.type == "local" && c.originalStore) {
            Ext.applyIf(a, {
                store: c.originalStore
            })
        }
        c.matrix = Ext.Factory.pivotmatrix(a);
        c.matrixListeners = c.matrix.on({
            cleardata: c.onMatrixClearData,
            start: c.onMatrixProcessStart,
            progress: c.onMatrixProcessProgress,
            done: c.onMatrixDataReady,
            beforeupdate: c.onMatrixBeforeUpdate,
            afterupdate: c.onMatrixAfterUpdate,
            scope: c,
            destroyable: true
        });
        c.matrixRelayedListeners = c.relayEvents(c.matrix, ["start", "progress", "done", "modelbuilt", "columnsbuilt", "recordbuilt", "buildtotals", "storebuilt", "beforerequest", "requestexception"], "pivot")
    },
    destroy: function() {
        var a = this;
        a.delayedTask.cancel();
        Ext.destroy(a.matrixRelayedListeners, a.matrixListeners, a.headerCtListeners, a.lockedHeaderCtListeners);
        Ext.destroy(a.matrix, a.delayedTask, a.originalStore);
        a.matrixRelayedListeners = a.matrixListeners = a.headerCtListeners = a.lockedHeaderCtListeners = null;
        a.matrix = a.delayedTask = a.originalStore = null;
        a.callParent(arguments);
        Ext.destroy(a.store);
        a.store = null
    },
    afterRender: function() {
        this.reconfigurePivot();
        this.callParent(arguments)
    },
    refreshView: function() {
        var b = this,
            a;
        if (b.scheduledReconfigure === true) {
            b.scheduledReconfigure = false;
            a = b.getMatrix().getColumnHeaders();
            b.preparePivotColumns(a);
            b.restorePivotColumnsState(a);
            b.reconfigure(undefined, a)
        }
        b.store.fireEvent("pivotstoreremodel", b)
    },
    onMatrixClearData: function() {
        var a = this;
        a.store.removeAll(true);
        if (!a.expandedItemsState) {
            a.lastColumnsState = null
        }
        a.sortedColumn = null
    },
    onMatrixProcessStart: function() {
        if (this.enableLoadMask) {
            this.setLoading(true)
        }
    },
    onMatrixProcessProgress: function(a, b, e) {
        var d = this,
            c = ((b || 0.1) * 100) / (e || 0.1),
            f;
        if (d.loadMask) {
            if (d.loadMask.msgTextEl) {
                f = d.loadMask.msgTextEl
            } else {
                if (d.loadMask.msgEl) {
                    f = d.loadMask.msgEl
                }
            } if (f) {
                f.update(Ext.util.Format.number(c, "0") + "%")
            }
        }
    },
    onMatrixBeforeUpdate: function() {
        this.store.suspendEvents()
    },
    onMatrixAfterUpdate: function() {
        var a = this;
        a.store.resumeEvents();
        a.store.fireEvent("pivotstoreremodel")
    },
    onMatrixDataReady: function() {
        var b = this,
            c = b.matrix.getColumnHeaders(),
            a = false;
        if (b.enableLoadMask) {
            b.setLoading(false)
        }
        if (b.expandedItemsState) {
            b.matrix.leftAxis.items.each(function(d) {
                if (Ext.Array.indexOf(b.expandedItemsState.rows, d.key) >= 0) {
                    d.expanded = true;
                    a = true
                }
            });
            b.matrix.topAxis.items.each(function(d) {
                if (Ext.Array.indexOf(b.expandedItemsState.cols, d.key) >= 0) {
                    d.expanded = true;
                    a = true
                }
            });
            if (a) {
                c = b.matrix.getColumnHeaders();
                delete b.expandedItemsState
            }
        } else {
            b.doExpandCollapseTree(b.matrix.leftAxis.getTree(), !b.startRowGroupsCollapsed);
            b.doExpandCollapseTree(b.matrix.topAxis.getTree(), !b.startColGroupsCollapsed);
            c = b.matrix.getColumnHeaders()
        }
        b.preparePivotColumns(c);
        b.restorePivotColumnsState(c);
        b.reconfigure(undefined, c);
        if (!Ext.isEmpty(b.sortedColumn)) {
            b.matrix.leftAxis.sortTreeByField(b.sortedColumn.dataIndex, b.sortedColumn.direction)
        }
        b.store.fireEvent("pivotstoreremodel", b);
        if (!Ext.isEmpty(b.sortedColumn)) {
            b.updateColumnSortState(b.sortedColumn.dataIndex, b.sortedColumn.direction)
        }
    },
    preparePivotColumns: function(b) {
        var f = this,
            e = {
                menuDisabled: true,
                sortable: false,
                lockable: false
            },
            d = b.length,
            a, c;
        for (a = 0; a < d; a++) {
            c = b[a];
            c.cls = c.cls || "";
            Ext.apply(c, e);
            if (c.leftAxis) {
                c.locked = f.enableLocking
            }
            if (c.subTotal) {
                c.cls = c.tdCls = f.clsGroupTotal
            }
            if (c.grandTotal) {
                c.cls = c.tdCls = f.clsGrandTotal
            }
            if (!c.xexpanded) {
                c.cls += " " + Ext.baseCSSPrefix + "grid-row-collapsed"
            }
            if (c.xcollapsible) {
                c.text = Ext.String.format('<span class="' + Ext.baseCSSPrefix + 'grid-row-expander" style="padding-left: 13px">{0}</span>', c.text)
            }
            if (Ext.isEmpty(c.columns)) {
                if (c.dimension) {
                    c.renderer = c.dimension ? c.dimension.renderer : false;
                    c.align = c.dimension.align;
                    if (c.dimension.flex > 0) {
                        c.flex = c.flex || c.dimension.flex
                    } else {
                        c.width = c.width || c.dimension.width
                    }
                }
            } else {
                f.preparePivotColumns(c.columns)
            }
        }
    },
    reconfigurePivot: function(a) {
        var d = this,
            c = Ext.clone(d.getStateProperties()),
            b;
        c.push("startRowGroupsCollapsed", "startColGroupsCollapsed", "showZeroAsBlank");
        a = a || {};
        for (b = 0; b < c.length; b++) {
            if (!a.hasOwnProperty(c[b])) {
                if (d[c[b]]) {
                    a[c[b]] = d[c[b]]
                }
            } else {
                d[c[b]] = a[c[b]]
            }
        }
        d.getMatrix().reconfigure(a)
    },
    getMatrix: function() {
        return this.matrix
    },
    doExpandCollapseTree: function(a, b) {
        var c;
        for (c = 0; c < a.length; c++) {
            a[c].expanded = b;
            if (a[c].children) {
                this.doExpandCollapseTree(a[c].children, b)
            }
        }
    },
    doExpandCollapse: function(c, b, f, a) {
        var e = this,
            d;
        if (!e.matrix) {
            return
        }
        d = (c == "row" ? e.matrix.leftAxis : e.matrix.topAxis)["findTreeElement"]("key", b);
        if (!d) {
            return
        }
        f = Ext.isDefined(f) ? f : !d.node.expanded;
        if (a === true) {
            e.doExpandCollapseTree([d.node], f)
        } else {
            d.node.expanded = f
        } if (c == "col") {
            e.scheduledReconfigure = true
        }
        e.refreshView();
        e.fireEvent((d.node.expanded ? "pivotgroupexpand" : "pivotgroupcollapse"), e, c, d.node)
    },
    expandRow: function(b, a) {
        this.doExpandCollapse("row", b, true, a)
    },
    collapseRow: function(b, a) {
        this.doExpandCollapse("row", b, false, a)
    },
    expandCol: function(b, a) {
        this.doExpandCollapse("col", b, true, a)
    },
    collapseCol: function(b, a) {
        this.doExpandCollapse("col", b, false, a)
    },
    expandAll: function() {
        var a = this;
        a.expandAllColumns();
        a.expandAllRows()
    },
    expandAllRows: function() {
        var a = this;
        if (!a.getMatrix()) {
            return
        }
        a.doExpandCollapseTree(a.getMatrix().leftAxis.getTree(), true);
        a.delayedTask.delay(10)
    },
    expandAllColumns: function() {
        var a = this;
        if (!a.getMatrix()) {
            return
        }
        a.doExpandCollapseTree(a.getMatrix().topAxis.getTree(), true);
        a.scheduledReconfigure = true;
        a.delayedTask.delay(10)
    },
    collapseAll: function() {
        var a = this;
        a.collapseAllRows();
        a.collapseAllColumns()
    },
    collapseAllRows: function() {
        var a = this;
        if (!a.getMatrix()) {
            return
        }
        a.doExpandCollapseTree(a.getMatrix().leftAxis.getTree(), false);
        a.delayedTask.delay(10)
    },
    collapseAllColumns: function() {
        var a = this;
        if (!a.getMatrix()) {
            return
        }
        a.doExpandCollapseTree(a.getMatrix().topAxis.getTree(), false);
        a.scheduledReconfigure = true;
        a.delayedTask.delay(10)
    },
    setStore: function(a) {
        this.reconfigurePivot({
            store: a
        })
    },
    getStore: function() {
        var b = this,
            a = b.getMatrix();
        return ((a instanceof Ext.pivot.matrix.Local) ? a.store : b.originalStore) || b.store
    },
    getPivotStore: function() {
        return this.store
    },
    getTopAxisItem: function(e) {
        var f = this,
            a = f.getMatrix(),
            d = a.getColumns(),
            c, b;
        if (!e) {
            return null
        }
        for (b = 0; b < d.length; b++) {
            if (d[b].name === e.dataIndex) {
                c = d[b].col;
                break
            }
        }
        return Ext.isEmpty(c) ? null : a.topAxis.items.getByKey(c)
    },
    getLeftAxisItem: function(b) {
        var d = this,
            a = d.getView(),
            e, c;
        if (!b) {
            return null
        }
        a = a.normalView || a;
        c = a.getFeature("group");
        if (!c) {
            return null
        }
        e = c.dataSource.storeInfo[b.internalId];
        return e ? d.getMatrix().leftAxis.items.getByKey(e.leftKey) : null
    },
    onHeaderClick: function(c, f, h) {
        var g = this,
            b, d, a = (f.sortState ? (f.sortState == "ASC" ? "DESC" : "ASC") : "ASC");
        if (!g.enableColumnSort) {
            return
        }
        if (!f.xexpandable) {
            if (h) {
                h.stopEvent()
            }
            if ((f.leftAxis || f.topAxis) && !Ext.isEmpty(f.dataIndex)) {
                if (g.getMatrix().leftAxis.sortTreeByField(f.dataIndex, a)) {
                    g.refreshView();
                    g.updateColumnSortState(f, a)
                }
            }
            return false
        }
        g.doExpandCollapse("col", f.key);
        if (h) {
            h.stopEvent()
        }
    },
    updateColumnSortState: function(b, a) {
        if (Ext.isString(b)) {
            b = this.down('[dataIndex="' + b + '"]')
        }
        if (!b) {
            return
        }
        b.setSortState(new Ext.util.Sorter({
            direction: a,
            property: "dummy"
        }));
        b.sortState = a;
        this.sortedColumn = {
            dataIndex: b.dataIndex,
            direction: a
        }
    },
    getStateProperties: function() {
        return ["viewLayoutType", "rowSubTotalsPosition", "rowGrandTotalsPosition", "colSubTotalsPosition", "colGrandTotalsPosition", "aggregate", "leftAxis", "topAxis", "enableColumnSort", "sortedColumn"]
    },
    applyState: function(d) {
        var c = this,
            b = c.getStateProperties(),
            a;
        for (a = 0; a < b.length; a++) {
            if (d[b[a]]) {
                c[b[a]] = d[b[a]]
            }
        }
        if (d.expandedItems) {
            c.expandedItemsState = d.expandedItems
        }
        c.lastColumnsState = d.pivotcolumns || {};
        if (c.rendered) {
            c.reconfigurePivot()
        }
    },
    getState: function() {
        var c = this,
            d = {},
            b = c.getStateProperties(),
            a;
        for (a = 0; a < b.length; a++) {
            d[b[a]] = c[b[a]]
        }
        d.expandedItems = {
            cols: [],
            rows: []
        };
        c.matrix.leftAxis.items.each(function(e) {
            if (e.expanded) {
                d.expandedItems["rows"].push(e.key)
            }
        });
        c.matrix.topAxis.items.each(function(e) {
            if (e.expanded) {
                d.expandedItems["cols"].push(e.key)
            }
        });
        c.matrix.leftAxis.dimensions.each(function(f, e) {
            d.leftAxis[e]["id"] = f.getId()
        });
        d.pivotcolumns = c.getPivotColumnsState();
        return d
    },
    getPivotColumnsState: function() {
        var b = this,
            a, c;
        if (!b.lastColumnsState) {
            c = b.getDataIndexColumns(b.getMatrix().getColumnHeaders());
            b.lastColumnsState = {};
            for (a = 0; a < c.length; a++) {
                if (c[a].dataIndex) {
                    b.lastColumnsState[c[a].dataIndex] = {
                        width: c[a].width,
                        flex: c[a].flex || 0
                    }
                }
            }
        }
        c = b.getView().getGridColumns();
        for (a = 0; a < c.length; a++) {
            if (c[a].dataIndex) {
                b.lastColumnsState[c[a].dataIndex] = {
                    width: c[a].rendered ? c[a].getWidth() : c[a].width,
                    flex: c[a].flex || 0
                }
            }
        }
        return b.lastColumnsState
    },
    getDataIndexColumns: function(b) {
        var c = [],
            a;
        for (a = 0; a < b.length; a++) {
            if (b[a].dataIndex) {
                c.push(b[a].dataIndex)
            } else {
                if (Ext.isArray(b[a].columns)) {
                    c = Ext.Array.merge(c, this.getDataIndexColumns(b[a].columns))
                }
            }
        }
        return c
    },
    restorePivotColumnsState: function(a) {
        this.parsePivotColumnsState(this.getPivotColumnsState(), a)
    },
    parsePivotColumnsState: function(d, b) {
        var c, a;
        if (!b) {
            return
        }
        for (a = 0; a < b.length; a++) {
            c = d[b[a].dataIndex];
            if (c) {
                if (c.flex) {
                    b[a].flex = c.flex
                } else {
                    if (c.width) {
                        b[a].width = c.width
                    }
                }
            }
            this.parsePivotColumnsState(d, b[a].columns)
        }
    }
});


Ext.define("Ext.pivot.plugin.configurator.FilterLabelWindow", {
    extend: "Ext.window.Window",
    requires: ["Ext.form.Panel", "Ext.form.FieldContainer", "Ext.form.field.Text", "Ext.form.field.Hidden", "Ext.form.field.ComboBox", "Ext.layout.container.HBox"],
    modal: true,
    closeAction: "destroy",
    titleText: "Label filter ({0})",
    fieldText: "Show items for which the label",
    caseSensitiveText: "Case sensitive",
    initComponent: function() {
        var b = this,
            a = [];
        a = b.filterFields || [];
        a.push({
            xtype: "combo",
            editable: false,
            queryMode: "local",
            valueField: "value",
            store: b.store,
            name: "operator",
            listeners: {
                change: function(f, e) {
                    var c = this,
                        d = c.isOperatorBetween(e);
                    c.down("#fValue").setVisible(!d);
                    c.down("#fValue").allowBlank = d;
                    c.down("#fFrom").setVisible(d);
                    c.down("#fFrom").allowBlank = !d;
                    c.down("#fTo").setVisible(d);
                    c.down("#fTo").allowBlank = !d
                },
                scope: b
            }
        }, {
            itemId: "fValue",
            xtype: "textfield",
            margin: "0 0 0 5",
            name: "value"
        }, {
            itemId: "fFrom",
            xtype: "textfield",
            margin: "0 0 0 5",
            name: "from"
        }, {
            itemId: "fTo",
            xtype: "textfield",
            margin: "0 0 0 5",
            name: "to"
        });
        Ext.apply(b, {
            title: Ext.String.format(b.titleText, b.title),
            layout: "fit",
            items: [{
                xtype: "form",
                bodyPadding: 5,
                items: [{
                    xtype: "hidden",
                    name: "type"
                }, {
                    xtype: "fieldcontainer",
                    labelSeparator: "",
                    fieldLabel: b.fieldText,
                    labelAlign: "top",
                    layout: {
                        type: "hbox",
                        align: "stretch"
                    },
                    defaults: {
                        allowBlank: false,
                        flex: 1
                    },
                    items: a
                }, {
                    xtype: "checkbox",
                    boxLabel: b.caseSensitiveText,
                    name: "caseSensitive"
                }]
            }],
            buttons: [{
                text: Ext.Msg.buttonText.ok,
                handler: b.applyFilter,
                scope: b
            }, {
                text: Ext.Msg.buttonText.cancel,
                handler: b.cancelFilter,
                scope: b
            }]
        });
        b.callParent(arguments)
    },
    applyFilter: function() {
        var b = this.down("form").getForm(),
            a;
        if (b.isValid()) {
            a = b.getValues();
            if (this.isOperatorBetween(a.operator)) {
                a.value = [a.from, a.to]
            }
            delete(a.from);
            delete(a.to);
            a.caseSensitive = (a.caseSensitive === "on");
            a.topSort = (a.topSort === "on");
            this.fireEvent("filter", this, a)
        }
    },
    cancelFilter: function() {
        this.close()
    },
    isOperatorBetween: function(a) {
        return Ext.Array.indexOf(["between", "not between"], a) >= 0
    }
});


Ext.define("Ext.pivot.plugin.configurator.FilterValueWindow", {
    extend: "Ext.pivot.plugin.configurator.FilterLabelWindow",
    titleText: "Value filter ({0})",
    fieldText: "Show items for which",
    initComponent: function() {
        var a = this;
        a.filterFields = [{
            xtype: "combo",
            editable: false,
            queryMode: "local",
            valueField: "value",
            store: a.storeAgg,
            name: "dimensionId"
        }];
        a.callParent(arguments)
    }
});


Ext.define("Ext.pivot.plugin.configurator.FilterTopWindow", {
    extend: "Ext.window.Window",
    requires: ["Ext.form.Panel", "Ext.form.FieldContainer", "Ext.form.field.Text", "Ext.form.field.Hidden", "Ext.form.field.ComboBox", "Ext.layout.container.HBox"],
    modal: true,
    closeAction: "destroy",
    titleText: "Top 10 filter ({0})",
    fieldText: "Show",
    sortResultsText: "Sort results",
    initComponent: function() {
        var b = this,
            a = [];
        a.push({
            xtype: "combo",
            editable: false,
            queryMode: "local",
            valueField: "value",
            store: b.storeTopOrder,
            name: "topOrder"
        }, {
            xtype: "textfield",
            margin: "0 0 0 5",
            name: "value"
        }, {
            xtype: "combo",
            margin: "0 0 0 5",
            editable: false,
            queryMode: "local",
            valueField: "value",
            store: b.storeTopType,
            name: "topType"
        }, {
            xtype: "combo",
            margin: "0 0 0 5",
            editable: false,
            queryMode: "local",
            valueField: "value",
            store: b.storeAgg,
            name: "dimensionId"
        });
        Ext.apply(b, {
            title: Ext.String.format(b.titleText, b.title),
            layout: "fit",
            items: [{
                xtype: "form",
                bodyPadding: 5,
                defaults: {
                    allowBlank: false
                },
                items: [{
                    xtype: "hidden",
                    name: "type"
                }, {
                    xtype: "hidden",
                    name: "operator"
                }, {
                    xtype: "fieldcontainer",
                    labelSeparator: "",
                    fieldLabel: b.fieldText,
                    labelAlign: "top",
                    layout: {
                        type: "hbox",
                        align: "stretch"
                    },
                    defaults: {
                        flex: 1,
                        allowBlank: false
                    },
                    items: a
                }, {
                    xtype: "checkbox",
                    boxLabel: b.sortResultsText,
                    name: "topSort"
                }]
            }],
            buttons: [{
                text: Ext.Msg.buttonText.ok,
                handler: b.applyFilter,
                scope: b
            }, {
                text: Ext.Msg.buttonText.cancel,
                handler: b.cancelFilter,
                scope: b
            }]
        });
        b.callParent(arguments)
    },
    applyFilter: function() {
        var a = this.down("form").getForm();
        if (a.isValid()) {
            this.fireEvent("filter", this, a.getValues())
        }
    },
    cancelFilter: function() {
        this.close()
    }
});


Ext.define("Ext.pivot.plugin.configurator.Column", {
    extend: "Ext.Component",
    requires: ["Ext.menu.Menu", "Ext.pivot.plugin.configurator.FilterLabelWindow", "Ext.pivot.plugin.configurator.FilterValueWindow", "Ext.pivot.plugin.configurator.FilterTopWindow"],
    alias: "widget.pivotconfigcolumn",
    childEls: ["textCol", "filterCol", "sortCol"],
    renderTpl: '<div id="{id}-configCol" class="' + Ext.baseCSSPrefix + 'pivot-grid-config-column-inner"><tpl if="isCustomizable"><span id={id}-customCol class="' + Ext.baseCSSPrefix + "pivot-grid-config-column-btn-customize " + Ext.baseCSSPrefix + "border-box " + Ext.baseCSSPrefix + "pivot-grid-config-column-btn " + Ext.baseCSSPrefix + 'pivot-grid-config-column-btn-image"></span></tpl><span id={id}-sortCol data-ref="sortCol" class="' + Ext.baseCSSPrefix + "border-box " + Ext.baseCSSPrefix + 'pivot-grid-config-column-btn"></span><span id={id}-filterCol data-ref="filterCol" class="' + Ext.baseCSSPrefix + "border-box " + Ext.baseCSSPrefix + 'pivot-grid-config-column-btn"></span><span id="{id}-textCol" data-ref="textCol" data-qtip="{header}{aggregator}" class="' + Ext.baseCSSPrefix + "pivot-grid-config-column-text " + Ext.baseCSSPrefix + "column-header-text " + Ext.baseCSSPrefix + 'border-box">{header}{aggregator}</span></div>',
    header: "&#160;",
    isCustomizable: false,
    dimension: null,
    isAgg: false,
    sumText: "Sum",
    avgText: "Avg",
    countText: "Count",
    minText: "Min",
    maxText: "Max",
    groupSumPercentageText: "Group sum percentage",
    groupCountPercentageText: "Group count percentage",
    varText: "Var",
    varPText: "Varp",
    stdDevText: "StdDev",
    stdDevPText: "StdDevp",
    sortAscText: "Sort A to Z",
    sortDescText: "Sort Z to A",
    sortClearText: "Disable sorting",
    clearFilterText: 'Clear filter from "{0}"',
    labelFiltersText: "Label filters",
    valueFiltersText: "Value filters",
    equalsText: "Equals...",
    doesNotEqualText: "Does not equal...",
    beginsWithText: "Begins with...",
    doesNotBeginWithText: "Does not begin with...",
    endsWithText: "Ends with...",
    doesNotEndWithText: "Does not end with...",
    containsText: "Contains...",
    doesNotContainText: "Does not contain...",
    greaterThanText: "Greater than...",
    greaterThanOrEqualToText: "Greater than or equal to...",
    lessThanText: "Less than...",
    lessThanOrEqualToText: "Less than or equal to...",
    betweenText: "Between...",
    notBetweenText: "Not between...",
    top10Text: "Top 10...",
    equalsLText: "equals",
    doesNotEqualLText: "does not equal",
    beginsWithLText: "begins with",
    doesNotBeginWithLText: "does not begin with",
    endsWithLText: "ends with",
    doesNotEndWithLText: "does not end with",
    containsLText: "contains",
    doesNotContainLText: "does not contain",
    greaterThanLText: "is greater than",
    greaterThanOrEqualToLText: "is greater than or equal to",
    lessThanLText: "is less than",
    lessThanOrEqualToLText: "is less than or equal to",
    betweenLText: "is between",
    notBetweenLText: "is not between",
    top10LText: "Top 10...",
    topOrderTopText: "Top",
    topOrderBottomText: "Bottom",
    topTypeItemsText: "Items",
    topTypePercentText: "Percent",
    topTypeSumText: "Sum",
    baseCls: Ext.baseCSSPrefix + "pivot-grid-config-column",
    btnIconCls: Ext.baseCSSPrefix + "pivot-grid-config-column-btn-image",
    setFilterIconCls: Ext.baseCSSPrefix + "pivot-grid-config-column-btn-filter-set",
    clearFilterIconCls: Ext.baseCSSPrefix + "pivot-grid-config-column-btn-filter-clear",
    ascSortIconCls: Ext.baseCSSPrefix + "pivot-grid-config-column-btn-sort-asc",
    descSortIconCls: Ext.baseCSSPrefix + "pivot-grid-config-column-btn-sort-desc",
    clearSortIconCls: Ext.baseCSSPrefix + "pivot-grid-config-column-btn-sort-clear",
    destroy: function() {
        var a = this;
        Ext.destroyMembers(a, "relayers", "menu");
        a.dimension = a.relayers = a.menu = null;
        a.callParent(arguments)
    },
    initRenderData: function() {
        var a = this;
        return Ext.apply(a.callParent(arguments), {
            header: a.dimension.header,
            aggregator: a.isAgg ? " (" + a.dimension.aggregator + ")" : "",
            dimension: a.dimension,
            isCustomizable: a.isCustomizable
        })
    },
    afterRender: function() {
        var a = this;
        a.callParent();
        if (a.isCustomizable) {
            if (!a.isAgg && (!Ext.isDefined(a.dimension.sortable) || a.dimension.sortable)) {
                a.addSortCls(a.dimension.direction)
            }
            if (a.dimension.filter) {
                a.addFilterCls()
            }
            a.mon(a.getTargetEl(), {
                scope: a,
                click: a.handleColClick
            })
        }
    },
    handleColClick: function(c, a) {
        var b = this;
        if (b.isAgg) {
            b.showAggMenu();
            c.stopEvent()
        } else {
            b.showColMenu()
        }
    },
    handleMenuClick: function(b, c) {
        var a = this,
            d;
        a.dimension.aggregator = b.aggregator;
        if (a.textCol) {
            d = a.textCol.setHtml ? "setHtml" : "setHTML";
            a.textCol[d](a.header + " (" + a.dimension.aggregator + ")")
        }
        a.ownerCt.updateLayout();
        a.fireEvent("configchange")
    },
    addSortCls: function(b) {
        var a = this;
        if (!a.sortCol) {
            return
        }
        if (b === "ASC" || !b) {
            a.sortCol.addCls(a.ascSortIconCls);
            a.sortCol.removeCls(a.descSortIconCls)
        } else {
            a.sortCol.addCls(a.descSortIconCls);
            a.sortCol.removeCls(a.ascSortIconCls)
        }
        a.sortCol.addCls(a.btnIconCls)
    },
    removeSortCls: function(b) {
        var a = this;
        if (!a.sortCol) {
            return
        }
        if (b === "ASC") {
            a.sortCol.removeCls(a.ascSortIconCls)
        } else {
            a.sortCol.removeCls(a.descSortIconCls)
        }
        a.sortCol.removeCls(a.btnIconCls)
    },
    addFilterCls: function() {
        var a = this;
        if (a.filterCol && !a.filterCol.hasCls(a.setFilterIconCls)) {
            a.filterCol.addCls(a.setFilterIconCls);
            a.filterCol.addCls(a.btnIconCls)
        }
    },
    removeFilterCls: function() {
        var a = this;
        if (a.filterCol) {
            a.filterCol.removeCls(a.setFilterIconCls);
            a.filterCol.removeCls(a.btnIconCls)
        }
    },
    serialize: function() {
        var a = this;
        return Ext.applyIf({
            idColumn: a.id
        }, a.initialConfig)
    },
    showAggMenu: function() {
        var a = this,
            b = a.dimension.aggregator;
        Ext.destroy(a.menu);
        a.menu = Ext.create("Ext.menu.Menu", {
            floating: true,
            defaults: {
                handler: a.handleMenuClick,
                scope: a,
                xtype: "menucheckitem",
                group: "aggregator"
            },
            items: [{
                text: a.sumText,
                aggregator: "sum",
                checked: b == "sum"
            }, {
                text: a.avgText,
                aggregator: "avg",
                checked: b == "avg"
            }, {
                text: a.countText,
                aggregator: "count",
                checked: b == "count"
            }, {
                text: a.maxText,
                aggregator: "max",
                checked: b == "max"
            }, {
                text: a.minText,
                aggregator: "min",
                checked: b == "min"
            }, {
                text: a.groupSumPercentageText,
                aggregator: "groupSumPercentage",
                checked: b == "groupSumPercentage"
            }, {
                text: a.groupCountPercentageText,
                aggregator: "groupCountPercentage",
                checked: b == "groupCountPercentage"
            }, {
                text: a.stdDevText,
                aggregator: "stdDev",
                checked: b == "stdDev"
            }, {
                text: a.stdDevPText,
                aggregator: "stdDevP",
                checked: b == "stdDevP"
            }, {
                text: a.varText,
                aggregator: "variance",
                checked: b == "variance"
            }, {
                text: a.varPText,
                aggregator: "varianceP",
                checked: b == "varianceP"
            }]
        });
        a.menu.showBy(a)
    },
    showColMenu: function() {
        var e = this,
            b = [],
            g, f, a, c, d = e.dimension.filter;
        Ext.destroy(e.menu);
        b.push({
            text: e.sortAscText,
            direction: "ASC",
            iconCls: e.ascSortIconCls,
            handler: e.sortMe
        }, {
            text: e.sortDescText,
            direction: "DESC",
            iconCls: e.descSortIconCls,
            handler: e.sortMe
        }, {
            text: e.sortClearText,
            direction: "",
            disabled: e.dimension.sortable === false,
            iconCls: e.clearSortIconCls,
            handler: e.sortMe
        }, {
            xtype: "menuseparator"
        });
        a = [{
            text: e.equalsText,
            operator: "="
        }, {
            text: e.doesNotEqualText,
            operator: "!="
        }, {
            xtype: "menuseparator"
        }, {
            text: e.greaterThanText,
            operator: ">"
        }, {
            text: e.greaterThanOrEqualToText,
            operator: ">="
        }, {
            text: e.lessThanText,
            operator: "<"
        }, {
            text: e.lessThanOrEqualToText,
            operator: "<="
        }, {
            xtype: "menuseparator"
        }, {
            text: e.betweenText,
            operator: "between"
        }, {
            text: e.notBetweenText,
            operator: "not between"
        }];
        g = Ext.clone(a);
        Ext.Array.insert(g, 3, [{
            text: e.beginsWithText,
            operator: "begins"
        }, {
            text: e.doesNotBeginWithText,
            operator: "not begins"
        }, {
            text: e.endsWithText,
            operator: "ends"
        }, {
            text: e.doesNotEndWithText,
            operator: "not ends"
        }, {
            xtype: "menuseparator"
        }, {
            text: e.containsText,
            operator: "contains"
        }, {
            text: e.doesNotContainText,
            operator: "not contains"
        }, {
            xtype: "menuseparator"
        }]);
        for (c = 0; c < g.length; c++) {
            g[c]["checked"] = (d && d.type == "label" && d.operator == g[c].operator)
        }
        f = Ext.clone(a);
        f.push({
            xtype: "menuseparator"
        }, {
            text: e.top10Text,
            operator: "top10"
        });
        for (c = 0; c < f.length; c++) {
            f[c]["checked"] = (d && d.type == "value" && d.operator == f[c].operator)
        }
        b.push({
            text: Ext.String.format(e.clearFilterText, e.header),
            iconCls: e.clearFilterIconCls,
            disabled: !d,
            handler: e.onRemoveFilter
        }, {
            text: e.labelFiltersText,
            menu: {
                defaults: {
                    handler: e.onShowFilter,
                    scope: e,
                    xtype: "menucheckitem",
                    group: "filterlabel",
                    type: "label"
                },
                items: g
            }
        }, {
            text: e.valueFiltersText,
            menu: {
                defaults: {
                    handler: e.onShowFilter,
                    scope: e,
                    xtype: "menucheckitem",
                    group: "filtervalue",
                    type: "value"
                },
                items: f
            }
        });
        e.menu = Ext.create("Ext.menu.Menu", {
            floating: true,
            defaults: {
                scope: e
            },
            items: b
        });
        e.menu.showBy(e)
    },
    sortMe: function(a) {
        var b = this;
        if (Ext.isEmpty(a.direction)) {
            b.dimension.sortable = false;
            b.removeSortCls(b.dimension.direction)
        } else {
            b.dimension.sortable = true;
            b.addSortCls(a.direction);
            b.dimension.direction = a.direction
        }
        b.fireEvent("sortchange", b, a.direction)
    },
    onShowFilter: function(b) {
        var h = this,
            g, f, c = {},
            e, d, a = h.dimension.filter,
            i = {
                type: b.type,
                operator: b.operator,
                value: (a ? a.value : ""),
                from: (a ? (Ext.isArray(a.value) ? a.value[0] : "") : ""),
                to: (a ? (Ext.isArray(a.value) ? a.value[1] : "") : ""),
                caseSensitive: (a ? a.caseSensitive : false),
                topSort: (a ? a.topSort : false)
            };
        d = [];
        Ext.each(h.ownerCt.aggregateDimensions, function(j) {
            d.push([j.header, j.id])
        });
        if (b.type == "label" || (b.type == "value" && b.operator != "top10")) {
            e = [
                [h.equalsLText, "="],
                [h.doesNotEqualLText, "!="],
                [h.greaterThanLText, ">"],
                [h.greaterThanOrEqualToLText, ">="],
                [h.lessThanLText, "<"],
                [h.lessThanOrEqualToLText, "<="],
                [h.betweenLText, "between"],
                [h.notBetweenLText, "not between"]
            ];
            if (b.type == "label") {
                Ext.Array.insert(e, 3, [
                    [h.beginsWithLText, "begins"],
                    [h.doesNotBeginWithLText, "not begins"],
                    [h.endsWithLText, "ends"],
                    [h.doesNotEndWithLText, "not ends"],
                    [h.containsLText, "contains"],
                    [h.doesNotContainLText, "not contains"]
                ]);
                f = "Ext.pivot.plugin.configurator.FilterLabelWindow"
            } else {
                f = "Ext.pivot.plugin.configurator.FilterValueWindow";
                Ext.apply(i, {
                    dimensionId: (a ? a.dimensionId : "")
                });
                c.storeAgg = Ext.create("Ext.data.ArrayStore", {
                    fields: ["text", "value"],
                    data: d
                })
            }
            c.store = Ext.create("Ext.data.ArrayStore", {
                fields: ["text", "value"],
                data: e
            })
        } else {
            f = "Ext.pivot.plugin.configurator.FilterTopWindow";
            e = [];
            Ext.apply(c, {
                storeTopOrder: Ext.create("Ext.data.ArrayStore", {
                    fields: ["text", "value"],
                    data: [
                        [h.topOrderTopText, "top"],
                        [h.topOrderBottomText, "bottom"]
                    ]
                }),
                storeTopType: Ext.create("Ext.data.ArrayStore", {
                    fields: ["text", "value"],
                    data: [
                        [h.topTypeItemsText, "items"],
                        [h.topTypePercentText, "percent"],
                        [h.topTypeSumText, "sum"]
                    ]
                }),
                storeAgg: Ext.create("Ext.data.ArrayStore", {
                    fields: ["text", "value"],
                    data: d
                })
            });
            Ext.apply(i, {
                operator: "top10",
                dimensionId: (a ? a.dimensionId : ""),
                topType: (a ? a.topType : "items"),
                topOrder: (a ? a.topOrder : "top")
            })
        }
        g = Ext.create(f, Ext.apply(c || {}, {
            title: h.header,
            listeners: {
                filter: h.onApplyFilter,
                scope: h
            }
        }));
        g.down("form").getForm().setValues(i);
        g.show()
    },
    onApplyFilter: function(c, a) {
        var b = this;
        a.caseSensitive = (a.caseSensitive === "on");
        a.topSort = (a.topSort === "on");
        c.close();
        b.addFilterCls();
        b.dimension.filter = a;
        b.fireEvent("filterchange", b, a)
    },
    onRemoveFilter: function() {
        var a = this;
        a.removeFilterCls();
        a.dimension.filter = null;
        a.fireEvent("filterchange", a, null)
    }
});


Ext.define("Ext.pivot.plugin.configurator.DragZone", {
    extend: "Ext.dd.DragZone",
    configColumnSelector: "." + Ext.baseCSSPrefix + "pivot-grid-config-column",
    configColumnInnerSelector: "." + Ext.baseCSSPrefix + "pivot-grid-config-column-inner",
    maxProxyWidth: 120,
    dragging: false,
    constructor: function(a) {
        this.panel = a;
        this.ddGroup = this.getDDGroup();
        this.callParent([a.el])
    },
    getDDGroup: function() {
        return "configurator-" + this.panel.up("gridpanel").id
    },
    getDragData: function(b) {
        if (b.getTarget(this.configColumnInnerSelector)) {
            var d = b.getTarget(this.configColumnSelector),
                a, c;
            if (d) {
                a = Ext.getCmp(d.id);
                if (!this.panel.dragging) {
                    c = document.createElement("div");
                    c.innerHTML = a.header;
                    return {
                        ddel: c,
                        header: a
                    }
                }
            }
        }
        return false
    },
    onBeforeDrag: function() {
        return !(this.panel.dragging || this.disabled)
    },
    onInitDrag: function() {
        this.panel.dragging = true;
        this.callParent(arguments)
    },
    onDragDrop: function() {
        if (!this.dragData.dropLocation) {
            this.panel.dragging = false;
            this.callParent(arguments);
            return
        }
        var b = this.dragData.dropLocation.header,
            a = this.dragData.header,
            c = -1;
        if (b instanceof Ext.grid.column.Column) {
            b.show();
            c = this.panel.items.findIndex("idColumn", a.id);
            this.panel.remove(this.panel.items.getAt(c));
            this.panel.notifyGroupChange()
        }
        this.panel.dragging = false;
        this.callParent(arguments)
    },
    afterRepair: function() {
        this.callParent();
        this.panel.dragging = false
    },
    getRepairXY: function() {
        return this.dragData.header.el.getXY()
    },
    disable: function() {
        this.disabled = true
    },
    enable: function() {
        this.disabled = false
    }
});


Ext.define("Ext.pivot.plugin.configurator.DropZone", {
    extend: "Ext.dd.DropZone",
    proxyOffsets: [-4, -9],
    configPanelCls: Ext.baseCSSPrefix + "pivot-grid-config-container-body",
    configColumnCls: Ext.baseCSSPrefix + "pivot-grid-config-column",
    constructor: function(a) {
        this.panel = a;
        this.ddGroup = this.getDDGroup();
        this.callParent([a.id])
    },
    disable: function() {
        this.disabled = true
    },
    enable: function() {
        this.disabled = false
    },
    getDDGroup: function() {
        return "configurator-" + this.panel.up("gridpanel").id
    },
    getTargetFromEvent: function(a) {
        return a.getTarget("." + this.configColumnCls) || a.getTarget("." + this.configPanelCls)
    },
    getTopIndicator: function() {
        if (!this.topIndicator) {
            this.self.prototype.topIndicator = Ext.DomHelper.append(Ext.getBody(), {
                cls: "col-move-top " + Ext.baseCSSPrefix + "col-move-top",
                html: "&#160;"
            }, true);
            this.self.prototype.indicatorXOffset = Math.floor((this.topIndicator.dom.offsetWidth + 1) / 2)
        }
        return this.topIndicator
    },
    getBottomIndicator: function() {
        if (!this.bottomIndicator) {
            this.self.prototype.bottomIndicator = Ext.DomHelper.append(Ext.getBody(), {
                cls: "col-move-bottom " + Ext.baseCSSPrefix + "col-move-bottom",
                html: "&#160;"
            }, true)
        }
        return this.bottomIndicator
    },
    getLocation: function(f, b) {
        var a = f.getXY()[0],
            d = Ext.getCmp(b.id),
            c, g;
        if (d instanceof Ext.pivot.plugin.configurator.Container) {
            if (d.items.getCount() > 0) {
                c = Ext.fly(d.items.last().el).getRegion()
            } else {
                c = new Ext.util.Region(0, 1000000, 0, 0)
            }
        } else {
            c = Ext.fly(b).getRegion()
        } if ((c.right - a) <= (c.right - c.left) / 2) {
            g = "after"
        } else {
            g = "before"
        }
        return {
            pos: g,
            header: Ext.getCmp(b.id),
            node: b
        }
    },
    positionIndicator: function(y, o, u) {
        var x = this,
            p = y.header,
            f = x.getLocation(u, o),
            j = f.header,
            d = f.pos,
            c, t, l, r, s, a, b, k, m, w, v, n, h, q, g;
        if (j === x.lastTargetHeader && d === x.lastDropPos) {
            return
        }
        c = p.nextSibling("gridcolumn:not([hidden])");
        t = p.previousSibling("gridcolumn:not([hidden])");
        x.lastTargetHeader = j;
        x.lastDropPos = d;
        y.dropLocation = f;
        if ((p !== j) && ((d === "before" && c !== j) || (d === "after" && t !== j)) && !j.isDescendantOf(p)) {
            n = Ext.dd.DragDropManager.getRelated(x);
            h = n.length;
            q = 0;
            for (; q < h; q++) {
                g = n[q];
                if (g !== x && g.invalidateDrop) {
                    g.invalidateDrop()
                }
            }
            x.valid = true;
            l = x.getTopIndicator();
            r = x.getBottomIndicator();
            if (d === "before") {
                s = "bc-tl";
                a = "tc-bl"
            } else {
                s = "bc-tr";
                a = "tc-br"
            } if (j instanceof Ext.pivot.plugin.configurator.Container && j.items.getCount() > 0) {
                b = l.getAlignToXY(j.items.last().el, s);
                k = r.getAlignToXY(j.items.last().el, a)
            } else {
                b = l.getAlignToXY(j.el, s);
                k = r.getAlignToXY(j.el, a)
            }
            m = x.panel.el;
            w = m.getX() - x.indicatorXOffset;
            v = m.getX() + m.getWidth();
            b[0] = Ext.Number.constrain(b[0], w, v);
            k[0] = Ext.Number.constrain(k[0], w, v);
            l.setXY(b);
            r.setXY(k);
            l.show();
            r.show()
        } else {
            x.invalidateDrop()
        }
    },
    invalidateDrop: function() {
        this.valid = false;
        this.hideIndicators()
    },
    onNodeOver: function(c, g, f, d) {
        var h = this,
            j = d.header,
            a, k, b, i;
        a = true;
        if (d.header.el.dom === c) {
            a = false
        }
        if (a) {
            h.positionIndicator(d, c, f)
        } else {
            h.valid = false
        }
        return h.valid ? h.dropAllowed : h.dropNotAllowed
    },
    hideIndicators: function() {
        var a = this;
        a.getTopIndicator().hide();
        a.getBottomIndicator().hide();
        a.lastTargetHeader = a.lastDropPos = null
    },
    onNodeOut: function() {
        this.hideIndicators()
    },
    onNodeDrop: function(b, h, g, d) {
        var j = this,
            c = d.header,
            f = d.dropLocation,
            a, k, i;
        if (j.valid && f) {
            if (h.id != j.panel.id) {
                k = j.panel.getColumnPosition(f.header, f.pos);
                a = c.serialize();
                if (!j.panel.isAgg) {
                    h.panel.remove(c)
                }
                j.panel.addColumn(a.dimension, k, true)
            } else {
                j.panel.moveColumn(c.id, f.header instanceof Ext.pivot.plugin.configurator.Container ? f.header.items.last().id : f.header.id, f.pos)
            }
        }
    }
});


Ext.define("Ext.pivot.plugin.configurator.Container", {
    extend: "Ext.panel.Panel",
    requires: ["Ext.pivot.plugin.configurator.Column", "Ext.pivot.plugin.configurator.DragZone", "Ext.pivot.plugin.configurator.DropZone"],
    alias: "widget.pivotconfigcontainer",
    childEls: ["innerCt", "targetEl"],
    handleSorting: false,
    handleFiltering: false,
    position: "top",
    isAgg: false,
    border: false,
    dragDropText: "Drop Column Fields Here",
    cls: Ext.baseCSSPrefix + "pivot-grid-config-container-body",
    dockedTopRightCls: Ext.baseCSSPrefix + "pivot-grid-config-container-body-tr",
    dockedBottomLeftCls: Ext.baseCSSPrefix + "pivot-grid-config-container-body-bl",
    hintTextCls: Ext.baseCSSPrefix + "pivot-grid-config-container-hint",
    initComponent: function() {
        var a = this;
        if (a.position == "top" || a.position == "bottom") {
            Ext.apply(a, {
                style: "overflow:hidden",
                layout: "column",
                height: "auto"
            })
        } else {
            Ext.apply(a, {
                layout: {
                    type: "vbox",
                    align: "stretch"
                }
            })
        } if (a.position == "top" || a.position == "right") {
            a.cls += " " + a.dockedTopRightCls
        } else {
            a.cls += " " + a.dockedBottomLeftCls
        }
        a.callParent(arguments)
    },
    destroy: function() {
        var a = this;
        Ext.destroyMembers(a, "dragZone", "dropZone", "relayers", "targetEl");
        a.dragZone = a.dropZone = a.relayers = a.targetEl = null;
        a.callParent()
    },
    enable: function() {
        var a = this;
        if (a.dragZone) {
            a.dragZone.enable()
        }
        if (a.dropZone) {
            a.dropZone.enable()
        }
    },
    disable: function() {
        var a = this;
        if (a.dragZone) {
            a.dragZone.disable()
        }
        if (a.dropZone) {
            a.dropZone.disable()
        }
    },
    afterRender: function() {
        var a = this;
        a.callParent();
        a.dragZone = new Ext.pivot.plugin.configurator.DragZone(a);
        a.dropZone = new Ext.pivot.plugin.configurator.DropZone(a);
        a.mon(a, "afterlayout", a.showGroupByText, a)
    },
    addColumn: function(b, g, c) {
        var d = this,
            a = {
                xtype: "pivotconfigcolumn"
            },
            f = d.items.findIndex("dimensionId", new RegExp("^" + b.id + "$", "i")) >= 0,
            e;
        if (!d.isAgg) {
            if (f) {
                if (c === true) {
                    d.notifyGroupChange()
                }
                return
            }
        } else {
            if (f) {
                b.id = Ext.id()
            }
        } if (d.items.getCount() == 0) {
            d.hideGroupByText()
        }
        Ext.apply(a, {
            dimension: b,
            dimensionId: b.id,
            header: b.header,
            isCustomizable: d.isCustomizable,
            isAgg: d.isAgg
        });
        if (d.isAgg) {
            b.aggregator = b.aggregator || "sum"
        }
        if (g != -1) {
            e = d.insert(g, a)
        } else {
            e = d.add(a)
        }
        d.updateColumnIndexes();
        e.relayers = d.relayEvents(e, ["sortchange", "filterchange", "configchange"]);
        if (c === true) {
            d.notifyGroupChange()
        }
    },
    getColumnPosition: function(b, a) {
        var c = this,
            d;
        if (b instanceof Ext.pivot.plugin.configurator.Column) {
            d = c.items.findIndex("id", b.id);
            d = (a === "before") ? d : d + 1
        } else {
            d = -1
        }
        return d
    },
    moveColumn: function(e, b, a) {
        var d = this,
            f = d.items.findIndex("id", e),
            c = d.items.findIndex("id", b);
        if (f != c) {
            if (c > f) {
                c = (a === "before") ? Math.max(c - 1, 0) : c
            } else {
                c = (a === "before") ? c : c + 1
            }
            d.move(f, c);
            d.updateColumnIndexes();
            d.notifyGroupChange()
        }
    },
    updateColumnIndexes: function() {
        this.items.each(function(c, a, b) {
            c.index = a
        })
    },
    notifyGroupChange: function() {
        this.fireEvent("configchange")
    },
    showGroupByText: function() {
        var a = this;
        if (a.items.getCount() === 0) {
            a.innerCt.setHeight(a.minHeight);
            if (a.targetEl) {
                a.targetEl.setHtml('<div class="' + a.hintTextCls + '">' + a.dragDropText + "</div>")
            } else {
                a.targetEl = a.innerCt.createChild()
            }
        }
    },
    hideGroupByText: function() {
        if (this.targetEl) {
            this.targetEl.setHtml("")
        }
    }
});


Ext.define("Ext.pivot.plugin.configurator.Panel", {
    extend: "Ext.panel.Panel",
    requires: ["Ext.pivot.plugin.configurator.Container"],
    alias: "widget.pivotconfigpanel",
    dock: "right",
    weight: 50,
    grid: null,
    fields: [],
    refreshDelay: 1000,
    defaultMinHeight: 70,
    defaultMinWidth: 250,
    header: false,
    title: "Configurator",
    collapsible: true,
    collapseMode: "placeholder",
    panelAllFieldsText: "Drop Unused Fields Here",
    panelAllFieldsTitle: "All fields",
    panelTopFieldsText: "Drop Column Fields Here",
    panelTopFieldsTitle: "Column labels",
    panelLeftFieldsText: "Drop Row Fields Here",
    panelLeftFieldsTitle: "Row labels",
    panelAggFieldsText: "Drop Agg Fields Here",
    panelAggFieldsTitle: "Values",
    headerContainerCls: Ext.baseCSSPrefix + "pivot-grid-config-container-header",
    initComponent: function() {
        var b = this,
            a = {
                configchange: b.onConfigChanged,
                sortchange: b.onSortChanged,
                filterchange: b.onFilterChanged,
                scope: b,
                destroyable: true
            };
        Ext.apply(b, Ext.Array.indexOf(["top", "bottom"], b.dock) >= 0 ? b.getHorizontalConfig() : b.getVerticalConfig());
        b.callParent(arguments);
        b.fieldsCt = b.down("#fieldsCt");
        b.fieldsTopCt = b.down("#fieldsTopCt");
        b.fieldsLeftCt = b.down("#fieldsLeftCt");
        b.fieldsAggCt = b.down("#fieldsAggCt");
        b.fieldsCtListeners = b.fieldsCt.on(a);
        b.fieldsLeftCtListeners = b.fieldsLeftCt.on(a);
        b.fieldsTopCtListeners = b.fieldsTopCt.on(a);
        b.fieldsAggCtListeners = b.fieldsAggCt.on(a);
        b.fieldsExtracted = false;
        b.gridListeners = b.grid.on({
            pivotdone: b.initPivotFields,
            scope: b,
            destroyable: true
        });
        b.task = new Ext.util.DelayedTask(function() {
            b.grid.reconfigurePivot({
                topAxis: b.getFieldsFromContainer(b.fieldsTopCt),
                leftAxis: b.getFieldsFromContainer(b.fieldsLeftCt),
                aggregate: b.getFieldsFromContainer(b.fieldsAggCt)
            })
        })
    },
    destroy: function() {
        var a = this;
        delete(a.grid);
        Ext.destroy(a.relayers, a.fieldsCtListeners, a.fieldsLeftCtListeners, a.fieldsTopCtListeners, a.fieldsAggCtListeners, a.gridListeners);
        a.callParent()
    },
    enable: function() {
        var a = this;
        if (a.fieldsCt) {
            a.fieldsCt.enable();
            a.fieldsTopCt.enable();
            a.fieldsLeftCt.enable();
            a.fieldsAggCt.enable();
            a.initPivotFields()
        }
        a.show()
    },
    disable: function() {
        var a = this;
        if (a.fieldsCt) {
            a.fieldsCt.disable();
            a.fieldsTopCt.disable();
            a.fieldsLeftCt.disable();
            a.fieldsAggCt.disable()
        }
        a.hide()
    },
    getPanelConfigHeader: function(a) {
        return Ext.apply({
            xtype: "header",
            baseCls: Ext.baseCSSPrefix + "panel-header",
            cls: this.headerContainerCls,
            border: 1,
            width: 100
        }, a || {})
    },
    getHorizontalConfig: function() {
        var a = this;
        return {
            minHeight: a.defaultMinHeight,
            headerPosition: a.dock == "top" ? "bottom" : "top",
            collapseDirection: a.dock,
            defaults: {
                xtype: "container",
                layout: {
                    type: "hbox",
                    align: "stretchmax"
                },
                minHeight: a.defaultMinHeight / 3
            },
            items: [{
                items: [a.getPanelConfigHeader({
                    title: a.panelAllFieldsTitle,
                    tools: a.collapsible ? [{
                        type: a.dock == "top" ? "up" : "down",
                        handler: a.collapseMe,
                        scope: a
                    }] : []
                }), {
                    itemId: "fieldsCt",
                    xtype: "pivotconfigcontainer",
                    isCustomizable: false,
                    dragDropText: a.panelAllFieldsText,
                    position: a.dock,
                    flex: 1
                }]
            }, {
                items: [a.getPanelConfigHeader({
                    title: a.panelAggFieldsTitle
                }), {
                    itemId: "fieldsAggCt",
                    xtype: "pivotconfigcontainer",
                    isCustomizable: true,
                    isAgg: true,
                    dragDropText: a.panelAggFieldsText,
                    position: a.dock,
                    flex: 1
                }]
            }, {
                defaults: {
                    xtype: "pivotconfigcontainer",
                    minHeight: a.defaultMinHeight / 3,
                    position: a.dock
                },
                items: [a.getPanelConfigHeader({
                        title: a.panelLeftFieldsTitle
                    }), {
                        itemId: "fieldsLeftCt",
                        pivotField: "leftAxis",
                        isCustomizable: true,
                        dragDropText: a.panelLeftFieldsText,
                        flex: 1
                    },
                    a.getPanelConfigHeader({
                        title: a.panelTopFieldsTitle
                    }), {
                        itemId: "fieldsTopCt",
                        pivotField: "topAxis",
                        isCustomizable: true,
                        dragDropText: a.panelTopFieldsText,
                        flex: 1
                    }
                ]
            }]
        }
    },
    getVerticalConfig: function() {
        var a = this;
        return {
            layout: {
                type: "hbox",
                align: "stretch"
            },
            minWidth: a.defaultMinWidth,
            headerPosition: a.dock == "right" ? "left" : "right",
            collapseDirection: a.dock,
            defaults: {
                flex: 1
            },
            items: [{
                itemId: "fieldsCt",
                xtype: "pivotconfigcontainer",
                position: a.dock,
                title: a.panelAllFieldsTitle,
                isCustomizable: false,
                dragDropText: a.panelAllFieldsText,
                autoScroll: true,
                header: {
                    cls: a.headerContainerCls
                },
                tools: a.collapsible ? [{
                    type: a.dock,
                    handler: a.collapseMe,
                    scope: a
                }] : []
            }, {
                xtype: "container",
                defaults: {
                    xtype: "pivotconfigcontainer",
                    flex: 1,
                    autoScroll: true,
                    position: a.dock,
                    header: {
                        cls: a.headerContainerCls
                    }
                },
                layout: {
                    type: "vbox",
                    align: "stretch"
                },
                items: [{
                    itemId: "fieldsAggCt",
                    title: a.panelAggFieldsTitle,
                    isCustomizable: true,
                    isAgg: true,
                    dragDropText: a.panelAggFieldsText
                }, {
                    itemId: "fieldsLeftCt",
                    title: a.panelLeftFieldsTitle,
                    pivotField: "leftAxis",
                    isCustomizable: true,
                    dragDropText: a.panelLeftFieldsText
                }, {
                    itemId: "fieldsTopCt",
                    title: a.panelTopFieldsTitle,
                    pivotField: "topAxis",
                    isCustomizable: true,
                    dragDropText: a.panelTopFieldsText
                }]
            }]
        }
    },
    onConfigChanged: function() {
        var d = this,
            b = [],
            c = [],
            a = [];
        if (d.disabled) {
            return
        }
        if (d.grid.fireEvent("configchange", d, {
            topAxis: d.getFieldsFromContainer(d.fieldsTopCt),
            leftAxis: d.getFieldsFromContainer(d.fieldsLeftCt),
            aggregate: d.getFieldsFromContainer(d.fieldsAggCt)
        }) !== false) {
            d.task.delay(d.refreshDelay)
        }
    },
    collapseMe: function() {
        this.collapse(this.dock)
    },
    getFieldsFromContainer: function(b, c) {
        var a = [];
        b.items.each(function(d) {
            a.push(d.dimension)
        });
        return a
    },
    onSortChanged: function(b, d) {
        var c = this,
            a;
        if (c.disabled) {
            return
        }
        a = c.grid[b.ownerCt.pivotField];
        Ext.each(a, function(e) {
            if (e.dataIndex == b.dataIndex) {
                e.direction = d;
                return false
            }
        });
        c.task.delay(c.refreshDelay)
    },
    onFilterChanged: function(c, b) {
        var d = this,
            a;
        if (d.disabled) {
            return
        }
        d.task.delay(d.refreshDelay)
    },
    initPivotFields: function() {
        var e = this,
            c = e.grid.getStore(),
            d = c ? c.model : null,
            g, f, b, a;
        if (d != e.lastModel) {
            Ext.destroy(e.lastFields);
            delete(e.lastFields);
            e.lastModel = d
        }
        if (!e.lastFields) {
            e.lastFields = e.fetchAllFieldConfigurations()
        }
        a = e.lastFields.clone();
        e.fieldsCt.removeAll();
        e.fieldsTopCt.removeAll();
        e.fieldsLeftCt.removeAll();
        e.fieldsAggCt.removeAll();
        g = e.getConfigFields(e.grid.topAxis);
        f = e.getConfigFields(e.grid.leftAxis);
        b = e.getConfigFields(e.grid.aggregate);
        Ext.each(Ext.Array.merge(g, f), function(j) {
            var h, k = false;
            if (j.filter && j.filter.dimensionId) {
                for (h = 0; h < b.length; h++) {
                    if (b[h].id == j.filter.dimensionId) {
                        k = true;
                        break
                    }
                }
                if (!k) {
                    delete j.filter
                }
            }
            a.removeAtKey(j.header);
            e.mergeFieldConfig(j)
        });
        Ext.each(b, e.mergeFieldConfig, e);
        Ext.suspendLayouts();
        e.addFieldsToConfigurator(a.getRange(), e.fieldsCt);
        e.addFieldsToConfigurator(g, e.fieldsTopCt);
        e.addFieldsToConfigurator(f, e.fieldsLeftCt);
        e.addFieldsToConfigurator(b, e.fieldsAggCt);
        e.fieldsTopCt.aggregateDimensions = b;
        e.fieldsLeftCt.aggregateDimensions = b;
        Ext.resumeLayouts(true)
    },
    mergeFieldConfig: function(b) {
        var a = this.lastFields.getByKey(b.header),
            c;
        if (a) {
            c = a.id;
            Ext.apply(a, b);
            a.id = c
        }
    },
    fetchAllFieldConfigurations: function() {
        var c = this,
            b = c.grid.getStore(),
            a = b ? b.model.getFields() : [],
            e = [],
            d;
        d = Ext.create("Ext.util.MixedCollection");
        d.getKey = function(f) {
            return f.header
        };
        if (c.fields.length > 0) {
            e = c.fields
        } else {
            Ext.each(a, function(f) {
                e.push({
                    header: Ext.String.capitalize(f.name),
                    dataIndex: f.name,
                    direction: f.sortDir
                })
            })
        }
        Ext.each(e, function(f) {
            f.id = f.id || Ext.id()
        });
        d.addAll(e);
        return d
    },
    addFieldsToConfigurator: function(a, b) {
        Ext.each(a, function(e, d, c) {
            b.addColumn(e, -1)
        })
    },
    getConfigFields: function(c) {
        var b = this,
            a = [];
        Ext.each(c, function(e) {
            var d = Ext.clone(e);
            d.id = d.id || Ext.id();
            if (!b.lastFields.getByKey(d.header)) {
                b.lastFields.add(d)
            }
            a.push(d)
        });
        return a
    },
    placeholderCollapse: function(f, a) {
        var d = this,
            c = d.ownerCt,
            h = f || d.collapseDirection,
            b = Ext.panel.Panel.floatCls,
            g = d.getPlaceholder(h),
            e;
        d.isCollapsingOrExpanding = 1;
        d.setHiddenState(true);
        d.collapsed = h;
        if (g.rendered) {
            if (g.el.dom.parentNode !== d.el.dom.parentNode) {
                d.el.dom.parentNode.insertBefore(g.el.dom, d.el.dom)
            }
            g.hidden = false;
            g.setHiddenState(false);
            g.el.show();
            c.updateLayout()
        } else {
            if (d.dock) {
                g.dock = d.dock;
                c.addDocked(g)
            } else {
                c.insert(c.items.indexOf(d), g)
            }
        } if (d.rendered) {
            if (Ext.ComponentManager.getActiveComponent() === d.collapseTool) {
                d.focusPlaceholderExpandTool = true
            }
            d.el.setVisibilityMode(d.placeholderCollapseHideMode);
            if (a) {
                d.el.addCls(b);
                g.el.hide();
                e = d.convertCollapseDir(h);
                d.el.slideOut(e, {
                    preserveScroll: true,
                    duration: Ext.Number.from(a, Ext.fx.Anim.prototype.duration),
                    listeners: {
                        scope: d,
                        afteranimate: function() {
                            var i = this;
                            i.el.removeCls(b);
                            i.placeholder.el.show().setStyle("display", "none").slideIn(e, {
                                easing: "linear",
                                duration: 100,
                                listeners: {
                                    afteranimate: i.doPlaceholderCollapse,
                                    scope: i
                                }
                            })
                        }
                    }
                })
            } else {
                d.el.hide();
                d.doPlaceholderCollapse()
            }
        } else {
            d.isCollapsingOrExpanding = 0;
            if (!d.preventCollapseFire) {
                d.fireEvent("collapse", d)
            }
        }
        return d
    },
    placeholderExpand: function(c) {
        var e = this,
            g = e.collapsed,
            h = e.placeholder.expandTool,
            d = Ext.panel.Panel.floatCls,
            b = e.ownerLayout ? e.ownerLayout.centerRegion : null,
            f, a;
        if (Ext.Component.layoutSuspendCount) {
            c = false
        }
        if (e.floatedFromCollapse) {
            a = e.getPosition(true);
            e.slideOutFloatedPanelBegin();
            e.slideOutFloatedPanelEnd();
            e.floated = false
        }
        if (Ext.ComponentManager.getActiveComponent() === h) {
            e.focusHeaderCollapseTool = true;
            h._ariaRole = h.ariaEl.dom.getAttribute("role");
            h._ariaLabel = h.ariaEl.dom.getAttribute("aria-label");
            h.ariaEl.dom.setAttribute("role", "presentation");
            h.ariaEl.dom.removeAttribute("aria-label")
        }
        if (c) {
            Ext.suspendLayouts();
            e.placeholder.hide();
            e.el.show();
            e.collapsed = false;
            e.setHiddenState(false);
            if (b && !a) {
                b.hidden = true
            }
            Ext.resumeLayouts(true);
            if (b) {
                b.hidden = false
            }
            e.el.addCls(d);
            e.isCollapsingOrExpanding = 2;
            if (a) {
                f = e.getXY();
                e.setLocalXY(a[0], a[1]);
                e.setXY([f[0], f[1]], {
                    duration: Ext.Number.from(c, Ext.fx.Anim.prototype.duration),
                    listeners: {
                        scope: e,
                        afteranimate: function() {
                            var i = this;
                            i.el.removeCls(d);
                            i.isCollapsingOrExpanding = 0;
                            i.fireEvent("expand", i)
                        }
                    }
                })
            } else {
                e.el.hide();
                e.placeholder.el.show();
                e.placeholder.hidden = false;
                e.setHiddenState(false);
                e.el.slideIn(e.convertCollapseDir(g), {
                    preserveScroll: true,
                    duration: Ext.Number.from(c, Ext.fx.Anim.prototype.duration),
                    listeners: {
                        afteranimate: e.doPlaceholderExpand,
                        scope: e
                    }
                })
            }
        } else {
            e.floated = e.collapsed = false;
            e.doPlaceholderExpand(true)
        }
        return e
    }
});


Ext.define("Ext.pivot.plugin.Configurator", {
    alternateClassName: ["Mz.pivot.plugin.Configurator"],
    extend: "Ext.AbstractPlugin",
    requires: ["Ext.util.DelayedTask", "Ext.menu.Menu", "Ext.menu.CheckItem", "Ext.pivot.plugin.configurator.Panel"],
    alias: ["plugin.pivotconfigurator", "plugin.mzconfigurator"],
    fields: [],
    refreshDelay: 300,
    dock: "right",
    collapsible: true,
    lockableScope: "top",
    init: function(a) {
        var b = this;
        if (!a.isPivotGrid) {
            Ext.raise("This plugin is only compatible with Ext.pivot.Grid")
        }
        b.pivot = a;
        b.fields = Ext.Array.from(b.fields);
        b.pivotListeners = b.pivot.on({
            beforerender: b.onBeforeGridRendered,
            afterrender: b.onAfterGridRendered,
            single: true,
            scope: b,
            destroyable: true
        });
        b.callParent(arguments)
    },
    destroy: function() {
        var a = this;
        Ext.destroyMembers(a, "configCt", "pivotListeners");
        a.pivot = a.fields = a.pivotListeners = a.configCt = null;
        a.callParent(arguments)
    },
    enable: function() {
        var a = this;
        a.disabled = false;
        if (a.configCt) {
            a.configCt.enable()
        }
        a.pivot.fireEvent("showconfigpanel", a.configCt)
    },
    disable: function() {
        var a = this;
        a.disabled = true;
        if (a.configCt) {
            a.configCt.disable()
        }
        a.pivot.fireEvent("hideconfigpanel", a.configCt)
    },
    onBeforeGridRendered: function() {
        this.setDock(this.dock)
    },
    onAfterGridRendered: function() {
        if (this.disabled === true) {
            this.disable()
        } else {
            this.enable()
        }
    },
    setDock: function(a) {
        var c = this,
            b = Ext.isDefined(c.configCt);
        Ext.destroy(c.configCt);
        c.configCt = c.pivot.addDocked({
            xtype: "pivotconfigpanel",
            dock: a || c.dock,
            grid: c.pivot,
            fields: c.fields,
            refreshDelay: c.refreshDelay,
            collapsible: c.collapsible
        })[0];
        if (b) {
            c.configCt.initPivotFields()
        }
    }
});


Ext.define("Ext.pivot.plugin.DrillDown", {
    alternateClassName: ["Mz.pivot.plugin.DrillDown"],
    alias: ["plugin.pivotdrilldown", "plugin.mzdrilldown"],
    extend: "Ext.AbstractPlugin",
    requires: ["Ext.pivot.Grid", "Ext.window.Window", "Ext.data.proxy.Memory", "Ext.data.Store", "Ext.toolbar.Paging"],
    mixins: {
        observable: "Ext.util.Observable"
    },
    columns: [],
    width: 400,
    height: 300,
    textWindow: "Drill down window",
    lockableScope: "top",
    init: function(a) {
        var b = this;
        if (!a.isPivotGrid) {
            Ext.raise("This plugin is only compatible with Ext.pivot.Grid")
        }
        b.pivot = a;
        b.pivotListeners = b.pivot.on({
            pivotitemcelldblclick: b.runPlugin,
            pivotgroupcelldblclick: b.runPlugin,
            pivottotalcelldblclick: b.runPlugin,
            scope: b,
            destroyable: true
        });
        b.callParent(arguments)
    },
    destroy: function() {
        var a = this;
        Ext.destroyMembers(a, "view", "pivotListeners");
        a.pivot = a.view = a.pivotListeners = a.store = null;
        a.callParent(arguments)
    },
    showView: function(c) {
        var e = this,
            a = e.pivot.getMatrix().store.model.getFields(),
            d = e.columns,
            b;
        if (!e.view) {
            b = Ext.create("Ext.data.Store", {
                pageSize: 25,
                remoteSort: true,
                fields: Ext.clone(a),
                proxy: {
                    type: "memory",
                    reader: {
                        type: "array"
                    },
                    enablePaging: true
                }
            });
            if (d.length === 0) {
                Ext.Array.each(a, function(h, f, g) {
                    d.push({
                        header: Ext.String.capitalize(h.name),
                        dataIndex: h.name
                    })
                })
            }
            e.view = Ext.create("Ext.window.Window", {
                title: e.textWindow,
                width: e.width,
                height: e.height,
                layout: "fit",
                modal: true,
                closeAction: "hide",
                items: [{
                    xtype: "grid",
                    border: false,
                    viewConfig: {
                        loadMask: false
                    },
                    columns: d,
                    store: b,
                    dockedItems: [{
                        itemId: "idPager",
                        xtype: "pagingtoolbar",
                        store: b,
                        dock: "bottom",
                        displayInfo: true
                    }]
                }]
            });
            e.store = b
        }
        e.store.getProxy().data = c;
        e.store.load();
        e.view.show();
        e.view.down("#idPager").moveFirst()
    },
    runPlugin: function(g, f, c) {
        var d = this,
            b = d.pivot.getMatrix(),
            a;
        if (d.disabled) {
            return
        }
        if (g.topKey) {
            a = b.results.get(g.leftKey, g.topKey);
            if (a) {
                d.showView(a.records)
            }
        }
    }
});


Ext.define("Ext.pivot.plugin.Exporter", {
    alternateClassName: ["Mz.pivot.plugin.ExcelExport"],
    alias: ["plugin.pivotexporter", "plugin.mzexcelexport"],
    extend: "Ext.AbstractPlugin",
    requires: ["Ext.exporter.Excel"],
    lockableScope: "top",
    init: function(a) {
        var b = this;
        if (!a.isPivotGrid) {
            Ext.raise("This plugin is only compatible with Ext.pivot.Grid")
        }
        a.saveDocumentAs = Ext.bind(b.saveDocumentAs, b);
        a.getDocumentData = Ext.bind(b.getDocumentData, b);
        b.pivot = a;
        return b.callParent(arguments)
    },
    destroy: function() {
        var a = this;
        a.pivot.saveDocumentAs = a.pivot.getDocumentData = a.pivot = a.matrix = null;
        return a.callParent(arguments)
    },
    saveDocumentAs: function(a) {
        var b;
        if (this.disabled) {
            return
        }
        b = this.getExporter.apply(this, arguments);
        b.saveAs();
        Ext.destroy(b)
    },
    getDocumentData: function(b) {
        var c, a;
        if (this.disabled) {
            return
        }
        c = this.getExporter.apply(this, arguments);
        a = c.getContent();
        Ext.destroy(c);
        return a
    },
    getExporter: function(a) {
        var b = this;
        a = a || {};
        b.matrix = b.pivot.getMatrix();
        b.onlyExpandedNodes = a.onlyExpandedNodes;
        delete(a.onlyExpandedNodes);
        return Ext.Factory.exporter(Ext.apply({
            type: "excel",
            data: b.prepareData()
        }, a))
    },
    prepareData: function() {
        var f = this,
            c = f.matrix,
            g, e, h, b, d, a;
        if (!f.onlyExpandedNodes) {
            f.setColumnsExpanded(c.topAxis.getTree(), true)
        }
        e = Ext.clone(c.getColumnHeaders());
        h = f.getColumnHeaders(e);
        a = f.getDataIndexColumns(e);
        if (!f.onlyExpandedNodes) {
            f.setColumnsExpanded(c.topAxis.getTree())
        }
        g = f.extractGroups(c.leftAxis.getTree(), a);
        Ext.apply(g, {
            summary: [],
            text: ""
        });
        g.summary.push(c.textGrandTotalTpl);
        b = c.preparePivotStoreRecordData({
            key: c.grandTotalKey
        });
        for (d = 1; d < a.length; d++) {
            g.summary.push(b[a[d]] || "")
        }
        return {
            columns: h,
            groups: [g]
        }
    },
    setColumnsExpanded: function(b, a) {
        for (var c = 0; c < b.length; c++) {
            if (Ext.isDefined(a)) {
                b[c].backupExpanded = b[c].expanded;
                b[c].expanded = a
            } else {
                b[c].expanded = b[c].backupExpanded;
                b[c].backupExpanded = null
            } if (b[c].children) {
                this.setColumnsExpanded(b[c].children, a)
            }
        }
    },
    getColumnHeaders: function(b) {
        var d = [],
            a, c;
        for (a = 0; a < b.length; a++) {
            c = {
                text: b[a].text
            };
            if (b[a].columns) {
                c.columns = this.getColumnHeaders(b[a].columns)
            }
            d.push(c)
        }
        return d
    },
    getDataIndexColumns: function(b) {
        var c = [],
            a;
        for (a = 0; a < b.length; a++) {
            if (b[a].dataIndex) {
                c.push(b[a].dataIndex)
            } else {
                if (Ext.isArray(b[a].columns)) {
                    c = Ext.Array.merge(c, this.getDataIndexColumns(b[a].columns))
                }
            }
        }
        return c
    },
    extractGroups: function(f, a) {
        var g = this,
            h = {},
            c, b, e, k, l, d;
        for (c = 0; c < f.length; c++) {
            k = f[c];
            if (k.record) {
                h.rows = h.rows || [];
                l = [];
                for (b = 0; b < a.length; b++) {
                    l.push(k.record.get(a[b]) || "")
                }
                h.rows.push(l)
            } else {
                if (k.children) {
                    h.groups = h.groups || [];
                    l = {};
                    e = g.onlyExpandedNodes ? k.expanded : true;
                    if (e) {
                        l = g.extractGroups(k.children, a)
                    }
                    Ext.apply(l, {
                        summary: [],
                        text: k.name
                    });
                    l.summary.push(k.getTextTotal());
                    d = g.matrix.preparePivotStoreRecordData(k);
                    for (b = 1; b < a.length; b++) {
                        l.summary.push(d[a[b]] || "")
                    }
                    h.groups.push(l)
                }
            }
        }
        return h
    }
});


Ext.define("Ext.pivot.plugin.RangeEditor", {
    alternateClassName: ["Mz.pivot.plugin.RangeEditor"],
    alias: ["plugin.pivotrangeeditor", "plugin.mzrangeeditor"],
    extend: "Ext.AbstractPlugin",
    requires: ["Ext.pivot.Grid", "Ext.window.Window", "Ext.form.field.Text", "Ext.form.field.Number", "Ext.form.field.ComboBox", "Ext.form.field.Display", "Ext.button.Button", "Ext.data.Store"],
    mixins: {
        observable: "Ext.util.Observable"
    },
    width: null,
    height: null,
    textWindowTitle: "Range editor",
    textFieldValue: "Value",
    textFieldEdit: "Field",
    textFieldType: "Type",
    textButtonOk: "Ok",
    textButtonCancel: "Cancel",
    textTypePercentage: "Percentage",
    textTypeIncrement: "Increment",
    textTypeOverwrite: "Overwrite",
    textTypeUniformly: "Uniformly",
    onBeforeRecordsUpdate: Ext.emptyFn,
    onAfterRecordsUpdate: Ext.emptyFn,
    lockableScope: "top",
    init: function(a) {
        var b = this;
        if (!a.isPivotGrid) {
            Ext.raise("This plugin is only compatible with Ext.pivot.Grid")
        }
        b.pivot = a;
        b.pivotListeners = b.pivot.on({
            pivotitemcelldblclick: b.runPlugin,
            pivotgroupcelldblclick: b.runPlugin,
            pivottotalcelldblclick: b.runPlugin,
            scope: b,
            destroyable: true
        });
        b.callParent(arguments)
    },
    destroy: function() {
        var a = this;
        Ext.destroyMembers(a, "view", "pivotListeners");
        a.pivot = a.view = a.pivotListeners = a.currentRecord = a.currentCol = a.currentResult = null;
        a.callParent(arguments)
    },
    runPlugin: function(g, f, c) {
        var d = this,
            a = d.pivot.getMatrix(),
            b;
        if (d.disabled) {
            return
        }
        if (g.topKey) {
            d.initEditorWindow();
            d.currentResult = a.results.get(g.leftKey, g.topKey);
            if (d.currentResult) {
                d.currentCol = g.column;
                b = d.currentCol.dimension.getId();
                d.view.down("form").getForm().setValues({
                    field: d.currentCol.dimension.header || d.currentCol.text || d.currentCol.dimension.dataIndex,
                    value: d.currentResult.getValue(b),
                    type: "uniformly"
                });
                d.view.show()
            }
        }
    },
    updateRecords: function() {
        var g = this,
            b = g.currentResult,
            f = g.currentCol,
            a = f.dimension.getId(),
            e = f.dimension.dataIndex,
            d = g.view.down("form").getForm().getValues(),
            c, h = 0;
        c = b.records;
        if (g.onBeforeRecordsUpdate(g.pivot, f, c, d.value, b.getValue(a)) === false) {
            return
        }
        g.view.getEl().mask();
        d.value = parseFloat(d.value);
        Ext.defer(function() {
            Ext.Array.each(c, function(k) {
                var j = k.get(e),
                    l, i;
                switch (d.type) {
                    case "percentage":
                        i = Math.floor(j * d.value / 100);
                        break;
                    case "increment":
                        i = j + d.value;
                        break;
                    case "overwrite":
                        i = d.value;
                        break;
                    case "uniformly":
                        l = (1 / c.length * d.value) + h;
                        i = Math.floor(l);
                        h += (l - i);
                        break
                }
                if (j != i) {
                    k.set(e, i)
                }
            });
            g.onAfterRecordsUpdate(g.pivot, f, c, d.value, b.getValue(a));
            g.view.getEl().unmask();
            g.view.close()
        }, 10)
    },
    initEditorWindow: function() {
        var a = this;
        if (!a.view) {
            a.view = Ext.create("Ext.window.Window", {
                title: a.textWindowTitle,
                width: a.width,
                height: a.height,
                layout: "fit",
                modal: true,
                closeAction: "hide",
                items: [{
                    xtype: "form",
                    padding: 5,
                    border: false,
                    defaults: {
                        anchor: "100%"
                    },
                    items: [{
                        fieldLabel: a.textFieldEdit,
                        xtype: "displayfield",
                        name: "field"
                    }, {
                        fieldLabel: a.textFieldType,
                        xtype: "combo",
                        name: "type",
                        queryMode: "local",
                        valueField: "id",
                        displayField: "text",
                        editable: false,
                        store: Ext.create("Ext.data.Store", {
                            fields: ["id", "text"],
                            data: [{
                                id: "percentage",
                                text: a.textTypePercentage
                            }, {
                                id: "increment",
                                text: a.textTypeIncrement
                            }, {
                                id: "overwrite",
                                text: a.textTypeOverwrite
                            }, {
                                id: "uniformly",
                                text: a.textTypeUniformly
                            }]
                        })
                    }, {
                        fieldLabel: a.textFieldValue,
                        xtype: "numberfield",
                        name: "value"
                    }]
                }],
                buttons: [{
                    text: a.textButtonOk,
                    handler: a.updateRecords,
                    scope: a
                }, {
                    text: a.textButtonCancel,
                    handler: function() {
                        this.view.close()
                    },
                    scope: a
                }]
            })
        }
    }
});


Ext.define('Fiddle.Model', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'index',
        type: 'int'
    }, {
        name: 'name',
        type: 'string'
    }, {
        name: 'company',
        type: 'string'
    }, {
        name: 'eyeColor',
        type: 'string'
    }, {
        name: 'registered',
        type: 'date',
        dateFormat: 'c'
    }, {
        name: 'checkingBalance',
        type: 'float'
    }, {
        name: 'savingsBalance',
        type: 'float'
    }, {
        name: 'isActive',
        type: 'boolean'
    }, {
        name: 'age',
        type: 'int'
    }, {
        name: 'status',
        convert: function(val, rec) {
            return rec.data.isActive ? 'Active Customer' : 'In Active Customer';
        },
        depends: ['isActive']
    }, {
        name: 'demo',
        convert: function(val, rec) {
            if (rec.data.age < 20) {
                return 'teenager'
            } else if (rec.data.age >= 20 && rec.data.age < 24) {
                return 'College Student'
            } else if (rec.data.age >= 24 && rec.data.age < 30) {
                return 'Single Adult'
            } else if (rec.data.age >= 30 && rec.data.age < 50) {
                return 'Married'
            } else if (rec.data.age >= 50 && rec.data.age < 60) {
                return 'Retired'
            }
        },
        depends: ['age']
    }]
});


Ext.define('Fiddle.Store', {
    extend: 'Ext.data.Store',
    autoDestroy: true,
    proxy: {
        type: 'ajax',
        url: meta.recordsUrl,
        reader: {
            type: 'json',
            rootProperty: 'data',
            idProperty: '_id',
            totalProperty: 'total'
        }
    },
    autoLoad: true,
    model: 'Fiddle.Model',
    remoteSort: false,
    sortInfo: {
        field: 'name',
        direction: 'ASC'
    },
    pageSize: 50,
    storeId: 'myStore'
}, function() {
    fiddleStore = new Fiddle.Store();
});


/**
 * Created by bradyhouse on 9/17/15.
 */
Ext.define('Fiddle.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fiddle',
    exportToExcel: function() {
        this.getView().saveDocumentAs({
            title: 'Pivot grid export demo',
            fileName: 'excelExport.xml'
        });
    },
    changeDock: function(button, checked) {
        if (checked) {
            this.getView().getPlugin('configurator').setDock(button.text.toLowerCase());
        }
    },
    onRender: function() {
        window.setTimeout(function() {
            var pivot = Ext.ComponentQuery.query('pivotgrid')[0];
            pivot.down('panel').collapse();
        }, 2000);
    }
});


Ext.define('Fiddle.View', {
    extend: 'Ext.pivot.Grid',
    xtype: 'fiddle',
    controller: 'fiddle',
    requires: [
        'Ext.pivot.Grid',
        'Ext.pivot.plugin.Exporter',
        'Fiddle.Store'
    ],
    title: null,
    collapsible: false,
    multiSelect: true,
    height: 350,
    selModel: {
        type: 'spreadsheet'
    },
    listeners: {
        render: 'onRender'
    },
    store: fiddleStore,
    aggregate: [{
        dataIndex: 'checkingBalance',
        header: 'checking',
        width: 150,
        aggregator: 'sum'
    }, {
        dataIndex: 'savingsBalance',
        header: 'Savings',
        width: 150,
        aggregator: 'sum'
    }],
    leftAxis: [{
        dataIndex: 'demo',
        header: 'Demo',
        width: 150
    }, {
        dataIndex: 'status',
        header: 'status',
        expanded: true,
        width: 150,
        sortable: false
    }, {
        dataIndex: 'name',
        header: 'customer',
        expanded: true,
        width: 150,
        sortable: false
    }],
    plugins: [{
        ptype: 'pivotexporter',
        pluginId: 'exporter'
    }, {
        ptype: 'pivotconfigurator',
        pluginId: 'configurator',
        dock: 'right'
    }],
    header: {
        itemPosition: 1, // after title before collapse tool
        items: [{
            ui: 'default-toolbar',
            xtype: 'button',
            text: 'Export to Excel',
            handler: 'exportToExcel'
        }]
    }
});

// Boiler plate
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
    items: [{
        xtype: 'panel',
        bind: {
            title: '{header}'
        },
        items: [{
            xtype: 'panel',
            padding: 10,
            border: false,
            bind: {
                html: '{subheader}'
            }
        }],
        region: 'north'
    }]
});
Ext.onReady(function() {
    var fiddle = Ext.create('Fiddle.View'),
        win = Ext.create('Ext.Window', {
            title: meta.fiddleHeader,
            closable: false,
            maximizable: true,
            height: 500,
            width: 700,
            layout: 'fit',
            items: fiddle
        }),
        positionX = 25,
        positionY = 192;
    win.showAt([positionX, positionY]);
    Ext.QuickTips.init();
    window.setTimeout(function() {
        win.maximize(true);
    }, 2500);
    Ext.create('App.Box', {
        renderTo: Ext.getBody()
    });
});
