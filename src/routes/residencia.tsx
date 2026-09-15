import {
  ArrowLeft,
  BarChart3,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  FileText,
  AlertTriangle,
  Truck,
  Bot,
} from 'lucide-react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useOpsData, nombreSupervisor } from '../lib/ops-store';

export function ResidenciaPage() {
  const navigate = useNavigate();
  const data = useOpsData();

  const reportes = data.reportes
    .filter((r) => r.estado === 'finalizado')
    .sort((a, b) => `${b.fecha}-${b.tipoGuardia}`.localeCompare(`${a.fecha}-${a.tipoGuardia}`));

  const reporte = reportes[0];
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

          <p className="text-slate-400 max-w-2xl">
            Consulta el estado general de las operaciones, revisa reportes
            de guardia y analiza los principales indicadores.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <ClipboardList className="w-8 h-8 text-blue-400 mb-4" />

            <p className="text-slate-400 text-sm">
              Reportes de Guardia
            </p>

            <p className="text-3xl font-bold mt-2">—</p>

            <p className="text-xs text-slate-500 mt-2">
              Datos disponibles próximamente
            </p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <TrendingUp className="w-8 h-8 text-green-400 mb-4" />

            <p className="text-slate-400 text-sm">
              Producción
            </p>

            <p className="text-3xl font-bold mt-2">—</p>

            <p className="text-xs text-slate-500 mt-2">
              Indicador operacional
            </p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <FileText className="w-8 h-8 text-orange-400 mb-4" />

            <p className="text-slate-400 text-sm">
              Reportes Pendientes
            </p>

            <p className="text-3xl font-bold mt-2">—</p>

            <p className="text-xs text-slate-500 mt-2">
              Por revisar
            </p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <BarChart3 className="w-8 h-8 text-purple-400 mb-4" />

            <p className="text-slate-400 text-sm">
              Indicadores
            </p>

            <p className="text-3xl font-bold mt-2">—</p>

            <p className="text-xs text-slate-500 mt-2">
              Estadísticas generales
            </p>
          </div>
        </div>

        <div className="bg-slate-800/70 border border-slate-700 rounded-xl p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-400" />
            </div>

            <div>
              <h3 className="text-xl font-bold">
                Dashboard en construcción
              </h3>

              <p className="text-slate-400 text-sm">
                Aquí conectaremos las estadísticas reales de los reportes.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-slate-900 rounded-lg p-4">
              <p className="text-sm text-slate-400">
                Producción por guardia
              </p>
            </div>

            <div className="bg-slate-900 rounded-lg p-4">
              <p className="text-sm text-slate-400">
                Fallas de equipos
              </p>
            </div>

            <div className="bg-slate-900 rounded-lg p-4">
              <p className="text-sm text-slate-400">
                Consumo de combustible
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export const Route = createFileRoute('/residencia')({
  component: ResidenciaPage,
});