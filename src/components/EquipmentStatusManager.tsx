/**
 * Equipment Status Manager Component
 * Example usage of useEquipment hook
 */

import { useState } from 'react';
import { useEquipment } from '@/hooks/useEquipment';
import { EQUIPMENT_STATUS } from '@/lib/constants';
import type { EquipmentStatus } from '@/types/equipment';

export function EquipmentStatusManager() {
  const {
    robotStates,
    mixerStates,
    updateRobotStatus,
    updateMixerStatus,
    getCounters,
    getStatusColor,
    getStatusLabel,
    resetAllStates,
  } = useEquipment();

  const [selectedType, setSelectedType] = useState<'robots' | 'mixers'>('robots');
  const counters = getCounters();
  const currentStates = selectedType === 'robots' ? robotStates : mixerStates;
  const updateStatus = selectedType === 'robots' ? updateRobotStatus : updateMixerStatus;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Estado de Equipamiento</h1>
        <p className="text-gray-600">Administra el estado de robots y mixers para el reporte</p>
      </div>

      {/* Counters Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-700">{counters.robots.operativo}</div>
          <div className="text-sm text-green-600">Robots Operativos</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="text-2xl font-bold text-red-700">{counters.robots.inoperativo}</div>
          <div className="text-sm text-red-600">Robots Inoperativos</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="text-2xl font-bold text-yellow-700">{counters.mixers.operativo}</div>
          <div className="text-sm text-yellow-600">Mixers Operativos</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="text-2xl font-bold text-blue-700">{counters.mixers.inoperativo}</div>
          <div className="text-sm text-blue-600">Mixers Inoperativos</div>
        </div>
      </div>

      {/* Tab Selection */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setSelectedType('robots')}
          className={`px-4 py-2 font-medium transition-colors ${
            selectedType === 'robots'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          🤖 Robots ({Object.keys(robotStates).length})
        </button>
        <button
          onClick={() => setSelectedType('mixers')}
          className={`px-4 py-2 font-medium transition-colors ${
            selectedType === 'mixers'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          🔄 Mixers ({Object.keys(mixerStates).length})
        </button>
      </div>

      {/* Equipment Status Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {Object.entries(currentStates).map(([equipmentId, status]) => (
          <div
            key={equipmentId}
            className="p-4 rounded-lg border-2 border-gray-200 hover:border-blue-400 transition-colors"
          >
            <div className="font-semibold text-gray-900 mb-3 text-center">{equipmentId}</div>
            <div className="flex flex-col gap-1">
              {EQUIPMENT_STATUS.map(statusOption => (
                <button
                  key={statusOption.value}
                  onClick={() => updateStatus(equipmentId, statusOption.value as EquipmentStatus)}
                  className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                    status === statusOption.value
                      ? `${statusOption.color} text-white shadow-md`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {statusOption.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Status Summary Table */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">Resumen de Estados</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {EQUIPMENT_STATUS.map(statusOption => {
            const robotCount = Object.values(robotStates).filter(s => s === statusOption.value).length;
            const mixerCount = Object.values(mixerStates).filter(s => s === statusOption.value).length;
            return (
              <div key={statusOption.value} className={`p-3 rounded ${statusOption.color} bg-opacity-20`}>
                <div className={`font-semibold ${statusOption.textColor}`}>
                  {statusOption.label}
                </div>
                <div className="text-sm text-gray-700 mt-1">
                  🤖 {robotCount} | 🔄 {mixerCount}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 justify-end">
        <button
          onClick={resetAllStates}
          className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
        >
          Reiniciar Todo
        </button>
      </div>
    </div>
  );
}
