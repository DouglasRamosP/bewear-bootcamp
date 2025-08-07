import Image from "next/image";

const BrandList = () => {
  const brands = [
    { name: "Nike", logo: "/nike.png" },
    { name: "Adidas", logo: "/adidas.png" },
    { name: "Puma", logo: "/puma.png" },
    { name: "Adidas2", logo: "/adidas.png" },
    { name: "Puma2", logo: "/puma.png" },
    { name: "Adidas3", logo: "/adidas.png" },
  ];

  return (
    <div className="space-y-4">
      <h3 className="px-5 font-semibold">Marcas parceiras</h3>
      <div className="flex gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
        {brands.map((brand) => (
          <div
            key={brand.name}
            className="flex min-w-[64px] flex-col items-center"
          >
            <div className="flex h-16 w-16 items-center justify-center">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={200}
                height={200}
              />
            </div>
            <span className="mt-1 text-sm">{brand.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandList;
