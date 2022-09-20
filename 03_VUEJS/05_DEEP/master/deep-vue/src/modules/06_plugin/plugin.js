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
