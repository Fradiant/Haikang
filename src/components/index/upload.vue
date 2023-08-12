<template>
  <div class="">
    <el-button @click="onSaveCrop"> </el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      photoLoading: 0
    };
  },
  methods: {
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
          Object(ge["q"])(formData)
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
        let cutImgRef = self.$refs["cutImg"];
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

        img.onload = function() {
          ctx.fillStyle = "#fff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(
            img,
            -parseInt(cutPos.x / scaleFactor, 10),
            -parseInt(cutPos.y / scaleFactor, 10),
            img.width,
            img.height
          );

          var dataURL = canvas.toDataURL();

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
          !options.accuracy ||
          options.accuracy < 0.8 ||
          options.accuracy > 0.99
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
                        Math.abs(0.75 * a.length - originalSize) -
                        Math.abs(0.75 * b.length - originalSize)
                    );
                  currentData = filteredData[0];
                }
                break;
              }

              if (targetSize < currentSize) {
                previousData[1] = currentData;
                currentStep -= Math.pow(0.5, step + 1);
              } else {
                if (!(minSize > currentSize)) break;
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
      Object(ge["o"])(t)
        .then(e => {
          0 === e.code &&
            (this.$message({
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
    dataURLtoBlob(dataURL) {
      const [, mime] = dataURL.match(/:(.*?);/);
      const binaryString = window.atob(dataURL.split(",")[1]);
      const length = binaryString.length;
      const uint8Array = new Uint8Array(length);

      for (let i = 0; i < length; i++) {
        uint8Array[i] = binaryString.charCodeAt(i);
      }

      return new Blob([uint8Array], { type: mime });
    }
  }
};
</script>
