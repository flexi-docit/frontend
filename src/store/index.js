import Vue from "vue";
import Vuex from "vuex";

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
    setID(state, id) {
      state.id = id;
    },
    setRole(state, role) {
      state.role = role;
    },
    setLoggedIn(state, loggedInStatus) {
      state.loggedIn = loggedInStatus;
    },
  },
};

const store = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  modules: { auth: authenticationModule },
});

export default store;
