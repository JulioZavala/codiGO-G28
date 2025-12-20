import SelectionQuantity from "@/components/selection-quantity";
import { Card, CardContent } from "@/components/ui/card";

function SummaryProductsCard ({item, addQuantity, reduceQuantity, removeItem}) {
    return (
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
    )
}

export default SummaryProductsCard