# Guard Duty Reports

Construir una plataforma completa de Reporte de Operaciones por Guardia (Minería y Construcción) que incluya:

1. Landing Page atractiva e industrial:
- Presentación de la solución ("Offline-First para minería subterránea y operaciones pesadas"), beneficios clave (cero pérdida de datos, estandarización, generación instantánea de PDF, trazabilidad de equipos).
- Métricas de impacto, flujo guiado paso a paso, vista previa interactiva y botón directo para "Ingresar a la Aplicación" o "Iniciar Reporte".

2. Aplicación Web Operativa (Mobile-first y responsive):
- Banner persistente de conectividad (🟢 Conectado / 🟠 Sin conexión / 🔄 Sincronizando / ✓ Sincronizado) y autoguardado en localStorage.
- Flujo guiado de nuevo reporte paso a paso según PRD:
  * Datos de guardia: Fecha, Tipo (Día/Noche), Supervisor.
  * Estado de Robots: Operativo (verde), Inoperativo (rojo), Mantenimiento (amarillo), Stand By (azul) con contadores dinámicos.
  * Estado de Mixers: Operativo, Inoperativo, Mantenimiento, Stand By con contadores.
  * Combustible y Aditivo (exclusivo para Robots): checkboxes de Inicio/Media/Final y aditivo Sí/No.
  * Lanzamiento de Robots: solo para robots en estado Operativo, permite añadir múltiples lanzamientos (hora, descripción, notas).
  * Carguío de Mixers: solo para mixers en estado Operativo, múltiples registros.
  * Módulo de Fallas: registrar equipo, hora, tipo de falla, descripción, acción tomada y estado final.
  * Desechos / Morteros: tipo, hora, equipo, cantidad, unidad (m³, kg) y descripción.
  * Observaciones generales de guardia.
  * Pantalla de Resumen con botón de edición por sección y validación completa antes de finalizar.
  * Finalización con bloqueo de edición y generación automática de PDF descargable y acciones de compartir (WhatsApp, Correo, Enlace).
- Módulo de Historial con filtros por fecha, guardia, supervisor y estado de sincronización.
- Módulo de Administración de Catálogos (Robots, Mixers, Usuarios) pre-cargados con datos realistas para uso inmediato.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/385136a7-c6ac-41da-a4b8-1fba96cd9247).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
