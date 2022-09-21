# 필터

Vue 는 텍스트 형식화를 적용할 수 있는 필터를 지원합니다.
**중괄호 보간법 혹은 v-bind 표현법**을 이용할 때 사용됩니다.

```html
<!-- 중괄호 보간법 -->
{{ message | capitalize }}

<!-- v-bind 표현 -->
<div v-bind:id="rawId | formatId"></div>
```

컴포넌트 옵션에서 필터를 정의 할 수 있습니다.

```js
filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
```

전역 필터

```js
Vue.filter("capitalize", function (value) {
  if (!value) return "";
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

new Vue({
  // ...
});
```

필터는 체이닝을 할 수 있습니다.

```html
{{ message | filterA | filterB }}
```

위와 같은 경우에, 하나의 인수를 받는 `filterA` 는 `message` 값을 받을 것이고 `filterA` 가 `message` 와 함께 실행된 결과가 `filterB` 에 넘겨질 것입니다.
