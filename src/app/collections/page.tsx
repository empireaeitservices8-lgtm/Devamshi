"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";

const collections = [
  {
    id: "beauty-services",
    title: "BEAUTY SERVICES",
    subtitle: "Premium Salon Care",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1600&q=80",
    description: "Revitalizing facials, precision eyebrow threading, and herbal hair spa treatments designed to restore radiance.",
  },
  {
    id: "beautician-work",
    title: "BEAUTICIAN WORK",
    subtitle: "Professional Makeovers",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1600&q=80",
    description: "Exquisite bridal makeovers, luxury 24K gold facials, saree draping, and customized wedding packages.",
  },
  {
    id: "garments",
    title: "GARMENTS",
    subtitle: "Designer Attire & Fabrics",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=80",
    description: "Handcrafted pure silk designer sarees, pure cotton and chanderi kurti materials, and modern tailoring.",
  },
  {
    id: "rental-ornaments",
    title: "RENTAL ORNAMENTS",
    subtitle: "Wedding & Celebration Sets",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Temple_Jewellery_Modern_Designs.jpg",
    description: "Traditional Hindu temple jewellery bridal sets for rent, including chokers, long harams, and jhumkas.",
  },
  {
    id: "antique-ornaments",
    title: "ANTIQUE ORNAMENTS",
    subtitle: "Timeless Heritage Pieces",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1600&q=80",
    description: "Heritage matte antique gold necklaces with ruby red kemp stones and pearl hangings.",
  },
];

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
      <Navbar />
      
      {/* Page Header */}
      <section className="pt-36 pb-16 px-4 md:px-8 text-center bg-white border-b border-neutral-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-xs tracking-[0.25em] uppercase text-neutral-500 mb-3 block font-semibold">Devamshi Collections</span>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight text-black mb-4">
            OUR COLLECTIONS
          </h1>
          <p className="text-neutral-600 max-w-2xl mx-auto font-light leading-relaxed text-sm md:text-base">
            Discover our meticulously curated collections, blending contemporary luxury with timeless elegance. Each piece tells a story of craftsmanship and vision.
          </p>
        </motion.div>
      </section>

      {/* Collections List */}
      <section className="py-16 px-4 md:px-8 bg-neutral-50/50">
        <div className="max-w-[1600px] mx-auto space-y-8 md:space-y-12">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.08 }}
            >
              <Link 
                href={`/shop/${collection.id}`}
                className="group relative block w-full h-[60vh] md:h-[75vh] overflow-hidden border border-neutral-200 shadow-sm cursor-pointer"
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors duration-700 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-10" />
                
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  priority={index < 2}
                />
                
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-end text-center p-6 md:p-12">
                  <span className="text-white/80 text-xs md:text-sm tracking-[0.3em] uppercase mb-3 font-medium">
                    {collection.subtitle}
                  </span>
                  <h2 className="text-3xl md:text-6xl font-light tracking-tight text-white mb-3">
                    {collection.title}
                  </h2>
                  <p className="text-white/80 text-xs md:text-sm max-w-xl mb-6 font-light leading-relaxed">
                    {collection.description}
                  </p>
                  <div className="overflow-hidden">
                    <span className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-black text-xs uppercase tracking-widest font-semibold group-hover:bg-black group-hover:text-white border border-white transition-all duration-300 shadow-md">
                      Explore Collection &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
