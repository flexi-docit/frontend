import Vue from "vue";
import Vuex from "vuex";
import { mutationNames } from "./mutationTypes";

Vue.use(Vuex);

const authenticationModule = {
  state: {
    user: {
      loggedIn: false,
      role: "",
      id: null,
    },
  },
  mutations: {
    [mutationNames.setID](state, id) {
      Vue.set(state.user, "id", id);
    },
    [mutationNames.setRole](state, role) {
      Vue.set(state.user, "role", role);
    },
    [mutationNames.setLoggedIn](state, loggedInStatus) {
      Vue.set(state.user, "loggedIn", loggedInStatus);
    },
    [mutationNames.clearUser](state) {
      Vue.set(state.user, "loggedIn", false);
      Vue.set(state.user, "role", "");
      Vue.set(state.user, "id", null);
    },
  },
};

const store = new Vuex.Store({
  state: {
    loading: false,
  },
  getters: {},
  mutations: {
    [mutationNames.setLoading](state, loadingStatus) {
      Vue.set(state, "loading", loadingStatus);
    },
  },
  modules: { auth: authenticationModule },
});

export default store;
