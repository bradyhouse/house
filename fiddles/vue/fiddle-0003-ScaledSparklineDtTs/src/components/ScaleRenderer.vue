<template>
<div :ref="'container'" class="container">
    <div class="slider">
        <Slider v-model="value" :merge="merge" @update="onSliderChange" :lazy="false" />
    </div>
</div>
</template>

<script>
import Slider from '@vueform/slider'
import {
    nextTick
} from 'vue'

export default {
    name: 'ScaleRenderer',
    components: {
        Slider,
    },
    data() {
        return {
            value: 0,
            merge: .1
        }
    },
    methods: {
        refresh(params) {
            this.value = params.value
        },
        getValue() {
            return this.value
        },
        onSliderChange(value) {
            this.triggerUpdate(value)
        },
        triggerUpdate(value) {
        
            const index = this.params.node.rowIndex
            const row = this.params.api.getDisplayedRowAtIndex(index)
            row.data.scale = value
            this.params.api.refreshCells({
                    force: true,
                    rowNodes: [row]
                })

        },


    },
    created() {
        this.value = this.params.value
    },
    mounted() {
        const ref = this.$refs && this.$refs.container ? this.$refs.container : null

        nextTick(() => {
            if (ref) ref.focus()
        });
    }
}
</script>

<style src="@vueform/slider/themes/default.css"></style>

<style scoped>
.container {
    padding-top: 25px;
    align-items: center !important;
}

.slider {
    width: calc(100%);
    border: 1px solid grey;
    background: #e6e6e6;
    padding: 5px;
    text-align: center;
    display: inline-block;
}
</style>
