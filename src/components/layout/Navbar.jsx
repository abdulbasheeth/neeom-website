import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../Ui/button";
import { Menu, X, ChevronDown, FileText } from "lucide-react"; // Added FileText icon
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
  const headerRef = useRef(null);
  const closeTimerRef = useRef(null);

  // FIX: Dynamically get header height to handle resize/scroll state changes
  const getHeaderHeight = useCallback(() => {
    return headerRef.current?.offsetHeight || 80; // Fallback to 80px
  }, []);

  // FIX: Improved Scroll Logic
  const scrollToElement = useCallback((elementId) => {
    const checkAndScroll = () => {
      const element = document.getElementById(elementId);
      if (element) {
        // 1. Get fresh header height at the moment of scrolling
        const headerHeight = getHeaderHeight();
        
        // 2. Calculate element position relative to top of page
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        
        // 3. Calculate offset: Element Position - Header Height - Extra Padding (20px)
        const offsetPosition = elementPosition - headerHeight - 20; 

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
        
        // Update URL without scroll jump
        window.history.replaceState(null, "", `/#${elementId}`);
        return true;
      }
      return false;
    };

    // Try immediately
    if (checkAndScroll()) return;

    // Polling fallback in case content isn't fully rendered
    let attempts = 0;
    const maxAttempts = 10; 
    const interval = setInterval(() => {
      attempts++;
      if (checkAndScroll() || attempts >= maxAttempts) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [getHeaderHeight]);

  // Handle keyboard accessibility
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setDesktopDropdownOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Handle Scroll State (Header shrinking effect)
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    // Check on mount
    onScroll();
    
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const handleNavClick = useCallback((e, link) => {
    e.preventDefault();
    
    // Close menus
    setMobileOpen(false);
    setDesktopDropdownOpen(false);
    setMobileDropdownOpen(false);

    if (link.isHash) {
      // If we are on a different page, navigate first, then scroll
      if (location.pathname !== "/") {
        navigate(`/#${link.elementId}`);
        // Small timeout to allow page to render before scrolling
        setTimeout(() => scrollToElement(link.elementId), 100);
      } else {
        scrollToElement(link.elementId);
      }
    } else {
      navigate(link.path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname, navigate, scrollToElement]);

  const isActive = useCallback((link) => {
    if (link.isHash) {
      return location.pathname === "/" && location.hash === `#${link.elementId}`;
    } else if (link.path === "/") {
      return location.pathname === "/" && (!location.hash || location.hash === "#home");
    }
    return location.pathname === link.path;
  }, [location.pathname, location.hash]);

  const handleDownloadPDF = async () => {
    const pdfUrl = "/neom-profile.pdf";
    try {
      const response = await fetch(pdfUrl);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const blob = await response.blob();
      if (blob.size === 0) throw new Error("PDF is empty");
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Neom_Hospitality_Profile.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      const fallback = document.createElement("a");
      fallback.href = pdfUrl;
      fallback.target = "_blank";
      fallback.rel = "noopener noreferrer";
      document.body.appendChild(fallback);
      fallback.click();
      document.body.removeChild(fallback);
    } finally {
      setDesktopDropdownOpen(false);
      setMobileDropdownOpen(false);
    }
  };

  // FIX: Calculate Mobile Drawer position dynamically
  const drawerStyle = {
    top: mobileOpen ? `${getHeaderHeight()}px` : '0px',
  };

  return (
    <>
      <nav
        ref={headerRef}
        className={`
          fixed left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
          ${scrolled 
              // Windows 11 Style (Floating Pill) - Applies to ALL responsive sizes
              ? `
                top-2 md:top-3 lg:top-4 
                mx-auto 
                w-[95%] md:w-[92%] lg:w-[95%] lg:max-w-7xl 
                bg-white/85 backdrop-blur-xl 
                shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] 
                border border-white/60 
                rounded-2xl md:rounded-3xl lg:rounded-[3rem]
                ` 
              // Default State (Top): Full width, pinned
              : "top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100"
          }
        `}
        aria-label="Main navigation"
      >
        {/* Inner Content Container */}
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`
              flex items-center justify-between transition-all duration-300
              ${scrolled ? "lg:py-3 py-3" : "lg:py-5 py-4"}
            `}
          >
            
            {/* Logo Area */}
            <Link 
              to="/" 
              className="flex items-center gap-2 md:gap-3 group flex-shrink-0 max-w-[70%] sm:max-w-[75%] lg:max-w-full transition-all duration-300"
            >
              <img
                src={neomLogo}
                alt="NEOM Hospitality Supplies"
                className="transition-all duration-500 h-auto object-contain flex-shrink-0"
                style={{ height: scrolled ? "38px" : "50px" }}
              />
              <div className="flex flex-col leading-tight min-w-0">
                <span className={`transition-all duration-300 text-gray-800 font-semibold truncate ${
                  scrolled ? "text-[11px] sm:text-xs md:text-sm" : "text-xs sm:text-sm md:text-lg lg:text-xl"
                }`}>
                  نيوم لمستلزمات الضيافة ذ.م.م
                </span>
                <span className={`transition-all duration-300 text-gray-600 font-medium truncate ${
                  scrolled ? "text-[10px] sm:text-[11px] md:text-xs" : "text-[10px] sm:text-xs md:text-sm lg:text-base"
                }`}>
                  Neom Hospitality Supplies LLC
                </span>
              </div>
            </Link>

            {/* Desktop Navigation (Hidden on Mobile) */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.path}
                  href={link.isHash ? `/#${link.elementId}` : link.path}
                  onClick={(e) => handleNavClick(e, link)}
                  className="relative px-3 py-2 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500 text-gray-600 hover:text-sky-700 hover:bg-sky-50"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-3 ml-2">
              
              {/* FIX: Wrapped Dropdown container to fix hover issue */}
              <div 
                className="relative"
                onMouseEnter={() => {
                  if (window.innerWidth >= 1024) {
                    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
                    setDesktopDropdownOpen(true);
                  }
                }}
                onMouseLeave={() => {
                  if (window.innerWidth >= 1024) {
                    closeTimerRef.current = setTimeout(() => setDesktopDropdownOpen(false), 200);
                  }
                }}
              >
                <Button
                  variant="outline"
                  size="default"
                  className="rounded-full h-9 px-4 border-blue-00 text-sky-700 hover:bg-sky-50 flex items-center gap-1 text-xs sm:text-sm whitespace-nowrap"
                  onClick={() => setDesktopDropdownOpen(!desktopDropdownOpen)}
                >
                  Downloads <ChevronDown className="h-3 w-3" />
                </Button>
                
                {desktopDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl shadow-xl bg-white/95 backdrop-blur-xl ring-1 ring-black ring-opacity-5 z-50 overflow-hidden border border-white/50">
                    <div className="py-1">
                      <button 
                        onClick={handleDownloadPDF} 
                        className="block w-full focus:ring-20 text-left px-4 py-3 text-sm text-gray-700 hover:bg-sky-50 transition-colors flex items-center"
                      >
                        {/* FIX: Replaced emoji with FileText icon and set color to sky-600 */}
                        <FileText className="w-4 h-4 mr-2 text-sky-600" /> 
                        Company Profile PDF
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <Button 
                variant="outline" 
                size="default" 
                asChild 
                className="rounded-full h-9 px-4 border-sky-600 text-sky-700 hover:bg-sky-50 text-xs sm:text-sm whitespace-nowrap"
              >
                <Link to="/products">View Products</Link>
              </Button>
              <Button 
                size="default" 
                asChild 
                className="rounded-full h-9 px-4 bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm whitespace-nowrap shadow-lg shadow-sky-200"
              >
                <a href="/#contact">Request Quote</a>
              </Button>
            </div>

            {/* Mobile/Tablet Menu Button */}
            <button
              className="lg:hidden p-2 -mr-2 rounded-md text-gray-600 hover:text-sky-700 hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile/Tablet Drawer */}
      <div 
        className={`
          lg:hidden fixed bg-white/95 backdrop-blur-xl 
          shadow-2xl overflow-hidden z-40
          transition-all duration-300 ease-in-out
          border border-white/50
          ${mobileOpen ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0"}
          ${scrolled 
            ? "left-1/2 -translate-x-1/2 w-[95%] rounded-2xl shadow-[0_15px_50px_-12px_rgba(0,0,0,0.15)]" 
            : "left-0 right-0 top-0 rounded-none"
          }
        `}
        style={drawerStyle}
      >
        <div className="container mx-auto px-4 sm:px-6 flex flex-col gap-1 py-4 overflow-y-auto max-h-[85vh]">
          
          <div className="flex flex-col gap-1 mb-2">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.isHash ? `/#${link.elementId}` : link.path}
                onClick={(e) => handleNavClick(e, link)}
                className={`px-4 py-3 rounded-xl text-base font-medium transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500 flex items-center justify-between ${
                  isActive(link) 
                    ? "bg-sky-50 text-sky-700 border border-sky-100" 
                    : "text-gray-700 hover:bg-gray-50 hover:text-sky-700"
                }`}
              >
                {link.label}
                {isActive(link) && <div className="w-1.5 h-1.5 rounded-full bg-sky-600" />}
              </a>
            ))}
          </div>

          {/* Mobile Downloads Dropdown */}
          <div className="border-t border-gray-100 my-2 pt-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMobileDropdownOpen(!mobileDropdownOpen);
              }}
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
              aria-expanded={mobileDropdownOpen}
            >
              <span>Downloads</span>
              <ChevronDown className={`h-5  w-5 transition-transform duration-200 ${mobileDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${mobileDropdownOpen ? "max-h-40 mt-1 opacity-100" : "max-h-0 opacity-0"}`}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownloadPDF();
                }}
                className="block w-full focus:outline-none focus:ring-0 text-left px-8 py-3 rounded-xl text-sm text-gray-600 hover:bg-sky-50 hover:text-sky-700 transition-colors flex items-center"
              >
                {/* Updated Mobile Icon to Sky Blue as well */}
                <FileText className="w-4 h-4 mr-2 text-sky-500 focus:ring-sky-500" /> 
                Company Profile PDF
              </button>
            </div>
          </div>

          {/* Mobile CTAs */}
          <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-100">
            <Button 
              variant="outline" 
              size="default" 
              asChild 
              className="rounded-xl border-sky-600 text-sky-700 h-12 text-sm font-semibold"
              onClick={() => setMobileOpen(false)}
            >
              <Link to="/products">Products</Link>
            </Button>
            <Button 
              size="default" 
              asChild 
              className="rounded-xl bg-sky-600 hover:bg-sky-700 h-12 text-sm font-semibold shadow-lg shadow-sky-200"
              onClick={() => setMobileOpen(false)}
            >
              <a href="/#contact">Request Quote</a>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;