'use client';

import { createContext, useCallback, useContext, useMemo, useRef } from 'react';
import { usePersistedState } from '@/hooks/usePersistedState';
import type { Vehicle } from './types';

type VehiclesContextValue = {
  vehicles: Vehicle[];
  addVehicle: () => void;
  removeVehicle: (id: number) => void;
  updateVehicle: (id: number, patch: Partial<Omit<Vehicle, 'id'>>) => void;
  clearVehicles: () => void;
};

const VehiclesContext = createContext<VehiclesContextValue | null>(null);

/**
 * Estado global (persistido no localStorage) dos veículos salvos pelo usuário.
 * É consumido pela aba "Veículos" e pelos seletores de veículo em
 * Consumo, Autonomia, Orçamento e Comparar — assim o consumo/capacidade
 * cadastrados são reaproveitados nas outras calculadoras.
 */
export function VehiclesProvider({ children }: { children: React.ReactNode }) {
  const [vehicles, setVehicles] = usePersistedState<Vehicle[]>('cc:vehicles', []);
  const nextId = useRef(1);

  const addVehicle = useCallback(() => {
    const id = nextId.current++;
    setVehicles((prev) => [...prev, { id, nome: '', consumo: '', capacidade: '' }]);
  }, []);

  const removeVehicle = useCallback((id: number) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
  }, []);

  const updateVehicle = useCallback((id: number, patch: Partial<Omit<Vehicle, 'id'>>) => {
    setVehicles((prev) => prev.map((v) => (v.id === id ? { ...v, ...patch } : v)));
  }, []);

  const clearVehicles = useCallback(() => setVehicles([]), []);

  const value = useMemo(
    () => ({ vehicles, addVehicle, removeVehicle, updateVehicle, clearVehicles }),
    [vehicles, addVehicle, removeVehicle, updateVehicle, clearVehicles]
  );

  return <VehiclesContext.Provider value={value}>{children}</VehiclesContext.Provider>;
}

export function useVehicles(): VehiclesContextValue {
  const ctx = useContext(VehiclesContext);
  if (!ctx) throw new Error('useVehicles deve ser usado dentro de <VehiclesProvider>');
  return ctx;
}
