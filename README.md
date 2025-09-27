# AI-Powered Interview Prep

A MERN app for interview preparation with AI feedback.

## Features
- Authentication with email verification and password reset.
- Dashboard with general and company-specific prep.
- MCQ practice with scores and explanations.
- Coding practice with Monaco Editor and Judge0 execution.
- Interview Q&A with Gemini AI feedback.
- Progress tracking with Recharts.
- Admin panel for managing questions.

## Setup Locally

1. Clone the repo.
2. Backend:
   - cd backend
   - npm install
   - Copy .env.example to .env and fill: MONGO_URI, JWT_SECRET, GMAIL_USER, GMAIL_APP_PASS, GEMINI_API_KEY, RAPIDAPI_KEY.
   - node seed.js (seed sample data)
   - npm run dev (runs on port 5000)
3. Frontend:
   - cd frontend
   - npm install
   - npm run dev (runs on port 5173)
4. Open http://localhost:5173/login

## Deployment
- Frontend: Vercel - Import Git repo, set framework preset to Vite.
- Backend: Render - New web service, Node, build: npm install, start: npm start, add env vars.
- Ensure backend URL in frontend axios baseURL (update in src/utils/api.js or env).

## Notes
- For Judge0, language IDs: JS=63, Python=71 (add more as needed).
- Free tiers have limits; monitor usage.
- Admin user: Manually set role to 'admin' in MongoDB or create via signup and update.