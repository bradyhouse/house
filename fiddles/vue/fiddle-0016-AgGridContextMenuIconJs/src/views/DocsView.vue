<script setup>
import DocList from '../components/DocList.vue'
</script>

<template>
  <div class="content-container">
    <DocList />
  </div>
</template>

<style scoped>
.content-container {
  margin-top: 1rem;
  flex-grow: 1;
  overflow-y: auto;
  padding: 0.5rem;
}
</style>
