var express = require('express');
var router = express.Router();

const md5 = require('blueimp-md5')
const filter = {password: 0} 
const {UserModel, ChatModel} = require('../db/models')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//register
router.post('/register',function (req,res) {
  const {username, password, type} = req.body
  UserModel.findOne({username},function (err,user) {
    if(user) { //refuse
      res.send({code: 1, msg: "username not avaiable"})
    }else{ //ok to regi
      new UserModel({username, password: md5(password), type}).save(function (error,user) {
                  //ser cookie(userid : user._id)
        res.cookie('userid', user._id, {maxAge: 1000*60*60*24})
                   //res
        const data = {username, type, _id: user._id}
        res.send({code: 0, data: data})
      })
    }
  })
})

//login
router.post('/login', function (req, res) {
  const {username, password} = req.body
  UserModel.findOne({username, password: md5(password)},filter, function (err,user) {
    if(user){ //login ok
                          //set cookie(userid : user._id)
      res.cookie('userid', user._id, {maxAge: 1000*60*60*24})
      res.send({code: 0, data: user})
    }else{
      res.send({code: 1, msg: 'Invalid username or password'})
    }
  })
})

//update user
router.post('/update',function (req, res) {
  //get userid from cookie
  const userid = req.cookies.userid     
  //check cookie yes or no 
  if(!userid){           
    res.send({code: 1, msg: 'please login first'})
    return                           
  //if cookie s there
  const user = req.body 
  UserModel.findByIdAndUpdate({_id: userid}, user, function (error, oldUser) {　　
    if(!oldUser) {
      //cookie not match 
      res.clearCookie(userid)
      res.send({code: 1, msg: 'please login first'})            
    }else{
      const {_id, username, type} = oldUser
      const data = Object.assign(user, {_id, username, type}) 
      res.send({code: 0, data})
    }
  })
})

//get user info
router.get('/user', function (req, res) {
  const userid = req.cookies.userid
  if(!userid){
    res.send({code: 1, msg: 'please login first'})
    return                              //if no cookie
  }
  //find user by id
  UserModel.findOne({_id: userid},filter,function (error, user) {
    res.send({code: 0, data: user})
  })
})

//get userlist by type
router.get('/userlist', function (req, res) {             
  const {type} = req.query　　　　　　　　　　　　　　　　　　　　　　　
  UserModel.find({type}, filter, function (error, users) {
    res.send({code: 0, data: users})
  })
})

/*
chat list
*/
router.get('/msglist', function (req, res) {
  const userid = req.cookies.userid
  UserModel.find(function (err, userDocs) {
//key: _id, val: name + header 
    const users = {} 
    userDocs.forEach(doc => {
      users[doc._id] = {username: doc.username, header: doc.header}
    })
    ChatModel.find({'$or': [{from: userid}, {to: userid}]}, filter, function (err, chatMsgs) {
      res.send({code: 0, data: {users, chatMsgs}})
    })
  })
})
/*
update read status
*/
router.post('/readmsg', function (req, res) {
// get from and  to
  const from = req.body.from
  const to = req.cookies.userid
  ChatModel.update({from, to, read: false}, {read: true}, {multi: true}, function (err, doc) {
    // console.log('/readmsg', doc)
    res.send({code: 0, data: doc.nModified}) 
  })
})


module.exports = router;
