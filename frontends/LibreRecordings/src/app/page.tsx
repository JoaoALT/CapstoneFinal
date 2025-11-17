import React from "react";

// Ejemplo de videos locales
const videos = [
  {
    id: 1,
    title: "Clase de Matemáticas",
    description: "Introducción a fracciones",
    src: "/videos/matematicas.mp4",
    thumbnail: "https://placehold.co/200x150?text=Matemáticas",
  },
  {
    id: 2,
    title: "Ciencias Naturales",
    description: "El ciclo del agua",
    src: "/videos/ciencias.mp4",
    thumbnail: "https://placehold.co/200x150?text=Ciencias",
  },
  {
    id: 3,
    title: "Historia",
    description: "Independencia de Colombia",
    src: "/videos/historia.mp4",
    thumbnail: "https://placehold.co/200x150?text=Historia",
  },
  {
    id: 4,
    title: "Lengua Castellana",
    description: "Ortografía básica",
    src: "/videos/lengua.mp4",
    thumbnail: "https://placehold.co/200x150?text=Lengua",
  },
];

function VideoCard({ video }: { video: typeof videos[0] }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center">
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-32 h-24 object-cover rounded mb-4"
      />
      <span className="font-semibold text-lg mb-2 text-center">{video.title}</span>
      <span className="text-gray-500 text-sm mb-2 text-center">{video.description}</span>
      <video controls src={video.src} className="w-full mt-2 rounded" style={{ maxWidth: "200px" }} />
    </div>
  );
}

export default function Page() {
  // Videos de YouTube de ejemplo
  const ytVideos = [
    {
      id: 1,
      title: "Clase de Matemáticas",
      description: "Introducción a fracciones",
      src: "https://www.youtube.com/embed/lFs8rJ8Cfi0",
      thumbnail: "https://img.youtube.com/vi/lFs8rJ8Cfi0/0.jpg",
    },
    {
      id: 2,
      title: "Ciencias Naturales",
      description: "El ciclo del agua",
      src: "https://www.youtube.com/embed/lFs8rJ8Cfi0",
      thumbnail: "https://img.youtube.com/vi/lFs8rJ8Cfi0/0.jpg",
    },
    {
      id: 3,
      title: "Historia",
      description: "Independencia de Colombia",
      src: "https://www.youtube.com/embed/lFs8rJ8Cfi0",
      thumbnail: "https://img.youtube.com/vi/lFs8rJ8Cfi0/0.jpg",
    },
    {
      id: 4,
      title: "Lengua Castellana",
      description: "Ortografía básica",
      src: "https://www.youtube.com/embed/lFs8rJ8Cfi0",
      thumbnail: "https://img.youtube.com/vi/lFs8rJ8Cfi0/0.jpg",
    },
  ];

  function YTVideoCard({ video }: { video: typeof ytVideos[0] }) {
    return (
      <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-32 h-24 object-cover rounded mb-4"
        />
        <span className="font-semibold text-lg mb-2 text-center">{video.title}</span>
        <span className="text-gray-500 text-sm mb-2 text-center">{video.description}</span>
        <div className="w-full mt-2 rounded" style={{ maxWidth: "200px" }}>
          <iframe
            width="200"
            height="120"
            src={video.src}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    );
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Grabaciones</h1>
      <div className="grid grid-cols-4 gap-6">
        {ytVideos.map((video) => (
          <YTVideoCard key={video.id} video={video} />
        ))}
      </div>
    </main>
  );
}
