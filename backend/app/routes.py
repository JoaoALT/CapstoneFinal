# backend/app/routes.py

from fastapi import APIRouter, HTTPException, status

# Importamos las funciones de nuestro gestor de procesos
from . import process_manager

# Creamos la instancia del router. Es crucial que se llame 'router'
# para que main.py pueda importarla correctamente.
router = APIRouter(
    prefix="/api",          # Todas las rutas aquí comenzarán con /api
    tags=["Applications"],  # Etiqueta para la documentación automática de FastAPI
)


@router.get("/applications")
def get_applications_status():
    """
    Devuelve la lista de todas las aplicaciones configuradas y su estado actual (running/stopped).
    """
    return process_manager.get_all_statuses()


@router.post("/launch/{app_id}")
def launch_app(app_id: str):
    """
    Lanza una aplicación externa por su ID.
    """
    try:
        success = process_manager.launch_application(app_id)
        if not success:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=f"La aplicación '{app_id}' ya está en ejecución."
            )
        return {"status": "success", "message": f"La aplicación '{app_id}' se ha iniciado."}
    except KeyError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"La aplicación con id '{app_id}' no fue encontrada en la configuración."
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error inesperado al lanzar '{app_id}': {e}"
        )


@router.post("/stop/{app_id}")
def stop_app(app_id: str):
    """
    Detiene una aplicación en ejecución por su ID.
    """
    try:
        success = process_manager.stop_application(app_id)
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"La aplicación '{app_id}' no se encontraba en ejecución."
            )
        return {"status": "success", "message": f"La aplicación '{app_id}' se ha detenido."}
    except KeyError:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"La aplicación con id '{app_id}' no fue encontrada en la configuración."
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error inesperado al detener '{app_id}': {e}"
        )