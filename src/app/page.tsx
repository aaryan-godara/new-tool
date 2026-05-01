import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import CreatorShowcase from "@/components/sections/CreatorShowcase";
import CaseStudyOrbit from "@/components/sections/CaseStudyOrbit";
import AnalyticsSection from "@/components/sections/AnalyticsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PricingSection from "@/components/sections/PricingSection";
import ContactSection from "@/components/sections/ContactSection";
import TickerSection from "@/components/sections/TickerSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TickerSection />
        <ServicesSection />
        <CreatorShowcase />
        <CaseStudyOrbit />
        <AnalyticsSection />
        <TestimonialsSection />
        <PricingSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
