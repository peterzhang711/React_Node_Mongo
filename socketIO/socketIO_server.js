const {ChatModel} = require('../db/models')

module.exports = function (server) {            

  const io = require('socket.io')(server)          

  io.on('connection', function (socket) {
    console.log('soketio connected')

    socket.on('sendMsg', function ({from, to, content}) {
      // console.log('receive from views', {from, to, content})

      const chat_id = [from, to].sort().join('_')           //from _to / to_from
      const create_time = Date.now()
      new ChatModel( {from, to, content, chat_id, create_time }).save(function (error, chatMsg) { 
        io.emit('receiveMsg', chatMsg)
      })
    })
  })
}