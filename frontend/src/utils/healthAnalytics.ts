import { HistoricalLogs, DayLogs, CycleData } from '../types';

// Helper to format date to 'YYYY-MM-DD'
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

// Helper to parse date from 'YYYY-MM-DD'
export function parseDate(dateStr: string): Date {
  return new Date(dateStr + 'T00:00:00');
}

// Calculate days between two dates
export function daysBetween(date1: Date, date2: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
  return Math.floor((utc2 - utc1) / msPerDay);
}

// Find all period start dates from historical logs
export function findPeriodDates(historicalLogs: HistoricalLogs): string[] {
  const periodDates: string[] = [];
  
  Object.entries(historicalLogs)
    .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
    .forEach(([date, logs]) => {
      if (logs.flow && logs.flow.selectedOptions && logs.flow.selectedOptions.length > 0) {
        // Check if this is the start of a new period (not logged yesterday)
        const currentDate = parseDate(date);
        const yesterday = new Date(currentDate);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = formatDate(yesterday);
        
        const hasYesterdayFlow = historicalLogs[yesterdayStr]?.flow?.selectedOptions?.length > 0;
        if (!hasYesterdayFlow) {
          periodDates.push(date);
        }
      }
    });
  
  return periodDates;
}

// Calculate average cycle length from period dates
export function calculateAverageCycleLength(periodDates: string[]): number {
  if (periodDates.length < 2) return 28; // Default if not enough data
  
  const cycleLengths: number[] = [];
  for (let i = 1; i < periodDates.length; i++) {
    const prevDate = parseDate(periodDates[i - 1]);
    const currDate = parseDate(periodDates[i]);
    const cycleLength = daysBetween(prevDate, currDate);
    if (cycleLength > 20 && cycleLength < 40) { // Valid cycle range
      cycleLengths.push(cycleLength);
    }
  }
  
  if (cycleLengths.length === 0) return 28;
  
  const sum = cycleLengths.reduce((acc, len) => acc + len, 0);
  return Math.round(sum / cycleLengths.length);
}

// Calculate average period length
export function calculatePeriodLength(historicalLogs: HistoricalLogs, periodStarts: string[]): number {
  if (periodStarts.length === 0) return 5; // Default
  
  const periodLengths: number[] = [];
  
  periodStarts.forEach(startDate => {
    let length = 0;
    const start = parseDate(startDate);
    
    for (let i = 0; i < 10; i++) { // Check up to 10 days
      const checkDate = new Date(start);
      checkDate.setDate(checkDate.getDate() + i);
      const checkDateStr = formatDate(checkDate);
      
      if (historicalLogs[checkDateStr]?.flow?.selectedOptions?.length > 0) {
        length = i + 1;
      } else {
        break;
      }
    }
    
    if (length > 0) {
      periodLengths.push(length);
    }
  });
  
  if (periodLengths.length === 0) return 5;
  
  const sum = periodLengths.reduce((acc, len) => acc + len, 0);
  return Math.round(sum / periodLengths.length);
}

// Predict next period date
export function predictNextPeriod(cycleData: CycleData): { date: Date; daysUntil: number } {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (!cycleData.lastPeriodStart || !cycleData.averageCycleLength) {
    const defaultNext = new Date(today);
    defaultNext.setDate(defaultNext.getDate() + 15);
    return { date: defaultNext, daysUntil: 15 };
  }
  
  const lastPeriod = parseDate(cycleData.lastPeriodStart);
  const nextPeriod = new Date(lastPeriod);
  nextPeriod.setDate(nextPeriod.getDate() + cycleData.averageCycleLength);
  
  const daysUntil = daysBetween(today, nextPeriod);
  
  return { date: nextPeriod, daysUntil };
}

// Calculate current cycle day
export function calculateCycleDay(cycleData: CycleData): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (!cycleData.lastPeriodStart) return 1;
  
  const lastPeriod = parseDate(cycleData.lastPeriodStart);
  const daysSinceStart = daysBetween(lastPeriod, today);
  
  return daysSinceStart + 1;
}

// Calculate fertile window (typically days 10-16 in a 28-day cycle)
export function calculateFertileWindow(cycleData: CycleData): Date[] {
  if (!cycleData.lastPeriodStart || !cycleData.averageCycleLength) {
    return [];
  }
  
  const lastPeriod = parseDate(cycleData.lastPeriodStart);
  const ovulationDay = cycleData.averageCycleLength - 14; // Typically 14 days before next period
  const fertileStart = ovulationDay - 5; // 5 days before ovulation
  const fertileEnd = ovulationDay + 1; // Day after ovulation
  
  const fertileDates: Date[] = [];
  for (let i = fertileStart; i <= fertileEnd; i++) {
    const date = new Date(lastPeriod);
    date.setDate(date.getDate() + i - 1);
    fertileDates.push(date);
  }
  
  return fertileDates;
}

// Analyze symptom patterns
export interface SymptomPattern {
  name: string;
  description: string;
  frequency: number;
  cyclePhase: string;
}

export function analyzeSymptomPatterns(
  historicalLogs: HistoricalLogs,
  cycleData: CycleData
): SymptomPattern[] {
  const symptomCounts: { [symptom: string]: { count: number; daysBefore: number[] } } = {};
  
  if (!cycleData.lastPeriodStart || !cycleData.averageCycleLength) {
    return [];
  }
  
  const periodStarts = findPeriodDates(historicalLogs);
  
  // Analyze symptoms relative to period starts
  Object.entries(historicalLogs).forEach(([date, logs]) => {
    if (logs.symptoms?.selectedOptions) {
      const logDate = parseDate(date);
      
      // Find the next period after this log
      const nextPeriod = periodStarts.find(p => parseDate(p) > logDate);
      if (nextPeriod) {
        const daysBefore = daysBetween(logDate, parseDate(nextPeriod));
        
        logs.symptoms.selectedOptions.forEach(symptom => {
          if (!symptomCounts[symptom]) {
            symptomCounts[symptom] = { count: 0, daysBefore: [] };
          }
          symptomCounts[symptom].count++;
          symptomCounts[symptom].daysBefore.push(daysBefore);
        });
      }
    }
  });
  
  // Convert to patterns
  const patterns: SymptomPattern[] = [];
  const symptomLabels: { [key: string]: string } = {
    'cramps': 'Cramps',
    'headache': 'Headache',
    'bloating': 'Bloating',
    'breast-tenderness': 'Breast Tenderness',
    'acne': 'Acne',
    'fatigue': 'Fatigue',
    'nausea': 'Nausea',
    'back-pain': 'Back Pain',
    'mood-swings': 'Mood Swings',
  };
  
  Object.entries(symptomCounts).forEach(([symptom, data]) => {
    if (data.count >= 2) { // Only include if logged at least twice
      const avgDaysBefore = Math.round(
        data.daysBefore.reduce((a, b) => a + b, 0) / data.daysBefore.length
      );
      
      let phase = 'during your cycle';
      let timing = '';
      
      if (avgDaysBefore <= 2) {
        phase = 'just before your period';
        timing = `${avgDaysBefore} day${avgDaysBefore !== 1 ? 's' : ''} before`;
      } else if (avgDaysBefore <= 7) {
        phase = 'in your luteal phase';
        timing = `${avgDaysBefore} days before`;
      } else if (avgDaysBefore <= 14) {
        phase = 'around ovulation';
        timing = 'mid-cycle';
      } else {
        phase = 'in your follicular phase';
        timing = 'early in your cycle';
      }
      
      patterns.push({
        name: symptomLabels[symptom] || symptom,
        description: `You most often log ${symptomLabels[symptom]?.toLowerCase() || symptom} ${timing} your period`,
        frequency: data.count,
        cyclePhase: phase,
      });
    }
  });
  
  // Sort by frequency
  return patterns.sort((a, b) => b.frequency - a.frequency).slice(0, 5);
}

// Analyze mood patterns
export function analyzeMoodPatterns(historicalLogs: HistoricalLogs): { positive: number; negative: number; neutral: number } {
  let positive = 0;
  let negative = 0;
  let neutral = 0;
  
  const positiveMoods = ['happy', 'energetic', 'calm', 'motivated'];
  const negativeMoods = ['anxious', 'sad', 'irritable', 'moody', 'stressed'];
  
  Object.values(historicalLogs).forEach(logs => {
    if (logs.mood?.selectedOptions) {
      logs.mood.selectedOptions.forEach(mood => {
        if (positiveMoods.includes(mood)) positive++;
        else if (negativeMoods.includes(mood)) negative++;
        else neutral++;
      });
    }
  });
  
  const total = positive + negative + neutral;
  if (total === 0) return { positive: 33, negative: 33, neutral: 34 };
  
  return {
    positive: Math.round((positive / total) * 100),
    negative: Math.round((negative / total) * 100),
    neutral: Math.round((neutral / total) * 100),
  };
}

// Get logging streak
export function getLoggingStreak(historicalLogs: HistoricalLogs): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let streak = 0;
  
  for (let i = 0; i < 365; i++) {
    const checkDate = new Date(today);
    checkDate.setDate(checkDate.getDate() - i);
    const dateStr = formatDate(checkDate);
    
    if (historicalLogs[dateStr] && Object.keys(historicalLogs[dateStr]).length > 0) {
      streak++;
    } else if (i > 0) { // Don't break on today if no logs yet
      break;
    }
  }
  
  return streak;
}
