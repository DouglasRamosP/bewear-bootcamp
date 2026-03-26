import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { db } from "@/db";
import { orderTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import Orders from "./components/orders";

const MyOrdersPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user.id) {
    redirect("/authentication");
  }
  const orders = await db.query.orderTable.findMany({
    where: eq(orderTable.userId, session?.user.id),
    with: {
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

  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 sm:px-5 lg:px-8 lg:py-8">
        <section className="surface-panel rounded-[2rem] p-6 sm:p-8">
          <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.2em] uppercase">
            Minha conta
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Meus pedidos
          </h1>
          <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-6 sm:text-base">
            Timeline organizada para consulta diária, com status, itens e valor
            total em uma leitura mais profissional.
          </p>
        </section>

        <Orders
          orders={orders.map((order) => ({
            id: order.id,
            totalPriceInCents: order.totalPriceInCents,
            status: order.status,
            createdAt: order.createdAt,
            items: order.items.map((item) => ({
              id: item.id,
              imageUrl: item.productVariant.imageUrl,
              productName: item.productVariant.product.name,
              productVariantName: item.productVariant.name,
              priceInCents: item.productVariant.priceInCents,
              quantity: item.quantity,
            })),
          }))}
        />
      </main>
      <Footer />
    </>
  );
};

export default MyOrdersPage;
