<template>
  <div class="teamInfoPages">
    <div class="">
      <Egrid ref="shiftTable"
      :hide-side="true"
      :column-key-map="{ label: 'name' }"
      :table-data="EgridData.data"
      :columns="EgridData.columns"
      :show-pagination="true" />
    </div>
  </div>
</template>
<script>
import Egrid from "./customComponent/Egrid.vue";
export default {
  name: "Table",
  components: { Egrid },
  data() {
    return {
      EgridData: {
        data: [
          {
            id: 123,
            name: "1",
          }, {
            id: 123,
            name: "1",
          }
        ],
        columns: [
          {
            prop: "id",
            show: true,
            name: "id"
          },
          {
            prop: "name",
            show: true,
            name: "name"
          },
          {
            name: "操作",
            prop: "operate",
            resizeable: false,
            align: "center",
            DefaultButton: [
              {
                classname: "el-icon-delete",
                title: "删除",
                clickEvent: this.delRow,
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    timeChange() { },
    timeoutChange() { },
    showSelectMoreDialog() { },
    delRow() { },
  },
};
</script>

<style scoped>

</style>