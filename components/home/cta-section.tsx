import Link from "next/link"
import { Button } from "@/components/ui/button"
import { QuoteCtaButton } from "@/components/quote-cta-button"

export function CtaSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-14 text-center sm:px-12 sm:py-20">
        <div className="absolute inset-0 bg-radial-glow" />
        <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
          <h2 className="text-balance font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Klaar om jouw evenement te laten stralen?
          </h2>
          <p className="text-pretty text-muted-foreground sm:text-lg">
            Stel vrijblijvend je offerte samen. We bekijken je aanvraag en nemen
            persoonlijk contact met je op om alles tot in de puntjes te regelen.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <QuoteCtaButton size="lg" />
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Neem contact op</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
