"use client";

import { ShoppingBasketIcon } from "lucide-react";

import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

export const Cart = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Abrir sacola">
          <ShoppingBasketIcon />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[380px] sm:w-[480px]">
        <SheetHeader>
          <SheetTitle>Sacola</SheetTitle>
          <SheetDescription>Itens do carrinho</SheetDescription>
        </SheetHeader>

        {/* Conteúdo do carrinho aqui */}
        <div className="py-4">Seu carrinho está vazio.</div>
      </SheetContent>
    </Sheet>
  );
};
