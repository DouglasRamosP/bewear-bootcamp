"use client";

import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { orderTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

interface OrdersProps {
  orders: Array<{
    id: string;
    totalPriceInCents: number;
    status: (typeof orderTable.$inferSelect)["status"];
    createdAt: Date;
    items: Array<{
      id: string;
      imageUrl: string;
      productName: string;
      productVariantName: string;
      priceInCents: number;
      quantity: number;
    }>;
  }>;
}

const Orders = ({ orders }: OrdersProps) => {
  return (
    <div className="space-y-5">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardContent>
            <Accordion type="single" collapsible key={order.id}>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="flex flex-col items-start gap-2 text-left">
                    {order.status === "paid" && <Badge>Pago</Badge>}
                    {order.status === "pending" && (
                      <Badge variant="outline">Pagamento pendente</Badge>
                    )}
                    {order.status === "canceled" && (
                      <Badge variant="destructive">Cancelado</Badge>
                    )}
                    <p className="text-sm leading-5">
                      Pedido feito em {new Date(order.createdAt).toLocaleDateString("pt-BR")} às{" "}
                      {new Date(order.createdAt).toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    {order.items.map((product) => (
                      <div
                        className="flex items-start justify-between gap-3 xl:gap-4"
                        key={product.id}
                      >
                        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                          <Image
                            src={product.imageUrl}
                            alt={product.productName}
                            width={78}
                            height={78}
                            className="h-[78px] w-[78px] shrink-0 rounded-lg object-cover"
                          />
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold">
                              {product.productName}
                            </p>
                            <p className="text-muted-foreground truncate text-xs font-medium">
                              {product.productVariantName} x {product.quantity}
                            </p>
                          </div>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="text-sm font-bold">
                            {formatCentsToBRL(
                              product.priceInCents * product.quantity,
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="py-5">
                    <Separator />
                  </div>
                  <div className="space-y-2 xl:max-w-sm xl:ml-auto">
                    <div className="flex justify-between gap-4">
                      <p className="text-sm">Subtotal</p>
                      <p className="text-muted-foreground text-sm font-medium">
                        {formatCentsToBRL(order.totalPriceInCents)}
                      </p>
                    </div>
                    <div className="flex justify-between gap-4">
                      <p className="text-sm">Frete</p>
                      <p className="text-muted-foreground text-sm font-medium">
                        GRÁTIS
                      </p>
                    </div>
                    <div className="flex justify-between gap-4">
                      <p className="text-sm">Total</p>
                      <p className="text-sm font-semibold">
                        {formatCentsToBRL(order.totalPriceInCents)}
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Orders;
