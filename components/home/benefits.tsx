import { Users, Award, MapPin, Music, Building2, Truck } from "lucide-react"

const benefits = [
  {
    icon: Users,
    title: "Familiebedrijf",
    description:
      "Persoonlijke service en korte lijnen. Bij Sonilux krijg je altijd een vast aanspreekpunt.",
  },
  {
    icon: Award,
    title: "Jaren ervaring",
    description:
      "Met jarenlange ervaring weten we precies wat er nodig is voor een geslaagd evenement.",
  },
  {
    icon: MapPin,
    title: "Actief in Limburg",
    description:
      "Stevig geworteld in de regio Limburg, met snelle levering en lokale betrokkenheid.",
  },
  {
    icon: Music,
    title: "Festivals & grote events",
    description:
      "Ervaren met festivals en grootschalige evenementen, van opbouw tot afbouw.",
  },
  {
    icon: Building2,
    title: "Zakelijke klanten",
    description:
      "Ook bekend bij zakelijke klanten, waaronder samenwerkingen rond André Rieu.",
  },
  {
    icon: Truck,
    title: "Betrouwbare levering",
    description:
      "Op tijd geleverd en netjes opgehaald, zodat jij je kunt richten op het feest.",
  },
]

export function Benefits() {
  return (
    <section className="border-y border-border/60 bg-card/30">
      <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-accent">
            Waarom Sonilux
          </p>
          <h2 className="mt-2 text-balance font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            De voordelen van werken met Sonilux
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="flex flex-col gap-3 rounded-xl border border-border bg-background/50 p-6 transition-colors hover:border-primary/40"
            >
              <div className="flex size-11 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <benefit.icon className="size-5" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground">
                {benefit.title}
              </h3>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
