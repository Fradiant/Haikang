<template>
  <div class="page-content">
    <div class="">
      <div class="application-box">
        <p class="myApp-desc">我的应用</p>

        <div class="application-list">
          <div class="">
            <router-link to="/Index/system/role" class="application-item">
              <img src="../../assets/logo/1.png" alt="" class="app-logo" />
              <span class="app-name">角色</span>
            </router-link>
          </div>
          <div class="">
            <div href="" class="application-item">
              <router-link to="/Index/system/authority" class="application-item">
                <img src="../../assets/logo/2.png" alt="" class="app-logo" />
              </router-link>
              <span class="app-name">权限</span>
            </div>
          </div>
          <div class="" @click="onChange(false)">
            <router-link to="/Index/system/user" class="application-item">
              <img src="../../assets/logo/3.png" alt="" class="app-logo" />
              <span class="app-name">用户</span>
            </router-link>
          </div>
          <div class="">
            <a href="" onclick="return false; " class="application-item">
              <img src="../../assets/logo/4.png" alt="" class="app-logo" />
              <span class="app-name">访客</span>
            </a>
          </div>
          <div class="">
            <a href="" onclick="return false; " class="application-item">
              <img src="../../assets/logo/5.png" alt="" class="app-logo" />
              <span class="app-name">可视对讲</span>
            </a>
          </div>
          <div class="">
            <a href="" onclick="return false; " class="application-item">
              <img src="../../assets/logo/6.png" alt="" class="app-logo" />
              <span class="app-name">流量卡管理</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="">
      <div class="application-box">
        <p class="myApp-desc">系统配置</p>
        <div class="application-list">
          <div class="">
            <router-link to="/Index/person" class="application-item">
              <img src="../../assets/logo/7.png" alt="" class="app-logo" />
              <span class="app-name">人员管理</span>
            </router-link>
          </div>
          <div class="">
            <a href="" onclick="return false; " class="application-item">
              <img src="../../assets/logo/8.png" alt="" class="app-logo" />
              <span class="app-name">账号与权限</span>
            </a>
          </div>
          <div class="">
            <a href="" onclick="return false; " class="application-item">
              <img src="../../assets/logo/9.png" alt="" class="app-logo" />
              <span class="app-name">设备管理</span>
            </a>
          </div>
          <div class="">
            <a href="" onclick="return false; " class="application-item">
              <img src="../../assets/logo/10.png" alt="" class="app-logo" />
              <span class="app-name">团队信息</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class=""></div>
  </div>
</template>
<script>
export default {
  name: 'mainWorkPlace',
  data() {
    return {};
  },

  created() { },
  methods: {
    onChange(flag) {
      console.log('changeMain');
      if (flag) {
        this.$emit('changeMain', true);
      } else {
        this.$emit('changeMain', false);
      }
    }
  }
};
</script>
<style scoped>
.index-content {
  flex: 1;
  max-height: calc(100% - 56px);
  overflow: hidden;
}

.page-content {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding: 24px 250px 24px 238px;
  background-color: #fff;
}

.page-content .myApp-desc {
  font-weight: 700;
  font-size: 16px;
  color: #32325d;
}

.page-content .application-list .application-item .app-logo {
  width: 60px;
  height: 60px;
  border-radius: 8px;
}

.page-content .application-list {
  display: grid;
  padding-top: 24px;
  padding-bottom: 32px;
  grid-template-columns: repeat(auto-fit, 60px);
  grid-gap: 32px 72px;
}

.page-content .application-list .application-item:last-child {
  margin-right: 0;
}

.page-content .application-list .application-item {
  min-width: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

a {
  color: #3172f6;
  text-decoration: none;
}

.page-content .application-list .application-item .app-logo {
  width: 60px;
  height: 60px;
  border-radius: 8px;
}

.page-content .application-list .application-item .app-logo:hover {
  transform: scale(1.05);
  transition: all 0.3s;
}

.page-content .application-list .application-item .app-name {
  height: 20px;
  font-size: 14px;
  line-height: 20px;
  color: #131416;
  margin-top: 12px;
}
</style>
