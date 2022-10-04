<template>
  <div>
    <button type="button" @click="openAlert">this.$alert('hello-alert')</button>
    <button type="button" @click="openConfirm">
      this.$confirm('hello-confirm')
    </button>
    <button type="button" @click="popup = 'custom'">custom popup show</button>
    <modal-layout v-if="popup === 'custom'" @onClose="popup = ''">
      <div>hello - custom - popup</div>
    </modal-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      popup: "",
    };
  },
  methods: {
    openAlert() {
      this.$alert("hello-alert").then((action) => alert(action));
    },
    openConfirm() {
      this.$confirm("hello-confirm").then((action) => alert(action));
    },
  },
};
</script>
