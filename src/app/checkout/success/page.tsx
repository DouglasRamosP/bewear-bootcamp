import Image from "next/image";
import Link from "next/link";

import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { Button } from "@/components/ui/button";

const CheckoutSuccessPage = () => {
  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8 sm:px-5 lg:px-8 lg:py-12">
        <section className="surface-panel flex flex-col items-center rounded-[2rem] px-6 py-10 text-center sm:px-10 lg:py-14">
          <Image
            src="/illustration.svg"
            alt="Pedido concluído"
            width={300}
            height={300}
            className="mx-auto"
          />
          <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
            Pedido efetuado com sucesso
          </h1>
          <p className="text-muted-foreground mt-3 max-w-2xl text-base leading-7 font-medium">
            Seu pedido foi efetuado com sucesso. Você pode acompanhar o status
            na seção de Meus Pedidos.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button className="rounded-full" size="lg" asChild>
              <Link href="/my-orders">Ver meus pedidos</Link>
            </Button>
            <Button
              className="rounded-full"
              variant="outline"
              size="lg"
              asChild
            >
              <Link href="/">Voltar para a loja</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CheckoutSuccessPage;
