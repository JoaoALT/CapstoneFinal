# backend/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

# Importamos el router que definimos en app/routes.py
from app.routes import router as api_router

# Creamos la instancia principal de la aplicación FastAPI
app = FastAPI(
    title="Orquestador Aula Digital",
    description="API para gestionar y lanzar aplicaciones educativas en una Raspberry Pi.",
    version="1.0.0"
)

# --- Configuración de CORS (Cross-Origin Resource Sharing) ---
# Esto es fundamental para permitir que el frontend (aunque se sirva desde el mismo
# dominio) pueda hacer llamadas a la API sin problemas de seguridad en el navegador.
origins = [
    "*",  # Permitir todos los orígenes. Para producción, sería mejor restringirlo
          # a la IP de la Raspberry Pi, ej: "http://192.168.1.100"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permitir todas las cabeceras
)

# --- Inclusión de Rutas de la API ---
# Incluimos todas las rutas definidas en app/routes.py (GET /api/..., POST /api/...)
app.include_router(api_router)

# --- Servir Archivos Estáticos (Frontend) ---
# Esta es la parte clave para servir tu portal web.
# Se monta el directorio 'frontend' en la ruta raíz '/'.
# html=True asegura que si alguien va a '/', se le sirva 'index.html'.
app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")