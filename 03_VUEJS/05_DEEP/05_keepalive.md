# keep-alive

## 서론

`<keep-alive>`는 컴포넌트를 캐시하는 기능을 제공합니다.

성능 상의 이유로 **상태를 유지** 하거나 **리-렌더링를 원하지 않는 경우** 활용 할 수 있습니다.

아래와 같은 상황에서 유용하게 사용할 수 있습니다.

- 매우 자주 접근하는 화면(컴포넌트)
- 무한 스크롤을 사용하는 컴포넌트
- 입력 정보(상태)를 유지해야하는 컴포넌트

따라서, 기본 컴포넌트와는 다른 생명주기를 가지게 됩니다.

## 생명주기

`activated()`

캐시된 컴포넌트가 활성화 될 때 호출됩니다.

`deactivated()`

캐시된 컴포넌트가 비활성화 될 때 호출됩니다.

## 실습

`src/modules/05_keepalive/LifecycleLogging.vue`

라이프 사이클을 확인할 수 있는 로깅용 컴포넌트 작성

```vue
<template>
  <div>
    <h3>life-cycle log</h3>
    <pre @scroll="onChangeScroll" ref="logs">{{ log }}</pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      log: "",
      scrollTop: 0,
    };
  },
  created() {
    this.logging("created");
  },
  beforeMount() {
    this.logging("beforeMount");
  },
  mounted() {
    this.logging("mounted");
  },
  beforeDestroy() {
    this.logging("beforeDestroy");
  },
  activated() {
    this.logging("activated");
    this.$refs.logs.scrollTop = this.scrollTop;
  },
  deactivated() {
    this.logging("deactivated");
  },
  destroyed() {
    this.logging("destroyed");
  },
  methods: {
    logging(txt) {
      this.log += `FIRE :: ${txt}\n`;
    },
    onChangeScroll(e) {
      this.scrollTop = e.target.scrollTop;
    },
  },
};
</script>

<style scoped>
pre {
  display: inline-block;
  width: 400px;
  height: 100px;
  border: 1px solid #eaeaea;
  overflow-y: scroll;
}
</style>
```

`src/modules/05_keepalive/KeepAliveView.vue`

```vue
<template>
  <div>
    <div>
      <button @click="type = 'basic'">basic</button>
      <button @click="type = 'keep'">keep-alive</button>
    </div>
    <lifecycle-logging v-if="type === 'basic'" />
    <keep-alive>
      <lifecycle-logging v-if="type === 'keep'" />
    </keep-alive>
  </div>
</template>

<script>
import LifecycleLogging from "./LifecycleLogging.vue";

export default {
  components: {
    LifecycleLogging,
  },
  data() {
    return {
      type: "basic",
    };
  },
};
</script>

<style></style>
```

`src/modules/05_keepalive/index.js`

```js
import router from "@/router";

router.addRoute({
  path: "/keepalive",
  name: "keepalive",
  component: () =>
    import(/* webpackChunkName: "keepalive" */ "./KeepAliveView.vue"),
});
```

`src/modules/index.js`

```js
// 추가
import "./05_keepalive";
```

`src/App.vue`

```html
<!-- 추가 -->
<router-link to="/keepalive">keepalive</router-link> |
```
