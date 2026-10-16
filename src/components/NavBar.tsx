import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import "./NavBar.css";

const NAV_ITEMS = [
  { id: "hero",       num: "01", label: "Home" },
  { id: "about",      num: "02", label: "About" },
  { id: "projects",   num: "03", label: "Projects" },
  { id: "services",   num: "04", label: "Services" },
  { id: "experience", num: "05", label: "Experience" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/hamoki._?igsh=cnQ5MG1ydjQzdmNu" },
];

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const svgPathRef     = useRef<SVGPathElement>(null);
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const menuLinksRef   = useRef<(HTMLButtonElement | null)[]>([]);
  const menuFooterRef  = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);

  // Initial flat closed path, open curved & flat paths, close curved path
  const pathStart  = "M 0 0 V 0 Q 50 0 100 0 V 0 Z";
  const pathCurve1 = "M 0 0 V 100 Q 50 135 100 100 V 0 Z";
  const pathFlat   = "M 0 0 V 100 Q 50 100 100 100 V 0 Z";
  const pathCurve2 = "M 0 0 V 0 Q 50 -35 100 0 V 0 Z";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        closeMenuAnimation();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  // GSAP Opening and Closing Animation for Mobile Fullscreen SVG Menu
  const openMenuAnimation = () => {
    if (!svgPathRef.current || !menuOverlayRef.current) return;
    isAnimatingRef.current = true;

    // Prevent body scroll
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });

    // 1. Morph SVG Path from top to curved wave, then snap flat full-screen
    tl.set(svgPathRef.current, { attr: { d: pathStart } })
      .to(svgPathRef.current, {
        duration: 0.45,
        attr: { d: pathCurve1 },
        ease: "power2.in",
      })
      .to(svgPathRef.current, {
        duration: 0.4,
        attr: { d: pathFlat },
        ease: "power4.out",
      });

    // 2. Staggered reveal for menu links & numbers
    const validLinks = menuLinksRef.current.filter(Boolean);
    tl.to(
      validLinks,
      {
        y: "0%",
        opacity: 1,
        duration: 0.65,
        stagger: 0.08,
        ease: "power3.out",
      },
      "-=0.35"
    );

    // 3. Reveal menu footer / socials
    if (menuFooterRef.current) {
      tl.to(
        menuFooterRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.3"
      );
    }
  };

  const closeMenuAnimation = (onDone?: () => void) => {
    if (!svgPathRef.current || !menuOverlayRef.current) return;
    isAnimatingRef.current = true;

    // Restore body scroll
    document.body.style.overflow = "";

    const tl = gsap.timeline({
      onComplete: () => {
        setIsMenuOpen(false);
        isAnimatingRef.current = false;
        if (onDone) onDone();
      },
    });

    const validLinks = menuLinksRef.current.filter(Boolean);

    // 1. Fade out links & footer quickly
    tl.to([validLinks, menuFooterRef.current], {
      y: "-30%",
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
    });

    // 2. Morph SVG Path upwards
    tl.to(svgPathRef.current, {
      duration: 0.4,
      attr: { d: pathCurve2 },
      ease: "power2.in",
    }).to(svgPathRef.current, {
      duration: 0.35,
      attr: { d: pathStart },
      ease: "power4.out",
    });
  };

  const toggleMenu = () => {
    if (isAnimatingRef.current) return;

    if (!isMenuOpen) {
      setIsMenuOpen(true);
      setTimeout(() => {
        openMenuAnimation();
      }, 10);
    } else {
      closeMenuAnimation();
    }
  };

  const handleNavClick = (id: string) => {
    if (isMenuOpen) {
      closeMenuAnimation(() => {
        scrollToSection(id);
      });
    } else {
      scrollToSection(id);
    }
  };

  const scrollToSection = (id: string) => {
    const target =
      id === "hero"
        ? document.body
        : document.getElementById(id.toLowerCase()) ||
          document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ── Desktop & Mobile Header Bar ────────────────────────────── */}
      <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-3xl transition-all duration-500">
        <div
          className={`transition-all duration-500 flex items-center ${
            isMenuOpen
              ? "justify-end bg-transparent border-transparent shadow-none p-0"
              : `rounded-full px-6 py-3.5 md:px-8 md:py-3.5 shadow-2xl justify-between backdrop-blur-md border ${
                  isScrolled
                    ? "bg-black/90 text-white border-white/15"
                    : "bg-[#f4efe9]/95 text-[#111111] border-black/10 shadow-lg"
                }`
          }`}
        >
          {/* Logo */}
          {!isMenuOpen && (
            <button
              onClick={() => handleNavClick("hero")}
              className={`text-lg md:text-xl font-bold lowercase tracking-tight transition-colors duration-300 ${
                isScrolled ? "text-white" : "text-[#111111]"
              } hover:opacity-80`}
            >
              ahmed hassan
            </button>
          )}

          {/* Desktop Links (Kept exactly as original) */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.filter((item) => item.id !== "hero").map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm font-medium transition-colors duration-300 ${
                  isScrolled
                    ? "text-white/90 hover:text-white"
                    : "text-[#333333] hover:text-black"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Animated 3-Line Hamburger / Close Button */}
          <button
            onClick={toggleMenu}
            className={`md:hidden nav-burger-btn ${isMenuOpen ? "is-active text-white" : isScrolled ? "text-white" : "text-[#111111]"}`}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <span className="burger-bar" />
            <span className="burger-bar" />
            <span className="burger-bar" />
          </button>
        </div>
      </nav>

      {/* ── Mobile Fullscreen SVG Overlay Navigation Menu ───────────── */}
      <div
        ref={menuOverlayRef}
        onClick={(e) => {
          if (e.target === menuOverlayRef.current) {
            closeMenuAnimation();
          }
        }}
        className={`md:hidden mobile-nav-overlay ${isMenuOpen ? "is-open" : ""}`}
      >
        {/* SVG Curved Path Morph Background */}
        <svg
          className="mobile-menu-svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path ref={svgPathRef} d={pathStart} />
        </svg>

        {/* Menu Links */}
        <div className="mobile-menu-content">
          {NAV_ITEMS.map((item, index) => (
            <div key={item.id} className="mobile-menu-link-wrapper">
              <button
                ref={(el) => { menuLinksRef.current[index] = el; }}
                onClick={() => handleNavClick(item.id)}
                className="mobile-menu-link"
              >
                <span className="mobile-menu-link-num">{item.num}</span>
                <span>{item.label}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Menu Footer / Social Links */}
        <div ref={menuFooterRef} className="mobile-menu-footer">
          <div className="mobile-menu-socials">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="mobile-menu-social-link"
              >
                {s.label}
              </a>
            ))}
          </div>
          <p className="mobile-menu-contact-email">
            contact@ahmedhassan.com
          </p>
        </div>
      </div>
    </>
  );
};

export default NavBar;
