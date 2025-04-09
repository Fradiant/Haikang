<template>
  <div class="teamInfoPages" id="visitorRegistration">
    <div class="item-inline">
      <span>路由：</span>
      <el-button @click="$message.warning($route.path)">本页路由</el-button>
    </div>
    <div class="item-inline">
      <el-button type="text" @click="dialogVisible = true"
        >点击打开 Dialog</el-button
      >
      <el-button type="text" @click="dialog = true"
        >打开嵌套 Form 的 Drawer</el-button
      >
      <el-button type="text" @click="clickDialog">生成的组件</el-button>

      <el-button type="text" @click="dialogAll = true">生成的组件</el-button>

      <el-button type="text" @click="dialogUploadShow = true"
        >上传图片</el-button
      >
      <el-button type="text" @click="dialogTestShow = true">海康上传</el-button>
      <!-- <el-button type="text" @click="dialogTestShow = true">海康上传</el-button> -->
      <el-button type="text" @click="dialogNormalShow = true"
        >正常上传</el-button
      >

      <!-- <el-button type="text" @click="dialogVisible = true">点击打开外部引入dialog</el-button> -->
    </div>
    <div>
      <Egrid
        ref="visitorManagementEgrid"
        :column-type="'selection'"
        :default-sort="{ prop: 'Number', order: 'ascending' }"
        :column-key-map="{ label: 'name' }"
        :table-data="EgridData.data"
        :columns-schema="EgridData.columnsSchema"
        :is-lazy-loading="true"
        :custom-total="itemTotal"
        :columns="EgridData.columns"
      ></Egrid>
    </div>
    <div class="dialog">
      <dialogAll :visible.sync="dialogAll" title="某弹框"></dialogAll>
      <dialogUpload :visible.sync="dialogUploadShow"></dialogUpload>
      <dialogTest :visible.sync="dialogTestShow"></dialogTest>
      <normalUpload :visible.sync="dialogNormalShow"></normalUpload>
      <el-dialog
        v-bind="$attrs"
        v-on="$listeners"
        :visible.sync="dialogForm"
        v-if="dialogForm"
        custom-class="formClass"
        width="35%"
        :close-on-click-modal="false"
        @close="onClose"
        title="EZLive IOS 添加"
      >
        <dialogForm ref="child" @close="close"> </dialogForm>
        <div slot="footer">
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="handelConfirm">确定</el-button>
        </div>
      </el-dialog>
      <el-dialog
        title="提示"
        width="600px"
        :visible.sync="dialogVisible"
        :modal-append-to-body="false"
      >
        <dialogSelect></dialogSelect>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <!-- v-dialogDrag:isDraggable="true" -->
      <!-- 该属性引发报错，问题原因drag自定义指令未找到对应dom -->
      <el-drawer
        ref="drawer"
        size="500px"
        :append-to-body="false"
        :custom-class="'drawerClass'"
        :wrapperClosable="false"
        direction="rtl"
        title="我嵌套了 Form !"
        :visible.sync="dialog"
        :modal-append-to-body="false"
      >
        <section class="demo-drawer__content">
          <el-form :model="form">
            <el-form-item
              label="活动名称"
              :label-width="formLabelWidth"
              class="el-form-item from_item is-required"
            >
              <el-input
                v-model="form.name"
                autocomplete="off"
                width="500px"
                v-emoji
              ></el-input>
            </el-form-item>
            <el-form-item
              label="活动区域"
              :label-width="formLabelWidth"
              class="el-form-item from_item"
            >
            </el-form-item>

            <el-form-item
              label="上传图片"
              :label-width="formLabelWidth"
              class="el-form-item from_item is-required"
            >
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-dialog :visible.sync="imgDialogVisible">
                <img width="100%" :src="imageUrl" alt="" />
              </el-dialog>
            </el-form-item>
          </el-form>
          <div class="demo-drawer__footer">
            <el-button @click="cancelForm">取 消</el-button>
            <el-button
              type="primary"
              @click="$refs.drawer.closeDrawer()"
              :loading="loading"
              >{{ loading ? "提交中 ..." : "确 定" }}</el-button
            >
          </div>
        </section>
      </el-drawer>
    </div>
  </div>
</template>
<script>
import dialogForm from "../../dialog/dialogEZ.vue";
import dialogTest from "../../dialog/dialogTest.vue";
import dialogAll from "../../dialog/dialogAll.vue";
import dialogUpload from "../../dialog/dialogUpload.vue";
import normalUpload from "../../dialog/normalUpload.vue";
import dialogSelect from "../../dialog/dialogSelect.vue";
import Egrid from "../../packagingComponents/customComponent/Egrid.vue";
const that = this;
export default {
  name: "user",
  components: {
    dialogForm,
    dialogTest,
    dialogAll,
    dialogUpload,
    normalUpload,
    dialogSelect,
    Egrid,
  },
  data() {
    return {
      observer: null,
      treeNode: null,
      dialogVisible: false, // dialog
      dialog: false,
      dialogForm: false,
      dialogAll: false,
      dialogUploadShow: false,
      dialogTestShow: false,
      dialogNormalShow: false,
      loading: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "80px",
      timer: null,
      imageUrl: "",
      imgDialogVisible: false,
      itemTotal: 200,
      EgridData: {
        total: 0, // 数据总数
        data: [],
        columns: [
          {
            name: "visitorName",
            sortable: true,
            prop: "visitorName",
            "min-width": 140,
            formatter: this.visitornamevalue,
          },
          {
            name: "email",
            sortable: true,
            "min-width": 140,
            prop: "email",
          },
          {
            name: "identityNo",
            sortable: true,
            "min-width": 140,
            prop: "identityNo",
          },
          {
            name: "integratedCircuitNo",
            sortable: true,
            "min-width": 140,
            prop: "integratedCircuitNo",
          },
          {
            name: "visitorType",
            sortable: true,
            "min-width": 140,
            prop: "visitorType",
            // formatter: this.visitorTypeFormatter
          },
          {
            name: "receptionistName",
            sortable: true,
            "min-width": 140,
            prop: "receptionistName",
          },
          {
            name: "receptionistPhone",
            sortable: true,
            "min-width": 140,
            prop: "receptionistPhone",
          },
          {
            name: "signInTime",
            sortable: true,
            "min-width": 140,
            prop: "signInTime",
            // formatter: this.utils.signInFormatter
          },
          {
            name: "status",
            sortable: true,
            "min-width": 140,
            prop: "status",
            // formatter: this.statusFormatter
          },
          {
            name: "personFeatureStatus",
            prop: "personFeatureStatus",
            sortable: true,
            StatusButton: true,
            "min-width": 140,
            // StatusList: this.ComScript.featureStatus
          },
          {
            name: "operate",
            prop: "operate",
            "min-width": 160,
            fixed: "right",
            DefaultButton: [
              {
                classname: "icon-renyuanqianli iconfont",
                title: "operate",
                clickEvent: this.visitorSignOut,
                visible: {
                  required() {
                    if (!that.umsCloudStatus) {
                      return "";
                    }
                    return "invisible";
                  },
                },
              },
              {
                classname: "u-icon-edit",
                title: "edit",
                clickEvent: this.editVisitor,
                visible: {
                  required() {
                    if (!that.umsCloudStatus) {
                      return "";
                    }
                    return "invisible";
                  },
                },
              },
              {
                classname: "u-icon-del",
                title: "del",
                clickEvent: this.delVisitor,
                visible: {
                  required() {
                    if (!that.umsCloudStatus) {
                      return "";
                    }
                    return "invisible";
                  },
                },
              },
              {
                classname: "icon-chakanxiangqing iconfont",
                title: "detailText",
                clickEvent: this.detailVisitor,
                visible: {
                  required() {
                    if (that.umsCloudStatus) {
                      return "";
                    }
                    return "invisible";
                  },
                },
              },
            ],
          },
        ],
      },
    };
  },
  created() {
    this.columnsBak = [...this.EgridData.columns];
  },
  mounted() {
    this.startObserving();
    this.initCustomField();
    this.initData();
  },
  beforeDestroy() {
    this.stopObserving();
  },
  methods: {
    startObserving() {
      const targetNode = document.getElementById("visitorRegistration");
      this.observer = new MutationObserver((mutationsList) => {
        console.log("DOM 变动检测到：", mutationsList);
      });
      this.observer.observe(targetNode, { childList: true, subtree: true });
    },
    stopObserving() {
      if (this.observer) {
        this.observer.disconnect();
      }
    },
    initCustomField() {
      let response = {
        code: 0,
        message: "Success.",
        data: {
          fieldList: [
            {
              fieldId: "36",
              fieldName: "1",
              fieldType: 2,
              businessType: 2,
              isRequired: 2,
              fieldOptionList: [
                {
                  optionId: "33",
                  optionValue:
                    "123456789012345678901234567890123456789012345678901234567890",
                },
                {
                  optionId: "65",
                  optionValue:
                    "1234567890123456789012345678901234567890123456789012345678901",
                },
                {
                  optionId: "66",
                  optionValue:
                    "1234567890123456789012345678901234567890123456789012345678902",
                },
                {
                  optionId: "67",
                  optionValue:
                    "1234567890123456789012345678901234567890123456789012345678903",
                },
                {
                  optionId: "68",
                  optionValue:
                    "1234567890123456789012345678901234567890123456789012345678904",
                },
                {
                  optionId: "69",
                  optionValue:
                    "1234567890123456789012345678901234567890123456789012345678905",
                },
                {
                  optionId: "70",
                  optionValue:
                    "1234567890123456789012345678901234567890123456789012345678906",
                },
                {
                  optionId: "71",
                  optionValue:
                    "1234567890123456789012345678901234567890123456789012345678907",
                },
                {
                  optionId: "72",
                  optionValue:
                    "1234567890123456789012345678901234567890123456789012345678908",
                },
                {
                  optionId: "73",
                  optionValue:
                    "1234567890123456789012345678901234567890123456789012345678909",
                },
              ],
            },
            {
              fieldId: "73",
              fieldName: "1",
              fieldType: 2,
              businessType: 2,
              isRequired: 2,
              fieldOptionList: [
                {
                  optionId: "33",
                  optionValue:
                    "123456789012345678901234567890123456789012345678901234567890",
                },
              ],
            },
          ],
        },
      };
      this.allCustomList = response.data.fieldList || [];
      this.customFlag = this.allCustomList.length ? true : false;
      this.EgridData.columns = [...this.columnsBak]; // 将表头恢复成初始状态
      this.allCustomList.forEach((item) => {
        this.EgridData.columns.splice(this.EgridData.columns.length - 1, 0, {
          name: item.fieldName,
          prop: item.fieldId,
          "min-width": 140,
          sortable: true,
        });
      });
    },
    initData() {
      let that = this;
      let response;
      response = {
        data: {
          total: 1,
          visitorList: [],
        },
      };
      that.tableData = response.data.visitorList || [];
      that.itemTotal = that.tableData.length;
      that.tableData.forEach((item) => {
        if (item.customFieldList && item.customFieldList.length) {
          // 如果有自定义属性
          item.customFieldList.forEach((customItem) => {
            item[customItem.fieldId] = customItem.fieldValue;
          });
        }
      });
      that.createTable(that.tableData);
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    },
    clickDialog() {
      this.dialogForm = true;
      console.log(this.dialogForm);
    },
    onOpen() {},
    onClose() {
      this.$refs.child.$refs.elForm.resetFields();
    },
    close() {
      this.dialogForm = false;
    },
    handelConfirm() {
      this.$refs.child.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      console.log(file);
      this.imageUrl = file.url;
      this.imgDialogVisible = true;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },

    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    createTable(dataList) {
      this.EgridData.data = [];
      if (dataList.length > 0) {
        dataList.forEach((item) => {
          item.signInTime = item.visitorInfo.signInTime
            ? item.visitorInfo.signInTime
            : "";
          item.signOffTime = item.visitorInfo.signOffTime
            ? item.visitorInfo.signOffTime
            : "";
          item.receptionistPhone = item.visitorInfo.receptionistPhone;
          item.receptionistName = item.visitorInfo.receptionistName;
          item.visitorType = item.visitorInfo.visitorType;
          item.status = item.visitorInfo.visitorState;
          if (item.identificationList && item.identificationList.length) {
            item.identificationList.forEach((item1) => {
              if (item1.identityType === 2 || item1.identityType === 6) {
                item.integratedCircuitNo = item1.identityNo;
                item.cardPassword = item1.cardPassword;
                item.identityType = item1.identityType;
              } else if (
                item1.identityType === 1 ||
                item1.identityType === 99
              ) {
                item.identityNo = item1.identityNo;
              }
            });
          }
          if (this.$store.state.isStateChange === "SW") {
            if (item.customFieldList && item.customFieldList.length) {
              item.customFieldList.forEach((item1) => {
                item[item1.fieldId] = item1.fieldValue; // 字符串形式展示，可直接赋值
              });
            }
          }
        });
      }
      this.EgridData.data = dataList;
    },
  },
};
</script>
<style scoped>
.from_item {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  padding: 12px 24px;
  margin-bottom: 0;
}
.from_item >>> .el-select .el-input {
  width: 202px;
}
.shift .footer {
  position: sticky;
  bottom: 0;
  background: #fff;
  padding: 16px 0;
  z-index: 1000;
  width: 100%;
  left: 0;
  text-align: left;
}
.drawerClass {
  right: 0px !important;
  top: 0px !important;
  background-color: #f8f9fa !important;
}
.dialog >>> .formClass {
  min-width: 400px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
</style>
