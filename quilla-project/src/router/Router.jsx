import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "@/pages/Layout/Layout";
import AccountLayout from "@/pages/Layout/AccountLayout";
import Home from "@/pages/Home/Home";
import Cart from "@/pages/Cart/Cart";
import ProductDetail from "@/pages/ProductDetail/productDetail";
import About from "@/pages/About/About";
import LibroReclamaciones from "@/pages/LibroReclamaciones/LibroReclamaciones";
import CategoryPage from "@/pages/CategoryPage/CategoryPage";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Profile from "@/pages/Customer/Customer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Sticky Menu y Footer
    errorElement: <>Page Not Found</>,
    children: [
      { index: true, element: <Home /> },
      { path: "cart", element: <Cart /> },
      { path: "about", element: <About /> },
      { path: "producto/:slug", element: <ProductDetail /> },

      // --- RUTA PROTEGIDA: ACCOUNT ---
      {
        path: "account/",
        element: (
          <ProtectedRoute>
            <AccountLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: "profile", element: <Profile /> },
        //   { path: "direcciones", element: <Addresses /> },
        //   { path: "orders", element: <Orders /> },
        ],
      },
      //Categorías Dinámicas
      {
        path: ":category",
        children: [
          {
            index: true,
            element: <CategoryPage />,
          },
          {
            path: ":subcategory",
            children: [
              {
                index: true,
                element: <CategoryPage />,
              },
              {
                path: ":sub_subcategory",
                element: <CategoryPage />,
              },
            ],
          },
        ],
      },
    ],
  },

  // Páginas SIN Navbar ni Footer (Rutas "limpias")
  {
    path: "/libroreclamaciones",
    element: <LibroReclamaciones />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
