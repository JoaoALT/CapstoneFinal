# **App Name**: Idioma Fácil

## Core Features:

- User Authentication: Allow users to register and log in using email/password or continue as guests with anonymous authentication.
- Course Display: Display a list of available courses with names, descriptions, and progress indicators.
- Interactive Lessons: Present lessons with a variety of exercises like multiple choice, matching pairs, and fill-in-the-blank questions, tracking user responses in real-time.
- Scoring System: Calculate a score (1-5) based on the number of correctly answered exercises in each lesson.
- Progress Tracking: Track user progress and store user lesson attempts. Each user can view their scores and total time per unit.
- Firestore Integration: Store all user data, course content, lesson attempts, and progress in Cloud Firestore, designed as collections for users, courses, units, lessons, exercises, lessonAttempts, and userProgress.
- Automated Spanish Translation Tool: Utilize a generative AI tool to automatically translate user-facing text and other appropriate data fields in the UI to Spanish, adapting based on user settings and data context to make content localized.

## Style Guidelines:

- Primary color: Emerald green (#1FAB89) for main buttons and accents, giving a friendly and engaging feel.
- Background color: Light pastel green (#9DF3C4), to create a calm and educational atmosphere. Use it with low saturation so text is readable.
- Accent color: Slightly darker green (#62D2A2) than background, and little less saturation, used in card headers.
- Headline font: 'Space Grotesk' sans-serif font for titles, units and lessons
- Body font: 'Inter' sans-serif font for easy to read body text.
- Use educational and minimalist icons that represent various lessons.
- Implement a responsive, mobile-first single-column layout, to make navigation straightforward on smaller screens.
- Subtle animations when exercises are correctly answered to celebrate with the users.