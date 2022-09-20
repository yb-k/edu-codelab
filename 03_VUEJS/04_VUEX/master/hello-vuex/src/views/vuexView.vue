<template>
  <div>
    <h1>vuex example</h1>
    <div>
      about 에서 증가 시킨 값은 store 통해 관리 되므로 유지 됩니다.
      {{ $store.state.count }}
    </div>
    <div>
      <h3>사용자 정보를 가져옵니다.</h3>
      <button @click="getData()">getData</button>
    </div>
    <div>
      <h3>사용자 정보</h3>
      <div>{{ name }}</div>
      <div>{{ age }}</div>
    </div>
    <input-component></input-component>
    <input-component type="checkbox"></input-component>
    <input-component label="label example"></input-component>
    <h3>MapHelper</h3>
    <b>newCount : {{ newCountRename }}</b>
    <br />
    <b>newCount * 2 with getter : {{ newCount }}</b>
    <button @click="newIncrement()" value="newCount">mutations</button>
    <button @click="incrementAction()" value="newCount">action</button>
    <br />
  </div>
</template>
<script>
import lodash from "lodash";
import getAuth from "../testData";
import inputComponent from "../components/InputComponent.vue";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  components: { inputComponent },
  data() {
    return {
      name: "1",
      age: 0,
    };
  },
  computed: {
    ...mapState({ newCountRename: "newCount" }),
    ...mapGetters({ newCount: "newCount" }),
  },
  name: "vuexView",
  methods: {
    ...mapMutations({ newIncrement: "newIncrement" }),
    ...mapActions(["incrementAction"]),
    INIT_DEFAULT_AUTH: function () {
      return {
        name: "",
        age: "나이가 입력되지 않은 사용자 입니다.",
      };
    },
    getData: function () {
      getAuth().then((auth) => {
        const result = lodash.merge(this.INIT_DEFAULT_AUTH(), auth);
        this.name = result.name;
        this.age = result.age;
      });
    },
  },
};
</script>
