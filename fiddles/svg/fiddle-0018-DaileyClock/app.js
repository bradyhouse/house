var Root = document.documentElement,
    xmlns = "http://www.w3.org/2000/svg",
    Colors = new Array('#ffd700','#e5c100','#ccac00', '#b29600', '#998100', '#7f6b00', '#665600');

function start() {
    var root = document.getElementById("root").getBBox(),
        cx = root.width / 2,
        cy = root.height / 2,
        center = cx + "," + cy,
        AT = document.getElementById("AT"),
        AB = document.getElementById("AB"),
        cogs = document.getElementById("cogs"),
        gears = document.getElementById("gears"),
        date = new Date(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds(),
        d = new Array(hour * 30 + minute / 2, minute * 6 + second / 10, second * 6),
        times = new Array(43200, 3600, 60),
        rect = document.getElementsByTagName("rect"),
        v = "360," + cx + "," + cy + ";0," + cx + "," + cy;
    AB.setAttributeNS(null, "values", v);
    for (i = 1; i < rect.length; i++) {
        var CL = AT.cloneNode("false");
        CL.setAttributeNS(null, "from", d[i - 1] + "," + center);
        CL.setAttributeNS(null, "to", (d[i - 1] + 360) + "," + center);
        CL.setAttributeNS(null, "dur", times[i - 1] + "s");
        rect.item(i).appendChild(CL);
    }
    for (i = 7; i > 0; i--) {
        var color = Colors[(i) % Colors.length],
            cogInstance = cogs.cloneNode("true");
        cogInstance.setAttributeNS(null, "fill", color);
        cogInstance.setAttributeNS(null, "cx", cx + (i - 2) * cx / 24);
        cogInstance.setAttributeNS(null, "r", (i) * cx / 32);
        cogInstance.setAttributeNS(null, "cy", cy + (i - 2) * cx / 24);
        cogInstance.setAttributeNS(null, "stroke-dasharray", i * 5 + "," + i * 8);
        cogInstance.firstChild.setAttributeNS(null, "dur", 1.5 * i + .25);
        gears.appendChild(cogInstance);
    }
}

$(document).ready(function () {
    $('#canvas').height(500);
});
