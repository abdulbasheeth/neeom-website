import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../Ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import neomLogo from "../../assets/Neom-logo.jpg";

const navLinks = [
  { label: "Home", path: "/", isHash: false },
  { label: "About", path: "/about", isHash: true, elementId: "about" },
  { label: "Products", path: "/products", isHash: false },
  { label: "Contact", path: "/contact", isHash: true, elementId: "contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const closeTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `/#${elementId}`);
    } else {
      setTimeout(() => {
        const retryElement = document.getElementById(elementId);
        if (retryElement) {
          retryElement.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", `/#${elementId}`);
        } else {
          console.warn(`Element with id "${elementId}" not found`);
        }
      }, 300);
    }
  };

  const handleNavClick = useCallback(
    (e, link) => {
      e.preventDefault();
      setMobileOpen(false);
      setDesktopDropdownOpen(false);
      setMobileDropdownOpen(false);

      if (link.isHash) {
        if (location.pathname !== "/") {
          navigate(`/#${link.elementId}`);
          setTimeout(() => scrollToElement(link.elementId), 100);
        } else {
          scrollToElement(link.elementId);
        }
      } else {
        navigate(link.path);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [location.pathname, navigate]
  );

  const isActive = useCallback(
    (link) => {
      if (link.isHash) {
        return location.pathname === "/" && location.hash === `#${link.elementId}`;
      } else {
        if (link.path === "/") {
          return location.pathname === "/" && (!location.hash || location.hash === "#home");
        }
        return location.pathname === link.path;
      }
    },
    [location.pathname, location.hash]
  );

  const handleDownloadPDF = async () => {
    const pdfUrl = "/neom-profile.pdf";

    try {
      const response = await fetch(pdfUrl);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} - File not found`);
      }

      const blob = await response.blob();

      if (blob.size === 0) {
        throw new Error("PDF file is empty (0 bytes). Please check the file in the public folder.");
      }

      if (blob.type === "text/html" || blob.type.startsWith("text/")) {
        const text = await blob.text();
        if (text.includes("<html") || text.includes("<!DOCTYPE")) {
          throw new Error("Server returned HTML instead of PDF. Your build may not have copied the PDF.");
        }
      }

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Neom_Hospitality_Profile.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF download error:", error);
      const fallbackLink = document.createElement("a");
      fallbackLink.href = "/neom-profile.pdf";
      fallbackLink.download = "Neom_Hospitality_Profile.pdf";
      document.body.appendChild(fallbackLink);
      fallbackLink.click();
      document.body.removeChild(fallbackLink);

      setTimeout(() => {
        alert("The PDF could not be downloaded. Please ensure the file 'neom-profile.pdf' exists in the public folder and is not empty.");
      }, 100);
    } finally {
      setDesktopDropdownOpen(false);
      setMobileDropdownOpen(false);
    }
  };

  const brandColor = "#0284c7";
  const rgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  const scrolledShadow = `0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 0 0 1px ${rgba(brandColor, 0.2)}, 0 0 28px 5px ${rgba(brandColor, 0.3)}`;

  return (
    <nav
      className={`fixed top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "left-0 right-0 mx-auto w-[calc(100%-2rem)] lg:w-auto lg:mx-[80px] top-[10px]"
          : "w-full left-0 top-0"
      }`}
      aria-label="Main navigation"
    >
      <div
        className={`transition-all duration-500 ${
          scrolled ? "bg-white py-2 rounded-full" : "bg-white py-3 rounded-none"
        }`}
        style={{ boxShadow: scrolled ? scrolledShadow : "none" }}
      >
        <div
          className={`container mx-auto flex items-center justify-between transition-all duration-500 ${
            scrolled ? "px-6 lg:px-[50px]" : "px-6 lg:px-12"
          }`}
        >
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-lg"
          >
            <img
              src={neomLogo}
              alt="NEOM Hospitality Supplies"
              className="transition-all duration-500 w-auto object-contain bg-transparent"
              style={{ height: scrolled ? "44px" : "64px", width: "auto", transition: "height 0.5s ease" }}
            />
            <div
              className="flex flex-col leading-tight"
              style={{ fontFamily: "'Abdo Misr', 'Noto Sans Arabic', 'Noto Sans', sans-serif", fontWeight: 600 }}
            >
              <span
                className={`transition-all duration-500 text-gray-800 whitespace-nowrap text-sm sm:text-base md:text-lg font-semibold ${
                  scrolled ? "lg:text-xl" : "lg:text-2xl"
                }`}
              >
                نيوم لمستلزمات الضيافة ذ.م.م
              </span>
              <span
                className={`transition-all duration-500 text-gray-800 whitespace-nowrap text-sm sm:text-base md:text-base font-semibold ${
                  scrolled ? "lg:text-base" : "lg:text-lg"
                }`}
              >
                Neom Hospitality Supplies LLC
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.isHash ? `/#${link.elementId}` : link.path}
                onClick={(e) => handleNavClick(e, link)}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                  isActive(link)
                    ? "bg-sky-50 text-sky-700"
                    : "text-gray-600 hover:text-sky-700 hover:bg-sky-50"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA / Downloads - HOVER FIX + SKY BLUE BORDER */}
          <div className="hidden md:flex items-center gap-3">
            <div
              className="relative"
              onMouseEnter={() => {
                if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
                setDesktopDropdownOpen(true);
              }}
              onMouseLeave={() => {
                closeTimerRef.current = setTimeout(() => {
                  setDesktopDropdownOpen(false);
                }, 200);
              }}
            >
              <Button
                variant="outline"
                size="sm"
                className="rounded-full px-5  border-sky-600 text-sky-700 hover:bg-sky-50 flex items-center gap-1"
                aria-expanded={desktopDropdownOpen}
                aria-haspopup="true"
              >
                Downloads <ChevronDown className="h-4 w-4" />
              </Button>
              {desktopDropdownOpen && (
                <div
                  className="absolute right-0 mt-3 w-56 rounded-md shadow-lg bg-white border border-sky-400 z-50" // Sky blue border added
                  role="menu"
                  onMouseEnter={() => {
                    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
                  }}
                  onMouseLeave={() => {
                    closeTimerRef.current = setTimeout(() => {
                      setDesktopDropdownOpen(false);
                    }, 200);
                  }}
                >
                  <div className="py-1">
                    <button
                      onClick={handleDownloadPDF}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-700 transition-colors focus:outline-none focus:bg-sky-50"
                      role="menuitem"
                    >
                      📄 Company Profile PDF
                    </button>
                  </div>
                </div>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="rounded-full px-5 border-sky-600 text-sky-700 hover:bg-sky-50 focus:ring-2 focus:ring-sky-500"
            >
              <Link to="/products">View Products</Link>
            </Button>
            <Button
              size="sm"
              asChild
              className="rounded-full px-5 shadow-lg bg-sky-600 hover:bg-sky-700 text-white shadow-sky-600/20 focus:ring-2 focus:ring-sky-500"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(e, { isHash: true, elementId: "contact", path: "/contact" });
              }}
            >
              <a href="/#contact">Request Quote</a>
            </Button>
          </div>

          <button
            className="md:hidden p-2 rounded-lg transition-colors text-gray-700 hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer - unchanged */}
      <div
        className={`md:hidden absolute bg-white border-b shadow-xl transition-all duration-300 overflow-y-auto ${
          mobileOpen ? "max-h-[calc(100vh-80px)] opacity-100" : "max-h-0 opacity-0"
        } ${scrolled ? "mx-[20px] mt-[30px] rounded-b-3xl left-0 right-0" : "w-full left-0"}`}
      >
        <div className="container mx-auto py-4 flex flex-col gap-1 px-4">
          {navLinks.map((link) => (
            <a
              key={link.path}
              href={link.isHash ? `/#${link.elementId}` : link.path}
              onClick={(e) => handleNavClick(e, link)}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                isActive(link) ? "bg-sky-50 text-sky-700" : "text-gray-600 hover:bg-sky-50 hover:text-sky-700"
              }`}
            >
              {link.label}
            </a>
          ))}
          <div className="mt-2">
            <button
              onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
              className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-sky-50 hover:text-sky-700 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
              aria-expanded={mobileDropdownOpen}
            >
              <span>Downloads</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileDropdownOpen && (
              <div className="pl-4 mt-1 space-y-1">
                <button
                  onClick={handleDownloadPDF}
                  className="block w-full text-left px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-sky-50 hover:text-sky-700 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  📄 Company Profile PDF
                </button>
              </div>
            )}
          </div>
          <div className="flex gap-2 pt-4 mt-2 border-t">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="flex-1 rounded-lg border-sky-600 text-sky-700 focus:ring-2 focus:ring-sky-500"
            >
              <Link to="/products" onClick={() => setMobileOpen(false)}>
                View Products
              </Link>
            </Button>
            <Button
              size="sm"
              asChild
              className="flex-1 rounded-lg bg-sky-600 hover:bg-sky-700 focus:ring-2 focus:ring-sky-500"
            >
              <a
                href="/#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(e, { isHash: true, elementId: "contact", path: "/contact" });
                  setMobileOpen(false);
                }}
              >
                Request Quote
              </a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;