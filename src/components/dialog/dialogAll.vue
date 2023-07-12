<template>
  <div>
    <el-dialog custom-class="formClass" width="35%" v-bind="$attrs" v-on="$listeners" :close-on-click-modal="false"
      @open="onOpen" @close="onClose" title="Dialog Titile">
      <el-scrollbar style="height: 400px;">
        <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
          <el-col :span="22">
            <el-form-item label="单行文本" prop="field101">
              <el-input v-model="formData.field101" placeholder="请输入单行文本" clearable :style="{ width: '100%' }">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="多行文本" prop="field103">
              <el-input v-model="formData.field103" type="textarea" placeholder="请输入多行文本"
                :autosize="{ minRows: 4, maxRows: 4 }" :style="{ width: '100%' }"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="密码" prop="field104">
              <el-input v-model="formData.field104" placeholder="请输入密码" clearable show-password
                :style="{ width: '100%' }"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="计数器" prop="field105">
              <el-input-number v-model="formData.field105" placeholder="计数器" :step="1"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="编辑器" prop="field106">
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="下拉选择" prop="field107">
              <el-select :popper-append-to-body="false" v-model="formData.field107" placeholder="请选择下拉选择" clearable
                :style="{ width: '100%' }">
                <el-option v-for="(item, index) in field107Options" :key="index" :label="item.label" :value="item.value"
                  :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="级联选择" prop="field108">
              <el-cascader v-model="formData.field108" :options="field108Options" :props="field108Props"
                :style="{ width: '100%' }" placeholder="请选择级联选择" clearable></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="单选框组" prop="field109">
              <el-radio-group v-model="formData.field109" size="medium">
                <el-radio v-for="(item, index) in field109Options" :key="index" :label="item.value"
                  :disabled="item.disabled">{{ item.label }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="多选框组" prop="field110">
              <el-checkbox-group v-model="formData.field110" size="medium">
                <el-checkbox v-for="(item, index) in field110Options" :key="index" :label="item.value"
                  :disabled="item.disabled">{{ item.label }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="滑块" prop="field112" required>
              <el-slider :max="100" :step="1" v-model="formData.field112"></el-slider>
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="时间范围" prop="field114">
              <el-time-picker v-model="formData.field114" is-range format="HH:mm:ss" value-format="HH:mm:ss"
                :style="{ width: '100%' }" start-placeholder="开始时间" end-placeholder="结束时间" range-separator="至"
                clearable></el-time-picker>
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="日期范围" prop="field116">
              <el-date-picker type="daterange" v-model="formData.field116" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                :style="{ width: '100%' }" start-placeholder="开始日期" end-placeholder="结束日期" range-separator="至"
                clearable></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="评分" prop="field117">
              <el-rate v-model="formData.field117" :max="5"></el-rate>
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="颜色选择" prop="field118" required>
              <el-color-picker v-model="formData.field118" size="medium"></el-color-picker>
            </el-form-item>
          </el-col>
          <el-col :span="22">
            <el-form-item label="上传" prop="field119" required>
              <el-upload ref="field119" :file-list="field119fileList" :action="field119Action"
                :before-upload="field119BeforeUpload">
                <el-button size="small" type="primary" icon="el-icon-upload">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-form>
      </el-scrollbar>

      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      formData: {
        field101: undefined,
        field103: undefined,
        field104: undefined,
        field105: undefined,
        field106: null,
        field107: undefined,
        field108: [],
        field109: undefined,
        field110: [],
        field112: 0,
        field114: null,
        field116: null,
        field117: 0,
        field118: null,
        field119: null
      },
      rules: {
        field101: [
          {
            required: true,
            message: "请输入单行文本",
            trigger: "blur"
          }
        ],
        field103: [
          {
            required: true,
            message: "请输入多行文本",
            trigger: "blur"
          }
        ],
        field104: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ],
        field105: [
          {
            required: true,
            message: "计数器",
            trigger: "blur"
          }
        ],
        field106: [
          {
            required: true,
            message: "请输入编辑器",
            trigger: "blur"
          }
        ],
        field107: [
          {
            required: true,
            message: "请选择下拉选择",
            trigger: "change"
          }
        ],
        field108: [
          {
            required: true,
            type: "array",
            message: "请至少选择一个级联选择",
            trigger: "change"
          }
        ],
        field109: [
          {
            required: true,
            message: "单选框组不能为空",
            trigger: "change"
          }
        ],
        field110: [
          {
            required: true,
            type: "array",
            message: "请至少选择一个多选框组",
            trigger: "change"
          }
        ],
        field114: [
          {
            required: true,
            message: "时间范围不能为空",
            trigger: "change"
          }
        ],
        field116: [
          {
            required: true,
            message: "日期范围不能为空",
            trigger: "change"
          }
        ],
        field117: [
          {
            required: true,
            message: "评分不能为空",
            trigger: "change"
          }
        ]
      },
      field119Action: "https://jsonplaceholder.typicode.com/posts/",
      field119fileList: [],
      field107Options: [
        {
          label: "选项一",
          value: 1
        },
        {
          label: "选项二",
          value: 2
        }
      ],
      field108Options: [],
      field109Options: [
        {
          label: "选项一",
          value: 1
        },
        {
          label: "选项二",
          value: 2
        }
      ],
      field110Options: [
        {
          label: "选项一",
          value: 1
        },
        {
          label: "选项二",
          value: 2
        }
      ],
      field108Props: {
        multiple: false,
        label: "label",
        value: "value",
        children: "children"
      }
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getField108Options();
  },
  mounted() { },
  methods: {
    onOpen() { },
    onClose() {
      this.$refs["elForm"].resetFields();
    },
    close() {
      this.$emit("update:visible", false);
    },
    handelConfirm() {
      this.$refs["elForm"].validate(valid => {
        if (!valid) return;
        this.close();
      });
    },
    getField108Options() {
      // 注意：this.$axios是通过Vue.prototype.$axios = axios挂载产生的
      // this.$axios({
      //   method: "get",
      //   url:
      //     "https://www.fastmock.site/mock/f8d7a54fb1e60561e2f720d5a810009d/fg/cascaderList"
      // }).then(resp => {
      //   var { data } = resp;
      //   this.field108Options = data.list;
      // });
    },
    field119BeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 2;
      if (!isRightSize) {
        this.$message.error("文件大小超过 2MB");
      }
      return isRightSize;
    }
  }
};
</script>
<style>
.el-rate {
  display: inline-block;
  vertical-align: text-top;
}

.el-upload__tip {
  line-height: 1.2;
}

/* 隐藏表单横向滚动轴 */
.el-scrollbar__wrap {
  overflow-x: hidden;
}

/* 用来防止设置overflow属性hidden时下拉框显示不完整 */
.el-select-dropdown .el-scrollbar .el-scrollbar__wrap {
  overflow: scroll !important;
}

/* 需要配合 :popper-append-to-body="false"使用，防止滚动时下拉框跟随滚动时显示异常 */
.el-select-dropdown {
  position: absolute !important;
  left: 0 !important;
  top: 40px !important;
}

>>>.formClass {
  min-width: 400px;

}
</style>
