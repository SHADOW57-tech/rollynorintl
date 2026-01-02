import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".footer-item", {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="bg-gray-900 text-gray-300 pt-16 pb-8"
    >
      <div className="container mx-auto px-6 grid gap-10 md:grid-cols-4">
        
        {/* Company */}
        <div className="footer-item">
          <h3 className="text-xl font-bold text-white mb-4">
            Rollynor Intl Gems
          </h3>
          <p className="text-sm text-gray-400">
            A CAC-registered Nigerian company delivering excellence in
            construction, ICT, farming, and general contracting.
          </p>
        </div>

        {/* Services */}
        <div className="footer-item">
          <h4 className="text-lg font-semibold text-white mb-4">
            Services
          </h4>
          <ul className="space-y-2 text-sm">
            <li>Construction Works</li>
            <li>ICT Services</li>
            <li>Farming & Agriculture</li>
            <li>General Contracting</li>
            <li>Jewelry & Accessories</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="footer-item">
          <h4 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/services" className="hover:text-white">Services</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-item">
          <h4 className="text-lg font-semibold text-white mb-4">
            Contact
          </h4>
          <p className="text-sm">📍 Nigeria</p>
          <p className="text-sm">📞 +234 XXX XXX XXXX</p>
          <p className="text-sm">✉ info@rollynorgems.com</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Rollynor Intl Gems. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
