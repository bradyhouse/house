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
        margin-top: 10%;
        padding: 10%;
        width: 500px;
      "
    >
      <br />
      <InfiniteSelect
        ref="elLocation"
        v-model="selectedLocation"
        name="location"
        :options="locations"
        label="Location:"
        labelProp="text"
        valueProp="value"
        :paginate="true"
        :required="true"
        :searchable="true"
        :clearable="true"
        :isLastPage="isLastPage"
        :loading="isLocationsLoading"
        :fetchPageCallBack="onLocationsScrollCallBack"
        rules="required"
        placeholder="Select Location"
        style="width: 100%">
      </InfiniteSelect>
      <br />
      <button>Submit</button>
      <button @click.prevent="handleFormReset(setErrors, handleReset)">Reset</button>
    </form>
  </VeeForm>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { Form as VeeForm, Field, ErrorMessage, useForm } from 'vee-validate'
import * as yup from 'yup'
import InfiniteSelect from './InfiniteSelect.vue'

//#region State Constants

const isError = ref(true)

const schema = yup.object({
  location: yup.string().required('location is required')
})

const api = inject('api');

const selectedLocation = ref('');
const initLocations = ref([{ text: 'Select Location', value: 0 }])
const locations = ref([{ text: 'Select Location', value: 0 }]);
const locationsSearch = ref('');
const isLocationsLoading = ref(false);
const elLocation = ref(null);
const isLastPage = ref(false);
//#endregion
//#region Functions

async function onLocationsScrollCallBack(page, searchString) {
  locationsSearch.value = searchString;
  locations.value = initLocations.value;
  isLocationsLoading.value = true;
  const criteriaObj = searchString && searchString.trim() !== '' ?
    {
      LocationName: searchString
    } : {};

  const resp = await api.getPage({
    searchCriteria: criteriaObj,
    pageNumber: page
  });

  isLastPage.value = resp.HasNextPage ? false : true;

  const data = resp.Items.map(item => {
    return {
      text: item.LocationName,
      value: item.LocationID,
      subText: item.FormattedAddress
    };
  });
  locations.value = [... data];
  isLocationsLoading.value = false;
}

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
      location: ''
    }
  })
  setTimeout(() => {
    resetErrorsFn({
      location: ''
    })
    isError.value = true
  }, 500)
}

//#endregion
//#region Life Cycle Hooks

onMounted( async () => {
  isLocationsLoading.value = true;
  const resp = await api.getPage({
    searchCriteria: {},
    pageNumber: 1
  });
  
  isLastPage.value = resp.HasNextPage ? false : true;

  const data = resp.Items.map(item => {
    return {
      text: item.LocationName,
      subText: item.FormattedAddress,
      value: item.LocationID
    };
  });

  locations.value = [... data];
  isLocationsLoading.value = false;
});


//#endregion
</script>
