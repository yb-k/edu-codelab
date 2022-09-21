# 진입/진출 그리고 리스트트랜지션

## 단일 엘리먼트 / 컴포넌트 트랜지션

Vue는 트랜지션 래퍼 컴포넌트를 제공하므로 다음과 같은 상황에서 모든 엘리먼트 또는 컴포넌트에 대한 진입 / 진출 트랜지션을 추가 할 수 있습니다.

- 조건부 렌더링 (`v-if` 사용)
- 조건부 출력 (`v-show` 사용)
- 동적 컴포넌트
- 컴포넌트 루트 노드

```html
<div id="demo">
  <button v-on:click="show = !show">Toggle</button>
  <transition name="fade">
    <p v-if="show">hello</p>
  </transition>
</div>
```

```js
new Vue({
  el: "#demo",
  data: {
    show: true,
  },
});
```

```css
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
```

`transition` 컴포넌트로 싸여진 엘리먼트가 삽입되거나 제거 될때 일어납니다.

1. Vue는 대상 엘리먼트에 CSS 트랜지션 또는 애니메이션이 적용되었는지 여부를 자동으로 감지합니다. 그렇다면 CSS 트랜지션 클래스가 적절한 타이밍에 추가 / 제거됩니다.

2. 트랜지션 컴포넌트가 JavaScript 훅를 제공하면 이러한 훅은 적절한 타이밍에 호출됩니다.

3. CSS 트랜지션 / 애니메이션이 감지되지 않고 JavaScript 훅이 제공 되지 않으면 삽입 또는 제거를 위한 DOM 작업이 다음 프레임에서 즉시 실행됩니다 (참고: 이는 Vue의 `nextTick` 개념과는 다른 브라우저 애니메이션 프레임입니다).

### 트랜지션 클래스

진입 / 진출 트랜지션에는 네가지 클래스가 적용됩니다.

1. v-enter: enter의 시작 상태. 엘리먼트가 삽입되기 전에 적용되고 한 프레임 후에 제거됩니다.

2. v-enter-active: enter에 대한 활성 및 종료 상태. 엘리먼트가 삽입되기 전에 적용됩니다. 트랜지션 / 애니메이션이 완료되면 제거됩니다.

3. v-enter-to: **2.1.8+** 진입 상태의 끝에서 실행됩니다. 엘리먼트가 삽입된 후 (동시에 v-enter가 제거됨), 트랜지션/애니메이션이 끝나면 제거되는 하나의 프레임을 추가했습니다.

4. v-leave: leave를 위한 시작 상태. 진출 트랜지션이 트리거 될 때 적용되고 한 프레임 후에 제거됩니다.

5. v-leave-active: leave에 대한 활성 및 종료 상태. 진출 트랜지션이 트리거되면 적용되고 트랜지션 / 애니메이션이 완료되면 제거됩니다.

6. v-leave-to: **2.1.8+** 진출 상태의 끝에서 실행됩니다. 진출 트랜지션이 트리거되고 (동시에 v-leave가 제거됨), 트랜지션/애니메이션이 끝나면 제거되는 하나의 프레임을 추가했습니다.

### CSS 트랜지션

```html
<div id="example-1">
  <button @click="show = !show">Toggle render</button>
  <transition name="slide-fade">
    <p v-if="show">hello</p>
  </transition>
</div>
```

```js
new Vue({
  el: "#example-1",
  data: {
    show: true,
  },
});
```

```css
/* 애니메이션 진입 및 진출은 다른 지속 시간 및  */
/* 타이밍 기능을 사용할 수 있습니다. */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
```

### CSS 애니메이션

css 애니메이션은 css 트랜지션과 같은 방식으로 적용됩니다.
차이점은 요소가 삽입된 직후에 `v-enter` 가 제거되지 않지만 `animationend` 이벤트가 있습니다.

### 사용자 트랜지션

다음 속성을 제공하여 사용자 정의 트랜지션 클래스를 지정할 수도 있습니다.

- `enter-class`
- `enter-active-class`
- `enter-to-class (2.1.8+)`
- `leave-class`
- `leave-active-class`
- `leave-to-class (2.1.8+)`

```html
<link
  href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1"
  rel="stylesheet"
  type="text/css"
/>

<div id="example-3">
  <button @click="show = !show">Toggle render</button>
  <transition
    name="custom-classes-transition"
    enter-active-class="animated tada"
    leave-active-class="animated bounceOutRight"
  >
    <p v-if="show">hello</p>
  </transition>
</div>
```

### 트랜지션과 애니메이션을 함께 사용하기

> 2.2.0+

`<transition>` 컴포넌트에 `duration` 속성 : 명시적 지속시간을 지정할 수 있습니다.

```html
<transition :duration="1000">...</transition>
<!-- 진입과 진출 기간 에도 명시적인 값 적용 가능 -->
<transition :duration="{ enter: 500, leave: 800 }">...</transition>
```

### JavaScript 훅

```html
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"
  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
  <!-- ... -->
</transition>
```

```js
// ...
methods: {
  // --------
  // 진입
  // --------

  beforeEnter: function (el) {
    // ...
  },
  // done 콜백을 주자 않으면 동기적으로 호출되고, 트랜지션이 즉시 완료됩니다.
  enter: function (el, done) {
    // ...
    done()
  },
  afterEnter: function (el) {
    // ...
  },
  enterCancelled: function (el) {
    // ...
  },

  // --------
  // 진출
  // --------

  beforeLeave: function (el) {
    // ...
  },
  // done 콜백을 주자 않으면 동기적으로 호출되고, 트랜지션이 즉시 완료됩니다.
  leave: function (el, done) {
    // ...
    done()
  },
  afterLeave: function (el) {
    // ...
  },
  // leaveCancelled은 v-show와 함께 사용됩니다.
  leaveCancelled: function (el) {
    // ...
  }
}
```

### 최초 렌더링 시 트랜지션

`appear` 속성을 추가해 초기 렌더에 트랜지션을 적용할 수 있습니다.

```html
<transition
  appear
  appear-class="custom-appear-class"
  appear-to-class="custom-appear-to-class"
  (2.1.8+)
  appear-active-class="custom-appear-active-class"
>
  <!-- ... -->
</transition>
```

사용자 정의 js 훅

```js
<transition
  appear
  v-on:before-appear="customBeforeAppearHook"
  v-on:appear="customAppearHook"
  v-on:after-appear="customAfterAppearHook"
  v-on:appear-cancelled="customAppearCancelledHook"
>
  <!-- ... -->
</transition>
```

`appear` 속성이나, `v-on:appear` 둘다 최초 렌더링 시 트랜지션을 동작시 킬 수 있습니다.

### 엘리먼트 간 트랜지션

`v-if` /`v-else` 를 사용하여 원본 엘리먼트 사이를 트랜지션 할 수도 있습니다.

```html
<transition>
  <table v-if="items.length > 0">
    <!-- ... -->
  </table>
  <p v-else>Sorry, no items found.</p>
</transition>
```

위 와 같이 **같은 테그 이름**을 가진 엘리먼트 사이를 트랜지션할 때, key 값을 설정해주는 것이 좋습니다.

```Html
<transition>
 <button v-if="isEditing" key="save">
   Save
 </button>
 <button v-else key="edit">
   Edit
 </button>
</transition>
```

실제로 여러 개의 `v-if`를 사용하거나 하나의 엘리먼트를 동적 속성에 바인딩하여 여러 엘리먼트 사이를 트랜지션 할 수 있습니다.

```html
<transition>
  <button v-if="docState === 'saved'" key="saved">Edit</button>
  <button v-if="docState === 'edited'" key="edited">Save</button>
  <button v-if="docState === 'editing'" key="editing">Cancel</button>
</transition>
<!-- 다음과 같이 쓸 수 있다 -->
<transition>
  <button v-bind:key="docState">{{ buttonMessage }}</button>
</transition>
```

```js
// ...
computed: {
  buttonMessage: function () {
    switch (this.docState) {
      case 'saved': return 'Edit'
      case 'edited': return 'Save'
      case 'editing': return 'Cancel'
    }
  }
}
```

### 컴포넌트간 트랜지션

동적 컴포넌트를 래핑으로 간단하게 할 수 있다.

```html
<transition name="component-fade" mode="out-in">
  <component v-bind:is="view"></component>
</transition>
```

```js
new Vue({
  el: "#transition-components-demo",
  data: {
    view: "v-a",
  },
  components: {
    "v-a": {
      template: "<div>Component A</div>",
    },
    "v-b": {
      template: "<div>Component B</div>",
    },
  },
});
```

```css
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
```

# 상태 트랜지션

### 감시자를 이용한 상태 애니메이션

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.3/TweenMax.min.js"></script>

<div id="animated-number-demo">
  <input v-model.number="number" type="number" step="20" />
  <p>{{ animatedNumber }}</p>
</div>
```

```js
new Vue({
  el: "#animated-number-demo",
  data: {
    number: 0,
    tweenedNumber: 0,
  },
  computed: {
    animatedNumber: function () {
      return this.tweenedNumber.toFixed(0);
    },
  },
  watch: {
    number: function (newValue) {
      TweenLite.to(this.$data, 0.5, { tweenedNumber: newValue });
    },
  },
});
```

숫자를 변경하면 입력 아래에 애니메이션으로 표시됩니다.

다음의 예제는 Tween.js 와 Color.js 를 이용한 예제 입니다.

```html
<script src="https://cdn.jsdelivr.net/npm/tween.js@16.3.4"></script>
<script src="https://cdn.jsdelivr.net/npm/color-js@1.0.3"></script>

<div id="example-7">
  <input
    v-model="colorQuery"
    v-on:keyup.enter="updateColor"
    placeholder="Enter a color"
  />
  <button v-on:click="updateColor">Update</button>
  <p>Preview:</p>
  <span
    v-bind:style="{ backgroundColor: tweenedCSSColor }"
    class="example-7-color-preview"
  ></span>
  <p>{{ tweenedCSSColor }}</p>
</div>
```

```js
var Color = net.brehaut.Color;

new Vue({
  el: "#example-7",
  data: {
    colorQuery: "",
    color: {
      red: 0,
      green: 0,
      blue: 0,
      alpha: 1,
    },
    tweenedColor: {},
  },
  created: function () {
    this.tweenedColor = Object.assign({}, this.color);
  },
  watch: {
    color: function () {
      function animate() {
        if (TWEEN.update()) {
          requestAnimationFrame(animate);
        }
      }

      new TWEEN.Tween(this.tweenedColor).to(this.color, 750).start();

      animate();
    },
  },
  computed: {
    tweenedCSSColor: function () {
      return new Color({
        red: this.tweenedColor.red,
        green: this.tweenedColor.green,
        blue: this.tweenedColor.blue,
        alpha: this.tweenedColor.alpha,
      }).toCSS();
    },
  },
  methods: {
    updateColor: function () {
      this.color = new Color(this.colorQuery).toRGB();
      this.colorQuery = "";
    },
  },
});
```

```css
.example-7-color-preview {
  display: inline-block;
  width: 50px;
  height: 50px;
}
```

### 동적 상태 트랜지션

실시간으로 업데이트 할 수 있으므로 프로토 타이핑에 특히 유용합니다.
예제 페이지 참고

### 컴포넌트를 이용한 트랜지션 구성

```html
<script src="https://cdn.jsdelivr.net/npm/tween.js@16.3.4"></script>

<div id="example-8">
  <input v-model.number="firstNumber" type="number" step="20" /> +
  <input v-model.number="secondNumber" type="number" step="20" /> = {{ result }}
  <p>
    <animated-integer v-bind:value="firstNumber"></animated-integer> +
    <animated-integer v-bind:value="secondNumber"></animated-integer> =
    <animated-integer v-bind:value="result"></animated-integer>
  </p>
</div>
```

```js
// 이 복잡한 트위닝 로직은 이제 응용 프로그램에서
// 애니메이션을 적용하려는 숫자 사이에서 재사용 할 수 있습니다.
// 또한 컴포넌트는보다 동적인 트랜지션 및 복잡한 트랜지션 전략을
// 구성할 수 있는 깨끗한 인터페이스를 제공합니다.
Vue.component("animated-integer", {
  template: "<span>{{ tweeningValue }}</span>",
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  data: function () {
    return {
      tweeningValue: 0,
    };
  },
  watch: {
    value: function (newValue, oldValue) {
      this.tween(oldValue, newValue);
    },
  },
  mounted: function () {
    this.tween(0, this.value);
  },
  methods: {
    tween: function (startValue, endValue) {
      var vm = this;
      function animate() {
        if (TWEEN.update()) {
          requestAnimationFrame(animate);
        }
      }

      new TWEEN.Tween({ tweeningValue: startValue })
        .to({ tweeningValue: endValue }, 500)
        .onUpdate(function () {
          vm.tweeningValue = this.tweeningValue.toFixed(0);
        })
        .start();

      animate();
    },
  },
});

// 모든 Vue 인스턴스에서 모든 복잡성이 제거 되었습니다!
new Vue({
  el: "#example-8",
  data: {
    firstNumber: 20,
    secondNumber: 40,
  },
  computed: {
    result: function () {
      return this.firstNumber + this.secondNumber;
    },
  },
});
```
