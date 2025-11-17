# **App Name**: AulaLibre

## Core Features:

- Grade Display: Displays a list of available grades fetched from Firestore, ordered by `displayOrder`.
- Subject Display: Displays subjects within a selected grade, fetched from Firestore, ordered by `displayOrder`.
- Material Display: Presents a list of learning materials (PDFs, PPTX, etc.) for a selected subject, sourced from Firestore, ordered by `displayOrder`.
- Material Opening: Opens materials. PDFs will attempt to be opened using the built-in viewer, other types will use an external link/download.
- User Authentication: Allows users to log in via email/password or continue as a guest using anonymous authentication, managed by Firebase Authentication.
- Material Status Tracking: Tracks the last opened time, completion status, and favorite status of learning materials per user in Firestore.
- Content Generation Assistant (Admin): Generates content for materials such as titles, descriptions and tags using generative AI.

## Style Guidelines:

- Primary color: Emerald green (#1FAB89) to align with Aula Digital Rural's design system.
- Background color: Light aquamarine (#B3EBCD), a muted version of the primary for a calm learning environment.
- Accent color: Seafoam green (#A3D6A8) to complement the primary color and provide contrast.
- Body and headline font: 'PT Sans', sans-serif, for readability and modern style, good for both headlines and body.
- Simple, clear icons sourced from a library like Material Design Icons, reflecting educational themes.
- Mobile-first, responsive layout with a single-column card arrangement on small screens, transitioning to a 2- or 3-column grid on larger screens.
- Subtle transitions and animations (e.g., fade-ins, smooth scrolling) to enhance user experience without being distracting.