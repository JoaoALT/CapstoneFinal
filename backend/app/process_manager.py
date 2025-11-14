# backend/app/process_manager.py

import subprocess
import os
from typing import Dict, List

from .config import APPLICATIONS

active_processes: Dict[str, subprocess.Popen] = {}

PROJECT_ROOT_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))


def get_all_statuses() -> List[Dict]:
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
    if app_id in active_processes and active_processes[app_id].poll() is None:
        return False

    app_config = APPLICATIONS[app_id]
    base_command = app_config["command"]
    port = app_config.get("port")

    app_directory = os.path.join(PROJECT_ROOT_PATH, app_config["directory"])
    print(f"Lanzando '{app_id}' dentro de la carpeta '{app_directory}'...")

    if isinstance(base_command, str):
        command_str = base_command
        if port is not None:
            command_str += f" -- -p {port}"
    else:
        cmd_parts = list(base_command)
        if port is not None:
            cmd_parts += ["--", "-p", str(port)]
        command_str = " ".join(cmd_parts)

    process = subprocess.Popen(command_str, cwd=app_directory, shell=True)
    active_processes[app_id] = process

    return True


def stop_application(app_id: str) -> bool:
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
