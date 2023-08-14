<template>
  <div class="attendance-app" id="teamManagerApp">
    <div class="app-wrapper main " :class="{ hideSidebar: isCollapse }">
      <div class="sideBar sidebar-container ">
        <div class="kqLogo">
          <div class="appNameClass" v-show="!isCollapse">团队管理</div>
          <div>
            <template>
              <i class="el-icon-s-operation" style="cursor: pointer; font-size: 18px;"
                @click="isCollapse = !isCollapse"></i>
              <span slot="title"></span>
            </template>
          </div>
        </div>
        <el-menu ref="user" :default-active="$route.path" class="el-menu-vertical-demo" unique-opened router
          @open="handleOpen" @close="handleClose" :collapse="isCollapse">
          <template v-for="(item, index) in menuData">
            <el-submenu v-if="item.children" :index="index + ''" :key="index">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item v-for="(i, indexChildren) in item.children" :key="indexChildren" :index="i.path">
                <i :class="i.icon"></i>
                <span>{{ i.name }}</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else :key="index + 'else'" :index="item.path" style="border:none">
              <i :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </div>
      <div class="main-container">
        <transition-group name="fade" mode="out-in" appear>
          <template v-if="isRefresh">
            <el-breadcrumb key="1" separator="/" class="el-breadcrumb app-breadcrumb breadcrumb-container"
              v-if="pathList.length == 1">
              <template>
                <el-breadcrumb-item>
                  <span class="no-redirect"> {{ pathList.name }} </span>
                </el-breadcrumb-item>
              </template>
            </el-breadcrumb>
          </template>

          <span v-for="(item, index) in pathList" :key="`item-${index}`" :class="`item item-${index}`"
            v-show="isRefresh">
            <el-breadcrumb separator="/" class="el-breadcrumb app-breadcrumb breadcrumb-container">
              <span>
                <template v-if="pathList.length == 1">
                  <el-breadcrumb-item>
                    <span class="no-redirect"> {{ item.name }} </span>
                  </el-breadcrumb-item>
                </template>
                <template v-else>
                  <el-breadcrumb-item :to="{ path: item.path }">
                    <span class="redirect"> {{ item.name }} </span>
                  </el-breadcrumb-item>
                </template>
              </span>
              <span v-show="item.name && index == 0" role="presentation" class="el-breadcrumb__separator">/</span>
            </el-breadcrumb>
          </span>
        </transition-group>
        <section class="app-main">
          <transition :name="transitionName" mode="out-in" appear>
            <router-view></router-view>
          </transition>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "mainContent",
    data () {
      return {
        isCollapse: false,
        transitionName: "",
        isRefresh: true,
        menuData: [
          {
            name: "基础应用",
            icon: "el-icon-menu",
            children: [
              {
                name: "表单管理",
                path: "/Index/system/role"
              },
              {
                name: "动画演示",
                path: "/Index/system/authority"
              },
              {
                name: "弹框管理",
                path: "/Index/system/user"
              }
            ]
          },
          {
            name: "测试应用",
            icon: "el-icon-setting",
            children: [
              {
                name: "低代码1",
                path: "/Index/index"
              },
              {
                name: "低代码2",
                path: "/Index/index2"
              }
            ]
          },
          {
            name: "组件测试",
            icon: "el-icon-setting",
            children: [
              {
                name: "组件测试1",
                path: "/Index/element"
              },
            ]
          },
          {
            name: "组件封装",
            icon: "el-icon-setting",
            children: [
              {
                name: "表格",
                path: "/Index/Table"
              },
              {
                name: "卡片",
                path: "/Index/Card"
              },
            ]
          },
          {
            name: "滚动条",
            path: "/Index/person",
            icon: "el-icon-document"
          },
          {
            name: "设置",
            path: "/Index/config",
            icon: "el-icon-setting"
          }
        ]
      };
    },
    computed: {
      pathList: function () {
        let List = this.$store.state.routeHistory;
        if (
          List[1].path.indexOf(List[0].path) !== -1 &&
          List[0].name !== "Index"
        ) {
          console.log(List);
          return List;
        }
        console.log(List[1]);

        return [List[1]];
      }
    },
    watch: {
      isCollapse (newVal) {
        this.$emit("input-value-update", newVal);
      },
      // 使用watch 监听$router的变化
      $route (to, from) {
        this.isRefresh = false;
        setTimeout(() => {
          this.isRefresh = true;
        }, 500);

        // 如果to索引大于from索引,判断为前进状态,反之则为后退状态
        if (to.meta.index > from.meta.index) {
          // 设置动画名称
          this.transitionName = "slide-left";
        } else {
          this.transitionName = "slide-right";
        }
      }
    },
    methods: {
      // 父组件获取数据
      getVal () {
        return this.isCollapse;
      },
      handleOpen (key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose () { }
    }
  };
</script>
<style scoped>
  #teamManagerApp {
    height: 100%;
  }

  .app-wrapper {
    display: flex;
    position: relative;
    height: 100%;
    width: 100%;
    background-color: #f6f7fb;
  }

  .sidebar-container {
    background-color: #fff;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-bottom: 0;
    overflow-y: auto;
    box-shadow: 0 1px 4px 0 rgb(0 22 43 / 12%);
  }

  .sidebar-container>>>.el-menu {
    border-right: 0px;
  }

  .kqLogo {
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

  .appNameClass {
    font-weight: 600;
  }

  .kqLogo .is-active {
    transform: rotate(180deg);
  }

  .kqLogo .icon-shouqi {
    color: #536281;
    cursor: pointer;
  }

  .main-container {
    min-height: 100%;
    transition: margin-left 0.3s ease-in-out;
    margin-left: 224px;
    position: relative;
    width: calc(100% - 224px);
    height: 100%;
    padding: 0px 16px;
    box-sizing: border-box;
  }

  .hideSidebar .main-container {
    margin-left: 64px !important;
    width: calc(100% - 64px);
    transition: margin-left 0.3s ease-in-out;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 224px;
    min-height: 400px;
  }

  /* 面包屑 */
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 52px;
    color: #8898aa;
  }

  .breadcrumb-container {
    float: left;
  }

  .app-breadcrumb.el-breadcrumb .no-redirect {
    color: #32325d;
    cursor: text;
  }

  .app-breadcrumb.el-breadcrumb .redirect {
    color: #8898aa;
    cursor: pointer;
  }

  .app-breadcrumb.el-breadcrumb .redirect:hover {
    color: #3172f6;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s;
  }

  .fade-enter {
    opacity: 0;
    transform: translateX(30px);
  }

  .fade-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  .el-breadcrumb__item:last-child .el-breadcrumb__inner,
  .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover,
  .el-breadcrumb__item:last-child .el-breadcrumb__inner a,
  .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover {
    font-weight: 400;
    color: #89a;
    cursor: text;
  }

  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    will-change: transform;
    transition: all 500ms;
    position: absolute;
  }

  .slide-right-enter {
    opacity: 0;
    transform: translateX(30px);
  }

  .slide-right-leave-active {
    opacity: 0;
    transform: translateX(30px);
  }

  .slide-left-enter {
    opacity: 0;
    transform: translateX(30px);
  }

  .slide-left-leave-active {
    opacity: 0;
    transform: translateX(30px);
  }

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
</style>