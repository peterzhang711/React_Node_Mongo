

import React,{Component} from 'react'
import {Button} from 'antd-mobile'

 class  NotFound extends Component {
  render () {
    return (
      <div>
        <div>
          <h2>Sorry, Can not find Page! Error 404...</h2>
          <Button type='primary' onClick={() => this.props.history.replace('/')}>
            Home-Page
          </Button>
        </div>
      </div>
    )
  }
}

export default NotFound