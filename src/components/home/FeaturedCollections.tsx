import Image from "next/image";
import Link from "next/link";

const collections = [
  {
    title: "BEAUTY SERVICES",
    subtitle: "Salon & Spa Care",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80",
    link: "/shop/beauty-services",
  },
  {
    title: "BEAUTICIAN WORK",
    subtitle: "Bridal & Makeover",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=80",
    link: "/shop/beautician-work",
  },
  {
    title: "GARMENTS",
    subtitle: "Sarees & Kurtis",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80",
    link: "/shop/garments",
  },
  {
    title: "RENTAL ORNAMENTS",
    subtitle: "Temple Bridal Sets",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Temple_Jewellery_Modern_Designs.jpg",
    link: "/shop/rental-ornaments",
  },
  {
    title: "ANTIQUE ORNAMENTS",
    subtitle: "Heritage Collection",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80",
    link: "/shop/antique-ornaments",
  },
];

export default function FeaturedCollections() {
  return (
    <section className="py-24 px-4 md:px-8 max-w-[1600px] mx-auto bg-white">
      <div className="flex flex-col items-center mb-16 text-center">
        <span className="text-xs tracking-[0.25em] uppercase text-neutral-500 mb-3 block font-semibold">Discover Devamshi</span>
        <h2 className="text-3xl md:text-5xl font-light tracking-tight text-black">CURATED COLLECTIONS</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection, index) => (
          <Link
            href={collection.link}
            key={index}
            className={`group relative overflow-hidden block h-[380px] md:h-[450px] border border-neutral-200 shadow-xs cursor-pointer ${
              index === 0 ? "lg:col-span-2" : ""
            }`}
          >
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-10" />
            <Image
              src={collection.image}
              alt={collection.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8">
              <span className="text-white/80 text-xs tracking-[0.25em] uppercase mb-2 font-medium">
                {collection.subtitle}
              </span>
              <h3 className="text-white text-2xl md:text-3xl font-light tracking-tight mb-4">
                {collection.title}
              </h3>
              <div>
                <span className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-black text-xs uppercase tracking-widest font-semibold group-hover:bg-black group-hover:text-white border border-white transition-all duration-300 shadow-sm">
                  Explore Collection &rarr;
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
