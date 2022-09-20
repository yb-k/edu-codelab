<template>
  <div>
    <div>
      <button @click="type = 'basic'">basic</button>
      <button @click="type = 'keep'">keep-alive</button>
    </div>
    <lifecycle-logging v-if="type === 'basic'" />
    <keep-alive>
      <lifecycle-logging v-if="type === 'keep'" />
    </keep-alive>
  </div>
</template>

<script>
import LifecycleLogging from "./LifecycleLogging.vue";

export default {
  components: {
    LifecycleLogging,
  },
  data() {
    return {
      type: "basic",
    };
  },
};
</script>

<style></style>
