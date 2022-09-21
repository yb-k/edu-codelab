# 믹스인

Mixins는 Vue 컴포넌트에 재사용 가능한 기능을 배포하는 유연한 방법입니다. mixin 객체는 모든 구성 요소 옵션을 포함할 수 있습니다. 컴포넌트에 mixin을 사용하면 해당 mixin의 모든 옵션이 컴포넌트의 고유 옵션에 “혼합”됩니다.

```js
// mixin 객체 생성
var myMixin = {
  created: function () {
    this.hello();
  },
  methods: {
    hello: function () {
      console.log("hello from mixin!");
    },
  },
};

// mixin을 사용할 컴포넌트 정의
var Component = Vue.extend({
  mixins: [myMixin],
});

var component = new Component(); // => "hello from mixin!"
```

### 옵션 병합

mixin 과 컴포넌트 자체에 중첩 옵션이 있는 경우 병합됩니다.
data 의 내용이 겹친다면 **컴포넌트에 선언된 data 오브젝트가 우선**이 되어 병합됩니다.

```js
var mixin = {
  data: function () {
    return {
      message: "hello",
      foo: "abc",
    };
  },
};

new Vue({
  mixins: [mixin],
  data: function () {
    return {
      message: "goodbye",
      bar: "def",
    };
  },
  created: function () {
    console.log(this.$data);
    // => { message: "goodbye", foo: "abc", bar: "def" }
  },
});
```

같은 이름의 훅 함수가 배열에 병합되어 모든 함수가 호출됩니다.
mixin 훅이 먼저 호출됩니다.

```js
var mixin = {
  created: function () {
    console.log("mixin hook called");
  },
};

new Vue({
  mixins: [mixin],
  created: function () {
    console.log("component hook called");
  },
});

// => "mixin hook called"
// => "component hook called"
```

### 전역 Mixin

mixin은 전역으로 적용할 수 있습니다. 주의하세요! mixin을 전역으로 적용하면 이후에 생성된 모든 Vue 인스턴스 에 영향을 미칩니다. 적절히 사용하면 사용자 정의 옵션에 대한 처리 로직을 주입하는 데 사용할 수 있습니다.

```js
// `myOption` 사용자 정의 옵션을 위한 핸들러 주입
Vue.mixin({
  created: function () {
    var myOption = this.$options.myOption;
    if (myOption) {
      console.log(myOption);
    }
  },
});

new Vue({
  myOption: "hello!",
});
// => "hello!"
```

> 글로벌 mixin은 써드파티 컴포넌트를 포함하여 생성된 모든 단일 Vue 인스턴스에 영향을 주기 때문에 적게 이용하고 신중하게 사용하십시오. 대부분의 경우 위 예제에서와 같이 사용자 지정 옵션 처리에만 사용해야합니다. 중복 적용을 피하기 위해 `Plugins`로 제공하는 것도 좋은 생각입니다.

### 사용자 정의 옵션 병합 전략

사용자 지정 옵션을 병합할 때 기본 옵션을 사용하면 기존 값을 덮어 쓰기 때문에, 커스텀 로직을 사용해 커스텀 옵션을 병합하려면 `Vue.config.optionMergeStrategies` 사용

```js
Vue.config.optionMergeStrategies.myOption = function (toVal, fromVal) {
  // return 병합된 값
};
```
