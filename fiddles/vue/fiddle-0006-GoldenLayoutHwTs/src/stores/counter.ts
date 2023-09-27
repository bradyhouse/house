import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(2)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  function decrement() {
    if (count.value > 2) {
      count.value--
    }
  }
  function zero() {
    count.value = 2
  }

  return { count, doubleCount, increment, decrement, zero }
})
