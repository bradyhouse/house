import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {SharedUtils} from '../../shared/shared-utils';

import {
  TreeGridNodeInterface
} from '../interfaces/index';

@Injectable()
export class TreeGridNodeService {

  selectedNodes: TreeGridNodeInterface[];
  selectedNodesChange$: Observable<Array<any>>;

  dataView: any;
  nodes: TreeGridNodeInterface[];
  collapsedNodeGuids: string[];
  childlessNodeGuids: string[];
  schema: any[];

  private _keywords: string[];
  private _selectedNodesObserver: Observer<Array<any>>;
  private _selectedNodeGuids: string;

  get selectedNodeGuids(): string[] {
    return JSON.parse(this._selectedNodeGuids);
  }

  set selectedNodeGuids(value: string[]) {
    let list: string = JSON.stringify(value);

    if (this._selectedNodeGuids !== list) {
      this._selectedNodeGuids = list;
      setTimeout(() => {
        this._updateSelectedNodes();
      }, 66);
    }
  }

  constructor() {
    this.nodes = [];
    this.schema = this.configureSchema();
    this.collapsedNodeGuids = [];
    this.childlessNodeGuids = [];
    this._selectedNodeGuids = '[]';
    this._keywords = ['is'];
    this.dataView = null;


    this.selectedNodesChange$ = new Observable<Array<any>>(
      (observer: any) => this._selectedNodesObserver = observer
    ).share();

  }

  transform(nodes: any[]): TreeGridNodeInterface[] {
    let flatNodes: TreeGridNodeInterface[] = [],
      ids: any = {},
      treeGridNodes: TreeGridNodeInterface[];

    this._selectedNodeGuids = '[]';
    this.collapsedNodeGuids = [];

    nodes.forEach((node: any) => {
      flatNodes = this._flattenNodes(node, flatNodes, -1, 0, true);
    });

    treeGridNodes = flatNodes.map((node: TreeGridNodeInterface, index: number) => {
      node = Object.assign({}, node);
      node.order = index;
      ids[node.order] = true;
      return node;
    });

    this._initSelectedNodeGuids(treeGridNodes);

    return treeGridNodes;
  }

  append(nodeId: number, children: any[]): any {
    let top: any[] = this.nodes.filter((node: any) => {
        return node.order < nodeId;
      }),
      bottom: any[] = this.nodes.filter((node: any) => {
        return node.order > nodeId;
      }),
      childNodes: any[] = [],
      index: number = nodeId + 1,
      parentNode: any = this.dataView ? this.dataView.getItemById(nodeId) : this._findNodeByOrderId(nodeId),
      parentGuid: string = parentNode ? parentNode.guid : null;

    if (parentNode) {
      if (children && children.length) {
        children.forEach((child: any, childIndex: number) => {
          childNodes.push(this._generateTreeGridNode(child, childIndex, nodeId, 1, parentGuid));
          index++;
        });
        parentNode.children = childNodes;
        parentNode.expanded = true;
      } else {
        parentNode.barren = true;
      }
      top.push(parentNode);
      top = top.concat(childNodes);
      bottom.forEach((currentNode: any) => {
        currentNode.order = index;
        top.push(Object.assign({}, currentNode));
        index++;
      });
      this.nodes = top;
      if (this.dataView) {
        this.dataView.setItems(this.nodes, 'order');
        this.dataView.updateItem(parentNode.order, parentNode);
        this.dataView.refresh();
      }
      return parentNode;
    }

    return null;
  }

  expandAll(): void {
    let collapsedGuids = this.collapsedNodeGuids;

    if (collapsedGuids && collapsedGuids.length) {
      collapsedGuids.forEach((guid: string) => {
        let node: TreeGridNodeInterface = this._findNodeByGuid(guid);
        if (node) {
          node.expanded = true;
          if (this.dataView) {
            this.dataView.updateItem(node.order, node);
          }
        }
      });
    }
    this.collapsedNodeGuids = [];
    if (this.dataView) {
      this.dataView.refresh();
    }
  }

  collapseAll(): void {
    let collapsedNodes: any[] = [];
    this.nodes.forEach((node: TreeGridNodeInterface) => {
      let dataNode: any = this.dataView ? this.dataView.getItemById(node.order) : this._findNodeByOrderId(node.order);
      if (dataNode && dataNode.children && dataNode.children.length > 0) {
        if (!collapsedNodes[node.order]) {
          collapsedNodes.push(node.order);
        }
        dataNode.expanded = false;
        if (this.dataView) {
          this.dataView.updateItem(node.order, dataNode);
        }
      }
    });
    this.collapsedNodeGuids = collapsedNodes;
    if (this.dataView) {
      this.dataView.refresh();
    }
  }

  selectAll(): void {
    let selectedNodeGuids: any[] = [];
    this.nodes.forEach((node: TreeGridNodeInterface) => {
      let dataNode: any = this.dataView ? this.dataView.getItemById(node.order) : this._findNodeByOrderId(node.order);
      if (dataNode) {
        if (selectedNodeGuids.indexOf(dataNode.guid) === -1) {
          selectedNodeGuids.push(node.guid);
        }
        dataNode.selected = true;
        if (this.dataView) {
          this.dataView.updateItem(node.order, dataNode);
        }
      }
    });
    this.selectedNodeGuids = selectedNodeGuids;
    if (this.dataView) {
      this.dataView.refresh();
    }
  }

  deselectAll(): void {
    let guids: any[] = this.selectedNodeGuids;
    if (guids.length) {
      guids.forEach((guid: any) => {
        let node: any = this._findNodeByGuid(guid);
        if (node) {
          node.selected = false;
          if (node.hasOwnProperty('children') && node.children.length > 0) {
            node.expanded = false;
            node.children.forEach((child: any) => {
              let childNode: any = this.dataView ? this.dataView.getItemById(child.order) :
                this._findNodeByOrderId(child.order);
              if (childNode) {
                childNode.selected = false;
                if (this.dataView) {
                  this.dataView.updateItem(childNode.order, childNode);
                }
              }
            });
          }
          if (this.dataView) {
            this.dataView.updateItem(node.order, node);
          }
        }
      });
      this.selectedNodeGuids = [];
      if (this.dataView) {
        this.dataView.refresh();
      }
    }
  }

  isSiblingSelected(node: any, skipGuid: string): boolean {
    let selectedChildren: any[] = node.children && node.children.length > 0 ?
      node.children.filter((child: any) => {
        let childRow = this.dataView ? this.dataView.getItemById(child.order) : this._findNodeByOrderId(child.order);
        return childRow && childRow.guid !== skipGuid && childRow.selected;
      }) : null;
    return selectedChildren && selectedChildren.length ? true : false;
  }

  filter(node: any, value: string): boolean {
    return this._valueFilter(node, value);
  }

  formatNode(node: any, cell: any, value: any, columnDef: any, data: any): string {
    let indent: string = '<span style="display:inline-block;height:1px;width:'
        + (25 * data.indent || 0) + 'px"></span>',
      childIndent: string = '<span style="display:inline-block;height:1px;width:'
        + (15 * data.indent || 0) + 'px"></span>';

    if (this.childlessNodeGuids.indexOf(data.guid) !== -1) {
      return this._formatChildlessNode(value, data);
    }

    if (data.children && data.children.length > 0) {
      if (data.expanded === true) {
        return indent + this._formatExpandedNode(value, data, 'fs-11');
      } else {
        return indent + this._formatCollapsedNode(value, data, 'fs-11');
      }
    } else {
      return indent + childIndent + this._formatChildNode(value, data, 'fs-8');
    }

  }

  updateNode(node: any, selected: boolean, expanded: boolean = false, isChild: boolean = false): boolean {
    let selectedNodeGuids: string[] = this.selectedNodeGuids,
      parentNode: any = null;

    if (node && node.hasOwnProperty('order')) {
      selectedNodeGuids = this._selectNode(selectedNodeGuids, node, selected);

      if (!isChild && node.hasOwnProperty('children') && node.children.length > 0) {
        if (selected !== node.selected) {
          if (selected) {
            node.expanded = true;
          } else {
            node.expanded = false;
          }
        } else {
          node.expanded = expanded;
        }
        let index: number = this.collapsedNodeGuids.indexOf(node.guid);
        if (expanded && index !== -1) {
          this.collapsedNodeGuids.splice(index, 1);
        } else if (!expanded && index === -1) {
          this.collapsedNodeGuids.push(node.guid);
        }

        if (!node.bubbleSelect && node.selectable) {
          node.children.forEach((child: any) => {
            if (child.hasOwnProperty('order')) {
              let childRow: any = this.dataView ? this.dataView.getItemById(child.order) :
                this._findNodeByOrderId(child.order);
              if (childRow) {
                childRow.selected = selected;
                selectedNodeGuids = this._selectNode(selectedNodeGuids, childRow, selected);
                if (this.dataView) {
                  this.dataView.updateItem(childRow.order, childRow);
                }
              }
            }
          });
        }
      }

      if (node.hasOwnProperty('selectable') && node.selectable) {
        node.selected = selected;
      }

      if (node.parentGuid !== null) {
        parentNode = this._findNodeByGuid(node.parentGuid);

        if (parentNode && parentNode.selectable) {
          if (selected) {
            parentNode.selected = true;
          } else {
            if (this.isSiblingSelected(parentNode, node.guid)) {
              parentNode.selected = true;
            } else {
              parentNode.selected = false;
            }
          }
          selectedNodeGuids = this._selectNode(selectedNodeGuids, parentNode, parentNode.selected);
          if (this.dataView) {
            this.dataView.updateItem(parentNode.order, parentNode);
          }
        }
      }

      this.selectedNodeGuids = selectedNodeGuids;
      if (this.dataView) {
        this.dataView.updateItem(node.order, node);
      }

      if (parentNode) {
        return this.updateNode(parentNode, parentNode.selected, parentNode.expanded, true);
      }
    }
    return true;


  }

  updateNodeChildren(node: any, selected: boolean): boolean {
    if (node) {
      if (node.children && node.children.length) {
        node.children.forEach((child: any) => {
          this.updateNode(child, selected);
        });
      }
      if (selected && !node.expanded) {
        node.expanded = true;
        if (this.dataView) {
          this.dataView.updateItem(node.order, node);
        }
      } else if (!selected && node.expanded) {
        node.expanded = false;
        if (this.dataView) {
          this.dataView.updateItem(node.order, node);
        }
      }
    }
    return true;
  }

  waitingFormatter(value: any) {
    return '';
  }

  configureSchema(sparkLineRender: Function = null): any[] {
    if (sparkLineRender) {
      return [
        {
          id: 'title', field: 'title', index: 0,
          formatter: (node: any, cell: any, value: any, columnDef: any, data: any) => this.formatNode(node, cell, value, columnDef, data),
          width: 140
        }, {
          id: 'chart',
          sortable: false,
          width: 60,
          formatter: (value: any) => this.waitingFormatter(value),
          rerenderOnResize: true,
          asyncPostRender: (cellNode: any, row: any, dataContext: any, colDef: any) => sparkLineRender(cellNode, row, dataContext, colDef)
        }
      ];
    } else {
      return [
        {
          id: 'title', field: 'title', index: 0,
          formatter: (node: any, cell: any, value: any, columnDef: any, data: any) => this.formatNode(node, cell, value, columnDef, data),
          width: 200
        }
      ];
    }
  }


  private _findNodeByGuid(guid: string): TreeGridNodeInterface {
    let filteredNodes: TreeGridNodeInterface[] = guid !== null ? this.nodes.filter((node: TreeGridNodeInterface) => {
      return node.guid === guid ? true : false;
    }) : null;
    if (filteredNodes && filteredNodes.length) {
      return filteredNodes.pop();
    }
    return null;
  }

  private _findNodeByOrderId(orderId: number): TreeGridNodeInterface {
    let filteredNodes: TreeGridNodeInterface[] = orderId !== null ? this.nodes.filter((node: TreeGridNodeInterface) => {
      return node.order === orderId ? true : false;
    }) : null;
    if (filteredNodes && filteredNodes.length) {
      return filteredNodes.pop();
    }
    return null;
  }

  private _formatExpandedNode(value: any, data: any, clsWrap: string = null): string {
    if (data.selectable) {
      if (data.selected === true) {
        value = '<span class="slick-group-toggle tree-toggle expanded"></span>' +
          '<span class="slick-group-toggle tree-toggle selected"></span>&nbsp;' + value;
      } else {
        value = '<span class="slick-group-toggle tree-toggle expanded"></span>' +
          '<span class="slick-group-toggle tree-toggle unselected"></span>&nbsp;' + value;
      }
    } else {
      value = '<span class="slick-group-toggle expanded"></span>&nbsp;' + value;
    }

    if (clsWrap) {
      value = '<span class="' + clsWrap + '">' + value + '</span>';
    }

    return value;
  }

  private _formatChildlessNode(value: any, data: any): string {
    let indent: string = '<span style="display:inline-block;height:1px;width: 15px;"></span>',
      formattedValue: any = value;

    if (data.children && data.children.length > 0) {
      if (data.expanded) {
        formattedValue = indent + this._formatExpandedNode(value, data);
      } else {
        formattedValue = indent + this._formatCollapsedNode(value, data);
      }
      if (this._isChildSelected(data)) {
        formattedValue += '<a class="pull-right see-more un-select-all">' +
          '<i class="slick-group-toggle tree-toggle unselect-children"></i>&nbsp;</a>';
      } else {
        formattedValue += '<a class="pull-right see-more select-all">' +
          '<i class="slick-group-toggle tree-toggle select-children"></i>&nbsp;</a>';
      }
    } else if (data.barren) {
      formattedValue = indent + '<span class="slick-group-toggle tree-toggle childless"></span>' +
        this._formatChildNode(value, data);
    } else {
      formattedValue = indent + '<span class="slick-group-toggle tree-toggle childless"></span>' +
        this._formatChildNode(value, data);
      formattedValue += '<a class="pull-right see-more un-select-all">' +
        '<i class="slick-group-toggle tree-toggle request-children"></i>&nbsp;</a>';
    }

    formattedValue = '<span class="fs-8">' + formattedValue + '</span>';

    return formattedValue;

  }

  private _formatCollapsedNode(value: any, data: any, clsWrap: string = null): string {
    if (data.selectable) {
      if (data.selected === true) {
        value = '<span class="slick-group-toggle tree-toggle collapsed"></span>' +
          '<span class="slick-group-toggle tree-toggle selected"></span>&nbsp;' + value;
      } else {
        value = '<span class="slick-group-toggle tree-toggle collapsed"></span>' +
          '<span class="slick-group-toggle tree-toggle unselected"></span>&nbsp;' + value;
      }
    } else {
      value = '<span class="fs-11 slick-group-toggle collapsed"></span>&nbsp;' + value;
    }

    if (clsWrap) {
      value = '<span class="' + clsWrap + '">' + value + '</span>';
    }

    return value;
  }

  private _formatChildNode(value: any, data: any, clsWrap: string = null): string {
    if (data.selectable) {
      if (data.selected === true) {
        value = '<span class=" slick-group-toggle child-selected"></span>&nbsp;' + value;
      } else {
        value = '<span class="slick-group-toggle child-unselected"></span>&nbsp;' + value;
      }
    }
    if (clsWrap) {
      value = '<span class="' + clsWrap + '">' + value + '</span>';
    }

    return value;
  }

  private _initSelectedNodeGuids(nodes: TreeGridNodeInterface[]): void {

    let selectedGridNodes: TreeGridNodeInterface[] = nodes.filter((treeGridNode: TreeGridNodeInterface) => {
      return treeGridNode.selectable && treeGridNode.selected ? true : false;
    });

    if (selectedGridNodes && selectedGridNodes.length) {
      this.selectedNodeGuids = selectedGridNodes.map((treeGridNode: TreeGridNodeInterface) => {
        return treeGridNode.guid;
      });
    }
  }

  private _isChildSelected(node: any): boolean {
    let selectedChildren: any[] = node.hasOwnProperty('children') && node.children.length ?
      node.children.filter((child: any) => {
        return child.selected;
      }) : null;

    if (selectedChildren && selectedChildren.length > 0) {
      return true;
    }

    return false;
  }

  private _isValueFilter(node: any, sentence: string) {
    let words: string[] = sentence.split(' is '),
      field: string = words && words.length === 2 ? words[0] : null,
      value: string = field ? words[1] : null,
      model: any = node.hasOwnProperty('model') ? node.model : null,
      modelField: string = model && model.hasOwnProperty(field) ? field : null,
      modelFieldValue: string = modelField ? String(model[modelField]) : null;

    if (modelFieldValue && value) {
      return modelFieldValue.toLowerCase() === value.toLowerCase() ? true : false;
    }
    return false;
  }

  private _selectNode(selectedGuids: string[], node: any, state: boolean) {
    if (node && node.hasOwnProperty('guid')) {
      let filteredGuids = selectedGuids.filter((guid: string) => {
        return guid !== node.guid;
      });
      if (state === true) {
        filteredGuids.push(node.guid);
      }
      return filteredGuids;
    }
    return selectedGuids;
  }

  private _expandFilter(node: any): boolean {
    if (node.parentGuid) {
      let parent = this._findNodeByGuid(node.parentGuid);
      while (parent) {
        if (!parent.expanded) {
          return false;
        }
        parent = this._findNodeByGuid(parent.parentGuid);
      }
    }
    return true;
  }

  private _valueFilter(node: any, value: string): boolean {
    let selectedGuids = this.selectedNodeGuids;
    if (value) {
      if (this._containsKeyword(value)) {
        return this._queryFilter(node, value);
      }
      if (value.toLowerCase().indexOf('selected') !== -1) {
        if (selectedGuids.indexOf(node.guid) !== -1) {
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
    return this._expandFilter(node);
  }

  private _queryFilter(node: any, value: string): boolean {
    let sentence: string = value.toLowerCase(),
      keywords: string[] = this._parseKeywords(sentence),
      rc: boolean = false;

    if (keywords && keywords.length) {
      keywords.forEach((keyword) => {
        switch (keyword.toLowerCase()) {
          case 'is':
            rc = this._isValueFilter(node, value);
            break;
        }
      });
    }

    return rc ? this._expandFilter(node) : false;

  }

  private _containsKeyword(sentence: string): boolean {
    let words: string[] = sentence.split(' '),
      rc: boolean = false;
    if (words && words.length) {
      words.forEach((word: string) => {
        if (this._keywords.indexOf(word.toLowerCase()) !== -1) {
          rc = true;
        }
      });
    }
    return rc;
  }

  private _parseKeywords(sentence: string): string[] {
    let words: string[] = String(sentence).split(' '),
      keywords: string[] = [];
    if (words && words.length) {
      words.forEach((word: string) => {
        if (this._keywords.indexOf(word.toLowerCase()) !== -1) {
          keywords.push(word.toLowerCase());
        }
      });
    }
    if (keywords.length) {
      return keywords;
    }
    return null;
  }

  private _flattenNodes(node: any, nodes: TreeGridNodeInterface[], parent: number, indent: number,
                        root: boolean = false): TreeGridNodeInterface[] {
    let rootNode: TreeGridNodeInterface = null;
    if (root) {
      rootNode = this._generateTreeGridNode(node, 0, parent, indent);
      nodes.push(rootNode);
    }
    if (node && node.children && node.children.length > 0) {

      parent = nodes.length - 1;
      indent++;

      if (!node.hasOwnProperty('expanded')) {
        node.expanded = false;
      }

      if (!rootNode && !node.hasOwnProperty('guid')) {
        node.guid = SharedUtils.guid();
      }

      if (rootNode) {
        rootNode.children.forEach((child: TreeGridNodeInterface) => {
          let childNode: any = Object.assign({}, child);
          if (childNode.selected) {
            rootNode.expanded = true;
          }
          nodes.push(childNode);
        });
        if (!rootNode.expanded) {
          this.collapsedNodeGuids.push(node.guid);
        }

      } else {
        node.children.forEach((child: TreeGridNodeInterface, index: number) => {
          let childNode: TreeGridNodeInterface = this._generateTreeGridNode(child, index, parent, indent, node.guid);
          if (childNode.selected) {
            node.expanded = true;
          }
          nodes.push(childNode);
          if (child.children && child.children.length > 0) {
            this._flattenNodes(child, nodes, parent, indent);
          }
        });
        if (!node.expanded && this.collapsedNodeGuids.indexOf(node.guid) === -1) {
          this.collapsedNodeGuids.push(node.guid);
        }
      }

    }

    return nodes;

  }

  private _generateTreeGridNode(node: any, index: number, parent: number,
                                indent: number, guid: string = null): TreeGridNodeInterface {
    let treeGridNode: TreeGridNodeInterface = <TreeGridNodeInterface>{};
    if (node) {
      if (node.hasOwnProperty('model')) {
        treeGridNode.model = node.model;
      } else {
        treeGridNode.model = node;
      }
      treeGridNode.order = index + parent + 1;
      treeGridNode.parent = parent;
      treeGridNode.parentGuid = guid;
      treeGridNode.indent = indent;
      treeGridNode.title = node.title;
      treeGridNode.guid = SharedUtils.guid();


      if (node.hasOwnProperty('selectable')) {
        treeGridNode.selectable = node.selectable;
      } else {
        treeGridNode.selectable = true;
      }

      if (treeGridNode.selectable) {
        if (node.hasOwnProperty('selected')) {
          treeGridNode.selected = node.selected;

        } else {
          treeGridNode.selected = false;
        }
      }

      if (node.hasOwnProperty('children')) {
        treeGridNode.children = [];

        if (node.hasOwnProperty('expanded')) {
          treeGridNode.expanded = node.expanded;
        } else {
          treeGridNode.expanded = false;
        }

        if (!treeGridNode.expanded) {
          if (this.collapsedNodeGuids.indexOf(treeGridNode.guid) === -1) {
            this.collapsedNodeGuids.push(treeGridNode.guid);
          }
        }

        if (node.hasOwnProperty('bubbleSelect')) {
          treeGridNode.bubbleSelect = node.bubbleSelect;
        } else {
          treeGridNode.bubbleSelect = false;
        }
        if (node.children.length === 0 && this.childlessNodeGuids.indexOf(node.guid) === -1) {
          this.childlessNodeGuids.push(treeGridNode.guid);
        } else {
          treeGridNode.children = node.children.map((child: any, childIndex: number) => {
            return this._generateTreeGridNode(child, childIndex, treeGridNode.order, indent + 1, treeGridNode.guid);
          });
        }
      }
    }
    return treeGridNode;
  }

  private _updateSelectedNodes() {
    let selectedNodeGuids: string[] = JSON.parse(this._selectedNodeGuids),
      nodes: TreeGridNodeInterface[] = this.nodes.filter((node: TreeGridNodeInterface) => {
        return selectedNodeGuids.indexOf(node.guid) !== -1;
      });

    this.selectedNodes = nodes;
    if (this._selectedNodesObserver) {
      this._selectedNodesObserver.next(nodes);
    }
  }



}
