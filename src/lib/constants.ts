/**
 * Application Constants
 * Equipment and operational data
 */

export const ROBOTS = [
  { id: 'RB-074', name: 'RB-074', type: 'Robots', status: 'operativo' },
  { id: 'RB-076', name: 'RB-076', type: 'Robots', status: 'operativo' },
  { id: 'RB-077', name: 'RB-077', type: 'Robots', status: 'operativo' },
  { id: 'RB-085', name: 'RB-085', type: 'Robots', status: 'operativo' },
  { id: 'RB-086', name: 'RB-086', type: 'Robots', status: 'operativo' },
  { id: 'RB-105', name: 'RB-105', type: 'Robots', status: 'operativo' },
  { id: 'RB-106', name: 'RB-106', type: 'Robots', status: 'operativo' },
  { id: 'RB-109', name: 'RB-109', type: 'Robots', status: 'operativo' },
  { id: 'RB-113', name: 'RB-113', type: 'Robots', status: 'operativo' },
] as const;

export const MIXERS = [
  { id: 'MX-298', name: 'MX-298', type: 'Mixer', status: 'operativo' },
  { id: 'MX-303', name: 'MX-303', type: 'Mixer', status: 'operativo' },
  { id: 'MX-307', name: 'MX-307', type: 'Mixer', status: 'operativo' },
  { id: 'MX-311', name: 'MX-311', type: 'Mixer', status: 'operativo' },
  { id: 'MX-316', name: 'MX-316', type: 'Mixer', status: 'operativo' },
  { id: 'MX-318', name: 'MX-318', type: 'Mixer', status: 'operativo' },
  { id: 'MX-327', name: 'MX-327', type: 'Mixer', status: 'operativo' },
  { id: 'MX-328', name: 'MX-328', type: 'Mixer', status: 'operativo' },
  { id: 'MX-329', name: 'MX-329', type: 'Mixer', status: 'operativo' },
  { id: 'MX-332', name: 'MX-332', type: 'Mixer', status: 'operativo' },
  { id: 'MX-342', name: 'MX-342', type: 'Mixer', status: 'operativo' },
  { id: 'MX-343', name: 'MX-343', type: 'Mixer', status: 'operativo' },
  { id: 'MX-344', name: 'MX-344', type: 'Mixer', status: 'operativo' },
  { id: 'MX-345', name: 'MX-345', type: 'Mixer', status: 'operativo' },
  { id: 'MX-346', name: 'MX-346', type: 'Mixer', status: 'operativo' },
] as const;

export const EQUIPMENT_STATUS = [
  { value: 'operativo', label: 'Operativo', color: 'bg-green-500', textColor: 'text-green-700' },
  { value: 'inoperativo', label: 'Inoperativo', color: 'bg-red-500', textColor: 'text-red-700' },
  { value: 'mantenimiento', label: 'Mantenimiento', color: 'bg-yellow-500', textColor: 'text-yellow-700' },
  { value: 'standby', label: 'Stand By', color: 'bg-blue-500', textColor: 'text-blue-700' },
] as const;

export const SHIFT_TYPES = [
  { value: 'dia', label: 'Día' },
  { value: 'noche', label: 'Noche' },
] as const;

export const FAILURE_TYPES = [
  { value: 'mecanica', label: 'Mecánica' },
  { value: 'hidraulica', label: 'Hidráulica' },
  { value: 'electrica', label: 'Eléctrica' },
  { value: 'software', label: 'Software' },
  { value: 'combustible', label: 'Combustible' },
  { value: 'otro', label: 'Otro' },
] as const;

export const WASTE_UNITS = [
  { value: 'm3', label: 'm³ (Metros Cúbicos)' },
  { value: 'kg', label: 'kg (Kilogramos)' },
  { value: 'ton', label: 'ton (Toneladas)' },
] as const;

export const ACTION_TYPES = [
  { value: 'reparacion', label: 'Reparación' },
  { value: 'reinicio', label: 'Reinicio' },
  { value: 'pausa', label: 'Pausa' },
  { value: 'reemplazo', label: 'Reemplazo' },
  { value: 'mantenimiento', label: 'Mantenimiento' },
] as const;

export const FINAL_STATUS = [
  { value: 'resuelto', label: 'Resuelto' },
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'en_proceso', label: 'En Proceso' },
] as const;
