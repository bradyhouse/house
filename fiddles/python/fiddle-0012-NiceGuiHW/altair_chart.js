
//import { embed } from 'vega-embed'
//import { axios } from 'axios'

const embed = window.vegaEmbed
const axios = window.axios
const list =  [
    'bar_aggregate.vl.json', 
    'bar_aggregate_count.vl.json', 
    'bar_aggregate_format.vl.json', 
    'bar_aggregate_size.vl.json', 
    'bar_aggregate_sort_by_encoding.vl.json', 
    'bar_aggregate_sort_mean.vl.json', 
    'bar_aggregate_transform.vl.json', 
    'bar_aggregate_vertical.vl.json', 
    'bar_argmax.vl.json', 
    'bar_argmax_transform.vl.json', 
    'bar_array_aggregate.vl.json', 
    'bar_binned_data.vl.json', 
    'bar_color_disabled_scale.vl.json', 
    'bar_column_fold.vl.json', 
    'bar_column_pivot.vl.json', 
    'bar_count_minimap.vl.json', 
    'bar_custom_sort_full.vl.json', 
    'bar_custom_sort_partial.vl.json', 
    'bar_distinct.vl.json', 
    'bar_diverging_stack_population_pyramid.vl.json', 
    'bar_diverging_stack_transform.vl.json', 
    'bar_filter_calc.vl.json', 
    'bar_fit.vl.json', 
    'bar_gantt.vl.json', 
    'bar_grouped.vl.json', 
    'bar_grouped_horizontal.vl.json', 
    'bar_layered_transparent.vl.json', 
    'bar_layered_weather.vl.json', 
    'bar_month.vl.json', 
    'bar_month_band.vl.json', 
    'bar_month_band_config.vl.json', 
    'bar_month_temporal.vl.json', 
    'bar_month_temporal_initial.vl.json', 
    'bar_multi_values_per_categories.vl.json', 
    'bar_size_default.vl.json', 
    'bar_size_explicit_bad.vl.json', 
    'bar_size_fit.vl.json', 
    'bar_size_responsive.vl.json', 
    'bar_size_step_small.vl.json', 
    'bar_sort_by_count.vl.json', 
    'bar_swap_axes.vl.json', 
    'bar_swap_custom.vl.json', 
    'bar_title.vl.json', 
    'bar_title_start.vl.json', 
    'bar_tooltip.vl.json', 
    'bar_tooltip_multi.vl.json', 
    'bar_yearmonth.vl.json', 
    'bar_yearmonth_custom_format.vl.json'   
  ]

const BASEURL = 'https://vega.github.io/vega-lite/'

export default {
    template: `<div style="height: 500px; width: 500px;">
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
                    <div style="width: 500px; height: 500px;" v-if="isLoaded">
                        <div ref="viz" id="viz" style="width: 500px; height: 500px;"></div>
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
</div>`,
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
        this.$emit('change', this.current)
        this.load()
    },
    next() {
        this.index++
        this.current = this.list[this.index]
        this.$emit('change', this.current)
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
  };