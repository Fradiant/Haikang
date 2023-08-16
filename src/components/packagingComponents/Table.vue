<template>
  <div class="teamInfoPages">
    <el-scrollbar style="height: 100%">
      <div class="" v-if="refrsh">
        <Egrid
          ref="shiftTable"
          :hide-side="true"
          :default-sort="{ prop: 'pointSeq', order: 'ascending' }"
          :column-key-map="{ label: 'name' }"
          :table-data="EgridData.data"
          :columns="EgridData.columns"
          :show-pagination="true"
        />
      </div>
      <!-- <pre style="text-align: left">
      {{ EgridData.data }}
    </pre
      > -->
    </el-scrollbar>
  </div>
</template>
<script>
import Egrid from "./customComponent/Egrid.vue";
import Sortable from "sortablejs";

export default {
  name: "Table",
  components: { Egrid },
  data() {
    return {
      refrsh: true,
      EgridData: {
        data: [
          {
            pointSeq: "1",
            date: "2016-05-02",
            name: "王小虎1",
            address: "上海市普陀区金沙江路 100 弄"
          },
          {
            pointSeq: "2",
            date: "2016-05-04",
            name: "王小虎2",
            address: "上海市普陀区金沙江路 200 弄"
          },
          {
            pointSeq: "3",
            date: "2016-05-01",
            name: "王小虎3",
            address: "上海市普陀区金沙江路 300 弄"
          },
          {
            pointSeq: "4",
            date: "2016-05-03",
            name: "王小虎4",
            address: "上海市普陀区金沙江路 400 弄"
          }
        ],
        columns: [
          {
            name: "序列",
            prop: "pointSeq"
          },
          {
            name: "日期",
            prop: "date"
          },
          {
            name: "姓名",
            prop: "name"
          },
          {
            name: "地址",
            prop: "address"
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
                clickEvent: this.delRow
              }
            ]
          }
        ]
      }
    };
  },
  mounted() {
    this.rowDrop();
  },
  methods: {
    rowDrop() {
      const tbody = document.querySelector(".el-table__body-wrapper tbody");
      console.log(tbody);
      const _this = this;
      Sortable.create(tbody, {
        onEnd({ newIndex, oldIndex }) {
          const currRow = _this.EgridData.data.splice(oldIndex, 1)[0];
          _this.EgridData.data.splice(newIndex, 0, currRow);

          // Update the 'index' attribute of the dragged row element
          const rows = tbody.querySelectorAll("tr");
          rows.forEach((row, index) => {
            // Set the 'index' attribute to the row number (index + 1)
            row.setAttribute("index", index + 1);

            // Also update the 'index' property of the corresponding data object
            _this.$set(_this.EgridData.data[index], "pointSeq", index + 1);
            // _this.EgridData.data[index].pointSeq = index + 1;
            // 遗留问题：不手动刷新dom如何实现表格排序
            _this.refrsh = false;
            _this.$nextTick(() => {
              _this.refrsh = true;
              _this.$nextTick(() => {
                _this.rowDrop();
              });
            });
          });
        }
      });
    },
    timeChange() {},
    timeoutChange() {},
    showSelectMoreDialog() {},
    delRow() {}
  }
};
</script>

<style scoped>
.teamInfoPages >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
