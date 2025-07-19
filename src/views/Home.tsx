import { FeaturedProducts } from "@/components/featured-products";
import { FeaturedProducts2 } from "@/components/featured-products2";
import { Newsletter } from "@/components/newsletter";
import { CategoryShowcase } from "@/components/category-showcase";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
// import { InstagramFeed } from "@/components/instagram-feed";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      {/* <TrustBadges /> */}
      <CategoryShowcase />

      <FeaturedProducts />
      
      <FeaturedProducts2 />

      {/* <section className="w-full">
        <img
          src="/transition.png"
          alt="Transición visual"
          className="w-full h-full object-contain"
        />
      </section> */}

      <AboutSection />

      <Newsletter />
    </main>
  );
}
