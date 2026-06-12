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

/** Client-side placeholder voor offerte-aanvragen (o.a. GitHub Pages). */
export async function submitQuote(data: QuoteRequest): Promise<QuoteResult> {
  if (!data.name || !data.email) {
    return { success: false, message: "Naam en e-mailadres zijn verplicht." }
  }

  console.log("[Sonilux] Nieuwe offerte-aanvraag ontvangen:", {
    name: data.name,
    email: data.email,
    phone: data.phone,
    date: data.date,
    guests: data.guests,
    products: data.products,
    notes: data.notes,
  })

  await new Promise((resolve) => setTimeout(resolve, 600))

  return {
    success: true,
    message: "Je offerte-aanvraag is succesvol ontvangen.",
  }
}
