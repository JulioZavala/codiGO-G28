import useCartStore from "@/stores/useCartStore";
import { Button } from "./ui/button";
import { Card, CardHeader, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import SelectionQuantity from "./selection-quantity";

function ProductCard({ product }) {
  const { addItem, getItem, addQuantity, reduceQuantity, removeItem } =
    useCartStore((state) => state);

  const productInStore = getItem(product.id);

  return (
    <>
      <Card className="cursor-pointer" key={product.id}>
        <CardHeader className="flex justify-center items-center">
          <img src={product.image} width={200} alt="" />
        </CardHeader>
        <Separator />
        <CardContent className="space-y-3">
          <p className="uppercase font-semibold text-gray-500">
            {product.brand}
          </p>
          <h4 className="text-lg font-semibold">{product.name}</h4>
          <p className="text-gray-600 text-lg mb-5">S/ {product.price}</p>
          {productInStore ? (
            <SelectionQuantity
              product={productInStore}
              addQuantity={addQuantity}
              removeItem={removeItem}
              reduceQuantity={reduceQuantity}
            />
          ) : (
            <Button
              onClick={() => addItem(product)}
              className="w-full cursor-pointer"
            >
              Agregar al carro
            </Button>
          )}
        </CardContent>
      </Card>
    </>
  );
}

export default ProductCard;