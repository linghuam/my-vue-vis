<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" /> -->

    <!-- <time-line
      startTime="2000"
      endTime="2020"
      initTime="2008"
      accuracy="year"
    ></time-line> -->

    <!-- <div class="comp-line">
      <code-mirror id="barChartCode" @change="barData=$event" class="comp-col comp-code"></code-mirror>
      <bar-chart :data="barData" class="comp-col comp-chart"></bar-chart>
    </div> -->

    <!-- <div class="comp-line">
      <code-mirror id="barChartCode2" @change="barData2=$event" class="comp-col comp-code"></code-mirror>
      <bar-chart :data="barData2" class="comp-col comp-chart"></bar-chart>
    </div> -->
    <!-- <pie-chart></pie-chart>
    <line-chart></line-chart> -->

    <b-s-panel style="border: 1px solid blue;" :backgroundImage="screenBg" :hasGrid="false"></b-s-panel>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
// import TimeLine from "@/components/TimeLine";
import BarChart from '@/components/BarChart'
import PieChart from '@/components/PieChart'
import LineChart from '@/components/LineChart'
import CodeMirror from '@/components/CodeMirror'
import BSPanel from '@/components/BSPanel'

export default {
  name: "App",
  data() {
    return {
      barData: null,
      barData2: null,
      screenBg: require('./compressed_images/screen-bg.webp')
    }
  },
  components: {
    // HelloWorld
    // TimeLine
    BarChart,
    PieChart,
    LineChart,
    CodeMirror,
    BSPanel
  }
};
</script>

<style lang="scss">
#app {
  height: 750px;
  .comp-line {
    position: relative;
    height: 500px;
    display: flex;
    margin-bottom: 10px;
    .comp-col {
      width: 50%;
      height: 100%;
      overflow: hidden;
    }
  }
}
</style>
