# 조건부 렌더링

## `v-if`

`v-if` 디렉티브는 조건에 따라 블록을 렌더링하기 위해 사용됩니다.
해당 블록은 디렉티브의 표현식이 true 값을 반환할 때만 렌더링 됩니다.

`v-else`와 같이 사용 가능합니다.

```html
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
```

### `<template>`에 `v-if`을 갖는 조건부 그룹 만들기

최종 렌더링 결과에는 `template` 엘리먼트를 제외하고 렌더링 됩니다.

```html
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

### `v-else` or `v-else-if`(2.1.0+)

`v-else` 는 `v-if` 에 대한 else 블록 을 나타낼 수 있습니다.

**`v-else` 블록은 `v-if` 또는 `v-else-if` 블록 바로 다음에 와야합니다.**

### key를 이용한 재사용 가능한 엘리먼트 제어

Vue에서는 가능한 한 효율적으로 렌더링하려고 하기 때문에, 종종 처음부터 렌더링 되지 않는 **재사용**하는 부분이 존재합니다.

```html
<template v-if="loginType === 'username'">
  <label>사용자 이름</label>
  <input placeholder="사용자 이름을 입력하세요" />
</template>
<template v-else>
  <label>이메일</label>
  <input placeholder="이메일 주소를 입력하세요" />
</template>
```

위의 예시를 렌더링하면, 사용자가 입력한 input값이 loginType 이 바뀌더라도 유지가 되는것을 확인 할 수 있다. 이는 두 템플릿에서 같은 요소를 사용하기 때문에 `<input>` 이 처음부터 렌더링되는것이 아니라 바뀐 부분인 placeholder 부분만 바뀐 것을 알 수 있다.

`<label>` 부분 또한 내용만 바뀌고 재사용 됨을 알 수 있습니다.

### `v-show`

엘리먼트를 조건부로 표시하기 위한 또 다른 방법이고, v-if 와 사용법은 거의 동일합니다.

```html
<h1 v-show="ok">안녕하세요!</h1>
```

차이점은 `v-show` 엘리먼트는 항상 렌더링되고 , `display` CSS 속성의 토글을 통해 제어됩니다.

### `v-show` vs `v-if`

- `v-if` 는 조건에 따라 실제 랜더링이 크게 바뀌므로 toggle cost 가 높습니다.
- `v-show` 는 무조건 렌더링이 진행되고 CSS를 통해 사용자에게 보여질지를 정하기 떄문에 초기 렌더링 cost 가 높습니다.

### `<template>` 에서 사용시 주의점

`<template>` 에서는 `v-show`, `v-else` 와 같은 문법들을 사용할 수 없습니다.
