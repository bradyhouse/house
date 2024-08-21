<template>
  <div ref="scrollbox" class="scrollable">
    <div class="h-100 d-flex align-items-center justify-content-center">
      <table width="100%">
        <tbody>
          <tr>
            <th colspan="3" style="text-align: center">
              <h3>Right Click on a bar in any of the charts</h3>
            </th>
          </tr>
          <tr>
            <td>
              <div
                style="width: 500px"
                ref="plotlyChart1"
                @contextmenu.prevent="onRightClick"
              ></div>
            </td>
            <td>
              <div
                style="width: 500px"
                ref="plotlyChart2"
                @contextmenu.prevent="onRightClick"
              ></div>
            </td>
            <td>
              <div
                style="width: 1000px !important; height: 1000px !important"
                ref="plotlyChart3"
                @contextmenu.prevent="onRightClick"
              ></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <ContextMenu
    ref="contextMenu"
    :actions="contextMenuActions"
    @action-clicked="handleActionClick"
  />
</template>

<script>
import { shallowRef } from 'vue'
import Plotly from 'plotly.js-dist'
import ContextMenu from '../components/ContextMenu.vue'

export default {
  components: {
    ContextMenu
  },
  data() {
    return {
      showMenu: false,
      menuX: 0,
      menuY: 0,
      contextMenuActions: [
        {
          label: 'Edit',
          action: 'edit'
        },
        {
          label: 'Delete',
          action: 'delete'
        }
      ],
      targetPoint: null
    }
  },
  mounted() {
    this.drawChart(this.$refs.plotlyChart1, 'bar')
    this.drawChart(this.$refs.plotlyChart2, 'bar')
    this.drawChart(this.$refs.plotlyChart3, 'bar')
  },
  methods: {
    drawChart(target, type) {
      const data = [
        {
          x: [1, 2, 3, 4],
          y: [10, 15, 13, 17],
          type: type,
          mode: 'markers'
        }
      ]

      Plotly.newPlot(target, data)
      target.on('plotly_click', this.handlePlotlyEvent.bind(this))
    },
    handlePlotlyEvent(data) {
      if (data.points && data.points.length) {
        debugger
        this.showMenu = true
        this.$refs.contextMenu.open({
          actions: shallowRef(this.contextMenuActions),
          event: data.event
        })
      } else {
        this.showMenu = false
      }
    },

    onRightClick(event) {
      const plotlyEvent = event.detail
      if (plotlyEvent) {
        this.showMenu = true
        this.menuX = event.clientX
        this.menuY = event.clientY
        this.targetPoint = plotlyEvent.points[0]
      }
    },
    handleActionClick(action) {
      console.log(action, this.targetPoint)
      this.showMenu = false
    }
  }
}
</script>

<style>
::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
}

.scrollable {
  min-width: calc(100%);
  min-height: calc(100%);
  overflow: auto;
}

@media (max-width: 350px) {
  .scrollable {
    min-width: calc(100%);
    height: 100vh;
    width: 100vw;
  }
}

.v-context,
.v-context ul {
  background-color: #fff;
  background-clip: padding-box;
  border-radius: 0.25rem;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow:
    0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  display: block;
  margin: 0;
  padding: 10px 0;
  min-width: 10rem;
  z-index: 9999 !important;
  position: absolute;
  list-style: none;
  box-sizing: border-box;
}

.v-context > li,
.v-context ul > li {
  margin: 0;
  position: relative;
}

.v-context > li > a,
.v-context ul > li > a {
  display: block;
  padding: 0.5rem 1.5rem;
  font-weight: 400;
  color: #212529;
  text-decoration: none;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
}

.v-context > li > a:focus,
.v-context > li > a:hover,
.v-context ul > li > a:focus,
.v-context ul > li > a:hover {
  text-decoration: none;
  color: #212529;
  background-color: #f8f9fa;
}

.v-context > li > a:focus,
.v-context ul > li > a:focus,
.v-context ul:focus,
.v-context:focus {
  outline: 0;
}

.v-context__sub > a:after {
  content: '\203A';
  float: right;
  padding-left: 1rem;
}

.v-context__sub > ul {
  display: none;
}
</style>
