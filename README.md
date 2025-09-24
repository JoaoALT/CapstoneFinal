# Proyecto: [NOMBRE_DE_LA_SOLUCIÓN]  
*Sistema operativo educativo para colegios rurales (Raspberry Pi + módulos de aprendizaje)*


## 📋 Tabla de contenidos
1. [Roles](#roles)  
2. [State & Definitions](#state--definitions)  
   - [Definition of Ready](#definition-of-ready)  
   - [Definition of Done](#definition-of-done)  
3. [Descripción del proyecto](#descripción-del-proyecto)  
4. [Cómo funciona (resumen técnico)](#cómo-funciona-resumen-técnico)  
5. [Impacto y beneficios](#impacto-y-beneficios)  
6. [Recursos y requisitos de hardware](#recursos-y-requisitos-de-hardware)  
7. [Timeline y hitos](#timeline-y-hitos)  
8. [Historias de usuario (resumidas)](#historias-de-usuario-resumidas)  
9. [Criterios de aceptación técnicos (Gherkin / Given-When-Then)](#criterios-de-aceptación-técnicos-gherkin--given-when-then)  
10. [Instalación rápida / Despliegue (guía)](#instalación-rápida--despliegue-guía)  
11. [Medición, validación y métricas](#medición-validación-y-métricas)  
12. [Contribuir & Contacto](#contribuir--contacto)  
13. [Licencia](#licencia)


## Roles
- **Po (Product Owner):** Joao Muñoz  
- **Sm (Scrum Master):** Giovanni Moreno  
- **Tl (Tech Lead):** Santiago Gavilán  
- **Secretaria del Tl:** John Rojas


## State & Definitions

### Definition of Ready
Antes de comenzar un sprint / tarea, **todas** las siguientes condiciones deben cumplirse:
- [ ] Historia o task con **Criterios de aceptación claros y medibles**.  
- [ ] Mockups o wireframes (UI) mínimos para la vista principal.  
- [ ] Contenidos iniciales para los primeros módulos (matemáticas, ciencias, lenguaje).  
- [ ] Raspberry Pi 5 (8GB) y antena disponibles para pruebas físicas.  
- [ ] Plan de red local (IP, SSID), y acceso al colegio piloto confirmado.  
- [ ] Data model inicial (esquema SQLite) y definiciones de logs (events).  
- [ ] Script/Playbook de despliegue (Bash/Ansible) preparado y probado en entorno dev.

### Definition of Done
Una historia / tarea se considera terminada cuando **todas** estas condiciones se cumplen:
- [ ] Código revisado y mergeado a `main` (o rama equivalente).  
- [ ] Tests unitarios con cobertura razonable (según componente).  
- [ ] Tests de integración o E2E para funciones críticas (login, guardado, exportar).  
- [ ] Criterios de aceptación (Given/When/Then) verificados manual o automáticamente.  
- [ ] Documentación actualizada (README, runbook de instalación).  
- [ ] Instalador y script de configuración probados y validados (instalación < 1h).  
- [ ] Despliegue en Raspberry Pi de prueba verificado; performance dentro de límites definidos.



## Descripción del proyecto
**Visión (2026):** Para 2026 habremos implementado la solución en al menos un colegio rural, ayudando a estudiantes y profesores a familiarizarse con nuevas tecnologías y avanzando su alfabetización digital.

**Reto:** ¿Cómo facilitar que estudiantes de primaria y secundaria en municipios rurales desarrollen competencias de aprendizaje digital?

**Nombre de la solución:** `[POR DEFINIR]`

**Resumen:**  
Se desarrollará un **sistema operativo ligero** entregado en una Raspberry Pi  que actúe como servidor/local node en el colegio. Dentro correrá la plataforma educativa con módulos por asignatura y grado, soporte offline, funcionalidades de IA para personalización y un panel docente para seguimiento y exportación de reportes.


## Cómo funciona (resumen técnico)
- La **Raspberry Pi** actúa como nodo central / servidor local.  
- Un sistema operativo optimizado arranca y levanta:
  - Un servidor web ligero (Nginx/Lighttpd) que sirve la UI (HTML5/CSS/JS).
  - Backend ligero con almacenamiento local (SQLite) y API REST interna.
  - Punto de acceso Wi-Fi para que dispositivos de estudiantes se conecten sin internet.
- Contenidos en **HTML5 interactivo** (multimedia comprimida H.264/AAC) y metadatos en JSON/YAML.  
- Módulos con actividades interactivas (mínimo 10 por módulo) y registro completo de interacciones.  
- Panel docente accesible desde la red local (`http://raspberry.local:8080`) con export CSV/PDF.  
- Sincronización remota (cuando haya internet) mediante colas (MQTT/RabbitMQ) para subir logs y respaldos remotos.


## Impacto y beneficios
- **Meta:** Reducir la desalfabetización digital en un **50%** en 3 años en la comunidad intervenida.  
- **Beneficios esperados:**  
  - Aumento del rendimiento en pruebas estandarizadas.  
  - Mayor autonomía de estudiantes en el uso de tecnologías.  
  - Capacitación docente con efecto multiplicador en la comunidad.


## Recursos y requisitos de hardware
- **Nodo central:** Raspberry Pi(microSD 128GB).  
- **Conectividad:** Antena / adaptador Wi-Fi de mayor alcance (hotspot local).  
- **Clientes:** Laptops / tablets / móviles que soporten navegador moderno.  
- **Software requerido:** imagen del SO (pre-configurada), script de instalación, servidor web ligero, runtime backend, SQLite.


## Timeline y hitos (sugerido)
- **Meses 0:** Diseño, definición de contenidos iniciales y prototipado UI.  
- **Meses 1-2:** Desarrollo MVP (módulos básicos + panel docente) + pruebas locales.  
- **Meses 2-6:** Piloto en colegio rural (instalación, capacitación docentes, iteraciones).  
- **Año 2-3:** Expansión, mejoras IA, monitoreo de impacto y consolidación.

## Historias de Usuario

- **Historia 1**  
  Como estudiante de primaria en un colegio rural  
  quiero tener una forma sencilla de entrar a la plataforma educativa  
  para poder aprender mis materias usando herramientas digitales aunque no tenga internet en mi casa.  

- **Historia 2**  
  Como profesor de secundaria  
  quiero usar los módulos digitales en mis clases  
  para que los estudiantes aprendan mejor y se interesen más en los temas.  

- **Historia 3**  
  Como estudiante  
  quiero que el sistema me recomiende actividades según lo que sé y lo que no  
  para poder mejorar poco a poco y no quedarme atrás.  

- **Historia 4**  
  Como estudiante del colegio  
  quiero que mis compañeros y yo podamos conectarnos fácilmente a la plataforma desde los equipos del colegio  
  para que todos tengamos las mismas oportunidades de aprender.  

- **Historia 5**  
  Como directivo del colegio  
  quiero conocer cómo van progresando los estudiantes en el uso de la plataforma  
  para ver si de verdad estamos reduciendo la brecha digital.  


## Criterios de Aceptación

### 1. Accesibilidad y Usabilidad
- **Scenario 1:**  
  Given que la Raspberry Pi 5 está encendida  
  When el estudiante inicia el sistema  
  Then el sistema operativo debe cargar en menos de 30 segundos y mostrar una interfaz con íconos claros y menús de máximo 3 niveles.  

- **Scenario 2:**  
  Given que no hay conexión a internet  
  When el estudiante navega en los módulos  
  Then al menos el 80% de las funcionalidades deben estar disponibles sin interrupciones.  

---

### 2. Contenidos Educativos
- **Scenario 1:**  
  Given que el sistema está instalado  
  When un estudiante accede al menú de asignaturas  
  Then debe encontrar al menos módulos de matemáticas, ciencias y lenguaje.  

- **Scenario 2:**  
  Given que un profesor accede al panel de administración  
  When empieza un módulo de asignatura  
  Then debe visualizar los contenidos de las clases de la asignatura y poder empezar la clase a la par de sus estudiantes.  

- **Scenario 3:**  
  Given que un estudiante abre un módulo  
  When selecciona un tema  
  Then debe poder interactuar con al menos 10 actividades prácticas en ese módulo.  

---

### 3. Impacto en la Alfabetización Digital
- **Scenario 1:**  
  Given que un estudiante tiene su usuario registrado  
  When inicia sesión y entra en un módulo  
  Then debe poder completar actividades y guardar su progreso localmente sin ayuda.  

- **Scenario 2:**  
  Given que un estudiante usa el sistema  
  When realiza actividades y responde ejercicios  
  Then todos los eventos (tiempo, respuestas, resultados) deben quedar almacenados en la base de datos local.  

---

### 4. Soporte a Docentes
- **Scenario 1:**  
  Given que un profesor accede al panel desde un navegador en la red local  
  When consulta el desempeño de un grupo  
  Then debe visualizar métricas por estudiante (tiempo en plataforma, porcentaje de actividades, desempeño).  

- **Scenario 2:**  
  Given que existen datos registrados  
  When el docente solicita un reporte  
  Then debe poder exportarse en formato CSV y PDF.  

---

### 5. Conectividad Local
- **Scenario 1:**  
  Given que la Raspberry Pi está configurada como hotspot  
  When estudiantes se conectan desde diferentes dispositivos  
  Then hasta 20 usuarios deben poder acceder de forma concurrente a los contenidos.  

- **Scenario 2:**  
  Given que los estudiantes están conectados a la red del colegio  
  When abren un navegador web y acceden a `http://raspberry.local`  
  Then deben poder visualizar los módulos educativos sin depender de internet externo.  

---

### 6. Medición y Seguimiento
```gherkin
  Given que existen registros de uso en la base de datos  
  When un administrador solicita un reporte de hasta 500 registros  
  Then el sistema debe generarlo en menos de 10 segundos.  
```
```gherkin
  Given que la plataforma tiene datos activos  
  When se cumple una semana de operación  
  Then el sistema debe generar un respaldo comprimido (.zip) de la base de datos de uso.  
```
---
