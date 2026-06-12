import { Hero } from "@/components/home/hero"
import { Categories } from "@/components/home/categories"
import { Benefits } from "@/components/home/benefits"
import { FeaturedProducts } from "@/components/home/featured-products"
import { CtaSection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <Benefits />
      <FeaturedProducts />
      <CtaSection />
    </>
  )
}
