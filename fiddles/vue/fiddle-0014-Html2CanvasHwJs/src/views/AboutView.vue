<template>
  <div ref="componentRef" v-html="markdownToHtml"></div>
</template>

<script>
import { marked } from 'marked'
import { debounce } from 'lodash'

export default {
  name: 'AboutView',
  data() {
    return {
      content: 'loading...'
    }
  },
  mounted() {
    const origin = window.location.origin
    const pathName = window.location.pathname.replace('/about', '')
    const url = 'README.md'
    fetch(url)
      .then((response) => response.text())
      .then((text) => {
        this.bindText(text)
        /*setTimeout(() => {
            this.checkAndCapturePreview('about-preview')
          }, 1000)*/
      })
  },
  computed: {
    markdownToHtml() {
      return marked.parse(this.content)
    }
  },
  methods: {
    bindText(text) {
      this.content = text
    }
  }
}
</script>

<style scoped>
div {
  padding: 1rem;
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
