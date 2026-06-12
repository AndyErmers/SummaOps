"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

export type QuoteItem = {
  slug: string
  name: string
  quantity: number
}

type QuoteContextType = {
  items: QuoteItem[]
  count: number
  addItem: (slug: string, name: string) => void
  removeItem: (slug: string) => void
  setQuantity: (slug: string, quantity: number) => void
  clear: () => void
  has: (slug: string) => boolean
}

const QuoteContext = createContext<QuoteContextType | null>(null)

const STORAGE_KEY = "sonilux-offerte"

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  // We use sessionStorage only to keep the in-progress quote selection while the
  // user browses between pages. This is UI state, not persisted business data.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {
      // ignore
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // ignore
    }
  }, [items, hydrated])

  const addItem = useCallback((slug: string, name: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === slug)
      if (existing) {
        return prev.map((i) =>
          i.slug === slug ? { ...i, quantity: i.quantity + 1 } : i,
        )
      }
      return [...prev, { slug, name, quantity: 1 }]
    })
  }, [])

  const removeItem = useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug))
  }, [])

  const setQuantity = useCallback((slug: string, quantity: number) => {
    setItems((prev) =>
      prev
        .map((i) => (i.slug === slug ? { ...i, quantity } : i))
        .filter((i) => i.quantity > 0),
    )
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const has = useCallback(
    (slug: string) => items.some((i) => i.slug === slug),
    [items],
  )

  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items],
  )

  const value = useMemo(
    () => ({ items, count, addItem, removeItem, setQuantity, clear, has }),
    [items, count, addItem, removeItem, setQuantity, clear, has],
  )

  return <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>
}

export function useQuote() {
  const ctx = useContext(QuoteContext)
  if (!ctx) throw new Error("useQuote must be used within QuoteProvider")
  return ctx
}
