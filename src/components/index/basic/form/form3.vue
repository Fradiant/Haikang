<template>
  <div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="活动名称" prop="name" :rules="validateForm">
        <el-input
          v-model="ruleForm.name"
          @input="handleInput"
          @blur="handleBlur"
        ></el-input>
      </el-form-item>
      <el-form-item label="活动名称" prop="region" :rules="validateForm">
        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="">
      <el-time-picker
        v-model="value1"
        format="HH:mm"
        arrow-control
        placeholder="任意时间点"
      >
      </el-time-picker>
      <el-time-picker
        arrow-control
        format="HH:mm"
        v-model="value2"
        placeholder="任意时间点"
      >
      </el-time-picker>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      validateForm: [
        { required: true, message: "活动名称不能为空", trigger: "blur" }
        // 其他验证规则...
      ],
      ruleForm: {
        name: ""
      },
      value1: new Date(2016, 9, 10, 18, 40),
      // value2: new Date(2016, 9, 10, 18, 40)
    };
  },

  methods: {
    handleInput() {
      this.$refs.ruleForm.validateField("name");
    },
    handleBlur() {
      this.$refs.ruleForm.validateField("name");
    }
  }
};
</script>
