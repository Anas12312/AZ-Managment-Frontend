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
        <Route path="*" Component ={NotFound} />
        <Route path="/" Component= {Welcome} />
        <Route path="/login" Component= {Login} />
        <Route path="/signup" Component= {Signup} />
        <Route path="/home" Component= {Home} />
      </Routes>
    </BrowserRouter>
  )
}
