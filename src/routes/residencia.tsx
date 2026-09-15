import { useState } from 'react';
import {
  ArrowLeft,
  BarChart3,
  Bot,
  Truck,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Trash2,
  Fuel,
  ClipboardList,
  FileText,
} from 'lucide-react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useOpsData, nombreSupervisor } from '../lib/ops-store';

export function ResidenciaPage() {
  const navigate = useNavigate();
  const data = useOpsData();
  const [robotsAbiertos, setRobotsAbiertos] = useState(false);
const [mixersAbiertos, setMixersAbiertos] = useState(false);

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
const equiposAtencion = [
  ...data.robots.map((robot) => ({
    equipoId: robot.id,
    estado: reporte?.robots[robot.id]?.estado,
  })),
  ...data.mixers.map((mixer) => ({
    equipoId: mixer.id,
    estado: reporte?.mixers[mixer.id]?.estado,
  })),
];

const totalAtencion = equiposAtencion.filter(
  (equipo) =>
    equipo.estado === 'inoperativo' ||
    equipo.estado === 'mantenimiento',
).length;

const totalInoperativos = equiposAtencion.filter(
  (equipo) => equipo.estado === 'inoperativo',
).length;

const totalFallas = reporte?.fallas.length ?? 0;

const totalDesechos =
  reporte?.desechos
    .filter((d) => d.tipo.toLowerCase().includes('desecho'))
    .reduce((total, item) => total + item.cantidad, 0) ?? 0;

const totalMorteros =
  reporte?.desechos
    .filter((d) => d.tipo.toLowerCase().includes('mortero'))
    .reduce((total, item) => total + item.cantidad, 0) ?? 0;

const totalCombustibleCompletos =
  reporte
    ? data.robots.filter(
        (robot) =>
          reporte.robots[robot.id]?.combustible?.inicio &&
          reporte.robots[robot.id]?.combustible?.media &&
          reporte.robots[robot.id]?.combustible?.final,
      ).length
    : 0;

const totalAditivoRegistrado =
  reporte
    ? data.robots.filter(
        (robot) => reporte.robots[robot.id]?.aditivo !== null,
      ).length
    : 0;
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
        FECHA DE GUARDIA
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
        GUARDIA
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
        <option value="dia">DÍA</option>
        <option value="noche">NOCHE</option>
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
        Estado de Equipos
      </h3>

      <p className="text-sm text-slate-400">
        Estado registrado durante la guardia seleccionada
      </p>
    </div>
  </div>

  <div className="grid lg:grid-cols-2 gap-6">

    {/* ROBOTS */}
    <div className="bg-slate-900/70 rounded-xl overflow-hidden">

      <button
        type="button"
        onClick={() => setRobotsAbiertos(!robotsAbiertos)}
        className="w-full p-5 text-left"
      >

        <div className="flex items-center justify-between mb-5">

          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-400" />
            <h4 className="font-semibold">ROBOTS</h4>
          </div>

          {robotsAbiertos ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}

        </div>

        <div className="grid grid-cols-4 gap-2">

          {[
            {
              estado: 'operativo',
              color: 'text-green-400',
              fondo: 'bg-green-500/10',
              label: 'Operativos',
            },
            {
              estado: 'inoperativo',
              color: 'text-red-400',
              fondo: 'bg-red-500/10',
              label: 'Inoperativos',
            },
            {
              estado: 'mantenimiento',
              color: 'text-orange-400',
              fondo: 'bg-orange-500/10',
              label: 'Mantenimiento',
            },
            {
              estado: 'standby',
              color: 'text-blue-400',
              fondo: 'bg-blue-500/10',
              label: 'Stand By',
            },
          ].map((item) => {

            const total = data.robots.filter(
              (robot) =>
                (reporte.robots[robot.id]?.estado ?? 'operativo') ===
                item.estado,
            ).length;

            return (
              <div
                key={item.estado}
                className={`rounded-lg ${item.fondo} p-3 text-center`}
              >
                <div className={`text-2xl font-bold ${item.color}`}>
                  {total}
                </div>

                <div className="text-[10px] text-slate-400 mt-1 leading-tight">
                  {item.label}
                </div>
              </div>
            );
          })}

        </div>

      </button>

      {robotsAbiertos && (
        <div className="border-t border-slate-700 p-4 space-y-2">

          {data.robots.map((robot) => {

            const estado =
              reporte.robots[robot.id]?.estado ?? 'operativo';

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
      )}

    </div>

    {/* MIXERS */}
    <div className="bg-slate-900/70 rounded-xl overflow-hidden">

      <button
        type="button"
        onClick={() => setMixersAbiertos(!mixersAbiertos)}
        className="w-full p-5 text-left"
      >

        <div className="flex items-center justify-between mb-5">

          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-blue-400" />
            <h4 className="font-semibold">MIXERS</h4>
          </div>

          {mixersAbiertos ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}

        </div>

        <div className="grid grid-cols-4 gap-2">

          {[
            {
              estado: 'operativo',
              color: 'text-green-400',
              fondo: 'bg-green-500/10',
              label: 'Operativos',
            },
            {
              estado: 'inoperativo',
              color: 'text-red-400',
              fondo: 'bg-red-500/10',
              label: 'Inoperativos',
            },
            {
              estado: 'mantenimiento',
              color: 'text-orange-400',
              fondo: 'bg-orange-500/10',
              label: 'Mantenimiento',
            },
            {
              estado: 'standby',
              color: 'text-blue-400',
              fondo: 'bg-blue-500/10',
              label: 'Stand By',
            },
          ].map((item) => {

            const total = data.mixers.filter(
              (mixer) =>
                (reporte.mixers[mixer.id]?.estado ?? 'operativo') ===
                item.estado,
            ).length;

            return (
              <div
                key={item.estado}
                className={`rounded-lg ${item.fondo} p-3 text-center`}
              >
                <div className={`text-2xl font-bold ${item.color}`}>
                  {total}
                </div>

                <div className="text-[10px] text-slate-400 mt-1 leading-tight">
                  {item.label}
                </div>
              </div>
            );
          })}

        </div>

      </button>

      {mixersAbiertos && (
        <div className="border-t border-slate-700 p-4 space-y-2">

          {data.mixers.map((mixer) => {

            const estado =
              reporte.mixers[mixer.id]?.estado ?? 'operativo';

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
      )}

    </div>

  </div>
</section>

{/* ATENCIÓN REQUERIDA */}
<section className="bg-slate-800/70 border border-slate-700 rounded-2xl p-6">

  <div className="flex items-center gap-3 mb-6">
    <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
      <AlertTriangle className="w-5 h-5 text-red-400" />
    </div>

    <div>
      <h3 className="text-xl font-bold">
        🚨 Atención Requerida
      </h3>

      <p className="text-sm text-slate-400">
        Equipos que requieren atención durante esta guardia
      </p>
    </div>
  </div>

  {(() => {
    const equiposAtencion = [
      ...data.robots.map((robot) => ({
        equipoId: robot.id,
        codigo: robot.codigo,
        detalle: reporte.robots[robot.id],
      })),
      ...data.mixers.map((mixer) => ({
        equipoId: mixer.id,
        codigo: mixer.codigo,
        detalle: reporte.mixers[mixer.id],
      })),
    ].filter(
      (equipo) =>
        equipo.detalle?.estado === 'inoperativo' ||
        equipo.detalle?.estado === 'mantenimiento',
    );

    if (equiposAtencion.length === 0) {
      return (
        <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-5 text-center">
          <p className="text-green-400 font-semibold">
            🟢 No hay equipos que requieran atención
          </p>

          <p className="text-sm text-slate-400 mt-1">
            Todos los equipos se encuentran operativos o en Stand By.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-3">

        {equiposAtencion.map((equipo) => {

          const inoperativo =
            equipo.detalle?.estado === 'inoperativo';

          return (
            <div
              key={equipo.equipoId}
              className={`rounded-xl border p-4 ${
                inoperativo
                  ? 'border-red-500/30 bg-red-500/10'
                  : 'border-orange-500/30 bg-orange-500/10'
              }`}
            >
              <div className="flex items-center justify-between">

                <div>
                  <p className="font-bold text-white">
                    {equipo.codigo}
                  </p>

                  <p className="text-sm text-slate-400 mt-1">
                    {inoperativo
                      ? 'Equipo inoperativo'
                      : 'Equipo en mantenimiento'}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    inoperativo
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-orange-500/20 text-orange-400'
                  }`}
                >
                  {inoperativo
                    ? 'INOPERATIVO'
                    : 'MANTENIMIENTO'}
                </span>

              </div>
            </div>
          );
        })}

      </div>
    );
  })()}

</section>


{/* FALLAS DE LA GUARDIA */}
<section className="bg-slate-800/70 border border-slate-700 rounded-2xl p-6">

  <div className="flex items-center gap-3 mb-6">
    <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
      <AlertTriangle className="w-5 h-5 text-orange-400" />
    </div>

    <div>
      <h3 className="text-xl font-bold">
        🔧 Fallas de la Guardia
      </h3>

      <p className="text-sm text-slate-400">
        Incidencias registradas durante la guardia seleccionada
      </p>
    </div>
  </div>

  {reporte.fallas.length === 0 ? (
    <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-5 text-center">
      <p className="text-green-400 font-semibold">
        🟢 Sin fallas registradas
      </p>

      <p className="text-sm text-slate-400 mt-1">
        No se registraron fallas durante esta guardia.
      </p>
    </div>
  ) : (
    <div className="space-y-3">

      {reporte.fallas
        .slice()
        .sort((a, b) => a.hora.localeCompare(b.hora))
        .map((falla) => (

          <div
            key={falla.id}
            className="rounded-xl bg-slate-900/70 border border-slate-700 p-4"
          >

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

              <div>

                <div className="flex items-center gap-3">
                  <span className="font-bold">
                    {falla.equipoId}
                  </span>

                  <span className="text-xs text-slate-500">
                    {falla.hora}
                  </span>
                </div>

                <p className="text-sm text-orange-400 font-medium mt-2">
                  {falla.tipo}
                </p>

                <p className="text-sm text-slate-300 mt-1">
                  {falla.descripcion}
                </p>

              </div>

              <span className="text-xs text-slate-400">
                Estado final: {falla.estadoFinal}
              </span>

            </div>

          </div>

        ))}

    </div>
  )}

</section>

{/* DESECHOS Y MORTEROS */}
<section className="bg-slate-800/70 border border-slate-700 rounded-2xl p-6">

  <div className="flex items-center gap-3 mb-6">
    <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
      <Trash2 className="w-5 h-5 text-orange-400" />
    </div>

    <div>
      <h3 className="text-xl font-bold">
        ♻️ Desechos y Morteros
      </h3>

      <p className="text-sm text-slate-400">
        Registros generados durante la guardia seleccionada
      </p>
    </div>
  </div>

  {(() => {
    const desechos = reporte.desechos.filter(
      (d) => d.tipo.toLowerCase().includes('desecho'),
    );

    const morteros = reporte.desechos.filter(
      (d) => d.tipo.toLowerCase().includes('mortero'),
    );

    const totalDesechos = desechos.reduce(
      (total, item) => total + item.cantidad,
      0,
    );

    const totalMorteros = morteros.reduce(
      (total, item) => total + item.cantidad,
      0,
    );

    return (
      <div className="grid md:grid-cols-2 gap-4">

        {/* DESECHOS */}
        <div className="bg-slate-900/70 rounded-xl p-5">

          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-slate-400">
                DESECHOS
              </p>

              <p className="text-3xl font-bold text-orange-400">
                {totalDesechos.toFixed(1)} m³
              </p>
            </div>

            <div className="rounded-lg bg-orange-500/10 px-3 py-2">
              <span className="text-sm text-slate-300">
                {desechos.length} registro{desechos.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {desechos.length > 0 ? (
            <div className="space-y-2 border-t border-slate-700 pt-4">

              {desechos.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg bg-slate-800 px-4 py-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">
                      {data.robots.find(
                        (r) => r.id === item.equipoId,
                      )?.codigo ??
                        data.mixers.find(
                          (m) => m.id === item.equipoId,
                        )?.codigo ??
                        item.equipoId}
                    </span>

                    <span className="text-sm text-slate-400">
                      {item.hora}
                    </span>
                  </div>

                  <div className="mt-1 text-sm text-slate-300">
                    {item.cantidad} {item.unidad}
                  </div>

                  {item.descripcion && (
                    <p className="mt-1 text-xs text-slate-500">
                      {item.descripcion}
                    </p>
                  )}
                </div>
              ))}

            </div>
          ) : (
            <p className="border-t border-slate-700 pt-4 text-sm text-slate-500">
              Sin registros de desechos.
            </p>
          )}

        </div>

        {/* MORTEROS */}
        <div className="bg-slate-900/70 rounded-xl p-5">

          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-slate-400">
                MORTEROS
              </p>

              <p className="text-3xl font-bold text-blue-400">
                {totalMorteros.toFixed(1)} m³
              </p>
            </div>

            <div className="rounded-lg bg-blue-500/10 px-3 py-2">
              <span className="text-sm text-slate-300">
                {morteros.length} registro{morteros.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {morteros.length > 0 ? (
            <div className="space-y-2 border-t border-slate-700 pt-4">

              {morteros.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg bg-slate-800 px-4 py-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">
                      {data.robots.find(
                        (r) => r.id === item.equipoId,
                      )?.codigo ??
                        data.mixers.find(
                          (m) => m.id === item.equipoId,
                        )?.codigo ??
                        item.equipoId}
                    </span>

                    <span className="text-sm text-slate-400">
                      {item.hora}
                    </span>
                  </div>

                  <div className="mt-1 text-sm text-slate-300">
                    {item.cantidad} {item.unidad}
                  </div>

                  {item.descripcion && (
                    <p className="mt-1 text-xs text-slate-500">
                      {item.descripcion}
                    </p>
                  )}
                </div>
              ))}

            </div>
          ) : (
            <p className="border-t border-slate-700 pt-4 text-sm text-slate-500">
              Sin registros de morteros.
            </p>
          )}

        </div>

      </div>
    );
  })()}

</section>

{/* COMBUSTIBLE Y ADITIVO */}
<section className="bg-slate-800/70 border border-slate-700 rounded-2xl p-6">

  <div className="flex items-center gap-3 mb-5">
    <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
      <Fuel className="w-5 h-5 text-orange-400" />
    </div>

    <div>
      <h3 className="text-xl font-bold">
        ⛽ Combustible y Aditivo
      </h3>

      <p className="text-sm text-slate-400">
        Control registrado por robot durante la guardia
      </p>
    </div>
  </div>

  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-slate-700 text-slate-400">

          <th className="text-left py-3 px-2 font-medium">
            Robot
          </th>

          <th className="text-center py-3 px-2 font-medium">
            IG
          </th>

          <th className="text-center py-3 px-2 font-medium">
            MG
          </th>

          <th className="text-center py-3 px-2 font-medium">
            FG
          </th>

          <th className="text-center py-3 px-2 font-medium">
            Aditivo
          </th>

        </tr>
      </thead>

      <tbody>
        {data.robots.map((robot) => {
          const detalle = reporte.robots[robot.id];

          return (
            <tr
              key={robot.id}
              className="border-b border-slate-800 last:border-0"
            >

              <td className="py-3 px-2 font-semibold">
                {robot.codigo}
              </td>

              <td className="text-center py-3 px-2">
                {detalle?.combustible?.inicio ? (
                  <span className="text-green-400">✓</span>
                ) : (
                  <span className="text-slate-600">—</span>
                )}
              </td>

              <td className="text-center py-3 px-2">
                {detalle?.combustible?.media ? (
                  <span className="text-green-400">✓</span>
                ) : (
                  <span className="text-slate-600">—</span>
                )}
              </td>

              <td className="text-center py-3 px-2">
                {detalle?.combustible?.final ? (
                  <span className="text-green-400">✓</span>
                ) : (
                  <span className="text-slate-600">—</span>
                )}
              </td>

              <td className="text-center py-3 px-2">
                {detalle?.aditivo === true ? (
                  <span className="text-green-400">●</span>
                ) : detalle?.aditivo === false ? (
                  <span className="text-slate-500">○</span>
                ) : (
                  <span className="text-slate-600">—</span>
                )}
              </td>

            </tr>
          );
        })}
      </tbody>
    </table>
  </div>

  <div className="mt-4 pt-3 border-t border-slate-700 text-xs text-slate-500">
    IG = Inicio de Guardia · MG = Media Guardia · FG = Final de Guardia

    <span className="ml-4">
      ● Aditivo: Sí · ○ Aditivo: No
    </span>
  </div>

</section>

const totalAditivoRegistrado =
  reporte
    ? data.robots.filter(
        (robot) => reporte.robots[robot.id]?.aditivo !== null,
      ).length
    : 0;

{/* RESUMEN DE GUARDIA */}
<section className="bg-slate-800/70 border border-slate-700 rounded-2xl p-6">

  <div className="flex items-center gap-3 mb-6">
    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
      <ClipboardList className="w-5 h-5 text-blue-400" />
    </div>

    <div>
      <h3 className="text-xl font-bold">
        📋 Resumen de Guardia
      </h3>

      <p className="text-sm text-slate-400">
        Principales indicadores de la guardia seleccionada
      </p>
    </div>
  </div>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

    {/* FALLAS */}
    <div className="rounded-xl bg-slate-900/70 p-4">
      <p className="text-xs text-slate-500 uppercase">
        Fallas
      </p>

      <p className="text-3xl font-bold text-orange-400 mt-2">
        {totalFallas}
      </p>
    </div>

    {/* ATENCIÓN */}
    <div className="rounded-xl bg-slate-900/70 p-4">
      <p className="text-xs text-slate-500 uppercase">
        Atención
      </p>

      <p className="text-3xl font-bold text-red-400 mt-2">
        {totalAtencion}
      </p>
    </div>

    {/* INOPERATIVOS */}
    <div className="rounded-xl bg-slate-900/70 p-4">
      <p className="text-xs text-slate-500 uppercase">
        Inoperativos
      </p>

      <p className="text-3xl font-bold text-red-400 mt-2">
        {totalInoperativos}
      </p>
    </div>

    {/* DESECHOS */}
    <div className="rounded-xl bg-slate-900/70 p-4">
      <p className="text-xs text-slate-500 uppercase">
        Desechos
      </p>

      <p className="text-3xl font-bold text-orange-400 mt-2">
        {totalDesechos.toFixed(1)}
        <span className="text-sm ml-1">m³</span>
      </p>
    </div>

    {/* MORTEROS */}
    <div className="rounded-xl bg-slate-900/70 p-4">
      <p className="text-xs text-slate-500 uppercase">
        Morteros
      </p>

      <p className="text-3xl font-bold text-blue-400 mt-2">
        {totalMorteros.toFixed(1)}
        <span className="text-sm ml-1">m³</span>
      </p>
    </div>

    {/* COMBUSTIBLE */}
    <div className="rounded-xl bg-slate-900/70 p-4">
      <p className="text-xs text-slate-500 uppercase">
        Combustible
      </p>

      <p className="text-3xl font-bold text-green-400 mt-2">
        {totalCombustibleCompletos}
        <span className="text-sm text-slate-500 ml-1">
          / {data.robots.length}
        </span>
      </p>

      <p className="text-xs text-slate-500 mt-1">
        guardias completas
      </p>
    </div>

    {/* ADITIVO */}
    <div className="rounded-xl bg-slate-900/70 p-4">
      <p className="text-xs text-slate-500 uppercase">
        Aditivo
      </p>

      <p className="text-3xl font-bold text-blue-400 mt-2">
        {totalAditivoRegistrado}
        <span className="text-sm text-slate-500 ml-1">
          / {data.robots.length}
        </span>
      </p>

      <p className="text-xs text-slate-500 mt-1">
        registros
      </p>
    </div>

  </div>

</section>

{/* VER REPORTE COMPLETO */}
<div className="flex justify-end">
  <button
  type="button"
  onClick={() =>
    navigate({
      to: '/residencia/reporte',
      search: {
        fecha: fechaSeleccionada,
        guardia: tipoGuardiaSeleccionado,
      },
    })
  }
  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 transition-colors"
>
    <FileText className="w-5 h-5" />
    VER REPORTE COMPLETO
  </button>
</div>

    </div>
  );
}

export const Route = createFileRoute('/residencia')({
  component: ResidenciaPage,
});