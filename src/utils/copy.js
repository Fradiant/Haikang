import Vue from 'vue';
import resetMessage from './message'; // 重写message弹提示

Vue.directive('copy', {
  bind(el, { value }) {
    el.$value = value;
    el.handler = () => {
      if (!el.$value) {
        resetMessage.warning('无复制内容');
        return;
      }
      const textarea = document.createElement('textarea'); // 动态创建 textarea 标签
      textarea.readOnly = 'readonly'; // 将该 textarea 设为 readonly 防止 iOS 下自动唤起键盘，同时将 textarea 移出可视区域
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      textarea.value = el.$value; // 将要 copy 的值赋给 textarea 标签的 value 属性
      document.body.appendChild(textarea); // 将 textarea 插入到 body 中
      textarea.select(); // 选中值并复制
      const result = document.execCommand('Copy');
      if (result) {
        console.log(result);
        resetMessage.success(`复制成功：${el.$value}`);
      }
      // document.body.removeChild(textarea);
    };
    el.addEventListener('click', el.handler); // 绑定点击事件，就是所谓的一键 copy 啦
  },
  componentUpdated(el, { value }) {
    el.$value = value;
  }, // 当传进来的值更新的时候触发
  unbind(el) {
    el.removeEventListener('click', el.handler);
  }, // 指令与元素解绑的时候，移除事件绑定
}
);
