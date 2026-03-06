import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import HeroSection from "@/components/HeroSection";
import MottoSection from "@/components/MottoSection";
import VideoCarousel from "@/components/VideoCarousel";
import ImageCarousel from "@/components/ImageCarousel";
import Gallery from "@/components/Gallery";
import CampaignsSection from "@/components/CampaignsSection";
import MapSection from "@/components/MapSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />
      <main>
        <HeroSection />
        <MottoSection />
        <VideoCarousel />
        <ImageCarousel />
        <Gallery />
        <CampaignsSection />
        <MapSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
