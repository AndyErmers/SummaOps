import { supabase } from "@/lib/supabase"

export type QuoteRequest = {
  name: string
  email: string
  phone: string
  date: string
  guests: string
  products: { slug: string; name: string; quantity: number }[]
  notes: string
}

export type QuoteResult = {
  success: boolean
  message: string
}

export async function submitQuote(data: QuoteRequest): Promise<QuoteResult> {
  if (!data.name || !data.email) {
    return { success: false, message: "Naam en e-mailadres zijn verplicht." }
  }

  const { error } = await supabase.from("quote_requests").insert({
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    event_date: data.date || null,
    guests: data.guests ? Number(data.guests) : null,
    notes: data.notes || null,
    products: data.products,
  })

  if (error) {
    console.error("[Sonilux] Offerte-aanvraag mislukt:", error)
    return {
      success: false,
      message: "Er ging iets mis bij het versturen. Probeer het opnieuw.",
    }
  }

  return {
    success: true,
    message: "Je offerte-aanvraag is succesvol ontvangen.",
  }
}
