<template>
<img v-if="!isEmpty" :src="imageSrc" />
<IconPlotly v-if="isEmpty" :width="200">
</IconPlotly>
</template>

<script lang="js">
import IconPlotly from './icons/IconPlotly.vue';

export default {
    components: {
        IconPlotly
    },
    props: ['imageUrl'],  
    setup(props) {
        return {
          imageSrc: props.imageUrl,
          isEmpty: props.imageUrl ? false : true
        }
        
    }

}
</script>

<style scoped>
img {
    filter: blur(5px) contrast(150%) brightness(90%) saturate(0%);
}
</style>
