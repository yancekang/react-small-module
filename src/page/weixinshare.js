import React, { Component } from 'react';
// import { Link } from 'react-router-dom'

import weixinshare from '@/tool/weixin_share'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      data: [],
      islogin: false,
      is_new_user: false
    }
  }

  componentDidMount () {
    weixinshare({title: '测试微信分享', desc: '当前页面是测试微信分享功能的，由科技男（yanon）开发', link: window.location.href, imgUrl: '', success: () => alert('success')})
  }

  render() {
    return (
      <div className="outer">
        qwe
      </div>
    );
  }
}

export default App;
