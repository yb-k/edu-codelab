# computed 와 watch

## computed

템플릿 내에 표현식을 넣는것은 간편하지만, 선언형 프로그래밍 방식에 매우 적합하지 않는 방법입니다.

```html
<div id="example">{{ message.split('').reverse().join('') }}</div>
```

`message` 를 역순으로 표현해주는것을 알려면 이 코드를 살펴봐야 알 수 있기 때문입니다.

따라서 우리는 복잡한 로직을 가졌다면, 반드시 **computed 속성**을 사용해야한다.

### 기본예제

```html
<div id="example">
  <p>원본 메시지: "{{ message }}"</p>
  <p>역순으로 표시한 메시지: "{{ reversedMessage }}"</p>
</div>
```

```javascript
var vm = new Vue({
  el: "#example",
  data: {
    message: "안녕하세요",
  },
  computed: {
    // 계산된 getter
    reversedMessage: function () {
      // `this` 는 vm 인스턴스를 가리킵니다.
      return this.message.split("").reverse().join("");
    },
  },
});
```

이 예제에서는 computed 속성을 활용해서 `reverseMessage`를 선언해서 사용했습니다. `vm.reversedMessage` 속성에 대한 getter 함수로 불러온 값입니다.

### computed 속성의 캐싱 vs 메소드

표현식을 사용하면 computed 속성을 사용하는것 말고도 메소드를 호출하여 동일하게 사용할 수 있지만, computed 속성은 종속 대상을 따라 캐싱을 하기 때문에 computed 속성을 사용하는것이 더욱 효과적입니다.

```html
<p>뒤집힌 메시지: "{{ reversedMessage() }}"</p>
```

```js
// 컴포넌트 내부
methods: {
  reversedMessage: function () {
    return this.message.split('').reverse().join('')
  }
}
```

### computed 속성 vs watch 속성

일반적인 경우 computed 속성을 사용하는것이 더 선언형 프로그래밍 형식에 어울립니다.

- watch : 어떤 데이터가 바뀌면 이 함수를 실행하라. -> 명령형 프로그래밍
- computed : 계산해야하는 목표 데이터를 정의 하는 방식 -> 선언형 프로그래밍

### watch 속성

> 데이터 변경에 대한 응답이 비동기적으로 오거나, 시간이 많이 소요되는 작업을 할때 사용

```html
<div id="watch-example">
  <p>
    yes/no 질문을 물어보세요:
    <input v-model="question" />
  </p>
  <p>{{ answer }}</p>
</div>

<script src="https://unpkg.com/axios@0.12.0/dist/axios.min.js"></script>
<script src="https://unpkg.com/lodash@4.13.1/lodash.min.js"></script>
<script>
  var watchExampleVM = new Vue({
    el: "#watch-example",
    data: {
      question: "",
      answer: "질문을 하기 전까지는 대답할 수 없습니다.",
    },
    watch: {
      // 질문이 변경될 때 마다 이 기능이 실행됩니다.
      question: function (newQuestion) {
        this.answer = "입력을 기다리는 중...";
        this.debouncedGetAnswer();
      },
    },
    created: function () {
      // _.debounce는 lodash가 제공하는 기능으로
      // 특히 시간이 많이 소요되는 작업을 실행할 수 있는 빈도를 제한합니다.
      // 이 경우, 우리는 yesno.wtf/api 에 액세스 하는 빈도를 제한하고,
      // 사용자가 ajax요청을 하기 전에 타이핑을 완전히 마칠 때까지 기다리길 바랍니다.
      this.debouncedGetAnswer = _.debounce(this.getAnswer, 500);
    },
    methods: {
      getAnswer: function () {
        if (this.question.indexOf("?") === -1) {
          this.answer = "질문에는 일반적으로 물음표가 포함 됩니다. ;-)";
          return;
        }
        this.answer = "생각중...";
        var vm = this;
        axios
          .get("https://yesno.wtf/api")
          .then(function (response) {
            vm.answer = _.capitalize(response.data.answer);
          })
          .catch(function (error) {
            vm.answer = "에러! API 요청에 오류가 있습니다. " + error;
          });
      },
    },
  });
</script>
```
