import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function SummaryPricing ({getTotal, getTotalItem}) {
    return (
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

    )
}

export default SummaryPricing