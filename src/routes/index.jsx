import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Dashboard from '@/pages/Dashboard';
import NotFound from "@/pages/NotFound";
import PrivateRoute from '@/components/PrivateRoute';

const AppRoutes = () => (
  <Routes>
    {/* Rutas públicas */}
    <Route path="/" element={<Home />} />

    {/* Rutas privadas */}
    <Route element={<PrivateRoute />}>
      <Route path="/Dashboard" element={<Dashboard />} />
    </Route>

    {/* Esta captura cualquier ruta no existente */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
