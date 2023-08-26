
import Vue from 'vue';

let findEle = (parent, type) => {
  return parent.tagName.toLowerCase() === type ? parent : parent.querySelector(type);
};

Vue.directive('emoji', {
  // bind: function (el, binding, vnode) {
  //   console.log(el);
  //   // 正则规则可根据需求自定义
  //   let regRule = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
  //   let $inp = findEle(el, 'input');
  //   console.log($inp);
  //   el.$inp = $inp;
  //   $inp.handle = function (content, item) {
  //     let val = $inp.value;
  //     $inp.value = val.replace(regRule, '');
  //   };
  //   $inp.addEventListener('input', $inp.handle, true);
  // },
  // unbind: function (el) {
  //   el.$inp.removeEventListener('input', el.$inp.handle, true);
  // },
  bind(el, binding, vnode, oldVnode) {
    const regex = /(\ud83c[\udc00-\udfff])|(\ud83d[\udc00-\udfff])|(\ud83e[\udc00-\udfff])|[\u2100-\u32ff]|[\u0030-\u007f][\u20d0-\u20ff]|[\u0080-\u00ff]/g;
    const obj = findEle(el, 'input') || findEle(el, 'textarea');
    const zclearNoNum = function (e) {
      if (e.target.composing) {
        return;
      }
      const match = regex.exec(obj.value);
      if (match) {
        /* for (let i=0;i<match.length;i++) {
          obj.value = obj.value.replace(match[i],"");
        } */
        obj.value = obj.value.replace(regex, '');
        zclearNoNum(e);
      }
      // 触发v-model的更新
      obj.dispatchEvent(new Event('input'));
    };
    const zblur = function (e) {
      zclearNoNum(e);
      setTimeout(() => {
        const match = regex.exec(obj.value);
        if (match) {
          obj.value = obj.value.replace(regex, '');
          zclearNoNum(e);
        }
        // 触发v-model的更新
        obj.dispatchEvent(new Event('change'));
      }, 50);
    };
    obj.onkeyup = zclearNoNum;
    obj.onblur = zblur;


    function onCompositionStart(e) {
      e.target.composing = true;
    }
    function onCompositionEnd(e) {
      // console.log('按回车将字输入', e.target.value)
      e.target.composing = false;
      obj.dispatchEvent(new Event('change'));
      setTimeout(() => {
        if (obj.value) {
          obj.value = obj.value.replace(regex, '');
          zclearNoNum(e);
        }
        // 触发v-model的更新
        obj.dispatchEvent(new Event('change'));
      }, 50);
    }
    obj.addEventListener('compositionstart', onCompositionStart);
    obj.addEventListener('compositionend', onCompositionEnd);
  },
  update(el, binding, vnode, oldVnode) {}
});