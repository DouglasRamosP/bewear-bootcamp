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

  return (
    <Link
      href={`/product-variant/${firstVariant.slug}`}
      className="flex min-w-[160px] max-w-[220px] flex-col gap-4 sm:min-w-[190px] sm:max-w-[240px] xl:min-w-0 xl:max-w-none"
    >
      <Image
        src={firstVariant.imageUrl}
        alt={firstVariant.name}
        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 28vw, (max-width: 1279px) 240px, 20vw"
        height={0}
        width={0}
        className="aspect-[3/4] h-auto w-full rounded-3xl object-cover"
      />
      <div
        className={cn(
          "flex w-full min-w-0 flex-col gap-1",
          textContainerClassName,
        )}
      >
        <p className="truncate text-sm font-medium">{product.name}</p>
        <p className="text-muted-foreground line-clamp-2 text-xs font-medium">
          {product.description}
        </p>
        <p className="truncate text-sm font-semibold">
          {formatCentsToBRL(firstVariant.priceInCents)}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
