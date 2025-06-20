import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TrustBadges } from "@/components/TrustBadges";
import { FeaturedProducts } from "@/components/featured-products";
import { Newsletter } from "@/components/newsletter";
import { CategoryShowcase } from "@/components/category-showcase";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
// import { InstagramFeed } from "@/components/instagram-feed";
export default function Home() {
    return (_jsxs("main", { className: "flex-1", children: [_jsx(HeroSection, {}), _jsx(TrustBadges, {}), _jsx(CategoryShowcase, {}), _jsx(FeaturedProducts, {}), _jsx(AboutSection, {}), _jsx(Newsletter, {})] }));
}
