<template>
  <div>
    <h3>life-cycle log</h3>
    <pre @scroll="onChangeScroll" ref="logs">{{ log }}</pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      log: "",
      scrollTop: 0,
    };
  },
  created() {
    this.logging("created");
  },
  beforeMount() {
    this.logging("beforeMount");
  },
  mounted() {
    this.logging("mounted");
  },
  beforeDestroy() {
    this.logging("beforeDestroy");
  },
  activated() {
    this.logging("activated");
    this.$refs.logs.scrollTop = this.scrollTop;
  },
  deactivated() {
    this.logging("deactivated");
  },
  destroyed() {
    this.logging("destroyed");
  },
  methods: {
    logging(txt) {
      this.log += `FIRE :: ${txt}\n`;
    },
    onChangeScroll(e) {
      this.scrollTop = e.target.scrollTop;
    },
  },
};
</script>

<style scoped>
pre {
  display: inline-block;
  width: 400px;
  height: 100px;
  border: 1px solid #eaeaea;
  overflow-y: scroll;
}
</style>
