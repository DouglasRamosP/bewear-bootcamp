"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import AddToCartButton from "./add-to-cart-button";

interface ProductActionsProps {
  productVariantId: string;
}

const ProductActions = ({ productVariantId }: ProductActionsProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="font-medium">Quantidade</h3>
        <div className="border-border/70 bg-background/70 flex h-13 w-[152px] items-center justify-between rounded-full border px-1">
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full"
            onClick={handleDecrement}
          >
            <MinusIcon />
          </Button>
          <p className="min-w-8 text-center text-lg font-semibold">
            {quantity}
          </p>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full"
            onClick={handleIncrement}
          >
            <PlusIcon />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <AddToCartButton
          productVariantId={productVariantId}
          quantity={quantity}
          className="rounded-full lg:flex-1"
          label="Adicionar a sacola"
        />
        <AddToCartButton
          productVariantId={productVariantId}
          quantity={quantity}
          variant="outline"
          className="rounded-full lg:flex-1"
          label="Comprar agora"
          redirectTo="/cart/identification"
        />
      </div>
    </div>
  );
};

export default ProductActions;
