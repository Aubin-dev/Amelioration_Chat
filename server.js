const express= require('express');
const app = express();
const http = require('http')
const mongoose=require('mongoose');
const WebSocket = require('ws');
const cors =require('cors');
const { type } = require('os');
const port  = 8080;

// On se connecte à la base de données
mongoose.connect('mongodb+srv://User:123@sandbox.ii67k.mongodb.net/Messenger', { useNewUrlParser: true, useUnifiedTopology: true }, function(err){
if(err) {
    console.log(err)
} else {
    console.log('Connected to mongodb')
}
})

// On initialise notre moteur de template
const server = http.createServer(app);
app.set('view engine', 'ejs');
app.set('views','./views')

const wss = new WebSocket.Server({server:server})

wss.on('connection',(ws)=>{
    ws.send('Coucou')
    ws.on('message',(message)=>{
        const data = JSON.parse(message)
        switch (data.type) {
            case "SEND_MESSAGE":
                console.log('message : ' + data.data)
                break;
        
            default:
                break;
        }
    })
})



//On définit le dossier contenant notre CSS et JS
app.use(express.static(__dirname + '/public'));
app.use(cors());

//Les routes
app.get('/',(req,res)=>{
    res.render('index.ejs')
})







server.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})