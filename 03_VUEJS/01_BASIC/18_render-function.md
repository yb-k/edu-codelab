# render functions & JSX

`render` 함수를 사용하는 예제

```html
<h1>
  <a name="hello-world" href="#hello-world"> Hello world! </a>
</h1>
```

위의 컴포넌트는 이 컴포넌트 인터페이스가 필요하다고 가정합니다.

```html
<anchored-heading :level="1">Hello world!</anchored-heading>
```

`level` prop를 기반으로 방금 제목을 생성하는 컴포넌트를 이용하면 다음과 같이 빠르게 만들 수 있습니다.

```html
<script type="text/x-template" id="anchored-heading-template">
  <h1 v-if="level === 1">
    <slot></slot>
  </h1>
  <h2 v-else-if="level === 2">
    <slot></slot>
  </h2>
  <h3 v-else-if="level === 3">
    <slot></slot>
  </h3>
  <h4 v-else-if="level === 4">
    <slot></slot>
  </h4>
  <h5 v-else-if="level === 5">
    <slot></slot>
  </h5>
  <h6 v-else-if="level === 6">
    <slot></slot>
  </h6>
</script>
```

```js
Vue.component("anchored-heading", {
  template: "#anchored-heading-template",
  props: {
    level: {
      type: Number,
      required: true,
    },
  },
});
```

위의 코드는 slot 이 반복되고, `render` 를 사용하면 더 간결하게 작성할 수 있습니다.

```js
Vue.component("anchored-heading", {
  render: function (createElement) {
    return createElement(
      "h" + this.level, // 태그 이름
      this.$slots.default // 자식의 배열
    );
  },
  props: {
    level: {
      type: Number,
      required: true,
    },
  },
});
```

`anchored-heading` 안에 `Hello world!`와 같이 `slot` 속성 없이 자식을 패스 할 때 그 자식들은 `$slots.default` 에있는 컴포넌트 인스턴스에 저장된다는 것을 알아야합니다.

### 노드, 트리, 그리고 버추얼 DOM

#### DOM TREE

브라우저가 html 코드를 읽어 DOM 노드 트리를 만듭니다.

![돔트리](http://211.241.199.68:3030/images/dom-tree.png)

모든 엘리먼트는 노드를 가지고 각 노드는 자식을 가질 수 있습니다.

노드를 효율적으로 갱신하는 것은 어렵지만, 템플릿이 바뀌면 Vue 가 페이지에서 수정된 HTMl 만을 수정해줍니다.

### 버추얼 DOM

Vue는 실제 DOM에 필요한 변경사항을 추적하기 위해 **virtual DOM**을 만듭니다. 이를 자세히 살펴보면 아래와 같습니다.

```js
return createElement("h1", this.blogTitle);
```

createElement 는 실제 돔과 정확하게 일치하지 않습니다. Vue에게 자식노드에 대한 설명을 포함하여 페이지에서 렌더링해야하는 노드의 종류를 설명하는 정보를 포함하기 때문에 더 정확하게 createNodeDescription이라는 이름을 지정할 수 있습니다. 이 노드에 관한 설명을 VNode로 축약된 가상 노드라고 부릅니다. “버추얼 DOM”은 Vue 컴포넌트 트리로 만들어진 VNode 트리입니다.

### `createElement` 전달인자

다음으로 살펴볼 것은 `createElement` 함수에서 템플릿 기능을 사용하는 방법입니다. 다음은 `createElement`가 받아들이는 전달인자입니다.

```js
// @returns {VNode}
createElement(
  // {String | Object | Function}
  // HTML 태그 이름, 컴포넌트 옵션 또는 함수 중
  // 하나를 반환하는 함수입니다. 필수 사항.
  "div",

  // {Object}
  // 템플릿에서 사용할 속성에 해당하는 데이터 객체입니다
  // 데이터 객체입니다. 선택 사항.
  {
    // (아래 다음 섹션에 자세히 설명되어 있습니다.)
  },

  // {String | Array}
  // VNode 자식들. `createElement()`를 사용해 만들거나,
  // 간단히 문자열을 사용해 'text VNodes'를 얻을 수 있습니다. 선택사항
  [
    "Some text comes first.",
    createElement("h1", "A headline"),
    createElement(MyComponent, {
      props: {
        someProp: "foobar",
      },
    }),
  ]
);
```

### 제약사항

VNodes 는 고유해야합니다.

다음의 예시는 동작하지 않습니다.

```js
render: function (createElement) {
  var myParagraphVNode = createElement('p', 'hi')
  return createElement('div', [
    // 이런 - Vnode가 중복입니다!
    myParagraphVNode, myParagraphVNode
  ])
}
```

같은 엘리먼트/컴포넌트를 여러번 복사하려면 `render` 함수를 사용합니다.

```js
render: function (createElement) {
  return createElement('div',
    Array.apply(null, { length: 20 }).map(function () {
      return createElement('p', 'hi')
    })
  )
}
```

## 템플릿 기능을 일반 JavaScript로 변경하기

### `v-if` 와 `v-for`

`v-if` 와 `v-for` 를 사용하는 템플릿 예시입니다.

```html
<ul v-if="items.length">
  <li v-for="item in items">{{ item.name }}</li>
</ul>
<p v-else>No items found.</p>
```

위의 코드를 render 함수에서 `if`/`else` 와 `map`을 이용해 작성할 수 있습니다.

```js
props: ['items'],
render: function (createElement) {
  if (this.items.length) {
    return createElement('ul', this.items.map(function (item) {
      return createElement('li', item.name)
    }))
  } else {
    return createElement('p', 'No items found.')
  }
}
```

### `v-model`

렌더 함수에는 직접적으로 `v-model`에 대응되는 것이 없습니다. 직접 구현해야합니다.

```js
props: ['value'],
render: function (createElement) {
  var self = this
  return createElement('input', {
    domProps: {
      value: self.value
    },
    on: {
      input: function (event) {
        self.$emit('input', event.target.value)
      }
    }
  })
}
```

### 이벤트 및 키 수식어

`.passive`, `.capture` 및 `.once` 이벤트 수식어를 위해 Vue는 `on`과 함께 사용할 수있는 접두사를 제공합니다.

| 수식어                               | 접두어 |
| ------------------------------------ | ------ |
| `.passive`                           | `&`    |
| `.capture`                           | `!`    |
| `.once`                              | `~`    |
| `.capture.once` 또는 `.once.capture` | `~!`   |

### Slots

`this.$slots`에서 정적 슬롯 내용을 VNodes의 배열로 접근할 수 있습니다.

```js
render: function (createElement) {
  // `<div><slot></slot></div>`
  return createElement('div', this.$slots.default)
}
```

또한 특정 범위를 가지는 슬롯 `this.$scopedSlots`에서 VNode를 반환하는 함수로 접근할 수 있습니다.

```js
props: ['message'],
render: function (createElement) {
  // `<div><slot :text="message"></slot></div>`
  return createElement('div', [
    this.$scopedSlots.default({
      text: this.message
    })
  ])
}
```

범위 함수 슬롯을 렌더링 함수를 사용하여 하위 컴포넌트로 전달하려면 VNode 데이터에서 `scopedSlots` 필드를 사용하십시오.

```js
render: function (createElement) {
  return createElement('div', [
    createElement('child', {
      // 데이터 객체의 `scopedSlots`를 다음 형식으로 전달합니다
      // { name: props => VNode | Array<VNode> }
      scopedSlots: {
        default: function (props) {
          return createElement('span', props.text)
        }
      }
    })
  ])
}
```

### JSX

`render` 함수를 많이 작성하면 다음과 같이 작성하는 것이 고통스럽게 느껴질 수 있습니다.

```js
createElement(
  "anchored-heading",
  {
    props: {
      level: 1,
    },
  },
  [createElement("span", "Hello"), " world!"]
);
```

템플릿 버전이 아래 처럼 너무 간단한 경우에 특히 더 그럴 것 입니다.

```html
<anchored-heading :level="1"> <span>Hello</span> world! </anchored-heading>
```

그래서 Vue와 JSX를 함께 사용하기 위해 Babel plugin를 이용할 수 있습니다.

```js
import AnchoredHeading from "./AnchoredHeading.vue";

new Vue({
  el: "#demo",
  render: function (h) {
    return (
      <AnchoredHeading level={1}>
        <span>Hello</span> world!
      </AnchoredHeading>
    );
  },
});
```

> `createElement` 를 별칭 h 로 쓰는것은 공통된 관습입니다. 또한 JSX 를 사용할 때는 h 로 사용해야합니다.

## 함수형 컴포넌트

앞에 작성한 anchor를 가지는 heading 컴포넌트는 비교적 간단합니다. 어떤 상태도 없고 전달된 상태를 감시하며 라이프사이클 관련 메소드도 없습니다. 실제로 단지 props를 가지는 기능일 뿐입니다.

이와 같은 경우, 컴포넌트를 `함수형 또는 기능적`으로 표시할 수 있습니다. 즉, 컴포넌트가 상태가 없고(`data` 없음) 인스턴스 화 되지 않은 경우(`this` 컨텍스트가 없음)를 말합니다. **함수형 컴포넌트** 는 다음과 같습니다.

```js
Vue.component('my-component', {
  functional: true,
  // Props는 선택사항입니다.
  props: {
    // ...
  }
  // 인스턴스의 부족함을 보완하기 위해
  // 이제 2번째에 컨텍스트 인수가 제공됩니다.
  render: function (createElement, context) {
    // ...
  },
})
```
