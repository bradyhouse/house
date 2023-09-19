<template>
    <div class="scrollable">
        
        <div class="h-100 d-flex align-items-center justify-content-center">
            <div>
                <img style="width: 30%;" v-tour-step:1="step1VueIcon(startupTour)"
                alt="Vue logo"
                src="../assets/logo.svg"
                />
            </div>
           
            <HelloWorld msg="Welcome to Your Vue.js App" />
        </div>
    </div>
    </template>

<script lang="ts">
import HelloWorld from "@/components/HelloWorld.vue"
import step1VueIcon from '@/shepherd-tour/step1-vue-icon.js'
import {
    inject,
    onMounted
} from "vue"
import {
    useRoute
} from 'vue-router'

function isLocalStorage(): boolean {
    return typeof localStorage !== 'undefined' ?
        true :
        false
}

export default {
    name: 'FiddleView',
    components: {
        HelloWorld,
    },
    setup() {
        const route = useRoute()
        const tour = inject("startupTour")
        const isFirstVisit = isLocalStorage() ?
            localStorage.getItem('isFirstVisit') :
            'true'
        onMounted(() => {
            if (isFirstVisit !== 'false' || route.params.tour) {
                if (isLocalStorage()) {
                    localStorage.setItem('isFirstVisit', 'false')
                }
                
                tour.start()
            }
        })

        return {
            step1VueIcon
        }
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
