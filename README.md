# LearnPath 🎓

**AI-Powered Course Discovery & Learning Platform**

LearnPath is a full-stack agentic AI application that helps students discover the right courses through AI-powered recommendations and an intelligent chat assistant, while giving instructors a simple platform to publish and manage their own courses.

---
![Uploading Screenshot 2026-07-20 142149.png…]()

## 🚀 Live Demo

- **Live Website:** https://learn-path-sandy.vercel.app
- **Frontend Repository:** https://github.com/WebdeveloperNahid/learn_path
- **Backend Repository:** https://github.com/WebdeveloperNahid/learn_path_server

---

## 📖 About the Project

LearnPath is a single, unified course marketplace — similar in concept to Udemy or Coursera — where:

- **Instructors** create an account, publish courses, and manage their own listings.
- **Students** create an account, browse/search/filter courses, view detailed course pages, and enroll.
- **AI features** are woven directly into the platform to make course discovery and learning support smarter and more personal.

---

## ✨ Key Features

### For Everyone
- Modern, responsive landing page (Hero slider, Features, Categories, Stats, Testimonials, FAQ, Newsletter)
- Course listing/explore page with **search, category & level filters, sorting, and pagination**
- Public course details pages with gallery, description, requirements, and reviews
- Fully responsive design across mobile, tablet, and desktop
- Email/password authentication + **Google Social Login**
- One-click **Demo Login** (Student & Instructor) for quick testing

### For Students
- Personalized dashboard
- AI-powered course recommendations based on interests and enrollment history
- AI Chat Assistant for course-related questions and guidance

### For Instructors
- Protected **"Create Course"** page (`/dashboard/instructor/add-course`)
- Protected **"Manage Courses"** page to view, edit, and delete their own listings
- Full control over their own published content

---

## 🤖 Agentic AI Features

1. **AI Smart Recommendation Engine** — Analyzes a student's interests and enrollment history to recommend the most relevant courses, with reasoning behind each suggestion.
2. **AI Chat Assistant** — A context-aware chat assistant that understands the platform, answers course-related questions, and maintains conversation history.

---

## 🛠️ Tech Stack

**Frontend:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion, Better Auth, HeroUI, Gravity UI, React Hot Toast

**Backend:** Node.js, Express.js, TypeScript, MongoDB (Atlas)

**AI Integration:** Google Gemini API

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- A MongoDB Atlas account & cluster
- A Google Cloud project with OAuth credentials
- A Gemini API key

### 1. Clone the repository
```bash
git clone https://github.com/WebdeveloperNahid/learn_path.git
cd learn_path
```

### 2. Backend Setup
```bash
git clone https://github.com/WebdeveloperNahid/learn_path_server.git
cd learn_path_server
npm install
```

Create a `.env` file:
```env
MONGO_DB_URI=your_mongodb_connection_string
AUTH_DB_NAME=learnpath
FRONTEND_URL=http://localhost:3000
PORT=5000
```

Run the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd learn_path
npm install
```

Create a `.env.local` file:
```env
NEXT_PUBLIC_BASE_URL=http://localhost:5000
BETTER_AUTH_SECRET=your_random_secret_key
BETTER_AUTH_URL=http://localhost:3000
MONGO_DB_URI=your_mongodb_connection_string
AUTH_DB_NAME=learnpath
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GEMINI_API_KEY=your_gemini_api_key
```

Run the frontend:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`, with the API running at `http://localhost:5000`.

---

## 📌 Roles

LearnPath uses a simple two-role system:
- **Student** — browses and enrolls in courses, receives AI recommendations
- **Instructor** — creates and manages their own courses

---

## 🎨 Design System

- **Primary colors:** Indigo & Violet (gradient)
- **Accent color:** Amber
- **Neutral:** Slate

---

## 📄 License

This project was built for educational purposes as part of an assignment submission.
