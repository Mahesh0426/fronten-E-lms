# 🎓 GyanX Client — E-Learning Frontend

The frontend single-page application for the **GyanX Personalized E-Learning Management System**. Built with React, Vite, and Tailwind CSS, this client delivers a responsive, feature-rich interface for students, instructors, and administrators — complete with dark mode, animations, and personalized course recommendations.

## 🔗 Related Repositories

- **Backend:** [https://github.com/Mahesh0426/backend-E-lms](https://github.com/Mahesh0426/backend-E-lms)

## 🌐 Live Demo

[View Live Application](https://www.gyanx.cloud/)

---

## ✨ Features

- 🔒 **Authentication & Authorization** — Login, signup, and forgot-password flows with JWT-based role access (Student, Instructor, Admin)
- 📚 **Course Browsing & Enrollment** — Advanced search, filtering, and PayPal-integrated course purchases
- 🧠 **Personalized Recommendations** — ML-powered course suggestions tailored to each student's learning profile
- 🎬 **Video Player** — Embedded React Player for streaming course lectures with progress tracking
- 📝 **Quizzes & Assignments** — Interactive assessment-taking for students and full CRUD management for instructors
- 📊 **Instructor Dashboard** — Course management, analytics charts, student management, and activity logs
- 🛡️ **Admin Panel** — Platform-wide administration with analytics and user oversight
- ⭐ **Course Reviews** — Students can rate and review enrolled courses
- 🌙 **Dark Mode** — Full dark theme support with Redux-persisted preference
- 🖼️ **Cloudinary Uploads** — Image and video uploads for course content creation
- 📈 **Charts & Analytics** — Visual insights with Chart.js for instructors and admins
- 📱 **Responsive Design** — Optimized for desktop, tablet, and mobile devices
- 🎉 **Micro-Animations** — Polished UI with Framer Motion transitions and React Confetti celebrations

---

## 💻 Tech Stack

| Layer            | Technology                                       |
| ---------------- | ------------------------------------------------ |
| Framework        | React 18                                         |
| Build Tool       | Vite 5                                           |
| Styling          | Tailwind CSS 3, ShadCN UI (Radix UI primitives)  |
| State Management | Redux Toolkit + React-Redux                      |
| Routing          | React Router DOM v6                              |
| HTTP Client      | Axios                                            |
| Forms            | React Hook Form + Zod validation                 |
| Animations       | Framer Motion                                    |
| Charts           | Chart.js + react-chartjs-2                       |
| Video            | React Player                                     |
| PDF Export       | jsPDF + html2canvas                              |
| Icons            | Lucide React                                     |
| Notifications    | React Toastify                                   |
| Containerization | Docker (multi-stage), Nginx, Docker Compose      |

---

## 📂 Project Structure

```
client/
├── index.html                 # HTML entry point
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind CSS configuration
├── components.json            # ShadCN UI component config
├── nginx.conf                 # Nginx config for production SPA routing
├── Dockerfile                 # Multi-stage Docker build (Node → Nginx)
├── docker-compose.yml         # Container orchestration
├── .env                       # Environment variables (not committed)
└── src/
    ├── main.jsx               # React entry point & providers
    ├── App.jsx                # Root component & route definitions
    ├── store.js               # Redux store configuration
    ├── index.css              # Global styles & Tailwind directives
    ├── axios/                 # Axios instance & interceptors
    ├── config/                # App configuration & constants
    ├── hooks/                 # Custom React hooks
    ├── lib/                   # Utility functions (cn, helpers)
    ├── redux/                 # Redux slices & async thunks
    │   ├── user/              # Auth & user state
    │   ├── dark-mode/         # Theme preference
    │   ├── instructor-course/ # Instructor course management
    │   ├── student-course/    # Student course browsing & progress
    │   ├── grade/             # Marks & grading state
    │   └── instructor-quiz and Assignment/
    ├── components/
    │   ├── ui/                # ShadCN UI primitives (Button, Dialog, Tabs…)
    │   ├── Header-Footer/     # Shared layout components
    │   ├── Route-Guard/       # Protected route wrappers
    │   ├── common-Input/      # Reusable form input components
    │   ├── log-in/            # Login form components
    │   ├── sign-up/           # Signup form components
    │   ├── forget-password/   # Password reset components
    │   ├── helper/            # Shared helper components
    │   ├── student-view/      # Student-specific components
    │   │   ├── profile-component/
    │   │   ├── quiz and assignment/
    │   │   └── review/
    │   ├── instructor-view/   # Instructor-specific components
    │   │   ├── Instructor-layout/
    │   │   ├── courses/
    │   │   └── charts/
    │   └── admin-view/        # Admin-specific components
    └── pages/
        ├── Auth/              # Authentication pages
        ├── home/              # Landing, About Us, Search pages
        ├── student/           # Student portal pages
        │   ├── course/        # Course details & player
        │   ├── profile/       # Student profile
        │   └── quiz and assignment/
        ├── Instructor/        # Instructor dashboard pages
        │   ├── Dashboard/
        │   ├── course-management/
        │   ├── quiz-assignment/
        │   ├── student-management/
        │   ├── analytics/
        │   ├── Activity-Log/
        │   └── setting/
        ├── admin/             # Admin management pages
        └── pageNotFound/      # 404 fallback page
```

---

## ⚙️ Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# API Base URL (points to the backend server)
VITE_APP_API_BASE_URL=http://localhost:8000

# Web3Forms Access Key (for contact form)
VITE_WEB3FORM_ACCESS_KEY=<your-web3form-access-key>
```

> **Note:** Vite exposes only variables prefixed with `VITE_` to the client bundle.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 22
- **Yarn** (v1)
- **Backend server** running (see [Server README](https://github.com/Mahesh0426/backend-E-lms))

### Local Development

```bash
# 1. Install dependencies
yarn install

# 2. Create .env file with your credentials (see above)

# 3. Start development server (with HMR)
yarn dev
```

The app will start at **http://localhost:5173**.

---

## 🐳 Docker

The client uses a **multi-stage Docker build** — Stage 1 compiles the React app with Vite, and Stage 2 serves the static output via **Nginx** with gzip compression, asset caching, and SPA fallback routing.

### Build & Run with Docker

```bash
# Build the image (pass env vars as build args)
docker build \
  --build-arg VITE_APP_API_BASE_URL=https://api.gyanx.cloud \
  --build-arg VITE_WEB3FORM_ACCESS_KEY=<your-key> \
  -t gyanx-client .

# Run the container
docker run -p 5174:80 gyanx-client
```

### Run with Docker Compose

```bash
docker compose up --build
```

This will build the client image with environment variables from `.env` and serve it on **http://localhost:5174**.

---

## 📜 Scripts

| Command        | Description                                |
| -------------- | ------------------------------------------ |
| `yarn dev`     | Start Vite dev server with HMR             |
| `yarn build`   | Build production bundle to `dist/`         |
| `yarn preview` | Preview production build locally           |
| `yarn lint`    | Run ESLint across the project              |

---

## 🌐 Nginx Configuration

The production container uses a custom Nginx config with:

- **Gzip compression** — Level 6 compression for text, CSS, JS, JSON, SVG, and XML
- **Static asset caching** — 1-year cache with `immutable` header for JS, CSS, images, and fonts
- **SPA fallback** — All routes fall back to `index.html` for client-side routing
- **Security headers** — `X-Frame-Options`, `X-Content-Type-Options`, and `X-XSS-Protection`

---

## 📄 License

This project is licensed under the **MIT License**.
