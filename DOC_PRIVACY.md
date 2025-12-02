# MAUV Privacy & Data Practices

## Core Principle: Local-First, Privacy-First

MAUV is built on the fundamental belief that **your health data belongs to you and should never leave your device without your explicit consent**.

## What Data We Store

### Locally on Your Device (IndexedDB)

ALL of the following data is stored **only on your device**:

1. **Profile Data**
   - Alias (screen name)
   - Avatar selection
   - Account creation date

2. **Cycle Settings**
   - Average cycle length
   - Period duration
   - Last period start date

3. **Symptom Logs**
   - Daily mood
   - Physical symptoms
   - Flow intensity
   - Energy levels
   - Personal notes

4. **Cycle Logs**
   - Historical period dates
   - Flow patterns
   - Symptom trends

5. **AMARA Chat History**
   - Conversation history with AI companion
   - Session metadata

## What We DON'T Store on Servers

- ❌ Your profile data
- ❌ Your cycle information
- ❌ Your symptom logs
- ❌ Your personal notes
- ❌ Your chat history with AMARA
- ❌ Any personally identifiable information
- ❌ Your IP address or device ID
- ❌ Any analytics or tracking data

## How Data Flows

### Normal Usage
```
You → MAUV App → Your Device (IndexedDB)
```
That's it. No servers. No cloud. No third parties.

### AMARA AI Interactions

When you chat with AMARA:
1. Your message is sent to Claude AI (Anthropic)
2. **Contextual data sent:**
   - Current cycle phase (e.g., \"luteal phase\")
   - General patterns (e.g., \"user typically experiences cramps on day 1-2\")
3. **NOT sent:**
   - Your alias
   - Your full symptom logs
   - Your personal notes
   - Any raw data

AMARA receives only **anonymized, summarized context** to provide relevant guidance.

## Data Export

### What Gets Exported
When you click \"Export My Data\", you receive a JSON file containing:
- Profile (alias, avatar)
- Cycle settings
- All symptom logs
- All cycle logs
- AMARA chat history (optional)

### Export Format
```json
{
  \"exportDate\": \"2025-01-29T12:00:00Z\",
  \"version\": \"1.0\",
  \"profile\": { ... },
  \"cycleSettings\": { ... },
  \"symptomLogs\": [ ... ],
  \"cycleLogs\": [ ... ],
  \"amaraChats\": [ ... ]
}
```

### Where It Goes
- Downloaded directly to your device
- **NOT** sent to any server
- You control the file completely

## Data Deletion

### What Gets Deleted
When you click \"Delete All Data\":
1. All data is removed from IndexedDB
2. The database itself is deleted
3. App returns to first-time setup

### What Happens
```
Before: All your data exists locally
↓
Delete Action
↓
After: Device has zero trace of your data
```

### Permanence
- **Irreversible**: Once deleted, data cannot be recovered
- **Complete**: No traces left on device
- **Instant**: Takes effect immediately

## Technical Details

### Storage Technology
- **IndexedDB**: Browser-based NoSQL database
- **Capacity**: Up to 50% of available disk space
- **Persistence**: Data survives browser restarts
- **Access**: Only accessible by MAUV on your device

### Browser Compatibility
- ✅ Chrome/Edge: Full support
- ✅ Firefox: Full support
- ✅ Safari: Full support
- ✅ Mobile browsers: Full support

### Data Encryption
- **At rest**: Encrypted by your device's file system
- **In transit**: N/A (data doesn't leave device except for AMARA context)
- **AMARA communication**: HTTPS encrypted

## Your Rights

### You Have Complete Control

✅ **View**: See all your data anytime in the app
✅ **Export**: Download your data anytime
✅ **Delete**: Permanently erase all data anytime
✅ **Modify**: Edit or update any information
✅ **Anonymity**: No real identity required

### We Have No Control

❌ **Access**: We cannot view your data
❌ **Backup**: We don't have copies of your data
❌ **Recovery**: We cannot restore deleted data
❌ **Tracking**: We don't track your usage

## Privacy Guarantees

### What We Promise

1. **Local Storage Only**
   - All data stays on your device
   - No cloud backups by default
   - No server-side storage

2. **No Tracking**
   - No analytics
   - No usage monitoring
   - No third-party trackers

3. **Anonymous by Design**
   - No email required (except for optional export)
   - No phone number
   - No real names
   - No personal identifiers

4. **Transparent AI Usage**
   - AMARA's context is clearly documented
   - Only summarized, anonymized data sent
   - No raw personal data transmitted

5. **Easy Exit**
   - Export data anytime
   - Delete everything with one click
   - No account lock-in

## Common Questions

### "Can you see my data?"
**No.** All data is stored locally on your device. We have no way to access it.

### "What if I lose my device?"
Your data is only on that device. If lost, the data is lost. We recommend:
- Regular exports for backup
- Using device backup (iCloud, Google Drive) if you trust those services

### "Can I sync across devices?"
Not currently. Each device has its own local data. Syncing would require server storage, which contradicts our privacy principles. We may add optional encrypted sync in the future.

### "Is AMARA listening to everything?"
AMARA only receives:
- The messages you explicitly send
- Summarized cycle context (phase, patterns)
- No raw logs, notes, or personal data

### "What happens if I clear browser data?"
Clearing browser data (cache, cookies, local storage) will delete MAUV data. Export first if you need to keep it.

### "Do you comply with GDPR/CCPA?"
Since we don't collect or store any personal data on servers, we exceed GDPR/CCPA requirements. There's nothing for us to comply with because we never have your data.

## Changes to Privacy Practices

If we ever change how we handle data, we will:
1. Update this document clearly
2. Notify users in-app
3. Require explicit consent for any server-side data storage
4. Always maintain the option to stay 100% local

## Contact

For privacy questions or concerns:
- Email: privacy@mauv.health (hypothetical)
- We'll respond even though we can't see your data!

## Last Updated
January 29, 2025

---

**TL;DR**: Your data lives on your device. Period. We can't see it, access it, or store it. You can export it or delete it anytime. AMARA only gets anonymized summaries. This is privacy-first by design, not by promise.
