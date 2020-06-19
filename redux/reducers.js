

import {combineReducers} from 'redux'     
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RESET_USER,
  RECEIVE_USER,
  RECEIVE_USER_LIST,
  RECEIVE_MSG,
  RECEIVE_MSG_LIST
} from './action-types'
import {getRedirectTo} from '../utils'

//user
const  initUser = {
  username: '', 
  type: '', 
  msg:'',    
  redirectTo: '' 
}
//reducer１.
function user(state=initUser, action) {
  switch (action.type){
    case AUTH_SUCCESS:       
      // return {...state, ...action.data} 
      const {type, header} = action.data
      return {...action.data, redirectTo: getRedirectTo(type, header)} 
    case ERROR_MSG:           
      return {...state, msg: action.data}         
    case RECEIVE_USER:        
      return action.data
    case RESET_USER:              
      return {...initUser, msg: action.data}
    default:
      return state
  }
}　　                                              


//userlist(array)
const initUserList = []
// reducer２　
function userList(state=initUserList, action) {
  switch (action.type){
    case RECEIVE_USER_LIST:
      return action.data　　　　　
    default:
      return state
  }
}　　　　


//chat
const initChat = {
  users: {},　　　　　　　//userid:　｛username,　header｝
  chatMsg: [],　　　　　
  unReadCount: 0      
}
//reducer３
function chat(state=initChat, action) {
  switch (action.type) {
    case RECEIVE_MSG_LIST:　　　　　　　　//data　:｛users,chatMsgs｝
      const {users,chatMsgs} = action.data
      return  {                   
        users,
        chatMsgs,
        unReadCount: 0
      }
    case RECEIVE_MSG:          //data: chatMsg
      return
    default:
      return state
  }
}　　　　　　　　　　　　　　　　　　　　　　　　


export default combineReducers({
  user,
  userList,
  chat
})
//{user:{} ,userList:[] , chat:{} }