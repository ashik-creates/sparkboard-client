# 🚀 SparkBoard

<div align="center">

### **AI-Powered Startup Idea Validation Platform**

Discover • Validate • Improve • Build

**🌐 Live Demo:** https://sparkboard-client.vercel.app/

---

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge\&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge\&logo=react\&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge\&logo=tailwindcss)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge\&logo=nodedotjs\&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge\&logo=mongodb\&logoColor=white)
![Gemini AI](https://img.shields.io/badge/Google-Gemini_AI-4285F4?style=for-the-badge\&logo=google)

</div>

---

# 📖 Table of Contents

* Overview
* Features
* AI Features
* Tech Stack
* Folder Structure
* Installation
* Environment Variables
* Running Locally
* API Endpoints
* Future Improvements
* Author
* License

---

# 📌 Overview

SparkBoard is an AI-powered platform where entrepreneurs can submit, explore, validate, and improve startup ideas.

Instead of simply storing ideas, SparkBoard leverages **Google Gemini AI** to analyze business concepts and provide actionable insights that help founders make informed decisions before investing time and resources.

The platform combines modern web technologies with AI to deliver a fast, responsive, and intelligent startup validation experience.

---

# ✨ Key Features

## 🚀 Startup Idea Management

* Publish startup ideas
* Explore community ideas
* Search ideas instantly
* Filter by category
* Sort ideas
* Pagination
* View complete idea details
* Delete startup ideas
* Responsive UI

---

## 🔐 Authentication

* Secure Login
* Google Authentication
* Better Auth
* Protected Routes
* JWT Verification
* Persistent Sessions

---

## 🎨 Modern User Interface

* Responsive Design
* Skeleton Loading Screens
* Custom Error Page
* Custom Not Found Page
* Beautiful Empty States
* Mobile Friendly
* Minimal UI Design

---

# 🤖 AI Features

SparkBoard includes **two substantial AI features** powered by **Google Gemini AI**.

---

## 1️⃣ AI Startup Validation

Analyze any startup idea and receive an intelligent business evaluation.

### The AI evaluates:

* Overall Startup Score (0–100)
* Market Potential
* Technical Difficulty
* Competition Level
* Startup Strengths
* Weaknesses
* Risks
* Business Recommendations
* Final Verdict

Each generated report is stored in MongoDB so users can revisit it without generating another response.

---

## 2️⃣ AI Startup Improvement

The AI acts as a startup mentor and suggests practical improvements.

### The AI provides:

* Better product positioning
* New feature ideas
* Monetization strategies
* Customer acquisition suggestions
* Competitive advantages
* Product improvements
* Revenue opportunities
* Scalability recommendations

Users can regenerate improved ideas whenever they want.

---

# 🛠 Tech Stack

## Frontend

* Next.js 15
* React 19
* TypeScript
* Tailwind CSS
* HeroUI
* Recharts
* React Hot Toast

---

## Backend

* Node.js
* Express.js
* MongoDB
* Better Auth
* JWT
* Google Gemini AI

---

## AI

* Google Gemini Flash
* Prompt Engineering
* Structured JSON Responses

---

```text
sparkboard-client
│
├── app
├── components
│   ├── ideas
│   ├── shared
│   └── ui
├── hooks
├── lib
│   ├── action
│   ├── api
│   └── auth
├── providers
├── public
├── types
└── package.json


sparkboard-server
│
├── index.js
├── middleware
├── routes
├── utils
└── package.json
```

---

# ⚙️ Installation

## Clone the repositories

```bash
git clone https://github.com/your-username/sparkboard-client.git

git clone https://github.com/your-username/sparkboard-server.git
```

---

## Install dependencies

### Client

```bash
npm install
```

### Server

```bash
npm install
```

---

# 🔑 Environment Variables

## Client (`.env.local`)

```env
GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret

NEXT_PUBLIC_API_URL=http://localhost:5000

MONGO_DB_URI=your_mongodb_connection_string

BETTER_AUTH_URL=http://localhost:3000

BETTER_AUTH_SECRET=your_better_auth_secret
```

---

## Server (`.env`)

```env
PORT=5000

CLIENT_URL=http://localhost:3000

MONGODB_URI=your_mongodb_connection_string

GEMINI_API_KEY=your_gemini_api_key
```

---

# ▶ Running Locally

### Start the backend

```bash
npm run dev
```

### Start the frontend

```bash
npm run dev
```

Visit

```text
http://localhost:3000
```

---

# 🌐 Live Demo

https://sparkboard-client.vercel.app/

---

# 📡 API Endpoints

## Ideas

```http
GET     /api/ideas

GET     /api/ideas/:id

POST    /api/ideas

DELETE  /api/ideas/:id
```

---

## AI

```http
POST /api/ideas/:id/validate

POST /api/ideas/:id/improve
```

---

## Statistics

```http
GET /api/statistics
```

---

## Authentication

```http
POST /login

POST /register

POST /logout
```

---

# 📊 Core Modules

### Startup Ideas

* Publish Ideas
* Browse Ideas
* Search
* Category Filtering
* Sorting
* Pagination

---

### AI Validation

* Business Analysis
* Market Evaluation
* Competition Analysis
* Technical Difficulty
* Startup Score
* Risks
* Recommendations

---

### AI Improvement

* Feature Suggestions
* Product Enhancements
* Monetization Ideas
* Business Improvements
* Revenue Opportunities

---

### Statistics Dashboard

* Total Startup Ideas
* Total Categories
* Recharts Visualization

---

# 🚀 Future Improvements

* AI Chat Assistant
* AI Pitch Deck Generator
* AI Business Model Canvas
* Bookmark Startup Ideas
* Like & Comment System
* Founder Profiles
* Team Collaboration
* Investor Matching
* Notifications
* Startup Roadmaps

---

# 🔒 Security

* Better Auth Authentication
* JWT Protected APIs
* Environment Variables
* Secure API Routes
* Input Validation
* AI Response Validation

---

# ⚡ Performance

* Next.js App Router
* Server Components
* Optimized MongoDB Queries
* Skeleton Loading
* Responsive Images
* Pagination
* Fast API Responses

---

# 👨‍💻 Author

**Ashikur Rahman**

Full Stack Developer

* GitHub: https://github.com/ashik-creates
* LinkedIn: https://linkedin.com/in/ashik-creates

---

# 🤝 Contributing

Contributions, issues and feature requests are welcome.

Feel free to fork the project and submit a pull request.

---

# 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

### ⭐ If you found this project helpful, consider giving it a star!

Built with ❤️ using **Next.js**, **MongoDB**, **Gemini AI**, **Tailwind CSS**, and **HeroUI**.

</div>
