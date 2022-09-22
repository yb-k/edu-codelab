<template>
  <div>
    <div>count : {{ count }}</div>
    <div>zeroPadCount : {{ zeroPadCount }}</div>
    <div>
      <button type="button" @click="increment">increment</button>
      |
      <button type="button" @click="incrementAsync">incrementAsync</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      count: (state) => state.A.count,
    }),
    ...mapGetters(["zeroPadCount"]),
  },
  methods: {
    ...mapMutations({
      increment: "increment",
    }),
    ...mapActions(["incrementAsync"]),
  },
};
</script>
