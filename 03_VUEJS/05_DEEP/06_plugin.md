# Plugin

## 서론

`vue`에서는 Plugin을 작성하여 mixin 또는 전역 메소드에 커스텀한 플러그인을 추가할 수 있습니다.

이번 챕터에서는 modal popup에 대한 간단한 플러그인을 작성해봅니다.

## 실습

`src/modules/06_plugin/components/VAlert.vue`

```vue
<template>
  <div class="custom-modal-container">
    <div class="modal">
      <div class="modal-content">
        <span class="modal-close" @click="onAction('close')">&times;</span>
        <p>{{ content }}</p>
        <div><button type="button" @click="onAction('submit')">OK</button></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: "",
    };
  },
};
</script>
```

`src/modules/06_plugin/components/VConfirm.vue`

```vue
<template>
  <div class="custom-modal-container">
    <div class="modal">
      <div class="modal-content">
        <span class="modal-close" @click="onAction('close')">&times;</span>
        <p>{{ content }}</p>
        <div><button type="button" @click="onAction('submit')">OK</button></div>
        <div>
          <button type="button" @click="onAction('cancel')">CANCEL</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: "",
    };
  },
};
</script>
```

`src/modules/06_plugin/style.css`

```css
/* The Modal (background) */
.custom-modal-container .modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.custom-modal-container .modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.custom-modal-container .close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.custom-modal-container .close:hover,
.custom-modal-container .close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
```

`src/modules/06_plugin/plugin.js`

```js
import Alert from "./components/VAlert.vue";
import Confirm from "./components/VConfirm.vue";

export const createDivInBody = () => {
  const div = document.createElement("div");
  document.body.appendChild(div);
  return div;
};

function install(Vue, option) {
  /**
   * 전역 Alert 함수
   * @param {any} options
   * @returns {Promise}
   */
  function alert(content) {
    return new Promise((resolve) => {
      const div = createDivInBody();
      const vm = new Vue(Alert);
      vm.content = content;
      vm.onAction = function (action) {
        resolve(action);
        vm.$el.remove();
        vm.$destroy();
      };
      vm.$mount(div);
    });
  }

  /**
   * 전역 Confirm 함수
   * @param {any} options
   * @returns {Promise}
   */
  function confirm(content) {
    return new Promise((resolve) => {
      const div = createDivInBody();
      const vm = new Vue(Confirm);
      vm.content = content;
      vm.onAction = function (action) {
        resolve(action);
        vm.$el.remove();
        vm.$destroy();
      };
      vm.$mount(div);
    });
  }

  Vue.$alert = Vue.prototype.$alert = alert;
  Vue.$confirm = Vue.prototype.$confirm = confirm;
}

export default install;
```

`src/modules/06_plugin/ModalLayout.vue`

```vue
<template>
  <div class="custom-modal-container">
    <div class="modal">
      <div class="modal-content">
        <span class="modal-close" @click="$emit('onClose')">&times;</span>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "modal-layout",
};
</script>
```

`src/modules/06_plugin/PopupView.vue`

```vue
<template>
  <div>
    <button type="button" @click="openAlert">this.$alert('hello-alert')</button>
    <button type="button" @click="openConfirm">
      this.$confirm('hello-confirm')
    </button>
    <button type="button" @click="popup = 'custom'">custom popup show</button>
    <custom-popup v-if="popup === 'custom'" @onClose="popup = ''">
      <div>hello - custom - popup</div>
    </custom-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      popup: "",
    };
  },
  methods: {
    openAlert() {
      this.$alert("hello-alert").then((action) => alert(action));
    },
    openConfirm() {
      this.$confirm("hello-confirm").then((action) => alert(action));
    },
  },
};
</script>
```

`src/modules/06_plugin/index.js`

```js
import Vue from "vue";
import router from "../../router/index";
import "./style.css";
import CustomPopupPlugin from "./plugin";
import ModalLayout from "./components/ModalLayout.vue";

Vue.use(CustomPopupPlugin);
Vue.component("modal-layout", ModalLayout);

router.addRoute({
  path: "/custom-popup",
  name: "custom-popup",
  component: () => import(/* webpackChunkName: "popup" */ "./PopupView.vue"),
});
```

`src/modules/index.js`

```js
// 추가
import "./06_plugin";
```

`src/App.vue`

```html
<!-- 추가 -->
<router-link to="/custom-popup">custom-popup</router-link> |
```
