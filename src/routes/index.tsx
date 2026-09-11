import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Cloud,
  FileDown,
  Fuel,
  Gauge,
  HardHat,
  ListChecks,
  ShieldCheck,
  Truck,
  WifiOff,
} from "lucide-react";
import heroMina from "@/assets/hero-mina.jpg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Reporte de Operaciones por Guardia | Minería y Construcción" },
      {
        name: "description",
        content:
          "Plataforma offline-first para registrar la guardia en minería subterránea: robots, mixers, fallas y desechos con PDF instantáneo y cero pérdida de datos.",
      },
      { property: "og:title", content: "Reporte de Operaciones por Guardia | Minería y Construcción" },
      {
        property: "og:description",
        content:
          "Registre la guardia sin conexión, estandarice la información de robots y mixers y genere el PDF en segundos.",
      },
    ],
  }),
  component: Landing,
});

const beneficios = [
  {
    icon: WifiOff,
    titulo: "Cero pérdida de datos",
    texto:
      "El reporte se guarda en el dispositivo a cada paso. Interior mina, sin señal, batería baja: la información queda intacta.",
  },
  {
    icon: ListChecks,
    titulo: "Estandarización total",
    texto:
      "Un solo formato para todas las guardias: estados de equipo, combustible, lanzamientos, carguíos, fallas y desechos.",
  },
  {
    icon: FileDown,
    titulo: "PDF instantáneo",
    texto:
      "Al finalizar la guardia el reporte se bloquea y genera un PDF listo para descargar o compartir por WhatsApp y correo.",
  },
  {
    icon: ShieldCheck,
    titulo: "Trazabilidad de equipos",
    texto:
      "Cada robot y mixer conserva su historial de estados, fallas y acciones tomadas guardia tras guardia.",
  },
];

const pasos = [
  { icon: HardHat, titulo: "Datos de guardia", texto: "Fecha, tipo de guardia y supervisor responsable." },
  { icon: Gauge, titulo: "Estado de equipos", texto: "Robots y mixers con contadores por estado en vivo." },
  { icon: Fuel, titulo: "Combustible y aditivo", texto: "Control de inicio, media y final más aditivo en robots." },
  { icon: Truck, titulo: "Lanzamientos y carguíos", texto: "Solo equipos operativos, con múltiples registros por hora." },
  { icon: ClipboardList, titulo: "Fallas y desechos", texto: "Tipo de falla, acción tomada, morteros y cantidades." },
  { icon: FileDown, titulo: "Resumen y cierre", texto: "Validación, bloqueo de edición y PDF descargable." },
];

const metricas = [
  { valor: "-72%", label: "Tiempo de cierre de guardia" },
  { valor: "0", label: "Reportes perdidos por falta de señal" },
  { valor: "100%", label: "Guardias con formato estandarizado" },
  { valor: "< 5 s", label: "Generación del PDF final" },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded bg-primary text-primary-foreground">
              <HardHat className="size-5" />
            </span>
            <div className="leading-tight">
              <p className="text-sm font-bold uppercase tracking-widest">Guardia Ops</p>
              <p className="text-[11px] text-muted-foreground">Reporte de operaciones</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
              <Link to="/app/historial">Historial</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/app">Ingresar a la Aplicación</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-border">
        <img
          src={heroMina}
          alt="Robot lanzador de shotcrete y mixer operando en un túnel de mina subterránea"
          width={1600}
          height={1008}
          className="absolute inset-0 size-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/50" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            Offline-First
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-black uppercase leading-[1.05] tracking-tight sm:text-6xl">
            Reporte de operaciones por guardia para minería subterránea y operaciones pesadas
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Registre robots lanzadores, mixers, combustible, fallas y desechos desde el interior mina — sin
            señal, sin planillas de papel y sin volver a pasar datos a mano al final del turno.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/app/reporte/nuevo">
                Iniciar Reporte <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/app">Ingresar a la Aplicación</Link>
            </Button>
          </div>
          <dl className="mt-14 grid grid-cols-2 gap-6 border-t border-border/70 pt-8 sm:grid-cols-4">
            {metricas.map((m) => (
              <div key={m.label}>
                <dt className="text-3xl font-black text-primary sm:text-4xl">{m.valor}</dt>
                <dd className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">{m.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-bold uppercase tracking-tight sm:text-3xl">Beneficios clave</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {beneficios.map((b) => (
            <div
              key={b.titulo}
              className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/50"
            >
              <b.icon className="size-6 text-primary" />
              <h3 className="mt-4 text-base font-semibold">{b.titulo}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card/40">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-bold uppercase tracking-tight sm:text-3xl">Flujo guiado paso a paso</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            El operador avanza pantalla por pantalla. No se puede finalizar la guardia con información
            incompleta.
          </p>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pasos.map((p, i) => (
              <li key={p.titulo} className="relative rounded-lg border border-border bg-background p-5">
                <span className="absolute right-4 top-4 text-4xl font-black text-muted/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p.icon className="size-5 text-primary" />
                <h3 className="mt-3 text-base font-semibold">{p.titulo}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold uppercase tracking-tight sm:text-3xl">Vista previa del reporte</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Así se ve el resumen que firma el supervisor antes de cerrar la guardia: contadores por estado,
              lanzamientos, carguíos y fallas en una sola pantalla.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Contadores dinámicos de robots y mixers por estado",
                "Combustible en inicio, media y final más aditivo por robot",
                "Fallas con acción tomada y estado final del equipo",
                "PDF descargable y compartible al finalizar",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-status-operativo" />
                  <span className="text-muted-foreground">{t}</span>
                </li>
              ))}
            </ul>
            <Button asChild className="mt-8">
              <Link to="/app/reporte/nuevo">Probar el flujo completo</Link>
            </Button>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 shadow-lg">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Guardia Día</p>
                <p className="text-lg font-bold">RG-20260911-D</p>
              </div>
              <span className="rounded bg-status-operativo/15 px-2 py-1 text-xs font-semibold text-status-operativo">
                Sincronizado
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-center sm:grid-cols-4">
              {[
                { n: 3, l: "Operativos", c: "text-status-operativo" },
                { n: 1, l: "Inoperativos", c: "text-status-inoperativo" },
                { n: 1, l: "Mantenimiento", c: "text-status-mantenimiento" },
                { n: 1, l: "Stand By", c: "text-status-standby" },
              ].map((s) => (
                <div key={s.l} className="rounded border border-border bg-background p-3">
                  <p className={`text-2xl font-black ${s.c}`}>{s.n}</p>
                  <p className="text-[11px] uppercase text-muted-foreground">{s.l}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2 text-sm">
              {[
                ["08:40", "RB-01 · Shotcrete 5 cm labor Tj-420"],
                ["08:05", "MX-01 · Carguío 4 m³ F'c 280"],
                ["10:20", "RB-04 · Falla hidráulica → Mantenimiento"],
                ["14:00", "Rebote de shotcrete · 0.8 m³"],
              ].map(([h, t]) => (
                <div key={t} className="flex gap-3 rounded border border-border/70 bg-background px-3 py-2">
                  <span className="font-mono text-xs text-primary">{h}</span>
                  <span className="text-muted-foreground">{t}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Cloud className="size-4" /> Guardado local automático · PDF listo al finalizar
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-card/40">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 py-10 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-foreground">
            Guardia Ops · Reporte de operaciones por guardia para minería y construcción.
          </p>
          <Button asChild variant="outline">
            <Link to="/app">Ingresar a la Aplicación</Link>
          </Button>
        </div>
      </footer>
    </div>
  );
}
