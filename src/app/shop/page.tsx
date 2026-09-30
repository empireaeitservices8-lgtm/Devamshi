"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, ChevronDown, X } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { allProducts } from "@/lib/products";

const categories = ["All", "Beauty Services", "Beautician Work", "Garments", "Rental Ornaments", "Antique Ornaments"];
const sortOptions = ["Featured", "New Arrivals", "Price: Low to High", "Price: High to Low"];

interface ShopPageProps {
  initialCategory?: string;
}

export default function ShopPage({ initialCategory = "All" }: ShopPageProps = {}) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeSort, setActiveSort] = useState("Featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  // Filter products
  const filteredProducts = allProducts.filter((product) => {
    if (activeCategory === "All") return true;
    return product.category.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <main className="min-h-screen bg-white text-black selection:bg-black selection:text-white pt-24">
      <Navbar />

      {/* Shop Header */}
      <section className="px-4 md:px-8 py-12 max-w-[1600px] mx-auto border-b border-neutral-200">
        <h1 className="text-4xl md:text-6xl font-light tracking-tight text-black mb-6">
          {activeCategory === "All" ? "ALL PRODUCTS" : activeCategory.toUpperCase()}
        </h1>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-sm tracking-widest uppercase whitespace-nowrap transition-colors cursor-pointer ${
                  activeCategory === cat ? "text-black border-b-2 border-black font-semibold pb-1" : "text-neutral-500 hover:text-black font-medium"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 text-sm uppercase tracking-widest text-black hover:text-neutral-600 transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filter
            </button>
            
            <div className="relative group">
              <button className="flex items-center gap-2 text-sm uppercase tracking-widest text-black hover:text-neutral-600 transition-colors cursor-pointer">
                Sort By <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-neutral-200 shadow-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {sortOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setActiveSort(opt)}
                    className={`block w-full text-left px-4 py-3 text-xs uppercase tracking-widest hover:bg-neutral-50 transition-colors cursor-pointer ${
                      activeSort === opt ? "text-black font-bold bg-neutral-100" : "text-neutral-700"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Drawer (Mobile/Desktop) */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-b border-neutral-200 overflow-hidden bg-neutral-50"
          >
            <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-10 grid grid-cols-1 md:grid-cols-4 gap-12 relative">
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="absolute top-6 right-4 md:right-8 text-neutral-500 hover:text-black cursor-pointer"
                aria-label="Close filters"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div>
                <h4 className="text-black text-sm tracking-widest uppercase mb-6 font-semibold">Price Range</h4>
                <div className="space-y-4">
                  {["₹0 - ₹100", "₹100 - ₹300", "₹300 - ₹500", "₹500+"].map((price) => (
                    <label key={price} className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-4 h-4 border border-neutral-300 group-hover:border-black transition-colors" />
                      <span className="text-neutral-700 text-sm group-hover:text-black transition-colors">{price}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-black text-sm tracking-widest uppercase mb-6 font-semibold">Size & Option</h4>
                <div className="grid grid-cols-3 gap-2">
                  {["XS", "S", "M", "L", "XL", "Free Size"].map((size) => (
                    <button key={size} className="py-2 border border-neutral-300 text-neutral-800 text-xs hover:border-black hover:text-black transition-colors bg-white">
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-black text-sm tracking-widest uppercase mb-6 font-semibold">Category Type</h4>
                <p className="text-neutral-600 text-xs leading-relaxed">
                  Explore custom garment stitching, certified beautician packages, and antique temple jewelry rentals.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Grid */}
      <section className="px-4 md:px-8 py-12 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-y-16">
          {filteredProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group cursor-pointer"
            >
              <Link href={`/product/${product.id}`} className="block relative aspect-[3/4] mb-6 overflow-hidden bg-neutral-100 border border-neutral-200">
                {product.newArrival && (
                  <span className="absolute top-4 left-4 z-20 text-[10px] tracking-widest uppercase bg-black text-white px-3 py-1 font-semibold">
                    New
                  </span>
                )}
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-end justify-center pb-6">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      addItem({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        size: product.defaultSize,
                      });
                    }}
                    className="bg-white text-black text-xs uppercase tracking-widest px-6 py-3 border border-neutral-300 hover:bg-black hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 font-medium shadow-sm cursor-pointer"
                  >
                    Quick Add ({product.defaultSize})
                  </button>
                </div>
              </Link>
              <div className="flex flex-col items-center text-center">
                <Link href={`/product/${product.id}`} className="text-neutral-500 text-xs tracking-widest uppercase hover:text-black transition-colors mb-2 font-medium">
                  {product.category}
                </Link>
                <Link href={`/product/${product.id}`}>
                  <h3 className="text-black text-lg font-light mb-1 hover:text-neutral-700 transition-colors">{product.name}</h3>
                </Link>
                <span className="text-xs text-neutral-500 mb-2 font-medium">{product.defaultSize}</span>
                <span className="text-black font-semibold">₹{product.price.toFixed(2)}</span>
              </div>
            </motion.div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-24 text-neutral-500 font-light">
            No products found matching your criteria.
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
