<template>
<div class="scrollable">
    <div class="h-100 d-flex align-items-center justify-content-center">
        <div class="container" v-if="this.json">
            <div class="row">
                <div class="col">
                    <header>
                        <button @click="prev">previous</button>
                        <select v-model="current" @change="fromDrop">
                            <option v-for="item in list" :key="item">{{item}}</option>
                        </select>
                        <button @click="next">next</button>
                    </header>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <h4>Vega Embed</h4>
                    <div class="hor chart" v-if="isLoaded">
                        <div ref="viz" id="viz"></div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <h4>Selection</h4>
                    <div class="d-flex align-items-center justify-content-center">
                        <pre style="width: 100%; padding-top: 10px; text-align: left !important;">
                            {{ this.selection }}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import _ from 'lodash'
import embed from 'vega-embed'
import axios from 'axios'
import list from '../list.js'

const BASEURL = 'https://vega.github.io/vega-lite/'

export default {
    name: 'FiddleView',
    
    data() {
        return {
            def: null,
            list: list,
            current: null,
            index: 1,
            json: null,
            selection: null,
            selectioDefault: 'Click a bar or point on the Chart'
        }
    },
    watch: {
        def(v) {
            if (v) this.draw()
        }
    },
    computed: {
        isLoaded() {
            if (this.json) return true
            return false
        }
    },
    mounted() {
        this.current = this.list[this.index];
        this.load()
    },
    methods: {
        prev() {
            this.index--
            this.current = this.list[this.index]
            this.load()
        },
        next() {
            this.index++
            this.current = this.list[this.index]
            this.load()
        },
        fromDrop() {
            this.index = this.list.indexOf(this.current)
            this.load()
        },
        async load() {
            const resp = await axios(`${BASEURL}examples/${this.current}`)
            let ob = resp.data
            if (ob.data.url) {
                ob.data.url = BASEURL + ob.data.url
            }
            ob.params = [{
                    "name": "highlight",
                    "select": {
                        "type": "point",
                        "on": "mouseover"
                    }
                },
                {
                    "name": "select",
                    "select": "point"
                }
            ]

            ob.encoding.fillOpacity = {
                "condition": {
                    "param": "select",
                    "value": 1
                },
                "value": 0.3
            }
            this.selection = this.selectioDefault

            this.def = JSON.stringify(ob)
            this.json = resp
        },
        async draw() {
            let struct = JSON.parse(this.def)
            struct.width = 'container'
            struct.height = 'container'
            await embed('#viz', struct, {
                actions: true
            }).then(result => {
                result.view.addEventListener('click', (event, item) => {
                    if ('x' in item && 'y' in item) {
                        const value = '( x = ' + String(item.x).trim() + ', y = ' + String(item.y).trim() + ' )'
                        this.selection = value.trim()
                    } else {
                        this.selection = this.selectioDefault
                    }
                });
            }).catch(console.warn);
        }
    }
}
</script>

<style>
* {
    box-sizing: border-box;
}

.chart {
    border: thick double gainsboro;
}

html,
body {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding: 0;
    margin: 0;
}
</style>

<style scoped>
header {
    display: flex;
    justify-content: space-between;
    padding: .5rem;
    background-color: gainsboro;
}

.hor {
    display: flex;
    width: 100%;
    height: 350px;
}

#app {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

#app .hor>div {
    flex: 1;
}

input {
    width: 100%;
}

#viz {
    overflow: hidden;
}

#app .hor>#viz {
    flex: 1;
}
</style>
