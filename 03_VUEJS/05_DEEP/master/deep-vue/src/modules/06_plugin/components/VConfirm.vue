<template>
  <div class="custom-modal-container">
    <div class="modal">
      <div class="modal-content">
        <span class="modal-close" @click="onAction('close')">&times;</span>
        <p>{{ content }}</p>
        <div><button type="button" @click="onAction('submit')">OK</button></div>
        <div>
          <button type="button" @click="onAction('cancel')">CANCEL</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: "",
    };
  },
};
</script>
