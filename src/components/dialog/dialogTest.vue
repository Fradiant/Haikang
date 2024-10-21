<template>
  <div class="">
    <el-drawer
      ref="drawer"
      v-bind="$attrs"
      size="500px"
      :custom-class="'drawerClass'"
      :append-to-body="true"
      :modal-append-to-body="false"
      :wrapperClosable="false"
      @close="cancelForm"
      direction="rtl"
      title="我嵌套了 Form !"
    >
      <section class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item
            label="上传图片"
            :label-width="formLabelWidth"
            class="el-form-item from_item is-required"
          >
            <div v-if="imgOption.length != 0" class="personImg">
              <img
                :height="imgOption[0].height"
                :width="imgOption[0].width"
                :src="imgOption[0].pictureBase64Code"
                @click="selectImg"
              />
            </div>
            <div v-show="imgOption.length == 0" class="personImg">
              <div class="personImgDiv">
                <div class="button_func_icon add_black">
                  <input
                    type="file"
                    id="importHidden"
                    ref="fileUpload"
                    @change="changeImg"
                    @click="addImg"
                  />
                </div>
              </div>
            </div>
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
export default {
  data() {
    return {
      formLabelWidth: "80px",
      loading: false,
      photoLoading: 0,
      form: {},
      dialogImageUrl: "",
      dialogVisible: false,
      imgOption: []
    };
  },
  methods: {
    closeDialog() {},
    cancelForm() {
      this.loading = false;
      this.$parent.dialogTestShow = false;
      clearTimeout(this.timer);
    },
    selectImg() {
      this.$refs.fileUpload.click();
    },
    addImg(e) {
      console.log(e);
    },
    async changeImg(e) {
      const that = this;
      const fileObj = e.target.files[0]; // 赋值文件对象
      const imgName = fileObj.name;
      const imgSize = fileObj.size;
      if (
        !imgName
          .substring(imgName.lastIndexOf("."))
          .toLowerCase()
          .match(/.jpg/)
      ) {
        document.getElementById("importHidden").value = "";
        return false;
      } // 非jpg格式，退出
      function directionTrunIntoBase64(fileObj) {
        const r = new FileReader();
        r.onload = async () => {
          const imgBase64 = r.result;
          const imgdata = {
            pictureName: imgName,
            pictureSize: imgSize,
            pictureBase64Code:
              "data:image/jpeg;base64," +
              imgBase64.replace("data:image/jpeg;base64,", "")
          }; // 图片基本信息
          that.handleFileObj(fileObj, imgdata); // 压缩图片
        };
        r.readAsDataURL(fileObj);
      }
      directionTrunIntoBase64(fileObj); // 文件对象转换为 base64 编码
      document.getElementById("importHidden").value = "";
    },
    async handleFileObj(fileObj, imgdata) {
      // 处理图片，包括base64转blob，图片压缩；
      console.log(fileObj);
      const croppedBlob = this.imageUtils.dataURLtoBlob(
        imgdata.pictureBase64Code
      );
      console.log("croppedBlob", croppedBlob);
      const croppedFile = new File([croppedBlob], "userPhoto.png", {
        type: croppedBlob.type
      });
      console.log(croppedFile, "原图"); // jpg格式的blob对象
      const compressedImage = await this.imageUtils.compressAccurately(
        croppedFile,
        512
      ); // 图片大小小于512不压缩；
      console.log(compressedImage, "压缩后的");
      this.imageUtils.blobToBase64(compressedImage, imgBase64 => {
        this.imgOption = [];
        this.imgOption.push({
          pictureName: fileObj.name,
          pictureBase64Code: imgBase64,
          height: "100%",
          width: "100%"
        });
      });
    }
  }
};
</script>

<style scoped>
.drawerClass {
  right: 0px !important;
  top: 0px !important;
  background-color: #f8f9fa !important;
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
  width: 148px;
  height: 148px;
  line-height: 148px;
  text-align: center;
}

.avatar {
  width: 148px;
  height: 148px;
  display: block;
}

.avatar-uploader >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.personImg {
  height: 194px;
  width: 134px;
  display: inline-block;
  border: 2px dashed #a9a9a9;
  vertical-align: top;
  color: #b0b0b0;
}

.personImg:hover {
  background: #d2e0f1;
  border: 2px dashed #5098eb;
  color: #fff;
}

.personImgDiv {
  text-align: center;
  margin-top: 64px !important;
}

.personImg .button_func_icon {
  display: block;
  margin: 0 auto;
}

.add_black {
  height: 40px;
  width: 40px;
  border: 0px;
  cursor: pointer;
}
</style>
