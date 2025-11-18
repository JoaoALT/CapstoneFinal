"use client";

import React, { useState, useEffect } from "react";
import { LayoutGrid, List, Play, FileText, Video, X, Search, Eye } from "lucide-react";

// Tipo de dato para los recursos
interface Resource {
  id: number;
  title: string;
  description: string;
  src: string;
  thumbnail: string;
  category: string;
  type: "video" | "document"; 
}

// --- LISTA AMPLIADA DE 20 VIDEOS EDUCATIVOS ---
const resources: Resource[] = [
  // MATEMÁTICAS
  {
    id: 1,
    title: "Derivadas desde Cero",
    description: "Aprende el concepto de derivada y reglas básicas de derivación.",
    src: "https://www.youtube.com/embed/uK4-s0ojHFg",
    thumbnail: "https://img.youtube.com/vi/uK4-s0ojHFg/0.jpg",
    category: "Matemáticas",
    type: "video"
  },
  {
    id: 2,
    title: "Ecuaciones de Primer Grado",
    description: "Resolución paso a paso de ecuaciones lineales para principiantes.",
    src: "https://www.youtube.com/embed/CN4n6Tfc5WI",
    thumbnail: "https://img.youtube.com/vi/CN4n6Tfc5WI/0.jpg",
    category: "Matemáticas",
    type: "video"
  },
  {
    id: 4,
    title: "Teorema de Pitágoras",
    description: "Cálculo de hipotenusa y catetos en triángulos rectángulos.",
    src: "https://www.youtube.com/embed/2yfkEAt2ew0",
    thumbnail: "https://img.youtube.com/vi/2yfkEAt2ew0/0.jpg",
    category: "Matemáticas",
    type: "video"
  },
  {
    id: 7,
    title: "La Tabla Periódica",
    description: "Grupos, periodos y cómo memorizar los elementos químicos.",
    src: "https://www.youtube.com/embed/PsW0sGF5EBE",
    thumbnail: "https://img.youtube.com/vi/PsW0sGF5EBE/0.jpg",
    category: "Química",
    type: "video"
  },
  {
    id: 8,
    title: "El Sistema Solar",
    description: "Un recorrido por los planetas y el sol.",
    src: "https://www.youtube.com/embed/ZykXgSqet6A",
    thumbnail: "https://img.youtube.com/vi/ZykXgSqet6A/0.jpg",
    category: "Astronomía",
    type: "video"
  },
  {
    id: 14,
    title: "La Revolución Francesa",
    description: "Libertad, Igualdad y Fraternidad: El cambio de era.",
    src: "https://www.youtube.com/embed/ttdq818TGD0",
    thumbnail: "https://img.youtube.com/vi/ttdq818TGD0/0.jpg",
    category: "Historia",
    type: "video"
  },
  {
    id: 16,
    title: "Curso Básico de Python",
    description: "Aprende lógica de programación desde cero.",
    src: "https://www.youtube.com/embed/chPhlsHoEPo",
    thumbnail: "https://img.youtube.com/vi/chPhlsHoEPo/0.jpg",
    category: "Tecnología",
    type: "video"
  },
  {
    id: 17,
    title: "Qué es la Inteligencia Artificial",
    description: "Introducción al Machine Learning y sus aplicaciones.",
    src: "https://www.youtube.com/embed/_tA5cinv0U8",
    thumbnail: "https://img.youtube.com/vi/_tA5cinv0U8/0.jpg",
    category: "Tecnología",
    type: "video"
  },
  {
    id: 18,
    title: "Cómo funciona Internet",
    description: "Infraestructura, servidores y protocolos web.",
    src: "https://www.youtube.com/embed/i5oe63pOhLI",
    thumbnail: "https://img.youtube.com/vi/i5oe63pOhLI/0.jpg",
    category: "Tecnología",
    type: "video"
  },
];

// --- MODAL DE VIDEO ---
function VideoModal({ resource, onClose }: { resource: Resource; onClose: () => void }) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (resource.type === 'document') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white rounded-xl overflow-hidden shadow-2xl flex flex-col">
        <div className="flex justify-between items-center p-4 border-b bg-white">
          <div>
             <h3 className="text-lg font-bold text-gray-800">{resource.title}</h3>
             <span className="text-xs text-emerald-600 font-medium uppercase">{resource.category}</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} className="text-gray-500" />
          </button>
        </div>
        <div className="relative w-full aspect-video bg-black">
          <iframe
            width="100%" height="100%"
            src={`${resource.src}?autoplay=1`}
            title={resource.title} frameBorder="0" allowFullScreen
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
        <div className="p-4 bg-gray-50 text-sm text-gray-600">
            {resource.description}
        </div>
      </div>
    </div>
  );
}

// --- VISTA GRID (Estilo Tarjeta Minimalista) ---
function GridView({ items, onSelect }: { items: Resource[]; onSelect: (r: Resource) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
      {items.map((item) => (
        <div 
          key={item.id} 
          className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 overflow-hidden flex flex-col items-center text-center cursor-pointer group"
          onClick={() => item.type === 'video' ? onSelect(item) : null}
        >
          {/* Thumbnail */}
          <div className="w-full aspect-[4/3] overflow-hidden relative bg-gray-100">
            <img 
              src={item.thumbnail} 
              alt={item.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {item.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-colors">
                <div className="bg-white/90 text-emerald-600 p-3 rounded-full shadow-lg group-hover:scale-110 transition-transform">
                  <Play size={20} fill="currentColor" />
                </div>
              </div>
            )}
          </div>
          
          {/* Info */}
          <div className="p-5 flex flex-col items-center w-full">
            <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-1">{item.title}</h3>
            <p className="text-gray-500 text-sm mb-3 line-clamp-2">{item.description}</p>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wide border border-emerald-100">
              {item.category}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

// --- VISTA LISTA (Estilo "LibreClass" Original) ---
function ListView({ items, onSelect }: { items: Resource[]; onSelect: (r: Resource) => void }) {
  return (
    <div className="flex flex-col">
      {items.map((item) => (
        <div 
          key={item.id} 
          className="group flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer border-b border-gray-100 last:border-0"
          onClick={() => item.type === 'video' ? onSelect(item) : null}
        >
          <div className="flex items-center gap-4 md:gap-6 overflow-hidden">
            {/* Icono Circular (Estilo original) */}
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
              item.type === 'video' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-50 text-blue-500'
            }`}>
              {item.type === 'video' ? <Video size={20} /> : <FileText size={20} />}
            </div>
            
            {/* Textos */}
            <div className="flex flex-col min-w-0">
              <h3 className="font-bold text-gray-900 text-sm md:text-base group-hover:text-emerald-700 transition-colors truncate pr-2">
                {item.title}
              </h3>
              <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500">
                <span className="font-medium text-emerald-600/80">{item.category}</span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline truncate">{item.description}</span>
              </div>
            </div>
          </div>

          {/* Acción Derecha */}
          <div className="text-gray-300 group-hover:text-emerald-600 transition-colors pl-2">
            <Eye size={20} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Page() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [search, setSearch] = useState("");

  // Filtrado
  const filtered = resources.filter(r => 
    r.title.toLowerCase().includes(search.toLowerCase()) ||
    r.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-white p-6 md:p-10 font-body">
      
      {/* Header Limpio */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 mb-8">
          <div className="w-full md:w-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-1 tracking-tight">Recursos Educativos</h1>
            <p className="text-gray-500">Explora nuestra biblioteca de {resources.length} clases grabadas</p>
          </div>
          
          {/* Controles de Vista */}
          <div className="flex bg-gray-100 p-1 rounded-lg shrink-0">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md flex items-center gap-2 text-sm font-medium transition-all ${
                viewMode === 'list' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <List size={18} />
              <span className="hidden sm:inline">Lista</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md flex items-center gap-2 text-sm font-medium transition-all ${
                viewMode === 'grid' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <LayoutGrid size={18} />
              <span className="hidden sm:inline">Cuadrícula</span>
            </button>
          </div>
        </div>

        {/* Buscador */}
        <div className="relative mb-10 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="¿Qué quieres aprender hoy? (Ej. Matemáticas, Inglés...)" 
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-emerald-50 focus:border-emerald-300 outline-none transition-all text-gray-700 placeholder-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Contenedor de Resultados */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
          {filtered.length > 0 ? (
            viewMode === 'grid' ? (
              <GridView items={filtered} onSelect={setSelectedResource} />
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-2 overflow-hidden">
                <ListView items={filtered} onSelect={setSelectedResource} />
              </div>
            )
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <Search size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">No encontramos recursos</h3>
              <p className="text-gray-500">Intenta buscar con otro término o categoría.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedResource && (
        <VideoModal 
          resource={selectedResource} 
          onClose={() => setSelectedResource(null)} 
        />
      )}
    </main>
  );
}