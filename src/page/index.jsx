import React, { Component } from 'react';
import { Link } from 'react-router-dom'


class App extends Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount () {

  }

  render() {
    return (
      <div className="outer">
        <div className="link_list">
          <ul>
            <li>
              <Link to="/weixin_share">微信分享</Link>
            </li>
            <li>
              <Link to="/notification">桌面通知</Link>
            </li>
            <li>
              <Link to="/h5_camera">h5拍照上传</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
