import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import CTASection from "../components/CTASection";

const LandingPage = () => {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </main>
  );
};

export default LandingPage;
