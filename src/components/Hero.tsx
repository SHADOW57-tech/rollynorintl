import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { hoverScale, hoverReset } from "../hooks/useHoverScale";
import buildingVid from "/videos/buildingvid.mp4";


const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".hero-title", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".hero-text", {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });

      gsap.from(".hero-btn", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
  ref={heroRef}
  className="relative h-[80vh] flex items-center text-white"
>
  {/* Background Image */}
<video
  autoPlay
  muted
  loop
  playsInline
  className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
>
  <source src={buildingVid} type="video/mp4" />
</video>

<div className="absolute inset-0 bg-green-900/50 z-10 pointer-events-none"></div>

<div className="relative z-20 container mx-auto px-6 max-w-4xl">
  <h1 className="hero-title text-4xl md:text-5xl font-bold leading-tight">
    Reliable Solutions in <br />
    Construction, ICT
    <strong className="text-black">
      {" "}
      Farming & General Contracts
    </strong>
  </h1>

  <p className="hero-text mt-4 text-lg text-gray-200">
    Your trusted CAC-registered partner delivering excellence across Nigeria.
  </p>

  <div className="mt-6 flex gap-4">
    <button
      className="hero-btn bg-white text-green-800 px-6 py-3 rounded-lg border-4 border-black font-semibold"
      onMouseEnter={(e) => hoverScale(e.currentTarget)}
      onMouseLeave={(e) => hoverReset(e.currentTarget)}
    >
      Request a Service
    </button>

    <button
      className="hero-btn border-2 border-white px-6 py-3 rounded-lg"
      onMouseEnter={(e) => hoverScale(e.currentTarget)}
      onMouseLeave={(e) => hoverReset(e.currentTarget)}
    >
      Contact Us
    </button>
  </div>
</div>
</section>

  );
};

export default Hero;
