# 예외적인 상황들

대부분의 경우, 다른 컴포넌트에 접근하거나 직접 DOM 엘리먼트에 접근하는 것을 피하는 것이 좋습니다. 그럼에도 불구하고, 이러한 접근이 허용되는 경우가 있습니다.

### 루트 엘리먼트에 접근하기

`new Vue` 의 모든 하위 컴포넌트에서는 `$root` 속성을 이용해 루트 인스턴스에 접근 가능

모든 하위 컴포넌트에서 아래와 같이 접근 가능.

```js
// root의 데이터 가져오기
this.$root.foo;

// root의 데이터 수정하기
this.$root.foo = 2;

// root의 computed 속성 접근하기
this.$root.bar;

// root의 method 사용하기
this.$root.baz();
```

> 권장하지 않는 방법 > Vuex 를 사용할 것.

### 자식 컴포넌트의 인스턴스 및 요소에 접근하기

`ref` 속성을 이용하면 자식 요소에 레퍼런스 id 를 할당하여 접근 가능.

```html
<base-input ref="usernameInput"></base-input>
```

```js
this.$refs.usernameInput;
```

`<base-input>` 인스턴스에 접근 가능.
`<base-input>`의 내부가 다음과 같이 생겼다면

```html
<input ref="input" />
```

`<base-input>`을 호출하는 부모요소에서 다음과 같은 메소드를 작성한다.

```js
methods: {
  // Used to focus the input from the parent
  focus: function () {
    this.$refs.input.focus()
    // 자식요소의 인풋이 포커스 되었을때 >> 자식요소 접근.
  }
}
```

### 의존성 주입

`provide`, `inject` 을 통해 의존성 주입을 할 수 있음.

#### `provide`

`provide`는 모든 하위 자식들에게 제공하고자 하는 data 및 methods 를 특정할 수 있게 해줌.

```js
provide: function () {
  return {
    getMap: this.getMap
  }
}
```

이제 하위 요소에서 `inject` 옵션을 통해서 특정 속성을 받을 수 있다.

```js
inject: ["getMap"];
```

### 프로그래밍적 이벤트 리스너

- `$on(eventName, eventHandler)` 을 이용한 이벤트 청취
- `$once(eventName, eventHandler)` 를 이용한 단발성 이벤트 청취
- `$off(eventName, eventHandler)` 를 이용한 이벤트 청취 중단
