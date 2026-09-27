# HunarHub – Digital Marketplace for Local Micro-Entrepreneurs

> **Development Status:** 🚧 Phase 0 – Foundation Complete | Marketplace features coming in Phase 1+

HunarHub is a full-stack digital marketplace that empowers local micro-entrepreneurs to showcase and sell their products and services online, connecting them with customers in their community.

---

## Problem Statement

Many skilled local micro-entrepreneurs — artisans, craftspeople, home-based service providers — lack a digital presence. Traditional word-of-mouth limits their reach, while mainstream e-commerce platforms are complex, expensive, or inaccessible. HunarHub bridges this gap by providing a purpose-built, accessible, mobile-first marketplace.

---

## Technology Stack

| Layer       | Technology                                     |
|-------------|------------------------------------------------|
| Frontend    | React 18, Vite, Tailwind CSS, React Router v6  |
| Backend     | Node.js, Express.js, REST API                  |
| Database    | MongoDB, Mongoose ODM                          |
| Auth        | JWT, bcryptjs                                  |
| AI/ML       | Python, FastAPI, Scikit-learn, Pandas, NumPy   |
| Version Control | Git, GitHub                               |

---

## Project Architecture

```
HunarHub/
│
├── frontend/                # React + Vite + Tailwind frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components (Navbar, Footer, …)
│   │   ├── pages/           # Route-level page components
│   │   ├── layouts/         # Layout wrappers (MainLayout, …)
│   │   ├── routes/          # (Phase 1) Protected/role-based route guards
│   │   ├── services/        # Axios API service modules
│   │   ├── hooks/           # Custom React hooks (useApi, useAuth, …)
│   │   ├── context/         # React context providers (AuthContext, …)
│   │   ├── utils/           # Helper functions
│   │   └── assets/          # Static assets
│   ├── public/
│   ├── .env.example
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/                 # Node.js + Express backend
│   ├── src/
│   │   ├── config/          # DB connection, env validation
│   │   ├── controllers/     # Route handler functions
│   │   ├── middleware/      # Error handler, request logger
│   │   ├── models/          # Mongoose schemas (Phase 1+)
│   │   ├── routes/          # Express routers
│   │   ├── services/        # Business logic layer (Phase 1+)
│   │   └── utils/           # API response helpers
│   ├── .env.example
│   └── package.json
│
├── ai-service/              # Python FastAPI ML microservice
│   ├── app/
│   │   ├── config.py        # Env-based configuration
│   │   ├── main.py          # FastAPI application factory
│   │   └── routers/         # Endpoint routers (health, Phase 1+)
│   ├── models/              # Trained ML model files (Phase 1+)
│   ├── services/            # ML inference logic (Phase 1+)
│   ├── data/                # Datasets (Phase 1+)
│   ├── run.py               # Entry point
│   ├── .env.example
│   └── requirements.txt
│
├── .gitignore
├── package.json             # Root convenience scripts
└── README.md
```

---

## Local Setup Instructions

### Prerequisites

- **Node.js** >= 18.x
- **Python** >= 3.10
- **MongoDB** (local or Atlas)
- **Git**

---

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/hunarhub.git
cd hunarhub
```

---

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env and set MONGODB_URI, JWT_SECRET, etc.
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env if needed (VITE_API_BASE_URL)
```

---

### 4. AI Service Setup

```bash
cd ai-service

# Create and activate a virtual environment
python -m venv venv

# Windows:
venv\Scripts\activate
# Linux / macOS:
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
# Edit .env if needed
```

---

## Environment Variables

### Backend (`backend/.env`)

| Variable        | Description                        | Example                          |
|-----------------|------------------------------------|----------------------------------|
| `NODE_ENV`      | Environment mode                   | `development`                    |
| `PORT`          | HTTP server port                   | `5000`                           |
| `MONGODB_URI`   | MongoDB connection string          | `mongodb://localhost:27017/hunarhub` |
| `JWT_SECRET`    | JWT signing secret                 | *(strong random string)*         |
| `JWT_EXPIRES_IN`| JWT token expiry                   | `7d`                             |
| `CLIENT_URL`    | Allowed CORS origin                | `http://localhost:5173`          |
| `AI_SERVICE_URL`| Python AI service URL              | `http://localhost:8000`          |

### Frontend (`frontend/.env`)

| Variable            | Description         | Example  |
|---------------------|---------------------|----------|
| `VITE_API_BASE_URL` | API base URL        | `/api`   |
| `VITE_APP_NAME`     | Application name    | `HunarHub` |

### AI Service (`ai-service/.env`)

| Variable            | Description              | Example                   |
|---------------------|--------------------------|---------------------------|
| `AI_SERVICE_PORT`   | FastAPI server port      | `8000`                    |
| `AI_SERVICE_HOST`   | Bind address             | `0.0.0.0`                 |
| `BACKEND_URL`       | Node.js backend base URL | `http://localhost:5000`   |

---

## Running the Project

### Start the Backend

```bash
cd backend
npm run dev
# → http://localhost:5000
# → http://localhost:5000/api/health
```

### Start the Frontend

```bash
cd frontend
npm run dev
# → http://localhost:5173
```

### Start the AI Service

```bash
cd ai-service
# Activate venv first!
python run.py
# → http://localhost:8000
# → http://localhost:8000/health
# → http://localhost:8000/docs  (Swagger UI)
```

---

## API Endpoints (Phase 0)

| Method | Endpoint          | Service  | Description                |
|--------|-------------------|----------|----------------------------|
| GET    | `/api/health`     | Backend  | Server + DB status         |
| GET    | `/health`         | AI Service | AI service status         |
| GET    | `/docs`           | AI Service | Swagger UI                |

---

## Current Phase: Phase 0 – Foundation

**Completed:**
- [x] Project architecture and folder structure
- [x] Git initialisation and `.gitignore`
- [x] Frontend: React + Vite + Tailwind CSS setup
- [x] Frontend: Responsive landing page (Hero, Features, How It Works, CTA)
- [x] Frontend: Routing (React Router v6), layouts, service layer, hooks, context
- [x] Backend: Express app with CORS, Helmet, Morgan, error handling
- [x] Backend: MongoDB connection utility (graceful when DB unavailable)
- [x] Backend: `GET /api/health` endpoint
- [x] Backend: Environment validation
- [x] AI Service: FastAPI foundation with `/health` endpoint
- [x] AI Service: Python project structure (app, routers, models, services, data)
- [x] Environment variable examples (`.env.example`) for all three services
- [x] Root `README.md`

---

## Future Phases

### Phase 1 – Authentication & User Management
- JWT-based authentication (register, login, logout)
- Role-based access: Customer, Micro-Entrepreneur, Admin
- Protected route guards in React

### Phase 2 – Marketplace Core
- Product and service listing CRUD
- Entrepreneur dashboard
- Customer browsing and search

### Phase 3 – Orders & Service Requests
- Cart, checkout, order management
- Service request workflow

### Phase 4 – AI/ML Features
- Personalised product recommendations (Scikit-learn)
- Entrepreneur ranking algorithm
- Data pipeline from Node.js → Python service

### Phase 5 – Admin & Analytics
- Admin dashboard
- User management
- Platform analytics

---

## Contributing

This project is being developed incrementally. Each phase is implemented and verified before the next begins.

---

## License

MIT
