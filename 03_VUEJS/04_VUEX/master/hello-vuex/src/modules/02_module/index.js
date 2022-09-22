import Vuex from "vuex";
import { module } from "../01_core";

const INIT_STATE = () => ({
  count: 0,
});

export default new Vuex.Store({
  modules: {
    A: {
      namespaced: false,
      ...module,
      state: INIT_STATE(),
    },
    B: {
      namespaced: true,
      ...module,
      state: INIT_STATE(),
    },
  },
});
