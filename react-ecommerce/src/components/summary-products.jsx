import SummaryProductsCard from "@/components/summary-product-card";

function SummaryProducts ( { items, reduceQuantity, addQuantity, removeItem}) {
    return(
        <div className="space-y-5 lg:space-y-10 flex-6">
            {items?.map((item) => (
                <SummaryProductsCard
                    key={item.id}
                    item={item}
                    addQuantity={addQuantity}
                    reduceQuantity={reduceQuantity}
                    removeItem={removeItem}
                />
            ))}
        </div>
    );
}

export default SummaryProducts;