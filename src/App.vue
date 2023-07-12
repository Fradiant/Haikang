<template>
  <div id="mainApp" class="page-wrap" element-loading-text="子应用加载中">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      transitionName: ''
    };
  },
  watch: {},
  created() {
    // 解决F5刷新时store数据丢失的问题，在页面加载时读取sessionStorage里面的状态信息
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem('store'))
        )
      );
      sessionStorage.removeItem('store');
    }
    // 在页面刷新时将vuex里面的信息保存到sessionStorage里，beforeunload事件在页面刷新时触发
    window.addEventListener('beforeunload', () => {
      sessionStorage.getItem('store', JSON.stringify(this.$store.state));
    });
  },
  methods: {

  }
};
</script>

<style>
#mainApp {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  height: 100%;
  min-width: 1200px;
  overflow-x: hidden;
}
.page-wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.el-select-dropdown .el-popper .detailDialog_select-popper{
  z-index:10001 !important;
}
</style>
