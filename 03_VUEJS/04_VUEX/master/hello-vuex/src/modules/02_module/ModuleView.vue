<template>
  <div>
    <div>store.state.A.count : {{ count }}</div>
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

    <hr />
    <div>store.state.B.count : {{ countB }}</div>
    <div>store.getters['B/zeroPadCount'] : {{ zeroPadCountB }}</div>
    <div>
      <button type="button" @click="incrementB">
        store.commit('incrementB')
      </button>
      |
      <button type="button" @click="incrementAsyncB">
        store.dispatch("incrementAsyncB")
      </button>
    </div>
  </div>
</template>

<script>
import store from "./index";

export default {
  computed: {
    count() {
      return store.state.A.count;
    },
    zeroPadCount() {
      return store.getters.zeroPadCount;
    },
    countB() {
      return store.state.B.count;
    },
    zeroPadCountB() {
      return store.getters["B/zeroPadCount"];
    },
  },
  methods: {
    increment() {
      store.commit("increment");
    },
    incrementAsync() {
      store.dispatch("incrementAsync").then((count) => {
        // next step
      });
    },

    incrementB() {
      store.commit("B/increment");
    },
    incrementAsyncB() {
      store.dispatch("B/incrementAsync").then((count) => {
        // next step
      });
    },
  },
};
</script>
