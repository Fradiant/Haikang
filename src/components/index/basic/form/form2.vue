<template>
  <div>
    <el-time-picker v-model="selectedTime" :default-value="defaultTime"></el-time-picker>

    <h3>手动触发el-select验证</h3>
    <div
      class=""
      v-for="(item, index) in formList"
      :key="index"
      style="width: 500px;"
    >
      <el-form
        ref="ruleForm"
        :model="item.ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="活动名称" prop="name" :rules="validateForm">
          <el-input
            v-emoji
            v-model="item.ruleForm.name"
            @input="onInput('ruleForm', index)"
          ></el-input>
        </el-form-item>
        <el-form-item label="活动名称" prop="region" :rules="validateForm">
          <el-select
            v-model="item.ruleForm.region"
            placeholder="请选择活动区域"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm', index)"
            >立即创建</el-button
          >
          <el-button @click="resetForm('ruleForm', index)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedTime: '', // 存储用户选择的时间
      defaultTime: this.calculateDefaultTime(), // 设置默认时间为当前时间加一分钟
      validateForm: this.$Validate({
        required: true
      }),
      formList: [
        {
          ruleForm: {
            name: "",
            region: ""
          }
        },
        {
          ruleForm: {
            name: "",
            region: ""
          }
        }
      ]
    };
  },
  methods: {
    calculateDefaultTime() {
      // 获取当前日期时间
      let currentDate = new Date();

      // 将当前日期时间增加一分钟
      return currentDate.setMinutes(currentDate.getMinutes() + 1);

      // 打印增加一分钟后的日期时间
    },
    onInput(formName, index) {
      console.log(index);
      this.$refs.ruleForm[index].validateField(["region"]);
    },
    async submitForm(formName, index) {
      try {
        await this.$refs[formName][index].validate(valid => {
          if (valid) {
            alert("submit!");
          } else {
            console.log("error submit!!");
            return false;
          }
        });
        // 验证通过的处理
      } catch (error) {
        // 验证失败的处理
        console.error("Validation error:", error);
      }
    },
    resetForm(formName, index) {
      this.$refs[formName][index].resetFields();
    }
  }
};
</script>
