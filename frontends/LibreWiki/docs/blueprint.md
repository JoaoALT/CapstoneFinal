# **App Name**: AulaWiki

## Core Features:

- ZIM File Loading: Backend endpoint to load the ZIM file from the Raspberry Pi's local storage.
- Article Search: Backend endpoint to search for articles within the loaded ZIM file based on user queries.
- Category Browsing: Frontend functionality to browse articles by category, fetching category lists from the backend.
- Article Display: Frontend component to display article content fetched from the backend, supporting text and images served from the ZIM file.
- Search Bar: A search bar that allows the user to search the entire database of articles
- Contextual Search: Allows users to search inside a given category
- Bookmark Articles: Allow users to bookmark articles to Firestore

## Style Guidelines:

- Primary color: Light sea green (#1FAB89) for a clean and educational feel.
- Background color: Very light aquamarine (#D7FBE8).
- Accent color: Sea green (#62D2A2), used sparingly for highlights and interactive elements.
- Body and headline font: 'PT Sans', a humanist sans-serif.
- Minimalist, readable, mobile-first layout inspired by Wikipedia, optimized for offline use on Raspberry Pi.
- Simple, clear icons for categories and navigation, ensuring they are lightweight and easy to render.
- Animations for buttons, soft animations, etc.