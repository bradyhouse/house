<script setup>
import { toRef, computed, ref, watch, nextTick, onUnmounted, defineExpose, onMounted } from 'vue'
import { useField } from 'vee-validate'
import { cloneDeep, isEqual } from 'lodash'
import vSelect from 'vue-select'
import { debounce } from 'lodash'
import 'vue-select/dist/vue-select.css'

//#region Properties

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  label: {
    type: String
  },
  field: {
    type: String,
    default: 'text'
  },
  modelValue: [String, Number, Object],
  placeholder: {
    type: String,
    default: ''
  },
  options: {
    type: Array
  },
  labelProp: {
    type: String
  },
  valueProp: {
    type: String
  },
  disabled: {
    type: Boolean
  },
  paginate: {
    type: Boolean,
    default: true
  },
  fetchPageCallBack: {
    type: Function,
    default: undefined
  },
  isLastPage: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  disableValidation: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String
  },
  clearable: {
    type: Boolean,
    default: true
  },
  searchable: {
    type: Boolean,
    default: true
  }
})
//#endregion
//#region Emit

const emit = defineEmits(['selected', 'update:modelValue'])

//#endregion
//#region State Constants

const ITEMS_PER_PAGE = 50
const DEBOUNCE_MS = 25

const limit = ref(ITEMS_PER_PAGE)
const search = ref('')
const allOptions = ref([])
const initOptions = ref([])
const hasMoreItems = ref(true)
const selectedOption = ref(null)
const page = ref(1)
const isLoading = ref(false)
const selectRef = ref(null)
const lastScrollPosition = ref(0)
const name = toRef(props, 'name')
const modelValue = toRef(props, 'modelValue')
const { value, errorMessage, meta } = useField(name, undefined, { initialValue: modelValue })
const refreshMessage = ref(0)
const prevObserver = ref(null)
const nextObserver = ref(null)

//#endregion
//#region Computed

const filteredOptions = computed(() => {
  return allOptions.value.filter(
    (option) =>
      (option &&
        option[props.labelProp] &&
        option[props.labelProp].toLowerCase().includes(search.value.toLowerCase())) ||
      (option &&
        option.subText &&
        option.subText.toLowerCase().includes(search.value.toLowerCase()))
  )
})

const hasPreviousPage = computed(() => {
  return page.value > 1
})

const paginatedOptions = computed(() => {
  if (!props.paginate) return filteredOptions.value

  const startIndex = page.value * limit.value

  return filteredOptions.value.slice(0, startIndex + limit.value)
})

const validationState = computed(() => {
  if (!meta.validated || props.disableValidation) {
    return null
  }
  return meta.valid ? 'valid' : 'invalid'
})

//#endregion
//#region Watch

watch(
  () => props.modelValue,
  () => {
    selectedOption.value = props.modelValue
  }
)
watch(
  () => props.loading,
  (newLoadingValue) => {
    isLoading.value = newLoadingValue
    refreshMessage.value++
  }
)

watch(
  () => props.isLastPage,
  (newFlagValue) => {
    hasMoreItems.value = !newFlagValue
  }
)

watch(
  () => cloneDeep(props.options),
  (newOptions) => {
    if (allOptions.value.length === 0) {
      allOptions.value = newOptions
      initOptions.value = newOptions
    } else {
      // Find only options that aren't already in allOptions
      const uniqueOptions = newOptions.filter(
        (option) => !allOptions.value.some((existing) => isEqual(existing, option))
      )

      if (uniqueOptions.length > 0) {
        allOptions.value.push(...uniqueOptions)
      }
      restoreDropDownPosition()
    }
  },
  { immediate: true }
)

//#endregion
//#region Internal Functions

async function fetchMoreItems() {
  if (!hasMoreItems.value || isLoading.value) return

  await fetchCallBack(page.value, search.value)
}

async function fetchCallBack(page, searchString = null) {
  if (props.fetchPageCallBack === undefined) {
    console.error('fetchPageCallBack must be implemented inorder to enable pagination.')
  } else {
    try {
      await props.fetchPageCallBack(page, searchString)
    } catch (error) {
      console.error('Error fetching items:', error)
    }
  }
}

const handleSearch = async (value) => {
  search.value = value
  page.value = 1
  limit.value = ITEMS_PER_PAGE
  allOptions.value = initOptions.value
  debouncedSearch(page.value, search.value)
  await nextTick()
  refreshMessage.value++
}

const debouncedSearch = debounce(async (page, searchString) => {
  await fetchCallBack(page, searchString)
}, DEBOUNCE_MS)

async function handleScroll(event) {
  if (event?.target) {
    const container = event.target
    const scrollTop = container.scrollTop
    const scrollHeight = container.scrollHeight
    const clientHeight = container.clientHeight

    if (scrollTop <= 100 && hasPreviousPage.value) {
      const prevLoader = container.children[0]
      if (prevLoader) {
        prevObserver.value?.observe(prevLoader)
      }
    } else if (scrollHeight - scrollTop <= clientHeight + 100) {
      const nextLoader = container.children[container?.children.length - 1]
      if (nextLoader) {
        nextObserver.value?.observe(nextLoader)
      }
    }

    lastScrollPosition.value = scrollTop
  }
}

const debouncedHandleScroll = debounce(handleScroll, DEBOUNCE_MS)

function handlePrevIntersection(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !isLoading.value) {
      page.value--
    }
  })
}

async function handleNextIntersection(entries) {
  entries.forEach(async (entry) => {
    if (entry.isIntersecting && !isLoading.value && hasMoreItems.value) {
      page.value++
      await fetchMoreItems()
    }
  })
}

const handleKeyDown = (e) => {
  if (!hasMoreItems.value || isLoading.value) return

  switch (e.key) {
    case 'ArrowDown':
      const lastVisibleIndex = paginatedOptions.value.length - 1
      if (
        lastVisibleIndex >= 0 &&
        document.querySelectorAll('.vs__dropdown-option')[lastVisibleIndex]
      ) {
        const lastElement = document.querySelectorAll('.vs__dropdown-option')[lastVisibleIndex]
        if (lastElement.getBoundingClientRect().bottom >= window.innerHeight * 0.8) {
          if (!isPagePopulated(page.value + 1)) {
            nextObserver.value?.observe(lastElement)
            lastScrollPosition.value = lastElement.scrollTop
          }
        }
      }
      break
  }
}

const debouncedHandleKeyDown = debounce(handleKeyDown, DEBOUNCE_MS)

function isPagePopulated(page) {
  const startIndex = page * limit.value

  return filteredOptions.value.slice(startIndex, startIndex + limit.value).length > 1 ? true : false
}

function handleOptionSelected(option) {
  emit('selected', option)
}

function restoreDropDownPosition() {
  nextTick().then(() => {
    const observerTarget = document.querySelector('.vs__dropdown-menu')
    if (observerTarget) {
      // Restore scroll position when opening
      requestAnimationFrame(() => {
        observerTarget.scrollTop = lastScrollPosition.value
      })
    }
  })
}

function handleOpen() {
  nextTick(() => {
    requestAnimationFrame(() => {
      const container = document.querySelector('.vs__dropdown-menu')
      if (container) {
        container.addEventListener('scroll', debouncedHandleScroll)
      }
    })
  })
}

function handleClose() {
  const container = document.querySelector('.vs-dropdown-menu')
  if (container) {
    container.removeEventListener('scroll', debouncedHandleScroll)
  }
  lastScrollPosition.value = 0
}

//#endregion
//#region Public Functions

function reset() {
  allOptions.value = []
  limit.value = ITEMS_PER_PAGE
}

defineExpose({
  reset
})

//#endregion
//#region Life Cycle

onMounted(() => {
  prevObserver.value = new IntersectionObserver(handlePrevIntersection)
  nextObserver.value = new IntersectionObserver(handleNextIntersection)
})

onUnmounted(() => {
  prevObserver.value?.disconnect()
  nextObserver.value?.disconnect()
})

//#endregion
</script>

<template>
  <label class="label" :class="{ required: $attrs.required }" :for="$attrs.id" v-if="label">
    {{ label }} Page: {{ page }} | Loaded Records: {{ allOptions.length }}
  </label>

  <div class="input-field-select" :class="(validationState, { icon: icon })">
    <v-select
      id="selector"
      ref="selectRef"
      :disabled="disabled"
      :options="paginatedOptions"
      :filterable="false"
      :placeholder="placeholder"
      :clearable="clearable"
      @search="
        (val) => {
          handleSearch(val)
        }
      "
      @open="handleOpen"
      @close="handleClose"
      @option:selected="handleOptionSelected"
      @keydown.down.prevent="debouncedHandleKeyDown"
      @keydown.up.prevent="debouncedHandleKeyDown"
      :label="labelProp"
      v-model="selectedOption"
      :reduce="(i) => i[valueProp]"
      :searchable="props.searchable"
      v-bind="$attrs"
    >
      <template #option="option">
        <div class="location-item">
          <div class="location-item-text">
            <div class="text-bold">{{ option.text }}</div>
            <div v-if="option?.subText">{{ option.subText }}</div>
          </div>
        </div>
      </template>
      <template #list-footer>
        <li :key="refreshMessage" v-if="isLoading" class="loader">Loading...</li>
      </template>
      <template #no-options>
        <div :key="refreshMessage" v-if="!isLoading && paginatedOptions.length === 0">
          <span>No Matches found</span>
        </div>
      </template>
    </v-select>
  </div>

  <div class="form-validation">
    <transition name="fade">
      <span class="invalid-message" v-if="errorMessage">
        {{ errorMessage }}
      </span>
    </transition>
  </div>
</template>

<style lang="scss">
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 300ms ease-in-out;
}

input[type='search']::placeholder {
  color: var(--input-placeholder);
}

.location-item {
  display: flex;

  .location-item-text {
    flex: 1;
  }
}

.text-bold {
  font-weight: 700;
}

.previous-loader,
.loader {
  text-align: center;
  color: #666;
  padding: 10px;
}

.previous-loader:hover {
  cursor: pointer;
  background-color: #f0f0f0;
}
</style>
