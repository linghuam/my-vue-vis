import Vue from "vue";
import App from "./App.vue";
var store = require("store");
import TWEEN from "@tweenjs/tween.js"

Vue.config.productionTip = false;

Vue.prototype.$store = store;

animate()

function animate() {
	requestAnimationFrame(animate)
	TWEEN.update()
}

new Vue({
  render: h => h(App)
}).$mount("#app");
