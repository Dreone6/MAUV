// Log option types
export interface LogOption {
  id: string;
  label: string;
  icon?: string;
}

export interface LogDefinition {
  id: string;
  title: string;
  color: string;
  icon: string;
  type: 'multi-select' | 'numeric' | 'single-select' | 'text';
  options?: LogOption[];
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
}

export interface LogEntry {
  categoryId: string;
  selectedOptions?: string[];
  numericValue?: number;
  textValue?: string;
  timestamp: Date;
}

export interface DayLogs {
  [categoryId: string]: LogEntry;
}

// Historical logs storage (keyed by date string 'YYYY-MM-DD')
export interface HistoricalLogs {
  [date: string]: DayLogs;
}

// Cycle tracking data
export interface CycleData {
  lastPeriodStart?: string; // Date string 'YYYY-MM-DD'
  averageCycleLength?: number;
  periodLength?: number;
}

// Notification types
export interface NotificationSettings {
  periodReminder: boolean;
  ovulationAlert: boolean;
  fertileWindowAlert: boolean;
  pillReminder: boolean;
  weightTracking: boolean;
  temperatureReminder: boolean;
  soundEnabled: boolean;
}

export interface CycleEvent {
  type: 'period' | 'ovulation' | 'fertile-window' | 'pill' | 'temperature';
  title: string;
  message: string;
}