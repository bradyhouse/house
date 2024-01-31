<template>
<div class="scrollable">
    <div id="fiddleView" class="h-100 d-flex align-items-center justify-content-center" style="display: flex; flex-direction: column;">
        <div class="section" style="height: 30px; width: 100%;">
            30px
        </div>
        <VerticalSpacer targetId="fiddleView" offsetHeight="52" ></VerticalSpacer>
        <div class="section" style="height: 130px; width: 100%;">
            130px
        </div>
    </div>
</div>
</template>

<script> 
import VerticalSpacer from '../components/VerticalSpacer.vue';

export default {
    name: 'FiddleView',
    components: {
        VerticalSpacer
    }
}
</script>

<style scoped>
@import url('../index.css');

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

.section {
    display: grid;
    place-items: center;
    border: 1px solid gainsboro;
}

@media(max-width:350px) {
    .scrollable {
        min-width: calc(100%);
        height: 100vh;
        width: 100vw;
    }
}
</style>
