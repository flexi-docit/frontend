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
            next("/login");
            localStorage.removeItem(JWTIdentifier);
            return alert(Errors.LoginExpired);
          }

          const formattedResponse = await response.json();
          if (formattedResponse.status) {
            if (formattedResponse.data) {
              store.commit(mutationNames.setRole, formattedResponse.data.role);
              store.commit(mutationNames.setID, formattedResponse.data.id);
              store.commit(mutationNames.setLoggedIn, true);

              return next();
            }
          }
        } catch (error) {
          console.error(error);
          if (error.status === 500) alert(Errors.InternalServerError);

          return next("/login");
        }
      } else {
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

          return next();
        }
      } else {
        next();
      }
    },
  },
  {
    path: "/module/:id",
    name: "module",
    component: () =>
      import(/* webpackChunkName: "module" */ "@/views/SingleModuleView.vue"),
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
            return next();
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

          return next();
        }
      } else {
        next();
      }
    },
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: () =>
      import(
        /* webpackChunkName: "forgot-password" */ "@/views/ForgotPasswordView.vue"
      ),
  },
  {
    path: "/reset-password/:token?",
    name: "ResetPassword",
    component: () =>
      import(
        /* webpackChunkName: "reset-password" */ "@/views/ResetPasswordView.vue"
      ),
  },
  {
    path: "/about",
    name: "AboutPage",
    component: () => import(/* webpackChunkName: "about" */ "../views/AboutPageView.vue"),
  },
  {
    path: "/contact",
    name: "ContactPage",
    component: () => import(/* webpackChunkName: "about" */ "../views/ContactPageView.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    component: () =>
      import(/* webpackChunkName: "404" */ "@/views/PageNotFoundView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
