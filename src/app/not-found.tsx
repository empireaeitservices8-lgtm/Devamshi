import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background selection:bg-white selection:text-black flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-8xl md:text-9xl font-light text-white tracking-tighter mb-4">404</h1>
        <h2 className="text-xl md:text-2xl font-light text-white/80 tracking-widest uppercase mb-8">
          Page Not Found
        </h2>
        <p className="text-white/50 max-w-md mx-auto mb-10 leading-relaxed font-light">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          href="/" 
          className="px-8 py-4 bg-white text-black text-sm uppercase tracking-widest font-medium hover:bg-white/90 transition-colors duration-300"
        >
          Return to Homepage
        </Link>
      </div>

      <Footer />
    </main>
  );
}
