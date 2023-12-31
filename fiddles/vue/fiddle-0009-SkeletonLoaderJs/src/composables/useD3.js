import * as d3 from 'd3'

function unpack(rows, key) {
  return rows.map(function (row) {
    return row[key]
  })
}

export default async function useD3() {
  
  const rows = await d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/3d-scatter.csv')
    
  return new Promise((resolve) => {
    const trace1 = {
      x: unpack(rows, 'x1'),
      y: unpack(rows, 'y1'),
      z: unpack(rows, 'z1'),
      mode: 'markers',
      marker: {
        size: 12,
        line: {
          color: 'rgba(217, 217, 217, 0.14)',
          width: 0.5
        },
        opacity: 0.8
      },
      type: 'scatter3d'
    }

    const trace2 = {
      x: unpack(rows, 'x2'),
      y: unpack(rows, 'y2'),
      z: unpack(rows, 'z2'),
      mode: 'markers',
      marker: {
        color: 'rgb(127, 127, 127)',
        size: 12,
        symbol: 'circle',
        line: {
          color: 'rgb(204, 204, 204)',
          width: 1
        },
        opacity: 0.8
      },
      type: 'scatter3d'
    }

    const data = [trace1, trace2]
    const layout = {
      showlegend: false,
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      displayModeBar: false,
      width: 1024,
      height: 500,
      margin: {
        l: 0,
        r: 0,
        b: 0,
        t: 0
      }
    }

    resolve({
      data: data,
      layout: layout,
      options: {displayModeBar: false}
    })

  })

}