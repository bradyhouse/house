import {Node} from '../interfaces/index';

export class NodeService {

  nodes: Node[];

  schema: any[];

  constructor() {
    this.nodes = [];
    this.schema = [
      {id: 'title', field: 'title', index: 0, formatter: this.nodeFormatter, width: 200}
    ];
  }

  transform(nodes: any[], collapsed: any[]): any[] {
    let flatNodes: any[] = [],
      ids: any = {};


    if (!nodes) {
      nodes = [];
    }

    nodes.forEach((node: any) => {
      flatNodes = this.flattenNodes(node, flatNodes, -1, 0, true);
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

  expandAll(dataView: any): void {
    this.nodes.forEach((node: Node) => {
      let dataNode: any = dataView.getItemById(node.id);
      if (dataNode && dataNode.children && dataNode.children.length) {
        dataNode.expanded = true;
        dataView.updateItem(node.id, dataNode);
      }
    });
  }
  collapseAll(dataView: any): any[] {
    let collapsedNodes: any[] = [];
    this.nodes.forEach((node: Node) => {
      let dataNode: any = dataView.getItemById(node.id);
      if (dataNode && dataNode.children && dataNode.children.length) {
        if (!collapsedNodes[node.id]) {
          collapsedNodes.push(node.id);
        }
        dataNode.expanded = false;
        dataView.updateItem(node.id, dataNode);
      }
    });
    return collapsedNodes;
  }

  selectAll(dataView: any): any[] {
    let selectedNodes: any[] = [];
    this.nodes.forEach((node: Node) => {
      let dataNode: any = dataView.getItemById(node.id);
      if (dataNode) {
        if (!selectedNodes[node.id]) {
          selectedNodes.push(node.id);
        }
        dataNode.selected = true;
        dataView.updateItem(node.id, dataNode);
      }
    });
    return selectedNodes;
  }



  private flattenNodes(node: any, nodes: any[], parent: number, indent: number, root: boolean = false): any[] {
    if (root) {
      nodes.push(this.updateDescendant(node, parent, indent));
    }

    if (node && node.children) {
      parent = nodes.length - 1;
      indent++;
      node.children.forEach((child: any, index: number) => {
        nodes.push(this.updateDescendant(child, parent, indent));
        if (child.children) {
          this.flattenNodes(child, nodes, parent, indent);
        }
      });
    }

    return nodes;
  }

  private updateDescendant(node: any, parent: number, indent: number): any {
    if (node) {
      node.id += parent + 1;
      node.parent = parent;
      node.indent = indent;
      node.selected = false;
    }
    return node;
  }

  private nodeFormatter(node: any, cell: any, value: any, columnDef: any, data: any): string {
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

}
