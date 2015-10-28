

app.view.clock.mixin.Surface = class {

    constructor() {
        this.prototype = new Object();
        this.prototype.afterInit = this.afterInit;
    }

    afterInit(view, controller) {
        if (view) {
            view.onRender = function(group) {
                group.parent.docElementNS.setAttribute('onload', 'app.view.clock.mixin.Surface.onSurfaceLoad("' + view.id + '")');
            }
        }
    }

    static onSurfaceLoad(clockId) {

        var root = document.getElementById("root").getBBox(),
            transformId = clockId + '-transform',
            cx = root.width / 2,
            cy = root.height / 2,
            center = cx + "," + cy,
            animateTransform = document.getElementById(transformId),
            date = new Date(),
            hour = date.getHours(),
            minute = date.getMinutes(),
            second = date.getSeconds(),
            d = new Array(hour * 30 + minute / 2, minute * 6 + second / 10, second * 6),
            times = new Array(43200, 3600, 60),
            rect = document.getElementsByTagName("rect");
        for (var i = 1; i < rect.length; i++) {
            var cloneTransform = animateTransform.cloneNode(false);
            cloneTransform.setAttributeNS(null, "from", d[i - 1] + "," + center);
            cloneTransform.setAttributeNS(null, "to", (d[i - 1] + 360) + "," + center);
            cloneTransform.setAttributeNS(null, "dur", times[i - 1] + "s");
            rect.item(i).appendChild(cloneTransform);
        }

    }

}

