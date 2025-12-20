import { useState } from "react";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";

function SelectionQuantity({
  product,
  reduceQuantity,
  addQuantity,
  removeItem,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleReduceQuantity = (productId, quantity) => {
    if (quantity === 1) {
      setIsOpen(!isOpen);
    } else {
      reduceQuantity(productId);
    }
  };

  const handleDeleteConfirm = (productId) => {
    removeItem(productId);
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full flex items-center">
      <Button
        className="flex-1 cursor-pointer"
        onClick={() => handleReduceQuantity(product.id, product.quantity)}
      >
        <Minus />
      </Button>
      <span className="flex-1 text-center font-semibold">
        {product?.quantity}
      </span>
      <Button
        className="flex-1 cursor-pointer"
        onClick={() => addQuantity(product.id, product.stock)}
      >
        <Plus />
      </Button>
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Estas seguro de eliminar este producto?</DialogTitle>
            <DialogDescription>
              El producto <strong>{product?.name}</strong>, se eliminara de tu
              carrito de compras.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button onClick={() => handleDeleteConfirm(product.id)}>
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default SelectionQuantity;