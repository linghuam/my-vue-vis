<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <time-line
      startTime="2000"
      endTime="2020"
      initTime="2008"
      accuracy="year"
    ></time-line>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import TimeLine from "@/components/TimeLine";

export default {
  name: "App",
  components: {
    // HelloWorld
    TimeLine
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
