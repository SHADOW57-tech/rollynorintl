import { motion } from "framer-motion";
import { FaWhatsapp , FaPhoneAlt } from "react-icons/fa";

export default function FloatingButtons() {
  return (
    <motion.div
      className="
        fixed bottom-6 right-6 z-[9999]
        flex flex-row gap-3 ml-3
        sm:flex-row md:gap-4
      "
      animate={{ y: [0, -6, 0] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {[
        { label: "Book Service", color: "bg-red-600", link: "/book" },
        { icon: <FaPhoneAlt />, label: "Call Now", color: "bg-green-600", link: "tel:+2348121018756" },
        {
          icon: <FaWhatsapp />,
          label: "WhatsApp",
          color: "bg-green-900",
          link: "https://wa.me/2348120862357",
        },
      ].map((btn) => (
        <motion.a
          key={btn.label}
          href={btn.link}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          animate={{ scale: [1, 1.04, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`${btn.color} flex items-center gap-2 bg-green-800 text-white px-6 py-3 rounded-lg border-2 border-white font-semibold whitespace-nowrap block shadow-lg mt-4`}
        >
          {btn.icon} {btn.label}
        </motion.a>
      ))}
    </motion.div>
  );
}
