import notification from 'notification-koro1'; // 引入npm包

export default o => {
  let title = o.title
  let option = {
    dir: "auto", // 文字方向
    body: "通知：OBKoro1评论了你的朋友圈", // 通知主体
    requireInteraction: true, // 不自动关闭通知
    // 通知图标
    icon: "https://upload-images.jianshu.io/upload_images/5245297-818e624b75271127.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240",
  }
  const notificationClass = new notification(title, option); // 初始化
  if (notificationClass.support) {
    const userSelectFn = msg => {
      console.log(msg);
        if (msg === 'already granted' || msg === 'granted') {
            // 随时可以调用通知
           return notificationClass.userAgreed();
        } else if (msg === 'close') {
            // 请求权限通知被关闭
            return notificationClass.initNotification(userSelectFn); // 再次调用
        } else if(msg === 'denied' || msg === 'already denied') {
            // 请求权限当前被拒绝 || 曾经被拒绝
            if (msg === "denied") {
                console.log("您刚刚拒绝显示通知 请在设置中更改设置");
            }else{
                console.log("您曾经拒绝显示通知 请在设置中更改设置");
            }
        }
    };
    notificationClass.initNotification(userSelectFn); // 请求授权

    // 弹窗显示的回调
    notificationClass.notificationEvent({
      onclick: e => {
        console.log("点击通知打开百度", e);
        window.open("https://www.baidu.com/", "_blank");
      },
      // 通知显示回调
      onshow: e => {
        console.log("显示", e);
      },
      // 通知遇到错误回调
      onerror: e => {
        console.log("通知报错", e);
      },
      // 通知关闭回调
      onclose: e => {
        console.log("关闭通知", e);
      }
    });
  } else {
    // 浏览器不支持
    alert('浏览器不支持')
  }
}
