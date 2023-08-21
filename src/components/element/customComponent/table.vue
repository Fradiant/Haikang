<template>
  <div>
    <div class="">实现嵌套表格的折叠展开（仅允许展开一行）</div>
    <el-table
      highlight-current-row
      class="uiot-table"
      max-height="601"
      size="mini"
      border
      :default-sort="{ prop: 'name', order: 'ascending' }"
      :data="tableData"
      :row-key="getRowKeys"
      :expand-row-keys="expands"
      @expand-change="expandChange"
    >
      <!-- :row-key="row => row.id"
      :expand-row-keys="[1, 3]" -->
      <el-table-column type="expand">
        <template>
          <el-table class="table-expand" :data="childTableData">
            <el-table-column prop="category" label="name"></el-table-column>
            <el-table-column prop="address"></el-table-column>
            <el-table-column prop="shop"></el-table-column>
            <el-table-column prop="shopId" label="任务状态"></el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column prop="id"></el-table-column>
      <el-table-column prop="name"></el-table-column>
      <el-table-column prop="desc"></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      CurrentRow: "",
      oneDev: {},
      searchName: "",
      dialogType: "new",
      dialogVisible: false,
      tableData: [
        {
          id: "1",
          name: "好滋好味鸡蛋仔",
          desc: "荷兰优质淡奶，奶香浓而不腻"
        },
        {
          id: "2",
          name: "好滋好味鸡蛋仔",
          desc: "荷兰优质淡奶，奶香浓而不腻"
        },
        {
          id: "3",
          name: "好滋好味鸡蛋仔",
          desc: "荷兰优质淡奶，奶香浓而不腻"
        },
        {
          id: "4",
          name: "好滋好味鸡蛋仔",
          desc: "荷兰优质淡奶，奶香浓而不腻"
        }
      ],
      childTableData: [
        {
          category: "江浙小吃、小吃零食",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          category: "江浙小吃、小吃零食",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          category: "江浙小吃、小吃零食",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        },
        {
          category: "江浙小吃、小吃零食",
          address: "上海市普陀区真北路",
          shop: "王小虎夫妻店",
          shopId: "10333"
        }
      ],
      total: 0,
      size: 20,
      currPage: 1,
      sortType: true,
      sortName: "name",
      expands: []
    };
  },
  mounted() {},
  methods: {
    // 表格点击（点击三角）
    getRowKeys: function (row) {
      return row.id;
    },
    expandChange(row, expandedRows) {
      if (expandedRows.length > 1) {
        this.expands = [];
        this.expands.push(row.id);

      }
    }
  }
};
</script>
