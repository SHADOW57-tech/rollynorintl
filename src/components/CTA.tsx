import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const CTA: React.FC = () => {
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ctaRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".cta-item", {
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, ctaRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ctaRef}
      className="py-24 bg-gradient-to-r from-green-900 to-green-700 text-white"
    >
      <div className="container mx-auto px-6 text-center max-w-3xl">
        <h2 className="cta-item text-3xl md:text-4xl font-bold mb-4">
          Ready to Work with a Trusted Partner?
        </h2>

        <p className="cta-item text-lg text-gray-200 mb-8">
          Let’s bring your project to life with professionalism, reliability, and excellence.
        </p>

        <div className="cta-item flex justify-center gap-4 flex-wrap">
          <Link
            to="/reach-us"
            className="bg-white text-green-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Contact Us
          </Link>

          <Link
            to="/services"
            className="border border-white px-8 py-3 rounded-lg hover:bg-white hover:text-green-800 transition"
          >
            View Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
