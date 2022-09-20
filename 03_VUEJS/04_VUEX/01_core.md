## 핵심 컨셉

![vuex](https://v3.vuex.vuejs.org/vuex.png)
[자료 출처](https://v3.vuex.vuejs.org/kr/guide/)

### 스토어(store)

Vuex는 `state`, `mutations`, `action`, `getters` 4가지 형태로 관리가 되며, 이때 이 관리 포인트는 store 패턴을 사용하고 통상 store라고 불린다. 이 4가지는 서로간의 간접적으로 영향이 있으며 **단방향 데이터 흐름**으로 볼수 있다.

### 상태(`state`)

프로젝트 내에서 공통으로 사용되는 변수를 정의합니다. 또한 프로젝트 내의 모든 곳에서 참조 및 사용이 가능합니다.

### 변이(`mutations`)

Vuex 저장소에서 **`state`를 변경하는 유일한 방법**은 `mutations` 를 사용하는 것입니다.

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

mutations 핸들러는 직접 호출 할 수 없다. 타입이 `increment` 인 변이 핸들러를 호출 하려면 `store.commit('increment')` 를 사용해야한다.

#### 페이로드를 가진 commit

```js
// ...
mutations: {
  incrementPayload (state, n) {
    state.count += n
  }
}
```

위와 같은 mutations 의 increment 를 사용하려면 store.commit에 추가 전달인자를 사용 할 수있다.

```js
store.commit("incrementPayload", 10);
```

대부분의 경우 페이로드는 여러 필드를 포함할 수 있는 객체여야하며, 객체를 사용하는 것이 더 이해하기 쉽다.

```js
// ...
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
/* someView.vue */
store.commit('increment', {
  amount: 10
})

```

### 액션(`action`)

`action` 은 `mutations` 과 유사하지만 조금 다른 특징을 가집니다.

- 직접적으로 상태를 **변화시키지 않습니다.**
- 상태를 변이시키는 대신 액션으로 **mutation에 대한 커밋**을 합니다.
- 작업에는 임의의 **비동기 작업**이 포함될 수 있습니다.

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

#### 디스패치 액션

```js
actions: {
  increment ({ commit }) {
    commit('increment')
  }
}
```

액션을 트리거 할때는 `store.dispatch` 메소드를 사용합니다.

```js
store.dispatch("increment");
```

mutation 에서는 *비동기적인 상태변이를 사용할 수 없었*지만, **액션에서는 비동기 작업을 수행**할 수있습니다.

```js
actions: {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('increment')
    }, 1000)
  }
}
```

### 액션의 활용

`store.dispatch` 가 트리거된 액션 핸들러에 의해 반환된 `Promise` 를 처리 가능합니다.

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

프로미스를 반환하고 다음과 같이 처리 할 수 있습니다.

```js
store.dispatch("actionA").then(() => {
  // ...
});
```

JavaScript 의 기능중 async/await 을 이용해 작업을 구성할 수 도 있습니다.

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
