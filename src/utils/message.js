// 单独引入Message  引入之前一定要确定element已经安装
import {
  Message
} from 'element-ui';

let messageInstance = null; // Message对象，dom对象

const resetMessage = options => {
  console.log(options);
  if (messageInstance) {
    messageInstance.close();
  } // 判断message对象是否存在，若存在，则关闭该对象；
  Message.closeAll();
  messageInstance = Message(options);
};

['error', 'success', 'info', 'warning'].forEach(type => {
  resetMessage[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options
      };
    }
    options.type = type;
    return resetMessage(options);
  };
});

// 一定要记得暴露出去,不然上面白写了
export default resetMessage;
