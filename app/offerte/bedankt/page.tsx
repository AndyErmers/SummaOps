"use client"

import { useEffect } from "react"
import Link from "next/link"
import { CheckCircle2, Mail, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useQuote } from "@/lib/quote-context"

export default function BedanktPage() {
  const { clear } = useQuote()

  // Maak de offerte-selectie leeg zodra de bedankpagina wordt getoond.
  useEffect(() => {
    clear()
  }, [clear])

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="flex flex-col items-center text-center">
        <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/15 text-primary glow-purple">
          <CheckCircle2 className="size-8" />
        </div>
        <h1 className="mt-6 text-balance font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Bedankt voor je aanvraag!
        </h1>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground sm:text-lg">
          We hebben je offerte-aanvraag in goede orde ontvangen. Sonilux
          controleert je aanvraag zorgvuldig en neemt zo snel mogelijk
          persoonlijk contact met je op.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="flex flex-col gap-2 pt-6">
            <div className="flex size-10 items-center justify-center rounded-lg bg-secondary text-accent">
              <Mail className="size-5" />
            </div>
            <h2 className="font-heading text-base font-semibold text-foreground">
              Bevestigingsmail
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Je ontvangt een bevestigingsmail met een overzicht van je
              aanvraag. (Placeholder in deze MVP.)
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col gap-2 pt-6">
            <div className="flex size-10 items-center justify-center rounded-lg bg-secondary text-accent">
              <Clock className="size-5" />
            </div>
            <h2 className="font-heading text-base font-semibold text-foreground">
              Binnen 1 werkdag
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              We streven ernaar om binnen één werkdag te reageren met een
              passend voorstel.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/producten">
            Verder kijken
            <ArrowRight data-icon="inline-end" />
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/">Terug naar home</Link>
        </Button>
      </div>
    </div>
  )
}
