const mysql = require('mysql2');

const connection = mysql.createConnection({
    host:process.env.SQL_HOST,
    user:process.env.SQL_USER,
    database:process.env.SQL_DATABASE,
    password:process.env.SQL_DATABASE_PASSWORD
  });
  

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
  
});
connection.query("CREATE TABLE IF NOT EXISTS user (email varchar(255) NOT NULL,username varchar(255) NOT NULL,password varchar(255) NOT NULL,name varchar(45) NOT NULL,PRIMARY KEY (username),UNIQUE KEY email (email),UNIQUE KEY username (username))",(err,res)=>{
  if(err){
    console.log(err)
  }
  else{
    console.log("user table created")
  }
})
connection.query("CREATE TABLE IF NOT EXISTS gamestatus (id int NOT NULL AUTO_INCREMENT,status varchar(255) NOT NULL,PRIMARY KEY (id),UNIQUE KEY status (status))",(err,res)=>{
  if(err){
    console.log(err)
  }
  else{
    console.log("gameStatus table created")
  }
})
connection.query("CREATE TABLE IF NOT EXISTS game (starterId varchar(255) NOT NULL,withWhomId varchar(255) NOT NULL,status int NOT NULL DEFAULT '1',currantGame char(9) NOT NULL DEFAULT '000000000',gameId int NOT NULL AUTO_INCREMENT,lastUpdatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,PRIMARY KEY (gameId),KEY fk_game_1_idx (starterId),KEY fk_game_2_idx (withWhomId),KEY fk_game_3_idx (status),CONSTRAINT fk_game_1 FOREIGN KEY (starterId) REFERENCES user (username) ON DELETE CASCADE ON UPDATE CASCADE,CONSTRAINT fk_game_2 FOREIGN KEY (withWhomId) REFERENCES user (username),CONSTRAINT fk_game_3 FOREIGN KEY (status) REFERENCES gamestatus (id))",(err,res)=>{
  if(err){
    console.log(err)
  }
  else{
    console.log("game table created")
  }
})


module.exports = connection