declare let Slick: any, $: any;


export class SlickGridColGroupService {

    constructor() {
        $.extend(true, window, {Slick: {Plugins: {
            ColGroup: this.ColGroup
        }}});
    }

    ColGroup(service: any): void {
        let _uid: any = void 0,
            _handler: any = new Slick.EventHandler(),
            _cache: any = {};

        function toArray(list: any) {
            let i: number,
                array: any = [];
            for (i = 0; i < list.length; i++) {
                array[i] = list[i];
            }
            return array;
        }

        function init(grid: any) {
            _uid = grid.getContainerNode().className.match(/(?: |^)slickgrid_(\d+)(?!\w)/)[1];

            _handler.subscribe(grid.onColumnsResized, handleColumnsResized);

            let cache: any = _cache[_uid] = {};

            cache.grid = grid;
            cache.headerScrollerEl = grid.getContainerNode().querySelector('.slick-header-left');
            cache.rightHeaderScrollerEl = grid.getContainerNode().querySelector('.slick-header-right');

            cache.headerColumns = toArray(cache.headerScrollerEl.querySelectorAll('.slick-header-columns'));
            cache.rightHeaderColumns = toArray(cache.rightHeaderScrollerEl.querySelectorAll('.slick-header-columns'));
            cache.panelColumnNames = toArray(cache.headerScrollerEl.querySelectorAll('.slick-column-name')).map((node: any) => {
                return node.innerText;
            });

            cache.rightPanelColumnNames = toArray(cache.rightHeaderScrollerEl.querySelectorAll('.slick-column-name')).map((node: any) => {
                return node.innerText;
            });

            let filteredColumns: any[] = cache.headerColumns && cache.headerColumns.length ?
                    cache.headerColumns.filter(function (col: any) {
                        return col.children && col.children.length > 0 ? true : false;
                    }) : null,
                rightFilteredColumns: any[] = cache.rightHeaderColumns && cache.rightHeaderColumns.length ?
                    cache.rightHeaderColumns.filter(function (col: any) {
                        return col.children && col.children.length > 0 ? true : false;
                    }) : null;

            cache.origHeadersEl = filteredColumns && filteredColumns.length > 0 ? filteredColumns[0] :
                cache.headerScrollerEl.querySelectorAll('.slick-header-columns');

            cache.rightOrigHeadersEl = rightFilteredColumns && rightFilteredColumns.length > 0 ? rightFilteredColumns[0] : null;

            let originalColumnDef: any = grid.getColumns(),
                v = measureVCellPaddingAndBorder();

            cache.origHeadersEl.style.height = v.height + v.heightDiff + 'px';
            cache.origHeadersEl.style.overflow = 'visible';

            if (cache.rightOrigHeadersEl) {
                cache.rightOrigHeadersEl.style.height = v.height + v.heightDiff + 'px';
                cache.rightOrigHeadersEl.style.overflow = 'visible';
            }

            grid.setColumns = function (originalSetColumns: any) {
                return function (columnsDef: any) {
                    _uid = grid.getContainerNode().className.match(/(?: |^)slickgrid_(\d+)(?!\w)/)[1];

                    let cache: any = _cache[_uid],
                        allColumns: any[] = grid.getColumns();

                    if (cache.rightOrigHeadersEl && allColumns && allColumns.length) {
                        let columns: any[] = allColumns.filter((col: any) => {
                                return cache.panelColumnNames.indexOf(col.name) !== -1;
                            }),
                            rightColumns: any[] = allColumns.filter((col: any) => {
                                return cache.rightPanelColumnNames.indexOf(col.name) !== -1 ? true : false;
                            });

                        cache.columnsDef = columnsDef;
                        cache.leftColumnsDef = columnsDef.filter((col: any) => {
                            return cache.panelColumnNames.indexOf(col.name) !== -1 ? true : false;
                        });
                        cache.rightColumnsDef = columnsDef.filter((col: any) => {
                            return cache.rightPanelColumnNames.indexOf(col.name) !== -1 ? true : false;
                        });

                        cache.innerColumnsDef = genInnerColumnsDef(columnsDef);

                        cache.columnsDefByLevel = genColumnsDefByLevel(grid.getColumns());
                        cache.rightColumnsDefByLevel = genRightColumnsDefByLevel(rightColumns);
                        cache.leftColumnsDefByLevel = genRightColumnsDefByLevel(columns);


                        originalSetColumns(cache.innerColumnsDef);

                        createLeftColumnGroupHeaderRow();
                        createLeftColumnGroupHeaders();
                        applyLeftColumnGroupWidths();
                        createRightColumnGroupHeaderRow();
                        createRightColumnGroupHeaders();
                        applyRightColumnGroupWidths();
                    } else {
                        cache.columnsDef = columnsDef;
                        cache.innerColumnsDef = genInnerColumnsDef(columnsDef);
                        cache.columnsDefByLevel = genColumnsDefByLevel(grid.getColumns());
                        originalSetColumns(cache.innerColumnsDef);
                        createColumnGroupHeaderRow();
                        createColumnGroupHeaders();
                        applyColumnGroupWidths();
                    }


                };
            }(grid.setColumns);
            grid.getColumns = function () {
                return cache.columnsDef;
            };
            grid.destroy = function (originalDestroy: any) {
                return function () {
                    let styleEl: any = _cache[_uid].styleEl;
                    styleEl.parentNode.removeChild(styleEl);
                    originalDestroy();
                };
            }(grid.destroy);
            [
                'invalidate',
                'render'
            ].forEach(function (fnName) {
                grid[fnName] = function (origFn: any) {
                    return function () {
                        origFn(arguments);
                        applyColumnGroupWidths();
                    };
                }(grid[fnName]);
            });
            if (grid.getOptions()['explicitInitialization']) {
                grid.init = function (originalInit) {
                    return function () {
                        _uid = grid.getContainerNode().className.match(/(?: |^)slickgrid_(\d+)(?!\w)/)[1];
                        originalInit();
                        measureHCellPaddingAndBorder = memoizeMeasureHCellPaddingAndBorder();
                        grid.setColumns(originalColumnDef);
                        createCssRules();
                    };
                }(grid.init);
            } else {
                measureHCellPaddingAndBorder = memoizeMeasureHCellPaddingAndBorder();
                grid.setColumns(originalColumnDef);
                createCssRules();
            }
        }

        function handleColumnsResized() {
            let cache = _cache[_uid];

            if (cache.rightOrigHeadersEl) {
                applyLeftColumnGroupWidths();
                applyRightColumnGroupWidths();
            } else {
                applyColumnGroupWidths();
            }

            service.autoSizeColumns();
        }

        let measureHCellPaddingAndBorder: any;

        function memoizeMeasureHCellPaddingAndBorder() {
            let headerColumnWidthDiff: any = void 0;
            return function () {
                if (headerColumnWidthDiff != null)
                    return headerColumnWidthDiff;
                let h: any = [
                        'paddingLeft',
                        'paddingRight',
                        'borderLeftWidth',
                        'borderRightWidth'
                    ], $r: any = $(_cache[_uid].origHeadersEl),
                    $el = $('<div class="ui-state-default slick-header-column" id="" ' +
                        'style="visibility:hidden">-</div>').appendTo($r),
                    widthDiff = 0;
                h.forEach(function (val: any) {
                    widthDiff += parseFloat($el.css(val)) || 0;
                });
                $el.remove();
                headerColumnWidthDiff = widthDiff;
                return headerColumnWidthDiff;
            };
        }

        function measureVCellPaddingAndBorder() {
            let v: any = [
                    'borderTopWidth',
                    'borderBottomWidth',
                    'paddingTop',
                    'paddingBottom'
                ],
                $canvas: any = $(_cache[_uid].grid.getCanvasNode()), $r = $('<div class="slick-row" />').appendTo($canvas),
                $el: any = $('<div class="slick-cell" id="" style="visibility:hidden">-</div>').appendTo($r),
                height: any = void 0,
                heightDiff: any = 0;
            height = parseFloat($el.css('height'));
            v.forEach(function (val: any) {
                heightDiff += parseFloat($el.css(val)) || 0;
            });
            $r.remove();
            return {
                height: height,
                heightDiff: heightDiff
            };
        }

        function applyColumnGroupWidths() {
            let cache: any = _cache[_uid], origHeadersWidth = getHeadersWidth(),
                groupHeadersEl = cache.groupHeadersEl, maxLevel = groupHeadersEl.length;
            for (var r = 0; r < maxLevel; r++) {
                groupHeadersEl[r].style.width = origHeadersWidth;
            }
            let hPadding: any = measureHCellPaddingAndBorder();
            setWidthRecursively(cache.columnsDef);
            function setWidthRecursively(columnsDef: any, l: any = null, o: any = null) {
                let level: any = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
                let offsetsByLevel: any = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
                for (var c = 0, C = columnsDef.length; c < C; c++) {
                    let column: any = columnsDef[c],
                        columnSelector: any = '#slickgrid_' + (_uid + String(column.id).replace(/(#|,|\.)/g, '\\$1')),
                        columnEl = cache.headerScrollerEl.querySelector(columnSelector);
                    if (hasChildren(column)) {
                        setWidthRecursively(column.children, level + 1, offsetsByLevel);
                        let width: any = 0;
                        for (var c2 = 0, C2 = column.children.length; c2 < C2; c2++) {
                            let _columnSelector: any = '#slickgrid_' + (_uid +
                                    String(column.children[c2].id).replace(/(#|,|\.)/g, '\\$1')),
                                _columnEl = cache.headerScrollerEl.querySelector(_columnSelector);
                            if (_columnEl) {
                                width += _columnEl.offsetWidth;
                            }
                        }
                        if (columnEl) {
                            columnEl.style.width = width - hPadding + 'px';
                            columnEl.style.marginLeft = (offsetsByLevel[level] || 0) + 'px';
                            columnsDef[c].width = width - hPadding;
                        }
                        offsetsByLevel[level] = 0;
                    } else {
                        if (columnEl) {
                            for (var l = level; l < maxLevel; l++) {
                                offsetsByLevel[l] = (offsetsByLevel[l] || 0) + columnEl.offsetWidth;
                            }
                        }
                    }
                }
            }
        }

        function applyLeftColumnGroupWidths() {
            let cache: any = _cache[_uid],
                origHeadersWidth = getHeadersWidth(),
                groupHeadersEl = cache.leftGroupHeadersEl,
                maxLevel = groupHeadersEl.length;
            for (var r = 0; r < maxLevel; r++) {
                groupHeadersEl[r].style.width = origHeadersWidth;
            }
            let hPadding: any = measureHCellPaddingAndBorder();
            setWidthRecursively(cache.leftColumnsDef);
            function setWidthRecursively(columnsDef: any, l: any = null, o: any = null) {
                let level: any = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
                let offsetsByLevel: any = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
                for (var c = 0, C = columnsDef.length; c < C; c++) {
                    let column: any = columnsDef[c],
                        columnSelector: any = '#slickgrid_' + (_uid + String(column.id).replace(/(#|,|\.)/g, '\\$1')),
                        columnEl = cache.headerScrollerEl.querySelector(columnSelector);
                    if (hasChildren(column)) {
                        setWidthRecursively(column.children, level + 1, offsetsByLevel);
                        let width: any = 0;
                        for (var c2 = 0, C2 = column.children.length; c2 < C2; c2++) {
                            let _columnSelector: any = '#slickgrid_' + (_uid +
                                    String(column.children[c2].id).replace(/(#|,|\.)/g, '\\$1')),
                                _columnEl = cache.headerScrollerEl.querySelector(_columnSelector);
                            if (_columnEl) {
                                width += _columnEl.offsetWidth;
                            }
                        }
                        if (columnEl) {
                            columnEl.style.width = width - hPadding + 'px';
                            columnEl.style.marginLeft = (offsetsByLevel[level] || 0) + 'px';
                        }
                        offsetsByLevel[level] = 0;
                    } else {
                        if (columnEl) {
                            for (var l = level; l < maxLevel; l++) {
                                offsetsByLevel[l] = (offsetsByLevel[l] || 0) + columnEl.offsetWidth;
                            }
                        }
                    }
                }
            }
        }

        function applyRightColumnGroupWidths() {
            let cache: any = _cache[_uid],
                origHeadersWidth = getRightHeadersWidth(),
                groupHeadersEl = cache.rightGroupHeadersEl,
                maxLevel = groupHeadersEl.length;
            for (var r = 0; r < maxLevel; r++) {
                groupHeadersEl[r].style.width = origHeadersWidth;
            }
            let hPadding: any = measureHCellPaddingAndBorder();
            setWidthRecursively(cache.rightColumnsDef);

            function setWidthRecursively(columnsDef: any, l: any = null, o: any = null) {
                let level: any = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
                let offsetsByLevel: any = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
                for (var c = 0, C = columnsDef.length; c < C; c++) {
                    let column: any = columnsDef[c],
                        columnSelector: any = '#slickgrid_' + (_uid + String(column.id).replace(/(#|,|\.)/g, '\\$1')),
                        columnEl = cache.rightHeaderScrollerEl.querySelector(columnSelector);
                    if (hasChildren(column)) {
                        setWidthRecursively(column.children, level + 1, offsetsByLevel);
                        let width: any = 0;
                        for (var c2 = 0, C2 = column.children.length; c2 < C2; c2++) {
                            let _columnSelector: any = '#slickgrid_' + (_uid +
                                    String(column.children[c2].id).replace(/(#|,|\.)/g, '\\$1')),
                                _columnEl = cache.rightHeaderScrollerEl.querySelector(_columnSelector);
                            if (_columnEl) {
                                width += _columnEl.offsetWidth;
                            }
                        }
                        if (columnEl) {
                            columnEl.style.width = width - hPadding + 'px';
                            columnEl.style.marginLeft = (offsetsByLevel[level] || 0) + 'px';
                        }
                        offsetsByLevel[level] = 0;
                    } else {
                        if (columnEl) {
                            for (var l = level; l < maxLevel; l++) {
                                offsetsByLevel[l] = (offsetsByLevel[l] || 0) + columnEl.offsetWidth;
                            }
                        }
                    }
                }
            }
        }

        function getHeadersWidth() {
            return _cache[_uid].origHeadersEl.style.width;
        }

        function getRightHeadersWidth() {
            return _cache[_uid].rightOrigHeadersEl.style.width;
        }

        function createColumnGroupHeaderRow() {
            var cache = _cache[_uid], headerScrollerEl = cache.headerScrollerEl,
                groupHeadersEl = cache.groupHeadersEl = cache.groupHeadersEl || [],
                columnsDefByLevel = cache.columnsDefByLevel;
            for (var i = 0, len = groupHeadersEl.length; i < len; i++) {
                headerScrollerEl.removeChild(cache.groupHeadersEl[i]);
            }
            var fragment = document.createDocumentFragment();
            for (var _i = 0, _len = columnsDefByLevel.length; _i < _len - 1; _i++) {
                var tmp = document.createElement('div');
                tmp.innerHTML = '<div class="slick-header-columns slick-header-columns-groups" ' +
                    'style="left: -1000px" unselectable="on"></div>';
                groupHeadersEl[_i] = tmp.childNodes[0];
                fragment.appendChild(groupHeadersEl[_i]);
            }
            headerScrollerEl.insertBefore(fragment, cache.headerScrollerEl.firstChild);
        }

        function createLeftColumnGroupHeaderRow() {
            var cache = _cache[_uid],
                headerScrollerEl = cache.headerScrollerEl,
                groupHeadersEl = cache.leftGroupHeadersEl = cache.leftGroupHeadersEl || [],
                columnsDefByLevel = cache.leftColumnsDefByLevel;
            for (var i = 0, len = groupHeadersEl.length; i < len; i++) {
                headerScrollerEl.removeChild(cache.leftGroupHeadersEl[i]);
            }
            var fragment = document.createDocumentFragment();
            for (var _i = 0, _len = columnsDefByLevel.length; _i < _len - 1; _i++) {
                var tmp = document.createElement('div');
                tmp.innerHTML = '<div class="slick-header-columns slick-header-columns-groups" ' +
                    'style="left: -1000px" unselectable="on"></div>';
                groupHeadersEl[_i] = tmp.childNodes[0];
                fragment.appendChild(groupHeadersEl[_i]);
            }
            headerScrollerEl.insertBefore(fragment, cache.headerScrollerEl.firstChild);
        }

        function createRightColumnGroupHeaderRow() {
            var cache = _cache[_uid],
                headerScrollerEl = cache.rightHeaderScrollerEl,
                groupHeadersEl = cache.rightGroupHeadersEl = cache.rightGroupHeadersEl || [],
                columnsDefByLevel = cache.rightColumnsDefByLevel;
            for (var i = 0, len = groupHeadersEl.length; i < len; i++) {
                headerScrollerEl.removeChild(cache.rightGroupHeadersEl[i]);
            }
            var fragment = document.createDocumentFragment();
            for (var _i = 0, _len = columnsDefByLevel.length; _i < _len - 1; _i++) {
                var tmp = document.createElement('div');
                tmp.innerHTML = '<div class="slick-header-columns slick-header-columns-groups" ' +
                    'style="left: -1000px" unselectable="on"></div>';
                groupHeadersEl[_i] = tmp.childNodes[0];
                fragment.appendChild(groupHeadersEl[_i]);
            }
            headerScrollerEl.insertBefore(fragment, cache.rightHeaderScrollerEl.firstChild);
        }

        function createColumnGroupHeaders() {
            var cache = _cache[_uid], columnsDefByLevel = cache.columnsDefByLevel;
            for (var r = 0, R = cache.groupHeadersEl.length; r < R; r++) {
                var toCreateColumnsDef = columnsDefByLevel[r], columnsGroupHtml = '';
                for (var c = 0, C = toCreateColumnsDef.length; c < C; c++) {
                    var column = toCreateColumnsDef[c];
                    if (hasChildren(column)) {
                        columnsGroupHtml += '\n<div class="ui-state-default slick-header-column slick-header-columns-group '
                            + (column.headerCssClass || '') + '"\n  id="slickgrid_' + (_uid + column.id) +
                            '"\n  title="' + column.toolTip + '">\n  <span class="slick-column-name">' +
                            (hasChildren(column) ? column.name || '' : '') + '</span>\n</div>';
                    } else {
                        var tipColumn = cache.origHeadersEl.querySelector('#slickgrid_' + (_uid
                            + String(column.id).replace(/(#|,|\.)/g, '\\$1')));
                        if (tipColumn) {
                            tipColumn.className += ' h' + (columnsDefByLevel.length - r);
                        }
                    }
                }
                cache.groupHeadersEl[r].innerHTML = columnsGroupHtml;
            }
            cache.grid.resizeCanvas();
        }

        function createLeftColumnGroupHeaders() {
            var cache = _cache[_uid],
                columnsDefByLevel = cache.leftColumnsDefByLevel;
            for (var r = 0, R = cache.leftGroupHeadersEl.length; r < R; r++) {
                var toCreateColumnsDef = columnsDefByLevel[r], columnsGroupHtml = '';
                for (var c = 0, C = toCreateColumnsDef.length; c < C; c++) {
                    var column = toCreateColumnsDef[c];
                    if (hasChildren(column)) {
                        columnsGroupHtml += '\n<div class="ui-state-default slick-header-column slick-header-columns-group '
                            + (column.headerCssClass || '') + '"\n  id="slickgrid_' + (_uid + column.id) +
                            '"\n  title="' + column.toolTip + '">\n  <span class="slick-column-name">' +
                            (hasChildren(column) ? column.name || '' : '') + '</span>\n</div>';
                    } else {
                        var tipColumn = cache.origHeadersEl.querySelector('#slickgrid_' + (_uid
                            + String(column.id).replace(/(#|,|\.)/g, '\\$1')));
                        if (tipColumn) {
                            tipColumn.className += ' h' + (columnsDefByLevel.length - r);
                        }
                    }
                }
                cache.leftGroupHeadersEl[r].innerHTML = columnsGroupHtml;
            }
            cache.grid.resizeCanvas();
        }

        function createRightColumnGroupHeaders() {
            let cache = _cache[_uid],
                columnsDefByLevel = cache.rightColumnsDefByLevel;
            for (var r = 0, R = cache.rightGroupHeadersEl.length; r < R; r++) {
                let toCreateColumnsDef = columnsDefByLevel[r],
                    columnsGroupHtml = '';
                for (var c = 0, C = toCreateColumnsDef.length; c < C; c++) {
                    var column = toCreateColumnsDef[c];
                    if (hasChildren(column)) {
                        columnsGroupHtml += '\n<div class="ui-state-default slick-header-column slick-header-columns-group '
                            + (column.headerCssClass || '') + '"\n  id="slickgrid_' + (_uid + column.id) +
                            '"\n  title="' + column.toolTip + '">\n  <span class="slick-column-name">' +
                            (hasChildren(column) ? column.name || '' : '') + '</span>\n</div>';
                    } else {
                        var tipColumn = cache.rightOrigHeadersEl.querySelector('#slickgrid_' + (_uid
                            + String(column.id).replace(/(#|,|\.)/g, '\\$1')));
                        if (tipColumn) {
                            tipColumn.className += ' h' + (columnsDefByLevel.length - r);
                        }
                    }
                }
                cache.rightGroupHeadersEl[r].innerHTML = columnsGroupHtml;
            }
            cache.grid.resizeCanvas();
        }

        function createCssRules() {
            var cache = _cache[_uid], v = measureVCellPaddingAndBorder(), rules = ['.hidden {visibility: hidden;}'],
                maxLevel = cache.columnsDefByLevel.length;
            for (var i = 1; i <= maxLevel; i++) {
                rules.push('\n.slick-header-column.h' + i + ' {\n  margin: ' + (1 - i) * (v.height + v.heightDiff) +
                    'px 0 0 0;\n  font-size: inherit;\n  height: ' + (i * (v.height + v.heightDiff) - v.heightDiff * 2 + 1)
                    + 'px;\n}');
            }
            var styleEl = cache.styleEl = $('<style type="text/css" rel="stylesheet" />').appendTo($('head'))[0];
            if (styleEl.styleSheet) {
                styleEl.styleSheet.cssText = rules.join(' ');
            } else {
                styleEl.appendChild(document.createTextNode(rules.join(' ')));
            }
        }

        function genColumnsDefByLevel(columns: any, d: any = null, a: any = null) {
            var depth: any = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
            var acc: any = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
            for (var i = 0, len = columns.length; i < len; i++) {
                var column: any = columns[i];
                acc[depth] = acc[depth] || [];
                acc[depth].push(column);
                if (hasChildren(column)) {
                    genColumnsDefByLevel(column.children, depth + 1, acc);
                }
            }
            return acc;
        }

        function genRightColumnsDefByLevel(columns: any, d: any = null, a: any = null) {
            var cache: any = _cache[_uid],
                depth: any = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1],
                acc: any = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];


            for (var i = 0, len = columns.length; i < len; i++) {
                var column: any = columns[i];
                acc[depth] = acc[depth] || [];
                acc[depth].push(column);
                if (hasChildren(column)) {
                    genRightColumnsDefByLevel(column.children, depth + 1, acc);
                }
            }
            return acc;
        }

        function genInnerColumnsDef(columns: any, a: any = null, b: any = null) {
            var acc: any = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
            var first: any = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
            for (var i = 0, len = columns.length; i < len; i++) {
                var column: any = columns[i];
                if (!hasChildren(column)) {
                    acc.push(column);
                } else {
                    genInnerColumnsDef(column.children, acc, false);
                }
            }
            return acc;
        }

        function hasChildren(column: any) {
            return column.children && column.children.length > 0 &&
                Object.prototype.toString.apply(column.children) === '[object Array]' || false;
        }

        $.extend(this, {init: init});
    }


}
