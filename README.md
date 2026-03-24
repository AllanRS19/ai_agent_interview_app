# Prepwise - AI Mock Interview Platform

An AI-powered job interview preparation platform that simulates real interviews using voice agents and provides structured feedback to help users improve for any interviews the have scheduled.

---

## Preview

![Project Banner](https://github.com/user-attachments/assets/1c0131c7-9f2d-4e3b-b47c-9679e76d8f9a)

---

## About the Project

Prepwise is a full-stack web application that allows users to:
- Generate mock interviews based on the input they provide to the AI Agent for the following data: Role, Level of experience, tech stack, type of interview and amount of questions
- Interact with an AI voice interviewer
- Receive detailed feedback and performance analysis based on the interview that was completed

---

## Tech Stack

- **Frontend:** Next.js, Tailwind CSS, shadcn/ui
- **Backend:** Next.js API Routes
- **Authentication & DB:** Firebase
- **AI & Voice:**
  - Vapi AI (voice agents)
  - Google Gemini (question generation & evaluation)
- **Validation:** Zod

---

## Features

- **Authentication**
  - Sign up / login with Firebase

- **AI Voice Interviews**
  - Real-time interaction using Vapi voice agents

- **Dynamic Question Generation**
  - AI-generated questions based on:
    - Role
    - Experience level
    - Tech stack
    - Interview type

- **AI Feedback System**
  - Rates the candidate interview answers based on:
    - Communication
    - Technical knowledge
    - Problem-solving
    - Confidence

- **Interview Dashboard**
  - Track and manage all interviews and the status

- **Responsive Design**
  - Works across mobile, tablet, and desktop

---

## Architecture Highlights

- Modular component structure for scalability
- Reusable UI components (shadcn)
- Server-side + client-side hybrid rendering (Next.js)
- Clean separation of concerns:
  - API logic
  - UI components
  - Utility functions

---

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- Git

---

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/ai_agent_interview_app.git
cd ai_agent_interview_app
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Set up environment variables

Create a `.env.local` file in the root directory and add:

```env
NEXT_PUBLIC_VAPI_WEB_TOKEN=
NEXT_PUBLIC_VAPI_WORKFLOW_ID=

GOOGLE_GENERATIVE_AI_API_KEY=

NEXT_PUBLIC_BASE_URL=

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
```

Replace these values with your actual credentials from:

* Firebase (authentication & database)
* Vapi (voice AI)
* Google Gemini (AI processing)

---

### 4. Run the development server

```bash
npm run dev
```

Open your browser and go to:

http://localhost:3000

---

## Live Demo

[Prepwise](https://ai-agent-interview-app.vercel.app)