import { Navigate, Outlet } from "react-router-dom";

// Puedes usar lógica más avanzada para validar el token en producción
const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

const PrivateRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
