import Link from "next/link";

import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { Button } from "@/components/ui/button";

const CheckoutCancelPage = () => {
  return (
    <>
      <Header />
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-8 sm:px-5 lg:px-8 lg:py-12">
        <section className="surface-panel rounded-[2rem] px-6 py-10 text-center sm:px-10 lg:py-14">
          <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.2em] uppercase">
            Pagamento interrompido
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            A compra ainda não foi concluída
          </h1>
          <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-base leading-7">
            Seu carrinho continua disponível para você revisar o pedido e tentar
            novamente quando quiser.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button className="rounded-full" size="lg" asChild>
              <Link href="/cart/confirmation">Retomar pagamento</Link>
            </Button>
            <Button
              className="rounded-full"
              variant="outline"
              size="lg"
              asChild
            >
              <Link href="/">Voltar para a home</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CheckoutCancelPage;
