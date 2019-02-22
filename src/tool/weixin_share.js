import wx from 'weixin-js-sdk'
// import api from '@/tool/api'
export default o => {
  let domDesc = document.getElementsByTagName('meta')['description']
  let domDescContent = domDesc ? domDesc.content : null
  let obj = {
    title: o.title || document.title,
    desc: o.desc || domDescContent || document.title,
    link: o.link || window.location.href,
    imgUrl: o.imgUrl || 'https://user-gold-cdn.xitu.io/2017/12/11/160436260fdaf6a9',
    appimgUrl: o.imgUrl || 'https://user-gold-cdn.xitu.io/2017/12/11/160436260fdaf6a9'
  }
  const ua = window.navigator.userAgent.toLowerCase()
  if (ua.indexOf('micromessenger') < 0) return false
  // 最好在在 router 的全局钩子里调用这个方法，每次页面的 URL 发生变化时，都需要重新获取微信分享参数
  // 如果你的 router 使用的是 hash 形式，应该不用每次都重新获取微信分享参数
  // 一下wx_config可以通过接口调用获取微信配置参数
  // api.get('wechat_sdk', { url: document.location.href.split('#')[0] }, r => {
  // })
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: 'wxd1b7a6660a7603ce', // 必填，公众号的唯一标识
    timestamp: '1550808142', // 必填，生成签名的时间戳
    nonceStr: 'el6lYfN7yoaavXum', // 必填，生成签名的随机串
    signature: '851a674761d975af760c5fc2a163598c4cbeab48',// 必填，签名，见附录1
    jsApiList: [
      'onMenuShareAppMessage',
      'onMenuShareTimeline',
      'onMenuShareQQ'
    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  })
  wx.ready(() => {
    //分享给朋友
    wx.onMenuShareAppMessage({
      title: obj.title, // 分享标题
      desc: obj.desc, // 分享描述
      link: obj.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: obj.imgUrl, // 分享图标
      type: '', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function () {
        // 用户确认分享后执行的回调函数
        o.success()
      }
    })
    //分享到朋友圈
    wx.onMenuShareTimeline({
      title: obj.title, // 分享标题
      link: obj.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: obj.imgUrl, // 分享图标
      success: function () {
        // 用户确认分享后执行的回调函数
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
      }
    })
    wx.onMenuShareQQ({
      title: obj.title, // 分享标题
      desc: obj.desc, // 分享描述
      link: obj.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: obj.imgUrl, // 分享图标
      success: function () {
        // 设置成功
      }
    })
  })

}
