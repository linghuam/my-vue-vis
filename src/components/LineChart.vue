<template>
  <e-charts :options="line"></e-charts>
</template>

<script>
import ECharts from '@/components/ECharts'
import 'echarts/lib/chart/line'

export default {
  data () {
    return {
      line:  {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
        }]
      }
    }
  },
  components: {
    ECharts
  }
}
</script>
