# vue-fragment

## 개요

기본적으로 `vue`에서 사용하는 `component`는 단일 루트 엘리먼트로 구성됩니다.

때문에 무의미한 `div` 또는 `span` 태그를 사용하는 경우가 많습니다.

하지만 다중 엘리먼트를 루트로 사용하길 원하는 경우에 대해서 `fragment`라는 태그를 통해 사용할 수 있습니다.

해당 기능은 Vue3.0에서부터는 공식적으로 지원하지만, Vue2.0에서는 라이브러리를 통해 사용이 가능합니다.

만약, Vue3버전을 사용하신다면 해당 라이브러리가 아닌 공식 컴포넌트를 사용하시길 바랍니다.

> 루트 엘리먼트가 아닌 경우 `template`태그를 통해서 여러 엘리먼트를 묶을 수 있습니다.

## 공식 문서

[vue-fragment github](https://github.com/Thunberg087/vue-fragment#readme)

## 설치

```bash
yarn add vue-fragment
```

## 실습

`src/modules/02_fragment/FragmentView.vue`

```vue
<template>
  <fragment>
    <h1>root1</h1>
    <h1>root2</h1>
    <h1>root3</h1>
  </fragment>
</template>

<script>
import { Fragment } from "vue-fragment";
export default {
  components: {
    Fragment,
  },
};
</script>
```

`src/modules/02_fragment/index.js`

```js
import Vue from "vue";
import VueFragment from "vue-fragment";
import router from "@/router";

Vue.use(VueFragment.Plugin);

router.addRoute({
  path: "/fragment",
  name: "fragment",
  component: () =>
    import(/* webpackChunkName: "fragment" */ "./FragmentView.vue"),
});
```
