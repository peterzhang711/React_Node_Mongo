
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/gzhipin2')

const conn = mongoose.connection

conn.on('connected', () => {
  console.log('db connect successful')
})


const userSchema = mongoose.Schema({
  username: {type: String, required: true}, 
  password: {type: String, required: true}, 
  type: {type: String, required: true}, 
  header: {type: String}, 
  post: {type: String}, 
  info: {type: String}, 
  company: {type: String}, 
  scope: {type: String} 
})
//Model
const UserModel = mongoose.model('user', userSchema)    
exports.UserModel = UserModel

// module.exports = xxx
// exports.xxx = value
// exports.yyy = value...

//chats 
const chatSchema = mongoose.Schema({
  from: {type: String, required: true}, // sender_id
  to: {type: String, required: true}, // receiver_id
  chat_id: {type: String, required: true}, 
  content: {type: String, required: true}, 
  read: {type:Boolean, default: false},  //read status
  create_time: {type: Number} 
})

const ChatModel = mongoose.model('chat', chatSchema)　　　

exports.ChatModel = ChatModel
