import Image from "next/image";
import Link from "next/link";

import { productVariantTable } from "@/db/schema";

interface VariantSelectorProps {
  selectedVariantSlug: string;
  variants: (typeof productVariantTable.$inferSelect)[];
}

const VariantSelector = ({
  selectedVariantSlug,
  variants,
}: VariantSelectorProps) => {
  return (
    <div className="flex gap-4 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
      {variants.map((variant) => (
        <Link
          href={`/product-variant/${variant.slug}`}
          key={variant.id}
          className={
            selectedVariantSlug === variant.slug
              ? "border-primary bg-background shrink-0 rounded-[1.25rem] border p-1"
              : "bg-background/70 shrink-0 rounded-[1.25rem] border border-transparent p-1"
          }
        >
          <div className="flex items-center gap-3 rounded-[1rem] px-2 py-2">
            <Image
              width={68}
              height={68}
              src={variant.imageUrl}
              alt={variant.name}
              className="rounded-[0.9rem] object-cover"
            />
            <div className="pr-2">
              <p className="text-sm font-semibold">{variant.name}</p>
              <p className="text-muted-foreground text-xs font-medium uppercase">
                {variant.color}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default VariantSelector;
