import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from "../pages/NotFound/NotFound";
import Welcome from "../pages/Welcome/Welcome";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import Resources from "../pages/Resources/Resources";
import ViewUnit from "../pages/ViewUnit/ViewUnit";
import ViewProfile from "../pages/Profile/ViewProfile";
import NavBarNew from "../components/NavBar/NavBarNew";
import { useState } from "react";
import Profile from "../pages/Profile/Profile";


export default function AppRouter() {

  const [reloadNavBar, setReloadNavBar] = useState(0)

  return (
    <div className="h-screen">
      <BrowserRouter >
        <NavBarNew reloadNavBar={reloadNavBar} />
        <Routes>
          <Route path="*" Component={NotFound} />
          <Route path="/" element={<Welcome setReloadNavBar={setReloadNavBar} />} />
          <Route path="/login" element={<Login setReloadNavBar={setReloadNavBar}/>} />
          <Route path="/signup" element={<Signup setReloadNavBar={setReloadNavBar}/>} />
          <Route path="/home" Component={Home} />
          <Route path='/resources/*' Component={Resources} />
          <Route path="/unit/:id/*" Component={ViewUnit} />
          <Route path="/profile" Component={Profile} />
          <Route path="/profile/:username" Component={Profile} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
