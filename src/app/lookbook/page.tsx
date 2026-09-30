"use client";

import { useRef } from "react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion, useScroll, useTransform } from "framer-motion";

export default function LookbookPage() {
  const containerRef = useRef(null);
  
  // Create parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <main className="min-h-screen bg-background selection:bg-white selection:text-black">
      <Navbar />

      {/* Lookbook Header */}
      <section className="pt-40 pb-20 px-4 md:px-8 text-center bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-white/50 mb-6 block">Editorial</span>
          <h1 className="text-5xl md:text-8xl font-light tracking-tighter text-white mb-6">
            AUTUMN/WINTER &apos;26
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
            An exploration of form, texture, and modern minimalism. Our latest editorial captures the essence of contemporary luxury in its purest state.
          </p>
        </motion.div>
      </section>

      {/* Editorial Grid */}
      <section ref={containerRef} className="pb-32 px-4 md:px-8 max-w-[1800px] mx-auto">
        
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24 md:mb-48 items-center">
          <motion.div 
            className="md:col-span-7 relative h-[60vh] md:h-[90vh] bg-white/5"
            style={{ y: y1 }}
          >
            <Image
              src="/images/hero_campaign_1_1780063945909.png"
              alt="Editorial 1"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
          <motion.div 
            className="md:col-span-4 md:col-start-9 space-y-8"
            style={{ y: y3 }}
          >
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white leading-tight">
              THE ART OF <br/>TAILORING
            </h2>
            <p className="text-white/50 font-light leading-relaxed">
              Meticulously constructed silhouettes that challenge the boundaries of traditional tailoring. A study in proportion and drape.
            </p>
            <button className="text-white text-xs tracking-[0.2em] uppercase border-b border-white/30 pb-2 hover:border-white transition-colors">
              Shop The Look
            </button>
          </motion.div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24 md:mb-48">
          <motion.div 
            className="md:col-span-5 md:col-start-2 relative h-[50vh] md:h-[70vh] bg-white/5 order-2 md:order-1 mt-12 md:mt-32"
            style={{ y: y2 }}
          >
            <Image
              src="/images/lookbook_2_1780064216498.png"
              alt="Editorial 2"
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div 
            className="md:col-span-6 relative h-[60vh] md:h-[80vh] bg-white/5 order-1 md:order-2"
            style={{ y: y1 }}
          >
            <Image
              src="/images/hero_campaign_3_1780063982183.png"
              alt="Editorial 3"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* Row 3 (Full Width Banner) */}
        <motion.div 
          className="relative w-full h-[70vh] md:h-screen mb-24 md:mb-48 bg-white/5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.5 }}
        >
          <Image
            src="/images/hero_campaign_2_1780063961421.png"
            alt="Editorial 4"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <h2 className="text-5xl md:text-8xl font-light tracking-tighter text-white">
              URBAN <br/>METROPOLIS
            </h2>
          </div>
        </motion.div>

        {/* Row 4 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <motion.div 
            className="md:col-span-4 md:col-start-2 space-y-8 order-2 md:order-1 mt-12 md:mt-0"
            style={{ y: y3 }}
          >
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-white leading-tight">
              MODERN <br/>HERITAGE
            </h2>
            <p className="text-white/50 font-light leading-relaxed">
              Bridging the gap between traditional beauty services and premium collections.
            </p>
            <Link href="/collections" className="inline-block text-white text-xs tracking-[0.2em] uppercase border-b border-white/30 pb-2 hover:border-white transition-colors cursor-pointer">
              Explore Collection
            </Link>
          </motion.div>
          <motion.div 
            className="md:col-span-6 relative h-[60vh] md:h-[90vh] bg-white/5 order-1 md:order-2"
            style={{ y: y1 }}
          >
            <Image
              src="/images/hero_campaign_4_1780063997141.png"
              alt="Editorial 5"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

      </section>

      <Footer />
    </main>
  );
}
