import { motion } from "framer-motion";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

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
      {/* BOOK SERVICE → INTERNAL ROUTE */}
      <motion.div
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        animate={{ scale: [1, 1.04, 1] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Link
          to="/reach-us"
          className="
            bg-red-600
            flex items-center justify-center gap-2
            text-white font-semibold shadow-lg
            border-2 border-white
            rounded-full md:rounded-lg
            w-12 h-12
            md:w-auto md:h-auto
            md:px-6 md:py-3
          "
          aria-label="Book Service"
        >
          <span className="hidden md:inline whitespace-nowrap">
            Book Service
          </span>
        </Link>
      </motion.div>

      {/* CALL → EXTERNAL */}
      <motion.a
        href="tel:+2348120862357"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="
          bg-green-600
          flex items-center justify-center gap-2
          text-white font-semibold shadow-lg
          border-2 border-white
          rounded-full md:rounded-lg
          w-12 h-12
          md:w-auto md:h-auto
          md:px-6 md:py-3
        "
      >
        <FaPhoneAlt className="text-lg" />
        <span className="hidden md:inline">Call</span>
      </motion.a>

      {/* WHATSAPP → EXTERNAL */}
      <motion.a
        href="https://wa.me/2348120862357"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="
          bg-green-900
          flex items-center justify-center gap-2
          text-white font-semibold shadow-lg
          border-2 border-white
          rounded-full md:rounded-lg
          w-12 h-12
          md:w-auto md:h-auto
          md:px-6 md:py-3
        "
      >
        <FaWhatsapp className="text-lg" />
        <span className="hidden md:inline">WhatsApp</span>
      </motion.a>
    </motion.div>
  );
}
