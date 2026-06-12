import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { QuoteCtaButton } from "@/components/quote-cta-button"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/hero.png"
          alt="Sfeervolle eventopstelling met oplichtende LED-meubels"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/60" />
        <div className="absolute inset-0 bg-radial-glow" />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-start gap-7 px-4 py-24 sm:px-6 md:py-32 lg:px-8 lg:py-40">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
          <span className="size-1.5 rounded-full bg-accent" />
          Limburgs familiebedrijf
        </span>

        <h1 className="max-w-3xl text-balance font-heading text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Feestje? <span className="text-gradient">Wij verlichten</span> jouw
          evenement.
        </h1>

        <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          Verjaardag, communie, bruiloft, festival, beurs, verkooppromotie of
          (kerst)markt? Sonilux helpt met de juiste verhuurmaterialen voor een
          onvergetelijke sfeer.
        </p>

        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <QuoteCtaButton size="lg" showIcon={false} />
          <Button asChild variant="outline" className="h-11 px-6 font-semibold shadow-none">
            <Link href="/producten" className="inline-flex items-center justify-center gap-2">
              Bekijk producten
              <ArrowRight className="size-4 shrink-0" aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
