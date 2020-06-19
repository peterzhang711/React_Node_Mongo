
const md5 = require('blueimp-md5')

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/gzhipin_test')

const conn = mongoose.connection

conn.on('connected', function () { 
  console.log('database-connected')
})

//  Schema
const userSchema = mongoose.Schema({ 
  username: {type: String, required: true}, 
  password: {type: String, required: true}, 
  type: {type: String, required: true},
  header: {type: String}              
})
// Model
const UserModel = mongoose.model('user',userSchema) 

// save()
function testSave() { 
  const userModel = new UserModel({username: 'peter', password: md5('456'), type: 'business'})
  userModel.save(function(error, userDoc){
    console.log('save()',error,userDoc)
  })
}
testSave()
// find()
function testFind() {
  UserModel.find(function (error, users) { 
    console.log('find()',error, users)
  })
  UserModel.findOne({_id: '5ecc77cde2a8a57fd57d2a09'},function (error, user) {
    console.log('findOne()',error, user)
  })
}
// testFind()
//findByIdAndUpdate()
function testUpdate() {
  UserModel.findByIdAndUpdate({_id: '5ecc77cde2a8a57fd57d2a09'},{username : 'Bob'},function (error,oldUser) {
   console.log('findByIdAndUpdate', error, oldUser)
  })
}
// testUpdate()
//remove()
function testDelete() {
  UserModel.remove({_id: '5ecc77cde2a8a57fd57d2a09'},function (error, doc) {
    console.log('testDelete', error, doc)  //doc  { ok: 1, n: 1, deletedCount: 1 }
  })
}
// testDelete()