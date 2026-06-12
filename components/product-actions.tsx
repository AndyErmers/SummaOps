"use client"

import Link from "next/link"
import { Check, Plus, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useQuote } from "@/lib/quote-context"
import { toast } from "sonner"

export function ProductActions({
  slug,
  name,
  available,
}: {
  slug: string
  name: string
  available: boolean
}) {
  const { addItem, has } = useQuote()
  const inQuote = has(slug)

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button
        size="lg"
        variant="outline"
        className="flex-1"
        disabled={inQuote}
        onClick={() => {
          addItem(slug, name)
          toast.success(`${name} toegevoegd aan offerte`)
        }}
      >
        {inQuote ? (
          <>
            <Check data-icon="inline-start" />
            Toegevoegd aan offerte
          </>
        ) : (
          <>
            <Plus data-icon="inline-start" />
            Toevoegen aan offerte
          </>
        )}
      </Button>
      <Button asChild size="lg" className="flex-1 glow-purple">
        <Link href="/offerte">
          <FileText data-icon="inline-start" />
          Offerte aanvragen
        </Link>
      </Button>
      {!available && (
        <p className="sr-only">Dit product is momenteel niet beschikbaar.</p>
      )}
    </div>
  )
}
