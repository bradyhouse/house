<template>
  <main class="welcome-main" v-tour-step:10="step10DocPage(startupTour)" >
    <TheWelcome  />
  </main>
</template>


<script lang="ts">

import TheWelcome from '../components/TheWelcome.vue'
import step10DocPage from "@/shepherd-tour/step10-doc-page.js"

import { marked } from 'marked'
import { inject } from 'vue'


export default {
    name: 'DocView',
    components: {
        TheWelcome
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
