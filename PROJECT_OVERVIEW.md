### Project Summary

This project is a network technology learning portal, likely generated using v0.dev. It is a single-page application built with Next.js and React, providing educational content, quizzes, flashcards, and interactive diagrams related to networking concepts. The application features a sidebar for navigation, a main content area that adapts based on the selected view mode (learn, flashcards, quiz), and a progress tracking system.

### Tech Stack

-   **Framework:** Next.js (version 16.2.6), React (version 19)
-   **UI Libraries:**
    -   Shadcn UI (via `shadcn` package and `components/ui`)
    -   `@base-ui/react` (for base UI components, though its specific usage isn't immediately obvious from the provided files)
-   **Styling System:**
    -   Tailwind CSS (version 4.2.0) for utility-first styling.
    -   PostCSS for processing Tailwind CSS.
    -   `tw-animate-css` for animations.
    -   Custom CSS variables for theming (defined in `app/globals.css`).
    -   `clsx` and `tailwind-merge` for conditional and intelligent merging of Tailwind classes.
-   **State Management:** Local React state (`useState`) and custom `useProgress` hook utilizing `localStorage` for persistent progress tracking.
-   **Routing Structure:** Next.js App Router for page-based routing. The application uses client-side routing logic within `app/page.tsx` to switch between "lernen" (learn), "karten" (flashcards), and "quiz" views based on user interaction, rather than relying on Next.js's file-system based routing for internal view changes.
-   **API Integrations:** No explicit external API integrations are visible. All content (`chapters`, `quiz questions`, `topics`) is sourced from `lib/course-data.ts`.
-   **Authentication System:** No authentication system is implemented.
-   **Database Connections:** No direct database connections are implemented. All data is static and managed within `lib/course-data.ts`.


