<template>
  <div>
    <label :for="id">{{ label }}</label>
    <div>
      <input ref="input" :type="type" :id="id" :name="name" />
    </div>
  </div>
</template>
<script>
export default {
  name: "input-component",
  props: {
    label: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    name: {
      type: String,
      default: "name1",
    },
  },
};
</script>
