<template>
    <div style="width: 100%; height:100%; overflow: auto;">
        <div v-html="markdownToHtml"></div>
    </div>
</template>
  
  <script lang="ts">
  import { marked } from 'marked';
  
  export default {
    name: 'AboutView',
    data() {
      return {
        content: 'loading ...',
      };
    },
    mounted() {
      const origin = window.location.origin;
      const pathName = window.location.pathname.replace('/about', '');
      const url = 'README.md';
      fetch(url)
        .then((response) => response.text())
        .then((text) => this.bindText(text));
    },
    components: {},
    computed: {
      markdownToHtml(): any {
        return marked.parse(this.content);
      },
    },
    methods: {
      bindText(text: any) {
        console.log(text);
        this.content = text;
      },
    },
  };
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
  