# 사용자 지정 디렉티브

Vue 에서 기본 디렉티브 세트(`v-model`과 `v-show`) 외에도 사용자 정의 디렉티브를 등록할 수 있음.

다음은 페이지가 로드 되었을때 해당 엘리먼트에 포커스를 주는 예제입니다. (`autofocus` 는 모바일 사파리에서 작동하지 않습니다.)

```js
// 전역 사용자 정의 디렉티브 v-focus 등록
Vue.directive("focus", {
  // 바인딩 된 엘리먼트가 DOM에 삽입되었을 때...
  inserted: function (el) {
    // 엘리먼트에 포커스를 줍니다
    el.focus();
  },
});
```

지시어를 로컬로 등록하기 위해서 컴포넌트에 `directives` 옵션을 사용합니다.

```js
directives: {
  focus: {
    // 디렉티브 정의
    inserted: function (el) {
      el.focus()
    }
  }
}
```

이제 사용자 지정 디렉티브를 사용할 수 있습니다.

```html
<input v-focus />
```

### 훅 함수

디렉티브 정의 객체는 여러가지 훅 함수를 만들 수 있습니다.

- `bind` : 디렉티브가 처음 엘리먼트에 바인딩 될때 한번만 호출 됩니다.
- `inserted` : 바인딩 된 엘리먼트가 부모 노드에 삽입 되었을때 호출 됩니다.
- `update` : 포함하는 컴포넌트가 업데이트 된 후 호출됩니다. **자식이 업데이트되기 전일 수 있습니다.**
- `componentUpdated` : 포함하고 있는 컴포넌트와 **그 자식들이** 업데이트 된 후에 호출됩니다.
- upbind` : 디렉티브가 엘리먼트로부터 언바인딩된 경우에만 호출됩니다.

### 디렉티브 훅 전달인자

디렉티브 훅은 다음을 전달인자로 사용할 수 있습니다.

- `el`: 디렉티브가 바인딩된 엘리먼트. 이 것을 사용하면 DOM 조작을 할 수 있습니다.
- `binding`: 아래의 속성을 가진 객체입니다.
  - `name`: 디렉티브 이름, `v-` 프리픽스가 없습니다.
  - `value`: 디렉티브에서 전달받은 값. 예를 들어 `v-my-directive="1 + 1"`인 경우 `value는` 2 입니다.
  - `oldValue`: 이전 값. `update와` `componentUpdated에서만` 사용할 수 있습니다. 이를 통해 값이 변경되었는지 확인할 수 있습니다.
  - `expression`: 표현식 문자열. 예를 들어` v-my-directive="1 + 1"`이면, 표현식은 `"1 + 1"` 입니다.
  - `arg`: 디렉티브의 전달인자, 있는 경우에만 존재합니다. 예를 들어 - `v-my-directive`:`foo` 이면 `"foo"` 입니다.
  - `modifiers`: 포함된 수식어 객체, 있는 경우에만 존재합니다. 예를 들어 `v-my-directive.foo.bar`이면, 수식어 객체는 `{ foo: true, bar: true }`입니다.
- `vnode`: `Vue` 컴파일러가 만든 버추얼 노드. VNode API에 전체 설명이 있습니다.
- `oldVnode`: 이전의 버추얼 노드. `update와` `componentUpdated에서만` 사용할 수 있습니다.

### 다이나믹 디렉티브 전달인자

`v-mydirective:[argument]="value"` 와같이 커스텀 디렉티브에 전달인자도 사용할 수 있습니다.

```html
<div id="baseexample">
  <p>Scroll down the page</p>
  <p v-pin="200">Stick me 200px from the top of the page</p>
</div>
```

```js
Vue.directive("pin", {
  bind: function (el, binding, vnode) {
    el.style.position = "fixed";
    el.style.top = binding.value + "px";
  },
});

new Vue({
  el: "#baseexample",
});
```

위의 예제를 다이나믹 디렉티브를 이용할 수 있다.

```html
<div id="dynamicexample">
  <h3>Scroll down inside this section ↓</h3>
  <p v-pin:[direction]="200">I am pinned onto the page at 200px to the left.</p>
</div>
```

```js
Vue.directive("pin", {
  bind: function (el, binding, vnode) {
    el.style.position = "fixed";
    var s = binding.arg == "left" ? "left" : "top";
    el.style[s] = binding.value + "px";
  },
});

new Vue({
  el: "#dynamicexample",
  data: function () {
    return {
      direction: "left",
    };
  },
});
```

### 객체 리터럴

디렉티브에 여러 값이 필요한 경우, JavaScript 객체 리터럴을 전달 가능

```html
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```

```js
Vue.directive("demo", function (el, binding) {
  console.log(binding.value.color); // => "white"
  console.log(binding.value.text); // => "hello!"
});
```
