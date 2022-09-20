import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    newCount: 1,
  },
  getters: {
    newCount(state) {
      return 2 * state.newCount;
    },
  },
  mutations: {
    increment() {
      this.state.count++;
    },
    newIncrement() {
      this.state.newCount++;
    },
  },
  actions: {
    incrementAction() {
      setTimeout(() => {
        this.commit("newIncrement");
      }, 300);
    },
  },
});
