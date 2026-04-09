import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "../Ui/scroll-reveal";

// Import Assets
import brand4 from "../../assets/brands/brands4.jpg";
import brand5 from "../../assets/brands/brands5.jpg";
import brand6 from "../../assets/brands/brands6.jpg";
import brand7 from "../../assets/brands/brands7.jpg";
import brand8 from "../../assets/brands/brands8.jpg";
import brand9 from "../../assets/brands/brands9.jpg";
import brand10 from "../../assets/brands/brands10.jpg";
import brand11 from "../../assets/brands/brands11.jpg";
import brand12 from "../../assets/brands/brands12.jpg";
import brand13 from "../../assets/brands/brands13.jpg";
import brand16 from "../../assets/brands/brands16.jpg";

const brandImages = [
  { src: brand4, name: "Brand 4", category: "Tech" },
  { src: brand5, name: "Brand 5", category: "Finance" },
  { src: brand6, name: "Brand 6", category: "Retail" },
  { src: brand7, name: "Brand 7", category: "Healthcare" },
  { src: brand8, name: "Brand 8", category: "Education" },
  { src: brand9, name: "Brand 9", category: "Tech" },
  { src: brand10, name: "Brand 10", category: "Finance" },
  { src: brand11, name: "Brand 11", category: "Retail" },
  { src: brand12, name: "Brand 12", category: "Manufacturing" },
  { src: brand13, name: "Brand 13", category: "Services" },
];

const BrandsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.95]);

  // Auto-scroll animation for the brand strip
  useEffect(() => {
    const strip = document.querySelector('.brand-strip');
    if (!strip) return;

    let animationId;
    let position = 0;

    const animate = () => {
      position -= 0.5;
      if (Math.abs(position) >= strip.scrollWidth / 2) {
        position = 0;
      }
      strip.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    if (hoveredIndex === null) {
      animationId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [hoveredIndex]);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&family=Poppins:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .brand-strip {
          display: flex;
          gap: 2rem;
          animation: scroll 30s linear infinite;
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative py-24 md:py-15 overflow-hidden bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-[#0a0a0a] dark:via-gray-900/50 dark:to-[#0a0a0a]"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Gradient Orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-l from-cyan-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-pink-400/5 via-purple-400/5 to-blue-400/5 rounded-full blur-3xl" />

          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />

          {/* Animated Border Lines */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
        </div>

        <motion.div
          style={{ opacity, scale }}
          className="relative z-10 mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl"
        >
          {/* Header Section */}
          <ScrollReveal className="text-center mb-20 lg:mb-28">
            {/* Badge - reduced top margin */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 mt-2 mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Trusted Globally
              </span>
            </motion.div>

            {/* Main Heading - Redesigned with company logo colors */}
            <div className="space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight"
                style={{
                  fontFamily: "'Poppins', 'Inter', system-ui, -apple-system, sans-serif",
                  fontWeight: "800",
                  letterSpacing: "-0.02em",
                  lineHeight: "1.2",
                  textShadow: "0 2px 4px rgba(0,0,0,0.05)"
                }}
              >
                <span className="bg-gradient-to-r from-[#0B2B5B] via-[#1A4A7A] to-[#0B2B5B] bg-clip-text text-transparent dark:from-[#1E4D8C] dark:via-[#2E6BA8] dark:to-[#1E4D8C]">
                  Where Innovation Meets
                </span>
                <br />
                <span 
                  className="text-[#00A3AD] dark:text-[#00C4D0]"
                  style={{
                    fontFamily: "'Playfair Display', 'Poppins', serif",
                    fontWeight: "900",
                    fontStyle: "italic"
                  }}
                >
                  Excellence
                </span>
              </motion.h2>
            </div>
          </ScrollReveal>

          {/* Infinite Scrolling Brand Strip */}
          <div className="relative overflow-hidden py-0 pb-15">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-[#0a0a0a] to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-[#0a0a0a] to-transparent z-10" />

            <div className="overflow-hidden">
              <div className="brand-strip">
                {[...brandImages, ...brandImages].map((brand, idx) => (
                  <motion.div
                    key={idx}
                    onHoverStart={() => setHoveredIndex(idx)}
                    onHoverEnd={() => setHoveredIndex(null)}
                    className="group relative flex-shrink-0"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                      <img
                        src={brand.src}
                        alt={brand.name}
                        className="w-16 h-16 md:w-20 md:h-20 object-contain transition-all duration-300 group-hover:scale-110"
                        // Original colors always - no filters applied
                      />

                      {/* Hover Tooltip */}
                      <AnimatePresence>
                        {hoveredIndex === idx && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs rounded-lg whitespace-nowrap z-20 shadow-lg"
                          >
                            {brand.name}
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-white rotate-45" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
      </section>
    </>
  );
};

export default BrandsSection;