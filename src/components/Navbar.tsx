import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { name: "Hero", id: "hero" },
  { name: "About", id: "about" },
  { name: "Services", id: "services" },
  { name: "Contact", id: "contact" },
];

const Navbar: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();

  /* =============================
     NAVBAR ENTRANCE (GSAP)
  ============================== */
  useEffect(() => {
    if (!navRef.current) return;

    gsap.from(navRef.current, {
      // y: -40,
      // opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    });
  }, []);

  /* =============================
     MOBILE MENU ANIMATION
  ============================== */
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isOpen) {
      gsap.to(mobileMenuRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.from(".mobile-link", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.3,
        delay: 0.1,
      });
    } else {
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, [isOpen]);

  /* =============================
     SCROLL TO SECTION + HASH
  ============================== */
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;

    window.history.pushState(null, "", `#${id}`);

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  /* =============================
     ACTIVE LINK WHILE SCROLLING
  ============================== */
 useEffect(() => {
  const sections = document.querySelectorAll("section[id]");

  const triggers = Array.from(sections).map((section) =>
    ScrollTrigger.create({
      trigger: section,
      start: "top 40%",
      end: "bottom 40%",
      onToggle: (self) => {
        if (self.isActive) {
          setActiveSection(section.id);
        }
      },
    })
  );

  return () => triggers.forEach((t) => t.kill());
}, []);



  /* =============================
     AUTO SCROLL IF URL HAS HASH
  ============================== */
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => scrollToSection(id), 200);
    }
  }, [location]);

  return (
    <nav
      ref={navRef}
      className="sticky top-0 left-0 w-full bg-white shadow-md z-50"
    >
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <span
          onClick={() => scrollToSection("#home")}
          className="cursor-pointer text-xl font-bold text-green-800"
        >
          ROLLYMOR HTH GEMS
        </span>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <li key={link.id} className="relative group">
              <button
                onClick={() => scrollToSection(link.id)}
                className={`transition font-medium ${
                  activeSection === link.id
                    ? "text-green-800"
                    : "text-gray-700 hover:text-green-700"
                }`}
              >
                {link.name}
              </button>

              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-green-700 transition-all duration-300 ${
                  activeSection === link.id
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              />
            </li>
          ))}
        </ul>
       
         <motion.a
                
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                 
                >
                  <button
          onClick={() => scrollToSection("contact")}
          className="hidden md:block bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-900 transition border-4 border-black font-semibold whitespace-nowrap block"
        >
          <Link to="/reach-us">How to Reach Us</Link>

        </button>
                </motion.a>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1"
        >
          <span className="w-6 h-[2px] bg-gray-800" />
          <span className="w-6 h-[2px] bg-gray-800" />
          <span className="w-6 h-[2px] bg-gray-800" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="md:hidden overflow-hidden h-0 opacity-0 bg-white px-6"
      >
        <ul className="flex flex-col gap-4 py-6">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => {
                  scrollToSection(link.id);
                  setIsOpen(false);
                }}
                className={`mobile-link text-lg font-medium text-left ${
                  activeSection === link.id
                    ? "text-green-800"
                    : "text-gray-700"
                }`}
              >
                {link.name}
              </button>
            </li>
          ))}
        </ul>

         <motion.a
                
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                 
                >
                  <button
          onClick={() => scrollToSection("contact")}
          className="hidden md:block bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-900 transition border-4 border-black font-semibold whitespace-nowrap block"
        >
          <Link to="/reach-us">How to Reach Us</Link>

        </button>
                </motion.a>
      </div>
    </nav>
  );
};

export default Navbar;
