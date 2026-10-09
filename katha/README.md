# Katha — A Reader's Companion 📖

> Turn any PDF into an immersive, AI-assisted reading experience.

Katha transforms static PDF documents — novels, textbooks, research papers — into an interactive, book-like reading experience. Read leisurely with a flippable book UI and ambient soundscapes, or switch to Academic Mode where an AI assistant summarizes, explains, and narrates content on demand.

---

## ✨ Features

### Core Reading Experience
- 📖 **Flippable book UI** — PDFs rendered as a realistic page-turning book (toggle to continuous scroll mode)
- 🔍 **Zoom controls** — auto-fit on load, manual zoom in/out
- 🖼️ **Auto-generated cover page** — automatically creates a cover with the document title when the source PDF doesn't have one
- 🔖 **Bookmarks** — save and jump back to any page, persisted per user
- 📝 **Notes** — attach written notes to specific pages or highlighted passages
- ⏯️ **Resume reading** — automatically picks up where you left off
- 🎨 **Themes** — light/dark/sepia visual themes
- 🎵 **Ambient soundscapes** — manually select background audio (rain, ocean, forest, lo-fi, etc.) to set the mood while reading

### Reading Modes
- 🌿 **Leisure Mode** — a clean, distraction-free interface for novels and casual reading
- 🎓 **Academic Mode** — keeps an AI assistant on standby for study material

### AI Features (Academic Mode)
- 🧠 **Summarize** — highlight any passage and get a concise AI-generated summary
- 💡 **Explain Simply** — highlight dense or technical text and get a plain-language explanation
- 🔊 **AI Chapter Narration (TTS)** — request AI-generated audio narration of the current page or a selected passage, so you can listen instead of read

---

## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- [PDF.js](https://mozilla.github.io/pdf.js/) — PDF parsing and text-layer rendering
- [page-flip](https://github.com/Nodlik/StPageFlip) — page-turn animation
- Web Audio API — ambient soundscape playback
- Axios

**Backend**
- Node.js + Express
- MongoDB (Atlas) + Mongoose
- JWT-based authentication

**AI Layer**
- LLM API (summarization / simplified explanation) via a secure backend proxy
- Text-to-Speech API for on-demand chapter/passage narration

**DevOps**
- Docker + Docker Compose for local development

---

## 📂 Project Structure

```
katha/
├── frontend/          # React app (PDF rendering, flipbook UI, AI panel)
├── backend/           # Express API (auth, bookmarks, notes, AI proxy, TTS proxy)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── services/      # AI summarization + TTS integration
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Node.js 18+ (optional, only needed for non-Docker local dev)
- A MongoDB Atlas connection string
- An LLM API key (for summarize/explain)
- A TTS API key (for chapter narration)

### Run with Docker (recommended)

```bash
git clone <repository-url>
cd katha
cp .env.example .env
# fill in MONGO_URI, LLM_API_KEY, TTS_API_KEY in .env
docker-compose up --build
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:8080](http://localhost:8080)

### Run without Docker

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```

---

## 🧩 Environment Variables

See `.env.example` for the full list. Key variables:

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret used to sign auth tokens |
| `LLM_API_KEY` | API key for summarize/explain feature |
| `TTS_API_KEY` | API key for chapter narration |
| `REACT_APP_API_BASE_URL` | Backend URL used by the frontend |

---

## 🧱 Software Design

This repo implements the design from `Katha_DA2_Software_Design_Document.docx`: a layered client-server architecture (React SPA → Express API → service layer → MongoDB) with an AI proxy boundary that keeps `LLM_API_KEY`/`TTS_API_KEY` off the client. Six GoF patterns are applied directly in the code:

| Pattern | Where |
|---|---|
| Adapter | `backend/services/aiProvider/*Adapter.js` — vendor-specific LLM/TTS calls behind one `AIProvider` contract |
| Facade | `backend/services/AcademicModeFacade.js` — one `assist(text, mode)` call instead of three services |
| Strategy | `frontend/src/strategies/renderStrategies.jsx` — flipbook vs. scroll renderer, swapped at runtime |
| Observer | `backend/services/events/readingProgressEmitter.js` and `frontend/src/context/ReadingEventContext.jsx` |
| Factory Method | `backend/services/factories/CoverFactory.js`, `SoundscapeFactory.js` |
| Singleton | `backend/db/connection.js` |

The repository layer (`backend/repositories/`) is the Dependency Inversion seam: every service depends on a repository interface, not Mongoose directly, so the app runs out of the box on an **in-memory store** with no MongoDB Atlas credentials needed, and switches to Mongo the moment `MONGO_URI` is set - no controller changes required.

AI/TTS calls are mocked (`USE_MOCK_AI=true` by default) so the whole stack runs without any vendor API keys. Swap in a real adapter in `backend/services/aiProvider/` when you're ready.

## 🚀 Quick Start — Local Development

```bash
git clone <repository-url>
cd katha
cp .env.example .env      # defaults work as-is (mock AI, in-memory DB)

# Backend
cd backend && npm install && npm run dev   # http://localhost:8080

# Frontend (new terminal)
cd frontend && npm install && npm run dev  # http://localhost:3000
```

Or with Docker: `docker-compose up --build`.

## 🗺️ Roadmap

- [x] PDF upload + flipbook rendering
- [x] Bookmarks & auto-cover generation
- [ ] Notes tied to highlights
- [ ] Zoom controls
- [ ] Leisure / Academic mode toggle
- [ ] AI summarize & explain
- [ ] AI chapter narration (TTS)
- [ ] Docker Compose full stack
- [ ] OCR support for scanned PDFs *(future)*
- [ ] Read-along synced-highlight narration *(future)*
- [ ] Offline/PWA support *(future)*

---

## 👥 Contributors

- **ARJUN** — Backend (Express, MongoDB, AI/TTS integration)
- **ARUNADITYA RAGURAMAN** — Frontend (React, PDF.js, UI/UX)

---

## 📄 License

This project is developed as part of an academic Software Engineering course assignment.
