import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// Redirect
import Index from '@/page/weixinshare'


export default class App extends Component {
  render () {
    return (
      <Router>
        <Switch>
            <Route exact path='/' component={Index} />
        </Switch>
      </Router>
    )
  }
}
