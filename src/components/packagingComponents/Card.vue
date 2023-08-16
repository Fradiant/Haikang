<template>
  <div class="teamInfoPages">
    <CustomCard
      :card-data="CardData.data"
      :rows="CardData.rows"
      :show-pagination="true"
    ></CustomCard>
  </div>
</template>
<script>
import CustomCard from "./customComponent/CustomCard.vue";

export default {
  name: "Card",
  components: { CustomCard },
  data() {
    return {
      CardData: {
        data: [
          {
            id: "1",
            cardName: "测试1",
            patrolRoute: "路线1分钟无序"
          },
          {
            id: "2",
            cardName: "测试2",
            patrolRoute: "路线1分钟无序"
          },
          {
            id: "3",
            cardName: "测试2",
            patrolRoute: "路线1分钟无序"
          },
          {
            id: "4",
            cardName: "测试2",
            patrolRoute: "路线1分钟无序"
          },
          {
            id: "5",
            cardName: "测试2",
            patrolRoute: "路线1分钟无序"
          },
          {
            id: "6",
            cardName: "测试2",
            patrolRoute: "路线1分钟无序"
          },
          {
            id: "7",
            cardName: "测试2",
            patrolRoute: "路线1分钟无序"
          },
          {
            id: "8",
            cardName: "测试2",
            patrolRoute: "路线1分钟无序"
          },
          {
            id: "9",
            cardName: "测试2",
            patrolRoute: "路线1分钟无序"
          },
          {
            id: "10",
            cardName: "测试2",
            patrolRoute: "路线1分钟无序"
          }
        ],
        rows: [
          {
            prop: "cardName",
            name: "卡片名称",
            isTitle: true,
            show: false,
            showTitle: false
          },
          {
            prop: "patrolRoute",
            show: false,
            showTitle: false,
            icon: ""
          }
        ]
      }
    };
  }
};
</script>

<style scoped></style>
