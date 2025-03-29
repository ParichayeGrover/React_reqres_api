import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/login.jsx'
import UserList from './pages/UserList.jsx'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EditUser from './pages/EditUser.jsx'



const App = ()=>{
  
   return(
      
    <Router>
      <div className="w-auto h-auto bg-black text-white">
    <Routes>
    <Route path="/" element={<Login/>} />
    <Route path="/users" element={<UserList/>}/>
    <Route path="/edit/:id" element={<EditUser/>} />
    </Routes>
    </div>
    </Router>
   
   );
  
};

export default App
