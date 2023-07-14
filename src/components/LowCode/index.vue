<template>
  <div class="teamInfoPages">
    <v-form-designer></v-form-designer>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style>
body {
  margin: 0; /* 如果页面出现垂直滚动条，则加入此行CSS以消除之 */
}
.teamInfoPages >>> .el-container.center-layout-container{
    min-width: 850px !important;
}
</style>
