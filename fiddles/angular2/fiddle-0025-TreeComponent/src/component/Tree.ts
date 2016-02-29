import {Component, View} from 'angular2/core';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import * as core from 'angular2/core';
import {TreeView} from './TreeView';
import {TreeNode} from './TreeNode';
import {TreeDataService} from './TreeDataService';


@Component({
    selector: 'tree',
    template: `

    <div class="container-fluid">
        <div class="row">
            <code>TREE COMPONENT</code>
        </div>
        <hr/>
        <p><input id="queryEl" type="text" placeholder="Search" #queryEl (keyup)="0">&nbsp;
        <button class="btn btn-default" (click)="onShowSelectedClick()">
            <span class="fa fa-list-ul" title="Show selected"></span>
        </button>&nbsp;
        <button class="btn btn-default" (click)="onResetClick()">
            <span class="fa fa-times" title="Unselect all"></span>
        </button>
        <p></p>
        <treeview [store]="root.nodes" [queryEl]="queryEl" [isChecked]="isChecked"></treeview>
    </div>

  `,
    directives: [TreeView],
    providers: [HTTP_PROVIDERS, TreeDataService]
})
export class Tree implements OnInit {

    query:String = "";
    isChecked:Boolean = false;

    constructor(private service:TreeDataService) {
        this.root = new TreeNode("root", [], null);
    }

    ngOnInit() {
        this.service.request().subscribe((res:Response) => {
            if (res.children) {
                res.children.map(function (parentNode) {
                    var rootChildNode = new TreeNode(parentNode.title, [], this.root);
                    if (!parentNode.leaf) {
                        parentNode.children.map(function (child) {
                            rootChildNode.nodes.push(new TreeNode(child.title, [], rootChildNode));
                        });
                        rootChildNode.nodes.sort(function (a, b) {
                            return a.name < b.name;
                        });
                    }
                    this.root.nodes.push(rootChildNode);
                }, this);
            }
        });
    }

    onResetClick() {
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

    onShowSelectedClick() {
        this.isChecked = !this.isChecked;
    }

}
