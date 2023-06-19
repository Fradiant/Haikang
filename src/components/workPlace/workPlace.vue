<template>
  <section class="app-main">
    <div class="teamInfoPages">
      <h1>权限管理</h1>
      <el-button @click="fun">退出</el-button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'workPlace',
  data() {
    return {};
  },
  methods: {
    fun() {
      const path = '/login';
      this.$router.push({ path });
    }
  }
};
</script>
<style scoped>
.app-main {
  height: calc(100% - 52px);
  width: 100%;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #f6f7fb;
  padding-bottom: 12px;
  box-sizing: border-box;
}
.teamInfoPages {
  box-sizing: border-box;
  height: 100%;
  background: #fff;
  padding: 24px 16px 16px 24px;
  border-radius: 4px;
}
</style>
