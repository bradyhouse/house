import {Component, View, EventEmitter, OnInit} from 'angular2/core';
import {Http, Headers, Response, HTTP_PROVIDERS} from 'angular2/http';
import * as core from 'angular2/core';
import {TreeViewController} from './view/TreeView';
import {TreeNode} from './model/TreeNode';
import {TreeDataService} from './store/TreeDataService';


@Component({
    selector: 'tree',
    moduleId: module.id,
    inputs: ['height', 'uiClassPrefix', 'url'],
    providers: [HTTP_PROVIDERS, TreeDataService],
    events: ['nodeCheckChange']
})
@View({
    templateUrl: './tree.html',
    styleUrls: ['tree.css'],
    directives: [TreeViewController]
})
export class TreeController implements OnInit {
    private query:String = "";
    private root:TreeNode;
    private isChecked:Boolean = false;
    public height:Number;
    public url:String;
    public uiClassPrefix:String;
    public selectedNodes:String[];
    public nodeCheckChange:EventEmitter = new EventEmitter();
    constructor(private treeDataService:TreeDataService) {
        this.root = new TreeNode("root", [], null);
    }
    private ngOnInit() {
        this.treeDataService.request(this.url).subscribe((res:Response) => {
            if (res.children) {
                res.children.map(function (parentNode) {
                    var rootChildNode = new TreeNode(parentNode.title, [], this.root);
                    if (!parentNode.leaf) {
                        parentNode.children.map(function (child) {
                            rootChildNode.nodes.push(new TreeNode(child.name.toUpperCase(), [], rootChildNode));
                        });
                        rootChildNode.nodes.sort(function (a, b) {
                            return parseFloat(a.checking) - parseFloat(b.checking);
                        });
                    }
                    this.root.nodes.push(rootChildNode);
                }, this);
            }
        });
    }
    private onResetClick() {
        this.isChecked = false;
        this.root.nodes.map(function (node) {
            node.expanded = false;
            node.checked = false;
            node.nodes.map(function (node) {
                node.expanded = false;
                node.checked = false;
            });
        });
        document.getElementById('queryEl').value = "";
    }
    private onShowSelectedClick() {
        this.isChecked = !this.isChecked;
    }
    private changed() {
        this.nodeCheckChange.next({
            nodes: this.root.selectedNodes
        });
    }
}
