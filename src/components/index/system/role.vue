<template>
  <div class="teamInfoPages">
    <el-scrollbar style="height: 100%">
      <Form2></Form2>
  </el-scrollbar>
  </div>
</template>
<script>
import Form1 from "./form1.vue";
import Form2 from "./form2.vue";
import Form3 from "./form3.vue";
import Form4 from "./form4.vue";
export default {
  name: "role",
  components: { Form1, Form2, Form3, Form4},
  data() {
    return {

    };
  },
  methods: {
  }
};
</script>
<style scoped>
.teamInfoPages >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>