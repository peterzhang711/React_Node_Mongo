
import io from 'socket.io-client'
import {               
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG
} from './action-types'
import {　　　　　　　　
  reqRegister,
  reqLogin,
  reqUpdateUser,
  reqUser,
  reqUserList,
  reqChatMsgList,
  reqReadMsg
}from '../api'


//sockit 
function initIo() {                                   
  if(!io.socket){
    const socket = io('ws://localhost:4000')
    io.socket = socket
    io.socket.on('receiveMsg', function (chatMsg) {
      console.log('浏览器端接收服务器端发到消息:', chatMsg)
      if(userid===chatMsg.from || userid===chatMsg.to){
        dispatch(receiveMsg(chatMsg))
      }
    })
  }
  }

//async get chat list
async function getMsgList(dispatch) {
  const response = await reqChatMsgList()
  const result = response.data
  if(result.code===0){
    const{users, chatMsgs} = result.data
    dispatch(receiveMsgList({users,chatMsgs}))
  }
}



const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})
const receiveUser = (user) => ({type: RECEIVE_USER, data: user})
export const resetUser = (msg) => ({type:RESET_USER, data: msg})
const receiveUserList = (userList) => ({type: RECEIVE_USER_LIST, data: userList})
const receiveMsgList = ({users,chatMsgs}) => ({type: RECEIVE_MSG_LIST, data: {users,chatMsgs}})
const receiveMsg = (chatMsg) => ({type: RECEIVE_MSG, data: chatMsg})


// async actions
export const register = (user) => {
 const {username, password, password2,type} = user
  if(!username){
   return errorMsg('username is empty!')
 } else if(password !== password2){
   return errorMsg("password does not match!")
  }
  return async dispatch => {
    const response = await reqRegister({username, password, type})
    const result = response.data    //{promise{ code :0/1 , data: user, msg:''}
    if(result.code===0){ //ok
      getMsgList(dispatch)          
      dispatch(authSuccess(result.data))
    }else{ //not ok
      dispatch(errorMsg(result.msg))
    }
  }
}

export const login = (user) => {
  const {username, password} = user
  if(!username){
    return errorMsg('username is empty!')
  } else if(!password){
    return errorMsg("password does not match!")
  }
  return async dispatch => {
    //（ api/index,js）
    //promise { code :0/1 , data: user, msg:''}
    const response = await reqLogin(user)
    const result = response.data
    if(result.code===0){ //ok
      getMsgList(dispatch)         
     
      dispatch(authSuccess(result.data))
    }else{ //not ok
      dispatch(errorMsg(result.msg))
    }
  }
}

export const updateUser = (user) => {
  return async dispatch => {
    const response = await reqUpdateUser(user)
    const result = response.data
    if(result.code===0){    //yes   
      dispatch(receiveUser(result.data))
    }else {   //no
      dispatch(resetUser(result.msg))
    }
  }
}


export const getUser = () => {
  return async dispatch => {
    //ajax
    const response = await reqUser()
    const result = response.data
    if(result.code===0){ //ok
      getMsgList(dispatch)         
      dispatch(receiveUser(result.data))
    }else {      //not
      dispatch(resetUser(result.msg))
    }
  }
}

export const getUserList = (type) => {
  return async dispatch => {
    const response = await reqUserList(type)         
    const result = response.data
    if(result.code===0){
      dispatch(receiveUserList(result.data))    
    }
  }
}

export const sendMsg = ({from, to, content}) => {
return dispatch => {
  console.log('客户端向服务器send msg',{from, to , content})
  io.socket.emit('sendMsg', {from, to, content})
}
}




