# Vue 인스턴스

## Vue 인스턴스 생성

- 인스턴스 생성방법
```js
var vm = new Vue({
  // 옵션
})
```

- 인스턴스 속성과 메소드를
```js
var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data
})

vm.$data === data // => true
vm.$el === document.getElementById('example') // => true

// $watch 는 인스턴스 메소드 입니다.
vm.$watch('a', function (newVal, oldVal) {
  // `vm.a`가 변경되면 호출 됩니다.
})
```

> `vue`에서 정의하는 속성 및 메소드는 `$`을 접두어로 사용합니다.
>
> 일반적으로 플러그인을 통해 제공되는 메소드도 `$`를 접두어로 제공됩니다. 

```js
var vm = new Vue({
  // 옵션
})
vm.$modal(..); // vue-js-modal 플러그인 사용시
```
## 라이프 사이클

`vm`은 여러개의 라이프 사이클을 가집니다.

부모와 자식 컴포넌트의 라이프 사이클 순서를 콘솔로 출력하여봅니다.

```html
<div id="app"></div>
```

```js
const checked = (vm) => {
    console.log(`데이터에 접근 할 수 ${vm.$data ? '있습니다.' : '없습니다.'}`);
    console.log(`DOM 객체에 접근 할 수 ${vm.$el ? '있습니다.' : '없습니다.'}`);
    console.log(`화면에서 ${vm._isMounted ? '존재합니다.' : '존재하지 않습니다.'}`)
    console.log(`--------------------------------------------------------`)
    console.log(`--------------------------------------------------------`)
  }
  Vue.component('child', {
    props: ['message'],
    template: '<h1>{{ message }}</h1>',
    beforeCreate() {
      console.log('자식 컴포넌트의 BeforeCreate 호출');
      checked(this)
    },
    created() {
      console.log('자식 컴포넌트의 created 호출');
      checked(this)
    },
    beforeMount() {
      console.log('자식 컴포넌트의 beforeMount 호출');
      checked(this)
    },
    mounted() {
      console.log('자식 컴포넌트의 mounted 호출');
      checked(this)
    },
    beforeUpdate() {
      console.log('자식 컴포넌트의 beforeUpdate 호출');
      checked(this)
    },
    updated() {
      console.log('자식 컴포넌트의 updated 호출');
      checked(this)
    },
    beforeDestroy() {
      console.log('자식 컴포넌트의 beforeDestroy 호출');
      checked(this);
    },
    destroyed() {
      console.log('자식 컴포넌트의 destroyed 호출');
      checked(this)
    }
  })
var app = new Vue({
  el: '#app',
  data: {
    message: '안녕하세요 Vue!',
    show: true,
  },
  methods: {
    onToggleChild() {
      this.show=!this.show;
    }
  },
  beforeCreate() {
    console.log('부모 컴포넌트의 beforeCreate 호출');
    checked(this)
  },
  created() {
    console.log('부모 컴포넌트의 created 호출');
    checked(this)
  },
  beforeMount() {
    console.log('부모 컴포넌트의 beforeMount 호출');
    checked(this)
  },
  mounted() {
    console.log('부모 컴포넌트의 mounted 호출');
    checked(this)
  },
  beforeUpdate() {
    console.log('부모 컴포넌트의 beforeUpdate 호출');
    checked(this)
  },
  updated() {
    console.log('부모 컴포넌트의 updated 호출');
    checked(this)
  },
  beforeDestroy() {
    console.log('부모 컴포넌트의 beforeDestroy 호출');
    checked(this)
  },
  destroyed() {
    console.log('부모 컴포넌트의 destroyed 호출');
    checked(this)
  },
  template: 
  `<div>
      <child v-if="show" v-bind:message="message"/>
      <button v-on:click="onToggleChild">Toggle Child</button>
    </div>`,
  });
```

콘솔 결과

- `data`를 수정하는 경우 `created` 또는 `beforeMount`에서 처리해야 불필요한 렌더링이 발생하지 않는다.

- `jQuery`와 같은 `HTMLElement` 객체가 필요한 라이브러리를 사용하거나 `DOM API`를 사용하려는 경우, `beforeMount` 또는 `mounted`에서 `this.$el`로 접근하여 처리해야한다.