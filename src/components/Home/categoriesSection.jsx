import React from "react";
import { Link } from "react-router-dom";
import { categories } from "../data/homecategories";
import { ScrollReveal, StaggerContainer, StaggerItem } from "../Ui/scroll-reveal";

const CategoriesSection = () => (
  <section className="relative py-24 md:py-32 bg-[#FAF8F5] overflow-hidden mt-20">

    <div className="absolute inset-0 pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #1B4332 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-[#1B4332] rounded-full blur-[160px] opacity-[0.04]" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-[#C9A84C] rounded-full blur-[160px] opacity-[0.05]" />
    </div>

    <div className="container relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

      <ScrollReveal className="mb-14 md:mb-16">
        <div className="relative rounded-3xl overflow-hidden px-6 py-14 md:px-12 md:py-20 text-center">

          <div className="absolute inset-0 bg-[#1B4332]" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #C9A84C 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
          <div className="absolute top-0 right-0 w-[340px] h-[340px] bg-[#C9A84C] rounded-full blur-[120px] opacity-[0.12]" />
          <div className="absolute bottom-0 left-0 w-[260px] h-[260px] bg-[#2D6A4F] rounded-full blur-[100px] opacity-[0.25]" />
          <div className="absolute inset-0 rounded-3xl border border-[#C9A84C]/20 pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#C9A84C]/25 bg-[#C9A84C]/10 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
              <span
                className="text-[#C9A84C] font-semibold text-[11px] uppercase tracking-[0.2em]"
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
              <span className="relative inline-block text-[#C9A84C]">
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

      <StaggerContainer
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        staggerDelay={0.12}
      >
        {categories
          .filter((cat) => cat.image)
          .map((cat) => (
            <StaggerItem key={cat.id}>
              <Link
                to={`/products?category=${cat.id}`}
                className="group relative block w-full aspect-[4/3] rounded-2xl overflow-hidden"
                style={{
                  boxShadow:
                    "0 4px 24px -4px rgba(27,67,50,0.08), 0 1px 3px rgba(0,0,0,0.04)",
                }}
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
                  loading="lazy"
                />

                <div
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(13,40,24,0.88) 0%, rgba(13,40,24,0.35) 45%, transparent 100%)",
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-x-75 group-hover:scale-x-100" />

                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-7 z-10">
                  <div className="mb-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400 delay-75">
                    <span
                      className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-[#C9A84C] font-semibold px-2.5 py-1 rounded-md border border-[#C9A84C]/25 bg-[#C9A84C]/10 backdrop-blur-sm"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      <span className="w-1 h-1 rounded-full bg-[#C9A84C]" />
                      {cat.label}
                    </span>
                  </div>

                  <h3
                    className="text-white font-bold text-xl md:text-[1.45rem] leading-snug mb-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {cat.label}
                  </h3>

                  <p
                    className="text-white/75 text-sm leading-relaxed line-clamp-2 mb-5 drop-shadow-sm max-w-[90%]"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {cat.description}
                  </p>

                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex items-center gap-2 text-white/90 group-hover:text-white text-[13px] font-semibold tracking-wide translate-x-0 group-hover:translate-x-1 transition-all duration-300"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Explore collection
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-white/25 group-hover:border-[#C9A84C] group-hover:bg-[#C9A84C]/15 transition-all duration-300">
                        <svg
                          className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    className="text-[#C9A84C]/50"
                  >
                    <path
                      d="M32 32V20C26 20 20 26 20 32H32Z"
                      fill="currentColor"
                      opacity="0.15"
                    />
                    <path
                      d="M32 32V24C28 24 24 28 24 32H32Z"
                      fill="currentColor"
                      opacity="0.3"
                    />
                  </svg>
                </div>
              </Link>
            </StaggerItem>
          ))}
      </StaggerContainer>

      
    </div>
  </section>
);

export default CategoriesSection;