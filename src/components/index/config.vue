<template>
  <div class="teamInfoPages">
    <el-scrollbar style="height: 100%">
      <el-table :data="tableData" border row-key="address" align="left">
        <el-table-column
          v-for="(item, index) in col"
          :key="`col_${index}`"
          :prop="dropCol[index].prop"
          :label="item.label"
        >
        </el-table-column>
      </el-table>
      <!-- <pre style="text-align: left">
        {{ dropCol }}
      </pre> -->
      <hr />
      <pre style="text-align: left">
        {{ tableData }}
      </pre>
    </el-scrollbar>
  </div>
</template>

<script>
import Sortable from "sortablejs";

export default {
  data() {
    return {
      col: [
        {
          label: "序列",
          prop: "index"
        },
        {
          label: "唯一值",
          prop: "id"
        },
        {
          label: "日期",
          prop: "date"
        },
        {
          label: "姓名",
          prop: "name"
        },
        {
          label: "地址",
          prop: "address"
        }
      ],
      dropCol: [
        {
          label: "序列",
          prop: "index"
        },
        {
          label: "序列",
          prop: "id"
        },
        {
          label: "日期",
          prop: "date"
        },
        {
          label: "姓名",
          prop: "name"
        },
        {
          label: "地址",
          prop: "address"
        }
      ],
      tableData: [
        {
          index: "1",
          id: "1",
          date: "2016-05-02",
          name: "王小虎1",
          address: "上海市普陀区金沙江路 100 弄"
        },
        {
          index: "2",
          id: "2",
          date: "2016-05-04",
          name: "王小虎2",
          address: "上海市普陀区金沙江路 200 弄"
        },
        {
          index: "3",
          id: "3",
          date: "2016-05-01",
          name: "王小虎3",
          address: "上海市普陀区金沙江路 300 弄"
        },
        {
          index: "4",
          id: "4",
          date: "2016-05-03",
          name: "王小虎4",
          address: "上海市普陀区金沙江路 400 弄"
        }
      ]
    };
  },
  mounted() {
    this.rowDrop();
  },
  methods: {
    rowDrop() {
      const tbody = document.querySelector(".el-table__body-wrapper tbody");
      const _this = this;
      Sortable.create(tbody, {
        onEnd({ newIndex, oldIndex }) {
          const currRow = _this.tableData.splice(oldIndex, 1)[0];
          _this.tableData.splice(newIndex, 0, currRow);

          // Update the 'index' attribute of the dragged row element
          const rows = tbody.querySelectorAll("tr");
          rows.forEach((row, index) => {
            // Set the 'index' attribute to the row number (index + 1)
            row.setAttribute("index", index + 1);

            // Also update the 'index' property of the corresponding data object
            _this.tableData[index].index = index + 1;
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.teamInfoPages >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
