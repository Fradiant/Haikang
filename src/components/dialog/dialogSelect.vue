<template>
  <div class="dialogSelect" style="min-width: 300px; overflow: hidden">
    <el-scrollbar style="height: 400px">
      <el-button @click="addCard" :disabled="buttonDisabled">
        添加卡片
      </el-button>
      <el-scrollbar style="height: 320px">
        <el-card v-for="(item, index) in cardList" :key="index">
          <div class="cardTitle">
            <span>卡片 {{ index + 1 }}</span>
            <el-button
              type="icon"
              icon="el-icon-delete"
              @click="deleteCard(index)"
            ></el-button>
          </div>
          <div class="cardContent">
            <div class="cardItem">
              <span>卡号</span>
              <el-input
                v-model="item.cardNo"
                :ref="'cardFormList' + index"
              ></el-input>
            </div>
            <div class="cardItem">
              <span>卡号密码</span>
              <el-input v-model="item.cardPassword"></el-input>
            </div>
          </div>
        </el-card>
      </el-scrollbar>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardList: [],
      cardMaxNum: 6,
    };
  },
  computed: {
    buttonDisabled() {
      return this.cardList.length >= this.cardMaxNum;
    },
  },
  methods: {
    addCard() {
      if (this.cardList.length < this.cardMaxNum) {
        this.cardList.push({
          cardNo: "",
          cardPassword: "",
        });
        this.$nextTick(() => {
          this.scrollView("cardFormList", this.cardList.length - 1);
        });
      }
    },
    deleteCard(index) {
      this.cardList.splice(index, 1);
    },
    scrollView(formList, index) {
      const inputElement = this.$refs[formList + index][0];
      inputElement.$el.scrollIntoView({
        behavio: "smooth",
        block: "center",
      });
      inputElement.focus();
      console.log(inputElement);
    },
  },
};
</script>

<style scoped>
.dialogSelect >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
.cardTitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 1;
}
</style>