const dotenv  = require('dotenv')
dotenv.config({path:'./config.env'})
const express = require('express')
const app = express()

const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

const userRouter = require('./router/user');
app.use('/user', userRouter);

const gameRouter = require('./router/game');
app.use('/game', gameRouter);

if(process.env.NODE_ENV=="production"){
    console.log('abc')
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

const port = process.env.PORT
app.listen(port,()=>{
    console.log("Server started successfully on port",port)
})
