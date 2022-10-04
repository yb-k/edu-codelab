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
