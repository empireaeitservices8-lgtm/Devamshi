import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const products = [
  {
    id: "2",
    name: "Bridal Makeup",
    price: "₹350",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=80",
    category: "Beautician Work",
    span: "col-span-1 md:col-span-2 row-span-2",
  },
  {
    id: "3",
    name: "Designer Saree",
    price: "₹85",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
    category: "Garments",
    span: "col-span-1 row-span-1",
  },
  {
    id: "8",
    name: "Antique Necklace Collection",
    price: "₹290",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80",
    category: "Antique Ornaments",
    span: "col-span-1 row-span-1",
  },
  {
    id: "10",
    name: "Tailored Wool Jacket",
    price: "₹420",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1000&q=80",
    category: "Garments",
    span: "col-span-1 md:col-span-2 row-span-1",
  },
];

export default function TrendingGrid() {
  return (
    <section className="py-24 px-4 md:px-8 max-w-[1600px] mx-auto bg-white border-t border-neutral-100">
      <div className="flex justify-between items-end mb-16">
        <div>
          <span className="text-xs tracking-[0.2em] uppercase text-neutral-500 mb-4 block font-medium">Trending Now</span>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-black">THE IT LIST</h2>
        </div>
        <Link href="/shop" className="hidden md:flex items-center gap-2 text-sm uppercase tracking-widest text-neutral-600 hover:text-black transition-colors group">
          View All <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-[400px_400px_400px] md:grid-rows-[400px_400px] gap-4">
        {products.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id} className={`group relative bg-white/5 overflow-hidden ${product.span}`}>
            <div className="absolute inset-0 z-10 flex flex-col justify-between p-6">
              <div className="flex justify-between items-start">
                <span className="text-xs uppercase tracking-widest bg-black/50 backdrop-blur-md px-3 py-1 text-white border border-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  {product.category}
                </span>
                <button className="bg-white text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0">
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </div>
              
              <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="text-xl text-white font-medium">{product.name}</h3>
                <p className="text-white/70">{product.price}</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[5]" />
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
