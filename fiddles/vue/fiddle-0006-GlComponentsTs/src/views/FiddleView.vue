<template>

    <div ref="FiddleView" id="FiddleView" class="full-height">
        <div
            id="nav"
            className="navbar navbar-expand bg-warning navbar-top hide-0-to-350">
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
                    <li className="nav-item">
                        <button class="btn btn-primary" @click="onClickScreenshot">Screenshot</button>
                    </li>
                </ul>
            </div>

        </div>
        <golden-layout
            ref="GLayoutRoot"
            :config="Layouts.default"
            @height-change="onHeightChange"
            style="width: 100%; height: 90%">
            <template #Content1>
                <div class="card text-white bg-warning mb-3" style="height: calc(100%)">
                    <div class="card-body" style="overflow: hidden !important;">
                        <GridComponent></GridComponent>
                    </div>
                </div>

            </template>
            <template #Content2>
                <div class="card text-white bg-success mb-3" style="height: calc(100%)">
                    <div class="card-body" style="overflow: hidden !important;">
                        <ChartComponent></ChartComponent>
                    </div>
                </div>
            </template>
            <template #Content3>
                <div class="card text-white bg-success mb-3" style="height: calc(100%)">
                    <div class="card-body" style="overflow: hidden !important;">
                        <ChartComponent></ChartComponent>
                    </div>
                </div>

            </template>
            <template #route>
                <RouterView/>
            </template>
        </golden-layout>
    </div>

</template>

<script setup lang="ts">

    import {RouterView} from 'vue-router'
    import GoldenLayout from "../components/GoldenLayout.vue"
    import {reactive, ref} from "vue"
    import {Layouts} from "../classes/layouts"

    import {useCounterStore} from '../stores/counter'

    import domtoimage from 'dom-to-image-more';

    import GridComponent from '@/components/GridComponent.vue'
    import ChartComponent from '@/components/ChartComponent.vue'

    const store = useCounterStore()

    const state = reactive({gridHeight: "200px"})

    const GLayoutRoot = ref < null | typeof GoldenLayout > (null)

    const onHeightChange = (height : string, id : number) => {
        state.gridHeight = height
    }
    const onClickReset = () => {
        if (!GLayoutRoot.value) 
            return;
        store.zero()
        GLayoutRoot
            .value
            .loadGLLayout(Layouts.default)
    };

    const onClickAdd = () => {
        if (!GLayoutRoot.value) 
            return;
        store.increment()
        const title = "Component " + String(store.count)
        GLayoutRoot
            .value
            .addGlComponent("Content3", title)
    };

    const onClickSave = () => {
        if (!GLayoutRoot.value) 
            return;
        const config = GLayoutRoot
            .value
            .getLayoutConfig();
        console.log(JSON.stringify(config))
        localStorage.setItem("gl_config", JSON.stringify(config))
    };

    const onClickLoad = () => {
        const str = localStorage.getItem("gl_config")
        if (!str) 
            return;
        if (!GLayoutRoot.value) 
            return
        const config = JSON.parse(str)
        GLayoutRoot
            .value
            .loadGLLayout(config)
    };

    const onClickScreenshot = () => {
        const page = document.getElementById('FiddleView')
        
        domtoimage
        .toPng(page)
        .then((dataUrl) => {
            const image_window = window.open("", "_blank")
            image_window.document.write(`
                <html>
                    <head>
                        <title>Screenshot</title>
                    </head>
                    <body style="background: black;">
                    <img src="`+ dataUrl +`" alt="Example" width="80%">
                    </body>
                </html>
            `);
        })
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

    .navbar {
        border-radius: 0 !important;
    }
    @media(max-width:350px) {
        .hide-0-to-350 {
            display: none;
        }
    }

</style>