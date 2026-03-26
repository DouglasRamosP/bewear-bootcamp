"use client";

import {
  ArrowRightIcon,
  ShoppingBagIcon,
  ShoppingBasketIcon,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { formatCentsToBRL } from "@/helpers/money";
import { useCart } from "@/hooks/queries/use-cart";
import { authClient } from "@/lib/auth-client";

import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import CartItem from "./cart-item";

export const Cart = () => {
  const { data: session } = authClient.useSession();
  const { data: cart } = useCart({
    enabled: Boolean(session?.user),
  });
  const itemCount =
    cart?.items.reduce((total, item) => total + item.quantity, 0) ?? 0;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="relative rounded-full px-3 sm:px-4"
          size="default"
        >
          <ShoppingBasketIcon />
          <span className="hidden sm:inline">Sacola</span>
          {itemCount > 0 && (
            <span className="bg-primary text-primary-foreground absolute -top-1 -right-1 flex min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-bold">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="surface-panel w-full max-w-md rounded-l-[2rem] sm:max-w-lg xl:max-w-xl">
        <SheetHeader className="border-border/60 border-b pb-4">
          <SheetTitle>Sacola</SheetTitle>
        </SheetHeader>

        <div className="flex h-full flex-col px-1 pb-5 sm:px-2 xl:px-3">
          {!session?.user ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 px-4 text-center">
              <div className="bg-secondary text-secondary-foreground flex size-16 items-center justify-center rounded-full">
                <ShoppingBagIcon className="size-7" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">
                  Entre para montar sua sacola
                </h3>
                <p className="text-muted-foreground text-sm leading-6">
                  Faça login para salvar produtos, concluir o checkout e
                  acompanhar seus pedidos.
                </p>
              </div>
              <Button className="rounded-full" size="lg" asChild>
                <Link href="/authentication">
                  Entrar agora
                  <ArrowRightIcon />
                </Link>
              </Button>
            </div>
          ) : cart?.items.length ? (
            <>
              <div className="flex h-full min-h-0 flex-col overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="flex flex-col gap-6 pr-3">
                    {cart.items.map((item) => (
                      <CartItem
                        key={item.id}
                        id={item.id}
                        productVariantId={item.productVariant.id}
                        productName={item.productVariant.product.name}
                        productVariantName={item.productVariant.name}
                        productVariantImageUrl={item.productVariant.imageUrl}
                        productVariantPriceInCents={
                          item.productVariant.priceInCents
                        }
                        quantity={item.quantity}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <div className="border-border/70 bg-background/70 mt-4 flex flex-col gap-4 rounded-[1.75rem] border p-4">
                <div className="flex items-center justify-between text-sm font-medium">
                  <p>Subtotal</p>
                  <p>{formatCentsToBRL(cart.totalPriceInCents ?? 0)}</p>
                </div>

                <Separator />

                <div className="flex items-center justify-between text-sm font-medium">
                  <p>Entrega</p>
                  <p>Grátis</p>
                </div>

                <Separator />

                <div className="flex items-center justify-between text-sm font-semibold">
                  <p>Total</p>
                  <p>{formatCentsToBRL(cart.totalPriceInCents ?? 0)}</p>
                </div>

                <Button className="mt-1 rounded-full" size="lg" asChild>
                  <Link href="/cart/identification">Finalizar compra</Link>
                </Button>
              </div>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-4 px-4 text-center">
              <div className="bg-secondary text-secondary-foreground flex size-16 items-center justify-center rounded-full">
                <ShoppingBasketIcon className="size-7" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Sua sacola está vazia</h3>
                <p className="text-muted-foreground text-sm leading-6">
                  Explore as coleções da Bewear e monte um look com cara de
                  editorial.
                </p>
              </div>
              <Button
                className="rounded-full"
                variant="outline"
                size="lg"
                asChild
              >
                <Link href="/#colecao">Ver destaques</Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
