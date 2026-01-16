import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoCarousel from "./VideoCarousel";

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!aboutRef.current) return;

    // Disable GSAP on small screens
    if (window.innerWidth < 640) return;

    const ctx = gsap.context(() => {
      gsap.from(".about-item", {
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={aboutRef} className="py-14 md:py-20 bg-white">
      <h2 className="about-item text-2xl md:text-3xl font-bold text-green-800 text-center mb-6">
        About Us
      </h2>

      <div
        className="
          container 
          mx-auto 
          px-4 
          md:px-6
          grid 
          grid-cols-1 
          gap-12 
          items-center
        "
      >
        {/* TEXT */}
        <div>
          <p className="about-item text-gray-700 text-base md:text-lg text-center lg:text-left mb-6">
            Rollymor hth Gems RC is a CAC-registered Nigerian company providing
            professional services in construction, ICT solutions, farming, and
            general contracting.
          </p>

          <p className="about-item text-gray-600 text-center lg:text-left mb-8">
            We are committed to delivering quality, reliability, and excellence
            across every project we handle.
          </p>

          <div className="about-item flex justify-center lg:justify-start">
            <div className="bg-green-800 text-white px-6 py-3 rounded-xl shadow-md text-sm md:text-base">
              CAC Registered • Est. 2017
            </div>
          </div>
        </div>

        {/* VIDEO */}
        <div className="about-item w-full">
          <VideoCarousel />
        </div>
      </div>
    </section>
  );
};

export default About;
