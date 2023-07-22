import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from "../pages/NotFound/NotFound";
import Welcome from "../pages/Welcome/Welcome";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import Resources from "../pages/Resources/Resources";
import Nodes from "../pages/ViewUnit/Nodes/Nodes";
import Profile from "../pages/Profile/Profile";
import Members from "../pages/ViewUnit/Members/Members";
import Settings from "../pages/ViewUnit/Settings/Settings";
import NavBarNew from "../components/NavBar/NavBarNew";
import { useState } from "react";
import ViewUnit from "../pages/ViewUnit/Nodes/ViewUnit";


export default function AppRouter() {

  const [reloadNavBar, setReloadNavBar] = useState(0)

  return (
    <div className="h-screen">
      <BrowserRouter >
        <NavBarNew reloadNavBar={reloadNavBar} />
        <Routes>
          <Route path="*" Component={NotFound} />
          <Route path="/" Component={Welcome} />
          <Route path="/login" element={<Login setReloadNavBar={setReloadNavBar}/>} />
          <Route path="/signup" element={<Signup setReloadNavBar={setReloadNavBar}/>} />
          <Route path="/home" Component={Home} />
          <Route path='/resources/*' Component={Resources} />
          <Route path="/unit/:id/*" Component={Nodes} />
          <Route path="/profile" Component={Profile} />
          <Route path="/profile/:username" Component={Profile} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
