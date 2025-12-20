import ProductCard from "./product-card";
import ProductsEmpty from "./products-empty";
import ProductsLoading from "./products-loading";

function Products({ products, isLoading }) {
  return (
    <>
      {isLoading ? (
        <ProductsLoading />
      ) : (
        <>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <ProductsEmpty />
          )}
        </>
      )}
    </>
  );
}

export default Products;