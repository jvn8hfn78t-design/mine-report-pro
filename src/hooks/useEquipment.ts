/**
 * Hook for managing equipment state and operations
 */

import { useState, useCallback, useEffect } from 'react';
import { ROBOTS, MIXERS, EQUIPMENT_STATUS } from '@/lib/constants';
import type { 
  Equipment, 
  EquipmentStatus, 
  RobotState, 
  MixerState,
  EquipmentCounters 
} from '@/types/equipment';

export function useEquipment() {
  const [robotStates, setRobotStates] = useState<Record<string, EquipmentStatus>>(() => {
    const stored = localStorage.getItem('robotStates');
    if (stored) {
      return JSON.parse(stored);
    }
    const initial: Record<string, EquipmentStatus> = {};
    ROBOTS.forEach(robot => {
      initial[robot.id] = 'operativo';
    });
    return initial;
  });

  const [mixerStates, setMixerStates] = useState<Record<string, EquipmentStatus>>(() => {
    const stored = localStorage.getItem('mixerStates');
    if (stored) {
      return JSON.parse(stored);
    }
    const initial: Record<string, EquipmentStatus> = {};
    MIXERS.forEach(mixer => {
      initial[mixer.id] = 'operativo';
    });
    return initial;
  });

  // Save to localStorage when states change
  useEffect(() => {
    localStorage.setItem('robotStates', JSON.stringify(robotStates));
  }, [robotStates]);

  useEffect(() => {
    localStorage.setItem('mixerStates', JSON.stringify(mixerStates));
  }, [mixerStates]);

  const updateRobotStatus = useCallback((robotId: string, status: EquipmentStatus) => {
    setRobotStates(prev => ({
      ...prev,
      [robotId]: status,
    }));
  }, []);

  const updateMixerStatus = useCallback((mixerId: string, status: EquipmentStatus) => {
    setMixerStates(prev => ({
      ...prev,
      [mixerId]: status,
    }));
  }, []);

  const getRobotStatus = useCallback((robotId: string): EquipmentStatus => {
    return robotStates[robotId] || 'operativo';
  }, [robotStates]);

  const getMixerStatus = useCallback((mixerId: string): EquipmentStatus => {
    return mixerStates[mixerId] || 'operativo';
  }, [mixerStates]);

  const getEquipmentWithStatus = useCallback((): Equipment[] => {
    const robots: Equipment[] = ROBOTS.map(robot => ({
      ...robot,
      status: robotStates[robot.id] || 'operativo',
    }));
    const mixers: Equipment[] = MIXERS.map(mixer => ({
      ...mixer,
      status: mixerStates[mixer.id] || 'operativo',
    }));
    return [...robots, ...mixers];
  }, [robotStates, mixerStates]);

  const getCounters = useCallback((): EquipmentCounters => {
    const robotCounter: RobotState = {
      operativo: 0,
      inoperativo: 0,
      mantenimiento: 0,
      standby: 0,
    };

    const mixerCounter: MixerState = {
      operativo: 0,
      inoperativo: 0,
      mantenimiento: 0,
      standby: 0,
    };

    Object.values(robotStates).forEach(status => {
      robotCounter[status]++;
    });

    Object.values(mixerStates).forEach(status => {
      mixerCounter[status]++;
    });

    return {
      robots: robotCounter,
      mixers: mixerCounter,
    };
  }, [robotStates, mixerStates]);

  const resetAllStates = useCallback(() => {
    const initial: Record<string, EquipmentStatus> = {};
    ROBOTS.forEach(robot => {
      initial[robot.id] = 'operativo';
    });
    setRobotStates(initial);

    const initialMixers: Record<string, EquipmentStatus> = {};
    MIXERS.forEach(mixer => {
      initialMixers[mixer.id] = 'operativo';
    });
    setMixerStates(initialMixers);
  }, []);

  const getOperativeRobots = useCallback((): typeof ROBOTS => {
    return ROBOTS.filter(robot => robotStates[robot.id] === 'operativo');
  }, [robotStates]);

  const getOperativeMixers = useCallback((): typeof MIXERS => {
    return MIXERS.filter(mixer => mixerStates[mixer.id] === 'operativo');
  }, [mixerStates]);

  const getStatusColor = useCallback((status: EquipmentStatus): string => {
    const statusObj = EQUIPMENT_STATUS.find(s => s.value === status);
    return statusObj?.color || 'bg-gray-500';
  }, []);

  const getStatusLabel = useCallback((status: EquipmentStatus): string => {
    const statusObj = EQUIPMENT_STATUS.find(s => s.value === status);
    return statusObj?.label || status;
  }, []);

  return {
    // States
    robotStates,
    mixerStates,
    
    // Setters
    updateRobotStatus,
    updateMixerStatus,
    
    // Getters
    getRobotStatus,
    getMixerStatus,
    getEquipmentWithStatus,
    getCounters,
    getOperativeRobots,
    getOperativeMixers,
    getStatusColor,
    getStatusLabel,
    
    // Utilities
    resetAllStates,
  };
}
