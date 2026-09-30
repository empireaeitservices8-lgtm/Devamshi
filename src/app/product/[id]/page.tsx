"use client";

import { useState, use, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { ChevronRight, Minus, Plus, ShoppingBag, Heart, Trash2, Check } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { allProducts } from "@/lib/products";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const product = allProducts.find((p) => p.id === resolvedParams.id) || allProducts[0];
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.defaultSize || product.sizes[0]);
  const { addItem, removeItem, items } = useCartStore();

  useEffect(() => {
    setSelectedSize(product.defaultSize || product.sizes[0]);
  }, [product]);

  const isInCart = items.some((i) => i.id === product.id && i.size === selectedSize);

  return (
    <main className="min-h-screen bg-white text-black selection:bg-black selection:text-white pt-20">
      <Navbar />

      {/* Breadcrumbs */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-6 flex items-center text-xs tracking-widest uppercase text-neutral-500">
        <Link href="/" className="hover:text-black transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3 mx-2" />
        <Link href="/shop" className="hover:text-black transition-colors">Shop</Link>
        <ChevronRight className="w-3 h-3 mx-2" />
        <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-black transition-colors">
          {product.category}
        </Link>
        <ChevronRight className="w-3 h-3 mx-2" />
        <span className="text-black font-medium">{product.name}</span>
      </div>

      <section className="max-w-[1600px] mx-auto px-4 md:px-8 pb-24 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        {/* Images */}
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative aspect-[3/4] md:aspect-[4/5] bg-neutral-100 border border-neutral-200 overflow-hidden"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] bg-neutral-100 border border-neutral-200 opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
              <Image src={product.image} alt={product.name} fill className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] bg-neutral-100 border border-neutral-200 opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
              <Image src={product.image} alt={product.name} fill className="object-cover" />
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col pt-4 md:pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 block mb-2 font-medium">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-light tracking-tight text-black mb-4">
              {product.name}
            </h1>
            <p className="text-2xl text-black font-semibold mb-6">
              ₹{product.price.toFixed(2)}
            </p>

            <div className="border-t border-b border-neutral-200 py-6 mb-8">
              <p className="text-neutral-700 font-light leading-relaxed text-base">
                {product.description}
              </p>
            </div>

            {/* Dynamic Correct Size / Option Selector */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs uppercase tracking-widest text-neutral-700 font-semibold">
                  Select {product.sizeLabel || "Size"}
                </span>
                {product.category === "Garments" && (
                  <button className="text-xs uppercase tracking-wider text-neutral-500 hover:text-black border-b border-neutral-300 hover:border-black transition-colors pb-0.5">
                    Size Guide
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-3 text-xs md:text-sm uppercase tracking-wider font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                        isSelected 
                          ? "bg-black text-white border border-black shadow-xs" 
                          : "border border-neutral-300 text-neutral-800 hover:border-black bg-white"
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                      <span>{size}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-10">
              <span className="text-xs uppercase tracking-widest text-neutral-700 font-semibold block mb-3">Quantity</span>
              <div className="flex items-center border border-neutral-300 w-32 bg-white">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 text-neutral-600 hover:text-black transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="flex-1 text-center text-black font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 text-neutral-600 hover:text-black transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button 
                onClick={() => {
                  addItem({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    size: selectedSize,
                    quantity: quantity
                  });
                }}
                className="flex-1 bg-black text-white py-4 uppercase tracking-widest text-sm font-medium flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors shadow-xs cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" /> {isInCart ? "Add Another to Cart" : "Add to Cart"}
              </button>
              {isInCart && (
                <button
                  type="button"
                  onClick={() => removeItem(product.id, selectedSize)}
                  className="px-6 py-4 border border-red-300 text-red-600 hover:bg-red-50 uppercase tracking-widest text-sm font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  title="Remove from Cart"
                >
                  <Trash2 className="w-4 h-4" /> Remove
                </button>
              )}
              <button className="p-4 border border-neutral-300 text-neutral-700 hover:border-black hover:text-black transition-all flex items-center justify-center cursor-pointer">
                <Heart className="w-5 h-5" />
              </button>
            </div>
            
            {/* Additional info accordions */}
            <div className="space-y-4 border-t border-neutral-200 pt-6">
              {['Details & Care', 'Shipping & Delivery', 'Authenticity Guarantee'].map(title => (
                <div key={title} className="border-b border-neutral-200 pb-4">
                  <button className="w-full flex justify-between items-center text-xs uppercase tracking-widest text-neutral-700 hover:text-black transition-colors group">
                    <span>{title}</span>
                    <Plus className="w-4 h-4 transform group-hover:rotate-90 transition-transform text-neutral-400 group-hover:text-black" />
                  </button>
                </div>
              ))}
            </div>

          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
