<!-- <template>
  <div style="height: 100%;">
    <el-form id="cardContainer" ref="cardForm" :model="customValiData" style="height: 100%;"
      :style="{ borderColor: $store.state.curDataTheme === 'theme1' ? '#E1E1E1' : '#2c3237' }" class="cardContainer">
      <el-row style="height: 100%;">
        <el-col style="height: 100%;" :span="6" v-for="(o, index) in 3" :key="o" :offset="index > 0 ? 2 : 0">
          <el-card style="height: 100%;" class="box-card" v-for="(item, index) in cardData" :key="index">
            <div slot="header" class="clearfix" v-if="item">
              <span>{{item.cardName}}</span>
              <el-tag type="success" style="float: right;">已完成</el-tag>
            </div>
            <div v-for="(item1, index1) in item.patrolInfoList" :key="index1" class="text item">
              <i class="el-icon-edit"></i>
              <span>{{ item1.patrolRoute }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template> -->
<template>
  <div class="">
    <el-row :gutter="12" v-loading="loading" style="height: 560px;">
      <!-- date遍历循环的数据 -->
      <el-col :span="6" v-for="item in cardData" :key="item.id">
        <el-card shadow="hover"
          ><!--style="background-color: #5daf34"  灰 #e1e1e1 绿 #5daf34-->
          <!-- 卡片的头部位 -->
          <template #header>
            <div class="card-header">
              <!--
              	这里声明一下,我在多选时,往数组中添加的是对象
              	label属性:是多选框的值,若该标签中无内容,则该属性也充当 checkbox 按钮后的介绍
              	@change:改变事件,多选框勾选和取消勾选都会触发事件,所以在取消勾选时要删除勾选状态下的值
              -->

              <span>{{ item.cardName }}</span>
            </div>
          </template>
          <!-- 卡片显示的内容 -->
          <div>
            卡片中显示的内容
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 分页 -->
    <!-- <div v-if="showPagination" :id="paginationBlockId" class="paginationBlock">
      <el-pagination
        :current-page.sync="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        :pager-count="7"
        :simple="paginationAttributesSimple"
        :layout="paginationAttributesLayout"
        :total="isLazyLoading && customTotal ? customTotal : cardData.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div> -->

    <div v-if="showPagination" :id="paginationBlockId" class="paginationBlock">
      <el-pagination
        :current-page.sync="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        :pager-count="7"
        :simple="paginationAttributesSimple"
        :layout="paginationAttributesLayout"
        :total="isLazyLoading && customTotal ? customTotal : cardData.length"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "CustomCard",
  props: {
    isLazyLoading: {
      type: Boolean,
      default() {
        return false;
      }
    },
    customValiData: {
      type: Object,
      default() {
        return {};
      }
    },
    cardData: {
      type: Array,
      default() {
        return [];
      }
    },
    rows: {
      type: Array,
      default() {
        return [];
      }
    },
    showPagination: {
      type: Boolean,
      default() {
        return true;
      }
    },

    // 分页组件
    pageSizes: {
      type: Array,
      default() {
        return [5, 10, 15, 20];
      }
    },
    paginationBlockId: {
      type: String,
      default() {
        return "paginationBlock";
      }
    },
    paginationAttributesSimple: {
      type: Boolean,
      default: false
    },
    paginationAttributesLayout: {
      type: String,
      default: "total, prev, pager, next,  sizes, jumper"
    }
  },
  data() {
    return {
      // 多选默认不选中
      loading: false,
      checked: false,
      pageSize: 12,
      currentPage: 1,
      total: 0,
      selectionList: [],
      data: [
        {
          id: 1,
          name: 123
        }
      ]
    };
  },
  method: {
    /*
     * @param val 当前页面条数
     * */
    handleSizeChange(val) {
      // 页面条数发生变更事件
      console.log(val);
      const selectedAlarmCopy = this.selectedRows;
      if (this.pageSize !== val) {
        this.pageSize = val;
        // 判断页面条数发生改变之后，分页总数能否达到当前的页数，不能就展示最后一页数据即可
        const page = Math.ceil(this.customTotal / val);
        this.currentPage = page < this.currentPage ? page : this.currentPage;
        this.handleCurrentChange(this.currentPage);
      }
      this.pageSize = val;
      this.$nextTick(() => {
        if (selectedAlarmCopy) {
          selectedAlarmCopy.forEach(item => {
            this.$refs.Egrid.toggleRowSelection(item);
          });
        }
      });
    },

    /*
     * @param val 当前页码
     * */
    handleCurrentChange(val) {
      // 页码发生变更事件
      // const selectedAlarmCopy = this.selectedRows;
      if (this.isLazyLoading && this.customTotal) {
        this.$emit("requestUnloadData", {
          currentPage: val,
          pageSize: this.pageSize
        }); // 报告分页加载的数据
        this.currentPage = val;
        this.$emit("changeCurrentPage");
      } else {
        this.currentPage = val;
        this.$emit("changeCurrentPage");
      }
    },
    // 获取数组中数值的下标
    indexOf(val, ids) {
      for (let i = 0; i < ids.length; i++) {
        // 获取当前值的下标
        if (ids[i] === val) {
          return i;
        }
      }
      return -1;
    },
    // 多选赋值ids
    ids(val) {
      let ids = this.selectionList;
      // 检索下标,判断当前值(或对象是否在数组中); 在则返回下标,不在则返回-1
      let index = this.indexOf(val, ids);
      if (ids.length > 0 && index > -1) {
        // 删除数组中的某个元素(在取消勾选时,删除数组中的值)
        ids.splice(index, 1);
      } else {
        // 添加到数组中
        ids.push(val);
        // 用逗号隔开
        ids.join(",");
      }
    }
  }
};
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.box-card {
  /* width: 320px; */
}

.paginationBlock {
  text-align: center;
  border-left: 0 none !important;
  border-right: 0 none !important;
  border-bottom: 0 none !important;
  border-top: 0 none;
  margin: 0 !important;
  padding: 0 !important;
  position: relative;
  height: auto;
  white-space: nowrap;
  overflow: hidden;
  font-size: 11px;
}
</style>
