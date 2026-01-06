<template>
  <div id="myChart" style="width: 100%; height: 400px;"></div>
</template>

<script>
// 按需引入 ECharts 核心模块 + 需要的图表/组件
import * as echarts from 'echarts/core'
import { BarChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

// 注册需要的模块
echarts.use([TitleComponent, TooltipComponent, GridComponent, BarChart, CanvasRenderer])

export default {
  name: 'EchartsDemo',
  mounted () {
    const myChart = echarts.init(document.getElementById('myChart'))
    const option = {
      title: { text: '按需引入-适配示例' },
      xAxis: { type: 'category', data: ['Vue', 'React', 'Angular'] },
      yAxis: { type: 'value' },
      series: [{ data: [95, 80, 60], type: 'bar' }]
    }
    myChart.setOption(option)
  }
}
</script>
