import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import ProductList from "@/components/common/product-list";
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
  return (
    <>
      <Header />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 py-6 lg:gap-10 lg:py-8 xl:gap-12">
        <section className="grid gap-6 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] xl:grid-cols-[minmax(0,600px)_minmax(420px,1fr)] lg:items-start lg:px-8 xl:gap-10">
          <div className="px-4 sm:px-5 lg:px-0">
            <Image
              src={productVariant.imageUrl}
              alt={productVariant.name}
              sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 520px, 600px"
              height={0}
              width={0}
              className="aspect-[4/5] h-auto w-full rounded-3xl object-cover"
            />
          </div>

          <div className="flex flex-col gap-6 lg:pr-2 xl:max-w-[520px]">
            <div className="px-4 sm:px-5 lg:px-0">
              <VariantSelector
                selectedVariantSlug={productVariant.slug}
                variants={productVariant.product.variants}
              />
            </div>

            <div className="space-y-1 px-4 sm:px-5 lg:px-0">
              <h2 className="text-lg font-semibold sm:text-2xl xl:text-3xl">
                {productVariant.product.name}
              </h2>
              <h3 className="text-muted-foreground text-sm sm:text-base xl:text-lg">
                {productVariant.name}
              </h3>
              <h3 className="text-lg font-semibold sm:text-2xl xl:text-3xl">
                {formatCentsToBRL(productVariant.priceInCents)}
              </h3>
            </div>

            <ProductActions productVariantId={productVariant.id} />

            <div className="px-4 sm:px-5 lg:px-0 xl:max-w-[48ch]">
              <p className="text-sm leading-6 sm:text-base xl:text-[15px]">
                {productVariant.product.description}
              </p>
            </div>
          </div>
        </section>

        <ProductList title="Talvez você goste" products={likelyProducts} />
      </main>

      <Footer />
    </>
  );
};

export default ProductVariantPage;
