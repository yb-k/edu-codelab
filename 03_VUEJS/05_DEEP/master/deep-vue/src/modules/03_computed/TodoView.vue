<template>
  <div>
    <div>
      <span>전체 선택</span>
      <input type="checkbox" v-model="allSelected" />
    </div>
    <ul>
      <li v-for="(item, index) in todos" :key="item">
        <input type="checkbox" :value="item" v-model="selectedList" />
        <span>{{ index }} - {{ item }}</span>
      </li>
    </ul>
    <div>
      <span>선택한 TODO : {{ selectedList.join(",") }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todos: ["HTML5", "CSS3", "JAVASCRIPT", "ES6", "VUE", "NODEJS"],
      selectedList: [],
    };
  },
  computed: {
    allSelected: {
      //getter
      get: function () {
        return this.todos.length === this.selectedList.length;
      },
      //setter
      set: function (chekced) {
        this.selectedList = chekced ? [...this.todos] : [];
      },
    },
  },
};
</script>

<style></style>
