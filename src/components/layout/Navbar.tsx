"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, ShoppingBag, Menu, User, X, ArrowRight, Sparkles, Calendar, Heart, LogIn } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/useCartStore";
import { allProducts } from "@/lib/products";

export default function Navbar() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toggleCart, cartCount } = useCartStore();
  
  // Hydration safety for Zustand
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Filter products based on search query
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Handle escape key to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setProfileOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200 transition-all duration-300">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          {/* Left: Mobile hamburger + Desktop Navigation */}
          <div className="flex items-center gap-6">
            <button 
              className="p-2 -ml-2 text-black hover:opacity-70 transition-opacity md:hidden cursor-pointer"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              <Link 
                href="/shop" 
                className="text-xs lg:text-sm font-medium tracking-widest uppercase text-black hover:opacity-60 transition-opacity"
              >
                Shop
              </Link>
              <Link 
                href="/collections" 
                className="text-xs lg:text-sm font-medium tracking-widest uppercase text-black hover:opacity-60 transition-opacity"
              >
                Collections
              </Link>
              <Link 
                href="/lookbook" 
                className="text-xs lg:text-sm font-medium tracking-widest uppercase text-black hover:opacity-60 transition-opacity"
              >
                Lookbook
              </Link>
              <Link 
                href="/about" 
                className="text-xs lg:text-sm font-medium tracking-widest uppercase text-black hover:opacity-60 transition-opacity"
              >
                About
              </Link>
            </nav>
          </div>

          {/* Center: Brand Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <span className="text-xl md:text-2xl font-semibold tracking-[0.25em] text-black">
              DEVAMSHI
            </span>
          </Link>

          {/* Right: Search, Account/Profile, Cart */}
          <div className="flex items-center gap-2 md:gap-3">
            <button 
              onClick={() => {
                setSearchOpen(true);
                setProfileOpen(false);
              }}
              className="p-2 text-black hover:opacity-70 transition-opacity cursor-pointer" 
              aria-label="Search products"
              title="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button 
              onClick={() => {
                setProfileOpen(true);
                setSearchOpen(false);
              }}
              className="p-2 text-black hover:opacity-70 transition-opacity cursor-pointer" 
              aria-label="Account Profile"
              title="Profile & Bookings"
            >
              <User className="w-5 h-5" />
            </button>
            <button 
              onClick={toggleCart} 
              className="p-2 text-black hover:opacity-70 transition-opacity relative cursor-pointer" 
              aria-label="Shopping Cart"
              title="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {mounted && cartCount() > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-black rounded-full ring-2 ring-white"></span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* SEARCH MODAL */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-[120] flex items-start justify-center pt-24 px-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white text-black w-full max-w-2xl rounded-none border border-neutral-200 shadow-2xl overflow-hidden"
            >
              {/* Search Header */}
              <div className="p-4 md:p-6 border-b border-neutral-200 flex items-center gap-3">
                <Search className="w-5 h-5 text-neutral-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search products, services, sarees, treatments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full text-base md:text-lg bg-transparent border-none outline-none text-black placeholder:text-neutral-400"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="p-1 text-neutral-400 hover:text-black cursor-pointer"
                  >
                    Clear
                  </button>
                )}
                <button 
                  onClick={() => setSearchOpen(false)}
                  className="p-2 text-neutral-500 hover:text-black cursor-pointer ml-1"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Quick Categories when search is empty */}
              {!searchQuery.trim() && (
                <div className="p-6 bg-neutral-50">
                  <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-3">
                    Popular Collections
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: "Beauty Services", slug: "beauty-services" },
                      { name: "Beautician Work", slug: "beautician-work" },
                      { name: "Designer Sarees", slug: "garments" },
                      { name: "Rental Ornaments", slug: "rental-ornaments" },
                      { name: "Antique Ornaments", slug: "antique-ornaments" },
                    ].map((item) => (
                      <button
                        key={item.slug}
                        onClick={() => {
                          setSearchOpen(false);
                          router.push(`/shop/${item.slug}`);
                        }}
                        className="text-xs uppercase tracking-wider bg-white border border-neutral-200 px-3.5 py-1.5 hover:bg-black hover:text-white transition-colors cursor-pointer"
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Live Search Results */}
              {searchQuery.trim() && (
                <div className="max-h-[60vh] overflow-y-auto p-4 md:p-6 divide-y divide-neutral-100">
                  {searchResults.length === 0 ? (
                    <div className="text-center py-10 text-neutral-500">
                      <p className="text-sm">No products found matching &ldquo;{searchQuery}&rdquo;</p>
                      <button
                        onClick={() => {
                          setSearchOpen(false);
                          router.push("/shop");
                        }}
                        className="mt-4 text-xs uppercase tracking-widest underline font-medium cursor-pointer"
                      >
                        View All Products
                      </button>
                    </div>
                  ) : (
                    searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          setSearchOpen(false);
                          router.push(`/product/${product.id}`);
                        }}
                        className="flex items-center gap-4 py-3 group cursor-pointer hover:bg-neutral-50 px-2 transition-colors"
                      >
                        <div className="relative w-14 h-16 shrink-0 bg-neutral-100 border border-neutral-200 overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-black group-hover:underline truncate">
                            {product.name}
                          </h4>
                          <span className="text-xs text-neutral-500 block">
                            {product.category}
                          </span>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-sm font-semibold text-black">
                            ₹{product.price}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PROFILE / ACCOUNT MODAL */}
      <AnimatePresence>
        {profileOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white text-black w-full max-w-md border border-neutral-200 shadow-2xl p-6 md:p-8 relative"
            >
              {/* Close Button */}
              <button 
                onClick={() => setProfileOpen(false)}
                className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-black cursor-pointer"
                aria-label="Close profile modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Profile Header */}
              <div className="flex items-center gap-4 pb-6 border-b border-neutral-200">
                <div className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center text-lg font-light">
                  DP
                </div>
                <div>
                  <h3 className="text-lg font-medium text-black">Devamshi Guest</h3>
                  <span className="text-xs uppercase tracking-wider text-neutral-500 block">
                    Pathanapuram &bull; Member
                  </span>
                </div>
              </div>

              {/* Profile Quick Links */}
              <div className="py-6 space-y-3">
                <button 
                  onClick={() => {
                    setProfileOpen(false);
                    router.push("/checkout");
                  }}
                  className="w-full flex items-center justify-between p-3 border border-neutral-200 hover:bg-neutral-50 text-left transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-4 h-4 text-black" />
                    <div>
                      <span className="text-sm font-medium text-black block">My Orders & Checkout</span>
                      <span className="text-xs text-neutral-500">Track pending or active orders</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-400" />
                </button>

                <button 
                  onClick={() => {
                    setProfileOpen(false);
                    router.push("/shop/beauty-services");
                  }}
                  className="w-full flex items-center justify-between p-3 border border-neutral-200 hover:bg-neutral-50 text-left transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-black" />
                    <div>
                      <span className="text-sm font-medium text-black block">Book Beauty Appointment</span>
                      <span className="text-xs text-neutral-500">Eyebrows, facials, bridal packages</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-400" />
                </button>

                <button 
                  onClick={() => {
                    setProfileOpen(false);
                    router.push("/collections");
                  }}
                  className="w-full flex items-center justify-between p-3 border border-neutral-200 hover:bg-neutral-50 text-left transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Heart className="w-4 h-4 text-black" />
                    <div>
                      <span className="text-sm font-medium text-black block">Saved Collections</span>
                      <span className="text-xs text-neutral-500">Browse curated garments & ornaments</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-400" />
                </button>
              </div>

              {/* Profile Footer Action */}
              <div className="pt-4 border-t border-neutral-200 flex gap-3">
                <button
                  onClick={() => {
                    alert("Logged in as Devamshi Member");
                    setProfileOpen(false);
                  }}
                  className="w-full py-3 bg-black text-white text-xs uppercase tracking-widest font-semibold hover:bg-black/80 transition-colors cursor-pointer"
                >
                  Sign In / Register
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MOBILE MENU DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-white z-[150] flex flex-col px-6 py-8"
          >
            <div className="flex justify-between items-center mb-10 pb-4 border-b border-neutral-200">
              <span className="text-xl font-semibold tracking-[0.25em] text-black">
                DEVAMSHI
              </span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-black hover:opacity-70 transition-opacity cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-6 text-xl font-light tracking-widest uppercase">
              <Link 
                href="/" 
                onClick={() => setMobileMenuOpen(false)} 
                className="text-black hover:text-neutral-500 transition-colors py-1"
              >
                Home
              </Link>
              <Link 
                href="/shop" 
                onClick={() => setMobileMenuOpen(false)} 
                className="text-black hover:text-neutral-500 transition-colors py-1"
              >
                Shop
              </Link>
              <Link 
                href="/collections" 
                onClick={() => setMobileMenuOpen(false)} 
                className="text-black hover:text-neutral-500 transition-colors py-1"
              >
                Collections
              </Link>
              <Link 
                href="/lookbook" 
                onClick={() => setMobileMenuOpen(false)} 
                className="text-black hover:text-neutral-500 transition-colors py-1"
              >
                Lookbook
              </Link>
              <Link 
                href="/about" 
                onClick={() => setMobileMenuOpen(false)} 
                className="text-black hover:text-neutral-500 transition-colors py-1"
              >
                About
              </Link>
            </nav>

            <div className="mt-8 pt-6 border-t border-neutral-200 flex gap-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchOpen(true);
                }}
                className="flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-black border border-neutral-300 px-4 py-2 cursor-pointer"
              >
                <Search className="w-4 h-4" /> Search
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setProfileOpen(true);
                }}
                className="flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-black border border-neutral-300 px-4 py-2 cursor-pointer"
              >
                <User className="w-4 h-4" /> Account
              </button>
            </div>

            <div className="mt-auto border-t border-neutral-200 pt-6 flex justify-between items-center text-xs tracking-widest text-neutral-500 uppercase">
              <span>Pathanapuram, Kerala</span>
              <span>Devamshi &copy; 2026</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
