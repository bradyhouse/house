<template>
<div ref="gojsDiagram" style="width: 100%; height: 100%; border: 1px solid black;"></div>
</template>

<script>
import * as go from 'gojs';
import {
    DragZoomingTool
} from './DragZoomingTool'
import {
    getCurrentInstance
} from 'vue'

export default {
    name: 'DiagramComponent',
    components: {
        DragZoomingTool
    },

    mounted() {
        this.initDiagram()
    },
    setup() {
        const initDiagram = () => {
            const $ = go.GraphObject.make;
            const comp = getCurrentInstance()
            const diagramHook = comp.refs.gojsDiagram

            const myDiagram = new go.Diagram(diagramHook, {
               initialViewportSpot: go.Spot.Center,
                // Define the template for Nodes, just some text inside a colored rectangle
                nodeTemplate: $(go.Node, 'Auto', // the Shape will go around the TextBlock
                    $(go.Shape, 'RoundedRectangle', {
                            strokeWidth: 0
                        },
                        // Shape.fill is bound to Node.data.color
                        new go.Binding('fill', 'color')),
                    $(go.TextBlock, {
                            margin: 2
                        },
                        // TextBlock.text is bound to Node.data.key
                        new go.Binding('text', 'key'))
                ),
                // Define the template for Links, just a simple line
                linkTemplate: $(go.Link, $(go.Shape, {
                    stroke: 'black'
                })),
                layout: $(go.TreeLayout, {
                    angle: 90,
                    nodeSpacing: 10,
                    compaction: go.TreeLayout.AlignmentCenterChildren
                }),
                model: new go.TreeModel({
                    nodeKeyProperty: 'k',
                    nodeParentKeyProperty: 'p'
                })
            });

            // Initialize and configure the DragZoomingTool
            const dragZoomingTool = new DragZoomingTool();
            //dragZoomingTool.delay = 175;             
            /*dragZoomingTool.box = $(go.Part, $(go.Shape, {
                fill: null,
                stroke: "magenta",
                strokeWidth: 2
            }));*/

            myDiagram.toolManager.mouseMoveTools.insertAt(2, new DragZoomingTool());

            myDiagram.delayInitialization(() => {
                myDiagram.nodeTemplate =
                    $(go.Node, 'Auto',
                        $(go.Shape, 'RoundedRectangle', {
                                strokeWidth: 0
                            },
                            new go.Binding('fill', 'color')),
                        $(go.TextBlock, {
                                margin: 2
                            },
                            new go.Binding('text', 'color'))
                    );

                const total = 45;
                const treedata = [];
                for (let i = 0; i < total; i++) {
                    const color = go.Brush.randomColor()
                    const d = {
                        key: i,
                        k: i,
                        c: color,
                        color: go.Brush.randomColor(),
                        p: (i > 0 ? Math.floor(Math.random() * i / 2) : undefined) 
                    };
                    treedata.push(d);
                }

                myDiagram.model.nodeDataArray = treedata;
            })

        }

        return {
            initDiagram
        }

    }

}
</script>
