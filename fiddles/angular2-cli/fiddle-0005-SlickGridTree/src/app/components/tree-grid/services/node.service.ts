import { Injectable } from '@angular/core';
import {
  Node
} from '../interfaces/index';

@Injectable()
export class NodeService {
  dataView: any;
  nodes: Node[];
  collapsedNodeIds: number[];
  selectedNodeIds: number[];
  schema: any[];

  constructor() {
    this.nodes = [];
    this.schema = [
      {id: 'title', field: 'title', index: 0, formatter: this.formatNode, width: 200}
    ];
    this.collapsedNodeIds = [];
    this.selectedNodeIds = [];
  }


  transform(nodes: any[], collapsed: any[]): any[] {
    let flatNodes: any[] = [],
      ids: any = {};

    if (!nodes) {
      nodes = [];
    }

    nodes.forEach((node: any) => {
      flatNodes = this._flattenNodes(node, flatNodes, -1, 0, true);
    });

    nodes = flatNodes.map((node: any, index: number) => {
      node = Object.assign({}, node);
      node.id = index;
      if (ids[node.id]) {
        node.id += index;
      }
      ids[node.id] = true;
      node.order = index;
      node.expanded = false;
      node.selected = false;
      return node;
    });
    return nodes;
  }

  select(node: any, state:boolean) {
    if (state) {
      if (!this.selectedNodeIds[node.id]) {
        this.selectedNodeIds.push(node.id);
      }
    } else {
      if (this.selectedNodeIds[node.id]) {
        this.selectedNodeIds.splice(this.selectedNodeIds.indexOf(node.id), 1)
      }
    }
  }

  expandAll(): void {
    this.nodes.forEach((node: Node) => {
      let dataNode: any = this.dataView.getItemById(node.id);
      if (dataNode && dataNode.children && dataNode.children.length) {
        dataNode.expanded = true;
        this.dataView.updateItem(node.id, dataNode);
      }
    });
    this.collapsedNodeIds = [];
  }

  collapseAll(): void {
    let collapsedNodes: any[] = [];
    this.nodes.forEach((node: Node) => {
      let dataNode: any = this.dataView.getItemById(node.id);
      if (dataNode && dataNode.children && dataNode.children.length) {
        if (!collapsedNodes[node.id]) {
          collapsedNodes.push(node.id);
        }
        dataNode.expanded = false;
        this.dataView.updateItem(node.id, dataNode);
      }
    });
    this.collapsedNodeIds = collapsedNodes;
    this.dataView.refresh();

  }

  selectAll(): void {
    let selectedNodes: any[] = [];
    this.nodes.forEach((node: Node) => {
      let dataNode: any = this.dataView.getItemById(node.id);
      if (dataNode) {
        if (!selectedNodes[node.id]) {
          selectedNodes.push(node.id);
        }
        dataNode.selected = true;
        this.dataView.updateItem(node.id, dataNode);
      }
    });
    this.selectedNodeIds = selectedNodes;
    this.dataView.refresh();

  }

  clearAll(): void {
    if (this.selectedNodeIds.length) {
      this.selectedNodeIds.forEach((id:any) => {
        let node: any = this.dataView.getItemById(id);
        if (node) {
          node.selected = false;
          if (node.hasOwnProperty('children') && node.children.length) {
            node.expanded = false;
            if (this.collapsedNodeIds[id]) {
              this.collapsedNodeIds.splice(this.collapsedNodeIds.indexOf(id), 1);
            }
          }
          this.dataView.updateItem(id, node);
        }
      });
      this.selectedNodeIds = [];
      this.dataView.refresh();
    }
  }

  isSiblingSelected(node: any, skipId: number): boolean {
    let selectedChildren: any[] = node.children && node.children.length ?
      node.children.filter((child: any) => {
        let childRow = this.dataView.getItemById(child.id);
        return childRow && childRow.id !== skipId && childRow.selected;
      }) : null;
    return selectedChildren && selectedChildren.length ? true : false;
  }

  filter(node: any, value:string): boolean {
    return this._expandFilter(node, value);
  }

  formatNode(node: any, cell: any, value: any, columnDef: any, data: any): string {
    let indent: string = '<span style="display:inline-block;height:1px;width:' + (25 * data.indent || 0) + 'px"></span>',
      childIndent: string = '<span style="display:inline-block;height:1px;width:' + (15 * data.indent || 0) + 'px"></span>';
    if (data.children && data.children.length > 0) {
      if (data.expanded === true || node.expanded) {
        if (data.selected === true || node.selected) {
          value = indent + '<span class="slick-group-toggle tree-toggle expanded"></span><span class="slick-group-toggle tree-toggle selected"></span>' + value;
        } else {
          value = indent + '<span class="slick-group-toggle tree-toggle expanded"></span><span class="slick-group-toggle tree-toggle unselected"></span>' + value;
        }
      } else {
        if (data.selected === true || node.selected) {
          value = indent + '<span class="slick-group-toggle tree-toggle collapsed"></span><span class="slick-group-toggle tree-toggle selected"></span>' + value;
        } else {
          value = indent + '<span class="slick-group-toggle tree-toggle collapsed"></span><span class="slick-group-toggle tree-toggle unselected"></span>' + value;
        }
      }
    } else {
      if (data.selected === true || node.selected) {
        value = indent + childIndent + '<span class="slick-group-toggle child-selected"></span>' + value;
      } else {
        value = indent + childIndent + '<span class="slick-group-toggle child-unselected"></span>' + value;
      }
    }
    return value;
  }

  updateNode(node: any, selected: boolean, expanded: boolean = false): any {
    this.select(node, selected);
    if (node.children && node.children.length) {
      if (selected !== node.selected) {
        if (selected) {
          node.expanded = true;
        } else {
          node.expanded = false;
        }
      } else {
        node.expanded = expanded;
      }
      node.selected = selected;

      let index: number = this.collapsedNodeIds.indexOf(node.id);
      if (expanded && index !== -1) {
        this.collapsedNodeIds.splice(index, 1);
      } else {
        this.collapsedNodeIds.push(node.id);
      }
      node.children.forEach((child: any) => {
        let childRow: any = this.dataView.getItemById(child.id);
        if (childRow) {
          childRow.selected = node.selected;
          this.select(childRow, node.selected);
          this.dataView.updateItem(childRow.id, childRow);
        }
      });
    } else {
      let parentRow = this.dataView.getItemById(node.parent);
      node.selected = selected;
      if (parentRow) {
        if (selected) {
          parentRow.selected = true;
        } else {
          if (this.isSiblingSelected(parentRow, node.id)) {
            parentRow.selected = true;
            this.select(parentRow, true);
          } else {
            parentRow.selected = false;
            this.select(parentRow, false);
          }
        }
        this.dataView.updateItem(parentRow.id, parentRow);
      }
    }
    return this.dataView.updateItem(node.id, node);
  }

  private _expandFilter(node: any, value: string): boolean {
    if (node.parent >= 0) {
      var parent = this.nodes[node.parent];
      while (parent) {
        if (!parent.expanded) {
          return false;
        }
        parent = this.nodes[parent.parent];
      }
    }
    return this._valueFilter(node, value);
  }

  private _valueFilter(node: any, value: string): boolean {
    if (value) {
      if (value.toLowerCase().indexOf('selected')!== -1) {
        if (this.selectedNodeIds.indexOf(node.id) !== -1) {
          return true;
        }
      }
      if (node['title'].toLowerCase() === value.toLowerCase()) {
        return true;
      }
      if (node['title'].toLowerCase().indexOf(value.toLowerCase()) !== -1) {
        return true;
      }
      return false;
    }
    return true;
  }

  private _flattenNodes(node: any, nodes: any[], parent: number, indent: number, root: boolean = false): any[] {
    if (root) {
      nodes.push(this._updateDescendant(node, parent, indent));
    }

    if (node && node.children) {
      parent = nodes.length - 1;
      indent++;
      node.children.forEach((child: any, index: number) => {
        nodes.push(this._updateDescendant(child, parent, indent));
        if (child.children) {
          this._flattenNodes(child, nodes, parent, indent);
        }
      });
    }

    return nodes;
  }

  private _updateDescendant(node: any, parent: number, indent: number): any {
    if (node) {
      node.id += parent + 1;
      node.parent = parent;
      node.indent = indent;
      node.selected = false;
    }
    return node;
  }


}
