<template>
  <div class="teamInfoPages">
    123
  </div>
  <!-- <KoalaRender :render="render"></KoalaRender> -->
</template>
<script></script>
<!-- <script>
import { KoalaRender, useForm, ComponentType } from "@koala-form/core";

export default {
  components: { KoalaRender },
  setup() {
    const { render } = useForm({
      fields: [
        {
          name: "name", // modelRef.value.name可以访问到值
          label: "姓名", // 表单项的名称
          defaultValue: "蒙奇·D·路飞", // 默认值
          components: {
            name: ComponentType.Input // 表单组件是输入框
          }
        }
      ]
    });
    return {
      render
    };
  }
};
</script> -->
<style>
.teamInfoPages {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 24px 16px 16px 24px;
  border-radius: 4px;
}
</style>
