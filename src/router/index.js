import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index';
Vue.use(Router);

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: '登陆页',
    component: () => import('@/components/login/login.vue')
  },
  {
    path: '/mainHeader',
    name: 'mainHeader',
    component: () => import('@/components/main/mainHeader.vue')
  },
  {
    path: '/Index',
    name: 'Index',
    component: () => import('@/components/main/Index.vue'),
    children: [
      {
        path: 'system/role',
        component: () => import('../components/index/system/role.vue'),
        name: '角色管理'
      },
      {
        path: 'system/role/add',
        component: () => import('../components/index/system/roleAdd.vue'),
        name: '添加'
      },
      {
        path: 'system/authority',
        component: () => import('../components/index/system/authority.vue'),
        name: '权限管理'
      },
      {
        path: 'system/user',
        component: () => import('../components/index/system/user.vue'),
        name: '用户管理'
      },
      {
        path: 'person',
        component: () => import('../components/index/person.vue'),
        name: '人员管理'
      },
      {
        path: 'config',
        component: () => import('../components/index/config.vue'),
        name: '设置'
      },
      {
        path: 'lowCode',
        // component: () => import('../components/LowCode/home.vue'),
        name: '设置'
      }
    ]
  }
];
const router = new Router({
  mode: 'history',
  routes
});
router.beforeEach((to, from, next) => {
  try {
    console.log(to, from);
    console.log('[beforeEach] \nto = ' + to.path + ';\nfrom =' + from.path);
    store.commit('changeRouteHistory', [from, to]);
    next();
  } catch (error) {
    console.error(error);
    next(false);
  }
});
export default router;
