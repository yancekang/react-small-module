
> 此项目当前为react项目中遇到的部分小功能，集合到这里以备不时之需

[TOC]

### 项目搭建
```
git clone https://github.com/yancekang/react-small-module.git

npm install
```
### 小功能
#### 1.单元测试

测试`npm test`，详情请点击[react-mocha-test](https://github.com/yancekang/react-mocha-test.git)，详细介绍`mocha`及`chai`单元测试

#### 2.微信分享

目录`src/tool/weixin_share.js`

使用方法
```
import weixinshare from '@/tool/weixin_share'

weixinshare({
    title: '测试微信分享',
    desc: '当前页面是测试微信分享功能的，由科技男（yanon）开发',
    link: window.location.href, imgUrl: '',
    success: () => alert('success')
})
```
在`weixin_share.js`文件中，可以通过请求API的方式获取微信配置信息，复制给`wx.config({})`
