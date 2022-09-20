## MapHelper

MapHelper 에는 `mapState`, `mapGetters`, `mapMutations`, `mapActions` 4가지로 각각 vuex 의 `state`, `getters`, `mutations`, `actions` 를 연결해주는 함수이다.

```vue
/* someComponent.vue */
<template>
  <div class="hello">
    <b>count : {{ $store.state.count }}</b
    ><br />
    <input type="button" @click="increment()" value="increment" />
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {};
  },
  created: function () {},
  methods: {
    increment: function () {
      this.$store.commit("increment");
    },
  },
};
</script>
```

지금까지는 위와같이 `<b>count : {{$store.state.count}}</b>` 처럼 store 상태값을 가져오고 `this.$store.commit("increment");` 을 통해 store상태를 업데이트 했지만 앞으로는 helper 를 사용해 더욱 깔끔하게 작성할 수 있다.

### 헬퍼 사용하기

위의 코드를 helper 를 사용하면 다음과 같이 바꿀 수 있다.

```vue
/* someComponent.vue */
<template>
  <div class="hello">
    <b>count : {{ count }}</b
    ><br />
    <input type="button" @click="increment()" value="increment" />
  </div>
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex'
export default {
  name: "HelloWorld",
  computed: {
    ...mapState(['count']),
    ...mapGetters({ count: 'count'}),
  }
  methods: {
    ...mapMutations({increment:'increment'})
  },
};
</script>
```
