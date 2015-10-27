
class Util {

    static log(msg) {

        var div = document.createElement('div');
        div.innerHTML = msg;
        div.style.color = "red";
        $("#fiddleHook").append(div);

    }

}
