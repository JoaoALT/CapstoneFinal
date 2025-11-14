# backend/app/config.py

APPLICATIONS = {
    "librelinguo": {
        "id": "librelinguo",
        "name": "LibreLinguo",
        "port": 3000,
        "command": ["npm", "run", "dev"],
        "directory": "frontends/LibreLinguo",
    },
    "librexam": {
        "id": "librexam",
        "name": "LibrExam",
        "port": 3001,
        "command": ["npm", "run", "dev"],
        "directory": "frontends/LibreExam",
    },
    "libreclass": {
        "id": "libreclass",
        "name": "LibreClass",
        "port": 3002,
        "command": ["npm", "run", "dev"],
        "directory": "frontends/LibreClass",
    },
    "kiwix": {
        "id": "kiwix",
        "name": "Kiwix / LibreWiki",
        "port": 3003,
        "command": ["npm", "run", "dev"],
        "directory": "frontends/Kiwix",
    },
}
