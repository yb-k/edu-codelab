## Getters

computed 속성과 비슷한 특성을 가진다. computed 속성과 같이 getter의 결과는 종속성에 따라 캐쉬되고, 일부 종속성이 변경된 경우에만 다시 재계산한다.

Getters는 첫 번째 전달인자로 `state`를 받습니다.

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

getters 는 `store.getters` 객체를 통해 접근 가능합니다.

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

메소드를 통해 접근하는 getter는 호출 할 때마다 실행되며 결과가 캐쉬되지 않습니다.

### getter 활용

getter를 활용하면 원본 데이터를 변경하지 않고, 필요한 형태로 가공할 수 있습니다.

```js
getters: {
  // 01012341234 -> 010-1234-1234
  getPhoneNumber: () => {
    return withHypen(state.phone);
  },
  // 123456789 -> 123,456,789원
  getPrice : () => {
    return whthComma(state.price + '원');
  }
}
```
