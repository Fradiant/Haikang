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
              "data:image/jpeg;base64,"
              + imgBase64.replace("data:image/jpeg;base64,", "")
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
      const croppedBlob = this.dataURLtoBlob(imgdata.pictureBase64Code);
      console.log(croppedBlob);
      const croppedFile = new File([croppedBlob], "userPhoto.png", {
        type: croppedBlob.type
      });
      console.log(croppedFile, "原图"); // jpg格式的blob对象
      const compressedImage = await this.compressAccurately(croppedFile, 200); // 图片大小小于200不压缩；
      console.log(compressedImage, "压缩后的");
      this.blobToBase64(compressedImage, imgBase64 => {
        this.imgOption = [];
        this.imgOption.push({
          pictureName: fileObj.name,
          pictureBase64Code: imgBase64,
          height: "100%",
          width: "100%"
        });
      });
    },
    blobToBase64(blob, callback) {
      const fileReader = new FileReader();
      fileReader.onload = e => {
        callback(e.target.result);
      };
      fileReader.readAsDataURL(blob);
    },

    // canvas生成的格式为base64，需要进行转化
    dataURLtoBlob(dataURL) {
      const [, mimeString, base64Data] = dataURL.match(
        /data:(.*?);base64,(.*)/
      );
      const byteCharacters = atob(base64Data);
      const byteArrays = [];
      for (let i = 0; i < byteCharacters.length; i++) {
        byteArrays.push(byteCharacters.charCodeAt(i));
      }
      const blob = new Blob([new Uint8Array(byteArrays)], { type: mimeString });
      return blob;
    },
    async compressAccurately(file, options = {}) {
      console.log(file, options);
      const that = this;
      return await (async () => {
        if (!(file instanceof Blob)) {
          throw new Error(
            "compressAccurately(): First arg must be a Blob object or a File object."
          );
        } // 检查 file 是否为 Blob 对象或 File 对象
        if (typeof options !== "object") {
          options = Object.assign({ size: options });
        } // option如果不是对象，则将其转为具有size属性的对象

        options.size = Number(options.size);
        if (Number.isNaN(options.size)) {
          return file;
        }

        console.log(options);
        console.log(file.size);
        if (1024 * options.size > file.size) {
          return file;
        }

        options.accuracy = Number(options.accuracy);

        if (
          !options.accuracy
          || options.accuracy < 0.8
          || options.accuracy > 0.99
        ) {
          options.accuracy = 0.95;
        }
        console.log(options);
        // 分别计算文件最大大小、目标文件大小和期望文件大小
        // 以300kb为例：分别是15360、327000、291840 【15、300、285】
        const maxFileSize = options.size * (2 - options.accuracy) * 1024;
        const targetFileSize = 1024 * options.size;
        const desiredFileSize = options.size * options.accuracy * 1024;

        console.log(file); // 正常
        const dataURL = await that.readAsDataURL(file);
        console.log(dataURL); // 正常

        let mimeType = dataURL.split(",")[0].match(/:(.*?);/)[1]; // 通过拆分匹配字符串、获取文件类型
        let imageType = "image/jpeg";
        console.log(mimeType);

        if (options.type) {
          imageType = options.type;
          mimeType = options.type;
        }

        const imageData = await that.loadImageFromDataURL(dataURL);
        const processedImage = await that.transformImage(
          imageData,
          Object.assign({}, options)
        ); // 根据条件返回对应画布
        console.log(processedImage);
        let compressedImage;
        let compressionFactor = 0.5;
        const compressedImages = [null, null];
        // 在第 7 次迭代过程中，检查压缩后的大小是否符合最大文件大小和期望文件大小的要求。如果不符合，则从 compressedImages 数组中选择最接近目标文件大小的压缩图像。
        for (let i = 1; i <= 7; i++) {
          compressedImage = await that.convertToDataURL(
            processedImage,
            compressionFactor,
            imageType
          );
          const compressedSize = 0.75 * compressedImage.length; // 保存每次压缩生成的图像数据

          if (i === 7) {
            if (
              maxFileSize < compressedSize
              || desiredFileSize > compressedSize
            ) {
              compressedImage = [compressedImage, ...compressedImages]
                .filter(image => image)
                .sort(
                  (a, b) =>
                    Math.abs(0.75 * a.length - targetFileSize)
                    - Math.abs(0.75 * b.length - targetFileSize) // 内置函数，返回绝对值
                )[0];
            }
            break;
          }

          if (maxFileSize < compressedSize) {
            compressedImages[1] = compressedImage;
            compressionFactor -= Math.pow(0.5, i + 1);
          } else {
            if (!(desiredFileSize > compressedSize)) {
              break;
            }
            compressedImages[0] = compressedImage;
            compressionFactor += Math.pow(0.5, i + 1);
          }
        }
        console.log(compressedImage, mimeType);

        const finalCompressedImage = await that.decodeAndCreateBlob(
          compressedImage,
          mimeType
        );

        return finalCompressedImage.size > file.size
          ? file
          : finalCompressedImage;
      })();
    },
    decodeAndCreateBlob(data, fileType) {
      const that = this;
      return new Promise((resolve, reject) => {
        const dataArray = data.split(",");
        let mimeType = dataArray[0].match(/:(.*?);/)[1];
        const base64Data = atob(dataArray[1]);
        let dataLength = base64Data.length;
        const uint8Array = new Uint8Array(dataLength);

        for (let i = 0; i < dataLength; i++) {
          uint8Array[i] = base64Data.charCodeAt(i);
        }
        if (fileType && that.isValidMimeType(fileType)) {
          // if (fileType) {
          console.log(that.isValidMimeType(fileType));
          mimeType = fileType;
        }

        const blob = new Blob([uint8Array], { type: mimeType });

        resolve(blob);
      });
    },

    isValidMimeType(e) {
      return ["image/png", "image/jpeg", "image/gif"].some(t => t === e);
    },
    convertToDataURL(image, quality = 0.92, type = "image/jpeg") {
      return new Promise((resolve, reject) => {
        if (!image || typeof image.toDataURL !== "function") {
          reject(new Error("Invalid image element"));
        }

        const dataURL = image.toDataURL(type, quality);
        resolve(dataURL);
      });
    },

    readAsDataURL(file) {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onloadend = event => resolve(event.target.result);
        reader.readAsDataURL(file);
      });
    },
    loadImageFromDataURL(e) {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () =>
          reject(new Error("loadImageFromDataURL(): Failed to load image"));
        image.src = e;
      });
    },
    transformImage(e, options = {}) {
      return new Promise((resolve, reject) => {
        const { width, height, orientation, scale } = Object.assign(
          {},
          options
        );
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        let targetWidth;
        let targetHeight;
        if (scale) {
          // 缩放比例
          const validScale = scale > 0 && scale < 10 ? scale : 1;
          targetWidth = e.width * validScale;
          targetHeight = e.height * validScale;
        } else {
          targetWidth = width || (height * e.width) / e.height || e.width;
          targetHeight = height || (width * e.height) / e.width || e.height;
        }

        switch (orientation) {
          case 3:
            canvas.height = targetHeight;
            canvas.width = targetWidth;
            context.rotate((180 * Math.PI) / 180);
            context.drawImage(
              e,
              -canvas.width,
              -canvas.height,
              canvas.width,
              canvas.height
            );
            break;
          case 6:
            canvas.height = targetWidth;
            canvas.width = targetHeight;
            context.rotate((90 * Math.PI) / 180);
            context.drawImage(e, 0, -canvas.width, canvas.height, canvas.width);
            break;
          case 8:
            canvas.height = targetWidth;
            canvas.width = targetHeight;
            context.rotate((270 * Math.PI) / 180);
            context.drawImage(
              e,
              -canvas.height,
              0,
              canvas.height,
              canvas.width
            );
            break;
          case 2:
            canvas.height = targetHeight;
            canvas.width = targetWidth;
            context.translate(canvas.width, 0);
            context.scale(-1, 1);
            context.drawImage(e, 0, 0, canvas.width, canvas.height);
            break;
          case 4:
            canvas.height = targetHeight;
            canvas.width = targetWidth;
            context.translate(canvas.width, 0);
            context.scale(-1, 1);
            context.rotate((180 * Math.PI) / 180);
            context.drawImage(
              e,
              -canvas.width,
              -canvas.height,
              canvas.width,
              canvas.height
            );
            break;
          case 5:
            canvas.height = targetWidth;
            canvas.width = targetHeight;
            context.translate(canvas.width, 0);
            context.scale(-1, 1);
            context.rotate((90 * Math.PI) / 180);
            context.drawImage(e, 0, -canvas.width, canvas.height, canvas.width);
            break;
          case 7:
            canvas.height = targetWidth;
            canvas.width = targetHeight;
            context.translate(canvas.width, 0);
            context.scale(-1, 1);
            context.rotate((270 * Math.PI) / 180);
            context.drawImage(
              e,
              -canvas.height,
              0,
              canvas.height,
              canvas.width
            );
            break;
          default:
            canvas.height = targetHeight;
            canvas.width = targetWidth;
            context.drawImage(e, 0, 0, canvas.width, canvas.height);
        }

        resolve(canvas);
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
