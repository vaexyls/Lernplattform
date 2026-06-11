"use client"

import { ArrowRight, Layers, Monitor, Router, Server, Network } from "lucide-react"

const osiLayers = [
  { n: 7, name: "Anwendung", example: "HTTP, DNS, SMTP" },
  { n: 6, name: "Darstellung", example: "SSL/TLS, JPEG" },
  { n: 5, name: "Sitzung", example: "Sessions, RPC" },
  { n: 4, name: "Transport", example: "TCP, UDP" },
  { n: 3, name: "Vermittlung", example: "IP, ICMP" },
  { n: 2, name: "Sicherung", example: "Ethernet, MAC" },
  { n: 1, name: "Bitübertragung", example: "Kabel, Funk" },
]

export function OsiDiagram() {
  return (
    <div className="rounded-xl border border-border bg-secondary/40 p-5">
      <div className="mb-4 flex items-center gap-2">
        <Layers className="size-4 text-accent" />
        <h4 className="text-sm font-semibold text-foreground">
          OSI 7-Schichten-Modell
        </h4>
      </div>
      <ul className="space-y-1.5">
        {osiLayers.map((l) => (
          <li
            key={l.n}
            className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2"
          >
            <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary/15 text-xs font-bold text-primary">
              {l.n}
            </span>
            <span className="flex-1 text-sm font-medium text-foreground">
              {l.name}
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              {l.example}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function DiagramNode({
  icon: Icon,
  label,
  sub,
  tone = "primary",
}: {
  icon: typeof Monitor
  label: string
  sub?: string
  tone?: "primary" | "accent" | "muted"
}) {
  const toneClass =
    tone === "accent"
      ? "text-accent ring-accent/30 bg-accent/10"
      : tone === "muted"
        ? "text-muted-foreground ring-border bg-card"
        : "text-primary ring-primary/30 bg-primary/10"
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <div
        className={`flex size-12 items-center justify-center rounded-xl ring-1 ${toneClass}`}
      >
        <Icon className="size-6" />
      </div>
      <span className="text-xs font-medium text-foreground">{label}</span>
      {sub && <span className="font-mono text-[10px] text-muted-foreground">{sub}</span>}
    </div>
  )
}

export function NatDiagram() {
  return (
    <div className="rounded-xl border border-border bg-secondary/40 p-5">
      <div className="mb-4 flex items-center gap-2">
        <Network className="size-4 text-accent" />
        <h4 className="text-sm font-semibold text-foreground">
          NAT: Privat zu Öffentlich
        </h4>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <DiagramNode icon={Monitor} label="Client" sub="192.168.0.10" />
        <ArrowRight className="size-5 text-muted-foreground" />
        <DiagramNode icon={Router} label="NAT-Router" sub="übersetzt" tone="accent" />
        <ArrowRight className="size-5 text-muted-foreground" />
        <DiagramNode icon={Server} label="Internet" sub="203.0.113.5" tone="muted" />
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        Die private Quelladresse wird durch die öffentliche IP des Routers ersetzt.
      </p>
    </div>
  )
}

export function RoutingDiagram() {
  return (
    <div className="rounded-xl border border-border bg-secondary/40 p-5">
      <div className="mb-4 flex items-center gap-2">
        <Router className="size-4 text-accent" />
        <h4 className="text-sm font-semibold text-foreground">
          Routing zwischen Netzen
        </h4>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <DiagramNode icon={Monitor} label="Netz A" sub="10.0.1.0/24" />
        <ArrowRight className="size-5 text-muted-foreground" />
        <DiagramNode icon={Router} label="Router 1" tone="primary" />
        <ArrowRight className="size-5 text-muted-foreground" />
        <DiagramNode icon={Router} label="Router 2" tone="primary" />
        <ArrowRight className="size-5 text-muted-foreground" />
        <DiagramNode icon={Monitor} label="Netz B" sub="10.0.2.0/24" tone="accent" />
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        Pakete werden Hop für Hop anhand der Routing-Tabelle weitergeleitet.
      </p>
    </div>
  )
}

export function VlanDiagram() {
  return (
    <div className="rounded-xl border border-border bg-secondary/40 p-5">
      <div className="mb-4 flex items-center gap-2">
        <Network className="size-4 text-accent" />
        <h4 className="text-sm font-semibold text-foreground">
          VLAN-Segmentierung an einem Switch
        </h4>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-wrap items-center justify-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-2">
              <DiagramNode icon={Monitor} label="PC 1" sub="VLAN 10" />
              <DiagramNode icon={Monitor} label="PC 2" sub="VLAN 10" />
            </div>
            <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
              VLAN 10 – Büro
            </span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-2">
              <DiagramNode icon={Monitor} label="PC 3" sub="VLAN 20" tone="accent" />
              <DiagramNode icon={Monitor} label="PC 4" sub="VLAN 20" tone="accent" />
            </div>
            <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold text-accent">
              VLAN 20 – Gäste
            </span>
          </div>
        </div>
        <DiagramNode icon={Network} label="Switch" sub="802.1Q" tone="muted" />
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        Ein physischer Switch trennt den Verkehr logisch in getrennte VLANs.
      </p>
    </div>
  )
}
