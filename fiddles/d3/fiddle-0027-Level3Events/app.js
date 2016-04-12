(function (app, $, undefined) {
    "use strict";

    let metadata = {
        fiddleHeader: 'D3 - Events',
        urls: {
            github: 'https://github.com/bradyhouse/house/tree/master/fiddles/d3/fiddle-0027-Level3Events'
        },
        consoleTag: 'H O U S E ~ f i d d l e s'
    };


    function container() {

        d3.select("app")
            .append('div');

        d3.select("app")
            .select("div")
            .attr("class", "container-fluid box-lime");

    }

    function navbar() {
        d3.select("app")
            .select("div.container-fluid")
            .append("div");

        d3.select("app")
            .select(".container-fluid")
            .select("div")
            .attr("class", "navbar-header box-turquoise");

    }

    function ul() {
        d3.select("app")
            .select("div.navbar-header")
            .append("ul");

        d3.select("app")
            .select("ul")
            .attr("class", "nav navbar-nav box-magenta");
    }

    function li() {
        d3.select("app")
            .select("ul")
            .append("li");

        d3.select("app")
            .select("ul")
            .select("li")
            .attr("class", "btn btn-default box-deepskyblue");
    }

    function a() {
        d3.select("app")
            .select("li")
            .append('a');

        d3.select("app")
            .select('a')
            .attr('href', "#")
            .text('li');
    }

    function events() {
        d3.select("app")
            .select('a')
            .on('mouseover', () => {
                d3.select("app")
                    .select("a")
                    .text('li > mouseover');
            })
            .on('mousedown', () => {
                d3.select("app")
                    .select("a")
                    .text('li > mousedown');
            })
            .on('click', () => {
                d3.select("app")
                    .select("a")
                    .text('li > click');
            })
            .on('mouseout', () => {
                d3.select("app")
                    .select("a")
                    .text('li > mouseout');
            });

    }

    function configConsole() {
        console.log("%c" + metadata.consoleTag, 'font-style: italic; font-size: 20px;');
        console.log("%c" + metadata.urls.github, "color: blue; font-style: italic; text-decoration: underline; background-color: #FFFF00;");
        console.group();
    }

    function init() {
        container();
        navbar();
        ul();
        li();
        a();
        events();
        configConsole();
    }

    init();


})(window.app = window.app || {}, d3)
