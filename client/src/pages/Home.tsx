import Footer from "../components/Footer";
import HeroCarousel from "../components/HeroCarousel";
import HeroSection from "../components/HeroSection";
import JobsContainer from "../components/JobsContainer";

const Home = () => {
  return (
    <>
      <HeroSection />
      <HeroCarousel/>
      <JobsContainer/>
      <Footer></Footer>

    </>
  );
};

export default Home;
