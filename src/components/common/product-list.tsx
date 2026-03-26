"use client";

import { productTable, productVariantTable } from "@/db/schema";

import ProductItem from "./product-item";

interface ProductListProps {
  title: string;
  description?: string;
  id?: string;
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  })[];
}

const ProductList = ({
  title,
  description,
  id,
  products,
}: ProductListProps) => {
  return (
    <section id={id} className="space-y-4 sm:space-y-6">
      <div className="px-4 sm:px-5 lg:px-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.2em] uppercase">
              Curadoria
            </p>
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {title}
            </h3>
            {description && (
              <p className="text-muted-foreground max-w-2xl text-sm leading-6 sm:text-base">
                {description}
              </p>
            )}
          </div>

          <p className="text-muted-foreground text-sm font-medium">
            {products.length} itens em destaque
          </p>
        </div>
      </div>

      <div className="hidden px-4 xl:block xl:px-8">
        <div className="grid grid-cols-4 gap-6 2xl:grid-cols-5">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              textContainerClassName="max-w-full"
            />
          ))}
        </div>
      </div>

      <div className="flex w-full gap-4 overflow-x-auto px-4 pb-1 sm:px-5 lg:px-8 xl:hidden [&::-webkit-scrollbar]:hidden">
        {products.map((product) => (
          <div key={product.id} className="snap-start">
            <ProductItem product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductList;
