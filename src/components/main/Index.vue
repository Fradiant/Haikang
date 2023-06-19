<template>
  <el-container style="height:calc(100%);">
    <el-header style="height: 56px;">
      <mainHeader :isCollapse="isCollapse" @toMain="change"></mainHeader>
    </el-header>
    <el-main style="padding:0px;">
      <mainWorkPlace
        v-if="$route.name === 'Index'"
        @changeMain="changePath"
      ></mainWorkPlace>
      <mainContent v-else @input-value-update="getVal"></mainContent>
    </el-main>
  </el-container>
</template>
<script>
import mainWorkPlace from './mainWorkPlace';
import mainContent from './mainContent';
import mainHeader from './mainHeader';
export default {
  name: 'Index',
  components: { mainContent, mainHeader, mainWorkPlace },
  data() {
    return {
      isCollapse: false

    };
  },
  created() {
    console.log('isCollapse的值:', this.isCollapse);
    console.log('当前路由位置：', this.$route.path);
  },
  mounted() {
    console.log(this.$store.state);
  },
  methods: {
    getHeight() {
      console.log(document.body.clientHeight);
      return document.body.clientHeight;
    },
    getVal(newVal) {
      this.isCollapse = newVal;
    },
    change(val) {
      this.isCollapse = val;
      const path = '/Index';
      this.$router.push({ path }, () => {
        console.log('Navigation completed');
      });
    },
    changePath(val) {
      if (val) {
        const path = '/Index/system/role';
        this.$router.push({ path });
      }
    }
  }
};
</script>

<style scoped>
.el-header {
  padding: 0px;
  line-height: normal;
}
.el-main {
  background-color: #f6f7fb;
}
</style>
