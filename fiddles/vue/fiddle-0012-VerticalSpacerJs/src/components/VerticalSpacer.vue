<template>
<div class="disabled" id="verticalSpacer">
    S P A C E R <br />
    {{width}} x {{ height }}
    <ResizeMonitor :isVisible="false" :targetId="resizeTargetId" :onHeightUpdate="onTargetHeightUpdate" :onWidthUpdate="onTargetWidthUpdate"></ResizeMonitor>
</div>
</template>

<script>
import {
    ref,
    onMounted,
    nextTick,
    onUnmounted
} from 'vue'

import ResizeMonitor from './ResizeMonitor.vue'

const height = ref(null)
const width = ref(null)

export default {

    components: {
        ResizeMonitor
    },

    props: {
        targetId: String,
        offsetHeight: String
    },

    setup(props) {

        const resizeTargetId = props.targetId
        const bodyHeightOffset = props.offsetHeight ? Number(props.offsetHeight) : 0

        const enable = (isEnabled = true) => {
            return nextTick().then(() => {
                const spacer = document.getElementById("verticalSpacer")
                if (spacer) {
                    if (isEnabled) {
                        spacer.classList.toggle('enabled')
                    } else {
                        spacer.classList.toggle('disabled')
                    }
                }
            })
        }

        const stretchHeight = (targetHeight = null) => {
            return nextTick().then(() => {

                const spacer = document.getElementById("verticalSpacer")
                const parentElement = document.getElementById(props.targetId)

                if (spacer && parentElement) {

                    let siblingOffsetHeight = 0
                    if (parentElement.childNodes.length) {
                        const siblingElements = Array.from(parentElement.childNodes).map((child) => {
                            if (child.id !== "verticalSpacer") {
                                return child
                            }
                        })

                        if (siblingElements && siblingElements.length) {
                            siblingElements.forEach((siblingElement) => {
                                if (siblingElement) {
                                    siblingOffsetHeight += siblingElement.offsetHeight
                                }
                            })
                        }
                    }

                    const parentHeight = targetHeight ? targetHeight : parentElement.offsetHeight
                    const spacerHeight = parentHeight - siblingOffsetHeight
                    height.value = String(spacerHeight) + 'px'

                }

            })
        }
        const stretchWidth = () => {
            return nextTick().then(() => {

                const spacer = document.getElementById("verticalSpacer")
                const parentElement = document.getElementById(props.targetId)

                if (spacer && parentElement) {
                    const parentWidth = parentElement.offsetWidth
                    const spacerWidth = parentWidth
                    width.value = String(spacerWidth) + 'px'
                }

            })
        }

        const reset = () => {
            return nextTick().then(() => {
                height.value = null
                width.value = null
            })
        }

        onMounted(() => {
            stretchWidth().then(stretchHeight).then(enable)
        })

        onUnmounted(() => {
            enable(false).then(reset)
        })

        const onTargetHeightUpdate = (height) => {
            nextTick().then(() => {
                const newHeight = window.innerHeight < height ? window.innerHeight - bodyHeightOffset : height
                stretchHeight(newHeight)
            })
        }
        const onTargetWidthUpdate = () => {
            nextTick().then(() => {
                stretchWidth()
            })
        }

        return {
            height,
            width,
            resizeTargetId,
            onTargetWidthUpdate,
            onTargetHeightUpdate,
            enable
        }

    }

}
</script>

<style scoped>
.disabled {
    width: 0px;
    height: 0px;
}

.enabled {
    width: v-bind(width) !important;
    height: v-bind(height) !important;
    border: 1.5px dotted red;
    transition: width 2s ease, height 2s ease;
    display: grid;
    place-items: center;
    overflow: hidden;
    background-image: linear-gradient(45deg,
            #f4a4a4 10%,
            #ffffffdf 90%);
    background-size: 100% 100%;
}

</style>
