import AppContent from "@/components/app-content";
import SummaryProducts from "@/components/summary-products";
import SummaryPricing from "@/components/summary-pricing";
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
          <SummaryProducts
            items={items}
            addQuantity={addQuantity}
            reduceQuantity={reduceQuantity}
            removeItem={removeItem}
          />
          <SummaryPricing getTotal={getTotal} getTotalItem={getTotalItem} />
        </div>
      </div>
    </AppContent>
  );
}

export default Summary;