"use client"

import * as React from "react"
import { Search, ExternalLink, Calendar, ShieldCheck, FileText, CheckCircle2 } from "lucide-react"
import { globalSources, years, type Source } from "@/lib/course-data"
import { cn } from "@/lib/utils"

export default function SourcesPage() {
  const [search, setSearch] = React.useState("")
  const [typeFilter, setTypeFilter] = React.useState<string>("all")
  const [categoryFilter, setCategoryFilter] = React.useState<string>("all")

  const filteredSources = React.useMemo(() => {
    return globalSources.filter(src => {
      const matchesSearch = src.title.toLowerCase().includes(search.toLowerCase()) ||
                            src.organization.toLowerCase().includes(search.toLowerCase())
      const matchesType = typeFilter === "all" || src.type === typeFilter
      const matchesCategory = categoryFilter === "all" || src.category === categoryFilter

      return matchesSearch && matchesType && matchesCategory
    })
  }, [search, typeFilter, categoryFilter])

  return (
    <div className="min-h-screen bg-background text-foreground p-6 sm:p-12 max-w-5xl mx-auto space-y-8">
      <header className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold">
          <ShieldCheck className="size-4" />
          Verifiziertes Curriculum
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Quellen & Referenzen</h1>
        <p className="text-muted-foreground text-sm max-w-2xl leading-relaxed">
          Transparenz hat höchste Priorität. Jedes Thema unseres Portals referenziert offizielle Ausbildungspläne des BIBB, IHK-Richtlinien sowie anerkannte technische Standards. Hier finden Sie alle verwendeten Quellen im Überblick.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3 bg-card p-4 rounded-xl border border-border">
        <div className="relative col-span-1 sm:col-span-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Quellen durchsuchen..."
            className="w-full rounded-lg border border-border bg-input py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="all">Alle Glaubwürdigkeitsstufen</option>
            <option value="official">Offizielle Lehrpläne / Gesetze</option>
            <option value="primary">Primärquellen / Vendor Docs</option>
            <option value="supplementary">Zusätzliches Lernmaterial</option>
          </select>
        </div>

        <div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full rounded-lg border border-border bg-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="all">Alle Themenbereiche</option>
            <option value="lehrplan">Curriculum / Rahmenlehrplan</option>
            <option value="network">Netzwerktechnik</option>
            <option value="legal">Rechtliches & Standards</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredSources.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-12 text-center text-muted-foreground text-sm">
            Keine Quellen gefunden, die den Filtern entsprechen.
          </div>
        ) : (
          filteredSources.map((src) => (
            <div key={src.id} className="bg-card p-5 rounded-xl border border-border flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:border-primary/40 transition-colors">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                    src.type === 'official' ? "bg-primary/20 text-primary border border-primary/20" : "bg-secondary text-muted-foreground border border-border"
                  )}>
                    {src.type === 'official' ? 'Offiziell (Bund/IHK)' : 'Industrie-Standard'}
                  </span>
                  <span className="text-xs text-muted-foreground px-2 py-0.5 rounded-full bg-secondary">
                    {src.category === 'curriculum' ? 'Ausbildungsrahmenplan' : src.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-foreground hover:text-primary transition-colors">
                    <a href={src.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1">
                      <span>{src.title}</span>
                      <ExternalLink className="size-4 shrink-0" />
                    </a>
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{src.organization}</p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
                  {src.publicationDate && (
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3.5" />
                      Veröffentlicht: {src.publicationDate}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="size-3.5 text-accent" />
                    Zuletzt geprüft: {src.dateAccessed}
                  </span>
                </div>
              </div>

              <div className="shrink-0 flex items-center justify-end sm:justify-start">
                <span className="text-[10px] text-muted-foreground flex items-center gap-1 border border-border px-2.5 py-1 rounded-md bg-secondary/20">
                  <FileText className="size-3" />
                  ID: {src.id}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
