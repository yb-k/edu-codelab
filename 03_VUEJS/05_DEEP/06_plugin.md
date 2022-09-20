# Plugin

## 서론

`vue`에서는 Plugin을 작성하여 mixin 또는 전역 메소드에 커스텀한 플러그인을 추가할 수 있습니다.

이번 챕터에서는 custom modal popup에 관련되어 간단한 플러그인을 작성해봅니다.

## 실습

`src/modules/06_plugin/template.js`

```js
export const HTML_ALERT =
  "" +
  `<div class="custom-modal-container">
    <div class="modal">
      <div class="modal-content">
        <span class="modal-close" data-action="close">&times;</span>
        <p></p>
        <div><button type="button" data-action="submit">OK</button></div>
      </div>
    </div>
  </div>`;

export const HTML_CONFIRM =
  "" +
  `<div class="custom-modal-container">
  <div class="modal">
    <div class="modal-content">
      <span class="modal-close" data-action="close">&times;</span>
      <p></p>
      <div><button type="button" data-action="submit">OK</button></div>
      <div><button type="button" data-action="cancel">CANCEL</button></div>
    </div>
  </div>
</div>`;
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
import { HTML_ALERT, HTML_CONFIRM } from "./template";

/**
 * HTML to Element
 * @param {string} htmlString
 * @returns {Element}
 */
function createElementFromHTML(htmlString) {
  const div = document.createElement("div");
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

/**
 * alert 모달 팝업
 * @param {string} content
 * @returns {Promise}
 */
function alert(content = "") {
  return new Promise((resolve) => {
    const el = createElementFromHTML(HTML_ALERT);
    el.querySelector("p").innerHTML = content;
    el.querySelectorAll("[data-action]").forEach((target) => {
      const action = target.getAttribute("data-action");
      target.addEventListener("click", () => {
        resolve(action);
        el.remove();
      });
    });
    document.body.appendChild(el);
  });
}
/**
 * confirm 모달 팝업
 * @param {string} content
 * @returns {Promise}
 */
function confirm(content) {
  return new Promise((resolve) => {
    const el = createElementFromHTML(HTML_CONFIRM);
    el.querySelector("p").innerHTML = content;
    el.querySelectorAll("[data-action]").forEach((target) => {
      const action = target.getAttribute("data-action");
      target.addEventListener("click", () => {
        resolve(action);
        el.remove();
      });
    });
    document.body.appendChild(el);
  });
}

function install(Vue, option) {
  Vue.$alert = alert;
  Vue.$confirm = confirm;
  Vue.prototype.$alert = alert;
  Vue.prototype.$confirm = confirm;
}

export default install;
```

`src/modules/06_plugin/CustomPopup.vue`

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
  name: "custom-popup",
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
import CustomPopup from "./CustomPopup.vue";

Vue.use(CustomPopupPlugin);
Vue.component("custom-popup", CustomPopup);

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
