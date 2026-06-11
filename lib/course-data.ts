export type TableData = {
  headers: [string, string]
  rows: [string, string][]
}

export type Topic = {
  id: string
  title: string
  description: string
  details?: string[]
  table?: TableData
  /** marks an interactive widget to render for this topic */
  widget?: "subnetting" | "osi" | "vlan-diagram" | "routing-diagram" | "nat-diagram"
}

export type QuizQuestion = {
  id: string
  question: string
  options: string[]
  answer: number
  explanation: string
}

export type Chapter = {
  id: string
  number: number
  title: string
  subtitle: string
  topics: Topic[]
  quiz: QuizQuestion[]
}

export const COURSE_TITLE = "Netzwerk Lernportal"
export const COURSE_SUBTITLE = "Netzwerk-Grundlagen & TCP/IP"

export const chapters: Chapter[] = [
  {
    id: "ch1",
    number: 1,
    title: "Netzwerk Grundlagen",
    subtitle: "Begriffe, Typen, Topologien und Geräte",
    topics: [
      {
        id: "was-ist-netzwerk",
        title: "Was ist ein Netzwerk?",
        description:
          "Ein Netzwerk ist ein Verbund von zwei oder mehr Geräten, die miteinander kommunizieren, um Daten und Ressourcen auszutauschen.",
        details: [
          "Geräte (Hosts) werden über Übertragungsmedien wie Kupfer, Glasfaser oder Funk verbunden.",
          "Ziel ist das Teilen von Ressourcen: Dateien, Drucker, Internetzugang und Dienste.",
          "Kommunikation erfolgt nach festgelegten Regeln (Protokollen).",
        ],
      },
      {
        id: "netzwerktypen",
        title: "Netzwerktypen (LAN, WAN, MAN, WLAN)",
        description:
          "Netzwerke werden nach ihrer geografischen Ausdehnung und Technologie unterschieden.",
        table: {
          headers: ["Typ", "Beschreibung"],
          rows: [
            ["LAN", "Local Area Network – lokales Netz, z. B. Büro oder Haushalt"],
            ["WAN", "Wide Area Network – weiträumig, z. B. das Internet"],
            ["MAN", "Metropolitan Area Network – stadtweite Vernetzung"],
            ["WLAN", "Wireless LAN – drahtloses lokales Netz über Funk"],
          ],
        },
      },
      {
        id: "topologien",
        title: "Topologien",
        description:
          "Die Topologie beschreibt die physische oder logische Anordnung der Netzwerkgeräte.",
        table: {
          headers: ["Topologie", "Merkmal"],
          rows: [
            ["Stern", "Alle Geräte an zentralem Switch – heute Standard"],
            ["Bus", "Gemeinsames Kabel – veraltet, kollisionsanfällig"],
            ["Ring", "Geräte in geschlossenem Kreis verbunden"],
            ["Mesh", "Jeder mit jedem – sehr ausfallsicher"],
          ],
        },
      },
      {
        id: "netzwerkgeraete",
        title: "Netzwerkgeräte",
        description:
          "Verschiedene Geräte erfüllen unterschiedliche Aufgaben auf verschiedenen Schichten.",
        table: {
          headers: ["Gerät", "Funktion"],
          rows: [
            ["Hub", "Verteilt Signale an alle Ports (Layer 1)"],
            ["Switch", "Leitet Frames anhand MAC-Adressen weiter (Layer 2)"],
            ["Router", "Verbindet Netze und leitet anhand IP weiter (Layer 3)"],
            ["Access Point", "Stellt drahtlosen Zugang bereit"],
          ],
        },
      },
    ],
    quiz: [
      {
        id: "q1-1",
        question: "Welcher Netzwerktyp beschreibt das Internet am besten?",
        options: ["LAN", "WAN", "MAN", "WLAN"],
        answer: 1,
        explanation: "Das Internet ist ein weltweites WAN (Wide Area Network).",
      },
      {
        id: "q1-2",
        question: "Auf welcher OSI-Schicht arbeitet ein Switch typischerweise?",
        options: ["Layer 1", "Layer 2", "Layer 3", "Layer 4"],
        answer: 1,
        explanation: "Ein Switch arbeitet auf Layer 2 und nutzt MAC-Adressen.",
      },
      {
        id: "q1-3",
        question: "Welche Topologie ist heute am weitesten verbreitet?",
        options: ["Bus", "Ring", "Stern", "Token"],
        answer: 2,
        explanation: "Die Stern-Topologie mit zentralem Switch ist Standard.",
      },
      {
        id: "q1-4",
        question: "Was bedeutet die Abkürzung WLAN?",
        options: [
          "Wide Local Area Network",
          "Wireless Local Area Network",
          "Wired LAN",
          "World LAN",
        ],
        answer: 1,
        explanation: "WLAN steht für Wireless Local Area Network.",
      },
    ],
  },
  {
    id: "ch2",
    number: 2,
    title: "TCP/IP & OSI-Modell",
    subtitle: "Schichtenmodelle, Protokolle, Ports und Dienste",
    topics: [
      {
        id: "osi",
        title: "OSI-Schichtenmodell",
        description:
          "Das OSI-Modell unterteilt die Netzwerkkommunikation in 7 logische Schichten.",
        widget: "osi",
      },
      {
        id: "tcpip-modell",
        title: "TCP/IP-Modell",
        description:
          "Das praxisnahe TCP/IP-Modell fasst die OSI-Schichten in 4 Ebenen zusammen.",
        table: {
          headers: ["Schicht", "Aufgabe"],
          rows: [
            ["Anwendung", "Dienste wie HTTP, DNS, SMTP"],
            ["Transport", "TCP / UDP – Ende-zu-Ende Kommunikation"],
            ["Internet", "IP – Adressierung und Routing"],
            ["Netzzugang", "Physische Übertragung, Ethernet"],
          ],
        },
      },
      {
        id: "tcp",
        title: "TCP",
        description:
          "TCP ist ein verbindungsorientiertes Transportprotokoll, das eine zuverlässige Datenübertragung gewährleistet.",
        table: {
          headers: ["Eigenschaft", "Beschreibung"],
          rows: [
            ["Verbindung", "Verbindungsorientiert"],
            ["Zuverlässigkeit", "Hoch"],
            ["Reihenfolge", "Garantiert"],
            ["Fehlerkontrolle", "Ja"],
            ["Einsatz", "HTTP, HTTPS, FTP, SMTP"],
          ],
        },
      },
      {
        id: "udp",
        title: "UDP",
        description:
          "UDP ist ein verbindungsloses Transportprotokoll für schnelle, aber unzuverlässige Übertragung.",
        table: {
          headers: ["Eigenschaft", "Beschreibung"],
          rows: [
            ["Verbindung", "Verbindungslos"],
            ["Zuverlässigkeit", "Gering"],
            ["Reihenfolge", "Nicht garantiert"],
            ["Geschwindigkeit", "Sehr hoch"],
            ["Einsatz", "DNS, VoIP, Streaming, Online-Gaming"],
          ],
        },
      },
      {
        id: "ports-dienste",
        title: "Ports & Dienste",
        description:
          "Ports identifizieren Dienste auf einem Host. Bekannte Ports liegen zwischen 0 und 1023.",
        table: {
          headers: ["Port", "Dienst"],
          rows: [
            ["20/21", "FTP"],
            ["22", "SSH"],
            ["25", "SMTP"],
            ["53", "DNS"],
            ["80", "HTTP"],
            ["443", "HTTPS"],
          ],
        },
      },
    ],
    quiz: [
      {
        id: "q2-1",
        question: "Wie viele Schichten hat das OSI-Modell?",
        options: ["4", "5", "7", "8"],
        answer: 2,
        explanation: "Das OSI-Modell besteht aus 7 Schichten.",
      },
      {
        id: "q2-2",
        question: "Welches Protokoll ist verbindungsorientiert?",
        options: ["UDP", "TCP", "ICMP", "ARP"],
        answer: 1,
        explanation: "TCP ist verbindungsorientiert und garantiert die Reihenfolge.",
      },
      {
        id: "q2-3",
        question: "Welcher Port wird standardmäßig für HTTPS verwendet?",
        options: ["80", "21", "443", "25"],
        answer: 2,
        explanation: "HTTPS nutzt standardmäßig Port 443.",
      },
      {
        id: "q2-4",
        question: "Welches Protokoll eignet sich am besten für Echtzeit-Streaming?",
        options: ["TCP", "UDP", "FTP", "SMTP"],
        answer: 1,
        explanation: "UDP ist schnell und verbindungslos – ideal für Streaming.",
      },
      {
        id: "q2-5",
        question: "Auf welcher TCP/IP-Schicht arbeitet IP?",
        options: ["Anwendung", "Transport", "Internet", "Netzzugang"],
        answer: 2,
        explanation: "IP arbeitet auf der Internet-Schicht des TCP/IP-Modells.",
      },
    ],
  },
  {
    id: "ch3",
    number: 3,
    title: "IPv4 & Subnetting",
    subtitle: "Adressaufbau, Masken, CIDR und Subnetzberechnung",
    topics: [
      {
        id: "ipv4-aufbau",
        title: "IPv4-Aufbau",
        description:
          "Eine IPv4-Adresse besteht aus 32 Bit, aufgeteilt in vier Oktette zu je 8 Bit (z. B. 192.168.1.10).",
        details: [
          "Jedes Oktett kann Werte von 0 bis 255 annehmen.",
          "Die Adresse teilt sich in Netz- und Hostanteil.",
          "Es gibt private Bereiche: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16.",
        ],
      },
      {
        id: "netzmaske",
        title: "Netzmaske",
        description:
          "Die Subnetzmaske trennt Netz- und Hostanteil einer IP-Adresse.",
        table: {
          headers: ["Maske", "CIDR"],
          rows: [
            ["255.0.0.0", "/8"],
            ["255.255.0.0", "/16"],
            ["255.255.255.0", "/24"],
            ["255.255.255.128", "/25"],
          ],
        },
      },
      {
        id: "cidr",
        title: "CIDR",
        description:
          "CIDR (Classless Inter-Domain Routing) gibt die Anzahl der Netzbits als Suffix an, z. B. /24.",
        details: [
          "/24 entspricht 256 Adressen (254 nutzbare Hosts).",
          "Je größer das Suffix, desto kleiner das Netz.",
          "CIDR löst die starre Klasseneinteilung ab.",
        ],
      },
      {
        id: "subnetzberechnung",
        title: "Subnetzberechnung",
        description:
          "Subnetting teilt ein Netzwerk in kleinere logische Teilnetze auf. Probiere es interaktiv aus.",
        widget: "subnetting",
        table: {
          headers: ["Begriff", "Erklärung"],
          rows: [
            ["Netzadresse", "Erste Adresse im Netz"],
            ["Broadcast", "Letzte Adresse"],
            ["Hostbereich", "Nutzbare IPs"],
            ["CIDR", "Schreibweise /24, /25 usw."],
          ],
        },
      },
      {
        id: "broadcast-network",
        title: "Broadcast & Network-ID",
        description:
          "Die Network-ID ist die erste, die Broadcast-Adresse die letzte Adresse eines Subnetzes.",
        table: {
          headers: ["Begriff", "Beispiel /24"],
          rows: [
            ["Network-ID", "192.168.1.0"],
            ["Erste Host-IP", "192.168.1.1"],
            ["Letzte Host-IP", "192.168.1.254"],
            ["Broadcast", "192.168.1.255"],
          ],
        },
      },
      {
        id: "praxisbeispiele",
        title: "Praxisbeispiele",
        description:
          "Typische Aufgabenstellungen zur Subnetzberechnung in der Prüfung.",
        details: [
          "Gegeben 192.168.10.0/26: 4 Subnetze mit je 62 Hosts.",
          "Gegeben /28: 16 Adressen, 14 nutzbare Hosts pro Subnetz.",
          "Anzahl Hosts = 2^(32 - CIDR) - 2.",
        ],
      },
    ],
    quiz: [
      {
        id: "q3-1",
        question: "Wie viele Bit hat eine IPv4-Adresse?",
        options: ["16", "32", "48", "64"],
        answer: 1,
        explanation: "Eine IPv4-Adresse besteht aus 32 Bit.",
      },
      {
        id: "q3-2",
        question: "Wie viele nutzbare Hosts hat ein /24-Netz?",
        options: ["256", "254", "255", "128"],
        answer: 1,
        explanation: "256 Adressen minus Network-ID und Broadcast = 254 Hosts.",
      },
      {
        id: "q3-3",
        question: "Welche Maske entspricht /26?",
        options: [
          "255.255.255.0",
          "255.255.255.192",
          "255.255.255.224",
          "255.255.255.128",
        ],
        answer: 1,
        explanation: "/26 = 255.255.255.192 (2 zusätzliche Netzbits).",
      },
      {
        id: "q3-4",
        question: "Was ist die Broadcast-Adresse von 192.168.1.0/24?",
        options: [
          "192.168.1.0",
          "192.168.1.1",
          "192.168.1.254",
          "192.168.1.255",
        ],
        answer: 3,
        explanation: "Die letzte Adresse 192.168.1.255 ist der Broadcast.",
      },
      {
        id: "q3-5",
        question: "Welcher Bereich ist eine private IPv4-Adresse?",
        options: ["8.8.8.0/24", "172.16.0.0/12", "1.1.1.0/24", "200.0.0.0/8"],
        answer: 1,
        explanation: "172.16.0.0/12 gehört zu den privaten Adressbereichen.",
      },
    ],
  },
  {
    id: "ch4",
    number: 4,
    title: "NAT & Routing",
    subtitle: "Routing-Verfahren, Router-Funktionen, NAT und PAT",
    topics: [
      {
        id: "routing-grundlagen",
        title: "Routing Grundlagen",
        description:
          "Routing ist der Prozess der Wegfindung für Datenpakete zwischen verschiedenen Netzwerken.",
        widget: "routing-diagram",
      },
      {
        id: "router-funktionen",
        title: "Router Funktionen",
        description:
          "Ein Router verbindet Netze und trifft Weiterleitungsentscheidungen anhand der IP-Adresse.",
        details: [
          "Pflegt eine Routing-Tabelle mit Zielen und nächsten Hops.",
          "Trennt Broadcast-Domänen.",
          "Kann NAT, Firewall und DHCP bereitstellen.",
        ],
      },
      {
        id: "statisches-routing",
        title: "Statisches Routing",
        description:
          "Routen werden manuell vom Administrator konfiguriert und ändern sich nicht automatisch.",
        table: {
          headers: ["Vorteil", "Nachteil"],
          rows: [
            ["Geringe CPU-Last", "Hoher Pflegeaufwand"],
            ["Vorhersehbar", "Keine automatische Anpassung"],
            ["Sicher", "Fehleranfällig bei großen Netzen"],
          ],
        },
      },
      {
        id: "dynamisches-routing",
        title: "Dynamisches Routing",
        description:
          "Router tauschen über Protokolle automatisch Routeninformationen aus.",
        table: {
          headers: ["Protokoll", "Typ"],
          rows: [
            ["RIP", "Distanzvektor"],
            ["OSPF", "Link-State"],
            ["EIGRP", "Hybrid (Cisco)"],
            ["BGP", "Pfadvektor (Internet)"],
          ],
        },
      },
      {
        id: "nat",
        title: "NAT",
        description:
          "NAT übersetzt private IP-Adressen in öffentliche IP-Adressen.",
        widget: "nat-diagram",
        table: {
          headers: ["Typ", "Funktion"],
          rows: [
            ["Static NAT", "1:1 Zuordnung"],
            ["Dynamic NAT", "Pool öffentlicher IPs"],
            ["PAT", "Viele interne Hosts auf eine öffentliche IP"],
          ],
        },
      },
      {
        id: "pat",
        title: "PAT",
        description:
          "PAT (Port Address Translation) bildet viele interne Adressen über Portnummern auf eine öffentliche IP ab.",
        details: [
          "Auch bekannt als NAT Overload.",
          "Unterscheidung der Verbindungen über Quell-Ports.",
          "Standard in den meisten Heimroutern.",
        ],
      },
      {
        id: "default-gateway",
        title: "Default Gateway",
        description:
          "Das Default Gateway ist der Router, an den ein Host Pakete sendet, deren Ziel außerhalb des eigenen Netzes liegt.",
        details: [
          "Meist die erste nutzbare Adresse im Subnetz (z. B. 192.168.1.1).",
          "Ohne Gateway ist nur lokale Kommunikation möglich.",
        ],
      },
    ],
    quiz: [
      {
        id: "q4-1",
        question: "Wofür steht NAT?",
        options: [
          "Network Address Translation",
          "Network Access Table",
          "New Address Type",
          "Node Address Transfer",
        ],
        answer: 0,
        explanation: "NAT bedeutet Network Address Translation.",
      },
      {
        id: "q4-2",
        question: "Welches Routing-Protokoll ist ein Link-State-Protokoll?",
        options: ["RIP", "OSPF", "BGP", "PAT"],
        answer: 1,
        explanation: "OSPF ist ein Link-State-Routing-Protokoll.",
      },
      {
        id: "q4-3",
        question: "Was macht PAT?",
        options: [
          "1:1 Adresszuordnung",
          "Viele Hosts auf eine öffentliche IP über Ports",
          "Verschlüsselt Pakete",
          "Weist DHCP-Adressen zu",
        ],
        answer: 1,
        explanation: "PAT mappt viele interne Hosts über Ports auf eine IP.",
      },
      {
        id: "q4-4",
        question: "Wohin sendet ein Host Pakete für ein fremdes Netz?",
        options: ["An den Switch", "An das Default Gateway", "An den Hub", "An den DNS-Server"],
        answer: 1,
        explanation: "Pakete für fremde Netze gehen an das Default Gateway.",
      },
      {
        id: "q4-5",
        question: "Welcher Routing-Typ erfordert manuelle Konfiguration?",
        options: ["Dynamisches Routing", "Statisches Routing", "OSPF", "RIP"],
        answer: 1,
        explanation: "Statisches Routing wird manuell konfiguriert.",
      },
    ],
  },
  {
    id: "ch5",
    number: 5,
    title: "VLAN",
    subtitle: "Segmentierung, Tagging und Inter-VLAN Routing",
    topics: [
      {
        id: "vlan-grundlagen",
        title: "VLAN Grundlagen",
        description:
          "VLANs ermöglichen die logische Segmentierung eines physischen Netzwerks.",
        widget: "vlan-diagram",
        table: {
          headers: ["Begriff", "Erklärung"],
          rows: [
            ["VLAN ID", "Kennung eines VLANs"],
            ["Access Port", "Mitglied eines VLANs"],
            ["Trunk Port", "Transportiert mehrere VLANs"],
            ["802.1Q", "VLAN-Tagging Standard"],
          ],
        },
      },
      {
        id: "vlan-ids",
        title: "VLAN IDs",
        description:
          "Jedes VLAN wird durch eine eindeutige ID (1–4094) identifiziert.",
        table: {
          headers: ["Bereich", "Bedeutung"],
          rows: [
            ["1", "Standard-VLAN (default)"],
            ["2–1001", "Normale VLANs"],
            ["1002–1005", "Reserviert (Token Ring/FDDI)"],
            ["1006–4094", "Erweiterte VLANs"],
          ],
        },
      },
      {
        id: "access-ports",
        title: "Access Ports",
        description:
          "Ein Access Port gehört genau einem VLAN an und verbindet Endgeräte ohne Tagging.",
        details: [
          "Übermittelt nur unmarkierte (untagged) Frames.",
          "Typisch für PCs, Drucker und IP-Telefone.",
        ],
      },
      {
        id: "trunk-ports",
        title: "Trunk Ports",
        description:
          "Ein Trunk Port transportiert den Verkehr mehrerer VLANs zwischen Switches.",
        details: [
          "Nutzt 802.1Q-Tags zur VLAN-Unterscheidung.",
          "Verbindet Switches untereinander oder mit Routern.",
        ],
      },
      {
        id: "tagging",
        title: "802.1Q Tagging",
        description:
          "802.1Q fügt dem Ethernet-Frame einen 4-Byte-Tag mit der VLAN-ID hinzu.",
        table: {
          headers: ["Feld", "Beschreibung"],
          rows: [
            ["TPID", "Tag Protocol Identifier (0x8100)"],
            ["PCP", "Priorität (QoS)"],
            ["DEI", "Drop Eligible Indicator"],
            ["VID", "VLAN ID (12 Bit)"],
          ],
        },
      },
      {
        id: "inter-vlan-routing",
        title: "Inter-VLAN Routing",
        description:
          "Da VLANs separate Broadcast-Domänen sind, wird ein Router oder Layer-3-Switch für die Kommunikation zwischen ihnen benötigt.",
        details: [
          "Router-on-a-Stick: ein Trunk mit Subinterfaces pro VLAN.",
          "Layer-3-Switch mit SVIs (Switch Virtual Interfaces).",
        ],
      },
    ],
    quiz: [
      {
        id: "q5-1",
        question: "Wofür wird ein Trunk Port verwendet?",
        options: [
          "Verbindung eines einzelnen Endgeräts",
          "Transport mehrerer VLANs zwischen Switches",
          "Nur für VLAN 1",
          "Zum Routing zwischen Netzen",
        ],
        answer: 1,
        explanation: "Ein Trunk Port transportiert mehrere VLANs gleichzeitig.",
      },
      {
        id: "q5-2",
        question: "Welcher Standard regelt VLAN-Tagging?",
        options: ["802.11", "802.3", "802.1Q", "802.1X"],
        answer: 2,
        explanation: "802.1Q ist der Standard für VLAN-Tagging.",
      },
      {
        id: "q5-3",
        question: "Was wird für Kommunikation zwischen VLANs benötigt?",
        options: ["Hub", "Access Port", "Router oder Layer-3-Switch", "Repeater"],
        answer: 2,
        explanation: "Inter-VLAN Routing erfordert einen Router oder L3-Switch.",
      },
      {
        id: "q5-4",
        question: "Wie viele Bit hat das VLAN-ID-Feld?",
        options: ["8", "10", "12", "16"],
        answer: 2,
        explanation: "Das VID-Feld umfasst 12 Bit (bis 4094 nutzbare VLANs).",
      },
      {
        id: "q5-5",
        question: "Welches VLAN ist das Standard-VLAN?",
        options: ["VLAN 0", "VLAN 1", "VLAN 100", "VLAN 4094"],
        answer: 1,
        explanation: "VLAN 1 ist standardmäßig das Default-VLAN.",
      },
    ],
  },
]

export const TOTAL_QUESTIONS = chapters.reduce(
  (sum, ch) => sum + ch.quiz.length,
  0,
)
