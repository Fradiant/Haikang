<template>
  <div class="">
    <el-table
      :data="tableData"
      stripe
      :row-key="getRowKeys"
      @expand-change="expandSelect"
      :expand-row-keys="expands"
      @row-click="rowClick"
      @selection-change="handleSelectionChange"
      :row-class-name="isShowIcon"
      style="width: 100%"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table :data="props.row.child" border>
            <el-table-column
              prop="comp_name"
              :show-overflow-tooltip="true"
              label="查询项目集名称"
            >
              <template slot-scope="oscope"></template>
            </el-table-column>-
            <el-table-column prop="comp_name" label="children名称1">
              <template slot-scope="oscope">{{
                oscope.row.comp_name1
              }}</template>
            </el-table-column>
            <el-table-column prop="comp_name" label="children名称2">
              <template slot-scope="oscope">{{
                oscope.row.comp_name2
              }}</template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click.stop="editChildInfo"
                  >修改</el-button
                >
                <el-button
                  type="text"
                  @click.stop="editChildInfo"
                  style="color: red"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column label=" ID" prop="id"></el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="产地" prop="address"></el-table-column>
      <!-- <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click.stop="editInfo">修改</el-button>
          <el-button type="text" @click.stop="editInfo" style="color: red"
            >删除</el-button
          >
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>
<script>
export default {
  name: "testTable",
  data() {
    return {
      tableData: [
        {
          id: "1",
          name: "商品name1",
          address: "云南",
          type: 3,
          child: [
          ]
        },
        {
          id: "2",
          name: "商品name2",
          address: "西藏",
          type: 2,
          child: [
            {
              comp_name1: "二行商品1",
              comp_name2: "二行商品2"
            },
            {
              comp_name1: "二行商品1",
              comp_name2: "二行商品2"
            }
          ]
        },
        {
          id: "3",
          name: "商品3",
          address: "黑龙江",
          type: 4,
          child: [
            {
              comp_name1: "三行商品1",
              comp_name2: "三行商品2"
            },
            {
              comp_name1: "三行商品1",
              comp_name2: "三行商品2"
            }
          ]
        },
        {
          id: "4",
          name: "商品4",
          address: "海南",
          type: 1,
          child: [
            {
              comp_name1: "四行商品1",
              comp_name2: "四行商品2"
            }
          ]
        },
        {
          id: "5",
          name: "商品5",
          address: "重庆",
          type: 0,
          child: []
        }
      ],
      expands: [],
      // 选中的数组
      multipleSelection: []
    };
  },
  methods: {
    // 表格点击（点击三角）
    getRowKeys: function (row) {
      return row.id;
    },
    expandSelect: function (row, expandedRows) {
      let that = this;
      if (expandedRows.length) {
        that.expands = [];
        // if (row.child.length > 0) {
        //   that.expands.push(row.id);
        // }
        that.expands.push(row.id);
      } else {
        that.expands = [];
      }
    },

    // 表格点击（点击行）
    isShowIcon(row, index) {
      if (row.row.child.length > 0) {
        return "";
      }
      return "hiderow";
    },
    rowClick(row, event, column) {
      // 控制展开行
      let NoIndex = column.type.indexOf("expand");
      if (NoIndex === 0 && row.child.length <= 0) {
        this.expands = [];
        return;
      }
      if (row.child.length > 0) {
        // eslint-disable-next-line no-extend-native
        Array.prototype.remove = function (val) {
          let index = this.indexOf(val);
          if (index > -1) {
            this.splice(index, 1);
          }
        };
        if (this.expands.indexOf(row.id) < 0) {
          // 确保只展开一行
          this.expands.shift();
          this.expands.push(row.id);
        } else {
          this.expands.remove(row.id);
        }
      } else {
        return;
      }
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.multipleSelection = selection.map(item => item.id);
    }
  }
};
</script>
