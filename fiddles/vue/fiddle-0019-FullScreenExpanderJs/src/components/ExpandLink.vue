<script setup>
import { ref, computed, watch } from 'vue'

//#region Properties

const props = defineProps({
  targetComponent: Object,
  expandIcon: String,
  linkText: String,
  linkTitle: String,
  openInNewTab: {
    type: Boolean,
    required: false,
    default: false
  }
})

//#endregion
//#region State

const el = ref(null);
const linkEl = ref(null);
const emit = defineEmits(['expand', 'collapse'])
const isExpanded = ref(false)
const refreshKey = ref(0);
const elChildHeight = ref('');
const currentComponent = computed(() => {
  return props.targetComponent?.value ?? null
})

//#endregion
//#region Internal Handlers

function openNewTab() {
  const baseUrl = window.location.origin + window.location.pathname
  const params = new URLSearchParams(window.location.search)

  params.delete('expandedView')
  params.set('expandedView', 'true')

  const newUrl = `${baseUrl}:${params.toString()}`

  window.open(newUrl, '_blank')
}

function toggleExpansion(state, elChild, elParent) {
  if (props.openInNewTab) {
    openNewTab()
    return
  }

  isExpanded.value = state

  if (state && elChild && elParent) {
    elChildHeight.value = elChild.style.height
    elChild.style.width = elParent.style.width
    elChild.style.height = window.innerHeight + 'px'
    elParent.appendChild(elChild);
  } else {
    elChild.style.height = elChildHeight.value;
  }

  refreshKey.value += 1

  if (isExpanded.value) {
    emit('expand')
  } else {
    emit('collapse')
  }
}

//#endregion
//#region public Handlers

function expand() {
  const element = linkEl.value
  if (element) {
    element.click()
  }
}

defineExpose({
  expand
})

//#endregion
//#region Watchers

watch(
  () => props.targetComponent,
  (newComponent) => {
    if (!newComponent?.value) {
      console.warn('targetComponent prop must be a valid Vue component reference')
    }
  },
  { immediate: true }
)

//#endregion
</script>
<template>
  <div class="full-screen-expander">
    <!-- Configurable trigger link -->
    <a v-if="!isExpanded" href="#" ref="linkEl" @click.prevent="toggleExpansion(true, props.targetComponent, el)" :title="linkTitle"
      class="expander-link">
      <span v-if="linkText">{{ linkText }}</span>
      <font-awesome-icon v-if="expandIcon" :icon="expandIcon" />
    </a>
    <!-- Close button in top-right when expanded -->
    <button v-if="isExpanded" @click="toggleExpansion(false, props.targetComponent, el)" class="close-button"
      aria-label="Close expanded view">
      ×
    </button>
    <!-- Content wrapper -->
    <div :class="{ 'expanded': isExpanded }" class="expander-content" ref="el">
      <component :is="currentComponent" v-if="currentComponent" :key="refreshKey" />
    </div>
  </div>
</template>
<style scoped>
.full-screen-expander {
  position: relative;
  width: 100%;
  height: 100%;
}

.expander-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: inherit;
  text-decoration: none;
}

.close-button {
  position: fixed;
  top: 0;
  margin: 0;
  right: 1rem;
  z-index: 1000;
  border-radius: 50%;
  border: none;
  font-size: 25px;
  background-color: transparent;
}

.close-button:hover {
  color: gray;
}

.expander-content {
  width: 100%;
  height: 100%;
  transition: all 0.3s ease;
}

.expanded {
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100%);
  height: calc(100%);
  z-index: 999;
  overflow-y: hidden;
  background-color: white;
}
</style>
