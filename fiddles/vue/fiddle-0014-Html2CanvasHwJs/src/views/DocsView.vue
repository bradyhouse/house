<template>
  <main ref="componentRef" class="welcome-main">
    <DocList />
  </main>
</template>

<script>
import DocList from '../components/DocList.vue'

export default {
  name: 'DocsView',
  components: {
    DocList
  },
  mounted() {
    //this.checkAndCapturePreview('docs-preview')
  }
}
</script>

<style scoped>
.welcome-main {
  padding: 100px;
}
</style>
