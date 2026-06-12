"use client"

import { useState, useTransition } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Field,
  FieldLabel,
  FieldGroup,
  FieldError,
} from "@/components/ui/field"
import { toast } from "sonner"

export function ContactForm() {
  const [isPending, startTransition] = useTransition()
  const [errors, setErrors] = useState<Record<string, string>>({})

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const name = String(formData.get("name") ?? "").trim()
    const email = String(formData.get("email") ?? "").trim()
    const message = String(formData.get("message") ?? "").trim()

    const nextErrors: Record<string, string> = {}
    if (!name) nextErrors.name = "Vul je naam in."
    if (!email) nextErrors.email = "Vul je e-mailadres in."
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      nextErrors.email = "Vul een geldig e-mailadres in."
    if (!message) nextErrors.message = "Vul een bericht in."
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    startTransition(async () => {
      // Placeholder: later koppelen aan een e-mailprovider of database.
      console.log("[v0] Contactbericht ontvangen:", { name, email, message })
      await new Promise((r) => setTimeout(r, 500))
      toast.success("Bedankt! We nemen zo snel mogelijk contact met je op.")
      form.reset()
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        <Field orientation="responsive">
          <Field data-invalid={!!errors.name}>
            <FieldLabel htmlFor="c-name">Naam *</FieldLabel>
            <Input
              id="c-name"
              name="name"
              placeholder="Voor- en achternaam"
              aria-invalid={!!errors.name}
              autoComplete="name"
            />
            {errors.name && <FieldError>{errors.name}</FieldError>}
          </Field>
          <Field data-invalid={!!errors.email}>
            <FieldLabel htmlFor="c-email">E-mail *</FieldLabel>
            <Input
              id="c-email"
              name="email"
              type="email"
              placeholder="jij@voorbeeld.nl"
              aria-invalid={!!errors.email}
              autoComplete="email"
            />
            {errors.email && <FieldError>{errors.email}</FieldError>}
          </Field>
        </Field>

        <Field>
          <FieldLabel htmlFor="c-phone">Telefoon</FieldLabel>
          <Input
            id="c-phone"
            name="phone"
            type="tel"
            placeholder="06 12 34 56 78"
            autoComplete="tel"
          />
        </Field>

        <Field data-invalid={!!errors.message}>
          <FieldLabel htmlFor="c-message">Bericht *</FieldLabel>
          <Textarea
            id="c-message"
            name="message"
            rows={5}
            placeholder="Waarmee kunnen we je helpen?"
            aria-invalid={!!errors.message}
          />
          {errors.message && <FieldError>{errors.message}</FieldError>}
        </Field>

        <Button type="submit" size="lg" disabled={isPending}>
          {isPending ? (
            "Versturen…"
          ) : (
            <>
              <Send data-icon="inline-start" />
              Verstuur bericht
            </>
          )}
        </Button>
      </FieldGroup>
    </form>
  )
}
