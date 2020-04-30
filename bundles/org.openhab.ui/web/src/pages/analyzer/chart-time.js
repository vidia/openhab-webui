export default {
  getChartPage (analyzer) {
    let page = {
      component: 'oh-chart-page',
      config: {
        chartType: analyzer.chartType,
        period: analyzer.period
      },
      slots: {}
    }

    page.slots.grid = [{ component: 'oh-chart-grid', config: { includeLabels: true } }]

    page.slots.xAxis = [
      {
        component: 'oh-time-axis',
        config: {
          gridIndex: 0
        }
      }
    ]

    page.slots.yAxis = analyzer.valueAxesOptions.map((a) => {
      return {
        component: 'oh-value-axis',
        config: {
          gridIndex: 0,
          name: a.unit
        }
      }
    })

    page.slots.series = analyzer.items.map((item) => {
      const seriesOptions = analyzer.seriesOptions[item.name]
      if (seriesOptions.discrete) {
        return {
          component: 'oh-time-series',
          config: {
            name: seriesOptions.name,
            gridIndex: 0,
            xAxisIndex: 0,
            yAxisIndex: 0,
            type: 'line',
            areaStyle: seriesOptions.type === 'area' ? {} : undefined
          },
          slots: {
            markArea: [
              {
                component: 'oh-mark-area',
                config: {
                  name: item.name,
                  item: item.name
                }
              }
            ]
          }
        }
      }
      return {
        component: 'oh-time-series',
        config: {
          name: seriesOptions.name,
          gridIndex: 0,
          xAxisIndex: 0,
          yAxisIndex: seriesOptions.valueAxisIndex,
          type: 'line',
          item: item.name,
          areaStyle: seriesOptions.type === 'area' ? { opacity: 0.2 } : undefined
        }
      }
    })

    page.slots.tooltip = [
      {
        component: 'oh-chart-tooltip',
        config: {
          confine: true,
          smartFormatter: true
        }
      }
    ]

    page.slots.legend = [
      {
        component: 'oh-chart-legend',
        config: {
          bottom: 5
        }
      }
    ]

    page.slots.dataZoom = [
      {
        component: 'oh-chart-datazoom',
        config: {
          type: 'inside'
        }
      }
    ]

    return page
  }
}
