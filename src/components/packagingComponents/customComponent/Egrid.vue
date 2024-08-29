<template>
  <div :id="EgridId" :class="hideSide ? 'noSideBorder' : ''">
    <el-form
      id="tableContainer"
      ref="egridForm"
      :model="customValiData"
      class="tableContainer"
    >
      <el-table
        ref="Egrid"
        :data="currentData"
        :height="tHeight"
        v-bind="tableBind"
        :border="true"
        :row-key="rowKey"
        class="egrid"
        @selection-change="selectChange"
        @current-change="currentChange"
        @row-click="rowClick"
        @row-dblclick="rowDBClick"
        @sort-change="sortChange"
      >
        <template v-for="(tp, index) in typesColumns">
          <el-table-column
            v-if="tp.type === 'expand'"
            v-bind="tp.props"
            :type="tp.type"
            :key="tp.type"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <!-- 23/07/24注释，表格展开区域代码重新 -->
              <!-- <div id = "expandAreaEgrid">
                <ExpandArea
                  :row="scope.row"
                  :index="index"/>
              </div> -->
              <!-- 23/07/24新增，表格展开区域新增嵌套表格 -->
              <el-table
                :data="customGet(scope.row, childrenData)"
                style="width: 100%;"
              >
                <template v-for="col in sonColumns">
                  <el-table-column
                    v-if="!col.show"
                    :label="col.name"
                    :prop="col.propName"
                    :key="col.propName"
                    align="center"
                  >
                    <template slot-scope="childrenScope">
                      <DefaultButton
                        v-for="item in col.DefaultButton"
                        :key="item.title"
                        :button-class="
                          item.visible
                            ? item.visible.required(childrenScope.row)
                            : ''
                        "
                        :classname="
                          item.bothStatus
                            ? item.bothStatus.classname[
                                childrenScope.row[item.bothStatus.propName]
                              ]
                            : item.classname
                        "
                        :title="
                          item.bothStatus
                            ? item.bothStatus.title[
                                childrenScope.row[item.bothStatus.propName]
                              ]
                            : item.title
                        "
                        @click.native.stop="
                          item.clickEvent(
                            childrenScope.row,
                            childrenScope.$index
                          )
                        "
                      />
                      <div v-if="col.StatusButton">
                        <div
                          :style="{
                            'background-color':
                              col.StatusList &&
                              col.StatusList[
                                Number(childrenScope.row[col.propName])
                              ]
                                ? col.StatusList[
                                    Number(childrenScope.row[col.propName])
                                  ].color
                                : '#999999'
                          }"
                          class="el-table-color"
                        />
                        <span type="text">{{
                          col.StatusList &&
                          col.StatusList[
                            Number(childrenScope.row[col.propName])
                          ]
                            ? $t(
                                "pub." +
                                  col.StatusList[
                                    Number(childrenScope.row[col.propName])
                                  ].text
                              )
                            : ""
                        }}</span>
                      </div>
                      <div v-if="col.IsAddEnum">
                        <el-button
                          :class="
                            col.IsAddEnum.className
                              ? col.IsAddEnum.className.required(
                                  childrenScope.row
                                )
                              : ''
                          "
                          disabled="disabled"
                          >{{
                            col.IsAddEnum.textString
                              ? col.IsAddEnum.textString.required(
                                  childrenScope.row
                                )
                              : ""
                          }}</el-button
                        >
                      </div>
                      <span
                        v-show="
                          (!col.IsAddEnum &&
                            !col.DefaultButton &&
                            !col.StatusButton &&
                            !col.levelButton &&
                            !col.component &&
                            !col.RegularButton) ||
                            col.buttomTextCombined === true
                        "
                        >{{
                          col.formatter
                            ? col.formatter(
                                childrenScope.row[col.propName],
                                childrenScope.row
                              )
                            : childrenScope.row[col.propName]
                        }}</span
                      >
                      <component
                        v-if="col.component"
                        :is="col.component"
                        v-bind="
                          getCptBind(childrenScope, col, childrenScope.$index)
                        "
                        v-on="col.listeners"
                      />
                      <span
                        v-for="item in col.RegularButton"
                        :class="
                          item.visible
                            ? item.visible.required(childrenScope.row)
                            : ''
                        "
                        :key="item.title"
                        :title="item.title"
                        @click="item.clickEvent(childrenScope.row)"
                      >
                        <span
                          :class="
                            item.isDisabled &&
                            item.isDisabled(childrenScope.row)
                              ? item.disableClass
                              : item.classname
                          "
                          v-text="item.name"
                      /></span>
                    </template>
                  </el-table-column>
                </template>
              </el-table>
              <template />
            </template>
          </el-table-column>
          <el-table-column
            v-else
            :key="tp.props"
            :type="tp.type"
            v-bind="tp.props"
            :selectable="selectable"
            :reserve-selection="reserveSelection"
            show-overflow-tooltip
          />
        </template>
        <template v-for="col in renderColumns">
          <el-table-column
            v-if="col.show"
            :key="col.prop"
            v-bind="getColBinds(col)"
            :sortable="col.sortable"
            :header-align="col.align"
            :width="col.width ? col.width : ''"
            :resizable="col.resizeable"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <DefaultButton
                v-for="item in col.DefaultButton"
                :key="item.title"
                :button-class="
                  item.visible ? item.visible.required(scope.row) : ''
                "
                :classname="
                  item.bothStatus
                    ? item.bothStatus.classname[scope.row[item.bothStatus.prop]]
                    : item.classname
                "
                :title="
                  item.bothStatus
                    ? item.bothStatus.title[scope.row[item.bothStatus.prop]]
                    : item.title
                "
                @click.native.stop="item.clickEvent(scope.row, scope.$index)"
              />
              <div v-if="col.StatusButton">
                <span type="text">{{
                  col.StatusList && col.StatusList[Number(scope.row[col.prop])]
                    ? $t(
                        "pub." +
                          col.StatusList[Number(scope.row[col.prop])].text
                      )
                    : ""
                }}</span>
                <div
                  :style="{
                    'background-color':
                      col.StatusList &&
                      col.StatusList[Number(scope.row[col.prop])]
                        ? col.StatusList[Number(scope.row[col.prop])].color
                        : '#C2C2C2'
                  }"
                  class="el-table-color"
                />
              </div>
              <div v-if="col.patrolRoute">
                <div
                  v-if="scope.row.isFirstLast && scope.row.routeMode !== 4"
                  :style="{
                    'background-color':
                      scope.row.pointSeq === 1 ? '#2CCA8D' : '#FF7C5B'
                  }"
                  class="el-table-patrol"
                >
                  {{
                    scope.row.pointSeq === 1
                      ? $t("pub.firstPoint")
                      : $t("pub.lastPoint")
                  }}
                </div>
              </div>
              <div v-if="col.SwitchEnable">
                <el-switch
                  v-model="scope.row[col.isEnabled]"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="col.switchEvent(scope.row)"
                />
              </div>
              <div v-if="col.showSelect">
                <el-select-more
                  :select-more-list="scope.row.personIdList"
                  :show-select-more="col.showSelect"
                  @showSelectMoreDialog="col.showSelectMoreDialog(scope.row)"
                />
              </div>
              <div v-if="col.showInput">
                <el-input
                  v-model="scope.row[col.value]"
                  max="1440"
                  maxlength="4"
                />
              </div>
              <div v-if="col.timeSelect">
                <el-time-picker
                  v-model="scope.row[col.value]"
                  :format="col.Format"
                  :value-format="col.Format"
                  @change="col.timeChange(scope.row)"
                />
                <span
                  :class="scope.row[col.isAcross] ? 'isDisplay' : 'noDisplay'"
                  style="color: red"
                  >+1</span
                >
              </div>
              <div v-if="col.dateSelect">
                <el-date-picker
                  v-model="scope.row[col.value]"
                  :value-format="col.valueFormat"
                  type="daterange"
                  @change="col.dateChange(scope.row, scope.row[col.value])"
                />
              </div>
              <div v-if="col.IsAddEnum">
                <el-button
                  :class="
                    col.IsAddEnum.className
                      ? col.IsAddEnum.className.required(scope.row)
                      : ''
                  "
                  disabled="disabled"
                  >{{
                    col.IsAddEnum.textString
                      ? col.IsAddEnum.textString.required(scope.row)
                      : ""
                  }}</el-button
                >
              </div>
              <span
                v-show="
                  (!col.IsAddEnum &&
                    !col.DefaultButton &&
                    !col.StatusButton &&
                    !col.levelButton &&
                    !col.component &&
                    !col.RegularButton) ||
                    col.buttomTextCombined === true
                "
                >{{
                  col.formatter
                    ? col.formatter(scope.row[col.prop], scope.row)
                    : scope.row[col.prop]
                }}</span
              >
              <component
                v-if="col.component"
                :is="col.component"
                v-bind="getCptBind(scope, col, scope.$index)"
                v-on="col.listeners"
              />
              <span
                v-for="item in col.RegularButton"
                :class="item.visible ? item.visible.required(scope.row) : ''"
                :key="item.title"
                :title="item.title"
                @click="item.clickEvent(scope.row)"
              >
                <span
                  :class="
                    item.isDisabled && item.isDisabled(scope.row)
                      ? item.disableClass
                      : item.classname
                  "
                  v-text="item.name"
              /></span>
            </template>
          </el-table-column>
        </template>
        <template v-if="slotAppend" slot="append">
          <slot name="append" />
        </template>
      </el-table>
    </el-form>
    <div v-if="showPagination" :id="paginationBlockId" class="paginationBlock">
      <el-pagination
        :current-page.sync="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        :pager-count="7"
        :simple="paginationAttributesSimple"
        :layout="paginationAttributesLayout"
        :total="isLazyLoading && customTotal ? customTotal : tableData.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import DefaultButton from "./DefaultButton";

const BOOLEAN_KEYS = [
  "fit", // 列的宽度是否自撑开
  "stripe", // 是否为斑马纹table
  "border", // 是否带有纵向边框
  "show-header", // 是否显示表头
  "highlight-current-row", // 是否要高亮显示当前行
  "default-expand-all", // 是否默认展开所有行
  "show-summary" // 是否在表尾显示合计行
];

const TYPES = ["selection", "expand", "index"];

const COLUMN_KEY_MAP = {
  // 表格列
  label: "label",
  prop: "prop"
};
const METHOD_NAMES = [
  "setCurrentRow",
  "toggleRowSelection",
  "toggleRowExpansion",
  "clearSelection",
  "clearFilter",
  "clearSort",
  "doLayout",
  "sort"
];

const methods = {};

METHOD_NAMES.forEach(name => {
  methods[name] = (...args) => {
    const { Egrid } = this.$refs;
    if (Egrid && Egrid[name]) {
      Egrid[name](...args);
    }
  };
});

export default {
  name: "Egrid",
  components: {
    DefaultButton
  },
  props: {
    isLazyLoading: {
      type: Boolean,
      default() {
        return false;
      }
    },
    // eslint-disable-next-line vue/require-default-prop
    selectedRows: {
      type: Array
    },
    // eslint-disable-next-line vue/require-default-prop
    ExpandArea: {
      type: Function
    },
    // 23/07/24新增，嵌套子表格数据名称，使用嵌套表格时必填，填EgridData.data中子表格List名称
    childrenData: {
      type: String,
      default() {
        return "";
      }
    },
    EgridId: {
      type: String,
      default() {
        return "Egrid";
      }
    },
    paginationBlockId: {
      type: String,
      default() {
        return "paginationBlock";
      }
    },
    tableData: {
      type: Array,
      default() {
        return [];
      }
    },
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    // 23/07/24新增，嵌套表格columns
    sonColumns: {
      type: Array,
      default() {
        return [];
      }
    },
    pageSizes: {
      type: Array,
      default() {
        return [20, 50, 100, 200];
      }
    },

    // eslint-disable-next-line vue/require-default-prop
    columnType: [String, Array],

    // eslint-disable-next-line vue/require-default-prop
    columnTypeProps: Object,

    // eslint-disable-next-line vue/require-default-prop
    columnKeyMap: Object,

    // eslint-disable-next-line vue/require-default-prop
    columnsHandler: Function,

    // eslint-disable-next-line vue/require-default-prop
    columnsSchema: Object,

    // eslint-disable-next-line vue/require-default-prop
    slotAppend: Boolean,
    // eslint-disable-next-line vue/require-default-prop
    selectable: Function,
    reserveSelection: {
      type: Boolean,
      default() {
        return false;
      }
    },
    hideBottom: {
      type: Boolean,
      default() {
        return false;
      }
    },
    hideSide: {
      type: Boolean,
      default() {
        return false;
      }
    },
    showPagination: {
      type: Boolean,
      default() {
        return true;
      }
    },
    height: {
      type: String,
      default() {
        return "auto";
      }
    },
    fourthPageSign: {
      type: Boolean,
      default: false
    },
    resizeable: {
      // 表格是否能自定义大小
      type: Boolean,
      default: true
    },
    // eslint-disable-next-line vue/require-default-prop
    customPageSize: {
      type: Number
    },
    // eslint-disable-next-line vue/require-default-prop
    customTotal: {
      type: Number
    },
    customValiData: {
      type: Object,
      default() {
        return {};
      }
    },
    // eslint-disable-next-line vue/require-default-prop, vue/require-prop-types
    RowClick: {},
    // eslint-disable-next-line vue/require-default-prop
    rowKey: {
      type: [Function, String]
    },
    paginationAttributesLayout: {
      type: String,
      default: "total, prev, pager, next,  sizes, jumper"
    },
    paginationAttributesSimple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 20,
      tHeight: this.height,
      disabledRows: [] // 记录当前选择的行
    };
  },
  computed: {
    currentData() {
      let currList = [];
      if (this.tableData) {
        if (this.showPagination && !this.isLazyLoading) {
          const total = this.tableData.length;
          // if (this.isLazyLoading && this.customTotal)total = this.customTotal;
          const start = this.pageSize * (this.currentPage - 1);
          const rest = total - start;
          const end = (rest > this.pageSize ? this.pageSize : rest) + start;
          if (total >= end) {
            currList = this.tableData.slice(start, end);
          }
        } else {
          currList = this.tableData;
        }
      }
      return currList;
    },
    // 处理 $attrs 里面 Boolean 类型的 prop 和统一 prop 命名
    tableBind() {
      const { $attrs } = this; // 这个this是什么？传进来的data吗？
      const bind = {};
      Object.keys($attrs).forEach(key => {
        const v = $attrs[key];
        const uniformKey = key.replace(/([A-Z])/, "-$1").toLowerCase(); // 每一个大写字母前面加上“-”再转成小写字母
        bind[key] = ~BOOLEAN_KEYS.indexOf(uniformKey) && v === "" ? true : v;
      });
      return bind;
    },

    renderColumns() {
      const {
        columns,
        columnKeyMap, // 映射label,prop
        columnsHandler, // 对现有的colnums进行增删改操作
        columnsSchema: schema
      } = this;
      const map = Object.assign({}, COLUMN_KEY_MAP, columnKeyMap);
      const renderColumns = columns.map(col => {
        const mix = (schema && schema[col[map.prop]]) || {};
        const it = Object.assign({}, col, mix);
        it.label = it[map.label];
        it.prop = it[map.prop];
        it.align = it.align ? it.align : "left";
        it.show = it.show === undefined ? true : it.show;
        return it;
      });
      return (columnsHandler && columnsHandler(renderColumns)) || renderColumns;
    },

    /* 如选中，展开等特殊列，包括其类型对应的事件
     * 如：selection，对应select,select-all,select-change
     * */

    typesColumns() {
      const { columnType: type, columnTypeProps } = this;
      let typeColums = [];
      if (typeof type === "string" && ~TYPES.indexOf(type)) {
        typeColums = [type];
      }
      if (Array.isArray(type)) {
        typeColums = type.filter(it => ~TYPES.indexOf(it));
      }
      const map = columnTypeProps || {};
      return typeColums.map(param => ({
        type: param,
        props: map[type]
      }));
    }
  },
  watch: {
    height(newValue) {
      this.tHeight = newValue === "auto" ? "auto" : parseInt(newValue, 10);
    },
    customPageSize(newValue) {
      if (newValue && newValue > 0) {
        this.pageSize = newValue;
      }
    }
  },
  created() {
    if (this.customPageSize && this.customPageSize > 0) {
      this.pageSize = this.customPageSize;
    }
    Vue.component("ExpandArea", this.ExpandArea); // created时绑定expand area
  },
  mounted() {
    this.$nextTick(() => {
      if (this.tHeight === "auto") {
        this.resizeTable();
        window.addEventListener("resize", this.resizeTable);
      }
      // document.getElementById('expandArea').appendChild(expandArea.$el);
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeTable);
  },

  methods: {
    // 23/07/24新增，用于取子表格数据
    customGet(obj, path) {
      const keys = path.split(".");
      let restlut = obj;
      for (const key of keys) {
        if (!restlut || !restlut.hasOwnProperty(key)) {
          return undefined;
        }
        restlut = restlut[key];
      }
      return restlut;
    },
    getCurrentData(currList, curPage) {
      const total = this.tableData.length;
      // if (this.isLazyLoading && this.customTotal)total = this.customTotal;
      const start = this.pageSize * (curPage - 1);
      const rest = total - start;
      const end = (rest > this.pageSize ? this.pageSize : rest) + start;
      if (total >= end) {
        currList = this.tableData.slice(start, end);
      }
      return currList;
    },
    // 点击排序触发
    /*
     * sortObj是一个包含
     * column: 当前列信息
     * prop: 当前列属性
     * order: 当前排列规则
     * */

    sortChange(sortObj) {
      this.$emit("sort-change", sortObj);
    },
    renderExpand() {
      this.$nextTick(() => {
        new this.ExpandArea().$mount("#expandArea");
      });
    },
    resizeTable() {
      this.$nextTick(() => {
        // 防止页签之间跳转，获取不到二级菜单高度的情况
        const EgridDiv = document.getElementById(this.EgridId);
        const paginationBlock = document.getElementById(this.paginationBlockId);
        const insertAllCodeDevice = document.getElementById(
          "insertAllCodeDevice"
        );
        const subChannelCode = document.getElementById("subChannelCode");
        const insertCode = document.getElementsByClassName("teamInfoPages")[0];
        let parent = subChannelCode !== null ? subChannelCode : insertCode;
        parent = insertAllCodeDevice !== null ? insertAllCodeDevice : parent;
        const height =
          parent.offsetHeight -
          (this.showPagination ? paginationBlock.offsetHeight : 0) -
          52 -
          EgridDiv.offsetTop;
        console.log(parent.offsetHeight);
        this.tHeight = height; // 特殊的四级页签情况，需要再减去按钮栏高度
      });
    },
    cancleToggleRowSelection(newRebuildPackRows) {
      this.$nextTick(() => {
        newRebuildPackRows.map(row => {
          this.$refs.Egrid.toggleRowSelection(row, false);
          return true;
        });
      });
    },
    getColBinds(col) {
      const binds = Object.assign({}, col);
      delete binds.show;
      delete binds.htmlText;
      return Object.assign({}, col);
    },
    getCptBind({ row, column }, col, index) {
      const props = { row, col, column, index };
      const handler = col.propsHandler;
      return (handler && handler(props)) || props;
    },
    selectChange(selection) {
      this.$emit("selection-change", selection);
    },
    // 获取表格选中的数据
    getSelectionData() {
      return this.$refs.Egrid.selection;
    },
    currentChange(currentRow) {
      this.$emit("current-change", currentRow);
    },

    /*
     * @param val 当前页面条数
     * */
    handleSizeChange(val) {
      // 页面条数发生变更事件
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
    rowClick(row) {
      if (typeof this.RowClick === "function") {
        this.RowClick(row);
      }
      // eslint-disable-next-line
      if ("function" !== typeof this.selectable) {
        this.$emit("rowClickEvent", row);
      }
    },
    rowDBClick(row) {
      this.$emit("rowDBClickEvent", row);
    },
    clearSelection() {
      this.$refs.Egrid.clearSelection();
    },
    changeCurrentPage(val) {
      this.currentPage = val;
    },
    clickEmit() {
      this.$emit("click-event");
    }
  }
};
</script>

<style scoped>
.table-expand {
  font-size: 0;
}

.table-expand label {
  width: 90px;
  color: #99a9bf;
}

.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 25%;
}

.isDisplay {
  position: absolute;
  left: 100px;
  top: 4px;
}

.noDisplay {
  display: none;
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
