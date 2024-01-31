<template>
    <div class="scrollable">
        <div class="h-100 d-flex align-items-center justify-content-center">
            <WysiwygEditor></WysiwygEditor>
        </div>
    </div>
</template>
    

<script>

import WysiwygEditor from '../components/WysiwygEditor.vue';

export default {
    name: 'FiddleView',
    components: {
        WysiwygEditor
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
    background-color: rgba(0, 0, 0, .5);
    -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, .5);
}

.scrollable {
    min-width: calc(100%);
    min-height: calc(100%);

}

@media(max-width:350px) {
    .scrollable {
        min-width: calc(100%);
        height: 100vh;
        width: 100vw;
    }
}
</style>
