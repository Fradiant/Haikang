<template>
  <div class="login">
    <div class="form">
      <el-form
        :rules="rules"
        ref="loginForm"
        :model="loginForm"
        class="loginContainer"
      >
        <h3 class="loginTitle">
          晴转多云
        </h3>
        <el-form-item prop="username">
          <el-input
            v-emoji
            type="text"
            v-model="loginForm.username"
            placeholder="亲，请输入用户名"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-emoji
            type="password"
            v-model="loginForm.password"
            placeholder="亲，请输入密码"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-emoji
            type="text"
            auto-complete="false"
            v-model="loginForm.code"
            placeholder="点击图片更换验证码"
            style="width: 250px;margin-right: 5px"
          >
          </el-input>
          <img :src="captchaUrl" />
        </el-form-item>
        <el-checkbox v-model="checked" class="loginRemember"
          >记住我</el-checkbox
        >
        <el-button type="primary" style="width:100%" @click="submitLogin"
          >登录</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      captchaUrl: "",
      loginForm: {
        username: "admin",
        password: "alksdjgfkldfajg;la",
        code: ""
      },
      checked: true,
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 5, max: 14, message: "长度在 5 到 14 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码长度要大于6", trigger: "blur" }
        ],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (
            this.loginForm.username === "admin" &&
            this.loginForm.password === "alksdjgfkldfajg;la"
          ) {
            const path = "/Index";
            this.$message.success("登录成功");
            this.$router.push({ path });
            this.$store.commit("changeMain", true);
            this.$store.commit("setToekn", true); // 模仿获取token，禁止无token登录
          } else {
            this.$message.error("登录出错请重新输入");
          }
        } else {
          this.$message.error("登录出错请重新输入");
          return false;
        }
      });
    },
    loginTest() {
      this.$refs.loginForm.valid(valid => {
        if (!valid) {
          return;
        }
        const pwdMd5 =
          this.ms5.hex(this.formData.password) +
          this.ms5.hex(this.formData.password).splice(0, 8);
        const slotMd5 = this.md5.hex(pwdMd5);
        this.btnText = "登陆中，请稍后";
        return new Promise(resolve => {
          const params = {
            url: this.ComScript.OPENAPI.Accout.login,
            showWrong: false,
            dataMap: {
              userName: this.formData.loginName,
              password: slotMd5,
              clientId: "",
              clientName: "Sass"
            },
            callback: response => {
              if (response.code === 200) {
                this.loginAction(response);
              } else {
                this.loginFailTip(response);
              }
              resolve();
            }
          };
          this.$store.dispatch("OPENAPI_PostCfgTool", params);
        });
      });
    },
    loginAction(response) {
      sessionStorage.setItem("auth", JSON.stringify(response.data));
      this.$store.commit("setAuth", response.data);
      this.getAccoutInfo();
    },
    getAccoutInfo() {
      const self = this;
      return new Promise(resolve => {
        const params = {
          url: this.ComScript.OPENAPI.Account.getAccount,
          callback: async response => {
            if (response.code === 200) {
              const userData = response.data;
              self.$store.commit("setUserName", this.formData.loginName);
              if (!userData.phone) {
                sessionStorage.removeItem("phone");
              } else {
                self.$store.commit("setUserType", userData.userType);
                self.$store.commit("setUserPhone", userData.phone);
                sessionStorage.setItem("phone", userData.phone);
                const path = "/Index";
                this.$router.push({ path });
              }
            }
            resolve();
          }
        };
        this.$store.dispatch("OPENAPI_PostCfgTool", params);
      });
    }
  }
};
</script>

<style scoped>
.login {
  background-image: url("../../assets/background.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: fixed; /* 充满全屏 */
  height: 100%;
  width: 100%;
}
.form {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  width: 450px;
  padding: 25px 35px 25px 35px;
  background: aliceblue;
  border: 1px solid blueviolet;
  box-shadow: 0 0 25px #f885ff;
}
.loginTitle {
  margin: 0px auto 48px auto;
  text-align: center;
  font-size: 40px;
}
.loginRemember {
  text-align: left;
  margin: 0px 0px 15px 0px;
}
</style>
