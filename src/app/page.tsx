export const dynamic = "force-dynamic";

import { desc } from "drizzle-orm";
import { ArrowRightIcon, ShieldCheckIcon, TruckIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import BrandList from "@/components/common/brand-list";
import CategorySelector from "@/components/common/category-selector";
import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { productTable } from "@/db/schema";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });
  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
    },
  });
  const categoriesWithProducts = await db.query.categoryTable.findMany({
    with: {
      products: {
        columns: {
          id: true,
        },
      },
    },
  });

  return (
    <>
      <Header />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 py-6 sm:gap-12 lg:py-8 xl:gap-16">
        <section id="colecao" className="px-4 sm:px-5 lg:px-8">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
            <div className="surface-panel relative overflow-hidden rounded-[2.25rem] p-6 sm:p-8 lg:min-h-[620px] lg:p-10">
              <div className="absolute inset-y-0 right-0 hidden w-[45%] lg:block">
                <Image
                  src="/banner-01.png"
                  alt="Coleção principal Bewear"
                  fill
                  className="object-cover object-center"
                />
                <div className="to-background/90 absolute inset-0 bg-gradient-to-l from-transparent via-transparent" />
              </div>

              <div className="relative flex h-full max-w-xl flex-col justify-between gap-10">
                <div className="space-y-5">
                  <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.24em] uppercase">
                    Portfolio ready commerce
                  </p>
                  <h1 className="max-w-lg text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                    Moda urbana com atmosfera editorial e fluxo de compra real.
                  </h1>
                  <p className="text-muted-foreground max-w-xl text-base leading-7 sm:text-lg">
                    A Bewear foi refinada para apresentar um e-commerce com
                    visual autoral, navegação clara, autenticação social e
                    pagamentos preservados para uso de portfólio.
                  </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button className="rounded-full" size="lg" asChild>
                    <Link href="#novidades">
                      Explorar lançamentos
                      <ArrowRightIcon />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full"
                    size="lg"
                    asChild
                  >
                    <Link href="/my-orders">Ver jornada completa</Link>
                  </Button>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="border-border/60 bg-background/70 rounded-[1.5rem] border p-4">
                    <p className="text-2xl font-semibold">+{products.length}</p>
                    <p className="text-muted-foreground text-sm">
                      produtos com variações reais
                    </p>
                  </div>
                  <div className="border-border/60 bg-background/70 rounded-[1.5rem] border p-4">
                    <p className="text-2xl font-semibold">Google</p>
                    <p className="text-muted-foreground text-sm">
                      autenticação preservada
                    </p>
                  </div>
                  <div className="border-border/60 bg-background/70 rounded-[1.5rem] border p-4">
                    <p className="text-2xl font-semibold">Stripe</p>
                    <p className="text-muted-foreground text-sm">
                      checkout seguro em produção
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-5">
              <div className="surface-panel rounded-[2rem] p-6">
                <div className="flex items-center gap-3">
                  <div className="bg-primary text-primary-foreground flex size-11 items-center justify-center rounded-full">
                    <ShieldCheckIcon className="size-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Checkout blindado</p>
                    <p className="text-muted-foreground text-sm leading-6">
                      Fluxo de pagamento mantido e protegido para não afetar as
                      integrações existentes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="surface-panel overflow-hidden rounded-[2rem] p-0">
                <div className="relative min-h-[260px]">
                  <Image
                    src="/banner-02.png"
                    alt="Nova temporada Bewear"
                    fill
                    className="object-cover"
                  />
                  <div className="from-primary/85 via-primary/20 absolute inset-0 bg-gradient-to-t to-transparent" />
                  <div className="text-primary-foreground absolute inset-x-0 bottom-0 p-6">
                    <p className="text-[11px] font-semibold tracking-[0.18em] uppercase">
                      Nova temporada
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight">
                      Peças pensadas para rotina, treino e lifestyle.
                    </h2>
                  </div>
                </div>
              </div>

              <div className="surface-panel rounded-[2rem] p-6">
                <div className="flex items-center gap-3">
                  <div className="bg-accent text-accent-foreground flex size-11 items-center justify-center rounded-full">
                    <TruckIcon className="size-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Entrega simplificada</p>
                    <p className="text-muted-foreground text-sm leading-6">
                      Endereço, confirmação e acompanhamento organizados para o
                      dia a dia do usuário.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <BrandList />

        <ProductList
          id="destaques"
          products={products}
          title="Mais vendidos"
          description="Seleção com apelo comercial forte, cards mais premium e leitura rápida de preço, descrição e variações."
        />

        <CategorySelector categories={categoriesWithProducts} />

        <ProductList
          id="novidades"
          products={newlyCreatedProducts}
          title="Novos produtos"
          description="Lançamentos recentes com visual mais limpo, foco em imagem e um ritmo mais contemporâneo de apresentação."
        />
      </main>

      <Footer />
    </>
  );
};

export default Home;
