import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "@/pages/Layout/Layout";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import Account from "@/pages/Account/Account";
import Cart from "@/pages/Cart/Cart";
import ProductDetail from "@/pages/ProductDetail/productDetail";
import About from "@/pages/About/About";
import LibroReclamaciones from "@/pages/LibroReclamaciones/LibroReclamaciones";
import CategoryPage from "@/pages/CategoryPage/CategoryPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Sticky Menu y Footer
    errorElement: <>Page Not Found</>,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "cart", element: <Cart /> },
      { path: "about", element: <About /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "account/:slug", element: <Account /> },
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
