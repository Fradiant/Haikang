
import Vue from 'vue';

let findEle = (parent, type) => {
  return parent.tagName.toLowerCase() === type ? parent : parent.querySelector(type);
};

Vue.directive('emoji', {
  bind: function (el, binding, vnode) {
    console.log(el);
    // 正则规则可根据需求自定义
    let regRule = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
    let $inp = findEle(el, 'input');
    console.log($inp);
    el.$inp = $inp;
    $inp.handle = function (content, item) {
      let val = $inp.value;
      $inp.value = val.replace(regRule, '');
    };
    $inp.addEventListener('input', $inp.handle, true);
  },
  unbind: function (el) {
    el.$inp.removeEventListener('input', el.$inp.handle, true);
  },
});