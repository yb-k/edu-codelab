<template>
  <div class="custom-modal-container">
    <div class="modal">
      <div class="modal-content">
        <span class="modal-close" @click="$emit('onClose')">&times;</span>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "custom-popup",
};
</script>

<style></style>
