import { Analytics } from "@vercel/analytics/next"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { QuoteProvider } from "@/lib/quote-context"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Toaster } from "@/components/ui/sonner"
import { assetPath } from "@/lib/asset-path"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://sonilux.nl"),
  title: {
    default: "Sonilux | Verhuur van LED- en eventmaterialen in Limburg",
    template: "%s | Sonilux",
  },
  description:
    "Sonilux is een Limburgs familiebedrijf gespecialiseerd in de verhuur van LED-materialen en eventmaterialen voor feesten, bruiloften, festivals, beurzen en (kerst)markten. Vraag eenvoudig een offerte aan.",
  keywords: [
    "verhuur Limburg",
    "LED verhuur",
    "feestmateriaal huren",
    "evenementen verhuur",
    "LED statafels",
    "LED barren",
    "festival verhuur",
    "bruiloft verhuur",
  ],
  generator: "v0.app",
  icons: {
    icon: assetPath("/sonilux-logo.png"),
    apple: assetPath("/sonilux-logo.png"),
  },
  openGraph: {
    title: "Sonilux | Verhuur van LED- en eventmaterialen in Limburg",
    description:
      "Limburgs familiebedrijf voor de verhuur van LED- en eventmaterialen. Vraag snel een offerte aan.",
    locale: "nl_NL",
    type: "website",
    images: [{ url: assetPath("/sonilux-logo.png"), alt: "Sonilux Verhuur" }],
  },
}

export const viewport = {
  themeColor: "#1a1322",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="nl"
      className={`dark ${geistSans.variable} ${geistMono.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <QuoteProvider>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
          <Toaster position="top-center" />
        </QuoteProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
