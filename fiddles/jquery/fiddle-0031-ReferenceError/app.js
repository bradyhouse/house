
function foo(a) {
    console.log(a + b);
    b = a;
}

try {

    foo (2);

} catch (e) {
    var div = document.createElement('div');
    div.innerHTML = e.stack;
    div.style.color = "red";
    $("#fiddleHook").append(div);
}

