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

# Advanced

## 애플리케이션 구조

실제로 Vuex는 코드 구조를 제한하지는 않습니다. 이보다 아래에 있는 상위 수준 원칙을 강요합니다.

애플리케이션 레벨의 **상태**는 중앙 집중된 저장소 입니다.

상태를 변경시키는 **유일한 방법**은 동기 트랜잭션인 `mutations` 를 커밋하는 것입니다.

비동기식 로직은 캡슐화되어야하며 **액션** 으로 구성 됩니다.

## 플러그인

Vuex 저장소는 각 변이에 대한 훅을 노출하는 `plugins` 옵션을 허용합니다. Vuex 플러그인은 저장소를 유일한 전달인자로 받는 함수입니다.
