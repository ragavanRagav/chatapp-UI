import React from 'react'
import {Navigate } from "react-router-dom";
// import { loginStatus } from '../Service/serviceCalls';

const ProtectedRoute = ({ element }) => {
    const loginStatus = sessionStorage.getItem("loginStat") ?? false;
  return ( loginStatus ? element : <Navigate to="/login" /> )
}

export default ProtectedRoute