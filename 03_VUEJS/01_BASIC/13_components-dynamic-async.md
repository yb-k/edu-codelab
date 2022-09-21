# 동적 & 비동기 컴포넌트

### `keep-alive` 동적 컴포넌트

`<keep-alive>` 를 사용하면 인터인스턴스가 처음 생성될 때 캐시됩니다.

```html
<!-- Inactive components will be cached! -->
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
```

### 비동기 컴포넌트

커다란 애플리케이션의 경우, 앱을 작은 조각들로 나누어 두고 필요한 경우에만 서버로부터 로드합니다. 이런 작업을 쉽게 할 수 있도록 Vue 는 팩토리 함수를 이용해 컴포넌트를 비동기적으로 정의하는 할 수 있습니다.

```js
Vue.component("async-example", function (resolve, reject) {
  setTimeout(function () {
    // 컴포넌트 정의를 resolve 콜백을 통해 전달
    resolve({
      template: "<div>I am async!</div>",
    });
  }, 1000);
});
```

위의 예에서 보다시피 팩토리 함수는 resolve 콜백을 받습니다. 콜백은 서버에 컴포넌트의 정의를 요청했을 때 호출됩니다. 물론 reject(reason) 을 호출하여 로딩이 실패한 경우에 대응할 수도 있습니다. setTimeout은 예제일 뿐이며, 컴포넌트를 어떻게 받아올지는 원하는 방식을 선택하면 됩니다.

```js
Vue.component("async-webpack-example", function (resolve) {
  // 아래의 특별한 'require' 문법은
  // 웹팩이 Ajax를 통해 로드한 번들들을 이용해
  // 코드를 자동으로 분할하도록 합니다.
  require(["./my-async-component"], resolve);
});
```

팩토리 함수 안에서 Promise를 반환할 수도 있습니다.

```js
Vue.component(
  "async-webpack-example",
  // `import` 함수는 Promise를 반환합니다.
  () => import("./my-async-component")
);
```

`Promise`를 반환하는 함수를 직접 작성할 수 있습니다.

```js
new Vue({
  // ...
  components: {
    "my-component": () => import("./my-async-component"),
  },
});
```

### Handling Loading State

> 2.3.0+

비동기 컴포넌트 팩토리는 아래와 같은 포맷으로 오브젝트를 반환할 수도 있습니다:

```js
const AsyncComponent = () => ({
  // 로드 할 컴포넌트(Promise여야 합니다.)
  component: import("./MyComponent.vue"),
  // 비동기 컴포넌트가 로딩중일 때 사용할 컴포넌트
  loading: LoadingComponent,
  // 비동기 컴포넌트 로딩이 실패했을 때 사용할 컴포넌트
  error: ErrorComponent,
  // 로딩 컴포넌트를 보여주기 전의 지연시간. (기본값: 200ms)
  delay: 200,
  // 초과되었을 때 에러 컴포넌트를 표시할 타임아웃. (기본값: 무한대)
  timeout: 3000,
});
```
