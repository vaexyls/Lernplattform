### Architecture Overview

The application follows a client-side rendering approach within a Next.js App Router structure. The `app/layout.tsx` file defines the root layout, including metadata, global styles, and font imports. The `app/page.tsx` is the central client component that orchestrates the main application logic, state management, and rendering of different views (learn, flashcards, quiz).

Key architectural patterns include:

1.  **Component-Based UI:** The application is composed of various React components, categorized into core application components (`components/`) and reusable UI components (`components/ui/`).
2.  **Modular Data Management:** All course-related data is centrally managed in `lib/course-data.ts`, making it easy to update and extend content.
3.  **Client-Side State Persistence:** The `useProgress` hook leverages `localStorage` to persist user progress (answered questions, bookmarked topics) across sessions.
4.  **Styling with Tailwind CSS:** A utility-first CSS framework for efficient and consistent styling.
