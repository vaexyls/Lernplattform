"use client"

import { useCallback, useEffect, useState } from "react"

const STORAGE_KEY = "netzwerk-lernportal-progress-v1"

export type ProgressState = {
  /** answered quiz question ids that were correct */
  answered: string[]
  /** bookmarked topic ids */
  bookmarks: string[]
}

const empty: ProgressState = { answered: [], bookmarks: [] }

function read(): ProgressState {
  if (typeof window === "undefined") return empty
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return empty
    const parsed = JSON.parse(raw)
    return {
      answered: Array.isArray(parsed.answered) ? parsed.answered : [],
      bookmarks: Array.isArray(parsed.bookmarks) ? parsed.bookmarks : [],
    }
  } catch {
    return empty
  }
}

export function useProgress() {
  const [state, setState] = useState<ProgressState>(empty)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setState(read())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state, hydrated])

  const markAnswered = useCallback((id: string) => {
    setState((prev) =>
      prev.answered.includes(id)
        ? prev
        : { ...prev, answered: [...prev.answered, id] },
    )
  }, [])

  const toggleBookmark = useCallback((id: string) => {
    setState((prev) =>
      prev.bookmarks.includes(id)
        ? { ...prev, bookmarks: prev.bookmarks.filter((b) => b !== id) }
        : { ...prev, bookmarks: [...prev.bookmarks, id] },
    )
  }, [])

  const reset = useCallback(() => setState(empty), [])

  return { state, hydrated, markAnswered, toggleBookmark, reset }
}
