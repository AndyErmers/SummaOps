import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ArrowLeft, Ruler, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ProductActions } from "@/components/product-actions"
import { ProductCard } from "@/components/product-card"
import { getProduct, getCategory, products } from "@/lib/data"

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) return { title: "Product niet gevonden" }
  return {
    title: product.name,
    description: product.shortDescription,
  }
}

export default async function ProductDetailPage({ params }: Params) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()

  const category = getCategory(product.categorySlug)
  const related = products
    .filter((p) => p.categorySlug === product.categorySlug && p.slug !== product.slug)
    .slice(0, 3)

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <Link
        href="/producten"
        className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Terug naar producten
      </Link>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-secondary">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute left-4 top-4">
            <Badge
              className={
                product.available
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary text-muted-foreground"
              }
            >
              {product.available ? "Beschikbaar" : "Niet beschikbaar"}
            </Badge>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div>
            {category && (
              <Link
                href={`/producten?categorie=${category.slug}`}
                className="text-sm font-medium uppercase tracking-[0.18em] text-accent"
              >
                {category.name}
              </Link>
            )}
            <h1 className="mt-2 text-balance font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-3 text-2xl font-semibold text-primary">
              {product.priceIndication}
            </p>
          </div>

          <p className="text-pretty leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <ProductActions
            slug={product.slug}
            name={product.name}
            available={product.available}
          />

          <Separator />

          <div className="flex items-center gap-2.5 text-sm">
            <Ruler className="size-4 text-accent" />
            <span className="text-muted-foreground">Afmetingen:</span>
            <span className="font-medium text-foreground">{product.dimensions}</span>
          </div>

          <div>
            <h2 className="mb-4 font-heading text-lg font-semibold text-foreground">
              Specificaties
            </h2>
            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {product.specifications.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-center justify-between gap-4 rounded-lg border border-border bg-card/50 px-4 py-3"
                >
                  <dt className="text-sm text-muted-foreground">{spec.label}</dt>
                  <dd className="text-sm font-medium text-foreground">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Check className="size-4 text-accent" />
              Inclusief persoonlijk advies
            </li>
            <li className="flex items-center gap-2">
              <Check className="size-4 text-accent" />
              Bezorging en ophaling in heel Limburg mogelijk
            </li>
            <li className="flex items-center gap-2">
              <Check className="size-4 text-accent" />
              Op- en afbouw op aanvraag
            </li>
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-8 font-heading text-2xl font-semibold tracking-tight text-foreground">
            Gerelateerde producten
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
