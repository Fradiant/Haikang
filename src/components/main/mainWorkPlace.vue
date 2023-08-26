<template>
  <div class="page-content">
    <div class="">
      <div class="application-box">
        <p class="myApp-desc">我的应用</p>
        <div class="application-list">
          <div v-for="item in myLinkList">
            <router-link :to="item.to" class="application-item">
              <img :src="item.imgUrl" alt="" class="app-logo" />
              <span class="app-name">{{ item.title }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="">
      <div class="application-box">
        <p class="myApp-desc">其他应用</p>
        <div class="application-list">
          <div v-for="item in otherLinkList">
            <router-link :to="item.to" class="application-item">
              <img :src="item.imgUrl" alt="" class="app-logo" />
              <span class="app-name">{{ item.title }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class=""></div>
  </div>
</template>
<script>
export default {
  name: "mainWorkPlace",
  data() {
    return {
      myLinkList: [
        {
          to: "/Index/basic/formManagement",
          imgUrl: require("../../assets/logo/1.png"),
          title: "表单"
        },
        {
          to: "/Index/basic/authority",
          imgUrl: require("../../assets/logo/2.png"),
          title: "动画"
        },
        {
          to: "/Index/basic/user",
          imgUrl: require("../../assets/logo/3.png"),
          title: "弹框"
        },
        {
          to: "/Index/index",
          imgUrl: require("../../assets/logo/4.png"),
          title: "低代码1"
        },
        {
          to: "/Index/index2",
          imgUrl: require("../../assets/logo/5.png"),
          title: "低代码2"
        },
        {
          to: "/Index/element",
          imgUrl: require("../../assets/logo/6.png"),
          title: "组件测试"
        }
      ],
      otherLinkList: [
        {
          to: "/Index/person",
          imgUrl: require("../../assets/logo/7.png"),
          title: "滚动条"
        },
        {
          to: "/Index/config",
          imgUrl: require("../../assets/logo/8.png"),
          title: "设置"
        },
        {
          to: "/Index/config",

          imgUrl: require("../../assets/logo/9.png"),
          title: "设置"
        },
        {
          to: "/Index/config",
          imgUrl: require("../../assets/logo/10.png"),
          title: "设置"
        }
      ]
    };
  },

  created() {},
  methods: {
    onChange(flag) {
      console.log("changeMain");
      if (flag) {
        this.$emit("changeMain", true);
      } else {
        this.$emit("changeMain", false);
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
