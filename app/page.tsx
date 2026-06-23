"use client"

import * as React from "react"
import { BookOpen, Layers, ListChecks, Menu, Bookmark } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import {
  years,
  TOTAL_QUESTIONS,
  COURSE_TITLE,
  COURSE_SUBTITLE,
  type YearNumber,
  type Category,
  type Topic,
} from "@/lib/course-data"
import { useProgress } from "@/hooks/use-progress"
import { Sidebar } from "@/components/sidebar"
import { TopicCard } from "@/components/topic-card"
import { Quiz } from "@/components/quiz"
import { Flashcards } from "@/components/flashcards"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

type ViewMode = "lernen" | "quiz" | "karten"

export default function Page() {
  const { state, hydrated, markAnswered, toggleBookmark } = useProgress()
  const [activeYear, setActiveYear] = React.useState<YearNumber>(years[0].year)
  const [activeCategory, setActiveCategory] = React.useState<string | null>(null)
  const [view, setView] = React.useState<ViewMode>("lernen")
  const [activeTopic, setActiveTopic] = React.useState<string | null>(null)
  const [search, setSearch] = React.useState("")
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [showBookmarksOnly, setShowBookmarksOnly] = React.useState(false)

  const currentYearData = years.find((y) => y.year === activeYear) || years[0]
  const currentCategoryData = activeCategory
    ? currentYearData.categories.find((c) => c.id === activeCategory)
    : currentYearData.categories[0]

  // Set initial active category if not set or if year changes
  React.useEffect(() => {
    if (!activeCategory && currentCategoryData) {
      setActiveCategory(currentCategoryData.id)
    }
    if (activeCategory && !currentYearData.categories.some(c => c.id === activeCategory)) {
      setActiveCategory(currentYearData.categories[0]?.id || null)
    }
  }, [activeYear, activeCategory, currentYearData])

  const categoryProgress = React.useMemo(() => {
    const map: Record<string, number> = {}
    for (const year of years) {
      for (const category of year.categories) {
        const answered = category.quiz.filter((q) =>
          state.answered.includes(q.id),
        ).length
        map[category.id] = category.quiz.length
          ? (answered / category.quiz.length) * 100
          : 0
      }
    }
    return map
  }, [state.answered])

  const totalAnswered = state.answered.length
  const overallPct = TOTAL_QUESTIONS
    ? (totalAnswered / TOTAL_QUESTIONS) * 100
    : 0

  const handleSelectYear = React.useCallback((year: YearNumber) => {
    setActiveYear(year)
    setActiveCategory(null) // Reset category when year changes
    setActiveTopic(null)
    setView("lernen")
    setShowBookmarksOnly(false)
    setSidebarOpen(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const handleSelectTopic = React.useCallback((year: YearNumber, categoryId: string, topicId: string) => {
    setActiveYear(year)
    setActiveCategory(categoryId)
    setView("lernen")
    setActiveTopic(topicId)
    setShowBookmarksOnly(false)
    setSidebarOpen(false)
    requestAnimationFrame(() => {
      document
        .getElementById(topicId)
        ?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }, [])

  const handleSelectQuiz = React.useCallback((year: YearNumber, categoryId: string) => {
    setActiveYear(year)
    setActiveCategory(categoryId)
    setView("quiz")
    setActiveTopic(null)
    setSidebarOpen(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const visibleTopics = currentCategoryData
    ? (showBookmarksOnly
        ? currentCategoryData.topics.filter((t) => state.bookmarks.includes(t.id))
        : currentCategoryData.topics)
    : []

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-80 shrink-0 border-r border-sidebar-border lg:block">
        <Sidebar
          activeYear={activeYear}
          onSelectYear={handleSelectYear}
          activeTopic={activeTopic}
          onSelectTopic={handleSelectTopic}
          onSelectQuiz={handleSelectQuiz}
          categoryProgress={categoryProgress}
          search={search}
          onSearch={setSearch}
        />
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] border-r border-sidebar-border lg:hidden"
            >
              <Sidebar
                activeYear={activeYear}
                onSelectYear={handleSelectYear}
                activeTopic={activeTopic}
                onSelectTopic={handleSelectTopic}
                onSelectQuiz={handleSelectQuiz}
                categoryProgress={categoryProgress}
                search={search}
                onSearch={setSearch}
                onClose={() => setSidebarOpen(false)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main className="min-w-0 flex-1">
        {/* Top progress bar */}
        <div className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
          <div className="mx-auto flex max-w-4xl items-center gap-4 px-4 py-3 sm:px-8">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground lg:hidden"
              aria-label="Navigation öffnen"
            >
              <Menu className="size-5" />
            </button>
            <div className="flex-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-foreground">Gesamtfortschritt</span>
                <span className="text-muted-foreground">
                  {hydrated ? totalAnswered : 0} von {TOTAL_QUESTIONS} Fragen
                  beantwortet
                </span>
              </div>
              <Progress value={hydrated ? overallPct : 0} className="mt-1.5 h-2" />
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-8">
          {/* Hero */}
          <header className="mb-8">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs font-medium text-accent">
              Lernplattform by Luca
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
              {COURSE_TITLE} - {currentYearData.title}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {currentCategoryData?.title || "Kategorie auswählen"}
            </p>
          </header>

          {/* View tabs */}
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <ViewTab
              active={view === "lernen"}
              onClick={() => setView("lernen")}
              icon={BookOpen}
              label="Lernen"
            />
            <ViewTab
              active={view === "karten"}
              onClick={() => setView("karten")}
              icon={Layers}
              label="Lernkarten"
            />
            <ViewTab
              active={view === "quiz"}
              onClick={() => setView("quiz")}
              icon={ListChecks}
              label="Quiz"
            />
            {view === "lernen" && (
              <button
                type="button"
                onClick={() => setShowBookmarksOnly((v) => !v)}
                className={cn(
                  "ml-auto flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm transition-colors",
                  showBookmarksOnly
                    ? "border-accent/40 bg-accent/15 text-accent"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                <Bookmark
                  className={cn("size-4", showBookmarksOnly && "fill-current")}
                />
                Gemerkt
                {state.bookmarks.length > 0 && (
                  <span className="rounded-full bg-secondary px-1.5 text-xs">
                    {state.bookmarks.length}
                  </span>
                )}
              </button>
            )}
          </div>

          {/* Content */}
          {view === "lernen" && (
            <div className="space-y-5">
              {visibleTopics.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
                  {showBookmarksOnly
                    ? "Noch keine Themen in dieser Kategorie gemerkt."
                    : "Keine Themen vorhanden."}
                </div>
              ) : (
                visibleTopics.map((topic, i) => (
                  <TopicCard
                    key={topic.id}
                    topic={topic}
                    index={i}
                    bookmarked={state.bookmarks.includes(topic.id)}
                    onToggleBookmark={toggleBookmark}
                  />
                ))
              )}
            </div>
          )}

          {view === "karten" && currentCategoryData && (
            <Flashcards category={currentCategoryData} />
          )}

          {view === "quiz" && currentCategoryData && (
            <Quiz
              category={currentCategoryData}
              answeredIds={state.answered}
              onAnswerCorrect={markAnswered}
            />
          )}

          {/* Category pager */}
          <CategoryPager
            currentCategory={currentCategoryData}
            currentYear={currentYearData}
            onSelect={handleSelectTopic}
          />
        </div>
      </main>
    </div>
  )
}

function ViewTab({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: typeof BookOpen
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
        active
          ? "border-primary bg-primary/15 text-primary"
          : "border-border text-muted-foreground hover:text-foreground",
      )}
    >
      <Icon className="size-4" />
      {label}
    </button>
  )
}

function CategoryPager({
  currentCategory,
  currentYear,
  onSelect,
}: {
  currentCategory: Category | undefined
  currentYear: {
    year: YearNumber;
    title: string;
    categories: Category[];
  }
  onSelect: (year: YearNumber, categoryId: string, topicId: string) => void
}) {
  if (!currentCategory) return null

  const categoryIndex = currentYear.categories.findIndex(
    (cat) => cat.id === currentCategory.id,
  )

  const prevCategory = currentYear.categories[categoryIndex - 1]
  const nextCategory = currentYear.categories[categoryIndex + 1]

  const prevYearData = years.find(y => y.year === currentYear.year - 1)
  const nextYearData = years.find(y => y.year === currentYear.year + 1)

  const firstTopicInPrevCategory = prevCategory?.topics[0]
  const firstTopicInNextCategory = nextCategory?.topics[0]

  const lastCategoryInPrevYear = prevYearData?.categories[prevYearData.categories.length - 1]
  const firstTopicInLastCategoryOfPrevYear = lastCategoryInPrevYear?.topics[0]

  const firstCategoryInNextYear = nextYearData?.categories[0]
  const firstTopicInFirstCategoryOfNextYear = firstCategoryInNextYear?.topics[0]

  return (
    <div className="mt-10 grid gap-3 border-t border-border pt-6 sm:grid-cols-2">
      {(prevCategory && firstTopicInPrevCategory) ? (
        <button
          type="button"
          onClick={() => onSelect(currentYear.year, prevCategory.id, firstTopicInPrevCategory.id)}
          className="rounded-xl border border-border bg-card px-4 py-3 text-left transition-colors hover:border-primary/40"
        >
          <span className="text-xs text-muted-foreground">Vorherige Kategorie</span>
          <span className="block text-sm font-medium text-foreground">
            {prevCategory.title}
          </span>
        </button>
      ) : (lastCategoryInPrevYear && firstTopicInLastCategoryOfPrevYear) ? (
        <button
          type="button"
          onClick={() => onSelect(prevYearData!.year, lastCategoryInPrevYear.id, firstTopicInLastCategoryOfPrevYear.id)}
          className="rounded-xl border border-border bg-card px-4 py-3 text-left transition-colors hover:border-primary/40"
        >
          <span className="text-xs text-muted-foreground">Vorheriges Jahr</span>
          <span className="block text-sm font-medium text-foreground">
            {prevYearData!.title} - {lastCategoryInPrevYear.title}
          </span>
        </button>
      ) : (
        <span />
      )}
      {(nextCategory && firstTopicInNextCategory) ? (
        <button
          type="button"
          onClick={() => onSelect(currentYear.year, nextCategory.id, firstTopicInNextCategory.id)}
          className="rounded-xl border border-border bg-card px-4 py-3 text-right transition-colors hover:border-primary/40 sm:col-start-2"
        >
          <span className="text-xs text-muted-foreground">Nächste Kategorie</span>
          <span className="block text-sm font-medium text-foreground">
            {nextCategory.title}
          </span>
        </button>
      ) : (firstCategoryInNextYear && firstTopicInFirstCategoryOfNextYear) ? (
        <button
          type="button"
          onClick={() => onSelect(nextYearData!.year, firstCategoryInNextYear.id, firstTopicInFirstCategoryOfNextYear.id)}
          className="rounded-xl border border-border bg-card px-4 py-3 text-right transition-colors hover:border-primary/40 sm:col-start-2"
        >
          <span className="text-xs text-muted-foreground">Nächstes Jahr</span>
          <span className="block text-sm font-medium text-foreground">
            {nextYearData!.title} - {firstCategoryInNextYear.title}
          </span>
        </button>
      ) : (
        <span />
      )}
    </div>
  )
}



