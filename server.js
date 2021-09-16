const mongoose = require('mongoose');
const express = require('express');
const app = express()
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const io = require('socket.io')(server);


app.use(express.urlencoded({
  extended: true
}));

const url = 'mongodb+srv://suliman:suliman125@cluster0.l3qam.mongodb.net/message-database?retryWrites=true&w=majority';

mongoose.connect(url, err => {
        if(err) throw err;
        console.log('connected to MongoDB')
    });
 
    const msgSchema ={
        message : String
    }
    
const messages = mongoose.model("messages", msgSchema)


 app.set('views', 'Views');
app.use(express.static('Views'));

 app.post('/',  function (req, res) {
    let newModel = new messages({
      message:req.body.message
    })
    newModel.save();
   res.redirect('/');
  })
  
  io.on('connection', socket => {
   socket.on('send-message', data => {
   io.sockets.emit('send-message', data)

    });
  
});

 





server.listen(3000);