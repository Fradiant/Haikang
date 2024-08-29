<template>
  <div class="teamInfoPages">
    <el-scrollbar style="height: 100%">
      <div class="" style="height: 120px;width: 120px;">
        <div style="" class="big">
          <div class="" style="height: 100%;width: 100%;"></div>
          <div class="point">123</div>
        </div>
      </div>
      <Form2></Form2>
    </el-scrollbar>
  </div>
</template>
<script>
import Form1 from "./form/form1.vue";
import Form2 from "./form/form2.vue";
import Form3 from "./form/form3.vue";
import Form4 from "./form/form4.vue";
export default {
  name: "formManagement",
  components: { Form1, Form2, Form3, Form4 },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped>
.teamInfoPages >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
.big {
  position: relative;
  height: 100px;
  width: 100px;
  background-color: pink;
  vertical-align: top;
  box-sizing: content-box;
}
.point {
  font-size: 17px !important;
  background-color: red;
  position: absolute;
  right: 0px;
  width: 16px;
  height: 16px;
  font-weight: bold;
  border-radius: 4px;
}
</style>
