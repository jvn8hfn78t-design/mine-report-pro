import { ArrowLeft, BarChart3, HardHat } from 'lucide-react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

export function AccesoPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <button
          onClick={() => navigate({ to: '/' })}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver al inicio
        </button>

        <div className="text-center mb-12">
          <div className="text-4xl mb-4">⛏️</div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Mine Report Pro
          </h1>

          <p className="text-xl text-slate-300">
            ¿Cómo deseas ingresar?
          </p>

          <p className="text-slate-400 mt-2">
            Selecciona el módulo correspondiente a tu función.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <button
            onClick={() => navigate({ to: '/app' })}
            className="group text-left bg-slate-800/70 border border-slate-700 hover:border-orange-500 rounded-2xl p-8 transition-all hover:shadow-xl hover:shadow-orange-500/10"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-6">
              <HardHat className="w-8 h-8" />
            </div>

            <h2 className="text-2xl font-bold mb-3 group-hover:text-orange-400 transition-colors">
              Supervisor
            </h2>

            <p className="text-slate-400 mb-6">
              Ingresa al módulo de reportes de guardia para registrar
              operaciones, equipos, fallas, combustible, observaciones y
              generar el reporte final.
            </p>

            <div className="text-orange-400 font-semibold">
              Ingresar como Supervisor →
            </div>
          </button>

          <button
            onClick={() => navigate({ to: '/residencia' })}
            className="group text-left bg-slate-800/70 border border-slate-700 hover:border-blue-500 rounded-2xl p-8 transition-all hover:shadow-xl hover:shadow-blue-500/10"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6">
              <BarChart3 className="w-8 h-8" />
            </div>

            <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
              Residente
            </h2>

            <p className="text-slate-400 mb-6">
              Accede al módulo de residencia para consultar reportes,
              visualizar resúmenes y revisar estadísticas de las operaciones.
            </p>

            <div className="text-blue-400 font-semibold">
              Ingresar como Residente →
            </div>
          </button>
        </div>

        <div className="text-center mt-12 text-sm text-slate-500">
          Mine Report Pro • Gestión de operaciones mineras
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/acceso')({
  component: AccesoPage,
});