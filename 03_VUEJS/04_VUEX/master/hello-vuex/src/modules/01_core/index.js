import Vuex from "vuex";

export const module = {
  state: {
    // 상태
    count: 0,
  },
  mutations: {
    // 동기적 처리
    increment(state, payload) {
      state.count++;
    },
  },
  actions: {
    // 비동기적 처리
    incrementAsync(context, payload) {
      return new Promise((resolve) => {
        setTimeout(() => {
          context.commit("increment");
          resolve(context.state.count);
        }, 1000);
      });
    },
  },
  getters: {
    // state를 필요에 따라 가공하기 위한 getter
    zeroPadCount(state) {
      return state.count < 10 ? `0${state.count}` : `${state.count}`;
    },
  },
};

export default new Vuex.Store(module);
