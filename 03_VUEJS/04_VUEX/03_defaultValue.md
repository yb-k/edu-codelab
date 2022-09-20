## 초기값

초기값을 설정하는것은 매우 중요합니다.

```vue
<template>
  <div>
    <div>
      <h3>사용자 정보를 가져옵니다.</h3>
      <button @click="getData()">getData</button>
    </div>
    <div>
      <h3>사용자 정보</h3>
      <div>{{ name }}</div>
      <div>{{ age }}</div>
    </div>
  </div>
</template>
<script>
import lodash from "lodash";
import getAuth from "../testData";
export default {
  data() {
    return {
      name: "1",
      age: 0,
    };
  },
  name: "vuexView",
  methods: {
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
```

서버로 부터 사용자의 이름과 나이를 받는다고 가정했을때, 만약 나이를 입력하지 않은 사용자가 있을때, 기본값을 지정하지 않았다면 오류가 생겼을 것이다.

다음으로 기본값을 세팅해주는 이유는 중복을 최소화 할 수 있다는 점이다.

```vue
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
```

위와같이 컴포넌트를 작성시 기본값을 세팅해주었기 때문에 각각 기본값을 입력하지 않아도 된다.

```vue
<input-component></input-component>
<input-component type="checkbox"></input-component>
<input-component label="label example"></input-component>
```
