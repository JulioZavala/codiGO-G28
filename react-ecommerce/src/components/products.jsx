import ProductCard from "./product-card";

function Products({ products }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-10">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <p>No hay productos para mostrar.</p>
      )}
    </div>
  );
}

export default Products;