// heroSection.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../Ui/button"; 
import heroImage from "../../assets/hero-hotel.jpg";
import { motion } from "framer-motion";

const HeroSection = () => {
  // Animation configuration
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
    })
  };

  return (
    <section className="relative h-[calc(100vh-80px)] w-full flex items-center overflow-hidden bg-slate-900">
      
      {/* 1. Background Image with Animated Reveal */}
      <div className="absolute inset-0 z-0">
        <motion.img
          src={heroImage}
          alt="Luxury Hotel Interior"
          className="w-full h-full object-cover object-center"
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-900/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-900 to-transparent" />
      </div>

      {/* 2. Main Content Container */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 py-20">
        <div className="max-w-3xl">
          
          {/* Accent Line & Label */}
          <motion.div 
            className="flex items-center gap-4 mb-8"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <div className="h-[2px] w-12 bg-cyan-400" />
            <span className="text-cyan-400 font-semibold text-xs uppercase tracking-[0.2em]">
              Trusted Hospitality Partner
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-[1.05] mb-8"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            Elevate Your
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-blue-500">
              Guest Experience
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-slate-300 text-lg md:text-xl max-w-lg leading-relaxed mb-12"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            From bespoke amenities to eco-luxury packaging — we supply everything your property needs to create unforgettable stays.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-4"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <Button
              size="lg"
              asChild
              className="bg-white text-slate-900 hover:bg-cyan-50 font-heading font-bold px-8 py-6 text-base shadow-xl shadow-cyan-900/20 rounded-full transition-transform hover:scale-105"
            >
              <Link to="/#contact">Request a Quote</Link>
            </Button>
            
            <Button
              size="lg"
              asChild
              variant="ghost"
              className="text-white border border-white/20 hover:bg-white/10 font-heading font-semibold px-8 py-6 text-base rounded-full backdrop-blur-sm"
            >
              <Link to="/products">View Products</Link>
            </Button>
          </motion.div>

        </div>
      </div>

      {/* 3. Decorative Floating Elements */}
      <motion.div 
        className="absolute top-1/4 right-12 w-64 h-64 rounded-full border border-cyan-500/10 hidden lg:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      />
      
      {/* 4. Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/40 text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
        </div>
      </motion.div>
      
    </section>
  );
};

export default HeroSection;