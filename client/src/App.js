import './App.css';
import {Routes, Route} from 'react-router-dom'
import HomePage from './component/HomePage';
import Login from './component/Login';
import Register from './component/Register';
import RequireAuth from './RequireAuth';
import Home from './component/Home';
import StartGamePage from './component/StartGamePage';
import GamePage from './component/GamePage';

function App() {
  return (
    <div className='main'>
      <Routes>
        <Route path = '/' element={<HomePage/>} />
        <Route path = 'login' element={<Login/>} />
        <Route path = 'register' element={<Register/>}/>
        <Route path = ':username' element = {<RequireAuth><Home/></RequireAuth>}/>
        <Route path = ':username/:gameId' element = {<RequireAuth><GamePage/></RequireAuth>}/>
        <Route path = ':username/startgame' element = {<RequireAuth><StartGamePage/></RequireAuth>}/>
      </Routes>
    </div>
  );
}

export default App;
