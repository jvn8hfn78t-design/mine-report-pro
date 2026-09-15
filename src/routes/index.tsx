import { useState } from 'react';
import { ArrowRight, Shield, Zap, BarChart3, Download, Share2, Check } from 'lucide-react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

export function LandingPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const benefits = [
    {
      icon: Shield,
      title: 'Cero Pérdida de Datos',
      description: 'Funciona sin internet. Sincroniza automáticamente cuando hay conexión.',
    },
    {
      icon: Zap,
      title: 'Generación Instantánea de PDF',
      description: 'Descarga reportes listos en segundos con formato profesional.',
    },
    {
      icon: BarChart3,
      title: 'Trazabilidad Completa',
      description: 'Registro detallado de cada operación, falla y mantenimiento.',
    },
    {
      icon: Download,
      title: 'Compartir Fácilmente',
      description: 'WhatsApp, Correo, Enlace o descarga - elige tu medio.',
    },
  ];

  const steps = [
    {
      number: '1',
      title: 'Datos de Guardia',
      description: 'Fecha, tipo (Día/Noche) y supervisor',
    },
    {
      number: '2',
      title: 'Estado de Equipos',
      description: 'Define el estado de robots y mixers',
    },
    {
      number: '3',
      title: 'Registra Operaciones',
      description: 'Lanzamientos, carguíos, fallas y desechos',
    },
    {
      number: '4',
      title: 'Finaliza & Descarga',
      description: 'Valida, bloquea y descarga tu PDF',
    },
  ];

  const features = [
    'Offline-First para minería subterránea',
    '9 Robots + 15 Mixers pre-configurados',
    'Control de combustible y aditivos',
    'Módulo de fallas con acciones',
    'Gestión de desechos/morteros',
    'Historial con filtros avanzados',
    'Admin de catálogos',
    'Sincronización automática en la nube',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center font-bold text-lg">
              ⛏️
            </div>
            <span className="text-xl font-bold">Mine Report Pro</span>
          </div>
          <button
            onClick={() => navigate({ to: '/acceso' })}
            className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 rounded-lg font-semibold transition-all transform hover:scale-105"
          >
            Ingresar →
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-orange-400 bg-clip-text text-transparent leading-tight">
            Mine Report Pro
            <br />
            Batch's
          </h1>

          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Plataforma offline-first diseñada para operaciones.
            <br />
            <span className="text-orange-400 font-semibold">Cero pérdida de datos. Generación instantánea de PDF.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              onClick={() => navigate({ to: '/acceso' })}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 rounded-lg font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Iniciar Reporte <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 border-2 border-slate-500 hover:border-orange-500 rounded-lg font-bold text-lg transition-all">
              Saber Más
            </button>
          </div>

          {/* Connectivity Status */}
          <div className="inline-flex items-center gap-2 bg-slate-700/50 border border-slate-600 px-4 py-2 rounded-full">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-300">Conectado • Sincronización automática activa</span>
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="bg-slate-800/50 border-y border-slate-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">24 Equipos</div>
              <p className="text-slate-400 text-sm">Robots + Mixers</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">100%</div>
              <p className="text-slate-400 text-sm">Offline Ready</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">&lt;2s</div>
              <p className="text-slate-400 text-sm">PDF Generation</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">∞</div>
              <p className="text-slate-400 text-sm">Sincronizaciones</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">Por qué Mine Report Pro</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div
                key={idx}
                className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 hover:border-orange-500 transition-all hover:shadow-lg hover:shadow-orange-500/20"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                    <p className="text-slate-400">{benefit.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-slate-800/50 border-y border-slate-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Características Incluidas</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-slate-700/30 p-4 rounded-lg border border-slate-600">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-100">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step-by-step Flow */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">Flujo Guiado paso a paso</h2>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-lg p-8 text-center h-full flex flex-col justify-center">
                <div className="text-5xl font-bold mb-4">{step.number}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-slate-100 text-sm">{step.description}</p>
              </div>
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-1 bg-gradient-to-r from-orange-500 to-red-600 transform -translate-y-1/2"></div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-orange-600 to-red-700 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl font-bold">¿Listo para optimizar tus operaciones?</h2>
          <p className="text-lg text-orange-50">Comienza a generar reportes profesionales en segundos</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate({ to: '/acceso' })}
              className="px-8 py-4 bg-white text-orange-600 hover:bg-slate-100 rounded-lg font-bold text-lg transition-all transform hover:scale-105"
            >
              Iniciar Reporte Ahora
            </button>
            <button className="px-8 py-4 border-2 border-white text-white hover:bg-white/10 rounded-lg font-bold text-lg transition-all">
              Solicitar Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-400 text-sm">
          <p>Mine Report Pro © 2026 • Diseñado para operaciones mineras y construcción</p>
          <p className="mt-2">Offline-First • Sincronización automática • Generación de PDF instantánea</p>
        </div>
      </footer>
    </div>
  );
}

export const Route = createFileRoute('/')({
  component: LandingPage,
});
