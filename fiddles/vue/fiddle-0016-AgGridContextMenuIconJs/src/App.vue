<template>
  <div class="app-container">
    <TopNav
      href="https://github.com/bradyhouse/house/tree/master/fiddles/vue/fiddle-0016-AgGridContextMenuIconJs"
    ></TopNav>
    <RouterView :key="$route.fullPath" />
  </div>
</template>

<script>
import { RouterView } from 'vue-router'
import TopNav from './components/TopNav.vue'

export default {
  name: 'App',
  components: {
    TopNav
  }
}
</script>

<style scoped>
/* Ensure the app container takes up the full height of the viewport */
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* Fix the TopNav at the top of the screen */
.TopNav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* Ensure it stays above other content */
  background-color: white; /* Optional: Set background color */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Optional: Add shadow for better visibility */
}
</style>
