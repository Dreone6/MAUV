/**
 * MAUV Data Service - Local-First Storage Layer
 * 
 * This service provides a centralized interface for all data operations
 * using IndexedDB for browser-based storage. All data stays local.
 */

const DB_NAME = 'mauvDB';
const DB_VERSION = 1;

let db = null;

/**
 * Initialize IndexedDB
 */
const initDB = () => {
  return new Promise((resolve, reject) => {
    if (db) {
      resolve(db);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const database = event.target.result;

      // Profile store
      if (!database.objectStoreNames.contains('profile')) {
        database.createObjectStore('profile', { keyPath: 'id' });
      }

      // Cycle settings store
      if (!database.objectStoreNames.contains('cycleSettings')) {
        database.createObjectStore('cycleSettings', { keyPath: 'id' });
      }

      // Symptom logs store (keyed by date)
      if (!database.objectStoreNames.contains('symptomLogs')) {
        const symptomStore = database.createObjectStore('symptomLogs', { keyPath: 'date' });
        symptomStore.createIndex('date', 'date', { unique: true });
      }

      // Cycle logs store (period start/end dates)
      if (!database.objectStoreNames.contains('cycleLogs')) {
        const cycleStore = database.createObjectStore('cycleLogs', { keyPath: 'id', autoIncrement: true });
        cycleStore.createIndex('startDate', 'startDate', { unique: false });
      }

      // AMARA chat history store
      if (!database.objectStoreNames.contains('amaraChats')) {
        database.createObjectStore('amaraChats', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
};

/**
 * Generic get operation
 */
const getItem = async (storeName, key) => {
  await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.get(key);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

/**
 * Generic put operation
 */
const putItem = async (storeName, item) => {
  await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.put(item);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

/**
 * Generic get all operation
 */
const getAllItems = async (storeName) => {
  await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
};

/**
 * Generic delete operation
 */
const deleteItem = async (storeName, key) => {
  await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.delete(key);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

/**
 * Clear all data from a store
 */
const clearStore = async (storeName) => {
  await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.clear();

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

// ============ PROFILE METHODS ============

export const getProfile = async () => {
  const profile = await getItem('profile', 'user');
  return profile || null;
};

export const saveProfile = async (profile) => {
  return await putItem('profile', { id: 'user', ...profile });
};

// ============ CYCLE SETTINGS METHODS ============

export const getCycleSettings = async () => {
  const settings = await getItem('cycleSettings', 'settings');
  return settings || {
    cycleLength: 28,
    periodLength: 5,
    lastPeriodStart: null
  };
};

export const saveCycleSettings = async (settings) => {
  return await putItem('cycleSettings', { id: 'settings', ...settings });
};

// ============ SYMPTOM LOG METHODS ============

export const getSymptomLog = async (date) => {
  // date should be in YYYY-MM-DD format
  const log = await getItem('symptomLogs', date);
  return log || null;
};

export const saveSymptomLog = async (date, log) => {
  return await putItem('symptomLogs', { date, ...log, timestamp: new Date().toISOString() });
};

export const getAllSymptomLogs = async () => {
  return await getAllItems('symptomLogs');
};

export const deleteSymptomLog = async (date) => {
  return await deleteItem('symptomLogs', date);
};

// ============ CYCLE LOG METHODS ============

export const getCycleLogs = async () => {
  return await getAllItems('cycleLogs');
};

export const saveCycleLog = async (log) => {
  // log should have: startDate, endDate, flow, symptoms, etc.
  return await putItem('cycleLogs', log);
};

export const getLatestCycleLog = async () => {
  const logs = await getCycleLogs();
  if (logs.length === 0) return null;
  
  // Sort by startDate descending
  logs.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
  return logs[0];
};

// ============ AMARA CHAT METHODS ============

export const getAmaraChats = async () => {
  return await getAllItems('amaraChats');
};

export const saveAmaraChat = async (message) => {
  return await putItem('amaraChats', message);
};

export const clearAmaraChats = async () => {
  return await clearStore('amaraChats');
};

// ============ EXPORT ALL DATA ============

export const exportAllData = async () => {
  const profile = await getProfile();
  const cycleSettings = await getCycleSettings();
  const symptomLogs = await getAllSymptomLogs();
  const cycleLogs = await getCycleLogs();
  const amaraChats = await getAmaraChats();

  return {
    exportDate: new Date().toISOString(),
    version: '1.0',
    profile,
    cycleSettings,
    symptomLogs,
    cycleLogs,
    amaraChats
  };
};

// ============ DELETE ALL DATA ============

export const deleteAllData = async () => {
  await clearStore('profile');
  await clearStore('cycleSettings');
  await clearStore('symptomLogs');
  await clearStore('cycleLogs');
  await clearStore('amaraChats');
  
  // Close and delete the database
  if (db) {
    db.close();
    db = null;
  }
  
  return new Promise((resolve, reject) => {
    const deleteRequest = indexedDB.deleteDatabase(DB_NAME);
    deleteRequest.onsuccess = () => resolve();
    deleteRequest.onerror = () => reject(deleteRequest.error);
  });
};

// ============ INITIALIZATION ============

export const checkOnboardingStatus = async () => {
  const profile = await getProfile();
  return profile !== null;
};

// Initialize DB on module load
initDB().catch(err => console.error('Failed to initialize IndexedDB:', err));
