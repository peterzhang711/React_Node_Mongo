

import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import HeaderSelector from '../../components/header-selector/header-selector'
import {updateUser} from '../../redux/actions'

class BusinessInfo extends Component {
  state = {
    header: '' , 
    post: '', 
    info: '', 
    company: '', 
    scope: '' 
  }
  setHeader = (header) => {
    this.setState({
      header
    })
  }


  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }
  save = () => {
    this.props.updateUser(this.state)
  }
  render () {
      const {header, type} = this.props.user
      if(header) { 
        const path = type==='business' ? '/business' : '/private'
        return<Redirect to={path}/>
      }
    return (
      <div>
        <NavBar>Business Information</NavBar>
        <HeaderSelector　setHeader={this.setHeader}/>
        <InputItem placeholder='Company Name'　onChange={val => {this.handleChange('company', val)}}>Name:</InputItem>
        <InputItem placeholder='Position' onChange={val => {this.handleChange('post', val)}}>Position:</InputItem>
        <InputItem placeholder='Bussiness Scope' onChange={val => {this.handleChange('scope', val)}}>Scope:</InputItem>
        <TextareaItem title='Comment:' rows={2} onChange={val => {this.handleChange('info', val)}}/>
        <Button type='primary' onClick={this.save}>&nbsp;&nbsp;&nbsp;Save</Button>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),         
)(BusinessInfo)