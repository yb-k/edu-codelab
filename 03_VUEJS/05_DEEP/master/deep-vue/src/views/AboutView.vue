<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
import { eventBus } from "@/modules";
export default {
  /**
   * event bus
   */
  mounted() {
    eventBus.$emit("setTitle", "About");
  },
};
</script>
