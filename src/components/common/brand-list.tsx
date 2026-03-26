import Image from "next/image";

const BrandList = () => {
  const brands = [
    { name: "Nike", logo: "/nike.png" },
    { name: "Adidas", logo: "/adidas.png" },
    { name: "Puma", logo: "/puma.png" },
    { name: "New Balance", logo: "/newbalance.png" },
  ];

  return (
    <section className="space-y-4">
      <div className="px-4 sm:px-5 lg:px-8">
        <div className="surface-panel rounded-[2rem] px-5 py-5 sm:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.2em] uppercase">
                Labels selecionadas
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">
                Marcas que reforcam a curadoria da casa
              </h3>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
              {brands.map((brand) => (
                <div
                  key={brand.name}
                  className="border-border/70 bg-background/70 flex min-w-[130px] items-center justify-center rounded-[1.5rem] border px-6 py-4"
                >
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={120}
                    height={40}
                    className="h-8 w-auto object-contain opacity-80"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandList;
