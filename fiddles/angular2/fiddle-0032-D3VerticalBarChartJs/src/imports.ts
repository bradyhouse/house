import {Component, enableProdMode, Injectable, Inject, Input, Output, EventEmitter, OnInit, ElementRef} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/add/operator/map';

var d3:any = window.d3,
    meta:any = {
        fiddleHeader: 'Angular 2 - D3 Vertical Bar Chart',
        urls: {
            github: 'https://github.com/bradyhouse/house/tree/master/fiddles/angular2/fiddle-0032-D3VerticalBarChartJs',
            data: "data.json"
        },
        consoleTag: 'H O U S E ~ f i d d l e s'
    };
