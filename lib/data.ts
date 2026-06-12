export type Category = {
  slug: string
  name: string
  description: string
}

export type Faq = {
  question: string
  answer: string
}

export type Product = {
  id: string
  slug: string
  name: string
  categorySlug: string
  shortDescription: string
  description: string
  priceIndication: string
  available: boolean
  dimensions: string
  specifications: { label: string; value: string }[]
  image: string
}

export const categories: Category[] = [
  {
    slug: "led-barren",
    name: "LED Barren",
    description:
      "Strakke, oplichtende bars en toogelementen die elk feest of event direct cachet geven.",
  },
  {
    slug: "led-statafels",
    name: "LED Statafels",
    description:
      "Sfeervolle, kleurveranderende statafels voor recepties, beurzen en netwerkmomenten.",
  },
  {
    slug: "led-verlichting",
    name: "LED Verlichting",
    description:
      "Professionele lichtoplossingen om je locatie of podium volledig tot leven te brengen.",
  },
  {
    slug: "led-kubussen",
    name: "LED Kubussen",
    description:
      "Veelzijdige, draadloze kubussen als zitelement, tafel of decoratief accent.",
  },
  {
    slug: "evenementen",
    name: "Evenementen",
    description:
      "Aanvullende materialen voor festivals, bruiloften en grote evenementen.",
  },
]

function spec(power: string, color: string, control: string, battery: string) {
  return [
    { label: "Vermogen", value: power },
    { label: "Kleuren", value: color },
    { label: "Besturing", value: control },
    { label: "Accuduur", value: battery },
  ]
}

export const products: Product[] = [
  // LED Barren
  {
    id: "bar-01",
    slug: "led-bar-classic-200",
    name: "LED Bar Classic 200",
    categorySlug: "led-barren",
    shortDescription: "Rechte LED bar van 2 meter met RGB kleurverloop.",
    description:
      "De LED Bar Classic 200 is een rechte, oplichtende bar van twee meter breed. Perfect als centrale toog op recepties, bedrijfsfeesten of bruiloften. Volledig draadloos en bedienbaar via afstandsbediening.",
    priceIndication: "vanaf €145 / dag",
    available: true,
    dimensions: "200 × 60 × 110 cm",
    specifications: spec("30W", "RGB + wit", "Afstandsbediening", "tot 12 uur"),
    image: "/products/led-bar-classic.png",
  },
  {
    id: "bar-02",
    slug: "led-bar-curved",
    name: "LED Bar Curved",
    categorySlug: "led-barren",
    shortDescription: "Gebogen LED bar voor een premium uitstraling.",
    description:
      "Een elegant gebogen LED bar-element dat ruimtes vult met een luxe sfeer. Ideaal als blikvanger op gala's en exclusieve events.",
    priceIndication: "vanaf €195 / dag",
    available: true,
    dimensions: "240 × 70 × 110 cm",
    specifications: spec("40W", "RGBW", "App + afstandsbediening", "tot 10 uur"),
    image: "/products/led-bar-curved.png",
  },
  {
    id: "bar-03",
    slug: "led-bar-corner",
    name: "LED Bar Hoekmodule",
    categorySlug: "led-barren",
    shortDescription: "Hoekstuk om bars in L- of U-vorm te koppelen.",
    description:
      "Met de hoekmodule koppel je meerdere LED bars tot een volledige bar-opstelling in L- of U-vorm. Volledig kleur-synchroon met de overige modules.",
    priceIndication: "vanaf €95 / dag",
    available: true,
    dimensions: "70 × 70 × 110 cm",
    specifications: spec("20W", "RGB + wit", "Afstandsbediening", "tot 12 uur"),
    image: "/products/led-bar-corner.png",
  },
  {
    id: "bar-04",
    slug: "led-bar-mobile",
    name: "LED Mobiele Bar",
    categorySlug: "led-barren",
    shortDescription: "Verrijdbare LED bar met opbergruimte.",
    description:
      "Een complete mobiele bar met geïntegreerde LED-verlichting en opbergruimte voor glaswerk. Snel te verplaatsen dankzij geïntegreerde wielen.",
    priceIndication: "vanaf €175 / dag",
    available: false,
    dimensions: "150 × 65 × 115 cm",
    specifications: spec("35W", "RGBW", "Afstandsbediening", "tot 9 uur"),
    image: "/products/led-bar-mobile.png",
  },
  {
    id: "bar-05",
    slug: "led-bar-led-back",
    name: "LED Backbar",
    categorySlug: "led-barren",
    shortDescription: "Verlichte achterwand voor je baropstelling.",
    description:
      "De verlichte backbar vormt de perfecte achterwand voor je bar. Presenteer flessen en glaswerk in een sfeervol kleurenpalet.",
    priceIndication: "vanaf €165 / dag",
    available: true,
    dimensions: "180 × 40 × 180 cm",
    specifications: spec("45W", "RGB + wit", "App + afstandsbediening", "netvoeding"),
    image: "/products/led-backbar.png",
  },

  // LED Statafels
  {
    id: "stat-01",
    slug: "led-statafel-rond",
    name: "LED Statafel Rond",
    categorySlug: "led-statafels",
    shortDescription: "Ronde statafel met kleurveranderend onderstel.",
    description:
      "Klassieke ronde statafel met een oplichtend onderstel in elke gewenste kleur. Een must-have voor recepties en netwerkborrels.",
    priceIndication: "vanaf €35 / dag",
    available: true,
    dimensions: "Ø 60 × 110 cm",
    specifications: spec("12W", "RGB", "Afstandsbediening", "tot 14 uur"),
    image: "/products/led-statafel-rond.png",
  },
  {
    id: "stat-02",
    slug: "led-statafel-vierkant",
    name: "LED Statafel Vierkant",
    categorySlug: "led-statafels",
    shortDescription: "Moderne vierkante statafel met glow-effect.",
    description:
      "Strakke vierkante statafel met een subtiel glow-effect. Combineert prachtig met de LED kubussen als zitgelegenheid.",
    priceIndication: "vanaf €39 / dag",
    available: true,
    dimensions: "60 × 60 × 110 cm",
    specifications: spec("12W", "RGB", "Afstandsbediening", "tot 14 uur"),
    image: "/products/led-statafel-vierkant.png",
  },
  {
    id: "stat-03",
    slug: "led-statafel-hoog-glans",
    name: "LED Statafel Hoogglans",
    categorySlug: "led-statafels",
    shortDescription: "Premium statafel met hoogglans blad.",
    description:
      "Een luxe statafel met hoogglans tafelblad en volledig oplichtende voet. Geeft elk zakelijk event een professionele uitstraling.",
    priceIndication: "vanaf €49 / dag",
    available: true,
    dimensions: "Ø 70 × 112 cm",
    specifications: spec("15W", "RGBW", "App + afstandsbediening", "tot 12 uur"),
    image: "/products/led-statafel-hoogglans.png",
  },
  {
    id: "stat-04",
    slug: "led-statafel-bistro",
    name: "LED Bistro Statafel",
    categorySlug: "led-statafels",
    shortDescription: "Compacte bistrotafel voor kleinere ruimtes.",
    description:
      "Compacte bistro-statafel ideaal voor kleinere ruimtes en intieme gelegenheden. Lichtgewicht en eenvoudig te plaatsen.",
    priceIndication: "vanaf €29 / dag",
    available: false,
    dimensions: "Ø 50 × 105 cm",
    specifications: spec("10W", "RGB", "Afstandsbediening", "tot 14 uur"),
    image: "/products/led-statafel-bistro.png",
  },

  // LED Verlichting
  {
    id: "light-01",
    slug: "led-uplight-set",
    name: "LED Uplight Set (4 stuks)",
    categorySlug: "led-verlichting",
    shortDescription: "Draadloze uplights voor sfeervolle wandverlichting.",
    description:
      "Set van vier draadloze uplights waarmee je muren, gevels en hoeken in elke kleur baadt. Synchroniseren onderling automatisch.",
    priceIndication: "vanaf €60 / dag",
    available: true,
    dimensions: "18 × 18 × 22 cm per stuk",
    specifications: spec("4 × 9W", "RGBWA + UV", "DMX + app", "tot 10 uur"),
    image: "/products/led-uplight.png",
  },
  {
    id: "light-02",
    slug: "led-moving-head",
    name: "LED Moving Head",
    categorySlug: "led-verlichting",
    shortDescription: "Bewegende spotkop voor podium en dansvloer.",
    description:
      "Krachtige bewegende spotkop met gobo's en prisma-effecten. Brengt elk podium en elke dansvloer tot leven.",
    priceIndication: "vanaf €85 / dag",
    available: true,
    dimensions: "30 × 25 × 38 cm",
    specifications: spec("120W", "RGBW", "DMX", "netvoeding"),
    image: "/products/led-moving-head.png",
  },
  {
    id: "light-03",
    slug: "led-par-spot",
    name: "LED Par Spot",
    categorySlug: "led-verlichting",
    shortDescription: "Veelzijdige spot voor accent- en podiumlicht.",
    description:
      "De LED Par Spot is de werkpaard onder de eventverlichting. Inzetbaar voor accentverlichting, podia en kleurwassen.",
    priceIndication: "vanaf €22 / dag",
    available: true,
    dimensions: "20 × 20 × 24 cm",
    specifications: spec("18W", "RGBWA", "DMX + afstandsbediening", "netvoeding"),
    image: "/products/led-par-spot.png",
  },
  {
    id: "light-04",
    slug: "led-lichtsnoer",
    name: "LED Lichtsnoer 25m",
    categorySlug: "led-verlichting",
    shortDescription: "Warmwit lichtsnoer voor terras en tent.",
    description:
      "Sfeervol lichtsnoer van 25 meter met warmwitte lampen. Perfect voor terrassen, tenten en buitenfeesten.",
    priceIndication: "vanaf €25 / dag",
    available: true,
    dimensions: "2500 cm",
    specifications: spec("40W", "Warmwit", "Aan/uit", "netvoeding"),
    image: "/products/led-lichtsnoer.png",
  },
  {
    id: "light-05",
    slug: "led-laser-show",
    name: "LED Laser Show",
    categorySlug: "led-verlichting",
    shortDescription: "Laserprojector voor spectaculaire shows.",
    description:
      "Professionele laserprojector voor adembenemende lichtshows op festivals en grote events. Inclusief diverse patronen en effecten.",
    priceIndication: "vanaf €110 / dag",
    available: false,
    dimensions: "26 × 22 × 14 cm",
    specifications: spec("3W RGB", "RGB laser", "DMX + auto", "netvoeding"),
    image: "/products/led-laser.png",
  },

  // LED Kubussen
  {
    id: "cube-01",
    slug: "led-kubus-40",
    name: "LED Kubus 40",
    categorySlug: "led-kubussen",
    shortDescription: "Draadloze lichtkubus als zit- of sfeerelement.",
    description:
      "Veelzijdige draadloze lichtkubus van 40 cm. Gebruik als kruk, bijzettafel of decoratief lichtaccent.",
    priceIndication: "vanaf €30 / dag",
    available: true,
    dimensions: "40 × 40 × 40 cm",
    specifications: spec("8W", "RGB", "Afstandsbediening", "tot 16 uur"),
    image: "/products/led-kubus-40.png",
  },
  {
    id: "cube-02",
    slug: "led-kubus-zitbank",
    name: "LED Zitbank",
    categorySlug: "led-kubussen",
    shortDescription: "Lange oplichtende zitbank voor lounge-opstellingen.",
    description:
      "Een lange oplichtende zitbank die perfect past in een loungehoek. Combineer met kubussen en statafels voor een complete sfeerzone.",
    priceIndication: "vanaf €65 / dag",
    available: true,
    dimensions: "120 × 40 × 40 cm",
    specifications: spec("14W", "RGB", "Afstandsbediening", "tot 14 uur"),
    image: "/products/led-zitbank.png",
  },
  {
    id: "cube-03",
    slug: "led-kubus-tafel",
    name: "LED Kubus Salontafel",
    categorySlug: "led-kubussen",
    shortDescription: "Lichtgevende salontafel met glasplaat.",
    description:
      "Lichtgevende kubus met transparante glasplaat als salontafel. Het middelpunt van elke loungeopstelling.",
    priceIndication: "vanaf €45 / dag",
    available: true,
    dimensions: "50 × 50 × 45 cm",
    specifications: spec("10W", "RGB", "Afstandsbediening", "tot 15 uur"),
    image: "/products/led-kubus-tafel.png",
  },
  {
    id: "cube-04",
    slug: "led-bolset",
    name: "LED Bollen Set (3 stuks)",
    categorySlug: "led-kubussen",
    shortDescription: "Oplichtende bollen in drie formaten.",
    description:
      "Set van drie oplichtende bollen in verschillende formaten. Een speelse aanvulling op kubussen en banken.",
    priceIndication: "vanaf €40 / dag",
    available: false,
    dimensions: "Ø 30 / 40 / 50 cm",
    specifications: spec("3 × 6W", "RGB", "Afstandsbediening", "tot 16 uur"),
    image: "/products/led-bollen.png",
  },

  // Evenementen
  {
    id: "event-01",
    slug: "statafelrok-stretch",
    name: "Statafelrok Stretch",
    categorySlug: "evenementen",
    shortDescription: "Strakke stretchrok voor statafels.",
    description:
      "Strakke stretchhoes die elke statafel een verzorgde uitstraling geeft. Verkrijgbaar in meerdere kleuren.",
    priceIndication: "vanaf €8 / dag",
    available: true,
    dimensions: "Ø 60-70 cm",
    specifications: [
      { label: "Materiaal", value: "Stretch polyester" },
      { label: "Kleuren", value: "Zwart, wit, paars" },
      { label: "Wasbaar", value: "Ja, 40°C" },
      { label: "Per stuk", value: "1 statafel" },
    ],
    image: "/products/statafelrok.png",
  },
  {
    id: "event-02",
    slug: "partytent-premium",
    name: "Partytent Premium 4×8",
    categorySlug: "evenementen",
    shortDescription: "Stevige partytent voor 30+ personen.",
    description:
      "Professionele partytent van 4 bij 8 meter met stevig frame en heldere zijwanden. Inclusief op- en afbouw mogelijk.",
    priceIndication: "vanaf €185 / dag",
    available: true,
    dimensions: "400 × 800 × 250 cm",
    specifications: [
      { label: "Oppervlak", value: "32 m²" },
      { label: "Frame", value: "Gecoat staal" },
      { label: "Zijwanden", value: "Afneembaar" },
      { label: "Capaciteit", value: "30-40 personen" },
    ],
    image: "/products/partytent.png",
  },
  {
    id: "event-03",
    slug: "podium-element",
    name: "Podium Element",
    categorySlug: "evenementen",
    shortDescription: "Modulair podiumdeel, koppelbaar.",
    description:
      "Modulair podiumdeel dat eenvoudig te koppelen is tot een volledig podium. In hoogte verstelbaar.",
    priceIndication: "vanaf €30 / dag",
    available: true,
    dimensions: "200 × 100 cm",
    specifications: [
      { label: "Belasting", value: "750 kg/m²" },
      { label: "Hoogte", value: "20-100 cm" },
      { label: "Oppervlak", value: "Antislip" },
      { label: "Koppelbaar", value: "Ja" },
    ],
    image: "/products/podium.png",
  },
  {
    id: "event-04",
    slug: "geluidsset-compact",
    name: "Geluidsset Compact",
    categorySlug: "evenementen",
    shortDescription: "Draadloze speakerset met microfoon.",
    description:
      "Complete draadloze geluidsset met twee actieve speakers en draadloze microfoon. Ideaal voor speeches en achtergrondmuziek.",
    priceIndication: "vanaf €75 / dag",
    available: false,
    dimensions: "2 × speaker + statief",
    specifications: [
      { label: "Vermogen", value: "2 × 300W" },
      { label: "Bluetooth", value: "Ja" },
      { label: "Microfoon", value: "Draadloos" },
      { label: "Accu", value: "tot 8 uur" },
    ],
    image: "/products/geluidsset.png",
  },
  {
    id: "event-05",
    slug: "rode-loper",
    name: "Rode Loper Set",
    categorySlug: "evenementen",
    shortDescription: "Rode loper met afzetpalen.",
    description:
      "Rode loper inclusief vier verchroomde afzetpalen met koord. Voor een grootse entree bij gala's en premières.",
    priceIndication: "vanaf €45 / dag",
    available: true,
    dimensions: "Loper 500 × 100 cm",
    specifications: [
      { label: "Loperlengte", value: "5 meter" },
      { label: "Palen", value: "4 stuks" },
      { label: "Koord", value: "Fluweel" },
      { label: "Kleur", value: "Rood / chroom" },
    ],
    image: "/products/rode-loper.png",
  },
  {
    id: "event-06",
    slug: "heater-terras",
    name: "Terrasheater Elektrisch",
    categorySlug: "evenementen",
    shortDescription: "Elektrische heater voor buitenevents.",
    description:
      "Elektrische terrasheater die je gasten warm houdt tijdens buitenevenementen in het najaar en de winter.",
    priceIndication: "vanaf €35 / dag",
    available: true,
    dimensions: "Ø 80 × 220 cm",
    specifications: [
      { label: "Vermogen", value: "2000W" },
      { label: "Bereik", value: "ca. 12 m²" },
      { label: "Standen", value: "3" },
      { label: "Aansluiting", value: "230V" },
    ],
    image: "/products/heater.png",
  },
]

export function getProductsByCategory(slug: string) {
  return products.filter((p) => p.categorySlug === slug)
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug)
}

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug)
}

export const faqs: Faq[] = [
  {
    question: "Hoe vraag ik een offerte aan?",
    answer:
      "Voeg producten toe via de productpagina's en ga naar 'Offerte aanvragen'. Vul je gegevens en eventdetails in; wij nemen daarna persoonlijk contact met je op met een passend voorstel.",
  },
  {
    question: "Is de offerte vrijblijvend?",
    answer:
      "Ja. Je ontvangt een vrijblijvende offerte op maat. Pas na jouw akkoord plannen we de levering en eventuele op- of afbouw in.",
  },
  {
    question: "Leveren jullie ook buiten Limburg?",
    answer:
      "Sonilux is geworteld in Limburg en werkt voornamelijk in de regio. Voor events buiten Limburg kijken we graag mee naar de mogelijkheden en transportkosten.",
  },
  {
    question: "Kunnen jullie helpen met opbouw en afbouw?",
    answer:
      "Ja, afhankelijk van het materiaal en de locatie kunnen we opbouw en afbouw verzorgen. Geef dit door bij je offerteaanvraag, dan stemmen we het vooraf af.",
  },
  {
    question: "Hoe ver van tevoren moet ik reserveren?",
    answer:
      "Hoe eerder, hoe beter — zeker in het hoogseizoen rond feesten en festivals. Neem gerust contact op als je datum dichtbij is; soms is er nog materiaal beschikbaar.",
  },
  {
    question: "Wat als materiaal niet beschikbaar is?",
    answer:
      "Op de website zie je per product of het beschikbaar is. Is iets niet op voorraad? Vraag een offerte aan; vaak kunnen we een alternatief voorstellen of de beschikbaarheid op jouw datum checken.",
  },
  {
    question: "Werken jullie voor particulieren én bedrijven?",
    answer:
      "Ja. Van communies en verjaardagen tot festivals, beurzen en zakelijke events — we leveren voor particuliere en zakelijke klanten.",
  },
  {
    question: "Hoe werkt betaling?",
    answer:
      "De betalingsvoorwaarden bespreken we in de offerte. Meestal vragen we een bevestiging en betaling volgens afspraak vóór of rond de leverdatum.",
  },
]
