<template>
  <main class="welcome-main" v-tour-step:10="step10DocPage(startupTour)" >
    <DocList />
  </main>
</template>


<script lang="ts">

import DocList from '../components/DocList.vue'
import step10DocPage from "@/shepherd-tour/step10-doc-page.js"

import { marked } from 'marked'
import { inject } from 'vue'


export default {
    name: 'DocView',
    components: {
        DocList
    },
    setup() {
      const startupTour = inject('startupTour')
    return {
      startupTour,
      step10DocPage
    };
  },
}
</script>


<style scoped>
  .welcome-main {
    padding: 100px;
  }

</style>
