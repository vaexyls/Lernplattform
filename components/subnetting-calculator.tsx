"use client"

import { useMemo, useState } from "react"
import { Calculator } from "lucide-react"

function ipToInt(ip: string): number | null {
  const parts = ip.split(".")
  if (parts.length !== 4) return null
  let value = 0
  for (const p of parts) {
    const n = Number(p)
    if (!Number.isInteger(n) || n < 0 || n > 255 || p === "") return null
    value = value * 256 + n
  }
  return value >>> 0
}

function intToIp(value: number): string {
  return [
    (value >>> 24) & 255,
    (value >>> 16) & 255,
    (value >>> 8) & 255,
    value & 255,
  ].join(".")
}

export function SubnettingCalculator() {
  const [ip, setIp] = useState("192.168.1.10")
  const [cidr, setCidr] = useState(24)

  const result = useMemo(() => {
    const ipInt = ipToInt(ip)
    if (ipInt === null) return null
    const mask = cidr === 0 ? 0 : (0xffffffff << (32 - cidr)) >>> 0
    const network = (ipInt & mask) >>> 0
    const broadcast = (network | (~mask >>> 0)) >>> 0
    const totalHosts = 2 ** (32 - cidr)
    const usableHosts = cidr >= 31 ? 0 : totalHosts - 2
    const firstHost = usableHosts > 0 ? network + 1 : network
    const lastHost = usableHosts > 0 ? broadcast - 1 : broadcast
    return {
      mask: intToIp(mask),
      network: intToIp(network),
      broadcast: intToIp(broadcast),
      firstHost: intToIp(firstHost),
      lastHost: intToIp(lastHost),
      usableHosts,
    }
  }, [ip, cidr])

  return (
    <div className="rounded-xl border border-border bg-secondary/40 p-5">
      <div className="mb-4 flex items-center gap-2">
        <Calculator className="size-4 text-accent" />
        <h4 className="text-sm font-semibold text-foreground">
          Interaktive Subnetzberechnung
        </h4>
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
            IP-Adresse
          </label>
          <input
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            placeholder="192.168.1.10"
            className="w-full rounded-lg border border-border bg-input px-3 py-2 font-mono text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="sm:w-44">
          <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
            CIDR / {cidr}
          </label>
          <input
            type="range"
            min={8}
            max={30}
            value={cidr}
            onChange={(e) => setCidr(Number(e.target.value))}
            className="h-9 w-full cursor-pointer accent-[var(--color-primary)]"
          />
        </div>
      </div>

      {result ? (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Stat label="Subnetzmaske" value={result.mask} />
          <Stat label="Netzadresse" value={result.network} accent />
          <Stat label="Broadcast" value={result.broadcast} accent />
          <Stat label="Erste Host-IP" value={result.firstHost} />
          <Stat label="Letzte Host-IP" value={result.lastHost} />
          <Stat
            label="Nutzbare Hosts"
            value={result.usableHosts.toLocaleString("de-DE")}
          />
        </div>
      ) : (
        <p className="mt-4 text-sm text-destructive">
          Bitte eine gültige IPv4-Adresse eingeben.
        </p>
      )}
    </div>
  )
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2">
      <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
      <div
        className={`mt-0.5 font-mono text-sm font-semibold ${
          accent ? "text-accent" : "text-foreground"
        }`}
      >
        {value}
      </div>
    </div>
  )
}
