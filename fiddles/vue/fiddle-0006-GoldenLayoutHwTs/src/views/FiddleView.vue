<template>

        <div class="full-height">
            <div id="nav"  className="navbar navbar-expand bg-warning navbar-top hide-0-to-350">
                <div class="container-fluid">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <button class="btn btn-primary" @click="onClickReset">Reset</button>
                    </li>
                    <li className="nav-item">
                        <button class="btn btn-info" @click="onClickAdd">
                            Add
                        </button>        
                    </li>
                    <li className="nav-item">
                        <button class="btn btn-danger" @click="onClickSave">Save</button>
                    </li>
                    <li className="nav-item">
                        <button class="btn btn-success  " @click="onClickLoad">Load</button>
                    </li>
                </ul>
                </div>
                
            </div>
            <golden-layout ref="GLayoutRoot" :config="Layouts.default" style="width: 100%; height: 100vh">
                <template #Content1>
                    <div class="card text-white bg-danger mb-3" style="height: calc(100%) !important">
                        <div class="card-body">
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                </template>
                <template #Content2>
                    <div class="card text-white bg-success mb-3" style="height: calc(100%)">
                    <div class="card-body">
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                    </div>
                </template>
                <template #Content3>
                    <div class="card text-white bg-info mb-3" style="height: calc(100%)">
                    <div class="card-body">
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                    </div>
                </template>
                <template #route>
                    <RouterView />
                </template>
            </golden-layout>
        </div>
   
</template>

<script setup lang="ts">

import {
    RouterView
} from 'vue-router'
import GoldenLayout from "../components/GoldenLayout.vue"
import {
    ref
} from "vue"
import {
    Layouts
} from "../classes/layouts"
import { useCounterStore } from '../stores/counter'
const store = useCounterStore()

const GLayoutRoot = ref < null | typeof GoldenLayout > (null)

const onClickReset = () => {    
    if (!GLayoutRoot.value) return;
    store.zero()
    GLayoutRoot.value.loadGLLayout(Layouts.default)
};

const onClickAdd = () => {
    if (!GLayoutRoot.value) return;
    store.increment()
    const title = "Component " + String(store.count)
    GLayoutRoot.value.addGlComponent("Content3", title)
};

const onClickSave = () => {
    if (!GLayoutRoot.value) return;
    const config = GLayoutRoot.value.getLayoutConfig();
    localStorage.setItem("gl_config", JSON.stringify(config))
};

const onClickLoad = () => {
    const str = localStorage.getItem("gl_config")
    if (!str) return;
    if (!GLayoutRoot.value) return
    const config = JSON.parse(str)
    GLayoutRoot.value.loadGLLayout(config)
};
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

.navbar {
    border-radius: 0 !important;
}

@media(max-width:350px) {
    .hide-0-to-350 {
        display: none;
    }
}
</style>
