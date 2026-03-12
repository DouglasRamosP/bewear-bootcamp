import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { formatCentsToBRL } from "@/helpers/money";
import { useDecreaseCartProduct } from "@/hooks/mutations/use-decrease-cart-product";
import { useIncreaseCartProduct } from "@/hooks/mutations/use-increase-cart-product";
import { useRemoveProductFromCart } from "@/hooks/mutations/use-remove-product-from-cart";

import { Button } from "../ui/button";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantId: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

const CartItem = ({
  id,
  productName,
  productVariantId,
  productVariantName,
  productVariantImageUrl,
  productVariantPriceInCents,
  quantity,
}: CartItemProps) => {
  const removeProductFromCartMutation = useRemoveProductFromCart(id);
  const increaseCartProductMutation = useIncreaseCartProduct(productVariantId);
  const decreaseCartProductMutation = useDecreaseCartProduct(id);

  const handleRemoveClick = async () => {
    try {
      await removeProductFromCartMutation.mutateAsync();
      toast.success("Produto removido do carrinho!");
    } catch {
      toast.error("Erro ao remover produto do carrinho.");
    }
  };

  const handleIncreaseQuantityClick = async () => {
    try {
      await increaseCartProductMutation.mutateAsync();
    } catch {
      toast.error("Erro ao aumentar quantidade do produto.");
    }
  };

  const handleDecreaseQuantityClick = async () => {
    try {
      await decreaseCartProductMutation.mutateAsync();
    } catch {
      toast.error("Erro ao diminuir quantidade do produto.");
    }
  };

  return (
    <div className="flex items-start gap-3 sm:gap-4">
      <Image
        src={productVariantImageUrl}
        alt={productName}
        width={78}
        height={78}
        className="h-[78px] w-[78px] shrink-0 rounded-lg object-cover"
      />

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{productName}</p>
            <p className="text-muted-foreground truncate text-xs font-medium">
              {productVariantName}
            </p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={handleRemoveClick}
            disabled={removeProductFromCartMutation.isPending}
          >
            <TrashIcon />
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center rounded-lg border">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={handleDecreaseQuantityClick}
              disabled={decreaseCartProductMutation.isPending}
            >
              <MinusIcon />
            </Button>
            <p className="min-w-8 text-center text-sm">{quantity}</p>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={handleIncreaseQuantityClick}
              disabled={increaseCartProductMutation.isPending}
            >
              <PlusIcon />
            </Button>
          </div>

          <p className="text-sm font-bold">
            {formatCentsToBRL(productVariantPriceInCents * quantity)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
