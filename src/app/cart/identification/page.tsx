import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import CartSummary from "../components/cart-summary";
import Addresses from "./components/addresses";

const IdentificationPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user.id) {
    redirect("/");
  }
  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
    with: {
      shippingAddress: true,
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
    },
  });
  if (!cart || cart?.items.length === 0) {
    redirect("/");
  }
  const shippingAddresses = await db.query.shippingAddressTable.findMany({
    where: eq(shippingAddressTable.userId, session.user.id),
  });
  const cartTotalInCents = cart.items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0,
  );
  return (
    <div>
      <Header />
      <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-5 lg:px-8 lg:py-8">
        <section className="surface-panel rounded-[2rem] p-6 sm:p-8">
          <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.2em] uppercase">
            Checkout
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Identificação e entrega
          </h1>
          <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-6 sm:text-base">
            Escolha um endereço já cadastrado ou adicione um novo antes de
            seguir para o pagamento.
          </p>
        </section>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1.45fr)_minmax(340px,420px)] lg:items-start xl:gap-8">
          <Addresses
            shippingAddresses={shippingAddresses}
            defaultShippingAddressId={cart.shippingAddress?.id || null}
          />
          <CartSummary
            subtotalInCents={cartTotalInCents}
            totalInCents={cartTotalInCents}
            products={cart.items.map((item) => ({
              id: item.productVariant.id,
              name: item.productVariant.product.name,
              variantName: item.productVariant.name,
              quantity: item.quantity,
              priceInCents: item.productVariant.priceInCents,
              imageUrl: item.productVariant.imageUrl,
            }))}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default IdentificationPage;
