/**
 * Equipment Type Definitions
 */

export type EquipmentStatus = 'operativo' | 'inoperativo' | 'mantenimiento' | 'standby';
export type ShiftType = 'dia' | 'noche';
export type FailureType = 'mecanica' | 'hidraulica' | 'electrica' | 'software' | 'combustible' | 'otro';
export type WasteUnit = 'm3' | 'kg' | 'ton';
export type ActionType = 'reparacion' | 'reinicio' | 'pausa' | 'reemplazo' | 'mantenimiento';
export type FinalStatus = 'resuelto' | 'pendiente' | 'en_proceso';

export interface Equipment {
  id: string;
  name: string;
  type: 'Robots' | 'Mixer';
  status: EquipmentStatus;
}

export interface Robot extends Equipment {
  type: 'Robots';
}

export interface Mixer extends Equipment {
  type: 'Mixer';
}

export interface ShiftData {
  date: Date;
  shiftType: ShiftType;
  supervisor: string;
}

export interface RobotState {
  operativo: number;
  inoperativo: number;
  mantenimiento: number;
  standby: number;
}

export interface MixerState {
  operativo: number;
  inoperativo: number;
  mantenimiento: number;
  standby: number;
}

export interface RobotLaunch {
  robotId: string;
  time: string;
  description: string;
  notes?: string;
}

export interface MixerLoad {
  mixerId: string;
  time: string;
  description: string;
  quantity?: number;
}

export interface Failure {
  equipmentId: string;
  equipmentType: 'Robots' | 'Mixer';
  time: string;
  failureType: FailureType;
  description: string;
  actionTaken: ActionType;
  finalStatus: FinalStatus;
}

export interface Waste {
  type: string;
  time: string;
  equipmentId: string;
  quantity: number;
  unit: WasteUnit;
  description?: string;
}

export interface GuardReport {
  id: string;
  shiftData: ShiftData;
  robotState: RobotState;
  mixerState: MixerState;
  robotLaunches: RobotLaunch[];
  mixerLoads: MixerLoad[];
  failures: Failure[];
  waste: Waste[];
  observations: string;
  fuelCheck?: {
    start: boolean;
    middle: boolean;
    end: boolean;
    hasAdditive: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
  syncedAt?: Date;
  synced: boolean;
}

export interface EquipmentCounters {
  robots: RobotState;
  mixers: MixerState;
}
