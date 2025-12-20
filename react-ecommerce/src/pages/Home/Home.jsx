import { useEffect, useState } from "react";
import { getProducts } from "@/services/api";
import Products from "@/components/products";
import AppContent from "@/components/app-content";
import { toast } from "sonner";

function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  // const handleGetProducts = async () => {
  //   const data = await getProducts();
  //   setProducts(data);
  // };

  useEffect(() => {
    // Definir la función async dentro del useEffect
    const handleGetProducts = async () => {
      const { ok, message, data } = await getProducts();

      if (!ok) {
        toast.error(message);
        setIsLoading(false);
        return;
      }

      setProducts(data);
      setIsLoading(false);
    };

    // Llamar a la función
    handleGetProducts();
  }, []);

  return (
    <div>
      <AppContent>
        {/* Children */}
        <h1 className="text-2xl">Productos</h1>
        <Products products={products} />
      </AppContent>
    </div>
  );
}

export default Home;