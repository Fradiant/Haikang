<template>
  <div class="teamInfoPages">
    <div class="item-inline">
      <span>路由：</span>
      <el-button @click="$message.warning($route.path)">本页路由</el-button>
    </div>
    <div class="item-inline">
      <el-button type="text" @click="dialogVisible = true"
        >点击打开 Dialog</el-button
      >
      <el-button type="text" @click="dialog = true"
        >打开嵌套 Form 的 Drawer</el-button
      >
    </div>
    <el-dialog
      title="提示"
      width="30%"
      v-dialogDrag:isDraggable="true"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-drawer
      ref="drawer"
      size="500px"
      :append-to-body="false"
      :custom-class="'drawerClass'"
      v-dialogDrag:isDraggable="true"
      :wrapperClosable="false"
      direction="rtl"
      title="我嵌套了 Form !"
      :visible.sync="dialog"
      :modal-append-to-body="false"
    >
      <section class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item
            label="活动名称"
            :label-width="formLabelWidth"
            class="el-form-item from_item is-required"
          >

            <el-input v-model="form.name" autocomplete="off"  width="500px" v-emoji></el-input>
          </el-form-item>
          <el-form-item
            label="活动区域"
            :label-width="formLabelWidth"
            class="el-form-item from_item is-required"
          >
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button
            type="primary"
            @click="$refs.drawer.closeDrawer()"
            :loading="loading"
            >{{ loading ? "提交中 ..." : "确 定" }}</el-button
          >
        </div>
      </section>
    </el-drawer>
  </div>
</template>
<script>
export default {
  name: 'user',
  data() {
    return {
      dialogVisible: false, // dialog
      dialog: false,
      loading: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '80px',
      timer: null
    };
  },
  methods: {
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    }
  }
};
</script>
<style scoped>
.teamInfoPages {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 24px 16px 16px 24px;
  border-radius: 4px;
}

.from_item {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  padding: 12px 24px;
  margin-bottom: 0;
}
.from_item >>> .el-select .el-input {
    width: 202px;
  }
.shift .footer {
  position: sticky;
  bottom: 0;
  background: #fff;
  padding: 16px 0;
  z-index: 1000;
  width: 100%;
  left: 0;
  text-align: left;
}
 .drawerClass {
  right: 0px !important;
  top: 0px !important;
  background-color: #f8f9fa !important;
}
</style>
