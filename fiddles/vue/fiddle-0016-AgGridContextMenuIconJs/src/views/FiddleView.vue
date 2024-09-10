<template>
  <div class="scrollable">
    <Agrid></Agrid>
  </div>
</template>

<script>
import Agrid from '../components/agrid/Agrid.vue'

export default {
  components: {
    Agrid
  }
}
</script>

<style scoped>
::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
}

.scrollable {
  min-width: calc(100%);
  min-height: calc(100%);
}

@media (max-width: 350px) {
  .scrollable {
    min-width: calc(100%);
    height: 100vh;
    width: 100vw;
  }
}
</style>
