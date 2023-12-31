<template>
<div v-show="!isLoading" class="basic-plot-wrapper" :style="computedStyle" @contextmenu.prevent>
    <div ref="plotlyAnchor"></div>
</div>
<div v-show="isLoading" class="basic-plot-wrapper skeleton" @contextmenu.prevent>
    <ChartSkeleton></ChartSkeleton>
</div>
</template>

<script lang="js">
import {
    isNil,
    isEqual,
    cloneDeep
} from 'lodash'
import Plotly from 'plotly.js/dist/plotly'
import ChartSkeleton from './ChartSkeleton.vue'

export default {
    props: ['data', 'layout', 'options'],
    components: {
        ChartSkeleton
    },
    data() {
        return {
            resizeIntervalId: null,
            isLoading: true,
        }
    },
    computed: {
        renderData() {
            return {
                data: this.data,
                layout: this.layout
            }
        },
        computedStyle() {
            return {
                filter: this.isLoading ? 'blur(5px) contrast(150%) brightness(90%) saturate(0%)' : 'none',
                transition: 'filter 2s'
            }
        },
    },
    watch: {
        renderData: function (newValue, oldValue) {
            if (!isNil(newValue)) {
                this.isLoading = false
            }
            if (!isEqual(newValue, oldValue)) {
                this.draw()
            }
        }
    },
    mounted: function () {
        this.draw()
        let previousWidth = this.$el.clientWidth
        this.resizeIntervalId = setInterval(() => {
            if (previousWidth !== this.$el.clientWidth) {
                previousWidth = this.$el.clientWidth
                this.resize()
            }
        }, 100)
    },
    methods: {
        draw: function () {
            Plotly.newPlot(
                this.$refs.plotlyAnchor,
                cloneDeep(this.data),
                Object.assign({
                    font: {
                        family: 'Nunito Sans, sans-serif'
                    }
                }, cloneDeep(this.layout)),
                this.options)
            const allEvents = [
                'click', 'legendclick', 'hover', 'unhover', 'selected', 'relayout'
            ]
            allEvents.forEach(eventName => {
                this.$refs.plotlyAnchor.on(`plotly_${eventName}`, this.handlePlotlyEvent.bind(this, eventName))
            })
        },
        resize: function () {
            if (!this.errorMessage) {
                Plotly.Plots.resize(this.$refs.plotlyAnchor)
            }
        },
        handlePlotlyEvent(eventType, data) {
            if (eventType === 'click' && data.event.button === 2) {
                eventType = 'contextmenu'
            }
            this.$emit('event', {
                eventType,
                data
            })
            this.$emit(eventType, data)
        }
    },
    beforeUnmount: function () {
        clearInterval(this.resizeIntervalId)
        Plotly.purge(this.$refs.plotlyAnchor)
    }
}
</script>

<style scoped>
.basic-plot-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    margin: auto;
    position: relative;
}

.preLoad {
    filter: blur(5px) contrast(150%) brightness(90%) saturate(0%);
    transition: filter 2s;
}

.plot-error-massage {
    flex: 0 0 50%;
    background-color: #fef0f0;
    color: #f56c6c;
}

.skeleton {
    -webkit-animation: skeleton-loading 1s linear infinite alternate;
    animation: skeleton-loading 1s linear infinite alternate;
}

@-webkit-keyframes skeleton-loading {
    0% {
        background-color: #c2cfd6;
    }

    100% {
        background-color: #f0f3f5;
    }
}

@keyframes skeleton-loading {
    0% {
        background-color: #c2cfd6;
    }

    100% {
        background-color: #f0f3f5;
    }
}
</style>
<style>
@media print {
    .basic-plot-wrapper .modebar {
        display: none !important;
    }
}
</style>
