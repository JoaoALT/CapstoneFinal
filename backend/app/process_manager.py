# backend/app/process_manager.py

import subprocess
import os
from typing import Dict, List

# Importamos la configuración de las aplicaciones desde config.py
from .config import APPLICATIONS

# Diccionario para mantener un registro de los procesos activos.
active_processes: Dict[str, subprocess.Popen] = {}

# Ruta a la Raíz del Proyecto
PROJECT_ROOT_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))


def get_all_statuses() -> List[Dict]:
    # (Esta función no necesita cambios, es idéntica a la anterior)
    statuses = []
    dead_processes = []
    for app_id, process in active_processes.copy().items():
        if process.poll() is not None:
            dead_processes.append(app_id)
    for app_id in dead_processes:
        del active_processes[app_id]
    for app_id, app_config in APPLICATIONS.items():
        status = app_config.copy()
        status["running"] = app_id in active_processes
        statuses.append(status)
    return statuses


def launch_application(app_id: str) -> bool:
    """
    Inicia una aplicación si no está ya en ejecución.
    Modificado para usar la clave 'directory' de la configuración.
    """
    if app_id in active_processes and active_processes[app_id].poll() is None:
        return False

    app_config = APPLICATIONS[app_id]
    command = app_config["command"]
    
    # --- CAMBIO PRINCIPAL ---
    # Construimos la ruta absoluta al directorio de la aplicación frontend
    app_directory = os.path.join(PROJECT_ROOT_PATH, app_config["directory"])

    print(f"Lanzando '{app_id}' dentro de la carpeta '{app_directory}'...")
    
    # Usamos el nuevo 'app_directory' como el directorio de trabajo (cwd).
    # Añadimos shell=True para compatibilidad (especialmente en Windows con npm.cmd).
    process = subprocess.Popen(command, cwd=app_directory, shell=True)
    active_processes[app_id] = process
    
    return True


def stop_application(app_id: str) -> bool:
    # (Esta función no necesita cambios, es idéntica a la anterior)
    if app_id not in active_processes or active_processes[app_id].poll() is not None:
        return False
    process = active_processes[app_id]
    print(f"Deteniendo la aplicación '{app_id}' (PID: {process.pid})...")
    process.terminate()
    try:
        process.wait(timeout=5)
    except subprocess.TimeoutExpired:
        print(f"El proceso para '{app_id}' no respondió. Forzando detención...")
        process.kill()
    del active_processes[app_id]
    return True