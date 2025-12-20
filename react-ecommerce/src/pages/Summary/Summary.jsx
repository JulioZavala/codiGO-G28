import AppContent from "@/components/app-content";
import SelectionQuantity from "@/components/selection-quantity";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useCartStore from "@/stores/useCartStore";

function Summary() {
  const {
    items,
    reduceQuantity,
    addQuantity,
    removeItem,
    getTotalItem,
    getTotal,
  } = useCartStore((state) => state);

  return (
    <AppContent showFilter={false}>
      <div className="px-4 lg:px-10">
        <h1 className="text-2xl font-semibold">Resumen de la compra</h1>
        <div className="flex flex-col-reverse lg:flex-row mt-10 gap-10">
          <div className="space-y-5 lg:space-y-10 flex-6">
            {items?.map((item) => (
              <Card>
                <CardContent className="flex flex-col lg:flex-row gap-5 lg:gap-10">
                  <img
                    className="block lg:inline mx-auto lg:mx-2"
                    width={170}
                    src={item.image}
                    alt=""
                  />
                  <div className="space-y-5 ">
                    <h5 className="text-lg lg:w-[36ch] font-semibold">
                      {item.name}
                    </h5>
                    <p className="text-xs lg:w-[50ch]">{item.description}</p>
                    <p className="font-bold uppercase">{item.brand}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-xl font-bold">S/ {item.price}</p>
                  </div>
                  <div className="flex-1">
                    <SelectionQuantity
                      product={item}
                      addQuantity={addQuantity}
                      removeItem={removeItem}
                      reduceQuantity={reduceQuantity}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex-2">
            <Card>
              <CardContent className="space-y-5">
                <div className="flex justify-between">
                  <p className="font-semibold">Productos ({getTotalItem()})</p>
                  <p className="font-bold">S/ {getTotal()}</p>
                </div>
                <Button className="w-full">Continuar con la compra</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppContent>
  );
}

export default Summary;