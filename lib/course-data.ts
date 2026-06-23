export type SourceType = 'official' | 'primary' | 'supplementary';

export type Source = {
  id: string;
  title: string;
  organization: string;
  url: string;
  dateAccessed: string;
  publicationDate?: string;
  type: SourceType;
  category: 'curriculum' | 'technical' | 'legal' | 'educational';
};

export type TableData = {
  headers: [string, string]
  rows: [string, string][]
}

export type Topic = {
  id: string;
  title: string;
  description: string; // Brief summary
  explanation: string; // Detailed content
  learningObjectives: string[];
  details?: string[]; // Bullet points
  table?: TableData;
  examples: string[];
  useCases: string[];
  terminology: Record<string, string>;
  exercises: string[];
  furtherReading: { title: string; url: string }[];
  sources: string[]; // IDs of sources
  widget?: "subnetting" | "osi" | "vlan-diagram" | "routing-diagram" | "nat-diagram";
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

export type Category = {
  id: string;
  title: string;
  topics: Topic[];
  quiz: QuizQuestion[];
};

export type YearNumber = 1 | 2 | 3;

export type YearContent = {
  year: YearNumber;
  title: string;
  categories: Category[];
};

export const COURSE_TITLE = "FISI Lernportal";
export const COURSE_SUBTITLE = "Fachinformatiker Systemintegration - Ausbildungstool";

export const globalSources: Source[] = [
  {
    id: "bibb-rahmenplan",
    title: "Ausbildungsrahmenplan für die Berufsausbildung zum Fachinformatiker/zur Fachinformatikerin",
    organization: "BIBB - Bundesinstitut für Berufsbildung",
    url: "https://www.bibb.de/dienst/berufesuche/de/index_berufesuche.php/profile/apprenticeship/20200101",
    dateAccessed: "2026-06-23",
    publicationDate: "2020-08-01",
    type: "official",
    category: "curriculum"
  },
  {
    id: "ihk-verordnung",
    title: "Verordnung über die Berufsausbildung zum Fachinformatiker und zur Fachinformatikerin",
    organization: "IHK / Bundesministerium für Wirtschaft und Energie",
    url: "https://www.gesetze-im-internet.de/finf_itksausbv/index.html",
    dateAccessed: "2026-06-23",
    type: "official",
    category: "legal"
  }
];

export const years: YearContent[] = [
  {
    year: 1,
    title: "1. Ausbildungsjahr",
    categories: [
      {
        id: "y1-it-grundlagen",
        title: "IT-Grundlagen",
        topics: [
          {
            id: "hardware-komponenten",
            title: "Hardware-Komponenten",
            description: "Grundlagen der Computerhardware und das Zusammenspiel der Komponenten.",
            explanation: "Die Hardware eines Computers umfasst alle physischen Teile eines Systems. Für Systemintegratoren ist das Verständnis der Architektur (von-Neumann-Architektur) und der Spezifikationen entscheidend für die Planung und Fehlerbehebung.",
            learningObjectives: [
              "Verstehen der von-Neumann-Architektur",
              "Identifikation von CPU, RAM, Mainboard und Massenspeicher",
              "Unterscheidung verschiedener Bussysteme und Schnittstellen"
            ],
            details: [
              "Zentraleinheit (CPU): Das Gehirn des Computers.",
              "Arbeitsspeicher (RAM): Volatiler Speicher für laufende Prozesse.",
              "Mainboard: Die zentrale Kommunikationsplattform.",
              "Massenspeicher: HDD, SSD, NVMe für persistente Daten."
            ],
            examples: [
              "Auswahl einer CPU basierend auf dem Einsatzbereich (Server vs. Office)",
              "Aufrüstung von Arbeitsspeicher zur Leistungssteigerung"
            ],
            useCases: [
              "Fehlersuche bei Hardwaredefekten (POST-Codes)",
              "Konfiguration eines Business-PCs nach Kundenanforderungen"
            ],
            terminology: {
              "CPU": "Central Processing Unit - Zentraler Prozessor",
              "RAM": "Random Access Memory - Arbeitsspeicher",
              "SSD": "Solid State Drive - Halbleiterlaufwerk",
              "NVMe": "Non-Volatile Memory express - Protokoll für SSDs"
            },
            exercises: [
              "Listen Sie die Komponenten eines Standard-Servers auf.",
              "Erläutern Sie den Unterschied zwischen flüchtigem und nicht-flüchtigem Speicher."
            ],
            furtherReading: [
              { title: "Intel Hardware Basics", url: "https://www.intel.de" },
              { title: "Hardware-Grundlagen - IT-Service", url: "https://www.it-service.de" }
            ],
            sources: ["bibb-rahmenplan"]
          }
        ],
        quiz: [
          {
            id: "q-hw-1",
            question: "Welche Komponente wird als 'Gehirn' des Computers bezeichnet?",
            options: ["RAM", "Festplatte", "CPU", "Netzteil"],
            answer: 2,
            explanation: "Die CPU (Central Processing Unit) führt alle Berechnungen und Steuerungsbefehle aus."
          }
        ]
      },
      {
        id: "y1-netzwerktechnik",
        title: "Netzwerktechnik Basics",
        topics: [
          {
            id: "netzwerk-osi",
            title: "OSI-Schichtenmodell",
            description: "Das 7-Schichten-Modell der Netzwerkkommunikation.",
            explanation: "Das OSI-Modell (Open Systems Interconnection) ist ein Referenzmodell für Netzwerkprotokolle als Schichtenarchitektur. Es dient der Standardisierung der Kommunikation zwischen unterschiedlichen technischen Systemen.",
            learningObjectives: [
              "Benennung aller 7 Schichten in der richtigen Reihenfolge",
              "Zuordnung von Protokollen zu den jeweiligen Schichten",
              "Verständnis der Datenkapselung (Encapsulation)"
            ],
            widget: "osi",
            examples: [
              "HTTP arbeitet auf Schicht 7 (Anwendung)",
              "IP-Routing findet auf Schicht 3 (Vermittlung) statt"
            ],
            useCases: [
              "Strukturierte Fehlersuche (Bottom-Up vs. Top-Down)",
              "Entwicklung von Netzwerkprotokollen"
            ],
            terminology: {
              "Bit": "Kleinste Dateneinheit auf Schicht 1",
              "Frame": "Dateneinheit auf Schicht 2 (Sicherungsschicht)",
              "Packet": "Dateneinheit auf Schicht 3 (Vermittlungsschicht)",
              "Segment": "Dateneinheit auf Schicht 4 (Transportschicht)"
            },
            exercises: [
              "Zeichnen Sie das OSI-Modell und tragen Sie je ein Beispielprotokoll ein.",
              "Erläutern Sie, was auf Schicht 2 passiert."
            ],
            furtherReading: [
              { title: "ISO/IEC 7498-1:1994", url: "https://www.iso.org/standard/20269.html" },
              { title: "Cisco Networking Academy - OSI", url: "https://www.netacad.com" }
            ],
            sources: ["bibb-rahmenplan", "ihk-verordnung"]
          }
        ],
        quiz: [
          {
            id: "q-osi-1",
            question: "Auf welcher Schicht arbeitet ein Router primär?",
            options: ["Schicht 1", "Schicht 2", "Schicht 3", "Schicht 4"],
            answer: 2,
            explanation: "Router arbeiten auf der Vermittlungsschicht (Schicht 3) unter Verwendung von IP-Adressen."
          }
        ]
      }
    ]
  },
  {
    year: 2,
    title: "2. Ausbildungsjahr",
    categories: [
      {
        id: "y2-server",
        title: "Server & Dienste",
        topics: [],
        quiz: []
      }
    ]
  },
  {
    year: 3,
    title: "3. Ausbildungsjahr",
    categories: [
      {
        id: "y3-cybersecurity",
        title: "Cyber Security",
        topics: [],
        quiz: []
      }
    ]
  }
];

export const TOTAL_QUESTIONS = years.reduce(
  (sum, year) => sum + year.categories.reduce((cSum, cat) => cSum + cat.quiz.length, 0),
  0,
);
