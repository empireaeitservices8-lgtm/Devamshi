import Hero from "@/components/home/Hero";
import FeaturedCollections from "@/components/home/FeaturedCollections";
import TrendingGrid from "@/components/home/TrendingGrid";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-white selection:text-black">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Collections / Categories */}
      <div className="bg-background">
        <FeaturedCollections />
      </div>

      {/* Brand Story / Parallax Divider */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <Image 
            src="/images/lookbook_2_1780064216498.png" 
            alt="Brand Story" 
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-20 text-center max-w-4xl px-4">
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-light text-white tracking-tight mb-8">
            REDEFINING MODERN LUXURY
          </h2>
          <p className="text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed">
            Every piece is crafted with meticulous attention to detail, blending contemporary design with timeless elegance to create the ultimate wardrobe for the modern visionary.
          </p>
        </div>
      </section>

      {/* Trending Products */}
      <TrendingGrid />

      {/* Instagram Gallery */}
      <section className="py-24 px-4 bg-background">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-light tracking-tight text-black mb-4">@DEVAMSHI</h2>
          <p className="text-neutral-500 text-sm tracking-widest uppercase font-medium">Follow our journey</p>
        </div>
        <div className="max-w-[1600px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "/images/instagram_1_1780064240000.png",
            "/images/lookbook_2_1780064216498.png",
            "/images/testimonial_1_1780064256763.png",
            "/images/hero_campaign_3_1780063982183.png"
          ].map((img, i) => (
            <div key={i} className="relative aspect-square overflow-hidden bg-neutral-100">
              <Image src={img} alt={`Gallery ${i}`} fill className="object-cover transition-transform duration-700 hover:scale-105" />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
