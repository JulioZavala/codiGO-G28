import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Layout = () => {
  return (
    <div className="layout-wrapper">
      {/* 1. Sticky Menu: siempre estará arriba*/}
      <Navbar />

      {/* 2. El contenido dinámico se renderiza aquí */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* 3. Footer: siempre estará abajo */}
      <Footer />

      {/* 4. Recuerda la posición del scroll al navegar entre productos. */}
      <ScrollRestoration />
    </div>
  );
};

export default Layout;
