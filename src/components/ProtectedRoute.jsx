import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = () => {
  const token = Cookies.get('token');

  if (!token) {
    console.log('HEY CAREVERGA, sin token no hay acceso. 💩');
    return <Navigate to="/login" />;
  }

  const decodedToken = jwtDecode(token);

  if (decodedToken.user.type !== 'ACCESS GRANTED') {
    console.log('ACCIÓN NO AUTORIZADA');
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

const ProtectResetPassword = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const urlToken = searchParams.get('tempToken');
  const cookieToken = Cookies.get('tempToken');
  const tempToken = urlToken || cookieToken;

  if (!tempToken) {
    console.log('HEY CAREVERGA, sin token no hay acceso. 💩');
    return <Navigate to="/login" />;
  }

  const decodedTempToken = jwtDecode(tempToken);
  const currentTime = Math.floor(Date.now() / 1000);

  if (decodedTempToken.tokenInfo.type !== 'ResetPassword') {
    console.log('ACCIÓN NO AUTORIZADA');
    return <Navigate to="/login" />;
  }

  if (decodedTempToken.exp < currentTime) {
    console.log('Token ha expirado');
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export { ProtectedRoute, ProtectResetPassword };