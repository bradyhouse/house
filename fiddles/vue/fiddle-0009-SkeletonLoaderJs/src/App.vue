<template>
  <TopNav href="https://github.com/bradyhouse/house/tree/master/fiddles/vue/fiddle-0009-SkeletonLoaderJs"></TopNav>
  <RouterView :key="$route.fullPath" />
  </template>
  
  <script>
  import {
      RouterView
  } from 'vue-router'
  import TopNav from './components/TopNav.vue'
  
  export default {
      name: 'App',
      components: {
          TopNav,
          RouterView
      }
  
  }
  </script>
   
  <style scoped>
  header {
      line-height: 1.5;
      max-height: 100vh;
  }
  
  .logo {
      display: block;
      margin: 0 auto 2rem;
  }
  
  nav {
      width: 100%;
      font-size: 12px;
      text-align: center;
  }
  
  nav a.router-link-exact-active {
      color: var(--color-text);
  }
  
  nav a.router-link-exact-active:hover {
      background-color: transparent;
  }
  
  nav a {
      display: inline-block;
      padding: 0 1rem;
      border-left: 1px solid var(--color-border);
  }
  
  nav a:first-of-type {
      border: 0;
  }
  </style>
  