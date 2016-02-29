import {Component, View} from 'angular2/core';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import * as core from 'angular2/core';
import {TreeView} from './TreeView';
import {TreeNode} from './TreeNode';
import {TreeDataService} from './TreeDataService';


@Component({
    selector: 'tree',
    template: `
        <table class="{{uiClassPrefix}}-table">
            <tr>
                <td nowrap="true" class="{{uiClassPrefix}}-toolbar">
                    <input class="{{uiClassPrefix}}-search-field" id="queryEl" type="text" placeholder="Search" #queryEl (keyup)="0">&nbsp;
                    <button class="{{uiClassPrefix}}-btn btn btn-default btn-xs" (click)="onShowSelectedClick()">
                        <span class="fa fa-list-ul" title="Show selected"></span>
                    </button>&nbsp;
                    <button class="{{uiClassPrefix}}-btn btn btn-default btn-xs" (click)="onResetClick()">
                        <span class="fa fa-times" title="Unselect all"></span>
                    </button>
                </td>
            </tr>
            <tr>
                <td>
                    <div id="scrollbox" class="{{uiClassPrefix}}-scrollbox" style=" height: {{height}}px;">
                    <treeview [store]="root.nodes" [uiClassPrefix]="uiClassPrefix" [queryEl]="queryEl" [isChecked]="isChecked"></treeview>
                    </div>
                </td>
            </tr>
        </table>

  `,
    directives: [TreeView],
    inputs: ['height', 'uiClassPrefix', 'url'],
    providers: [HTTP_PROVIDERS, TreeDataService]
})
export class Tree implements OnInit {

    query:String = "";
    isChecked:Boolean = false;
    height:number;
    url:String;
    uiClassPrefix:String;

    constructor(private service:TreeDataService) {
        this.root = new TreeNode("root", [], null);
    }

    ngOnInit() {
        this.service.request(this.url).subscribe((res:Response) => {
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
