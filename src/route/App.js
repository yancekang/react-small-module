import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// Redirect
import Index from '@/page/index'
import Weixinshare from '@/page/weixinshare'
import Notification from '@/page/notification'


export default class App extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Index} />
          <Route exact path='/weixin_share' component={Weixinshare} />
          <Route exact path='/notification' component={Notification} />
        </Switch>
      </Router>
    )
  }
}
