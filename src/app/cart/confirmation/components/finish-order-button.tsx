"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { createCheckoutSession } from "@/actions/create-checkout-session";
import { Button } from "@/components/ui/button";
import { useFinishOrder } from "@/hooks/mutations/use-finish-order";

const FinishOrderButton = () => {
  const finishOrderMutation = useFinishOrder();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleFinishOrder = async () => {
    try {
      setIsRedirecting(true);
      if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
        throw new Error("Stripe publishable key is not set");
      }
      const { orderId } = await finishOrderMutation.mutateAsync();
      const checkoutSession = await createCheckoutSession({
        orderId,
      });
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      );
      if (!stripe) {
        throw new Error("Failed to load Stripe");
      }
      await stripe.redirectToCheckout({
        sessionId: checkoutSession.id,
      });
    } catch {
      toast.error("Não foi possível iniciar o pagamento. Tente novamente.");
    } finally {
      setIsRedirecting(false);
    }
  };

  return (
    <>
      <Button
        className="w-full rounded-full"
        size="lg"
        onClick={handleFinishOrder}
        disabled={finishOrderMutation.isPending || isRedirecting}
      >
        {(finishOrderMutation.isPending || isRedirecting) && (
          <Loader2 className="h-4 w-4 animate-spin" />
        )}
        Finalizar compra
      </Button>
    </>
  );
};

export default FinishOrderButton;
