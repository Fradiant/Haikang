<template>
  <div class="teamInfoPages">
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
</template>
<script>
export default {
  name: 'config',
  data() {
    return {};
  },
  methods: {}
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
