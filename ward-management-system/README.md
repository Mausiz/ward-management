# 🏥 MedWard — Patient Ward Management System

A full-stack web application for managing hospital wards, built with **React.js** and **Node.js**.

## Tech Stack
- **Frontend**: React 18, React Router v6, Recharts, Lucide Icons, Vite
- **Backend**: Node.js, Express.js
- **Fonts**: Playfair Display + DM Sans
- **Colour**: Steel Blue `#0B4F82` primary theme

---

## Local Development

### 1. Start the Backend

```bash
cd server
npm install
npm start
# API running at http://localhost:5000
```

### 2. Start the Frontend (new terminal)

```bash
cd client
npm install
npm run dev
# App running at http://localhost:3000
```

---

## 🚀 Deploy to Render

### Step 1: Push to GitHub

1. Create a new repository on GitHub
2. In your project root:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2: Deploy on Render

1. Go to [render.com](https://render.com) and sign up/login
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:

| Setting | Value |
|---------|-------|
| **Name** | `ward-management` (or your choice) |
| **Root Directory** | (leave blank) |
| **Environment** | `Node` |
| **Build Command** | `./build.sh` |
| **Start Command** | `cd server && npm start` |
| **Instance Type** | Free |

5. Add environment variable:
   - Key: `NODE_ENV`
   - Value: `production`

6. Click **"Create Web Service"**

Render will:
- Install server dependencies
- Install client dependencies  
- Build the React app (creates `client/dist/`)
- Start the Express server (which serves both API and built React files)

Your app will be live at: `https://your-app-name.onrender.com`

---

## Features

| Page | Features |
|------|----------|
| **Dashboard** | Live stats cards, ward occupancy bar chart, real-time activity feed, live clock |
| **Patients** | Searchable/filterable table, admit patient, edit records, discharge with confirmation |
| **Wards** | Visual ward grid with occupancy bars, expandable per-bed maps, capacity alerts |
| **Staff** | Roster cards with on/off-duty status, ward & shift filtering |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard` | Stats + occupancy + activity |
| GET | `/api/patients` | All patients (supports `?search=`, `?wardId=`, `?status=`) |
| POST | `/api/patients` | Admit new patient |
| PUT | `/api/patients/:id` | Update patient |
| DELETE | `/api/patients/:id` | Discharge patient |
| GET | `/api/wards` | All wards with occupancy |
| GET | `/api/wards/:id` | Single ward detail |
| GET | `/api/staff` | Staff roster (supports `?wardId=`, `?shift=`, `?status=`) |

---

## Design System

| Token | Value |
|-------|-------|
| Primary Blue | `#0B4F82` |
| Dark Blue | `#07355A` |
| Light Blue | `#EBF4FF` |
| Critical Red | `#E8465A` |
| Success Green | `#2E9E4F` |
| Background | `#F0F6FB` |
| Body Font | DM Sans |
| Display Font | Playfair Display |

---

## Notes

- **Data Persistence**: Currently uses in-memory storage (resets on server restart). For production, integrate a database like PostgreSQL or MongoDB.
- **Free Tier**: Render's free tier may spin down after inactivity. First load after idle will take 30-60 seconds.
