const express = require('express');
const connection = require('../dbConnection');
const router = express.Router();

router.get('/getgame/:id',(req,res)=>{
    const {id} = req.params
    connection.query('select * from game where gameId = ?',[id],(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.json(result)
        }
    })
})

router.get('/:user',(req,res)=>{
    const {user} = req.params
    connection.query('SELECT gameId,starterId,withWhomId,status,lastUpdatedAt FROM game where starterId = ? or withWhomId = ? order by status asc, lastUpdatedAt desc',[user,user],(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.json(result)
        }
    })
})

router.post('/updategame',(req,res)=>{
    const {gameId,status,game} = req.body
    connection.query('update game set status = ?, currantGame = ? where gameId = ?',[status,game,gameId],(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.json('updated')
        }
    })
})

router.post('/startgame',(req,res)=>{
    const {starter,searchBy} = req.body
    connection.query('select username from user where email = ? or username = ?',[searchBy,searchBy],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            if(result.length === 0){
                res.json('userNotFound')
            }
            else if(starter === result[0].username){
                res.json('can\'tPlayAgainstYourSelf')
            }
            else{
                connection.query('select status,gameId,starterId,withWhomId from game where (starterId = ? and withWhomId = ?) or (starterId = ? and withWhomId = ?)',[starter,result[0].username,result[0].username,starter],(err,result1)=>{
                    if(err){
                        console.log(err)
                    }
                    else{
                        let flag = false
                        if(result1.length > 0){
                            for(let i = 0;i < result1.length;i++){
                                if(result1[i].status === 1){
                                    res.json(result1[i].gameId)
                                    flag = true
                                    break
                                }
                            }
                        }
                        if(flag === false){
                            connection.query('insert into game (starterId,withWhomId) values(?,?)',[starter,result[0].username],(err,result)=>{
                                if(err){
                                    console.log(err)
                                }else{
                                    res.json(result.insertId)
                                }
                            })
                        }
                    }
                })
            }
        }
    })
})



module.exports = router;