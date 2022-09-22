<template>
  <div>
    <div>store.state.count : {{ count }}</div>
    <div>store.getters.zeroPadCount : {{ zeroPadCount }}</div>
    <div>
      <button type="button" @click="increment">
        store.commit('increment')
      </button>
      |
      <button type="button" @click="incrementAsync">
        store.dispatch("incrementAsync")
      </button>
    </div>
  </div>
</template>

<script>
import store from "./index";
export default {
  computed: {
    // computed를 통해 state / getter에 대한 상태를 추가할 수 있다.
    count() {
      return store.state.count;
    },
    zeroPadCount() {
      return store.getters.zeroPadCount;
    },
  },
  methods: {
    increment() {
      // mutation은 store.commit을 통해 호출 할 수 있다.
      store.commit("increment");
    },
    incrementAsync() {
      // action은 store.dispatch을 통해 호출 할 수 있다.
      store.dispatch("incrementAsync").then((count) => {
        // next step
      });
    },
  },
};
</script>
