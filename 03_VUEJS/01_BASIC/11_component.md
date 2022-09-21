# 컴포넌트

뷰에서 가장 중요한 기능. 기본 HTML 엘리먼트를 확장하여 **재사용 가능한 코드**를 캡슐화 한다.

### 전역 컴포넌트

`Vue.component(tagName, options)` 를 사용해서 전역 컴포넌트 등록할 수 있습니다.

```js
Vue.component("my-component", {
  // 옵션
});
```

> Vue 의 사용자 지정 테그는 케밥케이스를 꼭 사용해야하는것은 아니지만, 사용하는것이 더 좋습니다.

컴포넌트를 등록하면 템플릿에서 커스텀 엘리먼트로 사용 가능합니다.
또한, Vue 인스턴스를 인스턴스화 하기 전에 컴포넌트를 등록해야 사용 가능합니다.

```Html
<div id="example">
  <my-component></my-component>
</div>
```

```js
// 등록
Vue.component("my-component", {
  template: "<div>사용자 정의 컴포넌트 입니다!</div>",
});

// 루트 인스턴스 생성
new Vue({
  el: "#example",
});
```

### 지역 등록

모든 컴포넌트를 전역 등록 할 필요가 없기 때문에, 컴포넌트를 인스턴스 옵션으로 등록하여 다른인스턴스/컴포넌트의 범위에서만 사용할 수 있는 지역컴포넌트를 만들 수 있습니다.

```js
var Child = {
  template: "<div>사용자 정의 컴포넌트 입니다!</div>",
};

new Vue({
  // ...
  components: {
    // <my-component> 는 상위 템플릿에서만 사용할 수 있습니다.
    "my-component": Child,
  },
});
```

### DOM 템플릿 구문 분석 경고

`<ul>`,`<ol>`,`<table>` 등과 같이 하위에 테그들이 정해져 있는 문법에서 다음과 같이 사용자 엘리먼트를 추가할 수 없다.

```html
<table>
  <!-- 렌더링 에러  -->
  <my-row>...</my-row>
</table>
```

위의 경우 `my-row`가 잘못된 컨텐츠가 되어, 렌더링시에 에러를 발생 시킨다.

#### `is` 특수 속성

```html
<table>
  <tr is="my-row"></tr>
</table>
```

### data 함수 형태로 작성 할 것.

data 를 함수로 작성하지않았을 경우 다음과 같은 문제가 발생할 수 있다.

```html
Vue.component('my-component', { template: '<span>{{ message }}</span>', data: {
message: 'hello' } })
```

위와 같은 컴포넌트를 여러개 삽입하려고할때

```html
<div id="example-2">
  <simple-counter></simple-counter>
  <simple-counter></simple-counter>
  <simple-counter></simple-counter>
</div>
```

```js
var data = { counter: 0 };

Vue.component("simple-counter", {
  template: '<button v-on:click="counter += 1">{{ counter }}</button>',
  // 데이터는 기술적으로 함수이므로 Vue는 따지지 않지만
  // 각 컴포넌트 인스턴스에 대해 같은 객체 참조를 반환합니다.
  data: function () {
    return data;
  },
});

new Vue({
  el: "#example-2",
});
```

서로 같은 data 를 참조하기 때문에, 각각의 data 를 참조하는것이 아닌 하나의 data 를 참조한다.

따라서 다음과 같이 data 를 함수형으로 작성하여야한다.

```js
data: function () {
  return {
    counter: 0
  }
}
```

### 컴포넌트 작성

Vue.js에서 부모-자식 컴포넌트 관계는 **props는 아래로, events 위로** 라고 요약 할 수 있습니다. 부모는 props를 통해 자식에게 데이터를 전달하고 자식은 events를 통해 부모에게 메시지를 보냅니다.

## Props

### Props로 데이터 전달하기

하위 컴포넌트의 인스턴스에서 상위데이터를 직접 참조 할 수 없으며, 그렇게 작성해서는 안된다.
데이터는 `props` 옵션을 사용해 하위 컴포넌트로 데이터를 전달할 수 있다.

```Js
Vue.component('child', {
  // props 정의
  props: ['message'],
  // 데이터와 마찬가지로 prop은 템플릿 내부에서 사용할 수 있으며
  // vm의 this.message로 사용할 수 있습니다.
  template: '<span>{{ message }}</span>'
})
```

```html
<child message="안녕하세요!"></child>
```

위의 예시에서 `child`컴포넌트로 message 가 정상적으로 전달되는것을 확인할 수 있다.

### camelCase vs. kebab-case

HTML 속성은 대소문자를 구분하지 않으므로 문자열이 아닌 템플릿을 사용할때 kebab-case 를 사용해야 합니다.

```js
Vue.component("child", {
  // JavaScript는 camelCase
  props: ["myMessage"],
  template: "<span>{{ myMessage }}</span>",
});
```

```html
<!-- HTML는 kebab-case -->
<child my-message="안녕하세요!"></child>
```

### 동적 Props

v-bind를 사용하여 부모의 데이터에 props를 동적으로 바인딩 할 수 있습니다. 데이터가 상위에서 업데이트 될 때마다 하위 데이터로도 전달됩니다.

```html
<div>
  <input v-model="parentMsg" />
  <br />
  <child v-bind:my-message="parentMsg"></child>
</div>
```

객체의 모든 속성을 props 로 전달할때는, 인자 없이 `v-bind` 를 사용할 수 있습니다.

```html
<todo-item v-bind="todo"></todo-item>
```

```js
todo: {
  text: 'Learn Vue',
  isComplete: false
}
```

### 리터럴 vs 동적

리터럴 구문을 통해서는 숫자를 전달할 수 없습니다.

```Html
<!-- 이것은 일반 문자열 "1"을 전달합니다. -->
<comp some-prop="1"></comp>
```

위의 예시에서 리터럴 prop 이기 때문에 실제 숫자가 아닌 일반 문자열 "1"로 전달됩니다.

JavaScript에서 숫자를 전달하려면 값이 JavaScript vygustlrdmfh vudrkehlehfhr `v-bind`를 사용해야합니다.

```html
<!-- 이것은 실제 숫자로 전달합니다. -->
<comp v-bind:some-prop="1"></comp>
```

### 단방향 데이터 흐름

모든 prop는 하위속성과 상위 속성 사이에서 단방향 바인딩을 형성합니다.
상위 속성이 업데이트 되면 하위 속성이 업데이트 되지만, 하위에서 업데이트 된 내용은 상위 속성이 없데이트 되지 않습니다.

단방향 데이터 흐름을 지원하는 이유는 하위 컴포넌트에서 실수를 했을때, 실수로 부모의 상태가 변경된다면, 실수한 곳을 찾아내기 힘들어지는 것을 방지할 수있습니다.

### prop 검증

컴포넌트가 받는 중인 prop에 대한 요구사항을 지정할 수 있습니다.

```js
Vue.component("example", {
  props: {
    // 기본 타입 확인 (`null` 은 어떤 타입이든 가능하다는 뜻입니다)
    propA: Number,
    // 여러개의 가능한 타입
    propB: [String, Number],
    // 문자열이며 꼭 필요합니다
    propC: {
      type: String,
      required: true,
    },
    // 숫자이며 기본 값을 가집니다
    propD: {
      type: Number,
      default: 100,
    },
    // 객체/배열의 기본값은 팩토리 함수에서 반환 되어야 합니다.
    propE: {
      type: Object,
      default: function () {
        return { message: "hello" };
      },
    },
    // 사용자 정의 유효성 검사 가능
    propF: {
      validator: function (value) {
        return value > 10;
      },
    },
  },
});
```

type 은 다음의 타입들 중에서 사용할 수 있습니다.

- String
- Number
- Boolean
- Function
- Object
- Array
- Symbol

### Props 가 아닌 속성

정의 되지 않은 속성을 사용하게 되면, 컴포넌트의 루트 요소로 추가됩니다.

```html
<bs-date-input data-3d-date-picker="true"></bs-date-input>
```

### v-on을 이용한 사용자 지정 이벤트

- `$on(eventName)` - 이벤트 감지
- `$emit(eventName)` - 이벤트 트리거

> `$on(eventName)`은 **자식에서 호출한 이벤트**는 감지하지 않습니다! 자식 컴포넌트에서 호출할 때는 `v-on` 을 템플릿에 반드시 지정해야합니다.

```html
<div id="counter-event-example">
  <p>{{ total }}</p>
  <button-counter v-on:increment="incrementTotal"></button-counter>
  <button-counter v-on:increment="incrementTotal"></button-counter>
</div>
```

```js
Vue.component("button-counter", {
  template: '<button v-on:click="incrementCounter">{{ counter }}</button>',
  data: function () {
    return {
      counter: 0,
    };
  },
  methods: {
    incrementCounter: function () {
      this.counter += 1;
      this.$emit("increment");
    },
  },
});

new Vue({
  el: "#counter-event-example",
  data: {
    total: 0,
  },
  methods: {
    incrementTotal: function () {
      this.total += 1;
    },
  },
});
```

### `.native`

컴포넌트의 루트 엘리먼트에서 네이티브 이벤트를 수신하려는 경우 사용합니다.

```html
<my-component v-on:click.native="doTheThing"></my-component>
```

### `.sync`

> 2.3.0+

일부 양뱡향 바인딩이 필요한 경우 할 때 사용하는 수식어입니다.

```html
<comp :foo.sync="bar"></comp>
```

### 비-부모 자식간의 통신

비어있는 Vue 인스턴스를 활용해 중앙 이벤트 버스로 활용할 수 있다.

```js
var bus = new Vue();
```

```js
// 컴포넌트 A의 메소드
bus.$emit("id-selected", 1);
```

```js
// 컴포넌트 B에서 호출할 곳
bus.$on("id-selected", function () {
  // ...
});
```

보다 복잡한 경우에는 상태 관리 패턴(vuex)를 활용한다.

### 동적 컴포넌트

같은 마운트 포인트를 사용하고 예약된. `<component>` 엘리먼트를 사용하여 여러 컴포넌트 간에 동적으로 트랜지션하고 `is` 속성에 동적으로 바인드 할 수 있습니다.

```js
var vm = new Vue({
  el: "#example",
  data: {
    currentView: "home",
  },
  components: {
    home: {
      /* ... */
    },
    posts: {
      /* ... */
    },
    archive: {
      /* ... */
    },
  },
});
```

```html
<component v-bind:is="currentView">
  <!-- vm.currentView가 변경되면 컴포넌트가 변경됩니다! -->
</component>
```

### `keep-alive`

`<keep-alive>` 속성을 사용하면 트랜지션된 컴포넌트를 메모리에 유지시켜 상태를 보존하여 다시 렌더링하지 않는다.

```html
<keep-alive>
  <component :is="currentView">
    <!-- 비활성화 된 컴포넌트는 캐시 됩니다! -->
  </component>
</keep-alive>
```

### 자식컴포넌트 참조

```html
<div id="parent">
  <user-profile ref="profile"></user-profile>
</div>
```

```js
var parent = new Vue({ el: "#parent" });
// 자식 컴포넌트 인스턴스에 접근합니다.
var child = parent.$refs.profile;
```

> `$refs` 는 컴포넌트가 렌더링 된 후에만 채워지며 반응적이지 않습니다. - 템플릿이나 computed 속성에서 `$refs`를 사용하지 말아야합니다.

```js
Vue.component("async-webpack-example", function (resolve) {
  // 이 특별한 require 구문은 Webpack이 Ajax 요청을 통해
  // 로드되는 번들로 작성된 코드를 자동으로 분리하도록 지시합니다.
  require(["./my-async-component"], resolve);
});
// 아래와 같이 es6 문법을 사용할 수도 있습니다.
Vue.component(
  "async-webpack-example",
  // `import` 함수는 `Promise`를 반환합니다.
  () => import("./my-async-component")
);

// es6 + 지역 컴포넌트 등록
new Vue({
  // ...
  components: {
    "my-component": () => import("./my-async-component"),
  },
});
```

### 고급 비동기 컴포넌트

> 2.3.0+

```js
const AsyncComp = () => ({
  // 로드하는 컴포넌트입니다. 반드시 Promise이어야합니다.
  component: import("./MyComp.vue"),
  // 비동기 컴포넌트가 로드되는 동안 사용할 컴포넌트
  loading: LoadingComp,
  // 실패했을 경우 사용하는 컴포넌트
  error: ErrorComp,
  // 로딩 컴포넌트를 보여주기전 지연하는 정도. 기본값: 200ms.
  delay: 200,
  // 시간이 초과되면 에러용 컴포넌트가 표시됩니다
  // 기본값: Infinity.
  timeout: 3000,
});
```

### 컴포넌트 이름 규약

- kebab-case
- camelCase를 사용하여 컴포넌트가 정의된 경우 camelCase 또는 kebab-case
- PascalCase를 사용하여 컴포넌트가 정의된 경우 kebab-case, camelCase or PascalCase

```html
<!-- 컴포넌트 정의 방식과 상관없이 항상 -->
<!-- HTML 템플릿에서 항상 kebab-case를 사용하세요 -->
<kebab-cased-component></kebab-cased-component>
<camel-cased-component></camel-cased-component>
<pascal-cased-component></pascal-cased-component>
```

### 재귀 컴포넌트

재귀 컴포넌트를 사용하기 위해서는 `name` 을 지정해야합니다.

```js
name: "unique-name-of-my-component";
```

컴포넌트를 전역 등록 시 `name`은 자동으로 설정됩니다.

### 컴포넌트간 순환 참조

finder 나 탐색기같은 트리를 작성할때 `tree-folder` 컴포넌트를 만들 수 있습니다.

```html
<p>
  <span>{{ folder.name }}</span>
  <tree-folder-contents :children="folder.children" />
</p>
```

#### tree-foer-contents 컴포넌트의 구조

```html
<ul>
  <li v-for="child in children">
    <tree-folder v-if="child.children" :folder="child" />
    <span v-else>{{ child.name }}</span>
  </li>
</ul>
```

`Vue.component`를 사용해 전역 등록시 이컴포넌트는 문제가 생기지 않지만, 웹펙 같은 **모듈 시스템을 사용하면 동작하지 않습니다.**

모듈시스템에서 동작하지 않는 이유는 A 컴포넌트와 B 컴포넌트는 서로를 필요로하기때문에 의존성에 무한 루프에 빠지게 됩니다.
따라서 누군가를 먼저 처리해야할지를 정해줘야합니다.

```js
beforeCreate: function () {
  this.$options.components.TreeFolderContents = require('./tree-folder-contents.vue')
}
```

```js
components: {
  TreeFolderContents: () => import("./tree-folder-contents.vue");
}
```

### `inline-template`

하위 컴포넌트에 `inline-template` 속성이 존재할 때, 이 내용이 분산 딘 내용으로 취급하지 않고 템플릿으로 사용합니다.

### `X-Templates`

템플릿을 정의하는 또다른 방법입니다.

```html
<script type="text/x-template" id="hello-world-template">
  <p>Hello hello hello</p>
</script>
```

```js
Vue.component("hello-world", {
  template: "#hello-world-template",
});
```

### `v-once`를 이용한 비용이 적게드는 정적 컴포넌트

v-once 디렉티브를 루트 엘리먼트에 추가함으로 캐시가 한번만 실행되게 할 수있습니다.

```js
Vue.component("terms-of-service", {
  template:
    "\
    <div v-once>\
      <h1>Terms of Service</h1>\
      ... a lot of static content ...\
    </div>\
  ",
});
```
