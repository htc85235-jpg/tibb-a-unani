import HeroSlider from "@/components/HeroSlider";
import FeaturedProducts from "@/components/FeaturedProducts";
import StatsBand from "@/components/StatsBand";
import UrduBanner from "@/components/UrduBanner";
import TrendingTabs from "@/components/TrendingTabs";
import FeaturesRow from "@/components/FeaturesRow";
import Testimonials from "@/components/Testimonials";
import AboutSection from "@/components/AboutSection";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <FeaturedProducts />
      <StatsBand />
      <UrduBanner />
      <TrendingTabs />
      <FeaturesRow />
      <Testimonials />
      <AboutSection />
    </>
  );
}
