<template>
<div v-if="display">
    {{ targetName }} <br/>
    {{ width }}px x {{ height }}px
</div>
</template>

  
  
<script>
import {
    ref,
    onMounted,
    onUnmounted,
    nextTick
} from 'vue';

export default {

    props: {
        targetId: {
            type: String,
            default: null
        },
        isVisible: {
            type: Boolean,
            default: true
        },
        onWidthUpdate: {
            type: Function,
            default: () => {}
        },
        onHeightUpdate: {
            type: Function,
            default: () => {}
        }
    },

    setup(props) {

        const width = ref(null)
        const height = ref(null)
        const display = props.isVisible
        const targetName = props.targetId

        const updateDimensions = () => {
            nextTick().then(() => {

                const targetElement = document.getElementById(props.targetId)

                if (targetElement) {
                    if (targetElement.offsetWidth !== width.value) {
                        width.value = targetElement.offsetWidth
                        if (typeof props.onWidthUpdate === 'function') {
                            props.onWidthUpdate(width.value)
                        }
                    }
                    if (window.innerHeight !== height.value) {
                        height.value = window.innerHeight
                        if (typeof props.onHeightUpdate === 'function') {
                            props.onHeightUpdate(targetElement.offsetHeight)
                        }
                    }
                }

            })

        }

        onMounted(() => {
            window.addEventListener('resize', updateDimensions)
           

        })

        onUnmounted(() => {
            window.removeEventListener('resize', updateDimensions)
        })

        return {
            width,
            height,
            display,
            targetName
        }
    },
};
</script>
