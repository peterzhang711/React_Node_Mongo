import React,{Component} from 'react'
import {connect} from 'react-redux'   
import {getUserList} from '../../redux/actions'

import UserList from '../../components/use-list/user-list'

class Private extends Component {
  componentDidMount (){
    this.props.getUserList('business')   
  }
  render () {
    return (
      <UserList userList={this.props.userList}/>
    )
  }
}
export default connect(
  state => ({userList: state.userList}),  
  {getUserList}　　　　　　　　　　　　　　　
)(Private)