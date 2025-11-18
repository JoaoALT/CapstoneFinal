# backend/app/config.py

APPLICATIONS = {
    "librelinguo": {
        "id": "librelinguo",
        "name": "LibreLinguo",
        "port": 3000,
        "command": ["npm", "run", "dev"],
        "directory": "frontends/LibreLinguo",
        "description": "Plataforma de idiomas y lecciones interactivas.",
    },
    "librexam": {
        "id": "librexam",
        "name": "LibrExam",
        "port": 3001,
        "command": ["npm", "run", "dev"],
        "directory": "frontends/LibreExam",
        "description": "Exámenes y evaluaciones en línea.",
    },
    "libreclass": {
        "id": "libreclass",
        "name": "LibreClass",
        "port": 3002,
        "command": ["npm", "run", "dev"],
        "directory": "frontends/LibreClass",
        "description": "Gestión de grados, materias y materiales educativos.",
    },
    "librewiki": {
        "id": "librewiki",
        "name": "LibreWiki",
        "port": 3003,
        "command": ["npm", "run", "dev"],
        "directory": "frontends/LibreWiki",
        "description": "Enciclopedia y recursos offline.",
    },
    "librecordings": {
        "id": "librecordings",
        "name": "LibreRecordings",
        "port": 3004,
        "command": ["npm", "run", "dev"],
        "directory": "frontends/LibreRecordings",
        "description": "Galería y gestión de grabaciones y videos educativos.",
    },
}
