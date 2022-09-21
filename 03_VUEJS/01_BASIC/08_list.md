# 리스트 렌더링

## `v-for`로 엘리먼트에 배열 매핑하기

`v-for` 디렉티브는 배열을 기반으로 리스트를 렌더링 할 수 있습니다.
`v-for` 디렉티브는 `item in items` 문법을 사용합니다.
`items` 는 원본 데이터 배열이고, `item` 은 반복되는 배열 엘리먼트의 **별칭**입니다.

## 기본 사용 방법

```html
<ul id="example-1">
  <li v-for="item in items">{{ item.message }}</li>
</ul>
```

```js
var example1 = new Vue({
  el: "#example-1",
  data: {
    items: [{ message: "Foo" }, { message: "Bar" }],
  },
});
```

`v-for` 는 현재 항목의 인덱스에 대한 두 번째 전달인자를 가질 수 있습니다.(옵션)

```html
<ul id="example-2">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>
```

```js
var example2 = new Vue({
  el: "#example-2",
  data: {
    parentMessage: "Parent",
    items: [{ message: "Foo" }, { message: "Bar" }],
  },
});
```

`if` 대신에 `of` 를 구분자로 사용 가능합니다. JavaScript 구문과 유사하게 사용할 수 있습니다.

## `v-for` 과 객체

`v-for` 를 사용하여 객체의 속성을 반복할 수도 있습니다.

```html
<ul id="v-for-object" class="demo">
  <li v-for="value in object">{{ value }}</li>
</ul>
```

```js
new Vue({
  el: "#v-for-object",
  data: {
    object: {
      title: "How to do lists in Vue",
      author: "Jane Doe",
      publishedAt: "2016-04-10",
    },
  },
});
```

**키**에 대한 두번짜 전달인자를 제공할 수있습니다.(옵션)

```html
<!-- 순서대로 객체의 값, 키, 인덱스 -->
<div v-for="(value, name, index) in object">
  {{ index }}. {{ name }}: {{ value }}
</div>
```

> 객체를 반복할 때는 Object.keys() 의 키 나열 순서에 따라 결정됩니다.
> 이 순서는 JavaScript 엔진 구현간 **일관적이지 않습니다.**

### Maintaining State

Vue 에서는 개별 돔 노드들을 추적하고 기존 엘리먼트를 재사용, 재 정렬하기 위해서 `v-for`의 각 항목들에 고유한 key 속성을 제공해야합니다.

```html
<div v-for="item in items" v-bind:key="item.id">
  <!-- content -->
</div>
```

반복되는 DOM 내용이 단순하거나, 의도적인 성능 향상을 위한 경우가 아니라면 가능하면 언제나 `v-for` 에 `key` 를 추가하는 것이 좋습니다.

> 키값은 Object 형식을 사용해서는 안되며, 기본타입(Primitive Type) 을 꼭 사용해야합니다.

## 배열 변경 감지

### 변이 메소드

Vue 는 감시중인 배열의 변이 메소드를 래핑하여 뷰 갱신을 트리거 시킵니다.

- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`

### 배열 대체

위의 메소드들은 호출된 원본 배열을 변형합니다. `filter()`,`concat()`,`slice()` 세 메소드는 원본 베열을 변경하지 않고 항상 새 배열을 반환합니다.

```javascript
example1.items = example1.items.filter(function (item) {
  return item.message.match(/Foo/);
});
```

### 주의 사항

위의 메소드들을 제외하고 다른방법으로 배열에 직접 접근하는것은 Vue 에서 변경 사항을 감지하지 못하기 떄문에 주의 해야합니다.

1. 인덱스로 배열에 있는 항목을 직접 설정하는 경우, 예: `vm.items[indexOfItem] = newValue`
2. 배열 길이를 수정하는 경우, 예: `vm.items.length = newLength`

```js
var vm = new Vue({
  data: {
    items: ["a", "b", "c"],
  },
});
vm.items[1] = "x"; // reactive하지 않음
vm.items.length = 2; // reactive하지 않음
```

위와 같이 사용하지말고 아래와 같이 사용해야합니다.

```javascript
// Vue.set
Vue.set(vm.items, indexOfItem, newValue);

// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue);

// Vue.set 의 별칭인 vm.$set 을 사용
vm.$set(vm.items, indexOfItem, newValue);

// 2번 주의 사항을 극복하는 법
vm.items.splice(newLength);
```

## 객체 변경 감지에 관한 주의사항

Vue 는 속성의 추가 및 삭제를 감지할 수 없습니다.

```js
var vm = new Vue({
  data: {
    a: 1,
  },
});
// `vm.a` 는 반응형입니다.

vm.b = 2;
// `vm.b` 는 반응형이 아닙니다.
```

상태의 변경을 감지할 수 있는 데이터를 추가 할 때는 `Vue.set(object, propertyName, value)` 메소드를 사용해서 추가 해야합니다.

### 필터링/정렬 된 결과 표시하기

```html
<li v-for="n in evenNumbers">{{ n }}</li>
```

```js
data: {
  numbers: [ 1, 2, 3, 4, 5 ]
},
computed: {
  evenNumbers: function () {
    return this.numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```

위의 예시 처럼 computed 속성을 사용해서 표현 할 수도 있고 , 다음과 같이 method를 활용하여 표현 할 수도있습니다.

```html
<li v-for="n in even(numbers)">{{ n }}</li>
```

```js
data: {
  numbers: [ 1, 2, 3, 4, 5 ]
},
methods: {
  even: function (numbers) {
    return numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```

computed 속성을 사용하는것이 선언형 프로그램을 하는데 있어서 더 적합한 모습을 볼 수 있습니다.

### Range `v-for`

`v-for` 는 숫자를 사용할 수 있습니다.

```html
<div>
  <span v-for="n in 10">{{ n }} </span>
</div>
```

### `v-for` and `v-if`

두 디렉티브를 동시에 사용하는 것은 매우 바랍직하지 않습니다.
동일한 노드에 두가지 모두 있다면, `v-for` 가 `v-if` 보다 높은 우선 순위를 가지기 때문에 `v-if` 는 루프가 반복될 때 마다 실행됩니다.

```html
<li v-for="todo in todos" v-if="!todo.isComplete">{{ todo }}</li>
```
