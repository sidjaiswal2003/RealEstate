import { BrowserRouter,Routes,Route } from "react-router-dom";
import React from "react";
import About from "./Pages/About";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
import Navbar from "./Components/Navbar";
import PrivatePage from "./Components/PrivatePage";

function App() {
  return (
    <BrowserRouter>
    <Navbar></Navbar>
    <Routes>
      <Route path="/" element={<Home/> }/>
      <Route path="/about" element={<About/> }/>
      <Route path="/sign-in" element={<SignIn/> }/>
      <Route path="/login" element={<Login/> }/>
      <Route element={<PrivatePage/>}>
      <Route path="/profile" element={<Profile/> }/>
      </Route>
      

    </Routes>
    </BrowserRouter>
  

   
  )
}

export default App;
