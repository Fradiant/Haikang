<template>
  <div class="index-header" style="height:100%">
    <div
      class="header-left  "
      :class="{ logoTransitionIcon: isCollapse, logoTransition: !isCollapse }"
      @click="onChange"
    >
      <img
        v-show="isCollapse"
        src="../../assets/logo/logo2.png"
        class="iconLogo "
      />
      <img
        v-show="!isCollapse"
        src="../../assets/logo/logo1.png"
        class="logoHk header-left__width"
      />
    </div>
    <div class="header-right">
      <div class="nav-left" @click="onChange">
        <nav class="nav-item">
          <p>首页</p>
        </nav>
      </div>
      <div class="right-menu">
        <section class="file-center-btn default-active-item">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-wenjianjia"></use>
          </svg>
          <span class="left-desc">文件中心</span>
        </section>
        <section class="switch-team default-active-item" @click="onClick">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-gerenzhongxin"></use>
          </svg>
          <span class="left-desc ellipsisTeam">{{ teamName }}</span>
          <svg
            class="icon icon-jiantou"
            :class="{ 'icon-jiantou-active': !isClick }"
            aria-hidden="true"
          >
            <use xlink:href="#icon-xiajiantou"></use>
          </svg>
          <div class="team-popup" v-show="isClick">
            <div class="list">
              <div
                :class="{ 'team-item-active': item === teamName }"
                class="team-item "
                v-for="(item, index) in list"
                :key="index"
                @click="changeTeam(item)"
              >
                <span class="ellipsisName" style="max-width: 115px;">{{
                  item
                }}</span>
                <svg class="icon" aria-hidden="true" v-show="item === teamName">
                  <use xlink:href="#icon-duihao"></use>
                </svg>
              </div>
            </div>
            <img
              src="../../assets/logo/jiantou.png"
              alt=""
              class="icon-jiantou1"
            />
          </div>
        </section>
        <div class="separate-line"></div>
        <section class="info default-active-item" @click="person">
          <img
            class="userHeader"
            src="../../assets/logo/人员头像.png"
            alt=""
          />
          <p class="ellipsisName">个人管理</p>
          <svg
            class="icon icon-jiantou"
            :class="{ 'icon-jiantou-active': !isPerson }"
            aria-hidden="true"
          >
            <use xlink:href="#icon-xiajiantou"></use>
          </svg>
          <div class="userInfo-popup" v-show="isPerson">
            <div class="info-item password-btn default-text-active">
              <span class="left-desc">修改密码</span>
            </div>
            <div
              class="info-item logout-btn default-text-active"
              @click="
                {
                  isPerson = true;
                  const path = '/login';
                  $router.push({ path });
                }
              "
            >
              <span class="left-desc">退出登录</span>
            </div>
            <img
              src="https://www.hiklink.cn/tenant/static/images/jiantou.png"
              class="icon-jiantou1"
            />
          </div>
        </section>
        <div class="components-main"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  name: 'mainHeader',
  data() {
    return {
      isClick: false,
      isPerson: false,
      list: ['企业', '新里程'],
      teamName: '企业'
    };
  },
  created() {
    // console.log('是否折叠', this.isCollapse);
  },
  methods: {
    onClick(key, data) {
      this.isClick = !this.isClick;
      console.log(key, data);
    },
    person(key, data) {
      this.isPerson = !this.isPerson;
    },
    changeTeam(name) {
      this.teamName = name;
    },
    onChange() {
      this.isCollapse = false;
      console.log('跳转至main页面');
      this.$emit('toMain', this.isCollapse);
    }
  }
};
</script>
<style scoped>
.index-header {
  position: relative;
  height: 56px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #275bc4;
  box-shadow: 0 1px 4px 0 rgb(0 22 43 / 12%);
}
.index-header .logoTransitionIcon {
  width: 64px;
}
.index-header .logoTransition {
  width: 224px;
  overflow: hidden;
}
.header-left {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 56px;
  transition: width 0.3s ease-in-out, opacity 0.3s ease-in-out;
}
.header-left .logoHk {
  width: 143px;
  height: 34px;
}
.header-left img {
  width: 100px;
  height: 13.25px;
}
.header-left .iconLogo {
  width: 38px;
  height: 38px;
}
.header-left__width {
  width: 224px;
  text-align: center;
  opacity: 1;
  overflow: hidden;
}
.header-right {
  flex: 1;
  height: 56px;
  padding: 0 64px 0 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.nav-left {
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.nav-item:first-of-type {
  margin-left: 0;
}
.nav-item {
  font-size: 14px;
  font-weight: 400;
  color: #fff;
  margin-left: 85px;
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.right-menu .team-popup {
  position: absolute;
  right: -11px;
  top: 43px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 186px;
  background: #fff;
  box-shadow: 0 0 8px 0 rgb(183 181 181 / 50%);
  border-radius: 4px;
  z-index: 10;
}
.right-menu .team-popup .list {
  width: 100%;
  padding: 8px;
  max-height: 195px;
  /* overflow-y: scroll; */
  overflow-x: hidden;
}
.right-menu .team-popup .team-item-active {
  color: #2c7bfc !important;
}
.right-menu .team-popup .team-item {
  /* width: 170px; */
  padding: 8px 16px;
  font-size: 14px;
  color: #32325d;
  margin-bottom: 2px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.right-menu .team-popup .icon-jiantou1 {
  position: absolute;
  left: 150px;
  top: -10px;
  width: 16px;
  height: 10px;
}
.ellipsisName {
  max-width: 180px;
  display: inline-block;
}
.right-menu .file-center-btn .left-desc {
  margin-left: 9px;
}
.right-menu .file-center-btn {
  font-size: 14px;
  color: #fff;
  margin-right: 5px;
  padding: 9px;
}
.right-menu .switch-team .left-desc {
  margin-left: 9px;
  max-width: 223px;
}
.right-menu section {
  position: relative;
  cursor: pointer;
}
.right-menu,
.right-menu section {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.right-menu .switch-team {
  font-size: 14px;
  color: #fff;
  padding: 9px;
}
.right-menu section .icon-jiantou {
  font-size: 16px;
  color: #fff;
  margin-left: 10px;
  transition: all 0.3s;
}
.right-menu section .icon-jiantou-active {
  transform: rotate(180deg);
}
.right-menu .info {
  font-size: 14px;
  color: #32325d;
  padding: 4px 8px;
}
.right-menu section {
  position: relative;
  cursor: pointer;
}
.right-menu,
.right-menu section {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.right-menu .separate-line {
  width: 1px;
  height: 24px;
  background: #eaeaea;
  margin: 0 16px;
}
.default-active-item:hover {
  background-color: #1f489c;
  border-radius: 4px;
}

.right-menu .info .userHeader {
  width: 32px;
  height: 32px;
  border-radius: 4px;
}
.right-menu section img {
  width: 36px;
  height: 36px;
}
.right-menu section p {
  margin-left: 8px;
  font-size: 14px;
  color: #fff;
}

.ellipsisName {
  max-width: 180px;
  display: inline-block;
}
.ellipsisName,
.ellipsisTeam {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.right-menu .userInfo-popup {
  position: absolute;
  left: -8px;
  top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 126px;
  background: #fff;
  box-shadow: 0 0 8px 0 rgb(183 181 181 / 50%);
  border-radius: 4px;
  z-index: 10;
}
.right-menu .userInfo-popup .password-btn {
  border-bottom: 1px solid #eaeaea;
}
.right-menu .userInfo-popup .info-item {
  box-sizing: border-box;
  padding: 16px 24px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.right-menu .userInfo-popup .info-item :hover {
  color: skyblue;
}
.right-menu .userInfo-popup .icon-jiantou1 {
  position: absolute;
  left: 24px;
  top: -10px;
  width: 16px;
  height: 10px;
}
</style>
