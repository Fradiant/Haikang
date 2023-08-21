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
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="handleAvatarSuccess"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
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
      this.$parent.dialogUploadShow = false;
      clearTimeout(this.timer);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleAvatarSuccess(res, file) {
      console.log(file);
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl);
      const a = this.compressImg(file);
      console.log(a);
    },
    compressImg(file) {
      const reader = new FileReader();
      // readAsDataURL 方法会读取指定的 Blob 或 File 对象。读取操作完成的时候，readyState 会变成已完成DONE，并触发 loadend (en-US) 事件，
      // 同时 result 属性将包含一个data:URL格式的字符串（base64编码）以表示所读取文件的内容。
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          // 图片的宽高
          const w = img.width;
          const h = img.height;
          const canvas = document.createElement("canvas");
          // canvas对图片进行裁剪，这里设置为图片的原始尺寸
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          // canvas中，png转jpg会变黑底，所以先给canvas铺一张白底
          ctx.fillStyle = "#fff";
          // fillRect()方法绘制一个填充了内容的矩形，这个矩形的开始点（左上点）在
          // (x, y) ，它的宽度和高度分别由width 和 height 确定，填充样式由当前的fillStyle 决定。
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          // 绘制图像
          ctx.drawImage(img, 0, 0, w, h);

          // canvas转图片达到图片压缩效果
          // 返回一个包含图片展示的 data URI base64 在指定图片格式为 image/jpeg 或 image/webp的情况下，
          // 可以从 0 到 1 的区间内选择图片的质量。如果超出取值范围，将会使用默认值 0.92。其他参数会被忽略。
          const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
          // base64格式文件转成Blob文件格式
          return this.dataURLtoBlob(dataUrl);
        };
      };
    },

    // canvas生成的格式为base64，需要进行转化
    dataURLtoBlob(base64Data) {
      const parts = base64Data.split(",");
      const mimeType = parts[0].match(/:(.*?);/)[1];
      const decodedData = window.atob(parts[1]);
      const length = decodedData.length;
      const bytes = new Uint8Array(length);

      for (let i = 0; i < length; i++) {
        bytes[i] = decodedData.charCodeAt(i);
      }

      return new Blob([bytes], {
        type: mimeType
      });
    },

    saveCroppedImageAndUpload() {
      this.photoLoading = true;
      this.$refs.crop.getCutImgPromise().then(croppedImage => {
        let croppedBlob = this.convertDataUrlToBlob(croppedImage);
        const croppedFile = new window.File([croppedBlob], "userPhoto.png", {
          type: croppedBlob.type
        });
        console.log(croppedFile, "原图");
        ue.compressAccurately(croppedFile, 200).then(compressedImage => {
          console.log(compressedImage, "压缩后的");

          let compressedBlob = new window.File(
            [compressedImage],
            "userPhoto.png",
            {
              type: compressedImage.type
            }
          );

          self.cropDialog.show = false;

          const formData = new FormData();
          formData.append("file", compressedBlob);

          this.uploading = true;
          Object(ge.q)(formData)
            .then(res => {
              if (res.code === 0) {
                console.log(res.data);
                this.saveFaceInfo(res.data);
              }
            })
            .catch(err => {
              console.log(err);
              this.photoLoading = false;
            })
            .finally(() => {
              this.uploading = false;
            });
        });
      });
    },
    convertDataUrlToBlob(dataUrl, mimeType) {
      return new Promise((resolve, reject) => {
        const parts = dataUrl.split(",");
        let type = parts[0].match(/:(.*?);/)[1];
        const base64Data = atob(parts[1]);
        let length = base64Data.length;
        const uint8Array = new Uint8Array(length);
        while (length--) {
          uint8Array[length] = base64Data.charCodeAt(length);
        }
        if (isValidType(mimeType)) {
          type = mimeType;
        }
        resolve(new Blob([uint8Array], { type }));
      });
    },
    getCroppedImagePromise() {
      let self = this;
      return new Promise(resolve => {
        let cutImgRef = self.$refs.cutImg;
        let cutPos = self.getcutpos();
        let img = new Image();
        let realZoom = self.getRealZoom();
        let canvasWidth = self.isLogoImg ? 423 : self.isCardImg ? 650 : 423;
        let canvasHeight = self.isLogoImg ? 300 : self.isCardImg ? 340 : 412;
        let scaleFactor = 1;

        if (realZoom < 1) {
          img.width = realZoom * self.imgOriginalW;
          img.height = realZoom * self.imgOriginalH;
          scaleFactor = 1;
        } else {
          scaleFactor = 1;
          img.width = cutImgRef.width;
          img.height = cutImgRef.height;
        }

        img.setAttribute("src", self.cutImgUrl);

        let canvas = document.createElement("canvas");
        canvas.width = canvasWidth / scaleFactor;
        canvas.height = canvasHeight / scaleFactor;

        let ctx = canvas.getContext("2d");

        img.onload = function () {
          ctx.fillStyle = "#fff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(
            img,
            -parseInt(cutPos.x / scaleFactor, 10),
            -parseInt(cutPos.y / scaleFactor, 10),
            img.width,
            img.height
          );

          let dataURL = canvas.toDataURL();

          if (canvas.remove) {
            canvas.remove();
          } else if (canvas.removeNode) {
            canvas.removeNode();
          }

          resolve(dataURL);
        };
      });
    },
    compressBlob(blob, options = {}) {
      return new Promise((resolve, reject) => {
        if (!(blob instanceof Blob)) {
          throw new Error(
            "compressBlob(): First arg must be a Blob object or a File object."
          );
        }
        if (typeof options !== "object") {
          options = Object.assign({ size: options });
        }
        options.size = Number(options.size);
        if (Number.isNaN(options.size)) {
          return resolve(blob);
        }

        if (1024 * options.size > blob.size) {
          return resolve(blob);
        }

        options.accuracy = Number(options.accuracy);
        if (
          !options.accuracy
          || options.accuracy < 0.8
          || options.accuracy > 0.99
        ) {
          options.accuracy = 0.95;
        }

        const targetSize = options.size * (2 - options.accuracy) * 1024;
        const originalSize = 1024 * options.size;
        const minSize = options.size * options.accuracy * 1024;

        compressStep(blob)
          .then(dataUrl => {
            let mimeType = dataUrl.split(",")[0].match(/:(.*?);/)[1];
            let format = n.JPEG;

            if (isValidType(options.type)) {
              format = options.type;
              mimeType = options.type;
            }

            return convertDataUrlToBlob(dataUrl);
          })
          .then(arrayBuffer => {
            let currentSize;
            let currentData;
            let currentStep = 0.5;
            const previousData = [null, null];

            for (let step = 1; step <= 7; step++) {
              currentData = applyCompression(arrayBuffer, currentStep, format);
              currentSize = 0.75 * currentData.length;

              if (step === 7) {
                if (targetSize < currentSize || minSize > currentSize) {
                  const filteredData = [currentData, ...previousData]
                    .filter(data => data)
                    .sort(
                      (a, b) =>
                        Math.abs(0.75 * a.length - originalSize)
                        - Math.abs(0.75 * b.length - originalSize)
                    );
                  currentData = filteredData[0];
                }
                break;
              }

              if (targetSize < currentSize) {
                previousData[1] = currentData;
                currentStep -= Math.pow(0.5, step + 1);
              } else {
                if (!(minSize > currentSize)) {
                  break;
                }
                previousData[0] = currentData;
                currentStep += Math.pow(0.5, step + 1);
              }
            }

            return loadImage(currentData, mimeType);
          })
          .then(compressedBlob => {
            return resolve(
              compressedBlob.size > blob.size ? blob : compressedBlob
            );
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    saveFaceInfo(e) {
      let t = {
        personNo: this.personNo,
        type: 3,
        content: e,
        inputFace: 1
      };
      Object(ge.o)(t)
        .then(e => {
          0 === e.code
            && (this.$message({
              type: "success",
              message: this.$t("BiologicalInfo.message.operation_success")
            }),
            this.getFaceInfo(),
            this.$emit("refresh"),
            (this.photoLoading = !1));
        })
        .catch(e => {
          console.error(e), (this.photoLoading = !1);
        });
    },
    selectImg() {
      this.$refs.fileUpload.click();
    },
    addImg(e) {
      console.log(e);
    },
    changeImg(e) {
      console.log(e);
      const that = this;
      const fileObj = e.target.files[0];
      const imgName = fileObj.name;
      const imgSize = fileObj.size;
      if (
        !imgName
          .substring(imgName.lastIndexOf("."))
          .toLowerCase()
          .match(/.jpg/)
      ) {
        console.log("yes");
        document.getElementById("importHidden").value = "";
        return false;
      }
      function directionTrunIntoBase64(fileObj) {
        console.log(fileObj);
        const r = new FileReader();
        r.onload = () => {
          const imgBase64 = r.result;
          const imgdata = {
            pictureName: imgName,
            pictureSize: imgSize,
            pictureBase64Code: imgBase64.replace("data:image/jpeg;base64,", "")
          };
          const image = new Image(100, 100);
          image.src = "data:image/jpeg;base64," + imgdata.pictureBase64Code;
          image.addEventListener("load", () => {
            that.imgOption = [];
            that.getImgWH(imgdata, fileObj, imgdata1 => {
              console.log(imgdata1);
              that.imgOption.push(imgdata1);
            });
          });
        };
        r.readAsDataURL(fileObj);
      }
      directionTrunIntoBase64(fileObj);
      document.getElementById("importHidden").value = "";
      console.log(this.imgOption);
    },

    async getImgWH(data, fileObj, callBack) {
      const img = await this.fileToImg(fileObj);
      const { width: originWidth, height: originHeight } = img;
      const scale = +(originWidth / originHeight).toFixed(2); // 比例取小数点后两位)
      const targetWidth = 200; // 固定宽
      const targetHeight = Math.round(200 / scale); // 等比例缩放高
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      let fileSize = fileObj.size;
      const image = new Image();
      image.src = "data:image/jpeg;base64," + data.pictureBase64Code;
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // 创建属性节点
      context.clearRect(0, 0, targetWidth, targetHeight);
      // canvas重新绘制图片
      context.drawImage(image, 0, 0, targetWidth, targetHeight);
      if (fileSize) {
        image.src = canvas.toDataURL(fileObj.type, 0.94);
      }
      image.addEventListener("load", () => {
        let height = "100%";
        let width = "100%";
        if (image.naturalWidth / image.naturalHeight >= 1) {
          height
            = Math.round((image.naturalHeight / image.naturalWidth) * 100) + "%";
        }
        //  else {
        //   width =
        //     Math.round((image.naturalWidth / image.naturalHeight) * 100) + "%";
        // }
        callBack({
          pictureName: data.pictureName,
          pictureBase64Code: image.src,
          height,
          width
        });
      });
    },
    fileToImg(file) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        const reader = new FileReader();
        reader.onload = function (e) {
          img.src = e.target.result;
        };
        reader.onerror = function (e) {
          reject(e);
        };
        reader.readAsDataURL(file);
        img.onload = function () {
          resolve(img);
        };
        img.onerror = function (e) {
          reject(e);
        };
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
