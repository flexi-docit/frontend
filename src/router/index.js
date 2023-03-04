import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ForgotPassword.vue"),
  },
  {
    path: "/reset-password/:token?",
    name: "ResetPassword",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ResetPassword.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    component: () =>
      import(/* webpackChunkName: "404" */ "../views/PageNotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
