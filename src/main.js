import Vue from "vue";
import App from "./App.vue";
var store = require("store");

Vue.config.productionTip = false;

Vue.prototype.$store = store;

new Vue({
  render: h => h(App)
}).$mount("#app");
