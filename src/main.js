import Vue from "vue";
import App from "./App";
import router from "./router";
import axios from "axios";
import ElementUI from "element-ui";
import resetMessage from "./utils/message"; // 重写message弹提示
import "element-ui/lib/theme-chalk/index.css";
import "./assets/css/global.css";
import "./assets/css/element.css";
import "../iconfont";
import store from "./store";
import "./utils/noEmoji";
import "./utils/copy";
// import Directives from './utils/drag';
import "./utils/drag";
import VForm from "vform-builds"; // 引入VForm库
import "vform-builds/dist/VFormDesigner.css"; // 引入VForm样式
// import "@koala-form/fes-plugin";

Vue.config.productionTip = false;
Vue.use(VForm); // 全局注册VForm(同时注册了v-form-designer和v-form-render组件)
Vue.use(ElementUI);
// Vue.use(Directives);
// Vue.use(axios);
Vue.prototype.$message = resetMessage; // 一定要放在 Vue.use(ElementUI) 后面，因为是重写，要覆盖

new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
