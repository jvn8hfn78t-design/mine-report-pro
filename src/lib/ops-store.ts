import { useEffect, useState } from "react";
import type { Equipo, Reporte, Usuario, RobotDetalle, MixerDetalle } from "./ops-types";

const KEY = "rog:data:v1";

export interface OpsData {
  robots: Equipo[];
  mixers: Equipo[];
  usuarios: Usuario[];
  reportes: Reporte[];
  borradorId: string | null;
}

const seedRobots: Equipo[] = [
  { id: "rb-01", codigo: "RB-01", modelo: "Normet Spraymec 8100 VC", ubicacion: "Nivel 320 - Rampa", activo: true },
  { id: "rb-02", codigo: "RB-02", modelo: "Putzmeister SPM 4210", ubicacion: "Nivel 380 - Tajo 4", activo: true },
  { id: "rb-03", codigo: "RB-03", modelo: "Normet Spraymec 6050 WPC", ubicacion: "Nivel 260 - By Pass", activo: true },
  { id: "rb-04", codigo: "RB-04", modelo: "Aliva AL-503", ubicacion: "Taller Mina", activo: true },
  { id: "rb-05", codigo: "RB-05", modelo: "Putzmeister SPM 500 Wetkret", ubicacion: "Nivel 420 - Crucero", activo: true },
];

const seedMixers: Equipo[] = [
  { id: "mx-01", codigo: "MX-01", modelo: "Normet Utimec MF 500", ubicacion: "Planta de concreto", activo: true },
  { id: "mx-02", codigo: "MX-02", modelo: "Getman A64 Mixer", ubicacion: "Nivel 320", activo: true },
  { id: "mx-03", codigo: "MX-03", modelo: "Normet Utimec MF 100", ubicacion: "Nivel 380", activo: true },
  { id: "mx-04", codigo: "MX-04", modelo: "MTI Mixer 4m³", ubicacion: "Taller Mina", activo: true },
  { id: "mx-05", codigo: "MX-05", modelo: "Normet Utimec MF 500", ubicacion: "Rampa principal", activo: true },
  { id: "mx-06", codigo: "MX-06", modelo: "Getman A64 Mixer", ubicacion: "Nivel 260", activo: true },
];

const seedUsuarios: Usuario[] = [
  { id: "us-01", nombre: "Brayan Quispe Ticona", rol: "Supervisor de Shotcrete", turnoPreferido: "dia", activo: true },
  { id: "us-02", nombre: "Marco Huamaní Flores", rol: "Supervisor de Guardia", turnoPreferido: "noche", activo: true },
  { id: "us-03", nombre: "Lucía Ramos Chávez", rol: "Jefa de Operaciones Mina", turnoPreferido: "rotativo", activo: true },
  { id: "us-04", nombre: "Iván Choque Mamani", rol: "Supervisor de Mantenimiento", turnoPreferido: "dia", activo: true },
  { id: "us-05", nombre: "Rosa Ccahuana Puma", rol: "Supervisora de Planta", turnoPreferido: "noche", activo: true },
];

function seedReportes(): Reporte[] {
  const hoy = new Date();
  const mk = (dias: number, tipo: "dia" | "noche", supervisorId: string, sync: "pendiente" | "sincronizado"): Reporte => {
    const d = new Date(hoy);
    d.setDate(d.getDate() - dias);
    const fecha = d.toISOString().slice(0, 10);
    return {
      id: `rep-seed-${dias}-${tipo}`,
      correlativo: `RG-${fecha.replaceAll("-", "")}-${tipo === "dia" ? "D" : "N"}`,
      fecha,
      tipoGuardia: tipo,
      supervisorId,
      robots: Object.fromEntries(
        seedRobots.map((r, i) => [
          r.id,
          {
            estado: i === 3 ? "mantenimiento" : i === 4 ? "standby" : "operativo",
            combustible: { inicio: true, media: i % 2 === 0, final: true },
            aditivo: i % 2 === 0,
          } as RobotDetalle,
        ]),
      ),
      mixers: Object.fromEntries(
        seedMixers.map((m, i) => [
          m.id,
          { estado: i === 3 ? "inoperativo" : i === 5 ? "standby" : "operativo" } as MixerDetalle,
        ]),
      ),
      lanzamientos: [
        { id: `l1-${dias}`, robotId: "rb-01", hora: "08:40", descripcion: "Shotcrete 5 cm en labor Tj-420", notas: "Sin observaciones" },
        { id: `l2-${dias}`, robotId: "rb-02", hora: "13:15", descripcion: "Sellado de hastial nivel 380", notas: "" },
      ],
      carguios: [
        { id: `c1-${dias}`, mixerId: "mx-01", hora: "08:05", descripcion: "Carguío 4 m³ mezcla F'c 280", notas: "" },
        { id: `c2-${dias}`, mixerId: "mx-02", hora: "12:30", descripcion: "Carguío 3.5 m³ mezcla F'c 280", notas: "Demora por tránsito en rampa" },
      ],
      fallas: [
        {
          id: `f1-${dias}`,
          equipoId: "rb-04",
          hora: "10:20",
          tipo: "Hidráulica",
          descripcion: "Fuga en manguera de brazo lanzador",
          accion: "Se reportó a mantenimiento y se aisló el equipo",
          estadoFinal: "mantenimiento",
        },
      ],
      desechos: [
        {
          id: `d1-${dias}`,
          tipo: "Rebote de shotcrete",
          hora: "14:00",
          equipoId: "rb-01",
          cantidad: 0.8,
          unidad: "m3",
          descripcion: "Retirado a cámara de acumulación nivel 320",
        },
      ],
      observaciones:
        "Guardia sin incidentes de seguridad. Se cumplió el programa de lanzamiento con 2 labores completadas.",
      estado: "finalizado",
      sync,
      creadoEn: d.toISOString(),
      finalizadoEn: d.toISOString(),
    };
  };
  return [mk(1, "dia", "us-01", "sincronizado"), mk(2, "noche", "us-02", "sincronizado"), mk(3, "dia", "us-04", "pendiente")];
}

function defaults(): OpsData {
  return {
    robots: seedRobots,
    mixers: seedMixers,
    usuarios: seedUsuarios,
    reportes: seedReportes(),
    borradorId: null,
  };
}

let cache: OpsData | null = null;
const listeners = new Set<() => void>();

function isBrowser() {
  return typeof window !== "undefined";
}

export function getData(): OpsData {
  if (cache) return cache;
  if (!isBrowser()) return defaults();
  try {
    const raw = window.localStorage.getItem(KEY);
    cache = raw ? { ...defaults(), ...(JSON.parse(raw) as OpsData) } : defaults();
  } catch {
    cache = defaults();
  }
  return cache;
}

export function setData(updater: (d: OpsData) => OpsData) {
  const next = updater(getData());
  cache = next;
  if (isBrowser()) {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* almacenamiento lleno */
    }
  }
  listeners.forEach((l) => l());
}

export function useOpsData(): OpsData {
  const [data, setLocal] = useState<OpsData>(() => defaults());

  useEffect(() => {
    const sync = () => setLocal({ ...getData() });
    sync();
    listeners.add(sync);
    return () => {
      listeners.delete(sync);
    };
  }, []);

  return data;
}

export function uid(prefix = "id") {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}${Date.now().toString(36).slice(-4)}`;
}

export function nuevoReporte(data: OpsData): Reporte {
  const fecha = new Date().toISOString().slice(0, 10);
  return {
    id: uid("rep"),
    correlativo: `RG-${fecha.replaceAll("-", "")}-D`,
    fecha,
    tipoGuardia: "dia",
    supervisorId: "",
    robots: Object.fromEntries(
      data.robots.filter((r) => r.activo).map((r) => [
        r.id,
        { estado: "operativo", combustible: { inicio: false, media: false, final: false }, aditivo: null } as RobotDetalle,
      ]),
    ),
    mixers: Object.fromEntries(
      data.mixers.filter((m) => m.activo).map((m) => [m.id, { estado: "operativo" } as MixerDetalle]),
    ),
    lanzamientos: [],
    carguios: [],
    fallas: [],
    desechos: [],
    observaciones: "",
    estado: "borrador",
    sync: "pendiente",
    creadoEn: new Date().toISOString(),
    finalizadoEn: null,
  };
}

export function guardarReporte(rep: Reporte) {
  setData((d) => {
    const existe = d.reportes.some((r) => r.id === rep.id);
    return {
      ...d,
      reportes: existe ? d.reportes.map((r) => (r.id === rep.id ? rep : r)) : [rep, ...d.reportes],
    };
  });
}

export function eliminarReporte(id: string) {
  setData((d) => ({
    ...d,
    reportes: d.reportes.filter((r) => r.id !== id),
    borradorId: d.borradorId === id ? null : d.borradorId,
  }));
}

export function marcarSincronizados() {
  setData((d) => ({
    ...d,
    reportes: d.reportes.map((r) => (r.estado === "finalizado" ? { ...r, sync: "sincronizado" } : r)),
  }));
}

export function nombreEquipo(data: OpsData, id: string) {
  const eq = [...data.robots, ...data.mixers].find((e) => e.id === id);
  return eq ? `${eq.codigo} · ${eq.modelo}` : id;
}

export function nombreSupervisor(data: OpsData, id: string) {
  return data.usuarios.find((u) => u.id === id)?.nombre ?? "Sin asignar";
}
