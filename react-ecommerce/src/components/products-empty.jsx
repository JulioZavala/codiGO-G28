import { PackageSearch } from "lucide-react";

function ProductsEmpty() {
  return (
    <div className="flex justify-center flex-col items-center">
      <PackageSearch size={200} className="text-yellow-500" />
      <h2 className="text-3xl font-semibold">No hay productos.</h2>
      <p>Por el momento no contamos con productos disponibles.</p>
    </div>
  );
}

export default ProductsEmpty;