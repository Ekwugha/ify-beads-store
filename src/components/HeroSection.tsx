"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-cream to-brand-100">
        {/* Decorative Elements */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-gold-400/20 to-brand-300/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-brand-400/20 to-gold-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-pink-300/20 to-purple-300/20 rounded-full blur-3xl"
        />
      </div>

      {/* Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23683726' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md border border-gold-400/30 rounded-full px-5 py-2 mb-6"
          >
            <Sparkles className="w-4 h-4 text-gold-500" />
            <span className="font-body text-sm text-brand-700">
              Handcrafted with Love
            </span>
          </motion.div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-brand-900 leading-tight">
            Exquisite
            <br />
            <span className="bg-gradient-to-r from-gold-500 via-brand-500 to-gold-600 bg-clip-text text-transparent">
              Bead Bags
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 md:mt-8 font-body text-lg md:text-xl text-brand-600 max-w-2xl mx-auto leading-relaxed"
          >
            Discover our collection of stunning handcrafted bead bags. 
            Each piece is unique, beautiful, and made just for you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-2 bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white font-body font-semibold text-lg px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Shop Collection
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
            <Link href="/products?filter=new">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 bg-white/70 backdrop-blur-md hover:bg-white border border-brand-200 text-brand-700 font-body font-semibold text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                New Arrivals
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating Beads Animation */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            { x: -20, duration: 9, delay: 0 },
            { x: 15, duration: 10, delay: 1.5 },
            { x: -10, duration: 8, delay: 3 },
            { x: 25, duration: 11, delay: 4.5 },
            { x: -5, duration: 9.5, delay: 6 },
            { x: 20, duration: 10.5, delay: 7.5 },
          ].map((bead, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: bead.x, 
                y: 100,
                opacity: 0 
              }}
              animate={{ 
                y: -100,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: bead.duration,
                repeat: Infinity,
                delay: bead.delay,
                ease: "linear",
              }}
              className="absolute"
              style={{
                left: `${10 + i * 15}%`,
                bottom: 0,
              }}
            >
              <div 
                className={`w-3 h-3 rounded-full ${
                  i % 2 === 0 
                    ? 'bg-gradient-to-br from-gold-400 to-gold-600' 
                    : 'bg-gradient-to-br from-brand-400 to-brand-600'
                } shadow-lg`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

