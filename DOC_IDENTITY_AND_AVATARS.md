# MAUV Identity & Avatar System

## Core Principle: Complete Anonymity

MAUV is built on a **privacy-first, anonymous-only** identity system. Users are NEVER asked for:
- ❌ Real names (first name, last name)
- ❌ Email addresses (unless exporting data)
- ❌ Phone numbers
- ❌ Date of birth
- ❌ Any personally identifiable information (PII)

## Identity Components

### 1. Alias (Screen Name)

**What it is:**
- A chosen pseudonym/nickname that represents the user
- Displayed throughout the app instead of a real name
- Can be changed anytime in profile settings

**Requirements:**
- 1-20 characters
- Any name the user prefers (Luna, Sage, River, Star, etc.)
- No validation for "real names" - purely user choice

**Examples:**
- Luna
- Willow
- River
- Sage
- Moonbeam
- Starlight

**Implementation:**
```javascript
{
  alias: string (1-20 chars)
}
```

### 2. Fairy Avatar

**What it is:**
- A visual representation chosen from 12 preset fairies
- Each fairy has a unique emoji, name, and color gradient
- Fully customizable with modular options

## The 12 Preset Fairies

Each preset fairy comes with a unique combination of features:

| # | Name | Emoji | Color Gradient | Default Features |
|---|------|-------|----------------|------------------|
| 1 | Luna | 🧚‍♀️ | Purple→Pink | Light skin, purple hair, blue eyes, butterfly wings, crown |
| 2 | Sparkle | ✨ | Blue→Purple | Medium skin, blonde hair, green eyes, dragonfly wings |
| 3 | Blossom | 🌸 | Pink→Rose | Light skin, pink hair, brown eyes, flower wings, tiara |
| 4 | Violet | 💜 | Purple→Indigo | Tan skin, violet hair, purple eyes, butterfly wings |
| 5 | Moon | 🌙 | Indigo→Blue | Medium skin, silver hair, blue eyes, moon wings, crescent accessory |
| 6 | Hibiscus | 🌺 | Rose→Pink | Dark skin, black hair, brown eyes, tropical wings, flower |
| 7 | Star | 🌟 | Yellow→Orange | Light skin, golden hair, amber eyes, star wings, star accessory |
| 8 | Azure | 🦋 | Cyan→Blue | Medium skin, blue hair, teal eyes, butterfly wings |
| 9 | Rainbow | 🌈 | Pink→Purple→Blue | Tan skin, rainbow hair, violet eyes, rainbow wings, glasses |
| 10 | Willow | 🍃 | Green→Emerald | Medium skin, brown hair, green eyes, leaf wings |
| 11 | Frost | ❄️ | Blue→Cyan | Light skin, white hair, ice-blue eyes, ice wings, tiara |
| 12 | Ember | 🔥 | Orange→Red | Dark skin, red hair, amber eyes, fire wings |

## Modular Customization System

### Why Modular?

Each preset can be **recreated exactly** using the customization options. This means:
- Presets are shortcuts to specific combinations
- Users can start with any preset and modify it
- Users can build their own fairy from scratch
- All fairies are reproducible via the same options

### Customization Options

#### Skin Tone
- Light
- Medium
- Tan
- Dark

#### Hair Style & Color
**Colors:**
- Blonde
- Brown
- Black
- Red
- Purple
- Violet
- Blue
- Silver/White
- Pink
- Golden
- Rainbow (gradient)

**Styles:** (Future enhancement)
- Long
- Short
- Curly
- Straight
- Braided

#### Eye Color
- Blue
- Green
- Brown
- Purple
- Amber
- Teal
- Violet
- Ice Blue

#### Wings
- Butterfly
- Dragonfly
- Flower petals
- Tropical
- Moon
- Star
- Rainbow
- Leaf
- Ice crystals
- Fire

#### Accessories
- None
- Crown
- Tiara
- Flower
- Crescent moon
- Star
- Glasses

### Data Structure

```javascript
{
  avatarId: 'fairy_1',  // Base preset ID
  customization: {
    skin: 'light',
    hair: {
      color: 'purple',
      style: 'long'  // future
    },
    eyes: 'blue',
    wings: 'butterfly',
    accessories: ['crown']
  }
}
```

## Onboarding Flow

### Step 1: Choose Alias
- **Mandatory** field
- Clear messaging: "NO REAL NAMES REQUIRED"
- Examples provided (Luna, Sage, River)
- Privacy notice: "Your identity stays private"

### Step 2: Choose Fairy Avatar
- Grid of all 12 preset fairies
- Visual: emoji + color gradient circle
- Name displayed under each
- Note: "You can customize it later!"
- Explanation of customization features

### Step 3: Cycle Information
- Optional step for personalization
- No personal data collected
- Only cycle-related settings

## Profile Display

Throughout the app, users are identified by:
- **Alias** (text display)
- **Fairy Avatar** (visual display)

Example:
```
[🧚‍♀️ Purple gradient circle]
Luna
```

## Privacy Benefits

✅ Complete anonymity - no way to identify the real person
✅ No email required until export/delete
✅ Can change alias anytime
✅ Can change avatar anytime
✅ Multiple users can have same alias (no uniqueness requirement)
✅ No tracking or profiling based on real identity

## Implementation Status

### ✅ Completed
- Alias selection in onboarding
- 12 preset fairies with unique designs
- Avatar selection UI (4-column grid)
- Anonymous identity enforcement
- Profile display with alias + avatar

### 🚧 In Progress
- Full customization UI in Profile settings
- Avatar editor with all modular options
- Preview system for customization
- Save custom configurations

### 📋 Future Enhancements
- Hair style variations
- More accessory options
- Seasonal fairy themes
- Import/export custom fairies
- Community fairy gallery (anonymous)

## Key Messaging

**Onboarding:**
- "MAUV is completely anonymous"
- "No real names needed - stay anonymous!"
- "Pick a magical name that represents you"
- "Choose any name that feels right"

**Profile:**
- "Your magical identity"
- "Anonymous by design"
- "Edit your fairy anytime"

**Privacy:**
- "All data stays on your device"
- "Your identity stays private"
- "No personal information required"

## Technical Notes

### Storage
```javascript
// In IndexedDB profile store
{
  id: 'user',
  alias: 'Luna',
  avatarId: 'fairy_1',
  customization: { ... },
  createdAt: '2025-01-29T...'
}
```

### No Server Transmission
- Profile data (alias, avatar) never sent to backend
- AMARA may receive general context but NOT identity
- Export function only triggers local download

### Guarantees
- No name validation
- No "real name" enforcement
- No email verification (unless user chooses to export)
- No cross-device tracking
- No centralized user database
