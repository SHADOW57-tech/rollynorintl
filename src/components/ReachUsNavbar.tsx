import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const ReachUsNavbar: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!navRef.current) return;

    gsap.from(navRef.current, {
      // y: -60,
      // opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full bg-white shadow-md z-50"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO / TITLE */}
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer text-lg md:text-xl font-bold text-green-800"
        >
          ROLLYMOR HTH GEMS
        </div>

        {/* BACK HOME */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-green-800 font-medium px-4 py-2 rounded-lg border border-green-800
                     hover:bg-green-800 hover:text-white transition active:scale-95"
        >
          <FaArrowLeft />
          Back to Home
        </button>
      </div>
    </nav>
  );
};

export default ReachUsNavbar;
