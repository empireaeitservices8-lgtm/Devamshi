import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "About Us | DEVAMSHI",
  description:
    "Devamshi is a new-generation fashion and beauty venture based in Pathanapuram, Adoor, Kerala, founded by Sunitha Pradeep.",
};

const missionPoints = [
  "To bring creativity and freshness to women’s fashion.",
  "To create clothing that reflects individuality and confidence.",
  "To provide quality and personalized beauty experiences.",
  "To encourage women to embrace their own unique style and beauty.",
  "To build a brand that grows with the changing needs and aspirations of modern women.",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
      <Navbar />

      {/* 1. About Us / Hero Section */}
      <section className="pt-32 pb-14 md:pt-40 md:pb-16 border-b border-neutral-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 block mb-3 font-medium">
              Devamshi
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-black mb-4">
              About Us
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 font-light leading-relaxed">
              Fashion, beauty and confidence — created for every woman.
            </p>
          </div>
        </div>
      </section>

      {/* 2. About Devamshi Section */}
      <section className="py-14 md:py-18 border-b border-neutral-200 bg-white" id="about-devamshi">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="mb-8 md:mb-10">
            <span className="text-xs uppercase tracking-[0.25em] text-neutral-500 block mb-2 font-medium">
              Our Story
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-light tracking-tight text-black">
              About Devamshi
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            {/* Visual Column */}
            <div className="md:col-span-5">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 border border-neutral-200 shadow-sm">
                <Image
                  src="/images/lookbook_2_1780064216498.png"
                  alt="Devamshi Fashion & Beauty"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[11px] tracking-[0.2em] uppercase text-white/80 block mb-0.5 font-medium">
                    Location
                  </span>
                  <p className="text-xs tracking-wider uppercase text-white font-medium">
                    Pathanapuram, Adoor, Kerala
                  </p>
                </div>
              </div>
            </div>

            {/* Narrative Column */}
            <div className="md:col-span-7 space-y-4 md:space-y-5 text-neutral-800 font-light text-base md:text-[17px] leading-relaxed text-justify">
              <p>
                Devamshi is a new-generation fashion and beauty venture based in Pathanapuram, Adoor, Kerala, created with a simple yet powerful vision — to transform women’s fashion and beauty experiences and inspire every woman to feel confident, beautiful, and uniquely herself.
              </p>

              <p>
                Founded by Sunitha Pradeep, a passionate women entrepreneur with a creative vision for fashion designing and beauty, Devamshi brings together fashion, personal style, beauty, and confidence under one identity.
              </p>

              <p>
                At Devamshi, we believe that clothing is more than just what you wear. It is a reflection of your personality, individuality, and confidence. Through thoughtfully designed women’s wear, we aim to introduce fresh ideas and a modern approach to women’s clothing culture while celebrating the beauty and uniqueness of every woman.
              </p>

              <p>
                Our journey also extends into the world of beauty. With our beauty parlour services, Devamshi is dedicated to helping women look and feel their best — whether it is for everyday elegance, special occasions, or those moments when she simply wants to celebrate herself.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Vision Section */}
      <section className="py-16 md:py-24 border-b border-neutral-200 bg-neutral-50/60" id="vision">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-black mb-8">
            Our Vision
          </h2>

          <div className="border border-neutral-200 bg-white p-8 sm:p-12 md:p-14 shadow-xs">
            <p className="text-xl sm:text-2xl md:text-3xl font-light italic text-neutral-900 leading-relaxed tracking-tight">
              &ldquo;To create a trusted fashion and beauty destination where every woman can discover her style, express her individuality, and walk with confidence.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* 4. Our Mission Section */}
      <section className="py-16 md:py-24 bg-white" id="mission">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-black mb-10">
            Our Mission
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {missionPoints.map((point, index) => (
              <div
                key={index}
                className={`p-7 border border-neutral-200 bg-neutral-50/60 hover:border-black hover:bg-white transition-all duration-300 flex items-start gap-5 shadow-xs ${
                  index === 4 ? "md:col-span-2 md:max-w-xl md:mx-auto md:w-full" : ""
                }`}
              >
                <span className="text-xs font-mono font-bold tracking-widest text-neutral-400 pt-1 shrink-0">
                  0{index + 1}
                </span>
                <p className="text-neutral-800 font-light text-base md:text-lg leading-relaxed">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
