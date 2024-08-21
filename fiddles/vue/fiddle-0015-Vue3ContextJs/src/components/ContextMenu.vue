<template>
<div class="context-menu" v-if="show" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <li v-for="(handler, i) in actions" :key="i" @click="onClick(handler)" class="menu-item">
        {{ handler.label }}
    </li>
</div>
</template>

<script>
import {
    debounce
} from 'lodash'
import {
    nextTick,
    ref
} from 'vue'

export default {
    data() {
        return {
            show: false,
            event: null,
            mouseInside: false,
        }
    },
    methods: {
        open(event) {
            if (event && event.actions) {
                const mouseEvent = event.event
                this.menuLeft = mouseEvent.pageX + 'px'
                this.menuTop = mouseEvent.pageY + 'px'
                this.event = event
                nextTick(() => {
                    this.show = true
                })
            }
        },
        onClick(handler) {
            this.show = false
            this.$emit('action-clicked', {
                ...this.event,
                eventHandler: handler
            })
        },
       
        close() {
            debounce(() => {
                if (!this.mouseInside) {
                    this.show = false
                    this.event = null
                }
            }, 500)()
        },
        onMouseEnter() {
            this.mouseInside = true
        },
        onMouseLeave() {
            this.mouseInside = false
            this.close()
        },
        onCallbackComplete() {
            this.mouseInside = false
            this.close()
        },
    },
    computed: {
        actions() {
            if (this.event) {
                return this.event.actions
            } else {
                return []
            }
        },
    },
    mounted() {
        document.addEventListener('click', this.close, true)
    
    },
    beforeUnmount() {
        document.removeEventListener('click', this.close, true)
    },
    setup() {
        const menuLeft = ref('0px')
        const menuTop = ref('0px')

        return {
            menuLeft,
            menuTop,
        }
    },
}
</script>

<style scoped>
li {
    padding-left: 8px;
    cursor: pointer;
    list-style-type: none;
}

.context-menu {
    position: absolute;
    background-color: white;
    border: 1px solid #ccc;
    padding: 10px;
    display: block;
    left: v-bind(menuLeft);
    top: v-bind(menuTop);
    z-index: 9999 !important;
}
</style>
