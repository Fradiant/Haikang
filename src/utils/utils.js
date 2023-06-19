import store from '../store/index';

export default{
  logout() {
    sessionStorage.clear();
    store.commit('setUserPhone', '');
    store.commit('setAuth', {});
  }
};