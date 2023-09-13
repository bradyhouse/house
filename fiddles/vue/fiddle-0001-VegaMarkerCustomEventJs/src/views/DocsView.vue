

<template>
<main class="main">
    <Docs></Docs>
</main>
</template>

<script>
import Docs from '../components/docs/Docs.vue'
export default {
    name: 'DocsView',
    components: {
        Docs
    }
}
</script>

<style scoped>
.main {
    padding: 100px;
}
</style>
