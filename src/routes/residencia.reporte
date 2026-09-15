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
import { useOpsData, nombreEquipo, nombreSupervisor } from '../lib/ops-store';

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
      <main className="min-h-screen bg-slate-950 text-white p-4">
        <div className="mx-auto max-w-5xl">
          <button
            type="button"
            onClick={() =>
              navigate({
                to: '/residencia',
                search: {
                  fecha: fecha ?? '',
                  guardia: tipoGuardia,
                },
              })
            }
            className="mb-6 inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm"
          >
            <ArrowLeft size={16} />
            Volver a Residencia
          </button>

          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6">
            <h1 className="text-lg font-semibold">
              Reporte no encontrado
            </h1>
            <p className="mt-2 text-sm text-slate-300">
              No existe un reporte finalizado para la guardia seleccionada.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const robots = data.robots.filter((robot) => reporte.robots[robot.id]);
  const mixers = data.mixers.filter((mixer) => reporte.mixers[mixer.id]);

  const estadoLabel = (estado: string) => {
    switch (estado) {
      case 'operativo':
        return 'Operativo';
      case 'inoperativo':
        return 'Inoperativo';
      case 'mantenimiento':
        return 'Mantenimiento';
      case 'standby':
        return 'Stand By';
      default:
        return estado;
    }
  };

  const estadoClass = (estado: string) => {
    switch (estado) {
      case 'operativo':
        return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20';
      case 'inoperativo':
        return 'bg-red-500/10 text-red-300 border-red-500/20';
      case 'mantenimiento':
        return 'bg-amber-500/10 text-amber-300 border-amber-500/20';
      case 'standby':
        return 'bg-slate-500/10 text-slate-300 border-slate-500/20';
      default:
        return 'bg-slate-500/10 text-slate-300 border-slate-500/20';
    }
  };

  const fechaFormateada = new Date(
    `${reporte.fecha}T12:00:00`,
  ).toLocaleDateString('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-5">
        <button
          type="button"
          onClick={() =>
            navigate({
              to: '/residencia',
              search: {
                fecha: reporte.fecha,
                guardia: reporte.tipoGuardia,
              },
            })
          }
          className="mb-5 inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200"
        >
          <ArrowLeft size={16} />
          Volver al Dashboard
        </button>

        {/* CABECERA */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-orange-400">
                MINE REPORT PRO
              </p>

              <h1 className="mt-1 text-2xl font-bold">
                REPORTE DE GUARDIA
              </h1>

              <p className="mt-2 text-sm text-slate-400">
                Reporte operacional consolidado
              </p>
            </div>

            <div className="text-left md:text-right">
              <div className="text-lg font-semibold">
                {fechaFormateada}
              </div>

              <div className="mt-1 text-sm text-orange-400">
                {reporte.tipoGuardia === 'dia' ? '☀ DÍA' : '🌙 NOCHE'}
              </div>

              <div className="mt-2 text-sm text-slate-400">
                {nombreSupervisor(data, reporte.supervisorId)}
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg bg-slate-950 p-3">
              <div className="text-xs text-slate-500">Correlativo</div>
              <div className="mt-1 font-semibold">{reporte.correlativo}</div>
            </div>

            <div className="rounded-lg bg-slate-950 p-3">
              <div className="text-xs text-slate-500">Estado</div>
              <div className="mt-1 font-semibold text-emerald-400">
                {reporte.estado === 'finalizado'
                  ? 'Finalizado'
                  : 'Borrador'}
              </div>
            </div>

            <div className="rounded-lg bg-slate-950 p-3">
              <div className="text-xs text-slate-500">Sincronización</div>
              <div className="mt-1 font-semibold">
                {reporte.sync === 'sincronizado'
                  ? 'Sincronizado'
                  : 'Pendiente'}
              </div>
            </div>
          </div>
        </section>

        {/* EQUIPOS */}
        <section className="mt-5 rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-center gap-2">
            <Bot size={19} className="text-orange-400" />
            <h2 className="font-semibold">Estado de Equipos</h2>
          </div>

          <div className="mt-4">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Robots
            </h3>

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {robots.map((robot) => {
                const detalle = reporte.robots[robot.id];

                return (
                  <div
                    key={robot.id}
                    className="rounded-lg border border-slate-800 bg-slate-950 p-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold">
                        {robot.codigo}
                      </span>

                      <span
                        className={`rounded-full border px-2 py-1 text-[11px] ${estadoClass(
                          detalle.estado,
                        )}`}
                      >
                        {estadoLabel(detalle.estado)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-5">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Mixers
            </h3>

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {mixers.map((mixer) => {
                const detalle = reporte.mixers[mixer.id];

                return (
                  <div
                    key={mixer.id}
                    className="rounded-lg border border-slate-800 bg-slate-950 p-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold">
                        {mixer.codigo}
                      </span>

                      <span
                        className={`rounded-full border px-2 py-1 text-[11px] ${estadoClass(
                          detalle.estado,
                        )}`}
                      >
                        {estadoLabel(detalle.estado)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* LANZAMIENTOS */}
        <section className="mt-5 rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-center gap-2">
            <Bot size={19} className="text-orange-400" />
            <h2 className="font-semibold">Lanzado de Robot</h2>
          </div>

          {reporte.lanzamientos.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">
              Sin registros.
            </p>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[650px] text-sm">
                <thead className="border-b border-slate-800 text-left text-xs text-slate-500">
                  <tr>
                    <th className="px-3 py-2">Hora</th>
                    <th className="px-3 py-2">Robot</th>
                    <th className="px-3 py-2">Labor</th>
                    <th className="px-3 py-2">Cantidad</th>
                    <th className="px-3 py-2">Notas</th>
                  </tr>
                </thead>

                <tbody>
                  {reporte.lanzamientos.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-slate-800/70"
                    >
                      <td className="px-3 py-3">{item.hora}</td>
                      <td className="px-3 py-3 font-medium">
                        {nombreEquipo(data, item.robotId)}
                      </td>
                      <td className="px-3 py-3">{item.labor}</td>
                      <td className="px-3 py-3">{item.cantidad}</td>
                      <td className="px-3 py-3 text-slate-400">
                        {item.notas || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* CARGUIOS */}
        <section className="mt-5 rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-center gap-2">
            <Truck size={19} className="text-orange-400" />
            <h2 className="font-semibold">Carguío de Mixer</h2>
          </div>

          {reporte.carguios.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">
              Sin registros.
            </p>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[650px] text-sm">
                <thead className="border-b border-slate-800 text-left text-xs text-slate-500">
                  <tr>
                    <th className="px-3 py-2">Hora</th>
                    <th className="px-3 py-2">Mixer</th>
                    <th className="px-3 py-2">Labor</th>
                    <th className="px-3 py-2">Cantidad</th>
                    <th className="px-3 py-2">Notas</th>
                  </tr>
                </thead>

                <tbody>
                  {reporte.carguios.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-slate-800/70"
                    >
                      <td className="px-3 py-3">{item.hora}</td>
                      <td className="px-3 py-3 font-medium">
                        {nombreEquipo(data, item.mixerId)}
                      </td>
                      <td className="px-3 py-3">{item.labor}</td>
                      <td className="px-3 py-3">{item.cantidad}</td>
                      <td className="px-3 py-3 text-slate-400">
                        {item.notas || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* FALLAS */}
        <section className="mt-5 rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-center gap-2">
            <AlertTriangle size={19} className="text-red-400" />
            <h2 className="font-semibold">Fallas de la Guardia</h2>
          </div>

          {reporte.fallas.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">
              Sin fallas registradas.
            </p>
          ) : (
            <div className="mt-4 space-y-3">
              {reporte.fallas.map((falla) => (
                <div
                  key={falla.id}
                  className="rounded-lg border border-slate-800 bg-slate-950 p-4"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold">
                      {nombreEquipo(data, falla.equipoId)}
                    </span>

                    <span className="text-xs text-slate-500">
                      {falla.hora}
                    </span>

                    <span className="rounded-full border border-red-500/20 bg-red-500/10 px-2 py-1 text-xs text-red-300">
                      {falla.tipo}
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-slate-300">
                    {falla.descripcion}
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    Acción: {falla.accion}
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    Estado final:{' '}
                    <span className="text-slate-300">
                      {estadoLabel(falla.estadoFinal)}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* DESECHOS */}
        <section className="mt-5 rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-center gap-2">
            <Trash2 size={19} className="text-orange-400" />
            <h2 className="font-semibold">Desechos y Morteros</h2>
          </div>

          {reporte.desechos.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">
              Sin registros.
            </p>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[700px] text-sm">
                <thead className="border-b border-slate-800 text-left text-xs text-slate-500">
                  <tr>
                    <th className="px-3 py-2">Hora</th>
                    <th className="px-3 py-2">Equipo</th>
                    <th className="px-3 py-2">Tipo</th>
                    <th className="px-3 py-2">Cantidad</th>
                    <th className="px-3 py-2">Descripción</th>
                  </tr>
                </thead>

                <tbody>
                  {reporte.desechos.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-slate-800/70"
                    >
                      <td className="px-3 py-3">{item.hora}</td>
                      <td className="px-3 py-3">
                        {nombreEquipo(data, item.equipoId)}
                      </td>
                      <td className="px-3 py-3">{item.tipo}</td>
                      <td className="px-3 py-3">
                        {item.cantidad} {item.unidad}
                      </td>
                      <td className="px-3 py-3 text-slate-400">
                        {item.descripcion || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* COMBUSTIBLE Y ADITIVO */}
        <section className="mt-5 rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-center gap-2">
            <Fuel size={19} className="text-orange-400" />
            <h2 className="font-semibold">Combustible y Aditivo</h2>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead className="border-b border-slate-800 text-center text-xs text-slate-500">
                <tr>
                  <th className="px-3 py-2 text-left">Robot</th>
                  <th className="px-3 py-2">IG</th>
                  <th className="px-3 py-2">MG</th>
                  <th className="px-3 py-2">FG</th>
                  <th className="px-3 py-2">Aditivo</th>
                </tr>
              </thead>

              <tbody>
                {robots.map((robot) => {
                  const detalle = reporte.robots[robot.id];

                  return (
                    <tr
                      key={robot.id}
                      className="border-b border-slate-800/70 text-center"
                    >
                      <td className="px-3 py-3 text-left font-semibold">
                        {robot.codigo}
                      </td>

                      <td className="px-3 py-3">
                        {detalle.combustible.inicio ? '✓' : '—'}
                      </td>

                      <td className="px-3 py-3">
                        {detalle.combustible.media ? '✓' : '—'}
                      </td>

                      <td className="px-3 py-3">
                        {detalle.combustible.final ? '✓' : '—'}
                      </td>

                      <td className="px-3 py-3">
                        {detalle.aditivo === true
                          ? '●'
                          : detalle.aditivo === false
                            ? '○'
                            : '—'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-3 text-xs text-slate-500">
            IG = Inicio de Guardia · MG = Media Guardia · FG = Final de
            Guardia
          </div>
        </section>

        {/* OBSERVACIONES */}
        <section className="mt-5 rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-center gap-2">
            <ClipboardList size={19} className="text-orange-400" />
            <h2 className="font-semibold">Observaciones</h2>
          </div>

          <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-300">
            {reporte.observaciones || 'Sin observaciones.'}
          </p>
        </section>

        <div className="pb-8 pt-6 text-center text-xs text-slate-600">
          Mine Report Pro · Reporte de Residencia
        </div>
      </div>
    </main>
  );
}

export const Route = createFileRoute('/residencia/reporte')({
  validateSearch: (search: Record<string, unknown>) => ({
    fecha: typeof search.fecha === 'string' ? search.fecha : '',
    guardia: search.guardia === 'noche' ? 'noche' : 'dia',
  }),
  component: ResidenciaReportePage,
});