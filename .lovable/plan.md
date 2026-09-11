# Plataforma de Reporte de Operaciones por Guardia

Plataforma para minería y construcción: página de presentación + aplicación de reportes que funciona sin conexión, con PDF descargable.

## 1. Página de presentación (inicio)
- Estilo industrial: fondo oscuro grafito, acentos ámbar/naranja de seguridad, tipografía condensada de titulares.
- Secciones: portada con mensaje "Offline-First para minería subterránea", beneficios (cero pérdida de datos, estandarización, PDF instantáneo, trazabilidad de equipos), métricas de impacto, flujo guiado paso a paso, vista previa interactiva del reporte.
- Botones: "Ingresar a la Aplicación" e "Iniciar Reporte".

## 2. Aplicación operativa (móvil primero)
Barra fija de estado de conexión: Conectado / Sin conexión / Sincronizando / Sincronizado. Todo lo escrito se guarda solo en el equipo del usuario, automáticamente, paso a paso.

Flujo guiado de nuevo reporte:
1. Datos de guardia: fecha, tipo (día/noche), supervisor.
2. Estado de robots: operativo, inoperativo, mantenimiento, stand by, con contadores en vivo.
3. Estado de mixers: mismos estados y contadores.
4. Combustible y aditivo (solo robots): inicio/media/final y aditivo sí/no.
5. Lanzamientos de robots (solo los operativos): varios registros con hora, descripción y notas.
6. Carguío de mixers (solo los operativos): varios registros.
7. Fallas: equipo, hora, tipo, descripción, acción tomada, estado final.
8. Desechos/morteros: tipo, hora, equipo, cantidad, unidad (m³, kg), descripción.
9. Observaciones generales.
10. Resumen con botón de edición por sección y validación antes de finalizar.
11. Finalización: reporte bloqueado, PDF descargable y opciones de compartir por WhatsApp, correo y enlace copiado.

## 3. Historial
Lista de reportes con filtros por fecha, tipo de guardia, supervisor y estado de sincronización; abre cada reporte en modo lectura y permite descargar su PDF.

## 4. Catálogos
Administración de robots, mixers y usuarios (crear, editar, desactivar), precargados con equipos y supervisores realistas para usar de inmediato.

## Notas técnicas
- Rutas: `/` (presentación), `/app` (panel), `/app/reporte/nuevo` (flujo), `/app/reporte/$id` (lectura), `/app/historial`, `/app/catalogos`.
- Estado y persistencia con localStorage vía un contexto/store propio; semillas de catálogos al primer arranque. Sin base de datos por ahora — el indicador de sincronización refleja el estado de conexión del navegador y una cola local.
- PDF generado en el navegador con jsPDF (tablas por sección, encabezado con datos de guardia).
- Validación con zod por paso; diseño con tokens de color en `src/styles.css`, componentes shadcn existentes.
- Metadatos propios (título/descripción/og) en cada página.

## Fuera de alcance
Cuentas de usuario reales y sincronización con un servidor: los reportes viven en el navegador. Se puede añadir después con Lovable Cloud si se desea.
