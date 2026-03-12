"use client";

import { productTable, productVariantTable } from "@/db/schema";

import ProductItem from "./product-item";

interface ProductListProps {
  title: string;
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  })[];
}

const ProductList = ({ title, products }: ProductListProps) => {
  return (
    <section className="space-y-4 sm:space-y-6">
      <div className="px-4 sm:px-5 lg:px-8">
        <h3 className="font-semibold">{title}</h3>
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
