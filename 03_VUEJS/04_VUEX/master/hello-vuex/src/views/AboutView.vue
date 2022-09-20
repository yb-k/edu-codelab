<template>
  <div class="about">
    <h1>This is an about page</h1>
    <span>{{ $store.state.count }}</span>
    <br />
    <button @click="increment()">increment</button>
  </div>
</template>
<script>
export default {
  name: "AboutView",
  methods: {
    increment: function () {
      this.$store.commit("increment");
    },
  },
};
</script>
