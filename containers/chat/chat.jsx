import React, {Component} from 'react'
import {NavBar, List, InputItem} from 'antd-mobile'
import {connect}from 'react-redux'
import {sendMsg} from '../../redux/actions'


const Item = List.Item
class Chat extends Component {

  state = {
    content: ''
  }

  handleSend = () => {

    const from = this.props.user._id        
    const to = this.props.match.params.userid 
    const content = this.state.content.trim()　
    if(content){
      this.props.sendMsg({from, to, content})
    }
    this.setState({content: ''})
  }

  render() {
    const {user} = this.props
    const {users, chatMsgs} = this.props.chat
    const meId = user._id
    if(!users[meId]) {
      return null
    }
    const targetId = this.props.match.params.userid  
    const chatId = [meId, targetId].sort().join('_')
    const msgs = chatMsgs.filter(msg => msg.chat_id===chatId)     
    const targetHeader = users[targetId].header
    const targetIcon = targetHeader ? require(`../../assets/images/${targetHeader}.png`) : null

    return (
      <div id='chat-page'>
        <NavBar>aa</NavBar>
        <List>
          {
            msgs.map(msg => {
              if(meId===msg.to){     
                return　(
                  <Item
                    key={msg._id}
                    thumb={targetIcon}
                  >
                    {msg.content}
                  </Item>
                )
              }else {                
                return (
                  <Item
                    key={msg._id}
                    className='chat-me'
                    extra='Me'
                  >
                    {msg.content}
                  </Item>
                )
              }
            })
          }
        </List>
        <div className='am-tab-bar'>
          <InputItem
            placeholder="Please Input Here"
            value={this.state.content}　　　　　　　　　　　　　　　　　
            onChange={val => this.setState({content: val})}          
            extra={
              <span onClick={this.handleSend}>Send</span>
            }
          />
        </div>
      </div>
    )
  }
}
export default connect(
  state => ({user: state.user,chat: state.chat}),
  {sendMsg}
)(Chat)