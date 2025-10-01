# Proyecto: Aula Digital Rural
*Plataforma educativa offline para colegios rurales (Raspberry Pi + Kolibri + Kiwix)*

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

---

## Roles
- **Product Owner:** Joao Muñoz
- **Scrum Master:** Giovanni Moreno
- **Tech Lead:** Santiago Gavilán
- **Equipo de Desarrollo:** John Rojas

---

## State & Definitions

### Definition of Ready
Antes de comenzar un sprint / tarea, **todas** las siguientes condiciones deben cumplirse:
- [ ] Historia o task con **Criterios de aceptación claros, específicos y medibles**.
- [ ] Canales de **Kolibri** y archivos **ZIM de Kiwix** seleccionados y descargados para el sprint.
- [ ] Hardware de prueba disponible: **Raspberry Pi 4 (4GB)**, SD Card de alta resistencia y Punto de Acceso Wi-Fi dedicado.
- [ ] Plan de red local definido (IP estática del servidor, SSID para el AP).
- [ ] Modelo de datos de **Kolibri** comprendido para la extracción de métricas.
- [ ] **Script de aprovisionamiento** (Bash/Ansible) preparado para configurar la imagen base de DietPi.

### Definition of Done
Una historia / tarea se considera terminada cuando **todas** estas condiciones se cumplen:
- [ ] Configuraciones aplicadas y mergeadas a la rama principal del repositorio de aprovisionamiento.
- [ ] Pruebas funcionales de los servicios (Kolibri, Kiwix) superadas.
- [ ] Criterios de aceptación (Given/When/Then) verificados en el hardware de prueba.
- [ ] **Documentación actualizada** (README, guía de actualización de contenido).
- [ ] **Imagen maestra (`.img`) generada** y probada con una instalación limpia.
- [ ] Despliegue en Raspberry Pi de prueba verificado; el sistema arranca y los servicios son accesibles en < 2 minutos.

---

## Descripción del proyecto
**Visión (2026):** Para 2026, habremos implementado la solución "Aula Digital Rural" en al menos tres colegios rurales, proporcionando a más de 200 estudiantes y sus profesores acceso a recursos educativos digitales de primer nivel y mejorando tangiblemente su alfabetización digital.

**Reto:** ¿Cómo facilitar que estudiantes de primaria y secundaria en municipios rurales desarrollen competencias de aprendizaje digital de forma autónoma y sostenible, sin depender de una conexión a internet?

**Nombre de la solución:** `Aula Digital Rural`

**Resumen:**
Se creará una **imagen de sistema operativo preconfigurada y endurecida** para una Raspberry Pi, que actuará como un servidor local en el colegio. Esta imagen contendrá la plataforma de aprendizaje **Kolibri**, cargada con contenido curricular, y **Kiwix**, con una copia completa de Wikipedia. La solución generará su propia red Wi-Fi, permitiendo a los estudiantes conectarse y aprender desde cualquier dispositivo con un navegador.

---

## Cómo funciona (resumen técnico)
- **Hardware:** Una **Raspberry Pi 4** actúa como el servidor central.
- **Sistema Operativo:** Se utiliza **DietPi** (una distribución ultraligera basada en Debian) como base, configurada en modo **solo lectura (read-only)** para máxima fiabilidad y resistencia a cortes de energía.
- **Servicios Principales:**
    - **Kolibri:** Plataforma educativa que gestiona usuarios, contenido, lecciones y seguimiento del progreso. Accesible en `http://192.168.1.10:8080`.
    - **Kiwix-serve:** Sirve una copia completa de Wikipedia y otros recursos offline. Accesible en `http://192.168.1.10:8100`.
- **Red:** La Pi se conecta vía Ethernet a un **Punto de Acceso (AP) Wi-Fi dedicado**, que crea una red local (ej. SSID: `AulaDigital`) para los dispositivos de los estudiantes.
- **Contenido:** Canales educativos de Kolibri (videos, ejercicios interactivos) y archivos ZIM de Kiwix (versiones offline de sitios web).
- **Mantenimiento:** Las actualizaciones de contenido se realizan mediante "sneakernet" (llevando un USB al colegio) a través de la interfaz de Kolibri y scripts seguros.

---

## Impacto y beneficios
- **Meta:** Aumentar el tiempo de interacción con recursos digitales educativos en un **300%** en el primer año en la comunidad intervenida.
- **Beneficios esperados:**
    - Mejora del interés y la participación de los estudiantes en las materias.
    - Desarrollo de la autonomía y habilidades de investigación en los estudiantes.
    - Empoderamiento de los docentes con herramientas para personalizar el aprendizaje.

---

## Recursos y requisitos de hardware
- **Nodo Central:** **Raspberry Pi 4 (4GB)** con tarjeta microSD de alta resistencia (64GB).
- **Conectividad:** **Punto de Acceso Wi-Fi dedicado** (ej. TP-Link Omada, Ubiquiti UniFi).
- **Clientes:** Cualquier laptop, tableta o smartphone con un navegador web moderno.
- **Software Requerido:** Imagen preconfigurada del SO (`auladigital.img`).

---

## Timeline y hitos (sugerido)
- **Mes 0:** Selección de contenidos, configuración de la imagen maestra y pruebas de laboratorio.
- **Mes 1:** Despliegue del piloto en el primer colegio, configuración de la red local y capacitación inicial a docentes.
- **Meses 2-6:** Acompañamiento, recolección de feedback, y primera actualización de contenido.
- **Año 1-2:** Medición de impacto, refinamiento de la imagen del SO y planificación de la expansión a nuevos colegios.

---

## Historias de Usuario

- **Historia 1**
  Como estudiante de primaria, quiero acceder a juegos y videos de matemáticas desde la tableta del colegio para aprender a sumar de forma divertida.

- **Historia 2**
  Como profesor de ciencias, quiero asignar a mis estudiantes una investigación en la Wikipedia offline para que aprendan a buscar información sin riesgo de distracciones.

- **Historia 3**
  Como coach de Kolibri (profesor), quiero ver qué estudiantes han completado las lecciones de la semana para saber a quién necesito apoyar más.

- **Historia 4**
  Como estudiante de bachillerato, quiero poder conectarme fácilmente desde mi celular a la red del colegio para repasar los temas vistos en clase.

- **Historia 5**
  Como directivo del colegio, quiero un reporte del uso de la plataforma para mostrar a los padres de familia el progreso en la adopción de tecnología.

---

## Criterios de Aceptación

### 1. Accesibilidad y Usabilidad
```gherkin
  Given que el servidor "Aula Digital Rural" está encendido
  When un estudiante se conecta a la red Wi-Fi "AulaDigital" y abre el navegador
  Then debe poder acceder a la página de inicio de Kolibri en menos de 15 segundos.
```
```gherkin
  Given que no hay conexión a internet externo
  When el estudiante navega en los módulos de Kolibri o busca en Kiwix
  Then todas las funcionalidades deben estar disponibles sin errores ni interrupciones.
```

### 2. Contenidos y Usabilidad
```gherkin
  Given que el servidor "Aula Digital Rural" está encendido
  When un estudiante se conecta a la red Wi-Fi "AulaDigital" y abre el navegador
  Then debe poder acceder a la página de inicio de Kolibri en menos de 15 segundos.
```
```gherkin
  Given que no hay conexión a internet externo
  When el estudiante navega en los módulos de Kolibri o busca en Kiwix
  Then todas las funcionalidades deben estar disponibles sin errores ni interrupciones.
```
