# 폼 입력 바인딩

## 기본 사용법

`v-model` 디렉티브를 이용해 양뱡향 데이터 바인딩을 생성

> `v-model`은 모든 form 엘리먼트의 초기 `value`와 `checked` 그리고 `selected` 속성을 무시합니다. 항상 Vue 인스턴스 데이터를 원본 소스로 취급합니다. 컴포넌트의 `data` 옵션 안에 있는 JavaScript에서 초기값을 선언해야합니다.

### form 입력 테그 별 속성 및 사용 이벤트

| 비고           | 속성    | 이벤트 |
| -------------- | ------- | ------ |
| text,textarea  | value   | input  |
| checkbox,radio | checked | change |
| select         | value   | change |

### text, teatarea

```html
<input v-model="message" placeholder="여기를 수정해보세요" />
<p>메시지: {{ message }}</p>
```

## checkbox

```html
<input type="checkbox" id="checkbox" v-model="checked" />
<label for="checkbox">{{ checked }}</label>
```

- 여러개의 체크박스는 같은 배열을 바인딩 가능

```html
<div id="example-3">
  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
  <label for="jack">Jack</label>
  <input type="checkbox" id="john" value="John" v-model="checkedNames" />
  <label for="john">John</label>
  <input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
  <label for="mike">Mike</label>
  <br />
  <span>체크한 이름: {{ checkedNames }}</span>
</div>
```

```js
new Vue({
  el: "#example-3",
  data: {
    checkedNames: [],
  },
});
```

### radio

```html
<input type="radio" id="one" value="One" v-model="picked" />
<label for="one">One</label>
<br />
<input type="radio" id="two" value="Two" v-model="picked" />
<label for="two">Two</label>
<br />
<span>선택: {{ picked }}</span>
```

### select

```html
<select v-model="selected">
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
<span>선택함: {{ selected }}</span>
```

- 여러개의 select (배열을 바인딩함.)

```html
<select v-model="selected" multiple>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
<br />
<span>Selected: {{ selected }}</span>
```

### 수식어

#### `.lazy`

기본적으로, `v-model`은 각 입력 이벤트 후 입력과 데이터를 동기화 합니다.
`.lazy` 수식어를 추가하여 change 이벤트 이후에 동기화 할 수 있습니다.

```html
<!-- "input" 대신 "change" 이후에 동기화 됩니다. -->
<input v-model.lazy="msg" />
```

#### `.number`

사용자 입력이 자동으로 숫자로 형변환 되기를 원하면, `v-model`이 관리하는 input에 `.number` 수식어를 추가하면 됩니다.

#### `.trim`

input 을 자동으로 trim 해줌

```html
<input v-model.trim="msg" />
```
