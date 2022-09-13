# Vuex

## What is Vuex?

Vuex는 Vue.js 애플리케이션에 대한 **상태 관리 패턴** + **라이브러리** 입니다. 애플리케이션의 모든 컴포넌트에 대한 중앙 집중식 저장소 역할을 하며 예측 가능한 방식으로 상태를 변경할 수 있습니다. 또한 Vue의 공식 devtools 확장 프로그램 (opens new window)과 통합되어 설정 시간이 필요 없는 디버깅 및 상태 스냅 샷 내보내기/가져오기와 같은 고급 기능을 제공합니다.

### 상태 관리 패턴이란?

```js
new Vue({
  // 상태
  data() {
    return {
      count: 0,
    };
  },
  // 뷰
  template: `
    <div>{{ count }}</div>
  `,
  // 액션
  methods: {
    increment() {
      this.count++;
    },
  },
});
```

- 상태 : 상태는 앱을 작동하는 원본 소스
- 뷰 : 상태의 **선언적 매핑**
- 액션 : 뷰에서 사용자 입력에 대해 반응적으로 상태를 바꿈

상태는 오로지 액션을 통해서만 바뀔 수 있음.

![vue 흐름도](https://v3.vuex.vuejs.org/flow.png)

공통의 상태를 공유하는 여러 컴포넌트가 있는 경우 단순함이 빠르게 저하됨.

- 여러 뷰가 같은 상태에 의존 할때
- 서로 다른 뷰의 작업은 동일한 상태를 반영해야 할 때

이런 문제들을 해결하기 위해 컴포넌트에서 공유된 상태를 추출해 전역 싱글톤으로 관리함. => Vuex

![vuex](https://v3.vuex.vuejs.org/vuex.png)

# 시작하기

## 직접 다운로드/CDN

[unpkg](https://unpkg.com/vuex)

Unpkg.com (opens new window)은 NPM 기반 CDN 링크를 제공합니다. 위의 링크는 항상 NPM의 최신 릴리스를 가리킵니다. `https://unpkg.com/vuex@2.0.0`과 같은 URL을 통해 특정 버전/태그를 사용할 수도 있습니다.

`Vue` 뒤에 `vuex`를 추가하면 자동으로 설치됩니다:

```html
<script src="/path/to/vue.js"></script>
<script src="/path/to/vuex.js"></script>
```

### NPM or Yarn

```shell
npm install vuex --save
```

```shell
yarn add vuex
```

모듈 시스템과 함께 사용하면 `Vue.use()`를 통해 Vuex를 명시적으로 추가해야 합니다.

# 핵심 컨셉

### 상태

#### 단일 상태 트리

Vuex 는 단일 상태 트리를 사용합니다. 즉, 이 단일 객체는 모든 애플리케이션 수준의 상태를 포함하며 "원본 소스" 역할을 합니다. 이는 각 애플리케이션마다 하나의 저장소만 갖게 된다는 것을 의미합니다. 단일 상태 트리를 사용하면 특정 상태를 쉽게 찾을 수 있으므로 디버깅을 위해 현재 앱 상태의 스냅 샷을 쉽게 가져올 수 있습니다.

### Vuex 상태를 Vue 컴포넌트에서 가져오기

가장 간단한 방법 - Computed 속성

```js
// Counter 컴포넌트를 만듭니다
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count() {
      return store.state.count;
    },
  },
};
```

`store.state.count` 가 변화되면 computed 속성에서 이를 감지하여 관련된 DOM 의 업데이트가 이루어짐.

Vuex는 `store` 옵션(`Vue.use(Vuex)`에 의해 가능)으로 루트 컴포넌트의 모든 자식 컴포넌트에 저장소를 "주입"하는 메커니즘을 제공

```js
const app = new Vue({
  el: "#app",
  // "store" 옵션을 사용하여 저장소를 제공하십시오.
  // 그러면 모든 하위 컴포넌트에 저장소 인스턴스가 삽입됩니다.
  store,
  components: { Counter },
  template: `
    <div class="app">
      <counter></counter>
    </div>
  `,
});
```

위와 같이 작성하면, `this.$store` 로 사용할 수 있음.

### `mapState` 헬퍼

컴포넌트가 여러 저장소 상태 속성이나 getter를 사용해야하는 경우 computed 속성을 모두 선언하는것은 반복적이고 효율적이지 못함.

```js
// 독립 실행 형 빌드에서 헬퍼가 Vuex.mapState로 노출됩니다.
import { mapState } from "vuex";

export default {
  // ...
  computed: mapState({
    // 화살표 함수는 코드를 매우 간결하게 만들어 줍니다!
    count: (state) => state.count,

    // 문자열 값 'count'를 전달하는 것은 `state => state.count`와 같습니다.
    countAlias: "count",

    // `this`를 사용하여 로컬 상태에 액세스하려면 일반적인 함수를 사용해야합니다
    countPlusLocalState(state) {
      return state.count + this.localCount;
    },
  }),
};
```

매핑된 computed 속성의 이름이 상태 하위 트리 이름과 같을 때 문자열 배열을 `mapState` 에 전달 가능

```js
computed: mapState([
  // this.count를 store.state.count에 매핑 합니다.
  "count",
]);
```

## Getters

computed 속성과 비슷, computed 속성과 같이 getter의 결과는 종속성에 따라 캐쉬되고, 일부 종속성이 변경된 경우에만 다시 재계산.

Getters는 첫 번째 전달인자로 상태를 받습니다.

```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: "...", done: true },
      { id: 2, text: "...", done: false },
    ],
  },
  getters: {
    doneTodos: (state) => {
      return state.todos.filter((todo) => todo.done);
    },
  },
});
```

### 속성 유형 접근

getters 는 `store.getters` 객체에 노출되고, 성성으로 값에 접근 가능

```js
store.getters.doneTodos; // -> [{ id: 1, text: '...', done: true }]
```

Getters는 두 번째 전달인자로 다른 getter도 받게됩니다.

```js
getters: {
  // ...
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length
  }
}

...

store.getters.doneTodosCount // -> 1
```

### 메소드 유형 접근

```js
 getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}
...
Store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
```

메소드를 통해 접근하는 getter는 호출 할 때마다 실행되며 결과가 캐쉬되지 않음.

## mutations

Vuex 저장소에서 state를 변경하는 유일한 방법은 mutations 를 사용하는 것이다.

```js
const store = new Vuex.Store({
  state: {
    count: 1,
  },
  mutations: {
    increment(state) {
      // 상태 변이
      state.count++;
    },
  },
});
```

mutations 핸들러는 직접 호출 할 수 없다.타입이 `increment` 인 변이 핸들러를 호출 하려면 `store.commit('increment')` 를 사용해야한다.

### 페이로드를 가진 commit

```js
// ...
mutations: {
  increment (state, n) {
    state.count += n
  }
}
```

위와 같은 mutations 의 increment 를 사용하려면 store.commit에 추가 전달인자를 사용 할 수있다.

```js
store.commit("increment", 10);
```

대부분의 경우 페이로드는 여러 필드를 포함할 수 있는 객체여야하며, 객체를 사용하는 것이 더 이해하기 쉽다.

```js
// ...
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
...

store.commit('increment', {
  amount: 10
})

```

### 변이 타입에 상수 사용

다양한 Flux 구현에서 변이 유형에 상수를 사용하는 것은 일반적인 패턴입니다.

```js
// mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION'

// store.js
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'

const store = new Vuex.Store({
  state: { ... },
  mutations: {
    // ES2015에서 계산 된 프로퍼티 이름 기능을 사용하여
    // 상수를 함수 이름으로 사용할 수 있습니다
    [SOME_MUTATION] (state) {
      // 변이 상태
    }
  }
})
```

#### mutations 는 동기적으로 사용해야함.

mutation 내에서 비동기 콜백을 사용하는것은 추적 되지 않음.

## action

actio 은 mutations 과 유사하지만 조금 다른 특징을 가짐.

- 상태를 변이시키는 대신 액션으로 mutation에 대한 커밋을 함.
- 작업에는 임의의 비동기 작업이 포함될 수 있음.

```js
const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
  actions: {
    increment(context) {
      context.commit("increment");
    },
  },
});
```

### 디스패치 액션

```js
actions: {
  increment ({ commit }) {
    commit('increment')
  }
}
```

액션은 `store.dispatch` 메소드를 사용

```js
store.dispatch("increment");
```

mutation 에서는 비동기적인 상태변이를 사용할 수 없었지만, 액션에서는 비동기 작업을 수행할 수있음.

```js
actions: {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('increment')
    }, 1000)
  }
}
```

### 컴포넌트 내부에서 디스패치 액션 사용하기(mapActions)

`this.$store.dispatch('xxx')`를 사용하여 컴포넌트에서 액션을 디스패치하거나 컴포넌트 메소드를 `store.dispatch` 호출에 매핑하는 mapActions 헬퍼를 사용할 수 있습니다 (루트 `store` 주입 필요)

```js
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment' // this.increment()을 this.$store.dispatch('increment')에 매핑

      // mapActions는 페이로드를 지원합니다.
      'incrementBy' // this.incrementBy(amount)를 this.$store.dispatch('incrementBy', amount)에 매핑
    ]),
    ...mapActions({
      add: 'increment' // this.add()을 this.$store.dispatch('increment')에 매핑
    })
  }
}
```

### 액션 구성하기

`store.dispatch` 가 트리거된 액션 핸들러에 의해 반환된 Promise 를 처리 가능

```js
actions: {
  actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  }
}
```

프로미스를 반환하고 다음과 같이 처리 가능

```js
store.dispatch("actionA").then(() => {
  // ...
});
```

JavaScript 의 기능중 async/await 을 이용해 작업을 구성할 수 도 있음.

```js
// getData() 및 getOtherData()가 Promise를 반환한다고 가정합니다.
actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // actionA가 끝나기를 기다립니다.
    commit('gotOtherData', await getOtherData())
  }
}
```

## 모듈

단일 상태 트리를 사용하기 때문에 모든 상태가 하나의 큰 객체안에 포함됨. 그러나 규모가 커짐에 따라 저장소가 너무 비대해지는것을 막기 위해 Vuex 저장소를 모듈화 할 수 있음.

```js
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA'의 상태
store.state.b // -> moduleB'의 상태
```

### 지역 상태 모듈

모듈의 변이와 getter 내부에서 첫 번째 전달인자는 모듈의 지역 상태 가됩니다.

```js
const moduleA = {
  state: () => ({
    count: 0,
  }),
  mutations: {
    increment(state) {
      // state는 지역 모듈 상태 입니다
      state.count++;
    },
  },

  getters: {
    doubleCount(state) {
      return state.count * 2;
    },
  },
};

//else

const moduleA = {
  // 모듈 getters 내부, 루트 상태는 그들의 세 번째 전달인자로 노출
  getters: {
    sumWithRootCount(state, getters, rootState) {
      return state.count + rootState.count;
    },
  },
};
```

### 네임스페이스

만약 모듈이 독립적이거나 재사용되기를 원한다면, `namespaced: true`라고 네임스페이스에 명시하면 됩니다. 모듈이 등록될 때, 해당 모듈의 모든 getter, 액션/변이는 자동으로 등록된 모듈의 경로를 기반으로 네임스페이스가 지정됩니다.

```js
const store = new Vuex.Store({
  modules: {
    account: {
      namespaced: true,

      // 모듈 자산
      state: () => ({ ... }), // 모듈 상태는 이미 중첩되어 있고, 네임스페이스 옵션의 영향을 받지 않음
      getters: {
        isAdmin () { ... } // -> getters['account/isAdmin']
      },
      actions: {
        login () { ... } // -> dispatch('account/login')
      },
      mutations: {
        login () { ... } // -> commit('account/login')
      },

      // 중첩 모듈
      modules: {
        // 부모 모듈로부터 네임스페이스를 상속받음
        myPage: {
          state: () => ({ ... }),
          getters: {
            profile () { ... } // -> getters['account/profile']
          }
        },

        // 네임스페이스를 더 중첩
        posts: {
          namespaced: true,

          state: () => ({ ... }),
          getters: {
            popular () { ... } // -> getters['account/posts/popular']
          }
        }
      }
    }
  }
})
```

#### 네임스페이스 모듈 내부에서 전역 자산 접근

getters 의 3번째 인자 : `rootState`, 네 번째 인자 : `rootGetters` 를 통해 접근 가능

전역 네임스페이스의 액션을 디스패치하거나 변이를 커밋하려면 `dispatch`와 `commit`에 3번째 인자로 `{ root: true }`를 전달하면 됩니다.

```js
modules: {
  foo: {
    namespaced: true,

    getters: {
      // `getters`는 해당 모듈의 지역화된 getters
      // getters의 4번째 인자를 통해서 rootGetters 사용 가능
      someGetter (state, getters, rootState, rootGetters) {
        getters.someOtherGetter // -> 'foo/someOtherGetter'
        rootGetters.someOtherGetter // -> 'someOtherGetter'
      },
      someOtherGetter: state => { ... }
    },

    actions: {
      // 디스패치와 커밋도 해당 모듈의 지역화된 것
      // 전역 디스패치/커밋을 위한 `root` 옵션 설정 가능
      someAction ({ dispatch, commit, getters, rootGetters }) {
        getters.someGetter // -> 'foo/someGetter'
        rootGetters.someGetter // -> 'someGetter'

        dispatch('someOtherAction') // -> 'foo/someOtherAction'
        dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

        commit('someMutation') // -> 'foo/someMutation'
        commit('someMutation', null, { root: true }) // -> 'someMutation'
      },
      someOtherAction (ctx, payload) { ... }
    }
  }
}

```
