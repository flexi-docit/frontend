import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./assets/reset.css";
import { mutationNames } from "./store/mutationTypes";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faEdit } from "@fortawesome/free-solid-svg-icons";

library.add(faUser);
library.add(faEdit);

Vue.config.productionTip = false;
Vue.component("LoadingSpinner", () =>
  import(
    /* webpackChunkName: "loading-spinner" */ "@/components/Common/LoadingSpinner.vue"
  )
);

Vue.component("FontAwesomeIcon", FontAwesomeIcon);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

router.beforeEach((to, from, next) => {
  store.commit(mutationNames.setLoading, true);
  next();
});

router.afterEach(() => {
  store.commit(mutationNames.setLoading, false);
});
