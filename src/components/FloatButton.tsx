import { motion } from "framer-motion";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

export default function FloatingButtons() {
  return (
    <motion.div
      className="
        fixed bottom-4 right-4 z-[9999]
        flex flex-col gap-3
        md:flex-row md:gap-4
      "
      animate={{ y: [0, -6, 0] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {[
        {
          label: "Book Service",
          color: "bg-red-600",
          link: "/reach-us",
          icon: null,
        },
        {
          label: "Call",
          color: "bg-green-600",
          link: "tel:+2348121018756",
          icon: <FaPhoneAlt />,
        },
        {
          label: "WhatsApp",
          color: "bg-green-900",
          link: "https://wa.me/2348120862357",
          icon: <FaWhatsapp />,
        },
      ].map((btn) => (
        <motion.a
          key={btn.label}
          href={btn.link}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          animate={{ scale: [1, 1.04, 1] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`
            ${btn.color}
            flex items-center justify-center gap-2
            text-white font-semibold shadow-lg
            border-2 border-white
            rounded-full md:rounded-lg

            w-12 h-12
            md:w-auto md:h-auto
            md:px-6 md:py-3
          `}
          aria-label={btn.label}
        >
          {/* Icon (always visible) */}
          {btn.icon && <span className="text-lg">{btn.icon}</span>}

          {/* Text label (desktop only) */}
          <span className="hidden md:inline whitespace-nowrap">
            {btn.label}
          </span>
        </motion.a>
      ))}
    </motion.div>
  );
}
