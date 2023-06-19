<template>
  <div class="attendance-app" id="teamManagerApp">
    <div class="app-wrapper main">
      <div class="sideBar sidebar-container">
        <div class="kqLogo">
          <div class="appNameClass" v-show="!isCollapse">团队管理</div>
          <div  >
            <template>
          <i class="el-icon-s-operation"
          style="cursor: pointer; font-size: 18px;"
          @click="isCollapse = !isCollapse"
          ></i>
          <span slot="title"></span>
        </template>
          </div>
    </div>
      <el-menu default-active="2-1" class="el-menu-vertical-demo" unique-opened @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item index="1-1">选项1</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
        </template>
        <el-menu-item index="2-1" >
        <i class="el-icon-document"></i>
        <span slot="title">选项1</span>
      </el-menu-item>
      </el-submenu>
      <el-menu-item index="3" >
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
</el-menu>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      isCollapse: false
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#teamManagerApp{
  height: 100%;
}
.app-wrapper{
  display: flex;
    position: relative;
    height: 100%;
    width: 100%;
    background-color: #f6f7fb;
}
.sidebar-container{
  background-color: #fff;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-bottom: 0;
    overflow-y: auto;
    box-shadow: 0 1px 4px 0 rgb(0 22 43 / 12%);
}
.sidebar-container >>> .el-menu{
  border-right:0px;
}
  .kqLogo{
    margin-top: 16px;
    font-size: 14px;
    color: #32325d;
    padding: 0 24px;
    height: 52px;
    line-height: 52px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .appNameClass{
    font-weight: 600;
  }
  .kqLogo .is-active {
    transform: rotate(180deg);
}
.kqLogo .icon-shouqi {
    color: #536281;
    cursor: pointer;
}
.icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

</style>
