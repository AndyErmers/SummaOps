import type { Metadata } from "next"
import { QuoteForm } from "@/components/quote-form"

export const metadata: Metadata = {
  title: "Offerte aanvragen",
  description:
    "Vraag vrijblijvend een offerte aan bij Sonilux. Stel je verhuurmaterialen samen en wij nemen snel contact met je op.",
}

export default function OffertePage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mb-10 max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
          Vrijblijvend
        </p>
        <h1 className="mt-2 text-balance font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Offerte aanvragen
        </h1>
        <p className="mt-4 text-pretty text-muted-foreground sm:text-lg">
          Vul je gegevens in en selecteer de gewenste producten. Sonilux
          controleert je aanvraag en neemt persoonlijk contact met je op voor
          een passend voorstel.
        </p>
      </div>

      <QuoteForm />
    </div>
  )
}
