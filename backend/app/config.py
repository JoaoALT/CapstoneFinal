# backend/app/config.py

"""
Módulo de Configuración para las aplicaciones del Aula Digital.
Cada app ahora tiene un 'command' para npm y un 'directory' donde se ejecutará.
"""

# ¡IMPORTANTE! 
# Asegúrate de que el puerto ('port') definido aquí coincida con el puerto
# que tu aplicación React usa cuando ejecutas 'npm run dev' (revisa tu vite.config.js o package.json).

APPLICATIONS = {
    "kiwix": {
        "id": "kiwix",
        "name": "Visor Kiwix (Wikipedia)",
        "port": 5173,  # Puerto por defecto de Vite, ajústalo si es diferente
        "command": ["npm", "run", "dev"],
        "directory": "frontends/Kiwix"
    },
    "librelingo": {
        "id": "librelingo",
        "name": "Librelingo",
        "port": 5174, # Asigna un puerto único para cada app
        "command": ["npm", "run", "dev"],
        "directory": "frontends/Librelingo"
    },
    "grabaciones": {
        "id": "grabaciones",
        "name": "Grabaciones de Clase",
        "port": 5175,
        "command": ["npm", "run", "dev"],
        "directory": "frontends/Grabaciones"
    },
    "tests": {
        "id": "tests",
        "name": "Plataforma de Tests",
        "port": 5176,
        "command": ["npm", "run", "dev"],
        "directory": "frontends/Tests"
    }
}