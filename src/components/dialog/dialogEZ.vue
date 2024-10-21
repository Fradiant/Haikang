<template>
  <div class="dialogForm">
    <el-scrollbar style="height: 400px;">
      <el-form
        ref="elForm"
        :model="formData"
        :rules="rules"
        size="medium"
        label-width="110px"
      >
        <el-col :span="20">
          <el-form-item label="描述文件" prop="timeValue">
            <el-date-picker
              v-model="timeValue"
              :append-to-body="false"
              :picker-options="{
                start: '08:30',
                step: '00:15',
                end: '18:30'
              }"
              placeholder="选择时间"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="操作系统" prop="mobile">
            <el-input
              v-model="formData.mobile"
              placeholder="IOS"
              :disabled="true"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="英文名称" prop="field106">
            <el-input
              v-model="formData.field106"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="中文名称" prop="field107">
            <el-input
              v-model="formData.field107"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="安装包名" prop="field108">
            <el-input
              v-model="formData.field108"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="服务区域" prop="field109">
            <el-radio-group v-model="formData.field109" size="medium">
              <el-radio
                v-for="(item, index) in field109Options"
                :key="index"
                :label="item.value"
                :disabled="item.disabled"
                >{{ item.label }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="海外服务器" prop="field110">
            <el-input
              v-model="formData.field110"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="海外服务协议" prop="field111">
            <el-input
              v-model="formData.field111"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="海外隐私政策" prop="field112">
            <el-input
              v-model="formData.field112"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="Bundleld" prop="field113">
            <el-input
              v-model="formData.field113"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="极光推送Key" prop="field114">
            <el-input
              v-model="formData.field114"
              clearable
              :style="{ width: '100%' }"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="证书文件" prop="field115">
            <el-upload
              ref="field115"
              :file-list="field115fileList"
              :action="field115Action"
              :before-upload="field115BeforeUpload"
            >
              <el-button size="small" type="primary" icon="el-icon-upload"
                >浏览</el-button
              >
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="上传图片" prop="field116">
            <el-upload
              ref="field116"
              :file-list="field116fileList"
              :action="field116Action"
              :before-upload="field116BeforeUpload"
              list-type="picture"
            >
              <el-button size="small" type="primary" icon="el-icon-upload"
                >浏览</el-button
              >
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="选择支持语言" prop="field129">
            <el-select
              v-model="formData.field129"
              placeholder="请选择选择支持语言"
              multiple
              :popper-append-to-body="false"
              clearable
              :style="{ width: '100%' }"
            >
              <el-option
                v-for="(item, index) in field129Options"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="颜色主题" prop="field128">
            <el-select
              v-model="formData.field128"
              placeholder="请选择颜色主题"
              :popper-append-to-body="false"
              clearable
              :style="{ width: '100%' }"
            >
              <el-option
                v-for="(item, index) in field128Options"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="描述文件" prop="field130">
            <el-upload
              ref="field130"
              :file-list="field130fileList"
              :action="field130Action"
              :before-upload="field130BeforeUpload"
            >
              <el-button size="small" type="primary" icon="el-icon-upload"
                >浏览</el-button
              >
            </el-upload>
          </el-form-item>
        </el-col>

        <el-col :span="20">
          <el-form-item label="HOC文件" prop="field131">
            <el-upload
              ref="field131"
              :file-list="field131fileList"
              :action="field131Action"
              :before-upload="field131BeforeUpload"
            >
              <el-button size="small" type="primary" icon="el-icon-upload"
                >浏览</el-button
              >
            </el-upload>
          </el-form-item>
        </el-col>
      </el-form>
    </el-scrollbar>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  name: "dialogEZ",
  components: {},
  props: [],
  data() {
    return {
      timeValue: "",
      formData: {
        value: "",
        mobile: "",
        field106: undefined,
        field107: undefined,
        field108: undefined,
        field109: undefined,
        field110: undefined,
        field111: undefined,
        field112: undefined,
        field113: undefined,
        field114: undefined,
        field115: null,
        field116: null,
        field129: [],
        field128: "",
        field130: null,
        field131: null
      },
      rules: {
        mobile: [
          {
            pattern: /^1(3|4|5|7|8|9)\d{9}$/,
            message: "手机号格式错误",
            trigger: "blur"
          }
        ],
        field106: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ],
        field107: [],
        field108: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ],
        field109: [],
        field110: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ],
        field111: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ],
        field112: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ],
        field113: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ],
        field114: [
          {
            required: true,
            message: "",
            trigger: "blur"
          }
        ],
        field129: [],
        field128: [
          {
            required: true,
            message: "请选择颜色主题",
            trigger: "change"
          }
        ]
      },
      field115Action: "https://jsonplaceholder.typicode.com/posts/",
      field115fileList: [],
      field116Action: "https://jsonplaceholder.typicode.com/posts/",
      field116fileList: [],
      field130Action: "https://jsonplaceholder.typicode.com/posts/",
      field130fileList: [],
      field131Action: "https://jsonplaceholder.typicode.com/posts/",
      field131fileList: [],
      field109Options: [
        {
          label: "海外",
          value: 1
        },
        {
          label: "国内",
          value: 2
        }
      ],
      field129Options: [
        {
          label: "英语",
          value: 1
        },
        {
          label: "法语",
          value: 2
        },
        {
          label: "法语",
          value: 3
        },
        {
          label: "汉语",
          value: 4
        }
      ],
      field128Options: [
        {
          label: "红色",
          value: 1
        },
        {
          label: "橙色",
          value: 2
        }
      ]
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    console.log("1")
  },
  methods: {
    field115BeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 2;
      if (!isRightSize) {
        this.$message.error("文件大小超过 2MB");
      }
      return isRightSize;
    },
    field116BeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 2;
      if (!isRightSize) {
        this.$message.error("文件大小超过 2MB");
      }
      return isRightSize;
    },
    field130BeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 2;
      if (!isRightSize) {
        this.$message.error("文件大小超过 2MB");
      }
      return isRightSize;
    },
    field131BeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 2;
      if (!isRightSize) {
        this.$message.error("文件大小超过 2MB");
      }
      return isRightSize;
    },
    submit() {
      this.$refs.elForm.validate(valid => {
        if (!valid) {
          return;
        }
        this.$emit("close");
      });
    }
  }
};
</script>
<style>
.el-upload__tip {
  line-height: 1.2;
}
</style>
