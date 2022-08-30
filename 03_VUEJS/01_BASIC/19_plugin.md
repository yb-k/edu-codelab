# 플러그인

## 플러그인 사용하기

`Vue.use()` 글로벌 메소드를 호출하여 플러그인을 사용가능

```js
// `MyPlugin.install(Vue)` 호출
Vue.use(MyPlugin);

new Vue({
  //... options
});
```

옵션 전달

```js
Vue.use(MyPlugin, { someOption: true });
```

`Vue.use`는 자동으로 같은 플러그인을 두 번 이상 사용하지 못하기 때문에 같은 플러그인에서 여러 번 호출하면 플러그인이 한 번만 설치됩니다.

`vue-router`와 같은 Vue.js 공식 플러그인이 제공하는 일부 플러그인은 `Vue` 가 전역 변수로 사용 가능한 경우 자동으로 `Vue.use()` 를 호출합니다. 그러나 CommonJS와 같은 모듈 환경에서는 항상 `Vue.use()` 를 명시 적으로 호출해야합니다 :

```js
// Browserify 또는 Webpack을 통해 CommonJS를 사용할 때
var Vue = require("vue");
var VueRouter = require("vue-router");

// 잊지 마세요
Vue.use(VueRouter);
```

## 플러그인 작성하기

Vue.js 플러그인은 `install` 메소드를 노출해야합니다. 이 메소드는 첫 번째 인자로 `Vue` 생성자와 함께 가능한 옵션과 함께 호출 될 것입니다.

```js
MyPlugin.install = function (Vue, options) {
  // 1. 전역 메소드 또는 속성 추가
  Vue.myGlobalMethod = function () {
    // 필요한 로직 ...
  }

  // 2. 전역 에셋 추가
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 필요한 로직 ...
    }
    ...
  })

  // 3. 컴포넌트 옵션 주입
  Vue.mixin({
    created: function () {
      // 필요한 로직 ...
    }
    ...
  })

  // 4. 인스턴스 메소드 추가
  Vue.prototype.$myMethod = function (methodOptions) {
    // 필요한 로직 ...
  }
}
```
