import { useState } from 'react';
import {
  ArrowLeft,
  BarChart3,
  Bot,
  Truck,
  AlertTriangle,
  Fuel,
} from 'lucide-react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useOpsData, nombreSupervisor } from '../lib/ops-store';

export function ResidenciaPage() {
  const navigate = useNavigate();
  const data = useOpsData();

  const reportes = data.reportes
    .filter((r) => r.estado === 'finalizado')
    .sort((a, b) => `${b.fecha}-${b.tipoGuardia}`.localeCompare(`${a.fecha}-${a.tipoGuardia}`));

  const [fechaSeleccionada, setFechaSeleccionada] = useState(
  reportes[0]?.fecha ?? '',
);

const [tipoGuardiaSeleccionado, setTipoGuardiaSeleccionado] = useState<
  'dia' | 'noche'
>(reportes[0]?.tipoGuardia ?? 'dia');

const reporte =
  reportes.find(
    (r) =>
      r.fecha === fechaSeleccionada &&
      r.tipoGuardia === tipoGuardiaSeleccionado,
  ) ?? null;
    if (!reporte) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-slate-400">
            No hay reportes de guardia disponibles.
          </p>

          <button
            onClick={() => navigate({ to: '/acceso' })}
            className="mt-4 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="border-b border-slate-700 bg-slate-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>

            <div>
              <h1 className="font-bold text-lg">Mine Report Pro</h1>
              <p className="text-xs text-slate-400">Módulo de Residencia</p>
            </div>
          </div>

          <button
            onClick={() => navigate({ to: '/acceso' })}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Cambiar acceso
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <p className="text-blue-400 font-semibold mb-2">RESIDENCIA</p>

          <h2 className="text-4xl font-bold mb-3">
            Dashboard de Operaciones
          </h2>

          <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-800/70 p-4">
  <div className="grid md:grid-cols-2 gap-4">

    <div>
      <label className="block text-xs text-slate-400 mb-2">
        📅 FECHA DE GUARDIA
      </label>

      <input
        type="date"
        value={fechaSeleccionada}
        onChange={(e) => {
          const nuevaFecha = e.target.value;

          setFechaSeleccionada(nuevaFecha);

          const primeraGuardia = reportes.find(
            (r) => r.fecha === nuevaFecha,
          );

          if (primeraGuardia) {
            setTipoGuardiaSeleccionado(
              primeraGuardia.tipoGuardia,
            );
          }
        }}
        className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-white"
      />
    </div>

    <div>
      <label className="block text-xs text-slate-400 mb-2">
        🕐 GUARDIA
      </label>

      <select
        value={tipoGuardiaSeleccionado}
        onChange={(e) =>
          setTipoGuardiaSeleccionado(
            e.target.value as 'dia' | 'noche',
          )
        }
        className="w-full rounded-lg border border-slate-600 bg-slate-900 px-4 py-3 text-white"
      >
        <option value="dia">☀ DÍA</option>
        <option value="noche">🌙 NOCHE</option>
      </select>
    </div>

  </div>

  {reporte && (
    <div className="mt-4 pt-4 border-t border-slate-700">
      <p className="text-xs text-slate-400">
        JEFE DE GUARDIA
      </p>

      <p className="font-semibold mt-1">
        {nombreSupervisor(data, reporte.supervisorId)}
      </p>
    </div>
  )}
</div>

          <p className="text-slate-400 max-w-2xl">
            Consulta el estado general de las operaciones, revisa reportes
            de guardia y analiza los principales indicadores.
          </p>
        </div>

        <div className="space-y-6">

  {/* ESTADO DE EQUIPOS */}
  <section className="bg-slate-800/70 border border-slate-700 rounded-2xl p-6">

    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
        <BarChart3 className="w-5 h-5 text-blue-400" />
      </div>

      <div>
        <h3 className="text-xl font-bold">
          ⚙️ Estado de Equipos
        </h3>

        <p className="text-sm text-slate-400">
          Estado registrado durante la guardia seleccionada
        </p>
      </div>
    </div>

    <div className="grid lg:grid-cols-2 gap-6">

      {/* ROBOTS */}
      <div className="bg-slate-900/70 rounded-xl p-5">

        <div className="flex items-center gap-2 mb-4">
          <Bot className="w-5 h-5 text-blue-400" />

          <h4 className="font-semibold">
            ROBOTS
          </h4>
        </div>

        <div className="space-y-2">

          {data.robots.map((robot) => {
            const detalle = reporte.robots[robot.id];

            const estado = detalle?.estado ?? 'operativo';

            const estadoConfig = {
              operativo: {
                color: 'bg-green-500',
                texto: 'Operativo',
              },
              mantenimiento: {
                color: 'bg-orange-500',
                texto: 'Mantenimiento',
              },
              standby: {
                color: 'bg-blue-500',
                texto: 'Stand By',
              },
              inoperativo: {
                color: 'bg-red-500',
                texto: 'Inoperativo',
              },
            }[estado];

            return (
              <div
                key={robot.id}
                className="flex items-center justify-between rounded-lg bg-slate-800 px-4 py-3"
              >
                <span className="font-medium">
                  {robot.codigo}
                </span>

                <span className="flex items-center gap-2 text-sm text-slate-300">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${estadoConfig.color}`}
                  />

                  {estadoConfig.texto}
                </span>
              </div>
            );
          })}

        </div>
      </div>

      {/* MIXERS */}
      <div className="bg-slate-900/70 rounded-xl p-5">

        <div className="flex items-center gap-2 mb-4">
          <Truck className="w-5 h-5 text-blue-400" />

          <h4 className="font-semibold">
            MIXERS
          </h4>
        </div>

        <div className="space-y-2">

          {data.mixers.map((mixer) => {
            const detalle = reporte.mixers[mixer.id];

            const estado = detalle?.estado ?? 'operativo';

            const estadoConfig = {
              operativo: {
                color: 'bg-green-500',
                texto: 'Operativo',
              },
              mantenimiento: {
                color: 'bg-orange-500',
                texto: 'Mantenimiento',
              },
              standby: {
                color: 'bg-blue-500',
                texto: 'Stand By',
              },
              inoperativo: {
                color: 'bg-red-500',
                texto: 'Inoperativo',
              },
            }[estado];

            return (
              <div
                key={mixer.id}
                className="flex items-center justify-between rounded-lg bg-slate-800 px-4 py-3"
              >
                <span className="font-medium">
                  {mixer.codigo}
                </span>

                <span className="flex items-center gap-2 text-sm text-slate-300">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${estadoConfig.color}`}
                  />

                  {estadoConfig.texto}
                </span>
              </div>
            );
          })}

        </div>
      </div>

    </div>
  </section>

</div>
      </main>
    </div>
  );
}

export const Route = createFileRoute('/residencia')({
  component: ResidenciaPage,
});