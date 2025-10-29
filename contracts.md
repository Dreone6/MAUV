# MAUV Personal Tracker - Implementation Contracts

## Overview
MAUV is a menstrual health tracking app with AMARA AI assistant integration. The app prioritizes user privacy by storing data locally using IndexedDB, with optional email export before deletion.

## API Contracts

### 1. AMARA AI Chat Endpoint
**POST /api/chat/amara**
- Request:
  ```json
  {
    "message": "string",
    "session_id": "string"
  }
  ```
- Response:
  ```json
  {
    "response": "string",
    "session_id": "string"
  }
  ```
- Uses Claude Anthropic for conversational AI
- AMARA acts as a supportive female companion for menstrual health queries

### 2. Email Export Endpoint
**POST /api/export/email**
- Request:
  ```json
  {
    "email": "string",
    "data": {
      "cycles": [],
      "symptoms": [],
      "settings": {}
    }
  }
  ```
- Response:
  ```json
  {
    "success": true,
    "message": "Data sent to email"
  }
  ```
- Sends comprehensive data export before account deletion

### 3. Authentication Endpoints
**POST /api/auth/register**
- Local password storage only
- No data stored on server

**POST /api/auth/login**
- Validates credentials
- Returns session token

## Frontend Data Storage (IndexedDB)

### Collections:
1. **users** - User profile data
2. **cycles** - Period tracking data
3. **symptoms** - Daily symptom logs
4. **insights** - Generated health insights
5. **chats** - AMARA conversation history

## Mock Data Replacement Plan

### mockData.js → IndexedDB
- All mock cycle data → Local IndexedDB storage
- All symptoms → Persistent local storage
- User preferences → Local storage
- Chat history → Local storage with option to clear

## Privacy Features
1. No server-side data storage (except temporary for email export)
2. Complete data deletion capability
3. Email export before deletion
4. Local authentication only
5. Optional biometric login (Web Authentication API)

## Frontend-Backend Integration

### AMARA Chat Integration
1. Frontend sends message to `/api/chat/amara`
2. Backend processes with Claude AI
3. Response returned with health-focused, supportive tone
4. Chat history stored locally in IndexedDB

### Data Export Flow
1. User requests account deletion
2. App prompts for email export
3. All IndexedDB data collected
4. Sent to backend for email delivery
5. Local data deleted after confirmation

## Implementation Priority
1. ✅ Frontend UI with mock data
2. Backend: AMARA AI chat endpoint
3. Backend: Email export functionality
4. Frontend: IndexedDB integration
5. Frontend: Local authentication
6. Frontend: Web Authentication API (biometric)
7. Testing and optimization
