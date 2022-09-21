# 이벤트 핸들링

## Event Listener

`v-on` 디렉티브를 사용하여 DOM 이벤트를 듣고 트리거 될 때 JavaScript를 실행할 수 있습니다.

```html
<div id="example-1">
  <button v-on:click="counter += 1">Add 1</button>
  <p>위 버튼을 클릭한 횟수는 {{ counter }} 번 입니다.</p>
</div>
```

```js
var example1 = new Vue({
  el: "#example-1",
  data: {
    counter: 0,
  },
});
```

### 메소드 이벤트 핸들러

`v-on` 을 통해 더욱 복잡한 이벤트를 처리 하기 위해 method 를 사용할 수 있습니다.

```html
<div id="example-2">
  <!-- `greet`는 메소드 이름으로 아래에 정의되어 있습니다 -->
  <button v-on:click="greet">Greet</button>
</div>
```

```js
var example2 = new Vue({
  el: "#example-2",
  data: {
    name: "Vue.js",
  },
  // 메소드는 `methods` 객체 안에 정의합니다
  methods: {
    greet: function (event) {
      // 메소드 안에서 사용하는 `this` 는 Vue 인스턴스를 가리킵니다
      alert("Hello " + this.name + "!");
      // `event` 는 네이티브 DOM 이벤트입니다
      if (event) {
        alert(event.target.tagName);
      }
    },
  },
});

// 또한 JavaScript를 이용해서 메소드를 호출할 수 있습니다.
example2.greet(); // => 'Hello Vue.js!'
```

### 인라인 메소드 핸들러

메소드 이름을 직접 바인딩 하는 대신 인라인 JavaScript 구문에 메소드를 사용할 수도 있습니다.

```html
<div id="example-3">
  <button v-on:click="say('hi')">Say hi</button>
  <button v-on:click="say('what')">Say what</button>
</div>
```

```js
new Vue({
  el: "#example-3",
  methods: {
    say: function (message) {
      alert(message);
    },
  },
});
```

때로 인라인 명령문 핸들러에서 원본 DOM 이벤트에 액세스 해야할 수도 있습니다. 특별한 `$event` 변수를 사용해 메소드에 전달할 수도 있습니다.

```html
<button v-on:click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>
```

```js
// ...
methods: {
  warn: function (message, event) {
    // 이제 네이티브 이벤트에 액세스 할 수 있습니다
    if (event) event.preventDefault()
    alert(message)
  }
}
```

### 이벤트 수식어

이벤트 핸들러 내에서 `event.stopPropagation()` 이나 `event.preventDefault()` 같은 것을 호출하는 것은 매우 흔하기 때문에 vue 에서는 이벤트 수식어를 제공합니다.

- `.stop` // 전파 중단.
- `.prevent` // 다른 이벤트 차단.
- `.capture` // 내부 엘리먼트를 대상으로 하는 이벤트가 해당 엘리먼트에서 처리되기 전에 여기서 처리
- `.self` // event.target 이 엘리먼트 자체인 경우에만.
- `.once`// 한번만
- `.passive` // 취소 불가 이벤트

```html
<!-- 클릭 이벤트 전파가 중단됩니다 -->
<a v-on:click.stop="doThis">doThis</a>

<!-- 제출 이벤트가 페이지를 다시 로드 하지 않습니다 -->
<form v-on:submit.prevent="onSubmit">onSUbmit</form>

<!-- 수식어는 체이닝 가능합니다 -->
<a v-on:click.stop.prevent="doThat">doThat</a>

<!-- 단순히 수식어만 사용할 수 있습니다 -->
<form v-on:submit.prevent></form>

<!-- 이벤트 리스너를 추가할 때 캡처모드를 사용합니다 -->
<!-- 즉, 내부 엘리먼트를 대상으로 하는 이벤트가 해당 엘리먼트에서 처리되기 전에 여기서 처리합니다. -->
<div v-on:click.capture="doThis">...</div>

<!-- event.target이 엘리먼트 자체인 경우에만 트리거를 처리합니다 -->
<!-- 자식 엘리먼트에서는 안됩니다 -->
<div v-on:click.self="doThat">...</div>
```

> 이벤트 수식어는 순서에 큰영향을 받기 때문에 `v-on:click.prevent.self`(모든 클릭을 막음.) 와 `v-on:click.self.prevent` (엘리먼트 자체에 대한 클릭만 방지)는 전혀 다른 동작을 수행합니다.

### 키 수식어

키보드 이벤트를 청취할 때, 종종 공통 키 코드를 확인해야 합니다. Vue는 키 이벤트를 수신할 때 v-on에 대한 키 수식어를 추가할 수 있습니다.

```html
<!-- only call `vm.submit()` when the `key` is `Enter` -->
<input v-on:keyup.enter="submit" />
```

`KeyboardEvent.key`를 통해 노출된 유효 키 이름을 **케밥 케이스**로 변환하여 수식어로 사용할 수 있습니다.

```html
<!-- $event.key === 'PageDown' -->
<input v-on:keyup.page-down="onPageDown" />
```

- `.enter` // enter
- `.tab` // tab
- `.delete` // Delete, Backspace
- `.esc` //esc
- `.space` // space
- `.up`, `.down`, `.left`, `.right` // direction key

> 일부 키는 IE9 버전에서 서로 다른 키코드를 가지고있기 떄문에 확인 필요!!

```js
// `v-on:keyup.f1`을 사용할 수 있습니다.
Vue.config.keyCodes.f1 = 112;
```

### 시스템 수식어 키 목록

- `.ctrl`
- `.alt`
- `.shift`
- `.meta` // Mac 운영체제의 command

```html
<!-- Alt + C -->
<input @keyup.alt.67="clear" />

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>
```

### `.exact` 수식어

> 2.5.0+

`.exact` : 정확한 조합의 경우에만 동작합니다.

```html
<!-- Alt 또는 Shift와 함께 눌린 경우에도 실행됩니다. -->
<button @click.ctrl="onClick">A</button>

<!-- Ctrl 키만 눌려있을 때만 실행됩니다. -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- 아래 코드는 시스템 키가 눌리지 않은 상태인 경우에만 작동합니다. -->
<button @click.exact="onClick">A</button>
```

#### 마우스 버튼 수식어

- `.left`
- `.right`
- `.middle`
