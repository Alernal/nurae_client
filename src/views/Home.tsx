import { TrustBadges } from "@/components/TrustBadges";
import { FeaturedProducts } from "@/components/featured-products";
import { Newsletter } from "@/components/newsletter";
import { CategoryShowcase } from "@/components/category-showcase";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
// import { InstagramFeed } from "@/components/instagram-feed";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <TrustBadges />
      <CategoryShowcase />
      <FeaturedProducts />
      {/* <InstagramFeed /> */}

      <AboutSection />

      <Newsletter />
    </main>
  );
}
