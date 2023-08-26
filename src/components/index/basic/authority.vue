<template>
  <div class="teamInfoPages">
    <el-scrollbar style="height: 100%">
      <span>基本演示</span>
      <div class="box1">
        <div class="box1-1"></div>
        <div class="box1-2"></div>
      </div>
      <div class="box2">
        <div class="box2-1" v-for="(item, index) in list" :key="index"></div>
      </div>
      <div class="box3">
        <div class="box3-1" v-for="(item, index) in list" :key="index"></div>
      </div>
      <div class="" style="height: 10px;"></div>
      <!-- transition标签 -->
      <div class="item-inline">
        <el-button @click="bol = !bol" size="small" style="margin-right:20px;"
          >隐藏/显示</el-button
        >
        <transition name="moveCartoon" appear>
          <h1 v-show="bol">组件动画效果</h1>
        </transition>
      </div>
      <!-- transition-group标签 -->
      <div class="item-inline">
        <el-button
          @click="isEditing = !isEditing"
          size="small"
          style="margin-right:20px;"
          >transition-group切换</el-button
        >
        <transition-group name="fade" appear>
          <h1 class="group" v-if="isEditing" key="save">Save</h1>
          <h1 class="group" v-if="!isEditing" key="edit">Edit</h1>
        </transition-group>
      </div>

      <div class="item-inline" style="height:50px;">
        <el-button @click="show = !show" size="small" style="margin-right:20px;"
          >transition-group切换</el-button
        >
        <transition-group name="slide">
          <span
            v-for="(item, index) in items"
            v-show="show"
            :key="`text_${index}`"
            :class="`item item-${index}`"
            >{{ item }}</span
          >
        </transition-group>
      </div>
      <div class="">
        <!-- Animatin动画基础 -->
        <!-- 基础用法 -->
        <!-- <div class="basicAnimation"></div> -->
        <!-- 绕圈动画 -->
        <!-- <div class="circleAnimation"></div> -->
        <!-- steps动画 -->
        <!-- <div class="stepsAnimation"></div> -->
        <!-- 打字机动画 -->
        <!-- <div class="fontAnimation">这是一台打字机</div> -->
        <!-- 简写属性的运用 -->
        <div class="simpleAnimation"></div>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: "authority",
  data() {
    return {
      list: [1, 2, 3, 4],
      bol: true,
      isEditing: true,
      show: true,
      items: ["A", "B", "C", "D", "E"]
    };
  },
  methods: {}
};
</script>
<style scoped>

.teamInfoPages >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
/* 基本演示 */
.box1 {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
}
.box1-1 {
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  border: 3px solid black;
  margin: 20px 0px 0px 20px;
  transition-property: width, height, background;
  transition-duration: 0.25s, 0.25s, 1s;
  transition-timing-function: ease;
  transition-delay: 0s;
}
.box1-1:hover {
  width: 200px;
  height: 200px;
  background-color: blue;
}
/* transition简写形式 */
.box1-2 {
  width: 100px;
  height: 100px;
  box-sizing: border-box;
  border: 3px solid black;
  margin: 20px 0px 0px 20px;
  transition: width 0.25s linear 1.9s, background 1s 2s, transform 2s;
}
.box1-2:hover {
  width: 200px;
  background-color: blue;
  transform: rotate(180deg);
}
/* 标准transition属性动画 */
.box2 {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; /* 控制子元素在主轴方向上分布 */
  align-items: flex-start; /* 控制子元素在交叉轴方向上对齐 */
  width: 540px;
}
.box2-1 {
  width: 100px;
  height: 100px;
  border: 3px solid black;
  box-sizing: border-box;
  margin: 20px 0px 0px 20px;
  transition: width 0.25s linear, height 0.25s linear, background 1s;
}
.box2-1:hover {
  width: 120px;
  height: 120px;
  background-color: blue;
}
/* 标准transition属性动画 */

/* 配合transform的transition属性 */
.box3 {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; /* 控制子元素在主轴方向上分布 */
  align-items: flex-start; /* 控制子元素在交叉轴方向上对齐 */
  width: 540px;
}
.box3-1 {
  width: 100px;
  height: 100px;
  border: 3px solid black;
  box-sizing: border-box;
  margin: 20px 0px 0px 20px;
  /* transition: width 0.25s linear, height 0.25s linear, background 1s; */
  transition: all 0.4s ease;
}
.box3-1:nth-child(4n) {
  margin-right: 0;
}
.box3-1:hover {
  /* 缩放倍数和角度转换 */
  transform: scale(1.2, 1.2);
  /* transform: translate(10px,10px) rotate(10deg); */
  background-color: blue;
}
/* 配合transform的transition属性 */

/* transition标签appear 属性：一开始就生效显示动画 */
.moveCartoon-enter-active {
  animation: move 1s;
}
.moveCartoon-leave-active {
  animation: move 1s reverse;
}
/* 这里transition配合使用了animation动画，keyframes为关键帧 */
@keyframes move {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translate(0);
    opacity: 1;
  }
}
/* transition标签appear 属性：一开始就生效显示动画 */

/* transition-group标签 */
.group {
  position: absolute;
  transition: 0.5s;
}
.fade-leave {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}
.fade-enter {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
/* transition-group标签 */

/* transition-group标签 */
.slide-enter-active,
.slide-leave-active {
  transition: all 1.4s;
}
.slide-enter {
  opacity: 0;
  transform: translateX(150px);
}
/* 该两项省略与否是等价的 */
/* .slide-enter-to {
  opacity: 1;
  transform: translateX(0px);
}
.slide-leave {
  opacity: 1;
  transform: translateX(0px);
} */
.slide-leave-to {
  opacity: 0;
  transform: translateX(150px);
}

/* 定义每个span项的基本样式 */
.item {
  display: inline-block;
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  margin-right: 10px;
  background-color: pink;
  color: #fff;
}
.item-1 {
  transition-delay: 0.2s;
}
.item-2 {
  transition-delay: 0.4s;
}
.item-3 {
  transition-delay: 0.6s;
}
.item-4 {
  transition-delay: 0.8s;
}
.item-5 {
  transition-delay: 1s;
}



/* animation动画基础 */
@keyframes move1 {
  0% {
    transform: translateX(0px);
  }

  50% {
    transform: translateX(800px);
  }

  100% {
    transform: translateX(0px);
  }
}
.basicAnimation {
  width: 100px;
  height: 100px;
  background-color: teal;
  /* 调用动画 */
  animation-name: move1;
  /* 持续时间 */
  animation-duration: 3s;
}
/* animation动画基础 */

/* animation动画绕圈 */
@keyframes move2 {
  0% {
    transform: translateX(0px);
  }
  25% {
    transform: translateX(500px);
  }
  50% {
    transform: translate(500px, 250px);
  }
  75% {
    transform: translate(0px, 250px);
  }
  100% {
    transform: translate(0px, 0px);
  }
}
.circleAnimation {
  width: 100px;
  height: 100px;
  background-color: teal;
  animation-name: move2;
  animation-duration: 3s;
}
/* animation动画绕圈 */

/* animation-timing-function属性的steps */
.stepsAnimation {
  width: 0;
  height: 30px;
  background-color: teal;
  /* animation: move 4s linear  forwards; */
  /* steps 就是分几步来完成动画，有了 steps 不要写ease linear了 */
  animation: move3 4s steps(10) forwards;
}

@keyframes move3 {
  0% {
  }
  100% {
    width: 200px;
  }
}
/* animation-timing-function属性的steps */

/* 打字机效果 */
.fontAnimation {
  font-size: 46px;
  font-family: monospace;
  /* 1ch 代表0的宽度  */
  width: 0ch;
  white-space: nowrap;
  /* animation: move 4s linear  forwards; */
  /* steps 就是分几步来完成动画，有了 steps 不要写ease linear了 */
  animation: move4 4s steps(9) forwards;
  overflow: hidden;
}

@keyframes move4 {
  0% {
  }
  100% {
    width: 18ch;
  }
}
/* 打字机效果 */

/* 简写animation */
@keyframes move5 {
  from {
    transform: translate(0, 0);
  }

  to {
    transform: translate(1000px, 0);
  }
}

.simpleAnimation {
  width: 100px;
  height: 100px;
  background-color: teal;
  /* 动画名称 */
  /* animation-name: move; */
  /* 持续时间 */
  /* animation-duration: 2s; */
  /* 速度曲线 */
  /* animation-timing-function: ease-in; */
  /* 何时开始:延迟一秒 */
  /* animation-delay: 1s; */
  /* 重复次数 */
  /* animation-iteration-count: 2; */
  /* 是否逆向播放 */
  /* animation-direction: alternate-reverse; */
  /* 结束后状态 */
  /* animation-fill-mode: forwards; */

  animation: move5 2s linear 0s infinite alternate forwards;
}
/* 鼠标经过暂停动画 */
.simpleAnimation:hover {
  animation-play-state: paused;
}
/* 简写animation */
</style>
