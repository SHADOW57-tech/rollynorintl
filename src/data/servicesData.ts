import poolone from "../assets/poolimgone.jpeg";
import pooltwo from "../assets/poolimgtwo.jpeg";
import poolthree from "../assets/poolimgthree.jpeg";

export interface Service {
  title: string;
  description: string;
  image?: string;
  icon?: string;
}

export const services: Service[] = [
  {
    title: "Construction Works",
    description: "Professional building and infrastructure solutions swimming pools construction swervice steel fabrication and installation.",
    image: poolone,
  },
  {
    title: "Farming & Agriculture",
    description: "Modern and sustainable agricultural services.",
    image: pooltwo,
  },
  {
    title: "General Contracting",
    description: "Reliable contracting services across various sectors.",
    image: poolthree,
  },
  {
    title: "ICT Services",
    description: "Technology solutions for modern businesses.",
    image: "💻",
  },
  {
    title: "Jewelry & Accessories",
    description: "Quality jewelry and fashion accessories.",
    image: "💎",
  },
  {
    title: "mining and quarrying",
    description: "Efficient and safe mining operations.",
    icon: "⛏️",
  }
];
