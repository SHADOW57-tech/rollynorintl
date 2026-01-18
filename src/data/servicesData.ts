import poolthree from "../assets/poolimgthree.jpeg";
import minegt from "../assets/minegt.png"
import constimg from "../assets/constimg.png";
import farmimg from "../assets/farmimg.png"
import necklace from "../assets/goldnecklace.jpg"
import ictimg from "../assets/ictimg.jpg"

export interface Service {
  title: string;
  description: string;
  image?: string;
  icon?: string;
}

export const services: Service[] = [
  {
    title: "Construction Works",
    description: "Professional building and infrastructure solutions swimming pools construction service steel fabrication and installation.",
    image: constimg,
  },
  {
    title: "Farming & Agriculture",
    description: "Modern and sustainable agricultural services.",
    image: farmimg,
  },
  {
    title: "General Contracting",
    description: "Reliable contracting services across various sectors.",
    image: poolthree,
  },
  {
    title: "ICT Services",
    description: "Technology solutions for modern businesses.",
    image: ictimg,
  },
  {
    title: "Jewelry & Accessories",
    description: "Quality jewelry and fashion accessories.",
    image: necklace,
  },
  {
    title: "mining and quarrying",
    description: "Efficient and safe mining operations.",
    image: minegt,
  }
];
