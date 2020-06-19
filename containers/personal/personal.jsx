// personal 

import React from 'react'
import {Result, List, WhiteSpace, Button, Modal} from 'antd-mobile'
import {connect} from 'react-redux'      
import Cookies from 'js-cookie'
import {resetUser} from '../../redux/actions'

const Item = List.Item
const Brief = Item.Brief

class Personal extends React.Component {

  logout = () => {
    Modal.alert('Logout', 'Sure to logout?', [
      {text: 'Cancel'},
      {
        text: 'Confirm',
        onPress: ()=> {
          Cookies.remove('userid')
          this.props.resetUser()
        }
      }
    ])
  }

  render() {
    const {username, header,info, company, post, scope} = this.props.user
    return (
      <div style={{marginBottom:50, marginTop:50}}>
        <Result
          img={<img src={require(`../../assets/images/${header}.png`)} style={{width: 50}} alt="header"/>}
          title={username}
          message={company}
        />

        <List renderHeader={() => 'Information'}>
          <Item multipleLine>
            <Brief>Position: {post}</Brief>
            <Brief>Brief: {info}</Brief>
            {scope ? <Brief>Scope: {scope}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace/>
        <List>
          <Button type='warning' onClick={this.logout}>LogOut</Button>
        </List>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {resetUser}
)(Personal)

