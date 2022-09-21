# 클래스와 스타일 바인딩

## HTML 클래스 바인딩하기

### 객체 구문

`V-bind:class`를 사용하여 클래스를 동적으로 토글 할 수있습니다.

```html
<!-- isActive 가 true 이면, `<div class="active"></div>`-->
<div
  class="static"
  v-bind:class="{ active: isActive, 'text-danger': hasError }"
></div>
```

위의 예시에서 active 클래스의 존재 여부는 데이터 속성 isActive 의 **참 속성**에 의해 결졍된다.

단일 속성 한개씩을 사용할 수도있지만 객채, computed 속성을 바인딩 할 수도 있습니다.

- data 바인딩

```html
<div v-bind:class="classObject"></div>
```

```js
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
```

- computed 속성

```html
<div v-bind:class="classObject"></div>
```

```js
data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```

### 배열 구문

`v-bind:class` 에 배열도 사용할 수 있습니다.

```html
<div v-bind:class="[activeClass, errorClass]"></div>
```

```js
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

위의 결과는 다음과 같습니다.

```html
<div class="active text-danger"></div>
```

### component 와 함께 사용하는 법

1. component 선언

```html
Vue.component('my-component', { template: '
<p class="foo bar">Hi</p>
' })
```

2. 사용할 클래스 일부를 추가

```html
<my-component class="baz boo"></my-component>
```

3. 렌더링된 결과

```html
<p class="foo bar baz boo">Hi</p>
```

## 인라인 스타일 바인딩

html 클래스 바인딩과 마찬가지로 객체 구문과 배열 구문 사용 가능합니다.

### 객체 구문

```html
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```

```html
<div v-bind:style="styleObject"></div>
```

### 배열구문

```html
<div v-bind:style="[baseStyles, overridingStyles]"></div>
```

### 다중 값 제공

> 2.3.0+

스타일 속성에 접두사가 있는 여러 값을 배열로 전달할 수 있습니다.

```html
<div v-bind:style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```
