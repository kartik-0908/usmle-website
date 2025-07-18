import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent background scrolling when menu is open
    document.body.style.overflow = !isMenuOpen ? "hidden" : "";
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "";
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Close mobile menu if open
    if (isMenuOpen) {
      closeMenu();
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 py-2 sm:py-3 md:py-4 transition-all duration-300",
          isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
        )}
      >
        <div className="container flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <a
            href="#"
            className="flex items-center space-x-2"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
            aria-label="Step Genie"
          >
            <span className="text-xl font-bold tracking-tight text-gray-900">
              STEP GENIE
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="#"
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
            >
              Home
            </a>
            <a href="#features" className="nav-link">
              How It Works
            </a>
            {/* <a href="#pricing" className="nav-link">
              Pricing
            </a> */}
          </nav>

          {/* Mobile menu button - increased touch target */}
          <button
            className="md:hidden text-gray-700 p-3 focus:outline-none relative z-50"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation - improved for better touch experience */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-white flex flex-col md:hidden transition-all duration-300 ease-in-out",
          isMenuOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-full pointer-events-none"
        )}
      >
        {/* Header area in mobile menu - just logo, no close button */}
        <div className="flex items-center px-4 sm:px-6 py-4 border-b">
          <a
            href="#"
            className="flex items-center space-x-2"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
            aria-label="Step Genie"
          >
            <span className="text-xl font-bold tracking-tight text-white">
              STEP GENIE
            </span>
          </a>
        </div>

        {/* Navigation links */}
        <nav className="flex flex-col space-y-2 px-4 sm:px-6 py-8">
          <a
            href="#"
            className="text-xl font-medium py-4 px-4 w-full text-left rounded-lg hover:bg-gray-100 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
              closeMenu();
            }}
          >
            Home
          </a>
          <a
            href="#features"
            className="text-xl font-medium py-4 px-4 w-full text-left rounded-lg hover:bg-gray-100 transition-colors"
            onClick={closeMenu}
          >
            How It Works
          </a>
          {/* <a
            href="#pricing"
            className="text-xl font-medium py-4 px-4 w-full text-left rounded-lg hover:bg-gray-100 transition-colors"
            onClick={closeMenu}
          >
            Pricing
          </a> */}
        </nav>

        {/* CTA button in mobile menu */}
        <div className="px-4 sm:px-6 py-4 mt-auto">
          <button 
            className="w-full bg-gradient-to-r from-pulse-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
            onClick={closeMenu}
          >
            Join the Waitlist
          </button>
        </div>
      </div>

      {/* Backdrop overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={closeMenu}
        />
      )}
    </>
  );
};

export default Navbar;