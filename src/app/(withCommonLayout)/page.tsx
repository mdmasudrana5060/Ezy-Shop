import HeroSection from "@/components/UI/HomePage/HeroSection/HeroSection";
import Products from "../products/page";
import FeaturedCategory from "../featuredCategory/page";

const HomePage = () => {
  return (
    <div>
      <HeroSection />

      <FeaturedCategory />
      <Products />
    </div>
  );
};
export default HomePage;
