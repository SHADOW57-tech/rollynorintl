import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoCarousel from "./VideoCarousel";

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!aboutRef.current) return;

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
    <section ref={aboutRef} className="py-20 bg-white">
      <h2 className="about-item text-3xl font-bold text-green-800 text-center mb-6">
        About Us
      </h2>
      <div className="container mx-auto px-6  gap-12 items-center">
        <div>
          <p className="about-item text-gray-700 text-lg text-center mb-6">
            Rollynor Intl Gems is a CAC-registered Nigerian company providing
            professional services in construction, ICT solutions, farming, and
            general contracting.
          </p>

          <p className="about-item text-gray-600 text-center mb-10">
            We are committed to delivering quality, reliability, and excellence
            across every project we handle.
          </p>

          <div className="about-item flex justify-center">
            <div className="bg-green-800 text-white px-6 py-3 rounded-xl shadow-md">
              CAC Registered • Est. 2023
            </div>
          </div>
        </div>
        {/* Video */}
<div className="about-item mt-12 flex justify-center max-w-xl items-center mx-auto">
  {/* <video
    className=" w-full 
    max-w-xl 
    aspect-video 
    object-cover 
    rounded-2xl 
    shadow-2xl max-h-2xl"
    controls
    muted
    playsInline
    poster="/videos/about-poster.jpg"
  >
    <source src="/src/assets/poolvid.mp4" type="video/mp4" />
    Your browser does not support the video tag. */}
  {/* </video> */}
  <VideoCarousel
   className="max-w-xl"
  />
</div>

      </div>
    </section>
  );
};

export default About;
