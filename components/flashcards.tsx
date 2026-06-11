"use client"

import { useMemo, useState } from "react"
import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import type { Chapter } from "@/lib/course-data"

type FlashcardsProps = {
  chapter: Chapter
}

export function Flashcards({ chapter }: FlashcardsProps) {
  const cards = useMemo(
    () =>
      chapter.topics.map((t) => ({
        id: t.id,
        front: t.title,
        back: t.description,
      })),
    [chapter],
  )

  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  const card = cards[index]

  function go(delta: number) {
    setFlipped(false)
    setIndex((prev) => (prev + delta + cards.length) % cards.length)
  }

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-3 flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Lernkarte {index + 1} / {cards.length}
        </span>
        <span>{chapter.title}</span>
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
            className="flex min-h-52 w-full flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card p-8 text-center"
          >
            <span className="text-xs font-medium uppercase tracking-wide text-accent">
              {flipped ? "Erklärung" : "Begriff"}
            </span>
            <span
              className={
                flipped
                  ? "leading-relaxed text-muted-foreground"
                  : "text-xl font-semibold text-foreground text-balance"
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
