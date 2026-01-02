import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import About from "../components/About";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import "../index.css";
import PageWrapper from "../components/PageWrapper";
// import FloatButton from "../components/FloatButton";

const Home: React.FC = () => {
  return (
    <>
      <PageWrapper>
        <Navbar />

        <section id="hero">
          <Hero />
          {/* <FloatButton /> */}
        </section>

        <section id="about">
          <About />
        </section>

        <section id="services">
          <Services />
        </section>

        <section id="contact">
          <CTA />
        </section>

        <Footer />
      </PageWrapper>
    </>
  );
};

export default Home;
