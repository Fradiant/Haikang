<template>
  <div class="teamInfoPages">
    <div class="item-inline">
      <span>路由：</span>
      <el-button @click="$message.warning($route.path)">本页路由</el-button>
    </div>
    <div class="box">
      <el-scrollbar style="height: 100%">
        <!--滑动栏里的内容 -->
        <h1 style="text-align: center;">测试element滚动轴</h1>
        <h3>一致性 Consistency</h3>
        <p>
          与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
        </p>
        <p>
          在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
        </p>
        <h3>反馈 Feedback</h3>
        <p>
          控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
        </p>
        <p>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</p>

        <h3>效率 Efficiency</h3>
        <p>简化流程：设计简洁直观的操作流程；</p>
        <p>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策;</p>
        <p>
          帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
        </p>

        <h3>可控 Controllability</h3>
        <p>
          用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；
        </p>
        <p>
          结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。
        </p>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
export default {
  name: 'person',
  data() {
    return {
      show: true,
      items: ['Item 1', 'Item 2', 'Item 3']
    };
  },
  methods: {}
};
</script>
<style scoped>
/* 1,必须去掉scoped，否则overflow-x: hidden失效 */
.box {
  width: 300px;
  height: 300px;
  background-color: pink;
  padding: 5px;
}

/* 2，外包一个div,来减少对其他页面会有冲突（此时缺少scoped） */
.box >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}

</style>
