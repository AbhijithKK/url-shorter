import { lazy ,Suspense} from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Routers from './utils/Routes';
import { Audio} from 'react-loader-spinner';
const Login =lazy(()=>import('./Components/Login/Login'))
const Signup =lazy(()=>import('./Components/Signup/Signup'))

function App() {
  return (
    <div className="App">
      <Routes>
      <Route exact path='/' element={<Navigate to="/login"/>} />

       <Route exact path='/login' element={
        <Suspense fallback={
          <div style={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            height:'100vh'
          }}>
            <Audio/>
          </div>


        }>
          <Login/>
        </Suspense>
       } />
       <Route exact path='/signup' element={
        <Suspense fallback={
          <div style={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            height:'100vh'
          }}>
            <Audio/>
          </div>


        }>
          <Signup/>
        </Suspense>
       } />
      
       <Route exact path='/*' element={<Routers/>} />
       

      </Routes>
     
    </div>
  );
}

export default App;
