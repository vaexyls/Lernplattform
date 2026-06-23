"use client"

import * as React from "react"
import { Bookmark, ExternalLink } from "lucide-react"
import { motion } from "motion/react"
import {
  globalSources,
  type Topic,
} from "@/lib/course-data"
import { cn } from "@/lib/utils"
import { SubnettingCalculator } from "@/components/subnetting-calculator"
import {
  NatDiagram,
  OsiDiagram,
  RoutingDiagram,
  VlanDiagram,
} from "@/components/diagrams"

type TopicCardProps = {
  topic: Topic
  index: number
  bookmarked: boolean
  onToggleBookmark: (id: string) => void
}

function Widget({ name }: { name: NonNullable<Topic["widget"]> }) {
  switch (name) {
    case "subnetting":
      return <SubnettingCalculator />
    case "osi":
      return <OsiDiagram />
    case "vlan-diagram":
      return <VlanDiagram />
    case "routing-diagram":
      return <RoutingDiagram />
    case "nat-diagram":
      return <NatDiagram />
    default:
      return null
  }
}

export function TopicCard({
  topic,
  index,
  bookmarked,
  onToggleBookmark,
}: TopicCardProps) {
  const topicSources = globalSources.filter(src => topic.sources.includes(src.id))

  return (
    <motion.article
      id={topic.id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.2) }}
      className="scroll-mt-24 rounded-2xl border border-border bg-card p-6 shadow-sm space-y-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-card-foreground text-balance">
            {topic.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{topic.description}</p>
        </div>
        <button
          type="button"
          onClick={() => onToggleBookmark(topic.id)}
          aria-pressed={bookmarked}
          aria-label={bookmarked ? "Markierung entfernen" : "Thema merken"}
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-lg border transition-colors",
            bookmarked
              ? "border-accent/40 bg-accent/15 text-accent"
              : "border-border text-muted-foreground hover:border-accent/40 hover:text-accent",
          )}
        >
          <Bookmark className={cn("size-4", bookmarked && "fill-current")} />
        </button>
      </div>

      <div className="prose prose-invert max-w-none text-sm leading-relaxed text-foreground/90 bg-secondary/10 p-4 rounded-xl border border-border">
        {topic.explanation}
      </div>

      {topic.learningObjectives && topic.learningObjectives.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-primary">Lernziele</h4>
          <ul className="grid gap-2 sm:grid-cols-2">
            {topic.learningObjectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {topic.details && topic.details.length > 0 && (
        <ul className="space-y-2">
          {topic.details.map((d) => (
            <li key={d} className="flex gap-2.5 text-sm text-foreground/90">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
              <span className="leading-relaxed">{d}</span>
            </li>
          ))}
        </ul>
      )}

      {topic.table && (
        <div className="overflow-hidden rounded-xl border border-border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-secondary/60">
                {topic.table.headers.map((h) => (
                  <th
                    key={h}
                    className="px-4 py-2.5 font-semibold text-foreground"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topic.table.rows.map((row, i) => (
                <tr
                  key={row[0]}
                  className={cn(
                    "border-t border-border",
                    i % 2 === 1 && "bg-secondary/20",
                  )}
                >
                  <td className="px-4 py-2.5 font-medium text-foreground">
                    {row[0]}
                  </td>
                  <td className="px-4 py-2.5 text-muted-foreground">{row[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {topic.examples && topic.examples.length > 0 && (
        <div className="space-y-2 bg-secondary/15 p-4 rounded-xl border border-border/40">
          <h4 className="text-xs font-bold uppercase tracking-wider text-accent">Praktische Beispiele</h4>
          <ul className="space-y-2.5">
            {topic.examples.map((ex, i) => (
              <li key={i} className="text-sm text-foreground/80 leading-relaxed pl-3 border-l-2 border-accent">
                {ex}
              </li>
            ))}
          </ul>
        </div>
      )}

      {topic.useCases && topic.useCases.length > 0 && (
        <div className="space-y-2 bg-secondary/10 p-4 rounded-xl border border-border/40">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Reale Anwendungsfälle</h4>
          <ul className="space-y-2.5">
            {topic.useCases.map((uc, i) => (
              <li key={i} className="text-sm text-foreground/80 leading-relaxed pl-3 border-l-2 border-emerald-500">
                {uc}
              </li>
            ))}
          </ul>
        </div>
      )}

      {topic.terminology && Object.keys(topic.terminology).length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Schlüsselbegriffe</h4>
          <div className="grid gap-2 sm:grid-cols-2">
            {Object.entries(topic.terminology).map(([term, desc]) => (
              <div key={term} className="bg-secondary/5 p-3 rounded-lg border border-border/30">
                <span className="block font-semibold text-sm text-foreground">{term}</span>
                <span className="block text-xs text-muted-foreground mt-1">{desc}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {topic.exercises && topic.exercises.length > 0 && (
        <div className="space-y-2 bg-primary/5 p-4 rounded-xl border border-primary/20">
          <h4 className="text-xs font-bold uppercase tracking-wider text-primary">Empfohlene Übungen</h4>
          <ul className="space-y-2">
            {topic.exercises.map((ex, i) => (
              <li key={i} className="flex gap-2 text-sm text-foreground/80">
                <span className="font-bold text-primary">{i + 1}.</span>
                <span>{ex}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {topic.furtherReading && topic.furtherReading.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Weiterführende Literatur</h4>
          <div className="flex flex-wrap gap-2">
            {topic.furtherReading.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary/20 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors"
              >
                <span>{link.title}</span>
                <ExternalLink className="size-3" />
              </a>
            ))}
          </div>
        </div>
      )}

      {topicSources.length > 0 && (
        <div className="pt-4 border-t border-border/60 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Quellen & Referenzen</h4>
          <div className="space-y-2">
            {topicSources.map((src) => (
              <div key={src.id} className="text-xs text-muted-foreground space-y-1">
                <div className="flex items-center gap-1.5 font-medium text-foreground">
                  <span className={cn(
                    "px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                    src.type === 'official' ? "bg-primary/20 text-primary border border-primary/30" : "bg-secondary text-muted-foreground"
                  )}>
                    {src.type === 'official' ? 'Offizielles Curriculum' : 'Primärquelle'}
                  </span>
                  <a href={src.url} target="_blank" rel="noopener noreferrer" className="hover:underline inline-flex items-center gap-1">
                    <span>{src.title}</span>
                    <ExternalLink className="size-3" />
                  </a>
                </div>
                <div>{src.organization} {src.publicationDate && `· Veröffentlicht: ${src.publicationDate}`} · Abgerufen: {src.dateAccessed}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {topic.widget && (
        <div className="mt-5">
          <Widget name={topic.widget} />
        </div>
      )}
    </motion.article>
  )
}
