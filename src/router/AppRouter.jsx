import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from "../pages/NotFound/NotFound";
import Welcome from "../pages/Welcome/Welcome";
import Signup from "../pages/Signup/Signup";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import Resources from "../pages/Resources/Resources";
import ViewUnit from "../pages/ViewUnit/ViewUnit";
import Nodes from "../pages/ViewUnit/Nodes/Nodes";
import Starred from "../pages/Resources/Starred";
import Profile from "../pages/Profile/Profile";
import Members from "../pages/ViewUnit/Members/Members";
import Settings from "../pages/ViewUnit/Settings/Settings";
import Invitations from "../pages/Resources/Invitations";


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" Component ={NotFound} />
        <Route path="/" Component= {Welcome} />
        <Route path="/login" Component= {Login} />
        <Route path="/signup" Component= {Signup} />
        <Route path="/home" Component= {Home} />
        <Route path='/resources' Component={Resources} />
        <Route path='/resources/starred' Component={Starred} />
        <Route path='/resources/invitations' Component={Invitations} />
        <Route path="/unit/:id" Component={Nodes}  />
        <Route path="/unit/members/:id" Component={Members}  />
        <Route path="/unit/settings/:id" Component={Settings}  />
        <Route path="/profile" Component={Profile} />
        <Route path="/profile/:username" Component={Profile} />
      </Routes>
    </BrowserRouter>
  )
}
