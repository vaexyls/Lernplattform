"use client"

import { useState } from "react"
import { Check, RotateCcw, X } from "lucide-react"
import { motion } from "motion/react"
import type { Chapter } from "@/lib/course-data"
import { cn } from "@/lib/utils"

type QuizProps = {
  chapter: Chapter
  answeredIds: string[]
  onAnswerCorrect: (id: string) => void
}

export function Quiz({ chapter, answeredIds, onAnswerCorrect }: QuizProps) {
  const [selections, setSelections] = useState<Record<string, number>>({})

  function select(questionId: string, optionIndex: number, correct: number) {
    if (selections[questionId] !== undefined) return
    setSelections((prev) => ({ ...prev, [questionId]: optionIndex }))
    if (optionIndex === correct) onAnswerCorrect(questionId)
  }

  function reset() {
    setSelections({})
  }

  const correctCount = chapter.quiz.filter(
    (q) => selections[q.id] === q.answer,
  ).length
  const answeredCount = Object.keys(selections).length

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between rounded-xl border border-border bg-card px-5 py-4">
        <div>
          <h3 className="text-base font-semibold text-foreground">
            Quiz – {chapter.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {answeredCount} / {chapter.quiz.length} beantwortet · {correctCount}{" "}
            richtig
          </p>
        </div>
        <button
          type="button"
          onClick={reset}
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <RotateCcw className="size-3.5" />
          Zurücksetzen
        </button>
      </div>

      {chapter.quiz.map((q, qi) => {
        const selected = selections[q.id]
        const isAnswered = selected !== undefined
        return (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: qi * 0.03 }}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <div className="flex gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/15 text-sm font-semibold text-primary">
                {qi + 1}
              </span>
              <p className="pt-0.5 font-medium text-foreground text-pretty">
                {q.question}
              </p>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {q.options.map((opt, oi) => {
                const isCorrect = oi === q.answer
                const isSelected = selected === oi
                return (
                  <button
                    key={opt}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => select(q.id, oi, q.answer)}
                    className={cn(
                      "flex items-center justify-between gap-2 rounded-lg border px-4 py-2.5 text-left text-sm transition-colors",
                      !isAnswered &&
                        "border-border hover:border-primary/50 hover:bg-primary/5",
                      isAnswered && isCorrect &&
                        "border-accent/50 bg-accent/10 text-accent",
                      isAnswered && isSelected && !isCorrect &&
                        "border-destructive/50 bg-destructive/10 text-destructive",
                      isAnswered && !isCorrect && !isSelected &&
                        "border-border text-muted-foreground",
                    )}
                  >
                    <span>{opt}</span>
                    {isAnswered && isCorrect && <Check className="size-4 shrink-0" />}
                    {isAnswered && isSelected && !isCorrect && (
                      <X className="size-4 shrink-0" />
                    )}
                  </button>
                )
              })}
            </div>

            {isAnswered && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 rounded-lg bg-secondary/40 px-4 py-2.5 text-sm text-muted-foreground"
              >
                {q.explanation}
              </motion.p>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
