import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import bootstrap from "bootstrap";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import Notifications from "vue-notification";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(Notifications);

new Vue({
  router,
  store,
  // bootstrap,
  render: h => h(App)
}).$mount("#app");
