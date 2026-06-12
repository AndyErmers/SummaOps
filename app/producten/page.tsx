import { Suspense } from "react"
import type { Metadata } from "next"
import { ProductGrid } from "@/components/product-grid"

export const metadata: Metadata = {
  title: "Producten",
  description:
    "Bekijk het volledige assortiment van Sonilux: LED barren, LED statafels, LED verlichting, LED kubussen en evenementenmateriaal. Filter op categorie en vraag direct een offerte aan.",
}

export default function ProductenPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mb-10 max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
          Assortiment
        </p>
        <h1 className="mt-2 text-balance font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Onze verhuurmaterialen
        </h1>
        <p className="mt-4 text-pretty text-muted-foreground sm:text-lg">
          Van sfeervolle LED-meubels tot complete eventoplossingen. Stel je
          offerte samen en wij regelen de rest.
        </p>
      </div>

      <Suspense fallback={<div className="h-32" />}>
        <ProductGrid />
      </Suspense>
    </div>
  )
}
