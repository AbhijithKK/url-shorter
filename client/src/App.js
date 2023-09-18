import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import For04 from './utils/For04';
import Routers from './utils/Routes';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route exact path='/' element={<Navigate to="/login"/>} />

       <Route exact path='/login' element={<Login/>} />
       <Route exact path='/signup' element={<Signup/>} />
       {/* <Route exact path='*' element={<For04/>} /> */}
       {/* login true */}
       {/* <Route exact path='/login' element={<Navigate to="/home"/>} />
       <Route exact path='/signup' element={<Navigate to="/home"/>} /> */}
       <Route exact path='/*' element={<Routers/>} />
       {/* login false */}
       {/* <Route exact path='/home' element={<Navigate to="/login"/>} /> */}

      </Routes>
     
    </div>
  );
}

export default App;
