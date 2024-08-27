import Footer from "../components/Footer";
import HeroCarousel from "../components/HeroCarousel";
import HeroSection from "../components/HeroSection";
import JobsContainer from "../components/JobsContainer";
import useGetAllJobs from "../hooks/useGetAllJobs";


const Home = () => {
  useGetAllJobs()
  return (
    <>
      <HeroSection />
      <HeroCarousel />
      <JobsContainer />
      <Footer></Footer>
    </>
  );
};

export default Home;
