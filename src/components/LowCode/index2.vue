<template>
  <div class="teamInfoPages">
    <div class="card-container">
      <el-card
        v-for="(item, index) in tableData"
        :key="index"
        class="custom-card"
        @click="shishiClick"
      >
        <template v-for="(item1, index1) in tableHeaders">
          <template
            slot="header"
            v-if="item1.title === true && item1.key === 'ScheduleName'"
          >
            <span>{{ item[item1.key] }}</span>
          </template>
          <template
            slot="header"
            v-else-if="
              item1.titleTag === true && item1.key === 'ScheduleStatus'
            "
          >
            <el-tag type="success">{{ tagStatus(item[item1.key]) }}</el-tag>
          </template>
          <div v-else class="table-cell ellipsis">
            <span
              class="table-header"
              v-if="item1.formatter && item1.key === 'PersonList'"
            >
              <i :class="item1.icon"></i> {{ personName(item.PersonList) }}
            </span>
            <span class="table-header " v-else-if="item1.icon">
              <i :class="item1.icon"></i> {{ item[item1.key] }}
            </span>
            <div
              class="patrolPointItem"
              v-else-if="item1.key === 'what' && item[item1.key]"
            >
              <div class="patrolPointName">
                巡更点02
                <span class="point">首点</span>
              </div>
              <div class="patrolTime">
                <span>巡更时间：</span>
                <span>2023-08-14 09:43:17</span>
              </div>
            </div>
          </div>
        </template>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "index2",
  data() {
    return {
      tableHeaders: [
        {
          label: "姓名",
          title: true,
          key: "ScheduleName"
        },
        {
          label: "姓名",
          titleTag: true,
          key: "ScheduleStatus"
        },
        {
          label: "巡更路线",
          key: "RouteName",
          icon: "el-icon-user"
        },
        {
          label: "巡更时间",
          key: "ScheduleTime",
          icon: "el-icon-time"
        },
        {
          label: "巡更人员",
          key: "PersonList",
          formatter: this.personName,
          icon: "el-icon-user"
        },
        {
          label: "巡更模式",
          key: "RouteMode",
          icon: "el-icon-s-tools"
        },
        {
          label: "巡更模式",
          key: "what",
          show: false
        }
      ],
      tableData: [
        {
          ScheduleName: "Alice",
          RouteName: "路线1分钟无序",
          ScheduleTime: "巡更时间",
          PersonList: [
            { PersonName: "人员01名称" },
            { PersonName: "人员02名称" },
            { PersonName: "人员03名称" },
            { PersonName: "人员04名称" }
          ],
          RouteMode: 1,
          ScheduleStatus: 0,
          what: "123"
        },
        {
          ScheduleName: "Alice",
          RouteName: "路线1分钟无序",
          ScheduleTime: "巡更时间",
          PersonList: [
            { PersonName: "人员01名称" },
            { PersonName: "人员02名称" }
          ],
          RouteMode: 1,
          ScheduleStatus: 3
        }
      ]
    };
  },
  methods: {
    personName(cellValue) {
      return cellValue.map(person => person.PersonName).join(", ");
    },
    tagStatus(cellValue) {
      const a = ["正常", "异常", "待巡更", "待统计", "超时"];
      return a[cellValue];
    },
    shishiClick() {
      console.log("1");
    }
  }
};
</script>
<style>
.el-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-container {
  display: flex;
  flex-wrap: nowrap;
  /* 不换行 */
  overflow-x: auto;
  /* 横向滚动条 */
}

.custom-card {
  width: 320px;
  height: 560px;
  margin-right: 20px;
  cursor: pointer;
  /* 可根据需要调整间距 */
}

.table-row {
  border-bottom: 1px solid #eee;
  padding: 10px 0;
}

.table-cell {
  margin: 10px 0;
}

.table-header {
  font-weight: bold;
}

.table-content {
  margin-top: 5px;
}
.patrolPointItem {
  border: 1px solid #efefef;
  padding: 20px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  margin-bottom: 10px;
}
.patrolPointItem .patrolPointName {
  margin-bottom: 15px;
}
.patrolPointItem .patrolPointName .point {
  width: 41px;
  height: 21px;
  background: #39f;
  border-radius: 10px;
  font-family: SourceHanSansCN-Normal;
  font-size: 14px;
  color: #fff;
  text-align: center;
  font-weight: 400;
  display: inline-block;
  margin-left: 6px;
}
.patrolPointItem .patrolTime {
  font-weight: 400;
}
</style>
