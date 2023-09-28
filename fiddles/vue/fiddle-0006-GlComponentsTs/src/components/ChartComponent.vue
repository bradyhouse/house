<template>
<div ref="ChartContainer" class="scrollable">
    <div id="base-card" :style="cssVars">
        <VuePlotly ref="PlotlyAnchor" :data="chartConfig.data" :plotly-click="onPlotlyChartClick" :layout="chartConfig.layout" :display-mode-bar="false" style="width: 100%; height: 100%;"></VuePlotly>
    </div>
</div>
</template>
<script lang="ts">

import ResizeObserver from 'resize-observer-polyfill';
import { ref, reactive, nextTick } from "vue";
import { VuePlotly } from "vue3-plotly";



const numberToPixels = (value: number): string => {
	return value.toString(10) + "px";
};

const randomArray = (size: number) => {
    const arr = new Array(size);
    for (let i = 0; i < size; i++) {
        arr[i] = Math.random() * 50;
    }
    return arr;
}

const baseTrace = {
    type: 'scatter',
    mode: 'markers',
    x: randomArray(100),
    y: randomArray(100),
    z: randomArray(100),
    opacity: 0.7,
    marker: {
        size: randomArray(100)
    },
    showlegend: false
}

export default {
    name: 'ChartComponent',
    components: {
        VuePlotly
    },
    data: () => {
        return {
            traces: 1,
            boxObserver: null,
            boxWidth: null,
            boxHeight: null,
            chartConfig: {
                data: [baseTrace],
                layout: {
                    modeBarButtons: [
                        ['resetCameraDefault3d', 'hoverClosest3d']
                    ]
                }
            }
            
        }
    },
    computed: {
      cssVars () {
        return {
            '--card-height': this.boxHeight
        }       
      }
    },
    setup() {
        const ChartContainer = ref(null)
        const PlotlyAnchor = ref(null)
        // ...
        return {
            ChartContainer,
            PlotlyAnchor
        }
    },
    mounted() {
        const box = this.$refs.ChartContainer as HTMLElement
        const boxSize = box.getBoundingClientRect()
        this.boxWidth = boxSize.width + 'px'
        this.boxHeight = boxSize.height + 'px'
        
        this.initObserver()

        const ro = new ResizeObserver((entries, observer) => {
            for (const entry of entries) {
                const {left, top, width, height} = entry.contentRect;    
                this.boxHeight = numberToPixels(height)

            }
        });

        nextTick(() => {
            if (this.ChartContainer) {
                const el = this.ChartContainer as HTMLElement
                ro.observe(el)        
            }
        })

    },
    beforeDestroy() {
      if (this.boxObserver) 
        this.boxObserver.disconnect()
    },
    methods: {
        initObserver() {
            const config = {
                attributes: true,
            },
            vm = this

            // create the observer
            const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                // check if the mutation is attributes and
                // update the width and height data if it is.
                if (mutation.type === 'attributes') {
                // call resize handler on mutation
                vm.onResize()
                }
            })
            })
            // observe element's specified mutations
            observer.observe(this.$refs.ChartContainer, config)
            // add the observer to data so we can disconnect it later
            this.boxObserver = observer
        },
        onResize() {
            const box = this.$refs.GridContainer
            vm = this
            let { width, height } = box.style
            debugger
            this.boxWidth = width
            this.boxHeight = height
            // Optionally, emit event with dimensions
            this.$emit('resize', { width, height })
        },
        onPlotlyChartClick(data: any) {
            console.log(data)
        }
    }
}

</script>

<style scoped>

#base-card{
    height: var(--card-height);
}

::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 10px;
}

::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
}

.scrollable {
    box-sizing: border-box;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      overflow: hidden !important;
      background: black;
}

@media (max-width: 350px) {
    .scrollable {
        min-width: calc(100%);
        height: 100vh;
        width: 100vw;
        overflow: hidden;
    }
}
</style>