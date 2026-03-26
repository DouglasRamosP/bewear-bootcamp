import Image from "next/image";
import Link from "next/link";

import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";
import { cn } from "@/lib/utils";

interface ProductItemProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
  textContainerClassName?: string;
}

const ProductItem = ({ product, textContainerClassName }: ProductItemProps) => {
  const firstVariant = product.variants[0];
  if (!firstVariant) {
    return null;
  }

  return (
    <Link
      href={`/product-variant/${firstVariant.slug}`}
      className="group surface-panel flex max-w-[320px] min-w-[250px] flex-col gap-4 overflow-hidden rounded-[2rem] p-3 transition-transform duration-300 hover:-translate-y-1 sm:min-w-[280px] xl:max-w-none xl:min-w-0"
    >
      <div className="relative overflow-hidden rounded-[1.5rem]">
        <div className="bg-primary/90 text-primary-foreground absolute top-3 left-3 z-10 rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.16em] uppercase">
          {product.variants.length} vers
          {product.variants.length === 1 ? "ão" : "ões"}
        </div>
        <Image
          src={firstVariant.imageUrl}
          alt={firstVariant.name}
          sizes="(max-width: 640px) 70vw, (max-width: 1024px) 40vw, (max-width: 1279px) 320px, 20vw"
          height={0}
          width={0}
          className="aspect-[4/5] h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div
        className={cn(
          "flex w-full min-w-0 flex-col gap-2 px-1 pb-1",
          textContainerClassName,
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <p className="line-clamp-2 text-base font-semibold tracking-tight">
            {product.name}
          </p>
          <p className="shrink-0 text-sm font-semibold">
            {formatCentsToBRL(firstVariant.priceInCents)}
          </p>
        </div>
        <p className="text-muted-foreground line-clamp-2 text-sm leading-6">
          {product.description}
        </p>
        <p className="text-muted-foreground text-xs font-semibold tracking-[0.18em] uppercase">
          Comprar agora
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
