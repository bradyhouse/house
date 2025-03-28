<template>
  <div>
    <v-select
      dir="auto"
      autocomplete=""
      :closeOnSelect="true"
      :clearable="false"
      :placeholder="`Select a ${props.name}`"
      :options="options"
      @option:selected="handleInput"
      :modelValue="internalValue"
      v-bind="attrs"
    />
  </div>

  <span v-if="errorMessage" style="color: red">{{ errorMessage.toLowerCase() }}</span>
  <br />
</template>

<script setup>
import { ref, watch, useAttrs } from 'vue'
import { useField } from 'vee-validate'
import 'vue-select/dist/vue-select.css'

import vSelect from 'vue-select'

const props = defineProps({
  modelValue: String,
  options: Array,
  name: String,
  rules: [String, Object, Function]
})

const emit = defineEmits(['update:modelValue'])
const attrs = useAttrs()

const internalValue = ref('')

const {
  value: fieldValue,
  errorMessage,
  handleChange,
  resetField
} = useField(props.name, props.rules, {
  initialValue: ''
})

function handleInput(value) {
  handleChange(value)
}

function updateInternalValue(newValue) {
  internalValue.value = newValue
  emit('update:modelValue', newValue)
}

watch(fieldValue, (newValue) => {
  internalValue.value = newValue
})

defineExpose({
  reset: () => {
    internalValue.value = ''
    resetField({ value: '', dirty: true })
  }
})
</script>
