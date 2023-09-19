<template>
  <div v-html="markdownToHtml" v-tour-step:3="step3AboutPage(startupTour)"></div>
</template>

<script lang="ts">

import { marked } from 'marked'
import step3AboutPage from "@/shepherd-tour/step3-about-page.js"

export default {
    name: 'AboutView',
    data() {
        return {
            content: 'loading ...'
        }
    },
    setup() {
    return {
      step3AboutPage
    };
  },
    mounted() {

        const origin = window.location.origin
        const pathName = window.location.pathname.replace('/about','')
        const url = 'README.md'
        fetch(url)
            .then(response => response.text())
            .then(text => this.bindText(text))

    },
    components: {},
    computed: {
      markdownToHtml(): any{
        return marked.parse(this.content)
      }
    },
    methods: {
        bindText(text: any) {
            console.log(text)
            this.content = text;

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
