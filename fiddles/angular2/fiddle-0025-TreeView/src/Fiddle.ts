import {Component} from 'angular2/core';
import * as core from 'angular2/core';
import {TreeView} from './component/TreeView';
import {Directory} from './component/Directory';

@Component({
    selector: 'app',
    template: `
    <treeview [store]="directories"></treeview>
  `,
    directives: [TreeView]
})
export class Fiddle {
    directories: Array<Directory>;

    constructor() {
        this.load();
    }


    load() {
        const fall2014 = new Directory('Fall 2014', [], ['image1.jpg', 'image2.jpg', 'image3.jpg']);
        const summer2014 = new Directory('Summer 2014', [], ['image10.jpg', 'image20.jpg', 'image30.jpg']);
        const pics = new Directory('Pictures', [summer2014, fall2014], []);
        const music = new Directory('Music', [], ['song1.mp3', 'song2.mp3']);
        this.directories = [pics, music];
    }
}
