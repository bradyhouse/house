import {Component} from 'angular2/core';

class Base {
    constructor(config) {
        this._html = config.html || '<div>';
        this.self = $(this.html);
        this.hook = config.hook || $('body');
        this.render();
    }
    render() {
        if (this.hook && this.html) {
            this.hook.append(this.self);
        }
    }
    get html() {
        return this._html;
    }
    set html(value) {
        this._html = value;
    }
    get hook() {
        return this._hook;
    }
    set hook(value) {
        this._hook = value;
    }
}
class Container extends Base {
    constructor(config) {
        config.html = '<div id="viewport" style="width:' + (config.width || '500px') + ';' +
            'height:' + (config.height || '500px') + ';position:relative;border:1px solid gray;">';
        super(config);
        this.rendered = config.rendered;
        this.width = config.width || "500px";
        this.height = config.height || "500px";
        this.layout();
    }
    get width() {
        return this._width;
    }
    set width(value) {
        this._width = value;
    }
    get height() {
        return this._height;
    }
    set height(value) {
        this._height = value;
    }
    get rendered() {
        return this._rendered
    }
    set rendered(fn) {
        this._rendered = fn;
    }

    /**
     * Method used to initialize and assemble ("layout")
     * the sub components of the viewport.
     * @returns {boolean or rendered callback}
     */
    layout() {
        var me = this,
            scrollBox = new ScrollBox({
                hook: me.self
            }),
            content = new ContentFrame({
                hook: scrollBox.self
            });
        if (typeof me.rendered === 'function') {
            return this.rendered.apply(me, [me, scrollBox, content]);
        }
        return true;
    }
}
class ScrollBox extends Base {
    constructor(config) {
        config.html = config.html || '<div id="scrollbox" style="max-height:100%;overflow:auto;">';
        super(config);
    }
}
class ContentFrame extends Base {
    constructor(config) {
        config.html = config.html || '<div id="content">';
        super(config);
    }
}
