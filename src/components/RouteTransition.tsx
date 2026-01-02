import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import PageLoader from "./PageLoader";
import { useNavigationDirection } from "../context/NavigationContext";

interface Props {
  children: React.ReactNode;
}

const RouteTransition: React.FC<Props> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { getDirection } = useNavigationDirection();

  useEffect(() => {
    const direction = getDirection(location.pathname);
    const fromX = direction === 1 ? "100%" : "-100%";

    const tl = gsap.timeline();

    // Loader IN
    tl.set(loaderRef.current, { y: "100%" })
      .to(loaderRef.current, {
        y: "0%",
        duration: 0.5,
        ease: "power4.out",
      })

      // Page IN
      .fromTo(
        containerRef.current,
        { x: fromX, opacity: 0 },
        {
          x: "0%",
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        }
      )

      // Loader OUT
      .to(loaderRef.current, {
        y: "-100%",
        duration: 0.5,
        ease: "power4.in",
      });

  }, [location.pathname]);

  return (
    <>
      <PageLoader ref={loaderRef} />
      <div ref={containerRef}>{children}</div>
    </>
  );
};

export default RouteTransition;
