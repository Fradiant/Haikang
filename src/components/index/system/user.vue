<template>
  <div class="teamInfoPages">
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
      <el-button type="text" @click="dialogNormalShow = true">正常上传</el-button>
      
      <!-- <el-button type="text" @click="dialogVisible = true">点击打开外部引入dialog</el-button> -->
    </div>
    <dialogAll :visible.sync="dialogAll" title="某弹框"></dialogAll>
    <dialogUpload :visible.sync="dialogUploadShow"></dialogUpload>
    <dialogTest :visible.sync="dialogTestShow"></dialogTest>
    <normalUpload :visible.sync="dialogNormalShow"></normalUpload>
    <!-- <dialogForm v-show="dialogForm"> </dialogForm> -->
    <el-dialog
      v-bind="$attrs"
      v-on="$listeners"
      :visible.sync="dialogForm"
      @open="onOpen"
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
      width="30%"
      v-dialogDrag:isDraggable="true"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-drawer
      ref="drawer"
      size="500px"
      :append-to-body="false"
      :custom-class="'drawerClass'"
      v-dialogDrag:isDraggable="true"
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
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
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
</template>
<script>
import dialogForm from "../../dialog/dialogEZ.vue";
import dialogTest from "../../dialog/dialogTest.vue";
import dialogAll from "../../dialog/dialogAll.vue";
import dialogUpload from "../../dialog/dialogUpload.vue";
import normalUpload from "../../dialog/normalUpload.vue";
export default {
  name: "user",
  components: { dialogForm, dialogTest, dialogAll, dialogUpload, normalUpload },
  data() {
    return {
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
        desc: ""
      },
      formLabelWidth: "80px",
      timer: null,
      imageUrl: "",
      imgDialogVisible: false
    };
  },
  methods: {
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
    }
  }
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
>>> .formClass {
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
