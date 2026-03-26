"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { addProductToCart } from "@/actions/add-cart-product";
import { Button } from "@/components/ui/button";

interface AddToCartButtonProps {
  productVariantId: string;
  quantity: number;
  label?: string;
  className?: string;
  redirectTo?: string;
  variant?: "default" | "outline" | "secondary";
}

const AddToCartButton = ({
  productVariantId,
  quantity,
  label = "Adicionar a sacola",
  className,
  redirectTo,
  variant = "default",
}: AddToCartButtonProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["addProductToCart", productVariantId, quantity],
    mutationFn: () =>
      addProductToCart({
        productVariantId,
        quantity,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Produto adicionado com sucesso.");
      if (redirectTo) {
        router.push(redirectTo);
      }
    },
    onError: () => {
      toast.error("Entre na sua conta para continuar a compra.");
      router.push("/authentication");
    },
  });
  return (
    <Button
      className={className}
      size="lg"
      variant={variant}
      disabled={isPending}
      onClick={() => mutate()}
    >
      {isPending && <Loader2 className="animate-spin" />}
      {label}
    </Button>
  );
};

export default AddToCartButton;
