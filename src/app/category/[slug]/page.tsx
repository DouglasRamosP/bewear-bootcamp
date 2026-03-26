import { eq } from "drizzle-orm";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import ProductItem from "@/components/common/product-item";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { categoryTable, productTable } from "@/db/schema";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = await params;
  const category = await db.query.categoryTable.findFirst({
    where: eq(categoryTable.slug, slug),
  });
  if (!category) {
    return notFound();
  }
  const products = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, category.id),
    with: {
      variants: true,
    },
  });
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-7xl space-y-8 px-4 py-6 sm:px-5 lg:px-8 lg:py-8 xl:space-y-10">
        <section className="surface-panel rounded-[2rem] p-6 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <Button variant="ghost" className="rounded-full pl-0" asChild>
                <Link href="/">
                  <ArrowLeftIcon />
                  Voltar para a home
                </Link>
              </Button>
              <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.2em] uppercase">
                Categoria
              </p>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {category.name}
              </h1>
              <p className="text-muted-foreground max-w-2xl text-sm leading-6 sm:text-base">
                Curadoria dedicada para quem quer explorar o catálogo por
                contexto, com leitura limpa, grid consistente e foco nas
                imagens.
              </p>
            </div>

            <div className="border-border/60 bg-background/70 rounded-[1.5rem] border px-5 py-4">
              <p className="text-2xl font-semibold">{products.length}</p>
              <p className="text-muted-foreground text-sm">
                produto{products.length === 1 ? "" : "s"} nesta seleção
              </p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6 2xl:grid-cols-5">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              textContainerClassName="max-w-full"
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CategoryPage;
