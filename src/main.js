import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./assets/reset.css";
import { mutationNames } from "./store/mutationTypes";

Vue.config.productionTip = false;
Vue.component("LoadingSpinner", () =>
  import(
    /* webpackChunkName: "loading-spinner" */ "@/components/Common/LoadingSpinner.vue"
  )
);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

router.beforeEach((to, from, next) => {
  store.commit(mutationNames.setLoading, true);
  next();
});
