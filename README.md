# cloning the project
git clone https://github.com/rishabhjha28/async-tik-tac-toe.git     
# get into the project directory
cd async-tik-tac-toe
# setting up the database (you must have mysql in your syastem)
# make a file and name it config.env in that file add these variables
PORT= 8080
SQL_HOST=localhost                             # replace with your own host name
SQL_USER=username                              # replace this with yur own user name   
SQL_DATABASE=nameOfDatabase                    # replace this with the name of your own database         
SQL_DATABASE_PASSWORD='password'              # replace this password with your own password 
# install the dependencies
npm install && nodemon index        # install nodemon by using npm install -g nodemon (if nodemon is not installed)
# open a new terminal and go the same directory as this project and then type this command
cd client && npm install && npm start
# open your browser and go to 
http://localhost:3000