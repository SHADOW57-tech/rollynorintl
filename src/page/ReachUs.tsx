import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import emailjs from "@emailjs/browser";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCheckCircle,
} from "react-icons/fa";
import ReachUsNavbar from "../components/ReachUsNavbar";

gsap.registerPlugin(ScrollTrigger);

const ReachUs: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const mapPinRef = useRef<HTMLDivElement | null>(null);
  const iconsRef = useRef<HTMLAnchorElement[]>([]);
  const formRef = useRef<HTMLFormElement | null>(null);

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ---------------- PAGE + SCROLL ---------------- */
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power2.out",
      });

      gsap.from(".reveal", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: "power3.out",
      });

      /* ICON PULSE */
      iconsRef.current.forEach((icon) => {
        gsap.to(icon, {
          scale: 1.1,
          boxShadow: "0 0 20px rgba(34,197,94,.8)",
          repeat: -1,
          yoyo: true,
          duration: 1.5,
          ease: "power1.inOut",
        });
      });

      /* MAP PIN BOUNCE */
      if (mapPinRef.current) {
        gsap.to(mapPinRef.current, {
          y: -12,
          repeat: -1,
          yoyo: true,
          duration: 0.9,
          ease: "power1.inOut",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* TAP FEEDBACK */
  const tapDown = (el: HTMLElement) =>
    gsap.to(el, { scale: 0.94, duration: 0.1 });
  const tapUp = (el: HTMLElement) =>
    gsap.to(el, { scale: 1, duration: 0.15 });

  /* EMAIL SUBMIT */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setLoading(true);

    emailjs
      .sendForm(
        "service_z1iahzl",
        "template_yi46rdu",
        formRef.current,
        "78R9y54n59q051Vns"
      )
      .then(() => {
        setSuccess(true);
        setLoading(false);

        gsap.fromTo(
          ".success-box",
          { scale: 0.6, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
        );
      })
      .catch(() => setLoading(false));
  };

  return (
    <>
      <ReachUsNavbar />

      <section ref={sectionRef} className="min-h-screen py-24 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* HEADER */}
          <div className="text-center mb-16 reveal">
            <h1 className="text-4xl md:text-5xl font-bold text-green-800">
              How to Reach Us
            </h1>
            <p className="mt-4 text-gray-600 text-lg">
              We’re always available to respond.
            </p>
          </div>

          {/* QUICK ACTIONS */}
          <div className="flex flex-wrap justify-center gap-4 mb-20 reveal">
            {[
              {
                icon: <FaPhoneAlt />,
                label: "Call Us",
                href: "tel:+2348120862357",
              },
              {
                icon: <FaWhatsapp />,
                label: "WhatsApp",
                href: "https://wa.me/2348120862357",
              },
              {
                icon: <FaEnvelope />,
                label: "Email",
                href: "mailto:rollynorintl@gmail.com",
              },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                ref={(el) => {
                  if (el) {
                    iconsRef.current[i] = el;
                  }
                }}
                onTouchStart={(e) => tapDown(e.currentTarget)}
                onTouchEnd={(e) => tapUp(e.currentTarget)}
                className="flex items-center gap-2 bg-green-800 text-white px-6 py-3 rounded-lg"
              >
                {item.icon} {item.label}
              </a>
            ))}
          </div>

          {/* CONTENT */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            {/* FORM */}
            <div className="bg-white rounded-xl shadow-md p-8 reveal">
              <h2 className="text-2xl font-bold text-green-800 mb-6">
                Send Us a Message
              </h2>

              {!success ? (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {["name", "email"].map((field) => (
                    <input
                      key={field}
                      name={field}
                      placeholder={
                        field === "name" ? "Full Name" : "Email"
                      }
                      className="w-full border rounded-lg px-4 py-3 transition focus:ring-2 focus:ring-green-700 focus:scale-[1.02]"
                      required
                    />
                  ))}

                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Your Message"
                    className="w-full border rounded-lg px-4 py-3 transition focus:ring-2 focus:ring-green-700 focus:scale-[1.02]"
                    required
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-800 text-white px-6 py-3 rounded-lg w-full hover:bg-green-900 transition"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              ) : (
                <div className="success-box text-center text-green-800">
                  <FaCheckCircle className="mx-auto text-5xl mb-4" />
                  <h3 className="text-2xl font-bold">Message Sent!</h3>
                </div>
              )}
            </div>

            {/* MAP */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden reveal relative">
              <div
                ref={mapPinRef}
                className="absolute top-6 left-1/2 -translate-x-1/2 text-green-700 text-4xl z-10"
              >
                <FaMapMarkerAlt />
              </div>

              <iframe
                title="Google Map"
                src="https://www.google.com/maps?q=Lagos,Nigeria&output=embed"
                className="w-full h-[350px]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ReachUs;
