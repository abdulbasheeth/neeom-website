import React from "react";
import { Link } from "react-router-dom";
import { categories } from "../data/homecategories";
import { ScrollReveal, StaggerContainer, StaggerItem } from "../Ui/scroll-reveal";

// --- 1. The Bubble Animation Component ---
const BubbleBackground = () => {
  const bubbles = Array.from({ length: 20 }).map((_, i) => {
    const seed = i * 123 + 456;
    const random = () => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    // Calculate random properties
    const size = 40 + random() * 80;
    const duration = 10 + random() * 10;
    const delay = random() * -15;

    // --- UPDATED: Random Horizontal Direction ---
    // Determine if bubble starts from left or right
    const isLeftToRight = Math.random() > 0.5;

    // Set starting position off-screen
    // Left side: -15% (hidden), Right side: 115% (hidden)
    const left = isLeftToRight ? -15 : 115;

    // Set drift to cross the screen
    // Needs to travel start offset + screen width + end buffer (approx 130vw total)
    const xDrift = isLeftToRight ? "135vw" : "-135vw";

    return (
      <div
        key={i}
        className="bubble"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${left}%`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          // Pass the calculated drift direction (using vw units)
          "--x-drift": xDrift,
        }}
      />
    );
  });

  return (
    <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
      {bubbles}
    </div>
  );
};

// --- 2. The Main Component ---
const CategoriesSection = () => (
  <section className="relative py-24 md:py-32 bg-[#F0F4FA] overflow-hidden mt-20">

    {/* CSS Animation Keyframes */}
    <style>{`
      .bubble {
        position: absolute;
        bottom: -150px;
        border-radius: 50%;
        
        /* Fix: Blue tint to be visible on light background */
        background: rgba(59, 130, 246, 0.1); 
        border: 1px solid rgba(59, 130, 246, 0.2);
        
        backdrop-filter: blur(2px);
        animation-name: floatBubble;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
      }

      @keyframes floatBubble {
        0% {
          transform: translateY(0) translateX(0) scale(0.5);
          opacity: 0;
        }
        20% {
          opacity: 1;
        }
        100% {
          /* Uses the variable defined in the JS style prop (e.g., 135vw or -135vw) */
          transform: translateY(-110vh) translateX(var(--x-drift)) scale(1);
          opacity: 0;
        }
      }
    `}</style>

    {/* Background Layers */}
    <div className="absolute inset-0 pointer-events-none">
      <BubbleBackground />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #0F2B46 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#0F2B46] rounded-full blur-[160px] opacity-[0.04]" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-[#3B82F6] rounded-full blur-[160px] opacity-[0.05]" />
    </div>

    {/* Content Container */}
    <div className="container relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

      {/* Header Section */}
      <ScrollReveal className="mb-14 md:mb-16">
        <div className="relative rounded-3xl overflow-hidden px-6 py-14 md:px-12 md:py-20 text-center">
          <div className="absolute inset-0 bg-[#0F2B46]" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #3B82F6 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          <div className="absolute top-0 right-0 w-[340px] h-[340px] bg-[#3B82F6] rounded-full blur-[120px] opacity-[0.12]" />
          <div className="absolute bottom-0 left-0 w-[260px] h-[260px] bg-[#1E4D8C] rounded-full blur-[100px] opacity-[0.25]" />
          <div className="absolute inset-0 rounded-3xl border border-[#3B82F6]/20 pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#3B2F6]/25 bg-[#3B82F6]/10 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
              <span
                className="text-[#60A5FA] font-semibold text-[11px] uppercase tracking-[0.2em]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Our Categories
              </span>
            </div>

            <h2
              className="text-white text-3xl sm:text-4xl md:text-[3.25rem] font-bold tracking-tight leading-[1.08]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Explore by{" "}
              <span className="relative inline-block text-[#60A5FA]">
                Category
                <svg
                  className="absolute -bottom-1.5 left-0 w-full"
                  viewBox="0 0 200 10"
                  fill="none"
                >
                  <path
                    d="M1 7C45 2 85 1 100 3.5C115 6 155 7 199 2"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity="0.35"
                  />
                </svg>
              </span>
            </h2>

            <p
              className="text-white/65 mt-5 max-w-lg mx-auto text-base md:text-[1.05rem] leading-relaxed"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Discover premium products curated for the hospitality industry, from
              kitchen essentials to elegant decor.
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* Categories Grid */}
      <StaggerContainer
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5"
        staggerDelay={0.08}
      >
        {categories.map((cat) => (
          <StaggerItem key={cat.id}>
            <Link
              to={`/products?category=${cat.id}`}
              className="group relative flex flex-col items-center justify-center text-center w-full h-[100px] sm:h-[160px] md:h-[150px] rounded-2xl bg-white border border-sky-50 p-4 transition-all duration-500 shadow-[0_0_15px_rgba(14,165,233,0.15)] hover:shadow-[0_0_30px_rgba(14,165,233,0.35)] hover:border-sky-200 hover:-translate-y-1"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-gradient-to-r from-transparent via-sky-400 to-transparent group-hover:w-3/4 transition-all duration-500" />
              
              
              <div className="relative mb-3 flex items-center justify-center w-8 h-10 md:w-11 md:h-11 rounded-xl bg-sky-50 border border-sky-100 text-xl md:text-2xl transition-all duration-500 group-hover:bg-sky-100 group-hover:scale-110 group-hover:border-sky-200 group-hover:shadow-sm">
                <span className="transition-transform duration-500 group-hover:scale-110 text-sky-500">{cat.icon}</span>
              </div>
              
              <h3
                className="text-slate-700 font-semibold text-[12px] md:text-[13px] leading-snug tracking-tight transition-colors duration-300 group-hover:text-sky-600"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {cat.label}
              </h3>
              <div className="mt-2 flex items-center justify-center w-5 h-5 rounded-full border border-sky-200 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:border-sky-400 group-hover:bg-sky-50 transition-all duration-400">
                <svg
                  className="w-2.5 h-2.5 text-sky-600 transition-transform duration-300 group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-gradient-to-r from-transparent via-sky-400 to-transparent group-hover:w-3/4 transition-all duration-500 delay-75" />
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>

    </div>
  </section>
);

export default CategoriesSection;