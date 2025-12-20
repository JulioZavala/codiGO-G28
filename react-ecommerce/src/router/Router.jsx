import { BrowserRouter, Routes, Route } from "react-router";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Summary from "@/pages/Summary/Summary";
import ProtectedRoute from "@/components/protected-route";

// path = la URL del navegador
// http://localhost:5173/ -> Raiz (Home)
// http://localhost:5173/login -> Login
// http://localhost:5173/profile -> Profile
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="*" element={<>Page Not Found</>} /> */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/summary" element={<Summary />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;