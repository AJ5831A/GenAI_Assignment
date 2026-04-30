# Persona-Based AI Chatbot

React + Express application for the Scaler prompt engineering assignment. The app lets users chat with three persona-guided assistants: Anshuman Singh, Abhimanyu Saxena, and Kshitij Mishra.

## Features

- React chat interface with persona switcher
- Conversation resets whenever the active persona changes
- Persona-specific suggestion chips
- Typing indicator and graceful API error messages
- Express API that passes a distinct system prompt for every persona
- API key loaded from environment variables only
- Responsive desktop and mobile layout

## Tech Stack

- Frontend: React, JavaScript, Vite, Tailwind CSS, lucide-react
- Backend: Express, JavaScript, Groq SDK

## Project Structure

- `backend/src/config`: environment and runtime configuration
- `backend/src/controllers`: request/response handlers
- `backend/src/routes`: API route composition
- `backend/src/services`: chat orchestration, sanitization, and LLM completion logic
- `backend/src/personas`: persona metadata and system prompts
- `frontend/src/components`: focused UI components
- `frontend/src/hooks`: reusable chat state and behavior
- `frontend/src/services`: API client logic
- `frontend/src/data`: persona UI metadata

## Local Setup

### Backend

```bash
cd backend
npm install
cp .env.example .env
```

Add your Groq API key to `backend/.env`:

```bash
GROQ_API_KEY=your_groq_api_key_here
```

Start the API:

```bash
npm run dev
```

The backend runs on `http://localhost:8080`.

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The frontend runs on `http://localhost:5173`.

## Deployment

Production split:

- Frontend: Netlify
- Backend: Render

Set these production environment variables:

- Backend: `GROQ_API_KEY`, `GROQ_MODEL`, `CLIENT_ORIGIN=https://scaler-persona-bot.netlify.app`
- Frontend: `VITE_API_BASE_URL=https://genai-assignment-snmz.onrender.com`

For multiple frontend origins, set backend `CLIENT_ORIGINS` as a comma-separated list, for example:

```bash
CLIENT_ORIGINS=http://localhost:5173,https://scaler-persona-bot.netlify.app
```

Live URL: https://scaler-persona-bot.netlify.app/
API URL: https://genai-assignment-snmz.onrender.com

## Repository Notes

The repository intentionally ignores `.env`, `node_modules`, `dist`, build output, local Codex files, and the assignment `test.txt` file. Use `.env.example` files for required environment variable names.
