import React from 'react';
import Home from '../pages/Home';
import Services from '../pages/Services';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Contact from '../pages/Contact';
import Doctors from '../pages/Doctors/Doctors';
import DoctorDetails from '../pages/Doctors/DoctorDetails';
import MyAccount from '../Dashboard/user-account/MyAccount';
import Dashboard from '../Dashboard/doctor-account/Dashboard';
//import useLocation from 'react-router-dom';

import {Routes,Route} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
// import {userData} from "../Dashboard/user-account/MyAccount";
 //import ProtectedRoute1 from './ProtectedRoute1';

   const routers = () => {
    //const location = useLocation();
  //const { hash, pathname, search } = location;
  return  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/home" element={<Home/>}/>
    <Route path="/doctors" element={<Doctors/>}/>
    <Route path="/doctors/:id" element={<DoctorDetails/>}/>
    <Route path="/Login" element={<Login/>}/>
    <Route path="/register" element={<Signup/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/services" element={<Services/>}/>
    <Route path="/users/profile/me" element={<MyAccount/>}/>
    
    <Route path="/doctors/profile/me" element={<ProtectedRoute allowedRoles={['doctor']}><Dashboard/></ProtectedRoute>}/>
  </Routes>
};

export default routers;
