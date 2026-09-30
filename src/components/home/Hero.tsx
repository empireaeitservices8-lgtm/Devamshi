"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion } from "framer-motion";

const slides = [
  {
    image: "/images/hero_campaign_1_1780063945909.png",
    title: "THE NEW ELEGANCE",
    subtitle: "A MODERN TAKE ON LUXURY",
  },
  {
    image: "/images/hero_campaign_2_1780063961421.png",
    title: "URBAN METROPOLIS",
    subtitle: "BEAUTY & GARMENTS",
  },
  {
    image: "/images/hero_campaign_3_1780063982183.png",
    title: "MINIMAL OBSESSION",
    subtitle: "LESS IS TRULY MORE",
  },
  {
    image: "/images/hero_campaign_4_1780063997141.png",
    title: "CULTURAL HERITAGE",
    subtitle: "PREMIUM ETHNIC COLLECTION",
  },
];

export default function Hero() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="w-full h-full">
            {({ isActive }) => (
              <div className="relative w-full h-full">
                <motion.div
                  initial={{ scale: 1.1 }}
                  animate={{ scale: isActive ? 1 : 1.1 }}
                  transition={{ duration: 6, ease: "easeOut" }}
                  className="w-full h-full"
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover object-center opacity-80"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/10 to-transparent" />
                </motion.div>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-black text-sm md:text-base tracking-[0.3em] font-light mb-4"
                  >
                    {slide.subtitle}
                  </motion.p>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-black text-5xl md:text-7xl lg:text-9xl font-light tracking-tight leading-none"
                  >
                    {slide.title}
                  </motion.h1>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-10"
                  >
                    <Link 
                      href="/collections"
                      className="inline-block px-8 py-4 bg-black text-white text-sm uppercase tracking-widest font-medium hover:bg-black/80 transition-colors duration-300 cursor-pointer"
                    >
                      Discover Collection
                    </Link>
                  </motion.div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
