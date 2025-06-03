

<script setup>

import { ref, onMounted, nextTick, computed } from 'vue'
import ExpandLink from '@/components/ExpandLink.vue'
import Agrid from '@/components/agrid/Agrid.vue'
import { useRoute } from 'vue-router'


const route = useRoute()
const gridRef = ref(null)
const gridExpanderRef = ref(null)
const cardRefreshKey = ref(0)
const openInNewTab = ref(true)

const isOpenInNewTab = computed(() => {
  return openInNewTab.value
})

function onExpand() {
  console.log('Expanded')
}

function onCollapse() {
  cardRefreshKey.value+=1
}

onMounted(() => {
  if (route.params.expandedView !== '') {
    openInNewTab.value = false
    nextTick(() => {
      cardRefreshKey.value+=1
      nextTick(() => {
        gridExpanderRef.value.expand()
      })
    })
  }
})


</script>

<template>
<div class="scrollable">
  <div class="h-100 d-flex align-items-center justify-content-center">
    <div :key="cardRefreshKey" class="card text-white bg-primary mb-3">
      <div class="card-header">
        <div style="position: relative; width: 100%; padding: 2px;">
          <div style="float: right;">
              <ExpandLink
                ref="gridExpanderRef"
                :targetComponent="gridRef"
                expand-icon="fa-solid fa-expand"
                link-text="View Full Screen"
                link-title="Expand grid to full screen view"
                @expand="onExpand"
                @collapse="onCollapse"
                :openInNewTab="isOpenInNewTab"
              />
          </div>
        </div>
      </div>
      <div class="card-body">
        <div ref="gridRef" style="width: 500px; height: 500px; background-color: blue;">
            <Agrid></Agrid>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 10px;
}

::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(0, 0, 0, .5);
    -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, .5);
}

.scrollable {
    min-width: calc(100%);
    min-height: calc(100%);

}

@media(max-width:350px) {
    .scrollable {
        min-width: calc(100%);
        height: 100vh;
        width: 100vw;
    }
}
</style>
