console.log("%c" + meta.consoleTag, 'font-style: italic; font-size: 20px;');
console.log("%c" + meta.urls.github, "color: blue; font-style: italic; text-decoration: underline; background-color: #FFFF00;");
console.group();

enableProdMode();
bootstrap(App, )
    .catch(err => console.error(err));