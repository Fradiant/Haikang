<template>
  <div class="teamInfoPages">
    <el-scrollbar style="height: 100%">
    <!-- <el-empty style="flex: 1" description="暂无数据"></el-empty> -->
    <div class="item-inline" style="white-space: nowrap;">
      <span>搜索：</span>
      <div class="" style="width:300px;">
        <el-input type="text" v-model="searchContent" v-emoji>
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="onClick(searchContent)"
          ></el-button>
        </el-input>
        <el-button slot="append" v-copy="searchContent">复制内容</el-button>
      </div>
    </div>
    <div class="item-inline">
      <span>选择文件：</span>
      <div class="" style="width:300px;">
        <input type="file" @input="changeFile" accept=".xls" />
      </div>
    </div>
    <div class="item-inline">
      <span>路由：</span>
      <el-button @click="$message.warning($route.path)">本页路由</el-button>
      <el-button @click="route">路由对象</el-button>
      <el-button @click="routeVuex">Vuex路由对象</el-button>
    </div>
    <div class="item-inline">
      <span>路由跳转：</span>
      <el-button @click="routePush">路由跳转</el-button>
    </div>
    <div class="item-inline">
      <span>测试应用跳转：</span>
      <el-button @click="routePush2">路由跳转</el-button>
    </div>
    <div class="item-inline">
      <span>图片转base64</span>
      <el-input v-model="imgSrc" style="width: 235px;" v-emoji></el-input>
      <el-button @click="changeBase64">转换</el-button>
    </div>

    <el-tree
      ref="tree"
      :data="data"
      :props="defaultProps"
      style="width: 300px;height: 300px;"
    ></el-tree>
  </el-scrollbar>
  </div>
</template>
<script>
export default {
  name: "role",
  data() {
    return {
      searchContent: "123",
      imgSrc: "",
      data: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1"
                }
              ]
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1"
                }
              ]
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  methods: {
    changeFile(e) {
      console.log(e);
    },
    onClick(msg) {
      this.$message.warning(`搜索内容：${msg}`);
      const element = document.getElementsByClassName("el-tree");
      console.log(element);
      console.log(this.$refs.tree);
    },
    route() {
      console.log(this.$route);
    },
    routeVuex() {
      console.log(this.$store.state.routeHistory);
    },
    routePush() {
      const path = "/Index/system/role/add";
      this.$router.push({ path });
    },
    routePush2() {
      const path = "/lowCode";
      this.$router.push({ path });
    },
    // changeBase64() {
    //   let image = new Image();
    //   image.setAttribute('crossOrigin', 'anonymous');
    //   image.src = this.imgSrc;
    //   };
    // }
    changeBase64() {
      let imgUrl = this.imgSrc;
      window.URL = window.URL || window.webkitURL;
      let xhr = new XMLHttpRequest();
      xhr.open("get", imgUrl, true);
      xhr.responseType = "blob";
      xhr.onload = function() {
        if (this.status === 200) {
          // 得到一个blob对象
          let blob = this.response;
          console.log("blob", blob);
          // 至关重要
          let oFileReader = new FileReader();
          oFileReader.onloadend = function(e) {
            // 此处拿到的已经是base64的图片了,可以赋值做相应的处理
            console.log(e.target.result);
          };
          oFileReader.readAsDataURL(blob);
        }
      };
      xhr.send();
    }
  }
};
</script>
<style scoped>
.teamInfoPages >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>