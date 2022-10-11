<template>
  <div>
    <select v-model="$i18n.locale">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
        {{ lang }}
      </option>
    </select>
    <h1>{{ $t("title") }}</h1>
    <button>{{ $t("submit") }}</button>
    <button>{{ $t("cancel") }}</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      langs: ["ko", "en"],
    };
  },
};
</script>

<style></style>
