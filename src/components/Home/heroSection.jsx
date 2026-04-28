// HeroSection.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../Ui/button";
import { ArrowRight } from "lucide-react";
import herovideo from "../../assets/hero-video.mp4";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const videoRef = useRef(null);

  // Get fixed header height to prevent overlap
  useEffect(() => {
    const header = document.querySelector('nav'); // fixed navbar
    if (header) setHeaderHeight(header.offsetHeight);
    const handleResize = () => {
      if (header) setHeaderHeight(header.offsetHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Force video to load and play immediately (like J&F example)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
    }
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Animation variants (fade-up)
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
    })
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-900"
      style={{ paddingTop: `${headerHeight}px` }}
    >
      {/* Video – no black background, aggressive preload */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          src={herovideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          style={{ backgroundColor: 'transparent' }}
        />
      </div>

      {/* Gradient overlay for text readability (J&F style) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />

      {/* Main content container */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white/90 text-xs font-bold tracking-widest uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
            Trusted Hospitality Partner
          </motion.div>

          {/* Headline with gradient text */}
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white drop-shadow-lg"
          >
            Premium Supplies for
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-sky-300 to-sky-500">
              World Class Hospitality
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light"
          >
            From luxury guest amenities to eco-friendly packaging — everything your hotel, resort, or restaurant needs to deliver an exceptional guest experience.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex flex-wrap gap-4 justify-center pt-4"
          >
            <Button
              size="lg"
              asChild
              className="bg-sky-600 text-white hover:bg-sky-500 font-heading font-bold px-8 py-6 text-sm uppercase tracking-wider shadow-xl shadow-sky-900/30 rounded-full transition-transform hover:scale-105"
            >
              <Link to="/#contact">Request a Quote</Link>
            </Button>
            <Button
              size="lg"
              asChild
              variant="ghost"
              className="text-white border border-white/30 hover:bg-white/10 font-heading font-medium px-8 py-6 text-sm uppercase tracking-wider rounded-full backdrop-blur-sm"
            >
              <Link to="/products">View Products</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator (J&F style animated arrow) */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 cursor-pointer z-20"
        onClick={scrollToAbout}
        aria-label="Scroll to next section"
        role="button"
      >
        <div className="animate-move-up-down">
          <ArrowRight
            className="w-6 h-6 text-white/80 hover:text-white transition-colors"
            style={{ transform: 'rotate(90deg)' }}
          />
        </div>
      </div>

      <style>{`
        @keyframes moveUpDown {
          0% { transform: translateY(0); }
          50% { transform: translateY(12px); }
          100% { transform: translateY(0); }
        }
        .animate-move-up-down {
          animation: moveUpDown 1.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;