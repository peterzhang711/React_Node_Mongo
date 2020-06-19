

import React,{Component} from 'react'
import {List, Grid} from 'antd-mobile'
import PropTypes from 'prop-types'

export default class HeaderSelector extends Component {

  static propTypes = {
    setHeader: PropTypes.func.isRequired
  }
  //header state
  state = {
    icon: null 
  }

  constructor(props) {
    super(props)
    //get headers
    this.headerList = []
    for (let i = 0; i < 20; i++){
      this.headerList.push({
        text: 'header'+(i+1),
        icon: require(`../../assets/images/header${i+1}.png`) 
      })
    }
  }

  handleClick = ({text, icon}) =>{       
    //update state
    this.setState({icon})
    this.props.setHeader(text)
  }

  render () {
    const {icon} = this.state
    const listHeader = !this.state.icon ? 'Please choose a header': (
      <div>
        You have choosed:<img src={this.state.icon}/>
      </div>
    )
    return (
      <List renderHeader={() => listHeader}>
        <Grid data={this.headerList}
              columnNum={5}
              onClick={this.handleClick}/>
      </List>
    )
  }
}