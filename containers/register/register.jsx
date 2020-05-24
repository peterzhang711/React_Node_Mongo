// registe route
import React,{Component} from 'react'
import {NavBar, WingBlank,List,InputItem,WhiteSpace,Radio,Button} from 'antd-mobile'
import Logo from  '../../components/logo/logo.JPG'



const ListItem = List.Item
export default class Register extends Component {
  render () {
    return (
      <div>
        <NavBar>Grant&nbspDeal</NavBar>
        <Logo/>
      </div>
    )
  }
}