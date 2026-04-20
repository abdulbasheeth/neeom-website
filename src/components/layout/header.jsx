import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../Ui/button";
import { Menu, X } from "lucide-react";
import neomLogo from "../../assets/arabic&englishlogo.jpg";

const navLinks = [
  { label: "Home", path: "/", isHash: false },
  { label: "About", path: "/about", isHash: true, elementId: "about" },
  { label: "Products", path: "/products", isHash: false },
  { label: "Contact", path: "/contact", isHash: true, elementId: "contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = async (e, link) => {
    e.preventDefault();
    setMobileOpen(false);

    if (link.isHash) {
      if (location.pathname !== '/') {
        navigate(`/#${link.elementId}`);
      } else {
        const element = document.getElementById(link.elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          navigate(`/#${link.elementId}`, { replace: true });
        }
      }
    } else {
      if (link.path === '/') {
        navigate('/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate(link.path);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const isActive = (link) => {
    if (link.isHash) {
      if (location.pathname === '/') {
        return location.hash === `#${link.elementId}`;
      }
      return false;
    } else {
      if (link.path === '/') {
        return location.pathname === '/' && (!location.hash || location.hash === '#home');
      }
      return location.pathname === link.path;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Main header bar */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? // When scrolled: responsive margins, 30px top margin, rounded corners, white bg, glow effect
              "mx-4 md:mx-[80px] mt-[0] rounded-4xl bg-white shadow-[0_20px_35px_-12px_rgba(0,0,0,0.3),0_0_15px_3px_rgba(2,136,209,0.4)] border-transparent"
            : `border-b ${
                location.pathname === '/'
                  ? "bg-transparent border-transparent"
                  : "bg-white border-gray-100 shadow-sm"
              }`
        }`}
      >
        <div className="container mx-auto flex items-center justify-between py-1 px-4">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 relative z-10 flex-shrink-0">
            <div className="p-1">
              <img
                src={neomLogo}
                alt="NEOM Hospitality Supplies"
                className="h-12 md:h-16 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.path}
                href={link.isHash ? `/#${link.elementId}` : link.path}
                onClick={(e) => handleNavClick(e, link)}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
                  isActive(link)
                    ? "bg-sky-50 text-sky-700"
                    : "text-gray-600 hover:text-sky-700 hover:bg-sky-50"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              asChild 
              className="rounded-full px-5 border-sky-600 text-sky-700 hover:bg-sky-50 hover:text-sky-800"
            >
              <Link to="/products">View Products</Link>
            </Button>
            <Button 
              size="sm" 
              asChild 
              className="rounded-full px-5 shadow-lg bg-sky-600 hover:bg-sky-700 text-white shadow-sky-600/20"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(e, { isHash: true, elementId: "contact", path: "/contact" });
              }}
            >
              <a href="/#contact">Request Quote</a>
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-sky-50 transition-colors text-gray-700"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu - aligns with same margins and 30px top margin when scrolled */}
      <div
        className={`md:hidden absolute bg-white border-b shadow-xl transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        } ${
          scrolled 
            ? "mx-[20px] mt-[30px] rounded-b-3xl"   // 30px top margin when scrolled
            : "w-full"
        }`}
      >
        <div className="container mx-auto py-4 flex flex-col gap-1 px-4">
          {navLinks.map((link) => (
            <a
              key={link.path}
              href={link.isHash ? `/#${link.elementId}` : link.path}
              onClick={(e) => handleNavClick(e, link)}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                isActive(link)
                  ? "bg-sky-50 text-sky-700"
                  : "text-gray-600 hover:bg-sky-50 hover:text-sky-700"
              }`}
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-2 pt-4 mt-2 border-t">
            <Button variant="outline" size="sm" asChild className="flex-1 rounded-lg border-sky-600 text-sky-700">
              <Link to="/products" onClick={() => setMobileOpen(false)}>View Products</Link>
            </Button>
            <Button size="sm" asChild className="flex-1 rounded-lg bg-sky-600 hover:bg-sky-700">
              <a href="/#contact" onClick={(e) => {
                e.preventDefault();
                handleNavClick(e, { isHash: true, elementId: "contact", path: "/contact" });
                setMobileOpen(false);
              }}>Request Quote</a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;