import type { Course, Unit, Lesson, Exercise, UserProgress, ImagePlaceholder } from "@/lib/types";

export const courses: Course[] = [
  {
    id: "en-es",
    name: "Inglés para hispanohablantes",
    languageCode: "en",
    baseLanguage: "es",
    description: "Aprende los fundamentos del inglés desde cero, enfocado en situaciones cotidianas.",
    isActive: true,
    order: 1,
  },
  {
    id: "fr-es",
    name: "Francés Básico",
    languageCode: "fr",
    baseLanguage: "es",
    description: "Descubre el idioma del amor con nuestras lecciones interactivas.",
    isActive: true,
    order: 2,
  },
  {
    id: "de-es",
    name: "Alemán para principiantes",
    languageCode: "de",
    baseLanguage: "es",
    description: "Comienza tu viaje para aprender alemán con lecciones prácticas.",
    isActive: true,
    order: 3,
  },
];

export const units: Unit[] = [
  // English
  { id: "en-es-u1", courseId: "en-es", title: "Unidad 1: Saludos y Presentaciones", order: 1, description: "Aprende a saludar y presentarte." },
  { id: "en-es-u2", courseId: "en-es", title: "Unidad 2: Familia y Amigos", order: 2, description: "Habla sobre las personas en tu vida." },
  { id: "en-es-u3", courseId: "en-es", title: "Unidad 3: Comida y Bebida", order: 3, description: "Pide comida y habla de tus gustos." },
  // French
  { id: "fr-es-u1", courseId: "fr-es", title: "Unité 1: Salutations et Présentations", order: 1, description: "Apprenez à saluer et à vous présenter." },
  { id: "fr-es-u2", courseId: "fr-es", title: "Unité 2: La Nourriture", order: 2, description: "Commandez de la nourriture et parlez de vos goûts." },
  // German
  { id: "de-es-u1", courseId: "de-es", title: "Einheit 1: Grüße und Vorstellungen", order: 1, description: "Lerne, wie man sich begrüßt und vorstellt." },
  { id: "de-es-u2", courseId: "de-es", title: "Einheit 2: Essen und Trinken", order: 2, description: "Bestelle Essen und sprich über deine Vorlieben." },
];

export const lessons: Lesson[] = [
  // Unit 1 (English)
  { id: "en-es-u1-l1", unitId: "en-es-u1", courseId: "en-es", title: "Hola y Adiós", order: 1, targetSkill: "saludos", estimatedDurationMinutes: 5, isActive: true },
  { id: "en-es-u1-l2", unitId: "en-es-u1", courseId: "en-es", title: "Mi Nombre Es...", order: 2, targetSkill: "presentaciones", estimatedDurationMinutes: 7, isActive: true },
  { id: "en-es-u1-l3", unitId: "en-es-u1", courseId: "en-es", title: "¿De dónde eres?", order: 3, targetSkill: "origen", estimatedDurationMinutes: 6, isActive: true },
  
  // Unit 2 (English)
  { id: "en-es-u2-l1", unitId: "en-es-u2", courseId: "en-es", title: "La Familia", order: 1, targetSkill: "vocabulario", estimatedDurationMinutes: 8, isActive: true },
  { id: "en-es-u2-l2", unitId: "en-es-u2", courseId: "en-es", title: "Describiendo personas", order: 2, targetSkill: "adjetivos", estimatedDurationMinutes: 10, isActive: true },

  // Unit 3 (English)
  { id: "en-es-u3-l1", unitId: "en-es-u3", courseId: "en-es", title: "En el restaurante", order: 1, targetSkill: "ordenar", estimatedDurationMinutes: 8, isActive: true },
  { id: "en-es-u3-l2", unitId: "en-es-u3", courseId: "en-es", title: "Frutas y verduras", order: 2, targetSkill: "vocabulario", estimatedDurationMinutes: 6, isActive: true },

  // Unit 1 (French)
  { id: "fr-es-u1-l1", unitId: "fr-es-u1", courseId: "fr-es", title: "Bonjour et Au revoir", order: 1, targetSkill: "saludos", estimatedDurationMinutes: 5, isActive: true },
  { id: "fr-es-u1-l2", unitId: "fr-es-u1", courseId: "fr-es", title: "Je m'appelle...", order: 2, targetSkill: "presentaciones", estimatedDurationMinutes: 7, isActive: true },

  // Unit 2 (French)
  { id: "fr-es-u2-l1", unitId: "fr-es-u2", courseId: "fr-es", title: "Au restaurant", order: 1, targetSkill: "ordenar", estimatedDurationMinutes: 8, isActive: true },

  // Unit 1 (German)
  { id: "de-es-u1-l1", unitId: "de-es-u1", courseId: "de-es", title: "Hallo und Tschüss", order: 1, targetSkill: "saludos", estimatedDurationMinutes: 5, isActive: true },
  { id: "de-es-u1-l2", unitId: "de-es-u1", courseId: "de-es", title: "Wie heißen Sie?", order: 2, targetSkill: "presentaciones", estimatedDurationMinutes: 7, isActive: true },

  // Unit 2 (German)
  { id: "de-es-u2-l1", unitId: "de-es-u2", courseId: "de-es", title: "Im Restaurant", order: 1, targetSkill: "ordenar", estimatedDurationMinutes: 8, isActive: true },
];

export const exercises: Exercise[] = [
  // Lesson 1 (English): Hola y Adiós
  {
    id: "ex1",
    lessonId: "en-es-u1-l1",
    type: "multiple_choice",
    prompt: "¿Cómo se dice ‘Hola’ en inglés?",
    options: ["Bye", "Hello", "Thanks", "Sorry"],
    correctOptionIndex: 1,
    order: 1,
    imageUrl: "https://picsum.photos/seed/greetings/600/400",
  },
  {
    id: "ex2",
    lessonId: "en-es-u1-l1",
    type: "match_pairs",
    prompt: "Empareja las frases",
    pairs: [
      { left: "Adiós", right: "Goodbye" },
      { left: "Buenos días", right: "Good morning" },
      { left: "Gracias", right: "Thank you" },
    ],
    order: 2,
  },
  {
    id: "ex3",
    lessonId: "en-es-u1-l1",
    type: "fill_in_blank",
    prompt: "Completa la frase.",
    textWithBlank: "Good _____",
    correctAnswer: "morning",
    order: 3,
  },
  // Lesson 2 (English): Mi Nombre Es...
  {
    id: "ex4",
    lessonId: "en-es-u1-l2",
    type: "multiple_choice",
    prompt: "Elige la traducción correcta para '¿Cómo estás?'",
    options: ["What is your name?", "How are you?", "Where are you from?", "My name is..."],
    correctOptionIndex: 1,
    order: 1,
  },
  {
    id: "ex5",
    lessonId: "en-es-u1-l2",
    type: "fill_in_blank",
    prompt: "Responde a la pregunta.",
    textWithBlank: "My name ___ John.",
    correctAnswer: "is",
    order: 2,
  },
   // Lesson 3 (English): ¿De dónde eres?
   {
    id: "ex-en-u1-l3-1",
    lessonId: "en-es-u1-l3",
    type: "multiple_choice",
    prompt: "¿Qué significa 'Where are you from?'",
    options: ["¿Cómo te llamas?", "¿Cuántos años tienes?", "¿De dónde eres?", "¿A dónde vas?"],
    correctOptionIndex: 2,
    order: 1,
  },
  {
    id: "ex-en-u1-l3-2",
    lessonId: "en-es-u1-l3",
    type: "fill_in_blank",
    prompt: "Completa la respuesta.",
    textWithBlank: "I am from ____.",
    correctAnswer: "Spain",
    order: 2,
  },
  // Lesson 1 (English Unit 2): La Familia
  {
    id: "ex6",
    lessonId: "en-es-u2-l1",
    type: "multiple_choice",
    prompt: "¿Qué significa 'mother'?",
    options: ["Padre", "Hermano", "Madre", "Hija"],
    correctOptionIndex: 2,
    order: 1,
    imageUrl: "https://picsum.photos/seed/family/600/400"
  },
  {
    id: "ex7",
    lessonId: "en-es-u2-l1",
    type: "match_pairs",
    prompt: "Empareja los miembros de la familia.",
    pairs: [
      { left: "Padre", right: "Father" },
      { left: "Hermana", right: "Sister" },
      { left: "Hijo", right: "Son" },
    ],
    order: 2,
  },
  // Lesson 2 (English Unit 2): Describiendo personas
  {
    id: "ex-en-u2-l2-1",
    lessonId: "en-es-u2-l2",
    type: "multiple_choice",
    prompt: "¿Qué adjetivo significa 'alto'?",
    options: ["Short", "Tall", "Young", "Old"],
    correctOptionIndex: 1,
    order: 1,
  },
  {
    id: "ex-en-u2-l2-2",
    lessonId: "en-es-u2-l2",
    type: "match_pairs",
    prompt: "Empareja el adjetivo con su opuesto.",
    pairs: [
      { left: "Happy", right: "Sad" },
      { left: "Big", right: "Small" },
      { left: "Fast", right: "Slow" },
    ],
    order: 2,
  },
  // Lesson 1 (English Unit 3): En el restaurante
  {
    id: "ex-en-u3-l1-1",
    lessonId: "en-es-u3-l1",
    type: "multiple_choice",
    prompt: "¿Cómo pides 'la cuenta, por favor'?",
    options: ["The menu, please", "The bill, please", "A table for two", "I want water"],
    correctOptionIndex: 1,
    order: 1,
  },
  // Lesson 2 (English Unit 3): Frutas y verduras
  {
    id: "ex-en-u3-l2-1",
    lessonId: "en-es-u3-l2",
    type: "match_pairs",
    prompt: "Empareja la fruta con su nombre en inglés.",
    pairs: [
      { left: "Manzana", right: "Apple" },
      { left: "Plátano", right: "Banana" },
      { left: "Naranja", right: "Orange" },
    ],
    order: 1,
  },
  // Lesson 1 (French): Bonjour et Au revoir
  {
    id: "ex-fr-1",
    lessonId: "fr-es-u1-l1",
    type: "multiple_choice",
    prompt: "¿Cómo se dice 'Hola' en francés?",
    options: ["Au revoir", "Bonjour", "Merci", "Pardon"],
    correctOptionIndex: 1,
    order: 1,
    imageUrl: "https://picsum.photos/seed/paris/600/400",
  },
  {
    id: "ex-fr-2",
    lessonId: "fr-es-u1-l1",
    type: "match_pairs",
    prompt: "Empareja las frases",
    pairs: [
      { left: "Adiós", right: "Au revoir" },
      { left: "Buenos días", right: "Bonjour" },
      { left: "Gracias", right: "Merci" },
    ],
    order: 2,
  },
  // Lesson 2 (French): Je m'appelle...
  {
    id: "ex-fr-u1-l2-1",
    lessonId: "fr-es-u1-l2",
    type: "fill_in_blank",
    prompt: "Completa la frase.",
    textWithBlank: "Je m'appelle ____.",
    correctAnswer: "Marie",
    order: 1,
  },
  // Lesson 1 (French Unit 2): Au restaurant
  {
    id: "ex-fr-u2-l1-1",
    lessonId: "fr-es-u2-l1",
    type: "multiple_choice",
    prompt: "¿Qué significa 'l'addition, s'il vous plaît'?",
    options: ["El menú, por favor", "Quisiera agua", "La cuenta, por favor", "Está delicioso"],
    correctOptionIndex: 2,
    order: 1,
  },
  // Lesson 1 (German): Hallo und Tschüss
  {
    id: "ex-de-1",
    lessonId: "de-es-u1-l1",
    type: "multiple_choice",
    prompt: "¿Cómo se dice 'Hola' en alemán?",
    options: ["Tschüss", "Hallo", "Danke", "Entschuldigung"],
    correctOptionIndex: 1,
    order: 1,
    imageUrl: "https://picsum.photos/seed/berlin/600/400",
  },
  {
    id: "ex-de-2",
    lessonId: "de-es-u1-l1",
    type: "match_pairs",
    prompt: "Empareja las frases",
    pairs: [
      { left: "Adiós", right: "Tschüss" },
      { left: "Buenos días", right: "Guten Morgen" },
      { left: "Gracias", right: "Danke" },
    ],
    order: 2,
  },
   // Lesson 2 (German): Wie heißen Sie?
   {
    id: "ex-de-u1-l2-1",
    lessonId: "de-es-u1-l2",
    type: "fill_in_blank",
    prompt: "Completa la presentación.",
    textWithBlank: "Ich ____ Hans.",
    correctAnswer: "bin",
    order: 1,
  },
  // Lesson 1 (German Unit 2): Im Restaurant
  {
    id: "ex-de-u2-l1-1",
    lessonId: "de-es-u2-l1",
    type: "multiple_choice",
    prompt: "Para pedir la cuenta, dices:",
    options: ["Die Speisekarte, bitte", "Ich möchte Wasser", "Die Rechnung, bitte", "Es schmeckt gut"],
    correctOptionIndex: 2,
    order: 1,
  },
];

export const userProgress: UserProgress[] = [
    { id: "progress1", courseId: "en-es", unitId: "en-es-u1", lessonId: "en-es-u1-l1", bestScore: 4, attemptsCount: 2, lastAttemptAt: new Date() as any, completed: true },
];

// Re-exporting placeholder images for convenience
import placeholderData from './placeholder-images.json';
export const placeHolderImages: ImagePlaceholder[] = placeholderData.placeholderImages;
