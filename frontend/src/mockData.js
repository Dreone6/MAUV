// Mock data for Flo menstrual tracker

export const mockUser = {
  id: '1',
  name: 'Sarah',
  email: 'sarah@example.com',
  cycleLength: 28,
  periodLength: 5,
  lastPeriodStart: '2025-01-24', // Updated to more recent date
  profileSetup: true
};

export const mockCycleData = [
  {
    id: '1',
    startDate: '2025-01-15',
    endDate: '2025-01-19',
    flow: 'medium',
    symptoms: ['cramps', 'fatigue', 'mood-swings']
  },
  {
    id: '2',
    startDate: '2024-12-18',
    endDate: '2024-12-22',
    flow: 'heavy',
    symptoms: ['cramps', 'bloating', 'headache']
  }
];

export const mockSymptomLogs = [
  {
    id: '1',
    date: '2025-01-20',
    mood: 'happy',
    symptoms: ['energetic'],
    flow: null,
    notes: 'Feeling great today!'
  },
  {
    id: '2',
    date: '2025-01-16',
    mood: 'sad',
    symptoms: ['cramps', 'fatigue'],
    flow: 'medium',
    notes: 'First day cramps'
  }
];

export const symptomCategories = {
  mood: ['happy', 'sad', 'anxious', 'irritable', 'calm', 'emotional'],
  physical: ['cramps', 'bloating', 'headache', 'fatigue', 'nausea', 'tender-breasts', 'back-pain'],
  skin: ['acne', 'dry-skin', 'oily-skin', 'clear'],
  energy: ['energetic', 'tired', 'normal'],
  flow: ['spotting', 'light', 'medium', 'heavy']
};

export const mockInsights = [
  {
    id: '1',
    type: 'cycle',
    title: 'Your cycle is regular',
    description: 'Your average cycle length is 28 days',
    icon: 'calendar'
  },
  {
    id: '2',
    type: 'fertility',
    title: 'Fertile window approaching',
    description: 'Your fertile window starts in 8 days',
    icon: 'heart'
  },
  {
    id: '3',
    type: 'symptom',
    title: 'Common symptom pattern',
    description: 'You typically experience cramps on day 1-2 of your period',
    icon: 'activity'
  }
];
