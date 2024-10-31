import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
// LAYOUTS  
import LayoutAdmin from "./layouts/LayoutAdmin";
import TeacherTable from "./pages/teachers/teacherPage";
import Error404 from "./pages/404/Error404";

function RedirectToCourses() {
  const location = useLocation();
  return location.pathname === "/" ? <Navigate to="/teachers" /> : null;
}

function App() {
  return (
    <BrowserRouter>
      <RedirectToCourses /> {/* Redirección directa en la ruta raíz */}
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/teachers" element={<LayoutAdmin />}>
            <Route index element={<TeacherTable />} /> {/* Página principal de cursos */}
          </Route>
        </Route>
        <Route path="*" element={<Error404 />} /> {/* Página 404 para rutas no existentes */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
