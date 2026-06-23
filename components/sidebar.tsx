"use client"

import * as React from "react"
import { ChevronDown, Network, Search, X } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import {
  years,
  COURSE_SUBTITLE,
  COURSE_TITLE,
  type YearNumber,
} from "@/lib/course-data"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"

type SidebarProps = {
  activeYear: YearNumber
  onSelectYear: (year: YearNumber) => void
  activeTopic: string | null
  onSelectTopic: (year: YearNumber, categoryId: string, topicId: string) => void
  onSelectQuiz: (year: YearNumber, categoryId: string) => void
  categoryProgress: Record<string, number>
  search: string
  onSearch: (value: string) => void
  onClose?: () => void
}

export function Sidebar({
  activeYear,
  onSelectYear,
  activeTopic,
  onSelectTopic,
  onSelectQuiz,
  categoryProgress,
  search,
  onSearch,
  onClose,
}: SidebarProps) {
  const currentYearData = years.find(y => y.year === activeYear) || years[0]
  const [open, setOpen] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(currentYearData.categories.map((c) => [c.id, true])),
  )

  // Reset open state when year changes
  React.useEffect(() => {
    setOpen(Object.fromEntries(currentYearData.categories.map((c) => [c.id, true])))
  }, [activeYear, currentYearData])

  const query = search.trim().toLowerCase()

  return (
    <div className="flex h-full flex-col bg-sidebar">
      <div className="flex items-start justify-between gap-2 border-b border-sidebar-border px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
            <Network className="size-5" />
          </div>
          <div>
            <h1 className="text-sm font-semibold leading-tight text-sidebar-foreground">
              {COURSE_TITLE}
            </h1>
            <p className="text-xs leading-tight text-muted-foreground">
              {COURSE_SUBTITLE}
            </p>
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground lg:hidden"
            aria-label="Navigation schließen"
          >
            <X className="size-5" />
          </button>
        )}
      </div>

      <div className="px-4 py-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearch(e.target.value)}
            placeholder="Themen durchsuchen..."
            className="w-full rounded-lg border border-sidebar-border bg-input/60 py-2 pl-9 pr-3 text-sm text-sidebar-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      <div className="px-3 pb-2">
        <div className="flex gap-1 rounded-lg bg-sidebar-accent p-1">
          {[1, 2, 3].map((y) => (
            <button
              key={y}
              onClick={() => onSelectYear(y as YearNumber)}
              className={cn(
                "flex-1 rounded-md py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all",
                activeYear === y
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-sidebar-foreground"
              )}
            >
              {y}. Jahr
            </button>
          ))}
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-6">
        {currentYearData.categories.map((category, idx) => {
          const matchingTopics = category.topics.filter(
            (t) =>
              !query ||
              t.title.toLowerCase().includes(query) ||
              t.description.toLowerCase().includes(query),
          )
          const categoryMatches =
            !query || category.title.toLowerCase().includes(query)
          if (query && !categoryMatches && matchingTopics.length === 0) {
            return null
          }
          const topicsToShow =
            query && !categoryMatches ? matchingTopics : category.topics
          const isOpen = open[category.id] || !!query
          const progress = categoryProgress[category.id] ?? 0

          return (
            <div key={category.id} className="rounded-lg">
              <button
                type="button"
                onClick={() =>
                  setOpen((prev) => ({ ...prev, [category.id]: !prev[category.id] }))
                }
                className="group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left hover:bg-sidebar-accent"
              >
                <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-sidebar-accent text-xs font-semibold text-primary ring-1 ring-sidebar-border">
                  {idx + 1}
                </span>
                <span className="flex-1 text-sm font-medium text-sidebar-foreground">
                  {category.title}
                </span>
                <ChevronDown
                  className={cn(
                    "size-4 text-muted-foreground transition-transform",
                    isOpen && "rotate-180",
                  )}
                />
              </button>

              <div className="px-3 pb-1 pt-1">
                <Progress value={progress} className="h-1 bg-sidebar-accent" />
              </div>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <ul className="ml-3 mt-1 space-y-0.5 border-l border-sidebar-border pl-3">
                      {topicsToShow.map((topic) => (
                        <li key={topic.id}>
                          <button
                            type="button"
                            onClick={() => onSelectTopic(activeYear, category.id, topic.id)}
                            className={cn(
                              "w-full rounded-md px-3 py-1.5 text-left text-sm transition-colors",
                              activeTopic === topic.id
                                ? "bg-primary/15 font-medium text-primary"
                                : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
                            )}
                          >
                            {topic.title}
                          </button>
                        </li>
                      ))}
                      {category.quiz.length > 0 && (
                        <li>
                          <button
                            type="button"
                            onClick={() => onSelectQuiz(activeYear, category.id)}
                            className="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-left text-sm font-medium text-accent transition-colors hover:bg-accent/10"
                          >
                            Fragen
                            <span className="rounded-full bg-accent/15 px-1.5 py-0.5 text-[10px] font-semibold text-accent">
                              {category.quiz.length}
                            </span>
                          </button>
                        </li>
                      )}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </nav>
    </div>
  )
}
