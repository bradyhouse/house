import {Component, View} from 'angular2/core';
import {Http, Headers, HTTP_PROVIDERS} from 'angular2/http';
import * as core from 'angular2/core';
import {TreeViewController} from './TreeView';
import {DisplayNodes} from './DisplayNodes';
import {TreeNode} from './TreeNode';
import {TreeDataService} from './TreeDataService';


@Component({
    selector: 'tree',
    inputs: ['height', 'uiClassPrefix', 'url'],
    providers: [HTTP_PROVIDERS, TreeDataService]
})
@View({
    template: `
        <table class="{{uiClassPrefix}}-table">
            <tr>
                <td nowrap="true" class="{{uiClassPrefix}}-toolbar">
                    <displaynodes *ngFor="#selectedNode of root.selectedNodes" [nodes]="selectedNode"></displaynodes>
                </td>
            </tr>
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
                    <div class="{{uiClassPrefix}}-scrollbox" style=" height: {{height}}px;">
                    <treeview (change)="changed()" [store]="root.nodes" [uiClassPrefix]="uiClassPrefix" [queryEl]="queryEl" [isChecked]="isChecked"></treeview>
                    </div>
                </td>
            </tr>
        </table>
  `,
    directives: [TreeViewController, DisplayNodes]
})
export class TreeController implements OnInit {

    query:String = "";
    root:TreeNode;
    isChecked:Boolean = false;
    height:number;
    url:String;
    uiClassPrefix:String;
    selectedNodes:String[];

    constructor(private treeDataService:TreeDataService) {
        this.root = new TreeNode("root", false, [], null);
    }

    changed() {
    }

    ngOnInit() {
        this.treeDataService.request(this.url).subscribe((res:any) => {
            if (res.children) {
                res.children.map((parentNode: any) => {
                    this.root.nodes.push(this._transform(parentNode, this.root));
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

    private _transform(parentNode: any, root: any): any {
        let rootChildNode: any = new TreeNode(parentNode.title,
            parentNode.hasOwnProperty('selectable') ? parentNode.selectable : true,
            [],
            root);
        if (!parentNode.leaf) {
            if (parentNode.children && parentNode.children) {
                parentNode.children.map((child: any) => {
                    if (!child.leaf) {
                        rootChildNode.nodes.push(this._transform(child, rootChildNode));
                    } else {
                        rootChildNode.nodes.push(new TreeNode(
                            child.title,
                            child.hasOwnProperty('selectable') ? child.selectable : true,
                            [],
                            rootChildNode));
                    }
                });
                rootChildNode.nodes.sort((a: any, b: any) => {
                    return a.name < b.name;
                });
            }
        }
        return rootChildNode;
    }


}
