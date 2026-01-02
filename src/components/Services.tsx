import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services } from "../data/servicesData";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Services: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      /* Scroll reveal */
      gsap.from(".service-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });

      /* Hover animations */
      const cards = gsap.utils.toArray<HTMLElement>(".service-card");

      cards.forEach((card) => {
        const button = card.querySelector(".learn-more");

        // Initial state
        gsap.set(button, {
          opacity: 0,
          y: 20,
          pointerEvents: "none",
        });

        const hoverTl = gsap.timeline({ paused: true });

        hoverTl
          .to(card, {
            y: -10,
            scale: 1.03,
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
            duration: 0.5,
            ease: "power2.out",
          })
          .to(
            button,
            {
              opacity: 1,
              y: 0,
              pointerEvents: "auto",
              duration: 0.5,
              ease: "power2.out",
            },
            "-=0.15"
          );

        card.addEventListener("mouseenter", () => hoverTl.play());
        card.addEventListener("mouseleave", () => hoverTl.reverse());
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-12">
          Our Services
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card bg-white p-6 rounded-2xl shadow-lg cursor-pointer"
            >
              <div className="mb-4">
  {service.image ? (
    <img
      src={service.image}
      alt={service.title}
      className="w-full h-60 object-cover rounded-xl"
    />
  ) : (
    <div className="text-4xl">{service.icon}</div>
  )}
</div>

              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>

              {/* Learn More (hidden until hover) */}
              <button className="learn-more mt-6 w-full bg-green-900 text-white font-semibold py-2 rounded-xl"
              
              >
                <Link to="/reach-us">Learn More</Link>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
