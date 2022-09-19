<template>
  <div>
    <h1>{{ input1 }}</h1>
    <div>
      <label for="input1">input : </label>
      <input type="text" id="input1" v-model="input1" />
    </div>
    <h1>{{ input2 }}</h1>
    <div>
      <label for="input2">text-field : </label>
      <text-field type="text" id="input2" v-model="input2" />
    </div>
  </div>
</template>

<script>
import TextField from "./TextField.vue";
export default {
  components: {
    TextField,
  },
  data() {
    return {
      input1: "한글한글아름답게",
      input2: "한글한글아름답게",
    };
  },
};
</script>
