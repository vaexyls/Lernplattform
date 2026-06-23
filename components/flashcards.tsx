"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import type { Category } from "@/lib/course-data"

type FlashcardsProps = {
  category: Category
}

export function Flashcards({ category }: FlashcardsProps) {
  const cards = React.useMemo(
    () =>
      category.topics.map((t) => ({
        id: t.id,
        front: t.title,
        back: t.description,
      })),
    [category],
  )

  const [index, setIndex] = React.useState(0)
  const [flipped, setFlipped] = React.useState(false)

  React.useEffect(() => {
    setIndex(0)
    setFlipped(false)
  }, [category])

  const card = cards[index]

  function go(delta: number) {
    setFlipped(false)
    setIndex((prev) => (prev + delta + cards.length) % cards.length)
  }

  if (cards.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
        Keine Lernkarten in dieser Kategorie vorhanden.
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-3 flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Lernkarte {index + 1} / {cards.length}
        </span>
        <span>{category.title}</span>
      </div>

      <div className="relative" style={{ perspective: 1200 }}>
        <AnimatePresence mode="wait">
          <motion.button
            key={card.id + (flipped ? "-b" : "-f")}
            type="button"
            onClick={() => setFlipped((f) => !f)}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex min-h-[13rem] w-full flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card p-8 text-center"
          >
            <span className="text-xs font-medium uppercase tracking-wide text-accent">
              {flipped ? "Erklärung" : "Begriff"}
            </span>
            <span
              className={
                flipped
                  ? "leading-relaxed text-muted-foreground text-sm"
                  : "text-lg font-semibold text-foreground text-balance"
              }
            >
              {flipped ? card.back : card.front}
            </span>
            <span className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
              <RefreshCw className="size-3" />
              Zum Umdrehen klicken
            </span>
          </motion.button>
        </AnimatePresence>
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => go(-1)}
          className="flex size-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Vorherige Karte"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="flex size-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Nächste Karte"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  )
}
