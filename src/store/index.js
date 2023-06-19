import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import utils from '../utils/utils';
Vue.use(Vuex);

const store = new Vuex.Store({
  // 数据，相当于data
  state: {
    isMainPage: '',
    routeHistory: [],
    auth: {
      accessToken: '', // 令牌token
      expireTime: '', // 过期时间
      serverAddress: '' // 服务器地址
    },
    accout: {
      loginName: '', // 登录名称
      password: '' // md5加密后的密码
    }
  },
  getters: {},
  // 里面定义方法，操作state方发
  mutations: {
    changeMain(state, flag) {
      state.isMainPage = flag;
    },
    changeRouteHistory(state, array) {
      state.routeHistory = [];
      console.log(array);
      array.forEach(item => {
        if (item) {
          state.routeHistory.push({ name: item.name, path: item.path });
        }
      });
      console.log(state.routeHistory);
    },
    setUserPhone(state, value) {
      state.phone = value;
    },
    setAuth(state, authMap) {
      state.auth = authMap;
    }
  },
  // 操作异步操作mutation
  actions: {
    OPENAPI_Post({ dispatch }, params) {
      params.method = 'post';
      dispatch('OPENAPI_CfgTool', params);
    },
    OPENAPI_CfgTool({ state, params }) {
      const ajaxUrl = params.url;
      let headers = {
        'Content-Type': 'application/json;charset=UTF-8',
        'Cache-Control': 'no-cache'
      };
      if (params.headers !== undefined) {
        headers = params.headers;
      }
      const token = (state.auth && state.auth.accessToken) || '';
      if (token !== '') {
        headers.Authorization = token;
      }
      const timeout = 0;
      const showSuc = params.showSuc || false;
      const showWrong
        = typeof params.showWrong !== 'undefined' ? params.showWrong : true;
      const root = state.nowEntry;
      let jsonStr
        = typeof params.dataMap === 'undefined'
          ? ''
          : JSON.stringify(params.dataMap);
      if (params.headers !== undefined) {
        jsonStr = params.dataMap;
      }
      const option = {
        method: params.method,
        url: ajaxUrl,
        data: jsonStr,
        baseUrl: root,
        timeout,
        responseType: 'json',
        headers
      };
      axios(option)
        .then(res => {
          const response = res.data;
          const errorCode = response.code || res.code;
          const success = errorCode === '成功';
          if (showSuc && success) {
            this.$message.success('成功');
          } else if (!success) {
            if (showWrong) {
              let errorMsg = '';
              console.log(`errCode_${errorCode}`);
              errorMsg = state.$lang.errCode[`errCpde_${errorCode}`];

              if (errorMsg === undefined) {
                this.$message.error(state.$lang.errCode.errCode_501000);
              } else {
                this.$message.error(errorMsg);
              }
            }
            if (errorCode === 501001 || errorCode === 501002 || 501003) {
              setTimeout(() => {
                utils.logout();
              }, 1000);
            }
          }
          if (params.callback && params.callback instanceof Function) {
            params.callback(response);
          }
        })
        .catch(error => {
          if (error.response.status === 502) {
            utils.logout();
          }
          console.log('error', error, option.url, option.data);
        });
    }
  },
  modules: {}
});
export default store;
