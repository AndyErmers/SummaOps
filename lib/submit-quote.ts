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

  const { error } = await supabase.rpc("submit_quote_request", {
    p_name: data.name,
    p_email: data.email,
    p_phone: data.phone || null,
    p_event_date: data.date || null,
    p_guests: data.guests ? Number(data.guests) : null,
    p_notes: data.notes || null,
    p_items: data.products,
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
