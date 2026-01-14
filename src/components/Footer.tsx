"use client";

import Link from "next/link";
import { Sparkles, Instagram, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-gold-400" />
              <span className="font-display text-2xl font-bold">Ifvy Beads</span>
            </Link>
            <p className="text-brand-200 font-body leading-relaxed">
              Handcrafted bead bags made with love and attention to detail. 
              Each piece is unique and tells a story.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4 text-gold-400">
              Quick Links
            </h3>
            <div className="space-y-2 font-body">
              <Link
                href="/"
                className="block text-brand-200 hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="block text-brand-200 hover:text-white transition-colors"
              >
                Shop All
              </Link>
              <Link
                href="/products?filter=new"
                className="block text-brand-200 hover:text-white transition-colors"
              >
                New Arrivals
              </Link>
              <Link
                href="/products?filter=sale"
                className="block text-brand-200 hover:text-white transition-colors"
              >
                On Sale
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4 text-gold-400">
              Contact Us
            </h3>
            <div className="space-y-3 font-body">
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2348130106423"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-brand-200 hover:text-white transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>WhatsApp</span>
              </a>
              <a
                href="https://instagram.com/ifvybeads"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-brand-200 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span>@ifvybeads</span>
              </a>
              <a
                href="mailto:ifvybeads@gmail.com"
                className="flex items-center gap-3 text-brand-200 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>ifvybeads@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-brand-700 text-center">
          <p className="text-brand-300 font-body text-sm">
            © {new Date().getFullYear()} Ifvy Beads. All rights reserved. Made with{" "}
            <span className="text-red-500">❤️</span> by{" "}
            <a
              href="https://elochukwu-ekwugha.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-400 hover:text-gold-500 transition-colors font-semibold"
            >
              #NotYourRegularDeveloper
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

