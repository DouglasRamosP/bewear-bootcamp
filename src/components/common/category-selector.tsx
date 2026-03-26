import Link from "next/link";

import { categoryTable } from "@/db/schema";

import { Button } from "../ui/button";

interface CategorySelectorProps {
  categories: Array<
    typeof categoryTable.$inferSelect & {
      products?: Array<{ id: string }>;
    }
  >;
}

const CategorySelector = ({ categories }: CategorySelectorProps) => {
  return (
    <section id="categorias" className="px-4 sm:px-5 lg:px-8">
      <div className="surface-panel soft-grid rounded-[2rem] p-5 sm:p-6 xl:p-8">
        <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.2em] uppercase">
              Navegue pelo topo
            </p>
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Categorias pensadas para uso real no dia a dia
            </h3>
          </div>

          <p className="text-muted-foreground max-w-xl text-sm leading-6">
            Acesso rápido para quem quer explorar o catálogo por contexto, e não
            apenas por uma grade comum de produtos.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="ghost"
              className="border-border/60 bg-background/80 h-auto justify-start rounded-[1.5rem] border px-5 py-4 text-left whitespace-normal"
              asChild
            >
              <Link href={`/category/${category.slug}`}>
                <div className="flex flex-col items-start gap-1">
                  <span className="text-base font-semibold">
                    {category.name}
                  </span>
                  <span className="text-muted-foreground text-xs font-medium tracking-[0.16em] uppercase">
                    {(category.products?.length ?? 0)
                      .toString()
                      .padStart(2, "0")}{" "}
                    produtos
                  </span>
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySelector;
