import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from "../pages/NotFound/NotFound";
import Welcome from "../pages/Welcome/Welcome";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element ={<NotFound />} />
        <Route path="/" element= {<Welcome />} />
        <Route path="/login" element= {<Login />} />
        <Route path="/signup" element= {<Signup />} />
        <Route path="/home" element= {<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
