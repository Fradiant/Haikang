import Vue from "vue";
import Router from "vue-router";
import store from "../store/index";
Vue.use(Router);

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "登陆页",
    component: () => import("@/components/login/login.vue")
  },
  {
    path: "/mainHeader",
    name: "mainHeader",
    component: () => import("@/components/main/mainHeader.vue")
  },
  {
    path: "/Index",
    name: "Index",
    meta: { auth: true },
    component: () => import("@/components/main/Index.vue"),
    children: [
      {
        path: "system/role",
        component: () => import("../components/index/system/role.vue"),
        name: "表单管理"
      },
      {
        path: "system/role/add",
        component: () => import("../components/index/system/roleAdd.vue"),
        name: "添加"
      },
      {
        path: "system/authority",
        component: () => import("../components/index/system/authority.vue"),
        name: "动画演示"
      },
      {
        path: "system/user",
        component: () => import("../components/index/system/user.vue"),
        name: "弹框管理"
      },
      {
        path: "person",
        component: () => import("../components/index/person.vue"),
        name: "滚动条"
      },
      {
        path: "config",
        component: () => import("../components/index/config.vue"),
        name: "设置"
      },
      {
        path: "lowCode",
        component: () => import("../components/LowCode/index.vue"),
        name: "低代码"
      },
      {
        path: "lowCode2",
        component: () => import("../components/LowCode/index2.vue"),
        name: "低代码2"
      },
      {
        path: "element",
        component: () => import("../components/element/element.vue"),
        name: "组件测试"
      }
    ]
  }
];
const router = new Router({
  mode: "history",
  routes
});
router.beforeEach((to, from, next) => {
  try {
    if (to.matched.some(m => m.meta.auth) && from.path !== "/login") {
      // 对路由进行验证
      if (store.state.token === true) {
        console.log(to, from);
        console.log("[beforeEach] \nto = " + to.path + ";\nfrom =" + from.path);
        store.commit("changeRouteHistory", [from, to]);
        next();
      } else {
        // 未登录则跳转到登陆界面，query:{ Rurl: to.fullPath}表示把当前路由信息传递过去方便登录后跳转回来；
        next({ path: "/login" });
      }
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    next(false);
  }
});
export default router;
