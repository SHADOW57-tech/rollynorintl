import { gsap } from "gsap";

export const hoverScale = (el: HTMLElement) => {
  gsap.to(el, {
    scale: 1.05,
    duration: 0.2,
    ease: "power2.out",
  });
};

export const hoverReset = (el: HTMLElement) => {
  gsap.to(el, {
    scale: 1,
    duration: 0.2,
    ease: "power2.out",
  });
};
