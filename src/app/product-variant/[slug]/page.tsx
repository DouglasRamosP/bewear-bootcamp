import { eq } from "drizzle-orm";
import { ShieldCheckIcon, TruckIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

import ProductActions from "./components/product-actions";
import VariantSelector from "./components/variant-selector";

interface ProductVariantPageProps {
  params: Promise<{ slug: string }>;
}

const ProductVariantPage = async ({ params }: ProductVariantPageProps) => {
  const { slug } = await params;
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });

  if (!productVariant) {
    return notFound();
  }

  const likelyProducts = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant.product.categoryId),
    with: {
      variants: true,
    },
  });
  const relatedProducts = likelyProducts.filter(
    (product) => product.id !== productVariant.product.id,
  );

  return (
    <>
      <Header />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 py-6 lg:gap-12 lg:py-8 xl:gap-16">
        <section className="grid gap-6 px-4 sm:px-5 lg:grid-cols-[minmax(0,560px)_minmax(0,1fr)] lg:px-8 xl:grid-cols-[minmax(0,620px)_minmax(420px,1fr)] xl:gap-10">
          <div className="surface-panel overflow-hidden rounded-[2rem] p-3 sm:p-4">
            <Image
              src={productVariant.imageUrl}
              alt={productVariant.name}
              sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 560px, 620px"
              height={0}
              width={0}
              className="aspect-[4/5] h-auto w-full rounded-[1.5rem] object-cover"
            />
          </div>

          <div className="surface-panel flex flex-col gap-6 rounded-[2rem] p-6 sm:p-8 xl:max-w-[560px]">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="ghost" className="rounded-full px-0" asChild>
                <Link href="/">Voltar para o catálogo</Link>
              </Button>
              <span className="border-border/60 text-muted-foreground rounded-full border px-3 py-1 text-[11px] font-semibold tracking-[0.16em] uppercase">
                {productVariant.product.variants.length} variações disponíveis
              </span>
            </div>

            <VariantSelector
              selectedVariantSlug={productVariant.slug}
              variants={productVariant.product.variants}
            />

            <div className="space-y-3">
              <div className="space-y-1">
                <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.18em] uppercase">
                  Curadoria premium
                </p>
                <h1 className="text-3xl font-semibold tracking-tight xl:text-4xl">
                  {productVariant.product.name}
                </h1>
              </div>
              <h2 className="text-muted-foreground text-base xl:text-lg">
                {productVariant.name}
              </h2>
              <h3 className="text-3xl font-semibold tracking-tight xl:text-4xl">
                {formatCentsToBRL(productVariant.priceInCents)}
              </h3>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="border-border/60 bg-background/70 rounded-[1.5rem] border p-4">
                <div className="bg-secondary mb-3 flex size-10 items-center justify-center rounded-full">
                  <ShieldCheckIcon className="size-4" />
                </div>
                <p className="font-semibold">Pagamento protegido</p>
                <p className="text-muted-foreground mt-1 text-sm leading-6">
                  Fluxo com Stripe mantido e preparado para checkout real.
                </p>
              </div>

              <div className="border-border/60 bg-background/70 rounded-[1.5rem] border p-4">
                <div className="bg-secondary mb-3 flex size-10 items-center justify-center rounded-full">
                  <TruckIcon className="size-4" />
                </div>
                <p className="font-semibold">Frete simplificado</p>
                <p className="text-muted-foreground mt-1 text-sm leading-6">
                  Endereço salvo para acelerar novas compras no dia a dia.
                </p>
              </div>
            </div>

            <ProductActions productVariantId={productVariant.id} />

            <div className="border-border/60 bg-background/70 rounded-[1.5rem] border p-5">
              <p className="text-sm leading-7 sm:text-base">
                {productVariant.product.description}
              </p>
            </div>
          </div>
        </section>

        <ProductList
          title="Talvez você goste"
          description="Itens relacionados da mesma categoria para manter a descoberta fluida e útil no dia a dia."
          products={relatedProducts}
        />
      </main>

      <Footer />
    </>
  );
};

export default ProductVariantPage;
