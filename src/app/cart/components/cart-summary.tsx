import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCentsToBRL } from "@/helpers/money";

interface CartSummaryProps {
  subtotalInCents: number;
  totalInCents: number;
  products: Array<{
    id: string;
    name: string;
    variantName: string;
    quantity: number;
    priceInCents: number;
    imageUrl: string;
  }>;
}

const CartSummary = ({
  subtotalInCents,
  totalInCents,
  products,
}: CartSummaryProps) => {
  return (
    <Card className="surface-panel border-border/60 h-fit rounded-[2rem] py-5 lg:sticky lg:top-28">
      <CardHeader>
        <CardTitle>Resumo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 xl:space-y-4">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm">Subtotal</p>
          <p className="text-muted-foreground text-sm font-medium">
            {formatCentsToBRL(subtotalInCents)}
          </p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm">Frete</p>
          <p className="text-muted-foreground text-sm font-medium">GRÁTIS</p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm">Total</p>
          <p className="text-muted-foreground text-sm font-medium">
            {formatCentsToBRL(totalInCents)}
          </p>
        </div>

        <div className="py-3">
          <Separator />
        </div>

        <div className="space-y-4">
          {products.map((product) => (
            <div
              className="border-border/60 bg-background/70 rounded-[1.5rem] border p-3"
              key={product.id}
            >
              <div className="flex items-start justify-between gap-3 xl:gap-4">
                <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={78}
                    height={78}
                    className="h-[78px] w-[78px] shrink-0 rounded-[1rem] object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {product.name}
                    </p>
                    <p className="text-muted-foreground truncate text-xs font-medium">
                      {product.variantName} x {product.quantity}
                    </p>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-bold">
                    {formatCentsToBRL(product.priceInCents * product.quantity)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CartSummary;
