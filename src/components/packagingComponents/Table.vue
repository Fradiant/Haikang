<template>
  <div class="teamInfoPages">
    <div class="">
      <Egrid ref="shiftTable"
      :hide-side="true"
      :column-key-map="{ label: 'name' }"
      :table-data="EgridData.data"
      :columns="EgridData.columns"
      :show-pagination="true"
      height="150px" />
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
        data: [],
        columns: [
          {
            prop: "pointId",
            show: false,
          },
          {
            prop: "pointSeq",
            show: false,
          },
          {
            name: "序号",
            prop: "scheduleSeq",
            align: "center",
            width: "70",
          },
          {
            name: "总时长",
            prop: "patrolDuration",
            resizeable: false,
            width: "100",
            align: "center",
          },
          {
            name: "巡更开始时间",
            timeSelect: true,
            timeChange: this.timeChange,
            align: "center",
            Format: "HH:mm",
            width: "150",
            resizeable: false,
            value: "startTime",
          },
          {
            name: "巡更结束时间",
            timeSelect: true,
            timeChange: this.timeChange,
            isAcross: "isAcross",
            Format: "HH:mm",
            width: "150",
            align: "center",
            resizeable: false,
            value: "endTime",
          },
          {
            name: "超时时间",
            showInput: true,
            width: "150",
            resizeable: false,
            align: "center",
            value: "timeout",
            formatter: this.timeoutChange,
          },
          {
            name: "巡更人员",
            showSelect: true,
            width: "175",
            resizeable: false,
            align: "center",
            formatter: this.formatPerson,
            showSelectMoreDialog: this.showSelectMoreDialog,
          },
          {
            name: "操作",
            prop: "operate",
            resizeable: false,
            align: "center",
            DefaultButton: [
              {
                classname: "u-icon-del",
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