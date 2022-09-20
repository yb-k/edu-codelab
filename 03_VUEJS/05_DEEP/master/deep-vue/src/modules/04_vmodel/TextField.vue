<template>
  <input
    v-if="type === 'input'"
    v-on="getListeners"
    :value="value"
    @input="handleInput"
  />
  <textarea v-else v-on="getListeners" :value="value" @input="handleInput" />
</template>

<script>
export default {
  name: "text-field",
  props: {
    value: {
      require: true,
      type: String,
    },
    type: {
      require: true,
      type: String,
      default: "input",
    },
  },
  computed: {
    getListeners() {
      /* eslint no-unused-vars: "off" */
      const { input, ...others } = this.$listeners;
      return { ...others };
    },
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e.target.value);
    },
  },
};
</script>
