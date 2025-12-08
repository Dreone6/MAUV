# MAUV - Women's Health App

Complete period tracking and wellness app with AI companion.

## Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Dreone6/MAUV.git)

## Features

- 61 screens (onboarding, dashboard, tracking, settings)
- Supabase backend (PostgreSQL)
- Stripe payments ($5.99/month, $35.99/year)
- AMARA AI chat companion (Claude)
- Partner sharing features
- iOS/Android ready (Capacitor)

## Tech Stack

- React 18 + TypeScript
- Tailwind CSS v4
- Vite
- Supabase
- Stripe
- FastAPI backend

## Local Development

```bash
# Frontend
cd frontend
yarn install
yarn dev

# Backend
cd backend
pip install -r requirements.txt
uvicorn server:app --reload
```

## Environment Variables

See `frontend/.env` and `backend/.env` for required variables.

## Documentation

- `/SUPABASE_ARCHITECTURE.md` - Database schema
- `/STRIPE_SETUP_COMPLETE.md` - Payment integration
- `/SCREEN_ORGANIZATION_COMPLETE.md` - Screen structure
