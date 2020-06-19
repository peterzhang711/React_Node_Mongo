
import ajax from './ajax'

//regi
export const reqRegister = (user) => ajax('/register', user, 'POST')
                                                                           
//login                 
export const reqLogin = ({username, password}) => ajax('/login', {username, password}, 'POST')

//update user
export const reqUpdateUser = (user) => ajax('/update', user, 'POST')    

//get user info
export const reqUser = () => ajax('/user')

//get user list                                        
export const reqUserList = (type) => ajax('/userlist', {type})

//get chat list
export const reqChatMsgList = () => ajax('/msglist')

//update chat status
export const reqReadMsg = (from) => ajax('/readmsg', {from},'POST')

