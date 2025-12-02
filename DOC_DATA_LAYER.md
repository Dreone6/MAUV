# MAUV Data Layer Documentation

## Overview

MAUV uses a **local-first, privacy-first** data architecture. All user data is stored in the browser using **IndexedDB** and never leaves the device unless explicitly exported by the user.

## Architecture

### Data Service (`/app/frontend/src/services/dataService.js`)

Centralized service that provides a clean API for all data operations.

### Storage Technology

- **IndexedDB**: Browser-based NoSQL database
- **Database Name**: `mauvDB`
- **Version**: 1

### Data Stores (Tables)

#### 1. `profile`
Stores user identity (anonymous)
```javascript
{
  id: 'user',
  alias: string,        // User's chosen screen name
  avatarId: string,     // Selected avatar identifier
  createdAt: string     // ISO timestamp
}
```

#### 2. `cycleSettings`
Stores cycle configuration
```javascript
{
  id: 'settings',
  cycleLength: number,      // Average cycle length in days (default: 28)
  periodLength: number,     // Period duration in days (default: 5)
  lastPeriodStart: string   // ISO date of last period start
}
```

#### 3. `symptomLogs`
Stores daily health logs (keyed by date)
```javascript
{
  date: 'YYYY-MM-DD',      // Primary key
  mood: string,            // happy, sad, anxious, etc.
  symptoms: [string],      // Array of symptom strings
  flow: string,            // spotting, light, medium, heavy
  energy: string,          // energetic, tired, normal
  notes: string,           // User notes
  timestamp: string        // When this log was created/updated
}
```

#### 4. `cycleLogs`
Stores period cycle history
```javascript
{
  id: number,              // Auto-increment
  startDate: string,       // ISO date
  endDate: string,         // ISO date
  flow: string,            // Overall flow for the cycle
  symptoms: [string],      // Common symptoms during this cycle
  notes: string
}
```

#### 5. `amaraChats`
Stores AMARA conversation history
```javascript
{
  id: number,              // Auto-increment
  type: 'user' | 'amara',
  text: string,
  timestamp: string,
  sessionId: string
}
```

## API Methods

### Profile

```javascript
import { getProfile, saveProfile } from './services/dataService';

// Get current profile
const profile = await getProfile();
// Returns: { alias, avatarId, createdAt } or null

// Save/update profile
await saveProfile({
  alias: 'Luna',
  avatarId: 'fairy_1',
  createdAt: new Date().toISOString()
});
```

### Cycle Settings

```javascript
import { getCycleSettings, saveCycleSettings } from './services/dataService';

const settings = await getCycleSettings();
// Returns: { cycleLength, periodLength, lastPeriodStart }

await saveCycleSettings({
  cycleLength: 30,
  periodLength: 5,
  lastPeriodStart: '2025-01-15'
});
```

### Symptom Logs

```javascript
import { 
  getSymptomLog, 
  saveSymptomLog, 
  getAllSymptomLogs 
} from './services/dataService';

// Get log for specific date
const log = await getSymptomLog('2025-01-20');

// Save/update log
await saveSymptomLog('2025-01-20', {
  mood: 'happy',
  symptoms: ['cramps', 'fatigue'],
  flow: 'medium',
  energy: 'tired',
  notes: 'Feeling okay'
});

// Get all logs
const allLogs = await getAllSymptomLogs();
```

### Cycle Logs

```javascript
import { 
  getCycleLogs, 
  saveCycleLog, 
  getLatestCycleLog 
} from './services/dataService';

const cycles = await getCycleLogs();
const latestCycle = await getLatestCycleLog();

await saveCycleLog({
  startDate: '2025-01-15',
  endDate: '2025-01-19',
  flow: 'medium',
  symptoms: ['cramps'],
  notes: 'Normal cycle'
});
```

### Export & Delete

```javascript
import { exportAllData, deleteAllData } from './services/dataService';

// Export all data
const data = await exportAllData();
// Returns: { profile, cycleSettings, symptomLogs, cycleLogs, amaraChats }

// Delete everything
await deleteAllData();
```

## Data Flow

```
User Action → Component → dataService → IndexedDB
                    ↓
              UI Update
```

### Example: Logging Symptoms

1. User opens Symptom Tracker modal
2. Component calls `getSymptomLog(today)` to load existing data
3. User makes changes and saves
4. Component calls `saveSymptomLog(today, newData)`
5. IndexedDB persists the data
6. UI updates to reflect changes

## Privacy Guarantees

✅ **All data stored locally** - IndexedDB in the user's browser  
✅ **No server transmission** - Data never sent to backend (except AMARA context)  
✅ **Complete control** - User can export or delete at any time  
✅ **Anonymous** - No personal identifiers required  

## Error Handling

All async methods may throw errors. Components should handle these:

```javascript
try {
  await saveSymptomLog(date, data);
  toast.success('Saved!');
} catch (error) {
  console.error('Failed to save:', error);
  toast.error('Failed to save. Please try again.');
}
```

## Browser Compatibility

IndexedDB is supported in all modern browsers:
- Chrome/Edge: ✅
- Firefox: ✅
- Safari: ✅

## Data Persistence

- Data persists across browser sessions
- Survives page refreshes
- Cleared only when:
  - User explicitly deletes data
  - Browser data is cleared
  - Browser storage quota exceeded (rare)

## Future Enhancements

- Import from exported JSON
- Backup to encrypted cloud storage (optional)
- Sync across devices (with user consent)
