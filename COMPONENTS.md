### Component Structure

**Root Layout (`app/layout.tsx`):**
-   Sets up the HTML structure, imports global CSS (`app/globals.css`), and configures fonts (Geist, Geist_Mono).
-   Includes Vercel Analytics for production environments.

**Main Page (`app/page.tsx`):**
-   A client component that manages the core state of the application: `activeChapterId`, `view` mode, `activeTopic`, `search`, `sidebarOpen`, and `showBookmarksOnly`.
-   Uses the `useProgress` hook for managing `answered` quiz questions and `bookmarked` topics.
-   Renders the `Sidebar`, `Progress` bar, `ViewTab` components, and conditionally renders `TopicCard`s, `Flashcards`, or `Quiz` based on the active `view`.
-   Contains `ViewTab` and `ChapterPager` as local components for UI control.

**Core Application Components (`components/`):**
-   `diagrams.tsx`: Contains interactive diagram components like `OsiDiagram`, `NatDiagram`, `RoutingDiagram`, and `VlanDiagram` that are rendered as `widgets` within `TopicCard`s.
-   `flashcards.tsx`: Displays flashcards for a given chapter, allowing users to navigate through them.
-   `quiz.tsx`: Renders quiz questions for a chapter, tracks answers, and provides explanations.
-   `sidebar.tsx`: The main navigation component, displaying chapters, topics, and overall progress. It also includes search functionality.
-   `subnetting-calculator.tsx`: An interactive widget for subnetting calculations, used within a `TopicCard`.
-   `topic-card.tsx`: A reusable component to display individual topics, including their description, details, tables, and embedding interactive widgets.

**UI Components (`components/ui/`):**
-   A collection of reusable, styled UI primitives (e.g., `Accordion`, `Badge`, `Button`, `Card`, `Input`, `Progress`, `Separator`), likely based on Shadcn UI. These components provide a consistent look and feel throughout the application.

**Hooks (`hooks/`):**
-   `use-progress.ts`: A custom React hook to manage and persist user progress (answered quiz questions and bookmarked topics) using `localStorage`.

**Libraries (`lib/`):**
-   `course-data.ts`: Defines the data structure for `Topic`, `QuizQuestion`, and `Chapter`, and holds the entire course content. This is the central source of truth for all educational material.
-   `utils.ts`: Contains utility functions, notably `cn` (a wrapper around `clsx` and `tailwind-merge`) for constructing conditional Tailwind CSS classes.
