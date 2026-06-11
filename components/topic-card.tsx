"use client"

import { Bookmark } from "lucide-react"
import { motion } from "motion/react"
import type { Topic } from "@/lib/course-data"
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
  return (
    <motion.article
      id={topic.id}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.2) }}
      className="scroll-mt-24 rounded-2xl border border-border bg-card p-6 shadow-sm"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-card-foreground text-balance">
          {topic.title}
        </h3>
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

      <p className="mt-2 leading-relaxed text-muted-foreground">
        {topic.description}
      </p>

      {topic.details && (
        <ul className="mt-4 space-y-2">
          {topic.details.map((d) => (
            <li key={d} className="flex gap-2.5 text-sm text-foreground/90">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
              <span className="leading-relaxed">{d}</span>
            </li>
          ))}
        </ul>
      )}

      {topic.table && (
        <div className="mt-5 overflow-hidden rounded-xl border border-border">
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

      {topic.widget && (
        <div className="mt-5">
          <Widget name={topic.widget} />
        </div>
      )}
    </motion.article>
  )
}
