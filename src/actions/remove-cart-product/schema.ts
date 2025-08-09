import z from "zod";

import CartItem from "@/components/common/cart-item";

export const removeProductFromCartSchema = z.object({
  CartItemId: z.uuid(),
});
