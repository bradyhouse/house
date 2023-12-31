<template>
<div v-show="!isLoading" class="basic-plot-wrapper" :style="computedStyle" @contextmenu.prevent>
    <div ref="plotlyAnchor"></div>
</div>
<div v-show="isLoading" class="basic-plot-wrapper skeleton" @contextmenu.prevent>
    <ChartSkeleton :imageUrl="imageUrl"></ChartSkeleton>
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
import useLocalStorage from '../composables/useLocalStorage'

const preloadImgStorageKey = 'chart-loaded-snapshot'
let imageUrl = useLocalStorage(preloadImgStorageKey, null)

export default {
    props: ['data', 'layout', 'options'],
    components: {
        ChartSkeleton
    },
    data() {
        return {
            resizeIntervalId: null,
            isLoading: true,
            preloadImgStorageKey: preloadImgStorageKey,
            imageUrl: imageUrl
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
                this.draw(true)
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
        draw: function (isCapture = false) {
            Plotly.newPlot(
                this.$refs.plotlyAnchor,
                cloneDeep(this.data),
                Object.assign({
                    font: {
                        family: 'Nunito Sans, sans-serif'
                    }
                }, cloneDeep(this.layout)),
                this.options).then(function (gd) {
                if (!imageUrl && isCapture) {                    
                    Plotly.toImage(gd)
                            .then(
                                function (url) {
                                    imageUrl = useLocalStorage(preloadImgStorageKey, url)
                                }
                            )
                }

            })
        },
        resize: function () {
            if (!this.errorMessage) {
                Plotly.Plots.resize(this.$refs.plotlyAnchor)
            }
        },
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
    animation: fadeInOut 2s ease-in-out infinite;
}

@keyframes fadeInOut {
  0%, 100% { opacity: .2; }
  50% { opacity: 1; }
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
