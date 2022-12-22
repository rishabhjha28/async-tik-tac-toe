const express = require('express');
const connection = require('../dbConnection');
const router = express.Router();

router.post('/register',(req,res)=>{
    const {name,email,userName,password} = req.body
    connection.query('select * from user where username = ? or email = ?',[userName,email],(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            if(result.length){
                res.json('userAlreadyExist')
            }
            else{
                connection.query('insert into user (name,username,password,email) values(?,?,?,?)',[name,userName,password,email],(err,result)=>{
                    if(err){
                        console.log(err)
                        res.json("err Please Try Again")
                    }
                    else{
                        res.send("userCreated")
                    }
                })
            }
        }
    })
})

router.post('/login',(req,res)=>{
    const {userName,password} = req.body
    connection.query('select * from user where username = ? and password = ?',[userName,password],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            if(result.length === 1){
                res.json("logedInSuccessfully")
            }
            else{
                res.json('wrong Credentials or user doesn\'t exist')
            }
        }
    })
})

router.get('/',(req,res)=>{
    const {id} = req.query
    connection.query('select name from user where username = ?',[id],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.json(result)
        }
    })
})

module.exports = router;
