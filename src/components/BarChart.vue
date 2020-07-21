<template>
  <e-charts :options="options"></e-charts>
</template>

<script>
import ECharts from '@/components/ECharts'
import 'echarts/lib/chart/bar'

export default {
  props: {
    data: Object
  },
  computed: {
    options() {
      if (!this.data || !this.data.data) return;
      return {
        xAxis: {
            type: 'category',
            data: this.data.data.x[0].data
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: this.data.data.y[0].data,
            type: 'bar'
        }]
      }
    }
  },
  components: {
    ECharts
  }
}
</script>
