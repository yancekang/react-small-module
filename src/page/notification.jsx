import React, { Component } from 'react';
// import { Link } from 'react-router-dom'

import notification from '@/tool/notification'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  componentDidMount () {
    notification({title: '测试微信分享', body: '当前页面是测试微信分享功能的，由科技男（yanon）开发', link: window.location.href, icon: '', success: () => alert('success')})
  }

  render() {
    return (
      <div className="outer">
        <h2>测试桌面通知</h2>
      </div>
    );
  }
}

export default App;
