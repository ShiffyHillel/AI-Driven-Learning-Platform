# AI-Driven Learning Platform 🧠

A full-stack AI-powered learning platform that allows users to select a topic, send prompts to an AI, and receive structured lessons. Built as a Mini MVP.

---

## Tech Stack

**Backend**
- Node.js + TypeScript
- Express.js (v5)
- MongoDB (native driver)
- OpenAI GPT API
- dotenv, cors, uuid

**Frontend**
- Angular (Standalone Components)
- Angular Material UI
- TypeScript

---

## Getting Started

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
ng serve
```
---

## Environment Variables

Create a `.env` file in the `backend/` folder:
PORT=5000
MONGODB_URI=your_mongodb_connection_string
MONGODB_DB_NAME=learning_platform
OPENAI_API_KEY=your_openai_api_key
AI_PROVIDER=openai
---

## API Endpoints

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/users | Register a new user |
| GET | /api/users/:id | Get user by ID |
| GET | /api/users | Get all users (Admin) |

### Categories
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/categories | Get all categories |
| GET | /api/categories/:id | Get category by ID |
| GET | /api/categories/:id/sub-categories | Get sub-categories |

### Prompts
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/prompts | Send prompt and get AI lesson |
| GET | /api/prompts/history | Get user learning history |
| GET | /api/prompts/:id | Get prompt by ID |
| GET | /api/prompts | Get all prompts (Admin) |

---

## AI Provider

The platform supports two AI modes, configured via `.env`:

- `AI_PROVIDER=openai` — Uses OpenAI GPT API
- `AI_PROVIDER=mock` — Returns a mock lesson (for local testing)

Implemented via a clean interface (`AiProvider`) with two implementations (`OpenAiProvider`, `MockAiProvider`), following the **Strategy design pattern**.

---

## Example Use Case

1. User registers with name and phone number
2. User selects a category (e.g. Science) and sub-category (e.g. Space)
3. User types a prompt: "Teach me about black holes"
4. The system sends the prompt to the AI and returns a structured lesson
5. User can revisit all past lessons in the History page

---

## Assumptions

- User ID is passed via `X-User-Id` header on every request
- Categories and sub-categories are seeded automatically on first run
- No JWT authentication in this version — can be added as an extension

---
