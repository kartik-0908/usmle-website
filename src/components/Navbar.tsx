import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowRight } from "lucide-react";

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

  const handleSignIn = () => {
    window.open("https://dashboard.stepgenie.app/sign-in", "_blank");
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
            <img 
              src="/logo-new.png" 
              alt="Step Genie" 
              className="h-8 w-auto sm:h-10 md:h-16 transition-all duration-300"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-8">
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
            </nav>

            {/* Desktop Sign In Button */}
            <button
              onClick={handleSignIn}
              className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:from-blue-700 hover:to-green-700"
              style={{
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <div className="relative flex items-center justify-center">
                Sign In
                <ArrowRight className="ml-1.5 w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </button>
          </div>

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
        {/* Header area in mobile menu */}
        {/* <div className="flex items-center px-4 sm:px-6 py-4 border-b border-gray-200">
          <a
            href="#"
            className="flex items-center space-x-2"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
            aria-label="Step Genie"
          >
            <img 
              src="/logo-new.png" 
              alt="Step Genie" 
              className="h-8 w-auto transition-all duration-300"
            />
          </a>
        </div> */}

        {/* Navigation links */}
        <nav className="flex flex-col space-y-2 px-4 sm:px-6 py-16">
          <a
            href="#"
            className="text-xl font-medium py-4 px-4 w-full text-left rounded-lg hover:bg-gray-100 transition-colors text-gray-900"
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
            className="text-xl font-medium py-4 px-4 w-full text-left rounded-lg hover:bg-gray-100 transition-colors text-gray-900"
            onClick={closeMenu}
          >
            How It Works
          </a>
        </nav>

        {/* Sign In button in mobile menu */}
        <div className="px-4 sm:px-6 py-4 mt-auto">
          <button 
            onClick={handleSignIn}
            className="group relative overflow-hidden w-full bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:from-blue-700 hover:to-green-700"
            style={{
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <div className="relative flex items-center justify-center">
              Sign In to Dashboard
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </div>
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