import { createContext, useContext, type ReactNode } from 'react';

export interface AppointmentSelection {
  service?: string;
  doctor?: string;
}

interface AppointmentContextValue {
  openAppointment: (selection?: AppointmentSelection) => void;
}

const AppointmentContext = createContext<AppointmentContextValue | null>(null);

export function AppointmentProvider({
  children,
  value,
}: {
  children: ReactNode;
  value: AppointmentContextValue;
}) {
  return <AppointmentContext.Provider value={value}>{children}</AppointmentContext.Provider>;
}

export function useAppointment() {
  const context = useContext(AppointmentContext);
  if (!context) throw new Error('useAppointment must be used inside AppointmentProvider');
  return context;
}
