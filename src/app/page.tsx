export const dynamic = "force-dynamic";

import { desc } from "drizzle-orm";
import Image from "next/image";

import CategorySelector from "@/components/common/category-selector";
import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import ProductList from "@/components/common/product-list";
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
  const categories = await db.query.categoryTable.findMany({});

  return (
    <>
      <Header />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 py-6 sm:gap-10 lg:py-8 xl:gap-12">
        <div className="px-4 sm:px-5 lg:px-8">
          <Image
            src="/banner-01.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto max-h-[520px] w-full rounded-3xl object-cover"
          />
        </div>

        <ProductList products={products} title="Mais vendidos" />

        <div className="px-4 sm:px-5 lg:px-8">
          <CategorySelector categories={categories} />
        </div>

        <div className="px-4 sm:px-5 lg:px-8">
          <Image
            src="/banner-02.png"
            alt="Leve uma vida com estilo"
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto max-h-[520px] w-full rounded-3xl object-cover"
          />
        </div>

        <ProductList products={newlyCreatedProducts} title="Novos produtos" />
      </main>

      <Footer />
    </>
  );
};

export default Home;
