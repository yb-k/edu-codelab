<template>
  <div>
    <div>
      <h1 v-if="toggleLogger" v-logging="toggleLogger ? 'TRUE' : 'FALSE'">
        {{ logger }}
      </h1>
      <input type="text" v-model="logger" />
      <button type="button" @click="toggleLogger = !toggleLogger">
        TOGGLE_LOGGER
      </button>
    </div>
    <div>
      <h1 v-upper="upper"></h1>
      <input type="text" v-model="upper" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toggleLogger: true,
      logger: "LOGGING",
      upper: "uppercase",
    };
  },
};
</script>

<style></style>
