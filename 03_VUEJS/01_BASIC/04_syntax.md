# 템플릿 문법

## 보간법(Interpolation)

### 문자열

데이터 바인딩의 가장 기본 형태는 "Mustache" 구문(이중 중괄호)를 사용한 텍스트 보간입니다.

```html
<span>메시지: {{ msg }}</span>
```

Mustache 테그는 해당 데이터 객체의 `msg` 속성 값으로 대체된다. 또한 데이터 객체의 `msg` 속성이 변경될 때 마다 갱신된다.

v-once 디렉티브를 사용하면 업데이트 되지 않는 일회성 데이터 보간을 수행할 수 있음.

### 원시 HTML

mustache 문법을 사용하면 HTML이 아닌 일반 텍스트로 데이터를 해석하게 됨.
실제 HTML 을 출력하려면 v-html 디렉티브를 사용

```html
<p>Using mustaches: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

> 웹사이트에서 HTML을 동적으로 렌더링하는것은 XSS 취약점이 발생할 수 있으니 신뢰할 수 있는 콘텐츠에서만 사용해야함.

### 속성

`v-bind` 디렉티브를 사용해 html에 속성값을 줄 수 있음.

```html
<div v-bind:id="dynamicId"></div>
<button v-bind:disabled="isButtonDisabled">Button</button>
```

v-bind 에 boolean 속성을 사용할 때 주의해야함.
`isButtonDisabled` 이 `null`, `undefined`, `false` 의 값을 가질 때 `disabled` 속성은 `<button>` 엘리먼트에 포함되지 않는다.

```html
<!-- 아래와 같이 렌더링되는것이 아니라 -->
<button disabled="false">Button</button>
<!-- 아래와 같이 속성이 존재하지 않는다. -->
<button>Button</button>
```

### JavaScript 표현식 사용

vue.js는 아래와 같이 JavaScript 의 모든 표현식을 지원함.

```html
{{ number + 1 }} 
{{ ok ? 'YES' : 'NO' }} 
{{ message.split('').reverse().join('')}}

<div v-bind:id="'list-' + id"></div>
```

**하나의 단일 표현식**만 포함 될 수있음.

```html
<!-- 아래는 구문입니다, 표현식이 아닙니다. -->
{{ var a = 1 }}

<!-- 조건문은 작동하지 않습니다. 삼항 연산자를 사용해야 합니다. -->
{{ if (ok) { return message } }}
```

## 디렉티브

`v-` 접두사가 있는 특수 속성. 디렉티브 속성 값은 **단일 JavaScript 표현식** 이 됩니다. (`v-for` 제외)

```html
<p v-if="seen">이제 나를 볼 수 있어요</p>
```

### 전달인자

일부 디렉티브는 콜론으로 표시되는 "전달인자"를 사용할 수 있다.
`v-bind` 는 HTML 속성에 사용됨.

```html
<a v-bind:href="url"> ... </a>
```
