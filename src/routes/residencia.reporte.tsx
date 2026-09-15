import {
  ArrowLeft,
  Bot,
  Truck,
  Fuel,
  AlertTriangle,
  Trash2,
  ClipboardList,
} from 'lucide-react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import {
  useOpsData,
  nombreEquipo,
  nombreSupervisor,
} from '../lib/ops-store';

function ResidenciaReportePage() {
  const navigate = useNavigate();
  const data = useOpsData();

  const { fecha, guardia } = Route.useSearch();

  const tipoGuardia = guardia === 'noche' ? 'noche' : 'dia';

  const reporte = data.reportes.find(
    (r) => r.fecha === fecha && r.tipoGuardia === tipoGuardia,
  );

  if (!reporte) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-6xl">
          <button
            type="button"
            onClick={() => navigate({ to: '/residencia' })}
            className="mb-6 inline-flex items-center gap-2 text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="h-5 w-5" />
            Volver a Residencia
          </button>

          <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
            <h1 className="text-xl font-bold text-slate-900">
              Reporte no encontrado
            </h1>
            <p className="mt-2 text-slate-500">
              No existe un reporte finalizado para la fecha y guardia
              seleccionadas.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const supervisor = nombreSupervisor(data, reporte.supervisorId);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate({ to: '/residencia' })}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="h-5 w-5" />
            Volver a Residencia
          </button>

          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase text-emerald-700">
            Solo lectura
          </span>
        </div>

        <header className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            Mine Report Pro
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            Reporte de Guardia
          </h1>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase text-slate-500">
                Fecha
              </p>
              <p className="mt-1 font-semibold text-slate-900">
                {reporte.fecha}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase text-slate-500">
                Guardia
              </p>
              <p className="mt-1 font-semibold text-slate-900">
                {reporte.tipoGuardia === 'dia' ? 'Día' : 'Noche'}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase text-slate-500">
                Jefe de Guardia
              </p>
              <p className="mt-1 font-semibold text-slate-900">
                {supervisor}
              </p>
            </div>
          </div>
        </header>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <Bot className="h-6 w-6 text-blue-600" />
            <h2 className="text-lg font-bold text-slate-900">
              Lanzado de Robot
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-sm">
              <thead>
                <tr className="border-b text-left text-xs uppercase text-slate-500">
                  <th className="p-3">Hora</th>
                  <th className="p-3">Robot</th>
                  <th className="p-3">Labor</th>
                  <th className="p-3">Cantidad</th>
                  <th className="p-3">Notas</th>
                </tr>
              </thead>

              <tbody>
                {reporte.lanzamientos.map((item) => (
                  <tr key={item.id} className="border-b last:border-0">
                    <td className="p-3">{item.hora}</td>
                    <td className="p-3 font-semibold">
                      {nombreEquipo(data, item.robotId)}
                    </td>
                    <td className="p-3">{item.labor}</td>
                    <td className="p-3">{item.cantidad}</td>
                    <td className="p-3 text-slate-500">
                      {item.notas || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <Truck className="h-6 w-6 text-blue-600" />
            <h2 className="text-lg font-bold text-slate-900">
              Carguío de Mixer
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-sm">
              <thead>
                <tr className="border-b text-left text-xs uppercase text-slate-500">
                  <th className="p-3">Hora</th>
                  <th className="p-3">Mixer</th>
                  <th className="p-3">Labor</th>
                  <th className="p-3">Cantidad</th>
                  <th className="p-3">Notas</th>
                </tr>
              </thead>

              <tbody>
                {reporte.carguios.map((item) => (
                  <tr key={item.id} className="border-b last:border-0">
                    <td className="p-3">{item.hora}</td>
                    <td className="p-3 font-semibold">
                      {nombreEquipo(data, item.mixerId)}
                    </td>
                    <td className="p-3">{item.labor}</td>
                    <td className="p-3">{item.cantidad}</td>
                    <td className="p-3 text-slate-500">
                      {item.notas || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-500" />
            <h2 className="text-lg font-bold text-slate-900">
              Fallas
            </h2>
          </div>

          <div className="space-y-3">
            {reporte.fallas.length === 0 ? (
              <p className="text-sm text-slate-500">
                No se registraron fallas durante la guardia.
              </p>
            ) : (
              reporte.fallas.map((falla) => (
                <div
                  key={falla.id}
                  className="rounded-xl border border-slate-200 p-4"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-semibold text-slate-900">
                      {nombreEquipo(data, falla.equipoId)}
                    </span>
                    <span className="text-sm text-slate-500">
                      {falla.hora}
                    </span>
                    <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-700">
                      {falla.tipo}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-slate-700">
                    {falla.descripcion}
                  </p>

                  {falla.accion && (
                    <p className="mt-1 text-sm text-slate-500">
                      Acción: {falla.accion}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <Trash2 className="h-6 w-6 text-rose-500" />
            <h2 className="text-lg font-bold text-slate-900">
              Desechos y Morteros
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-sm">
              <thead>
                <tr className="border-b text-left text-xs uppercase text-slate-500">
                  <th className="p-3">Hora</th>
                  <th className="p-3">Equipo</th>
                  <th className="p-3">Tipo</th>
                  <th className="p-3">Cantidad</th>
                  <th className="p-3">Descripción</th>
                </tr>
              </thead>

              <tbody>
                {reporte.desechos
                  .filter(
                    (item) =>
                      item.tipo.toLowerCase().includes('desecho') ||
                      item.tipo.toLowerCase().includes('mortero'),
                  )
                  .map((item) => (
                    <tr key={item.id} className="border-b last:border-0">
                      <td className="p-3">{item.hora}</td>
                      <td className="p-3 font-semibold">
                        {nombreEquipo(data, item.equipoId)}
                      </td>
                      <td className="p-3">{item.tipo}</td>
                      <td className="p-3">
                        {item.cantidad} {item.unidad}
                      </td>
                      <td className="p-3 text-slate-500">
                        {item.descripcion || '—'}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <Fuel className="h-6 w-6 text-orange-500" />
            <h2 className="text-lg font-bold text-slate-900">
              Combustible y Aditivo
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="border-b text-left text-xs uppercase text-slate-500">
                  <th className="p-3">Robot</th>
                  <th className="p-3">IG</th>
                  <th className="p-3">MG</th>
                  <th className="p-3">FG</th>
                  <th className="p-3">Aditivo</th>
                </tr>
              </thead>

              <tbody>
                {Object.entries(reporte.robots).map(([robotId, detalle]) => (
                  <tr key={robotId} className="border-b last:border-0">
                    <td className="p-3 font-semibold">
                      {nombreEquipo(data, robotId)}
                    </td>
                    <td className="p-3">
                      {detalle.combustible.inicio ? '✓' : '—'}
                    </td>
                    <td className="p-3">
                      {detalle.combustible.media ? '✓' : '—'}
                    </td>
                    <td className="p-3">
                      {detalle.combustible.final ? '✓' : '—'}
                    </td>
                    <td className="p-3">
                      {detalle.aditivo === true
                        ? '● Sí'
                        : detalle.aditivo === false
                          ? '○ No'
                          : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <ClipboardList className="h-6 w-6 text-slate-600" />
            <h2 className="text-lg font-bold text-slate-900">
              Observaciones
            </h2>
          </div>

          <p className="whitespace-pre-wrap text-sm text-slate-700">
            {reporte.observaciones || 'Sin observaciones.'}
          </p>
        </section>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/residencia/reporte')({
  validateSearch: (search: Record<string, unknown>) => ({
    fecha: typeof search.fecha === 'string' ? search.fecha : '',
    guardia: search.guardia === 'noche' ? 'noche' : 'dia',
  }),
  component: ResidenciaReportePage,
});  component: ResidenciaReportePage,
});