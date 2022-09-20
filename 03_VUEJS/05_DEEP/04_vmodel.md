# vmodel 한국어 버그 수정

## 서론

`IME`가 필요한 언어 (중국어, 일어, 한국어 등)의 경우 `v-model`이 업데이트 되지 않습니다.

이러한 경우 , `v-model` 대신 `@input` 이벤트를 사용하도록 가이드하고 있습니다.

> [해당 공식 가이드 문서 링크](https://v2.vuejs.org/v2/guide/forms.html#Basic-Usage)

때문에, `textarea` 또는 `input type="text"` 두가지 엘리먼트는 영향을 받을 수 있습니다.

이를 `TextField`라는 컴포넌트로 `v-model`을 사용할 수 있도록 작성해 봅니다.

## 실습

`src/modules/04_vmodel/TextField.vue`

```vue
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
```

`src/modules/04_vmodel/VModelView.vue`

```vue
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
```

`src/modules/04_vmodel/index.js`

```js
import router from "@/router";

router.addRoute({
  path: "/vmodel",
  name: "vmodel",
  component: () => import(/* webpackChunkName: "vmodel" */ "./VModelView.vue"),
});
```

`src/modules/index.js`

```js
// 추가
import "./04_vmodel";
```

`src/App.vue`

```html
<!-- 추가 -->
<router-link to="/vmodel">VModel</router-link> |
```
