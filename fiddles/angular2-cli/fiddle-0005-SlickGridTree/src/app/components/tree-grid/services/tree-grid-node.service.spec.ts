/* tslint:disable:no-unused-variable */
import { TreeGridNodeService } from './tree-grid-node.service';

let data: any = {
    'title': 'root',
    'children': [
      {
        'title': 'GREEN_KIRBY',
        'selectable': true,
        'children': [
          {
            'title': 'COMTRAIL',
            'selected': true,
            'latitude': -14.440434,
            'longitude': -68.188629,
            'children': []
          }
        ]
      }
    ]
  },
  secondaryNodes: any[] = [{
    'title': 'COMTRAIL CHILD NODE',
    'selected': true
  }],
  siblingNodes: any[] = [
    {
      'title': 'SIBLING 1',
      'selected': false
    },
    {
      'title': 'SIBLING 2',
      'selected': true
    }
  ];

describe('tree-grid', () => {
  describe('services', () => {
    describe('TreeGridNodeService', () => {

      let treeGridNodeService: TreeGridNodeService,
        nodes: any[];

      beforeEach(() => {
        treeGridNodeService = new TreeGridNodeService();
        nodes = treeGridNodeService.transform(data.children);
        treeGridNodeService.nodes = nodes;
      });

      describe('transform()', () => {

        it('should return empty for empty', () => {
          expect(treeGridNodeService.transform([])).toEqual([]);
        });

        it('should flatten hierarchies', () => {
          expect(nodes.length).toEqual(2);
        });

        it('should select selected selectables', () => {
          expect(treeGridNodeService.selectedNodeGuids.length).toEqual(1);
        });

        it('should collapse non-expanded nodes', () => {
          expect(treeGridNodeService.collapsedNodeGuids.length).toEqual(2);
        });

      });

      describe('append()', () => {
        let parentNode: any,
          childNode: any;

        beforeEach(() => {
          parentNode = treeGridNodeService.append(1, secondaryNodes);
          childNode = parentNode && parentNode.children.length ? parentNode.children[0] : null;
        });

        it('should return an updated parentNode', () => {
          expect(parentNode).toBeTruthy();
        });

        it('should add the new node to the parent\'s children', () => {
          expect(childNode).toBeTruthy();
        });

        it('should append the node to end of the nodes', () => {
          expect(treeGridNodeService.nodes.length).toBe(3);
          expect(childNode.order).toBe(2);
        });

        it('should assign a guid to the new child', () => {
          expect(childNode.guid).toBeTruthy();
        });

        it('should expand the parent node', () => {
          expect(parentNode.expanded).toBeTruthy();
        });

      });

      describe('expandAll()', () => {
        beforeEach(() => {
          treeGridNodeService.expandAll();
        });

        it('should empty the collapsed node list', () => {
          expect(treeGridNodeService.collapsedNodeGuids.length).toBe(0);
        });

      });

      describe('collapseAll()', () => {
        beforeEach(() => {
          treeGridNodeService.collapseAll();
        });

        it('should collapse all parent nodes', () => {
          expect(treeGridNodeService.collapsedNodeGuids.length).toBe(1);
        });

      });

      describe('selectAll()', () => {
        beforeEach(() => {
          treeGridNodeService.selectAll();
        });

        it('should select all selectable nodes', () => {
          expect(treeGridNodeService.selectedNodeGuids.length).toBe(2);
        });

      });

      describe('deselectAll()', () => {
        beforeEach(() => {
          treeGridNodeService.deselectAll();
        });
        it('should unselect all selectable nodes', () => {
          expect(treeGridNodeService.selectedNodeGuids.length).toBe(0);
        });
      });

      describe('isSiblingSelected()', () => {
        let parentNode: any,
          childNodeA: any,
          childNodeB: any;

        beforeEach(() => {
          parentNode = treeGridNodeService.append(1, siblingNodes);
          childNodeA = parentNode && parentNode.children[0] ? parentNode.children[0] : null,
            childNodeB = parentNode && parentNode.children[1] ? parentNode.children[1] : null;
        });



        it('should find selected siblings', () => {
          expect(treeGridNodeService.isSiblingSelected(parentNode, childNodeA.guid)).toBeTruthy();
        });
        it('should find unselected siblings', () => {
          expect(treeGridNodeService.isSiblingSelected(parentNode, childNodeB.guid)).toBeFalsy();
        });

      });

      describe('updateNode()', () => {




      });

      describe('updateNodeChildren()', () => {

      });

      describe('filter()', () => {

        describe('default', () => {
          let parentNode: any,
            selectedNode: any,
            collapsedNode: any,
            rootNode: any;

          beforeEach(() => {
            parentNode = treeGridNodeService.append(1, secondaryNodes);
            selectedNode = parentNode && parentNode.children.length ? parentNode.children[0] : null;
            rootNode = null;
            collapsedNode = Object.assign({}, parentNode);
            collapsedNode.expanded = false;
          });

          it('should initially filter expanded non-root nodes', () => {
            expect(treeGridNodeService.filter(parentNode, null)).toBeTruthy();
          });

          it('should initially filter collapsed non-root nodes', () => {
            expect(treeGridNodeService.filter(collapsedNode, null)).toBeTruthy();
          });

          it('should not filter root nodes', () => {
            expect(treeGridNodeService.filter(collapsedNode, null)).toBeTruthy();
          });


        });

        describe('value is `selected`', () => {
          let parentNode: any,
            selectedNode: any,
            collapsedNode: any;

          beforeEach(() => {
            parentNode = treeGridNodeService.append(1, secondaryNodes);
            selectedNode = parentNode && parentNode.children.length ? parentNode.children[0] : null;
            collapsedNode = Object.assign({}, parentNode);
            collapsedNode.expanded = false;
          });

          it('should not filter selected nodes', () => {
            expect(treeGridNodeService.filter(selectedNode, 'selected')).toBeFalsy();
          });

          it('should filter unselected nodes', () => {
            expect(treeGridNodeService.filter(parentNode, 'selected')).toBeTruthy();
          });

        });

        describe('value contains criteria', () => {
          let parentNode: any,
            selectedNode: any,
            collapsedNode: any,
            unmatchingNode: any;

          beforeEach(() => {
            parentNode = treeGridNodeService.append(1, secondaryNodes);
            selectedNode = parentNode && parentNode.children.length ? parentNode.children[0] : null;
            unmatchingNode = selectedNode ? Object.assign({}, selectedNode) : null;
            unmatchingNode.title = 'ZEBRA';
            collapsedNode = Object.assign({}, parentNode);
            collapsedNode.expanded = false;
          });

          it('should not filter a parent node with a value containing the criteria', () => {
            expect(parentNode.title).toEqual('COMTRAIL');
            expect(treeGridNodeService.filter(parentNode, 'COMTRAIL')).toBeTruthy();
          });

          it('should not filter a child node with a value containing the criteria', () => {
            expect(treeGridNodeService.filter(selectedNode, 'COM')).toBeTruthy();
          });

          it('should filter selected nodes not containing the criteria', () => {
            expect(treeGridNodeService.filter(unmatchingNode, 'COM')).toBeFalsy();
          });

        });

      });

      describe('format()', () => {

      });


    });
  });
});
