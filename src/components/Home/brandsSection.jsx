import React from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "../Ui/scroll-reveal";

// Import Assets
import brand1 from "../../assets/brands/brands1.jpg";
import brand2 from "../../assets/brands/brands2.jpg";
import brand3 from "../../assets/brands/brands3.jpg";
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
import brand14 from "../../assets/brands/brands14.jpg";
import brand15 from "../../assets/brands/brands15.jpg";
import brand16 from "../../assets/brands/brands16.jpg";

const brandImages = [
  brand1, brand2, brand3, brand4, brand5, brand6, brand7, brand8, brand9,
  brand10, brand11, brand12, brand13, brand14, brand15,
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.2,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

const BrandsSection = () => {
  const [hoveredIndex, setHoveredIndex] = React.useState(null);

  return (
    <>
      {/* Outfit — uniform stroke weight, perfect for gradient text clipping */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      {/* Styles */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .font-outfit {
          font-family: 'Outfit', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>

      <section className="py-18 md:py-20 relative overflow-hidden bg-white dark:bg-[#0a0a0a]">
        
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900" />
          
          <div className="absolute inset-0 opacity-30 dark:opacity-20">
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-r from-blue-200/30 to-transparent dark:from-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-l from-gray-200/40 to-transparent dark:from-gray-600/10 rounded-full blur-3xl" />
          </div>
          
          <div 
            className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"
            style={{ maskImage: "radial-gradient(circle at center, transparent 0%, black 100%)" }}
          />
        </div>

        {/* Main Container */}
        <div className="relative z-10 mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl ma">
          
          {/* Header */}
          <ScrollReveal className="text-center mb-20 md:mb-24">
            
            <motion.div
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="inline-flex items-center gap-2.5 mb-7"
            >
              <span className="block w-8 h-px bg-gray-300 dark:bg-gray-700" />
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 font-outfit">
                Trusted Partners
              </span>
              <span className="block w-8 h-px bg-gray-300 dark:bg-gray-700" />
            </motion.div>

            {/* Main Heading */}
            <div className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-7xl font-bold tracking-tight leading-[1.1] flex flex-wrap justify-center font-outfit">
              
              <motion.span
                initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              >
                500+
              </motion.span>

              {" "}
              
              <motion.span
                initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent"
              >
                companies
              </motion.span>

              {" "}

              <motion.span
                initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="bg-gradient-to-r from-gray-500 to-gray-400 dark:from-gray-400 dark:to-gray-500 bg-clip-text text-transparent"
              >
                trust us
              </motion.span>
              
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-gray-500 dark:text-gray-400 mt-7 max-w-md mx-auto text-base sm:text-lg leading-relaxed font-outfit"
            >
              Forward-thinking brands delivering exceptional results through our platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex items-center justify-center gap-1.5 mt-8"
            >
              <span className="w-1 h-1 rounded-full bg-indigo-400" />
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              <span className="w-1 h-1 rounded-full bg-pink-400" />
            </motion.div>
          </ScrollReveal>

          {/* Brand Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-5 gap-5 md:gap-6 lg:gap-8 overflow-x-auto pb-4 hide-scrollbar"
          >
            {brandImages.map((src, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative group min-w-[120px]"
              >
                <div
                  className="relative flex items-center justify-center w-full aspect-square rounded-2xl transition-all duration-300 ease-out cursor-pointer bg-white dark:bg-gray-900/50 backdrop-blur-sm"
                  style={{
                    boxShadow: hoveredIndex === i 
                      ? "0 20px 35px -12px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05)"
                      : "0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)",
                    transform: hoveredIndex === i ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)",
                  }}
                >
                  <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                    hoveredIndex === i 
                      ? "border border-gray-200 dark:border-gray-700 shadow-sm" 
                      : "border border-gray-100 dark:border-gray-800"
                  }`} />
                  
                  <motion.img
                    src={src}
                    alt="Brand logo"
                    className="w-[65%] h-[65%] object-contain transition-all duration-300"
                    style={{ 
                      filter: hoveredIndex === i 
                        ? "brightness(1) grayscale(0%)" 
                        : "brightness(0.6) grayscale(100%)",
                      opacity: hoveredIndex === i ? 1 : 0.5
                    }}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>
    </>
  );
};

export default BrandsSection;