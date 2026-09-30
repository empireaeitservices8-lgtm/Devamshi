import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black pt-24 pb-12 px-4 md:px-8 border-t border-white/10">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="inline-block mb-8">
              <span className="text-2xl md:text-3xl font-semibold tracking-[0.2em] text-white">
                DEVAMSHI
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              Premium beauty services, garments, rental ornaments, and antique collections.
            </p>
          </div>
          
          <div>
            <h4 className="text-white text-sm font-medium tracking-widest uppercase mb-6">Services & Shop</h4>
            <ul className="space-y-4">
              <li><Link href="/shop/beauty-services" className="text-white/60 hover:text-white text-sm transition-colors">Beauty Services</Link></li>
              <li><Link href="/shop/beautician-work" className="text-white/60 hover:text-white text-sm transition-colors">Beautician Work</Link></li>
              <li><Link href="/shop/garments" className="text-white/60 hover:text-white text-sm transition-colors">Garments</Link></li>
              <li><Link href="/shop/rental-ornaments" className="text-white/60 hover:text-white text-sm transition-colors">Rental Ornaments</Link></li>
              <li><Link href="/shop/antique-ornaments" className="text-white/60 hover:text-white text-sm transition-colors">Antique Ornaments</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-medium tracking-widest uppercase mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-white/60 hover:text-white text-sm transition-colors">About Us</Link></li>
              <li><Link href="/lookbook" className="text-white/60 hover:text-white text-sm transition-colors">Lookbook</Link></li>
              <li><Link href="/stores" className="text-white/60 hover:text-white text-sm transition-colors">Find a Store</Link></li>
              <li><Link href="/contact" className="text-white/60 hover:text-white text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-medium tracking-widest uppercase mb-6">Newsletter</h4>
            <p className="text-white/60 text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="flex border-b border-white/20 pb-2">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="bg-transparent border-none outline-none text-white text-sm w-full placeholder:text-white/40"
              />
              <button type="submit" className="text-white text-sm uppercase tracking-widest hover:text-white/70 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-white/40 text-xs">
          <p>&copy; {new Date().getFullYear()} DEVAMSHI. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
