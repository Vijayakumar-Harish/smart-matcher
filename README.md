---

# 🧠 Smart Resume Matcher AI

**ATS-style resume scoring + missing skills + improvement suggestions**

> Upload a resume PDF + paste job description → AI gives match score, gaps & suggestions.

<p align="center">
  <img src="assets/banner.png" width="700" alt="Project Banner"/>
</p>

---

## 🚀 Features

| Capability            | Description                        |                     |
| --------------------- | ---------------------------------- | ------------------- |
| 🤖 AI Resume Scoring  | GPT-5 Mini                         | Match Score (0-100) |
| 📄 PDF Parsing        | Extracts text from PDFs (pdf2json) |                     |
| 🧠 Skill Gap Analysis | AI finds missing skills            |                     |
| 💡 Improvement Tips   | Smart bullet suggestions           |                     |
| 👤 Auth + JWT         | Login, Register, Session           |                     |
| 📊 Match History      | Stored in MongoDB                  |                     |
| 🎯 Frontend           | React + Vite + Tailwind            |                     |
| 💾 Backend            | Node.js + Express                  |                     |

---

## 🛠️ Tech Stack

### Backend

![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge\&logo=node.js\&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge\&logo=mongodb\&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge\&logo=json-web-tokens)

### Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react)
![Vite](https://img.shields.io/badge/Vite-563D7C?style=for-the-badge\&logo=vite)
![Tailwind](https://img.shields.io/badge/TailwindCSS-38bdf8?style=for-the-badge\&logo=tailwindcss\&logoColor=white)

### AI & Tools

![OpenAI API](https://img.shields.io/badge/OpenAI_API-000000?style=for-the-badge\&logo=openai)
![PDF2JSON](https://img.shields.io/badge/PDF2JSON-4B8BBE?style=for-the-badge)

---

## 📂 Folder Structure

```
smart-matcher/
│── backend/
│   └── src/
│       ├── controllers/
│       ├── models/
│       ├── utils/pdfParser.js
│       ├── routes/
│       └── index.js
│── frontend/
│   └── src/
│       ├── pages/
│       ├── context/AuthContext.jsx
│       └── App.jsx
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone

```bash
git clone https://github.com/yourusername/smart-matcher.git
cd smart-matcher
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env`

```
PORT=5005
MONGO_URI=mongodb://localhost:27017/smart-matcher
JWT_SECRET=your_secret
OPENAI_API_KEY=your_key
```

Run server:

```bash
npm run dev
```

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
```

Create `.env`

```
VITE_API_URL=http://localhost:5005
```

Run:

```bash
npm run dev
```

---

## 🧪 API Endpoints

| Method | Route                | Description           |
| ------ | -------------------- | --------------------- |
| POST   | `/api/auth/register` | Register              |
| POST   | `/api/auth/login`    | Login                 |
| POST   | `/api/match`         | Upload Resume + Score |

---

## 🧠 Example Output

```json
{
  "score": 85,
  "missingSkills": ["AWS Lambda", "Next.js"],
  "suggestions": [
    "Add cloud project examples",
    "Mention team collaboration experience"
  ]
}
```

---

## 🛠️ Deployment

### 🌐 Frontend (Vercel / Netlify)

Set environment variable:

```
VITE_API_URL=https://yourserver.com
```

Deploy build:

```bash
npm run build
```

### ☁️ Backend (Render / Railway / EC2)

Set these environment variables:

| Key            | Value           |
| -------------- | --------------- |
| PORT           | 5005            |
| MONGO_URI      | Your cloud DB   |
| OPENAI_API_KEY | Your OpenAI key |
| JWT_SECRET     | Strong secret   |

---

## 📎 Screenshots

> Save images in `/assets/` folder

| Login                 | Upload Resume          | Results                |
| --------------------- | ---------------------- | ---------------------- |
| ![](assets/login.png) | ![](assets/upload.png) | ![](assets/result.png) |

---

## 💡 Roadmap

* ✅ Resume PDF support
* ⏳ DOC / DOCX support
* ⏳ Resume rewrite by AI
* 🔥 Bulk resume matching
* 📊 ATS score dashboard

---

## 🤝 Contributing

PRs welcome — let's build something awesome together 🎯

---

## ⭐ Support

If this helped you, please ⭐ the repo!

> *Motivation boosts coding 👇*

```
git star smart-matcher
```

---

## 👤 Author

**Harish V**
Full-Stack & AI Developer
🚀 Building intelligent tools for job seekers

---
