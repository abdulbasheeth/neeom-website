import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "../Ui/button";
import { ArrowRight } from "lucide-react";
import herovideo from "../../assets/hero-video.mp4";
import { motion } from "framer-motion";

const HeroSection = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
    }
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-total-height')) || 0;
      const elementPosition = aboutSection.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - headerHeight, behavior: "smooth" });
    }
  };

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
      style={{ paddingTop: "var(--header-total-height, 0px)" }}
    >
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
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80 md:from-black/40 md:via-black/50 md:to-black/80" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-5 md:space-y-6">
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white/90 text-[11px] sm:text-xs font-bold tracking-widest uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
            Trusted Hospitality Partner
          </motion.div>

          {/* Heading - Tablet size reduced from 6xl to 5xl for better fit */}
          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-4xl sm:text-5xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-lg px-2"
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
            className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed font-light px-4"
          >
            From luxury guest amenities to eco-friendly packaging — everything your hotel, resort, or restaurant needs to deliver an exceptional guest experience.
          </motion.p>

          {/* CTA Buttons - full width on mobile, normal on tablet+ */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 sm:pt-4 px-4"
          >
            <Button size="lg" asChild className="bg-sky-600 hover:bg-sky-500 font-bold px-6 sm:px-8 py-3 sm:py-5 md:py-6 rounded-full w-full sm:w-auto">
              <Link to="/#contact">Request a Quote</Link>
            </Button>
            <Button size="lg" asChild variant="ghost" className="text-white border border-white/30 hover:bg-white/10 font-medium px-6 sm:px-8 py-3 sm:py-5 md:py-6 rounded-full backdrop-blur-sm w-full sm:w-auto">
              <Link to="/products">View Products</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-6 sm:bottom-4 left-1/2 -translate-x-1/2 cursor-pointer z-20 pb-2 sm:pb-0"
        onClick={scrollToAbout}
        aria-label="Scroll to next section"
      >
        <div className="animate-move-up-down">
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-white/80 hover:text-white" style={{ transform: 'rotate(90deg)' }} />
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