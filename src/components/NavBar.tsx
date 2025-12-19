import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-amber bg-opacity-95 shadow-md py-3" : "py-5"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-playfair font-bold text-charcoal">
            <span className="text-pistachio"><a href="Hero">Ahmed Hassan</a></span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {["about", "projects", "services", "Experience"].map(
              (section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="font-inter text-charcoal hover:text-pistachio transition-colors capitalize"
                >
                  {section}
                </button>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-charcoal" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-amber absolute left-0 right-0 py-4 px-6 shadow-lg">
            <div className="flex flex-col space-y-4">
              {["about", "projects", "services", "Experience"].map(
                (section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="font-inter text-charcoal hover:text-pistachio transition-colors text-left capitalize py-2"
                  >
                    {section}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
