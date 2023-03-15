import store from "@/store";
import { mutationNames } from "@/store/mutationTypes";
import { JWTIdentifier, JWTRegex, serverBaseURL } from "@/utils/constants";
import Errors from "@/utils/errors";
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/HomeView.vue";
import Login from "../views/LoginView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    beforeEnter: async (to, from, next) => {
      const jwt = localStorage.getItem(JWTIdentifier);
      if (jwt && JWTRegex.test(jwt)) {
        // Requests jwt breakdown from server and populates information
        const url = `${serverBaseURL}/api/v1/auth/decode-jwt`;

        try {
          const response = await fetch(url, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          });

          if (!response.ok) {
            store.commit(mutationNames.setLoading, false);
            next("/login");
            return alert(Errors.LoginExpired);
          }

          const formattedResponse = await response.json();
          if (formattedResponse.status) {
            if (formattedResponse.data) {
              store.commit(mutationNames.setRole, formattedResponse.data.role);
              store.commit(mutationNames.setID, formattedResponse.data.id);
              store.commit(mutationNames.setLoggedIn, true);
              store.commit(mutationNames.setLoading, false);
              return next();
            }
          }
        } catch (error) {
          console.error(error);
          if (error.status === 500) alert(Errors.InternalServerError);
          store.commit(mutationNames.setLoading, false);
          return next("/login");
        }
      } else {
        store.commit(mutationNames.setLoading, false);
        next("/login");
      }
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    beforeEnter: async (to, from, next) => {
      const jwt = localStorage.getItem(JWTIdentifier);
      if (jwt && JWTRegex.test(jwt)) {
        // Request jwt breakdown from server and populates information
        const url = `${serverBaseURL}/api/v1/auth/decode-jwt`;
        try {
          const response = await fetch(url, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          });

          if (!response.ok) {
            store.commit(mutationNames.setLoading, false);
            return next();
          }

          const formattedResponse = await response.json();
          if (formattedResponse.status) {
            if (formattedResponse.data) {
              store.commit(mutationNames.setRole, formattedResponse.data.role);
              store.commit(mutationNames.setID, formattedResponse.data.id);
              store.commit(mutationNames.setLoggedIn, true);
              store.commit(mutationNames.setLoading, false);
              return next("/");
            }
          }
        } catch (error) {
          console.error(error);
          if (error.status === 500) alert(Errors.InternalServerError);
          store.commit(mutationNames.setLoading, false);
          return next();
        }
      } else {
        next();
        store.commit(mutationNames.setLoading, false);
      }
    },
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ForgotPasswordView.vue"),
  },
  {
    path: "/reset-password/:token?",
    name: "ResetPassword",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ResetPasswordView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    component: () =>
      import(/* webpackChunkName: "404" */ "../views/PageNotFoundView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
