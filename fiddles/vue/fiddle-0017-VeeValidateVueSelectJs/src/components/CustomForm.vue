<template>
  <VeeForm v-slot="{ handleSubmit, handleReset, setErrors }" :validation-schema="schema" as="div">
    <form
      ref="customFormRef"
      @submit="handleSubmit($event, onSubmit)"
      style="
        border-color: black;
        border-style: dashed;
        border-width: 1px;
        border-radius: 1%;
        padding: 10%;
        width: 300px;
      "
    >
      <label for="email">Email:</label>
      <br />
      <Field
        name="email"
        autocomplete=""
        type="email"
        style="width: 100%"
        placeholder="Enter a valid email"
      />
      <br />
      <ErrorMessage v-if="isError" name="email" style="color: red" />
      <br /><br />

      <label for="password">Password:</label>
      <br />
      <Field
        name="password"
        type="password"
        autocomplete=""
        style="width: 100%"
        placeholder="Enter a valid password"
      />
      <br />
      <ErrorMessage v-if="isError" name="password" style="color: red" />
      <br /><br />

      <label for="state">State:</label>
      <br />
      <CustomSelect
        ref="customSelectRef"
        v-model="selectedState"
        name="state"
        :options="stateOptions"
        rules="required"
        style="width: 100%"
      />
      <br />
      <button>Submit</button>
      <button @click.prevent="handleFormReset(setErrors, handleReset)">Reset</button>
    </form>
  </VeeForm>
</template>

<script setup>
import { ref } from 'vue'
import { Form as VeeForm, Field, ErrorMessage, useForm } from 'vee-validate'
import * as yup from 'yup'
import CustomSelect from './CustomSelect.vue'

const isError = ref(true)

const schema = yup.object({
  email: yup.string().required('email is required').email(),
  password: yup.string().required('password is required').min(8),
  state: yup.string().required('state is required')
})

const selectedState = ref('')
const stateOptions = ref(['', 'NJ', 'NY'])

function onSubmit(values) {
  // Submit values to API...
  alert(JSON.stringify(values, null, 2))
}

function handleFormReset(resetErrorsFn, resetFormFn) {
  const customSelectRef = ref(null)
  customSelectRef.value?.reset()
  isError.value = false
  resetFormFn({
    values: {
      email: '',
      password: '',
      state: ''
    }
  })
  setTimeout(() => {
    resetErrorsFn({
      email: '',
      password: '',
      state: ''
    })
    isError.value = true
  }, 500)
}
</script>
